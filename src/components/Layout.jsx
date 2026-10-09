import { useEffect, useState } from 'react'
import { NavLink, Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider.jsx'
import { DATA_RETRIEVED } from '../data/index.js'
import { formatDate, getToday, getWindow, toISODate } from '../lib/dates.js'

const NAV = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/upcoming', label: 'Upcoming' },
  { to: '/results', label: 'Results' },
  { to: '/fighters', label: 'Fighters' },
  { to: '/compare', label: 'Compare' },
  { to: '/about', label: 'Data' },
]

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap" aria-label="UFC Fight Tracker home">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-blood-500 font-display text-lg font-bold text-white shadow-[0_0_20px_rgba(225,29,46,0.45)]">
        FT
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg font-bold uppercase tracking-wider text-white">UFC Fight Tracker</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">Stats · Results · Matchups</span>
      </span>
    </Link>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, loading, logout } = useAuth()
  const { start, end, today } = getWindow()

  async function handleLogout() {
    await logout()
    setOpen(false)
    navigate('/', { replace: true })
  }

  const account = user ? (
    <>
      <span className="min-w-0 max-w-[10rem] truncate text-xs text-zinc-400 xl:max-w-[14rem]" title={user.username}>
        <span className="lg:hidden xl:inline">Signed in as </span>
        <span className="font-semibold text-white">{user.username}</span>
      </span>
      <button type="button" onClick={handleLogout} className="btn-ghost shrink-0 whitespace-nowrap px-3 py-1.5 text-xs uppercase tracking-wider">
        Log out
      </button>
    </>
  ) : loading ? null : (
    <Link to="/login" state={{ from: location.pathname + location.search }} className="btn-primary shrink-0 whitespace-nowrap px-3 py-1.5 text-xs uppercase tracking-wider">
      Log in
    </Link>
  )

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  const linkClass = ({ isActive }) =>
    `whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide transition lg:px-2 lg:text-[13px] xl:px-3 xl:text-sm ${
      isActive ? 'bg-blood-500/15 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
    }`

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden min-w-0 items-center gap-3 lg:flex">{account}</div>
          <button
            type="button"
            className="btn-ghost px-3 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" className="border-t border-white/5 px-4 pb-4 pt-2 lg:hidden" aria-label="Mobile">
            <div className="grid gap-1">
              {NAV.map((n) => (
                <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
                  {n.label}
                </NavLink>
              ))}
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/5 pt-3">{account}</div>
            </div>
          </nav>
        )}
        <div className="border-t border-white/5 bg-ink-900/60">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-1.5 text-[11px] text-zinc-500 sm:px-6">
            <span>
              Today: <span className="font-semibold text-zinc-300">{formatDate(toISODate(today))}</span>
              <span className="mx-2 text-zinc-700">|</span>
              Window: {formatDate(toISODate(start))} – {formatDate(toISODate(end))}
            </span>
            <span>Data snapshot: {formatDate(DATA_RETRIEVED)} · ufcstats.com · ufc.com · Wikipedia</span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 bg-ink-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            UFC Fight Tracker is an independent student project for an AI in Business course. Not affiliated with or endorsed by
            the UFC. Statistics from <a className="text-zinc-300 hover:text-white" href="http://ufcstats.com" target="_blank" rel="noreferrer">ufcstats.com</a>,
            bios and photos from <a className="text-zinc-300 hover:text-white" href="https://www.ufc.com" target="_blank" rel="noreferrer">ufc.com</a>,
            event venues from Wikipedia.
          </p>
          <Link to="/about" className="shrink-0 font-semibold text-zinc-300 hover:text-white">
            Data sources & limitations →
          </Link>
        </div>
      </footer>
    </div>
  )
}
