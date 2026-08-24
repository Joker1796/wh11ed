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

// The identity a unit's duplicate-cap count is grouped by (rosterValidation.js's
// duplicateLimit). Defaults to its own datasheet id; `charId` is an escape hatch for the
// real (if currently unrepresented in wh40k-appdata) rule that a named character published as
// two distinct datasheets is still capped as ONE — e.g. if a second "Titus" datasheet ever
// ships, both would carry the same `charId` and share a single Epic Hero slot instead of each
// getting its own. No current unit sets it; this is the extension point for that case.
export function capKeyOf(def) { return def?.charId || def?.id }

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

// A wargear group's instruction text is a sentence, sometimes followed by a list of the options
// it offers ("…replaced with one of the following:\n◦ 1 hexrifle and 1 torturer's tool").
// appdata carries that list as real newlines, which collapse into one run-on line when
// interpolated into a template, so the parts are split here and the caller renders the list.
// Four markers are in use (◦ ■ ▫ •) and one list has none at all — just a head line ending in
// ':' and an option per line — so the marker is not what identifies a list. A line opening with
// '*' is a footnote about the options rather than one of them, and comes back separately.
const BULLET = /^[◦•■▫]\s*/
const FOOTNOTE = /^\*\s*/
export function splitInstruction(text) {
  const lines = String(text || '').split('\n').map((l) => l.trim()).filter(Boolean)
  const body = []
  const notes = []
  // Only ever a footnote once something came before it — an instruction can't open with one.
  for (const l of lines) (body.length && FOOTNOTE.test(l) ? notes : body).push(l)
  const note = notes.map((l) => l.replace(FOOTNOTE, '').trim()).filter(Boolean).join(' ')

  const marked = body.findIndex((l) => BULLET.test(l))
  if (marked !== -1) {
    return {
      head: body.slice(0, marked).join(' '),
      bullets: body.slice(marked).map((l) => l.replace(BULLET, '').trim()).filter(Boolean),
      note,
    }
  }
  if (body.length > 1 && /:$/.test(body[0])) return { head: body[0], bullets: body.slice(1), note }
  return { head: body.join(' '), bullets: [], note }
}

// The wargear items one option puts on the model, as `[[itemId, count], …]`. Slot 0 of an option
// is normally just the item id, but an option can be a BUNDLE — "replaced with 1 hexrifle and 1
// torturer's tool" is ONE choice granting two items (gen-roster-data.mjs's linkWargearBundles
// reads those out of the instruction prose and verifies them against appdata's own enumeration
// of legal loadouts) — and then it carries the full set instead. Every reader goes through here;
// nothing else should unpack slot 0, or the second half of a bundle silently disappears.
export function optionItems(o) {
  const head = o?.[0]
  if (Array.isArray(head)) return head.map(([id, n]) => [id, n || 1])
  return head == null ? [] : [[head, 1]]
}

// An option's display label — "Hexrifle + Torturer's tool", "2× Mortifier flamer".
export function optionLabel(o, items) {
  return optionItems(o)
    .map(([id, n]) => `${n > 1 ? `${n}× ` : ''}${items?.[id] || ''}`)
    .filter((s) => s.trim())
    .join(' + ')
}

// How many picks a wargear group allows THIS entry, from the generated `lim` step table
// (gen-roster-data.mjs's linkWargearLimits, matched out of appdata's `wargear_limit`):
// `[[modelCount, choiceLimit, duplicateLimit?], …]`, the applicable row being the highest
// threshold the unit's model count reaches. "Up to 2 Seraphim … for every 5 models" is
// [[0, 2], [10, 4]] — 2 picks in a 5-model squad, 4 in a 10-model one.
//
// `null` means the group carries no structural cap and the caller keeps its own behaviour —
// 220 groups have one, the rest (a cross-group choice pool, an ambiguous match) don't, and
// inventing a cap for those would forbid legal loadouts.
export function wargearGroupCap(def, entry, gi) {
  const rows = def?.gear?.[gi]?.lim
  if (!rows?.length) return null
  const size = def.sizes?.[entry?.size ?? 0] || def.sizes?.[0]
  const models = entry?.count ?? size?.per?.[0] ?? 1
  let row = null
  for (const r of rows) if (models >= r[0] && (!row || r[0] > row[0])) row = r
  // Below every threshold the group genuinely offers nothing ("for every 5 models…" in a
  // 3-model squad), which is a real 0, not a missing cap.
  if (!row) return { limit: 0, dup: 0 }
  return { limit: row[1], dup: row[2] || 0 }
}

// What the entry has already spent in a group, optionally ignoring one option (so a stepper can
// ask "how much room is left for ME").
export function wargearGroupSpent(entry, gi, exceptOi = null) {
  return (entry?.wg || [])
    .filter(([g, oi]) => g === gi && oi !== exceptOi)
    .reduce((n, [, , c]) => n + (c || 1), 0)
}

// Can this unit be the army's Warlord? Characters (and the rare non-character unit GW flags)
// unless explicitly barred — EXCEPT a detachment can grant a specific unit an exception to its
// own usual bar (`det.grantedWarlord`, from wh40k-appdata's detachment_granted_warlord_miniature —
// currently just Tyranids' "Vanguard Onslaught" lifting Deathleaper's normal `cannotBeWarlord`).
// `detachments` is optional so existing callers that don't have it handy (or a def with no id,
// e.g. a plain test fixture) fall back to the ordinary flag check.
export function canBeWarlord(def, detachments) {
  if (def?.id && (detachments || []).some((d) => d.grantedWarlord?.includes(def.id))) return true
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
// being in the faction, so only the per-unit keywords are checked here). `lockDs` narrows to
// specific datasheets by `sid`, overriding those keyword gates the same way lockedToExactUnit does.
//
// Its ONLY source is gen-roster-data.mjs's hand-curated ENH_LOCK_FIXES — "(Upgrade)"-type
// enhancements whose prose names one unit ("Necron Warriors only") while appdata records no
// unit-specific keyword at all, so the generated req alone would offer them on any Character of
// the faction. It used to ALSO be fed by appdata's enhancement_bodyguard_group, which was a
// misreading (those tables list the units the BEARER may attach to, not who may take it) and
// inverted eligibility for all 13 attach-granting enhancements — Murdermind was offered on
// Skorpekh Destroyers and refused to every Cryptek. That source was removed on 2026-08-19; if a
// future audit sees `lockDs` on an enhancement that is not in ENH_LOCK_FIXES, it has come back.
export function enhEligible(enh, def, granted = []) {
  if (!enh || !def) return false
  // `granted` are keywords the ENTRY gained rather than the datasheet printing them — today the
  // allegiance upgrades that hand CHARACTER to a vehicle, which is precisely what makes it able to
  // carry an enhancement. Callers without an entry pass nothing and get the printed sheet's answer.
  const lc = (x) => String(x || '').toLowerCase()
  const has = (k) => hasKeyword(def, k) || granted.some((g) => lc(g) === lc(k))
  if (lockedToExactUnit(enh, def)) return !enh.exclKw?.some((k) => has(k))
  if (enh.lockDs?.length) return enh.lockDs.includes(def.sid) && !enh.exclKw?.some((k) => has(k))
  if (def.flags?.noEnh) return false
  if (!def.flags?.char && !enh.nonCharOk && !granted.some((g) => lc(g) === 'character')) return false
  if (def.flags?.epic && !enh.epicOk) return false
  if (enh.exclKw?.some((k) => has(k))) return false
  if (enh.req?.length) {
    const ok = enh.req.some((g) => (g.kw || []).every((k) => has(k)))
    if (!ok) return false
  }
  return true
}

// ── Allegiance: the mark/keyword an entry chooses for itself ──────────────────────────────────
// Two shapes share `def.alleg` (gen-roster-data.mjs reads appdata's allegiance_ability tables):
//   • a MANDATORY mark — Chaos Space Marines' Mark of Chaos inside Pactbound Zealots (43
//     datasheets; the Psyker ones simply have no KHORNE option, which is that restriction stated
//     structurally) and Daemonic Allegiance on the Daemon Princes and Soul Grinder, where the mark
//     also changes characteristics and, on the Soul Grinder, adds a weapon;
//   • an OPTIONAL detachment upgrade capped across the army — "select up to 3 ADEPTUS ASTARTES
//     VEHICLE units; they gain CHARACTER" (44 datasheets over 5 detachments).
// Both are army-list choices, which is why the datasheet PAGE skips them (see
// gen-conditional-keywords.mjs) and the roster is where they belong.
//
// Returns the live choice descriptor, or null when the gating detachment isn't in the army.
export function allegFor(def, detachments) {
  const a = def?.alleg
  if (!a?.o?.length) return null
  if (a.det && !(detachments || []).some((d) => d?.name === a.det)) return null
  return a
}

// The keyword this entry gained from its choice — the mark itself ("Nurgle") unless the data says
// the option grants a differently-named one. Null when nothing is chosen or the gate is closed.
export function allegKeyword(def, entry, detachments) {
  const a = allegFor(def, detachments)
  if (!a || !entry?.alleg) return null
  const opt = a.o.find((o) => o.n === entry.alleg)
  return opt ? (opt.kw || opt.n) : null
}

// Extra wargear the choice grants (Soul Grinder's torrent of burning blood and friends).
export function allegItems(def, entry, detachments) {
  const a = allegFor(def, detachments)
  const opt = a && entry?.alleg ? a.o.find((o) => o.n === entry.alleg) : null
  return opt?.wg ? [opt.wg] : []
}

// How many entries in the army have taken an optional (capped) choice of this group.
export function allegSpent(units, defOf, groupKey, detachments) {
  return (units || []).filter((u) => {
    const a = allegFor(defOf(u.id), detachments)
    return a?.g === groupKey && u.alleg
  }).length
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
  // An allegiance upgrade can hand a vehicle CHARACTER, and that is what makes it able to carry an
  // enhancement at all — so eligibility is asked about the ENTRY, not just the printed sheet.
  const entry = (units || []).find((u) => u.uid === excludeUid)
  const granted = [allegKeyword(def, entry, detachments)].filter(Boolean)
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
      out.push({ name: e.name, pts: e.pts, eligible: enhEligible(e, def, granted), used, mandatory: !!e.mandatory })
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
// Which kind of attachment this leader offers THIS target: 'leader', 'support', or null. Two
// sources, in order — the datasheet's own list of units it can join, and the keyword groups a
// datasheet writes instead of a list ("this model can be attached to any IMPERIUM BATTLELINE
// INFANTRY unit"). The generator resolves those keywords against the leader's own faction, which
// is enough until the leader is an ALLY: Inquisitor Draxus in an Adeptus Mechanicus army joins a
// Skitarii Vanguard, a unit her own bundle has never heard of, so the question has to be asked of
// the target that is actually in the list.
export function leadTypeFor(def, entry, targetDef, detachments = []) {
  if (!def || !targetDef) return null
  const direct = leadsFor(def, entry, detachments).find((l) => l.to === targetDef.id)
  if (direct) return direct.type
  const kwGroups = gatedLeads((def.leadKw || []).map((g) => ({ ...g, to: (g.kw || []).join('+') })), detachments)
  const hit = kwGroups.find((g) => (g.kw || []).every((k) => hasKeyword(targetDef, k)))
  return hit ? hit.type : null
}

export function leaderTargetsFor(def, units, excludeUid, defOf, detachments = []) {
  const entry = (units || []).find((u) => u.uid === excludeUid)
  const leads = leadsFor(def, entry, detachments)
  if (!leads.length && !def?.leadKw?.length) return []
  const typeOf = (id) => leadTypeFor(def, entry, defOf ? defOf(id) : null, detachments)
  // Marks of Chaos: "a Character unit can only be attached to a unit if both units share the same
  // keyword". Scoped to that group by key — it is that detachment rule's own clause, not something
  // allegiances do in general, and the CHARACTER-granting upgrades carry no such restriction. A
  // target that hasn't chosen yet stays offered: the mark is picked per unit, in any order.
  const ownMark = allegFor(def, detachments)?.g === 'mark-of-chaos' ? entry?.alleg : null
  return (units || [])
    .filter((u) => u.uid !== excludeUid && typeOf(u.id))
    .filter((u) => !ownMark || !u.alleg || u.alleg === ownMark)
    .map((u) => {
      const type = typeOf(u.id)
      const used = (units || []).some((o) => {
        if (o.uid === excludeUid || o.uid === u.uid || o.leaderOf !== u.uid) return false
        return leadTypeFor(defOf(o.id), o, defOf(u.id), detachments) === type
      })
      return { uid: u.uid, name: defOf(u.id)?.name || u.id, used, type }
    })
}

// Attach targets an ENHANCEMENT grants its bearer — a Cryptek with Murdermind gains DESTROYER
// CULT and with it the Destroyer squads, a Commissar with Abhuman Detail can join Ogryns. From
// appdata's enhancement_bodyguard_group, emitted by gen-roster-data.mjs as `attach` in the same
// `{ to, type }` shape a datasheet's own `leads` uses. Covers a mandatory enhancement too, since
// the bearer carries that whether or not `entry.enh` was ever set.
export function enhAttachOf(def, entry, detachments) {
  const e = entry?.enh ? findEnhancement(detachments, entry.enh) : mandatoryEnhancementFor(def, detachments)
  return e?.attach || []
}

// An attachment appdata restricts to (or bars from) one detachment — `reqDet`/`exclDet`, its
// detachment uuid, matched against the `sid` the roster's detachment objects carry. 59 leads carry
// each today, all Chaos Space Marines: appdata states their Pactbound Zealots attachments twice,
// once required-inside and once excluded-outside, which is why ignoring both fields happened to
// give the right answer. It only happens to — one appdata bump away from a one-sided gate, this
// would offer an attachment that is legal in a detachment the army didn't take. Deduped by
// target+type afterwards, because the two halves of such a pair collapse to one entry once gated
// and the list's callers (`.find()` first-wins, `new Map()` last-wins) need exactly one.
function gatedLeads(leads, detachments) {
  if (!leads.some((l) => l.reqDet || l.exclDet)) return leads
  const sids = new Set((detachments || []).map((d) => d?.sid).filter(Boolean))
  const seen = new Set()
  return leads.filter((l) => {
    if (l.reqDet && !sids.has(l.reqDet)) return false
    if (l.exclDet && sids.has(l.exclDet)) return false
    const k = `${l.to}|${l.type}`
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

// Every unit this ENTRY can attach to: its datasheet's own list plus whatever its enhancement
// adds. Use this instead of reading `def.leads` directly anywhere an entry (not a bare datasheet)
// is in hand — otherwise a granted attach is invisible to that caller and, worse, gets flagged as
// an illegal attachment by validateRoster.
//
// One entry per target, printed first and a granted duplicate dropped: callers read this list
// both with `.find()` (first match wins) and through `new Map()` (last match wins), so a target
// appearing twice would resolve to a different `type` depending on which one asked.
export function leadsFor(def, entry, detachments) {
  const own = gatedLeads(def?.leads || [], detachments)
  const extra = enhAttachOf(def, entry, detachments)
  if (!extra.length) return own
  const seen = new Set(own.map((l) => l.to))
  return [...own, ...extra.filter((l) => !seen.has(l.to))]
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

// ── Adding and removing a unit entry ──────────────────────────────────────────────────────────
// Pure array surgery on a roster's `units`, shared by every screen that can do it: the editor and
// the add-units page (through useRosterEditing) and the creation wizard. Kept here rather than
// copied per screen because the removal has a second half that is easy to forget — the wizard's own
// copy did forget it, and left a Leader attached to a unit that had already left the roster.
//
// `newUid` is passed in rather than generated: this module stays free of the store (uid() lives in
// useRosters.js) and of anything that isn't a pure function of its arguments.
export function addUnitEntry(units, def, unitId, newUid) {
  if (!units || !def) return null
  const at = def.sizes.findIndex((s) => s.default)
  const entry = { uid: newUid, id: unitId, size: at >= 0 ? at : 0 }
  units.push(entry)
  return entry
}

// Removes the most recently added copy — pairs with the browser's "−" button, which only shows once
// at least one copy is in the list. Returns the removed entry's uid so a caller holding per-entry UI
// state (an open accordion) can drop it too.
export function removeUnitEntry(units, unitId, entryUid = null) {
  if (!units) return null
  for (let i = units.length - 1; i >= 0; i--) {
    // The browser removes "a copy of this datasheet" (the last one added); the editor removes ONE
    // named line, which is a different thing as soon as the roster holds two of the same unit
    // configured differently. `entryUid` is what tells the two apart.
    if (entryUid ? units[i].uid !== entryUid : units[i].id !== unitId) continue
    const [removed] = units.splice(i, 1)
    // A leader attached to the unit that just left would otherwise point at nothing.
    for (const u of units) if (u.leaderOf === removed.uid) delete u.leaderOf
    return removed.uid
  }
  return null
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
// spent against the profile the group belongs to, via modelsPerMini() — a multi-miniature squad
// used to have no per-profile model count anywhere in the data, so its swaps were left un-subtracted
// entirely; `sizes[i].comp` now supplies it. A group the data can't attribute to one profile (a
// unit-wide `all` group, or a bracket where two profiles are free) still subtracts nothing.
// How many models of each miniature PROFILE an entry actually fields — Map(miniatureIndex -> n),
// or null when the data can't say. Until 2026-08-20 nothing could: the generated bracket carried a
// total ("5-10 models") and nothing else, which is why every per-model calculation on a
// multi-miniature datasheet was switched off. `sizes[i].comp` (from appdata's
// unit_composition_miniature) is that breakdown, `[[miniIndex, min, max?], …]`.
//
// Most brackets are fully fixed (Acothyst 1-1 | Wrack 4-4) or fix everything except one profile,
// so the rank-and-file count follows from the chosen model count. Where TWO profiles are free —
// 7 compositions in the corpus, the Deathwatch kill teams and Accursed Cultists — the split is the
// player's to make and the data doesn't record it, so this returns null and every caller falls
// back to the pre-2026-08-20 behaviour rather than guessing.
export function modelsPerMini(def, entry) {
  const size = def?.sizes?.[entry?.size ?? 0] || def?.sizes?.[0]
  if (!size) return null
  const total = entry?.count ?? size.per?.[0] ?? 1
  if (!(def.minis?.length > 1)) return new Map([[0, total]])
  if (!size.comp) return null
  const ranges = size.comp.filter((c) => c.length === 3)
  if (ranges.length > 1) return null
  const out = new Map(size.comp.filter((c) => c.length === 2).map(([m, n]) => [m, n]))
  const fixed = [...out.values()].reduce((a, n) => a + n, 0)
  if (!ranges.length) return fixed === total ? out : null
  const [m, min, max] = ranges[0]
  const rest = total - fixed
  if (rest < min || rest > max) return null
  out.set(m, rest)
  return out
}

// Models that gave an item up, keyed `${miniIndex}:${itemId}` — the shared half of
// defaultLoadoutLines() and rosterModifiers' loadoutItemIds(), which used to carry a copy each.
//
// A unit-wide group (`all`, folded by the generator from the copy appdata records per miniature)
// belongs to no single profile, so there is no profile count to spend it against and it is skipped
// — 81 such groups, left exactly as they were.
export function swapsByMini(def, entry, perMini) {
  const removed = new Map()
  if (!perMini) return removed
  for (const [gi, , n] of entry?.wg || []) {
    const g = def?.gear?.[gi]
    if (!g?.rep?.length || g.all || !wargearGroupLive(def, entry, gi)) continue
    const m = g.m ?? 0
    const models = perMini.get(m)
    if (models == null) continue
    // A stepper carries the model count; a checkbox is one tick per model, except for the four
    // groups whose instruction hands the swap to the whole profile ("All models can each have
    // their…", `repall`). Reading every checkbox as the whole profile is what used to wipe all
    // nine boltguns off a Battle Sisters Squad when one Sister traded hers away.
    const consumed = g.in === 'stepper' ? Math.min(n || 1, models) : Math.min(g.repall ? models : 1, models)
    for (const id of g.rep) removed.set(`${m}:${id}`, (removed.get(`${m}:${id}`) || 0) + consumed)
  }
  return removed
}

export function defaultLoadoutLines(def, items, entry) {
  const perMini = entry && def ? modelsPerMini(def, entry) : null
  const removed = swapsByMini(def, entry, perMini)

  return (def?.defaults || []).flatMap(([m, list]) => {
    const models = perMini?.get(m)
    const parts = []
    for (const [id, c, total] of list) {
      // `total` marks a quantity that belongs to the PROFILE rather than to each of its models —
      // one of the two Gun Servitors in a Servitor Battleclade carries the heavy bolter (see the
      // generator's default-loadout merge) — so it is printed as it stands, never multiplied.
      if (total) { parts.push(`${items[id]}${c > 1 ? ` ×${c}` : ''}`); continue }
      const take = removed.get(`${m}:${id}`) || 0
      if (!take || models == null) { parts.push(`${items[id]}${c > 1 ? ` ×${c}` : ''}`); continue }
      // take is a MODEL count (how many models of THIS profile swapped the item away); c is the
      // item's per-model quantity, so the surviving total scales by both.
      const remaining = c * Math.max(0, models - take)
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
    const name = optionLabel(opt, items)
    return n > 1 ? `${name} ×${n}` : name
  }).filter(Boolean)
}

// ── Allies ────────────────────────────────────────────────────────────────────────────────────
// An allied unit's id is namespaced `<source faction slug>:<unit id>` (see data/roster/index.js) —
// it is the only mark it carries, so everything about allies is derived from the id plus the
// faction's own `allies` metadata rather than from a flag stamped on the entry.
export function allySourceOf(id) {
  const at = String(id || '').indexOf(':')
  return at < 0 ? null : [id.slice(0, at), id.slice(at + 1)]
}

// Does this roster hold a unit from another faction's bundle? The read-only screens use it to
// decide whether loadRosterFaction has to pull those bundles at all (the editor always does).
export function usesAllies(roster) {
  return (roster?.units || []).some((u) => allySourceOf(u?.id))
}

// Which allied contexts are open to a list with these detachments selected. Most groups are always
// available; some are unlocked by one Detachment and by nothing else (World Eaters' Blood Legions
// need Khorne Daemonkin), which is also what tells Drukhari's two overlapping Aeldari groups apart
// — the same Troupe is a 500-point Harlequins ally under Reaper's Wager and a 250-point one under
// the corsair Detachments, so the selected Detachment decides which limits apply.
export function allyGroupsFor(faction, detachments = []) {
  const names = new Set((detachments || []).map((d) => d?.name).filter(Boolean))
  return (faction?.allies || []).filter((g) => !g.dets?.length || g.dets.some((n) => names.has(n)))
}

// Every group that lists this unit, whether or not its Detachment requirement is met — the
// difference is what separates "this unit is an ally" from "this unit is not allowed here".
export function allyGroupsOf(faction, id) {
  return (faction?.allies || []).filter((g) => (g.ids || []).includes(id))
}

// The group a unit counts against right now: the first ACTIVE group listing it, or null when the
// unit is an ordinary member of the army.
export function allyGroupOf(faction, id, detachments = []) {
  return allyGroupsFor(faction, detachments).find((g) => (g.ids || []).includes(id)) || null
}

// One split shared by every screen that lists units — the add-units browser, the editor and the
// read-only view. Allies don't belong in the battlefield-role buckets: they are a separate part of
// the army with their own ceiling, and two of them (Drukhari's Harlequins, a Chapter's Knights)
// would otherwise sit in "Other" with nothing saying where their points come from. Units of a
// group whose Detachment requirement isn't met are not offered by the browser at all — they can't
// legally be there, which is also what validateRoster says about them — but a list that already
// holds one still shows it (`keepLocked`), under the group it belongs to.
//
// `items` are whatever the caller lists (unit defs in the browser, roster entries elsewhere);
// `idOf` pulls the unit id out of one.
export function sectionsOf(items, { faction, detachments = [], defOf, idOf = (x) => x?.id, keepLocked = false } = {}) {
  const all = faction?.allies || []
  const active = allyGroupsFor(faction, detachments)
  const activeKeys = new Set(active.map((g) => g.key))
  const byKey = new Map(all.map((g) => [g.key, []]))
  const roles = new Map(UNIT_GROUPS.map((id) => [id, []]))
  for (const it of items || []) {
    const id = idOf(it)
    const def = defOf ? defOf(id) : it
    if (!def) continue
    const groups = all.filter((g) => (g.ids || []).includes(id))
    const mine = groups.find((g) => activeKeys.has(g.key)) || groups[0]
    if (mine) { byKey.get(mine.key).push(it); continue }
    roles.get(bucketOf(def))?.push(it)
  }
  // Active groups always (the browser offers them even while empty); a locked one only where the
  // caller keeps locked units — the editor and the read-only view must still show a unit that is
  // in the list, or its points would go missing from the screen but not from the total.
  const groupSection = (g) => ({ id: `ally:${g.key}`, ally: g, locked: !activeKeys.has(g.key), items: byKey.get(g.key) })
  return [
    ...UNIT_GROUPS.map((id) => ({ id, items: roles.get(id) })),
    ...active.map(groupSection),
    ...(keepLocked ? all.filter((g) => !activeKeys.has(g.key) && byKey.get(g.key).length).map(groupSection) : []),
  ]
}

// The effective battle-size limits for a roster. A 'custom' size carries its own points total
// and borrows the duplicate / enhancement / DP limits of the standard bracket it falls within.
export function effectiveBattle(roster, core) {
  const sizes = [...(core?.battleSizes || [])].sort((a, b) => a.points - b.points)
  const fallback = sizes[sizes.length - 1] || { points: 2000, dp: 3, enhLimit: 4, dupLimit: 3 }
  if (roster?.battleSize === 'custom') {
    const points = roster.customPoints || 0
    const std = sizes.find((b) => points <= b.points) || fallback
    // `base` is the standard bracket whose limits a custom size borrows — the ally limits are
    // tabulated per battle size, so they need a bracket name even when the points are hand-typed.
    return { id: 'custom', base: std.id, points, dp: std.dp, enhLimit: std.enhLimit, dupLimit: std.dupLimit, custom: true }
  }
  const b = sizes.find((x) => x.id === roster?.battleSize)
  return b ? { ...b, base: b.id, custom: false } : { ...fallback, base: fallback.id, custom: false }
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
