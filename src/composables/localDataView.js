import { stableJson } from '../utils/stableJson.js'
import { nextTick } from 'vue'
import { localData } from './localData.js'

// A store's pending edits must reach the write coordinator before its baseline can advance.
// Hydration is a read, never another autosave. Keep the guard through Vue's batched watchers.
export function localDataView({ snapshot, flush, hydrate }) {
  let captured = snapshot()
  let applying = false
  localData.beforeRefresh?.(() => {
    const next = snapshot()
    if (next === captured) return
    flush()
    captured = next
  })
  localData.subscribe?.(async () => {
    applying = true
    try { hydrate(); captured = snapshot(); await nextTick() } finally { applying = false }
  })
  return () => applying
}

// Keep references held by an open form when a refreshed entity has identical content.
export function keepLocalReference(before, after) {
  return before != null && after != null && stableJson(before) === stableJson(after) ? before : after
}
