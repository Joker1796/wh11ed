// Serialized into worker-info.js by Vite. Keep this function self-contained.
export function installOfflineWorker(scope, identity) {
  const controlName = 'wh-rules-offline-control'
  const cacheName = url => url.startsWith('/images/') ? 'wh11ed-images' : 'wh-rules-assets'
  const origin = scope.location.origin
  const bounded = (task, label) => {
    let timer
    return Promise.race([Promise.resolve().then(task), new Promise((_, reject) => {
      timer = setTimeout(() => reject(Error(`${label} timed out after 15000 ms`)), 15000)
    })]).finally(() => clearTimeout(timer))
  }
  const store = {
    match: url => bounded(() => scope.caches.match(url), 'Offline manifest cache'),
    async open(name) {
      const cache = await bounded(() => scope.caches.open(name), 'Offline cache open')
      return Object.fromEntries(['match', 'put', 'keys', 'delete'].map(method => [method,
        (...args) => bounded(() => cache[method](...args), `Offline cache ${method}`)]))
    },
  }
  let queue = Promise.resolve()
  const serialize = task => {
    const run = queue.then(() => scope.navigator?.locks
      ? scope.navigator.locks.request('wh-rules-offline-owner', task) : task())
    queue = run.catch(() => {})
    return run
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
  async function missing(files) {
    const result = []
    for (const url of files) {
      const cache = await store.open(cacheName(url))
      if (!(await bounded(() => cache.match(url), 'Offline cache check'))?.ok) result.push(url)
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
  async function cleanup() {
    // Without cross-worker locks, retain entries rather than race another worker's pin/write.
    if (!scope.navigator?.locks) return
    // A live older/hidden client may still need a build older than the retention window.
    // If any client cannot identify itself, defer cleanup rather than guess its dependencies.
    const clients = await scope.clients?.matchAll({ type: 'window', includeUncontrolled: true }) || []
    const identities = await Promise.all(clients.map(client => new Promise(resolve => {
      const channel = new MessageChannel()
      const finish = value => { clearTimeout(timer); channel.port1.close(); channel.port2.close(); resolve(value) }
      const timer = setTimeout(() => finish(null), 1500)
      channel.port1.onmessage = ({ data }) => finish(data)
      try { client.postMessage({ type: 'WH_OFFLINE_CLIENT_INFO' }, [channel.port2]) }
      catch { finish(null) }
    })))
    if (identities.some(identity => !identity)) return
    try { await Promise.all(identities.map(async identity => pin(identity, await manifest(identity)))) }
    catch { return }
    const control = await store.open(controlName)
    const protectedUrls = new Set()
    for (const request of await control.keys()) {
      const record = await (await control.match(request)).json()
      if (record.build === identity.build || Date.now() - record.at < 30 * 86400000) {
        for (const url of record.files) protectedUrls.add(new URL(url, origin).href)
      } else await control.delete(request)
    }
    for (const name of ['wh-rules-assets', 'wh11ed-images']) {
      const cache = await store.open(name)
      for (const request of await cache.keys()) if (!protectedUrls.has(request.url)) await cache.delete(request)
    }
  }
  scope.whOfflineFetch = async request => {
    const url = new URL(request.url).pathname
    const cache = await store.open(cacheName(url))
    const stored = await cache.match(request)
    if (stored) return stored
    const response = await scope.fetch(request)
    if (response.ok) await cache.put(request, response.clone())
    return response
  }
  scope.addEventListener('message', event => {
    if (event.data?.type !== 'WH_OFFLINE_PREPARE' || !event.ports[0]) return
    const port = event.ports[0]
    port.postMessage({ type: 'accepted' })
    // A request can legitimately wait behind another build's complete download. Keep the
    // channel alive without reporting that other build's files as this request's progress.
    const heartbeat = setInterval(() => port.postMessage({ type: 'accepted' }), 10000)
    const task = serialize(async () => {
      // Protect this worker's own set before a waiting build can request cleanup.
      const own = await manifest(identity)
      await pin(identity, own)
      const protect = event.data.protect
      if (protect && protect.build !== identity.build) await pin(protect, await manifest(protect))
      const target = event.data.target || identity
      const files = target.build === identity.build ? own : await manifest(target)
      await pin(target, files)
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
      const remaining = await missing(files)
      if (remaining.length) throw Error(`Offline verification: ${remaining.length} missing, first: ${remaining[0]}`)
      await cleanup()
      port.postMessage({ type: 'ready' })
    }).catch(error => port.postMessage({ type: 'error', message: String(error.message || error) })).finally(() => { clearInterval(heartbeat); port.close?.() })
    event.waitUntil(task)
  })
}
