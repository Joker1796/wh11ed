import { ref } from 'vue'
import { isStandaloneDisplay } from './standalone.js'

// Module-singleton (same pattern as useLocale.js). Captures the Chromium
// `beforeinstallprompt` event so we can offer a custom "Install app" button —
// browsers like Yandex (and current Chrome) no longer show the automatic banner.

// iOS has no `beforeinstallprompt`: the only way to install is Safari's
// Share → "Add to Home Screen". Detect that case so we can show a how-to hint
// instead of a (non-existent) prompt. iPadOS 13+ reports as desktop Safari, so
// fall back to the touch-capable-Mac heuristic. In-app / non-Safari iOS browsers
// (Chrome, Firefox, Edge, Opera, Yandex, Google App) can't install a PWA → exclude.
function detectIosSafari() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  const isIosDevice =
    /iP(hone|ad|od)/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  if (!isIosDevice) return false
  const isOtherBrowser = /(CriOS|FxiOS|EdgiOS|OPiOS|YaBrowser|GSA)/.test(ua)
  return !isOtherBrowser
}

const canInstall = ref(false)
const isStandalone = ref(isStandaloneDisplay())
// True only on iOS Safari and only when not already installed → show the hint.
const iosInstall = ref(detectIosSafari() && !isStandalone.value)

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
    iosInstall.value = false
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

  return { canInstall, isStandalone, iosInstall, promptInstall }
}
