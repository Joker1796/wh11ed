import { describe, it, expect } from 'vitest'
import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import UnitEditorSheet from './UnitEditorSheet.vue'

// Global item/text dicts (as ./items.js provides them).
const items = { 1: 'Bolt rifle', 2: 'Power fist', 3: 'Thunder hammer', 4: 'Missile pod' }
const texts = { 1: "The Sergeant's weapon can be replaced with one of the following", 2: 'Any number of models can each take a missile pod.' }

const def = {
  id: 'squad', name: 'Test Squad', linked: 0,
  minis: [{ n: 'Sergeant' }, { n: 'Trooper' }],
  sizes: [{ pts: 100, per: [5, 5], default: 1 }, { pts: 190, per: [6, 10] }],
  defaults: [[0, [[1, 1]]], [1, [[1, 1]]]],
  gear: [
    { m: 0, t: 1, in: 'checkbox', o: [[2, 10], [3, 15]] }, // radio: power fist +10 / thunder hammer +15
    { m: 1, t: 2, in: 'stepper', o: [[4, 5]] },            // stepper: missile pod +5 each
  ],
}

const stubs = { RouterLink: { props: ['to'], template: '<a><slot /></a>' } }
const mountSheet = (entry) => mount(UnitEditorSheet, {
  props: { entry, def, items, texts, factionSlug: 'space-marines', copyIndex: 1 },
  global: { stubs },
})

describe('UnitEditorSheet', () => {
  it('renders default wargear and the gear groups', () => {
    const w = mountSheet(reactive({ uid: 'u', id: 'squad', size: 0 }))
    expect(w.text()).toContain('Bolt rifle')      // default loadout
    expect(w.text()).toContain('Power fist')       // radio option
    expect(w.text()).toContain('Missile pod')      // stepper option
    expect(w.text()).toContain('100')              // base points, no upgrades
  })

  it('picks a one-of replacement and adds its points', async () => {
    const entry = reactive({ uid: 'u', id: 'squad', size: 0 })
    const w = mountSheet(entry)
    // Click the "Thunder hammer" option (+15).
    const opt = w.findAll('.opt').find((b) => b.text().includes('Thunder hammer'))
    await opt.trigger('click')
    expect(entry.wg).toEqual([[0, 1, 1]])
    expect(w.text()).toContain('115')
    // Picking "Keep default" clears it.
    const keep = w.findAll('.opt').find((b) => b.text().includes('Keep default'))
    await keep.trigger('click')
    expect(entry.wg).toEqual([])
  })

  it('steppers a per-model option, charging per count', async () => {
    const entry = reactive({ uid: 'u', id: 'squad', size: 0 })
    const w = mountSheet(entry)
    // The stepper group's + button (last stepper on the sheet; size has no range here).
    const plus = w.findAll('.opt-step .step-btn').filter((b) => b.text() === '+')
    await plus[0].trigger('click')
    await plus[0].trigger('click')
    expect(entry.wg).toEqual([[1, 0, 2]])
    expect(w.text()).toContain('110') // 100 + 2×5
  })

  it('emits toggle-warlord and picks an enhancement into the total', async () => {
    const entry = reactive({ uid: 'u', id: 'squad', size: 0 })
    const det = { enhancements: [{ name: 'Master-crafted', pts: 20 }] }
    const w = mount(UnitEditorSheet, {
      props: {
        entry, def, items, texts, detachment: det, copyIndex: 1,
        canWarlord: true, isWarlord: false,
        enhOptions: [{ name: 'Master-crafted', pts: 20, eligible: true, used: false }],
        leaderTargets: [{ uid: 'x', name: 'Bodyguard Squad' }],
      },
      global: { stubs },
    })
    // Warlord toggle just emits (parent enforces single warlord).
    await w.find('input[type="checkbox"]').setValue(true)
    expect(w.emitted('toggle-warlord')).toBeTruthy()

    // Enhancement adds its points.
    const enh = w.findAll('.opt').find((b) => b.text().includes('Master-crafted'))
    await enh.trigger('click')
    expect(entry.enh).toBe('Master-crafted')
    expect(w.text()).toContain('120') // 100 base + 20 enhancement

    // Leader attachment records the target uid.
    const tgt = w.findAll('.opt').find((b) => b.text().includes('Bodyguard Squad'))
    await tgt.trigger('click')
    expect(entry.leaderOf).toBe('x')
  })
})
