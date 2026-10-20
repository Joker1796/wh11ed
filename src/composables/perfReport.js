// How the site performs on the phone it runs on, per screen, for the visitors who switched error
// sending on (useErrorLog's sendPerf — the same consent, the same POST /errors). Nothing about the
// visitor: a screen is its route PATTERN ("/roster/:id"), never an address.
//
// Per screen of a page session it keeps:
//   - inp    the slowest tap-to-paint (Event Timing: an entry with an interactionId), the number
//            Google calls INP for the whole page, here per screen;
//   - longN / longMs  the long tasks (>50 ms of main thread at once) while it was up;
//   - secs   how long it was up and visible.
// Sent when the page is hidden or closed, then forgotten. A browser without Event Timing and Long
// Tasks (Safari, Firefox) sends nothing: seconds alone say nothing about speed.
//
// Why at all: on 2026-10-20 the owner's Android showed an open card jumping with every letter the
// search box typed, and animations stuttering — found by eye, not by anything we measure.
import { LOCALE_SEGMENT } from '../router/locale.js'
import { sendPerf } from './useErrorLog.js'

const MIN_SECS = 1 // a screen passed through on the way somewhere says nothing

/** The route pattern of a resolved route, without the locale segment, safe for the server. */
export function screenOf(route) {
  const path = route?.matched?.at(-1)?.path || ''
  const bare = path.startsWith(LOCALE_SEGMENT) ? path.slice(LOCALE_SEGMENT.length) : path
  return (bare || '/').replace(/[^\w:/().|-]/g, '').slice(0, 120) || '/'
}

/**
 * Start measuring. `deps` are for the tests.
 * @param {import('vue-router').Router} router
 */
export function installPerfReport(router, deps = {}) {
  const PO = deps.PerformanceObserver ?? (typeof PerformanceObserver === 'undefined' ? null : PerformanceObserver)
  const types = PO?.supportedEntryTypes || []
  const hasEvents = types.includes('event')
  const hasLong = types.includes('longtask')
  if (!PO || (!hasEvents && !hasLong)) return null
  const now = deps.now ?? (() => performance.now())
  const send = deps.send ?? sendPerf
  const doc = deps.document ?? document

  const screens = new Map() // pattern → { inp, longN, longMs, ms }
  let current = null // the pattern on screen
  let since = doc.visibilityState === 'hidden' ? null : now() // visible since

  const stat = (route) => {
    if (!screens.has(route)) screens.set(route, { inp: 0, tapped: false, longN: 0, longMs: 0, ms: 0 })
    return screens.get(route)
  }
  function closeTime() {
    if (current && since != null) stat(current).ms += now() - since
    since = doc.visibilityState === 'hidden' ? null : now()
  }

  if (hasEvents) {
    new PO((list) => {
      if (!current) return
      const s = stat(current)
      for (const e of list.getEntries()) if (e.interactionId > 0 && e.duration > s.inp) s.inp = Math.round(e.duration)
    }).observe({ type: 'event', durationThreshold: 40, buffered: true })
  }
  if (hasLong) {
    new PO((list) => {
      if (!current) return
      const s = stat(current)
      for (const e of list.getEntries()) { s.longN++; s.longMs += Math.round(e.duration) }
    }).observe({ type: 'longtask', buffered: true })
  }

  // A screen nobody tapped has no tap-to-paint at all — sent as 0 it would count as a fast one.
  // Event Timing reports only taps slower than its threshold, so a tap is noticed here, and one that
  // never reached the threshold stays the 0 it honestly is.
  if (hasEvents) {
    const tapped = () => { if (current) stat(current).tapped = true }
    doc.addEventListener('pointerdown', tapped, { capture: true, passive: true })
    doc.addEventListener('keydown', tapped, { capture: true, passive: true })
  }

  function flush() {
    closeTime()
    const perf = [...screens].filter(([, s]) => s.ms >= MIN_SECS * 1000)
      .map(([route, s]) => ({ route, ...(s.tapped ? { inp: s.inp } : {}), longN: s.longN, longMs: s.longMs, secs: Math.round(s.ms / 1000) }))
      .sort((a, b) => b.secs - a.secs)
    screens.clear()
    if (perf.length) send(perf)
  }

  router.afterEach((to) => {
    closeTime()
    current = screenOf(to)
  })
  doc.addEventListener('visibilitychange', () => { if (doc.visibilityState === 'hidden') flush(); else since = now() })
  ;(deps.window ?? window).addEventListener('pagehide', flush)
  return { flush, screens }
}
