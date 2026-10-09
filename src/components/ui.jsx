// Small presentational building blocks shared across pages.
import { Link } from 'react-router-dom'
import { FIGHTERS_BY_SLUG } from '../data/index.js'
import { daysUntil } from '../lib/dates.js'

export const NA = 'N/A'

export function fmt(value, suffix = '', digits) {
  if (value === null || value === undefined || Number.isNaN(value)) return NA
  const v = digits !== undefined ? Number(value).toFixed(digits) : value
  return `${v}${suffix}`
}

export function inchesToFeet(inches) {
  if (!inches) return NA
  return `${Math.floor(inches / 12)}′ ${inches % 12}″`
}

export function SectionHeader({ eyebrow, title, action, children }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}
        <h2 className="h-display text-2xl text-white sm:text-3xl">{title}</h2>
        {children && <p className="mt-1 max-w-2xl text-sm text-zinc-400">{children}</p>}
      </div>
      {action}
    </div>
  )
}

export function PageHeader({ eyebrow, title, children, right }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/5 pb-6">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="h-display text-3xl text-white sm:text-4xl">{title}</h1>
        {children && <p className="mt-2 max-w-3xl text-sm text-zinc-400">{children}</p>}
      </div>
      {right}
    </div>
  )
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

/** Fighter photo from ufc.com when available; otherwise a neutral initials badge. */
export function FighterAvatar({ slug, name, size = 'md', className = '', corner }) {
  const fighter = FIGHTERS_BY_SLUG[slug]
  const image = fighter?.image
  const sizes = {
    sm: 'h-10 w-10 text-xs',
    md: 'h-14 w-14 text-sm',
    lg: 'h-24 w-24 text-xl',
    xl: 'h-40 w-40 text-3xl',
  }
  const ring = corner === 'red' ? 'ring-blood-500/60' : corner === 'blue' ? 'ring-corner-blue/60' : 'ring-white/10'
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-ink-700 to-ink-850 ring-2 ${ring} ${sizes[size]} ${className}`}
    >
      <span className="absolute inset-0 grid place-items-center font-display font-bold text-zinc-300" aria-hidden="true">
        {initials(name)}
      </span>
      {image && (
        <img
          src={image}
          alt={name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover object-top"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
    </div>
  )
}

export function FighterLink({ slug, name, className = '' }) {
  return (
    <Link to={`/fighters/${slug}`} className={`hover:text-blood-400 hover:underline ${className}`}>
      {name}
    </Link>
  )
}

export function RecordText({ slug, className = '' }) {
  const rec = FIGHTERS_BY_SLUG[slug]?.record
  return (
    <span className={`tabular text-zinc-400 ${className}`} title={rec ? 'Pro MMA record (W-L-D), ufcstats.com' : 'Record not in dataset'}>
      {rec ? rec.text : 'Record N/A'}
    </span>
  )
}

export function Countdown({ date, compact = false }) {
  const d = daysUntil(date)
  if (d < 0) return <span className="chip">Awaiting results</span>
  if (d === 0) return <span className="chip chip-red animate-pulse">Fight day</span>
  return (
    <span className={`chip chip-red ${compact ? '' : 'text-xs'}`}>
      <span className="tabular">{d}</span> {d === 1 ? 'day' : 'days'} away
    </span>
  )
}

export function StatTile({ label, value, sub, accent = false }) {
  return (
    <div className="card p-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">{label}</p>
      <p className={`mt-1 font-display text-3xl font-bold tabular ${accent ? 'text-blood-400' : 'text-white'}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-zinc-500">{sub}</p>}
    </div>
  )
}

export function EmptyState({ title, children }) {
  return (
    <div className="card grid place-items-center px-6 py-14 text-center">
      <p className="h-display text-lg text-zinc-300">{title}</p>
      {children && <p className="mt-2 max-w-md text-sm text-zinc-500">{children}</p>}
    </div>
  )
}

export function OutcomeBadge({ outcome }) {
  const styles = {
    W: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    L: 'bg-blood-500/15 text-blood-400 border-blood-500/30',
    D: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30',
    NC: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30',
  }
  if (!outcome) return null
  return (
    <span className={`inline-grid h-7 min-w-7 place-items-center rounded-md border px-1.5 font-display text-sm font-bold ${styles[outcome]}`}>
      {outcome}
    </span>
  )
}
