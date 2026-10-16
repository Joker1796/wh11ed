import { describe, it, expect, beforeEach, vi } from 'vitest'

vi.mock('./standalone.js', () => ({ isStandaloneDisplay: vi.fn(() => false) }))
const { isStandaloneDisplay } = await import('./standalone.js')
const { workerWanted, separateAppStorage, tabMayLeaveWorker, dropCaches, tidyAfterWorker } = await import('./workerPolicy.js')

const IPHONE = { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1', platform: 'iPhone', maxTouchPoints: 5 }
const IPAD = { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15', platform: 'MacIntel', maxTouchPoints: 5 }
const MAC_SAFARI = { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15', platform: 'MacIntel', maxTouchPoints: 0 }
const MAC_CHROME = { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36', platform: 'MacIntel', maxTouchPoints: 0 }
const ANDROID = { userAgent: 'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Mobile Safari/537.36', platform: 'Linux armv8l', maxTouchPoints: 5 }
const YANDEX = { userAgent: 'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0 YaBrowser/25.6 Mobile Safari/537.36', platform: 'Linux armv8l', maxTouchPoints: 5 }

function fakeCaches(names) {
  const held = new Set(names)
  return { keys: async () => [...held], delete: vi.fn(async (n) => held.delete(n)), held }
}

describe('who gets a service worker', () => {
  beforeEach(() => {
    localStorage.clear()
    isStandaloneDisplay.mockReturnValue(false)
  })

  it('the installed app, and a tab on a device that has it', () => {
    expect(workerWanted()).toBe(false)
    isStandaloneDisplay.mockReturnValue(true)
    expect(workerWanted()).toBe(true)
    isStandaloneDisplay.mockReturnValue(false)
    localStorage.setItem('wh11ed-app-installed', '1')
    expect(workerWanted()).toBe(true)
  })

  it('tells the platforms where the app keeps a storage of its own', () => {
    expect(separateAppStorage(IPHONE)).toBe(true)
    expect(separateAppStorage(IPAD)).toBe(true)
    expect(separateAppStorage(MAC_SAFARI)).toBe(true)
    expect(separateAppStorage(MAC_CHROME)).toBe(false)
    expect(separateAppStorage(ANDROID)).toBe(false)
    expect(separateAppStorage(YANDEX)).toBe(false)
  })

  it('a tab leaves its worker unless the app may be beside it', () => {
    expect(tabMayLeaveWorker(ANDROID)).toBe(true)
    // Downloaded for offline, on a shared storage: perhaps the app, installed before the mark existed.
    localStorage.setItem('wh11ed-offline-warmed', '780.abc')
    expect(tabMayLeaveWorker(ANDROID)).toBe(false)
    expect(tabMayLeaveWorker(IPHONE)).toBe(true) // the app's storage is its own there
    localStorage.setItem('wh11ed-app-installed', '1')
    expect(tabMayLeaveWorker(IPHONE)).toBe(false)
  })

  it('drops only our caches', async () => {
    const store = fakeCaches(['workbox-precache-v2-https://wh-rules.ru/', 'wh-rules-assets', 'wh11ed-images', 'someone-else'])
    expect(await dropCaches(store)).toBe(3)
    expect([...store.held]).toEqual(['someone-else'])
  })

  it('a tab with no worker tidies what one left, and forgets the offline download', async () => {
    const store = fakeCaches(['wh-rules-assets'])
    vi.stubGlobal('caches', store)
    localStorage.setItem('wh11ed-offline-warmed', '780.abc')
    await tidyAfterWorker({ registration: async () => ({}) })
    expect(store.held.size).toBe(1) // still under a worker: nothing touched
    await tidyAfterWorker({ registration: async () => null })
    expect(store.held.size).toBe(0)
    expect(localStorage.getItem('wh11ed-offline-warmed')).toBe(null)
    vi.unstubAllGlobals()
  })
})
