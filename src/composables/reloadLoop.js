// A page that reloads itself over and over (a player's iPhone, 2026-10-15: a white flash every
// couple of seconds on /changelog, in Safari and in the installed app alike, and nothing on the
// screen could be tapped in time to stop it). Then two things in the app reloaded the page on their
// own — applying a new service worker and recovering from a chunk that would not load
// (staleChunks.js). Since 2026-10-18 a new worker taking over a page the reader did not ask to
// update no longer reloads it (UpdateToast.vue); what is left is the start opening a newer build
// (launchGate.js) and the chunk. The cause on that phone was never seen; this is the net under
// every cause.
//
// Every start of the app is noted. Three starts of ONE tab within 20 seconds, each coming right
// after a reload the app itself asked for in that tab, is not a reader: the app stops reloading
// itself for ten minutes — no update is applied, no chunk is retried by reload — and the build it
// is already on keeps running. One error goes to the error log, with what the service worker looked
// like, so the next one can be traced to its root. The hold is per device (localStorage): the
// worker it stops is one per device.
import { getItem, setItem } from './safeStorage.js'

const BOOTS_KEY = 'wh11ed-boots'
const HOLD_KEY = 'wh11ed-reload-hold'
const TRAIL_KEY = 'wh11ed-reload-trail'
// Which tab a start was (sessionStorage: survives a reload, not shared between tabs). Only this
// tab's own starts count: counted per device, three tabs restored at once looked like a loop
// (2026-10-18: every report since 2.9.5 had a reload into the new build a second before).
const TAB_KEY = 'wh11ed-tab'
// Set right before each reload the app asks for itself, taken by the start that follows it — in the
// same tab, since sessionStorage outlives a reload. A start without it is the reader's: a new tab, a
// link, F5 or a pull to refresh, the plate's button (2026-10-21: a launch reload followed by a press
// of Update, and a new tab beside two starts of another, were both reported as loops).
const OWN_KEY = 'wh11ed-own-reload'
// The version on the server when a worker was found installed and waiting (useAppUpdate.js): a worker
// does not say which build it carries, and the report wants to know what a start would apply.
const WAITING_KEY = 'wh11ed-waiting-version'
export const LOOP_WINDOW_MS = 20 * 1000
export const LOOP_BOOTS = 3
export const HOLD_MS = 10 * 60 * 1000

const readNum = (k) => Number(getItem(k)) || 0

function tabId() {
  try {
    let id = sessionStorage.getItem(TAB_KEY)
    if (!id) sessionStorage.setItem(TAB_KEY, id = Math.random().toString(36).slice(2, 6))
    return id
  } catch { return '?' }
}
// A start as stored: { t, tab, own }. A bare number is one from before the tab was noted.
const bootOf = (b) => (typeof b === 'number' ? { t: b, tab: '?' } : b)
const readBoots = (now) => {
  try {
    return JSON.parse(getItem(BOOTS_KEY) || '[]').map(bootOf).filter((b) => typeof b?.t === 'number' && now - b.t < LOOP_WINDOW_MS)
  } catch { return [] } // a bad value starts over
}
// Whether this start follows a reload the app asked for in this tab, within the window. Taken: the
// next start (F5 after it) is the reader's again.
function takeOwnReload(now) {
  try {
    const t = Number(sessionStorage.getItem(OWN_KEY)) || 0
    sessionStorage.removeItem(OWN_KEY)
    return t > 0 && now - t < LOOP_WINDOW_MS
  } catch { return false }
}

/**
 * Notes a start of the app. Returns true when this start completes a loop (and the hold begins).
 *
 * A loop is three starts of this tab in the window, each one right after a reload the app asked for
 * itself in it. Anything looser caught readers, not loops (2026-10-16, six reports from 2.9.2: an
 * installed iPhone app is dropped from memory almost at once, so switching to it and back is a new
 * start; a tab is refreshed by hand or opened from three links; 2026-10-21, two more — tabs beside
 * each other and the plate's button). Only the app reloading itself can be held back, so only that
 * is worth catching.
 */
export function noteBoot(now = Date.now()) {
  const tab = tabId()
  const boots = readBoots(now)
  boots.push({ t: now, tab, own: takeOwnReload(now) })
  setItem(BOOTS_KEY, JSON.stringify(boots))
  const own = boots.filter((b) => b.own && b.tab === tab).length
  if (own < LOOP_BOOTS || reloadsHeld(now)) return false
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
/**
 * Called right before every reload the app does: `reason` is who asked. 'user' is the reader's own
 * press (the plate's button, a link under it) — on the trail, but its start is not the app's.
 */
export function noteReload(reason, now = Date.now()) {
  try {
    if (reason === 'user') sessionStorage.removeItem(OWN_KEY)
    else sessionStorage.setItem(OWN_KEY, String(now))
  } catch { /* private mode: the start is not counted — no false loop */ }
  let trail = []
  try { trail = JSON.parse(getItem(TRAIL_KEY) || '[]') } catch { /* starts over */ }
  trail.push({ t: now, r: reason, sw: swState(), tab: tabId() })
  setItem(TRAIL_KEY, JSON.stringify(trail.slice(-5)))
}
export function reloadTrail(now = Date.now()) {
  try {
    return JSON.parse(getItem(TRAIL_KEY) || '[]').map((e) => `${e.r}@-${((now - e.t) / 1000).toFixed(1)}s/${e.sw}${e.tab ? `/${e.tab}` : ''}`).join(', ')
  } catch { return '' }
}

/** The starts in the window, oldest first: `tab@-Ns`, this tab marked `*`, one after our reload `!`. */
export function bootList(now = Date.now()) {
  const mine = tabId()
  return readBoots(now).map((b) => `${b.tab}${b.tab === mine ? '*' : ''}${b.own ? '!' : ''}@-${((now - b.t) / 1000).toFixed(1)}s`).join(', ')
}

export function noteWaitingVersion(version) {
  setItem(WAITING_KEY, version)
}

// How this page was loaded: 'navigate' (a link, a new tab), 'reload' (F5, location.reload()),
// 'back_forward', or '?' where the browser does not say.
function navigationType() {
  try { return performance.getEntriesByType('navigation')[0]?.type || '?' } catch { return '?' }
}

/** What the error log is told when a loop is caught: enough to tell the two reloaders apart. */
export async function loopReport(version) {
  const sw = navigator.serviceWorker
  const reg = await sw?.getRegistration?.().catch(() => null)
  const state = (w) => (w ? w.state : '-')
  const waitingVersion = reg?.waiting && getItem(WAITING_KEY)
  const standalone = window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true
  return `reload loop caught (${LOOP_BOOTS} starts in ${LOOP_WINDOW_MS / 1000}s) — v${version}, `
    + `${standalone ? 'installed' : 'tab'}, nav ${navigationType()}, controller ${sw?.controller ? 'yes' : 'no'}, `
    + `sw active ${state(reg?.active)} / waiting ${state(reg?.waiting)}${waitingVersion ? ` (v${waitingVersion} when found)` : ''} / installing ${state(reg?.installing)}, `
    + `path ${location.pathname}, starts [${bootList()}], trail [${reloadTrail()}]`
}
