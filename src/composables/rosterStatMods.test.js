import { describe, it, expect } from 'vitest'
import { applyStatMods, applyValue, resolveModifierEntries, grantedKeywordsFrom } from './rosterStatMods.js'

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


describe('allegiance modifiers', () => {
  // Daemonic Allegiance is the rare structural characteristic change in this game's data: pick a
  // mark and the model's own statline changes. It applies to the model that CHOSE it and nothing
  // else, so resolution is by the choice, not by prose targeting.
  const facEn = { armyRule: null, detachments: [] }
  const rec = (opt, effects) => ({
    name: `Daemonic Allegiance: ${opt}`, kind: 'allegiance', reviewed: true,
    ref: { kind: 'allegiance', g: 'daemonic-allegiance', opt }, effects,
  })
  const records = [
    rec('Nurgle', [{ on: 'profile', stat: 't', op: 'add', value: 1, when: null }]),
    rec('Slaanesh', [{ on: 'profile', stat: 'm', op: 'add', value: 2, when: null }]),
  ]

  it('resolves only the mark the unit actually took', () => {
    const got = resolveModifierEntries(records, facEn, [], null, { g: 'daemonic-allegiance', opt: 'Nurgle' })
    expect(got.map((r) => r.name)).toEqual(['Daemonic Allegiance: Nurgle'])
  })

  it('resolves nothing when no mark is chosen, or the group is another datasheet\'s', () => {
    expect(resolveModifierEntries(records, facEn, [], null, null)).toEqual([])
    expect(resolveModifierEntries(records, facEn, [], null, { g: 'mark-of-chaos', opt: 'Nurgle' })).toEqual([])
  })

  it('changes the printed characteristic', () => {
    const entries = resolveModifierEntries(records, facEn, [], null, { g: 'daemonic-allegiance', opt: 'Nurgle' })
    const { sheet: out, marks } = applyStatMods(sheet(), entries, destroyer, [])
    expect(out.profiles[0].t).toBe('7')
    expect(marks).toContain('profile:t:0')
  })

  it('handles the distance one too — "add 2\" to this model\'s Move"', () => {
    const entries = resolveModifierEntries(records, facEn, [], null, { g: 'daemonic-allegiance', opt: 'Slaanesh' })
    const { sheet: out } = applyStatMods(sheet(), entries, destroyer, [])
    expect(out.profiles[0].m).toBe('8"')
  })
})

// The game context is what turns "would change" into "has changed" — the whole point of opening a
// list mid-battle. It never loosens the rule that a printed number is only rewritten when the
// modifier is PROVEN to apply; it just supplies the proof.
describe('applyStatMods with a live game context', () => {
  const waaagh = {
    name: 'Waaagh!',
    kind: 'armyRule',
    det: null,
    body: 'Add 1 to the Strength characteristic of melee weapons equipped by models from your army.',
    effects: [{ on: 'melee', stat: 's', op: 'add', value: 1, when: { en: 'while the Waaagh! is active', ru: 'пока активен Waaagh!' }, cond: ['waaagh-active'] }],
  }

  it('rewrites the number once the condition is proven, and says what proved it', () => {
    const out = applyStatMods(sheet(), [waaagh], destroyer, [], new Set(['waaagh-active']))
    expect(out.sheet.melee[0].s).toBe('7')
    expect(out.marks).toContain('melee:s:0')
    const note = out.notes[0]
    expect(note.applied).toBe(true)
    expect(note.via).toEqual(['waaagh-active'])
    // The condition text stays: a value that is only true while a switch is on must never read
    // as a printed one.
    expect(note.when.en).toBe('while the Waaagh! is active')
  })

  it('leaves it alone when the condition is not on', () => {
    const out = applyStatMods(sheet(), [waaagh], destroyer, [], new Set())
    expect(out.sheet.melee[0].s).toBe('6')
    expect(out.notes[0]).toMatchObject({ applied: false, via: null })
  })

  it('needs EVERY condition, not just one', () => {
    const both = { ...waaagh, effects: [{ ...waaagh.effects[0], cond: ['waaagh-active', 'unit-charged'] }] }
    expect(applyStatMods(sheet(), [both], destroyer, [], new Set(['waaagh-active'])).sheet.melee[0].s).toBe('6')
    expect(applyStatMods(sheet(), [both], destroyer, [], new Set(['waaagh-active', 'unit-charged'])).sheet.melee[0].s).toBe('7')
  })

  // An effect that predates the condition markup, or one a reviewer left unmarked, is UNPROVEN —
  // not unconditional. Treating a missing `cond` as "always on" would rewrite numbers nobody
  // signed off on.
  it('treats a conditional effect with no markup as unproven', () => {
    const unmarked = { ...waaagh, effects: [{ ...waaagh.effects[0], cond: undefined }] }
    const out = applyStatMods(sheet(), [unmarked], destroyer, [], new Set(['waaagh-active']))
    expect(out.sheet.melee[0].s).toBe('6')
    expect(out.notes[0].applied).toBe(false)
  })

  it('leaves the unconditional path exactly as it was', () => {
    const out = applyStatMods(sheet(), [coldFervour], destroyer, [], new Set(['waaagh-active']))
    expect(out.sheet.melee[0].s).toBe('8')
    expect(out.notes.find((n) => n.applied).via).toBeNull()
  })

  it('lets a proven grant hand over its keyword, and withholds it otherwise', () => {
    const ankh = {
      name: 'Destroyer Ankh', kind: 'enhancement', det: 'Cursed Legion', body: '',
      effects: [{ on: 'unit', stat: 'keyword', op: 'grant', value: 'Destroyer Cult', when: { en: 'while leading', ru: 'пока ведёт' }, cond: ['unit-leading'] }],
    }
    expect(grantedKeywordsFrom([ankh], warrior, [], new Set(['unit-leading']))).toEqual([
      { kw: 'Destroyer Cult', source: 'Destroyer Ankh', det: 'Cursed Legion' },
    ])
    expect(grantedKeywordsFrom([ankh], warrior, [], new Set())).toEqual([])
  })
})

// "the bearer's Psychic weapons only" — a restriction finer than `on` can express. It used to live
// in the `when` prose, which meant the modifier was never applied at all; as a filter it applies to
// exactly the rows the rule names.
describe('applyStatMods with a weapon filter', () => {
  const psychicSheet = () => ({
    name: 'Sorcerer',
    profiles: [{ m: '6"', t: '4', sv: '3+', w: '4', ld: '6+', oc: '1' }],
    ranged: [
      { name: 'Inferno bolt pistol', tags: ['PISTOL'], s: '4', ap: '-1', d: '1' },
      { name: 'Warp blast', tags: ['BLAST', 'PSYCHIC'], s: '6', ap: '-1', d: 'D3' },
    ],
    melee: [
      { name: 'Force stave', tags: ['PSYCHIC'], s: '6', ap: '-1', d: '2' },
      { name: 'Close combat weapon', tags: ['EXTRA ATTACKS'], s: '4', ap: '0', d: '1' },
    ],
  })
  const rec = (only, on = 'weapon') => ({
    name: 'Power of the Hive Mind', kind: 'enhancement', det: 'Synaptic Nexus', body: '',
    effects: [{ on, stat: 's', op: 'add', value: 1, when: null, only }],
  })

  it('rewrites only the rows carrying the named ability', () => {
    const out = applyStatMods(psychicSheet(), [rec({ tag: 'PSYCHIC' })], destroyer, [])
    expect(out.sheet.ranged[0].s).toBe('4') // pistol untouched
    expect(out.sheet.ranged[1].s).toBe('7')
    expect(out.sheet.melee[0].s).toBe('7')
    expect(out.sheet.melee[1].s).toBe('4') // no PSYCHIC tag
    expect(out.marks).toEqual(expect.arrayContaining(['ranged:s:1', 'melee:s:0']))
    expect(out.marks).not.toContain('ranged:s:0')
  })

  // A tag carries its value with it ("RAPID FIRE 1"), so the match is by prefix.
  it('matches a tag that carries a number', () => {
    const sheetRF = { ...psychicSheet(), ranged: [{ name: 'Lasgun', tags: ['RAPID FIRE 1'], a: '1' }] }
    const out = applyStatMods(sheetRF, [{ ...rec({ tag: 'RAPID FIRE' }, 'ranged'), effects: [{ on: 'ranged', stat: 'a', op: 'add', value: 1, when: null, only: { tag: 'RAPID FIRE' } }] }], destroyer, [])
    expect(out.sheet.ranged[0].a).toBe('2')
  })

  it('can exclude instead of include', () => {
    const out = applyStatMods(psychicSheet(), [rec({ notTag: 'EXTRA ATTACKS' }, 'melee')], destroyer, [])
    expect(out.sheet.melee[0].s).toBe('7')
    expect(out.sheet.melee[1].s).toBe('4')
  })

  it('matches by weapon name for a rule that names one', () => {
    const out = applyStatMods(psychicSheet(), [rec({ name: 'Warp blast' }, 'ranged')], destroyer, [])
    expect(out.sheet.ranged[1].s).toBe('7')
    expect(out.sheet.ranged[0].s).toBe('4')
  })

  it('leaves model profiles alone — a weapon filter has nothing to say about them', () => {
    const prof = { ...rec({ tag: 'PSYCHIC' }, 'profile'), effects: [{ on: 'profile', stat: 't', op: 'add', value: 1, when: null, only: { tag: 'PSYCHIC' } }] }
    const out = applyStatMods(psychicSheet(), [prof], destroyer, [])
    expect(out.sheet.profiles[0].t).toBe('5')
  })
})

// "…add 2 to the Attacks characteristic INSTEAD." Two effects, one number: while the alternate is
// in force the base must not also land, or +1 and +2 quietly become +3.
describe('applyStatMods with an "instead" variant', () => {
  const rec = {
    name: 'Weapons of the First Legion', kind: 'enhancement', det: 'Unforgiven Task Force', body: '',
    effects: [
      { on: 'melee', stat: 'a', op: 'add', value: 1, when: null },
      { on: 'melee', stat: 'a', op: 'add', value: 2, when: { en: 'while Battle-shocked', ru: 'пока Battle-shocked' }, cond: ['unit-battle-shocked'], alt: 0 },
    ],
  }

  it('applies the base while the alternate is not in force', () => {
    const out = applyStatMods(sheet(), [rec], destroyer, [], new Set())
    expect(out.sheet.melee[0].a).toBe('5') // printed 4, +1
    expect(out.notes.filter((n) => n.applied)).toHaveLength(1)
  })

  it('replaces it, rather than stacking, once the condition holds', () => {
    const out = applyStatMods(sheet(), [rec], destroyer, [], new Set(['unit-battle-shocked']))
    expect(out.sheet.melee[0].a).toBe('6') // 4 + 2, NOT 4 + 1 + 2
    // Only the alternate reports; its own "instead" wording is what explains the missing base.
    const applied = out.notes.filter((n) => n.applied)
    expect(applied).toHaveLength(1)
    expect(applied[0].value).toBe(2)
  })
})
