import rosterItemsData from '../data/roster/items.js'
import { infoKey } from '../core/shared/foldName.js'
import { weaponBase } from '../core/rules/weaponGroups.js'

// What a wargear option's info button looks up on a datasheet: the item's name, the way the
// sheet's rows are named. The two are written apart — items.js from appdata's wargear_item names,
// the sheets transcribed — and they part in three ways, each of which left the info window empty
// (a player's report, 2026-10-19: "Gun drone has no description"):
//   - the item stands for a weapon of another name: a Gun Drone IS the twin pulse carbine, and
//     the sheet carries only the carbine (items.js `stands`, the same table rosterModifiers.js
//     reads to attribute that row);
//   - the app's name carries the use limit the sheet puts in the rule: "Drakolithe (Once per
//     battle, per token)" against "Drakolithe";
//   - a hyphen against a space: "Nuncio-acquila" against "Nuncio Aquila".
// A Faction Pack item may also be named in the plural the option uses ("Missile drones").
// src/composables/wargearInfo.test.js holds every option of every unit to finding something.

// The comparison key itself (folded, no trailing use limit, a hyphen read as a space) is the core's:
// the `.ros` export matches items to rows the same way.
export { infoKey }

const STANDS = new Map(Object.entries(rosterItemsData.stands || {}).map(([k, v]) => [infoKey(k), v]))

// An item name appdata misspells against its own rule text, by key: the Arbites' "Nuncio-acquila"
// is "Nuncio‐aquila" in the rule it carries and on the sheet. wargearInfo.test.js fails once
// appdata spells it right, so the entry goes when the typo does.
export const MISSPELT = { 'nuncio acquila': 'nuncio aquila' }

/** The key, corrected for a known misspelling. */
export const ruleKey = (name) => {
  const k = infoKey(name)
  return MISSPELT[k] || k
}

/** Every key the given item names may be found under on a sheet. @param {string[]} names */
export function infoKeys(names) {
  const keys = new Set()
  for (const n of names || []) {
    const k = ruleKey(n)
    if (!k) continue
    keys.add(k)
    for (const form of [k, k.replace(/s$/, '')]) for (const w of STANDS.get(form) || []) keys.add(infoKey(w))
  }
  return keys
}

/** A weapon row answers to its base name ("Plasma pistol – standard" → "plasma pistol"). */
export const weaponKey = (w) => infoKey(weaponBase(w?.name))
/** An ability row answers to its name. */
export const abilityKey = (a) => infoKey(a?.name)

// The lists an item's rule may sit in. wargearAbilities first: an item's own rule is the common
// non-weapon case (Resurrection Orb); the others in case it shares its name with one of the unit's.
export const ABILITY_LISTS = ['wargearAbilities', 'abilities', 'specialAbilities']

/**
 * Whether the sheet shows anything for these names — a weapon row or an ability.
 * @param {any} sheet @param {Set<string>} keys
 */
export function sheetHas(sheet, keys) {
  return [...(sheet?.ranged || []), ...(sheet?.melee || [])].some((w) => keys.has(weaponKey(w)))
    || ABILITY_LISTS.some((l) => (sheet?.[l] || []).some((a) => keys.has(abilityKey(a))))
}
