import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RosterOwnLimitsMark from './RosterOwnLimitsMark.vue'

describe('RosterOwnLimitsMark', () => {
  it('marks a list held to the player’s own limits, and lists them all', () => {
    const w = mount(RosterOwnLimitsMark, { props: { roster: { battleSize: 'custom', customPoints: 1500, customLimits: { dp: 2 } } } })
    expect(w.find('button.olm').exists()).toBe(true)
    expect(w.find('button.olm').attributes('title')).toBe(
      'Points limit: 1500 · Detachment Points: 2 · Enhancements: 4 · Copies of a unit: 3 · Copies of Battleline: 6')
  })
  it('says nothing for a printed size or a bare custom number', () => {
    for (const roster of [{ battleSize: 'strike-force' }, { battleSize: 'custom', customPoints: 1500 }, { battleSize: 'none' }]) {
      expect(mount(RosterOwnLimitsMark, { props: { roster } }).find('.olm').exists()).toBe(false)
    }
  })
  it('is plain text inside another button', () => {
    const w = mount(RosterOwnLimitsMark, { props: { inert: true, roster: { battleSize: 'custom', customLimits: { dup: 1 } } } })
    expect(w.find('button').exists()).toBe(false)
    expect(w.find('span.olm').text()).toBe('custom limits')
  })
  it('can be just the icon, with what it means in the tooltip', () => {
    const w = mount(RosterOwnLimitsMark, { props: { inert: true, iconOnly: true, roster: { battleSize: 'custom', customLimits: { dup: 1 } } } })
    expect(w.find('span.olm').text()).toBe('')
    expect(w.find('span.olm').attributes('title')).toMatch(/: .*Copies of a unit: 1/)
  })
})
