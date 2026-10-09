import EventCard from '../components/EventCard.jsx'
import { EmptyState, PageHeader } from '../components/ui.jsx'
import { getEventsInWindow, getLaterEvents } from '../data/index.js'

export default function Events() {
  const { upcoming } = getEventsInWindow()
  const later = getLaterEvents()
  return (
    <div>
      <PageHeader eyebrow="Fight schedule" title="Upcoming UFC events">
        Every scheduled UFC event in the next two months, with main and co-main events and a live countdown. Cards come from
        ufcstats.com and change frequently as bouts are added or cancelled.
      </PageHeader>
      {upcoming.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {upcoming.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <EmptyState title="No scheduled events in the next two months">
          The dataset doesn't include any announced UFC events in this window.
        </EmptyState>
      )}

      {later.length > 0 && (
        <section className="mt-12">
          <h2 className="h-display mb-1 text-xl text-white">Announced beyond the window</h2>
          <p className="mb-4 text-sm text-zinc-400">Scheduled after the two-month window but already announced.</p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {later.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
