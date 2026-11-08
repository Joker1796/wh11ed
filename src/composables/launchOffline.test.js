import { afterEach, expect, it, vi } from 'vitest'
vi.mock('./standalone.js', () => ({ isStandaloneDisplay: () => true }))
vi.mock('./workerBuild.js', () => ({ prepareOfflineWorker: vi.fn(async () => false), offlineRequired: () => true }))
const { launchGate } = await import('./launchGate.js')

afterEach(() => { vi.unstubAllGlobals(); delete navigator.serviceWorker })

it('keeps the installed working build when the waiting build is not complete offline', async () => {
  localStorage.clear()
  const waiting = { postMessage: vi.fn() }
  const sw = { controller: {}, getRegistration: async () => ({ waiting }) }
  Object.defineProperty(navigator, 'serviceWorker', { value: sw, configurable: true })
  vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
  const reload = vi.fn()
  expect(await launchGate({ reload, splash: () => () => {} })).toBe(false)
  expect(waiting.postMessage).not.toHaveBeenCalled()
  expect(reload).not.toHaveBeenCalled()
})
