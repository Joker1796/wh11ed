import { defineAsyncComponent } from 'vue'
import { loadChunk } from './staleChunks.js'

// Dialogs and nested setup screens need the same bounded recovery as routes and faction data.
// Keep each caller's loading component/delay, without another independent retry policy.
export function asyncComponent(source) {
  const options = typeof source === 'function' ? { loader: source } : source
  return defineAsyncComponent({ ...options, loader: () => loadChunk(options.loader) })
}
