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
export const LOOP_WINDOW_MS = 20 * 1000
export const LOOP_BOOTS = 3
export const HOLD_MS = 10 * 60 * 1000

const readNum = (k) => Number(getItem(k)) || 0

/** Notes a start of the app. Returns true when this start completes a loop (and the hold begins). */
export function noteBoot(now = Date.now()) {
  let boots = []
  try { boots = JSON.parse(getItem(BOOTS_KEY) || '[]').filter((t) => typeof t === 'number' && now - t < LOOP_WINDOW_MS) } catch { /* a bad value starts over */ }
  boots.push(now)
  setItem(BOOTS_KEY, JSON.stringify(boots))
  if (boots.length < LOOP_BOOTS || reloadsHeld(now)) return false
  setItem(HOLD_KEY, String(now + HOLD_MS))
  return true
}

/** While true, nothing in the app reloads the page by itself. */
export function reloadsHeld(now = Date.now()) {
  return readNum(HOLD_KEY) > now
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
    + `path ${location.pathname}`
}
