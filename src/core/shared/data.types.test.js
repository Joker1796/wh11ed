// The data types (data.types.js) against the hand-authored files they describe: every key of every
// datasheet and every faction rules bundle must be a property of its typedef. A field added to the
// data and not to the type is one the checker would let code read as anything at all.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { typedefProps, inlineKeys } from '../../../scripts/lib/typedef-keys.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const DATA = path.join(HERE, '../../data')
const TYPES = fs.readFileSync(path.join(HERE, 'data.types.js'), 'utf8')
const ROSTER_TYPES = fs.readFileSync(path.join(HERE, './roster.types.js'), 'utf8')
const defs = new Map([...typedefProps(ROSTER_TYPES), ...typedefProps(TYPES)])
// One-line typedefs of an inline object type: `@typedef {{ name: string, text: string }} NamedText`.
for (const m of TYPES.matchAll(/@typedef \{(\{.*?\})\} (\w+)/g)) defs.set(m[2], new Map(inlineKeys(m[1]).map((k) => [k, ''])))

const keysOf = (name) => [...(defs.get(name)?.keys() || [])]
const inline = (owner, prop) => inlineKeys(defs.get(owner)?.get(prop) || '')

const jsFiles = (dir) => fs.readdirSync(dir).filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js'))
const sheetFiles = await Promise.all(jsFiles(path.join(DATA, 'datasheets')).map(async (f) => ({ f, mod: await import(path.join(DATA, 'datasheets', f)) })))
const ruleFiles = await Promise.all(jsFiles(path.join(DATA, 'factions')).map(async (f) => ({ f, mod: await import(path.join(DATA, 'factions', f)) })))

function* shaped() {
  for (const { f, mod } of sheetFiles) {
    for (const list of Object.values(mod)) {
      // `sharedUnitIds` is a list of ids, not of sheets
      if (!Array.isArray(list) || typeof list[0] !== 'object') continue
      for (const d of list) {
        const at = `${f} ${d.id}`
        yield [at, d, keysOf('Datasheet')]
        for (const p of d.profiles || []) yield [`${at} profiles`, p, keysOf('DatasheetProfile')]
        for (const p of d.points || []) yield [`${at} points`, p, keysOf('DatasheetPoints')]
        for (const k of ['ranged', 'melee']) for (const w of d[k] || []) yield [`${at} ${k}`, w, keysOf('WeaponRow')]
        for (const k of ['abilities', 'wargearAbilities', 'specialAbilities', 'rules']) for (const a of d[k] || []) yield [`${at} ${k}`, a, keysOf('NamedText')]
        for (const s of d.abilitySets || []) {
          yield [`${at} abilitySets`, s, inline('Datasheet', 'abilitySets')]
          for (const o of s.options || []) yield [`${at} abilitySets.options`, o, keysOf('NamedText')]
        }
        for (const k of ['leader', 'damaged']) if (d[k]) yield [`${at} ${k}`, d[k], inline('Datasheet', k)]
        for (const k of d.keywordsByModel || []) yield [`${at} keywordsByModel`, k, inline('Datasheet', 'keywordsByModel')]
      }
    }
  }
  for (const { f, mod } of ruleFiles) {
    const data = Object.values(mod)[0]
    for (const fac of [data?.en].filter(Boolean)) {
      yield [f, fac, keysOf('FactionRules')]
      if (fac.armyRule) yield [`${f} armyRule`, fac.armyRule, keysOf('ArmyRule')]
      for (const det of fac.detachments || []) {
        const at = `${f} ${det.name}`
        yield [at, det, keysOf('RulesDetachment')]
        if (det.rule) yield [`${at} rule`, det.rule, keysOf('DetachmentRule')]
        for (const e of det.enhancements || []) yield [`${at} enhancement ${e.name}`, e, keysOf('RulesEnhancement')]
        for (const s of det.stratagems || []) yield [`${at} stratagem ${s.name}`, s, keysOf('RulesStratagem')]
      }
    }
  }
}

describe('data typedefs', () => {
  it('reads the typedefs it checks against', () => {
    for (const name of ['Datasheet', 'DatasheetProfile', 'NamedText', 'FactionRules', 'RulesDetachment', 'RulesStratagem', 'WeaponRow']) {
      expect(keysOf(name).length, name).toBeGreaterThan(1)
    }
  })

  it('every key in the datasheets and the faction rules is a property of its typedef', () => {
    const unknown = new Set()
    let seen = 0
    for (const [at, obj, allowed] of shaped()) {
      seen++
      for (const key of Object.keys(obj)) if (!allowed.includes(key)) unknown.add(`${at.split(' ')[0]} … ${key}`)
    }
    expect(seen).toBeGreaterThan(10000)
    expect([...unknown]).toEqual([])
  })
})
