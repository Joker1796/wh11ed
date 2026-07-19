// Pure roster maths — no Vue, no store. Shared by the editor (live points, unit grouping) and,
// later, the validation engine. Everything here takes plain data so it's trivially testable.

// Battlefield-role buckets a unit is filed under in the editor / add-unit list, in display
// order. Derived from keywords (which stay English — see CLAUDE.md), Epic Hero and Character
// first because those carry the tightest army-building limits.
export const UNIT_GROUPS = ['epic', 'characters', 'battleline', 'transports', 'other']

export function hasKeyword(unit, name) {
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

// Points from a unit's selected wargear. Selections live on the entry as `wg: [[gi,oi,n],…]`
// (group index, option index, count) — only choices the user made. A paid option that's
// selected-by-default (its `def` flag) is already priced into the base bracket, so it never
// adds again; everything else adds its points × count. (The exact default-swap accounting is
// refined in the validation phase.)
export function unitWargearPoints(def, entry) {
  if (!def?.gear || !entry?.wg?.length) return 0
  let pts = 0
  for (const [gi, oi, n] of entry.wg) {
    const opt = def.gear[gi]?.o?.[oi]
    if (!opt) continue
    const p = opt[1] || 0
    const isDefault = opt[2] || 0
    if (p && !isDefault) pts += p * (n || 1)
  }
  return pts
}

// Can this unit be the army's Warlord? Characters (and the rare non-character unit GW flags)
// unless explicitly barred.
export function canBeWarlord(def) {
  return !def?.flags?.noWarlord && !!(def?.flags?.char || def?.flags?.nonCharWarlordOk)
}

// Is an enhancement legal on this unit? Enhancements go on Characters (unless the enhancement is
// flagged for non-characters), never on Epic Heroes unless flagged, never on enhancement-barred
// units. Then the keyword gates: any excluded keyword disqualifies; the OR-groups of required
// keywords must have at least one group fully satisfied (faction-keyword parts are satisfied by
// being in the faction, so only the per-unit keywords are checked here).
export function enhEligible(enh, def) {
  if (!enh || !def) return false
  if (def.flags?.noEnh) return false
  if (!def.flags?.char && !enh.nonCharOk) return false
  if (def.flags?.epic && !enh.epicOk) return false
  if (enh.exclKw?.some((k) => hasKeyword(def, k))) return false
  if (enh.req?.length) {
    const ok = enh.req.some((g) => (g.kw || []).every((k) => hasKeyword(def, k)))
    if (!ok) return false
  }
  return true
}

// Points added by a unit's chosen enhancement (entry.enh = enhancement name).
export function enhancementPoints(detachment, entry) {
  if (!entry?.enh || !detachment?.enhancements) return 0
  return detachment.enhancements.find((e) => e.name === entry.enh)?.pts || 0
}

// Full points for one unit entry: base bracket (+ copy tax), selected wargear, and enhancement.
export function unitPoints(def, entry, copyIndex = 1, detachment = null) {
  return unitBasePoints(def, entry?.size ?? 0, copyIndex) + unitWargearPoints(def, entry) + enhancementPoints(detachment, entry)
}

// Total points for a list of roster unit entries. `defOf(id)` resolves a unit id to its
// faction-data definition. Copy index is assigned per unit id in list order, so the 2nd/3rd
// copy of a datasheet pays its step surcharge.
export function rosterPoints(units, defOf, detachment = null) {
  const seen = new Map()
  let total = 0
  for (const u of units || []) {
    const copyIndex = (seen.get(u.id) || 0) + 1
    seen.set(u.id, copyIndex)
    total += unitPoints(defOf(u.id), u, copyIndex, detachment)
  }
  return total
}
