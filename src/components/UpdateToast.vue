<template>
  <!-- Headless: this component renders nothing. It exists to register the service worker
       (useRegisterSW) and silently apply updates at a safe moment — no UI, no button. -->
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { stripLocale } from '../router/locale.js'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const route = useRoute()

// Is the app running as an installed PWA (standalone window) vs a normal browser tab?
// matchMedia covers Chrome/Android/desktop installs; navigator.standalone is the iOS Safari flag.
const pwaInstalled =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.matchMedia('(display-mode: fullscreen)').matches ||
  window.matchMedia('(display-mode: minimal-ui)').matches ||
  window.navigator.standalone === true

// Don't reload while the user is on the live scoring screen — that's the one place a reload
// (which survives via localStorage, but drops half-typed input / open modals) is disruptive.
const onActiveGame = () => stripLocale(route.path).startsWith('/tracker/game')

// registerType is 'prompt' (vite.config.js): the SW activates only when we call
// updateServiceWorker. needRefresh flips to true once a new SW has finished installing in
// the background. There is no longer an "Update" button — we apply automatically:
//   • normal browser tab: as soon as the new version is ready (state survives via localStorage);
//   • installed PWA: at a SAFE moment — on returning to the foreground or leaving the live
//     game screen, but never while the user sits on an active tracker game.
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
        applyIfSafe() // …and apply one that's already waiting, if it's safe to reload now
      }
    })
  },
})

// Apply a ready update when it won't interrupt active play. In a normal tab, "safe" is always.
function applyIfSafe() {
  if (!needRefresh.value) return
  if (pwaInstalled && onActiveGame()) return // defer until they leave the live game
  updateServiceWorker(true)
}

// A new SW just became ready: apply immediately unless we're mid-game in the installed app.
watch(needRefresh, (ready) => {
  if (ready) applyIfSafe()
}, { immediate: true })

// A navigation is two things at once: a safe moment to apply an update that was waiting, and a
// free moment to go looking for one — the reader has just asked for a page, so one more
// conditional GET is not what they will notice.
watch(() => route.path, () => {
  applyIfSafe()
  checkSW()
})
</script>
