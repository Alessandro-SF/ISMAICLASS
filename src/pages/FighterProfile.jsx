import { Link, useParams } from 'react-router-dom'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Meter } from '../components/StatBar.jsx'
import { Countdown, FighterAvatar, FighterLink, NA, OutcomeBadge, inchesToFeet } from '../components/ui.jsx'
import { FIGHTERS_BY_SLUG, fighterAge } from '../data/index.js'
import { daysUntil, formatDate } from '../lib/dates.js'
import NotFound from './NotFound.jsx'

function Fact({ label, value }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5">
      <dt className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{label}</dt>
      <dd className="tabular mt-0.5 font-semibold text-white">{value ?? NA}</dd>
    </div>
  )
}

/** Normalises career stats to 0–100 against fixed reference ceilings so the radar is comparable across fighters. */
export function radarData(c) {
  if (!c) return []
  return [
    { stat: 'Strikes/min', value: Math.min(100, (c.slpm / 8) * 100), raw: c.slpm },
    { stat: 'Str. accuracy', value: c.strAcc, raw: `${c.strAcc}%` },
    { stat: 'Str. defense', value: c.strDef, raw: `${c.strDef}%` },
    { stat: 'TD/15 min', value: Math.min(100, (c.tdAvg / 6) * 100), raw: c.tdAvg },
    { stat: 'TD defense', value: c.tdDef, raw: `${c.tdDef}%` },
    { stat: 'Sub att/15', value: Math.min(100, (c.subAvg / 2.5) * 100), raw: c.subAvg },
  ]
}

function RadarTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload
  return (
    <div className="rounded-lg border border-white/10 bg-ink-850 px-3 py-2 text-xs">
      <p className="font-semibold text-white">{p.stat}</p>
      <p className="text-zinc-300">{p.raw}</p>
    </div>
  )
}

function FightLine({ a }) {
  const r = a.result
  return (
    <li className="flex items-center gap-3 border-b border-white/5 py-3 last:border-0">
      {a.outcome ? <OutcomeBadge outcome={a.outcome} /> : <span className="chip chip-red">Next</span>}
      <FighterAvatar slug={a.opponent.slug} name={a.opponent.name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          vs <FighterLink slug={a.opponent.slug} name={a.opponent.name} />
        </p>
        <p className="truncate text-xs text-zinc-400">
          <Link to={`/events/${a.eventId}`} className="hover:text-white hover:underline">
            {a.eventName}
          </Link>{' '}
          · {formatDate(a.date)}
        </p>
      </div>
      <div className="text-right text-xs">
        {r ? (
          <>
            <p className="font-semibold text-zinc-200">{r.methodLabel}</p>
            <p className="text-zinc-500">
              {r.detail ? `${r.detail} · ` : ''}R{r.round} {r.time}
            </p>
            {a.stats && (
              <p className="tabular text-zinc-500">
                {a.stats.sigStr} sig. str · {a.stats.td} TD
              </p>
            )}
          </>
        ) : (
          <Countdown date={a.date} compact />
        )}
      </div>
    </li>
  )
}

export default function FighterProfile() {
  const { slug } = useParams()
  const f = FIGHTERS_BY_SLUG[slug]
  if (!f) return <NotFound what="fighter" />

  const c = f.career
  const age = fighterAge(f)
  const upcoming = f.nextFight && daysUntil(f.nextFight.date) >= 0 ? f.nextFight : null
  const completed = f.appearances.filter((a) => a.result)
  const rec = f.record
  const total = rec ? rec.wins + rec.losses + rec.draws : 0

  return (
    <div>
      <Link to="/fighters" className="mb-6 inline-block text-sm text-zinc-400 hover:text-white">
        ← All fighters
      </Link>

      <header className="relative mb-8 overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-ink-850 to-ink-950">
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-blood-500/15 blur-3xl" />
        <div className="relative grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-end sm:p-10">
          <FighterAvatar slug={f.slug} name={f.name} size="xl" className="mx-auto h-36 w-36 sm:mx-0 sm:h-48 sm:w-48" />
          <div className="text-center sm:text-left">
            <p className="eyebrow">{f.weightClass ?? 'UFC fighter'}</p>
            <h1 className="h-display mt-1 text-4xl leading-none text-white sm:text-6xl">{f.name}</h1>
            {f.nickname && <p className="mt-2 text-lg italic text-zinc-300">“{f.nickname}”</p>}
            <p className="mt-2 text-sm text-zinc-400">
              {f.country ? `Born in ${f.birthplace ?? f.country}` : 'Country of birth not available'}
            </p>
            <div className="mt-4 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2 sm:justify-start">
              {rec ? (
                <>
                  <span className="tabular font-display text-4xl font-bold text-white">{rec.text.replace(/\s*\(.*\)/, '')}</span>
                  <span className="text-sm text-zinc-400">
                    <span className="font-semibold text-emerald-300">{rec.wins} W</span> ·{' '}
                    <span className="font-semibold text-blood-400">{rec.losses} L</span> ·{' '}
                    <span className="font-semibold text-zinc-300">{rec.draws} D</span>
                    {rec.nc ? ` · ${rec.nc} NC` : ''}
                  </span>
                </>
              ) : (
                <span className="text-sm text-zinc-500">Professional record not included in this dataset.</span>
              )}
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Link to={`/compare?a=${f.slug}`} className="btn-primary">
                Compare this fighter
              </Link>
              {f.ufcProfile && (
                <a href={f.ufcProfile} target="_blank" rel="noreferrer" className="btn-ghost">
                  ufc.com ↗
                </a>
              )}
              {f.ufcstatsProfile && (
                <a href={f.ufcstatsProfile} target="_blank" rel="noreferrer" className="btn-ghost">
                  ufcstats.com ↗
                </a>
              )}
            </div>
          </div>
        </div>
        {rec && total > 0 && (
          <div className="flex h-1.5 w-full">
            <div className="bg-emerald-400" style={{ width: `${(rec.wins / total) * 100}%` }} />
            <div className="bg-blood-500" style={{ width: `${(rec.losses / total) * 100}%` }} />
            <div className="bg-zinc-500" style={{ width: `${(rec.draws / total) * 100}%` }} />
          </div>
        )}
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card p-5">
          <h2 className="h-display mb-4 text-lg text-white">Physical attributes</h2>
          <dl className="grid grid-cols-2 gap-2">
            <Fact label="Age" value={age ?? NA} />
            <Fact label="Height" value={inchesToFeet(f.heightIn)} />
            <Fact label="Reach" value={f.reachIn ? `${f.reachIn}″` : NA} />
            <Fact label="Weight" value={f.weightLbs ? `${f.weightLbs} lbs` : NA} />
            <Fact label="Stance" value={f.stance} />
            <Fact label="Date of birth" value={f.dob ? formatDate(f.dob) : NA} />
          </dl>
        </section>

        <section className="card p-5">
          <h2 className="h-display mb-4 text-lg text-white">Striking</h2>
          {c ? (
            <div className="space-y-4">
              <Meter label="Sig. strikes landed / min" value={c.slpm} max={10} suffix="" digits={2} />
              <Meter label="Striking accuracy" value={c.strAcc} />
              <Meter label="Sig. strikes absorbed / min" value={c.sapm} max={10} suffix="" digits={2} />
              <Meter label="Striking defense" value={c.strDef} />
            </div>
          ) : (
            <p className="text-sm text-zinc-500">Career striking statistics are not included for this fighter.</p>
          )}
        </section>

        <section className="card p-5">
          <h2 className="h-display mb-4 text-lg text-white">Grappling</h2>
          {c ? (
            <div className="space-y-4">
              <Meter label="Takedowns / 15 min" value={c.tdAvg} max={8} suffix="" digits={2} />
              <Meter label="Takedown accuracy" value={c.tdAcc} />
              <Meter label="Takedown defense" value={c.tdDef} />
              <Meter label="Submission attempts / 15 min" value={c.subAvg} max={3} suffix="" digits={1} />
            </div>
          ) : (
            <p className="text-sm text-zinc-500">Career grappling statistics are not included for this fighter.</p>
          )}
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <section className="card p-5">
          <h2 className="h-display mb-2 text-lg text-white">Skill profile</h2>
          {c ? (
            <>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData(c)} outerRadius="72%">
                    <PolarGrid stroke="#34343d" />
                    <PolarAngleAxis dataKey="stat" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                    <Radar dataKey="value" stroke="#e11d2e" fill="#e11d2e" fillOpacity={0.35} />
                    <Tooltip content={<RadarTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[11px] text-zinc-500">
                Rates are scaled against fixed ceilings (8 strikes/min, 6 TD/15, 2.5 sub att/15); percentages are shown as-is.
              </p>
            </>
          ) : (
            <p className="text-sm text-zinc-500">Not available.</p>
          )}
        </section>

        <section className="card p-5">
          <h2 className="h-display mb-1 text-lg text-white">Fights</h2>
          {upcoming && (
            <div className="mb-3 rounded-xl border border-blood-500/30 bg-blood-500/10 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-blood-400">Upcoming fight</p>
              <p className="mt-1 font-semibold text-white">
                vs <FighterLink slug={upcoming.opponent.slug} name={upcoming.opponent.name} />
                {upcoming.title && <span className="ml-2 text-amber-300">★ Title fight</span>}
              </p>
              <p className="text-xs text-zinc-300">
                <Link to={`/events/${upcoming.eventId}`} className="hover:underline">
                  {upcoming.eventName}
                </Link>{' '}
                · {formatDate(upcoming.date)} · {upcoming.weightClass}
              </p>
            </div>
          )}
          {completed.length > 0 ? (
            <ul>
              {completed.map((a) => (
                <FightLine key={a.boutId} a={a} />
              ))}
            </ul>
          ) : f.previousFight ? (
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-sm">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Most recent fight (before tracked window)</p>
              <p className="mt-1 text-white">
                vs {f.previousFight.opponent} · {formatDate(f.previousFight.date)}
              </p>
              <p className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                {f.previousFight.result && <OutcomeBadge outcome={f.previousFight.result} />}
                {f.previousFight.result
                  ? f.previousFight.method
                  : 'Result and method not included in this snapshot. See the full record on ufcstats.com.'}
              </p>
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              No completed fights in the tracked window. Full fight history is available on{' '}
              {f.ufcstatsProfile ? (
                <a href={f.ufcstatsProfile} target="_blank" rel="noreferrer" className="text-blood-400 hover:underline">
                  ufcstats.com
                </a>
              ) : (
                'ufcstats.com'
              )}
              .
            </p>
          )}
        </section>
      </div>
    </div>
  )
}
