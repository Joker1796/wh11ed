// A page that reloads itself over and over (a player's iPhone, 2026-10-15: a white flash every
// couple of seconds on /changelog, in Safari and in the installed app alike, and nothing on the
// screen could be tapped in time to stop it). Two things in the app reload the page on their own —
// applying a new service worker (UpdateToast.vue, through vite-plugin-pwa) and recovering from a
// chunk that would not load (staleChunks.js) — and the second has a 30-second guard while the
// first had none. The cause on that phone was never seen; this is the net under every cause.
//
// Every start of the app is noted. Three starts within 20 seconds is not a reader: the app stops
// reloading itself for ten minutes — no update is applied, no chunk is retried by reload — and the
// build it is already on keeps running. One error goes to the error log, with what the service
// worker looked like, so the next one can be traced to its root. Per device (localStorage), so it
// holds across the reloads it is there to stop; a reader pressing refresh three times quickly
// costs nothing but an update that waits ten minutes.
import { getItem, setItem } from './safeStorage.js'

const BOOTS_KEY = 'wh11ed-boots'
const HOLD_KEY = 'wh11ed-reload-hold'
const TRAIL_KEY = 'wh11ed-reload-trail'
const SW_RELOAD_KEY = 'wh11ed-sw-reload-at'
/** A new service worker reloads the page at most once in this long (swReload). */
export const SW_RELOAD_FLOOR_MS = 30 * 1000
export const LOOP_WINDOW_MS = 20 * 1000
export const LOOP_BOOTS = 3
export const HOLD_MS = 10 * 60 * 1000

const readNum = (k) => Number(getItem(k)) || 0

/**
 * Notes a start of the app. Returns true when this start completes a loop (and the hold begins).
 *
 * A loop is three starts in the window AND one of the app's own reloads among them (the trail).
 * Without that second half it caught readers, not loops (2026-10-16, six reports from 2.9.2): an
 * installed iPhone app is dropped from memory almost at once, so switching to it and back is a new
 * start; a tab is refreshed by hand or opened from three links. Only the app reloading itself can
 * be held back, so only that is worth catching.
 */
export function noteBoot(now = Date.now()) {
  let boots = []
  try { boots = JSON.parse(getItem(BOOTS_KEY) || '[]').filter((t) => typeof t === 'number' && now - t < LOOP_WINDOW_MS) } catch { /* a bad value starts over */ }
  boots.push(now)
  setItem(BOOTS_KEY, JSON.stringify(boots))
  if (boots.length < LOOP_BOOTS || reloadsHeld(now) || !ownReloadWithin(now, LOOP_WINDOW_MS)) return false
  setItem(HOLD_KEY, String(now + HOLD_MS))
  return true
}

/** While true, nothing in the app reloads the page by itself. */
export function reloadsHeld(now = Date.now()) {
  return readNum(HOLD_KEY) > now
}

// The trail: the last few reloads the app asked for itself, with what the worker looked like —
// the loop report carries it, so the next one says WHO kept reloading (the first two, 2026-10-15,
// could only say how the worker stood at the third start).
const swState = () => {
  const sw = typeof navigator !== 'undefined' ? navigator.serviceWorker : null
  return sw ? (sw.controller ? 'ctl' : 'no-ctl') : 'no-sw'
}
function ownReloadWithin(now, ms) {
  try {
    // Not a reload asked for and refused, nor one the reader asked for with the plate's button.
    return JSON.parse(getItem(TRAIL_KEY) || '[]').some((e) => e.r !== 'sw-skipped' && e.r !== 'user' && now - e.t < ms)
  } catch { return false }
}
export function noteReload(reason, now = Date.now()) {
  let trail = []
  try { trail = JSON.parse(getItem(TRAIL_KEY) || '[]') } catch { /* starts over */ }
  trail.push({ t: now, r: reason, sw: swState() })
  setItem(TRAIL_KEY, JSON.stringify(trail.slice(-5)))
}
export function reloadTrail(now = Date.now()) {
  try {
    return JSON.parse(getItem(TRAIL_KEY) || '[]').map((e) => `${e.r}@-${((now - e.t) / 1000).toFixed(1)}s/${e.sw}`).join(', ')
  } catch { return '' }
}

/**
 * The reload vite-plugin-pwa asks for once a new worker controls the page (its `onNeedReload` —
 * given one, the plugin never reloads by itself; both of its reloads go through it, checked in the
 * built bundle). At most once per SW_RELOAD_FLOOR_MS, and never while a loop is held: a page
 * asked twice in a row stays on what it has — the new build reaches it on the next load anyway.
 * Returns whether it reloaded.
 */
export function swReload({ now = Date.now(), reload = () => window.location.reload() } = {}) {
  if (reloadsHeld(now) || now - (Number(getItem(SW_RELOAD_KEY)) || 0) < SW_RELOAD_FLOOR_MS) {
    noteReload('sw-skipped', now)
    return false
  }
  setItem(SW_RELOAD_KEY, String(now))
  noteReload('sw', now)
  reload()
  return true
}

/** What the error log is told when a loop is caught: enough to tell the two reloaders apart. */
export async function loopReport(version) {
  const sw = navigator.serviceWorker
  const reg = await sw?.getRegistration?.().catch(() => null)
  const state = (w) => (w ? w.state : '-')
  const standalone = window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true
  return `reload loop caught (${LOOP_BOOTS} starts in ${LOOP_WINDOW_MS / 1000}s) — v${version}, `
    + `${standalone ? 'installed' : 'tab'}, controller ${sw?.controller ? 'yes' : 'no'}, `
    + `sw active ${state(reg?.active)} / waiting ${state(reg?.waiting)} / installing ${state(reg?.installing)}, `
    + `path ${location.pathname}, trail [${reloadTrail()}]`
}
