// What a player DOES while building a list, for the two screens that build one: the creation
// wizard (RosterCreateView) and the editor (RosterEditorView). Picking the faction and the
// detachments, adding, copying and removing units, the Warlord, which unit's fields are open.
//
// Each screen used to spell these out itself, and the copies drifted: the editor dropped an
// enhancement whose detachment had just been taken off the list, the wizard kept it and then
// reported it as an error the player had to clear by hand. One implementation is what keeps them
// agreeing — the same reason useRosterDerived.js exists for what the screens READ off a list.
//
// The screens differ in where a list lives, not in what an action does: the editor edits a stored
// roster, the wizard assembles one from its own fields until the first save. So the roster comes
// in as a getter over `{ faction, detachments, units }` (the arrays are mutated in place — both
// screens hold them by identity), and two hooks carry the difference:
//   commit()        — an edit happened: the editor bumps `updatedAt`, the wizard writes its units
//                     through to the draft
//   setFaction(s)   — the one field that is not an array: a property of the stored roster, a ref
//                     of the wizard's
import { computed, ref } from 'vue'
import { uid } from './useRosters.js'
import { addUnitEntry, dispositionCandidates, duplicateUnitEntry } from './rosterEngine.js'
import { useRosterUndo } from './useRosterUndo.js'
import rosterCore from '../data/roster/core.js'

export function useRosterBuildActions({ roster, factionData, curDetachments, effBattle, defOf, commit, setFaction }) {
  const list = () => roster() || null

  const factionPickerOpen = ref(false)
  const detachmentPickerOpen = ref(false)

  // ── Faction ──
  function pickFaction(slug) {
    factionPickerOpen.value = false
    const r = list()
    if (!r || r.faction === slug) return
    setFaction(slug)
    r.detachments.splice(0)
    r.units.splice(0) // units belong to a faction — changing it invalidates them
    openUid.value = null
    commit()
  }

  // ── Detachments ──
  // Options for the DP-budget-aware multi-select picker (DetachmentPickerModal).
  const detachmentOptions = computed(() =>
    (factionData.value?.detachments || []).map((d) => ({ name: d.name, dp: d.dp || 0, forceDisposition: d.fd || '' })))
  const detachmentSummary = computed(() => (list()?.detachments || []).join(', '))
  const dispositionCands = computed(() => dispositionCandidates(curDetachments.value))
  const dpSpent = computed(() => curDetachments.value.reduce((s, d) => s + (d.dp || 0), 0))
  // A single Detachment is always allowed even over budget (DetachmentPickerModal never disables
  // the first pick) — not official yet, but GW has said it's fine as long as it's the only one
  // taken. The screens show that as a "?" explainer instead of an error.
  const dpOverAllowed = computed(() => (list()?.detachments.length === 1) && dpSpent.value > (effBattle?.value.dp ?? Infinity))

  // Enhancements belong to a detachment — an entry carrying one the list no longer fields keeps a
  // name nothing resolves, so it is dropped whenever the selection changes. Checked against the
  // detachments' own data, which is `curDetachments` — recomputed synchronously from the names.
  function dropOrphanEnhancements() {
    const r = list()
    const names = new Set(r.detachments)
    for (const u of r.units) {
      if (u.enh && !curDetachments.value.some((det) => names.has(det.name) && det.enhancements.some((e) => e.name === u.enh))) delete u.enh
    }
  }
  // Toggle a detachment in or out (what the budget allows is the picker's call: it offers nothing
  // a tap could not do).
  function toggleDetachment(d) {
    const r = list()
    if (!r) return
    const at = r.detachments.indexOf(d.name)
    if (at >= 0) r.detachments.splice(at, 1)
    else r.detachments.push(d.name)
    dropOrphanEnhancements()
    commit()
  }
  // The picker offers only what can still be taken, so with a spent budget this is the way back
  // to the whole list.
  function clearDetachments() {
    const r = list()
    if (!r) return
    r.detachments.splice(0)
    dropOrphanEnhancements()
    commit()
  }

  // ── Which unit is being worked on ──
  // One entry's fields open at a time (a classic accordion). The desk's third column shows the
  // same entry, so there is one idea of "the unit being worked on" whichever arrangement is up.
  const openUid = ref(null)
  function toggleOpen(entryUid) {
    openUid.value = openUid.value === entryUid ? null : entryUid
  }
  const openEntry = computed(() => list()?.units.find((u) => u.uid === openUid.value) || null)

  // ── Units ──
  // The add/copy semantics are rosterEngine's: a default size, and the three fields a copy must
  // not inherit, decided once.
  function addUnit(unitId) {
    const r = list()
    if (r && addUnitEntry(r.units, defOf(unitId), unitId, uid())) commit()
  }
  // A configured copy, right under its original. Its fields stay shut: a copy is wanted AS the
  // original far more often than not, and opening it would push the tapped row off the screen.
  function duplicateEntry(entry) {
    const r = list()
    if (r && duplicateUnitEntry(r.units, entry.uid, uid())) commit()
  }
  // Delete ONE line, not "a copy of this datasheet": two of the same unit are configured
  // separately. Through useRosterUndo, which keeps the ticket that puts it back — including the
  // Leader that had to let go of it (rosterEngine's takeUnitEntry).
  const { undoable, removeWithUndo, undoRemove, dismissUndo } = useRosterUndo(() => list()?.units || [], commit)
  function removeEntry(entry) {
    if (openUid.value === entry.uid) openUid.value = null
    removeWithUndo(entry.id, entry.uid, defOf(entry.id)?.name || '')
  }

  function toggleWarlord(entryUid) {
    const units = list()?.units || []
    const e = units.find((u) => u.uid === entryUid)
    if (!e) return
    const on = e.warlord === true
    for (const u of units) delete u.warlord // exactly one warlord per army
    if (!on) e.warlord = true
    commit()
  }

  return {
    factionPickerOpen, detachmentPickerOpen, pickFaction,
    detachmentOptions, detachmentSummary, dispositionCands, dpSpent, dpOverAllowed,
    toggleDetachment, clearDetachments, dropOrphanEnhancements,
    openUid, toggleOpen, openEntry,
    addUnit, duplicateEntry, removeEntry, toggleWarlord,
    undoable, undoRemove, dismissUndo,
    battleSizes: rosterCore.battleSizes,
  }
}
