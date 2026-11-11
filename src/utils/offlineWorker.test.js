// @vitest-environment node
import { describe, it, expect, vi } from 'vitest'
import { installOfflineWorker } from './offlineWorker.js'

function fixture({ count = 1250, fail = false } = {}) {
  const origin = 'https://test.invalid'
  const identity = { build: 'current', manifest: '/releases/current/offline-manifest.json' }
  const files = Array.from({ length: count }, (_, i) => `/assets/current-${i}.js`)
  const stores = new Map(), listeners = new Map(), messages = []
  const key = input => new URL(typeof input === 'string' ? input : input.url, origin).href
  const caches = {
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map())
      const map = stores.get(name)
      return {
        put: async (url, response) => { map.set(key(url), response.clone()) },
        match: async url => map.get(key(url))?.clone(),
        keys: async () => [...map.keys()].map(url => new Request(url)),
        delete: async url => map.delete(key(url)),
      }
    },
    async match(url) {
      for (const name of stores.keys()) {
        const found = await (await caches.open(name)).match(url)
        if (found) return found
      }
    },
  }
  const scope = { caches, location: { origin }, navigator: { locks: { request: async (_name, options, fn) => (fn || options)() } },
    addEventListener: (type, fn) => listeners.set(type, fn),
    fetch: async input => {
      const url = typeof input === 'string' ? input : input.url
      if (url.includes('offline-manifest.json')) return Response.json({ build: 'current', assets: { files }, images: { files: [] } })
      if (fail) return new Response('missing', { status: 404 })
      return new Response('content')
    },
  }
  installOfflineWorker(scope, identity)
  async function prepare(target = identity) {
    let task
    listeners.get('message')({ data: { type: 'WH_OFFLINE_PREPARE', target },
      ports: [{ postMessage: data => messages.push(data) }], waitUntil: promise => { task = promise } })
    await task
  }
  return { scope, caches, files, prepare, messages }
}

describe('worker-owned offline sets', () => {
  it('keeps a queued request alive without inventing file progress for another build', async () => {
    const f = fixture({ count: 1 })
    let release
    const gate = new Promise(resolve => { release = resolve })
    f.scope.navigator.locks.request = async (_name, _options, task) => { await gate; return task() }
    vi.useFakeTimers()
    try {
      const pending = f.prepare()
      await vi.advanceTimersByTimeAsync(65000)
      expect(f.messages.filter(message => message.type === 'accepted').length).toBeGreaterThan(6)
      expect(f.messages.some(message => message.type === 'progress')).toBe(false)
      vi.useRealTimers()
      release()
      await pending
      expect(f.messages.at(-1).type).toBe('ready')
    } finally { vi.useRealTimers(); release() }
  })

  it('rejects an abandoned lock wait and never starts it after the error', async () => {
    const f = fixture({ count: 1 })
    let enter
    f.scope.navigator.locks.request = async (_name, _options, task) => {
      await new Promise(resolve => { enter = resolve })
      return task()
    }
    vi.useFakeTimers()
    try {
      const pending = f.prepare()
      await vi.advanceTimersByTimeAsync(120001)
      expect(f.messages.at(-1)).toMatchObject({ type: 'error', message: expect.stringContaining('queue timed out') })
      enter()
      await vi.advanceTimersByTimeAsync(1)
      await pending
      expect(f.messages.some(message => message.type === 'ready' || message.type === 'progress')).toBe(false)
      expect(vi.getTimerCount()).toBe(0)
    } finally { vi.useRealTimers(); enter?.() }
  })

  it('keeps ownership after a delete timeout until late cleanup settles before a rollback', async () => {
    const f = fixture({ count: 1 })
    const previous = { build: 'previous', manifest: '/releases/previous/offline-manifest.json' }
    const assets = await f.caches.open('wh-rules-assets')
    await assets.put('/assets/previous.js', new Response('previous'))
    const control = await f.caches.open('wh-rules-offline-control')
    await control.put('/__offline/previous', Response.json({ build: 'previous', at: 0, files: ['/assets/previous.js'] }))
    const fetch = f.scope.fetch
    f.scope.fetch = input => input === previous.manifest
      ? Promise.resolve(Response.json({ build: 'previous', assets: { files: ['/assets/previous.js'] }, images: { files: [] } })) : fetch(input)
    const open = f.scope.caches.open
    let finishDelete
    f.scope.caches.open = async name => {
      const cache = await open(name)
      return { ...cache, delete: request => name === 'wh-rules-assets' && request.url.endsWith('/previous.js')
        ? new Promise(resolve => { finishDelete = async () => resolve(await cache.delete(request)) }) : cache.delete(request) }
    }
    vi.useFakeTimers()
    try {
      const first = f.prepare()
      await vi.advanceTimersByTimeAsync(15001)
      expect(f.messages.at(-1)).toMatchObject({ type: 'error', message: expect.stringContaining('delete timed out') })
      const second = f.prepare(previous)
      await vi.advanceTimersByTimeAsync(100)
      // The new preparation must not refresh the pin while the old delete is still alive.
      expect((await (await control.match('/__offline/previous')).json()).at).toBe(0)
      await finishDelete()
      await first
      await second
      expect(f.messages.at(-1)).toMatchObject({ type: 'ready' })
      expect((await assets.match('/assets/previous.js')).ok).toBe(true)
    } finally { vi.useRealTimers(); await finishDelete?.() }
  })

  it('reclaims expired unpinned files before a quota-limited download', async () => {
    const f = fixture({ count: 1 })
    const assets = await f.caches.open('wh-rules-assets')
    await assets.put('/assets/expired.js', new Response('old'))
    const control = await f.caches.open('wh-rules-offline-control')
    await control.put('/__offline/expired', Response.json({ build: 'expired', at: 0, files: ['/assets/expired.js'] }))
    const open = f.scope.caches.open
    f.scope.caches.open = async name => {
      const cache = await open(name)
      return { ...cache, put: async (url, value) => {
        if (name === 'wh-rules-assets' && url === f.files[0] && await cache.match('/assets/expired.js')) {
          throw new DOMException('Storage full', 'QuotaExceededError')
        }
        return cache.put(url, value)
      } }
    }
    await f.prepare()
    expect(f.messages.at(-1)).toMatchObject({ type: 'ready' })
    expect(await assets.match('/assets/expired.js')).toBeUndefined()
    expect((await assets.match(f.files[0])).ok).toBe(true)
  })

  it('retains an expired build still used by a live client and refreshes its pin', async () => {
    const f = fixture({ count: 1 })
    const identity = { build: 'previous', manifest: '/releases/previous/offline-manifest.json' }
    const fetch = f.scope.fetch
    f.scope.fetch = async input => input === identity.manifest
      ? Response.json({ build: 'previous', assets: { files: ['/assets/previous.js'] }, images: { files: [] } }) : fetch(input)
    f.scope.clients = { matchAll: async () => [{ postMessage: (_message, [port]) => { port.postMessage(identity); port.close() } }] }
    const assets = await f.caches.open('wh-rules-assets')
    await assets.put('/assets/previous.js', new Response('old'))
    await assets.put('/assets/unused.js', new Response('unused'))
    const control = await f.caches.open('wh-rules-offline-control')
    await control.put('/__offline/previous', Response.json({ build: 'previous', at: 0, files: ['/assets/previous.js'] }))
    await f.prepare()
    expect(f.messages.at(-1).type).toBe('ready')
    expect((await assets.match('/assets/previous.js')).ok).toBe(true)
    expect(await assets.match('/assets/unused.js')).toBeUndefined()
  })
  it('defers cleanup when an older live client cannot identify its build', async () => {
    const f = fixture({ count: 1 })
    f.scope.clients = { matchAll: async () => [{ postMessage: () => {} }] }
    const assets = await f.caches.open('wh-rules-assets')
    await assets.put('/assets/unknown-client.js', new Response('old'))
    await f.prepare()
    expect(f.messages.at(-1).type).toBe('ready')
    expect((await assets.match('/assets/unknown-client.js')).ok).toBe(true)
  })

  it('protects a complete current set above the old LRU limit and removes only unpinned chunks', async () => {
    const f = fixture()
    const assets = await f.caches.open('wh-rules-assets')
    for (const url of f.files) await assets.put(url, new Response('current'))
    await assets.put('/assets/obsolete.js', new Response('old'))
    await f.prepare()
    expect(f.messages.at(-1).type).toBe('ready')
    expect(await assets.match('/assets/obsolete.js')).toBeUndefined()
    for (const url of f.files) expect((await assets.match(url))?.ok).toBe(true)
  })
  it('keeps another recently pinned build while preparing the current one', async () => {
    const f = fixture({ count: 2 })
    const control = await f.caches.open('wh-rules-offline-control')
    await control.put('/__offline/previous', Response.json({ build: 'previous', at: Date.now(), files: ['/assets/previous.js'] }))
    const assets = await f.caches.open('wh-rules-assets')
    await assets.put('/assets/previous.js', new Response('old'))
    await f.prepare()
    expect((await assets.match('/assets/previous.js')).ok).toBe(true)
    expect(f.messages.filter(m => m.type === 'progress').at(-1)).toMatchObject({ done: 2, total: 2 })
    await f.prepare()
    expect(f.messages.filter(m => m.type === 'progress').at(-1)).toMatchObject({ done: 0, total: 0 })
  })
  it('fails without ready or cleanup when a download fails, retaining the old cache', async () => {
    const f = fixture({ count: 1, fail: true })
    const assets = await f.caches.open('wh-rules-assets')
    await assets.put('/assets/previous.js', new Response('old'))
    await f.prepare()
    expect(f.messages.at(-1)).toMatchObject({ type: 'error', message: 'HTTP 404' })
    expect(f.messages.some(m => m.type === 'ready')).toBe(false)
    expect((await assets.match('/assets/previous.js')).ok).toBe(true)
  })
})
