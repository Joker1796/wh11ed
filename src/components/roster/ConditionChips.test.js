import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ConditionChips from './ConditionChips.vue'

const sw = (id, extra = {}) => ({ id, label: { en: id, ru: id }, on: false, auto: false, ...extra })

describe('ConditionChips', () => {
  it('renders ungrouped switches flat, with no box of their own', () => {
    const w = mount(ConditionChips, { props: { switches: [sw('a'), sw('b')] } })
    expect(w.findAll('.cond-chip')).toHaveLength(2)
    expect(w.find('.cond-group.capped').exists()).toBe(false)
    expect(w.find('.cond-group-h').exists()).toBe(false)
  })

  // A pick-exactly-one group already reads as radio buttons, so it gets no counter either — only a
  // set that HOLDS several needs to say how full it is.
  it('leaves a single-slot group unboxed', () => {
    const items = [sw('x', { group: 'order', groupLimit: 1 }), sw('y', { group: 'order', groupLimit: 1 })]
    expect(mount(ConditionChips, { props: { switches: items } }).find('.cond-group.capped').exists()).toBe(false)
  })

  it('boxes a group that holds several and counts what is chosen', () => {
    const items = [
      sw('a1', { group: 'augmentation', groupLimit: 2, on: true }),
      sw('a2', { group: 'augmentation', groupLimit: 2 }),
      sw('a3', { group: 'augmentation', groupLimit: 2 }),
    ]
    const w = mount(ConditionChips, { props: { switches: items } })
    expect(w.find('.cond-group.capped').exists()).toBe(true)
    expect(w.find('.cond-group-h').text()).toBe('chosen: 1 of 2')
  })

  it('emits the switch it was asked to flip, and never flips an auto one', async () => {
    const w = mount(ConditionChips, { props: { switches: [sw('a'), sw('b', { auto: true })] } })
    const chips = w.findAll('.cond-chip')
    await chips[0].trigger('click')
    expect(w.emitted('toggle')[0][0].id).toBe('a')
    expect(chips[1].attributes('disabled')).toBeDefined()
  })
})
