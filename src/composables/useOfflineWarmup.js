import { ref } from 'vue'
import { isStandaloneDisplay } from './standalone.js'

// Warm the offline image cache for the INSTALLED app.
//
// Images are no longer precached (vite.config.js): the web/tab version stays light and caches
// images lazily as they're viewed. The installed app, instead, fetches every image once after
// install so the whole reference works fully offline ("full offline after install + warm-up").
// Each fetch is served+stored by the SW's CacheFirst `/images/` route, so we don't touch the
// Cache API directly here — a plain fetch is enough to populate `wh11ed-images`.
//
// Guarded to standalone + online, and made idempotent via a localStorage marker keyed to the
// manifest contents: it runs once after install and re-runs only when a deploy changes the set
// of images (the marker no longer matches), riding on top of the existing prompt update flow.

const DONE_KEY = 'wh11ed-offline-warmed'
const CONCURRENCY = 4

// Tiny, stable checksum of the manifest so a changed image set re-triggers the warm-up.
function checksum(urls) {
  let h = urls.length
  for (const url of urls) {
    for (let i = 0; i < url.length; i++) h = (Math.imul(31, h) + url.charCodeAt(i)) | 0
  }
  return `${urls.length}.${(h >>> 0).toString(36)}`
}

// status: 'idle' (not applicable / already warmed) | 'warming' | 'ready' | 'error'
const status = ref('idle')
const done = ref(0)
const total = ref(0)

let started = false

async function run() {
  let manifest
  try {
    manifest = await fetch('/image-manifest.json', { cache: 'no-store' }).then((r) => {
      if (!r.ok) throw new Error(`manifest ${r.status}`)
      return r.json()
    })
  } catch {
    status.value = 'error'
    return
  }

  const sig = checksum(manifest)
  if (localStorage.getItem(DONE_KEY) === sig) return // already warmed for this image set

  total.value = manifest.length
  done.value = 0
  status.value = 'warming'

  // Bounded concurrency: a shared cursor pulls from the queue so we never have more than
  // CONCURRENCY requests in flight. Failed fetches are skipped (best-effort) but counted,
  // so the bar always reaches total and the marker is only written on a clean pass.
  let cursor = 0
  let failed = false
  const worker = async () => {
    while (cursor < manifest.length) {
      const url = manifest[cursor++]
      try {
        await fetch(url, { cache: 'no-store' })
      } catch {
        failed = true
      }
      done.value++
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, manifest.length) }, worker))

  if (failed) {
    status.value = 'error' // leave marker unset so a later online launch retries
  } else {
    localStorage.setItem(DONE_KEY, sig)
    status.value = 'ready'
  }
}

export function useOfflineWarmup() {
  // Kick off once per app load, only for the installed app while online. A normal browser tab
  // never warms (and never shows the indicator) — it keeps lazily caching what the user views.
  if (!started && isStandaloneDisplay() && navigator.onLine && 'serviceWorker' in navigator) {
    started = true
    const kick = () => run()
    if ('requestIdleCallback' in window) requestIdleCallback(kick, { timeout: 4000 })
    else setTimeout(kick, 1500)
  }
  return { status, done, total }
}
