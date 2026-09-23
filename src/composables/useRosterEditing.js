// One saved roster's editing state: the roster itself, its lazily-loaded faction data, and the
// add/duplicate/remove semantics. Everything that is merely READ off the pair — points, the
// detachments in play, per-entry pricing, the legality verdict — is useRosterDerived.js, which the
// wizard and the print sheet call directly over rosters this composable does not own.
//
// It was written when the editor (/roster/:id) and the add-units page (/roster/:id/add) were two
// screens editing ONE roster, and a second copy of addUnit() would have been free to disagree
// about the default unit size while a second removeUnit() forgot the leader attachment pointing at
// the removed entry. The catalogue is now a pane of the editor itself and this has one consumer —
// kept as a module because the creation wizard performs the same operations on a roster this does
// not own, and the shared implementations underneath (rosterEngine's addUnitEntry /
// duplicateUnitEntry / takeUnitEntry) are what keep the two screens agreeing.
//
// Not a store: every screen calls this for itself and gets its own reactive handles onto the
// SAME underlying roster object from useRosters.js, which is the module singleton that persists.

import { computed, ref, watch, watchEffect } from 'vue'
import { useRosters, uid } from './useRosters.js'
import { addUnitEntry, duplicateUnitEntry } from './rosterEngine.js'
import { useRosterDerived } from './useRosterDerived.js'
import { summaryOf } from './rosterSummary.js'
import { loadRosterFaction } from '../data/roster/index.js'

export function useRosterEditing(rosterId) {
  const { rosterById } = useRosters()
  const roster = computed(() => rosterById(typeof rosterId === 'function' ? rosterId() : rosterId.value))

  // Heavy per-faction data, dynamic-imported so it never rides the light entry chunk.
  const factionData = ref(null)
  const loadingFaction = ref(false)
  watch(() => roster.value?.faction, async (slug) => {
    if (!slug) { factionData.value = null; return }
    loadingFaction.value = true
    try {
      // Allies always, on both screens this drives: the browser has to be able to OFFER them,
      // and the editor has to be able to price a list that already holds one.
      factionData.value = await loadRosterFaction(slug, { allies: true })
    } finally {
      loadingFaction.value = false
    }
  }, { immediate: true })

  const derived = useRosterDerived(roster, factionData)
  const { points, validation } = derived

  // Denormalise the summary onto the roster so the list screens show points/unit-count without
  // loading faction data — see rosterSummary.js for why the cache exists and who else writes it.
  // Writing summary doesn't feed back into `points`, so no watch loop.
  watchEffect(() => {
    if (!roster.value || !factionData.value) return
    roster.value.summary = summaryOf(roster.value, points.value, validation.value.errorCount)
  })

  function touch() { if (roster.value) roster.value.updatedAt = Date.now() }

  // The add semantics themselves are rosterEngine's (addUnitEntry) — the creation wizard performs
  // the same operation on a roster this composable doesn't own, and one implementation is what
  // keeps them from disagreeing about the default size. REMOVAL is not here: both screens take a
  // unit out through useRosterUndo, which holds the ticket rosterEngine's takeUnitEntry hands back
  // so the removal can be undone.
  function addUnit(unitId) {
    if (!roster.value) return
    if (addUnitEntry(roster.value.units, derived.defOf(unitId), unitId, uid())) touch()
  }

  // A configured copy of one line, placed right after it — see rosterEngine's duplicateUnitEntry
  // for the three fields a copy must NOT inherit. Here for the same reason add/remove are: the
  // screens that offer it must not each have their own idea of what a copy carries.
  function duplicateUnit(entryUid) {
    if (!roster.value) return null
    const copy = duplicateUnitEntry(roster.value.units, entryUid, uid())
    if (copy) touch()
    return copy
  }

  return {
    roster, factionData, loadingFaction, ...derived,
    touch, addUnit, duplicateUnit,
  }
}
