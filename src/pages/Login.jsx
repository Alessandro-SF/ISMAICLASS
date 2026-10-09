import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider.jsx'

export default function Login() {
  const { user, loading, login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from ?? '/'

  const [mode, setMode] = useState(location.pathname === '/register' ? 'register' : 'login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  if (!loading && user) return <Navigate to={from} replace />

  const isRegister = mode === 'register'

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (isRegister && password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setBusy(true)
    try {
      await (isRegister ? register : login)(username.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const switchTo = (next) => {
    setMode(next)
    setError(null)
    setPassword('')
    setConfirm('')
  }

  const tab = (key, label) => (
    <button
      type="button"
      onClick={() => switchTo(key)}
      aria-pressed={mode === key}
      className={`flex-1 rounded-md py-2 text-xs font-semibold uppercase tracking-wider transition ${
        mode === key ? 'bg-blood-500 text-white' : 'text-zinc-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="relative grid place-items-center py-6 sm:py-12">
      <div className="pointer-events-none absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blood-500/15 blur-3xl" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-blood-500 font-display text-2xl font-bold text-white shadow-[0_0_30px_rgba(225,29,46,0.5)]">
            FT
          </span>
          <h1 className="h-display mt-4 text-3xl text-white">{isRegister ? 'Create your account' : 'Welcome back'}</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Logging in is optional. All events, results and fighter stats stay open to everyone.
          </p>
        </div>

        <div className="card p-6 sm:p-8">
          <div className="mb-6 flex rounded-lg border border-white/10 p-1" role="group" aria-label="Log in or create account">
            {tab('login', 'Log in')}
            {tab('register', 'Create account')}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-zinc-400">Username</span>
              <input
                className="input"
                name="username"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                required
                maxLength={20}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. octagon_fan"
              />
              {isRegister && <span className="mt-1 block text-[11px] text-zinc-500">3–20 letters, numbers or underscores.</span>}
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-zinc-400">Password</span>
              <input
                className="input"
                type="password"
                name="password"
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isRegister ? 'At least 8 characters' : '••••••••'}
              />
            </label>
            {isRegister && (
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-zinc-400">Confirm password</span>
                <input
                  className="input"
                  type="password"
                  name="confirm"
                  autoComplete="new-password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </label>
            )}

            {error && (
              <p role="alert" className="rounded-md border border-blood-500/40 bg-blood-500/10 px-3 py-2 text-sm text-blood-400">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary w-full py-2.5 disabled:opacity-50" disabled={busy || !username || !password}>
              {busy ? 'Please wait…' : isRegister ? 'Create account' : 'Log in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm">
          <Link to="/" className="text-zinc-400 hover:text-white">
            ← Continue browsing without an account
          </Link>
        </p>
        <p className="mt-3 text-center text-[11px] text-zinc-600">
          Passwords are hashed with scrypt on the server and never stored in your browser.
        </p>
      </div>
    </div>
  )
}
