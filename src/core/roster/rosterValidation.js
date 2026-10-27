// @ts-check
// Roster validation — a pure module (no Vue, no store). Philosophy: NEVER block. Like the
// official app, we always compute a total and surface violations for the user to judge, rather
// than preventing an illegal list. Each issue is `{ code, level, uid?, params? }`; `code` maps
// to an i18n message (see RosterIssuesModal), `level` is 'error' (illegal) or 'warn'
// (incomplete / soft). `uid` ties an issue to a specific unit entry.
import { rosterDetachments, isBattlelineNow, grantedKeywordsFor, hostLimitsFor, joinsAlongside, joinLedBy, joinsClash, leadTypeFor, armySidsOf, allyGroupsFor, allyGroupsOf, allySourceOf, allyBars, mustBeWarlord, canBeWarlord, findEnhancement, rosterPoints, effectiveBattle, capKeyOf, wargearGroupCap, wargearGroupFallbackCap, wargearGroupLive, wargearGroupSpent, wargearExclOver, wargearXpmOver, wargearPoolOver, exactPicksOwed, perModelFits, optionItems, optionLabel, swapOverdraft, allegFor, allegKeyword, grantedKeywords, dispositionCandidates, dispositionOf, dpLimitFor, legalityOn, sharedKeywordClash, isSupportUnit } from './rosterEngine.js'
import { hasKeyword, enhEligible } from './rosterEnhEligible.js'

/** @typedef {import('../shared/roster.types.js').RosterUnit} RosterUnit */
/** @typedef {import('../shared/roster.types.js').RosterEntry} RosterEntry */
/** @typedef {import('../shared/roster.types.js').RosterFaction} RosterFaction */
/** @typedef {import('../shared/roster.types.js').Roster} Roster */
/** @typedef {import('../shared/roster.types.js').BattleSize} BattleSize */
/** @typedef {import('../shared/roster.types.js').RosterIssue} RosterIssue */
/** @typedef {import('../shared/roster.types.js').DefOf} DefOf */
/** @typedef {import('../shared/roster.types.js').Detachment} Detachment */

// Which issues the SETUP tab is the place to fix. An editor tab can only carry an honest mark if
// the mark means "the fix is in here": faction, detachments, the Force Disposition they disagree
// about, and the DP those detachments spend are all chosen on that tab and nowhere else. Anything
// answered by adding, dropping or re-arming a unit belongs to the Units tab and is deliberately
// NOT here — including `overPoints`, which names the battle size but is almost always fixed by
// the list, not by the limit.
export const SETUP_CODES = new Set(['noFaction', 'noDetachment', 'detachmentGone', 'dispositionUndeclared', 'detachmentTagClash', 'overDp'])

/**
 * @param {RosterIssue[] | null | undefined} issues
 * @returns {number}
 */
export function setupIssueCount(issues) {
  return (issues || []).filter((i) => SETUP_CODES.has(i.code)).length
}

// Per-unit duplicate cap: the battle size's limit, its Battleline / Dedicated Transport limit for
// those (twice the other in every printed size, a number of its own in a custom one), and
// hard-capped at 1 for every Epic Hero — regardless of battle size (rule 25). `limits` is
// effectiveBattle's object; a bare number is read as a printed size's `dupLimit` (the doubled
// line limit follows), which is what the tests and the older callers pass.
// `granted` — the keywords this unit has from the ARMY rather than from its datasheet
// (rosterEngine's grantedKeywordsFor). Battleline is the only one that matters here, and it is
// what makes the difference between three Warbikers and six: pass it wherever the roster's
// detachments are known. `null` keeps the pre-gate reading of the raw `condBattleline` flag.
// `detachments` — the army's: a one-per-army unit (`flags.one`, "you cannot include more than one
// of this model") takes the largest `unitCaps` one of them gives it (up to three Troupe Masters in
// Ghosts of the Webway). Every caller passes them, so the add button and the issue never disagree.
/**
 * @param {RosterUnit} def
 * @param {number | { dupLimit: number, lineLimit?: number }} limits
 * @param {string[] | null} [granted]
 * @param {Detachment[]} [detachments]
 * @returns {number}
 */
export function duplicateLimit(def, limits, granted = null, detachments = []) {
  const dup = typeof limits === 'number' ? limits : limits.dupLimit
  const line = typeof limits === 'number' ? limits * 2 : (limits.lineLimit ?? dup * 2)
  if (def.flags?.one) return Math.max(1, ...detachments.map((d) => d.unitCaps?.[def.id] || 0))
  if (def.flags?.epic) return 1
  if (hasKeyword(def, 'Battleline') || isBattlelineNow(def, granted) || hasKeyword(def, 'Dedicated Transport')) return line
  return dup
}

// How many roster entries currently occupy each duplicate-cap "slot" (rosterEngine.js's
// capKeyOf — normally one per datasheet id, but a future same-character/multiple-datasheets
// case would share a key). Shared by validateRoster's own check below and
// RosterUnitBrowser.vue's live add-button guard, so the two never disagree about the count.
/**
 * @param {RosterEntry[] | null | undefined} units
 * @param {DefOf} defOf
 * @returns {Map<string | undefined, number>}
 */
export function duplicateCounts(units, defOf) {
  const m = new Map()
  for (const u of units || []) {
    const def = defOf(u.id)
    if (!def) continue
    const key = capKeyOf(def)
    m.set(key, (m.get(key) || 0) + 1)
  }
  return m
}

// `items` (the shared wargear-name dictionary, data/roster/items.js) is optional: only the stock
// rule's message names an item, and a caller that merely counts errors need not carry it.
// `idleCopies(unit)`, when given, names the melee weapons a unit holds twice on one model for
// nothing (rosterModifiers' idleMeleeCopies) — it needs the datasheet and the modifier records, which
// the editor loads on the side; without it the check is silent, as before they arrive.
/**
 * @param {Partial<Roster> | null | undefined} roster
 * @param {{ faction?: RosterFaction | null, core?: { battleSizes?: BattleSize[] } | null, items?: Record<number, string>, idleCopies?: (u: RosterEntry) => string[] | null | undefined }} [opts]
 * @returns {{ points: number, issues: RosterIssue[], errorCount: number }}
 */
export function validateRoster(roster, { faction, core, items, idleCopies } = {}) {
  const units = roster?.units || []
  const defMap = new Map((faction?.units || []).map((u) => [u.id, u]))
  /** @param {string | undefined} id */
  const defOf = (id) => (id == null ? undefined : defMap.get(id))
  const battle = effectiveBattle(roster, core)
  const detachments = rosterDetachments(roster, faction)
  // Who else is in the list, for an attachment that depends on it (Cato Sicarius with Calgar).
  const armySids = armySidsOf(units, (id) => defOf(id))

  // Battleline gained from a Detachment, per unit — the doubled duplicate cap below asks this,
  // and so does the section a unit is filed under (rosterEngine's sectionsOf).
  /** @param {RosterUnit | undefined} def */
  const grantedBattleline = (def) =>
    faction ? grantedKeywordsFor(def, detachments).map((g) => g.kw) : null

  const points = rosterPoints(units, defOf, detachments)
  // A list with its checks switched off, or archived, is priced but never judged — not one issue,
  // warnings included (owner, 2026-10-04: "no rule checked, no warning shown, only that the
  // checks are off"). See legalityOn (rosterEngine.js).
  if (!legalityOn(roster)) return { points, issues: [], errorCount: 0 }
  /** @type {RosterIssue[]} */
  const issues = []
  // Every issue tied to an entry names it. The message templates cannot do that on their own — the
  // same code is raised from a dozen places and several carry no unit at all — so `unit` is filled
  // in here for anything with a `uid`, and the templates only have to leave room for it. An army
  // holding three Warbosses would then say the same thing three times, so a name shared by several
  // entries gets that entry's number in the list: the reader can tell which row the modal will jump
  // to before they tap it.
  /** @param {string} uid */
  const nameOf = (uid) => {
    const at = units.findIndex((u) => u.uid === uid)
    const def = at < 0 ? null : defOf(units[at].id)
    if (!def) return null
    const same = units.filter((u) => u.id === units[at].id)
    if (same.length < 2) return def.name
    return `${def.name} (${same.findIndex((u) => u.uid === uid) + 1})`
  }
  /**
   * @param {string} code
   * @param {RosterIssue['level']} level
   * @param {{ uid?: string, params?: RosterIssue['params'] }} [extra]
   */
  const add = (code, level, extra) => {
    /** @type {RosterIssue} */
    const iss = { code, level, ...extra }
    if (iss.uid) {
      const unit = nameOf(iss.uid)
      if (unit) iss.params = { unit, ...(iss.params || {}) }
    }
    issues.push(iss)
  }

  // A detachment the faction no longer has — a new codex retires detachments by name, and a list
  // saved before it keeps the name. Resolving it to nothing (as every lookup below does) would let
  // the list read as playing no detachment at all while the header still names one; saying so is
  // what sends the player to the picker's Clear.
  if (faction?.detachments) {
    for (const name of roster?.detachments || []) {
      if (!faction.detachments.some((d) => d.name === name)) add('detachmentGone', 'error', { params: { name } })
    }
  }

  // Incompleteness (soft).
  if (!roster?.faction) add('noFaction', 'warn')
  else if (!roster?.detachments?.length) add('noDetachment', 'warn')
  // An army has ONE Force Disposition — the card selected after mustering, whose symbols name the
  // Primary Mission — so detachments disagreeing about it is a choice the player still owes. Said
  // once the list is otherwise buildable; it costs nothing to fix and everything downstream (the
  // export's own line, the printed header, the game the list is handed to) reads the answer.
  else if (dispositionCandidates(detachments).length > 1 && !dispositionOf(roster, detachments)) {
    add('dispositionUndeclared', 'warn', { params: { options: dispositionCandidates(detachments).join(', ') } })
  }

  // An entry whose datasheet the faction data no longer has. Rosters live in localStorage for as
  // long as the user keeps them and the generated data is replaced on every deploy, so a GW rename
  // (or a unit dropped from the codex) leaves entries pointing at nothing. Every other reader
  // filters those out — the grouped lists, the export, the points total — so without this the unit
  // silently vanishes and the army quietly gets cheaper. Reported, not removed: which unit to put
  // back is the player's call, and the entry still carries their wargear picks.
  if (faction) {
    for (const u of units) if (u.id && !defOf(u.id)) add('unknownUnit', 'error', { uid: u.uid, params: { id: u.id } })
  }

  // Points limit.
  if (points > battle.points) {
    add('overPoints', 'error', { params: { over: points - battle.points, limit: battle.points } })
  }

  // Detachment-Points budget: the selected detachments' costs must fit the battle size's DP —
  // bar a lone 3 DP detachment at Incursion, which 25.04 allows (a player's report, 2026-09-30:
  // the editor let it through and the list then called it an error).
  const dpSpent = detachments.reduce((s, d) => s + (d.dp || 0), 0)
  if (dpSpent > dpLimitFor(detachments, battle.dp)) add('overDp', 'error', { params: { spent: dpSpent, limit: battle.dp } })

  // Detachment tags: "This detachment has the DYNASTY tag and cannot be taken with another DYNASTY
  // detachment" — the detachment's own rule says so, not the core rules. The MFM prints the tag as
  // "UNIQUE: DYNASTY" and appdata keeps it in `detachment_unique_keyword`, and some detachments carry
  // it only there: Wrath of the Rock and Terminator Storm Force are both TERMINATOR and neither rule
  // text says it (a player's question, 2026-10-12). 26 tags across 17 factions, and 19 of those pairs fit inside a
  // 3 DP budget, so this is reachable in two clicks — the editor's picker greys the second one out,
  // and this catches a list that was imported or built before the tag was known.
  {
    const byTag = new Map()
    for (const d of detachments) {
      if (!d.unique) continue
      if (!byTag.has(d.unique)) byTag.set(d.unique, [])
      byTag.get(d.unique).push(d.name)
    }
    for (const [tag, names] of byTag) {
      if (names.length > 1) add('detachmentTagClash', 'error', { params: { tag, names: names.join(', ') } })
    }
  }

  // Warhammer Legends — published rules, but not matched-play legal. A warning, never an error:
  // the same "never block" rule the rest of this file follows, and a Legends unit is a perfectly
  // ordinary choice in a friendly game. The datasheet grid and the catalogue already mark and
  // filter them (`flags.legends`); this is the half that was missing — a list built for a
  // tournament said nothing at all.
  for (const u of units) {
    const def = defOf(u.id)
    if (def?.flags?.legends) add('legendsUnit', 'warn', { uid: u.uid })
  }

  // A second copy of a melee weapon on one model: legal, and by 04.01 (a model fights with ONE
  // melee weapon) worth nothing unless the unit's own rule rewards the pair. A warning, like
  // everything here that is allowed but probably not meant (owner, 2026-10-11).
  if (idleCopies) {
    for (const u of units) {
      for (const weapon of idleCopies(u) || []) add('meleeCopyIdle', 'warn', { uid: u.uid, params: { item: weapon } })
    }
  }

  // Duplicate datasheet limits — grouped by capKeyOf, not raw id, so a future same-character/
  // multiple-datasheets case (see rosterEngine.js's capKeyOf) is capped as one slot.
  {
    const byKey = new Map()
    for (const u of units) {
      const def = defOf(u.id)
      if (!def) continue
      const key = capKeyOf(def)
      if (!byKey.has(key)) byKey.set(key, [])
      byKey.get(key).push(u)
    }
    for (const list of byKey.values()) {
      const def = defOf(list[0].id)
      if (!def) continue // byKey holds only entries with a datasheet
      const limit = duplicateLimit(def, battle, grantedBattleline(def), detachments)
      if (list.length > limit) {
        add('overDuplicate', 'error', { uid: list[limit].uid, params: { count: list.length, limit } })
      }
    }
  }

  // Wargear pick limits. The editor caps the steppers as you click, so this can only fire on a
  // list that was legal when it was built and stopped being one — almost always by SHRINKING the
  // unit ("up to 4 at 10 models" → 2 when it drops to 5). Since 2026-09-24 the editor trims a
  // shrink itself (rosterEngine's fitWargear, with a way back), so what still lands here is a list
  // that arrived over — an import, or one saved before a rule. Those are reported, never trimmed:
  // nothing the player did produced them, and which weapon to give up is theirs to say.
  for (const u of units) {
    const def = defOf(u.id)
    if (!def) continue // an entry with no datasheet has nothing to check here (unknownUnit says so)
    const gear = def.gear || []
    // A count that is not a whole number: the editor's "+" stopped at a ceiling counted in models
    // where one pick took part of a model (two macro-scalpels on a Talos, one swapped), and stored
    // what it stopped at — 1.5 ichor injectors (a player's report, 2026-10-13). The ceiling is in
    // picks now; a list saved before that is reported, not rewritten, and one tap on the stepper
    // gives a whole number back. Its points are charged as stored until then, which is why this
    // says so rather than rounding quietly.
    for (const [gi, oi, n] of u.wg || []) {
      if (n == null || Number.isInteger(n)) continue
      add('wargearCountFraction', 'warn', { uid: u.uid, params: { item: optionLabel(gear[gi]?.o?.[oi], items), count: n } })
    }
    for (const [gi] of gear.entries()) {
      const cap = wargearGroupCap(def, u, gi)
      if (!wargearGroupLive(def, u, gi)) continue
      if (!cap) {
        // No structural cap: the ceiling is however many models the group belongs to (times the
        // copies of the weapon each carries — see wargearGroupFallbackCap). Deliberately
        // conservative — a "for every 5 models" group has a tighter limit still, but its wording
        // isn't available here, so this only reports what it can prove, never a guess.
        const own = wargearGroupFallbackCap(def, u, gi)
        const used = wargearGroupSpent(u, gi)
        if (own != null && used > own) {
          add('overWargearLimit', 'error', { uid: u.uid, params: { count: used, limit: own } })
        }
        continue
      }
      const spent = wargearGroupSpent(u, gi)
      if (spent > cap.limit) {
        add('overWargearLimit', 'error', { uid: u.uid, params: { count: spent, limit: cap.limit } })
        continue
      }
      // Each pick against its OWN option's cap — the group's, or one option's own `od` (Strike Team's
      // guardian drone, where the rest of the group takes duplicates).
      const dupOf = (/** @type {number} */ oi) => wargearGroupCap(def, u, gi, oi)?.dup || 0
      const over = (u.wg || []).find(([g, oi, n]) => g === gi && dupOf(oi) && (n || 1) > dupOf(oi))
      if (over) add('overWargearDup', 'error', { uid: u.uid, params: { count: over[2] || 1, limit: dupOf(over[1]) } })
      // "…replaced with two different weapons": the count is exact (`ex`), so one pick leaves the
      // model one weapon short of its datasheet. A `solo` option ("either 1 twin lightning claws,
      // or two different…") is a complete answer on its own.
      if (exactPicksOwed(def, u, gi)) add('wargearPickExact', 'error', { uid: u.uid, params: { count: spent, limit: gear[gi].ex } })
      // One per model across a set of options (Broadside's twin plasma rifle / twin smart missile
      // system) — rosterEngine's wargearExclOver.
      for (const x of wargearExclOver(def, u, gi)) {
        const names = x.set.map((oi) => optionItems(gear[gi].o[oi]).map(([id]) => items?.[id]).filter(Boolean).join(' + ')).filter(Boolean).join(', ')
        add('overWargearOnePerModel', 'error', { uid: u.uid, params: { count: x.spent, limit: x.limit, names } })
      }
    }
    // A model's limit across several groups (`xpm`): a Commander's two shield generators, a Knight
    // Destrier's two chainswords. Same message as the one-per-model sets above.
    for (const x of wargearXpmOver(def, u)) {
      const names = [...new Set(x.set.s.flatMap(([g, o]) => (o == null ? gear[g].o : [gear[g].o[o]]).map((op) => optionItems(op).map(([id]) => items?.[id]).filter(Boolean).join(' + '))))].filter(Boolean).join(', ')
      add('overWargearOnePerModel', 'error', { uid: u.uid, params: { count: x.spent, limit: x.limit, names } })
    }
    // An allowance several profiles share (`pools`): two hexrifles in five Wracks, one on the
    // Acothyst and one on a Wrack — each copy is within its own models, the squad is over.
    for (const x of wargearPoolOver(def, u)) {
      if (x.oi == null) add('overWargearLimit', 'error', { uid: u.uid, params: { count: x.spent, limit: x.limit } })
      else add('overWargearDup', 'error', { uid: u.uid, params: { count: x.spent, limit: x.limit } })
    }
    // Rules about one model across groups (`pm`, Legends Crisis Battlesuits): the picks cannot be
    // dealt onto the models — rosterEngine's perModelFits.
    if (!perModelFits(def, u)) add('overWargearPerModel', 'error', { uid: u.uid })
    // The stock rule: the same item given up by more models than carry it — two groups each
    // swapping a Chaos Lord's one bolt pistol. The editor greys such a group out before it is
    // picked (rosterEngine's swapRoom), so this is for lists built before the rule, imported, or
    // shrunk under their swaps. Which swap to undo is the player's call.
    for (const { id, used, cap: have } of swapOverdraft(def, u)) {
      add('overWargearReplaced', 'error', { uid: u.uid, params: { item: items?.[id] || '', count: used, limit: have } })
    }
  }

  // Allegiance choices — the mark a unit must pick, and the army-wide cap on the optional upgrades.
  {
    const spentByGroup = new Map()
    for (const u of units) {
      const def = defOf(u.id)
      const a = allegFor(def, detachments)
      if (!a) continue
      if (u.alleg) spentByGroup.set(a.g, (spentByGroup.get(a.g) || 0) + 1)
      else if (a.req) add('allegMissing', 'error', { uid: u.uid, params: { group: a.t || a.g } })
    }
    // "Select up to 3 …" is a cap; "select 3 …" (Chaos Knights' Houndpack Lance, min 3 / max 3) is
    // also a floor, and a list one War Dog short of it is illegal in the same way one over is.
    const capOf = new Map()
    for (const u of units) {
      const a = allegFor(defOf(u.id), detachments)
      if (a?.max || a?.min) capOf.set(a.g, { max: a.max, min: a.min, t: a.t || a.g })
    }
    for (const [g, { max, min, t }] of capOf) {
      const spent = spentByGroup.get(g) || 0
      if (max && spent > max) add('allegOverLimit', 'error', { params: { group: t, count: spent, limit: max } })
      if (min && spent < min) add('allegUnderLimit', 'error', { params: { group: t, count: spent, limit: min } })
    }

    // "A CHARACTER unit can only be attached to a unit if both units share the same keyword" —
    // Pactbound Zealots, as appdata states it on the attachment (sharedKeywordClash): a printed
    // keyword counts as much as a chosen mark, so an Epic Hero's CHAOS UNDIVIDED is held to it too.
    for (const u of units) {
      if (!u.leaderOf) continue
      const target = units.find((x) => x.uid === u.leaderOf)
      const clash = target && sharedKeywordClash(defOf(u.id), u, defOf(target.id), target, detachments, armySids)
      if (!clash) continue
      add('allegMismatch', 'error', {
        uid: u.uid,
        params: { own: clash.own, target: nameOf(target.uid) || defOf(target.id)?.name, theirs: clash.theirs },
      })
    }
  }

  // Warlord: exactly one, eligible, and matching a mandatory warlord if the detachment sets one.
  const warlords = units.filter((u) => u.warlord)
  if (units.length && warlords.length === 0) add('noWarlord', 'error')
  if (warlords.length > 1) add('manyWarlords', 'error', { uid: warlords[1].uid })
  for (const w of warlords) {
    const def = defOf(w.id)
    // The allegiance keyword counts here for the same reason it counts for enhancements below: a
    // War Dog that took Houndpack Lance's CHARACTER is a Character.
    const alleg = allegKeyword(def, w, detachments)
    const granted = alleg ? [alleg] : []
    if (def && !canBeWarlord(def, detachments, granted)) add('warlordIneligible', 'error', { uid: w.uid })
  }
  // A detachment can name MORE THAN ONE candidate (Aeldari's "Devoted of Ynnead": Yvraine OR The
  // Yncarne) — every detachment's own list is an OR-alternative, flattened across all selected
  // detachments (gen-roster-data.mjs's detMandWarlord already collects every row per detachment).
  const mandWarlords = detachments.flatMap((d) => d.mandWarlord || [])
  if (mandWarlords.length && warlords.length === 1 && !mandWarlords.includes(warlords[0].id)) {
    add('mandatoryWarlord', 'warn', { uid: warlords[0].uid })
  }
  // Supreme Commander ("if this model is in your army, it must be your Warlord") — 17 datasheets
  // carry it. SEVERAL of them may be in one army: the Muster step (src/data/muster.js) says so
  // outright — "Some units have a rule on their datasheet stating that they must be your WARLORD.
  // If you want to include one or more of these units in your army, you must select one of them to
  // be your WARLORD." So the rule is not "one such unit", it is "one of them wears the title", and
  // Belisarius Cawl beside Thulia Ghuld is a legal Adeptus Mechanicus list, not the unresolvable
  // conflict this used to call it.
  const supremeUnits = units.filter((u) => mustBeWarlord(defOf(u.id), u.id))
  if (supremeUnits.length && !supremeUnits.some((u) => u.warlord)) {
    const names = supremeUnits.map((u) => defOf(u.id)?.name).filter(Boolean)
    if (supremeUnits.length === 1) add('supremeCommanderNotWarlord', 'error', { uid: supremeUnits[0].uid })
    else add('supremeCommanderPick', 'error', { uid: supremeUnits[0].uid, params: { names: [...new Set(names)].join(', ') } })
  }

  // Enhancements: each up to its own per-name cap (an "(Upgrade)" enhancement — see
  // rosterEngine.js's enhOptionsFor — explicitly allows several units to share the same one,
  // ordinary enhancements cap at 1), within the army-wide enhancement-slot limit (counted ones
  // only), on a legal unit.
  // An enhancement its own rules bar from the Warlord (World Eaters' Disciple of Khorne).
  for (const w of warlords) {
    const e = findEnhancement(detachments, w.enh, w.enhDet)
    if (e?.notWarlord) add('enhNotWarlord', 'error', { uid: w.uid, params: { enh: w.enh } })
  }

  const enhUnits = units.filter((u) => u.enh)
  // Keyed by the enhancement itself — its name AND whose it is: two detachments' same-named
  // enhancements are two enhancements, each with its own cap.
  const byEnh = new Map()
  for (const u of enhUnits) {
    const e = findEnhancement(detachments, u.enh, u.enhDet)
    if (!byEnh.has(e || u.enh)) byEnh.set(e || u.enh, [])
    byEnh.get(e || u.enh).push(u)
  }
  for (const [e, list] of byEnh) {
    const limit = (typeof e === 'object' && e?.limit) || 1
    for (const u of list.slice(limit)) add('dupEnh', 'error', { uid: u.uid, params: { enh: u.enh } })
  }
  // The army-wide limit counts an Upgrade ONCE however many units carry it — the muster rules:
  // "the second and third instances of the same Upgrade do not count towards the total number of
  // enhancements in your army" (they still cost points, and still cap at `limit`, above). Three
  // Land Speeders with Nightforged Battery and three with Thundercowl Turbines are two slots, not
  // six; eight tournament lists at v946 said so before the count did (2026-09-19).
  if (detachments.length) {
    const seenUpgrades = new Set()
    let counted = 0
    for (const u of enhUnits) {
      const e = findEnhancement(detachments, u.enh, u.enhDet)
      if (!e || e.uncounted) continue
      if (e.type === 'upgrade') {
        if (seenUpgrades.has(e)) continue
        seenUpgrades.add(e)
      }
      counted++
    }
    if (counted > battle.enhLimit) add('overEnhLimit', 'error', { params: { count: counted, limit: battle.enhLimit } })
  }
  for (const u of enhUnits) {
    if (!detachments.length) { add('enhNoDetachment', 'error', { uid: u.uid }); continue }
    const e = findEnhancement(detachments, u.enh, u.enhDet)
    const def = defOf(u.id)
    // Asked about the ENTRY, not the printed datasheet — the same question enhOptionsFor answers
    // when the editor offers the enhancement in the first place, through the same helper so the two
    // cannot drift. An allegiance upgrade can hand a vehicle CHARACTER (Solar Spearhead, Steel
    // Hammer), and a detachment rule can hand a Kill Rig WAGON; either is exactly what lets the unit
    // carry the enhancement. Reading only `def` here made the editor offer Honoured Fallen to a
    // Telemon Dreadnought and the validator call the same list illegal.
    const granted = grantedKeywords(def, u, detachments)
    if (!e || (def && !enhEligible(e, def, granted))) add('enhIneligible', 'error', { uid: u.uid, params: { enh: u.enh } })
  }

  // "No unit (including ATTACHED units) can have more than one enhancement" (core rules, Muster —
  // src/data/muster.js). Every check above asks about one entry; an attached unit is several
  // entries that fight as a single unit, so a Leader with an enhancement joining a bodyguard unit
  // whose other Leader also has one breaks the rule without any single entry being wrong. Grouped
  // by the unit that is actually on the table: the attach target, or the entry itself.
  {
    const byUnit = new Map()
    for (const u of enhUnits) {
      const host = u.leaderOf || u.uid
      if (!byUnit.has(host)) byUnit.set(host, [])
      byUnit.get(host).push(u)
    }
    for (const list of byUnit.values()) {
      // Flag the extras, not the whole group — the same shape dupEnh uses, so the issue points at
      // an entry the reader can act on rather than at every part of the attached unit.
      for (const u of list.slice(1)) add('enhAttachedDup', 'error', { uid: u.uid, params: { enh: u.enh } })
    }
  }

  // Leader attachments must point at a unit in the roster that this leader can actually join.
  for (const u of units) {
    if (!u.leaderOf) continue
    const def = defOf(u.id)
    const target = units.find((x) => x.uid === u.leaderOf)
    // leadTypeFor, not def.leads: an enhancement can grant an attach the datasheet doesn't list,
    // and a datasheet can name its targets by KEYWORD rather than by name — which is the only way
    // an allied leader can join anything in the army it was lent to.
    const type = target ? leadTypeFor(def, u, defOf(target.id), detachments, armySids) : null
    if (!type) {
      add('leaderTargetInvalid', 'warn', { uid: u.uid, params: { target: (target && nameOf(target.uid)) || '—' } })
    } else if (type === 'join' && target && !joinLedBy(def, target, units, defOf, u.uid)) {
      // Joined to a unit its character has since left: the rule allows the join only while a
      // character it names leads that unit ("…one other unit … that is being led by a Cryptek").
      const by = [...new Set((def?.joins?.by || []).map((id) => defOf(id)?.name || id))]
      add('joinNotLed', 'warn', { uid: u.uid, params: { target: nameOf(target.uid) || '—', names: by.join(', ') } })
    }
  }

  // "Each support unit in your roster must be attached to a bodyguard unit" (core 25.04). A Leader
  // may stand alone; a Support unit may not — a list with one on its own is not a legal list.
  for (const u of units) {
    if (!u.leaderOf && isSupportUnit(defOf(u.id))) add('supportUnattached', 'error', { uid: u.uid })
  }

  // A Bodyguard unit takes one Leader AND one Support at a time (the two are independent slots —
  // see rosterEngine.js leaderTargetsFor), so group by (target, type) rather than target alone.
  // The picker already disables an occupied target of the same type; this catches it anyway for
  // data that predates that guard (or a detachment swap that left two of the same type attached).
  {
    /** @type {Map<string, RosterEntry[]>} */
    const byTarget = new Map()
    for (const u of units) {
      if (!u.leaderOf) continue
      let hosted = byTarget.get(u.leaderOf)
      if (!hosted) byTarget.set(u.leaderOf, (hosted = []))
      hosted.push(u)
    }
    const flagged = new Set()
    /** @param {RosterEntry} u @param {string} host */
    const tooMany = (u, host) => {
      if (flagged.has(u.uid)) return
      flagged.add(u.uid)
      add('manyLeaders', 'error', { uid: u.uid, params: { target: nameOf(host) || '—' } })
    }
    for (const [uid, list] of byTarget) {
      const host = units.find((x) => x.uid === uid)
      const hostDef = defOf(host?.id)
      // How many the HOST may hold: one of each type, unless its own datasheet says otherwise —
      // an Astra Militarum squad takes two Leaders as long as only one is a Command Squad, Kroot
      // Carnivores take two once twenty strong (`hosts`, see hostLimitsFor).
      const lim = hostLimitsFor(hostDef, host)
      const slots = new Map()
      // Joining units hold no Leader or Support slot; one of each excluding set (`joins.one`).
      const joined = list.filter((u) => defOf(u.id)?.joins)
      joined.forEach((u, k) => { if (joined.slice(0, k).some((o) => joinsClash(defOf(u.id), defOf(o.id)))) tooMany(u, uid) })
      for (const u of list) {
        const own = defOf(u.id)
        if (own?.joins) continue
        const type = leadTypeFor(own, u, hostDef, detachments, armySids) || ''
        // …and a leader that takes no slot at all (`flags.alongside`, see leaderOccupies): the
        // Death Guard characters join a Plague Marines unit that already has a Leader, and only a
        // second copy of the SAME one is barred — which is what keying them by their own id leaves.
        // A Legends Leader that names whom it joins beside (`along`) is free only beside them.
        const free = !!own?.flags?.alongside || list.some((o) => o !== u && joinsAlongside(own, defOf(o.id)))
        const key = free ? `${type}:${u.id}` : type
        if (!slots.has(key)) slots.set(key, { type, own: free, list: [] })
        slots.get(key).list.push(u)
      }
      for (const slot of slots.values()) {
        const max = slot.own ? 1 : (slot.type === 'leader' ? lim.leader : lim.support)
        for (const u of slot.list.slice(max)) tooMany(u, uid)
      }
      // The mix the datasheet limits, where it does: "provided no more than one of those units is
      // a COMMAND SQUAD unit", "provided those Leaders are not duplicates".
      const { oneKw } = lim
      if (oneKw) {
        const named = list.filter((u) => { const d = defOf(u.id); return d && hasKeyword(d, oneKw) })
        for (const u of named.slice(1)) tooMany(u, uid)
      }
      if (lim.noDup) {
        const seen = new Set()
        for (const u of list) { if (seen.has(u.id)) tooMany(u, uid); seen.add(u.id) }
      }
    }
  }

  // Allies. Every limit here is appdata's own (see the generator's Allies section): which
  // Detachment unlocks the group, how many units of a keyword each battle size allows, and what
  // their combined points may reach. What is NOT in the data is the sentence every cross-faction
  // allied rule ends with — "None of these models can be your WARLORD, and they cannot be given
  // Enhancements" — so those two are applied to cross-faction groups only. In-bundle groups don't
  // get them: Aeldari's Harlequins rule has no such clause, and Ynnari units are precisely what
  // the Devoted of Ynnead Detachment's Enhancements exist for.
  if (faction?.allies?.length) {
    const active = allyGroupsFor(faction, detachments)
    const activeKeys = new Set(active.map((g) => g.key))
    const size = battle.base || battle.id
    /** @type {Map<string, RosterEntry[]>} group key -> entries counting against it */
    const byGroup = new Map()
    for (const u of units) {
      const groups = allyGroupsOf(faction, u.id)
      if (!groups.length) continue
      const mine = groups.find((g) => activeKeys.has(g.key))
      if (!mine) {
        // Listed as an ally, but no group that offers it is open — the Detachment that unlocks it
        // isn't selected. The unit is in the list and priced; it just can't legally be there.
        const dets = [...new Set(groups.flatMap((g) => g.dets || []))]
        add('allyLocked', 'error', { uid: u.uid, params: { dets: dets.join(', ') } })
        continue
      }
      let counted = byGroup.get(mine.key)
      if (!counted) byGroup.set(mine.key, (counted = []))
      counted.push(u)
    }
    for (const g of active) {
      const list = byGroup.get(g.key) || []
      if (!list.length) continue
      const cross = list.filter((u) => allySourceOf(u.id))
      // Points ceiling for the group ("Up to 500 pts" at Strike Force), counted the same way the
      // army total is — brackets, wargear, copy tax — so the two numbers can't disagree.
      const limit = g.pts?.[size]
      if (limit != null) {
        const spent = rosterPoints(list, defOf, detachments)
        if (spent > limit) add('allyOverPoints', 'error', { params: { group: g.name, points: spent, limit } })
      }
      // Per-keyword counts. `mutex` marks the either/or rule the Knight and Titan groups are
      // written with ("either one TITANIC model or up to three ARMIGER models"), so using two of
      // the keywords at once is itself the violation, on top of each one's own cap.
      const used = []
      for (const [kw, bySize] of Object.entries(g.lim || {})) {
        const cap = bySize[size]
        if (cap == null) continue
        // A unit a slotless rule frees does not count against the cap (`free`, generator): each
        // unit in the ARMY carrying every donor keyword — an Inquisitor — frees one ally carrying
        // the receiver keywords — an Inquisitorial Agents unit. Until 2026-10-03 it counted, and a
        // legal Inquisitor + Agents + two Retinue read as one Retinue over.
        /** @param {string[]} ks @returns {(u: RosterEntry) => boolean} */
        const all = (ks) => (u) => ks.every((k) => hasKeyword(defOf(u.id), k))
        let freed = 0
        for (const f of (g.free || []).filter((x) => x.kw === kw)) {
          freed += Math.min(units.filter(all(f.donor)).length, list.filter(all(f.recv)).filter((u) => hasKeyword(defOf(u.id), kw)).length)
        }
        const n = list.filter((u) => hasKeyword(defOf(u.id), kw)).length - freed
        if (n) used.push(kw)
        if (n > cap) add('allyOverLimit', 'error', { params: { group: g.name, kw, count: n, limit: cap } })
      }
      if (g.mutex && used.length > 1) add('allyMutex', 'error', { params: { group: g.name, kws: used.join(', ') } })
      // Daemonic Pact: per keyword, the allies WITHOUT Battleline may not outnumber those with it
      // ("the number of non-BATTLELINE units with that keyword … cannot be greater than the number
      // of BATTLELINE units with that keyword"). `ratio` is read from that sentence by the
      // generator; until 2026-10-09 nothing counted it (a player's report).
      for (const kw of g.ratio || []) {
        const withKw = list.filter((u) => hasKeyword(defOf(u.id), kw))
        const line = withKw.filter((u) => {
          const def = defOf(u.id)
          return hasKeyword(def, 'Battleline') || isBattlelineNow(def, faction ? grantedKeywordsFor(def, detachments).map((x) => x.kw) : null)
        }).length
        const other = withKw.length - line
        if (other > line) add('allyRatio', 'error', { params: { group: g.name, kw, count: other, limit: line } })
      }
      if (!cross.length) continue
      for (const u of cross) {
        const bars = allyBars(faction, u.id, detachments)
        if (u.warlord && bars?.warlord) add('allyWarlord', 'error', { uid: u.uid })
        if (u.enh && bars?.enh) add('allyEnh', 'error', { uid: u.uid, params: { enh: u.enh } })
      }
    }
  }

  // Units a datasheet says the army cannot hold beside it — "If your army includes YVRAINE, it
  // cannot include any EPIC HERO units (excluding YNNARI units)", Commander Farsight and every
  // ETHEREAL. Reported on the unit that is barred, naming the one that bars it; once per pair.
  {
    const barred = new Set()
    const has = (/** @type {RosterUnit} */ d, /** @type {string} */ kw) => hasKeyword(d, kw) || (d.fkws || []).some((k) => k.toLowerCase() === kw.toLowerCase())
    for (const u of units) {
      const def = defOf(u.id)
      for (const ex of def?.excludes || []) {
        for (const v of units) {
          const other = defOf(v.id)
          if (v === u || !other || barred.has(`${u.uid}|${v.uid}`)) continue
          if (!ex.kws.some((k) => has(other, k)) || (ex.except || []).some((k) => has(other, k))) continue
          barred.add(`${u.uid}|${v.uid}`).add(`${v.uid}|${u.uid}`)
          add('armyExcludes', 'error', { uid: v.uid, params: { other: nameOf(u.uid) || def?.name || u.id } })
        }
      }
    }
  }

  // Detachment-excluded datasheets (union across the selected detachments).
  const excl = new Set(detachments.flatMap((d) => d.excludedUnits || []))
  if (excl.size) {
    for (const u of units) if (excl.has(u.id)) add('unitExcluded', 'error', { uid: u.uid })
  }

  const errorCount = issues.filter((i) => i.level === 'error').length
  return { points, issues, errorCount }
}
