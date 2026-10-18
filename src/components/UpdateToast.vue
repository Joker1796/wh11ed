<template>
  <!-- Headless: this component renders nothing. It registers the service worker (useRegisterSW)
       and reports a new one to the plate (useAppUpdate.js). Mounted only where a worker belongs —
       the installed app, a tab beside it, a tab not yet moved off one (App.vue, workerPolicy.js). -->
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { noteReload } from '../composables/reloadLoop.js'
import { updateFound, updateApplying } from '../composables/useAppUpdate.js'

const route = useRoute()

// registerType is 'prompt' (vite.config.js): the SW activates only when we call
// updateServiceWorker. needRefresh flips to true once a new SW has finished installing in
// the background. Since 2026-10-16 that is ANNOUNCED, not applied: the plate (UpdatePlate.vue,
// useAppUpdate.js) carries a button, and a reader who never presses it gets the new version at the
// next start (launchGate.js). From 2026-09-21 to then it was applied at once — a reload in the
// middle of whatever was on screen, often the moment the reader came back to the app.
//
// Until 2026-09-21 the installed app held the update back while the route was /tracker/game,
// so a reload would never land mid-game. The check was on the PATH, not on the game: the setup
// form, a finished game and the live one all live at /tracker/game, and the app resumes into
// its last route on launch — so a reader who used it only as a tracker never left that path,
// every deploy queued behind the one before, and one player sat on 2.4 through eight releases
// until they wiped the site's storage. Nothing a reload loses is worth that: the game itself is
// flushed to localStorage on pagehide/beforeunload (useTracker.js) and the app reopens on the
// same screen; what goes is an open dialog or a half-typed note.
//
// By default the SW is only checked for updates at registration (app start), so a long-lived
// session never learns about a new deploy. Poll, and also look on the two occasions a reader
// gives us for free: coming back to the tab, and moving to another page.
//
// The interval was an hour until 2026-09-12, when the precache was cut from 15.5 MB to ~0.9 MB.
// The old number was sized for the old cost: a check that found something meant installing the
// whole app, so asking often was asking for a long download at a bad moment. Now an update is a
// handful of files, and the thing worth minimising is the time a reader spends on a stale build.
const UPDATE_CHECK_MS = 15 * 60 * 1000
// …but a check on every navigation would be a request per click. One floor for all the
// opportunistic triggers, so a reader clicking through ten datasheets costs one conditional GET.
const CHECK_FLOOR_MS = 2 * 60 * 1000

let lastCheck = 0
let checkSW = () => {}

const { needRefresh, updateServiceWorker } = useRegisterSW({
  // The reload after a new worker takes over is ours, not the plugin's. Asked for by the plate's
  // button it is the reader's and always happens. A worker that took over without it — another tab
  // pressed Update, or opened the new build at its start (launchGate.js): the worker is one per
  // device — does not reload this page; the plate says the new version is in place and its button
  // reloads. Until 2026-10-18 it reloaded, once in 30 s: every open tab went white together, and
  // their starts, counted per device, tripped the loop guard (reloadLoop.js) on readers.
  onNeedReload: () => {
    if (updateApplying()) {
      noteReload('user')
      window.location.reload()
    } else updateFound(() => { noteReload('user'); window.location.reload() }, { inPlace: true })
  },
  onRegisteredSW(_swUrl, registration) {
    if (!registration) return
    checkSW = () => {
      if (!navigator.onLine) return
      const now = Date.now()
      if (now - lastCheck < CHECK_FLOOR_MS) return
      lastCheck = now
      registration.update().catch(() => {})
    }
    setInterval(() => { lastCheck = 0; checkSW() }, UPDATE_CHECK_MS)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') checkSW()
    })
  },
})

// A new SW just became ready: announce it, with what applies it.
watch(needRefresh, (ready) => {
  if (ready) updateFound(() => updateServiceWorker(true))
}, { immediate: true })

// A navigation is a free moment to go looking for an update — the reader has just asked for a
// page, so one more conditional GET is not what they will notice.
watch(() => route.path, () => checkSW())
</script>
