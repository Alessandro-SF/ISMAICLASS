// Data integrity and date-window tests (run with `npm test`).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  EVENTS,
  FIGHTERS,
  FIGHTERS_BY_SLUG,
  eventStatus,
  getEventsInWindow,
  getHeadlineStats,
  getLaterEvents,
  slugify,
} from '../src/data/index.js'
import { addMonths, daysUntil, getWindow, parseISODate } from '../src/lib/dates.js'

const REF = parseISODate('2026-10-08')

test('every completed bout has a valid result and stats', () => {
  for (const e of EVENTS.filter((x) => x.completed)) {
    assert.ok(e.bouts.length > 0, `${e.name} has bouts`)
    for (const b of e.bouts) {
      assert.ok(['red', 'blue', 'draw', 'nc'].includes(b.result.winner), `${b.id} winner`)
      assert.ok(b.result.method, `${b.id} method`)
      assert.ok(Number.isInteger(b.result.round) && b.result.round >= 1 && b.result.round <= 5, `${b.id} round`)
      assert.match(b.result.time, /^\d:\d{2}$/, `${b.id} time`)
      for (const side of ['red', 'blue']) {
        for (const k of ['kd', 'sigStr', 'td', 'subAtt']) {
          assert.ok(Number.isInteger(b.stats[side][k]) && b.stats[side][k] >= 0, `${b.id} ${side}.${k}`)
        }
      }
      if (b.result.methodCategory === 'Decision') assert.equal(b.result.time, '5:00', `${b.id} decision goes the distance`)
    }
  }
})

test('upcoming bouts have no results', () => {
  for (const e of EVENTS.filter((x) => !x.completed)) {
    for (const b of e.bouts) assert.equal(b.result, null)
  }
})

test('event ids are unique and dates are ISO', () => {
  const ids = new Set(EVENTS.map((e) => e.id))
  assert.equal(ids.size, EVENTS.length)
  for (const e of EVENTS) assert.match(e.date, /^\d{4}-\d{2}-\d{2}$/)
})

test('window for Oct 8 2026 spans Aug 8 – Dec 8', () => {
  const { start, end } = getWindow(REF)
  assert.equal(start.toDateString(), parseISODate('2026-08-08').toDateString())
  assert.equal(end.toDateString(), parseISODate('2026-12-08').toDateString())
})

test('window split on the reference date', () => {
  const { past, upcoming } = getEventsInWindow(REF)
  assert.equal(past.length, 9)
  assert.equal(past[0].id, 'ufc-332')
  assert.equal(past.at(-1).id, 'ufc-fight-night-gamrot-vs-salkilld')
  assert.equal(upcoming[0].id, 'ufc-fight-night-allen-vs-duncan')
  assert.ok(upcoming.every((e) => daysUntil(e.date, REF) > 0))
  assert.ok(!upcoming.some((e) => e.id === 'ufc-335'), 'Dec 12 is outside the window')
  assert.ok(getLaterEvents(REF).some((e) => e.id === 'ufc-335'))
})

test('window is dynamic: later reference date moves events', () => {
  const later = parseISODate('2026-11-20')
  const { past, upcoming } = getEventsInWindow(later)
  assert.ok(!past.some((e) => e.id === 'ufc-fight-night-gamrot-vs-salkilld'), 'Aug 8 drops out of the window')
  assert.ok(upcoming.some((e) => e.id === 'ufc-335'), 'Dec 12 enters the window')
  // UFC 334 (Nov 14) is in the past relative to Nov 20 but has no results in the snapshot.
  assert.equal(eventStatus(EVENTS.find((e) => e.id === 'ufc-334'), later), 'awaiting-results')
  assert.ok(past.some((e) => e.id === 'ufc-334'))
})

test('addMonths clamps month ends', () => {
  assert.equal(addMonths(parseISODate('2026-12-31'), 2).toDateString(), parseISODate('2027-02-28').toDateString())
})

test('fighter appearances link back to real bouts', () => {
  const makh = FIGHTERS_BY_SLUG['islam-makhachev']
  assert.ok(makh?.hasProfile)
  assert.equal(makh.lastFight.outcome, 'W')
  assert.equal(makh.lastFight.opponent.name, 'Ian Machado Garry')
  assert.equal(FIGHTERS_BY_SLUG['ian-machado-garry'].lastFight.outcome, 'L')
  const volk = FIGHTERS_BY_SLUG['alexander-volkanovski']
  assert.equal(volk.nextFight.opponent.name, 'Movsar Evloev')
  assert.equal(volk.nextFight.title, true)
})

test('every main/co-main fighter has a full profile; nearly all have photos', () => {
  const headliners = []
  for (const e of EVENTS) {
    for (const b of [e.mainEvent, e.coMainEvent].filter(Boolean)) headliners.push(b.red, b.blue)
  }
  for (const c of headliners) assert.ok(FIGHTERS_BY_SLUG[c.slug]?.hasProfile, `${c.name} has ufcstats profile`)
  const withPhoto = headliners.filter((c) => FIGHTERS_BY_SLUG[c.slug].image).length
  // Joe Kropschot has no ufc.com athlete page; everyone else should.
  assert.ok(withPhoto >= headliners.length - 1, `${withPhoto}/${headliners.length} have photos`)
})

test('career percentages are within 0–100', () => {
  for (const f of FIGHTERS.filter((x) => x.career)) {
    for (const k of ['strAcc', 'strDef', 'tdAcc', 'tdDef']) {
      assert.ok(f.career[k] >= 0 && f.career[k] <= 100, `${f.name} ${k}`)
    }
  }
})

test('headline stats add up', () => {
  const { past } = getEventsInWindow(REF)
  const s = getHeadlineStats(past)
  assert.equal(s.koTko + s.submissions + s.decisions + s.other, s.fights)
})

test('slugify handles accents and punctuation', () => {
  assert.equal(slugify("Lone'er Kavanagh"), 'loneer-kavanagh')
  assert.equal(slugify('Raul Rosas Jr.'), 'raul-rosas-jr')
  assert.equal(slugify('Jiří Procházka'), 'jiri-prochazka')
})
