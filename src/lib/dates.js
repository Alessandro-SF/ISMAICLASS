// Date helpers. All event dates are stored as ISO calendar dates (YYYY-MM-DD) and
// compared as local calendar days so "days until" is stable regardless of time zone.

const DAY_MS = 24 * 60 * 60 * 1000

/** Reference "today". Defaults to the real current date; `?today=YYYY-MM-DD` overrides it (handy for demos). */
export function getToday() {
  if (typeof window !== 'undefined') {
    const override = new URLSearchParams(window.location.search).get('today')
    if (override && /^\d{4}-\d{2}-\d{2}$/.test(override)) return parseISODate(override)
  }
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function parseISODate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function toISODate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addMonths(date, months) {
  const result = new Date(date.getFullYear(), date.getMonth() + months, date.getDate())
  // Clamp overflow (e.g. Dec 31 + 2 months -> last day of Feb) to the end of the target month.
  if (result.getDate() !== date.getDate()) result.setDate(0)
  return result
}

/** Whole calendar days from `from` to the ISO date (negative when in the past). */
export function daysUntil(iso, from = getToday()) {
  return Math.round((parseISODate(iso) - from) / DAY_MS)
}

/** The rolling window shown by the app: two months back to two months ahead of today. */
export function getWindow(today = getToday()) {
  return { start: addMonths(today, -2), end: addMonths(today, 2), today }
}

export function formatDate(iso, opts = { month: 'short', day: 'numeric', year: 'numeric' }) {
  return parseISODate(iso).toLocaleDateString('en-US', opts)
}

export function formatLongDate(iso) {
  return formatDate(iso, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

export function ageOn(dobIso, on = getToday()) {
  if (!dobIso) return null
  const dob = parseISODate(dobIso)
  let age = on.getFullYear() - dob.getFullYear()
  const beforeBirthday =
    on.getMonth() < dob.getMonth() || (on.getMonth() === dob.getMonth() && on.getDate() < dob.getDate())
  if (beforeBirthday) age -= 1
  return age
}
