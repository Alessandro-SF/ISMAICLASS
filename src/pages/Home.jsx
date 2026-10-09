import { Link } from 'react-router-dom'
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import EventCard from '../components/EventCard.jsx'
import { Countdown, EmptyState, FighterAvatar, SectionHeader, StatTile } from '../components/ui.jsx'
import { getEventsInWindow, getFeaturedFighters, getHeadlineStats } from '../data/index.js'
import { formatLongDate } from '../lib/dates.js'

const METHOD_COLORS = { 'KO/TKO': '#e11d2e', Submission: '#f59e0b', Decision: '#71717a', Other: '#3b82f6' }

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-white/10 bg-ink-850 px-3 py-2 text-xs shadow-xl">
      {label && <p className="mb-1 font-semibold text-white">{label}</p>}
      {payload.map((p) => (
        <p key={p.name} className="text-zinc-300">
          {p.name}: <span className="tabular font-semibold text-white">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

function Hero({ next }) {
  if (!next) return null
  const main = next.mainEvent
  return (
    <section className="relative mb-10 overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-ink-850 via-ink-900 to-ink-950">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blood-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[repeating-linear-gradient(135deg,transparent,transparent_18px,rgba(255,255,255,0.015)_18px,rgba(255,255,255,0.015)_36px)] md:block" />
      <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="chip chip-red">Next event</span>
            <Countdown date={next.date} />
          </div>
          <h1 className="h-display text-4xl leading-[1.05] text-white sm:text-5xl">{next.name}</h1>
          <p className="mt-3 text-sm text-zinc-400">
            {formatLongDate(next.date)} · {next.venue ? `${next.venue}, ` : ''}
            {next.city}, {next.country}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={`/events/${next.id}`} className="btn-primary">
              View fight card
            </Link>
            {main && (
              <Link to={`/compare?a=${main.red.slug}&b=${main.blue.slug}`} className="btn-ghost">
                Compare main event
              </Link>
            )}
          </div>
        </div>
        {main && (
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <Link to={`/fighters/${main.red.slug}`} className="group text-center">
              <FighterAvatar slug={main.red.slug} name={main.red.name} size="xl" corner="red" className="mx-auto h-28 w-28 sm:h-40 sm:w-40" />
              <p className="mt-3 font-display text-lg font-bold uppercase text-white group-hover:text-blood-400">{main.red.name}</p>
            </Link>
            <span className="font-display text-3xl font-bold text-blood-500">VS</span>
            <Link to={`/fighters/${main.blue.slug}`} className="group text-center">
              <FighterAvatar slug={main.blue.slug} name={main.blue.name} size="xl" corner="blue" className="mx-auto h-28 w-28 sm:h-40 sm:w-40" />
              <p className="mt-3 font-display text-lg font-bold uppercase text-white group-hover:text-blood-400">{main.blue.name}</p>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default function Home() {
  const { past, upcoming } = getEventsInWindow()
  const stats = getHeadlineStats(past)
  const featured = getFeaturedFighters().slice(0, 8)

  const methodData = [
    { name: 'KO/TKO', value: stats.koTko },
    { name: 'Submission', value: stats.submissions },
    { name: 'Decision', value: stats.decisions },
    { name: 'Other', value: stats.other },
  ].filter((d) => d.value > 0)

  const perEvent = [...past]
    .reverse()
    .map((e) => {
      const done = e.bouts.filter((b) => b.result)
      return {
        name: e.name.replace('UFC Fight Night: ', 'FN: ').replace(/^(UFC \d+):.*/, '$1'),
        Finishes: done.filter((b) => ['KO/TKO', 'Submission'].includes(b.result.methodCategory)).length,
        Decisions: done.filter((b) => b.result.methodCategory === 'Decision').length,
      }
    })

  return (
    <div>
      <Hero next={upcoming[0]} />

      <section className="mb-12">
        <SectionHeader eyebrow="Last two months" title="Quick stats">
          Aggregated from {past.length} completed events and {stats.fights} bouts (official ufcstats.com totals).
        </SectionHeader>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          <StatTile label="Bouts" value={stats.fights} sub={`${past.length} events`} />
          <StatTile label="Finish rate" value={`${stats.finishRate}%`} sub="KO/TKO + submission" accent />
          <StatTile label="KO / TKO" value={stats.koTko} />
          <StatTile label="Submissions" value={stats.submissions} />
          <StatTile label="Sig. strikes" value={stats.totalSigStrikes.toLocaleString()} sub="landed, all bouts" />
          <StatTile label="Takedowns" value={stats.totalTakedowns} sub={`${stats.titleFights} title fights`} />
        </div>
        {stats.fights > 0 && (
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_2fr]">
            <div className="card p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">How fights ended</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={methodData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2} stroke="none">
                      {methodData.map((d) => (
                        <Cell key={d.name} fill={METHOD_COLORS[d.name]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 grid grid-cols-2 gap-1 text-xs text-zinc-400">
                {methodData.map((d) => (
                  <li key={d.name} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: METHOD_COLORS[d.name] }} />
                    {d.name} <span className="tabular ml-auto font-semibold text-zinc-200">{d.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">Finishes vs decisions by event</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={perEvent} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={60} />
                    <YAxis allowDecimals={false} tick={{ fill: '#71717a', fontSize: 11 }} />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                    <Bar dataKey="Finishes" stackId="a" fill="#e11d2e" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Decisions" stackId="a" fill="#52525b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="mb-12">
        <SectionHeader
          eyebrow="Next two months"
          title="Upcoming events"
          action={
            <Link to="/upcoming" className="btn-ghost">
              All upcoming →
            </Link>
          }
        />
        {upcoming.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {upcoming.slice(0, 6).map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <EmptyState title="No scheduled events in the window">Check back once the UFC announces its next cards.</EmptyState>
        )}
      </section>

      <section className="mb-12">
        <SectionHeader
          eyebrow="Previous two months"
          title="Recent results"
          action={
            <Link to="/results" className="btn-ghost">
              All results →
            </Link>
          }
        />
        {past.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {past.slice(0, 6).map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <EmptyState title="No completed events in the window" />
        )}
      </section>

      <section>
        <SectionHeader
          eyebrow="Headliners"
          title="Featured fighters"
          action={
            <Link to="/fighters" className="btn-ghost">
              All fighters →
            </Link>
          }
        >
          Main- and co-main-event fighters from the current window.
        </SectionHeader>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((f) => (
            <Link key={f.slug} to={`/fighters/${f.slug}`} className="card card-hover flex items-center gap-3 p-4">
              <FighterAvatar slug={f.slug} name={f.name} size="md" />
              <div className="min-w-0">
                <p className="truncate font-display font-semibold uppercase text-white">{f.name}</p>
                <p className="truncate text-xs text-zinc-400">{f.weightClass}</p>
                <p className="tabular text-xs text-zinc-500">{f.record?.text ?? 'Record N/A'}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
