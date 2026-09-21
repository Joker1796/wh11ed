// Reader preferences for the roster builder — how the screens are drawn, not what a list is.
// A module singleton persisted per device: a preference must not ride a share link or sync to
// another device the way a roster field would, so it is deliberately NOT on the roster record.
import { ref, watch } from 'vue'
import { getItem, setItem } from './safeStorage.js'

// "Show points left" — the remainder under the "used / limit" readouts while building (settings
// bar, both sticky bars). Off by default: the number a player subtracts in their head is worth a
// second line only to the player who asked for it (2026-09-21).
const showPointsLeft = ref(getItem('wh11ed-roster-points-left') === '1')
watch(showPointsLeft, (v) => setItem('wh11ed-roster-points-left', v ? '1' : '0'))

export function useRosterPrefs() {
  return { showPointsLeft }
}
