import { Link } from 'react-router-dom'
import { eventStatus } from '../data/index.js'
import { formatDate } from '../lib/dates.js'
import { Countdown, FighterAvatar } from './ui.jsx'

function Headliner({ bout, completed }) {
  if (!bout) return <p className="text-sm text-zinc-500">Fight card not yet announced.</p>
  const winner = completed ? bout.result?.winner : null
  const nameClass = (corner) =>
    winner && winner !== corner && ['red', 'blue'].includes(winner) ? 'text-zinc-500' : 'text-white'
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        <FighterAvatar slug={bout.red.slug} name={bout.red.name} size="md" corner="red" />
        <FighterAvatar slug={bout.blue.slug} name={bout.blue.name} size="md" corner="blue" />
      </div>
      <div className="min-w-0">
        <p className="truncate font-display text-lg font-semibold uppercase leading-tight">
          <span className={nameClass('red')}>{bout.red.name}</span>
          <span className="mx-1.5 text-blood-500">vs</span>
          <span className={nameClass('blue')}>{bout.blue.name}</span>
        </p>
        <p className="text-xs text-zinc-400">
          {bout.weightClass}
          {bout.title && <span className="ml-2 text-amber-300">★ Title fight</span>}
        </p>
        {completed && bout.result && (
          <p className="mt-0.5 text-xs text-zinc-300">
            <span className="font-semibold text-emerald-300">
              {bout.result.winner === 'red' ? bout.red.name : bout.result.winner === 'blue' ? bout.blue.name : 'No winner'}
            </span>{' '}
            · {bout.result.methodLabel}
            {bout.result.detail ? ` (${bout.result.detail})` : ''} · R{bout.result.round} {bout.result.time}
          </p>
        )}
      </div>
    </div>
  )
}

export default function EventCard({ event }) {
  const status = eventStatus(event)
  const completed = status === 'completed'
  return (
    <Link to={`/events/${event.id}`} className="card card-hover group block overflow-hidden">
      <div className={`h-1 w-full ${completed ? 'bg-zinc-700' : 'bg-gradient-to-r from-blood-600 via-blood-500 to-blood-400'}`} />
      <div className="p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`chip ${event.isPPV ? 'chip-gold' : ''}`}>{event.isPPV ? 'Numbered event' : 'Fight Night'}</span>
          {completed ? <span className="chip">Final</span> : <Countdown date={event.date} />}
        </div>
        <h3 className="h-display text-xl leading-tight text-white group-hover:text-blood-400">{event.name}</h3>
        <p className="mt-1 text-sm text-zinc-400">
          {formatDate(event.date, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          <span className="mx-1.5 text-zinc-600">•</span>
          {event.venue ? `${event.venue}, ` : ''}
          {event.city}, {event.country}
        </p>
        <div className="mt-4 border-t border-white/5 pt-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Main event</p>
          <Headliner bout={event.mainEvent} completed={completed} />
        </div>
        {event.coMainEvent && (
          <p className="mt-3 text-xs text-zinc-400">
            <span className="font-semibold uppercase tracking-wider text-zinc-500">Co-main:</span> {event.coMainEvent.red.name} vs{' '}
            {event.coMainEvent.blue.name} · {event.coMainEvent.weightClass}
          </p>
        )}
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-blood-400 opacity-80 group-hover:opacity-100">
          {event.bouts.length ? `View full card · ${event.bouts.length} bouts →` : 'View event →'}
        </p>
      </div>
    </Link>
  )
}
