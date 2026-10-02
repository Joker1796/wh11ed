import { describe, it, expect } from 'vitest'
import { diffBundles, diffCore, plain } from './diff-bundles.mjs'
import { diffMfm } from './diff-mfm.mjs'
import { diffFaq } from './diff-faq.mjs'

// Each case below is noise a real app update produced and a player would have read as a change.
const sheet = (over = {}) => ({
  name: 'Kill Tank',
  statlines: [{ name: 'Kill Tank', M: '10"', T: '11', Sv: '3+', W: '18', Ld: '7+', OC: '5' }],
  keywords: ['Vehicle', 'Kill Tank'],
  abilities: [
    { name: 'Deadly Demise D6', type: 'core', rules: 'When this model is destroyed…' },
    { name: 'Big Red', type: 'datasheet', rules: 'This model’s <b>attacks</b> have +1 to hit.' },
  ],
  wargear: [
    { name: 'Rokkit Launcha', profiles: [{ name: 'Blasta', type: 'ranged', range: '24"', A: '2', BS: '5+', S: '4', AP: '0', D: '1', tags: [] }] },
    { name: 'Tank Kannon', profiles: [{ name: 'Blasta', type: 'ranged', range: '48"', A: '10', BS: '5+', S: '6', AP: '-1', D: '1', tags: [] }] },
    { name: 'Deff Rolla', profiles: [{ name: 'Deff Rolla', type: 'melee', range: 'Melee', A: '6', BS: 'N/A', WS: '3+', S: '10', AP: '-1', D: '2', tags: [] }] },
  ],
  points: [{ models: 1 }],
  ...over,
})
const bundle = (ds) => ({ datasheets: [ds] })
const diff = (a, b) => diffBundles(bundle(a), bundle(b), 'orks')

describe('patch notes: what is not a change', () => {
  it('reads the same sheet as unchanged', () => {
    expect(diff(sheet(), sheet())).toEqual([])
  })

  it('ignores markup, quotes, dashes, and a pointer at the printed layout', () => {
    const b = sheet({ abilities: [sheet().abilities[0], { name: 'Big Red', type: 'datasheet', rules: "This model's attacks have +1 to hit (see left)" }] })
    expect(diff(sheet(), b)).toEqual([])
    expect(plain('fall‑back <b>move</b>')).toBe('fall-back move')
  })

  // Two weapons both have a "Blasta" profile; matching by profile name alone paired them and
  // reported the Kill Tank's Blasta as 48" → 24".
  it('keeps two profiles of the same name apart by their weapon', () => {
    const b = sheet({ wargear: [...sheet().wargear].reverse() })
    expect(diff(sheet(), b)).toEqual([])
  })

  it('reads BS "N/A" and "-", OC "-1" and "-", as the same', () => {
    const a = sheet({ statlines: [{ ...sheet().statlines[0], OC: '-1' }] })
    const b = sheet({
      statlines: [{ ...sheet().statlines[0], OC: '-' }],
      wargear: sheet().wargear.map((w) => ({ ...w, profiles: w.profiles.map((p) => ({ ...p, BS: p.BS === 'N/A' ? '-' : p.BS })) })),
    })
    expect(diff(a, b)).toEqual([])
  })

  it('does not count the unit’s own name among its keywords, nor a "(…)" note on an ability', () => {
    const b = sheet({ keywords: ['Vehicle'], abilities: [sheet().abilities[0], { ...sheet().abilities[1], name: 'Big Red (Aura)' }] })
    expect(diff(sheet(), b)).toEqual([])
  })

  // A core ability carries the core rule's text on every sheet: a change to that text is the core
  // rule's, reported once — not on every sheet that has the ability.
  it('compares core abilities by name only', () => {
    const b = sheet({ abilities: [{ ...sheet().abilities[0], rules: 'Reworded.' }, sheet().abilities[1]] })
    expect(diff(sheet(), b)).toEqual([])
  })

  it('leaves out the "Damaged N" ability that only restates the damage bracket', () => {
    const b = sheet({ abilities: [...sheet().abilities, { name: 'Damaged 6', type: 'core', rules: '…' }] })
    expect(diff(sheet(), b)).toEqual([])
  })

  // 972: the app turned Wardens of Ultramar's invulnerable saves round, "4+, 5+" → "5+, 4+".
  it('reads invulnerable saves in any order as the same', () => {
    expect(diff(sheet({ invulnerableSaves: ['4+', '5+'] }), sheet({ invulnerableSaves: ['5+', '4+'] }))).toEqual([])
  })

  // 972: the app keeps one Force Disposition per detachment and switched which of TWO it shows for
  // fourteen of them (Gladius Task Force: Priority Assets → Take and Hold, both of which the MFM
  // lists). A move to a disposition the MFM does not list for it is still a change.
  it('reads a switch between two dispositions the MFM offers as the same', () => {
    const det = (fd) => ({ detachments: [{ id: 'g', name: 'Gladius Task Force', dp: 2, forceDisposition: fd }] })
    const offered = (name) => (name === 'Gladius Task Force' ? ['Take and Hold', 'Priority Assets'] : null)
    expect(diffBundles(det('Priority Assets'), det('Take and Hold'), 'space-marines', { offered })).toEqual([])
    expect(diffBundles(det('Priority Assets'), det('Disruption'), 'space-marines', { offered }))
      .toMatchObject([{ kind: 'detachment', fields: [{ field: 'forceDisposition', from: 'Priority Assets', to: 'Disruption' }] }])
    expect(diffBundles(det('Priority Assets'), det('Take and Hold'), 'space-marines')).toHaveLength(1)
  })
})

describe('patch notes: what is a change', () => {
  // 972: Logan Grimnar's Storm Bolter moved from the melee table to the ranged one.
  it('reports a weapon that changed tables once, not as gone and new', () => {
    const melee = { name: 'Storm Bolter', profiles: [{ name: 'Storm Bolter', type: 'melee', range: 'Melee', A: '2', WS: '3+', S: '5', AP: '-1', D: '1', tags: [] }] }
    const ranged = { name: 'Storm Bolter', profiles: [{ name: 'Storm Bolter', type: 'ranged', range: '24"', A: '2', BS: '2+', S: '5', AP: '-1', D: '1', tags: [] }] }
    const out = diff(sheet({ wargear: [...sheet().wargear, melee] }), sheet({ wargear: [...sheet().wargear, ranged] }))
    expect(out[0].fields).toEqual([{ field: 'weapon', change: 'retyped', name: 'Storm Bolter', fromType: 'melee', toType: 'ranged' }])
  })

  // MFM 1.5, 2 October: "UNIQUE TAG REMOVED" — a tag is an MFM field the app's tables never carry.
  it('reports a detachment tag the MFM took away', () => {
    const m = (unique) => ({ detachments: [{ name: 'Twilight Flickers', dp: 1, ...(unique && { unique }), enhancements: [] }], units: [] })
    expect(diffMfm(m('ACROBATIC'), m(null), 'aeldari'))
      .toEqual([{ faction: 'aeldari', kind: 'detachment', name: 'Twilight Flickers', change: 'changed', fields: [{ field: 'tag', added: [], removed: ['ACROBATIC'] }] }])
    expect(diffMfm(m('ACROBATIC'), m('ACROBATIC'), 'aeldari')).toEqual([])
  })

  it('reports a characteristic, a weapon number and a tag', () => {
    const b = sheet({
      statlines: [{ ...sheet().statlines[0], T: '12' }],
      wargear: [sheet().wargear[0], { ...sheet().wargear[1], profiles: [{ ...sheet().wargear[1].profiles[0], A: '12', tags: ['BLAST'] }] }, sheet().wargear[2]],
    })
    const [x] = diff(sheet(), b)
    expect(x.fields).toEqual([
      { field: 'stat', model: 'Kill Tank', stat: 'T', from: '11', to: '12' },
      { field: 'weapon', change: 'changed', name: 'Tank Kannon – Blasta', type: 'ranged', stats: [{ stat: 'A', from: '10', to: '12' }], tags: { added: ['BLAST'], removed: [] } },
    ])
  })

  it('reports a renamed weapon once, as a rename', () => {
    const b = sheet({ wargear: [sheet().wargear[0], sheet().wargear[1], { ...sheet().wargear[2], name: 'Deff Rollas', profiles: [{ ...sheet().wargear[2].profiles[0], name: 'Deff Rollas', D: '3' }] }] })
    const [x] = diff(sheet(), b)
    expect(x.fields).toEqual([{ field: 'weapon', change: 'changed', name: 'Deff Rollas', type: 'melee', from: 'Deff Rolla', stats: [{ stat: 'D', from: '2', to: '3' }], tags: { added: [], removed: [] } }])
  })

  it('reports a core ability swapped for another', () => {
    const b = sheet({ abilities: [{ ...sheet().abilities[0], name: 'Deadly Demise D3' }, sheet().abilities[1]] })
    expect(diff(sheet(), b)[0].fields).toEqual([{ field: 'coreAbilities', added: ['Deadly Demise D3'], removed: ['Deadly Demise D6'] }])
  })

  it('reports a changed core rule once', () => {
    const r = (text) => ({ rules: [{ num: '10.01', title: 'Hit Roll', text }] })
    expect(diffCore(r('A 1 always fails.'), r('An unmodified 1 always fails.'))).toHaveLength(1)
  })

  it('reports points by size and note, and a new unit with its points', () => {
    const a = { units: [{ name: 'Immortals', options: [{ models: 5, points: 70 }, { models: 10, points: 140 }] }] }
    const b = { units: [{ name: 'Immortals', options: [{ models: 5, points: 65 }, { models: 10, points: 140 }] }, { name: 'Psychomancer', options: [{ models: 1, points: 55 }] }] }
    expect(diffMfm(a, b, 'necrons')).toEqual([
      { faction: 'necrons', kind: 'points', name: 'Immortals', change: 'changed', fields: [{ models: 5, from: 70, to: 65 }] },
      { faction: 'necrons', kind: 'points', name: 'Psychomancer', change: 'added', options: [{ models: 1, to: 55 }] },
    ])
  })

  // A Chapter's FAQ file repeats every Codex: Space Marines entry — reported once, under SM.
  it('reports an FAQ entry once, not again under every Chapter', () => {
    const e = { type: 'qa', q: 'Can I?', a: 'Yes.' }
    const b = { 'space-marines': { entries: [e] }, 'blood-angels': { entries: [e] } }
    expect(diffFaq({}, b).map((x) => x.faction)).toEqual(['space-marines'])
  })

  // Necrons, 963: the codex rule and its Combat Patrol copy share a name, and the app swapped their
  // order — paired by name, the old CP wording read as a new errata.
  it('pairs two rules of one name by id, and leaves Combat Patrol copies out', () => {
    const codex = { id: 'c', name: 'Reanimation Protocols', body: [{ type: 'text', text: 'heals D3 wounds' }] }
    const cp = { id: 'p', name: 'Reanimation Protocols', body: [{ type: 'text', text: 'reanimates D3 wounds' }] }
    expect(diffBundles({ armyRules: [cp, codex] }, { armyRules: [codex, cp] }, 'necrons')).toEqual([])
    const cpIds = [new Set(['p']), new Set(['p'])]
    expect(diffBundles({ armyRules: [cp, codex] }, { armyRules: [{ ...codex, id: 'c2' }, cp] }, 'necrons', { cpArmyRules: cpIds })).toEqual([])
  })

  // Exorcist, MFM v1.5: "1st 180 / 2nd+ 220" → "1st-2nd 180 / 3rd+ 220" — the second copy got
  // cheaper, and that is all that changed.
  it('compares prices copy by copy across a change of tiers', () => {
    const a = { units: [{ name: 'Exorcist', options: [{ models: 1, points: 180, note: '1st' }, { models: 1, points: 220, note: '2nd+' }] }] }
    const b = { units: [{ name: 'Exorcist', options: [{ models: 1, points: 180, note: '1st-2nd' }, { models: 1, points: 220, note: '3rd+' }] }] }
    expect(diffMfm(a, b, 'adepta-sororitas')[0].fields).toEqual([{ models: 1, tier: '2nd', from: 220, to: 180 }])
    const c = { units: [{ name: 'Exorcist', options: [{ models: 1, points: 185, note: '1st-2nd' }, { models: 1, points: 225, note: '3rd+' }] }] }
    expect(diffMfm(b, c, 'adepta-sororitas')[0].fields).toEqual([
      { models: 1, tier: '1st-2nd', from: 180, to: 185 },
      { models: 1, tier: '3rd+', from: 220, to: 225 },
    ])
  })

  it('keeps a unit’s make-up apart from its copy tiers', () => {
    const o = (n, p) => ({ models: 3, points: p, note: `3 Wolf Guard Headtakers (${n})` })
    const a = { units: [{ name: 'Headtakers', options: [o('1st-2nd', 85), o('3rd+', 105)] }] }
    const b = { units: [{ name: 'Headtakers', options: [o('1st-2nd', 90), o('3rd+', 105)] }] }
    expect(diffMfm(a, b, 'space-wolves')[0].fields).toEqual([{ models: 3, label: '3 Wolf Guard Headtakers', tier: '1st-2nd', from: 85, to: 90 }])
  })
})
