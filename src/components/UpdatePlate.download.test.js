import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

vi.mock('../composables/standalone.js', () => ({ isStandaloneDisplay: () => true }))

beforeEach(() => {
  vi.resetModules()
  localStorage.clear()
  // This test drives the update download; do not also start the initial offline warm-up.
  vi.stubGlobal('requestIdleCallback', vi.fn())
  Object.defineProperty(navigator, 'serviceWorker', { value: { controller: {} }, configurable: true })
})
afterEach(() => {
  vi.unstubAllGlobals()
  delete navigator.serviceWorker
})

it.each(['waiting', 'active'])('keeps progress for a %s worker until the response body is committed to the offline cache', async (state) => {
  const target = { app: '2.11.0', build: 'next', manifest: '/releases/next/offline-manifest.json' }
  const manifest = { build: 'next', assets: { files: ['/assets/slow.js'], bytes: 100 }, images: { files: [], bytes: 0 } }
  const held = new Map()
  let finishBody
  const bodyWritten = new Promise((resolve) => { finishBody = resolve })
  const put = vi.fn(async (url, response) => {
    await bodyWritten
    held.set(url, response)
  })
  vi.stubGlobal('caches', {
    match: async () => undefined,
    open: async () => ({ match: async (url) => held.get(url), put }),
  })
  vi.stubGlobal('fetch', vi.fn(async (url) => ({
    ok: true,
    json: async () => url === '/version.json' ? target : manifest,
  })))
  const worker = { postMessage: (_message, [port]) => port.postMessage(target) }
  const { appUpdate, updateFound, applyUpdate } = await import('../composables/useAppUpdate.js')
  const { useOfflineWarmup } = await import('../composables/useOfflineWarmup.js')
  const UpdatePlate = (await import('./UpdatePlate.vue')).default
  const apply = vi.fn()
  const found = updateFound(apply, { worker, inPlace: state === 'active' })
  const plate = mount(UpdatePlate)
  try {
    await vi.waitFor(() => expect(put).toHaveBeenCalledOnce())
    await flushPromises()
    expect(appUpdate.phase).toBe('downloading')
    expect(useOfflineWarmup().done.value).toBe(0)
    expect(plate.find('[role="progressbar"]').exists()).toBe(true)
    expect(plate.find('button').exists()).toBe(false)
    expect(apply).not.toHaveBeenCalled()

    finishBody()
    await found
    await flushPromises()
    expect(appUpdate.phase).toBe('ready')
    expect(useOfflineWarmup().done.value).toBe(1)
    expect(plate.find('button').exists()).toBe(true)
    await applyUpdate()
    expect(apply).toHaveBeenCalledOnce()
    expect(put).toHaveBeenCalledOnce()
  } finally {
    finishBody()
    await found
    plate.unmount()
  }
})

it('offers Continue after a partial download and keeps committed files on retry', async () => {
  const target = { app: '2.11.1', build: 'next', manifest: '/releases/next/offline-manifest.json' }
  const manifest = { build: 'next', assets: { files: ['/assets/kept.js', '/assets/missing.js'] }, images: { files: [] } }
  const held = new Map()
  let unavailable = true
  const fetch = vi.fn(async url => url.endsWith('offline-manifest.json')
    ? { ok: true, json: async () => manifest }
    : { ok: url !== '/assets/missing.js' || !unavailable, status: 503 })
  vi.stubGlobal('fetch', fetch)
  vi.stubGlobal('caches', { match: async () => undefined, open: async () => ({ match: async url => held.get(url), put: async (url, response) => held.set(url, response) }) })
  const worker = { postMessage: (_message, [port]) => port.postMessage(target) }
  const { appUpdate, updateFound, applyUpdate } = await import('../composables/useAppUpdate.js')
  const { useOfflineWarmup } = await import('../composables/useOfflineWarmup.js')
  const UpdatePlate = (await import('./UpdatePlate.vue')).default
  const apply = vi.fn()
  const plate = mount(UpdatePlate)
  try {
    await updateFound(apply, { worker })
    await flushPromises()
    expect(appUpdate.phase).toBe('error')
    expect(plate.find('button').text()).toBe('Continue')
    expect(useOfflineWarmup().done.value).toBe(1)
    expect(apply).not.toHaveBeenCalled()
    unavailable = false
    await applyUpdate()
    expect(apply).toHaveBeenCalledOnce()
    expect(fetch.mock.calls.filter(([url]) => url === '/assets/kept.js')).toHaveLength(1)
    expect(held.size).toBe(2)
  } finally { plate.unmount() }
})
