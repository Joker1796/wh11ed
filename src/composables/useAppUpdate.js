import { reactive } from 'vue'
import { liveVersion } from './launchGate.js'
import { noteWaitingVersion } from './reloadLoop.js'
import { topUpOffline } from './useOfflineWarmup.js'
import { prepareOfflineWorker, workerBuild, offlineRequired } from './workerBuild.js'

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
// are the warm-up's); 'ready' — verified and safe to apply; 'error' — Continue resumes preparation.
// `tab`: found by a tab with no service worker
// (tabFreshness.js) — the button only reloads, and a link followed meanwhile loads the new version.
// `inPlace`: the new worker already controls the page (another tab applied it). The button only
// reloads, but the installed app still verifies its offline files before offering that reload.
export const appUpdate = reactive({ phase: 'idle', version: '', tab: false })

let applyFn = null
let applying = false
let waitingWorker = null
let needsOffline = false
let generation = 0

/**
 * A new version is there: UpdateToast.vue reports a new worker installed and waiting, or one that
 * already took over (`inPlace`), or a tab with no worker found a newer number on the server
 * (`version`, `tab`). `apply` makes it current.
 */
export async function updateFound(apply, { version = '', tab = false, inPlace = false, worker = null } = {}) {
  applyFn = apply
  if (appUpdate.phase !== 'idle' && worker === waitingWorker) return
  waitingWorker = worker
  const mine = ++generation
  appUpdate.tab = tab
  if (version) appUpdate.version = version
  else {
    const identity = worker ? workerBuild(worker) : liveVersion()
    identity.then((v) => {
      if (!v?.app || mine !== generation) return
      appUpdate.version = v.app
      // Name the waiting build itself; latest can already be one release ahead of it.
      if (!tab && !inPlace) noteWaitingVersion(v.app)
    })
  }
  // Another tab (including an older updater) can activate this worker before this page finishes
  // downloading its files. Activation is not proof of offline completion: keep the progress until
  // the active build is verified too, rather than hiding a running download behind the button.
  needsOffline = !tab && offlineRequired()
  if (needsOffline) {
    appUpdate.phase = 'downloading'
    const ready = await (worker ? prepareOfflineWorker(worker) : topUpOffline()).catch(() => false)
    if (mine !== generation) return
    if (ready !== true) { appUpdate.phase = 'error'; return }
  }
  if (mine !== generation) return
  appUpdate.phase = 'ready'
}

/** The plate's button. The reload that follows is the reader's, never held back (UpdateToast). */
export async function applyUpdate() {
  if (!applyFn || applying) return
  applying = true
  const mine = generation
  if (needsOffline) {
    appUpdate.phase = 'downloading'
    const ready = await (waitingWorker ? prepareOfflineWorker(waitingWorker) : topUpOffline()).catch(() => false)
    if (mine !== generation || ready !== true) {
      applying = false
      if (mine === generation) appUpdate.phase = 'error'
      return
    }
  }
  try {
    const applied = await applyFn(waitingWorker)
    if (applied === false) {
      applying = false
      if (mine === generation) appUpdate.phase = 'error'
    }
  } catch {
    applying = false
    if (mine === generation) appUpdate.phase = 'error'
  }
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
  waitingWorker = null
  needsOffline = false
  generation++
}
