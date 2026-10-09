// Horizontal meters for percentage / rate stats. Missing values render as "N/A", never as zero.
import { NA } from './ui.jsx'

export function Meter({ label, value, max = 100, suffix = '%', hint, digits }) {
  const missing = value === null || value === undefined
  const pct = missing ? 0 : Math.min(100, (value / max) * 100)
  return (
    <div title={hint}>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{label}</span>
        <span className="tabular font-display text-lg font-bold text-white">
          {missing ? NA : `${digits !== undefined ? Number(value).toFixed(digits) : value}${suffix}`}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blood-600 to-blood-400 transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

/** Two-sided bar used on the comparison page. Higher-is-better unless `lowerIsBetter`. */
export function VersusBar({ label, a, b, suffix = '', digits, lowerIsBetter = false, max }) {
  const has = (v) => v !== null && v !== undefined
  const top = max ?? Math.max(has(a) ? a : 0, has(b) ? b : 0, 0.0001)
  const better = (x, y) => has(x) && has(y) && (lowerIsBetter ? x < y : x > y)
  const show = (v) => (has(v) ? `${digits !== undefined ? Number(v).toFixed(digits) : v}${suffix}` : NA)
  return (
    <div className="py-2">
      <div className="mb-1.5 grid grid-cols-[1fr_auto_1fr] items-baseline gap-3">
        <span className={`tabular text-left font-display text-lg font-bold ${better(a, b) ? 'text-blood-400' : 'text-zinc-300'}`}>{show(a)}</span>
        <span className="text-center text-[11px] font-semibold uppercase tracking-widest text-zinc-500">{label}</span>
        <span className={`tabular text-right font-display text-lg font-bold ${better(b, a) ? 'text-sky-400' : 'text-zinc-300'}`}>{show(b)}</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="flex h-2 justify-end overflow-hidden rounded-l-full bg-ink-700">
          <div className="h-full bg-blood-500 transition-[width] duration-700" style={{ width: `${has(a) ? (a / top) * 100 : 0}%` }} />
        </div>
        <div className="h-2 overflow-hidden rounded-r-full bg-ink-700">
          <div className="h-full bg-corner-blue transition-[width] duration-700" style={{ width: `${has(b) ? (b / top) * 100 : 0}%` }} />
        </div>
      </div>
    </div>
  )
}
