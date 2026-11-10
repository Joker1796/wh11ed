import { beforeEach, describe, expect, it } from 'vitest'
import { installNavigationState, navigationState } from './navigationState.js'
import { createRouter, createMemoryHistory } from 'vue-router'
const deferred = () => { let reject; const promise = new Promise((_, no) => { reject = no }); return { promise, reject } }
describe('navigation outcomes', () => {
  beforeEach(() => { navigationState.phase = 'idle' })
  it('ignores an abandoned route failure after a successful later navigation', async () => {
    const slow = deferred()
    const router = createRouter({ history: createMemoryHistory(), routes: [
      { path: '/', component: {} }, { path: '/slow', component: () => slow.promise }, { path: '/other', component: {} },
    ] })
    installNavigationState(router)
    router.onError(() => {})
    await router.push('/')
    const old = router.push('/slow').catch(() => {})
    await new Promise(resolve => setTimeout(resolve, 0))
    await router.push('/other')
    slow.reject(new Error('Failed to fetch dynamically imported module'))
    await old
    expect(router.currentRoute.value.path).toBe('/other')
    expect(navigationState.phase).toBe('idle')
    expect(navigationState.target).toBe('/other')
  })
  it('lets rules open while personal routes wait before importing their stores', async () => {
    let release
    const personalDataReady = new Promise(resolve => { release = resolve })
    let imported = false
    const router = createRouter({ history: createMemoryHistory(), routes: [
      { path: '/rules', component: {} },
      { path: '/ru/roster', component: async () => { imported = true; return {} } },
    ] })
    installNavigationState(router, { personalDataReady })
    await router.push('/rules')
    const next = router.push('/ru/roster')
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(imported).toBe(false)
    release()
    await next
    expect(imported).toBe(true)
  })

  it('exposes a failed explicit destination for retry', async () => {
    const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/bad', component: () => Promise.reject(new Error('network')) }] })
    router.onError(() => {})
    installNavigationState(router)
    await router.push('/bad').catch(() => {})
    expect(navigationState.phase).toBe('error')
    expect(navigationState.target).toBe('/bad')
  })
})
