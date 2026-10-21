import { APP_VERSION } from '../buildInfo.js'
import { noteReload, reloadsHeld } from './reloadLoop.js'
import { getItem, setItem } from './safeStorage.js'
import { locale } from './useLocale.js'
import { ui } from '../i18n/ui.js'

// A start under a service worker opens the NEW version, not the one the worker is holding.
//
// Under a worker the page itself comes from its copy, so whoever opens the app right after a
// release (a post about it, say) saw the old build for a few seconds and then a reload into the
// new one, mid-tap. Before anything is drawn (main.js awaits this before mounting) the page asks
// the server which version is live — `version.json`, one small no-cache file — and when it is not
// the one running, it waits behind a screen saying so while the worker installs it, then reloads
// straight into it. Nothing old is drawn, so nothing flashes.
//
// Bounded both ways (owner, 2026-10-16): the question gets ASK_MS, the install INSTALL_MS; past
// either, or with no network, the app opens on what it has and the update arrives later through
// the plate (UpdatePlate.vue). A worker that already finished installing (downloaded in an earlier
// session, the plate never pressed) is applied with no network needed — but online, and with a newer
// version live than the one running, the newer one is installed over it first: applying the old
// one put the reader on a build that was itself out of date, and the plate came up 3–16 s later.
//
// Runs for EVERY load under a worker, not only the installed app: on Android and desktop a tab
// shares the app's worker, and its F5 would otherwise bring the old copy back (a waiting worker is
// not activated by a reload — `registerType: 'prompt'` holds it until SKIP_WAITING).
export const ASK_MS = 1500
export const INSTALL_MS = 8000
// A worker told to take over that never does (it should within a frame) — open what we have.
const TAKEOVER_MS = 4000
// The version a start already reloaded for. Came back still on the old one (a CDN edge serving the
// old page a little longer, a worker that installed the wrong build) — the next starts do not wait
// behind the screen for it again; the plate brings it once it is really there.
const TRIED_KEY = 'wh11ed-launch-tried'

/**
 * The versions live on the server, or null when it cannot be told in time.
 *
 * The request is outrun, not aborted: an abort rejects the fetch, and a fetch wrapped by an
 * extension or an antivirus that chains on it without a catch turned that into an unhandled
 * "AbortError: signal is aborted without reason" in the error log (2026-10-21). A late answer is
 * simply not listened to.
 */
export async function liveVersion({ timeout = ASK_MS, fetchImpl = globalThis.fetch } = {}) {
  const ask = (async () => {
    const res = await fetchImpl('/version.json', { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return typeof json?.app === 'string' && json.app ? json : null
  })().catch(() => null)
  return within(ask, timeout, null)
}

// `promise`, or `fallback` once `ms` have passed without it.
function within(promise, ms, fallback) {
  let timer
  const late = new Promise((resolve) => { timer = setTimeout(() => resolve(fallback), ms) })
  return Promise.race([promise, late]).finally(() => clearTimeout(timer))
}

// The worker the registration is installing, once it has installed (it then waits), or null.
// `fresh`: not the one already waiting — only one that installs over it.
function installed(reg, ms, { fresh = false } = {}) {
  return new Promise((resolve) => {
    if (reg.waiting && !fresh) return resolve(reg.waiting)
    const timer = setTimeout(() => resolve(null), ms)
    const done = (w) => { clearTimeout(timer); resolve(w) }
    const watch = (w) => {
      if (!w) return
      w.addEventListener('statechange', () => {
        if (w.state === 'installed') done(w)
        else if (w.state === 'redundant') done(null)
      })
    }
    watch(reg.installing)
    reg.addEventListener('updatefound', () => watch(reg.installing))
  })
}

// A worker that installed in an earlier session carries the build that was live THEN; the server
// may have a newer one by now. A worker does not say which build it carries, but the browser can
// tell: an update check compares the server's worker with the newest one the registration has —
// the waiting one — and installs it over that only if it differs (every build's worker differs: it
// lists the shell's revisions). Resolves with that newer worker once installed, or null when the
// waiting one is already the live build, or the check or the install does not finish in time.
async function newerThanWaiting(reg) {
  await within(reg.update().catch(() => {}), ASK_MS)
  return reg.installing ? installed(reg, INSTALL_MS, { fresh: true }) : null
}

// Tell the waiting worker to take over and reload once it has. Resolves false if it never does.
function takeOver(worker, reload) {
  return new Promise((resolve) => {
    const sw = navigator.serviceWorker
    const timer = setTimeout(() => resolve(false), TAKEOVER_MS)
    sw.addEventListener('controllerchange', () => {
      clearTimeout(timer)
      noteReload('launch')
      reload()
      resolve(true)
    }, { once: true })
    worker.postMessage({ type: 'SKIP_WAITING' })
  })
}

// The screen between the old build and the new one: the mark, "Updating to X.Y.Z…" and a bar that
// runs without a number — a worker's install reports no progress to count. Plain DOM: the app is
// not mounted yet. Its look lives in style.css ("Update splash"), loaded before this runs.
export function showSplash(version) {
  const l = ui[locale.value] || ui.en
  const el = document.createElement('div')
  el.className = 'update-splash'
  el.setAttribute('role', 'status')
  el.setAttribute('aria-live', 'polite')
  const icon = document.querySelector('link[rel="icon"]')?.getAttribute('href')
  if (icon) {
    const img = document.createElement('img')
    img.className = 'us-mark'
    img.src = icon
    img.alt = ''
    el.append(img)
  }
  const text = document.createElement('p')
  text.className = 'us-text'
  text.textContent = version ? l.updateSplash.replace('{v}', version) : l.updateSplashBare
  const bar = document.createElement('div')
  bar.className = 'us-bar'
  bar.append(document.createElement('span'))
  el.append(text, bar)
  document.body.append(el)
  return () => el.remove()
}

/**
 * Resolves true when the page is about to reload into a newer build (do not mount), false to go on
 * and mount what is here.
 */
export async function launchGate({ reload = () => window.location.reload(), splash = showSplash, version = APP_VERSION } = {}) {
  const sw = typeof navigator !== 'undefined' ? navigator.serviceWorker : null
  if (!sw?.controller || reloadsHeld()) return false
  const reg = await sw.getRegistration().catch(() => null)
  if (!reg) return false

  // Downloaded before and never applied. Offline, or nothing newer live, it is what opens.
  if (reg.waiting) {
    const hide = splash('')
    const live = navigator.onLine ? await liveVersion() : null
    let worker = reg.waiting
    if (live && live.app !== version && getItem(TRIED_KEY) !== live.app) {
      setItem(TRIED_KEY, live.app)
      worker = (await newerThanWaiting(reg)) || reg.waiting
    }
    if (worker && await takeOver(worker, reload)) return true
    hide()
    return false
  }

  if (!navigator.onLine) return false
  const live = await liveVersion()
  if (!live || live.app === version || getItem(TRIED_KEY) === live.app) return false

  setItem(TRIED_KEY, live.app)
  const hide = splash(live.app)
  reg.update().catch(() => {})
  const worker = await installed(reg, INSTALL_MS)
  if (worker && await takeOver(worker, reload)) return true
  hide()
  return false
}
