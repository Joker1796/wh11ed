// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { buildRosterRos } from './rosterRos.js'
import { TEST_ROSTERS, buildTestRoster } from '../../../scripts/lib/test-rosters.mjs'
import core from '../../data/roster/core.js'
import { loadRosterFaction, rosterItems } from '../../data/roster/index.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { loadRosterSheets } from '../../composables/rosterSheets.js'
import { factionGroups } from '../../data/factionsIndex.js'
import { modelCount } from './rosterEngine.js'

// Yellowscribe's own reading of a `.ros`, the 11th-edition path of its bin/roszParser.js and the
// "allModels" wargear mode of bin/10e11eDataModel.js (github.com/ThePants999/Yellowscribe, CC0, as of
// its commit of 2026-08-02), over the DOM instead of xml2js. Kept to what decides whether a model
// reaches the table right: which models, how many, which weapons each, which profiles and abilities.
// When Yellowscribe changes its parser, this is the copy to bring up to date.
const kids = (el, tag) => [...(el?.children || [])].filter((c) => c.localName === tag)
const kid = (el, tag) => kids(el, tag)[0]
const list = (el, outer, inner) => kids(kid(el, outer), inner)
const chars = (profile) => Object.fromEntries(list(profile, 'characteristics', 'characteristic').map((c) => [c.getAttribute('name'), c.textContent]))

function yellowscribeRead(xml) {
  const doc = new DOMParser().parseFromString(xml, 'application/xml')
  const roster = doc.documentElement
  if (roster.getAttribute('gameSystemId') !== 'sys-352e-adc2-7639-d610') throw new Error('not 11th edition')
  const units = []
  for (const force of list(roster, 'forces', 'force')) {
    for (const sel of list(force, 'selections', 'selection')) {
      if (['unit', 'model'].includes(sel.getAttribute('type'))) units.push(readUnit(sel))
    }
  }
  return units
}

function readUnit(sel) {
  const unit = { name: sel.getAttribute('name'), profiles: new Map(), abilities: new Map(), models: [], keywords: [], factionKeywords: [], everyModel: [] }
  for (const p of list(sel, 'profiles', 'profile')) {
    if (p.getAttribute('typeName') === 'Unit') unit.profiles.set(p.getAttribute('name'), chars(p))
    if (p.getAttribute('typeName') === 'Abilities') unit.abilities.set(p.getAttribute('name'), Object.values(chars(p))[0])
  }
  for (const r of list(sel, 'rules', 'rule')) unit.abilities.set(r.getAttribute('name'), kid(r, 'description')?.textContent)
  if (sel.getAttribute('type') === 'model') unit.models.push(readModel(sel, unit))
  else for (const c of list(sel, 'selections', 'selection')) {
    if (c.getAttribute('type') === 'model') unit.models.push(readModel(c, unit))
    if (c.getAttribute('type') === 'upgrade') readUnitUpgrade(c, unit)
  }
  // Read unguarded by the parser: a unit without it throws there.
  const categories = kid(sel, 'categories')
  if (!categories) throw new Error(`${unit.name}: no categories`)
  for (const c of kids(categories, 'category')) {
    const name = c.getAttribute('name')
    if (name.startsWith('Faction: ')) unit.factionKeywords.push(name.slice(9))
    else unit.keywords.push(name)
  }
  // Every-model weapons go to every model, one each (a weapon a model already holds stays its own).
  for (const m of unit.models) for (const w of unit.everyModel) if (!m.weapons.has(w.name)) m.weapons.set(w.name, 1)
  return unit
}

function readModel(sel, unit) {
  const model = { name: sel.getAttribute('name'), number: parseInt(sel.getAttribute('number'), 10), weapons: new Map(), abilities: [], rows: new Map() }
  readModelGear(sel, model, unit)
  for (const p of list(sel, 'profiles', 'profile')) if (p.getAttribute('typeName') === 'Unit') unit.profiles.set(p.getAttribute('name'), chars(p))
  return model
}

function readModelGear(sel, model, unit) {
  for (const c of list(sel, 'selections', 'selection')) readModelGear(c, model, unit)
  // "In Battlescribe data, a selection of X models with Y weapons each will contain X*Y weapons."
  const number = parseInt(sel.getAttribute('number'), 10) / model.number
  for (const p of list(sel, 'profiles', 'profile')) {
    const type = p.getAttribute('typeName')
    if (type === 'Ranged Weapons' || type === 'Melee Weapons') {
      const name = p.getAttribute('name').replace(/^➤ /, '')
      model.weapons.set(name, (model.weapons.get(name) || 0) + number)
      model.rows.set(name, chars(p))
    }
    if (type === 'Abilities') model.abilities.push(p.getAttribute('name'))
  }
}

function readUnitUpgrade(sel, unit) {
  for (const c of list(sel, 'selections', 'selection')) readUnitUpgrade(c, unit)
  if (sel.getAttribute('type') === 'model') { unit.models.push(readModel(sel, unit)); return }
  for (const p of list(sel, 'profiles', 'profile')) {
    const type = p.getAttribute('typeName')
    if (type === 'Ranged Weapons' || type === 'Melee Weapons') unit.everyModel.push({ name: p.getAttribute('name').replace(/^➤ /, ''), chars: chars(p) })
    if (type === 'Abilities') unit.abilities.set(p.getAttribute('name'), Object.values(chars(p))[0])
  }
}

// ── a list built by hand, read back exactly ──────────────────────────────────────────────────────

const items = { 1: 'Heavy Bolt Pistol', 2: 'Master-crafted Power Weapon', 3: 'Chainsword', 4: 'Plasma Pistol', 5: 'Power Fist', 6: 'Relic Shield', 7: 'Master-crafted Bolter' }
const captain = {
  id: 'captain', name: 'Captain', kws: ['Character', 'Infantry'], fkws: ['Adeptus Astartes'], flags: { char: 1 },
  sizes: [{ pts: 80, per: [1, 1], default: 1 }],
  defaults: [[0, [[1, 1], [7, 1], [2, 1]]]],
  gear: [{ m: 0, t: 1, in: 'checkbox', o: [[6]], rep: [7] }],
}
const squad = {
  id: 'assault-intercessor-squad', name: 'Assault Intercessor Squad', kws: ['Battleline', 'Infantry'], fkws: ['Adeptus Astartes'], flags: {},
  minis: [{ n: 'Assault Intercessor' }, { n: 'Assault Intercessor Sergeant' }],
  sizes: [{ pts: 75, per: [5, 5], default: 1, comp: [[0, 4], [1, 1]] }, { pts: 150, per: [10, 10], comp: [[0, 9], [1, 1]] }],
  defaults: [[1, [[1, 1], [3, 1]]], [0, [[1, 1], [3, 1]]]],
  gear: [{ m: 1, t: 1, in: 'checkbox', o: [[4]], rep: [1] }, { m: 1, t: 2, in: 'checkbox', o: [[5]], rep: [3] }],
}
const faction = { name: 'Space Marines', units: [captain, squad], detachments: [] }
const pistol = { name: 'Heavy Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '18"', a: '1', bs: '3+', s: '5', ap: '-1', d: '1' }
const sheets = new Map([
  ['captain', {
    id: 'captain', name: 'Captain',
    profiles: [{ name: 'Captain', m: '6"', t: '5', sv: '3+', w: '5', ld: '6+', oc: '1', inv: '4+' }],
    ranged: [{ ...pistol, bs: '2+' }, { name: 'Master-crafted Bolter', tags: ['ASSAULT'], range: '24"', a: '2', bs: '2+', s: '5', ap: '-1', d: '2' }],
    melee: [{ name: 'Master-crafted Power Weapon', tags: [], a: '6', ws: '2+', s: '6', ap: '-2', d: '2' }],
    core: 'Leader', faction: 'Combat Doctrines',
    abilities: [{ name: 'Finest Hour', text: 'When this unit is **[gloss:selected-to-fight:selected to fight]**, +3 A.' }],
    wargearAbilities: [{ name: 'Relic Shield', text: 'This model has +1 W.' }],
    keywords: ['Character', 'Infantry'], factionKeywords: ['Adeptus Astartes'],
  }],
  ['assault-intercessor-squad', {
    id: 'assault-intercessor-squad', name: 'Assault Intercessor Squad',
    profiles: [{ name: 'Assault Intercessor', m: '6"', t: '5', sv: '3+', w: '2', ld: '6+', oc: '2' }, { name: 'Assault Intercessor Sergeant', m: '6"', t: '5', sv: '3+', w: '2', ld: '6+', oc: '2' }],
    ranged: [pistol,
      { name: 'Plasma Pistol – standard', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '7', ap: '-2', d: '1' },
      { name: 'Plasma Pistol – supercharge', tags: ['CLOSE-QUARTERS', 'HAZARDOUS'], range: '12"', a: '1', bs: '3+', s: '8', ap: '-3', d: '2' }],
    melee: [{ name: 'Chainsword', tags: [], a: '4', ws: '3+', s: '5', ap: '-1', d: '1' }, { name: 'Power Fist', tags: [], a: '3', ws: '3+', s: '8', ap: '-2', d: '2' }],
    faction: 'Combat Doctrines', abilities: [],
    keywords: ['Battleline', 'Infantry'], factionKeywords: ['Adeptus Astartes'],
  }],
])
const roster = {
  name: 'Probe & <friends>', faction: 'space-marines', detachments: [],
  units: [
    { uid: 'b', id: 'assault-intercessor-squad', size: 1, wg: [[0, 0, 1], [1, 0, 1]] },
    { uid: 'a', id: 'captain', size: 0, warlord: true, leaderOf: 'b', wg: [[0, 0, 1]] },
  ],
}

describe('buildRosterRos — what Yellowscribe reads back', () => {
  const xml = buildRosterRos(roster, { faction, core, items, factionGroups, sheets })
  const units = yellowscribeRead(xml)

  it('is well-formed XML with the 11th-edition system id', () => {
    const doc = new DOMParser().parseFromString(xml, 'application/xml')
    expect(doc.getElementsByTagName('parsererror')).toHaveLength(0)
    expect(doc.documentElement.getAttribute('name')).toBe('Probe & <friends>')
  })

  it('a leader is its own unit, ahead of the unit it leads', () => {
    expect(units.map((u) => u.name)).toEqual(['Captain', 'Assault Intercessor Squad'])
  })

  it('a lone model: its loadout with the swap applied, its wargear ability, its statline', () => {
    const [cap] = units
    expect(cap.models).toHaveLength(1)
    expect(Object.fromEntries(cap.models[0].weapons)).toEqual({ 'Heavy Bolt Pistol': 1, 'Master-crafted Power Weapon': 1 })
    // A lone model's own abilities count as the model's too (the parser reads the selection twice).
    expect(cap.models[0].abilities).toContain('Relic Shield')
    expect(cap.profiles.get('Captain')).toMatchObject({ M: '6"', SV: '3+', InSv: '4+' })
    expect(cap.models[0].rows.get('Heavy Bolt Pistol')).toMatchObject({ BS: '2+', Keywords: 'CLOSE-QUARTERS' })
  })

  it('abilities in plain text, Core and Faction folded as Yellowscribe folds them', () => {
    const [cap] = units
    expect(cap.abilities.get('Finest Hour')).toBe('When this unit is selected to fight, +3 A.')
    expect(cap.abilities.get('Core')).toBe('Leader')
    expect(cap.abilities.get('Faction')).toBe('Combat Doctrines')
    expect(cap.keywords).toContain('Warlord')
    expect(cap.factionKeywords).toEqual(['Adeptus Astartes'])
  })

  it('a squad: one stack per profile, one weapon of each per model, both profiles of a two-profile weapon', () => {
    const [, sq] = units
    expect(sq.models.map((m) => [m.name, m.number])).toEqual([['Assault Intercessor', 9], ['Assault Intercessor Sergeant', 1]])
    expect(Object.fromEntries(sq.models[0].weapons)).toEqual({ 'Heavy Bolt Pistol': 1, Chainsword: 1 })
    expect(Object.fromEntries(sq.models[1].weapons)).toEqual({ 'Plasma Pistol – standard': 1, 'Plasma Pistol – supercharge': 1, 'Power Fist': 1 })
    expect([...sq.profiles.keys()]).toEqual(['Assault Intercessor', 'Assault Intercessor Sergeant'])
  })
})

// ── every test roster, against the real data ─────────────────────────────────────────────────────

describe('test rosters as Yellowscribe reads them', () => {
  for (const spec of TEST_ROSTERS) {
    it(spec.key, async () => {
      const faction = await loadRosterFaction(spec.faction, { allies: true })
      const ctx = { faction, core, items: rosterItems.items, factionGroups }
      const roster = buildTestRoster(spec, ctx)
      const sheets = await loadRosterSheets(roster)
      const units = yellowscribeRead(buildRosterRos(roster, { ...ctx, sheets }))
      expect(units).toHaveLength(roster.units.length)
      const defOf = (id) => faction.units.find((u) => u.id === id)
      const counts = roster.units.map((e) => [defOf(e.id).name, modelCount(defOf(e.id), e)]).sort()
      expect(units.map((u) => [u.name, u.models.reduce((s, m) => s + m.number, 0)]).sort()).toEqual(counts)
      for (const u of units) {
        expect(u.profiles.size, u.name).toBeGreaterThan(0)
        for (const m of u.models) {
          expect(m.weapons.size, `${u.name} / ${m.name}`).toBeGreaterThan(0)
          // A weapon count per model that is not a whole number is a total the parser divided
          // wrong — the one way this file can put half a gun in a model's hand.
          for (const [w, n] of m.weapons) expect(Number.isInteger(n) && n > 0, `${u.name} / ${m.name} / ${w}: ${n}`).toBe(true)
        }
      }
    })
  }
})

// ── every datasheet of the game, at its default size and loadout ─────────────────────────────────

// Every item a unit fields has to arrive as a weapon or an ability: one that finds neither on the
// sheet reaches the table as a bare name. A unit's default loadout, every faction.
// Named one by one, each with why: an item our sheet really has no row for.
const NO_ROW = {
  // Its loadout names armoured feet and appdata has the profile, but our sheet carries no row for
  // it (2026-10-30, found by this test) — a data fix, and this entry goes with it.
  'Decimator: Armoured feet': 'missing row on the sheet',
}
describe('every unit’s default loadout reaches the table', () => {
  const slugs = [...new Set(factionGroups.flatMap((g) => g.factions.map((f) => f.slug)))]
  it.each(slugs)('%s', async (slug) => {
    const faction = await loadRosterFaction(slug)
    const all = await loadDatasheets(slug)
    if (!faction || !all) return
    const sheets = new Map(all.map((d) => [d.id, d]))
    const bare = []
    for (const def of faction.units) {
      const roster = { faction: slug, detachments: [], units: [{ uid: 'u', id: def.id, size: Math.max(0, def.sizes.findIndex((s) => s.default)) }] }
      const xml = buildRosterRos(roster, { faction, core, items: rosterItems.items, factionGroups, sheets })
      const doc = new DOMParser().parseFromString(xml, 'application/xml')
      for (const sel of doc.querySelectorAll('selection[type="upgrade"]')) {
        const key = `${def.name}: ${sel.getAttribute('name')}`
        if (!kid(sel, 'profiles') && !NO_ROW[key]) bare.push(key)
      }
    }
    expect(bare).toEqual([])
  })
})
