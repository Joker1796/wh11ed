import { getItem, setItem } from './safeStorage.js'
import { isStandaloneDisplay } from './standalone.js'

// "This browser has the app installed" — written by the app itself, read by a tab.
//
// On Android and desktop Chromium a tab and the installed app are one site: one localStorage, one
// service worker. The plan for the tab (journal: update delivery) is to drop the worker there —
// and a tab doing that on a device with the app installed would take the app's offline shell with
// it. Nothing in the web platform answers "is the app installed?" reliably, so the app says so: at
// every start in its own window, and when the browser reports the install (`appinstalled`,
// useInstallPrompt.js). An app removed later leaves the mark behind; the tab then keeps behaving
// like the app, which costs nothing. On iOS the app's storage is its own and Safari never sees it.
const KEY = 'wh11ed-app-installed'

export function markAppInstalled(now = Date.now()) {
  setItem(KEY, String(now))
}

export function appInstalled() {
  return getItem(KEY) !== null
}

/** Called once at boot (main.js): an app running in its own window is, by definition, installed. */
export function noteStandaloneStart() {
  if (isStandaloneDisplay()) markAppInstalled()
}
