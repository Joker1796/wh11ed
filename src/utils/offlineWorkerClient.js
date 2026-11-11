// Capability negotiation is read-only: a late reply cannot start a competing downloader.
// Once preparation is submitted, every failure rejects instead of enabling a second writer.
let listening = false
let clientIdentity
function publishIdentity(identity) {
  clientIdentity = identity
  if (listening || typeof navigator === 'undefined' || !navigator.serviceWorker?.addEventListener) return
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data?.type === 'WH_OFFLINE_CLIENT_INFO' && clientIdentity) event.ports?.[0]?.postMessage(clientIdentity)
  })
  listening = true
}
function supportsPreparation(worker) {
  const channel = new MessageChannel()
  return new Promise(resolve => {
    const finish = supported => {
      clearTimeout(timer)
      channel.port1.close(); channel.port2.close()
      resolve(supported)
    }
    const timer = setTimeout(() => finish(false), 1500)
    channel.port1.onmessage = ({ data }) => finish(data?.offlineProtocol === 1)
    try { worker.postMessage({ type: 'WH_BUILD_INFO' }, [channel.port2]) }
    catch { finish(false) }
  })
}
export async function prepareWithWorker(worker, target, progress, protect) {
  publishIdentity(protect)
  if (!worker?.postMessage || typeof MessageChannel === 'undefined') return null
  if (!await supportsPreparation(worker)) return null
  const channel = new MessageChannel()
  return new Promise((resolve, reject) => {
    let timer
    const finish = (error, value) => {
      clearTimeout(timer)
      channel.port1.close(); channel.port2.close()
      if (error) reject(error); else resolve(value)
    }
    const arm = ms => {
      clearTimeout(timer)
      timer = setTimeout(() => finish(Error('Offline worker preparation timed out')), ms)
    }
    channel.port1.onmessage = ({ data }) => {
      if (!['accepted', 'progress', 'ready', 'error'].includes(data?.type)) return
      arm(60000)
      if (data.type === 'progress') progress(data)
      if (data.type === 'ready') finish(null, true)
      if (data.type === 'error') finish(Error(data.message))
    }
    arm(1500)
    try { worker.postMessage({ type: 'WH_OFFLINE_PREPARE', target: { build: target.build, manifest: target.manifest }, protect }, [channel.port2]) }
    catch (error) { finish(error) }
  })
}
