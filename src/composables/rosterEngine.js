// Pure roster maths — no Vue, no store. Shared by the editor (live points, unit grouping) and,
// later, the validation engine. Everything here takes plain data so it's trivially testable.

// Battlefield-role buckets a unit is filed under in the editor / add-unit list, in display
// order. Derived from keywords (which stay English — see CLAUDE.md), Epic Hero and Character
// first because those carry the tightest army-building limits.
export const UNIT_GROUPS = ['epic', 'characters', 'battleline', 'transports', 'other']

function hasKeyword(unit, name) {
  const n = name.toLowerCase()
  return (unit.kws || []).some((k) => k.toLowerCase() === n)
}

export function bucketOf(unit) {
  if (unit.flags?.epic) return 'epic'
  if (unit.flags?.char) return 'characters'
  if (hasKeyword(unit, 'Battleline') || unit.condBattleline) return 'battleline'
  if (hasKeyword(unit, 'Dedicated Transport')) return 'transports'
  return 'other'
}

// Points for one unit entry at a given size bracket and copy index (1-based, among same-id
// units in the roster). Copy tax (datasheet_points_step): the surcharge applies to the Nth
// and every later copy — see Phase 0. Wargear/enhancement points are added by the caller.
export function unitBasePoints(unitDef, sizeIdx = 0, copyIndex = 1) {
  if (!unitDef) return 0
  const size = unitDef.sizes?.[sizeIdx] || unitDef.sizes?.[0]
  let pts = size?.pts || 0
  if (unitDef.step && copyIndex >= unitDef.step.at) pts += unitDef.step.pts
  return pts
}

// Total points for a list of roster unit entries. `defOf(id)` resolves a unit id to its
// faction-data definition. Copy index is assigned per unit id in list order, so the 2nd/3rd
// copy of a datasheet pays its step surcharge.
export function rosterPoints(units, defOf) {
  const seen = new Map()
  let total = 0
  for (const u of units || []) {
    const copyIndex = (seen.get(u.id) || 0) + 1
    seen.set(u.id, copyIndex)
    total += unitBasePoints(defOf(u.id), u.size ?? 0, copyIndex)
  }
  return total
}
