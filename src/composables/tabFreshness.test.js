import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createRouter, createMemoryHistory } from 'vue-router'
import { appUpdate, applyUpdate, _resetAppUpdate } from './useAppUpdate.js'
import { checkLiveVersion, watchTabFreshness, CHECK_FLOOR_MS, _resetTabFreshness } from './tabFreshness.js'

const live = (app) => async () => ({ app })

describe('a tab with no worker learns of a new version', () => {
  beforeEach(() => {
    _resetAppUpdate()
    _resetTabFreshness()
  })

  it('nothing new: no plate', async () => {
    expect(await checkLiveVersion({ ask: live('2.9.5'), running: '2.9.5' })).toBe(false)
    expect(appUpdate.phase).toBe('idle')
  })

  it('a newer number: the plate, ready at once, naming it', async () => {
    expect(await checkLiveVersion({ ask: live('2.9.6'), running: '2.9.5' })).toBe(true)
    await Promise.resolve()
    expect(appUpdate).toMatchObject({ phase: 'ready', version: '2.9.6', tab: true })
  })

  it('asks at most once in two minutes, unless the timer asks', async () => {
    const ask = vi.fn(live('2.9.5'))
    await checkLiveVersion({ ask, running: '2.9.5', now: 1_000_000 })
    await checkLiveVersion({ ask, running: '2.9.5', now: 1_000_000 + CHECK_FLOOR_MS - 1 })
    expect(ask).toHaveBeenCalledTimes(1)
    await checkLiveVersion({ ask, running: '2.9.5', now: 1_000_000 + 1, force: true })
    expect(ask).toHaveBeenCalledTimes(2)
  })

  it('cannot tell (offline, the server silent): no plate', async () => {
    expect(await checkLiveVersion({ ask: async () => null, running: '2.9.5' })).toBe(false)
    expect(appUpdate.phase).toBe('idle')
  })

  it('the button reloads', async () => {
    const reload = vi.fn()
    vi.stubGlobal('location', { ...window.location, reload })
    await checkLiveVersion({ ask: live('2.9.6'), running: '2.9.5' })
    await Promise.resolve()
    applyUpdate()
    expect(reload).toHaveBeenCalledTimes(1)
    vi.unstubAllGlobals()
  })

  it('under the plate, a link inside the site loads its page whole', async () => {
    const assign = vi.fn()
    vi.stubGlobal('location', { ...window.location, assign })
    const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: {} }, { path: '/rules', component: {} }, { path: '/tracker', component: {} }] })
    watchTabFreshness(router)
    await router.push('/')
    await router.push('/rules') // no plate: an ordinary navigation
    expect(router.currentRoute.value.path).toBe('/rules')
    expect(assign).not.toHaveBeenCalled()
    await checkLiveVersion({ ask: live('2.9.6'), running: '2.9.5', force: true })
    await Promise.resolve()
    await router.push('/tracker')
    expect(assign).toHaveBeenCalledWith('/tracker')
    expect(router.currentRoute.value.path).toBe('/rules')
    vi.unstubAllGlobals()
  })
})
