// @ts-check
// Swap groups drawn as WHAT THE MODELS HOLD rather than as how many swaps were made.
//
// A stepper counts models that took an option. Where the group's own options include the weapons
// it replaces, that number lies about the unit: Havocs "can each have their Havoc autocannon or
// Havoc lascannon replaced with" a list holding both, so "Havoc autocannon 2" over two stock
// autocannons is four — and a player read the 2 as the ceiling (bug report 2026-10-07). Such a
// group is drawn as the models' loadout instead: every row says how many models carry that weapon
// now, the stock ones included, and a change is "take one off, put another on" (UnitEditorFields).
//
// Only the drawing changes. The entry still stores swaps (`wg`), so points, the stock rule,
// validation, export and the game card read it as before; holdWg is the one translation from
// "who holds what" back to swaps, and rosterHold.test.js walks every distribution of every group
// this applies to through the engine and back.
import { optionItems, modelsPerMini, swapRoom, swapRoomByItem } from '../core/roster/rosterEngine.js'
import { loadoutItemCopies, sumKnown } from '../core/rules/rosterModifiers.js'

/** @typedef {import('../core/shared/roster.types.js').RosterUnit} RosterUnit */
/** @typedef {import('../core/shared/roster.types.js').RosterEntry} RosterEntry */
/** @typedef {import('../core/shared/roster.types.js').WargearPick} WargearPick */
/** @typedef {import('../core/shared/roster.types.js').ItemId} ItemId */
/** @typedef {Partial<RosterEntry>} EntryLike */

// Whether group `gi` is drawn this way: a per-model stepper whose options are single items, among
// them every item it replaces — so the rows ARE the profile's whole loadout for that slot, and
// their counts add up to its model count. Left out, each for a reason that would make the counts
// wrong rather than merely awkward: a cap or a unit-wide group (the rows would not cover every
// model), copies per model or a "replace all" checkbox (a model is not one row), a kept item, an
// option of several items or several copies, a stock item printed more than once per model or per
// profile, a priced option among the stock ones (rewriting the group would charge the models that
// never changed), and another group of the same profile that replaces or hands out these items
// (the stock rule would share them between two drawings).
/**
 * @param {RosterUnit | null | undefined} def
 * @param {number} gi
 * @returns {boolean}
 */
export function holdGroup(def, gi) {
  const gear = def?.gear || []
  const g = gear[gi]
  if (!g || g.in !== 'stepper' || !g.rep?.length) return false
  const rep = g.rep
  if (g.all || g.cp || g.repall || g.lim || g.keep?.length) return false
  const its = (g.o || []).map((o) => optionItems(o))
  if (its.some((x) => x.length !== 1 || x[0][1] !== 1)) return false
  const ids = its.map((x) => x[0][0])
  if (!rep.every((id) => ids.includes(id))) return false
  if ((g.o || []).some((o, oi) => o[1] && rep.includes(ids[oi]))) return false
  const m = g.m ?? 0
  // Printed on every model once, or as the profile's share ("2 Havocs are equipped with") — never
  // twice on one model. Whether the shares add up to the model count is holdCounts' to check.
  const stock = new Map((def?.defaults || []).find(([dm]) => dm === m)?.[1].map(([id, c, total]) => [id, [c, total]]) || [])
  if (!rep.every((id) => { const st = stock.get(id); return !!st && (st[1] || st[0] === 1) })) return false
  return !gear.some((h, hi) => hi !== gi && (h.all || (h.m ?? 0) === m) && (
    h.rep?.some((id) => ids.includes(id)) || (h.o || []).some((o) => optionItems(o).some(([id]) => ids.includes(id)))
  ))
}

// How many models of the group's profile carry each option's item now, by option index — the
// stock models included. null where the rows do not add up to the profile's models — the engine
// cannot count it (a profile of unknown size), or the size printed fewer stock weapons than models
// — and the editor then keeps the plain swap steppers for that group.
/**
 * @param {RosterUnit} def
 * @param {EntryLike} entry
 * @param {number} gi
 * @returns {number[] | null}
 */
export function holdCounts(def, entry, gi) {
  const g = def.gear?.[gi]
  if (!g) return null
  const m = g.m ?? 0
  const copies = loadoutItemCopies(def, entry)
  const models = modelsPerMini(def, entry)?.get(m)
  if (!copies || !models) return null
  // Per option, how many models of the profile hold its item — all known, or no answer.
  const counts = []
  for (const o of g.o) {
    const n = sumKnown((copies.get(optionItems(o)[0][0]) || []).filter((sl) => sl.m === m).map((sl) => sl.n))
    if (n == null) return null
    counts.push(n)
  }
  return counts.reduce((a, b) => a + b, 0) === models ? counts : null
}

// The entry's `wg` with group `gi` set so that its rows hold `counts` (by option index, adding up
// to the profile's model count). The stock loadout is no swaps at all; anything else swaps EVERY
// model of the profile, each to what it should hold — the engine then has no choice of which stock
// weapon a swap gives up (with "autocannon or lascannon" it would pick for us, and could pick the
// one the player meant to keep).
/**
 * @param {RosterUnit} def
 * @param {EntryLike} entry
 * @param {number} gi
 * @param {number[]} counts
 * @returns {WargearPick[]}
 */
export function holdWg(def, entry, gi, counts) {
  const rest = (entry.wg || []).filter(([g]) => g !== gi)
  const stock = holdCounts(def, { ...entry, wg: rest }, gi)
  if (!stock || stock.every((n, oi) => n === counts[oi])) return rest
  /** @type {WargearPick[]} */
  const out = [...rest]
  for (const [oi, n] of counts.entries()) if (n > 0) out.push([gi, oi, n])
  return out
}

// The stock row of any other stepper that replaces something: how many models in the group's
// scope still carry what it replaces — after every group's picks, its own included. Two groups
// that replace the same weapon (Vanguard Veterans' bolt pistol → a storm shield, or → one of four
// pistols) show the same number, because it is the same pistols. The engine's stock rule already
// knows it: swapRoom is what the OTHER groups left this one. null where that cannot be said (a
// per-copy group, an unknown split between profiles), and the editor then draws no stock row.
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {number | null}
 */
export function stockLeft(def, entry, gi) {
  const g = def?.gear?.[gi]
  if (!g?.rep?.length || g.keep?.length) return null
  const rep = g.rep
  const room = swapRoom(def, entry, gi)
  if (room == null) return null
  // A pick whose option hands back everything the group gives up ("Flamer + Combi-bolter", the
  // Chaos Bikers' additions) leaves the model holding its stock weapon, so it is not counted off.
  /** @param {number} oi */
  const backs = (oi) => { const got = new Set(optionItems(g.o?.[oi]).map(([id]) => id)); return rep.every((id) => got.has(id)) }
  const spent = (entry?.wg || []).filter(([x, oi]) => x === gi && !backs(oi)).reduce((n, [, , c]) => n + (c || 1), 0)
  return Math.max(0, room - spent)
}

// The same row item by item, where the group's options do not all need the same items. The
// Deathwatch Terminators trade "power fist and storm bolter" for "storm bolter and chainfist" or
// "thunder hammer and storm shield": the first hands the storm bolter back, so it needs only the
// fist. With three storm bolters gone to plasma cannons, stockLeft — every item at once — read
// "Power Fist + Storm Bolter 0" while "+" on the chainfist still worked, and a player read the 0 as
// a ban (2026-10-21). Here every item the group replaces has its own count: the models still
// carrying it (swapRoomByItem, after the other groups) less this group's picks that give it up —
// "Power Fist 3 · Storm Bolter 0". null where the options all need the same items (stockLeft's one
// number says it), and where an item is not one per model and a pick: an "X or Y" group (a pick
// spends one of the two, which one is the ledger's choice) and one copy of several (`cp`, `rc`).
/**
 * @param {RosterUnit | null | undefined} def
 * @param {EntryLike | null | undefined} entry
 * @param {number} gi
 * @returns {Array<[ItemId, number]> | null}
 */
export function stockByItem(def, entry, gi) {
  const g = def?.gear?.[gi]
  if (!g?.rep || g.rep.length < 2 || g.keep?.length || g.alt || g.cp || g.rc) return null
  const rep = g.rep
  // What each option gives up: what the group replaces less what the option hands back.
  const gives = (g.o || []).map((o) => { const got = new Set(optionItems(o).map(([id]) => id)); return rep.filter((id) => !got.has(id)) })
  if (new Set(gives.filter((x) => x.length).map((x) => x.join())).size < 2) return null
  const byItem = swapRoomByItem(def, entry, gi)
  if (!byItem || rep.some((id) => byItem.get(id) == null)) return null
  const picks = (entry?.wg || []).filter(([x]) => x === gi)
  return rep.map((id) => {
    const spent = picks.filter(([, oi]) => gives[oi]?.includes(id)).reduce((n, [, , c]) => n + (c || 1), 0)
    return [id, Math.max(0, Math.floor((byItem.get(id) ?? 0) + 1e-9) - spent)]
  })
}
