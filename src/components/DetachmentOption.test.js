import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DetachmentOption from './DetachmentOption.vue'
import FactionDetachmentList from './FactionDetachmentList.vue'
import { dispositionColor } from '../data/dispositionColors.js'

// The faction pages' detachment picker drew its own rows and never got the Force Disposition
// colour the roster's wore (a player's report, 2026-09-24). Both draw this row now.
describe('DetachmentOption', () => {
  it('wears its Force Disposition: the chip in its colour pair', () => {
    const w = mount(DetachmentOption, { props: { name: 'Awakened Dynasty', forceDispositions: ['Take and Hold'], dp: 2 } })
    const c = dispositionColor('Take and Hold')
    expect(c).toBeTruthy()
    expect(w.classes()).not.toContain('tone-bar')
    const chip = w.find('.tone-chip')
    expect(chip.classes()).toContain('tone')
    expect(chip.attributes('style')).toContain(c.light)
    expect(chip.text()).toBe('Take and Hold')
    expect(w.find('.det-dp').text()).toBe('2 DP')
  })

  // Core rules 25.04: a detachment gives access to one or more dispositions — 39 carry two in the
  // MFM (Warpbane Task Force, a player's report 2026-10-01). Each chip wears its own colour.
  it('wears every disposition it gives access to, each in its own colour', () => {
    const w = mount(DetachmentOption, { props: { name: 'Warpbane Task Force', forceDispositions: ['Take and Hold', 'Purge the Foe'], dp: 3 } })
    const chips = w.findAll('.tone-chip')
    expect(chips.map((c) => c.text())).toEqual(['Take and Hold', 'Purge the Foe'])
    expect(chips[1].attributes('style')).toContain(dispositionColor('Purge the Foe').light)
  })

  // A compact row with a tag and two dispositions cannot hold them beside its name: it takes two
  // lines, the cost up by the name (Awakened Dynasty, owner 2026-10-01). A lighter row stays one line.
  it('stacks a crowded compact row, and leaves a light one on one line', () => {
    const crowded = mount(DetachmentOption, { props: { name: 'Awakened Dynasty', unique: 'DYNASTY', forceDispositions: ['Take and Hold', 'Priority Assets'], dp: 3, compact: true } })
    expect(crowded.classes()).toContain('stacked')
    const light = mount(DetachmentOption, { props: { name: 'Warpbane Task Force', forceDispositions: ['Take and Hold', 'Purge the Foe'], dp: 3, compact: true } })
    expect(light.classes()).not.toContain('stacked')
  })

  // The faction bar reuses its picker for the Chapter list — plain names, no colour, no cost.
  it('stays a plain row for a plain option', () => {
    const w = mount(DetachmentOption, { props: { name: 'Ultramarines' } })
    expect(w.classes()).not.toContain('tone')
    expect(w.find('.tone-chip').exists()).toBe(false)
    expect(w.find('.det-dp').exists()).toBe(false)
  })

  it('is what the faction picker draws, disposition included', () => {
    const w = mount(FactionDetachmentList, {
      props: { detachments: [{ id: 'a', name: 'Awakened Dynasty', forceDispositions: ['Take and Hold'], dp: 2 }] },
    })
    expect(w.find('.det .tone-chip').text()).toBe('Take and Hold')
  })
})
