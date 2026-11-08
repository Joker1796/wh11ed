import { BUILD_ID, OFFLINE_MANIFEST_URL } from '../buildInfo.js'
import { chunkRecoveryState } from './staleChunks.js'

// Only attached to the player's bug report. No navigation history, tokens or new telemetry.
export function deliveryContext() {
  return {
    build: BUILD_ID,
    manifest: OFFLINE_MANIFEST_URL,
    controlled: Boolean(navigator.serviceWorker?.controller),
    online: navigator.onLine,
    recovery: chunkRecoveryState(),
  }
}
