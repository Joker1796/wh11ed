import { ref } from 'vue'
import { getItem, setItem } from './safeStorage.js'

// Lists the player pinned to the top of the roster list (owner, 2026-09-29). Per device, like the
// catalogue's filters: a pin is how THIS screen is arranged, not a fact about the army, so it is
// not written onto the roster (which would also bump its date and ask the cloud for an upload).
// A pinned id whose list was deleted simply matches nothing.
const KEY = 'wh11ed-roster-pins'

function load() {
  try { return new Set(JSON.parse(getItem(KEY, '[]'))) } catch { return new Set() }
}
const pins = ref(load())

export function isRosterPinned(id) { return pins.value.has(id) }

export function toggleRosterPin(id) {
  const next = new Set(pins.value)
  next.has(id) ? next.delete(id) : next.add(id)
  pins.value = next
  setItem(KEY, JSON.stringify([...next]))
}

// Pinned lists first, each half in the order it came in.
export function pinnedFirst(list) {
  return [...list.filter((r) => pins.value.has(r.id)), ...list.filter((r) => !pins.value.has(r.id))]
}
