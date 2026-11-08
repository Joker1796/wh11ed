import { withinDeadline } from '../utils/deadline.js'
import { topUpOffline } from './useOfflineWarmup.js'
import { isStandaloneDisplay } from './standalone.js'
import { appInstalled } from './appInstalled.js'
import { getItem } from './safeStorage.js'

// Tabs and the installed app can share one worker. A tab must not activate an incomplete update
// behind the app's back, including an older installation that only left an offline marker.
export const offlineRequired = () => isStandaloneDisplay() || appInstalled() || getItem('wh11ed-offline-warmed') !== null

// Ask the waiting worker itself. latest/version.json may already describe a later deployment.
export async function workerBuild(worker) {
  if (!worker || typeof MessageChannel === 'undefined') return null
  const channel = new MessageChannel()
  try {
    return await withinDeadline(() => new Promise((resolve) => {
      channel.port1.onmessage = ({ data }) => {
        resolve(typeof data?.build === 'string' && data.manifest === `/releases/${data.build}/offline-manifest.json` ? data : null)
      }
      worker.postMessage({ type: 'WH_BUILD_INFO' }, [channel.port2])
    }), 1500, 'Worker build')
  } catch { return null }
  finally { channel.port1.close(); channel.port2.close() }
}

export async function prepareOfflineWorker(worker) {
  const target = await workerBuild(worker)
  return target ? topUpOffline(target) : false
}
