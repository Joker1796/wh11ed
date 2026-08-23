import { describe, it, expect } from 'vitest'
import { applyStatMods, applyValue, resolveModifierEntries, grantedKeywordsFrom, datasheetEntriesFor, aurasReaching } from './rosterStatMods.js'

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
    const out = resolveModifierEntries([rec({ name: 'Waaagh!', ref: { kind: 'armyRule' } })], facEn, [], null)
    expect(out).toHaveLength(1)
    expect(out[0].body).toBe('army rule body')
  })

  // appdata publishes several army rules per faction and we model one, so `ref: {kind:'armyRule'}`
  // can only ever point at that one. A record written against a rule we do not model separately
  // used to read the wrong prose — T'au's `Drones` resolving to `For the Greater Good` — and gate
  // its effects on that rule's targets.
  it('drops an army-rule record written against a rule we do not model', () => {
    expect(resolveModifierEntries([rec({ name: 'Drones', ref: { kind: 'armyRule' } })], facEn, [], null)).toEqual([])
  })

  // Our own names are sometimes a deliberate merge of two published rules, and a record named for
  // either half still belongs to it.
  it('accepts a record whose name is one half of a merged one', () => {
    const merged = { ...facEn, armyRule: { name: 'Synapse & Shadow in the Warp', body: 'merged body' } }
    expect(resolveModifierEntries([rec({ name: 'Synapse', ref: { kind: 'armyRule' } })], merged, [], null)).toHaveLength(1)
    // …and an apostrophe of a different shape is the same name.
    const katah = { ...facEn, armyRule: { name: "Martial Ka'tah", body: 'b' } }
    expect(resolveModifierEntries([rec({ name: 'Martial Ka’tah', ref: { kind: 'armyRule' } })], katah, [], null)).toHaveLength(1)
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

describe('datasheetEntriesFor', () => {
  // Fabius Bile's Enhanced Warriors is printed on HIS card and addresses the unit he joins, which
  // is the first thing in this layer that rewrites a card other than the one it was found on.
  const enhancedWarriors = {
    kind: 'ability',
    name: 'Fabius Bile: Enhanced Warriors',
    ref: { kind: 'ability', unit: 'fabius-bile' },
    effects: [
      { on: 'melee', stat: 's', op: 'add', value: 1, when: null, target: 'led' },
      { on: 'profile', stat: 't', op: 'add', value: 1, when: null, target: 'led' },
    ],
  }
  const ownAbility = {
    kind: 'ability',
    name: 'Fabius Bile: Surgeon Acolyte',
    ref: { kind: 'ability', unit: 'fabius-bile' },
    effects: [{ on: 'profile', stat: 'w', op: 'add', value: 1, when: null }],
  }
  const onTheBodyguard = {
    kind: 'ability',
    name: 'Poxwalkers: Curse of the Walking Pox',
    ref: { kind: 'ability', unit: 'poxwalkers' },
    effects: [{ on: 'profile', stat: 'sv', op: 'improve', value: 1, when: null, target: 'leader' }],
  }
  const records = [enhancedWarriors, ownAbility, onTheBodyguard]

  it('gives a unit its own abilities, split into owner and rule name', () => {
    const out = datasheetEntriesFor(records, { unitId: 'fabius-bile' })
    expect(out).toHaveLength(1)
    expect(out[0].name).toBe('Surgeon Acolyte')
    expect(out[0].owner).toBe('Fabius Bile')
    expect(out[0].from).toBe('self')
    expect(out[0].effects).toHaveLength(1)
  })

  // The card labels this "leader · Fabius Bile" and names the rule separately, so the two halves
  // have to arrive apart rather than as one glued string.
  it('gives the led unit the leader\'s ability, tagged with where it came from', () => {
    const out = datasheetEntriesFor(records, { unitId: 'chaos-space-marines', leaderUnitIds: ['fabius-bile'] })
    expect(out).toHaveLength(1)
    expect(out[0].name).toBe('Enhanced Warriors')
    expect(out[0].owner).toBe('Fabius Bile')
    expect(out[0].from).toBe('led')
    expect(out[0].effects.map((e) => e.stat)).toEqual(['s', 't'])
  })

  it('gives the leader an ability printed on the unit it leads', () => {
    const out = datasheetEntriesFor(records, { unitId: 'lord-of-contagion', ledUnitId: 'poxwalkers' })
    expect(out).toHaveLength(1)
    expect(out[0].name).toBe('Curse of the Walking Pox')
    expect(out[0].owner).toBe('Poxwalkers')
    expect(out[0].from).toBe('leader')
  })

  // The leader standing alone gets nothing from a `led` effect — the roster says it is attached to
  // nobody, so there is no unit for the ability to reach.
  it('applies nothing across an attachment the roster does not record', () => {
    expect(datasheetEntriesFor(records, { unitId: 'chaos-space-marines' })).toEqual([])
    expect(datasheetEntriesFor(records, { unitId: 'lord-of-contagion' })).toEqual([])
  })

  it('ignores every record that is not a datasheet ability', () => {
    const det = { kind: 'detachmentRule', name: 'X', ref: { kind: 'detachmentRule', det: 'y' }, effects: [{ on: 'profile', stat: 't', op: 'add', value: 1, when: null }] }
    expect(datasheetEntriesFor([det], { unitId: 'anything' })).toEqual([])
  })

  it('is applied with no keyword gate — the ability is printed on the card it addresses', () => {
    const sheet = () => ({ profiles: [{ m: '6"', t: '4', sv: '3+', w: '5' }], melee: [{ name: 'Blade', a: '4', s: '4' }] })
    const [rec] = datasheetEntriesFor(records, { unitId: 'chaos-space-marines', leaderUnitIds: ['fabius-bile'] })
    const out = applyStatMods(sheet(), [rec], [], [], new Set())
    expect(out.sheet.profiles[0].t).toBe('5')
    expect(out.sheet.melee[0].s).toBe('5')
  })
})

describe('datasheetEntriesFor — wargear', () => {
  const sarcophagus = {
    kind: 'wargear',
    name: 'Mortifiers: Anchorite Sarcophagus',
    ref: { kind: 'wargear', unit: 'mortifiers', item: 'anchorite sarcophagus' },
    effects: [
      { on: 'profile', stat: 'm', op: 'set', value: '7"', when: null },
      { on: 'profile', stat: 'sv', op: 'set', value: '3+', when: null },
    ],
  }
  const forceField = {
    kind: 'wargear',
    name: 'Big Mek in Mega Armour: Kustom Force Field',
    ref: { kind: 'wargear', unit: 'big-mek-in-mega-armour', item: 'kustom force field' },
    effects: [{ on: 'profile', stat: 'inv', op: 'set', value: '4+', when: { en: 'x', ru: 'x' }, cond: ['never'], target: 'led' }],
  }

  it('applies a wargear rule only to a unit that took the item', () => {
    const took = datasheetEntriesFor([sarcophagus], { unitId: 'mortifiers', itemNames: new Set(['anchorite sarcophagus']) })
    expect(took).toHaveLength(1)
    expect(took[0].name).toBe('Anchorite Sarcophagus')
    expect(took[0].from).toBe('wargear')
    expect(datasheetEntriesFor([sarcophagus], { unitId: 'mortifiers', itemNames: new Set(['heavy bolter']) })).toEqual([])
  })

  // No loadout at all (the add-unit preview) is not "equipped with everything": a wargear rule has
  // no printed line it would be hiding, so silence is the safe direction.
  it('says nothing when the caller cannot name the loadout', () => {
    expect(datasheetEntriesFor([sarcophagus], { unitId: 'mortifiers' })).toEqual([])
  })

  it('reaches the led unit when the LEADER is the one carrying it', () => {
    const ctx = { unitId: 'boyz', leaderUnitIds: ['big-mek-in-mega-armour'], leaderItemNames: new Set(['kustom force field']) }
    const out = datasheetEntriesFor([forceField], ctx)
    expect(out).toHaveLength(1)
    expect(out[0].from).toBe('led')
    expect(out[0].owner).toBe('Big Mek in Mega Armour')
    // …and not when the Big Mek left it at home.
    expect(datasheetEntriesFor([forceField], { ...ctx, leaderItemNames: new Set() })).toEqual([])
  })
})

// `live` is what the card sorts by: in force now, or waiting on something. It is not `applied` —
// a modifier can be in force and still change no number it can compute.
// Core Rules 22.01: "while a model with an aura ability is on the battlefield, it is always within
// range of its own aura ability" — so the bearer needs no switch, and neither does the unit its
// model is standing in. Everyone else is a distance on the table, which only the player knows.
// The chip needs to know when a stratagem may be used, and only this pass has both the record and
// the faction data it was read from.
describe('resolveModifierEntries — a stratagem\'s timing', () => {
  const facEn = {
    detachments: [{
      id: 'gladius-task-force',
      name: 'Gladius Task Force',
      stratagems: [{ name: 'Armour of Contempt', when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets." }],
    }],
  }
  const rec = {
    sid: 'aoc', kind: 'stratagem', name: 'Armour of Contempt', det: 'Gladius Task Force',
    ref: { kind: 'stratagem', det: 'gladius-task-force', name: 'Armour of Contempt' },
    effects: [{ on: 'melee', stat: 'ap', op: 'add', value: -1, when: null }],
  }

  it('reads the phases and the side off the English timing line', () => {
    const [out] = resolveModifierEntries([rec], facEn, ['Gladius Task Force'], null, null)
    expect(out.slot.phases).toEqual(['shooting', 'fight'])
    expect(out.slot.sides.shooting).toBe('opp')
  })

  it('leaves it null when the stratagem cannot be found', () => {
    const orphan = { ...rec, ref: { ...rec.ref, name: 'Renamed by GW' }, name: 'Renamed by GW' }
    const [out] = resolveModifierEntries([orphan], facEn, ['Gladius Task Force'], null, null)
    expect(out.slot).toBeNull()
  })
})

describe('an aura ability', () => {
  const sheet = () => ({ profiles: [{ m: '6"', t: '4', sv: '3+', w: '2', oc: '1' }] })
  const aura = {
    sid: 'fiery-heart', kind: 'ability', name: 'Triumph of Saint Katherine: The Fiery Heart (Aura)',
    ref: { kind: 'ability', unit: 'triumph-of-saint-katherine', scopes: [{ targets: ['ADEPTA SORORITAS'], excludes: [] }] },
    effects: [{ on: 'profile', stat: 'm', op: 'add', value: 2, target: 'aura', when: null }],
  }

  it('reaches the bearer with no switch at all', () => {
    const out = datasheetEntriesFor([aura], { unitId: 'triumph-of-saint-katherine' })
    expect(out).toHaveLength(1)
    expect(out[0].from).toBe('self')
    expect(out[0].scopes).toEqual(aura.ref.scopes)
  })

  it('reaches the unit the bearer is attached to, and the Character standing in it', () => {
    expect(datasheetEntriesFor([aura], { unitId: 'battle-sisters-squad', leaderUnitIds: ['triumph-of-saint-katherine'] })[0])
      .toMatchObject({ from: 'led' })
    expect(datasheetEntriesFor([aura], { unitId: 'canoness', ledUnitId: 'triumph-of-saint-katherine' })[0])
      .toMatchObject({ from: 'leader' })
  })

  it('reaches anyone else only once the player marks it', () => {
    const ctx = { unitId: 'battle-sisters-squad' }
    expect(datasheetEntriesFor([aura], ctx)).toEqual([])
    expect(datasheetEntriesFor([aura], { ...ctx, auraOn: new Set(['fiery-heart']) })[0]).toMatchObject({ from: 'aura' })
  })

  // The gate an ordinary ability does not need: this one is printed on one card and addresses
  // another, so "a friendly ADEPTA SORORITAS unit" has to be checked against the unit it lands on.
  it('is gated by the keywords its own prose named', () => {
    const entries = datasheetEntriesFor([aura], { unitId: 'battle-sisters-squad', auraOn: new Set(['fiery-heart']) })
    expect(applyStatMods(sheet(), entries, ['Adepta Sororitas', 'Infantry'], []).sheet.profiles[0].m).toBe('8"')
    expect(applyStatMods(sheet(), entries, ['Astra Militarum'], []).sheet.profiles[0].m).toBe('6"')
  })

  it('offers a chip only for a source in this list that the unit can be reached by', () => {
    const units = [
      { uid: 'a', id: 'triumph-of-saint-katherine', name: 'Triumph of Saint Katherine' },
      { uid: 'b', id: 'battle-sisters-squad', name: 'Battle Sisters Squad' },
    ]
    const ctx = { unitId: 'battle-sisters-squad', entryUid: 'b', rosterUnits: units, keywords: ['Adepta Sororitas'] }
    expect(aurasReaching([aura], ctx)).toEqual([
      { sid: 'fiery-heart', source: 'Triumph of Saint Katherine', sourceUid: 'a', unit: 'triumph-of-saint-katherine', name: 'The Fiery Heart (Aura)' },
    ])
    // …not for a unit the aura's own prose does not address,
    expect(aurasReaching([aura], { ...ctx, keywords: ['Astra Militarum'] })).toEqual([])
    // …not on the bearer's own card, and not where the list already answers (22.01),
    expect(aurasReaching([aura], { ...ctx, unitId: 'triumph-of-saint-katherine', entryUid: 'a' })).toEqual([])
    expect(aurasReaching([aura], { ...ctx, leaderUnitIds: ['triumph-of-saint-katherine'] })).toEqual([])
    // …and not for a source that is not in this list at all.
    expect(aurasReaching([aura], { ...ctx, rosterUnits: [units[1]] })).toEqual([])
  })
})

describe('the live flag on a note', () => {
  const sheet = () => ({ profiles: [{ m: '6"', t: '4', sv: '3+', w: '2', oc: '1' }] })
  const rule = (over) => ({
    kind: 'detachmentRule', name: 'Cold Fervour', det: 'Cursed Legion', body: '',
    effects: [{ on: 'profile', stat: 't', op: 'add', value: 1, ...over }],
  })

  it('marks an unconditional modifier live', () => {
    const out = applyStatMods(sheet(), [rule()], [], [], new Set(), new Set())
    expect(out.notes[0]).toMatchObject({ live: true, applied: true })
  })

  it('marks a conditional one live only once its condition holds', () => {
    const conditional = rule({ when: { en: 'while charged', ru: 'x' }, cond: ['unit-charged'] })
    expect(applyStatMods(sheet(), [conditional], [], [], new Set(), new Set()).notes[0])
      .toMatchObject({ live: false, applied: false })
    expect(applyStatMods(sheet(), [conditional], [], [], new Set(['unit-charged']), new Set()).notes[0])
      .toMatchObject({ live: true, applied: true })
  })

  // In force, but there was no row to change (this unit carries no melee weapon). It stays with
  // the modifiers in play — it IS one — even though no cell was rewritten.
  it('keeps a live modifier live when it changed nothing', () => {
    const out = applyStatMods(sheet(), [rule({ on: 'melee', stat: 'a' })], [], [], new Set(), new Set())
    expect(out.notes[0]).toMatchObject({ live: true, applied: false })
  })
})

describe('a spent stratagem', () => {
  const sheet = () => ({ profiles: [{ m: '6"', t: '4', sv: '3+', w: '2', oc: '1' }], melee: [{ name: 'Blade', a: '4', s: '4', ap: '-1', tags: [] }] })
  const strat = {
    sid: 'divine-guidance', kind: 'stratagem', name: 'Divine Guidance', det: 'Army of Faith', dur: 'phase',
    effects: [{ on: 'melee', stat: 'ap', op: 'add', value: -1, when: { en: 'while this stratagem is in force', ru: 'пока действует стратагема' } }],
  }
  const gated = {
    sid: 'reprise', kind: 'stratagem', name: 'Devastating Reprise', det: 'Chorus', dur: 'phase',
    effects: [{ on: 'ranged', stat: 'ability', op: 'grant', value: 'DEVASTATING WOUNDS', when: { en: 'against the named unit', ru: 'против названного юнита' }, cond: ['never'] }],
  }

  // The bug this pins: a stratagem's effects carry no `cond` (being spent IS the condition), and
  // the "is it proven" test demanded a non-empty one — so every stratagem stayed a footnote no
  // matter how many chips were lit.
  it('rewrites the number once it is in force', () => {
    const off = applyStatMods(sheet(), [strat], [], [], new Set(), new Set())
    expect(off.sheet.melee[0].ap).toBe('-1')            // untouched
    expect(off.notes[0].applied).toBe(false)

    const on = applyStatMods(sheet(), [strat], [], [], new Set(), new Set(['divine-guidance']))
    expect(on.sheet.melee[0].ap).toBe('-2')
    expect(on.notes[0].applied).toBe(true)
    expect(on.marks).toContain('melee:ap:0')
  })

  // A `cond` on a stratagem means what it asks BEYOND being spent, so it still gates.
  it('keeps a further condition as a footnote even while in force', () => {
    const out = applyStatMods(sheet(), [gated], [], [], new Set(), new Set(['reprise']))
    expect(out.notes[0].applied).toBe(false)
  })

  it('hands out a keyword only while in force', () => {
    const kw = {
      sid: 'possession', kind: 'stratagem', name: 'Daemonic Possession', dur: 'battle',
      effects: [{ on: 'unit', stat: 'keyword', op: 'grant', value: 'Daemon', when: { en: 'x', ru: 'x' } }],
    }
    expect(grantedKeywordsFrom([kw], [], [], new Set(), new Set())).toEqual([])
    expect(grantedKeywordsFrom([kw], [], [], new Set(), new Set(['possession']))).toEqual([
      { kw: 'Daemon', source: 'Daemonic Possession', det: undefined },
    ])
  })
})
