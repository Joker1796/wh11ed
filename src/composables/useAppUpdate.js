import { reactive } from 'vue'
import { isStandaloneDisplay } from './standalone.js'
import { liveVersion } from './launchGate.js'
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
// are the warm-up's); 'ready' — the button is there.
export const appUpdate = reactive({ phase: 'idle', version: '' })

let applyFn = null
let applying = false

/** UpdateToast.vue reports a new worker installed and waiting; `apply` makes it take over. */
export async function updateFound(apply) {
  applyFn = apply
  if (appUpdate.phase !== 'idle') return
  liveVersion().then((v) => { if (v?.app) appUpdate.version = v.app })
  if (isStandaloneDisplay()) {
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
  applyFn = null
  applying = false
}
