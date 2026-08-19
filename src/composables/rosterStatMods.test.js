import { describe, it, expect } from 'vitest'
import { applyStatMods, applyValue, resolveModifierEntries } from './rosterStatMods.js'

const sheet = () => ({
  name: 'Skorpekh Destroyers',
  profiles: [{ name: 'Skorpekh Destroyers', m: '6"', t: '6', sv: '4+', w: '3', ld: '7+', oc: '1' }],
  ranged: [{ name: 'Gauss cannon', a: '3', bs: '3+', s: '5', ap: '-2', d: '2' }],
  melee: [{ name: 'Hyperphase weapon', a: '4', ws: '3+', s: '6', ap: '-2', d: '2' }, { name: 'Plasmacyte', a: '1', ws: '5+', s: '3', ap: '0', d: 'D3' }],
})

const destroyer = ['Skorpekh Destroyers', 'Destroyer Cult', 'Infantry', 'Necrons']
const warrior = ['Necron Warriors', 'Battleline', 'Infantry', 'Necrons']

const coldFervour = {
  name: 'Cold Fervour',
  det: 'Cursed Legion',
  kind: 'detachmentRule',
  body: [
    '▪ Add 2 to the Strength characteristic of weapons equipped by Destroyer Cult models from your army.',
    '▪ …add 2 to the Strength characteristic of weapons equipped by friendly Necrons models (excluding Destroyer Cult, Monster and Titanic models).',
  ].join('\n'),
  effects: [
    { scope: 0, on: 'weapon', stat: 's', op: 'add', value: 2, when: null },
    { scope: 1, on: 'weapon', stat: 's', op: 'add', value: 2, when: { en: 'after a kill', ru: 'после убийства' } },
  ],
}

describe('applyValue', () => {
  it('adds to a plain characteristic', () => {
    expect(applyValue('5', 'add', 2)).toBe('7')
    expect(applyValue('5', 'add', -1)).toBe('4')
  })

  it('keeps the inch mark on a distance', () => {
    expect(applyValue('6"', 'add', 3)).toBe('9"')
  })

  it('improves a roll downwards and never past 2+', () => {
    expect(applyValue('4+', 'improve', 1)).toBe('3+')
    expect(applyValue('2+', 'improve', 1)).toBe('2+')
    expect(applyValue('3+', 'add', 1)).toBe('4+') // a worsening modifier still goes up
    expect(applyValue('6+', 'add', 2)).toBe('6+') // …and never past 6+
  })

  it('sets a value verbatim', () => {
    expect(applyValue('—', 'set', '5+')).toBe('5+')
  })

  it('grants a characteristic the sheet never printed', () => {
    // "The bearer has a 5+ invulnerable save" on a unit with no printed invulnerable.
    expect(applyValue(undefined, 'set', '5+')).toBe('5+')
  })

  it('keeps Armour Penetration signed and unclamped', () => {
    // AP prints negative and "improve the AP by 1" is authored as add:-1 — clamping at zero
    // would silently turn -3 into 0, the single most damaging rounding this file could do.
    expect(applyValue('-2', 'add', -1)).toBe('-3')
    expect(applyValue('0', 'add', -1)).toBe('-1')
  })

  it('refuses to invent arithmetic on a dice expression', () => {
    // "D6+2" plus 1 has no honest answer — the caller turns this into an annotation.
    expect(applyValue('D6+2', 'add', 1)).toBeNull()
    expect(applyValue('', 'add', 1)).toBeNull()
    expect(applyValue('5', 'improve', 1)).toBeNull() // improve is for rolls, not plain numbers
  })
})

describe('applyStatMods', () => {
  it('does nothing at all without records', () => {
    const s = sheet()
    const out = applyStatMods(s, [], destroyer)
    expect(out.sheet).toBe(s) // identity preserved — no needless re-render
    expect(out.notes).toEqual([])
    expect(out.marks).toEqual([])
  })

  it('applies an unconditional effect and marks the cells it rewrote', () => {
    const out = applyStatMods(sheet(), [coldFervour], destroyer)
    expect(out.sheet.ranged[0].s).toBe('7')
    expect(out.sheet.melee[0].s).toBe('8')
    expect(out.marks).toEqual(expect.arrayContaining(['ranged:s:0', 'melee:s:0', 'melee:s:1']))
    expect(out.notes.find((n) => n.applied)).toMatchObject({ source: 'Cold Fervour', stat: 's', value: 2 })
  })

  it('never rewrites a number for a conditional effect', () => {
    // The Necron Warrior is covered by Cold Fervour's SECOND bullet, which is conditional.
    const before = sheet()
    const out = applyStatMods(before, [coldFervour], warrior)
    expect(out.sheet.ranged[0].s).toBe('5')
    expect(out.sheet.melee[0].s).toBe('6')
    expect(out.marks).toEqual([])
    const note = out.notes.find((n) => n.when)
    expect(note.applied).toBe(false)
    expect(note.when.ru).toBe('после убийства')
  })

  it('binds an effect to its own statement of the rule', () => {
    // Bullet 0 names DESTROYER CULT; a Necron Warrior must not get its unconditional +2.
    const out = applyStatMods(sheet(), [coldFervour], warrior)
    expect(out.notes.some((n) => n.applied)).toBe(false)
  })

  it('leaves a value it cannot compute alone but still reports the modifier', () => {
    const dmg = { ...coldFervour, effects: [{ scope: 0, on: 'melee', stat: 'd', op: 'add', value: 1, when: null }] }
    const s = sheet()
    const out = applyStatMods(s, [dmg], destroyer)
    expect(out.sheet.melee[0].d).toBe('3') // "2" is computable
    expect(out.sheet.melee[1].d).toBe('D3') // "D3" is not — untouched
    expect(out.notes).toHaveLength(1)
  })

  it('applies an enhancement to its bearer without consulting the keyword layer', () => {
    const enh = {
      name: 'Tuff Git', det: 'War Horde', kind: 'enhancement',
      body: 'The bearer has +1 Toughness.',
      effects: [{ on: 'profile', stat: 't', op: 'add', value: 1, when: null }],
    }
    const out = applyStatMods(sheet(), [enh], destroyer)
    expect(out.sheet.profiles[0].t).toBe('7')
    expect(out.marks).toContain('profile:t:0')
  })

  it('stacks two modifiers on the same cell instead of the second overwriting the first', () => {
    // Both read the value as it stands, not the printed one — otherwise a unit under an
    // enhancement's +2 and a detachment rule's +1 ends up at +1.
    const plusTwo = { ...coldFervour, name: 'A', effects: [{ scope: 0, on: 'melee', stat: 'a', op: 'add', value: 2, when: null }] }
    const plusOne = { ...coldFervour, name: 'B', effects: [{ scope: 0, on: 'melee', stat: 'a', op: 'add', value: 1, when: null }] }
    const out = applyStatMods(sheet(), [plusTwo, plusOne], destroyer)
    expect(out.sheet.melee[0].a).toBe('7') // printed 4, +2, +1
  })

  it('keeps both granted weapon abilities when two rules grant one each', () => {
    const grant = (name, value) => ({
      name, det: 'D', kind: 'enhancement', body: 'x',
      effects: [{ on: 'ranged', stat: 'ability', op: 'grant', value, when: null }],
    })
    const out = applyStatMods(sheet(), [grant('A', 'ASSAULT'), grant('B', 'RAPID FIRE 1')], destroyer)
    expect(out.sheet.ranged[0].tags).toEqual(['ASSAULT', 'RAPID FIRE 1'])
  })

  it('does not add a weapon ability the row already prints', () => {
    const s = sheet()
    s.ranged[0].tags = ['ASSAULT']
    const grant = { name: 'A', det: 'D', kind: 'enhancement', body: 'x',
      effects: [{ on: 'ranged', stat: 'ability', op: 'grant', value: 'assault', when: null }] }
    const out = applyStatMods(s, [grant], destroyer)
    expect(out.sheet.ranged[0].tags).toEqual(['ASSAULT'])
    expect(out.marks).toEqual([])
  })

  it('reports a granted keyword instead of touching the sheet', () => {
    const grant = { name: 'Destroyer Ankh', det: 'Cursed Legion', kind: 'enhancement', body: 'x',
      effects: [{ on: 'unit', stat: 'keyword', op: 'grant', value: 'Destroyer Cult', when: null }] }
    const s = sheet()
    const out = applyStatMods(s, [grant], destroyer)
    expect(out.sheet).toBe(s)
    expect(out.keywords).toEqual([{ kw: 'Destroyer Cult', source: 'Destroyer Ankh', det: 'Cursed Legion' }])
  })

  it('does not mutate the sheet it was given', () => {
    const s = sheet()
    applyStatMods(s, [coldFervour], destroyer)
    expect(s.ranged[0].s).toBe('5')
    expect(s.melee[0].s).toBe('6')
  })

  it('still applies when the rule names a keyword no unit in the faction has', () => {
    // Mirrors ruleTargets.js's third escape: the prose block shows such a rule to everyone, so
    // its reviewed modifier must not silently apply to nobody.
    const stale = {
      name: 'Tyrannical Court', det: 'Lords of Dread', kind: 'detachmentRule',
      body: 'Improve the Objective Control characteristic of Chaos Knights Character models from your army by 2.',
      effects: [{ on: 'profile', stat: 'oc', op: 'add', value: 2, when: null }],
    }
    const out = applyStatMods(sheet(), [stale], destroyer, [destroyer, warrior])
    expect(out.sheet.profiles[0].oc).toBe('3')
  })
})

// The gating shared by the unit-rules modal and the roster's read-only list. Two copies of this
// would drift, and a modifier applied on the card but not on the list plate (or the reverse) is
// exactly the bug that follows.
describe('resolveModifierEntries', () => {
  const facEn = {
    armyRule: { id: 'waaagh', name: 'Waaagh!', body: 'army rule body' },
    detachments: [
      { id: 'war-horde', name: 'War Horde', rule: { name: 'Get Stuck In!', body: 'detachment body' },
        enhancements: [{ name: 'Tuff Git', body: 'enhancement body' }] },
      { id: 'bully-boyz', name: 'Bully Boyz', rule: { name: 'Big Boss', body: 'other body' }, enhancements: [] },
    ],
  }
  const rec = (over) => ({ name: 'x', reviewed: true, effects: [{ on: 'profile', stat: 't', op: 'add', value: 1 }], ...over })

  it('resolves an army rule regardless of detachment', () => {
    const out = resolveModifierEntries([rec({ ref: { kind: 'armyRule' } })], facEn, [], null)
    expect(out).toHaveLength(1)
    expect(out[0].body).toBe('army rule body')
  })

  it('drops a detachment the roster does not field', () => {
    const r = [rec({ ref: { kind: 'detachmentRule', det: 'bully-boyz' } })]
    expect(resolveModifierEntries(r, facEn, ['War Horde'], null)).toEqual([])
    expect(resolveModifierEntries(r, facEn, ['Bully Boyz'], null)).toHaveLength(1)
  })

  it('applies an enhancement only to the unit carrying it', () => {
    const r = [rec({ name: 'Tuff Git', ref: { kind: 'enhancement', det: 'war-horde' } })]
    expect(resolveModifierEntries(r, facEn, ['War Horde'], null)).toEqual([])
    expect(resolveModifierEntries(r, facEn, ['War Horde'], 'Some Other')).toEqual([])
    expect(resolveModifierEntries(r, facEn, ['War Horde'], 'Tuff Git')).toHaveLength(1)
  })

  it('matches names through the shared normalisers', () => {
    // The roster layer spells detachments and enhancements with appdata's own glyphs.
    const r = [rec({ name: 'Tuff Git (Upgrade)', ref: { kind: 'enhancement', det: 'war-horde' } })]
    expect(resolveModifierEntries(r, facEn, ['War Horde'], 'Tuff Git')).toHaveLength(1)
  })

  it('drops a record with no wh11ed-side pointer, and needs a faction bundle', () => {
    expect(resolveModifierEntries([rec({ ref: null })], facEn, ['War Horde'], null)).toEqual([])
    expect(resolveModifierEntries([rec({ ref: { kind: 'armyRule' } })], null, [], null)).toEqual([])
  })

  it('accepts detachment objects as well as names', () => {
    const r = [rec({ ref: { kind: 'detachmentRule', det: 'war-horde' } })]
    expect(resolveModifierEntries(r, facEn, [{ name: 'War Horde' }], null)).toHaveLength(1)
  })
})

