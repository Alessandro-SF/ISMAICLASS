import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Legend, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'
import { VersusBar } from '../components/StatBar.jsx'
import { FighterAvatar, NA, OutcomeBadge, PageHeader, inchesToFeet } from '../components/ui.jsx'
import { FIGHTERS, FIGHTERS_BY_SLUG, fighterAge } from '../data/index.js'
import { formatDate } from '../lib/dates.js'
import { radarData } from './FighterProfile.jsx'

const PROFILED = FIGHTERS.filter((f) => f.hasProfile)

function Picker({ label, value, onChange, exclude, corner }) {
  return (
    <label className="block">
      <span className={`mb-1 block text-[11px] font-semibold uppercase tracking-widest ${corner === 'red' ? 'text-blood-400' : 'text-sky-400'}`}>
        {label}
      </span>
      <select className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value || null)}>
        <option value="">Select a fighter…</option>
        {PROFILED.filter((f) => f.slug !== exclude).map((f) => (
          <option key={f.slug} value={f.slug}>
            {f.name} — {f.weightClass}
          </option>
        ))}
      </select>
    </label>
  )
}

function Corner({ f, corner }) {
  if (!f) {
    return (
      <div className="card grid h-full place-items-center p-6 text-center text-sm text-zinc-500">
        Pick a fighter to compare
      </div>
    )
  }
  return (
    <Link to={`/fighters/${f.slug}`} className={`card card-hover flex h-full flex-col items-center p-5 text-center ${corner === 'red' ? 'border-blood-500/30' : 'border-sky-500/30'}`}>
      <FighterAvatar slug={f.slug} name={f.name} size="xl" corner={corner} className="h-28 w-28 sm:h-36 sm:w-36" />
      <p className="h-display mt-3 text-xl text-white sm:text-2xl">{f.name}</p>
      {f.nickname && <p className="text-xs italic text-zinc-400">“{f.nickname}”</p>}
      <p className="mt-1 text-xs text-zinc-400">
        {f.weightClass}
        {f.country ? ` · ${f.country}` : ''}
      </p>
      <p className="tabular mt-2 font-display text-3xl font-bold text-white">{f.record?.text.replace(/\s*\(.*\)/, '') ?? NA}</p>
    </Link>
  )
}

function Group({ title, children }) {
  return (
    <section className="card p-5">
      <h2 className="h-display mb-2 text-lg text-white">{title}</h2>
      <div className="divide-y divide-white/5">{children}</div>
    </section>
  )
}

function RecentForm({ f, corner }) {
  const fights = f?.appearances.filter((a) => a.result) ?? []
  return (
    <div className={corner === 'blue' ? 'text-right' : ''}>
      <p className={`mb-2 text-xs font-semibold uppercase tracking-widest ${corner === 'red' ? 'text-blood-400' : 'text-sky-400'}`}>{f?.name ?? '—'}</p>
      {fights.length ? (
        <ul className="space-y-2">
          {fights.map((a) => (
            <li key={a.boutId} className={`flex items-center gap-2 text-sm ${corner === 'blue' ? 'flex-row-reverse' : ''}`}>
              <OutcomeBadge outcome={a.outcome} />
              <span className="min-w-0 truncate text-zinc-300">
                vs {a.opponent.name} · {a.result.methodLabel} R{a.result.round} · {formatDate(a.date, { month: 'short', day: 'numeric' })}
              </span>
            </li>
          ))}
        </ul>
      ) : f?.previousFight ? (
        <p className="text-sm text-zinc-400">
          Last fight: vs {f.previousFight.opponent}, {formatDate(f.previousFight.date)} (before the tracked window)
        </p>
      ) : (
        <p className="text-sm text-zinc-500">No fights in the tracked window.</p>
      )}
      {f?.nextFight && !f.nextFight.result && (
        <p className="mt-2 text-xs text-zinc-400">
          Next: vs {f.nextFight.opponent.name} · {formatDate(f.nextFight.date)}
        </p>
      )}
    </div>
  )
}

export default function Compare() {
  const [params, setParams] = useSearchParams()
  const aSlug = params.get('a')
  const bSlug = params.get('b')
  const a = FIGHTERS_BY_SLUG[aSlug]?.hasProfile ? FIGHTERS_BY_SLUG[aSlug] : null
  const b = FIGHTERS_BY_SLUG[bSlug]?.hasProfile ? FIGHTERS_BY_SLUG[bSlug] : null

  const set = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const radar = useMemo(() => {
    if (!a?.career || !b?.career) return []
    const ra = radarData(a.career)
    const rb = radarData(b.career)
    return ra.map((row, i) => ({ stat: row.stat, [a.name]: row.value, [b.name]: rb[i].value }))
  }, [a, b])

  const winPct = (f) => (f?.record ? Math.round((f.record.wins / Math.max(1, f.record.wins + f.record.losses + f.record.draws)) * 100) : null)
  const ca = a?.career ?? {}
  const cb = b?.career ?? {}

  const suggestions = [
    ['islam-makhachev', 'ian-machado-garry'],
    ['alexander-volkanovski', 'movsar-evloev'],
    ['petr-yan', 'merab-dvalishvili'],
    ['kayla-harrison', 'amanda-nunes'],
    ['ciryl-gane', 'josh-hokit'],
  ].filter(([x, y]) => FIGHTERS_BY_SLUG[x]?.hasProfile && FIGHTERS_BY_SLUG[y]?.hasProfile)

  return (
    <div>
      <PageHeader eyebrow="Head to head" title="Fighter comparison">
        Choose two fighters to compare records, striking, grappling, physical attributes and recent form. The higher value in
        each row is highlighted (lower is better for strikes absorbed).
      </PageHeader>

      <div className="card mb-4 grid gap-4 p-4 md:grid-cols-2">
        <Picker label="Red corner" value={aSlug} onChange={(v) => set('a', v)} exclude={bSlug} corner="red" />
        <Picker label="Blue corner" value={bSlug} onChange={(v) => set('b', v)} exclude={aSlug} corner="blue" />
      </div>

      {suggestions.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold uppercase tracking-widest text-zinc-500">Quick picks:</span>
          {suggestions.map(([x, y]) => (
            <button
              key={x + y}
              type="button"
              onClick={() => setParams({ a: x, b: y }, { replace: true })}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300 hover:border-blood-500/50 hover:text-white"
            >
              {FIGHTERS_BY_SLUG[x].name.split(' ').slice(-1)} vs {FIGHTERS_BY_SLUG[y].name.split(' ').slice(-1)}
            </button>
          ))}
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-6">
        <Corner f={a} corner="red" />
        <Corner f={b} corner="blue" />
      </div>

      {a && b ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Group title="Record">
            <VersusBar label="Wins" a={a.record?.wins} b={b.record?.wins} />
            <VersusBar label="Losses" a={a.record?.losses} b={b.record?.losses} lowerIsBetter />
            <VersusBar label="Draws" a={a.record?.draws} b={b.record?.draws} />
            <VersusBar label="Win %" a={winPct(a)} b={winPct(b)} suffix="%" max={100} />
          </Group>

          <Group title="Physical attributes">
            <VersusBar label="Height (in)" a={a.heightIn} b={b.heightIn} />
            <VersusBar label="Reach (in)" a={a.reachIn} b={b.reachIn} />
            <VersusBar label="Age" a={fighterAge(a)} b={fighterAge(b)} lowerIsBetter />
            <div className="grid grid-cols-[1fr_auto_1fr] gap-3 py-3 text-sm">
              <span className="text-zinc-200">
                {inchesToFeet(a.heightIn)} · {a.stance ?? NA}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Stance</span>
              <span className="text-right text-zinc-200">
                {b.stance ?? NA} · {inchesToFeet(b.heightIn)}
              </span>
            </div>
          </Group>

          <Group title="Striking">
            <VersusBar label="Sig. strikes / min" a={ca.slpm} b={cb.slpm} digits={2} />
            <VersusBar label="Striking accuracy" a={ca.strAcc} b={cb.strAcc} suffix="%" max={100} />
            <VersusBar label="Absorbed / min" a={ca.sapm} b={cb.sapm} digits={2} lowerIsBetter />
            <VersusBar label="Striking defense" a={ca.strDef} b={cb.strDef} suffix="%" max={100} />
          </Group>

          <Group title="Grappling">
            <VersusBar label="Takedowns / 15 min" a={ca.tdAvg} b={cb.tdAvg} digits={2} />
            <VersusBar label="Takedown accuracy" a={ca.tdAcc} b={cb.tdAcc} suffix="%" max={100} />
            <VersusBar label="Takedown defense" a={ca.tdDef} b={cb.tdDef} suffix="%" max={100} />
            <VersusBar label="Sub attempts / 15 min" a={ca.subAvg} b={cb.subAvg} digits={1} />
          </Group>

          <section className="card p-5">
            <h2 className="h-display mb-2 text-lg text-white">Skill overlay</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radar} outerRadius="70%">
                  <PolarGrid stroke="#34343d" />
                  <PolarAngleAxis dataKey="stat" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                  <Radar name={a.name} dataKey={a.name} stroke="#e11d2e" fill="#e11d2e" fillOpacity={0.3} />
                  <Radar name={b.name} dataKey={b.name} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }}
                    formatter={(v) => `${Math.round(v)}/100`}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-zinc-500">Scaled 0–100 using the same ceilings as fighter profiles.</p>
          </section>

          <section className="card p-5">
            <h2 className="h-display mb-4 text-lg text-white">Recent performance</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <RecentForm f={a} corner="red" />
              <RecentForm f={b} corner="blue" />
            </div>
          </section>
        </div>
      ) : (
        <p className="text-center text-sm text-zinc-500">Select two fighters above to see the side-by-side breakdown.</p>
      )}
    </div>
  )
}
