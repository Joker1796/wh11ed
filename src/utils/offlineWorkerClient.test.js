// @vitest-environment node
import { it, expect } from 'vitest'
import { prepareWithWorker } from './offlineWorkerClient.js'

it('sends only the build identity, never the uncloneable ServiceWorker handle', async () => {
  const worker = { postMessage(message, [port]) {
    structuredClone(message)
    expect(message.target).toEqual({ build: 'build', manifest: '/releases/build/offline-manifest.json' })
    port.postMessage({ type: 'accepted' })
    port.postMessage({ type: 'ready' })
    port.close()
  } }
  expect(await prepareWithWorker(worker, { build: 'build', manifest: '/releases/build/offline-manifest.json', worker }, () => {})).toBe(true)
})
