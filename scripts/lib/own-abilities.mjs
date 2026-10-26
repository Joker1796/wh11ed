// The weapon abilities a tag can name that are NOT in the Core Rules — so a tag printed anywhere (the
// changelog, a faction FAQ, a rule's prose) opens their text, as a tag on the datasheet itself does.
//
// Two sources, both read from our own data:
//   1. a datasheet ability that explains a tag the sheet prints ([PSYCHIC ASSASSIN] on the Culexus
//      Assassin, [CONVERSION] on nine Chaos Knights) — by the tag's base name, EN and RU;
//   2. a definition written inside a faction rule: "[SUPA-HAZARDOUS]**:** Each time…";
//   3. an enhancement's weapon ability (enhancementWeapons.js `abilities` + enhancementWeaponsRu.js).
// One name with different texts keeps each text, with the units that print it, so a tap never shows
// another unit's version as if it were the only one.
//
// Built by scripts/gen-own-abilities.mjs into src/data/ownWeaponAbilities.js; the popover reads it
// after the Core Rules and the Event Companion glossary (useKeywordPopover.js). 2026-10-16.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { baseTag, sheetRuleForTag } from '../../src/utils/weaponTag.js'
import { foldChars } from '../../src/core/shared/foldName.js'

const imp = (p) => import(pathToFileURL(p).href)

export async function buildOwnAbilities(root) {
  const data = path.join(root, 'src/data')
  const { coreAbilities } = await imp(path.join(data, 'reference.js'))
  const { eventCompanion } = await imp(path.join(data, 'eventCompanion.js'))
  const { localizeSheet } = await imp(path.join(data, 'datasheets/ru/localize.js'))
  const bare = (n) => n.replace(/^\[|\]$/g, '').toUpperCase()
  const known = new Set([...coreAbilities.en, ...(eventCompanion.en.glossary || [])].map((a) => bare(a.name)))

  /** @type {Map<string, Map<string, { en: string, ru: string | null, units: Set<string> }>>} */
  const out = new Map()
  const add = (base, en, ru, unit) => {
    if (!out.has(base)) out.set(base, new Map())
    const variants = out.get(base)
    if (!variants.has(en)) variants.set(en, { en, ru: ru || null, units: new Set() })
    const v = variants.get(en)
    if (!v.ru && ru) v.ru = ru
    if (unit) v.units.add(unit)
  }

  // 1. Datasheets.
  const dsDir = path.join(data, 'datasheets')
  const slugs = fs.readdirSync(dsDir).filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js')).map((f) => f.slice(0, -3))
  const rulesOf = (s) => ['wargearAbilities', 'abilities', 'specialAbilities'].flatMap((k) => s[k] || [])
  for (const slug of slugs) {
    const en = (await imp(path.join(dsDir, `${slug}.js`))).default || []
    const ruPath = path.join(dsDir, 'ru', `${slug}.js`)
    const ru = fs.existsSync(ruPath) ? await imp(ruPath) : null
    for (const sheet of en) {
      for (const w of [...(sheet.ranged || []), ...(sheet.melee || [])]) {
        for (const tag of w.tags || []) {
          const base = baseTag(tag)
          if (known.has(base)) continue
          const own = sheetRuleForTag(tag, rulesOf(sheet))
          if (!own) continue
          const ruSheet = localizeSheet(sheet, ru?.default?.[sheet.id], ru?.abilityNamesRu)
          const ruOwn = sheetRuleForTag(tag, rulesOf(ruSheet))
          add(base, own.text, ruOwn && ruOwn.text !== own.text ? ruOwn.text : null, sheet.name)
        }
      }
    }
  }

  // 2. "[TAG]**:** text" inside a faction's rules, EN with the RU file's definition of the same tag.
  const strings = (v, acc = []) => {
    if (typeof v === 'string') acc.push(v)
    else if (Array.isArray(v)) v.forEach((x) => strings(x, acc))
    else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, acc))
    return acc
  }
  const defsIn = async (file) => {
    const found = new Map()
    if (!fs.existsSync(file)) return found
    for (const s of strings(await imp(file))) for (const [tag, text] of tagDefinitions(s)) if (!found.has(tag)) found.set(tag, text)
    return found
  }
  const facDir = path.join(data, 'factions')
  for (const f of fs.readdirSync(facDir).filter((x) => x.endsWith('.js') && x !== 'index.js' && !x.endsWith('.test.js'))) {
    const enDefs = await defsIn(path.join(facDir, f))
    if (!enDefs.size) continue
    const ruDefs = await defsIn(path.join(facDir, 'ru', f))
    for (const [tag, text] of enDefs) {
      const base = baseTag(tag)
      if (known.has(base)) continue
      add(base, text, ruDefs.get(tag) || null, null)
    }
  }

  // 3. An enhancement's weapon ([BLINDING LIGHT] on the Auriferous Orb): its text has no home in our
  // rules but enhancementWeapons.js (generated from appdata), the Russian beside it.
  const { abilities: enhEn = {} } = await imp(path.join(data, 'enhancementWeapons.js'))
  const { default: enhRu = {} } = await imp(path.join(data, 'enhancementWeaponsRu.js'))
  for (const [name, text] of Object.entries(enhEn)) {
    const base = baseTag(name)
    if (!known.has(base)) add(base, text, enhRu[name] || null, null)
  }

  return Object.fromEntries([...out].sort(([a], [b]) => a.localeCompare(b)).map(([base, variants]) => [
    base,
    [...variants.values()].map((v) => ({ en: v.en, ...(v.ru ? { ru: v.ru } : {}), ...(v.units.size ? { units: [...v.units].sort() } : {}) })),
  ]))
}

export function renderOwnAbilities(map) {
  return `// GENERATED by scripts/gen-own-abilities.mjs — do not edit. Weapon abilities a tag can name that are
// not in the Core Rules: a datasheet's own (by the tag it explains) and those a faction rule defines.
// Read by useKeywordPopover.js, so a tag anywhere opens them. Re-run after a datasheet or rule edit
// (src/data/ownWeaponAbilities.test.js fails when this file is stale).
export default ${JSON.stringify(map, null, 2)}
`
}

// "[TAG]**:** text" inside a faction's rules → [[tag, text], …]. The tag is read folded, so one
// typed with U+2011 is still a tag (proseReaders.test.js); the text is the original's.
const DEF = /\[([A-Z][A-Z0-9 '-]*)\]\*\*:\*\*\s*([^\n]+)/g
export function tagDefinitions(s) {
  return [...foldChars(s).matchAll(DEF)].map((m) => {
    const end = m.index + m[0].length
    return [m[1], s.slice(end - m[2].length, end).trim()]
  })
}
