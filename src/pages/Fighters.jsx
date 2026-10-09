import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState, FighterAvatar, PageHeader } from '../components/ui.jsx'
import { FIGHTERS, WEIGHT_CLASSES } from '../data/index.js'
import { daysUntil, formatDate } from '../lib/dates.js'

function FighterCard({ f }) {
  const next = f.nextFight && daysUntil(f.nextFight.date) >= 0 ? f.nextFight : null
  return (
    <Link to={`/fighters/${f.slug}`} className="card card-hover flex gap-4 p-4">
      <FighterAvatar slug={f.slug} name={f.name} size="lg" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-lg font-semibold uppercase leading-tight text-white">{f.name}</p>
        {f.nickname && <p className="truncate text-xs italic text-zinc-400">“{f.nickname}”</p>}
        <p className="mt-1 text-xs text-zinc-400">
          {f.weightClass}
          {f.country ? ` · ${f.country}` : ''}
        </p>
        <p className="tabular mt-1 font-display text-lg font-bold text-zinc-200">{f.record?.text ?? <span className="text-sm font-normal text-zinc-500">Record N/A</span>}</p>
        {next ? (
          <p className="mt-1 truncate text-[11px] text-blood-400">
            Next: vs {next.opponent.name} · {formatDate(next.date, { month: 'short', day: 'numeric' })}
          </p>
        ) : f.lastFight ? (
          <p className="mt-1 truncate text-[11px] text-zinc-500">
            Last: {f.lastFight.outcome} vs {f.lastFight.opponent.name}
          </p>
        ) : null}
      </div>
    </Link>
  )
}

export default function Fighters() {
  const [query, setQuery] = useState('')
  const [weight, setWeight] = useState('All')
  const [scope, setScope] = useState('profiles')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FIGHTERS.filter((f) => {
      if (scope === 'profiles' && !f.hasProfile) return false
      if (weight !== 'All' && f.weightClass !== weight) return false
      if (q && !`${f.name} ${f.nickname ?? ''} ${f.country ?? ''}`.toLowerCase().includes(q)) return false
      return true
    }).sort((a, b) => Number(b.hasProfile) - Number(a.hasProfile) || a.name.localeCompare(b.name))
  }, [query, weight, scope])

  const profiled = FIGHTERS.filter((f) => f.hasProfile).length

  return (
    <div>
      <PageHeader eyebrow="Roster" title="Fighter profiles">
        {profiled} headline fighters have full profiles: record, physical attributes and career striking and grappling stats
        from ufcstats.com, plus bios and photos from ufc.com. The other {FIGHTERS.length - profiled} fighters who appear on
        tracked cards show their bouts from this period.
      </PageHeader>

      <div className="card mb-6 grid gap-3 p-4 md:grid-cols-[1fr_auto_auto]">
        <input
          className="input"
          type="search"
          placeholder="Search by name, nickname or country…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search fighters"
        />
        <select className="input md:w-56" value={weight} onChange={(e) => setWeight(e.target.value)} aria-label="Weight class">
          <option value="All">All weight classes</option>
          {WEIGHT_CLASSES.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
        <div className="flex rounded-lg border border-white/10 p-0.5" role="group" aria-label="Fighters to show">
          {[
            ['profiles', `Full profiles (${profiled})`],
            ['all', `All (${FIGHTERS.length})`],
          ].map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setScope(k)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                scope === k ? 'bg-blood-500 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {list.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((f) => (
            <FighterCard key={f.slug} f={f} />
          ))}
        </div>
      ) : (
        <EmptyState title="No fighters found">Try another name or switch to “All”.</EmptyState>
      )}
    </div>
  )
}
