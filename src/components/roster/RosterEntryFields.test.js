import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RosterEntryFields from './RosterEntryFields.vue'
import UnitEditorFields from './UnitEditorFields.vue'
import rosterItems from '../../data/roster/items.js'
import necrons from '../../data/roster/necrons.js'
import { useRosterPrefs } from '../../composables/useRosterPrefs.js'
import { loadRosterFaction } from '../../data/roster/index.js'

// Real data: Necron Warriors can be led by three Legends characters (Lord, Nemesor Zahndrekh,
// Vargard Obyron) beside the Codex ones — the case the catalogue's "Hide Legends units" is for.
const defOf = (id) => necrons.units.find((u) => u.id === id)
const LEGENDS = ['Lord', 'Nemesor Zahndrekh', 'Vargard Obyron']
const mountSquad = (extra = []) => {
  const units = [{ uid: 'sq', id: 'necron-warriors', size: 0 }, ...extra]
  return mount(RosterEntryFields, {
    props: {
      entry: units[0], units, defOf, catalogue: necrons.units,
      items: rosterItems.items, texts: rosterItems.texts, armySlug: 'necrons',
    },
    global: { stubs: { Teleport: true } },
  })
}
const candidates = (w) => w.findComponent(UnitEditorFields).props('leaderCandidates').map((c) => c.name)

describe('RosterEntryFields — "Can be led by" and Legends', () => {
  const { hideLegends } = useRosterPrefs()
  afterEach(() => { hideLegends.value = false })

  it('offers Legends leaders while the catalogue shows Legends', () => {
    expect(candidates(mountSquad())).toEqual(expect.arrayContaining([...LEGENDS, 'Overlord']))
  })

  // One switch: hiding Legends in the catalogue hides them here too, live.
  it('drops them when "Hide Legends units" is on, and keeps the rest', async () => {
    const w = mountSquad()
    hideLegends.value = true
    await w.vm.$nextTick()
    const names = candidates(w)
    for (const n of LEGENDS) expect(names).not.toContain(n)
    expect(names).toContain('Overlord')
  })

  // Only who could be attached to THIS unit now: an Overlord on the squad holds its Leader slot,
  // so the other Leaders leave the list and the Supports stay. Vargard Obyron joins "even if
  // NEMESOR ZAHNDREKH has already been attached" (`along`) — beside him, and nobody else.
  it('leaves out every candidate whose slot on this unit is taken', () => {
    const w = mountSquad([{ uid: 'ov', id: 'overlord', size: 0, leaderOf: 'sq' }])
    const got = w.findComponent(UnitEditorFields).props('leaderCandidates')
    expect(got.filter((c) => c.type === 'leader')).toEqual([])
    expect(got.map((c) => c.name)).toContain('Technomancer')
    const z = mountSquad([{ uid: 'nz', id: 'nemesor-zahndrekh', size: 0, leaderOf: 'sq' }])
    const withZ = z.findComponent(UnitEditorFields).props('leaderCandidates')
    expect(withZ.filter((c) => c.type === 'leader').map((c) => c.name)).toEqual(['Vargard Obyron'])
  })

  // Where each candidate's datasheet lives, for the row that opens it: an allied Inquisitor
  // offered to a Space Marines squad is an Imperial Agents sheet under its bare id.
  it('points each candidate at its own faction\'s datasheet', async () => {
    const sm = await loadRosterFaction('space-marines', { allies: true })
    const units = [{ uid: 'sq', id: 'assault-intercessor-squad', size: 0 }]
    const w = mount(RosterEntryFields, {
      props: {
        entry: units[0], units, defOf: (id) => sm.units.find((u) => u.id === id), catalogue: sm.units,
        items: rosterItems.items, texts: rosterItems.texts, armySlug: 'space-marines',
      },
      global: { stubs: { Teleport: true } },
    })
    const got = w.findComponent(UnitEditorFields).props('leaderCandidates')
    expect(got.find((c) => c.name === 'Captain')).toMatchObject({ slug: 'space-marines', sheetId: 'captain', linked: true })
    // Inquisitors reach this squad only through "any IMPERIUM BATTLELINE INFANTRY unit" — a keyword
    // group, not a named attachment, so they are not suggested.
    expect(got.some((c) => /Inquisitor/.test(c.name))).toBe(false)
  })

  // An allied leader that DOES name the unit still points at its own faction's sheet: in a Space
  // Marines army, allied Inquisitorial Agents are named by Inquisitor Coteaz's own table.
  it('points an allied leader at its own faction\'s datasheet', async () => {
    const sm = await loadRosterFaction('space-marines', { allies: true })
    const units = [{ uid: 'ag', id: 'imperial-agents:inquisitorial-agents', size: 0 }]
    const w = mount(RosterEntryFields, {
      props: {
        entry: units[0], units, defOf: (id) => sm.units.find((u) => u.id === id), catalogue: sm.units,
        items: rosterItems.items, texts: rosterItems.texts, armySlug: 'space-marines',
      },
      global: { stubs: { Teleport: true } },
    })
    const got = w.findComponent(UnitEditorFields).props('leaderCandidates')
    expect(got.find((c) => c.name === 'Inquisitor Coteaz'))
      .toMatchObject({ slug: 'imperial-agents', sheetId: 'inquisitor-coteaz', linked: true })
  })
})

// The mirror on a Character (owner, 2026-10-08): the units an Overlord names, minus a copy the list
// already holds free for him, minus one at the duplicate cap; "+" names the Character as the leader.
describe('RosterEntryFields — "Can lead"', () => {
  const mountLeader = (units, dupBlocked = () => false) => mount(RosterEntryFields, {
    props: {
      entry: units[0], units, defOf, catalogue: necrons.units, dupBlocked,
      items: rosterItems.items, texts: rosterItems.texts, armySlug: 'necrons',
    },
    global: { stubs: { Teleport: true } },
  })
  const hosts = (w) => w.findComponent(UnitEditorFields).props('leaderHosts')

  it('offers the units the Character names, each pointing at its own datasheet', () => {
    const got = hosts(mountLeader([{ uid: 'ov', id: 'overlord', size: 0 }]))
    expect(got.map((h) => h.name)).toEqual(['Immortals', 'Lychguard', 'Necron Warriors'])
    expect(got[0]).toMatchObject({ slug: 'necrons', sheetId: 'immortals', linked: true })
  })

  it('leaves out a unit the list holds free for it, and one at the duplicate cap', () => {
    const units = [{ uid: 'ov', id: 'overlord', size: 0 }, { uid: 'im', id: 'immortals', size: 0 }]
    const w = mountLeader(units, ({ id }) => id === 'lychguard')
    expect(hosts(w).map((h) => h.name)).toEqual(['Necron Warriors'])
  })

  it('passes "+" up with the Character\'s uid', () => {
    const w = mountLeader([{ uid: 'ov', id: 'overlord', size: 0 }])
    w.findComponent(UnitEditorFields).vm.$emit('add-host', 'immortals')
    expect(w.emitted('add-host')).toEqual([['immortals', 'ov']])
  })
})
