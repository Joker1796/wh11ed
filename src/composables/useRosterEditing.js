// The state two roster screens share: the editor (/roster/:id) and the add-units page
// (/roster/:id/add). Both need the same roster, the same lazily-loaded faction data, the same
// live points and validation, and — crucially — the same add/remove semantics.
//
// It exists because those two screens edit ONE roster from two routes. A second copy of
// addUnit() would be free to disagree about the default unit size, and a second copy of
// removeUnit() about cleaning up a leader attachment that pointed at the removed unit; both are
// the kind of divergence nobody notices until a roster is quietly wrong.
//
// Not a store: every screen calls this for itself and gets its own reactive handles onto the
// SAME underlying roster object from useRosters.js, which is the module singleton that persists.

import { computed, ref, watch } from 'vue'
import { useRosters, uid } from './useRosters.js'
import { effectiveBattle, rosterPoints } from './rosterEngine.js'
import { validateRoster } from './rosterValidation.js'
import rosterCore from '../data/roster/core.js'
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
      factionData.value = await loadRosterFaction(slug)
    } finally {
      loadingFaction.value = false
    }
  }, { immediate: true })

  const unitMap = computed(() => new Map((factionData.value?.units || []).map((u) => [u.id, u])))
  const defOf = (id) => unitMap.value.get(id)

  const curDetachments = computed(() =>
    (roster.value?.detachments || [])
      .map((name) => (factionData.value?.detachments || []).find((d) => d.name === name))
      .filter(Boolean))

  const effBattle = computed(() => effectiveBattle(roster.value || {}, rosterCore))
  const limit = computed(() => effBattle.value.points)
  const points = computed(() => rosterPoints(roster.value?.units, defOf, curDetachments.value))

  // Never blocks, only reports — see rosterValidation.js.
  const validation = computed(() =>
    factionData.value
      ? validateRoster(roster.value, { faction: factionData.value, core: rosterCore })
      : { points: points.value, issues: [], errorCount: 0 })

  function touch() { if (roster.value) roster.value.updatedAt = Date.now() }

  const defaultSize = (def) => {
    const i = def.sizes.findIndex((s) => s.default)
    return i >= 0 ? i : 0
  }

  function addUnit(unitId) {
    const def = defOf(unitId)
    if (!def || !roster.value) return
    roster.value.units.push({ uid: uid(), id: unitId, size: defaultSize(def) })
    touch()
  }

  // Removes the most recently added copy — pairs with the browser's "-" button, which only shows
  // once at least one copy is in the list. Returns the removed entry's uid so a caller holding
  // per-entry UI state (the editor's open accordion) can drop it.
  function removeUnit(unitId) {
    if (!roster.value) return null
    for (let i = roster.value.units.length - 1; i >= 0; i--) {
      if (roster.value.units[i].id !== unitId) continue
      const [removed] = roster.value.units.splice(i, 1)
      // A leader attached to the unit that just left would otherwise point at nothing.
      for (const u of roster.value.units) if (u.leaderOf === removed.uid) delete u.leaderOf
      touch()
      return removed.uid
    }
    return null
  }

  return {
    roster, factionData, loadingFaction, defOf, curDetachments,
    effBattle, limit, points, validation, touch, addUnit, removeUnit,
  }
}
