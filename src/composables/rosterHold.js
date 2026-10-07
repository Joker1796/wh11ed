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
import { optionItems, modelsPerMini, swapRoom } from './rosterEngine.js'
import { loadoutItemCopies } from './rosterModifiers.js'

// Whether group `gi` is drawn this way: a per-model stepper whose options are single items, among
// them every item it replaces — so the rows ARE the profile's whole loadout for that slot, and
// their counts add up to its model count. Left out, each for a reason that would make the counts
// wrong rather than merely awkward: a cap or a unit-wide group (the rows would not cover every
// model), copies per model or a "replace all" checkbox (a model is not one row), a kept item, an
// option of several items or several copies, a stock item printed more than once per model or per
// profile, a priced option among the stock ones (rewriting the group would charge the models that
// never changed), and another group of the same profile that replaces or hands out these items
// (the stock rule would share them between two drawings).
export function holdGroup(def, gi) {
  const g = def?.gear?.[gi]
  if (!g || g.in !== 'stepper' || !g.rep?.length) return false
  if (g.all || g.cp || g.repall || g.lim || g.keep?.length) return false
  const its = (g.o || []).map((o) => optionItems(o))
  if (its.some((x) => x.length !== 1 || x[0][1] !== 1)) return false
  const ids = its.map((x) => x[0][0])
  if (!g.rep.every((id) => ids.includes(id))) return false
  if ((g.o || []).some((o, oi) => o[1] && g.rep.includes(ids[oi]))) return false
  const m = g.m ?? 0
  // Printed on every model once, or as the profile's share ("2 Havocs are equipped with") — never
  // twice on one model. Whether the shares add up to the model count is holdCounts' to check.
  const stock = new Map((def.defaults || []).find(([dm]) => dm === m)?.[1].map(([id, c, total]) => [id, [c, total]]) || [])
  if (!g.rep.every((id) => stock.has(id) && (stock.get(id)[1] || stock.get(id)[0] === 1))) return false
  return !def.gear.some((h, hi) => hi !== gi && (h.all || (h.m ?? 0) === m) && (
    h.rep?.some((id) => ids.includes(id)) || (h.o || []).some((o) => optionItems(o).some(([id]) => ids.includes(id)))
  ))
}

// How many models of the group's profile carry each option's item now, by option index — the
// stock models included. null where the rows do not add up to the profile's models — the engine
// cannot count it (a profile of unknown size), or the size printed fewer stock weapons than models
// — and the editor then keeps the plain swap steppers for that group.
export function holdCounts(def, entry, gi) {
  const g = def.gear[gi]
  const m = g.m ?? 0
  const copies = loadoutItemCopies(def, entry)
  const models = modelsPerMini(def, entry)?.get(m)
  if (!copies || !models) return null
  const counts = g.o.map((o) => (copies.get(optionItems(o)[0][0]) || [])
    .filter((sl) => sl.m === m)
    .reduce((s, sl) => (s == null || sl.n == null ? null : s + sl.n), 0))
  return counts.some((n) => n == null) || counts.reduce((a, b) => a + b, 0) !== models ? null : counts
}

// The entry's `wg` with group `gi` set so that its rows hold `counts` (by option index, adding up
// to the profile's model count). The stock loadout is no swaps at all; anything else swaps EVERY
// model of the profile, each to what it should hold — the engine then has no choice of which stock
// weapon a swap gives up (with "autocannon or lascannon" it would pick for us, and could pick the
// one the player meant to keep).
export function holdWg(def, entry, gi, counts) {
  const rest = (entry.wg || []).filter(([g]) => g !== gi)
  const stock = holdCounts(def, { ...entry, wg: rest }, gi)
  if (!stock || stock.every((n, oi) => n === counts[oi])) return rest
  return [...rest, ...counts.flatMap((n, oi) => (n > 0 ? [[gi, oi, n]] : []))]
}

// The stock row of any other stepper that replaces something: how many models in the group's
// scope still carry what it replaces — after every group's picks, its own included. Two groups
// that replace the same weapon (Vanguard Veterans' bolt pistol → a storm shield, or → one of four
// pistols) show the same number, because it is the same pistols. The engine's stock rule already
// knows it: swapRoom is what the OTHER groups left this one. null where that cannot be said (a
// per-copy group, an unknown split between profiles), and the editor then draws no stock row.
export function stockLeft(def, entry, gi) {
  const g = def?.gear?.[gi]
  if (!g?.rep?.length || g.keep?.length) return null
  const room = swapRoom(def, entry, gi)
  if (room == null) return null
  // A pick whose option hands back everything the group gives up ("Flamer + Combi-bolter", the
  // Chaos Bikers' additions) leaves the model holding its stock weapon, so it is not counted off.
  const backs = (oi) => { const got = new Set(optionItems(g.o?.[oi]).map(([id]) => id)); return g.rep.every((id) => got.has(id)) }
  const spent = (entry?.wg || []).filter(([x, oi]) => x === gi && !backs(oi)).reduce((n, [, , c]) => n + (c || 1), 0)
  return Math.max(0, room - spent)
}
