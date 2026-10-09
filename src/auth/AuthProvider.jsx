import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// Talks to the /api/auth/* Netlify Function. The session lives in an HttpOnly cookie,
// so the browser never sees or stores the token itself.
const AuthContext = createContext(null)

async function call(path, options = {}) {
  let res
  try {
    res = await fetch(`/api/auth/${path}`, {
      credentials: 'same-origin',
      headers: options.body ? { 'content-type': 'application/json' } : undefined,
      ...options,
    })
  } catch {
    throw new Error('Login service is unreachable. Check your connection and try again.')
  }
  const data = await res.json().catch(() => null)
  if (!data) throw new Error('Login service is unavailable right now.')
  if (!res.ok) throw new Error(data.error ?? 'Something went wrong. Please try again.')
  return data
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    call('me')
      .then((d) => setUser(d.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const submit = useCallback(async (path, username, password) => {
    const d = await call(path, { method: 'POST', body: JSON.stringify({ username, password }) })
    setUser(d.user)
    return d.user
  }, [])

  const value = {
    user,
    loading,
    login: (username, password) => submit('login', username, password),
    register: (username, password) => submit('register', username, password),
    logout: async () => {
      await call('logout', { method: 'POST' }).catch(() => {})
      setUser(null)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
