// @ts-check
// Pure roster maths — no Vue, no store. Shared by the editor (live points, unit grouping) and,
// later, the validation engine. Everything here takes plain data so it's trivially testable.
import { detKey } from '../core/shared/slugify.js'
import conditionalKeywords from '../data/conditionalKeywords.json'
import { hasKeyword, enhEligible, lockedToExactUnit } from '../core/roster/rosterEnhEligible.js'
import { foldName } from '../core/shared/foldName.js'

export { hasKeyword, enhEligible }

/** conditionalKeywords.json: faction → datasheet → the keywords it gains (`det`: only in that detachment). @type {Record<string, Record<string, Array<{ kw: string, det?: string, extra?: boolean }>>>} */
const KEYWORD_GRANTS = conditionalKeywords

/** @typedef {import('../core/shared/roster.types.js').RosterUnit} RosterUnit */
/** @typedef {import('../core/shared/roster.types.js').RosterEntry} RosterEntry */
/** @typedef {import('../core/shared/roster.types.js').Detachment} Detachment */
/** @typedef {import('../core/shared/roster.types.js').RosterFaction} RosterFaction */
/** @typedef {import('../core/shared/roster.types.js').Enhancement} Enhancement */
/** @typedef {import('../core/shared/roster.types.js').GearOption} GearOption */
/** @typedef {import('../core/shared/roster.types.js').GearCond} GearCond */
/** @typedef {import('../core/shared/roster.types.js').WargearPick} WargearPick */
/** @typedef {import('../core/shared/roster.types.js').AllyGroup} AllyGroup */
/** @typedef {import('../core/shared/roster.types.js').AllegianceChoice} AllegianceChoice */
/** @typedef {import('../core/shared/roster.types.js').LeadLink} LeadLink */
/** @typedef {import('../core/shared/roster.types.js').Roster} Roster */
/** @typedef {import('../core/shared/roster.types.js').BattleSize} BattleSize */
/** @typedef {import('../core/shared/roster.types.js').DefOf} DefOf */
/** @typedef {import('../core/shared/roster.types.js').ItemId} ItemId */
/** An entry as the engine reads it — a saved one, or a partial one a caller builds to ask a question. @typedef {Partial<RosterEntry>} EntryLike */
/** @typedef {NonNullable<RosterUnit['xpm']>[number]} XpmSet */
/** @typedef {import('../core/shared/roster.types.js').GearGroup} GearGroup */
/** @typedef {import('../core/shared/roster.types.js').GearPool} GearPool */
/** @typedef {import('../core/shared/roster.types.js').SizeBracket} SizeBracket */
/** What sectionsOf files: anything with a datasheet id, and for an attached block its uid and host. @typedef {{ id: string, uid?: string, leaderOf?: string | null }} SectionItem */
/** @typedef {{ faction?: { slug?: string, allies?: AllyGroup[] } | null, detachments?: Detachment[], keepLocked?: boolean, pairAttached?: boolean }} SectionOpts */
/**
 * A heading of the unit list and what is under it — a battlefield role, or an allied group.
 * @template T
 * @typedef {{ id: string, items: T[], ally?: AllyGroup, locked?: boolean }} UnitSection
 */
/** What takeUnitEntry hands back for restoreUnitEntry. @typedef {{ uid: string, entry: RosterEntry, at?: number, detached?: string[] }} RemovalTicket */

// Battlefield-role buckets a unit is filed under in the editor / add-unit list, in display
// order. Derived from keywords (which stay English — see CLAUDE.md), Epic Hero and Character
// first because those carry the tightest army-building limits.
// 'attached' is not a battlefield role and `bucketOf` never returns it — `sectionsOf` fills it by
// moving a bodyguard and its Leader there together (core rules 19.01: they are ONE unit while
// attached). First, because that is the part of the list a player reads as whole units.
// The rest is the faction datasheet page's breakdown (FactionDatasheetsView's TYPE_GROUPS), in its
// order — one army, one way of carving it up, whichever screen you are on. 'attached' is the only
// group that page has no use for: a Leader joined to its unit is a roster fact, not a datasheet's.
// It was tried the other way for a few hours on 2026-09-23 — blocks gathered in place, under the
// host's own role, so a led squad kept it — and the owner asked for the section back: with every
// block now carrying a header of its own (RosterUnitList), one place to read the army's whole
// units in is worth more than the role of the squad underneath each one.
export const UNIT_GROUPS = ['attached', 'epic', 'characters', 'battleline', 'transports', 'fortifications', 'vehicles', 'infantry', 'other']

// The i18n key for each group's heading — shared by every screen that lists units grouped by
// UNIT_GROUPS (the editor, the read-only view, the creation wizard's unit browser/config step).
/** @type {Record<string, string>} */
export const GROUP_LABEL_KEYS = {
  attached: 'rosterGroupAttached',
  epic: 'dsGroupEpicHeroes', characters: 'dsGroupCharacters', battleline: 'dsGroupBattleline',
  transports: 'dsGroupTransports', fortifications: 'dsGroupFortifications',
  vehicles: 'dsGroupVehicles', infantry: 'dsGroupInfantry', other: 'dsGroupOther',
}

// A group's heading: an ally group is named for its source, everything else by its role.
/**
 * @param {{ id: string, ally?: AllyGroup | null }} g
 * @param {Record<string, string>} labels
 * @returns {string}
 */
export function groupLabel(g, labels) {
  return g.ally ? g.ally.name : (labels[GROUP_LABEL_KEYS[g.id]] || '')
}

// First keyword wins, so the order is the rule: an Epic Hero is also a CHARACTER, a Rhino is also
// a VEHICLE, and most Battleline is INFANTRY. Vehicle and Infantry were split out of "Other" for
// the same reason the datasheet page split them (2026-08-28) — between them they are most of what
// used to land there, and "Прочее: 27" answers nothing about an army.
// `granted` are the keywords the unit has gained from the army it is IN rather than from its own
// datasheet (`grantedKeywordsFor`) — for this function, only Battleline matters. Pass it whenever
// the roster's detachments are known; `null` means "caller cannot say", and the unit's own
// `condBattleline` flag ("this datasheet can be Battleline under some detachment") is used, which
// is what every caller did before the flag was gated.
/**
 * @param {RosterUnit} unit
 * @param {string[] | null} [granted]
 * @returns {string}
 */
export function bucketOf(unit, granted = null) {
  if (unit.flags?.epic) return 'epic'
  if (unit.flags?.char) return 'characters'
  if (hasKeyword(unit, 'Battleline') || isBattlelineNow(unit, granted)) return 'battleline'
  if (hasKeyword(unit, 'Dedicated Transport')) return 'transports'
  if (hasKeyword(unit, 'Fortification')) return 'fortifications'
  if (hasKeyword(unit, 'Vehicle')) return 'vehicles'
  if (hasKeyword(unit, 'Infantry')) return 'infantry'
  return 'other'
}

// The identity a unit's duplicate-cap count is grouped by (rosterValidation.js's
// duplicateLimit). Defaults to its own datasheet id; `charId` is an escape hatch for the
// real (if currently unrepresented in wh40k-appdata) rule that a named character published as
// two distinct datasheets is still capped as ONE — e.g. if a second "Titus" datasheet ever
// ships, both would carry the same `charId` and share a single Epic Hero slot instead of each
// getting its own. No current unit sets it; this is the extension point for that case.
/**
 * @param {RosterUnit | null | undefined} def
 * @returns {string | undefined}
 */
export function capKeyOf(def) { return def?.charId || def?.id }

// Points for one unit entry at a given size bracket and copy index (1-based, among same-id
// units in the roster). Copy tax (datasheet_points_step): the surcharge applies to the Nth
// and every later copy — see Phase 0. Wargear/enhancement points are added by the caller.
/**
 * @param {RosterUnit | null | undefined} unitDef
 * @param {number} [sizeIdx]
 * @param {number} [copyIndex]
 * @returns {number}
 */
export function unitBasePoints(unitDef, sizeIdx = 0, copyIndex = 1) {
  if (!unitDef) return 0
  const size = unitDef.sizes?.[sizeIdx] || unitDef.sizes?.[0]
  let pts = size?.pts || 0
  if (unitDef.step && copyIndex >= unitDef.step.at) pts += unitDef.step.pts
  return pts
}

// What ANOTHER copy of a datasheet costs at the least: its cheapest bracket, the copy tax for the
// copy it would be (`copies` already in the list), and any enhancement a selected detachment forces
// on it. The catalogue's row price and its "Fits the points left" filter, and the same filter on
// the unit fields' "Can be led by" / "Can lead" lists — one number, so the two never disagree.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {number} [copies]
 * @param {Detachment[] | null | undefined} [detachments]
 * @returns {number}
 */
export function nextCopyMinPoints(def, copies = 0, detachments = []) {
  if (!def) return 0
  const sizes = def.sizes || []
  const cheapest = sizes.reduce((best, s, i) => (s.pts < sizes[best].pts ? i : best), 0)
  return unitBasePoints(def, cheapest, copies + 1) + (mandatoryEnhancementFor(def, detachments)?.pts || 0)
}

// Points from a unit's selected wargear. Selections live on the entry as `wg: [[gi,oi,n],…]`
// (group index, option index, count) — only choices the user made, so this is the money a unit
// spends ON TOP of the loadout it comes with. What that loadout itself costs is
// defaultWargearPoints() below; the two never overlap (no option in the corpus is both priced and
// flagged default — the priced defaults are the ones nobody picks, they are simply there).
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {number}
 */
export function unitWargearPoints(def, entry) {
  if (!def?.gear || !entry?.wg?.length) return 0
  let pts = 0
  for (const [gi, oi, n] of entry.wg) {
    const opt = def.gear[gi]?.o?.[oi]
    if (!opt || !wargearGroupLive(def, entry, gi)) continue
    pts += (opt[1] || 0) * (n || 1)
  }
  return pts
}

// Points for the wargear a unit already has. Since 11th edition a DEFAULT loadout can cost points
// of its own — a Terminator Assault Squad's thunder hammer is +5 a model, so GW's app prices ten of
// them at 360 where the Munitorum bracket reads 310 — and that surcharge cannot live in the
// bracket: the bracket is flat from 6 to 10 models and the hammers are not. So it is a term of its
// own, scaling with the models actually fielded, and a model that trades the item away stops paying
// for it (`dr`, what one pick in that group gives back).
//
// `dw` (per-model money by profile) and `dr` are gen-roster-data.mjs's, which is where the appdata
// readings behind them belong — a profile's total copies vs one model's, and groups counted per
// copy of a weapon rather than per model. Seven datasheets have any of this.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {number}
 */
export function defaultWargearPoints(def, entry) {
  if (!def?.dw?.length) return 0
  const dw = def.dw
  const models = modelCount(def, entry)
  const perMini = modelsPerMini(def, entry)
  let pts = 0
  if (perMini) {
    for (const [m, p] of dw) pts += p * (perMini.get(m) || 0)
  } else {
    // Two open-ended profiles: the split is the player's and the data doesn't record it (see
    // modelsPerMini). Only safe where every profile costs the same, which is the shape all but one
    // of the seven have; the odd one out (Victrix Honour Guard, whose Champion and Ancient are
    // priced differently) has a fixed composition and never lands here.
    if (dw.length !== (def.minis?.length || 1) || dw.some(([, p]) => p !== dw[0][1])) return 0
    pts = dw[0][1] * models
  }
  for (const [gi, , n] of entry?.wg || []) {
    const g = def.gear?.[gi]
    if (!g?.dr || !wargearGroupLive(def, entry, gi)) continue
    // A unit-wide group swaps for the squad; a per-profile one only for its own models. Steppers
    // count what the player set (in copies where the group is per copy of the weapon), a checkbox
    // is one model unless its instruction hands the swap to the whole profile (`repall`).
    const scope = g.all ? models : perMini?.get(g.m ?? 0)
    if (scope == null) continue
    const consumed = g.in === 'stepper'
      ? Math.min(n || 1, scope * (g.cp || 1))
      : Math.min(g.repall ? scope : 1, scope)
    pts -= g.dr * consumed
  }
  return Math.max(0, pts)
}

// A handful of wargear groups are only on offer depending on whether a SIBLING group on the same
// datasheet has been changed from its default — e.g. Necron Overlord's Resurrection Orb requires
// giving up its default tachyon arrow first. wh40k-appdata has no structural field linking two
// `wargear_option_group` rows — the dependency exists only in prose ("if [not] equipped with X")
// — so gen-roster-data.mjs parses it at generation time into `cond: [siblingGi, activeFlag]` on
// the dependent group. A group stays selectable in storage even while its condition isn't met (so
// re-enabling it restores the previous pick), but every point/loadout reader must skip it while
// inert — this is the one place that decides "live or not", so callers never duplicate the check.
//
// THE CONDITION IS ABOUT ONE MODEL, NOT THE UNIT. Every one of these sentences qualifies a single
// model — "1 model equipped with a boltgun can have its accursed weapon replaced with 1 power
// fist", "1 Bloodletter that is not equipped with a daemonic icon can be equipped with 1
// instrument of Chaos" — and a squad has models to spare. So a sibling pick only closes this group
// once it has reached EVERY model in scope, leaving none that still qualifies. Reading any sibling
// pick as the whole unit is what made Chosen lose their power fist to a single combi-weapon, and
// took the vox-caster, simulacrum, omnispex and medi-pack off two dozen other squads the moment
// one model swapped its rifle (61 of the 63 gated groups are on multi-model units). On a
// single-model datasheet, where scope is 1, the two readings coincide — Overlord and Canoness,
// the only two, behave exactly as before.
//
// A sentence can also name SEVERAL items, and particular ones: the Canoness's rod of office needs
// "a plasma pistol and a power weapon" — two siblings, each on one of its options, not on any swap
// it offers (a player's report, 2026-10-17: unread, it could be taken with anything). So `cond` is
// one condition `[siblingGi, wantActive, options?]` or a list of them, all of which must hold;
// `options` (indexes into the sibling's `o`) narrows "has a pick" to a pick of those.
/** @param {GearCond | GearCond[]} c @returns {c is GearCond[]} */
const isCondList = (c) => Array.isArray(c[0])
/** @param {GearGroup | undefined} g @returns {GearCond[]} */
export function condsOf(g) {
  const c = g?.cond
  if (!c) return []
  return isCondList(c) ? c : [c]
}

/** The sibling's picks a condition reads: all of them, or those on the options it names.
 * @param {EntryLike | null | undefined} entry @param {GearCond} cond */
function condPicks(entry, [sibGi, , opts]) {
  return (entry?.wg || []).filter(([g, o]) => g === sibGi && (!opts || opts.includes(o)))
}
/** The picks of every group a condition counts — the sibling's (narrowed to its options), then
 * those of the other groups taking the same item away (`cond[3]`), each with its group index.
 * @param {EntryLike | null | undefined} entry @param {GearCond} cond
 * @returns {[number, WargearPick][]} */
function condGroupPicks(entry, cond) {
  const also = cond[3] || []
  /** @type {[number, WargearPick][]} */
  const out = []
  for (const p of condPicks(entry, cond)) out.push([cond[0], p])
  for (const p of entry?.wg || []) if (also.includes(p[0])) out.push([p[0], p])
  return out
}

/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {boolean}
 */
export function wargearGroupLive(def, entry, gi) {
  return condsOf(def?.gear?.[gi]).every((c) => condLive(def, entry, c))
}

/** One condition of a group: see wargearGroupLive.
 * @param {RosterUnit | null | undefined} def @param {EntryLike | null | undefined} entry @param {GearCond} cond */
function condLive(def, entry, cond) {
  const gear = def?.gear || []
  const [sibGi, wantActive] = cond
  const picks = condGroupPicks(entry, cond)
  // `wantActive` asks the opposite question — this group needs the sibling's item GONE from a
  // model ("if this model is not equipped with a tachyon arrow…"), and one pick is one model that
  // gave it up, which is all the condition asks for.
  if (wantActive) return picks.length > 0
  if (!picks.length) return true

  const g = gear[sibGi]
  // A unit-wide group is scoped to the whole squad, a per-profile one to its own models.
  const scope = g?.all ? modelCount(def, entry) : modelsPerMini(def, entry)?.get(g?.m ?? 0)
  if (scope == null) return true // scope unknown → assume a model still qualifies, never hide on a guess
  // The same reading of a pick as swapsByMini's `consumed`: a stepper carries the model count, a
  // checkbox is one model unless its instruction hands the swap to the whole profile. A group whose
  // swap is per copy (`cp`) gives up a model's item only with every copy, so it counts in models.
  // Summed over every group that takes the item away: a model may give it up to any of them.
  let models = 0
  for (const [gi, pick] of picks) {
    const h = gear[gi]
    if (!h) continue
    const cp = h.cp || 1
    const consumed = h.in === 'stepper' ? Math.min(pick[2] || 1, scope * cp) : Math.min(h.repall ? scope : 1, scope)
    models += consumed / cp
  }
  return models < scope
}

// WHY a gated group is closed right now, or null while it is open — so the editor can grey it out
// with a reason instead of removing it from the page (an option that vanishes when you touch an
// unrelated one reads as a bug, and the reader is left guessing what to undo).
//
// `need` is the direction the player has to move, not a restatement of the condition: 'gone' —
// the named items have to come off a model, 'present' — a model has to carry them again. Which
// one it is falls out of the same pair of readings wargearGroupLive weighs: a sibling that
// REPLACES something is undone by taking its pick back, one that ADDS something by dropping it.
// A third answer, 'stock', comes from the stock rule (stockBlocker below): the named items have
// already been replaced by another group, and there is no model left carrying them.
// `ids` are wargear item ids; the caller names them (this file never holds the dictionary).
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {{ need: 'gone' | 'present' | 'stock', ids: ItemId[] } | null}
 */
export function wargearGroupBlocker(def, entry, gi) {
  const gear = def?.gear || []
  const unmet = condsOf(gear[gi]).filter((c) => !condLive(def, entry, c))
  if (!unmet.length) return stockBlocker(def, entry, gi)
  // Every condition that does not hold, not just the first: Rod of Office wants a plasma pistol AND
  // a power weapon, and a reader told only the first took it and found the group still shut
  // (acceptance, 2026-10-18). Conditions asking the same thing (take / give up) are named together;
  // a mix keeps the first, which is the one to act on before the other can even be read.
  const all = unmet.map((c) => condBlocker(gear, entry, c))
  const same = all.filter((b) => b.need === all[0].need)
  return { need: all[0].need, ids: [...new Set(same.flatMap((b) => b.ids))] }
}

/**
 * @param {GearGroup[]} gear @param {EntryLike | null | undefined} entry @param {GearCond} cond
 * @returns {{ need: 'gone' | 'present', ids: ItemId[] }}
 */
function condBlocker(gear, entry, cond) {
  const sib = gear[cond[0]]
  const rep = sib?.rep?.length ? sib.rep : null
  // Name what the sibling actually took, when it took something — listing every option it offers
  // would tell the reader to remove three things when they picked one; a condition on particular
  // options names those.
  // What a group of the condition actually took, where one did — the sibling first.
  const [pickGi, pick] = condGroupPicks(entry, cond)[0] || []
  const opt = pick ? gear[pickGi]?.o?.[pick[1]] : null
  const named = cond[2] ? cond[2].map((i) => sib?.o?.[i]).filter((o) => o != null) : sib?.o || []
  /** @param {GearOption[]} opts */
  const itemsOf = (opts) => [...new Set(opts.flatMap((o) => optionItems(o).map(([id]) => id)))]
  // "equipped with a power weapon": what the reader has to take is that option, not "give up the
  // hallowed chainsword" — which a blessed blade would do too.
  if (cond[2] && cond[1]) return { need: 'present', ids: itemsOf(named) }
  const ids = rep || itemsOf(opt ? [opt] : named)
  return { need: !!rep === !!cond[1] ? 'gone' : 'present', ids }
}

// The stock rule's half of wargearGroupBlocker (see swapRoom): an UNTOUCHED group whose swap has
// nothing left to replace — every model that carried one of the items already gave it up to
// another group — closes with `need: 'stock'` and the items that ran out. A group that already
// holds a pick is never closed this way: its pick is what the player would undo, and a greyed-out
// row cannot be undone. Whether that pick overdraws the unit is validateRoster's to say.
// Closed only when EVERY option is — an option that hands an item back does not need it, so a
// group can stay open through one of its rows while the others have nothing left to take.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {{ need: 'stock', ids: ItemId[] } | null}
 */
function stockBlocker(def, entry, gi) {
  if ((entry?.wg || []).some(([g]) => g === gi)) return null
  const g = def?.gear?.[gi]
  const byItem = swapRoomByItem(def, entry, gi)
  if (!g || !byItem) return null
  const rep = g.rep || []
  // In whole picks of THIS group: half a Decimator (one butcher cannon of two) is no room for
  // "both of this model's butcher cannons".
  /** @param {ItemId} id */
  const roomOf = (id) => { const left = byItem.get(id); return left == null ? undefined : picksIn(left, rep.includes(id) ? pickShare(def, g, id) : 1) }
  const ids = new Set()
  for (const [oi] of (g.o || []).entries()) {
    // An item byItem does not track is never "run out".
    let out = needs(g, oi).filter((id) => (roomOf(id) ?? Infinity) <= 0)
    // An "X or Y" group runs out only when no model carries either — a whole set of them.
    if (altSets(g)?.some((set) => set.every((id) => (roomOf(id) || 0) > 0))) out = out.filter((id) => !rep.includes(id))
    if (!out.length) return null
    out.forEach((id) => ids.add(id))
  }
  return ids.size ? { need: 'stock', ids: [...ids] } : null
}

// A wargear group's instruction text is a sentence, sometimes followed by a list of the options
// it offers ("…replaced with one of the following:\n◦ 1 hexrifle and 1 torturer's tool").
// appdata carries that list as real newlines, which collapse into one run-on line when
// interpolated into a template, so the parts are split here and the caller renders the list.
// Four markers are in use (◦ ■ ▫ •) and one list has none at all — just a head line ending in
// ':' and an option per line — so the marker is not what identifies a list. A line opening with
// '*' is a footnote about the options rather than one of them, and comes back separately.
// `▪` is the Faction Pack transcriptions' marker (114 Legends instructions); without it their
// lists ran together into one paragraph of the heading (2026-10-07). A hyphen and a space is the
// Kill Tank's ("- 1 Kannon."): read as a plain line of the ':' list, the hyphen stayed in front of
// the bullet (owner, 2026-10-17). Here and not in the data — the text stays appdata's word for
// word, which is what the sync and the RU dictionary key on.
const BULLET = /^(?:[◦•■▪▫]|-(?=\s))\s*/
const FOOTNOTE = /^\*\s*/
/**
 * @param {string | null | undefined} text
 * @returns {{ head: string, bullets: string[], note: string }}
 */
export function splitInstruction(text) {
  const lines = String(text || '').split('\n').map((l) => l.trim()).filter(Boolean)
  /** @type {string[]} */
  const body = []
  /** @type {string[]} */
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
/**
 * @param {GearOption | null | undefined} o
 * @returns {Array<[ItemId, number]>}
 */
export function optionItems(o) {
  const head = o?.[0]
  if (Array.isArray(head)) return head.map(([id, n]) => [id, n || 1])
  return head == null ? [] : [[head, 1]]
}

// An option's display label — "Hexrifle + Torturer's tool", "2× Mortifier flamer".
/**
 * @param {GearOption | null | undefined} o
 * @param {Record<number, string> | null | undefined} items
 * @returns {string}
 */
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
// The size bracket an entry is at, falling back to the first — every reader of an entry's size asks
// this one question, so it is asked here once.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {SizeBracket | undefined}
 */
export function sizeOf(def, entry) {
  return def?.sizes?.[entry?.size ?? 0] || def?.sizes?.[0]
}

// The unit's model count — the live count the player set, else the bracket's minimum.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {number}
 */
export function modelCount(def, entry) {
  return entry?.count ?? sizeOf(def, entry)?.per?.[0] ?? 1
}

// The model count a list row prints — null where the bracket only ever holds one model, since
// "1 model" says nothing. The roster row, the print sheet and the attach picker all print it.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {number | null}
 */
export function shownModelCount(def, entry) {
  const size = sizeOf(def, entry)
  return size && size.per[1] > 1 ? modelCount(def, entry) : null
}

// The bracket a new entry starts at: the one the data marks default, else the first.
/**
 * @param {RosterUnit | null | undefined} def
 * @returns {number}
 */
export function defaultSizeIndex(def) {
  return Math.max(0, (def?.sizes || []).findIndex((s) => s.default))
}

/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @param {number | null} [oi] asked about one option: its own duplicate cap (`od`) counts too
 * @returns {{ limit: number, dup: number } | null}
 */
export function wargearGroupCap(def, entry, gi, oi = null) {
  const cap = groupCap(def, entry, gi)
  // One option's own no-duplicates (`od`, option index → most copies): Strike Team's guardian drone
  // in a group that otherwise takes duplicates. Asked about that option, its cap is the smaller.
  const own = oi != null ? def?.gear?.[gi]?.od?.[oi] : null
  if (!cap || own == null) return cap
  return { ...cap, dup: cap.dup ? Math.min(cap.dup, own) : own }
}
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {{ limit: number, dup: number } | null}
 */
function groupCap(def, entry, gi) {
  const g = def?.gear?.[gi]
  // A budget per MODEL on a profile's copy of a unit-wide instruction (`pb`: "any number of models
  // can each be equipped with up to two of the following", [per, noDup]) — the copy's own models.
  if (g?.pb && !g.lim) {
    const own = modelsPerMini(def, entry)?.get(g.m ?? 0)
    if (own == null) return null
    return { limit: own * g.pb[0], dup: g.pb[1] ? own : 0 }
  }
  const rows = g?.lim
  if (!rows?.length) return null
  const models = modelCount(def, entry)
  let row = null
  for (const r of rows) if (models >= r[0] && (!row || r[0] > row[0])) row = r
  // Below every threshold the group genuinely offers nothing ("for every 5 models…" in a
  // 3-model squad), which is a real 0, not a missing cap.
  if (!row) return { limit: 0, dup: 0 }
  return { limit: row[1], dup: row[2] || 0 }
}

// `excl` (gen-roster-data.mjs's oneEachPerModel): sets of a group's options of which each MODEL
// holds at most one — Broadside's "no model can be equipped with both a twin plasma rifle and twin
// smart missile system", Crisis' starred "each model cannot have duplicates of these". A group
// stores counts, not who holds what, and for counts the rule is exactly "each set together at most
// the unit's model count". wargearExclOver lists the sets an entry breaks (validator, fitWargear);
// wargearExclRoom is how many of ONE option its sets still allow (editor, importer), or null.
/** @param {EntryLike | null | undefined} entry @param {number} gi @param {number} oi */
function optionCount(entry, gi, oi) {
  return (entry?.wg || []).filter(([g, o]) => g === gi && o === oi).reduce((n, [, , c]) => n + (c || 1), 0)
}
// The models a group's per-model sets count against: its profile's — a profile's copy of a
// unit-wide instruction holds only its own models (the Shas'vre one suit, the Shas'ui the rest) —
// or the unit's, for a group no profile owns.
/** @param {RosterUnit | null | undefined} def @param {EntryLike | null | undefined} entry @param {number} gi */
function exclModels(def, entry, gi) {
  const g = def?.gear?.[gi]
  return (g && !g.all && g.m != null ? modelsPerMini(def, entry)?.get(g.m) : null) ?? modelCount(def, entry)
}
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {Array<{ set: number[], spent: number, limit: number }>}
 */
export function wargearExclOver(def, entry, gi) {
  const sets = def?.gear?.[gi]?.excl
  if (!sets?.length) return []
  const limit = exclModels(def, entry, gi)
  return sets
    .map((set) => ({ set, spent: set.reduce((n, oi) => n + optionCount(entry, gi, oi), 0), limit }))
    .filter((x) => x.spent > limit)
}
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @param {number} oi
 * @returns {number | null}
 */
export function wargearExclRoom(def, entry, gi, oi) {
  const sets = (def?.gear?.[gi]?.excl || []).filter((set) => set.includes(oi))
  if (!sets.length) return null
  const limit = exclModels(def, entry, gi)
  return Math.min(...sets.map((set) =>
    Math.max(0, limit - set.filter((o) => o !== oi).reduce((n, o) => n + optionCount(entry, gi, o), 0))))
}

// `xpm` — a model's limit that spans SEVERAL groups (gen-roster-data.mjs's crossGroupPerModel,
// 2026-10-07): a Tau Commander's starred support systems ("this model cannot have duplicates of
// these"), offered both as the burst-cannon swap and in "up to three of the following"; a Knight
// Destrier's chainsword, offered by both weapon arms; a Hive Tyrant's heavy venom cannon OR
// stranglethorn cannon; the Hernkyn Pioneers' "a model can only take one of these options, and not
// with a HYLas rotary cannon". Each entry is `{ s: [[gi, oi?]…], k }` — the picks the pairs cover
// (a bare [gi] is the whole group) together at most k per model of the profile — or, with `item`,
// at most the copies of that item the model holds (the Helbrute's "for each Helbrute fist this
// model is equipped with", the fists the multi-melta swap may add counted in). Counts again, which
// is exact for these: every entry is one model's, or groups whose models are interchangeable.
/** @param {XpmSet['s'][number]} pair @param {number} gi @param {number} oi */
const xpmHit = (pair, gi, oi) => pair[0] === gi && (pair.length === 1 || pair[1] === oi)
/**
 * @param {RosterUnit} def
 * @param {EntryLike | null | undefined} entry
 * @param {XpmSet} set
 * @param {(g: number, o: number) => boolean} [skip]
 */
function xpmSpent(def, entry, set, skip = () => false) {
  return (entry?.wg || []).filter(([g, o]) => !skip(g, o) && set.s.some((p) => xpmHit(p, g, o))).reduce((n, [, , c]) => n + (c || 1), 0)
}
/** @param {RosterUnit} def @param {EntryLike | null | undefined} entry @param {XpmSet} set */
function xpmLimit(def, entry, set) {
  const gear = def.gear || []   // an xpm set is written from the unit's own groups
  if (set.item != null) {
    const groups = new Set(set.s.map(([g]) => g))
    const m = gear[set.s[0][0]]?.m ?? 0
    const stock = (def.defaults || []).find(([dm]) => dm === m)?.[1]?.find(([id]) => id === set.item)?.[1] || 0
    const granted = (entry?.wg || []).filter(([g]) => !groups.has(g)).reduce((n, [g, o, c]) =>
      n + optionItems(gear[g]?.o?.[o]).filter(([id]) => id === set.item).reduce((k, [, q]) => k + (q || 1), 0) * (c || 1), 0)
    return stock + granted
  }
  const ms = new Set(set.s.map(([g]) => (gear[g]?.all ? 'all' : gear[g]?.m ?? 0)))
  const only = ms.size === 1 ? [...ms][0] : 'all'
  const per = only === 'all' ? null : modelsPerMini(def, entry)?.get(only)
  return (set.k || 1) * (per ?? modelCount(def, entry))
}
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {Array<{ set: XpmSet, spent: number, limit: number }>}
 */
export function wargearXpmOver(def, entry) {
  if (!def) return []
  return (def.xpm || []).map((set) => ({ set, spent: xpmSpent(def, entry, set), limit: xpmLimit(def, entry, set) }))
    .filter((x) => x.spent > x.limit)
}
// Room for one more of (gi, oi) under every entry that covers it, or null when none does.
// `wholeGroup`: the pick REPLACES the group's own (a one-of radio), so the group's picks do not count.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @param {number} oi
 * @param {{ wholeGroup?: boolean }} [opts]
 * @returns {number | null}
 */
export function wargearXpmRoom(def, entry, gi, oi, { wholeGroup = false } = {}) {
  if (!def) return null
  const sets = (def.xpm || []).filter((set) => set.s.some((p) => xpmHit(p, gi, oi)))
  if (!sets.length) return null
  /** @type {(g: number, o: number) => boolean} */
  const skip = wholeGroup ? (g) => g === gi : (g, o) => g === gi && o === oi
  return Math.min(...sets.map((set) => Math.max(0, xpmLimit(def, entry, set) - xpmSpent(def, entry, set, skip))))
}

// `pools` — one instruction shipped as a copy per profile (gen-roster-data.mjs's emitCopies,
// pack-roster.mjs's splitUnitWide, 2026-10-14): "For every 5 models in the unit: 1 model's twin
// torturer's tools can be replaced with…" is offered to the Acothyst and to the Wracks, the player
// says which takes it, and the allowance is the SQUAD's — one hexrifle per five models whoever
// carries it (checked in the GW app). Each entry is `{ g: [gi…], lim? }`, the copies sergeant first
// and the step table keyed by the unit's size as a group's `lim` is. Every copy is an ordinary group
// of its profile — its own models are its ceiling — and only the shared allowance lives here.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {number} gi
 * @returns {GearPool | null}
 */
export function wargearPoolOf(def, gi) {
  return (def?.pools || []).find((p) => p.g.includes(gi)) || null
}
/** @param {RosterUnit} def @param {EntryLike | null | undefined} entry @param {GearPool} pool */
function poolRow(def, entry, pool) {
  if (!pool.lim?.length) return null
  const models = modelCount(def, entry)
  let row = null
  for (const r of pool.lim) if (models >= r[0] && (!row || r[0] > row[0])) row = r
  return row ? { limit: row[1], dup: row[2] || 0 } : { limit: 0, dup: 0 }
}
// How many models a group that offers nothing at this size waits for: the first threshold of its
// step table ("If this unit contains 10 models…", "for every 5 models…") — its own or its pool's —
// that opens it, if the unit can reach it. The editor greys the group and says "needs 10 models in
// the unit · now 6" (owner, 2026-10-24: a player asked where the Voidscarred's long rifle was).
// null when the group is open, or shut for another reason (a profile with no model, a blocker).
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {{ models: number, now: number } | null}
 */
export function wargearGroupNeedsModels(def, entry, gi) {
  const g = def?.gear?.[gi]
  const rows = g?.lim?.length ? g.lim : wargearPoolOf(def, gi)?.lim
  if (!rows?.length) return null
  const now = modelCount(def, entry)
  const open = rows.filter((r) => r[1] > 0 && r[0] > now).map((r) => r[0])
  if (!open.length || rows.some((r) => r[1] > 0 && r[0] <= now)) return null
  const models = Math.min(...open)
  const most = Math.max(...(def?.sizes || []).map((s) => s.per[1]))
  return models <= most ? { models, now } : null
}

// The shared allowance of the pool a group is in, at this unit size — what the editor's "up to N"
// chip says for every copy. null when the group is in no pool or the pool has no allowance.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {{ limit: number, dup: number } | null}
 */
export function wargearPoolCap(def, entry, gi) {
  const pool = wargearPoolOf(def, gi)
  return pool && def ? poolRow(def, entry, pool) : null
}
/** @param {EntryLike | null | undefined} entry @param {GearPool} pool @param {(g: number, o: number) => boolean} [skip] @param {number | null} [oi] */
function poolSpent(entry, pool, skip = () => false, oi = null) {
  return (entry?.wg || []).filter(([g, o]) => pool.g.includes(g) && (oi == null || o === oi) && !skip(g, o))
    .reduce((n, [, , c]) => n + (c || 1), 0)
}
/**
 * The pools an entry overdraws: in all (`oi` null) or of one option across the copies.
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {Array<{ pool: GearPool, oi: number | null, spent: number, limit: number }>}
 */
export function wargearPoolOver(def, entry) {
  if (!def) return []
  const out = []
  for (const pool of def.pools || []) {
    const row = poolRow(def, entry, pool)
    if (!row) continue
    const spent = poolSpent(entry, pool)
    if (spent > row.limit) out.push({ pool, oi: null, spent, limit: row.limit })
    if (!row.dup) continue
    const opts = def.gear?.[pool.g[0]]?.o || []
    for (let oi = 0; oi < opts.length; oi++) {
      const n = poolSpent(entry, pool, undefined, oi)
      if (n > row.dup) out.push({ pool, oi, spent: n, limit: row.dup })
    }
  }
  return out
}
/**
 * How many of (gi, oi) this copy may hold with every other pick as it is, under its pool's
 * allowance — null when the group is in no pool or the pool has no allowance. `wholeGroup`: the
 * pick REPLACES the group's own (a one-of radio), so the group's picks do not count.
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @param {number} oi
 * @param {{ wholeGroup?: boolean }} [opts]
 * @returns {number | null}
 */
export function wargearPoolRoom(def, entry, gi, oi, { wholeGroup = false } = {}) {
  if (!def) return null
  const pool = wargearPoolOf(def, gi)
  const row = pool && poolRow(def, entry, pool)
  if (!row) return null
  /** @type {(g: number, o: number) => boolean} */
  const skip = wholeGroup ? (g) => g === gi : (g, o) => g === gi && o === oi
  let room = row.limit - poolSpent(entry, pool, skip)
  if (row.dup) room = Math.min(room, row.dup - poolSpent(entry, pool, skip, oi))
  return Math.max(0, room)
}
// Which other copy holds what this one cannot take — the editor names it ("taken by the Acothyst")
// rather than only greying the row. null while this copy has room.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @param {number} oi
 * @returns {number | null} the miniature index of a copy holding picks of the pool
 */
export function wargearPoolTakenBy(def, entry, gi, oi) {
  if (!def) return null
  const pool = wargearPoolOf(def, gi)
  if (!pool || wargearPoolRoom(def, entry, gi, oi, { wholeGroup: def.gear?.[gi]?.in !== 'stepper' }) !== 0) return null
  const row = poolRow(def, entry, pool)
  // The option's own cap ran out → whoever holds that option; the total → whoever holds any.
  const byOption = !!row?.dup && poolSpent(entry, pool, (g) => g === gi, oi) >= row.dup
  const other = (entry?.wg || []).find(([g, o]) => g !== gi && pool.g.includes(g) && (!byOption || o === oi))
  return other ? (def.gear?.[other[0]]?.m ?? 0) : null
}

// `pm` — rules about ONE model that reach across groups (pack-roster.mjs's perModelRules; Legends
// Crisis Battlesuits: each suit takes up to three from one group, at most one of each starred item
// counting the burst-cannon swap too, and at most three ranged weapons counting the swap's pick or
// the burst cannon it kept). Groups store counts, not who holds what, so the question is whether
// the counts CAN be dealt onto the models. Models differ only in what sits in the swap's slot, so
// each gets its base (the swap's picks; the rest keep what the swap gives up) and the add group's
// counts are a flow: item → the model (at most 1 of a starred item, none if it is the base) →
// through the model's ranged allowance when the item is ranged → the model's slots. The flow
// carries every pick exactly when a legal assignment exists.
/** @param {GearOption} o */
const pmItemOf = (o) => (Array.isArray(o[0]) ? o[0][0][0] : o[0])
// A `pm` slot names a group, or — where the group ships as one copy per profile — all its copies.
/** @param {number | number[] | null | undefined} x @returns {number[]} */
export const pmGroups = (x) => (x == null ? [] : Array.isArray(x) ? x : [x])
/** @param {RosterUnit} def @param {EntryLike | null | undefined} entry @param {number | number[]} gis */
function pmCounts(def, entry, gis) {
  const set = new Set(pmGroups(gis))
  /** @type {Map<ItemId, number>} */
  const m = new Map()
  for (const [g, oi, c] of entry?.wg || []) {
    if (!set.has(g)) continue
    const id = pmItemOf((def.gear || [])[g].o[oi])
    m.set(id, (m.get(id) || 0) + (c || 1))
  }
  return m
}
/** @param {number[][]} cap residual capacities, consumed @param {number} s @param {number} t @returns {number} */
function maxFlow(cap, s, t) {
  const n = cap.length
  let flow = 0
  for (;;) {
    const prev = new Array(n).fill(-1)
    prev[s] = s
    const queue = [s]
    for (let head = 0; head < queue.length && prev[t] < 0; head++) {
      const u = queue[head]
      for (let v = 0; v < n; v++) if (prev[v] < 0 && cap[u][v] > 0) { prev[v] = u; queue.push(v) }
    }
    if (prev[t] < 0) return flow
    let push = Infinity
    for (let v = t; v !== s; v = prev[v]) push = Math.min(push, cap[prev[v]][v])
    for (let v = t; v !== s; v = prev[v]) { cap[prev[v]][v] -= push; cap[v][prev[v]] += push }
    flow += push
  }
}
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {boolean}
 */
export function perModelFits(def, entry) {
  const pm = def?.pm
  if (!pm) return true
  const models = modelCount(def, entry)
  const one = new Set(pm.one || [])
  const [rangedMax, rangedIds] = pm.ranged || [Infinity, []]
  const ranged = new Set(rangedIds)
  const given = pm.base != null ? def.gear?.[pmGroups(pm.base)[0]]?.rep?.[0] ?? null : null
  /** @type {Array<ItemId | null>} */
  const bases = []
  if (pm.base != null) for (const [id, n] of pmCounts(def, entry, pm.base)) for (let k = 0; k < n; k++) bases.push(id)
  // More swaps than models: a unit-wide swap group has no cap of its own to say so, so this does.
  if (bases.length > models) return false
  while (bases.length < models) bases.push(given)
  // Ranged weapons a model carries before the add group: its printed loadout's, with the swapped
  // slot holding its base instead of what the swap gives up.
  const row = def.defaults?.[0]?.[1] || []
  const printed = row.filter(([id, , total]) => ranged.has(id) && !total).reduce((n, [, c]) => n + (c || 1), 0)
  /** @param {ItemId | null} b */
  const rangedOf = (b) => printed - (given != null && ranged.has(given) ? 1 : 0) + (b != null && ranged.has(b) ? 1 : 0)

  const adds = [...pmCounts(def, entry, pm.add)]
  const want = adds.reduce((n, [, c]) => n + c, 0)
  if (!want) return true
  // Nodes: 0 source · items · per model a ranged gate and the model · sink.
  const K = adds.length
  /** @param {number} i */
  const R = (i) => 1 + K + 2 * i
  /** @param {number} i */
  const T = (i) => 2 + K + 2 * i
  const sink = 1 + K + 2 * models
  const cap = Array.from({ length: sink + 1 }, () => new Array(sink + 1).fill(0))
  adds.forEach(([id, c], k) => {
    cap[0][1 + k] = c
    for (let i = 0; i < models; i++) {
      const each = one.has(id) ? (bases[i] === id ? 0 : 1) : pm.slots
      cap[1 + k][ranged.has(id) ? R(i) : T(i)] = each
    }
  })
  for (let i = 0; i < models; i++) {
    cap[R(i)][T(i)] = Number.isFinite(rangedMax) ? Math.max(0, rangedMax - rangedOf(bases[i])) : pm.slots
    cap[T(i)][sink] = pm.slots
  }
  return maxFlow(cap, 0, sink) === want
}
// How many of ONE option a `pm` group can hold with every other pick as it is — the most that still
// deals out, scanning the whole range because a swap can make room (a suit that trades its burst
// cannon for a support system has a ranged slot free). null for a group `pm` does not cover; the
// current count when nothing fits, so the editor only ever stops the "+".
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @param {number} oi
 * @returns {number | null}
 */
export function perModelRoom(def, entry, gi, oi) {
  const pm = def?.pm
  const isAdd = pmGroups(pm?.add).includes(gi)
  if (!pm || (!isAdd && !pmGroups(pm.base).includes(gi))) return null
  const models = modelCount(def, entry)
  const others = (entry?.wg || []).filter(([g, o]) => !(g === gi && o === oi))
  const current = optionCount(entry, gi, oi)
  let best = null
  const top = isAdd ? models * pm.slots : models
  for (let n = 0; n <= top; n++) {
    if (perModelFits(def, { ...entry, wg: n ? [...others, [gi, oi, n]] : others })) best = n
  }
  return best ?? current
}

// The ceiling a group with NO structural cap has: one pick per model of the profile it belongs to
// — "any number of Sicarian Ruststalkers can each have their transonic razor replaced" excludes the
// Princeps — times the copies of the weapon each of those models carries (`cp`, five groups
// game-wide: a Wraithlord's two shuriken catapults, a Ravager's three dark lances, a Deff Dread's
// two big shootas and two dread klaws, a War Walker's two shuriken cannons, which at 2 models is
// four swaps). Deliberately conservative: `null` where the group belongs to no single profile, so
// the caller keeps its own behaviour rather than being handed a guess.
// A group no unit size lets more than one model take — "This model's storm bolter can be replaced
// with 1 relic shield" on a Chaplain, "1 model's … can be replaced" on a squad of any size. appdata
// still calls some of these steppers, and a 0/1 counter beside a one-for-one swap read as a
// different kind of choice from the two-row "one of" every other single swap is (2026-10-07). Asked
// at the LARGEST bracket and its top model count, so the answer never changes with the unit's size
// and the control does not change shape under a "+" on the model count.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {number} gi
 * @returns {boolean}
 */
export function wargearGroupAlwaysOne(def, gi) {
  const sizes = def?.sizes || []
  if (!def?.gear?.[gi] || !sizes.length) return false
  const top = sizes.length - 1
  const entry = { id: def.id, size: top, count: sizes[top]?.per?.[1] }
  const cap = wargearGroupCap(def, entry, gi)
  const ceiling = cap ? cap.limit : wargearGroupFallbackCap(def, entry, gi)
  return ceiling != null && ceiling <= 1
}

/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {number | null}
 */
export function wargearGroupFallbackCap(def, entry, gi) {
  const g = def?.gear?.[gi]
  if (!g || g.all || g.m == null) return null
  const own = modelsPerMini(def, entry)?.get(g.m)
  return own == null ? null : own * (g.cp || 1)
}

// What the entry has already spent in a group, optionally ignoring one option (so a stepper can
// ask "how much room is left for ME").
/**
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @param {number | null} [exceptOi]
 * @returns {number}
 */
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
//
// `granted` are keywords the ENTRY gained rather than the datasheet printing them — the same
// allegiance upgrades enhEligible() reads. Houndpack Lance's "select three WAR DOG units; those
// units have the CHARACTER keyword" makes a War Dog Karnivore a Character in every sense the
// rules use the word, the nomination of a Warlord included, and the army's app exports one as
// the Warlord. A unit BARRED from being the Warlord stays barred: the grant adds a keyword, it
// does not overrule a rule written about this datasheet.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {Detachment[] | null | undefined} detachments
 * @param {string[]} [granted]
 * @returns {boolean}
 */
export function canBeWarlord(def, detachments, granted = []) {
  if (def?.id && (detachments || []).some((d) => d.grantedWarlord?.includes(def.id))) return true
  if (def?.flags?.noWarlord) return false
  if (granted.some((k) => String(k).toLowerCase() === 'character')) return true
  return !!(def?.flags?.char || def?.flags?.nonCharWarlordOk)
}

// Every keyword an ENTRY has that its datasheet does not print — the two sources together, because
// both can be the thing that lets a unit carry an enhancement and a caller that asks only one gets
// a different answer from the caller that asks the other:
//   • a detachment rule grants it to a named datasheet (conditionalKeywords.json) — Rollin' Deff
//     makes a Battlewagon, a Hunta Rig and a Kill Rig WAGON, which is what "Wagon unit only"
//     enhancements like Boarding Ramps ask for. No Ork datasheet PRINTS that keyword, so without
//     this every one of that detachment's upgrades was ineligible for every unit in the game, and a
//     legal list came back with two errors on it;
//   • an allegiance upgrade the entry chose for itself hands a vehicle CHARACTER.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {Detachment[] | null | undefined} detachments
 * @param {string | undefined} factionSlug
 * @returns {string[]}
 */
export function grantedKeywords(def, entry, detachments, factionSlug) {
  const alleg = allegKeyword(def, entry, detachments)
  return [
    ...grantedKeywordsFor(def?.id, factionSlug, detachments).map((g) => g.kw),
    ...(alleg ? [alleg] : []),
  ]
}

// ── Rule-granted keywords ────────────────────────────────────────────────────────────────────
// src/data/conditionalKeywords.json already lists the keywords a unit GAINS from an army or
// detachment rule (see the root CLAUDE.md); FactionDatasheetView gates them on the detachment
// picked in useFactionChoice. Here the gate is the roster's own selected detachments instead —
// same sidecar, same DatasheetCard `grantedKeywords` prop, different source of "which detachment
// is active". Nothing new is generated for this.

// The sidecar keys detachments by their wh11ed id, the roster refers to them by their appdata
// display name, so matching goes through detKey() (src/core/shared/slugify.js), not slugify() alone:
// appdata spells "Dëlve Assault Shift" with a diaeresis, which slugify() drops to
// `d-lve-assault-shift` (24 of 25 gated grants matched without it). Re-exported so the modal
// matches the roster's detachment names to the faction file's the way grantedKeywordsFor does.
export { detKey }

// `detachments` accepts either the resolved detachment objects the editor/browser pass around
// (`curDetachments`) or the bare name strings a roster stores — being permissive here is what
// keeps a call site from silently wiring the wrong one.
/**
 * @param {string | undefined} unitId
 * @param {string | undefined} factionSlug
 * @param {Array<Detachment | string> | null | undefined} detachments
 * @returns {Array<{ kw: string, detName: string | null, extra: boolean }>}
 */
export function grantedKeywordsFor(unitId, factionSlug, detachments) {
  if (!factionSlug || !unitId) return []
  const grants = KEYWORD_GRANTS[factionSlug]?.[unitId]
  if (!grants?.length) return []
  /** @type {Map<string, string>} detKey -> display name, for the footnote */
  const picked = new Map()
  for (const d of detachments || []) {
    const name = typeof d === 'string' ? d : d?.name
    if (name) picked.set(detKey(name), name)
  }
  /** @type {Array<{ kw: string, detName: string | null, extra: boolean }>} */
  const out = []
  const seen = new Set()
  // Army-wide grants first: when the same keyword arrives both ways, the unconditional claim is
  // the truer one to footnote.
  for (const g of [...grants.filter((g) => !g.det), ...grants.filter((g) => g.det)]) {
    if (g.det && !picked.has(g.det)) continue
    if (seen.has(g.kw)) continue
    seen.add(g.kw)
    out.push({ kw: g.kw, detName: (g.det && picked.get(g.det)) || null, extra: !!g.extra })
  }
  return out
}

// Is this unit Battleline IN THIS ARMY? The datasheets that print the keyword always are; the
// other 29 in the game gain it from a Detachment (Runt Swarm makes GRETCHIN Battleline, Company
// of Hunters makes an Outrider Squad Battleline for Dark Angels), and gaining it doubles the
// duplicate limit and moves the unit into the Battleline section.
//
// The generated `condBattleline` flag says only that a datasheet CAN be Battleline — it carries no
// detachment — so reading it as the answer handed 29 units a permanent ×2 in armies whose
// detachment grants nothing (reported for Orks: six Warbikers in a Blitz Brigade list). The gate
// that knows WHICH detachment grants it is conditionalKeywords.json, the same sidecar
// `grantedKeywords` already runs enhancement and Warlord eligibility through — so this asks it,
// and the flag survives only as the fallback for a caller that has no detachments to check.
/**
 * @param {RosterUnit | null | undefined} unit
 * @param {string[] | null} [granted]
 * @returns {boolean}
 */
export function isBattlelineNow(unit, granted = null) {
  if (granted == null) return !!unit?.condBattleline
  return granted.some((k) => String(k).toLowerCase() === 'battleline')
}

// ── Force Disposition: the one an army declares ───────────────────────────────────────────────
// Every Detachment gives access to one or more of the five (`fds` on the generated detachment —
// core rules 25.04: "each one will give you access to different force dispositions"; 39 carry two
// in MFM v1.5), and an ARMY has exactly one: the card a player selects after mustering, on which the
// opponent's symbol names their Primary Mission. So a list whose detachments offer more than one —
// one detachment with two is enough — has to DECLARE which it plays: `roster.disposition` is that
// declaration, stored as the name `fds` spells it. Not the tracker's own id: that vocabulary lives in the Event Companion data,
// which the roster screens deliberately never load, and the one place both are in scope
// (rosterHandoff) can translate.
/**
 * @param {Detachment[] | null | undefined} detachments
 * @returns {string[]}
 */
export function dispositionCandidates(detachments) {
  return [...new Set((detachments || []).flatMap((d) => d?.fds || []).filter(Boolean))]
}

// What this list's disposition IS — the only candidate when there is one, the declaration while it
// still names a candidate, and null when there is a choice nobody has made yet (or no detachment
// at all). Self-healing by construction: dropping the detachment a declaration came from takes the
// declaration with it, so a list can never claim a disposition it no longer fields.
/**
 * @param {Partial<Roster> | null | undefined} roster
 * @param {Detachment[] | null | undefined} detachments
 * @returns {string | null}
 */
export function dispositionOf(roster, detachments) {
  const cands = dispositionCandidates(detachments)
  if (cands.length === 1) return cands[0]
  const declared = roster?.disposition
  return declared && cands.includes(declared) ? declared : null
}

// ── Chapter: which of Codex: Space Marines' Chapters the list is ──────────────────────────────
// No rule of the list depends on it; the Russian tournament's FACTION KEYWORD line names it
// ("Imperium - Adeptus Astartes - Salamanders", Ordo Eventus's sample). The Chapters are the ones
// the faction's detachments are locked to. The list states its Chapter itself where it can — a
// Chapter's detachment (`chapter`) or Epic Hero (`ch`, gen-roster-data.mjs) — and the player
// declares it where it cannot (`roster.chapter`). Self-healing like the disposition: a declaration
// stands only while nothing in the list names another Chapter.
/** @param {RosterFaction | null | undefined} faction @returns {string[]} */
export function rosterChapters(faction) {
  return [...new Set((faction?.detachments || []).flatMap((d) => (d.chapter ? [d.chapter] : [])))].sort()
}

// The Chapters something in the list names, each with the first detachment or unit naming it.
/**
 * @param {Partial<Roster> | null | undefined} roster
 * @param {RosterFaction | null | undefined} faction
 * @returns {Map<string, string>}
 */
function namedChapters(roster, faction) {
  const chapters = rosterChapters(faction)
  /** @type {Map<string, string>} */
  const named = new Map()
  if (!chapters.length) return named
  for (const d of rosterDetachments(roster, faction)) {
    if (d.chapter && !named.has(d.chapter)) named.set(d.chapter, d.name)
  }
  const defs = new Map((faction?.units || []).map((u) => [u.id, u]))
  for (const e of roster?.units || []) {
    const def = defs.get(e.id)
    if (def?.ch && chapters.includes(def.ch) && !named.has(def.ch)) named.set(def.ch, def.name)
  }
  return named
}

// The list's own answer: `{ chapter, from }` when exactly one Chapter is named in it, else null.
/**
 * @param {Partial<Roster> | null | undefined} roster
 * @param {RosterFaction | null | undefined} faction
 * @returns {{ chapter: string, from: string } | null}
 */
export function chapterProof(roster, faction) {
  const named = namedChapters(roster, faction)
  if (named.size !== 1) return null
  const [[chapter, from]] = named
  return { chapter, from }
}

// What the list's Chapter IS: the one it names, else the declaration — one of the Chapters it
// names when it names several, any of the faction's when it names none.
/**
 * @param {Partial<Roster> | null | undefined} roster
 * @param {RosterFaction | null | undefined} faction
 * @returns {string | null}
 */
export function chapterOf(roster, faction) {
  const named = namedChapters(roster, faction)
  if (named.size === 1) return [...named.keys()][0]
  const declared = roster?.chapter
  if (!declared) return null
  if (named.size) return named.has(declared) ? declared : null
  return rosterChapters(faction).includes(declared) ? declared : null
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
/**
 * @param {RosterUnit | null | undefined} def
 * @param {Detachment[] | null | undefined} detachments
 * @returns {AllegianceChoice | null}
 */
export function allegFor(def, detachments) {
  const a = def?.alleg
  if (!a?.o?.length) return null
  if (a.det && !(detachments || []).some((d) => d?.name === a.det)) return null
  return a
}

// The keyword this entry gained from its choice — the mark itself ("Nurgle") unless the data says
// the option grants a differently-named one. Null when nothing is chosen or the gate is closed.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {Detachment[] | null | undefined} detachments
 * @returns {string | null}
 */
export function allegKeyword(def, entry, detachments) {
  const a = allegFor(def, detachments)
  if (!a || !entry?.alleg) return null
  const opt = a.o.find((o) => o.n === entry.alleg)
  return opt ? (opt.kw || opt.n) : null
}

// Extra wargear the choice grants (Soul Grinder's torrent of burning blood and friends).
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {Detachment[] | null | undefined} detachments
 * @returns {ItemId[]}
 */
export function allegItems(def, entry, detachments) {
  const a = allegFor(def, detachments)
  const opt = a && entry?.alleg ? a.o.find((o) => o.n === entry.alleg) : null
  return opt?.wg ? [opt.wg] : []
}

// How many entries in the army have taken an optional (capped) choice of this group.
/**
 * @param {RosterEntry[] | null | undefined} units
 * @param {DefOf} defOf
 * @param {string} groupKey
 * @param {Detachment[] | null | undefined} detachments
 * @returns {number}
 */
export function allegSpent(units, defOf, groupKey, detachments) {
  return (units || []).filter((u) => {
    const a = allegFor(defOf(u.id), detachments)
    return a?.g === groupKey && u.alleg
  }).length
}

// Find an enhancement by name across the roster's selected detachments (an army may field
// several detachments, up to its Detachment-Points budget — like the tracker). Two detachments can
// each print an enhancement of the same name at a different price (Drukhari's Towering Arrogance,
// 15 and 20; four factions, 2026-10-19), so the entry also records whose it is (`enhDet`, the
// detachment's name) and that one is asked first. An entry from before it was recorded falls back
// to the first of the name, as every entry did.
/**
 * @param {Detachment[] | null | undefined} detachments
 * @param {string | null | undefined} name no name finds nothing: every enhancement has one
 * @param {string | null} [det] the detachment it was taken from (`entry.enhDet`)
 * @returns {Enhancement | null}
 */
export function findEnhancement(detachments, name, det = null) {
  const own = det && (detachments || []).find((d) => d?.name === det)?.enhancements?.find((x) => x.name === name)
  if (own) return own
  for (const d of detachments || []) {
    const e = d?.enhancements?.find((x) => x.name === name)
    if (e) return e
  }
  return null
}

// Who in this list wears an enhancement, and who could (a player's request, 2026-10-06 — reading
// a list's enhancements, the first question is "on whom?"). `name` is the enhancement's as the
// rules text prints it; matched loosely against the roster data's (apostrophes, case). Units are
// answered by their datasheet name, repeated names counted ("Captain ×2"); a unit already wearing
// another is no candidate. A mandatory one is worn by every unit it fits. Null when no selected
// detachment offers it.
/** @param {string | null | undefined} s */
const looseName = foldName
/**
 * @param {string} name
 * @param {{ units?: RosterEntry[], defOf?: DefOf, detachments?: Detachment[], factionSlug?: string }} [opts]
 * @returns {{ taken: string[], can: string[] } | null}
 */
export function enhancementBearers(name, { units = [], defOf, detachments = [], factionSlug } = {}) {
  let enh = null
  for (const d of detachments) {
    enh = d?.enhancements?.find((x) => looseName(x.name) === looseName(name)) || null
    if (enh) break
  }
  if (!enh || !defOf) return null
  const taken = []
  const can = []
  for (const u of units) {
    const def = defOf(u.id)
    if (!def) continue
    const fits = enhEligible(enh, def, grantedKeywords(def, u, detachments, factionSlug))
    if (u.enh === enh.name || (enh.mandatory && fits)) taken.push(def.name)
    // One enhancement a unit: one already wearing another is not a candidate.
    else if (fits && !enh.mandatory && !u.enh) can.push(def.name)
  }
  /** @param {string[]} names */
  const counted = (names) => {
    /** @type {Map<string, number>} */
    const tally = new Map()
    for (const n of names) tally.set(n, (tally.get(n) || 0) + 1)
    return [...tally].map(([n, k]) => (k > 1 ? `${n} ×${k}` : n))
  }
  // An "(Upgrade)" one may be taken several times (`limit`): while there is room, the candidates
  // still count after the first taker.
  const room = taken.length < (enh.limit || 1)
  return { taken: counted(taken), can: room ? counted(can) : [] }
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
/**
 * @param {RosterUnit | null | undefined} def
 * @param {Detachment[] | null | undefined} detachments
 * @param {RosterEntry[] | null | undefined} units
 * @param {string | null | undefined} excludeUid
 * @param {string | undefined} factionSlug
 * @returns {Array<{ name: string, pts: number, eligible: boolean, used: boolean, mandatory: boolean }>}
 */
export function enhOptionsFor(def, detachments, units, excludeUid, factionSlug) {
  // An allegiance upgrade can hand a vehicle CHARACTER, and that is what makes it able to carry an
  // enhancement at all — so eligibility is asked about the ENTRY, not just the printed sheet.
  const entry = (units || []).find((u) => u.uid === excludeUid)
  const granted = grantedKeywords(def, entry, detachments, factionSlug)
  if (!detachments?.length || !def) return []
  // One option per detachment's enhancement — a name two selected detachments both print is two
  // options, each saying whose (`det`, and `dup` so the editor names the detachment beside it).
  /** @param {string | undefined} name @param {string | undefined} det */
  const keyOf = (name, det) => `${det}\u0000${name}`
  /** @param {RosterEntry} u */
  const ownerOf = (u) => u.enhDet || detachments.find((d) => d.enhancements?.some((x) => x.name === u.enh))?.name
  const countElsewhere = new Map()
  for (const u of units || []) {
    if (u.uid === excludeUid || !u.enh) continue
    const k = keyOf(u.enh, ownerOf(u))
    countElsewhere.set(k, (countElsewhere.get(k) || 0) + 1)
  }
  const names = new Map()
  for (const det of detachments) for (const e of det.enhancements || []) names.set(e.name, (names.get(e.name) || 0) + 1)
  const out = []
  for (const det of detachments) {
    for (const e of det.enhancements || []) {
      const used = (countElsewhere.get(keyOf(e.name, det.name)) || 0) >= (e.limit || 1)
      out.push({ name: e.name, det: det.name, ...(names.get(e.name) > 1 ? { dup: true } : {}), pts: e.pts, eligible: enhEligible(e, def, granted), used, mandatory: !!e.mandatory })
    }
  }
  return out
}

// The mandatory, automatic enhancement for this exact unit (Necrons' Pantheon of Woe, Imperial
// Agents' Veiled Blade Elimination Force — see gen-roster-data.mjs ENH_REQ_FIXES), if any of the
// roster's selected detachments grants one. Not a player pick: applied to every eligible unit
// unconditionally, so unlike a normal enhancement it isn't tracked on the entry (no entry.enh,
// no "used elsewhere" bookkeeping) — it's recomputed from def + detachments every time.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {Detachment[] | null | undefined} detachments
 * @returns {Enhancement | null}
 */
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
export { occupies as leaderOccupies }

// How many leader units a BODYGUARD unit may hold, and what its datasheet says about the mix. The
// core rules give it one leader and one support ("unless otherwise stated"), and five datasheets
// state otherwise on their own side — `hosts`, read out of appdata's prose by gen-roster-data.mjs:
// the four Astra Militarum squads that take two Leaders "provided no more than one of those units
// is a COMMAND SQUAD unit" (a Castellan AND a Command Squad on one squad is how that army is
// ordinarily built), and Kroot Carnivores, who take two once twenty strong and never two the same.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {{ leader: number, support: number, oneKw?: string, noDup?: 1 }}
 */
export function hostLimitsFor(def, entry) {
  const h = def?.hosts
  if (!h) return { leader: 1, support: 1 }
  if (h.minModels && modelCount(def, entry) < h.minModels) return { leader: 1, support: 1 }
  return { leader: h.n || 1, support: 1, oneKw: h.oneKw, noDup: h.noDup }
}

// Whether attaching `def` to the unit `host` would break one of those limits — the one question the
// editor's picker and the validator both ask, so they can never disagree about it. `attached` is
// every leader already on that host except the one being placed.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {EntryLike} host
 * @param {RosterUnit | null | undefined} hostDef
 * @param {Array<{ entry: EntryLike, def: RosterUnit | null | undefined }>} attached
 * @param {Detachment[] | null | undefined} [detachments]
 * @param {Set<string> | null} [armySids] see gatedLeads
 * @returns {boolean}
 */
export function hostSlotTaken(def, entry, host, hostDef, attached, detachments = [], armySids = null) {
  const lim = hostLimitsFor(hostDef, host)
  const type = leadTypeFor(def, entry, hostDef, detachments, armySids)
  if (type === 'join') return attached.some((o) => joinsClash(def, o.def))
  const same = attached.filter((o) => leadTypeFor(o.def, o.entry, hostDef, detachments, armySids) === type && occupies(def, o.def))
  if (same.length >= (type === 'leader' ? lim.leader : lim.support)) return true
  const { oneKw } = lim
  if (oneKw && hasKeyword(def, oneKw) && attached.some((o) => o.def && hasKeyword(o.def, oneKw))) return true
  if (lim.noDup && attached.some((o) => o.def?.id === def?.id)) return true
  return false
}

// "A CHARACTER unit can only be attached to a unit if both units share the same keyword" — the
// Pactbound Zealots restriction, which appdata states on the attachment itself ("requires all
// units have keyword", one group per mark) and the generator carries as `allKw`: the keywords one
// of which the leader and the unit it joins must BOTH have. A keyword counts whether the unit is
// printed with it (Abaddon's CHAOS UNDIVIDED) or chose it (a Chaos Lord's Mark of Chaos). Until
// 2026-10-09 a hand-written "chosen mark = chosen mark" stood in for this, and an Epic Hero, who
// chooses nothing, joined a unit of any mark (a player's report).
//
// Returns null when the attachment is fine or not yet decidable — a unit that still owes its
// mandatory mark (allegMissing says so) may end up sharing one — else what each side has, for the
// message: `{ own, theirs }`.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {RosterUnit | null | undefined} targetDef
 * @param {EntryLike | null | undefined} targetEntry
 * @param {Detachment[] | null | undefined} [detachments]
 * @param {Set<string> | null} [armySids] see gatedLeads
 * @returns {{ own: string, theirs: string } | null}
 */
export function sharedKeywordClash(def, entry, targetDef, targetEntry, detachments = [], armySids = null) {
  if (!def || !targetDef) return null
  const direct = leadTo(leadsFor(def, entry, detachments, armySids), targetDef.id)
  const lead = direct || gatedLeads((def.leadKw || []).map((g) => ({ ...g, to: (g.kw || []).join('+') })), detachments)
    .find((g) => (g.kw || []).every((k) => hasKeyword(targetDef, k)))
  const need = lead?.allKw
  if (!need?.length) return null
  /** @param {RosterUnit} d @param {EntryLike | null | undefined} e */
  const owes = (d, e) => !!allegFor(d, detachments)?.req && !e?.alleg
  if (owes(def, entry) || owes(targetDef, targetEntry)) return null
  /** @param {RosterUnit} d @param {EntryLike | null | undefined} e @returns {(k: string) => boolean} */
  const has = (d, e) => (k) => hasKeyword(d, k) || (allegKeyword(d, e, detachments) || '').toLowerCase() === k.toLowerCase()
  if (need.some((k) => has(def, entry)(k) && has(targetDef, targetEntry)(k))) return null
  /** @param {RosterUnit} d @param {EntryLike | null | undefined} e */
  const list = (d, e) => need.filter(has(d, e)).join(', ') || '—'
  return { own: list(def, entry), theirs: list(targetDef, targetEntry) }
}

// A Support unit — one its datasheet lets join a bodyguard unit ONLY as Support (core 24.34). Core
// 25.04: "Each support unit in your roster must be attached to a bodyguard unit" (rosterValidation's
// supportUnattached). Every attachment, not any: Cato Sicarius joins Victrix Honour Guard as Support
// through his own Captain of the Honour Guard, but his core ability is Leader, and a Leader may stand
// alone — the only unit in the data with both kinds (2026-10-09). Checked against appdata that day:
// the 46 datasheets printing Support, plus nine more that are rightly held to it — seven Faction Pack
// Legends whose PDF prints Support (appdata carries no Legends), and the Ogryn Bodyguard and Nork
// Deddog, whose own Loyal Protector rule says they "must join one COMMAND SQUAD unit".
/**
 * @param {RosterUnit | null | undefined} def
 * @returns {boolean}
 */
export function isSupportUnit(def) {
  const types = [...(def?.leads || []), ...(def?.leadKw || [])].map((l) => l.type)
  return types.length > 0 && types.every((t) => t === 'support')
}

/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {RosterUnit | null | undefined} targetDef
 * @param {Detachment[] | null | undefined} [detachments]
 * @param {Set<string> | null} [armySids] see gatedLeads
 * @returns {'leader' | 'support' | 'join' | null}
 */
export function leadTypeFor(def, entry, targetDef, detachments = [], armySids = null) {
  if (!def || !targetDef) return null
  // A unit that JOINS a unit already led (`joins`): of the units its rule names, or any — never
  // another such unit. Whether the target is led by the right character is joinLedBy's question.
  if (def.joins) {
    if (targetDef.joins) return null
    return !def.joins.to || def.joins.to.includes(bareUnitId(targetDef.id)) ? 'join' : null
  }
  const direct = leadTo(leadsFor(def, entry, detachments, armySids), targetDef.id)
  if (direct) return direct.type
  const kwGroups = gatedLeads((def.leadKw || []).map((g) => ({ ...g, to: (g.kw || []).join('+') })), detachments)
  const hit = kwGroups.find((g) => (g.kw || []).every((k) => hasKeyword(targetDef, k)))
  return hit ? hit.type : null
}

// Whether a leader already attached to a unit fills the slot a second leader wants. Normally one
// leader and one support is all a bodyguard unit may have (core rules), but a datasheet can state
// otherwise — the Death Guard characters that join a Plague Marines unit "even if one other Leader
// unit has already been attached to it (you cannot attach more than one of the same Leader to the
// same unit)", `flags.alongside`. Such a leader neither takes the slot nor is blocked by one; the
// parenthetical is the only limit left, so it blocks nothing but another copy of ITSELF. A few
// Legends name WHOM they may join beside instead (`along`, keywords: a Jokaero Weaponsmith "even
// if one INQUISITOR unit has already been attached") — beside anyone else they take the slot.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {RosterUnit | null | undefined} [other]
 * @returns {boolean}
 */
export const joinsAlongside = (def, other) => !!def?.flags?.alongside
  || !!(other && def?.along?.some((k) => hasKeyword(other, k)))
/** @param {RosterUnit | null | undefined} def @param {RosterUnit | null | undefined} other */
const occupies = (def, other) => (joinsAlongside(def, other) || joinsAlongside(other, def)
  ? def?.id != null && def.id === other?.id
  : true)

// A unit that joins a unit already led — Cryptothralls, Servitors, Court of the Archon, the Aeldari
// support weapons (`joins`, read by gen-roster-data's readJoins; owner, 2026-10-25). Stored in
// `leaderOf` like any attachment, so the attached block, the card and the tracker take it as part
// of that unit, which is what its rule says ("every model in this unit counts as being part of that
// Bodyguard unit"). Two questions only it asks: is the unit it joins led by a character its rule
// names (`joins.by`), and is another of the units it excludes (`joins.one`) already joined there.
/**
 * Whether `host` is led by a character `def`'s rule names — always, for a rule that names none.
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} host
 * @param {RosterEntry[] | null | undefined} units
 * @param {DefOf} defOf
 * @param {string | null} [selfUid]
 */
export function joinLedBy(def, host, units, defOf, selfUid = null) {
  const by = def?.joins?.by
  if (!by?.length) return true
  return (units || []).some((o) => o.uid !== selfUid && o.leaderOf === host?.uid && !defOf?.(o.id)?.joins && by.includes(bareUnitId(o.id)))
}
/**
 * Whether two joining units may not stand in one unit together.
 * @param {RosterUnit | null | undefined} a
 * @param {RosterUnit | null | undefined} b
 */
export function joinsClash(a, b) {
  if (!a?.joins || !b?.joins) return false
  return a.joins.one.includes(bareUnitId(b.id)) || b.joins.one.includes(bareUnitId(a.id))
}

// `items` is optional and only feeds the disambiguating facts below: the wargear a target's own
// player CHOSE, which is often the only thing separating two squads of one datasheet. A caller
// that has no item dictionary to hand (the print sheet, the read-only view) simply gets none.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {RosterEntry[] | null | undefined} units
 * @param {string | null | undefined} excludeUid
 * @param {DefOf} defOf
 * @param {Detachment[] | null | undefined} [detachments]
 * @param {Record<number, string> | null} [items]
 */
export function leaderTargetsFor(def, units, excludeUid, defOf, detachments = [], items = null) {
  const entry = (units || []).find((u) => u.uid === excludeUid)
  const army = defOf ? armySidsOf(units, defOf) : null
  const leads = leadsFor(def, entry, detachments, army)
  if (!leads.length && !def?.leadKw?.length && !def?.joins) return []
  /** @param {string} id */
  const typeOf = (id) => leadTypeFor(def, entry, defOf ? defOf(id) : null, detachments, army)
  // Pactbound Zealots: only a unit sharing one of the keywords the attachment requires
  // (sharedKeywordClash). One that hasn't chosen its mark yet stays offered: marks are picked per
  // unit, in any order.
  return (units || [])
    .filter((u) => u.uid !== excludeUid && typeOf(u.id))
    // A joining unit joins a unit, not a character, and only one its rule's character leads.
    .filter((u) => !def?.joins || (!u.leaderOf && joinLedBy(def, u, units, defOf, excludeUid)))
    .filter((u) => !defOf || !sharedKeywordClash(def, entry, defOf(u.id), u, detachments, army))
    .map((u) => {
      const type = typeOf(u.id)
      const attached = (units || [])
        .filter((o) => o.uid !== excludeUid && o.uid !== u.uid && o.leaderOf === u.uid)
        .map((o) => ({ entry: o, def: defOf(o.id) }))
      const used = hostSlotTaken(def, entry, u, defOf(u.id), attached, detachments, army)
      const tDef = defOf(u.id)
      // Everything that can tell two copies of one datasheet apart, as FACTS — the caller builds
      // the sentence, because this module knows no locale. A list holds "Necron Warriors" twice
      // far more often than not, and a picker that offers the same three words twice makes the
      // player guess (a player's report, 2026-09-23).
      return {
        uid: u.uid,
        name: tDef?.name || u.id,
        used,
        type,
        blockName: u.blockName || '',
        // Only where the bracket can hold more than one: "1 model" distinguishes nothing.
        models: shownModelCount(tDef, u),
        enh: u.enh || mandatoryEnhancementFor(tDef, detachments)?.name || '',
        alleg: u.alleg || '',
        note: u.note || '',
        warlord: !!u.warlord,
        // What its own player picked — never the default loadout, which is identical on every
        // copy of a datasheet and would separate nothing.
        picks: items ? wargearNames(tDef, u, items) : [],
        // Who is on it already — the one fact that is about the BLOCK rather than the squad.
        with: attached.map((a) => a.def?.name).filter(Boolean),
      }
    })
}

// The same attachment seen from the other end: which entries of the list could be attached to
// THIS one (a player's request, 2026-09-24 — "attach heroes to squads, and squads to heroes").
// Asked of each candidate through leaderTargetsFor itself, so the two directions cannot disagree
// about who may join whom, a full Leader slot, a Mark of Chaos or an enhancement-granted target.
// `used` — the slot this candidate would take is held by someone else; `elsewhere` — the uid it is
// attached to now, if not here (ticking it here moves it, which the caller says).
/**
 * @param {string} targetUid
 * @param {RosterEntry[] | null | undefined} units
 * @param {DefOf} defOf
 * @param {Detachment[] | null | undefined} [detachments]
 */
export function leaderSourcesFor(targetUid, units, defOf, detachments = []) {
  const out = []
  for (const u of units || []) {
    if (u.uid === targetUid) continue
    const def = defOf(u.id)
    if (!def) continue
    const t = leaderTargetsFor(def, units, u.uid, defOf, detachments).find((x) => x.uid === targetUid)
    if (!t) continue
    const here = u.leaderOf === targetUid
    out.push({
      uid: u.uid,
      name: def.name,
      type: t.type,
      used: t.used && !here,
      elsewhere: !here && u.leaderOf ? u.leaderOf : null,
      warlord: !!u.warlord,
      enh: u.enh || '',
      blockName: u.blockName || '',
      note: u.note || '',
    })
  }
  return out
}

// Who COULD lead this entry, asked of the whole catalogue instead of the list (a player's ask,
// 2026-10-06 — "I add Intercessors and want to know who can lead them"). leaderSourcesFor only
// knows the entries already in the list, so until a Character was added the squad's end of the
// attachment said nothing at all.
// **Named attachments only** (owner's call, 2026-10-06): a candidate must list THIS unit in its own
// `leads` (leadsFor — the datasheet's table, a mirrored link, a mandatory enhancement's grant, all
// detachment-gated), the way a Captain names "Assault Intercessor Squad". A keyword group
// (`leadKw` — an Inquisitor's "any IMPERIUM BATTLELINE INFANTRY unit") does NOT put a character
// here: it read as "this Inquisitor's sheet says he leads Assault Intercessors", which the sheet
// nowhere says by name. Narrower than leadTypeFor on purpose — the Character's own "Attach to
// unit" picker and validateRoster still accept a keyword attachment, so one made from that end
// is still legal; this list just does not suggest it.
// `catalogue` — the datasheets the army may take right now (the caller drops what its Detachments
// lock, as the catalogue does). A datasheet the list holds a FREE copy of (attached to nobody) is
// left out: that copy is leaderSourcesFor's, one section up, and attaches without a new purchase.
// One whose every copy already leads another unit stays: a Lieutenant with squad A is offered to
// squad B as a second Lieutenant, not only as "move him here" (the caller's duplicate cap decides
// whether a second copy is legal).
// `used` — this unit's slot of that type is already held, so a new one could not be attached.
// Not covered: an attachment only an OPTIONAL enhancement grants (Abhuman Detail) — the bearer
// does not have it yet, and whether it may take it is a question about that entry.
/**
 * @param {string} targetUid
 * @param {RosterEntry[] | null | undefined} units
 * @param {RosterUnit[] | null | undefined} catalogue
 * @param {DefOf} defOf
 * @param {Detachment[] | null | undefined} [detachments]
 */
export function leaderCandidatesFor(targetUid, units, catalogue, defOf, detachments = []) {
  const target = (units || []).find((u) => u.uid === targetUid)
  const targetDef = target && defOf(target.id)
  if (!targetDef) return []
  const army = armySidsOf(units, defOf)
  const freeInList = new Set((units || []).filter((u) => u.uid !== targetUid && !u.leaderOf).map((u) => u.id))
  const attached = (units || [])
    .filter((o) => o.uid !== targetUid && o.leaderOf === targetUid)
    .map((o) => ({ entry: o, def: defOf(o.id) }))
  const out = []
  for (const def of catalogue || []) {
    if (!def || def.id === targetDef.id || freeInList.has(def.id)) continue
    const type = leadTo(leadsFor(def, null, detachments, army), targetDef.id)?.type
    if (!type) continue
    out.push({
      id: def.id,
      name: def.name,
      type,
      pts: unitBasePoints(def, defaultSizeIndex(def)),
      used: hostSlotTaken(def, null, target, targetDef, attached, detachments, army),
      // For the caller's "Hide Legends units" (useRosterPrefs) — a reader preference, not a rule.
      legends: !!def.flags?.legends,
    })
  }
  return orderedByName(out, (c) => c.name)
}

// The same question from the Character's end (owner, 2026-10-08): which units from the catalogue
// this Character could lead, that the list cannot give it yet. Named attachments only, as above —
// read with the ENTRY, so an enhancement already picked counts (Murdermind's Destroyer squads).
// A datasheet the list holds a copy of that this Character could join right now is left out: that
// copy is in "Attach to unit" (leaderTargetsFor), and joins without a new purchase. One whose every
// copy is taken stays — a second squad is the answer. A new unit is empty, so nothing is `used`.
/**
 * @param {string} leaderUid
 * @param {RosterEntry[] | null | undefined} units
 * @param {RosterUnit[] | null | undefined} catalogue
 * @param {DefOf} defOf
 * @param {Detachment[] | null | undefined} [detachments]
 */
export function leaderHostsFor(leaderUid, units, catalogue, defOf, detachments = []) {
  const entry = (units || []).find((u) => u.uid === leaderUid)
  const def = entry && defOf(entry.id)
  if (!def) return []
  const leads = leadsFor(def, entry, detachments, armySidsOf(units, defOf))
  if (!leads.length) return []
  const joinable = new Set(leaderTargetsFor(def, units, leaderUid, defOf, detachments)
    .filter((t) => !t.used).map((t) => (units || []).find((u) => u.uid === t.uid)?.id))
  const out = []
  for (const host of catalogue || []) {
    const type = host && leadTo(leads, host.id)?.type
    if (!type || joinable.has(host.id)) continue
    out.push({
      id: host.id,
      name: host.name,
      type,
      pts: unitBasePoints(host, defaultSizeIndex(host)),
      legends: !!host.flags?.legends,
    })
  }
  return orderedByName(out, (c) => c.name)
}

// Attach targets an ENHANCEMENT grants its bearer — a Cryptek with Murdermind gains DESTROYER
// CULT and with it the Destroyer squads, a Commissar with Abhuman Detail can join Ogryns. From
// appdata's enhancement_bodyguard_group, emitted by gen-roster-data.mjs as `attach` in the same
// `{ to, type }` shape a datasheet's own `leads` uses. Covers a mandatory enhancement too, since
// the bearer carries that whether or not `entry.enh` was ever set.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {Detachment[] | null | undefined} detachments
 * @returns {Array<{ to: string, type: 'leader' | 'support' }>}
 */
export function enhAttachOf(def, entry, detachments) {
  const e = entry?.enh ? findEnhancement(detachments, entry.enh, entry.enhDet) : mandatoryEnhancementFor(def, detachments)
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
//
// …and one appdata ties to another datasheet in the army — `reqDs`/`exclDs`, datasheet uuids (Cato
// Sicarius: Victrix Honour Guard's Support with Marneus Calgar in the army, its Leader without).
// `armySids` are the sids of the units in the list; a caller without the list in hand passes none,
// and reads the army as holding neither — Sicarius a Leader, as he is in most lists.
/**
 * @template {{ to: string, type: string, reqDet?: string, exclDet?: string, reqDs?: string[], exclDs?: string[] }} L
 * @param {L[]} leads
 * @param {Detachment[] | null | undefined} detachments
 * @param {Set<string> | null} [armySids]
 * @returns {L[]}
 */
function gatedLeads(leads, detachments, armySids = null) {
  if (!leads.some((l) => l.reqDet || l.exclDet || l.reqDs || l.exclDs)) return leads
  const sids = new Set((detachments || []).map((d) => d?.sid).filter(Boolean))
  const seen = new Set()
  return leads.filter((l) => {
    if (l.reqDet && !sids.has(l.reqDet)) return false
    if (l.exclDet && sids.has(l.exclDet)) return false
    if (l.reqDs && !l.reqDs.some((x) => armySids?.has(x))) return false
    if (l.exclDs && l.exclDs.some((x) => armySids?.has(x))) return false
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
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {Detachment[] | null | undefined} detachments
 * @param {Set<string> | null} [armySids] the sids of the list's units — see gatedLeads
 * @returns {LeadLink[]}
 */
export function leadsFor(def, entry, detachments, armySids = null) {
  const own = gatedLeads(def?.leads || [], detachments, armySids)
  const extra = enhAttachOf(def, entry, detachments)
  if (!extra.length) return own
  const seen = new Set(own.map((l) => l.to))
  return [...own, ...extra.filter((l) => !seen.has(l.to))]
}

// The sids of the units in a list, for the attachments that depend on who else is in it.
/**
 * @param {Array<{ id: string }> | null | undefined} units
 * @param {(id: string) => RosterUnit | null | undefined} defOf
 * @returns {Set<string>}
 */
export function armySidsOf(units, defOf) {
  return new Set((units || []).map((u) => defOf(u.id)?.sid).filter(/** @returns {x is string} */ (x) => !!x))
}

// The lead in `leads` that names the unit `id`. A lead names a datasheet by its id in its own
// bundle, bare; an ALLIED unit in the list carries its source's prefix
// (`deathwatch:deathwatch-terminator-squad`), so the exact match missed every attachment a
// datasheet names to an ally — an Ancient in Terminator Armour to Deathwatch Terminators in a
// Space Marines list with Deathwatch Support, 161 such pairs in six factions (a player's report,
// 2026-10-13). An allied LEADER's leads are namespaced the same way (data/roster/index.js), so the
// other direction missed too: an Imperial Agents Inquisitor and the Sororitas' own Sanctifiers. The
// same datasheet under the same id is the same unit, whichever bundle it came from; an exact match
// still wins. Every reader of a lead's target goes through here.
/** @param {string} id */
const bareUnitId = (id) => allySourceOf(id)?.[1] ?? id
/**
 * @param {LeadLink[]} leads
 * @param {string | null | undefined} id
 * @returns {LeadLink | undefined}
 */
export function leadTo(leads, id) {
  if (!id) return undefined
  const bare = bareUnitId(id)
  return leads.find((l) => l.to === id) || leads.find((l) => bareUnitId(l.to) === bare)
}

// Points added by a unit's enhancement: its chosen one (entry.enh), or — absent a choice — a
// mandatory one it's automatically stuck with regardless of entry.enh (`def` is only needed for
// that fallback; existing callers that never pass it just skip the mandatory check).
/**
 * @param {Detachment[] | null | undefined} detachments
 * @param {EntryLike | null | undefined} entry
 * @param {RosterUnit | null | undefined} [def]
 * @returns {number}
 */
export function enhancementPoints(detachments, entry, def) {
  if (entry?.enh) return findEnhancement(detachments, entry.enh, entry.enhDet)?.pts || 0
  return mandatoryEnhancementFor(def, detachments)?.pts || 0
}

// Full points for one unit entry: base bracket (+ copy tax), the loadout it comes with, the wargear
// picked on top of it, and its enhancement (chosen or mandatory).
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} [copyIndex]
 * @param {Detachment[] | null | undefined} [detachments]
 * @returns {number}
 */
export function unitPoints(def, entry, copyIndex = 1, detachments = null) {
  return unitBasePoints(def, entry?.size ?? 0, copyIndex)
    + defaultWargearPoints(def, entry)
    + unitWargearPoints(def, entry)
    + enhancementPoints(detachments, entry, def)
}

// ── Adding and removing a unit entry ──────────────────────────────────────────────────────────
// Pure array surgery on a roster's `units`, shared by every screen that can do it: the editor and
// the add-units page (through useRosterEditing) and the creation wizard. Kept here rather than
// copied per screen because the removal has a second half that is easy to forget — the wizard's own
// copy did forget it, and left a Leader attached to a unit that had already left the roster.
//
// `newUid` is passed in rather than generated: this module stays free of the store (uid() lives in
// useRosters.js) and of anything that isn't a pure function of its arguments.
/**
 * @param {RosterEntry[] | null | undefined} units
 * @param {RosterUnit | null | undefined} def
 * @param {string} unitId
 * @param {string} newUid
 * @returns {RosterEntry | null}
 */
export function addUnitEntry(units, def, unitId, newUid) {
  if (!units || !def) return null
  const entry = { uid: newUid, id: unitId, size: defaultSizeIndex(def) }
  units.push(entry)
  return entry
}

// Removes one entry and hands back everything putting it BACK would need: the entry itself, the
// place it stood in, and the attachments that broke because it left. A list is twenty minutes of
// picking options and one mis-tap on a trash icon, and the editor's only way back was Cancel —
// which throws away the whole session, not the tap (a player's ask, 2026-09-23). A ticket is
// plain data, so the screen holding one across a snackbar's lifetime holds no live references
// into the roster; `ticket.uid` is also what a caller holding per-entry UI state (an open
// accordion) drops.
/**
 * @param {RosterEntry[] | null | undefined} units
 * @param {string | null | undefined} unitId
 * @param {string | null} [entryUid]
 * @returns {RemovalTicket | null}
 */
export function takeUnitEntry(units, unitId, entryUid = null) {
  if (!units) return null
  for (let i = units.length - 1; i >= 0; i--) {
    // The editor removes ONE named line, which is a different thing from "a copy of this
    // datasheet" as soon as the roster holds two of the same unit configured differently.
    // `entryUid` is what tells the two apart.
    if (entryUid ? units[i].uid !== entryUid : units[i].id !== unitId) continue
    const [removed] = units.splice(i, 1)
    // A leader attached to the unit that just left would otherwise point at nothing.
    const detached = []
    for (const u of units) if (u.leaderOf === removed.uid) { detached.push(u.uid); delete u.leaderOf }
    return { uid: removed.uid, entry: removed, at: i, detached }
  }
  return null
}

// Undo of the above. The entry goes back where it stood — an army list is read in its own order,
// and a restored unit landing at the end is a different list from the one that was there a second
// ago — and every leader that had to let go of it takes hold again. A uid that is somehow back in
// the list already (two undos of one removal) restores nothing rather than duplicating it.
/**
 * @param {RosterEntry[] | null | undefined} units
 * @param {RemovalTicket | null | undefined} ticket
 * @returns {string | null}
 */
export function restoreUnitEntry(units, ticket) {
  if (!units || !ticket?.entry) return null
  if (units.some((u) => u.uid === ticket.uid)) return null
  units.splice(Math.min(ticket.at ?? units.length, units.length), 0, ticket.entry)
  for (const uid of ticket.detached || []) {
    const u = units.find((x) => x.uid === uid)
    if (u) u.leaderOf = ticket.uid
  }
  return ticket.uid
}

// "This model must be your WARLORD" (SUPREME COMMANDER) — but not for an ally: every cross-faction
// allied rule says "None of these models can be your WARLORD", and the allied rule wins (owner,
// 2026-10-13). Be'lakor, a Daemonic Pact ally of Chaos Space Marines and Chaos Knights, is the case
// today: the builder seated him as Warlord and the list was illegal whichever way it was set. Read
// by settleSupremeWarlord and validateRoster's supremeCommander checks alike.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {string} id
 * @returns {boolean}
 */
export function mustBeWarlord(def, id) {
  return !!def?.flags?.supreme && !allySourceOf(id)
}

// SUPREME COMMANDER ("if this model is in your army, it must be your Warlord"): the builder hands
// such a unit the title itself, but only into an EMPTY seat. A Warlord the player picked is never
// taken away silently — with a non-SUPREME Warlord standing, validateRoster's error says what is
// wrong and the player decides. Several SUPREME units may share an army (the Muster step: "select
// one of them"), so a second one arriving changes nothing, and when the one wearing the title
// leaves, the seat passes to the next. `preferUid` is the unit that just arrived; otherwise the
// first in list order. Returns the uid made Warlord, or null.
/**
 * @param {RosterEntry[] | null | undefined} units
 * @param {DefOf} defOf
 * @param {string | null} [preferUid]
 * @returns {string | null}
 */
export function settleSupremeWarlord(units, defOf, preferUid = null) {
  if (!units?.length || units.some((u) => u.warlord)) return null
  const supreme = units.filter((u) => mustBeWarlord(defOf(u.id), u.id))
  if (!supreme.length) return null
  const pick = supreme.find((u) => u.uid === preferUid) || supreme[0]
  pick.warlord = true
  return pick.uid
}

// A second copy of an entry the player has already configured. Adding the same datasheet again
// gives a bare entry (addUnitEntry above) and every wargear pick has to be made a second time,
// which is what a list holding two identical squads costs today.
//
// Three fields are deliberately NOT copied, because each is unique per ARMY and a copy carrying
// one is born illegal: `warlord` (one per army, rule 25), `enh` (an Enhancement is taken once —
// a MANDATORY one isn't stored on the entry at all, `mandatoryEnhancementFor` derives it, so it
// survives on the copy by itself), and `leaderOf` (the host's slot is filled by the entry we are
// copying). Everything else — size, model count, wargear picks, allegiance — is the point of the
// exercise and is cloned as it stands.
//
// The copy lands directly after its original rather than at the end of the list: the two are read
// as a pair, and the copy tax (`entryMeta`'s copyIndex, assigned in list order) then falls on the
// second one, which is the one that just appeared.
/**
 * @param {RosterEntry[] | null | undefined} units
 * @param {string} entryUid
 * @param {string} newUid
 * @returns {RosterEntry | null}
 */
export function duplicateUnitEntry(units, entryUid, newUid) {
  if (!units) return null
  const at = units.findIndex((u) => u.uid === entryUid)
  if (at < 0) return null
  const copy = JSON.parse(JSON.stringify(units[at]))
  copy.uid = newUid
  delete copy.warlord
  delete copy.enh
  delete copy.leaderOf
  units.splice(at + 1, 0, copy)
  return copy
}

// A one-line summary of an entry's current size/upgrades/enhancement for its list row (the
// read-only view's). Every noun is passed in (not imported) so this stays a pure, Vue-free
// module; callers pass their current locale's
// `rosterModelsLabel`/`rosterUpgradesLabel`/`rosterWarlord`.
//
// The Warlord used to be a bare '★' here. The star now means "I own this model" elsewhere in the
// app (useCollection.js), and a lone symbol on its own line was never decodable anyway — the word
// is both unambiguous and free of the glyph-coverage roulette a flag character would bring.
/**
 * @param {EntryLike} e
 * @param {RosterUnit | null | undefined} def
 * @param {string | ((n: number) => string)} modelsLabel
 * @param {string | ((n: number) => string)} upgradesLabel
 * @param {string} [warlordLabel]
 * @returns {string}
 */
export function entrySummary(e, def, modelsLabel, upgradesLabel, warlordLabel = '') {
  const size = sizeOf(def, e)
  if (!def || !size) return ''
  const n = modelCount(def, e)
  const parts = []
  if (e.warlord && warlordLabel) parts.push(warlordLabel)
  // A label may be a function of the count (the caller's plural forms: «2 улучшения», not «2 улучшений»).
  /** @param {number} k @param {string | ((n: number) => string)} l */
  const count = (k, l) => (typeof l === 'function' ? l(k) : `${k} ${l}`)
  if (size.per[1] > 1) parts.push(count(n, modelsLabel))
  if (e.wg?.length) parts.push(count(e.wg.length, upgradesLabel))
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
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {Map<number, number> | null}
 */
export function modelsPerMini(def, entry) {
  const size = sizeOf(def, entry)
  if (!size) return null
  const total = modelCount(def, entry)
  if ((def?.minis?.length ?? 0) <= 1) return new Map([[0, total]])
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

// Which profiles print an item in their default loadout, and how many of their models carry it,
// biggest first — the capacity a swap is spent against. A `total` quantity belongs to the PROFILE
// rather than to each of its models (two of four Havocs carry the autocannon, seven of nine Navis
// Armsmen the shotgun), one copy per model that holds it, so its capacity is that count. It used to
// be no capacity at all, a line no swap reached: the Breachers' armsmen traded their shotguns and
// kept all seven (2026-10-03, found with the Havocs report).
/**
 * @param {RosterUnit | null | undefined} def
 * @param {Map<number, number> | null | undefined} perMini
 * @param {ItemId} id
 * @returns {Array<[number, number]>} profile → the models carrying it
 */
function swapCarriers(def, perMini, id) {
  /** @type {Array<[number, number]>} */
  const out = []
  for (const [m, list] of def?.defaults || []) {
    const models = perMini?.get(m)
    if (!models) continue
    const row = list.find(([i]) => i === id)
    if (row) out.push([m, row[2] ? Math.min(row[1], models) : models])
  }
  return out.sort((a, b) => b[1] - a[1])
}

// What a default line still holds after `take` models of its profile gave the item up — the one
// reading of the loadout behind the editor's line, the export and the modifier overlay. A `total`
// line loses one copy per model; a per-model line `c` per model (copiesLeft). A profile whose model
// count is unknown keeps everything — never hide a weapon on a guess.
/**
 * @param {number} c
 * @param {number | undefined} total
 * @param {number | null | undefined} models
 * @param {number} take
 * @returns {number}
 */
export function copiesHeld(c, total, models, take) {
  if (!take || models == null) return c
  return total ? Math.max(0, c - take) : copiesLeft(c, models, take)
}

// How much of a MODEL one pick in group `g` takes of item `id` — 1 for an ordinary swap, where the
// model gives the item up outright. A model can carry several copies of a weapon and give up only
// some of them: "Each of this model's shuriken catapults can be replaced with 1 flamer" (`cp`: a
// pick is one copy of the two) and "2 of this model's heavy bolters can be replaced with 2
// lascannons" (`rc`: a pick is two copies of the Malcador's seven). Until 2026-09-30 every pick
// took the whole model, so one flamer on a Wraithlord took BOTH catapults off its card and list.
// Charged as a share of a model, so the ledger stays in models and its readers turn it back into
// copies as `c × (models − take)`; `null` count or a `total` row → 1, never a guess.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {GearGroup | null | undefined} g
 * @param {ItemId} id
 * @returns {number}
 */
function pickShare(def, g, id) {
  if (!g?.cp && !g?.rc) return 1
  const row = def?.defaults?.find(([m]) => m === (g.m ?? 0))?.[1] || []
  const c = row.find(([i, , total]) => i === id && !total)?.[1]
  if (!c || c <= 1) return 1
  return Math.min(1, (g.cp ? 1 : g.rc || 1) / c)
}

// The copies of a per-model item `c` that `models` models still hold after `take` (a share of a
// model, see pickShare) went — rounded, since a share of 1/3 summed three times is not always 1.
/**
 * @param {number} c
 * @param {number} models
 * @param {number} take
 * @returns {number}
 */
export function copiesLeft(c, models, take) {
  return Math.max(0, Math.round(c * (models - take) * 1e6) / 1e6)
}

// Models that gave an item up, keyed `${miniIndex}:${itemId}` — the shared half of
// defaultLoadoutLines() and rosterModifiers' loadoutItemIds(), which used to carry a copy each.
//
// A UNIT-WIDE group (`all`, folded by the generator from the copy appdata records once per
// miniature profile) is scoped to the whole squad, exactly as wargearGroupLive and
// defaultWargearPoints already scope it. Until 2026-08-28 it was skipped instead, for want of a
// profile to charge — so on the 44 datasheets whose swaps are all of that kind (Chosen, every
// Terminator squad, Nobz, Scouts, Bullgryns…) a swap ADDED the new weapon and never took the old
// one away: five accursed weapons and a power fist on a five-model squad, in the editor's loadout
// block, on the card's weapon table and in the exported list alike.
//
// WHICH profile gave it up is the one thing the data cannot say — all 105 replaced items in those
// groups are carried by BOTH profiles (which is why appdata wrote the bullet twice and the
// generator folded it). The unit TOTAL is exact either way, and that is what the weapon table
// counts; the per-profile split is a display convention, and it is the biggest profile first,
// spilling into the next once one is spent: that is where a "for every 5 models" bullet is nearly
// always taken, and it cannot empty a one-model champion's line on the first tick. Per-profile
// groups are charged FIRST so a profile's own swaps claim its models before a unit-wide one does,
// and nothing is ever charged past what a profile actually fields.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {Map<number, number> | null} perMini
 * @returns {Map<string, number>}
 */
export function swapsByMini(def, entry, perMini) {
  return swapLedger(def, entry, perMini).removed
}

// The ledger behind swapsByMini and the stock rule below: what every live swap took, and what it
// asked for that the unit did not have. `exceptGi` leaves one group's own picks out, which is how
// swapRoom asks "what is left for THIS group" without counting the group against itself.
//
// Picks are summed PER GROUP before they are capped by the models in scope, not one by one. A
// group is one allowance over one set of models — the Devastator Sergeant's "bolt pistol and
// boltgun can be replaced with two different weapons" is two rows on one model — and reading each
// row as a model of its own would have that one Sergeant give his bolt pistol up twice. Two
// DIFFERENT groups are two allowances, and they add up: that is exactly the double spend the
// overdraft reports (a Chaos Lord who swaps his bolt pistol for a plasma pistol AND, together with
// his accursed weapon, for twin lightning claws).
//
// `removed` is GROSS — every model that took a swap gave up everything the group replaces — because
// its readers (defaultLoadoutLines, the modifier overlay, the export) add what the option grants
// on top. `back` is the part of that the chosen option handed straight back: Deathwatch Veterans
// trade "boltgun and power weapon" for "power weapon and Astartes shield", and the Watch Sergeant
// who did so still holds a power weapon to swap for a xenophase blade — the GW app builds him that
// way, and so did 13 lists in the import corpus.
//
// `held` is the opposite footnote: "(that model's boltgun cannot be replaced)" — `g.keep`. The
// model keeps the item, so the loadout line must not lose it, but no other group may take it
// either: the Battle Sister carrying the simulacrum has no boltgun left to trade, and the
// Terminator who took "cyclone missile launcher and 1 storm bolter" got his storm bolter back
// locked. A kept item the option hands back is therefore never `back`, and a kept item the group
// does not replace at all is `held`. Stock is the NET: removed less back, plus held.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {Map<number, number> | null} perMini
 * @param {number | null} [exceptGi]
 */
function swapLedger(def, entry, perMini, exceptGi = null) {
  /** @type {Map<string, number>} `${profile}:${item}` → models */
  const removed = new Map()
  /** @type {Map<string, number>} */
  const back = new Map()
  /** @type {Map<string, number>} */
  const held = new Map()
  /** @type {Map<string, number>} `${profile}:${item}` → copies the profile's own picks handed out */
  const granted = new Map()
  /** @type {Array<{ id: ItemId, used: number, cap: number }>} */
  const over = []
  if (!perMini) return { removed, back, held, granted, over }
  /** @param {Map<string, number>} map @param {string} key @param {number} n */
  const bump = (map, key, n) => map.set(key, (map.get(key) || 0) + n)
  /** @param {string} key */
  const net = (key) => (removed.get(key) || 0) - (back.get(key) || 0) + (held.get(key) || 0)
  // gi → item id → [models asked, models whose option hands it back, kept-not-replaced]
  /** @type {Map<number, Map<ItemId, [number, number, boolean]>>} */
  const asked = new Map()
  // `${m}:${id}` → models already asked for it, so an "X or Y" group (`alt`) spends its picks where
  // a model still carries one: every model gives up ONE of the two, whichever it holds. Which model
  // that is the data cannot say, so the picks fill the items in order — the ones the option does not
  // hand straight back first (a Havoc picking an autocannon is a lascannon Havoc changing weapons),
  // each up to the models carrying it — and whatever is left past the stock goes on the last, where
  // the overdraft below reports it.
  /** @type {Map<string, number>} */
  const spent = new Map()
  /**
   * @param {GearGroup} g
   * @param {Set<ItemId>} grants
   * @param {number} models
   * @returns {Array<[ItemId, number]>}
   */
  const altSplit = (g, grants, models) => {
    const m = g.m ?? 0
    // A set the option hands straight back goes last: a Havoc picking an autocannon is a lascannon
    // Havoc changing weapons. A set's room is its scarcest item — printed or handed out by the
    // profile's own picks (`granted`), less what earlier picks already took.
    const sets = [...(altSets(g) || [])].sort((a, b) => Number(a.every((id) => grants.has(id))) - Number(b.every((id) => grants.has(id))))
    let left = Number.isFinite(models) ? models : perMini.get(m) || 0
    /** @type {Array<[ItemId, number]>} */
    const out = []
    sets.forEach((set, i) => {
      const room = Math.min(...set.map((id) => {
        const printed = swapCarriers(def, perMini, id).find(([cm]) => cm === m)?.[1] || 0
        return Math.max(0, printed + (granted.get(`${m}:${id}`) || 0) - (spent.get(`${m}:${id}`) || 0))
      }))
      const take = i === sets.length - 1 ? left : Math.min(left, room)
      if (take > 0) for (const id of set) out.push([id, take])
      left -= take
    })
    return out
  }
  // What the profile's own picks HAND OUT is stock too: an item it was not printed with can still
  // be given up once a pick gave it one — the Acothyst's torturer's tool comes with his hexrifle, a
  // Desolation Sergeant's superkrak launcher with his squad's swap. Counted per profile, models
  // that took the pick (a stepper's count, a checkbox one model, `repall` the profile).
  for (const [gi, oi, n] of entry?.wg || []) {
    if (gi === exceptGi) continue
    const g = def?.gear?.[gi]
    if (!g || g.all || !wargearGroupLive(def, entry, gi)) continue
    const m = g.m ?? 0
    const models = g.in === 'stepper' ? n || 1 : g.repall ? perMini.get(m) ?? 1 : 1
    // An item the group itself replaces and the option hands straight back is `back` below, not this.
    for (const [id, c] of optionItems(g.o?.[oi])) if (!g.rep?.includes(id)) bump(granted, `${m}:${id}`, models * (c || 1))
  }
  for (const [gi, oi, n] of entry?.wg || []) {
    if (gi === exceptGi) continue
    const g = def?.gear?.[gi]
    if (!(g?.rep?.length || g?.keep?.length) || !wargearGroupLive(def, entry, gi)) continue
    // A stepper carries the model count, a checkbox is one model unless its instruction hands the
    // swap to the whole profile (`repall`) — Infinity here, the scope cap below makes it "all".
    const models = g.in === 'stepper' ? n || 1 : g.repall ? Infinity : 1
    const grants = new Set(optionItems(g.o?.[oi]).map(([id]) => id))
    const keep = new Set(g.keep || [])
    let byItem = asked.get(gi)
    if (!byItem) asked.set(gi, (byItem = new Map()))
    /** @param {ItemId} id @param {number} share */
    const ask = (id, share) => {
      const cur = byItem.get(id) || [0, 0, false]
      byItem.set(id, [cur[0] + share, cur[1] + (grants.has(id) && !keep.has(id) ? share : 0), false])
      if (!g.all) bump(spent, `${g.m ?? 0}:${id}`, share)
    }
    if (g.alt) altSplit(g, grants, models).forEach(([id, share]) => ask(id, share))
    else for (const id of g.rep || []) ask(id, models * pickShare(def, g, id))
    for (const id of keep) {
      if (g.rep?.includes(id)) continue
      const cur = byItem.get(id) || [0, 0, true]
      byItem.set(id, [cur[0] + models, 0, true])
    }
  }
  /** @type {Array<[GearGroup, Map<ItemId, [number, number, boolean]>]>} */
  const unitWide = []
  for (const [gi, byItem] of asked) {
    const g = def?.gear?.[gi]
    if (!g) continue
    if (g.all) { unitWide.push([g, byItem]); continue }
    const m = g.m ?? 0
    const models = perMini.get(m)
    if (models == null) continue
    for (const [id, [n, b, h]] of byItem) {
      const consumed = Math.min(n, models)
      if (h) { bump(held, `${m}:${id}`, consumed); continue }
      bump(removed, `${m}:${id}`, consumed)
      bump(back, `${m}:${id}`, Math.min(b, consumed))
    }
  }
  // Per-profile overdraft: more models of a profile gave an item up than carry it — the ones
  // printed with it, plus what the profile's own picks handed out. An item neither names (a chained
  // swap with its first link not taken: the Acothyst's "its torturer's tool can be replaced…" with
  // no special weapon on him) has a stock of nothing, and giving it up is the overdraft. Until
  // 2026-10-14 only PRINTED items were counted, and such a pick passed (the Wracks report).
  for (const key of new Set([...removed.keys(), ...held.keys()])) {
    const [m, id] = key.split(':').map(Number)
    const printed = swapCarriers(def, perMini, id).find(([cm]) => cm === m)?.[1] || 0
    const cap = printed + (granted.get(key) || 0)
    if (net(key) > cap + 1e-9) over.push({ id, used: net(key), cap })
  }
  if (!unitWide.length) return { removed, back, held, granted, over }
  const unitModels = modelCount(def, entry)
  // Unit-wide overdraft is summed per ITEM across groups: two groups that each overdraw the same
  // combi-bolter are one problem with one count, not two lines that each undercount it.
  const overWide = new Map() // item id → [models no carrier could absorb, the unit's stock]
  for (const [g, byItem] of unitWide) {
    for (const [id, [n, b, h]] of byItem) {
      // A unit-wide group has no profile to cap it, and until 2026-09-24 this line capped it at the
      // unit instead — so eight combi-weapons inherited by five Terminators (a ten-model squad
      // shrunk) spent five combi-bolters and reported nothing. The picks are counted as asked, and
      // what no carrier absorbs is the overdraft below. Only the unbounded cases are clipped: a
      // `repall` tick (Infinity, "all models") and a per-copy count, whose unit is copies, not models.
      let left = Number.isFinite(n) && !g.cp ? n : Math.min(n, unitModels)
      let backLeft = Math.min(b, left)
      const carriers = swapCarriers(def, perMini, id)
      for (const [m, models] of carriers) {
        if (left <= 0) break
        const key = `${m}:${id}`
        // Room is what the profile still NETS: a model whose swap handed the item back is still
        // carrying it, so it is not a model the next swap has to look elsewhere for. But one group
        // swaps each model once: never more of a profile than it fields. Without that cap ten
        // Deathwatch Terminators all taking "storm bolter and chainfist" charged ten swaps to the
        // nine Terminators and none to the Sergeant, who kept his power fist (a player, 2026-10-08).
        const room = Math.min(models, models - net(key) + Math.min(backLeft, left))
        if (room <= 0) continue
        const spend = Math.min(room, left)
        const returned = Math.min(backLeft, spend)
        bump(h ? held : removed, key, spend)
        bump(back, key, returned)
        left -= spend
        backLeft -= returned
      }
      // What no carrier could absorb is the unit-wide overdraft, against the whole unit's stock.
      if (left > 0 && carriers.length) {
        const cap = carriers.reduce((s, [, models]) => s + models, 0)
        overWide.set(id, [(overWide.get(id)?.[0] || 0) + left, cap])
      }
    }
  }
  for (const [id, [extra, cap]] of overWide) over.push({ id, used: cap + extra, cap })
  return { removed, back, held, granted, over }
}

// Groups of ONE profile that give up the same items, each held once per model of it — so they are
// one choice drawn as several groups: the Acothyst's own "twin torturer's tools → power weapon and
// torturer's tool" beside his copy of the squad's special weapons, a Battle Sister's boltgun offered
// for a special and for a heavy weapon. The editor shows each set as one block with one stock row
// (owner, 2026-10-14: the same "Twin torturer's tools" twice read as two different weapons). Picks
// stay in their own groups, and every rule counts them there. Not a set: a model carrying the item
// several times (a Kratos' heavy bolters, a Decimator's butcher cannons, a Talos' macro-scalpels —
// each group trades its own copy), an "X or Y" group, the unit's own group. Sets in data order.
/**
 * @param {RosterUnit | null | undefined} def
 * @returns {number[][]}
 */
export function sameStockSets(def) {
  const gear = def?.gear || []
  /** @type {Map<string, number[]>} */
  const byKey = new Map()
  gear.forEach((g, gi) => {
    if (g.all || g.alt || g.cp || g.rc || !g.rep?.length) return
    const row = def?.defaults?.find(([m]) => m === (g.m ?? 0))?.[1] || []
    if (g.rep.some((id) => { const r = row.find(([i]) => i === id); return r && !r[2] && r[1] > 1 })) return
    const key = `${g.m ?? 0}|${[...g.rep].sort((a, b) => a - b).join('+')}`
    byKey.set(key, [...(byKey.get(key) || []), gi])
  })
  return [...byKey.values()].filter((set) => set.length > 1)
}

// The alternatives of an "X or Y" group (`alt`), each a SET a pick gives up whole: one item each
// (a Havoc's autocannon or lascannon), or several (`alts` — a Yaegir's "bolt revolver and plasma
// knife, or bolt shotgun"). null for an ordinary swap.
/** @param {GearGroup | null | undefined} g @returns {ItemId[][] | null} */
export function altSets(g) {
  if (!g?.alt) return null
  return g.alts || (g.rep || []).map((id) => [id])
}

// The items one pick in group `g` actually takes off a model: what the group replaces, less what
// the option itself grants back. With no option named, everything the group replaces.
/**
 * @param {GearGroup} g
 * @param {number | null} [oi]
 * @returns {ItemId[]}
 */
function givenUp(g, oi = null) {
  const opt = oi == null ? null : g.o?.[oi]
  if (!opt) return g.rep || []
  const grants = new Set(optionItems(opt).map(([id]) => id))
  return (g.rep || []).filter((id) => !grants.has(id))
}

// What a pick NEEDS the model to still carry: everything it gives up, plus every item the group
// keeps locked (`keep` — "that model's boltgun cannot be replaced"), whether or not the option
// hands it back.
/**
 * @param {GearGroup} g
 * @param {number | null} [oi]
 * @returns {ItemId[]}
 */
function needs(g, oi = null) {
  return [...new Set([...givenUp(g, oi), ...(g.keep || [])])]
}

// The room left in an item, `models` (a share of a model where another group took one copy of
// several, see pickShare), in whole picks of a group whose pick takes `share` of a model. Every
// reader of swapRoom counts picks — the stepper's ceiling, the greyed group, the importer — and
// read as models a Talos that gave up one macro-scalpel of two had "1.5" left, which the stepper
// stored as 1.5 ichor injectors (a player's report, 2026-10-13). Rounded down, past the float dust
// of summed shares.
/** @param {number} models @param {number} share */
function picksIn(models, share) { return Math.floor(models / share + 1e-9) }

// THE STOCK RULE: a model cannot give the same item up twice. How many picks of group `gi` the
// models still carrying every item it would take allow — the group's own picks not counted, so the
// number is the room the group has left, whether it is untouched or already holds a pick. With `oi`, the room
// for that option (an option that hands an item back does not need it, unless the group keeps
// it). null where the data cannot say, and a null never closes anything: a group that neither
// replaces nor keeps anything, a per-copy group (`cp` — the Wraithlord swaps each of two flamers,
// and copies are not models), a unit whose models cannot be split between profiles
// (modelsPerMini), an item the profile's printed loadout does not carry, or an option that needs
// nothing at all.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @param {number | null} [oi]
 * @returns {number | null}
 */
export function swapRoom(def, entry, gi, oi = null) {
  const g = def?.gear?.[gi]
  const byItem = swapRoomByItem(def, entry, gi)
  if (!g || !byItem) return null
  // The needed items byItem tracks, each with the models still carrying it.
  /** @type {Array<[ItemId, number]>} */
  const rooms = []
  for (const id of needs(g, oi)) {
    const left = byItem.get(id)
    if (left != null) rooms.push([id, picksIn(left, g.rep?.includes(id) ? pickShare(def, g, id) : 1)])
  }
  if (!rooms.length) return null
  // An "X or Y" group needs a model carrying EITHER, so its alternatives are one pool — a set as
  // many times as its scarcest item.
  const rep = g.rep || []
  const sets = altSets(g)
  const roomOf = new Map(rooms)
  const alt = sets ? rooms.filter(([id]) => rep.includes(id)) : []
  const pool = sets && alt.length ? [sets.reduce((sum, set) => sum + Math.min(...set.map((id) => roomOf.get(id) ?? 0)), 0)] : []
  return Math.min(...pool, ...rooms.filter((r) => !alt.includes(r)).map(([, left]) => left))
}

// The same answer per needed item (item id → models still carrying it), so the editor can name
// the item that ran out rather than the whole set the group gives up. A kept item the profile does
// not print is left out rather than voiding the group — the footnote has nothing to lock there.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {Map<ItemId, number> | null}
 */
export function swapRoomByItem(def, entry, gi) {
  const g = def?.gear?.[gi]
  if (!(g?.rep?.length || g?.keep?.length) || g.cp) return null
  const perMini = modelsPerMini(def, entry)
  if (!perMini) return null
  const { removed, back, held, granted } = swapLedger(def, entry, perMini, gi)
  const out = new Map()
  for (const id of needs(g)) {
    const carriers = swapCarriers(def, perMini, id).filter(([m]) => g.all || m === (g.m ?? 0))
    // A profile's stock is what it was printed with plus what its own picks handed out (swapLedger).
    // An item it has from neither is room 0 — the group closes until a pick hands one over — for a
    // swap; a footnote's kept item the profile cannot hold has nothing to lock and is left out.
    if (!g.all && !carriers.some(([m]) => m === (g.m ?? 0))) carriers.push([g.m ?? 0, 0])
    /** @param {number} m @param {number} models */
    const left = (m, models) => models + (granted.get(`${m}:${id}`) || 0) - (removed.get(`${m}:${id}`) || 0) + (back.get(`${m}:${id}`) || 0) - (held.get(`${m}:${id}`) || 0)
    const room = carriers.reduce((s, [m, models]) => s + Math.max(0, left(m, models)), 0)
    if (!room && !g.rep?.includes(id) && !carriers.some(([, models]) => models)) continue
    out.set(id, room)
  }
  return out.size ? out : null
}

// Items a unit has given up more times than it carries them — `{ id, used, cap }` per item, for
// validateRoster. Empty for a legal list; the editor keeps the list legal as you click (swapRoom
// greys the group out), so this fires on a list that was built before the rule, was imported, or
// shrank under its swaps.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {Array<{ id: ItemId, used: number, cap: number }>}
 */
export function swapOverdraft(def, entry) {
  return swapLedger(def, entry, modelsPerMini(def, entry)).over
}

// The groups whose picks are part of an overdraft or over their own ceiling — the editor marks
// them in place, so the player sees WHERE to press "−" rather than only a line in the issues list.
// A group is over its stock when it holds more picks than the room the other groups left it
// (swapRoom, per picked option) and one of the items it needs is overdrawn.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {Set<number>}
 */
export function overdrawnGroups(def, entry) {
  const out = new Set()
  const over = new Set(swapOverdraft(def, entry).map((o) => o.id))
  for (const [gi, g] of (def?.gear || []).entries()) {
    if (!wargearGroupLive(def, entry, gi)) continue
    const spent = wargearGroupSpent(entry, gi)
    if (!spent) continue
    const cap = wargearGroupCap(def, entry, gi)
    const ceiling = cap ? cap.limit : wargearGroupFallbackCap(def, entry, gi)
    if (ceiling != null && spent > ceiling) { out.add(gi); continue }
    if (!over.size || !needs(g).some((id) => over.has(id))) continue
    const picked = (entry?.wg || []).filter(([pg]) => pg === gi).map(([, oi]) => oi)
    if (picked.some((oi) => { const room = swapRoom(def, entry, gi, oi); return room != null && spent > room })) out.add(gi)
  }
  return out
}

// A unit that SHRANK under its picks, made to fit again: the editor calls this when the player
// picks a smaller bracket or presses "−" on the model count (a player's report, 2026-09-24 — CSM
// Terminators dropped from ten to five kept seven combi-bolter swaps on five models). Returns a new
// `wg`, or null when nothing had to go. Most recent picks go first — `wg` is kept in the order the
// player last touched each row — one model at a time, until every group is inside its ceiling and
// nothing is given up twice. A list that arrives already over (an import, a list saved before the
// rule) is NOT passed through here: validateRoster reports it and the player decides.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @returns {WargearPick[] | null}
 */
export function fitWargear(def, entry) {
  /** @type {WargearPick[]} */
  let wg = (entry?.wg || []).map((p) => [...p])
  const at = () => ({ ...entry, wg })
  /** @param {number} i */
  const drop = (i) => {
    const n = wg[i][2] || 1
    if (n > 1) wg[i][2] = n - 1
    else wg.splice(i, 1)
  }
  const pm = def?.pm
  let changed = false
  for (let guard = 0; guard < 200; guard++) {
    const e = at()
    // Group ceilings first ("up to 2 per 5 models" at five is one): they name the group outright.
    let i = -1
    for (let k = wg.length - 1; k >= 0 && i < 0; k--) {
      const gi = wg[k][0]
      const cap = wargearGroupCap(def, e, gi, wg[k][1])
      const ceiling = cap ? cap.limit : wargearGroupFallbackCap(def, e, gi)
      if (ceiling != null && wargearGroupSpent(e, gi) > ceiling) i = k
      else if (cap?.dup && (wg[k][2] || 1) > cap.dup) i = k
      else if (wargearExclOver(def, e, gi).some((x) => x.set.includes(wg[k][1]))) i = k
      else if (wargearXpmOver(def, e).some((x) => x.set.s.some((p) => xpmHit(p, gi, wg[k][1])))) i = k
      // A shared allowance (`pools`): the latest pick in any of its copies.
      else if (wargearPoolOver(def, e).some((x) => x.pool.g.includes(gi) && (x.oi == null || x.oi === wg[k][1]))) i = k
    }
    // Then the rules about one model across groups (`pm`): the latest pick in either group they cover.
    if (i < 0 && pm && !perModelFits(def, e)) {
      for (let k = wg.length - 1; k >= 0 && i < 0; k--) if (pmGroups(pm.add).includes(wg[k][0]) || pmGroups(pm.base).includes(wg[k][0])) i = k
    }
    // Then stock: the latest pick that spends an overdrawn item.
    if (i < 0) {
      const over = new Set(swapOverdraft(def, e).map((o) => o.id))
      if (!over.size) break
      for (let k = wg.length - 1; k >= 0 && i < 0; k--) {
        const g = def?.gear?.[wg[k][0]]
        if (g && wargearGroupLive(def, e, wg[k][0]) && needs(g, wg[k][1]).some((id) => over.has(id))) i = k
      }
      if (i < 0) break
    }
    drop(i)
    changed = true
  }
  return changed ? wg : null
}

// The profile a pick is SHOWN under — `g.m` for an ordinary group, and for a unit-wide one the
// same profile swapsByMini charges first, so the two halves of one swap read together (the squad
// loses an accursed weapon and the squad gains the power fist, rather than the champion gaining it
// while the squad keeps all five). A unit-wide group that replaces nothing has nothing to pair
// with and stays on the first profile, as it always was.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {number}
 */
export function pickMiniFor(def, entry, gi) {
  const g = def?.gear?.[gi]
  if (!g?.all) return g?.m ?? 0
  if (!g.rep?.length) return 0
  const [first] = swapCarriers(def, modelsPerMini(def, entry), g.rep[0])
  return first ? first[0] : 0
}

// The stock items NO wargear group replaces — the editor's "Wargear that cannot be replaced".
// Printed as the datasheet prints them, and no pick ever changes it: everything a pick can touch
// is drawn in its own group, the stock weapon as a row with how many models still carry it
// (owner, 2026-10-07). A block above the groups that grew and shrank with every click moved the
// buttons under the player's finger. Only a size that fields none of a profile drops its line.
// "…replaced with two different weapons" (`ex`, from the generators): how many picks the group
// still owes, 0 when it is untouched or complete. One pick of a `solo` option ("either 1 twin
// lightning claws, or two different…") is complete on its own.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {number}
 */
export function exactPicksOwed(def, entry, gi) {
  const g = def?.gear?.[gi]
  if (!g?.ex) return 0
  const spent = wargearGroupSpent(entry, gi)
  if (!spent || spent >= g.ex) return 0
  const picked = (entry?.wg || []).filter(([x, , n]) => x === gi && (n ?? 1) > 0)
  if (picked.length === 1 && (picked[0][2] ?? 1) === 1 && g.solo?.includes(picked[0][1])) return 0
  return g.ex - spent
}

// The profile name a loadout line is headed with — blank when the datasheet has one profile, as
// there is nothing to tell apart. Shared by both loadout readers below and the export.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {number} m
 * @returns {string}
 */
export function miniName(def, m) {
  return (def?.minis?.length ?? 0) > 1 ? (def?.minis?.[m]?.n || '') : ''
}

/**
 * @param {RosterUnit | null | undefined} def
 * @param {Record<number, string>} items
 * @param {EntryLike | null | undefined} [entry]
 * @returns {Array<{ mini: string, items: string, names: string[] }>}
 */
export function fixedLoadoutLines(def, items, entry) {
  const perMini = entry && def ? modelsPerMini(def, entry) : null
  const replaced = new Set((def?.gear || []).flatMap((g) => (g.rep || []).map((id) => (g.all ? `*:${id}` : `${g.m ?? 0}:${id}`))))
  return (def?.defaults || []).flatMap(([m, list]) => {
    if (perMini?.get(m) === 0) return []
    const kept = list.filter(([id]) => !replaced.has(`${m}:${id}`) && !replaced.has(`*:${id}`))
    if (!kept.length) return []
    return [{
      mini: miniName(def, m),
      items: kept.map(([id, c]) => `${items[id]}${c > 1 ? ` ×${c}` : ''}`).join(', '),
      names: kept.map(([id]) => items[id]),
    }]
  })
}

/**
 * @param {RosterUnit | null | undefined} def
 * @param {Record<number, string>} items
 * @param {EntryLike | null | undefined} [entry]
 * @returns {Array<{ mini: string, items: string, names: string[] }>}
 */
export function defaultLoadoutLines(def, items, entry) {
  const perMini = entry && def ? modelsPerMini(def, entry) : null
  const removed = swapsByMini(def, entry, perMini)

  return (def?.defaults || []).flatMap(([m, list]) => {
    const models = perMini?.get(m)
    // A profile this size fields none of has no line: Headtakers without their wolves (2026-10-05).
    if (models === 0) return []
    /** @type {string[]} */
    const parts = []
    // The bare names too — what the editor's info button opens the profiles of.
    /** @type {string[]} */
    const names = []
    /** @param {ItemId} id @param {string} text */
    const put = (id, text) => { parts.push(text); names.push(items[id]) }
    for (const [id, c, total] of list) {
      // `total` marks a quantity that belongs to the PROFILE rather than to each of its models —
      // one of the two Gun Servitors in a Servitor Battleclade carries the heavy bolter (see the
      // generator's default-loadout merge) — so it is printed as it stands, never multiplied, and a
      // swap takes one copy per model off it.
      const take = removed.get(`${m}:${id}`) || 0
      if (!take || models == null) { put(id, `${items[id]}${c > 1 ? ` ×${c}` : ''}`); continue }
      // take is a MODEL count (how many models of THIS profile swapped the item away); c is the
      // item's quantity, per model or for the profile (copiesHeld).
      const remaining = copiesHeld(c, total, models, take)
      if (remaining > 0) put(id, `${items[id]}${total && remaining === 1 ? '' : ` ×${remaining}`}`)
    }
    if (!parts.length) return []
    return [{ mini: miniName(def, m), items: parts.join(', '), names }]
  })
}

// Names of the wargear items a unit entry has swapped/added on top of its default loadout
// (entry.wg deviations only — see UnitEditorFields/rosterExport.js for the same shape).
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {Record<number, string>} items
 * @returns {string[]}
 */
export function wargearNames(def, entry, items) {
  if (!entry?.wg?.length) return []
  return entry.wg.flatMap(([gi, oi, n]) => {
    const opt = def?.gear?.[gi]?.o?.[oi]
    if (!opt || !wargearGroupLive(def, entry, gi)) return []
    const name = optionLabel(opt, items)
    const label = (n ?? 1) > 1 ? `${name} ×${n}` : name
    return label ? [label] : []
  })
}

// ── Allies ────────────────────────────────────────────────────────────────────────────────────
// An allied unit's id is namespaced `<source faction slug>:<unit id>` (see data/roster/index.js) —
// it is the only mark it carries, so everything about allies is derived from the id plus the
// faction's own `allies` metadata rather than from a flag stamped on the entry.
/**
 * @param {string | null | undefined} id
 * @returns {[string, string] | null}
 */
export function allySourceOf(id) {
  const s = String(id || '')
  const at = s.indexOf(':')
  return at < 0 ? null : [s.slice(0, at), s.slice(at + 1)]
}

// Does this roster hold a unit from another faction's bundle? The read-only screens use it to
// decide whether loadRosterFaction has to pull those bundles at all (the editor always does).
/**
 * @param {Partial<Roster> | null | undefined} roster
 * @returns {boolean}
 */
export function usesAllies(roster) {
  return (roster?.units || []).some((u) => allySourceOf(u?.id))
}

// Which allied contexts are open to a list with these detachments selected. Most groups are always
// available; some are unlocked by one Detachment and by nothing else (World Eaters' Blood Legions
// need Khorne Daemonkin), which is also what tells Drukhari's two overlapping Aeldari groups apart
// — the same Troupe is a 500-point Harlequins ally under Reaper's Wager and a 250-point one under
// the corsair Detachments, so the selected Detachment decides which limits apply.
/**
 * @param {{ allies?: AllyGroup[] } | null | undefined} faction
 * @param {Detachment[] | null | undefined} [detachments]
 * @returns {AllyGroup[]}
 */
export function allyGroupsFor(faction, detachments = []) {
  const names = new Set((detachments || []).map((d) => d?.name).filter(Boolean))
  return (faction?.allies || []).filter((g) => !g.dets?.length || g.dets.some((n) => names.has(n)))
}

// Every group that lists this unit, whether or not its Detachment requirement is met — the
// difference is what separates "this unit is an ally" from "this unit is not allowed here".
/**
 * @param {{ allies?: AllyGroup[] } | null | undefined} faction
 * @param {string} id
 * @returns {AllyGroup[]}
 */
export function allyGroupsOf(faction, id) {
  return (faction?.allies || []).filter((g) => (g.ids || []).includes(id))
}

// What the allied rule bars a unit from: every CROSS-faction allied rule ends "None of these models
// can be your WARLORD, and they cannot be given Enhancements", and appdata's `canTakeEnhancements`
// (`enh` on the group) lifts the second half only. In-bundle groups (Harlequins, Ynnari) have no
// such sentence. null for a unit that is no ally. The editor (the Warlord box, the enhancement
// picker) and validateRoster (allyWarlord, allyEnh) both ask here — until 2026-10-13 only the
// validator did, so the editor offered a Changecaster in a Chaos Space Marines list two
// enhancements and the Warlord's flag, and the list then came back with two errors (a player's
// report).
/**
 * @param {{ allies?: AllyGroup[] } | null | undefined} faction
 * @param {string} id
 * @param {Detachment[] | null | undefined} [detachments]
 * @returns {{ warlord: boolean, enh: boolean } | null}
 */
export function allyBars(faction, id, detachments = []) {
  if (!allySourceOf(id)) return null
  const g = allyGroupOf(faction, id, detachments) || allyGroupsOf(faction, id)[0] || null
  return { warlord: true, enh: !g?.enh }
}

// The group a unit counts against right now: the first ACTIVE group listing it, or null when the
// unit is an ordinary member of the army.
/**
 * @param {{ allies?: AllyGroup[] } | null | undefined} faction
 * @param {string} id
 * @param {Detachment[] | null | undefined} [detachments]
 * @returns {AllyGroup | null}
 */
export function allyGroupOf(faction, id, detachments = []) {
  return allyGroupsFor(faction, detachments).find((g) => (g.ids || []).includes(id)) || null
}

// Put each ATTACHED unit back together — a bodyguard and whoever is leading it. They are one unit
// while attached (core rules 19.01, the same reading RosterViewView writes one state across both
// halves with), but filing them by battlefield role sat them in different sections, and the more
// important the character the further away it went: an Epic Hero at the top of the list, its squad
// at the bottom, joined only by a "attached to…" tag on each pointing at the other.
//
// A block moves to the Attached section only when EVERY part of it was filed by role. An ally
// group's heading carries its own accounting, so a unit belonging to one never leaves it: there
// the block is simply gathered in place, host first. Same for an allied Leader on a native host —
// it stays under its own group rather than being pulled out of it.
/**
 * @template {SectionItem} T
 * @param {T[]} items
 * @param {Map<T, { list: T[], ally: boolean }>} where
 * @param {T[] | undefined} attached
 */
function joinAttached(items, where, attached) {
  if (!attached) return
  const byUid = new Map((items || []).map((it) => [it?.uid, it]))
  /** @type {Map<string | undefined, T[]>} */
  const kids = new Map()
  // Keyed by the block's ROOT. Attachments can chain, legally: Huron leads the Masters of the
  // Maelstrom while the Masters Support a Chosen squad (the GW app exports exactly that), an Ogryn
  // Bodyguard joins a Command Squad that leads its own squad. That is ONE block under the root.
  // Keyed by the direct host, the middle unit was filed as the root's child and then again as the
  // head of its own block, and the list drew it twice (a player's report, 2026-09-24).
  /** @param {T} it */
  const rootOf = (it) => {
    let at = it
    const seen = new Set()
    /** @param {T} x */
    const hostOf = (x) => (x.leaderOf ? byUid.get(x.leaderOf) : undefined)
    for (let up = hostOf(at); up && !seen.has(at.uid); up = hostOf(at)) { seen.add(at.uid); at = up }
    return at
  }
  for (const it of items || []) {
    if (!it?.leaderOf || !byUid.has(it.leaderOf) || !where.has(it)) continue
    const root = rootOf(it)
    if (!root || root === it) continue
    let block = kids.get(root.uid)
    if (!block) kids.set(root.uid, (block = []))
    block.push(it)
  }
  /** @param {T} p */
  const drop = (p) => {
    const list = where.get(p)?.list
    const at = list ? list.indexOf(p) : -1
    if (list && at >= 0) list.splice(at, 1)
  }
  // Hosts in the order they were handed over — by name, since sectionsOf sorts before filing —
  // so the Attached section reads the way every other section does. A block touching an ALLY group
  // is gathered in place instead: an ally heading carries that group's own accounting and a unit
  // must not leave it.
  for (const host of items || []) {
    const children = kids.get(host?.uid)
    const home = where.get(host)   // every child is filed too: only filed items were collected above
    if (!children || !home) continue
    if (!home.ally && children.every((c) => !where.get(c)?.ally)) {
      drop(host)
      children.forEach(drop)
      attached.push(host, ...children)
      continue
    }
    const same = children.filter((c) => where.get(c)?.list === home.list)
    same.forEach(drop)
    home.list.splice(home.list.indexOf(host) + 1, 0, ...same)
  }
}

// ── The player's own notes ───────────────────────────────────────────────────────────────────
//
// Free text the player hangs on their list, used for PLANNING a game rather than describing an
// army: "rapid ingress T2" on a unit, a paragraph on the list. Two places because they are read at
// two different moments, and both are the player's words —
// nothing here is validated, priced, translated or read by any rule: `validateRoster` never looks
// at a note, and a note never makes a list illegal.
//
//   roster.notes  — the whole list's plan.
//   entry.note    — one unit's, printed after its name in parentheses.
//
// An attached BLOCK has no note of its own. It was built and dropped the same day (2026-08-28):
// the block is derived from `leaderOf` and has no record to hang a name on, so the name had to
// live on its host and be shown either in a heading of its own (a row of the phone per block) or
// on the block's total line, where the player who asked for it could not find it. A note on the
// host unit says the same thing in a place that is already read.
//
// The caps are what stops a note from being a document: a game snapshot carries the whole roster
// inside a 64 KB budget shared with the game (see `rosterGameLink.js`), so a note is a line, not a
// page.
export const ENTRY_NOTE_MAX = 60
// A block's own name, written on its HOST entry. Shorter than a note because it is a heading on a
// 182px pane, not a sentence: "домашка", "ближняя точка", "скрин экшн право" — what the player
// calls that part of the army while planning, which is the one thing about a list the app cannot
// know. Travels with the roster like every other entry field (rosterShare's `units` goes whole).
export const BLOCK_NAME_MAX = 28
export const ROSTER_NOTES_MAX = 2000

// Write a note, or remove it. Absent rather than empty: an empty string is not a note, and every
// reader here treats a missing field as "no note" — which is also what makes this need no schema
// bump (a roster saved before notes existed simply has none).
/**
 * @param {Record<string, any> | null | undefined} obj
 * @param {string} key
 * @param {unknown} value
 * @param {number} [max]
 * @returns {void}
 */
export function setNote(obj, key, value, max = ENTRY_NOTE_MAX) {
  if (!obj) return
  const text = String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max)
  if (text) obj[key] = text
  else delete obj[key]
}

// The block an entry belongs to, by its ROOT — the bodyguard at the bottom of the chain. Usually
// that is simply `leaderOf`, but attachments can chain legally (Huron leads the Masters of the
// Maelstrom, which Support a Chosen squad): the Chosen is the root of all three. Walks `entries`
// only, and stops on a loop. An entry attached to nothing is its own root.
/**
 * @param {EntryLike[] | null | undefined} entries
 * @param {EntryLike | null | undefined} e
 * @returns {string | undefined}
 */
export function blockRootUid(entries, e) {
  const byUid = new Map((entries || []).map((x) => [x.uid, x]))
  let at = e
  const seen = new Set()
  while (at?.leaderOf && byUid.has(at.leaderOf) && !seen.has(at.uid)) { seen.add(at.uid); at = byUid.get(at.leaderOf) }
  return at?.uid ?? e?.uid
}

// What a whole attached block costs, asked of its HOST — printed on the block's own head line in
// the editor's list and on the list's view, where the reader is already looking. Null unless
// this entry actually has something attached to it, so a lone squad prints one number as before.
/**
 * @param {RosterEntry[] | null | undefined} entries
 * @param {EntryLike | null | undefined} host
 * @param {(e: RosterEntry) => number} pointsOf
 * @returns {number | null}
 */
export function hostBlockTotal(entries, host, pointsOf) {
  if (!host || host.leaderOf) return null
  // The whole chain, not just the units on the host itself (see blockRootUid).
  const parts = (entries || []).filter((x) => x.uid === host.uid || (x.leaderOf && blockRootUid(entries, x) === host.uid))
  if (parts.length < 2) return null
  return parts.reduce((a, x) => a + (pointsOf(x) || 0), 0)
}

// Every attached block numbered in reading order, across the whole list rather than per section:
// the default name ("Unit 2") is what a player sees until they write their own, and it has to mean
// the second block on the screen, not the second one in Battleline. `groups` is the sectioned list
// both the editor's list and the view draw (`[{ entries }]`); host uid → number.
/**
 * @param {Array<{ entries?: RosterEntry[] }> | null | undefined} groups
 * @returns {Map<string, number>}
 */
export function blockNumbers(groups) {
  const m = new Map()
  let n = 0
  for (const g of groups || []) {
    for (const e of g.entries || []) {
      if (!e.leaderOf && (g.entries || []).some((x) => x.leaderOf === e.uid)) m.set(e.uid, ++n)
    }
  }
  return m
}

// The one comparator every list of units is read in — the catalogue, the sections of a list, the
// export. English datasheet names, so the default locale's collation is the same everywhere.
/**
 * @param {unknown} a
 * @param {unknown} b
 * @returns {number}
 */
export const byUnitName = (a, b) => String(a || '').localeCompare(String(b || ''))

// `items` in reading order: by `nameOf(item)`, ties in the order given (a stable sort — copies of
// one datasheet keep their adding order, which is what the copy tax reads). Items with no name —
// an entry whose datasheet the data no longer has — come first, together, in their own order;
// every caller filters those out anyway.
/**
 * @template T
 * @param {T[] | null | undefined} items
 * @param {(it: T) => string | undefined} nameOf
 * @returns {T[]}
 */
export function orderedByName(items, nameOf) {
  return (items || []).map((it, i) => ({ it, i, n: nameOf(it) }))
    .sort((x, y) => byUnitName(x.n, y.n) || x.i - y.i)
    .map((x) => x.it)
}

// One split shared by every screen that lists units — the add-units browser, the editor and the
// read-only view. Allies don't belong in the battlefield-role buckets: they are a separate part of
// the army with their own ceiling, and two of them (Drukhari's Harlequins, a Chapter's Knights)
// would otherwise sit in "Other" with nothing saying where their points come from. Units of a
// group whose Detachment requirement isn't met are not offered by the browser at all — they can't
// legally be there, which is also what validateRoster says about them — but a list that already
// holds one still shows it (`keepLocked`), under the group it belongs to.
//
// `items` are roster entries resolved through `defOf`; the browser lists the datasheets themselves
// and goes through `sectionsOfUnits`, below. `pairAttached` is for the entry lists only — the
// browser shows datasheets, which nothing is attached to.
//
// READING ORDER. Inside a section everything reads like the catalogue: datasheets by name, the
// copies of one datasheet together in the order they were added. The roster's own `units` array
// is left in ADDING order — that is the order the copy tax is assigned in (entryMeta,
// rosterPoints, the export) and `orderedByName` is stable, so the second copy is still the one
// below the first — and nothing is re-saved to sort it: a list from an older build or another
// device reads the same way the moment it is opened, and so does the tracker's snapshot. Before
// 2026-09-22 a section was in adding order, and a player who had added a squad, a character and
// then a second squad had to delete and re-add to see the two squads together (report 05870f4a);
// the alternative — dragging rows — needs a gesture the two-pane phone layout has no room for and
// an order the format would have to carry.
/**
 * Roster entries, each resolved to its datasheet through `defOf`.
 * @template {SectionItem} T
 * @param {T[]} items
 * @param {SectionOpts & { defOf: DefOf }} opts
 * @returns {Array<UnitSection<T>>}
 */
export function sectionsOf(items, { faction, detachments = [], defOf, keepLocked = false, pairAttached = false }) {
  const all = faction?.allies || []
  const active = allyGroupsFor(faction, detachments)
  const activeKeys = new Set(active.map((g) => g.key))
  /** @type {Map<string, T[]>} */
  const byKey = new Map(all.map((g) => [g.key, []]))
  /** @type {Map<string, T[]>} */
  const roles = new Map(UNIT_GROUPS.map((id) => [id, []]))
  /** @type {Map<T, { list: T[], ally: boolean }>} item → the list it was filed into, and whether that list is an ally group */
  const where = new Map()
  const ordered = orderedByName(items, (it) => defOf(it.id)?.name)
  for (const it of ordered) {
    const id = it.id
    const def = defOf(id)
    if (!def) continue
    const groups = all.filter((g) => (g.ids || []).includes(id))
    const mine = groups.find((g) => activeKeys.has(g.key)) || groups[0]
    // The faction slug is what conditionalKeywords.json is keyed by; without it the grant cannot
    // be looked up and bucketOf falls back to the ungated flag.
    const granted = faction?.slug ? grantedKeywordsFor(id, faction.slug, detachments).map((g) => g.kw) : null
    const list = mine ? byKey.get(mine.key) : roles.get(bucketOf(def, granted))
    if (!list) continue
    list.push(it)
    where.set(it, { list, ally: !!mine })
  }
  if (pairAttached) joinAttached(ordered, where, roles.get('attached'))
  // Active groups always (the browser offers them even while empty); a locked one only where the
  // caller keeps locked units — the editor and the read-only view must still show a unit that is
  // in the list, or its points would go missing from the screen but not from the total.
  /** @param {AllyGroup} g @returns {UnitSection<T>} */
  const groupSection = (g) => ({ id: `ally:${g.key}`, ally: g, locked: !activeKeys.has(g.key), items: byKey.get(g.key) || [] })
  return [
    ...UNIT_GROUPS.map((id) => ({ id, items: roles.get(id) || [] })),
    ...active.map(groupSection),
    ...(keepLocked ? all.filter((g) => !activeKeys.has(g.key) && byKey.get(g.key)?.length).map(groupSection) : []),
  ]
}

// The catalogue's split: the items ARE the datasheets, so each resolves to itself.
/**
 * @param {RosterUnit[]} units
 * @param {SectionOpts} [opts]
 * @returns {Array<UnitSection<RosterUnit>>}
 */
export function sectionsOfUnits(units, opts = {}) {
  const byId = new Map((units || []).map((u) => [u.id, u]))
  return sectionsOf(units || [], { ...opts, defOf: (id) => byId.get(id) })
}

// The Detachment Points a set of detachments is held to: the battle size's budget (core rules
// 25.03), and the one exception printed at the foot of 25.04 — "If you are playing an Incursion
// battle, you can select a 3DP detachment as your only detachment." For a lone detachment that
// would not fit, the budget simply IS 3, and every count and picker says "3 / 3 DP": the exception
// is a rule now, not something to explain beside a red number (owner, 2026-10-01). A lone
// detachment that fits keeps the real budget — "1 / 3" at Incursion would promise a second
// detachment the budget does not have room for. `dets` carry `dp`; `budget` is the battle's.
export const SOLO_DETACHMENT_DP = 3
/**
 * @param {Array<{ dp?: number }>} dets
 * @param {number | null | undefined} budget
 * @returns {number}
 */
export function dpLimitFor(dets, budget) {
  const limit = budget ?? Infinity
  const spent = dets.reduce((s, d) => s + (d.dp || 0), 0)
  return dets.length === 1 && spent > limit && spent <= SOLO_DETACHMENT_DP ? SOLO_DETACHMENT_DP : limit
}

// An archived list is kept, not fielded: "every unit I own", a painting queue, last season's list.
// Nothing about it is checked (owner, 2026-10-03) — rules move on under a list nobody plays, and a
// warning that is always on gets read as noise. `archived: true` is ABSENT on every other list, the
// way `draft` is (useRosters.js); `legalityOn` is the one question every check asks — the
// validator, the duplicate cap, the badge, the red of a total over its limit. Unticking "Check
// legality" switches all of them off, not just the cap (owner, 2026-10-04); the screens say so
// once, with `rosterChecksOff`, instead of any warning.
/**
 * @param {{ archived?: boolean } | null | undefined} r
 * @returns {boolean}
 */
export const isArchived = (r) => r?.archived === true
/**
 * @param {{ archived?: boolean, checkLegality?: boolean } | null | undefined} r
 * @returns {boolean}
 */
export const legalityOn = (r) => r?.checkLegality !== false && !isArchived(r)

// The effective battle-size limits for a roster — the ONE place every limit a list is held to comes
// from: points, Detachment Points (`dp`), enhancements (`enhLimit`), copies of a datasheet
// (`dupLimit`) and copies of a Battleline / Dedicated Transport one (`lineLimit`, twice `dupLimit`
// in every size the game prints). The validator, the catalogue's "+", the copy button, the
// detachment picker and the exports all read this object and nothing else.
//
// A 'custom' size carries its own points total and borrows the other limits of the standard bracket
// it falls within — unless the player set their own (`customLimits: { dp, enh, dup, line }`, owner
// 2026-10-03), each one independently: a key left out is still borrowed, and `line` left out is
// twice the `dup` in force. `ownLimits` says whether any was set, for the screens that mark it.
// 'none' is a list with no budget at all — "every model I own", a painting queue — and lifts
// every limit with it: points, DP, enhancements, duplicates (owner, 2026-10-03). The limits are
// Infinity rather than absent, so every `>` against them simply never fires; anything that PRINTS
// a limit asks `unlimited` first. `base` still names a bracket, for the ally tables — which no
// custom limit reaches: they are GW's per-size tables, not a number of the player's.
export const UNLIMITED_BATTLE = 'none'
/** @type {Array<'dp' | 'enh' | 'dup' | 'line'>} */
export const CUSTOM_LIMIT_KEYS = ['dp', 'enh', 'dup', 'line']
/** @param {unknown} v @returns {number | null} */
const ownNumber = (v) => (typeof v === 'number' && Number.isInteger(v) && v >= 0 ? v : null)
/**
 * @param {Partial<Roster> | null | undefined} roster
 * @param {{ battleSizes?: BattleSize[] } | null | undefined} core
 */
export function effectiveBattle(roster, core) {
  const sizes = [...(core?.battleSizes || [])].sort((a, b) => a.points - b.points)
  // With no battle sizes at all (a caller that passes no `core` — tests only) a Strike Force stands
  // in, whole: its id is what the ally tables are keyed by.
  const fallback = sizes[sizes.length - 1] || { id: 'strike-force', name: 'Strike Force', points: 2000, dp: 3, enhLimit: 4, dupLimit: 3 }
  if (roster?.battleSize === UNLIMITED_BATTLE) {
    return { id: UNLIMITED_BATTLE, base: fallback.id, points: Infinity, dp: Infinity, enhLimit: Infinity, dupLimit: Infinity, lineLimit: Infinity, custom: false, unlimited: true }
  }
  if (roster?.battleSize === 'custom') {
    const points = roster.customPoints || 0
    const std = sizes.find((b) => points <= b.points) || fallback
    const own = roster.customLimits || {}
    const dp = ownNumber(own.dp) ?? std.dp
    const enhLimit = ownNumber(own.enh) ?? std.enhLimit
    const dupLimit = ownNumber(own.dup) ?? std.dupLimit
    const lineLimit = ownNumber(own.line) ?? dupLimit * 2
    const ownLimits = CUSTOM_LIMIT_KEYS.some((k) => ownNumber(own[k]) != null)
    // `base` is the standard bracket whose limits a custom size borrows — the ally limits are
    // tabulated per battle size, so they need a bracket name even when the points are hand-typed.
    return { id: 'custom', base: std.id, points, dp, enhLimit, dupLimit, lineLimit, custom: true, ownLimits }
  }
  const b = sizes.find((x) => x.id === roster?.battleSize) || fallback
  return { ...b, base: b.id, lineLimit: b.dupLimit * 2, custom: false }
}

// The roster stores its detachments by NAME (as the tracker does); these are the data objects
// behind them, in the roster's order — what pricing, legality and every rule gate read. A name the
// faction no longer has is left out here; validateRoster reports it (detachmentGone).
/**
 * @param {Partial<Roster> | null | undefined} roster
 * @param {{ detachments?: Detachment[] } | null | undefined} faction
 * @returns {Detachment[]}
 */
export function rosterDetachments(roster, faction) {
  return (roster?.detachments || []).flatMap((name) => {
    const d = (faction?.detachments || []).find((x) => x.name === name)
    return d ? [d] : []
  })
}

// Total points for a list of roster unit entries. `defOf(id)` resolves a unit id to its
// faction-data definition. Copy index is assigned per unit id in list order, so the 2nd/3rd
// copy of a datasheet pays its step surcharge.
/**
 * @param {RosterEntry[] | null | undefined} units
 * @param {DefOf} defOf
 * @param {Detachment[] | null | undefined} [detachments]
 * @returns {number}
 */
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

// The budget's remainder as the readouts print it under "used / limit": "125 left" while there
// is room, "25 over" once past it, and nothing at all without a limit to count against. `labels`
// is the locale's ui block (rosterPointsLeft / rosterPointsOver carry the `{n}` slot).
/**
 * @param {number} points
 * @param {number} limit
 * @param {{ rosterPointsLeft: string, rosterPointsOver: string }} labels
 * @returns {string}
 */
export function pointsLeftLabel(points, limit, labels) {
  if (!Number.isFinite(limit) || limit <= 0) return ''
  const left = limit - points
  return (left < 0 ? labels.rosterPointsOver : labels.rosterPointsLeft).replace('{n}', String(Math.abs(left)))
}
