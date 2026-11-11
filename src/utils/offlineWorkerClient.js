// Older controllers do not understand this protocol. Only their initial handshake may fall
// back to the legacy page downloader; an accepted worker request must never start a second writer.
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
export function prepareWithWorker(worker, target, progress, protect) {
  publishIdentity(protect)
  if (!worker?.postMessage || typeof MessageChannel === 'undefined') return Promise.resolve(null)
  const channel = new MessageChannel()
  return new Promise((resolve, reject) => {
    let accepted = false
    let timer
    const finish = (error, value) => {
      clearTimeout(timer)
      channel.port1.close(); channel.port2.close()
      if (error) reject(error); else resolve(value)
    }
    const arm = ms => {
      clearTimeout(timer)
      timer = setTimeout(() => accepted ? finish(Error('Offline worker preparation timed out')) : finish(null, null), ms)
    }
    channel.port1.onmessage = ({ data }) => {
      if (!['accepted', 'progress', 'ready', 'error'].includes(data?.type)) return
      accepted = true
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
