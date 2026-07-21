// Pure roster maths — no Vue, no store. Shared by the editor (live points, unit grouping) and,
// later, the validation engine. Everything here takes plain data so it's trivially testable.

// Battlefield-role buckets a unit is filed under in the editor / add-unit list, in display
// order. Derived from keywords (which stay English — see CLAUDE.md), Epic Hero and Character
// first because those carry the tightest army-building limits.
export const UNIT_GROUPS = ['epic', 'characters', 'battleline', 'transports', 'other']

// The i18n key for each group's heading — shared by every screen that lists units grouped by
// UNIT_GROUPS (the editor, the read-only view, the creation wizard's unit browser/config step).
export const GROUP_LABEL_KEYS = {
  epic: 'rosterGroupEpic', characters: 'rosterGroupCharacters', battleline: 'rosterGroupBattleline',
  transports: 'rosterGroupTransports', other: 'rosterGroupOther',
}

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

// A tiny handful of enhancements (Necrons' Pantheon of Woe, Imperial Agents' Veiled Blade Elim.
// Force — see gen-roster-data.mjs ENH_REQ_FIXES) are locked to one exact datasheet by name
// ("X model only" in their rules text) rather than a general Character/Epic-Hero pool. Naming one
// specific unit is already maximally restrictive, so it overrides that unit's general noEnh/
// epic-without-epicOk gates below — those exist to keep *generic* enhancements off units that
// can't normally take them, not to block a unit from its own dedicated option.
function lockedToExactUnit(enh, def) {
  return enh.req?.length === 1 && enh.req[0].kw?.length === 1 && enh.req[0].kw[0] === def.name
}

// Is an enhancement legal on this unit? Enhancements go on Characters (unless the enhancement is
// flagged for non-characters), never on Epic Heroes unless flagged, never on enhancement-barred
// units. Then the keyword gates: any excluded keyword disqualifies; the OR-groups of required
// keywords must have at least one group fully satisfied (faction-keyword parts are satisfied by
// being in the faction, so only the per-unit keywords are checked here).
export function enhEligible(enh, def) {
  if (!enh || !def) return false
  if (lockedToExactUnit(enh, def)) return !enh.exclKw?.some((k) => hasKeyword(def, k))
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

// Find an enhancement by name across the roster's selected detachments (an army may field
// several detachments, up to its Detachment-Points budget — like the tracker).
export function findEnhancement(detachments, name) {
  for (const d of detachments || []) {
    const e = d?.enhancements?.find((x) => x.name === name)
    if (e) return e
  }
  return null
}

// Enhancement options for one roster entry: every enhancement across the roster's selected
// detachments (deduped by name — the same enhancement can be offered by more than one
// detachment), each flagged eligible for this unit and/or already used by ANOTHER entry (an
// enhancement can only be taken once per roster). Shared by the editor's single-sheet modal and
// the creation wizard's per-unit accordion, so eligibility/used-elsewhere logic lives in one
// place. `excludeUid` is the entry being edited — it must not count against its own "used" flag.
export function enhOptionsFor(def, detachments, units, excludeUid) {
  if (!detachments?.length || !def) return []
  const usedElsewhere = new Set((units || []).filter((u) => u.uid !== excludeUid && u.enh).map((u) => u.enh))
  const seen = new Set()
  const out = []
  for (const det of detachments) {
    for (const e of det.enhancements) {
      if (seen.has(e.name)) continue
      seen.add(e.name)
      out.push({ name: e.name, pts: e.pts, eligible: enhEligible(e, def), used: usedElsewhere.has(e.name) })
    }
  }
  return out
}

// Roster units a Leader entry can attach to, per its datasheet's `leads` list — every other
// entry in the roster whose id is a valid target, excluding the leader itself.
export function leaderTargetsFor(def, units, excludeUid, defOf) {
  if (!def?.leads?.length) return []
  const targetIds = new Set(def.leads.map((l) => l.to))
  return (units || [])
    .filter((u) => u.uid !== excludeUid && targetIds.has(u.id))
    .map((u) => ({ uid: u.uid, name: defOf(u.id)?.name || u.id }))
}

// Points added by a unit's chosen enhancement (entry.enh = enhancement name).
export function enhancementPoints(detachments, entry) {
  if (!entry?.enh) return 0
  return findEnhancement(detachments, entry.enh)?.pts || 0
}

// Full points for one unit entry: base bracket (+ copy tax), selected wargear, and enhancement.
export function unitPoints(def, entry, copyIndex = 1, detachments = null) {
  return unitBasePoints(def, entry?.size ?? 0, copyIndex) + unitWargearPoints(def, entry) + enhancementPoints(detachments, entry)
}

// A one-line summary of an entry's current size/upgrades/enhancement for its list row —
// shared by the editor, the read-only view, and the creation wizard's config step. Model-count
// and upgrade-count nouns are passed in (not imported) so this stays a pure, Vue-free module;
// callers pass their current locale's `rosterModelsLabel`/`rosterUpgradesLabel`.
export function entrySummary(e, def, modelsLabel, upgradesLabel) {
  if (!def) return ''
  const size = def.sizes[e.size ?? 0] || def.sizes[0]
  const n = e.count ?? size.per[0]
  const parts = []
  if (e.warlord) parts.push('★')
  if (size.per[1] > 1) parts.push(`${n} ${modelsLabel}`)
  if (e.wg?.length) parts.push(`${e.wg.length} ${upgradesLabel}`)
  if (e.enh) parts.push(e.enh)
  return parts.join(' · ')
}

// The effective battle-size limits for a roster. A 'custom' size carries its own points total
// and borrows the duplicate / enhancement / DP limits of the standard bracket it falls within.
export function effectiveBattle(roster, core) {
  const sizes = [...(core?.battleSizes || [])].sort((a, b) => a.points - b.points)
  const fallback = sizes[sizes.length - 1] || { points: 2000, dp: 3, enhLimit: 4, dupLimit: 3 }
  if (roster?.battleSize === 'custom') {
    const points = roster.customPoints || 0
    const std = sizes.find((b) => points <= b.points) || fallback
    return { id: 'custom', points, dp: std.dp, enhLimit: std.enhLimit, dupLimit: std.dupLimit, custom: true }
  }
  const b = sizes.find((x) => x.id === roster?.battleSize)
  return b ? { ...b, custom: false } : { ...fallback, custom: false }
}

// Total points for a list of roster unit entries. `defOf(id)` resolves a unit id to its
// faction-data definition. Copy index is assigned per unit id in list order, so the 2nd/3rd
// copy of a datasheet pays its step surcharge.
export function rosterPoints(units, defOf, detachments = null) {
  const seen = new Map()
  let total = 0
  for (const u of units || []) {
    const copyIndex = (seen.get(u.id) || 0) + 1
    seen.set(u.id, copyIndex)
    total += unitPoints(defOf(u.id), u, copyIndex, detachments)
  }
  return total
}
