// @ts-check
// One unit's rules, worked out the one way. Two screens read a unit's numbers — its card
// (src/composables/rosterUnitCard.js: the modal, the print sheet) and its row in the roster screen's
// list (RosterViewView's plates) — and they must never disagree: until 2026-10-26 each assembled
// this sequence itself, the row leaving out the keywords the list's detachments grant (Darkflight
// Pursuit's IGNORES COVER, Contagion Engines' ASSAULT never reached a row) and taking the records
// in another order. Now both call these two functions; only where their game state comes from
// differs, by design (the card is handed it, the screen reads its game).
//
// The sequence, and why in this order: the keywords the unit's records GRANT are resolved first —
// a granted keyword decides which rules bear on the unit at all (Necrons' Destroyer Ankh gives its
// bearer DESTROYER CULT, and only then does Cold Fervour reach that Overlord); then the stratagems
// this unit could never be the target of come off the list; then the stat pass, after the models
// that carry an item get a row of their own (splitBearers).
import { grantedKeywordsFrom, gateStratagems, splitBearers, applyStatMods } from './rosterStatMods.js'

/** @typedef {import('../shared/roster.types.js').ModEntry} ModEntry */
/** @typedef {import('../shared/roster.types.js').PrintedSheet} PrintedSheet */
/** @typedef {import('../shared/roster.types.js').RosterUnit} RosterUnit */
/** @typedef {import('../shared/roster.types.js').RosterEntry} RosterEntry */
/** @typedef {Set<string> | null | undefined} IdSet */

/**
 * What every rule of a list is read against, the same for each of its units.
 * @typedef {object} RuleWorld
 * @property {string[][]} factionKeywordSets every datasheet's keywords in the faction (ruleTargets' "matched nobody" escape)
 * @property {string[]} vocabulary every keyword any unit in the game carries (ruleTargets' scopesMisread)
 */

/**
 * One unit's side of it.
 * @typedef {object} UnitRuleInput
 * @property {{ core: ModEntry[], attached: ModEntry[], faction: ModEntry[] }} records the Core Rules' own, the
 *   attached unit's datasheet abilities, the faction's (army rule, detachments, enhancements) — taken in this order
 * @property {string[]} printed the keywords the unit's sheet prints
 * @property {string[]} granted what the list grants it on top: a detachment's grant, an allegiance it chose
 * @property {string[]} attached the printed keywords of the rest of its Attached unit (Core Rules 19.03)
 * @property {IdSet} active the conditions proven true
 * @property {IdSet} chosen the records the player names: stratagems spent, options picked, uses ticked
 * @property {boolean} [listKnows] false for a preview with no roster entry (gateStratagems)
 */

/**
 * @param {RuleWorld} world
 * @param {UnitRuleInput} input
 */
export function unitRules(world, input) {
  // Without the vocabulary a rule that names another faction's units would be distrusted and spread
  // wider — different numbers with no error. So it is required, loudly.
  if (!Array.isArray(world?.vocabulary)) throw new Error('unitRules: the keyword vocabulary is required')
  const records = [...input.records.core, ...input.records.attached, ...input.records.faction]
  const base = [...input.printed, ...input.granted]
  const fromRecords = grantedKeywordsFrom(records, { own: base, unit: [...base, ...input.attached] }, world.factionKeywordSets, input.active, input.chosen, world.vocabulary)
  const own = [...base, ...fromRecords.map((g) => g.kw)]
  const keywords = { own, unit: [...own, ...input.attached] }
  const gated = gateStratagems(records, keywords, world.factionKeywordSets, input.active, input.listKnows ?? true, world.vocabulary)
  return { records, fromRecords, keywords, gated }
}

/**
 * The sheet as these rules leave it: rewritten numbers, marks and the notes under them.
 * @param {PrintedSheet | null | undefined} sheet
 * @param {ReturnType<typeof unitRules>} rules
 * @param {RuleWorld} world
 * @param {UnitRuleInput} input
 * @param {{ def: RosterUnit | null | undefined, entry: Partial<RosterEntry> | null | undefined, items: Record<number, string> | null | undefined }} unit
 */
export function unitStatMods(sheet, rules, world, input, { def, entry, items }) {
  if (!rules.gated.length) return { sheet, notes: [], marks: [] }
  // "The bearer only": the models that carry the item get a row of their own first.
  const placed = splitBearers(sheet, rules.gated, def, entry, items)
  return applyStatMods(placed.sheet, placed.entries, rules.keywords, world.factionKeywordSets, input.active, input.chosen, world.vocabulary)
}
