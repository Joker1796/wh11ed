import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GameSetup from './GameSetup.vue'

beforeEach(() => {
  localStorage.clear()
  vi.resetModules()
})

describe('GameSetup', () => {
  it('mounts on step 1 with You / Opponent player cards', () => {
    const w = mount(GameSetup)
    expect(w.text()).toContain('You')
    expect(w.text()).toContain('Opponent')
    expect(w.findAll('.player-card').length).toBeGreaterThanOrEqual(2)
    // a faction picker button per player (opens FactionPickerModal)
    expect(w.findAll('.faction-btn').length).toBeGreaterThanOrEqual(2)
  })

  it('defaults the battle size to Strike Force', () => {
    const w = mount(GameSetup)
    const onBtn = w.find('.battle-size .seg button.on')
    expect(onBtn.exists()).toBe(true)
    expect(onBtn.text()).toContain('Strike Force')
  })

  it('disables "Next" until both armies are valid (no faction chosen yet)', () => {
    const w = mount(GameSetup)
    // The step-1 advance button is the disabled primary action.
    const disabledPrimary = w.findAll('.actions .btn-primary').filter(b => b.attributes('disabled') !== undefined)
    expect(disabledPrimary.length).toBeGreaterThan(0)
  })

  it('opens the score-mode help modal on the ? button', async () => {
    const w = mount(GameSetup)
    expect(w.find('.sh-table').exists()).toBe(false)
    await w.find('.help-btn').trigger('click')
    expect(w.find('.sh-table').exists()).toBe(true) // ScoreHelpModal rendered
  })
})
