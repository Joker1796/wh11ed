import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DetachmentOption from './DetachmentOption.vue'
import FactionDetachmentPickerModal from './FactionDetachmentPickerModal.vue'
import { dispositionColor } from '../data/dispositionColors.js'

// The faction pages' detachment picker drew its own rows and never got the Force Disposition
// colour the roster's wore (a player's report, 2026-09-24). Both draw this row now.
describe('DetachmentOption', () => {
  it('wears its Force Disposition: the chip in its colour pair', () => {
    const w = mount(DetachmentOption, { props: { name: 'Awakened Dynasty', forceDisposition: 'Take and Hold', dp: 2 } })
    const c = dispositionColor('Take and Hold')
    expect(c).toBeTruthy()
    expect(w.classes()).toEqual(expect.arrayContaining(['det', 'tone']))
    expect(w.classes()).not.toContain('tone-bar')
    expect(w.attributes('style')).toContain(c.light)
    expect(w.find('.tone-chip').text()).toBe('Take and Hold')
    expect(w.find('.det-dp').text()).toBe('2 DP')
  })

  // The faction bar reuses its picker for the Chapter list — plain names, no colour, no cost.
  it('stays a plain row for a plain option', () => {
    const w = mount(DetachmentOption, { props: { name: 'Ultramarines' } })
    expect(w.classes()).not.toContain('tone')
    expect(w.find('.tone-chip').exists()).toBe(false)
    expect(w.find('.det-dp').exists()).toBe(false)
  })

  it('is what the faction picker draws, disposition included', () => {
    const w = mount(FactionDetachmentPickerModal, {
      props: { detachments: [{ id: 'a', name: 'Awakened Dynasty', forceDisposition: 'Take and Hold', dp: 2 }] },
      global: { stubs: { Teleport: true } },
    })
    expect(w.find('.det .tone-chip').text()).toBe('Take and Hold')
  })
})
