import { beforeEach, describe, expect, it } from 'vitest'
import { workerBuild, offlineRequired } from './workerBuild.js'
beforeEach(() => localStorage.clear())

describe('waiting worker identity', () => {
  it.each(['wh11ed-app-installed', 'wh11ed-offline-warmed'])('protects the installed offline set from a tab with %s', (key) => {
    expect(offlineRequired()).toBe(false)
    localStorage.setItem(key, '1')
    expect(offlineRequired()).toBe(true)
  })
  it('reads the worker identity independently of latest on the server', async () => {
    const info = { app: '1.0', build: 'a', manifest: '/releases/a/offline-manifest.json' }
    const worker = { postMessage: (_message, [port]) => port.postMessage(info) }
    expect(await workerBuild(worker)).toEqual(info)
  })
  it('refuses a worker that names a different build manifest', async () => {
    const worker = { postMessage: (_message, [port]) => port.postMessage({ build: 'a', manifest: '/releases/b/offline-manifest.json' }) }
    expect(await workerBuild(worker)).toBeNull()
  })
})
