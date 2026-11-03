import { describe, it, expect, vi } from 'vitest'
import { settleFirstNavigation } from './firstNavigation.js'

// A player's Android behind a VPN (2026-11-03): the installed app reopened on the page left last
// time, that page's chunk was not on the device and never came, and the app stayed blank — or came
// up with no page at all once the request failed. The page left last time gives way to home.
const never = () => new Promise(() => {})
const now = () => Promise.resolve()
function routerWith(isReady) {
  return { isReady, replace: vi.fn(() => Promise.resolve()) }
}

describe('settleFirstNavigation', () => {
  it('mounts on the page when it comes in time', async () => {
    const router = routerWith(() => Promise.resolve())
    expect(await settleFirstNavigation(router, { resumed: () => true, wait: never })).toBe('ready')
    expect(router.replace).not.toHaveBeenCalled()
  })

  it('opens home when the page left last time does not come', async () => {
    const router = routerWith(never)
    expect(await settleFirstNavigation(router, { resumed: () => true, wait: now, home: '/' })).toBe('home')
    expect(router.replace).toHaveBeenCalledWith('/')
  })

  it('opens home when the page left last time fails to load', async () => {
    const router = routerWith(() => Promise.reject(new TypeError('Failed to fetch dynamically imported module')))
    expect(await settleFirstNavigation(router, { resumed: () => true, wait: never })).toBe('home')
    expect(router.replace).toHaveBeenCalledTimes(1)
  })

  it('keeps a page the reader asked for, and mounts around it while it loads', async () => {
    const router = routerWith(never)
    expect(await settleFirstNavigation(router, { resumed: () => false, wait: now })).toBe('late')
    expect(router.replace).not.toHaveBeenCalled()
  })
})
