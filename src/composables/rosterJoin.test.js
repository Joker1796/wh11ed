import { describe, it, expect, beforeAll } from 'vitest'
import { loadRosterFaction, rosterCore, rosterItems } from '../data/roster/index.js'
import { leaderTargetsFor, leadTypeFor } from '../core/roster/rosterEngine.js'
import { validateRoster } from '../core/roster/rosterValidation.js'
import { buildRosterText } from './rosterExport.js'
import { parseList, matchRoster } from './rosterImport.js'
import { factionGroups } from '../data/factionsIndex.js'
import { attachmentOf, datasheetEntriesFor } from './rosterStatMods.js'
import { loadRosterModifiersFor } from '../data/rosterModifiers/index.js'

// A unit that JOINS a unit already led (owner, 2026-10-25): "At the start of the Declare Battle
// Formations step, this unit can join one other unit from your army that is being led by a Cryptek
// model…". Stored in `leaderOf` like an attachment; offered only where the character leads.
const items = rosterItems.items || rosterItems
let necrons, drukhari, aeldari
beforeAll(async () => {
  ;[necrons, drukhari, aeldari] = await Promise.all(['necrons', 'drukhari', 'aeldari'].map((s) => loadRosterFaction(s)))
})
const defOfIn = (fac) => (id) => fac.units.find((u) => u.id === id)
const E = (uid, id, extra = {}) => ({ uid, id, size: 0, ...extra })
const list = (faction, units, detachments) => ({ faction, detachments, battleSize: 'strike-force', units })

describe('a unit that joins a unit already led', () => {
  it('reads the rule into `joins`', () => {
    const ct = defOfIn(necrons)('cryptothralls')
    expect(ct.joins.by).toEqual(expect.arrayContaining(['technomancer', 'chronomancer', 'orikan-the-diviner']))
    expect(defOfIn(necrons)('canoptek-tomb-crawlers').joins.one).toEqual(['canoptek-tomb-crawlers', 'cryptothralls'])
    expect(defOfIn(drukhari)('court-of-the-archon').joins.to).toEqual(['hand-of-the-archon', 'kabalite-warriors'])
    expect(defOfIn(aeldari)('d-cannon-platform').joins.by).toBeUndefined()
  })

  it('is offered only a unit a character its rule names is leading', () => {
    const defOf = defOfIn(necrons)
    const ct = defOf('cryptothralls')
    const alone = [E('w', 'necron-warriors'), E('c', 'cryptothralls')]
    expect(leaderTargetsFor(ct, alone, 'c', defOf)).toEqual([])
    const led = [E('w', 'necron-warriors'), E('t', 'technomancer', { leaderOf: 'w' }), E('c', 'cryptothralls')]
    expect(leaderTargetsFor(ct, led, 'c', defOf).map((t) => [t.uid, t.type])).toEqual([['w', 'join']])
    const byOverlord = [E('w', 'necron-warriors'), E('o', 'overlord', { leaderOf: 'w' }), E('c', 'cryptothralls')]
    expect(leaderTargetsFor(ct, byOverlord, 'c', defOf)).toEqual([])
  })

  it('takes no Leader or Support slot, and one of its kind per unit', () => {
    const defOf = defOfIn(necrons)
    const units = [E('w', 'necron-warriors'), E('t', 'technomancer', { leaderOf: 'w' }), E('c', 'cryptothralls', { leaderOf: 'w' }), E('k', 'canoptek-tomb-crawlers')]
    const crawlers = leaderTargetsFor(defOf('canoptek-tomb-crawlers'), units, 'k', defOf)
    expect(crawlers.map((t) => [t.uid, t.used])).toEqual([['w', true]])
    const issues = (u) => validateRoster(list('necrons', u, ['Annihilation Legion']), { faction: necrons, core: rosterCore, items }).issues
    expect(issues(units).map((i) => i.code)).not.toContain('manyLeaders')
    const both = units.map((u) => (u.uid === 'k' ? { ...u, leaderOf: 'w' } : u))
    expect(issues(both).filter((i) => i.code === 'manyLeaders').map((i) => i.uid)).toEqual(['k'])
  })

  it('warns when the character it joined under has left', () => {
    const units = [E('w', 'necron-warriors'), E('c', 'cryptothralls', { leaderOf: 'w' })]
    const issues = validateRoster(list('necrons', units, ['Annihilation Legion']), { faction: necrons, core: rosterCore, items }).issues
    expect(issues.find((i) => i.code === 'joinNotLed')?.uid).toBe('c')
  })

  it('a rule naming no character joins the unit it names', () => {
    const defOf = defOfIn(aeldari)
    const units = [E('g', 'guardian-defenders'), E('d', 'd-cannon-platform'), E('s', 'storm-guardians')]
    expect(leadTypeFor(defOf('d-cannon-platform'), units[1], defOf('guardian-defenders'))).toBe('join')
    expect(leaderTargetsFor(defOf('d-cannon-platform'), units, 'd', defOf).map((t) => t.uid)).toEqual(['g'])
  })

  it('Court of the Archon is led by an Archon, or joins Kabalite Warriors he leads', () => {
    const defOf = defOfIn(drukhari)
    expect(leadTypeFor(defOf('archon'), null, defOf('court-of-the-archon'))).toBe('leader')
    const units = [E('k', 'kabalite-warriors'), E('a', 'archon', { leaderOf: 'k' }), E('c', 'court-of-the-archon')]
    expect(leaderTargetsFor(defOf('court-of-the-archon'), units, 'c', defOf).map((t) => [t.uid, t.type])).toEqual([['k', 'join']])
  })

  it('exports as a Retinue in its attached unit and imports back joined', () => {
    const roster = list('necrons', [E('w', 'necron-warriors'), E('t', 'technomancer', { leaderOf: 'w' }), E('c', 'cryptothralls', { leaderOf: 'w' })], ['Annihilation Legion'])
    const text = buildRosterText(roster, { faction: necrons, core: rosterCore, items, factionGroups, version: { app: 'test', data: 1 } }, 'gw')
    expect(text).toContain('Attached as: Retinue')
    const back = matchRoster(parseList(text, null, factionGroups), { faction: necrons, core: rosterCore, items }).payload.units
    const host = back.find((u) => u.id === 'necron-warriors')
    expect(back.find((u) => u.id === 'cryptothralls').leaderOf).toBe(host.uid)
    expect(back.find((u) => u.id === 'technomancer').leaderOf).toBe(host.uid)
  })

  it('its rule for "that CRYPTEK" reaches the Cryptek, and the Cryptek leads it', async () => {
    const defOf = defOfIn(necrons)
    const units = [E('w', 'necron-warriors'), E('t', 'technomancer', { leaderOf: 'w' }), E('c', 'cryptothralls', { leaderOf: 'w' })]
    const isJoiner = (u) => !!defOf(u.id)?.joins
    expect(attachmentOf(units[2], units, isJoiner).leaders.map((u) => u.uid)).toEqual(['t'])
    const at = attachmentOf(units[1], units, isJoiner)
    expect(at.joinedUnitIds).toEqual(['cryptothralls'])
    const records = (await loadRosterModifiersFor('necrons')).entries.filter((e) => e.reviewed && e.effects?.length)
    const got = datasheetEntriesFor(records, { unitId: 'technomancer', leaderUnitIds: [], ledUnitId: at.ledUnitId, coLeaderUnitIds: at.coLeaderUnitIds, joinedUnitIds: at.joinedUnitIds })
    expect(got.find((r) => r.name === 'Bound Creation')?.effects.map((f) => f.value)).toEqual(['Feel No Pain 4+'])
  })
})
