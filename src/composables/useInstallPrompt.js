import { ref } from 'vue'
import { isStandaloneDisplay } from './standalone.js'

// Module-singleton (same pattern as useLocale.js). Captures the Chromium
// `beforeinstallprompt` event so we can offer a custom "Install app" button —
// browsers like Yandex (and current Chrome) no longer show the automatic banner.

const canInstall = ref(false)
const isStandalone = ref(isStandaloneDisplay())

let deferredPrompt = null

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the (suppressed) mini-infobar and stash the event for our button.
    e.preventDefault()
    deferredPrompt = e
    canInstall.value = true
  })

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    canInstall.value = false
    isStandalone.value = true
  })
}

export function useInstallPrompt() {
  async function promptInstall() {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    // The event is single-use — drop it and hide the button until it fires again.
    deferredPrompt = null
    canInstall.value = false
  }

  return { canInstall, isStandalone, promptInstall }
}
