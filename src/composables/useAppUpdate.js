import { reactive } from 'vue'
import { isStandaloneDisplay } from './standalone.js'
import { liveVersion } from './launchGate.js'
import { noteWaitingVersion } from './reloadLoop.js'
import { topUpOffline } from './useOfflineWarmup.js'

// A new version found while the app is in use — and nothing reloads until the reader says so.
//
// Until 2026-10-16 a new build was applied the moment its worker had installed: a reload into it
// in the middle of whatever was on screen, often right as the reader came back to the app (owner:
// "the person does not even understand an update came"). Now it is announced on a plate that cannot
// be closed (UpdatePlate.vue) and applied by its button; a reader who never presses gets it at the
// next start (launchGate.js). The installed app first downloads the new build's files with the old
// one still running, so the button opens a version that already works offline.
//
// phase: 'idle' — nothing new; 'downloading' — the installed app fetching the new files (done/total
// are the warm-up's); 'ready' — the button is there. `tab`: found by a tab with no service worker
// (tabFreshness.js) — the button only reloads, and a link followed meanwhile loads the new version.
// `inPlace`: the new worker already controls the page (another tab applied it) — its files are all
// there, so nothing to download; the button only reloads.
export const appUpdate = reactive({ phase: 'idle', version: '', tab: false })

let applyFn = null
let applying = false

/**
 * A new version is there: UpdateToast.vue reports a new worker installed and waiting, or one that
 * already took over (`inPlace`), or a tab with no worker found a newer number on the server
 * (`version`, `tab`). `apply` makes it current.
 */
export async function updateFound(apply, { version = '', tab = false, inPlace = false } = {}) {
  applyFn = apply
  if (appUpdate.phase !== 'idle') return
  appUpdate.tab = tab
  if (version) appUpdate.version = version
  else {
    liveVersion().then((v) => {
      if (!v?.app) return
      appUpdate.version = v.app
      // A worker installed and waiting carries, near enough, what the server has now (reloadLoop.js).
      if (!tab && !inPlace) noteWaitingVersion(v.app)
    })
  }
  if (!tab && !inPlace && isStandaloneDisplay()) {
    appUpdate.phase = 'downloading'
    // A download that fails half-way still ends in the button: the new build tops up the rest.
    await topUpOffline().catch(() => {})
  }
  appUpdate.phase = 'ready'
}

/** The plate's button. The reload that follows is the reader's, never held back (UpdateToast). */
export function applyUpdate() {
  if (!applyFn || applying) return
  applying = true
  applyFn()
}

export function updateApplying() {
  return applying
}

// Tests only.
export function _resetAppUpdate() {
  appUpdate.phase = 'idle'
  appUpdate.version = ''
  appUpdate.tab = false
  applyFn = null
  applying = false
}
