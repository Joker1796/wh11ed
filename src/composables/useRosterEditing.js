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
  const { rosterById, saveNow } = useRosters()
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

  // ── Cancel that cancels ──────────────────────────────────────────────────────────────────
  // The editor has no "save": it mutates the stored roster, and useRosters writes that to disk
  // half a second later. So the footer's Cancel was a link to the list — it closed the screen
  // with every change already kept, which is the opposite of what the word says (owner,
  // 2026-09-24). This keeps the roster as it stood when the screen opened, so the button can put
  // it back.
  //
  // A JSON copy rather than a structural clone: it is also the thing `dirty` compares against,
  // and the roster is plain data by construction (useRosters persists it with JSON.stringify —
  // anything that would not survive that trip is already lost on reload).
  const baseline = ref(null)
  // `summary` is derived (written by the watchEffect above, and for an old roster it can differ
  // from what was stored) and `updatedAt` is a clock, not a choice: neither is an edit. They stay
  // in `full` so a reverted roster keeps its place in the list, ordered by when it was last
  // really changed.
  const KEY_SKIP = new Set(['summary', 'updatedAt'])
  const keyOf = (r) => JSON.stringify(r, (k, v) => (KEY_SKIP.has(k) ? undefined : v))
  watch(roster, (r) => {
    if (r && !baseline.value) baseline.value = { key: keyOf(r), full: JSON.stringify(r) }
  }, { immediate: true })

  const dirty = computed(() => !!roster.value && !!baseline.value && keyOf(roster.value) !== baseline.value.key)

  // In place, on the object the store holds: every screen reads the roster through the same
  // reference, and replacing it in the array would leave this composable's computed pointing at
  // the old one. `saveNow()` because the user is leaving the screen in the same tick — the
  // debounced auto-save would be racing the navigation.
  function revertEdits() {
    if (!roster.value || !baseline.value) return false
    const was = JSON.parse(baseline.value.full)
    for (const k of Object.keys(roster.value)) if (!(k in was)) delete roster.value[k]
    Object.assign(roster.value, was)
    saveNow()
    return true
  }

  // What Cancel is about to take back, as counts the screen turns into words. Named parts rather
  // than a rendered sentence: this module has no locale, and a confirm that says only "your
  // changes" makes the reader guess whether the one thing they care about is among them.
  const changedParts = computed(() => {
    if (!dirty.value || !baseline.value) return []
    const was = JSON.parse(baseline.value.full)
    const now = roster.value
    const parts = []
    const wasU = new Map((was.units || []).map((u) => [u.uid, JSON.stringify(u)]))
    const nowU = new Map((now.units || []).map((u) => [u.uid, JSON.stringify(u)]))
    let added = 0, removed = 0, changed = 0
    for (const [k, v] of nowU) { if (!wasU.has(k)) added++; else if (wasU.get(k) !== v) changed++ }
    for (const k of wasU.keys()) if (!nowU.has(k)) removed++
    if (added) parts.push({ k: 'added', n: added })
    if (removed) parts.push({ k: 'removed', n: removed })
    if (changed) parts.push({ k: 'changed', n: changed })
    if (was.name !== now.name) parts.push({ k: 'name' })
    // Everything the Setup tab owns, in one word: which of them moved is not worth a sentence
    // in a dialog the reader wants to get out of.
    const SETUP = ['faction', 'detachments', 'battleSize', 'customPoints', 'disposition', 'notes', 'checkLegality']
    if (SETUP.some((f) => JSON.stringify(was[f]) !== JSON.stringify(now[f]))) parts.push({ k: 'setup' })
    return parts
  })

  return {
    roster, factionData, loadingFaction, ...derived,
    touch, addUnit, duplicateUnit,
    dirty, changedParts, revertEdits,
  }
}
