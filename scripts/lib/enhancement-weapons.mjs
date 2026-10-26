// The weapons an enhancement GIVES its bearer ("This model has the following weapon:"), read from
// appdata. appdata keeps the profile in `enhancement_wargear_item_profile` and nowhere in the
// enhancement's text, which stops at the colon; the faction page prints it as prose
// (data/factions/extras). On the card a player had to scroll to the enhancement to remember the
// bearer had a sword at all (a player's report, 2026-10-08), so the rows stand among the bearer's
// own weapons: gen-roster-data writes them onto the enhancement as `weapons`.
//
// A tag on those weapons that is no Core Rules ability ([BLINDING LIGHT] on the Auriferous Orb)
// carries its text here, the one place it exists outside appdata — gen-enhancement-weapons writes
// it to src/data/enhancementWeapons.js (`abilities`) so a tap on it opens something
// (scripts/lib/own-abilities.mjs; the Russian is src/data/enhancementWeaponsRu.js).
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, table, nameOfEn, groupBy } from './sync-common.mjs'
import { baseTag } from '../../src/core/rules/weaponTag.js'

/** @returns {Promise<{ byEnhancement: Map<string, { melee: object[], ranged: object[] }>, abilities: Record<string, string> }>} */
export async function readEnhancementWeapons() {
  const profiles = new Map(table('wargear_item_profile.json').map((p) => [p.id, p]))
  const abilityRows = new Map(table('wargear_ability.json').map((a) => [a.id, a]))
  const abilityNames = new Map([...abilityRows].map(([id, a]) => [id, nameOfEn(a)]))
  const reference = await import(pathToFileURL(path.join(ROOT, 'src/data/reference.js')).href)
  const coreNames = new Set(reference.coreAbilities.en.map((a) => a.name.replace(/^\[|\]$/g, '').toUpperCase()))
  const abilitiesOf = groupBy(table('wargear_item_profile_wargear_ability.json'), 'wargearItemProfileId')

  /** @type {Record<string, string>} */
  const own = {}
  const byEnhancement = new Map()
  for (const row of table('enhancement_wargear_item_profile.json')) {
    const p = profiles.get(row.wargearItemProfileId)
    if (!p) continue
    const melee = p.type === 'melee'
    const tags = [...(abilitiesOf.get(p.id) || [])]
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      .map((r) => abilityNames.get(r.wargearAbilityId))
      .filter(Boolean)
    for (const r of abilitiesOf.get(p.id) || []) {
      const a = abilityRows.get(r.wargearAbilityId)
      const name = a && nameOfEn(a)
      const text = a?.localisations?.en?.rules
      if (name && text && !coreNames.has(baseTag(name))) {
        own[name.toUpperCase()] = text.replace(/<\/?b>/g, '**').replace(/<\/?i>/g, '').trim()
      }
    }
    const weapon = {
      name: nameOfEn(p),
      tags,
      ...(melee ? {} : { range: p.range }),
      a: p.attacks,
      [melee ? 'ws' : 'bs']: melee ? p.weaponSkill : p.ballisticSkill,
      s: p.strength,
      ap: p.armourPenetration,
      d: p.damage,
    }
    if (!byEnhancement.has(row.enhancementId)) byEnhancement.set(row.enhancementId, { melee: [], ranged: [] })
    byEnhancement.get(row.enhancementId)[melee ? 'melee' : 'ranged'].push(weapon)
  }
  return { byEnhancement, abilities: Object.fromEntries(Object.entries(own).sort()) }
}
