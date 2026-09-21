<template>
  <!-- Headless: this component renders nothing. It exists to register the service worker
       (useRegisterSW) and silently apply updates — no UI, no button. -->
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const route = useRoute()

// registerType is 'prompt' (vite.config.js): the SW activates only when we call
// updateServiceWorker. needRefresh flips to true once a new SW has finished installing in
// the background. There is no longer an "Update" button — we apply automatically, the moment
// the new version is ready, tab or installed app alike.
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
      if (document.visibilityState === 'visible') {
        checkSW() // look for a newer SW…
        apply() // …and apply one that's already waiting
      }
    })
  },
})

// Apply a ready update. Also called on visibilitychange above: a second call is a harmless
// retry (needRefresh stays true until the reload), and an app that slept in the switcher may
// have missed the moment the new SW finished installing.
function apply() {
  if (!needRefresh.value) return
  updateServiceWorker(true)
}

// A new SW just became ready: apply it.
watch(needRefresh, (ready) => {
  if (ready) apply()
}, { immediate: true })

// A navigation is a free moment to go looking for an update — the reader has just asked for a
// page, so one more conditional GET is not what they will notice.
watch(() => route.path, () => checkSW())
</script>
