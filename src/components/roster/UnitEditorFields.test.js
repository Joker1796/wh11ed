import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NumberStepper from '../tracker/NumberStepper.vue'
import UnitEditorFields from './UnitEditorFields.vue'
import rosterItems from '../../data/roster/items.js'
import drukhari from '../../data/roster/drukhari.js'
import astraMilitarum from '../../data/roster/astra-militarum.js'
import imperialAgents from '../../data/roster/imperial-agents.js'
import aeldari from '../../data/roster/aeldari.js'
import adeptusMechanicus from '../../data/roster/adeptus-mechanicus.js'
import chaosSpaceMarines from '../../data/roster/chaos-space-marines.js'
import chaosDaemons from '../../data/roster/chaos-daemons.js'
import necrons from '../../data/roster/necrons.js'

// Mounted against REAL generated data: what this guards is the path from the generator's bundled
// options to what the player actually reads, which a fixture would hide.
const wracks = drukhari.units.find((u) => u.id === 'wracks')
const wraithlord = aeldari.units.find((u) => u.id === 'wraithlord')
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

describe('UnitEditorFields — a group waiting on a sibling', () => {
  // Necron Overlord: the Resurrection Orb is only on offer once the tachyon arrow has been given
  // up. It used to vanish from the page until then, which reads as the editor losing an option.
  const overlord = necrons.units.find((u) => u.id === 'overlord')
  const orbGi = overlord.gear.findIndex((g) => g.cond)

  it('greys the group out instead of removing it', () => {
    const w = mountFor(overlord)
    expect(w.findAll('.opt-name').map((n) => n.text())).toContain('Resurrection Orb') // still on the page
    expect(w.findAll('.ues-inert')).toHaveLength(1)
    expect(w.find('.ues-inert input[type=checkbox]').attributes('disabled')).toBeDefined()
  })

  it('says what has to come off, by name', () => {
    const text = mountFor(overlord).find('.ues-blocked').text()
    expect(text).toContain('Requires removing:')
    expect(text).toContain('Tachyon arrow') // the sibling's own `rep`, not the orb
    expect(text).toContain('Overlord’s blade') // both halves of what that swap takes away
  })

  it('opens it once the sibling has been changed', () => {
    const sibGi = overlord.gear[orbGi].cond[0]
    const w = mountFor(overlord, { wg: [[sibGi, 0, 1]] })
    expect(w.findAll('.ues-inert')).toHaveLength(0)
    expect(w.find('.ues-blocked').exists()).toBe(false)
  })
})

describe('UnitEditorFields — unit composition', () => {
  const voidscarred = aeldari.units.find((u) => u.id === 'corsair-voidscarred')
  const ruststalkers = adeptusMechanicus.units.find((u) => u.id === 'sicarian-ruststalkers')

  it('spells out which profiles make up the squad', () => {
    // "5-10 models" says nothing about who they are; the breakdown does.
    expect(mountFor(wracks, { size: 1, count: 7 }).find('.ues-comp').text()).toBe('1× Acothyst + 6× Wrack')
  })

  it('tells tied size pills apart by what actually differs', () => {
    // Corsair Voidscarred prices three different 7-model builds at 140 points; the pills read
    // identically without the profile that separates them.
    const pills = mountFor(voidscarred).findAll('.pill').map((p) => p.text())
    const sevens = pills.filter((t) => t.startsWith('7 · 140'))
    expect(sevens).toHaveLength(3)
    expect(new Set(sevens).size).toBe(3)
    expect(sevens.join(' ')).toContain('Shade Runner')
  })

  it('caps an uncapped stepper by its own profile, not the whole squad', () => {
    // "Any number of Sicarian Ruststalkers can each have their transonic razor…" — the Princeps is
    // not one of them, so a 10-model unit allows 9 swaps, where the squad count would allow 10.
    const size = ruststalkers.sizes.findIndex((s) => s.per[1] === 10)
    const gi = ruststalkers.gear.findIndex((g) => g.m === 1 && g.in === 'stepper' && !g.lim && !g.all)
    expect(gi).toBeGreaterThan(-1)
    const w = mountFor(ruststalkers, { size, count: 10 })
    // Steppers render in group order; the model-count one lives outside the wargear sections.
    const wargearSteppers = w.findAllComponents(NumberStepper).slice(w.find('.ues-count').exists() ? 1 : 0)
    const before = ruststalkers.gear.slice(0, gi).filter((g) => g.in === 'stepper' || g.lim?.[0]?.[1] > 1).length
    expect(wargearSteppers[before].props('max')).toBe(9)
  })

  it('lets a model swap every copy of a weapon it carries twice', () => {
    // A Wraithlord's two shuriken catapults each become a flamer — one model, two picks. The
    // per-model ceiling alone stopped the stepper at one, so the second flamer was unbuildable.
    const gi = wraithlord.gear.findIndex((g) => g.cp)
    expect(gi).toBeGreaterThan(-1)
    const w = mountFor(wraithlord)
    const steppers = w.findAllComponents(NumberStepper).slice(w.find('.ues-count').exists() ? 1 : 0)
    const before = wraithlord.gear.slice(0, gi).filter((g) => g.in === 'stepper' || g.lim?.[0]?.[1] > 1).length
    expect(steppers[before].props('max')).toBe(2)
  })
})

describe('UnitEditorFields — unit size brackets', () => {
  // Chosen: 5 · 135pts, or 6-10 · 270pts. The bracket price is one number for every size in it,
  // so a 6-model unit in the second bracket pays the 10-model price.
  const chosen = chaosSpaceMarines.units.find((u) => u.id === 'chosen')

  it('fills the bracket to the top when it is picked', async () => {
    const entry = { uid: 'u1', id: chosen.id, size: 0 }
    const w = mount(UnitEditorFields, {
      props: { entry, def: chosen, items: rosterItems.items, texts: rosterItems.texts },
      global: { stubs: { Teleport: true } },
    })
    await w.findAll('.pill')[1].trigger('click') // the 6-10 bracket
    expect(entry.size).toBe(1)
    expect(entry.count).toBe(10) // not 6, and not four presses of "+"
  })

  it('leaves a fixed-size bracket saying nothing about its count', async () => {
    const entry = { uid: 'u1', id: chosen.id, size: 1, count: 10 }
    const w = mount(UnitEditorFields, {
      props: { entry, def: chosen, items: rosterItems.items, texts: rosterItems.texts },
      global: { stubs: { Teleport: true } },
    })
    await w.findAll('.pill')[0].trigger('click') // back to the 5-model bracket
    expect(entry.count).toBeUndefined()
  })

  it('says how far down the count may go', () => {
    const w = mountFor(chosen, { size: 1, count: 10 })
    expect(w.find('.ues-count .ues-cap').text()).toBe('min 6')
    // …and the stepper is what takes it there.
    expect(w.findComponent(NumberStepper).props('min')).toBe(6)
  })
})

describe('UnitEditorFields — allegiance', () => {
  const vindicator = chaosSpaceMarines.units.find((u) => u.id === 'chaos-vindicator')
  const sorcerer = chaosSpaceMarines.units.find((u) => u.id === 'sorcerer')
  const grinder = chaosDaemons.units.find((u) => u.id === 'soul-grinder')
  const pactbound = [{ name: 'Pactbound Zealots', dp: 3, enhancements: [] }]
  const mountWith = (def, detachments, entry = {}) => mount(UnitEditorFields, {
    props: { entry: { uid: 'u1', id: def.id, size: 0, ...entry }, def, items: rosterItems.items, texts: rosterItems.texts, detachments },
    global: { stubs: { Teleport: true } },
  })

  it('offers the marks only while the gating detachment is in the army', () => {
    expect(mountWith(vindicator, pactbound).text()).toContain('Mark of Chaos')
    expect(mountWith(vindicator, [{ name: 'Veterans of the Long War', enhancements: [] }]).text()).not.toContain('Mark of Chaos')
  })

  it('leaves KHORNE off a Psyker, because appdata does', () => {
    // "You cannot select the KHORNE keyword for a Psyker unit" — the Psyker datasheets point at a
    // second allegiance group that simply has no Khorne, so the restriction needs no parsing.
    const names = mountWith(sorcerer, pactbound).findAll('.pill').map((p) => p.text())
    expect(names).toContain('Tzeentch')
    expect(names).not.toContain('Khorne')
  })

  it('names the weapon a mark adds', () => {
    // Soul Grinder: "this model is additionally equipped with: phlegm bombardment".
    expect(mountWith(grinder, []).text()).toContain('Phlegm bombardment')
  })
})
