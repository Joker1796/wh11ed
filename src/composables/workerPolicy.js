import { isStandaloneDisplay } from './standalone.js'
import { appInstalled } from './appInstalled.js'
import { getItem, removeItem } from './safeStorage.js'

// Who gets a service worker (since 2.9.5, owner's plan — hub journal: update delivery).
//
// The installed app does: it is what makes it work offline, and its updates come through the plate
// and the start (launchGate.js). A site read in a TAB does not: a visitor from a search came to read
// one rule, and under a worker every later visit opened the copy the worker held, not what is on the
// server — the old version for a few seconds, then a reload on top of it. Without one, the page is
// always the one the server has (index.html is no-cache), and a tab left open learns of a new
// version from the version check (tabFreshness.js).
//
// On Android and desktop Chromium a tab and the installed app share one storage and one worker, so
// a tab on a device that has the app keeps the worker and behaves like the app (appInstalled.js —
// the mark the app writes at every start). A tab that already has a worker from before is moved off
// it by the plate (cacheMigration.js), not here.

const WARMED_KEY = 'wh11ed-offline-warmed'

/** True where this page should run under a service worker: the installed app, or a tab beside it. */
export function workerWanted() {
  return isStandaloneDisplay() || appInstalled()
}

// The installed app's storage is its own, apart from the browser's (iOS and iPadOS, and Safari's
// "Add to Dock" on a Mac): a tab there can drop its worker without touching the app's.
export function separateAppStorage(nav = typeof navigator !== 'undefined' ? navigator : null) {
  if (!nav) return false
  const ua = nav.userAgent || ''
  if (/iP(hone|ad|od)/.test(ua) || (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1)) return true
  return /Macintosh/.test(ua) && /Safari\//.test(ua) && !/Chrome|Chromium|Edg|OPR|YaBrowser|Firefox/.test(ua)
}

/**
 * A tab that may leave its worker. Not one where the app may be installed without having said so:
 * an app installed before the mark existed (2.9.4) and not opened since has never written it, and on
 * a shared storage the tab dropping the worker would take the app's offline copy with it. Its
 * downloaded offline set is the sign; such a tab keeps the worker until the app says it is there.
 */
export function tabMayLeaveWorker(nav) {
  if (workerWanted()) return false
  return separateAppStorage(nav) || getItem(WARMED_KEY) === null
}

/** The registration this page is under, or null (no worker, or no way to tell). */
export async function currentRegistration() {
  const sw = typeof navigator !== 'undefined' ? navigator.serviceWorker : null
  if (!sw) return null
  try { return (await sw.getRegistration()) || null } catch { return null }
}

// The caches a worker of ours fills: Workbox's precache and the two runtime caches (vite.config.js).
const OUR_CACHE = /^workbox-precache|^wh-rules-assets$|^wh11ed-images$/

/** Deletes our caches. Returns how many went. Safe to run with nothing to delete, and to interrupt. */
export async function dropCaches(store = typeof caches !== 'undefined' ? caches : null) {
  if (!store) return 0
  try {
    const names = (await store.keys()).filter((n) => OUR_CACHE.test(n))
    await Promise.all(names.map((n) => store.delete(n)))
    return names.length
  } catch { return 0 }
}

/**
 * At every start of a tab with no worker: what a worker left behind goes — the caches (an "Apply"
 * interrupted between its two steps, or a worker the browser dropped) and the downloaded-offline
 * mark, which would otherwise say "downloaded" about caches that are gone.
 */
export async function tidyAfterWorker({ registration = currentRegistration } = {}) {
  if (workerWanted() || await registration()) return
  if (await dropCaches()) removeItem(WARMED_KEY)
}
