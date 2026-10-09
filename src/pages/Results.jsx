import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BoutRow from '../components/BoutRow.jsx'
import { EmptyState, PageHeader } from '../components/ui.jsx'
import { WEIGHT_CLASSES, getEventsInWindow } from '../data/index.js'
import { formatDate } from '../lib/dates.js'

const METHODS = ['All', 'KO/TKO', 'Submission', 'Decision', 'Other']

export default function Results() {
  const { past } = getEventsInWindow()
  const [method, setMethod] = useState('All')
  const [weight, setWeight] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return past
      .map((e) => ({
        ...e,
        shown: e.bouts.filter((b) => {
          if (!b.result) return false
          if (method !== 'All' && b.result.methodCategory !== method) return false
          if (weight !== 'All' && b.weightClass !== weight) return false
          if (q && !`${b.red.name} ${b.blue.name}`.toLowerCase().includes(q)) return false
          return true
        }),
      }))
      .filter((e) => e.shown.length)
  }, [past, method, weight, query])

  const total = filtered.reduce((s, e) => s + e.shown.length, 0)
  const awaiting = past.filter((e) => !e.completed)

  return (
    <div>
      <PageHeader eyebrow="Previous two months" title="Fight results">
        Winner, method, round and time for every bout, with significant strikes, knockdowns, takedowns and submission
        attempts from the official ufcstats.com box scores.
      </PageHeader>

      <div className="card mb-6 grid gap-3 p-4 md:grid-cols-[1fr_auto_auto]">
        <input
          className="input"
          type="search"
          placeholder="Search a fighter…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search fighters"
        />
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by method">
          {METHODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                method === m ? 'bg-blood-500 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <select className="input md:w-56" value={weight} onChange={(e) => setWeight(e.target.value)} aria-label="Filter by weight class">
          <option value="All">All weight classes</option>
          {WEIGHT_CLASSES.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      {awaiting.length > 0 && (
        <p className="mb-4 text-sm text-amber-300">
          Results for {awaiting.map((e) => e.name).join(', ')} are not yet in this data snapshot.
        </p>
      )}

      <p className="mb-6 text-xs uppercase tracking-widest text-zinc-500">
        Showing <span className="tabular font-semibold text-zinc-300">{total}</span> bouts across{' '}
        <span className="tabular font-semibold text-zinc-300">{filtered.length}</span> events
      </p>

      {filtered.length === 0 ? (
        <EmptyState title="No bouts match these filters">Try a different method, weight class or name.</EmptyState>
      ) : (
        <div className="space-y-10">
          {filtered.map((e) => (
            <section key={e.id}>
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <Link to={`/events/${e.id}`} className="h-display text-xl text-white hover:text-blood-400">
                    {e.name}
                  </Link>
                  <p className="text-sm text-zinc-400">
                    {formatDate(e.date)} · {e.venue ? `${e.venue}, ` : ''}
                    {e.city}, {e.country}
                  </p>
                </div>
                <Link to={`/events/${e.id}`} className="text-xs font-semibold uppercase tracking-wider text-blood-400 hover:text-blood-500">
                  Event page →
                </Link>
              </div>
              <div className="grid gap-3 xl:grid-cols-2">
                {e.shown.map((b) => (
                  <BoutRow key={b.id} bout={b} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
