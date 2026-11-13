// Serialized into worker-info.js by Vite. Keep this function self-contained.
export function installOfflineWorker(scope, identity) {
  const controlName = 'wh-rules-offline-control'
  const cacheName = url => url.startsWith('/images/') ? 'wh11ed-images' : 'wh-rules-assets'
  const origin = scope.location.origin
  let mutations = null
  // A cleanup failure from a run whose port is already gone, told by the next preparation.
  let cleanupFailure = null
  const bounded = (task, label, ms = 15000) => {
    let timer
    return Promise.race([Promise.resolve().then(task), new Promise((_, reject) => {
      timer = setTimeout(() => reject(Error(`${label} timed out after ${ms} ms`)), ms)
    })]).finally(() => clearTimeout(timer))
  }
  const store = {
    match: url => bounded(() => scope.caches.match(url), 'Offline manifest cache'),
    async open(name, trackMutations = true) {
      const cache = await bounded(() => scope.caches.open(name), 'Offline cache open')
      return Object.fromEntries(['match', 'put', 'keys', 'delete'].map(method => [method,
        (...args) => bounded(() => {
          const pending = Promise.resolve().then(() => cache[method](...args))
          if (trackMutations && mutations && ['put', 'delete'].includes(method)) {
            const owner = mutations
            owner.add(pending)
            pending.then(() => owner.delete(pending), () => owner.delete(pending))
          }
          return pending
          // Listing a cache scales with its size (slow on Safari); only cleanup lists, off the
          // critical path, so it gets a longer budget. The cache name says which one stalled.
        }, `Offline cache ${method} (${name})`, method === 'keys' ? 60000 : 15000)]))
    },
  }
  let queue = Promise.resolve()
  const serialize = task => {
    const abort = new AbortController()
    let resolve, reject
    const result = new Promise((yes, no) => { resolve = yes; reject = no })
    const timer = setTimeout(() => {
      const error = Error('Offline preparation queue timed out after 120000 ms')
      abort.abort(error)
      reject(error)
    }, 120000)
    const start = async () => {
      // A timed-out request may still be chained behind local work. It must never run later.
      abort.signal.throwIfAborted()
      clearTimeout(timer)
      mutations = new Set()
      try { resolve(await task()) }
      catch (error) { reject(error) }
      finally {
        // A Cache API timeout ends the user's wait, not the underlying write/delete. Keep the
        // ownership lock until those operations settle, so late cleanup cannot delete a set
        // another preparation has just pinned. Runtime writes do not participate in this lock.
        await Promise.allSettled([...mutations])
        mutations = null
      }
    }
    const run = queue.then(() => {
      abort.signal.throwIfAborted()
      return scope.navigator?.locks
        ? scope.navigator.locks.request('wh-rules-offline-owner', { signal: abort.signal }, start) : start()
    })
    queue = run.catch(reject).finally(() => clearTimeout(timer))
    return { result, lifetime: queue }
  }
  async function manifest(target) {
    if (!/^[\w-]+$/.test(target.build) || target.manifest !== `/releases/${target.build}/offline-manifest.json`) throw Error('Invalid offline target')
    let response = await bounded(() => store.match(target.manifest), 'Offline manifest cache')
    if (!response) {
      const abort = new AbortController()
      const timer = setTimeout(() => abort.abort(), 15000)
      try { response = await scope.fetch(target.manifest, { cache: 'no-store', signal: abort.signal }) }
      finally { clearTimeout(timer) }
    }
    if (!response.ok) throw Error(`Offline manifest HTTP ${response.status}`)
    const data = await bounded(() => response.json(), 'Offline manifest body')
    const assets = data.assets?.files, images = data.images?.files
    if (data.build !== target.build || !Array.isArray(assets) || !Array.isArray(images)
      || assets.some(url => typeof url !== 'string' || !url.startsWith('/assets/') || new URL(url, origin).origin !== origin)
      || images.some(url => typeof url !== 'string' || !url.startsWith('/images/') || new URL(url, origin).origin !== origin)) throw Error('Invalid offline manifest')
    return [...new Set([...assets, ...images])]
  }
  async function pin(target, files) {
    const control = await store.open(controlName)
    await control.put(`${origin}/__offline/${target.build}`, new Response(JSON.stringify({ build: target.build, files, at: Date.now() })))
  }
  // Each cache is opened once and the files are checked in parallel batches. Until 2.11.3 every
  // file opened its cache again and waited for the one before it: ~945 files one by one, twice
  // per preparation, which a phone felt as a long pause after "Update" (owner, 2026-11-13).
  async function missing(files) {
    const opened = new Map()
    const cacheFor = url => {
      const name = cacheName(url)
      if (!opened.has(name)) opened.set(name, store.open(name))
      return opened.get(name)
    }
    const result = []
    for (let i = 0; i < files.length; i += 32) {
      const batch = files.slice(i, i + 32)
      const found = await Promise.all(batch.map(async url => {
        const cache = await cacheFor(url)
        return (await bounded(() => cache.match(url), 'Offline cache check'))?.ok
      }))
      batch.forEach((url, j) => { if (!found[j]) result.push(url) })
    }
    return result
  }
  async function download(url) {
    for (let attempt = 0; ; attempt++) {
      const abort = new AbortController()
      const timer = setTimeout(() => abort.abort(), 15000)
      let storage = false
      try {
        const response = await scope.fetch(url, { cache: 'no-store', signal: abort.signal })
        if (!response.ok) throw Object.assign(Error(`HTTP ${response.status}`), { retryable: [408, 429].includes(response.status) || response.status >= 500 })
        storage = true
        await bounded(async () => (await store.open(cacheName(url))).put(url, response), 'Offline cache write')
        return
      } catch (error) {
        if (attempt >= 2 || (error.retryable === false) || (storage && !['TypeError', 'AbortError'].includes(error.name) && !/timed out/.test(error.message))) throw error
      } finally { clearTimeout(timer) }
      await new Promise(resolve => setTimeout(resolve, [500, 1500][attempt]))
    }
  }
  async function cleanup(expiredOnly = false) {
    // Without cross-worker locks, retain entries rather than race another worker's pin/write.
    if (!scope.navigator?.locks) return
    const expiredBy = record => record.build !== identity.build && Date.now() - record.at >= 30 * 86400000
    // The pre-download pass reclaims only expired sets. With none, there is nothing to do — and no
    // reason to ask every open tab who it is (up to 1.5 s for one that does not answer).
    if (expiredOnly) {
      const control = await store.open(controlName)
      let any = false
      for (const request of await control.keys()) {
        const record = await bounded(async () => (await control.match(request)).json(), 'Offline pin read')
        if (expiredBy(record)) { any = true; break }
      }
      if (!any) return
    }
    // A live older/hidden client may still need a build older than the retention window.
    // If any client cannot identify itself, defer cleanup rather than guess its dependencies.
    const clients = await bounded(() => scope.clients?.matchAll({ type: 'window', includeUncontrolled: true }), 'Offline client discovery') || []
    const identities = await Promise.all(clients.map(client => new Promise(resolve => {
      const channel = new MessageChannel()
      const finish = value => { clearTimeout(timer); channel.port1.close(); channel.port2.close(); resolve(value) }
      const timer = setTimeout(() => finish(null), 1500)
      channel.port1.onmessage = ({ data }) => finish(data)
      try { client.postMessage({ type: 'WH_OFFLINE_CLIENT_INFO' }, [channel.port2]) }
      catch { finish(null) }
    })))
    if (identities.some(identity => !identity)) return
    const pins = await Promise.allSettled(identities.map(async identity => pin(identity, await manifest(identity))))
    if (pins.some(result => result.status === 'rejected')) return
    const control = await store.open(controlName)
    const protectedUrls = new Set()
    const expiredUrls = new Set(), expiredPins = []
    for (const request of await control.keys()) {
      const response = await control.match(request)
      const record = await bounded(() => response.json(), 'Offline pin read')
      if (!expiredBy(record)) {
        for (const url of record.files) protectedUrls.add(new URL(url, origin).href)
      } else {
        expiredPins.push(request)
        for (const url of record.files) expiredUrls.add(new URL(url, origin).href)
      }
    }
    // Nothing expired: the pre-download pass has nothing to reclaim, so skip listing big caches.
    if (expiredOnly && !expiredPins.length) return
    for (const name of ['wh-rules-assets', 'wh11ed-images']) {
      const cache = await store.open(name)
      const doomed = (await cache.keys())
        .filter(request => !protectedUrls.has(request.url) && (!expiredOnly || expiredUrls.has(request.url)))
      for (let i = 0; i < doomed.length; i += 20) await Promise.all(doomed.slice(i, i + 20).map(request => cache.delete(request)))
    }
    for (const request of expiredPins) await control.delete(request)
  }
  // Cleanup is housekeeping, never a condition of readiness: a stalled cache listing must not
  // fail a download or a verified set (2.11.2: "Offline cache keys timed out" did both). What it
  // leaves behind is retried by the next preparation.
  async function tidy(expiredOnly) {
    try { await cleanup(expiredOnly); return null }
    catch (error) { return String(error?.message || error) }
  }
  scope.whOfflineFetch = (request, event) => {
    let write = Promise.resolve()
    const task = (async () => {
      let cache
      try {
        cache = await store.open(cacheName(new URL(request.url).pathname), false)
        const stored = await cache.match(request)
        if (stored) return stored
      } catch { /* Runtime storage is optional; offline preparation remains strict. */ }
      const response = await scope.fetch(request)
      if (response.ok && cache) {
        write = Promise.resolve().then(() => cache.put(request, response.clone())).catch(() => {})
      }
      return response
    })()
    // Register before yielding, but keep cache writes out of the response's critical path.
    event?.waitUntil(task.then(() => write, () => {}))
    return task
  }
  scope.addEventListener('message', event => {
    if (event.data?.type !== 'WH_OFFLINE_PREPARE' || !event.ports[0]) return
    const port = event.ports[0]
    port.postMessage({ type: 'accepted' })
    // A request can legitimately wait behind another build's complete download. Keep the
    // channel alive without reporting that other build's files as this request's progress.
    const heartbeat = setInterval(() => port.postMessage({ type: 'accepted' }), 10000)
    const work = serialize(async () => {
      if (cleanupFailure) port.postMessage({ type: 'cleanup-error', message: cleanupFailure })
      cleanupFailure = null
      // Protect this worker's own set before a waiting build can request cleanup.
      const own = await manifest(identity)
      await pin(identity, own)
      const protect = event.data.protect
      if (protect && protect.build !== identity.build) await pin(protect, await manifest(protect))
      const target = event.data.target || identity
      const files = target.build === identity.build ? own : await manifest(target)
      await pin(target, files)
      // Make room before downloading; waiting until after a full new set can deadlock on quota.
      // All active/target/recent pins are already durable, so this removes only obsolete files.
      const early = await tidy(true)
      if (early) port.postMessage({ type: 'cleanup-error', message: early })
      const todo = await missing(files)
      let done = 0
      port.postMessage({ type: 'progress', done, total: todo.length })
      let cursor = 0, failure
      await Promise.all(Array.from({ length: Math.min(2, todo.length) }, async () => {
        while (!failure && cursor < todo.length) {
          try {
            await download(todo[cursor++])
            port.postMessage({ type: 'progress', done: ++done, total: todo.length })
          } catch (error) { failure ||= error }
        }
      }))
      if (failure) throw failure
      // Nothing was downloaded: the set was verified a moment ago, by the pass above.
      const remaining = todo.length ? await missing(files) : []
      if (remaining.length) throw Error(`Offline verification: ${remaining.length} missing, first: ${remaining[0]}`)
      port.postMessage({ type: 'ready' })
      // Still inside the owner lock, so no other preparation pins while this deletes.
      cleanupFailure = await tidy()
    })
    const reply = work.result.catch(error => port.postMessage({ type: 'error', message: String(error.message || error) }))
      .finally(() => { clearInterval(heartbeat); port.close?.() })
    event.waitUntil(Promise.all([reply, work.lifetime]))
  })
}
