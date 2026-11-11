import { it, expect, vi } from 'vitest'
import 'fake-indexeddb/auto'
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb'
import { CacheExpiration } from 'workbox-expiration/CacheExpiration.js'

it('reproduces deletion of current-build files when newer unused chunks fill the shared LRU', async () => {
  vi.stubGlobal('indexedDB', new IDBFactory())
  vi.stubGlobal('IDBKeyRange', IDBKeyRange)
  const deleted = []
  vi.stubGlobal('caches', { open: async () => ({ delete: async url => { deleted.push(url); return true } }) })
  try {
    const expiry = new CacheExpiration('wh-rules-assets', { maxEntries: 1200 })
    const now = Date.now()
    for (let i = 0; i < 625; i++) await expiry._timestampModel.setTimestamp(`http://localhost/assets/current-${i}.js`, now - 1000)
    for (let i = 0; i < 600; i++) await expiry._timestampModel.setTimestamp(`http://localhost/assets/other-${i}.js`, now)
    await expiry.expireEntries()
    expect(deleted).toHaveLength(25)
    expect(deleted.every(url => url.includes('/current-'))).toBe(true)
  } finally { vi.unstubAllGlobals() }
})
