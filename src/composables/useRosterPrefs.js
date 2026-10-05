// Reader preferences for the roster builder — how the screens are drawn, not what a list is.
// A module singleton persisted per device: a preference must not ride a share link or sync to
// another device the way a roster field would, so it is deliberately NOT on the roster record.
import { ref, watch } from 'vue'
import { getItem, setItem } from './safeStorage.js'

// "Show points left" — the remainder under the "used / limit" readouts while building (settings
// bar, both sticky bars). On by default since 2026-10-05: off (2026-09-21) read as "the builder
// shows only the overage" to a player who never found the box. A stored '0' is a player's own
// choice and stays off.
const showPointsLeft = ref(getItem('wh11ed-roster-points-left') !== '0')
watch(showPointsLeft, (v) => setItem('wh11ed-roster-points-left', v ? '1' : '0'))

export function useRosterPrefs() {
  return { showPointsLeft }
}
