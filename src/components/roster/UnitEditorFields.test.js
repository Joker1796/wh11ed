import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UnitEditorFields from './UnitEditorFields.vue'
import rosterItems from '../../data/roster/items.js'
import drukhari from '../../data/roster/drukhari.js'
import astraMilitarum from '../../data/roster/astra-militarum.js'
import imperialAgents from '../../data/roster/imperial-agents.js'

// Mounted against REAL generated data: what this guards is the path from the generator's bundled
// options to what the player actually reads, which a fixture would hide.
const wracks = drukhari.units.find((u) => u.id === 'wracks')
const mountFor = (def, entry = {}) => mount(UnitEditorFields, {
  props: { entry: { uid: 'u1', id: def.id, size: 0, ...entry }, def, items: rosterItems.items, texts: rosterItems.texts },
  global: { stubs: { Teleport: true } },
})

describe('UnitEditorFields — wargear instructions', () => {
  it('renders the option list as separate lines, not one run-on heading', () => {
    const w = mountFor(wracks)
    const list = w.findAll('.ues-blist')[0]
    expect(list.findAll('li')).toHaveLength(4)
    expect(list.findAll('li')[0].text()).toContain('hexrifle')
    // the marker is presentation now, not text
    expect(w.text()).not.toContain('◦')
  })

  it('labels a bundled option with every item it grants', () => {
    const names = mountFor(wracks).findAll('.opt-name').map((n) => n.text())
    expect(names).toContain('Hexrifle + Torturer’s tool')
    expect(names).not.toContain('Hexrifle')
  })
})

describe('UnitEditorFields — pick limits', () => {
  const kasrkin = astraMilitarum.units.find((u) => u.name === 'Kasrkin')
  const vigilant = imperialAgents.units.find((u) => u.name === 'Vigilant Squad')

  it('shows the allowance the unit actually has', () => {
    // "Up to 4 Kasrkin Troopers can each have their hot-shot lasgun replaced…", max 2 of a kind.
    expect(mountFor(kasrkin).text()).toContain('up to 4, max 2 of a kind')
  })

  it('caps a stepper by the remaining budget, not by the model count', () => {
    const gi = kasrkin.gear.findIndex((g) => g.o.length > 3 && g.lim)
    // The "+" of the first option in that group, however the tiles are laid out.
    const plus = (w) => w.findAll('.opt-step-body')[0].findAll('.step-btn')[1]
    // Its own duplicate cap is 2, so a second copy is fine and a third is not — even though the
    // squad has 10 models and the group's total allowance is 4.
    expect(plus(mountFor(kasrkin, { wg: [[gi, 0, 1]] })).attributes('disabled')).toBeUndefined()
    expect(plus(mountFor(kasrkin, { wg: [[gi, 0, 2]] })).attributes('disabled')).toBeDefined()
    // Budget spent elsewhere in the same group closes it too, below the duplicate cap.
    expect(plus(mountFor(kasrkin, { wg: [[gi, 0, 1], [gi, 1, 3]] })).attributes('disabled')).toBeDefined()
  })

  it('turns a several-models group into steppers instead of a one-of list', () => {
    // "Up to 2 Vigilants can each have their combat shotgun replaced with one of the following"
    // — appdata calls it a checkbox, which used to render as a single choice for the whole squad.
    const gi = vigilant.gear.findIndex((g) => g.lim && g.in !== 'stepper' && g.o.length > 1)
    const w = mountFor(vigilant)
    const names = w.findAll('.opt-step-body').map((n) => n.text())
    for (const o of vigilant.gear[gi].o) {
      expect(names.some((n) => n.includes(rosterItems.items[Array.isArray(o[0]) ? o[0][0][0] : o[0]]))).toBe(true)
    }
  })

  it('says so when the size puts a group out of reach', () => {
    // Ratlings: "If this unit contains 10 models, one model's sniper rifle…". The 6-10 bracket
    // is not enough on its own — it's the live model count that opens the group.
    const ratlings = astraMilitarum.units.find((u) => u.name === 'Ratlings')
    expect(mountFor(ratlings).text()).toContain('Not available at this unit size')
    expect(mountFor(ratlings, { size: 1, count: 6 }).text()).toContain('Not available at this unit size')
    expect(mountFor(ratlings, { size: 1, count: 10 }).text()).not.toContain('Not available at this unit size')
  })
})
