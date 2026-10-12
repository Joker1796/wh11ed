// The roster types (roster.types.js) against the generated data they describe. A type that lags
// the generator is worse than none: the checker trusts it, and a field it does not know is a field
// nobody notices being read wrong. So every key in every faction's src/data/roster/<slug>.js must
// be a @property of its typedef — gen-roster-data.mjs emits a new one, this fails until the type
// says what it is.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const DATA = path.join(HERE, '../data/roster')
const TYPES = fs.readFileSync(path.join(HERE, 'roster.types.js'), 'utf8')

// typedef name → { property name → its type text }
export function typedefProps(src) {
  const out = new Map()
  for (const block of src.split('/**').slice(1)) {
    const name = block.match(/@typedef\s+\{object\}\s+(\w+)/)?.[1]
    if (!name) continue
    const props = new Map()
    for (const m of block.matchAll(/@property\s+\{(.+?)\}\s+\[?(\w+)/g)) props.set(m[2], m[1])
    out.set(name, props)
  }
  return out
}

// The keys of an inline object type: `{ at: number, pts: number }`, `Array<{ n: string }>`.
export function inlineKeys(type) {
  const body = type.match(/\{(.*)\}/)?.[1]
  return body ? [...body.matchAll(/(\w+)\??\s*:/g)].map((m) => m[1]) : null
}

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

  it('fails on a key the types do not know', () => {
    const known = new Set(defs.get('GearGroup').keys())
    expect(known.has('newField')).toBe(false)
    expect(Object.keys({ m: 0, o: [], newField: 1 }).filter((k) => !known.has(k))).toEqual(['newField'])
  })
})
