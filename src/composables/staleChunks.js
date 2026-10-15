import { reloadsHeld } from './reloadLoop.js'

// A page from an older deploy asking for a chunk the server no longer has.
//
// Every route and most data are chunks, loaded the first time a reader goes there, by the name
// the build that is RUNNING gave them. A tab opened before a deploy keeps that build; until
// 2026-09-27 the deploy deleted the previous chunks outright, so its next click on a section it
// had not opened yet was a 404 and the navigation silently did nothing — "the top menu doesn't
// respond", cured only by clearing the site's data (a player on a desktop). deploy.sh now keeps
// old chunks for a month; this is the net under what is older than that, or anything else that
// makes a chunk fail: look for a newer build and reload into the page that was asked for.

// What each engine says when a dynamic import fails to fetch (Chromium, Firefox, Safari), and
// what Vite's preload helper says for a chunk's CSS.
const CHUNK_ERROR = /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS/i

export function isChunkLoadError(err) {
  return CHUNK_ERROR.test(String(err?.message ?? err ?? ''))
}

// One reload, not a loop: if the page that comes back STILL cannot load its chunk (the server
// is down, the reader is offline), the error stays an error and the next attempt waits.
const GUARD_KEY = 'wh-stale-chunk-reload'
const GUARD_MS = 30 * 1000
// How long a service worker that found a newer build gets to install it and reload the page
// itself (UpdateToast.vue applies a ready update at once) before we reload regardless.
const SW_GRACE_MS = 10 * 1000

let inFlight = false

function readGuard() {
  try { return Number(sessionStorage.getItem(GUARD_KEY)) || 0 } catch { return 0 }
}
function writeGuard(now) {
  try { sessionStorage.setItem(GUARD_KEY, String(now)) } catch { /* private mode: no guard, still one reload per failure */ }
}

// Returns true when a reload is on its way. `url` is where the reader was going.
export async function recoverFromStaleChunk(url, { now = Date.now(), reload = (u) => window.location.assign(u) } = {}) {
  // A page caught reloading itself in a loop does not reload again (reloadLoop.js).
  if (inFlight || !navigator.onLine || reloadsHeld(now)) return false
  if (now - readGuard() < GUARD_MS) return false
  inFlight = true
  writeGuard(now)
  // Under a service worker the page itself comes from its precache: reloading before the worker
  // has the new build would bring the same old page back. Ask it to look first; if it finds one,
  // UpdateToast reloads as soon as it is installed, and the timer is only the fallback. That
  // reload is of the CURRENT address, and the failed navigation never changed it — so the address
  // is set to where the reader was going first, or they land back on the page they clicked from.
  const reg = await navigator.serviceWorker?.getRegistration?.().catch(() => null)
  if (reg) {
    await reg.update().catch(() => {})
    if (reg.installing || reg.waiting) {
      try { history.replaceState(history.state, '', url) } catch { /* another origin: stay put */ }
      setTimeout(() => reload(url), SW_GRACE_MS)
      return true
    }
  }
  reload(url)
  return true
}

export function installStaleChunkRecovery(router) {
  // A route component that failed to load: go to that route, fresh.
  router.onError((err, to) => {
    if (isChunkLoadError(err)) recoverFromStaleChunk(router.resolve(to).href)
  })
  // Any other lazy import (data files, the search index): stay where the reader is. A route's
  // own chunk raises this too, and first — one task later, so the router's handler above has
  // claimed it with the address the reader was actually going to.
  window.addEventListener('vite:preloadError', () => {
    setTimeout(() => recoverFromStaleChunk(window.location.href), 0)
  })
}

// Tests only.
export function _resetStaleChunks() { inFlight = false }
