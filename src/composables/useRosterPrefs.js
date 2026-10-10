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

// "Hide Legends units" — the catalogue's filter (RosterUnitBrowser), and since 2026-10-06 also the
// unit fields' "Can be led by" list: one switch, so a player who asked for Legends out of the way
// is not offered them again one screen over. Off by default (the catalogue's first answer is the
// whole catalogue); the key is the one the browser always stored it under, so a choice made
// before the move is kept.
const hideLegends = ref(getItem('wh11ed-roster-filter-legends') === '1')
watch(hideLegends, (v) => setItem('wh11ed-roster-filter-legends', v ? '1' : ''))

// The catalogue's other two filters, "Fits the points left" and "Only units I own" — moved here
// with Legends (owner, 2026-10-09) so the "Can be led by" / "Can lead" lists follow every switch
// the catalogue has, not just one. Same storage keys the browser always used.
const onlyAffordable = ref(getItem('wh11ed-roster-filter-budget') === '1')
const onlyOwned = ref(getItem('wh11ed-roster-filter-owned') === '1')
watch(onlyAffordable, (v) => setItem('wh11ed-roster-filter-budget', v ? '1' : ''))
watch(onlyOwned, (v) => setItem('wh11ed-roster-filter-owned', v ? '1' : ''))

// The one question both places ask of a unit. `minPts` — what another copy costs at the least
// (nextCopyMinPoints); `remaining` — points still unspent, null when there is no limit to read
// (the budget filter is then off); `inList` — a copy is already in the list, which spares it the
// owned and Legends filters (a list that hides what you just added reads as a bug), not the budget.
function passesRosterFilters({ minPts = 0, owned = false, legends = false, inList = false }, remaining) {
  if (onlyAffordable.value && Number.isFinite(remaining) && minPts > remaining) return false
  if (inList) return true
  if (onlyOwned.value && !owned) return false
  if (hideLegends.value && legends) return false
  return true
}

export function useRosterPrefs() {
  return { showPointsLeft, hideLegends, onlyAffordable, onlyOwned, passesRosterFilters }
}
