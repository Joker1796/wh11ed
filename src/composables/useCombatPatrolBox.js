// @ts-check
// The Combat Patrol box a roster screen is showing, for everything under it. A box fielded as a
// list (`roster.cp`, the tracker's Combat Patrol game) has units whose sheets live in
// combatPatrol.js rather than in the faction's datasheets — loadDatasheets/loadDatasheetsRu take
// `{ cp }` for them. The roster screen provides its list's box; the unit card, the weapon-profile
// window and the rest inject it instead of the box id riding down every prop chain that already
// carries `factionSlug`. Outside such a screen it is null, and nothing changes.
import { computed, inject, provide } from 'vue'

const KEY = Symbol('combat-patrol-box')

/** @param {() => string | null | undefined} boxOf the box id, read reactively */
export function provideCombatPatrolBox(boxOf) {
  provide(KEY, computed(() => boxOf() || null))
}

/** @returns {import('vue').ComputedRef<string | null>} */
export function useCombatPatrolBox() {
  return inject(KEY, computed(() => null), false)
}
