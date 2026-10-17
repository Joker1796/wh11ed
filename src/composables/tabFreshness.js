import { APP_VERSION } from '../buildInfo.js'
import { liveVersion } from './launchGate.js'
import { noteReload } from './reloadLoop.js'
import { appUpdate, updateFound } from './useAppUpdate.js'

// A tab with no service worker (workerPolicy.js) is always the version the server had when it was
// loaded — and stays it for as long as it is open. Left open for days, it learns of a new one here:
// the version on the server (`version.json`, one small no-cache file the build writes) against the
// one running, on the occasions a reader gives us for free — moving to another page, coming back to
// the tab — and every 15 minutes while the tab is in view, at most once in 2 minutes in all. A newer
// one puts up the plate (UpdatePlate.vue, no ✕); its button reloads, with nothing to download.
//
// The number, not the build: what the plate says is what "What's new" says, and a build with the
// same number never ships (deploy.sh refuses a silent deploy).
//
// While the plate is up, a link inside the site loads its page whole, so it opens in the new version
// and the plate goes (owner, 2026-10-16): the page changes anyway, so nothing flashes, and an update
// reaches the readers who never press the button.
export const CHECK_MS = 15 * 60 * 1000
export const CHECK_FLOOR_MS = 2 * 60 * 1000

let started = false
let lastCheck = 0

/** One look at the server. Exported for tests; `now` and `ask` are seams. */
export async function checkLiveVersion({ now = Date.now(), ask = liveVersion, running = APP_VERSION, force = false } = {}) {
  if (appUpdate.phase !== 'idle') return false
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return false
  if (!force && now - lastCheck < CHECK_FLOOR_MS) return false
  lastCheck = now
  const live = await ask()
  if (!live?.app || live.app === running) return false
  updateFound(() => { noteReload('user'); window.location.reload() }, { version: live.app, tab: true })
  return true
}

/** Started once, by App.vue, for a tab with no worker. */
export function watchTabFreshness(router) {
  if (started) return
  started = true
  router.beforeEach((to, from) => {
    // A link followed under the plate: the new version, by loading the page whole.
    if (appUpdate.phase === 'ready' && appUpdate.tab && from.matched.length && to.fullPath !== from.fullPath) {
      noteReload('user')
      window.location.assign(router.resolve(to).href)
      return false
    }
  })
  router.afterEach(() => { checkLiveVersion() })
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') checkLiveVersion()
  })
  setInterval(() => {
    if (document.visibilityState === 'visible') checkLiveVersion({ force: true })
  }, CHECK_MS)
}

// Tests only.
export function _resetTabFreshness() {
  started = false
  lastCheck = 0
}
