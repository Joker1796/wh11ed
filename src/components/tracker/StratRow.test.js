import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StratRow from './StratRow.vue'

const strat = { _key: 'core:cr', name: 'Command Re-roll', when: 'Any phase.', _cost: 1 }

describe('StratRow', () => {
  it('greys the undo with the strict rules\' reason under the row', () => {
    const w = mount(StratRow, { props: { strat, cost: 1, used: 1, undoable: true, undoWhy: 'Only the last action' } })
    expect(w.find('.sr-undo').attributes('disabled')).toBeDefined()
    expect(w.find('.sr-why').text()).toBe('Only the last action')
  })

  it('leaves the undo live without one', () => {
    const w = mount(StratRow, { props: { strat, cost: 1, used: 1, undoable: true } })
    expect(w.find('.sr-undo').attributes('disabled')).toBeUndefined()
    expect(w.find('.sr-why').exists()).toBe(false)
  })
})

// Shown, not paid for here (`stratSpendCp` off, owner 2026-10-25): the cost is information.
describe('StratRow — not paid for here', () => {
  it('shows the cost with nothing to press', () => {
    const w = mount(StratRow, { props: { strat, cost: 1, playable: false, used: 1, undoable: true } })
    expect(w.find('.sr-use').exists()).toBe(false)
    expect(w.find('.sr-adjust').exists()).toBe(false)
    expect(w.find('.sr-cost').text()).toBe('1CP')
    expect(w.find('.sr-foot').exists()).toBe(false)
  })
})
