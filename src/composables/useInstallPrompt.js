import { ref } from 'vue'
import { isStandaloneDisplay } from './standalone.js'
import { markAppInstalled } from './appInstalled.js'

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

// An Android app's own browser — the Yandex app (`YaSearchApp`, a player's report 2e0b0999,
// 2026-10-27), VK, Instagram, Facebook, any WebView (`; wv)`) — may fire `beforeinstallprompt` and
// then do nothing on `prompt()`. An install button there is a button that lies: the player is told
// to open the site in a real browser instead.
export function detectInAppBrowser(ua = typeof navigator === 'undefined' ? '' : navigator.userAgent || '') {
  return /Android/.test(ua) && /YaSearchApp|; wv\)|Instagram|FBA[NV]|VKClient/.test(ua)
}

const canInstall = ref(false)
const isStandalone = ref(isStandaloneDisplay())
// True only on iOS Safari and only when not already installed → show the hint.
const iosInstall = ref(detectIosSafari() && !isStandalone.value)
// True where installing has to happen from another browser → say so instead of a button.
const installElsewhere = ref(detectInAppBrowser() && !isStandalone.value)

let deferredPrompt = null

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the (suppressed) mini-infobar and stash the event for our button.
    e.preventDefault()
    if (installElsewhere.value) return
    deferredPrompt = e
    canInstall.value = true
  })

  window.addEventListener('appinstalled', () => {
    markAppInstalled()
    deferredPrompt = null
    canInstall.value = false
    isStandalone.value = true
    iosInstall.value = false
    installElsewhere.value = false
  })
}

export function useInstallPrompt() {
  async function promptInstall() {
    if (!deferredPrompt) return
    try {
      await deferredPrompt.prompt()
      await deferredPrompt.userChoice
    } catch {
      // A browser we do not know refused: the same advice as in a known one.
      installElsewhere.value = true
    }
    // The event is single-use — drop it and hide the button until it fires again.
    deferredPrompt = null
    canInstall.value = false
  }

  return { canInstall, isStandalone, iosInstall, installElsewhere, promptInstall }
}
