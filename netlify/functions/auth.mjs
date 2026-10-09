// Username/password authentication API (Netlify Function, served at /api/auth/*).
//
// - Accounts live in Netlify Blobs (store "ufc-auth"), keyed by lower-cased username.
// - Passwords are hashed with scrypt and a per-user random salt; plaintext is never stored.
// - Sessions are HMAC-signed tokens in an HttpOnly, Secure, SameSite=Lax cookie.
// - The signing secret is SESSION_SECRET if set, otherwise a random secret generated once
//   and kept in the same Blobs store (never sent to the browser).

import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { getAuthStore } from '../lib/store.mjs'

const scrypt = promisify(scryptCb)

const COOKIE = 'ft_session'
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60
const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/
const PASSWORD_MIN = 8
const PASSWORD_MAX = 128
const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 }

function json(status, body, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers },
  })
}

const b64url = (buf) => Buffer.from(buf).toString('base64url')

async function hashPassword(password, salt = randomBytes(16)) {
  const key = await scrypt(password, salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p })
  return { salt: b64url(salt), hash: b64url(key) }
}

async function verifyPassword(password, record) {
  const { hash } = await hashPassword(password, Buffer.from(record.salt, 'base64url'))
  const a = Buffer.from(hash, 'base64url')
  const b = Buffer.from(record.hash, 'base64url')
  return a.length === b.length && timingSafeEqual(a, b)
}

async function getSecret(store) {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET
  const existing = await store.get('config/session-secret')
  if (existing) return existing
  const fresh = b64url(randomBytes(32))
  await store.set('config/session-secret', fresh, { onlyIfNew: true })
  // Re-read in case another instance won the race.
  return (await store.get('config/session-secret')) ?? fresh
}

function sign(payload, secret) {
  const body = b64url(JSON.stringify(payload))
  const mac = createHmac('sha256', secret).update(body).digest('base64url')
  return `${body}.${mac}`
}

function verify(token, secret) {
  if (!token || !token.includes('.')) return null
  const [body, mac] = token.split('.')
  const expected = createHmac('sha256', secret).update(body).digest('base64url')
  const a = Buffer.from(mac)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

function readCookie(req, name) {
  const header = req.headers.get('cookie') ?? ''
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=')
    if (k === name) return v.join('=')
  }
  return null
}

const sessionCookie = (token, maxAge) =>
  `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`

async function readCredentials(req) {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) return null
  try {
    const { username, password } = await req.json()
    if (typeof username !== 'string' || typeof password !== 'string') return null
    return { username: username.trim(), password }
  } catch {
    return null
  }
}

async function startSession(store, user) {
  const secret = await getSecret(store)
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const token = sign({ u: user.username, exp }, secret)
  return json(200, { user: { username: user.username } }, { 'set-cookie': sessionCookie(token, SESSION_TTL_SECONDS) })
}

async function register(req, store) {
  const creds = await readCredentials(req)
  if (!creds) return json(400, { error: 'Send a username and password.' })
  const { username, password } = creds
  if (!USERNAME_RE.test(username)) {
    return json(400, { error: 'Username must be 3–20 characters: letters, numbers or underscores.' })
  }
  if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
    return json(400, { error: `Password must be ${PASSWORD_MIN}–${PASSWORD_MAX} characters.` })
  }
  const { salt, hash } = await hashPassword(password)
  const record = { username, salt, hash, createdAt: new Date().toISOString() }
  const { modified } = await store.setJSON(`users/${username.toLowerCase()}`, record, { onlyIfNew: true })
  if (!modified) return json(409, { error: 'That username is already taken.' })
  return startSession(store, record)
}

async function login(req, store) {
  const creds = await readCredentials(req)
  if (!creds || !creds.username || !creds.password) return json(400, { error: 'Enter your username and password.' })
  const record = await store.get(`users/${creds.username.toLowerCase()}`, { type: 'json' })
  // Hash even when the user doesn't exist so response time doesn't reveal which usernames exist.
  const ok = record
    ? await verifyPassword(creds.password, record)
    : (await hashPassword(creds.password), false)
  if (!ok) return json(401, { error: 'Invalid username or password.' })
  return startSession(store, record)
}

async function me(req, store) {
  const token = readCookie(req, COOKIE)
  if (!token) return json(200, { user: null })
  const payload = verify(token, await getSecret(store))
  if (!payload) return json(200, { user: null }, { 'set-cookie': sessionCookie('', 0) })
  const record = await store.get(`users/${payload.u.toLowerCase()}`, { type: 'json' })
  if (!record) return json(200, { user: null }, { 'set-cookie': sessionCookie('', 0) })
  return json(200, { user: { username: record.username } })
}

export default async (req) => {
  const action = new URL(req.url).pathname.replace(/\/+$/, '').split('/').pop()
  const store = getAuthStore()
  try {
    if (action === 'me' && req.method === 'GET') return await me(req, store)
    if (req.method !== 'POST') return json(405, { error: 'Method not allowed.' })
    if (action === 'register') return await register(req, store)
    if (action === 'login') return await login(req, store)
    if (action === 'logout') return json(200, { user: null }, { 'set-cookie': sessionCookie('', 0) })
    return json(404, { error: 'Not found.' })
  } catch (err) {
    console.error('auth error', err)
    return json(500, { error: 'Something went wrong. Please try again.' })
  }
}

export const config = { path: '/api/auth/*' }
