import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RosterUnitRow from './RosterUnitRow.vue'

const items = { 1: 'Boltgun', 2: 'Plasma pistol', 3: 'Havoc autocannon' }
const squad = {
  name: 'Legionaries',
  sizes: [{ pts: 90, per: [5, 5], default: 1 }, { pts: 180, per: [6, 10] }],
  minis: ['Legionary'],
  defaults: [[0, [[1, 1]]]],
  gear: [{ m: 0, t: 0, in: 'checkbox', o: [[2], [3]] }],
}
const captain = { name: 'Chaos Lord', sizes: [{ pts: 90, per: [1, 1], default: 1 }], minis: ['Chaos Lord'], gear: [] }

const mountRow = (props) => mount(RosterUnitRow, { props: { items, points: 100, ...props } })

describe('RosterUnitRow', () => {
  it('names the models a multi-model entry actually fields', () => {
    const w = mountRow({ def: squad, entry: { uid: 'u1', id: 'l', size: 1, count: 8 } })
    expect(w.text()).toContain('8 models')
  })

  // "1 model" is not a fact about the entry, it is a fact about the datasheet.
  it('says nothing about model count on a one-model datasheet', () => {
    const w = mountRow({ def: captain, entry: { uid: 'u1', id: 'c', size: 0 } })
    expect(w.find('.rur-chips').exists()).toBe(false)
  })

  // The point of the row: what THIS copy has that another copy of the same datasheet doesn't.
  it('lists the wargear that was picked and not the default loadout', () => {
    const w = mountRow({ def: squad, entry: { uid: 'u1', id: 'l', size: 0, wg: [[0, 1, 1]] } })
    expect(w.text()).toContain('Havoc autocannon')
    expect(w.text()).not.toContain('Boltgun')
  })

  it('chips the attachment role, the enhancement and the allegiance', () => {
    const w = mountRow({
      def: captain,
      entry: { uid: 'u1', id: 'c', size: 0, enh: 'Bastion Plate', alleg: 'Khorne' },
      role: 'Leader',
    })
    const chips = w.findAll('.rur-chip').map((c) => c.text())
    expect(chips).toEqual(['Leader', 'Bastion Plate', 'Khorne'])
    expect(w.find('.rur-chip').classes()).toContain('role')
  })

  // A mandatory enhancement is derived from the detachment, never stored on the entry.
  it('names a mandatory enhancement the entry does not carry itself', () => {
    // `req` naming exactly this datasheet is what makes it mandatory FOR it (lockedToExactUnit).
    const det = { name: 'Veiled Blade', enhancements: [{ name: 'Sanctic Shard', mandatory: 1, req: [{ kw: ['Chaos Lord'] }], pts: 10 }] }
    const w = mountRow({ def: captain, entry: { uid: 'u1', id: 'c', size: 0 }, detachments: [det] })
    expect(w.findAll('.rur-chip').map((c) => c.text())).toEqual(['Sanctic Shard'])
  })

  it('shows the warlord star only for the warlord', () => {
    expect(mountRow({ def: captain, entry: { uid: 'u1', id: 'c', size: 0 } }).find('.rur-star').exists()).toBe(false)
    expect(mountRow({ def: captain, entry: { uid: 'u1', id: 'c', size: 0, warlord: true } }).find('.rur-star').exists()).toBe(true)
  })
})
