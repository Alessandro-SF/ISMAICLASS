// Data layer: parses the transcribed source files into the shapes the UI uses.
// Nothing here generates data — every value comes from the raw files, and missing values stay null.

import { PAST_EVENTS_RAW } from './raw/pastEvents.js'
import { UPCOMING_EVENTS_RAW } from './raw/upcomingEvents.js'
import { FIGHTER_STATS_RAW } from './raw/fighterStats.js'
import { FIGHTER_BIOS_RAW } from './raw/fighterBios.js'
import { ageOn, daysUntil, getToday, getWindow, parseISODate } from '../lib/dates.js'

export const DATA_RETRIEVED = '2026-10-09'

export function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’.]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const num = (v) => (v === undefined || v === '' ? null : Number(v))

const METHOD_LABELS = {
  'U-DEC': 'Decision (Unanimous)',
  'S-DEC': 'Decision (Split)',
  'M-DEC': 'Decision (Majority)',
  'KO/TKO': 'KO/TKO',
  SUB: 'Submission',
  DQ: 'Disqualification',
  'Overturned': 'Overturned',
  CNC: 'Could Not Continue',
}

export function methodCategory(method) {
  if (!method) return null
  if (method.includes('DEC')) return 'Decision'
  if (method === 'KO/TKO') return 'KO/TKO'
  if (method === 'SUB') return 'Submission'
  return 'Other'
}

function boutLabel(index) {
  if (index === 0) return 'Main Event'
  if (index === 1) return 'Co-Main Event'
  return null
}

function lines(block) {
  return block
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

function pair(value) {
  const [a, b] = value.split('-').map(Number)
  return [a, b]
}

function parsePastBout(line, index, eventId) {
  const [result, a, b, kd, sig, td, sub, weightClass, title, bonus, method, detail, round, time] = line.split('|')
  const [kdA, kdB] = pair(kd)
  const [sigA, sigB] = pair(sig)
  const [tdA, tdB] = pair(td)
  const [subA, subB] = pair(sub)
  const winner = result === 'W' ? 'red' : result === 'D' ? 'draw' : 'nc'
  return {
    id: `${eventId}-${index + 1}`,
    order: index + 1,
    label: boutLabel(index),
    weightClass,
    title: title === 'T',
    bonus: bonus === 'F' ? 'Fight of the Night' : bonus === 'P' ? 'Performance of the Night' : null,
    red: { name: a, slug: slugify(a) },
    blue: { name: b, slug: slugify(b) },
    result: {
      winner,
      method,
      methodLabel: METHOD_LABELS[method] ?? method,
      methodCategory: methodCategory(method),
      detail: detail || null,
      round: num(round),
      time: time || null,
    },
    stats: {
      red: { kd: kdA, sigStr: sigA, td: tdA, subAtt: subA },
      blue: { kd: kdB, sigStr: sigB, td: tdB, subAtt: subB },
    },
  }
}

function parseUpcomingBout(line, index, eventId) {
  const [a, b, weightClass, title] = line.split('|')
  return {
    id: `${eventId}-${index + 1}`,
    order: index + 1,
    label: boutLabel(index),
    weightClass,
    title: title === 'T',
    bonus: null,
    red: { name: a, slug: slugify(a) },
    blue: { name: b, slug: slugify(b) },
    result: null,
    stats: null,
  }
}

function buildEvent(raw, completed) {
  const bouts = lines(raw.bouts).map((l, i) =>
    completed ? parsePastBout(l, i, raw.id) : parseUpcomingBout(l, i, raw.id),
  )
  return {
    ...raw,
    bouts,
    completed,
    isPPV: /^UFC \d+/.test(raw.name),
    mainEvent: bouts[0] ?? null,
    coMainEvent: bouts[1] ?? null,
  }
}

export const EVENTS = [
  ...PAST_EVENTS_RAW.map((e) => buildEvent(e, true)),
  ...UPCOMING_EVENTS_RAW.map((e) => buildEvent(e, false)),
].sort((x, y) => x.date.localeCompare(y.date))

export const EVENTS_BY_ID = Object.fromEntries(EVENTS.map((e) => [e.id, e]))

// ---------------------------------------------------------------------------
// Fighters

function parseHeight(h) {
  if (!h) return null
  const m = h.match(/(\d+)'(\d+)/)
  return m ? Number(m[1]) * 12 + Number(m[2]) : null
}

function parseRecord(rec) {
  if (!rec) return null
  const m = rec.match(/(\d+)-(\d+)-(\d+)(?:\s*\((\d+) NC\))?/)
  if (!m) return null
  return { wins: +m[1], losses: +m[2], draws: +m[3], nc: m[4] ? +m[4] : 0, text: rec }
}

const STATS = {}
for (const line of lines(FIGHTER_STATS_RAW)) {
  const [ufcstatsId, name, record, height, weight, reach, stance, dob, slpm, strAcc, sapm, strDef, tdAvg, tdAcc, tdDef, subAvg] =
    line.split('|')
  STATS[slugify(name)] = {
    ufcstatsId,
    name,
    record: parseRecord(record),
    heightIn: parseHeight(height),
    weightLbs: num(weight),
    reachIn: num(reach),
    stance: stance || null,
    dob: dob || null,
    career: {
      slpm: num(slpm),
      strAcc: num(strAcc),
      sapm: num(sapm),
      strDef: num(strDef),
      tdAvg: num(tdAvg),
      tdAcc: num(tdAcc),
      tdDef: num(tdDef),
      subAvg: num(subAvg),
    },
  }
}

const BIOS = {}
for (const line of lines(FIGHTER_BIOS_RAW)) {
  const [name, nickname, birthplace, country, image, ufcSlug, prevFight] = line.split('|')
  let previousFight = null
  if (prevFight) {
    const [opponent, date, result, method] = prevFight.split(';')
    previousFight = { opponent, date, result: result || null, method: method || null }
  }
  BIOS[slugify(name)] = {
    nickname: nickname || null,
    birthplace: birthplace || null,
    country: country || null,
    image: image || null,
    ufcSlug: ufcSlug || null,
    previousFight,
  }
}

function addAppearance(map, corner, opponent, bout, event) {
  const slug = corner.slug
  if (!map[slug]) map[slug] = { slug, name: corner.name, appearances: [] }
  let outcome = null
  if (bout.result) {
    const isRed = bout.red.slug === slug
    if (bout.result.winner === 'draw') outcome = 'D'
    else if (bout.result.winner === 'nc') outcome = 'NC'
    else outcome = (bout.result.winner === 'red') === isRed ? 'W' : 'L'
  }
  map[slug].appearances.push({
    eventId: event.id,
    eventName: event.name,
    date: event.date,
    boutId: bout.id,
    opponent,
    weightClass: bout.weightClass,
    title: bout.title,
    label: bout.label,
    outcome,
    result: bout.result,
    stats: bout.stats ? (bout.red.slug === slug ? bout.stats.red : bout.stats.blue) : null,
    opponentStats: bout.stats ? (bout.red.slug === slug ? bout.stats.blue : bout.stats.red) : null,
  })
}

const fighterMap = {}
for (const event of EVENTS) {
  for (const bout of event.bouts) {
    addAppearance(fighterMap, bout.red, bout.blue, bout, event)
    addAppearance(fighterMap, bout.blue, bout.red, bout, event)
  }
}

export const FIGHTERS = Object.values(fighterMap)
  .map((f) => {
    const stats = STATS[f.slug] ?? null
    const bio = BIOS[f.slug] ?? null
    const appearances = f.appearances.sort((a, b) => b.date.localeCompare(a.date))
    const completed = appearances.filter((a) => a.result)
    const scheduled = appearances.filter((a) => !a.result).sort((a, b) => a.date.localeCompare(b.date))
    const latestWeightClass = appearances[0]?.weightClass ?? null
    return {
      slug: f.slug,
      name: stats?.name ?? f.name,
      nickname: bio?.nickname ?? null,
      country: bio?.country ?? null,
      birthplace: bio?.birthplace ?? null,
      image: bio?.image ?? null,
      ufcProfile: bio?.ufcSlug ? `https://www.ufc.com/athlete/${bio.ufcSlug}` : null,
      ufcstatsProfile: stats ? `http://ufcstats.com/fighter-details/${stats.ufcstatsId}` : null,
      weightClass: latestWeightClass,
      record: stats?.record ?? null,
      heightIn: stats?.heightIn ?? null,
      reachIn: stats?.reachIn ?? null,
      weightLbs: stats?.weightLbs ?? null,
      stance: stats?.stance ?? null,
      dob: stats?.dob ?? null,
      career: stats?.career ?? null,
      hasProfile: Boolean(stats),
      appearances,
      lastFight: completed[0] ?? null,
      previousFight: bio?.previousFight ?? null,
      nextFight: scheduled[0] ?? null,
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

export const FIGHTERS_BY_SLUG = Object.fromEntries(FIGHTERS.map((f) => [f.slug, f]))

export function fighterAge(fighter, today = getToday()) {
  return ageOn(fighter?.dob, today)
}

// ---------------------------------------------------------------------------
// Window-aware selectors (dynamic, based on today's date)

export function eventStatus(event, today = getToday()) {
  if (event.completed) return 'completed'
  const d = daysUntil(event.date, today)
  if (d < 0) return 'awaiting-results'
  if (d === 0) return 'today'
  return 'upcoming'
}

export function getEventsInWindow(today = getToday()) {
  const { start, end } = getWindow(today)
  const inWindow = EVENTS.filter((e) => {
    const d = parseISODate(e.date)
    return d >= start && d <= end
  })
  const past = inWindow.filter((e) => eventStatus(e, today) === 'completed' || eventStatus(e, today) === 'awaiting-results')
  const upcoming = inWindow.filter((e) => ['upcoming', 'today'].includes(eventStatus(e, today)))
  return {
    past: past.sort((a, b) => b.date.localeCompare(a.date)),
    upcoming: upcoming.sort((a, b) => a.date.localeCompare(b.date)),
  }
}

/** Scheduled events after the window (shown separately so the user still sees them). */
export function getLaterEvents(today = getToday()) {
  const { end } = getWindow(today)
  return EVENTS.filter((e) => !e.completed && parseISODate(e.date) > end)
}

export function getHeadlineStats(events) {
  const bouts = events.flatMap((e) => e.bouts.filter((b) => b.result))
  const by = (cat) => bouts.filter((b) => b.result.methodCategory === cat).length
  const totalSig = bouts.reduce((s, b) => s + b.stats.red.sigStr + b.stats.blue.sigStr, 0)
  const totalTd = bouts.reduce((s, b) => s + b.stats.red.td + b.stats.blue.td, 0)
  const firstRound = bouts.filter((b) => b.result.round === 1 && b.result.methodCategory !== 'Decision').length
  const titleFights = bouts.filter((b) => b.title).length
  return {
    fights: bouts.length,
    koTko: by('KO/TKO'),
    submissions: by('Submission'),
    decisions: by('Decision'),
    other: by('Other'),
    finishRate: bouts.length ? Math.round(((by('KO/TKO') + by('Submission')) / bouts.length) * 100) : 0,
    totalSigStrikes: totalSig,
    totalTakedowns: totalTd,
    firstRoundFinishes: firstRound,
    titleFights,
  }
}

export function getFeaturedFighters() {
  // Fighters headlining or co-headlining events in the window who have full profiles.
  const { past, upcoming } = getEventsInWindow()
  const slugs = []
  for (const e of [...upcoming, ...past]) {
    for (const b of [e.mainEvent, e.coMainEvent].filter(Boolean)) {
      for (const s of [b.red.slug, b.blue.slug]) if (!slugs.includes(s)) slugs.push(s)
    }
  }
  return slugs.map((s) => FIGHTERS_BY_SLUG[s]).filter((f) => f?.hasProfile)
}

export const WEIGHT_CLASSES = [
  'Heavyweight',
  'Light Heavyweight',
  'Middleweight',
  'Welterweight',
  'Lightweight',
  'Featherweight',
  'Bantamweight',
  'Flyweight',
  "Women's Bantamweight",
  "Women's Flyweight",
  "Women's Strawweight",
  'Catch Weight',
]
