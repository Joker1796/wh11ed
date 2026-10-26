// Once-per-battle rules (rosterGameContext's activeUses / usesFor, rosterStatMods' effectLive): a
// use the player marks rewrites the card for the window the rule gives it, then stays marked as
// used; a per-army one is spent for every unit; a Character's "this unit" use reaches the unit he
// leads. Plus the data gate: every effect whose wording says "once per battle" is one of these, or
// is named below with the reason it is not.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { activeUses, usesFor, attachedUids, stampOf } from '../core/rules/rosterGameContext.js'
import { applyStatMods } from '../core/rules/rosterStatMods.js'

const clock = (round, phase = 'fight', turn = 0) => ({ round, turn, phase, mine: true, tracked: true })
const finestHour = {
  sid: 'fh', kind: 'ability', name: 'Captain: Finest Hour (Once per battle, per unit)', det: null,
  effects: [{ on: 'melee', stat: 'a', op: 'add', value: 3, when: { en: 'once per battle', ru: 'раз за битву' }, once: { per: 'unit', dur: 'phase' } }],
}
const shackle = { ...finestHour, sid: 'ms', name: 'Trajann Valoris: Moment Shackle', effects: [{ ...finestHour.effects[0], once: { per: 'army', dur: 'phase' } }] }
const player = (uses) => ({ ctx: { uses } })
const captain = { uid: 'c', id: 'captain', leaderOf: 'i' }
const squad = { uid: 'i', id: 'intercessor-squad' }
const units = [captain, squad]

describe('once per battle', () => {
  const usedNow = stampOf(clock(2))

  it('is in force for its window, then only used', () => {
    const p = player({ c: { fh: usedNow } })
    expect([...activeUses(p, clock(2), captain, [finestHour])]).toEqual(['fh'])
    expect([...activeUses(p, clock(2, 'command', 1), captain, [finestHour])]).toEqual([])
    const [chip] = usesFor([finestHour], p, clock(3), captain)
    expect(chip).toMatchObject({ id: 'fh', on: true, live: false, spent: true, blocked: false })
    expect(chip.label.en).toBe('Finest Hour')
  })

  it('reaches the whole attached unit, whichever card it was ticked on', () => {
    expect(attachedUids(squad, units).sort()).toEqual(['c', 'i'])
    expect([...activeUses(player({ c: { fh: usedNow } }), clock(2), squad, [finestHour], units)]).toEqual(['fh'])
  })

  it('per army: a use on one unit blocks it on every other', () => {
    const p = player({ other: { ms: usedNow } })
    const [chip] = usesFor([shackle], p, clock(3), captain, units)
    expect(chip).toMatchObject({ on: false, blocked: true, blockedBy: 'usedArmy' })
    const [own] = usesFor([finestHour], player({ other: { fh: usedNow } }), clock(3), captain, units)
    expect(own.blocked).toBe(false)
  })

  it('rewrites the number only while the use is in force', () => {
    const sheet = { name: 'Captain', profiles: [{ m: '6"', t: '4', sv: '3+', w: '5', ld: '6+', oc: '1' }], ranged: [], melee: [{ name: 'Power fist', a: '5', ws: '2+', s: '8', ap: '-2', d: '2' }] }
    expect(applyStatMods(sheet, [finestHour], ['Captain'], null, new Set(), new Set()).sheet.melee[0].a).toBe('5')
    expect(applyStatMods(sheet, [finestHour], ['Captain'], null, new Set(), new Set(['fh'])).sheet.melee[0].a).toBe('8')
  })
})

// Effects worded "once per battle" that keep `never` on top of the use, with why: the card cannot
// answer the rest even once the use is marked.
const NOT_ONCE = new Map([
  ['Biophagus: Alchemicus Familiar', 'only against an INFANTRY unit'],
  ['Vindicare Assassin: Shieldbreaker', 'one shot of one weapon'],
  ['Tankbustas: Pulsa Rokkit', 'only against the MONSTER/VEHICLE unit selected'],
  ['Co-ordinated Eradication', 'only against the enemy unit selected'],
])

describe('every once-per-battle effect can be used', () => {
  it('a "once per battle" effect carries `once`', () => {
    const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../data/rosterModifiers')
    const missing = []
    for (const f of fs.readdirSync(dir).filter((f) => /^[a-z-]+\.js$/.test(f) && !['index.js', 'conditions.js', 'coreRules.js', 'appliesWhile.js'].includes(f))) {
      const src = fs.readFileSync(path.join(dir, f), 'utf8')
      const data = JSON.parse(src.slice(src.indexOf('export default ') + 15).replace(/;?\s*$/, ''))
      for (const e of data.entries) {
        for (const eff of e.effects || []) {
          if (!/once per battle/i.test(eff.when?.en || '') || eff.once) continue
          if ([...NOT_ONCE.keys()].some((k) => e.name.startsWith(k))) continue
          missing.push(`${f} ${e.name}`)
        }
      }
    }
    expect(missing).toEqual([])
  })
})
