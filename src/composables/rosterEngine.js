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
    if (!opt || !wargearGroupLive(def, entry, gi)) continue
    const p = opt[1] || 0
    const isDefault = opt[2] || 0
    if (p && !isDefault) pts += p * (n || 1)
  }
  return pts
}

// A handful of wargear groups are only on offer depending on whether a SIBLING group on the same
// datasheet has been changed from its default — e.g. Necron Overlord's Resurrection Orb requires
// giving up its default tachyon arrow first, and several Chaos Daemon units offer an instrument-
// of-Chaos/daemonic-icon pair that are mutually exclusive. wh40k-appdata has no structural field
// linking two `wargear_option_group` rows — the dependency exists only in prose ("if [not]
// equipped with X") — so gen-roster-data.mjs parses it at generation time into `cond: [siblingGi,
// activeFlag]` on the dependent group. A group stays selectable in storage even while its
// condition isn't met (so re-enabling it restores the previous pick), but every point/loadout
// reader must skip it while inert — this is the one place that decides "live or not", so callers
// never duplicate the check.
export function wargearGroupLive(def, entry, gi) {
  const cond = def?.gear?.[gi]?.cond
  if (!cond) return true
  const [sibGi, wantActive] = cond
  const sibActive = (entry?.wg || []).some(([g]) => g === sibGi)
  return sibActive === !!wantActive
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
// being in the faction, so only the per-unit keywords are checked here). `lockDs` (gen-roster-
// data.mjs's enhancement_bodyguard_group read — a STRUCTURAL "this exact datasheet only"
// restriction some enhancements carry alongside a much broader keyword requirement that would
// otherwise make them look eligible army-wide) narrows to those specific datasheets by `sid`,
// same override rationale as lockedToExactUnit.
export function enhEligible(enh, def) {
  if (!enh || !def) return false
  if (lockedToExactUnit(enh, def)) return !enh.exclKw?.some((k) => hasKeyword(def, k))
  if (enh.lockDs?.length) return enh.lockDs.includes(def.sid) && !enh.exclKw?.some((k) => hasKeyword(def, k))
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
// detachment), each flagged eligible for this unit and/or already at its per-name cap on OTHER
// entries. Most enhancements (`enhancementType: 'miniature'`, appdata's ordinary per-model kind)
// cap at 1 per roster (`e.limit` unset), but a detachment-wide "(Upgrade)" enhancement
// (`enhancementType: 'upgrade'`) explicitly allows several units to take the SAME one —
// `e.limit` (from wh40k-appdata's own `enhancement.limit` field, via gen-roster-data.mjs's
// buildEnhancement) is 3 for the large majority of these, occasionally 1. Shared by the editor's
// single-sheet modal and the creation wizard's per-unit accordion, so eligibility/used-elsewhere
// logic lives in one place. `excludeUid` is the entry being edited — it must not count against
// its own "used" flag. `mandatory` enhancements still show (so the list explains why the unit
// costs more) but are never a player pick — the caller renders them locked "on" when `eligible`
// (see mandatoryEnhancementFor for the same eligible one, used to drive the actual points).
export function enhOptionsFor(def, detachments, units, excludeUid) {
  if (!detachments?.length || !def) return []
  const countElsewhere = new Map()
  for (const u of units || []) {
    if (u.uid === excludeUid || !u.enh) continue
    countElsewhere.set(u.enh, (countElsewhere.get(u.enh) || 0) + 1)
  }
  const seen = new Set()
  const out = []
  for (const det of detachments) {
    for (const e of det.enhancements) {
      if (seen.has(e.name)) continue
      seen.add(e.name)
      const used = (countElsewhere.get(e.name) || 0) >= (e.limit || 1)
      out.push({ name: e.name, pts: e.pts, eligible: enhEligible(e, def), used, mandatory: !!e.mandatory })
    }
  }
  return out
}

// The mandatory, automatic enhancement for this exact unit (Necrons' Pantheon of Woe, Imperial
// Agents' Veiled Blade Elimination Force — see gen-roster-data.mjs ENH_REQ_FIXES), if any of the
// roster's selected detachments grants one. Not a player pick: applied to every eligible unit
// unconditionally, so unlike a normal enhancement it isn't tracked on the entry (no entry.enh,
// no "used elsewhere" bookkeeping) — it's recomputed from def + detachments every time.
export function mandatoryEnhancementFor(def, detachments) {
  if (!def || !detachments?.length) return null
  for (const det of detachments) {
    for (const e of det.enhancements) {
      if (e.mandatory && lockedToExactUnit(e, def)) return e
    }
  }
  return null
}

// Roster units a Leader entry can attach to, per its datasheet's `leads` list — every other
// entry in the roster whose id is a valid target, excluding the leader itself. Each `leads` entry
// carries a `type` — 'leader' for the ordinary case, 'support' for the (much rarer) Characters
// whose own core ability is actually titled "Support" instead of "Leader" (see DatasheetCard's
// dsSupport/dsLeader) — and a Bodyguard unit can carry ONE of each kind at once (a Leader AND a
// Support attached simultaneously is legal; two Leaders, or two Supports, is not). A target
// already claimed by a DIFFERENT entry of the SAME type is flagged `used` so the picker can
// disable it, the same "eligible but already spoken for" treatment enhOptionsFor gives a used
// enhancement — this entry's own current target is never "used" against itself.
export function leaderTargetsFor(def, units, excludeUid, defOf) {
  if (!def?.leads?.length) return []
  const typeByTarget = new Map(def.leads.map((l) => [l.to, l.type]))
  return (units || [])
    .filter((u) => u.uid !== excludeUid && typeByTarget.has(u.id))
    .map((u) => {
      const type = typeByTarget.get(u.id)
      const used = (units || []).some((o) => {
        if (o.uid === excludeUid || o.uid === u.uid || o.leaderOf !== u.uid) return false
        return defOf(o.id)?.leads?.find((l) => l.to === u.id)?.type === type
      })
      return { uid: u.uid, name: defOf(u.id)?.name || u.id, used, type }
    })
}

// Points added by a unit's enhancement: its chosen one (entry.enh), or — absent a choice — a
// mandatory one it's automatically stuck with regardless of entry.enh (`def` is only needed for
// that fallback; existing callers that never pass it just skip the mandatory check).
export function enhancementPoints(detachments, entry, def) {
  if (entry?.enh) return findEnhancement(detachments, entry.enh)?.pts || 0
  return mandatoryEnhancementFor(def, detachments)?.pts || 0
}

// Full points for one unit entry: base bracket (+ copy tax), selected wargear, and enhancement
// (chosen or mandatory).
export function unitPoints(def, entry, copyIndex = 1, detachments = null) {
  return unitBasePoints(def, entry?.size ?? 0, copyIndex) + unitWargearPoints(def, entry) + enhancementPoints(detachments, entry, def)
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

// An entry's default (unmodified) loadout, one line per mini in the datasheet's composition —
// e.g. [{ mini: 'Sergeant', items: 'Bolt rifle' }, { mini: '', items: 'Close combat weapon, Tesla carbine ×10' }].
// `mini` is blank when the datasheet only has one mini (nothing to disambiguate).
//
// `entry` is optional — omit it for a generic per-unit preview (no live picks to subtract, e.g.
// a datasheet browser). When given, any live deviation whose group `rep`s (replaces) one of these
// defaults reduces its shown count, so a partial per-model swap (e.g. "3 of 10 Necron Warriors
// take a gauss reaper instead of their gauss flayer") reads as "Gauss flayer ×7" + "Gauss reaper
// ×3" instead of both the untouched default AND the swap appearing at full strength. `rep` is
// generated (gen-roster-data.mjs parses "…can be replaced with…" against the item dictionary) and
// only trustworthy for a single-mini unit (`def.minis` unset) — a multi-mini squad has no per-mini
// model count anywhere in the data to divide the swap against, so those are left exactly as
// generated (full default + the addition layered on top, same as before this).
export function defaultLoadoutLines(def, items, entry) {
  const removed = new Map() // itemId -> model count whose copy of it was swapped away
  let squadCount = null
  if (entry && def && !(def.minis?.length > 0)) {
    const size = def.sizes?.[entry.size ?? 0] || def.sizes?.[0]
    squadCount = entry.count ?? size?.per?.[0] ?? 1
    for (const [gi, , n] of entry.wg || []) {
      const g = def.gear?.[gi]
      if (!g?.rep?.length || !wargearGroupLive(def, entry, gi)) continue
      const consumed = g.in === 'stepper' ? (n || 1) : squadCount
      for (const itemId of g.rep) removed.set(itemId, (removed.get(itemId) || 0) + consumed)
    }
  }

  return (def?.defaults || []).flatMap(([m, list]) => {
    const parts = []
    for (const [id, c] of list) {
      const take = removed.get(id) || 0
      if (!take) { parts.push(`${items[id]}${c > 1 ? ` ×${c}` : ''}`); continue }
      // take is a MODEL count (how many models swapped this item away); c is the item's
      // per-model quantity, so the surviving item total scales by both.
      const remaining = c * Math.max(0, squadCount - take)
      if (remaining > 0) parts.push(`${items[id]} ×${remaining}`)
    }
    if (!parts.length) return []
    return [{ mini: def.minis?.length > 1 ? (def.minis[m]?.n || '') : '', items: parts.join(', ') }]
  })
}

// Names of the wargear items a unit entry has swapped/added on top of its default loadout
// (entry.wg deviations only — see UnitEditorFields/rosterExport.js for the same shape).
export function wargearNames(def, entry, items) {
  if (!entry?.wg?.length) return []
  return entry.wg.map(([gi, oi, n]) => {
    const opt = def?.gear?.[gi]?.o?.[oi]
    if (!opt || !wargearGroupLive(def, entry, gi)) return null
    const name = items?.[opt[0]] || ''
    return n > 1 ? `${name} ×${n}` : name
  }).filter(Boolean)
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
