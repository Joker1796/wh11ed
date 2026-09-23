import { ref, onUnmounted } from 'vue'
import { takeUnitEntry, restoreUnitEntry } from './rosterEngine.js'

// One step back from the only irreversible thing the roster editor does. Building a list is a long
// session of small picks, and the trash icon sits on the same tile as the row that opens them: a
// mis-tap threw away a squad's whole configuration, and the only way back was Cancel, which throws
// away the session (a player's ask, 2026-09-23). This holds the last removal for a few seconds and
// puts it back exactly where it stood — rosterEngine's takeUnitEntry/restoreUnitEntry own what
// "exactly" means (the place in the list, the attachments that broke).
//
// ONE slot on purpose: a stack invites "undo until it looks right", which is a different feature
// (and one that would have to survive a save, a reload and the wizard's two screens). What this
// covers is the tap you did not mean.
//
// Both screens that remove units use it — the editor over the roster it owns, the wizard over a
// draft's array — so `unitsOf` is a getter rather than a roster: the two hold their units
// differently, and this only ever needs the array.
export const UNDO_MS = 8000

export function useRosterUndo(unitsOf, onChange) {
  // What the bar says, and nothing else: the ticket itself stays out of the ref so a removed
  // entry is not made deeply reactive for the seconds it spends off the list.
  const undoable = ref(null) // { name } | null
  let ticket = null
  let timer = null

  function forget() {
    clearTimeout(timer)
    timer = null
    ticket = null
    undoable.value = null
  }

  // Returns the removed uid (or null), so a caller can drop per-entry UI state keyed on it.
  function removeWithUndo(unitId, entryUid, name) {
    const taken = takeUnitEntry(unitsOf(), unitId, entryUid)
    if (!taken) return null
    clearTimeout(timer)
    ticket = taken
    undoable.value = { name }
    timer = setTimeout(forget, UNDO_MS)
    onChange?.()
    return taken.uid
  }

  function undoRemove() {
    const restored = ticket && restoreUnitEntry(unitsOf(), ticket)
    forget()
    if (restored) onChange?.()
    return restored
  }

  // The offer dies with the screen: a bar that outlived the editor would be offering to restore a
  // unit into a list nobody is looking at.
  onUnmounted(forget)

  return { undoable, removeWithUndo, undoRemove, dismissUndo: forget }
}
