import { describe, it, expect } from 'vitest'
import { overlaySheet, loadoutItemIds, loadoutItemCounts, grantedKeywordsFor, entryContext, ruleSourcesFor, enhKey, detKey } from './rosterModifiers.js'

// Interned wargear names, same shape as src/data/roster/items.js's `items` map.
const items = { 1: 'Boltgun', 2: 'Bolt pistol', 3: 'Meltagun', 4: 'Chainsword', 5: 'Power weapon', 6: 'Plasma pistol' }

// A 5-model squad: boltgun + bolt pistol + chainsword each, with two swaps on offer —
// a per-model one (stepper: N models take a meltagun instead of their boltgun) and a
// single-model one (checkbox: one Sister's chainsword becomes a power weapon).
const squad = {
  id: 'squad',
  sizes: [{ pts: 100, per: [5, 5], default: 1 }],
  defaults: [[0, [[1, 1], [2, 1], [4, 1]]]],
  gear: [
    { m: 0, t: 1, in: 'stepper', o: [[3, 0]], rep: [1] },
    { m: 0, t: 2, in: 'checkbox', o: [[5, 0]], rep: [4] },
  ],
}

// "Plasma pistol" is deliberately absent from this datasheet's items, so its rows are claimed by
// nothing; "Sanctified blade" isn't in the item dictionary at all. Both must survive every filter.
const sheet = {
  name: 'Squad',
  ranged: [{ name: 'Boltgun' }, { name: 'Bolt pistol' }, { name: 'Meltagun' }, { name: 'Plasma pistol – standard' }, { name: 'Plasma pistol – supercharge' }],
  melee: [{ name: 'Chainsword' }, { name: 'Power weapon' }, { name: 'Sanctified blade' }],
}

const names = (rows) => (rows || []).map((w) => w.name)
const run = (entry, def = squad, s = sheet) => overlaySheet(s, { def, entry, items })

describe('loadoutItemIds', () => {
  it('returns null when there is nothing to compute from', () => {
    expect(loadoutItemIds(squad, null)).toBeNull() // the add-unit preview: no entry yet
    expect(loadoutItemIds(null, { size: 0 })).toBeNull()
    expect(loadoutItemIds({ id: 'x', sizes: [] }, { size: 0 })).toBeNull() // no default loadout recorded
  })

  it('keeps a default item while any model still fields it, drops it once all have swapped', () => {
    expect(loadoutItemIds(squad, { size: 0, wg: [[0, 0, 2]] })).toContain(1) // 3 of 5 keep the boltgun
    expect(loadoutItemIds(squad, { size: 0, wg: [[0, 0, 5]] })).not.toContain(1)
  })

  it('fields BOTH items of a bundled option', () => {
    // "…replaced with 1 power weapon and 1 plasma pistol" is ONE option granting two items;
    // reading only the first would leave the second's weapon row trimmed off the card.
    const bundled = { ...squad, gear: [{ m: 0, t: 3, in: 'checkbox', o: [[[[5, 1], [6, 1]]]], rep: [4] }] }
    const ids = loadoutItemIds(bundled, { size: 0, wg: [[0, 0, 1]] })
    expect(ids).toContain(5)
    expect(ids).toContain(6)
  })

  it('ignores a selection in a group whose condition is not met', () => {
    // Group 1 needs a model group 0 hasn't reached. Group 0's stepper taking all 5 models leaves
    // none, so group 1 is inert: it neither adds its own item nor subtracts what it replaces.
    const conditional = { ...squad, gear: [squad.gear[0], { ...squad.gear[1], cond: [0, 0] }] }
    const ids = loadoutItemIds(conditional, { size: 0, wg: [[0, 0, 5], [1, 0, 1]] })
    expect(ids).toContain(4) // chainsword not swapped away — the inert group subtracts nothing
    expect(ids).not.toContain(5) // …and adds nothing
  })

  it('keeps a conditional group live while any model still meets its condition', () => {
    // The condition is about ONE model ("1 model equipped with a boltgun can…"), and 2 of 5
    // models trading theirs away leaves three that still qualify. Reading a single sibling pick
    // as the whole unit is what took the power fist off Chosen (see wargearGroupLive).
    const conditional = { ...squad, gear: [squad.gear[0], { ...squad.gear[1], cond: [0, 0] }] }
    const ids = loadoutItemIds(conditional, { size: 0, wg: [[0, 0, 2], [1, 0, 1]] })
    expect(ids).toContain(5) // the power weapon is still on offer, and taken
  })
})

describe('loadoutItemCounts', () => {
  it('multiplies a per-model quantity by the models that still hold it', () => {
    expect(loadoutItemCounts(squad, { size: 0 }).get(1)).toBe(5) // 5 boltguns in a 5-model squad
    expect(loadoutItemCounts(squad, { size: 0, wg: [[0, 0, 2]] }).get(1)).toBe(3) // 2 traded away
    expect(loadoutItemCounts(squad, { size: 0, wg: [[0, 0, 2]] }).get(3)).toBe(2) // …for meltaguns
  })

  it('adds up an item two sources hand the same entry', () => {
    // The Defiler shape: two independent hardpoint groups offering the same weapon, both taken.
    const twin = {
      id: 'twin', sizes: [{ pts: 10, per: [1, 1] }],
      defaults: [[0, [[2, 1], [4, 1]]]],
      gear: [
        { m: 0, t: 1, in: 'checkbox', o: [[5, 0]], rep: [2] },
        { m: 0, t: 2, in: 'checkbox', o: [[5, 0]], rep: [4] },
      ],
    }
    expect(loadoutItemCounts(twin, { size: 0, wg: [[0, 0, 1], [1, 0, 1]] }).get(5)).toBe(2)
  })

  it('counts a bundled option once per pick, per item in the bundle', () => {
    const bundled = { ...squad, gear: [{ m: 0, t: 3, in: 'checkbox', o: [[[[5, 2], [6, 1]]]], rep: [4] }] }
    const counts = loadoutItemCounts(bundled, { size: 0, wg: [[0, 0, 1]] })
    expect(counts.get(5)).toBe(2)
    expect(counts.get(6)).toBe(1)
  })

  it('takes a unit-wide swap off the unit total, whichever profile it is charged to', () => {
    // A group appdata recorded once per miniature profile and the generator folded into one
    // unit-wide group (`all`). Which of the two profiles gave the accursed weapon up is a display
    // convention (see swapsByMini) — the TOTAL is exact either way, and the total is what the
    // weapon table prints. Until 2026-08-28 nothing was subtracted at all, so a five-model Chosen
    // squad showed five accursed weapons and the power fist that replaced one.
    const chosen = {
      id: 'chosen',
      minis: [{ n: 'Champion' }, { n: 'Chosen' }],
      sizes: [{ pts: 135, per: [5, 5], default: 1, comp: [[0, 1], [1, 4]] }],
      defaults: [[0, [[1, 1], [2, 1]]], [1, [[1, 1], [2, 1]]]],
      gear: [{ all: 1, t: 1, in: 'stepper', o: [[3]], rep: [2] }],
    }
    expect(loadoutItemCounts(chosen, { size: 0 }).get(2)).toBe(5)
    const counts = loadoutItemCounts(chosen, { size: 0, wg: [[0, 0, 1]] })
    expect(counts.get(2)).toBe(4)
    expect(counts.get(3)).toBe(1)
    expect(counts.get(1)).toBe(5) // untouched by the swap
  })

  it('says nothing rather than guessing when the model count is unknown', () => {
    // A multi-miniature datasheet with no resolvable per-profile count: the item is fielded,
    // its quantity is not knowable, and `null` is how that is said.
    const multi = { ...squad, minis: [{ n: 'Sergeant' }, { n: 'Trooper' }] }
    const counts = loadoutItemCounts(multi, { size: 0 })
    expect(counts.has(1)).toBe(true)
    expect(counts.get(1)).toBeNull()
  })
})

describe('overlaySheet — weapon filtering', () => {
  it('returns the printed sheet untouched when there is no context at all', () => {
    expect(overlaySheet(sheet, null).sheet).toBe(sheet)
    expect(overlaySheet(sheet, {}).sheet).toBe(sheet)
  })

  it('hides options that were never picked, keeps the default loadout', () => {
    const { sheet: out } = run({ size: 0 })
    expect(names(out.ranged)).toEqual(['Boltgun', 'Bolt pistol', 'Plasma pistol – standard', 'Plasma pistol – supercharge'])
    expect(names(out.melee)).toEqual(['Chainsword', 'Sanctified blade'])
  })

  it('shows a picked option and keeps the partially-swapped default alongside it', () => {
    const { sheet: out } = run({ size: 0, wg: [[0, 0, 2]] })
    expect(names(out.ranged)).toContain('Meltagun')
    expect(names(out.ranged)).toContain('Boltgun') // 3 models never gave theirs up
  })

  it('drops a default once every model in the squad has swapped it away', () => {
    const { sheet: out } = run({ size: 0, wg: [[0, 0, 5]] })
    expect(names(out.ranged)).toContain('Meltagun')
    expect(names(out.ranged)).not.toContain('Boltgun')
  })

  it('treats a checkbox swap as one model, so the default stays alongside it', () => {
    // A checkbox is one yes/no and its instruction says "1 model's chainsword can be replaced
    // with…" — the other four models keep theirs. Reading the tick as the whole squad wiped a
    // weapon off the card that 4 of 5 models still carry (100 groups corpus-wide).
    const { sheet: out } = run({ size: 0, wg: [[1, 0, 1]] })
    expect(names(out.melee)).toEqual(['Chainsword', 'Power weapon', 'Sanctified blade'])
  })

  it('treats a checkbox swap as the whole squad when the group says so', () => {
    // `repall` is the "All models in this unit can each have their…" wording — 5 groups.
    const whole = { ...squad, gear: [squad.gear[0], { ...squad.gear[1], repall: 1 }] }
    const { sheet: out } = run({ size: 0, wg: [[1, 0, 1]] }, whole)
    expect(names(out.melee)).toEqual(['Power weapon', 'Sanctified blade'])
  })

  it('never hides a row no wargear item claims', () => {
    // Both plasma-pistol profiles and the Sanctified blade survive every selection above; this
    // is the 2.8% of real weapon rows that match no item, where hiding would delete a weapon
    // the unit actually has.
    for (const wg of [undefined, [[0, 0, 5]], [[1, 0, 1]]]) {
      const { sheet: out } = run({ size: 0, wg })
      expect(names(out.ranged)).toEqual(expect.arrayContaining(['Plasma pistol – standard', 'Plasma pistol – supercharge']))
      expect(names(out.melee)).toContain('Sanctified blade')
    }
  })

  it('matches a weapon\'s firing-mode rows to the single item behind them', () => {
    // One wargear item, several datasheet rows — hiding must take all of its profiles together.
    const plasmaDef = {
      id: 'plasma', sizes: [{ pts: 10, per: [1, 1] }],
      defaults: [[0, [[2, 1]]]],
      gear: [{ m: 0, t: 1, in: 'checkbox', o: [[6, 0]], rep: [2] }],
    }
    const plasmaSheet = { name: 'P', ranged: [{ name: 'Bolt pistol' }, { name: 'Plasma pistol – standard' }, { name: 'Plasma pistol – supercharge' }] }
    expect(names(run({ size: 0 }, plasmaDef, plasmaSheet).sheet.ranged)).toEqual(['Bolt pistol'])
    expect(names(run({ size: 0, wg: [[0, 0, 1]] }, plasmaDef, plasmaSheet).sheet.ranged))
      .toEqual(['Plasma pistol – standard', 'Plasma pistol – supercharge'])
  })

  it('subtracts nothing on a multi-miniature datasheet, only adds', () => {
    // A `rep` list is per-miniature and there's no single squad count to spend it against, so a
    // swapped-away weapon stays on the table rather than risking removing one the unit has.
    const multi = { ...squad, minis: [{ n: 'Sergeant' }, { n: 'Trooper' }] }
    const { sheet: out } = run({ size: 0, wg: [[1, 0, 1]] }, multi)
    expect(names(out.melee)).toEqual(['Chainsword', 'Power weapon', 'Sanctified blade'])
  })

  it('stamps how many of a weapon the entry fields, and only when it is more than one', () => {
    const { sheet: out } = run({ size: 0 })
    const qty = Object.fromEntries(out.ranged.map((w) => [w.name, w.qty]))
    expect(qty['Boltgun']).toBe(5) // one each, five models
    expect(out.melee.find((w) => w.name === 'Chainsword').qty).toBe(5)
    // A single weapon carries no badge at all, and neither does a row no item claims.
    expect(qty['Plasma pistol – standard']).toBeUndefined()
  })

  it('follows the count down as models trade the weapon away', () => {
    const { sheet: out } = run({ size: 0, wg: [[0, 0, 2]] })
    expect(out.ranged.find((w) => w.name === 'Boltgun').qty).toBe(3)
    expect(out.ranged.find((w) => w.name === 'Meltagun').qty).toBe(2)
  })

  it('leaves the printed sheet identical when there is no count and no trim', () => {
    // One model, one of everything: nothing to hide and nothing worth stamping, so the card must
    // get the very object it was given — the identity the modifier layer relies on downstream.
    const solo = { id: 'solo', sizes: [{ pts: 10, per: [1, 1] }], defaults: [[0, [[1, 1]]]] }
    const soloSheet = { name: 'Solo', ranged: [{ name: 'Boltgun' }] }
    expect(overlaySheet(soloSheet, { def: solo, entry: { size: 0 }, items }).sheet).toBe(soloSheet)
  })

  it('drops an emptied table instead of leaving a headed, rowless one', () => {
    const swapDef = {
      id: 'swap', sizes: [{ pts: 10, per: [1, 1] }],
      defaults: [[0, [[4, 1]]]],
      gear: [{ m: 0, t: 1, in: 'checkbox', o: [[1, 0]], rep: [4] }],
    }
    const swapSheet = { name: 'S', ranged: [{ name: 'Boltgun' }], melee: [{ name: 'Chainsword' }] }
    const { sheet: out } = run({ size: 0, wg: [[0, 0, 1]] }, swapDef, swapSheet)
    expect(out.melee).toBeUndefined()
    expect(names(out.ranged)).toEqual(['Boltgun'])
  })

  it('does not mutate the sheet it was given', () => {
    run({ size: 0, wg: [[0, 0, 5]] })
    expect(names(sheet.ranged)).toContain('Boltgun')
    expect(names(sheet.melee)).toContain('Power weapon')
  })

  it('always returns a notes array (empty until Phase B)', () => {
    expect(run({ size: 0 }).notes).toEqual([])
    expect(overlaySheet(null, {}).notes).toEqual([])
  })
})

// Real sidecar data (src/data/conditionalKeywords.json) — these grants are the ones the faction
// pages already render, so a fixture would only test the fixture.
describe('grantedKeywordsFor', () => {
  it('gives nothing without a matching faction/unit', () => {
    expect(grantedKeywordsFor('troupe', 'orks', ['War Horde'])).toEqual([])
    expect(grantedKeywordsFor('bannernob', 'orks', ['War Horde'])).toEqual([])
    expect(grantedKeywordsFor(undefined, undefined, undefined)).toEqual([])
  })

  it('gates a detachment grant on the roster actually fielding that detachment', () => {
    expect(grantedKeywordsFor('troupe', 'aeldari', ['Warhost'])).toEqual([])
    expect(grantedKeywordsFor('troupe', 'aeldari', ['Ghosts of the Webway']))
      .toEqual([{ kw: 'Battleline', detName: 'Ghosts of the Webway', extra: false }])
  })

  it('matches a detachment name whose slug needs a diacritic stripped', () => {
    // Leagues of Votann's "Dëlve Assault Shift" — the shared slugify() alone drops the ë and
    // silently fails to match the `delve-assault-shift` id this sidecar is keyed by.
    expect(grantedKeywordsFor('cthonian-beserks', 'leagues-of-votann', ['Dëlve Assault Shift']))
      .toEqual([{ kw: 'Battleline', detName: 'Dëlve Assault Shift', extra: false }])
  })

  it('matches a name carrying a typographic apostrophe', () => {
    expect(grantedKeywordsFor('troupe', 'aeldari', ['Serpent’s Brood']))
      .toEqual([{ kw: 'Battleline', detName: 'Serpent’s Brood', extra: false }])
  })

  it('carries the `extra` flag for a grant with a further un-modelled condition', () => {
    expect(grantedKeywordsFor('tempestus-scions', 'astra-militarum', ['Bridgehead Strike']))
      .toEqual([{ kw: 'Battleline', detName: 'Bridgehead Strike', extra: true }])
  })

  it('applies an army-wide grant regardless of detachment, with no detachment to footnote', () => {
    expect(grantedKeywordsFor('terminator-squad', 'dark-angels', []))
      .toEqual([{ kw: 'Deathwing', detName: null, extra: false }])
  })

  it('accepts detachment objects as well as bare names', () => {
    expect(grantedKeywordsFor('troupe', 'aeldari', [{ name: 'Ghosts of the Webway', sid: 'x' }]))
      .toEqual([{ kw: 'Battleline', detName: 'Ghosts of the Webway', extra: false }])
  })

  it('reports a keyword once even when two fielded detachments both grant it', () => {
    expect(grantedKeywordsFor('troupe', 'aeldari', ['Ghosts of the Webway', 'Serpent’s Brood']))
      .toHaveLength(1)
  })
})

describe('overlaySheet — granted keywords', () => {
  it('surfaces them alongside the sheet', () => {
    const out = overlaySheet(sheet, { unitId: 'troupe', factionSlug: 'aeldari', detachments: ['Ghosts of the Webway'] })
    expect(out.grantedKeywords).toEqual([{ kw: 'Battleline', detName: 'Ghosts of the Webway', extra: false }])
  })

  it('falls back to the def id when no explicit unitId is given', () => {
    const out = overlaySheet(sheet, { def: { id: 'troupe' }, factionSlug: 'aeldari', detachments: ['Ghosts of the Webway'] })
    expect(out.grantedKeywords).toHaveLength(1)
  })

  it('always returns an array, even with no sheet or no context', () => {
    expect(overlaySheet(null, {}).grantedKeywords).toEqual([])
    expect(overlaySheet(sheet, null).grantedKeywords).toEqual([])
  })
})

describe('entryContext', () => {
  const dets = [{ name: 'War Horde', enhancements: [{ name: 'Tuff Git', pts: 5 }] }]

  it('reports nothing to show when the entry carries none of it', () => {
    expect(entryContext(null)).toBeNull()
    expect(entryContext({ def: squad })).toBeNull() // no entry — the add-unit preview
    expect(entryContext({ def: squad, entry: { uid: 'a', id: 'squad' }, detachments: dets })).toBeNull()
  })

  it('reports the Warlord flag', () => {
    expect(entryContext({ def: squad, entry: { uid: 'a', warlord: true } }))
      .toEqual({ warlord: true, enhancement: null, attachedTo: null })
  })

  it('prices a chosen enhancement from the roster\'s detachments', () => {
    const out = entryContext({ def: squad, entry: { uid: 'a', enh: 'Tuff Git' }, detachments: dets })
    expect(out.enhancement).toEqual({ name: 'Tuff Git', pts: 5, mandatory: false })
  })

  it('still names an enhancement whose detachment cannot be resolved', () => {
    // Better a name with no price than dropping the fact that the unit is carrying one.
    const out = entryContext({ def: squad, entry: { uid: 'a', enh: 'Tuff Git' } })
    expect(out.enhancement).toEqual({ name: 'Tuff Git', pts: 0, mandatory: false })
  })

  it('reports a mandatory enhancement the entry never chose', () => {
    const mandatory = [{
      name: 'Cursed Legion',
      enhancements: [{ name: 'Pantheon of Woe', pts: 10, mandatory: true, req: [{ kw: ['Squad'] }] }],
    }]
    // mandatoryEnhancementFor matches on the datasheet's own NAME, so the def needs one.
    const out = entryContext({ def: { ...squad, name: 'Squad' }, entry: { uid: 'a' }, detachments: mandatory })
    expect(out.enhancement).toEqual({ name: 'Pantheon of Woe', pts: 10, mandatory: true })
  })

  it('resolves an attachment through leaderTargets', () => {
    const ctx = {
      def: squad,
      entry: { uid: 'a', leaderOf: 'b' },
      leaderTargets: [{ uid: 'b', name: 'Boyz' }, { uid: 'c', name: 'Nobz' }],
    }
    expect(entryContext(ctx).attachedTo).toBe('Boyz')
  })

  it('says nothing rather than showing a raw uid when the target list is missing', () => {
    expect(entryContext({ def: squad, entry: { uid: 'a', leaderOf: 'b' } })).toBeNull()
  })
})

describe('ruleSourcesFor', () => {
  const dets = [{ name: 'War Horde', enhancements: [{ name: 'Tuff Git', pts: 5 }] }]
  const entry = { uid: 'a', id: 'boyz' }
  const kinds = (ctx) => ruleSourcesFor(ctx).map((r) => r.kind)

  it('lists nothing without any roster context', () => {
    expect(ruleSourcesFor(null)).toEqual([])
    expect(ruleSourcesFor({ factionSlug: 'orks' })).toEqual([]) // the browser preview, no detachments yet
  })

  it('lists every fielded detachment', () => {
    expect(ruleSourcesFor({ entry, detachments: dets })).toEqual([
      { kind: 'detachment', name: 'War Horde' },
    ])
  })

  it('never lists the army rule — that is reached from the card\'s own Faction line', () => {
    expect(kinds({ entry, detachments: dets })).not.toContain('armyRule')
  })

  it('lists the enhancement only on the unit carrying it', () => {
    expect(kinds({ entry, detachments: dets })).not.toContain('enhancement')
    expect(kinds({ entry: { ...entry, enh: 'Tuff Git' }, detachments: dets })).toContain('enhancement')
  })

  it('lists a Leader attached to this unit, not one attached elsewhere', () => {
    const units = [
      { uid: 'a', id: 'boyz' },
      { uid: 'b', id: 'bannernob', leaderOf: 'a' },
      { uid: 'c', id: 'warboss', leaderOf: 'z' },
    ]
    const leaders = ruleSourcesFor({ entry, detachments: dets, units }).filter((r) => r.kind === 'leader')
    expect(leaders).toEqual([{ kind: 'leader', unitId: 'bannernob' }])
  })

  it('does not list this unit as its own Leader source when it is the one attached', () => {
    // The "Attached to X" chip already says this; repeating X's rules here would be noise.
    const units = [{ uid: 'a', id: 'bannernob', leaderOf: 'b' }, { uid: 'b', id: 'boyz' }]
    expect(kinds({ entry: { uid: 'a', id: 'bannernob', leaderOf: 'b' }, detachments: dets, units }))
      .not.toContain('leader')
  })

  it('works from bare detachment names as well as objects', () => {
    expect(ruleSourcesFor({ entry, detachments: ['War Horde'] })[0]).toEqual({ kind: 'detachment', name: 'War Horde' })
  })
})

describe('name keys', () => {
  it('enhKey folds away the glyph and tag differences between the two datasets', () => {
    expect(enhKey('Runnin’ Boots')).toBe(enhKey("Runnin' Boots"))
    expect(enhKey('Blood Surge (Aura)')).toBe(enhKey('Blood Surge'))
    expect(enhKey('X (Aura) (Upgrade)')).toBe(enhKey('X'))
  })

  it('detKey survives apostrophes and diacritics alike', () => {
    expect(detKey('Serpent’s Brood')).toBe('serpents-brood')
    expect(detKey('Dëlve Assault Shift')).toBe('delve-assault-shift')
  })
})

describe('overlaySheet — rule sources', () => {
  it('surfaces them and keeps notes reserved for Tier C', () => {
    const out = overlaySheet(sheet, { entry: { uid: 'a' }, detachments: ['War Horde'] })
    expect(out.ruleSources.map((r) => r.kind)).toEqual(['detachment'])
    expect(out.notes).toEqual([])
  })

  it('always returns an array, even with no sheet', () => {
    expect(overlaySheet(null, {}).ruleSources).toEqual([])
  })
})
