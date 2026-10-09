import { Link, useParams } from 'react-router-dom'
import BoutRow from '../components/BoutRow.jsx'
import { Countdown, EmptyState, StatTile } from '../components/ui.jsx'
import { EVENTS_BY_ID, eventStatus, getHeadlineStats } from '../data/index.js'
import { formatLongDate } from '../lib/dates.js'
import NotFound from './NotFound.jsx'

export default function EventDetail() {
  const { eventId } = useParams()
  const event = EVENTS_BY_ID[eventId]
  if (!event) return <NotFound what="event" />

  const status = eventStatus(event)
  const completed = status === 'completed'
  const stats = completed ? getHeadlineStats([event]) : null

  return (
    <div>
      <Link to={completed ? '/results' : '/upcoming'} className="mb-6 inline-block text-sm text-zinc-400 hover:text-white">
        ← {completed ? 'All results' : 'All upcoming events'}
      </Link>

      <header className="relative mb-8 overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-ink-850 to-ink-950 p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blood-500/15 blur-3xl" />
        <div className="relative">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className={`chip ${event.isPPV ? 'chip-gold' : ''}`}>{event.isPPV ? 'Numbered event' : 'Fight Night'}</span>
            {completed ? <span className="chip">Final results</span> : <Countdown date={event.date} />}
          </div>
          <h1 className="h-display text-3xl text-white sm:text-5xl">{event.name}</h1>
          <p className="mt-3 text-zinc-300">{formatLongDate(event.date)}</p>
          <p className="text-sm text-zinc-400">
            {event.venue ?? 'Venue TBA'} · {event.city}, {event.country}
            {event.attendance ? ` · Attendance ${event.attendance.toLocaleString()}` : ''}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {event.ufcstats && (
              <a href={event.ufcstats} target="_blank" rel="noreferrer" className="text-zinc-400 underline-offset-2 hover:text-white hover:underline">
                Source: ufcstats.com ↗
              </a>
            )}
            {event.wikipedia && (
              <a href={event.wikipedia} target="_blank" rel="noreferrer" className="text-zinc-400 underline-offset-2 hover:text-white hover:underline">
                Source: Wikipedia ↗
              </a>
            )}
          </div>
        </div>
      </header>

      {stats && (
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          <StatTile label="Bouts" value={stats.fights} />
          <StatTile label="KO / TKO" value={stats.koTko} accent />
          <StatTile label="Submissions" value={stats.submissions} />
          <StatTile label="Decisions" value={stats.decisions} />
          <StatTile label="Sig. strikes" value={stats.totalSigStrikes.toLocaleString()} sub="landed, all bouts" />
        </div>
      )}

      {status === 'awaiting-results' && (
        <p className="mb-6 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          This event has taken place, but its results aren't in this data snapshot yet.
        </p>
      )}

      <h2 className="h-display mb-4 text-2xl text-white">{completed ? 'Results' : 'Fight card'}</h2>
      {event.bouts.length ? (
        <div className="grid gap-3">
          {event.bouts.map((b) => (
            <BoutRow key={b.id} bout={b} />
          ))}
        </div>
      ) : (
        <EmptyState title="Fight card not yet announced">{event.note ?? 'Bouts will appear here once they are officially announced.'}</EmptyState>
      )}

      {!completed && event.bouts.length > 0 && (
        <p className="mt-4 text-xs text-zinc-500">
          Bouts listed in ufcstats.com card order; the first two are the main and co-main events. Cards are subject to change.
        </p>
      )}
    </div>
  )
}
