import { noteReload, reloadsHeld } from './reloadLoop.js'
import { withinDeadline } from '../utils/deadline.js'
import { navigationVersion } from './navigationState.js'

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
// How long a service worker that found a newer build gets to install it before we reload: the load
// that follows applies a worker already waiting before anything is drawn (launchGate.js).
const SW_GRACE_MS = 10 * 1000

let inFlight = false
// Imports importQuietly is waiting on (below): their failures are its to recover from.
let quietImports = 0
// A route's chunk the router's handler has already answered — by recovering, or by leaving it to the
// start (below); the preload listener, one task later, then has nothing to do.
let claimed = false
let listening = false
const recovery = { phase: 'idle', lastSkip: '', workerCheck: '', attempts: 0 }
export const chunkRecoveryState = () => ({ ...recovery })
const currentHref = () => typeof window === 'undefined' ? '' : window.location.href

function readGuard() {
  try { return Number(sessionStorage.getItem(GUARD_KEY)) || 0 } catch { return 0 }
}
function writeGuard(now) {
  try { sessionStorage.setItem(GUARD_KEY, String(now)) } catch { /* private mode: no guard, still one reload per failure */ }
}

// Returns true when a reload is on its way. `url` is where the reader was going.
export async function recoverFromStaleChunk(url, { now = Date.now(), reload = (u) => window.location.assign(u) } = {}) {
  const version = navigationVersion(), href = currentHref()
  const active = () => version === navigationVersion() && href === currentHref()
  const abandoned = () => {
    if (active()) return false
    inFlight = false
    recovery.phase = 'idle'
    recovery.lastSkip = 'navigation-changed'
    return true
  }
  // A page caught reloading itself in a loop does not reload again (reloadLoop.js).
  if (inFlight || !navigator.onLine || reloadsHeld(now)) {
    recovery.lastSkip = inFlight ? 'in-flight' : !navigator.onLine ? 'offline' : 'reload-hold'
    return false
  }
  if (now - readGuard() < GUARD_MS) { recovery.lastSkip = 'cooldown'; return false }
  inFlight = true
  recovery.attempts++
  recovery.phase = 'worker-check'
  recovery.lastSkip = ''
  writeGuard(now)
  // Under a service worker the page itself comes from its precache: reloading before the worker
  // has the new build would bring the same old page back. Ask it to look first; if it finds one,
  // reload once it has had time to install — the start applies it. With no worker (a tab, since
  // 2.9.5) there is no registration and the reload is at once. The original screen owns the
  // recovery only until another navigation starts, even if it later returns to the same URL.
  const reg = await withinDeadline(() => navigator.serviceWorker?.getRegistration?.(), 2000, 'Worker registration').catch(() => {
    recovery.workerCheck = 'registration-failed-or-timed-out'
    return null
  })
  if (abandoned()) return false
  if (reg) {
    await withinDeadline(() => reg.update(), 2000, 'Worker update').catch(() => { recovery.workerCheck = 'update-failed-or-timed-out' })
    if (abandoned()) return false
    if (reg.installing || reg.waiting) {
      recovery.phase = 'waiting-for-worker'
      setTimeout(() => { if (abandoned()) return; recovery.phase = 'reload-requested'; noteReload('chunk'); reload(url) }, SW_GRACE_MS)
      return true
    }
  }
  noteReload('chunk')
  recovery.phase = 'reload-requested'
  reload(url)
  return true
}

// Route outcomes belong to navigationState and never trigger a background reload. The first
// navigation may abandon an optional PWA resume, but an explicit destination keeps its error UI.
// Non-route data imports still use the bounded quiet retry below and the existing reload guard.
export function installStaleChunkRecovery(router) {
  // Route failures belong to the shell, including failures of abandoned navigations.
  router.onError((err) => {
    if (!isChunkLoadError(err)) return
    claimed = true
    // The shell owns route failures; a late import must never reload a newer route.
  })
  // Any other lazy import (data files, the search index): stay where the reader is. A route's
  // own chunk raises this too, and first — one task later, so the router's handler above has
  // claimed it with the address the reader was actually going to.
  // A faction's data asked for through quietLoaders below is that loader's to recover: it tries
  // again first and reloads only when the tries are spent.
  // Once per page, however often this is called: two listeners would answer one event twice.
  if (listening) return
  listening = true
  window.addEventListener('vite:preloadError', () => {
    if (quietImports > 0) return
    setTimeout(() => {
      if (claimed) { claimed = false; return }
      recoverFromStaleChunk(window.location.href)
    }, 0)
  })
}

// ── A faction's data, tried again before anything else ───────────────────────────────────────
// A player's installed app on Android (2026-11-02): an Imperial Knights datasheet would not open,
// neither from the roster's unit browser nor from the faction's Units page — both wait on the one
// chunk of that faction's datasheets, and a chunk that does not come leaves the page empty. The
// one net was the reload above, the first time and only once in 30 seconds. Now the loader asks
// again, twice, a moment apart, after dropping any copy the service worker kept of that file; the
// reload is the last resort, and the player sees none of it — no message, no button (owner,
// 2026-11-02). A failure that is not a fetch (a broken module) is not retried: it would fail the
// same way. The error still reaches the caller, and through it the error log.
const RETRY_DELAYS_MS = [400, 1500]

/** @param {number} ms */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// The service worker's copy of the file the error names, if it kept one: CacheFirst would hand
// the same copy back to the next try.
/** @param {unknown} err */
async function dropCachedCopy(err) {
  const url = String(/** @type {any} */ (err)?.message ?? err ?? '').match(/https?:\/\/\S+?\.(?:m?js|css)\b/)?.[0]
  if (!url || typeof caches === 'undefined') return
  try {
    for (const name of await caches.keys()) await (await caches.open(name)).delete(url)
  } catch { /* no cache to clean: the next try goes to the network anyway */ }
}

/**
 * @template T
 * @param {() => Promise<T>} load
 * @param {{ delays?: number[], wait?: (ms: number) => Promise<unknown>, recover?: () => unknown }} [opts]
 * @returns {Promise<T>}
 */
export async function importQuietly(load, { delays = RETRY_DELAYS_MS, wait = sleep, recover } = {}) {
  // Keep the owner from the start of the import, not from its late failure after a route change.
  const version = navigationVersion(), href = currentHref()
  const recoverHere = () => {
    if (version === navigationVersion() && href === currentHref()) {
      if (recover) recover()
      else if (href) recoverFromStaleChunk(href)
    }
  }
  for (let attempt = 0; ; attempt++) {
    quietImports++
    try {
      return await load()
    } catch (err) {
      // A load that never finished is not asked for again: the module is still pending, and the same
      // import would wait on the same request.
      if (!isChunkLoadError(err)) throw err
      if (/** @type {any} */ (err)?.timedOut) { recoverHere(); throw err }
      if (attempt >= delays.length) {
        recoverHere()
        throw err
      }
      await dropCachedCopy(err)
      await wait(delays[attempt])
    } finally {
      quietImports--
    }
  }
}

// An import.meta.glob map with each loader asking through importQuietly — what every per-faction
// data folder in src/data loads its chunks with.
/**
 * @template T
 * @param {Record<string, () => Promise<T>>} loaders
 * @returns {Record<string, () => Promise<T>>}
 */
export function quietLoaders(loaders) {
  return Object.fromEntries(Object.entries(loaders).map(([k, load]) => [k, () => loadChunk(load)]))
}

// ── A route's chunk, bounded ─────────────────────────────────────────────────────────────────
// A tap on a section whose chunk does not come did nothing, for as long as the request hung: the
// worker asks the network with no limit of its own, and the router waits on the import (a player's
// Android behind a VPN, 2026-11-03 — at the start it was a blank app, firstNavigation.js). Bounded at
// ROUTE_CHUNK_MS, and a load that fails is asked for again like a faction's data; the router's
// handler above takes what is left — one reload into that page, under the same guards.
export const ROUTE_CHUNK_MS = 8000

// Data and async components use the same deadline as routes. A timeout does not cancel an ESM
// import: a later call may still receive it, but this call cannot hold the screen indefinitely.
export function boundedChunk(load, ms = ROUTE_CHUNK_MS) {
  return withinDeadline(load, ms, 'Chunk').catch((err) => {
    if (!isChunkLoadError(err) && err.message === `Chunk timed out after ${ms} ms`) {
      const timeout = new Error(`Failed to fetch dynamically imported module: no answer in ${ms} ms`)
      timeout.timedOut = true
      throw timeout
    }
    throw err
  })
}

export function loadChunk(load) {
  return importQuietly(() => boundedChunk(load))
}

/**
 * @template T
 * @param {() => Promise<T>} load
 * @param {{ ms?: number, delays?: number[], wait?: (ms: number) => Promise<unknown> }} [opts]
 * @returns {() => Promise<T>}
 */
export function routeChunk(load, { ms = ROUTE_CHUNK_MS, ...retry } = {}) {
  const bounded = () => boundedChunk(load, ms)
  // The router's handler recovers, with the address the reader was going to: not this one.
  return () => importQuietly(bounded, { ...retry, recover: () => {} })
}

// Tests only.
export function _resetStaleChunks() {
  inFlight = false; quietImports = 0; claimed = false
  Object.assign(recovery, { phase: 'idle', lastSkip: '', workerCheck: '', attempts: 0 })
}
