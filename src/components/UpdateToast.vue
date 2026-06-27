<template>
  <!-- Headless: this component renders nothing. It exists to register the service worker
       (useRegisterSW) and silently apply updates at a safe moment — no UI, no button. -->
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
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
const onActiveGame = () => route.path.startsWith('/tracker/game')

// registerType is 'prompt' (vite.config.js): the SW activates only when we call
// updateServiceWorker. needRefresh flips to true once a new SW has finished installing in
// the background. There is no longer an "Update" button — we apply automatically:
//   • normal browser tab: as soon as the new version is ready (state survives via localStorage);
//   • installed PWA: at a SAFE moment — on returning to the foreground or leaving the live
//     game screen, but never while the user sits on an active tracker game.
//
// By default the SW is only checked for updates at registration (app start), so a long-lived
// session never learns about a new deploy. Poll hourly AND on return to the foreground.
const UPDATE_CHECK_MS = 60 * 60 * 1000 // hourly

const { needRefresh, updateServiceWorker } = useRegisterSW({
  onRegisteredSW(_swUrl, registration) {
    if (!registration) return
    const check = () => {
      if (navigator.onLine) registration.update().catch(() => {})
    }
    setInterval(check, UPDATE_CHECK_MS)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        check() // look for a newer SW…
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

// Leaving the live game screen is a safe moment to apply a deferred update.
watch(() => route.path, () => applyIfSafe())
</script>
