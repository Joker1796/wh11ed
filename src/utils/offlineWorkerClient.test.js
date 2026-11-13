// @vitest-environment node
import { setImmediate } from 'node:timers/promises'
import { afterEach, it, expect, vi } from 'vitest'
import { prepareWithWorker } from './offlineWorkerClient.js'

it('sends only the build identity, never the uncloneable ServiceWorker handle', async () => {
  const worker = { postMessage(message, [port]) {
    structuredClone(message)
    if (message.type === 'WH_BUILD_INFO') { port.postMessage({ offlineProtocol: 1 }); port.close(); return }
    expect(message.target).toEqual({ build: 'build', manifest: '/releases/build/offline-manifest.json' })
    port.postMessage({ type: 'accepted' })
    port.postMessage({ type: 'ready' })
    port.close()
  } }
  expect(await prepareWithWorker(worker, { build: 'build', manifest: '/releases/build/offline-manifest.json', worker }, () => {})).toBe(true)
})

afterEach(() => vi.useRealTimers())

it.each([undefined, 2])('never submits a mutating request to an unsupported worker (protocol %s)', async offlineProtocol => {
  const messages = []
  const worker = { postMessage(message, [port]) {
    messages.push(message.type)
    port.postMessage({ build: 'old', offlineProtocol })
    port.close()
  } }
  expect(await prepareWithWorker(worker, { build: 'build' }, () => {})).toBeNull()
  expect(messages).toEqual(['WH_BUILD_INFO'])
})

it('does not start a worker writer after capability negotiation has already timed out', async () => {
  vi.useFakeTimers()
  const messages = []
  let delayedReply
  const worker = { postMessage(message, [port]) {
    messages.push(message.type)
    delayedReply = () => { port.postMessage({ offlineProtocol: 1 }); port.close() }
  } }
  const pending = prepareWithWorker(worker, { build: 'build' }, () => {})
  await vi.advanceTimersByTimeAsync(1500)
  expect(await pending).toBeNull()
  delayedReply()
  await setImmediate()
  expect(messages).toEqual(['WH_BUILD_INFO'])
})

it.each([false, true])('rejects preparation timeout without allowing a legacy writer (accepted: %s)', async accepted => {
  vi.useFakeTimers()
  let submitted
  const started = new Promise(resolve => { submitted = resolve })
  const worker = { postMessage(message, [port]) {
    if (message.type === 'WH_BUILD_INFO') { port.postMessage({ offlineProtocol: 1 }); port.close(); return }
    if (accepted) port.postMessage({ type: 'accepted' })
    port.close()
    submitted()
  } }
  const pending = prepareWithWorker(worker, { build: 'build' }, () => {})
  const rejected = expect(pending).rejects.toThrow('Offline worker preparation timed out')
  await started
  await setImmediate()
  await setImmediate()
  await vi.advanceTimersByTimeAsync(accepted ? 60000 : 1500)
  await rejected
})

it('preserves progress and the protected client identity after capability negotiation', async () => {
  const progress = vi.fn()
  const protect = { build: 'current', manifest: '/releases/current/offline-manifest.json' }
  const worker = { postMessage(message, [port]) {
    if (message.type === 'WH_BUILD_INFO') { port.postMessage({ offlineProtocol: 1 }); port.close(); return }
    expect(message.protect).toEqual(protect)
    port.postMessage({ type: 'progress', done: 1, total: 1 })
    port.postMessage({ type: 'ready' })
    port.close()
  } }
  expect(await prepareWithWorker(worker, { build: 'build' }, progress, protect)).toBe(true)
  expect(progress).toHaveBeenCalledWith({ type: 'progress', done: 1, total: 1 })
})

it.each(['postMessage', 'worker'])('rejects %s failure after negotiation without legacy fallback', async failure => {
  const worker = { postMessage(message, [port]) {
    if (message.type === 'WH_BUILD_INFO') { port.postMessage({ offlineProtocol: 1 }); port.close(); return }
    if (failure === 'postMessage') { port.close(); throw Error('Preparation failed') }
    port.postMessage({ type: 'error', message: 'Preparation failed' })
    port.close()
  } }
  await expect(prepareWithWorker(worker, { build: 'build' }, () => {})).rejects.toThrow('Preparation failed')
})

it('hands a cleanup failure to the notice and still resolves ready', async () => {
  const notices = []
  const worker = { postMessage(message, [port]) {
    if (message.type === 'WH_BUILD_INFO') { port.postMessage({ offlineProtocol: 1 }); port.close(); return }
    port.postMessage({ type: 'accepted' })
    port.postMessage({ type: 'cleanup-error', message: 'Offline cache keys (wh-rules-assets) timed out after 60000 ms' })
    port.postMessage({ type: 'ready' })
    port.close()
  } }
  expect(await prepareWithWorker(worker, { build: 'build', manifest: '/releases/build/offline-manifest.json' }, () => {}, undefined, m => notices.push(m))).toBe(true)
  expect(notices).toEqual(['Offline cache keys (wh-rules-assets) timed out after 60000 ms'])
})
