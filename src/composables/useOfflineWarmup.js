import { computed, ref } from 'vue'
import { isStandaloneDisplay } from './standalone.js'

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
// Every fetch is served and stored by the SW's own CacheFirst routes (`/assets/` and `/images/`),
// so nothing here WRITES to the Cache API: a plain fetch is enough to populate them. It is only
// read, to leave out what is already there (`missing` below).

const DONE_KEY = 'wh11ed-offline-warmed'
const CONCURRENCY = 4

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
  if (typeof caches === 'undefined') return files
  try {
    const held = await Promise.all(files.map((url) => caches.match(url).then(Boolean, () => false)))
    return files.filter((_, i) => !held[i])
  } catch {
    return files
  }
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
const warmed = ref(localStorage.getItem(DONE_KEY) !== null)
// This run tops up a set that was complete before a deploy renamed part of it — not the first
// download. To a reader already using the app, "Preparing offline…" after every release read
// as something new starting, so the indicator says "update" then (owner's call, 2026-09-27).
// The ⚙ button stays "offline": the reader asked for exactly that.
const isUpdate = ref(false)

let autoStarted = false
let running = false

async function manifest() {
  const res = await fetch('/offline-manifest.json', { cache: 'no-store' })
  if (!res.ok) throw new Error(`manifest ${res.status}`)
  const json = await res.json()
  bytes.value = (json.assets?.bytes || 0) + (json.images?.bytes || 0)
  // Assets first: they are the app itself, so a warm-up interrupted half-way still leaves every
  // screen reachable — it is the illustrations that go missing, not the rules.
  return [...(json.assets?.files || []), ...(json.images?.files || [])]
}

// `force` is the button: it warms again even when the marker says this exact set is already done,
// because the reader asking for it has a reason we cannot see (a cache evicted under storage
// pressure, a device they are about to take somewhere with no signal).
async function run({ force = false } = {}) {
  if (running) return
  running = true
  try {
    let files
    try {
      files = await manifest()
    } catch {
      status.value = 'error'
      return
    }

    const sig = checksum(files)
    if (!force && localStorage.getItem(DONE_KEY) === sig) {
      warmed.value = true
      return
    }

    const todo = await missing(files)
    if (!todo.length) {
      localStorage.setItem(DONE_KEY, sig)
      warmed.value = true
      if (force) status.value = 'ready' // the button asked: answer it, even with nothing to fetch
      return
    }

    isUpdate.value = !force && localStorage.getItem(DONE_KEY) !== null
    total.value = todo.length
    done.value = 0
    status.value = 'warming'

    // Bounded concurrency: a shared cursor pulls from the queue so we never have more than
    // CONCURRENCY requests in flight. Failed fetches are skipped (best-effort) but counted, so the
    // bar always reaches total and the marker is only written on a clean pass.
    let cursor = 0
    let failed = false
    const worker = async () => {
      while (cursor < todo.length) {
        const url = todo[cursor++]
        try {
          await fetch(url, { cache: 'no-store' })
        } catch {
          failed = true
        }
        done.value++
      }
    }
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, todo.length) }, worker))

    if (failed) {
      status.value = 'error' // leave the marker as it was so a later attempt retries
    } else {
      localStorage.setItem(DONE_KEY, sig)
      warmed.value = true
      status.value = 'ready'
    }
  } finally {
    running = false
  }
}

// The button's own entry point. Nothing is gated here — asking for it IS the gate.
export function startOfflineWarmup() {
  return run({ force: true })
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
