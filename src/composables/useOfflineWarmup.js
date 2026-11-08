import { computed, ref } from 'vue'
import { isStandaloneDisplay } from './standalone.js'
import { getItem, setItem, removeItem } from './safeStorage.js'
import { withinDeadline } from '../utils/deadline.js'

// Fill the offline caches with everything the app SHELL deliberately does not carry.
//
// The service worker precaches ~1 MB: the entry chunk, what it statically imports, its CSS, the
// HTML and the icons (vite.config.js's offlineShell). Everything else — the route components, the
// thirty factions' data chunks, the font subsets, the ~21 MB of images — is runtime-cached as it
// is viewed. That is what keeps a browser tab light, and it is also what makes an update land in
// seconds instead of minutes: a new service worker only takes over once its install has finished.
//
// The price is that "offline" now means "offline for what you have already opened". This module is
// how that gets paid off, in one pass, deliberately:
//
//   • the installed app does it by itself on the first online launch, as it always has;
//   • anyone else asks for it — the ⚙ menu's "Download for offline" (AppNavbar.vue).
//
// Warm-up writes the same named caches the worker reads. Awaiting Cache.put confirms the whole
// response body is durable; a successful fetch alone says nothing about the worker's async write.
// No cache is deleted on failure: a later run checks and fetches only what is still missing.

const DONE_KEY = 'wh11ed-offline-warmed'
const CONCURRENCY = 2
export const OFFLINE_REQUEST_MS = 15000
const cacheName = (url) => url.startsWith('/images/') ? 'wh11ed-images' : 'wh-rules-assets'

// Tiny, stable checksum of the file list so a deploy that changes what there is to download
// re-arms the warm-up instead of reporting the previous run's success forever.
function checksum(urls) {
  let h = urls.length
  for (const url of urls) {
    for (let i = 0; i < url.length; i++) h = (Math.imul(31, h) + url.charCodeAt(i)) | 0
  }
  return `${urls.length}.${(h >>> 0).toString(36)}`
}

// The files of the list no cache holds yet — the only ones a run actually downloads. The list is
// every file the app has beyond its shell (~780), and a release renames a hundred or so of them;
// the rest the service worker answers from its cache without touching the network. Counting the
// whole list, the indicator read "Downloading update 0/777" after every release, which looked
// like the app pulling itself down again (owner, 2026-10-05) when it was ~2 MB of 17. Without the
// Cache API (no service worker, a test) every file counts, as before.
async function missing(files) {
  return (await Promise.all(files.map(async (url) => {
    const cache = await caches.open(cacheName(url))
    const res = await cache.match(url)
    return res?.ok ? null : url
  }))).filter(Boolean)
}

// 'idle' — nothing to report (a tab that has not asked, or a set already warmed)
// 'warming' | 'ready' | 'error'
const status = ref('idle')
const done = ref(0)
const total = ref(0)
// What a full download would cost, in bytes, read from the manifest the build emits. The one fact
// a reader has to be given BEFORE they tap the button, and one nothing can measure at runtime
// without fetching the very files in question.
const bytes = ref(0)
const warmed = ref(false)
// This run tops up a set that was complete before a deploy renamed part of it — not the first
// download. To a reader already using the app, "Preparing offline…" after every release read
// as something new starting, so the indicator says "update" then (owner's call, 2026-09-27).
// The ⚙ button stays "offline": the reader asked for exactly that.
const isUpdate = ref(false)

let autoStarted = false
let inflight = null

async function manifest() {
  return withinDeadline(async () => {
    const res = await fetch('/offline-manifest.json', { cache: 'no-store' })
    if (!res.ok) throw new Error(`manifest ${res.status}`)
    const json = await res.json()
    const assets = json.assets?.files
    const images = json.images?.files
    if (!Array.isArray(assets) || !Array.isArray(images)
      || assets.some((u) => typeof u !== 'string' || !u.startsWith('/assets/'))
      || images.some((u) => typeof u !== 'string' || !u.startsWith('/images/'))) {
      throw new Error('Invalid offline manifest')
    }
    bytes.value = (json.assets.bytes || 0) + (json.images.bytes || 0)
    return [...assets, ...images]
  }, OFFLINE_REQUEST_MS, 'Offline manifest')
}

// `force` is the button: it warms again even when the marker says this exact set is already done,
// because the reader asking for it has a reason we cannot see (a cache evicted under storage
// pressure, a device they are about to take somewhere with no signal).
// One run at a time; a second caller waits for the one in flight (the update plate does, when the
// launch warm-up is already topping up).
function run(opts) {
  if (!inflight) inflight = runOnce(opts).finally(() => { inflight = null })
  return inflight
}

async function runOnce({ force = false } = {}) {
  const wasDownloaded = getItem(DONE_KEY) !== null
  warmed.value = false
  status.value = 'warming'
  done.value = 0
  total.value = 0
  try {
    const sw = navigator.serviceWorker
    if (!sw || typeof caches === 'undefined') throw new Error('Offline storage unavailable')
    // The first installed launch may not be controlled yet. An active worker and explicitly
    // committed runtime files suffice for the next offline launch, including its precached shell.
    if (!sw.controller) await withinDeadline(() => sw.ready.then((reg) => {
      if (!reg.active) throw new Error('No active offline worker')
    }), OFFLINE_REQUEST_MS, 'Offline worker')
    const files = await manifest()
    const sig = checksum(files)
    // The marker is a hint for wording, never proof: storage pressure can evict cache entries.
    const todo = await withinDeadline(() => missing(files), OFFLINE_REQUEST_MS, 'Offline cache check')
    isUpdate.value = !force && wasDownloaded
    total.value = todo.length
    if (todo.length) removeItem(DONE_KEY)
    let cursor = 0
    let failed = false
    const worker = async () => {
      while (cursor < todo.length) {
        const url = todo[cursor++]
        const abort = new AbortController()
        try {
          await withinDeadline(async () => {
            const res = await fetch(url, { cache: 'no-store', signal: abort.signal, priority: 'low' })
            if (!res.ok) throw new Error(`Offline file ${res.status}: ${url}`)
            const cache = await caches.open(cacheName(url))
            await cache.put(url, res)
          }, OFFLINE_REQUEST_MS, 'Offline download')
        } catch {
          abort.abort()
          failed = true
        }
        done.value++
      }
    }
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, todo.length) }, worker))
    // Cache writes can fail or be evicted while a long download runs. Verify the whole set again.
    if (failed || (await withinDeadline(() => missing(files), OFFLINE_REQUEST_MS, 'Offline verification')).length) {
      throw new Error('Offline download incomplete')
    }
    setItem(DONE_KEY, sig)
    warmed.value = true
    status.value = 'ready'
  } catch {
    removeItem(DONE_KEY)
    warmed.value = false
    status.value = 'error'
  }
}

// The button's own entry point. Nothing is gated here — asking for it IS the gate.
export function startOfflineWarmup() {
  return run({ force: true })
}

// The files of a build that is not running yet, fetched by the one that is (useAppUpdate.js): a
// new service worker is waiting, and the list on the server is already the new build's. Read by the
// old code, cached by the old worker's routes into the same caches the new one reads.
// A warm-up already running reads the list it fetched when it started — the old build's; this one
// waits it out and then goes through the new list.
export async function topUpOffline() {
  await inflight?.catch(() => {})
  return run()
}

// Read the size without downloading anything, so the menu item can say what it will cost. Cheap:
// one small JSON, and it is the file the warm-up would have fetched first anyway.
export async function loadOfflineSize() {
  if (bytes.value) return bytes.value
  try {
    await manifest()
  } catch {
    // A size we cannot state is better left unstated than guessed at — the caller shows no number.
  }
  return bytes.value
}

export function useOfflineWarmup() {
  // Kick off once per app load, only for the installed app while online. A normal browser tab
  // never warms by itself (and never shows the indicator) — it keeps lazily caching what the
  // reader actually opens, and has the ⚙ menu if it wants the lot.
  if (!autoStarted && isStandaloneDisplay() && navigator.onLine && 'serviceWorker' in navigator) {
    autoStarted = true
    const kick = () => run()
    if ('requestIdleCallback' in window) requestIdleCallback(kick, { timeout: 4000 })
    else setTimeout(kick, 1500)
  }
  return { status, done, total, bytes, warmed, isUpdate, progress: computed(() => (total.value ? done.value / total.value : 0)) }
}
