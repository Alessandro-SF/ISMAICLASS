import { FighterAvatar, FighterLink, RecordText } from './ui.jsx'

function StatPair({ label, a, b }) {
  const max = Math.max(a, b, 1)
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className={`tabular font-semibold ${a > b ? 'text-white' : 'text-zinc-400'}`}>{a}</span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{label}</span>
        <span className={`tabular font-semibold ${b > a ? 'text-white' : 'text-zinc-400'}`}>{b}</span>
      </div>
      <div className="flex h-1.5 gap-1">
        <div className="flex flex-1 justify-end overflow-hidden rounded-full bg-ink-700">
          <div className="h-full rounded-full bg-blood-500" style={{ width: `${(a / max) * 100}%` }} />
        </div>
        <div className="flex-1 overflow-hidden rounded-full bg-ink-700">
          <div className="h-full rounded-full bg-corner-blue" style={{ width: `${(b / max) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}

function Corner({ fighter, side, isWinner, isLoser }) {
  const align = side === 'red' ? 'flex-row text-left' : 'flex-row-reverse text-right'
  return (
    <div className={`flex min-w-0 flex-1 items-center gap-3 ${align}`}>
      <FighterAvatar slug={fighter.slug} name={fighter.name} size="md" corner={side} />
      <div className="min-w-0">
        <p className={`truncate font-display text-base font-semibold uppercase sm:text-lg ${isLoser ? 'text-zinc-500' : 'text-white'}`}>
          <FighterLink slug={fighter.slug} name={fighter.name} />
        </p>
        <p className="text-xs">
          <RecordText slug={fighter.slug} />
        </p>
        {isWinner && <span className="mt-1 inline-block rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-300">Winner</span>}
      </div>
    </div>
  )
}

export default function BoutRow({ bout, showStats = true }) {
  const r = bout.result
  const winner = r?.winner
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2 text-[11px] font-semibold uppercase tracking-widest">
        <span className="text-zinc-400">
          {bout.label ? <span className="mr-2 text-blood-400">{bout.label}</span> : <span className="mr-2 text-zinc-600">Bout {bout.order}</span>}
          {bout.weightClass}
        </span>
        <span className="flex flex-wrap gap-1.5">
          {bout.title && <span className="chip chip-gold">★ Championship</span>}
          {bout.bonus && <span className="chip chip-red">{bout.bonus}</span>}
        </span>
      </div>
      <div className="flex items-center gap-3 px-4 py-4">
        <Corner fighter={bout.red} side="red" isWinner={winner === 'red'} isLoser={winner === 'blue'} />
        <div className="shrink-0 px-1 text-center">
          <span className="font-display text-sm font-bold uppercase text-blood-500">vs</span>
        </div>
        <Corner fighter={bout.blue} side="blue" isWinner={winner === 'blue'} isLoser={winner === 'red'} />
      </div>
      {r && (
        <div className="grid gap-4 border-t border-white/5 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <dl className="grid grid-cols-3 gap-2 text-center sm:text-left">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Method</dt>
              <dd className="text-sm font-semibold text-white">{r.methodLabel}</dd>
              {r.detail && <dd className="text-xs text-zinc-400">{r.detail}</dd>}
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Round</dt>
              <dd className="tabular text-sm font-semibold text-white">{r.round ?? 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Time</dt>
              <dd className="tabular text-sm font-semibold text-white">{r.time ?? 'N/A'}</dd>
            </div>
          </dl>
          {showStats && bout.stats && (
            <div className="grid gap-2">
              <StatPair label="Sig. strikes" a={bout.stats.red.sigStr} b={bout.stats.blue.sigStr} />
              <div className="grid grid-cols-3 gap-3">
                <StatPair label="KD" a={bout.stats.red.kd} b={bout.stats.blue.kd} />
                <StatPair label="TD" a={bout.stats.red.td} b={bout.stats.blue.td} />
                <StatPair label="Sub att" a={bout.stats.red.subAtt} b={bout.stats.blue.subAtt} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
