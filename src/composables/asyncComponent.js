import { defineAsyncComponent } from 'vue'
import { boundedChunk, importQuietly } from './staleChunks.js'
import { waitForPersonalData } from './personalDataReady.js'
import AsyncLoadError from '../components/AsyncLoadError.vue'

// Nested screens share the import deadline and retry budget, but report failures locally.
// No background reload may discard the screen around a failed panel.
export function asyncComponent(source) {
  const options = typeof source === 'function' ? { loader: source } : source
  return defineAsyncComponent({ errorComponent: AsyncLoadError, loadingComponent: AsyncLoadError, delay: 300, ...options, loader: async () => { await waitForPersonalData(); return importQuietly(() => boundedChunk(options.loader), { recover: () => {} }) } })
}
