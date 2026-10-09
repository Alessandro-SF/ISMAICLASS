import { PageHeader } from '../components/ui.jsx'
import { DATA_RETRIEVED, EVENTS, FIGHTERS } from '../data/index.js'
import { formatDate } from '../lib/dates.js'

function Block({ title, children }) {
  return (
    <section className="card p-6">
      <h2 className="h-display mb-3 text-xl text-white">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-300">{children}</div>
    </section>
  )
}

export default function About() {
  const completed = EVENTS.filter((e) => e.completed)
  const bouts = completed.reduce((s, e) => s + e.bouts.length, 0)
  const profiled = FIGHTERS.filter((f) => f.hasProfile).length
  return (
    <div>
      <PageHeader eyebrow="Methodology" title="Data sources & limitations">
        Every result, statistic and matchup in this app comes from public sources. Nothing is generated or estimated, and
        anything a source doesn't provide is shown as “N/A”.
      </PageHeader>
      <div className="grid gap-6 lg:grid-cols-2">
        <Block title="Sources">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <a className="text-blood-400 hover:underline" href="http://ufcstats.com" target="_blank" rel="noreferrer">ufcstats.com</a>, the
              UFC's official statistics provider: fight results (winner, method, round, time), per-fight knockdowns, significant
              strikes, takedowns and submission attempts, upcoming fight cards, and fighter career stats (record, height, reach,
              stance, date of birth, SLpM, accuracy, defense, takedown and submission averages).
            </li>
            <li>
              <a className="text-blood-400 hover:underline" href="https://www.ufc.com/athletes" target="_blank" rel="noreferrer">ufc.com</a>{' '}
              athlete pages: nicknames, place of birth and official fighter photos (loaded directly from ufc.com).
            </li>
            <li>
              <a className="text-blood-400 hover:underline" href="https://en.wikipedia.org/wiki/2026_in_UFC" target="_blank" rel="noreferrer">
                Wikipedia, “2026 in UFC”
              </a>
              : event venues, attendance and scheduled events whose cards aren't on ufcstats.com yet.
            </li>
          </ul>
        </Block>
        <Block title="What's included">
          <p>
            Data snapshot taken on <strong className="text-white">{formatDate(DATA_RETRIEVED)}</strong>: {EVENTS.length} events (
            {completed.length} completed with {bouts} bouts of full results, {EVENTS.length - completed.length} scheduled),{' '}
            {FIGHTERS.length} fighters on those cards, and {profiled} full fighter profiles (every main- and co-main-event
            fighter).
          </p>
          <p>
            The app computes its window from today's date: events from two months before today to two months after.
            Events move from “Upcoming” to “Results” automatically once results are in the data. To preview another
            reference date, add <code className="rounded bg-white/10 px-1">?today=YYYY-MM-DD</code> to any URL.
          </p>
        </Block>
        <Block title="Limitations">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-white">No live API.</strong> There is no free, official, CORS-enabled UFC API, so the
              data is a verified snapshot bundled with the app. Fights after the snapshot date won't have results until the
              data is refreshed.
            </li>
            <li>
              <strong className="text-white">Cards change.</strong> Upcoming bouts reflect ufcstats.com as of the snapshot.
              Injuries and replacements happen often, and UFC Fight Night 295 (Riyadh, Nov 28) had no announced bouts or venue.
            </li>
            <li>
              <strong className="text-white">Profile coverage.</strong> Full career stats and photos cover the {profiled}{' '}
              headliners. Undercard fighters show their bouts and per-fight stats only, so their records show as “N/A”.
            </li>
            <li>
              <strong className="text-white">Country</strong> is the place of birth listed on ufc.com, which can differ from
              the country a fighter represents.
            </li>
            <li>
              <strong className="text-white">Bout order</strong> follows ufcstats.com card order. The first two bouts are
              labeled main and co-main event. Prelim splits aren't shown.
            </li>
            <li>
              <strong className="text-white">Career stats</strong> (e.g. TD defense 0%) are shown exactly as ufcstats.com
              reports them. Low values for newer fighters often mean small samples.
            </li>
          </ul>
        </Block>
        <Block title="Built with">
          <p>React 18, Vite, Tailwind CSS, Recharts and React Router. Deployed on Netlify from the GitHub main branch.</p>
          <p className="text-zinc-500">
            Independent educational project for an AI in Business course. Not affiliated with, sponsored or endorsed by the
            UFC or Zuffa LLC. Fighter photos © UFC.
          </p>
        </Block>
      </div>
    </div>
  )
}
