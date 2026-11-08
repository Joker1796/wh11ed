import { withinDeadline } from './deadline.js'

export const NETWORK_MS = 15000

// No automatic replay: a timed-out write may already have reached the server. Callers reconcile
// versions before deciding whether to send again. The same budget covers headers AND the body.
export async function fetchDeadline(url, options = {}, ms = NETWORK_MS) {
  const abort = new AbortController()
  const started = Date.now()
  const external = options.signal
  const cancel = () => abort.abort(external.reason)
  if (external?.aborted) cancel()
  else external?.addEventListener('abort', cancel, { once: true })
  const remaining = () => Math.max(1, ms - (Date.now() - started))
  const bounded = async (task, complete = true) => {
    try { return await withinDeadline(task, remaining(), 'Network request') }
    catch (err) { abort.abort(); external?.removeEventListener('abort', cancel); throw err }
    finally { if (complete) external?.removeEventListener('abort', cancel) }
  }
  // Start synchronously, like fetch itself (auth deduplicates the request immediately).
  const request = fetch(url, { ...options, signal: abort.signal })
  const response = await bounded(() => request, false)
  if (response.body === null) external?.removeEventListener('abort', cancel)
  for (const method of ['json', 'text', 'arrayBuffer', 'blob', 'formData']) {
    if (typeof response[method] !== 'function') continue
    const read = response[method].bind(response)
    Object.defineProperty(response, method, { configurable: true, value: () => bounded(read) })
  }
  return response
}
