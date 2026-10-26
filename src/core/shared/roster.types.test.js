// The roster types (roster.types.js) against the generated data they describe. A type that lags
// the generator is worse than none: the checker trusts it, and a field it does not know is a field
// nobody notices being read wrong. So every key in every faction's src/data/roster/<slug>.js must
// be a @property of its typedef — gen-roster-data.mjs emits a new one, this fails until the type
// says what it is.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { typedefProps, inlineKeys } from '../../../scripts/lib/typedef-keys.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const DATA = path.join(HERE, '../../data/roster')
const TYPES = fs.readFileSync(path.join(HERE, 'roster.types.js'), 'utf8')

const defs = typedefProps(TYPES)
const files = fs.readdirSync(DATA).filter((f) => f.endsWith('.js') && !['index.js', 'core.js', 'items.js'].includes(f) && !f.endsWith('.test.js'))
const factions = await Promise.all(files.map(async (f) => ({ slug: f.replace(/\.js$/, ''), data: (await import(path.join(DATA, f))).default })))

// Every object in the data, with the typedef (or inline property type) that describes it.
function* shaped() {
  const props = (name) => defs.get(name)
  const inline = (owner, prop) => inlineKeys(props(owner).get(prop) || '')
  for (const { slug, data } of factions) {
    yield [`${slug}`, data, 'RosterFaction']
    for (const u of data.units || []) {
      const at = `${slug} ${u.id}`
      yield [at, u, 'RosterUnit']
      if (u.flags) yield [`${at} flags`, u.flags, 'UnitFlags']
      for (const s of u.sizes || []) yield [`${at} sizes`, s, 'SizeBracket']
      for (const g of u.gear || []) yield [`${at} gear`, g, 'GearGroup']
      for (const l of u.leads || []) yield [`${at} leads`, l, 'LeadLink']
      for (const l of u.leadKw || []) yield [`${at} leadKw`, l, 'LeadKeywordGroup']
      if (u.alleg) {
        yield [`${at} alleg`, u.alleg, 'AllegianceChoice']
        for (const o of u.alleg.o || []) yield [`${at} alleg.o`, o, inline('AllegianceChoice', 'o')]
      }
      for (const key of ['step', 'hosts', 'pm']) if (u[key]) yield [`${at} ${key}`, u[key], inline('RosterUnit', key)]
      for (const key of ['crew', 'minis', 'xpm']) for (const x of u[key] || []) yield [`${at} ${key}`, x, inline('RosterUnit', key)]
    }
    for (const d of data.detachments || []) {
      const at = `${slug} detachment ${d.name}`
      yield [at, d, 'Detachment']
      for (const e of d.enhancements || []) {
        yield [`${at} ${e.name}`, e, 'Enhancement']
        for (const r of e.req || []) yield [`${at} ${e.name} req`, r, inline('Enhancement', 'req')]
        for (const a of e.attach || []) yield [`${at} ${e.name} attach`, a, inline('Enhancement', 'attach')]
      }
    }
    for (const g of data.allies || []) {
      yield [`${slug} ally ${g.key}`, g, 'AllyGroup']
      for (const f of g.free || []) yield [`${slug} ally ${g.key} free`, f, inline('AllyGroup', 'free')]
    }
  }
}

describe('roster types', () => {
  it('reads the typedefs it checks against', () => {
    for (const name of ['RosterFaction', 'RosterUnit', 'UnitFlags', 'SizeBracket', 'GearGroup', 'LeadLink', 'LeadKeywordGroup', 'AllegianceChoice', 'Detachment', 'Enhancement', 'AllyGroup']) {
      expect(defs.get(name)?.size, name).toBeGreaterThan(0)
    }
    expect(factions.length).toBeGreaterThanOrEqual(30)
  })

  it('describes every key the generated roster data carries', () => {
    const missing = new Set()
    for (const [at, obj, shape] of shaped()) {
      const known = Array.isArray(shape) ? new Set(shape) : new Set(defs.get(shape)?.keys() || [])
      for (const k of Object.keys(obj)) if (!known.has(k)) missing.add(`${Array.isArray(shape) ? at : shape}.${k} (first seen: ${at})`)
    }
    expect([...missing]).toEqual([])
  })

  // The modifier records (src/data/rosterModifiers/<slug>.js) — the same promise for the overlay's
  // own input: the record, its effects, and its `ref` per kind (ModifierRef is a union by kind).
  it('describes every key the modifier records carry', async () => {
    const MODS = path.join(HERE, '../../data/rosterModifiers')
    const recProps = new Set(defs.get('ModifierRecord').keys())
    const effProps = new Set(defs.get('ModifierEffect').keys())
    const refBlock = TYPES.slice(TYPES.indexOf('@typedef {{ kind:'), TYPES.indexOf('ModifierRef */'))
    const refKinds = new Map([...refBlock.matchAll(/\{ kind: '(\w+)'([^}]*)\}/g)].map((m) => [m[1], new Set(['kind', ...[...m[2].matchAll(/(\w+)\??\s*:/g)].map((x) => x[1])])]))
    expect(refKinds.size).toBeGreaterThanOrEqual(7)
    const missing = new Set()
    const modFiles = fs.readdirSync(MODS).filter((f) => f.endsWith('.js') && !['index.js', 'conditions.js', 'coreRules.js', 'appliesWhile.js'].includes(f) && !f.endsWith('.test.js'))
    let n = 0
    for (const f of modFiles) {
      const { entries } = (await import(path.join(MODS, f))).default
      for (const r of entries || []) {
        n++
        for (const k of Object.keys(r)) if (!recProps.has(k)) missing.add(`ModifierRecord.${k} (${f})`)
        for (const e of r.effects || []) for (const k of Object.keys(e)) if (!effProps.has(k)) missing.add(`ModifierEffect.${k} (${f})`)
        if (!r.ref) continue
        const kind = refKinds.get(r.ref.kind)
        if (!kind) { missing.add(`ModifierRef kind '${r.ref.kind}' (${f})`); continue }
        for (const k of Object.keys(r.ref)) if (!kind.has(k)) missing.add(`ModifierRef '${r.ref.kind}'.${k} (${f})`)
      }
    }
    expect(n).toBeGreaterThan(1000)
    expect([...missing]).toEqual([])
  })

  it('fails on a key the types do not know', () => {
    const known = new Set(defs.get('GearGroup').keys())
    expect(known.has('newField')).toBe(false)
    expect(Object.keys({ m: 0, o: [], newField: 1 }).filter((k) => !known.has(k))).toEqual(['newField'])
  })
})
