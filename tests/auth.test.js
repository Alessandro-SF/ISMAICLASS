// Tests for the /api/auth Netlify Function, run against an in-memory store.
import { test } from 'node:test'
import assert from 'node:assert/strict'

process.env.AUTH_STORE = 'memory'
const { default: handler } = await import('../netlify/functions/auth.mjs')
const { getAuthStore } = await import('../netlify/lib/store.mjs')

const BASE = 'https://ufc-fight-tracker.test/api/auth/'
const post = (action, body, cookie) =>
  handler(
    new Request(BASE + action, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) },
      body: JSON.stringify(body),
    }),
  )
const me = (cookie) => handler(new Request(BASE + 'me', { headers: cookie ? { cookie } : {} }))
const cookieOf = (res) => res.headers.get('set-cookie')?.split(';')[0]

test('register creates an account, hashes the password and starts a session', async () => {
  const res = await post('register', { username: 'Prof_Smith', password: 'correct-horse' })
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { user: { username: 'Prof_Smith' } })
  const setCookie = res.headers.get('set-cookie')
  assert.match(setCookie, /^ft_session=[^;]+; Path=\/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800$/)

  const stored = await getAuthStore().get('users/prof_smith', { type: 'json' })
  assert.equal(stored.username, 'Prof_Smith')
  assert.ok(stored.hash && stored.salt)
  assert.ok(!JSON.stringify(stored).includes('correct-horse'), 'plaintext password never stored')

  const who = await (await me(cookieOf(res))).json()
  assert.deepEqual(who, { user: { username: 'Prof_Smith' } })
})

test('usernames are unique (case-insensitive)', async () => {
  const res = await post('register', { username: 'prof_smith', password: 'another-pass' })
  assert.equal(res.status, 409)
})

test('registration validates username and password', async () => {
  assert.equal((await post('register', { username: 'ab', password: 'long-enough' })).status, 400)
  assert.equal((await post('register', { username: 'bad name!', password: 'long-enough' })).status, 400)
  assert.equal((await post('register', { username: 'valid_name', password: 'short' })).status, 400)
})

test('login succeeds with the right password and fails otherwise', async () => {
  const ok = await post('login', { username: 'PROF_SMITH', password: 'correct-horse' })
  assert.equal(ok.status, 200)
  assert.ok(cookieOf(ok).startsWith('ft_session='))

  const wrong = await post('login', { username: 'prof_smith', password: 'nope-nope' })
  assert.equal(wrong.status, 401)
  assert.equal(wrong.headers.get('set-cookie'), null)
  const missing = await post('login', { username: 'ghost_user', password: 'whatever1' })
  assert.equal(missing.status, 401)
  assert.equal((await missing.json()).error, (await wrong.json()).error, 'same error for unknown user and bad password')
})

test('logout clears the cookie; tampered or missing cookies are anonymous', async () => {
  const out = await post('logout', {})
  assert.match(out.headers.get('set-cookie'), /^ft_session=; .*Max-Age=0$/)

  assert.deepEqual(await (await me()).json(), { user: null })
  const login = await post('login', { username: 'prof_smith', password: 'correct-horse' })
  const [body] = cookieOf(login).slice('ft_session='.length).split('.')
  const forged = Buffer.from(JSON.stringify({ u: 'someone_else', exp: 9999999999 })).toString('base64url')
  assert.notEqual(forged, body)
  assert.deepEqual(await (await me(`ft_session=${forged}.${'x'.repeat(43)}`)).json(), { user: null })
})

test('rejects non-JSON bodies and wrong methods', async () => {
  const res = await handler(new Request(BASE + 'login', { method: 'POST', body: 'username=a&password=b' }))
  assert.equal(res.status, 400)
  assert.equal((await handler(new Request(BASE + 'login'))).status, 405)
})
