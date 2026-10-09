import { getStore } from '@netlify/blobs'

// Strongly consistent so a newly registered account can sign in immediately.
// AUTH_STORE=memory swaps in an in-process store for local tests (never set on Netlify).
let memory = null

export function getAuthStore() {
  if (process.env.AUTH_STORE === 'memory') return (memory ??= createMemoryStore())
  return getStore({ name: 'ufc-auth', consistency: 'strong' })
}

export function createMemoryStore() {
  const data = new Map()
  return {
    async get(key, opts) {
      if (!data.has(key)) return null
      const v = data.get(key)
      return opts?.type === 'json' ? JSON.parse(v) : v
    },
    async set(key, value, opts) {
      if (opts?.onlyIfNew && data.has(key)) return { modified: false }
      data.set(key, String(value))
      return { modified: true }
    },
    async setJSON(key, value, opts) {
      return this.set(key, JSON.stringify(value), opts)
    },
  }
}
