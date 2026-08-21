import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, DOMWrapper, flushPromises } from '@vue/test-utils'
import GameSetup from './GameSetup.vue'
import RosterPickerModal from './RosterPickerModal.vue'

beforeEach(() => {
  localStorage.clear()
  vi.resetModules()
})
// BaseModal teleports to <body>; clear it between tests since nothing else unmounts it.
afterEach(() => { document.body.innerHTML = '' })

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

  // Attaching a list is optional and lives only here, at setup — but when one IS attached it is
  // the description of the army, so it decides the faction and the detachments rather than being
  // checked against picks made separately.
  // A list describes ONE army, so it stands where the faction picker would be rather than beside
  // one that could contradict it.
  it('takes the faction and detachments from an attached roster', async () => {
    const w = mount(GameSetup)
    await w.findAll('.rp-open')[0].trigger('click')
    w.findComponent(RosterPickerModal).vm.$emit('pick', {
      id: 'r1', name: 'Da List', faction: 'orks', detachments: ['Bully Boyz'],
      battleSize: 'strike-force', units: [{ uid: 'a', id: 'boyz', size: 0 }],
    })
    await flushPromises()

    const line = w.findAll('.player-card')[0].find('.roster-line')
    expect(line.text()).toContain('Orks')
    expect(line.text()).toContain('Da List')
    expect(w.findAll('.player-card')[0].find('.faction-btn').exists()).toBe(false)
    expect(w.findAll('.player-card')[0].text()).toContain('Bully Boyz')
  })

  // Detaching is the only way back to picking a faction by hand — which is also why the
  // "a faction change detaches the list" guard in resolveArmyChoice is now unreachable from
  // this screen and kept only for a draft restored with the two out of step.
  it('hands the faction picker back when the list is detached, keeping the faction it chose', async () => {
    const w = mount(GameSetup)
    await w.findAll('.rp-open')[0].trigger('click')
    w.findComponent(RosterPickerModal).vm.$emit('pick', {
      id: 'r1', name: 'Da List', faction: 'orks', detachments: ['Bully Boyz'], units: [],
    })
    await flushPromises()

    await w.findAll('.player-card')[0].find('.rl-clear').trigger('click')
    await flushPromises()

    const card = w.findAll('.player-card')[0]
    expect(card.find('.roster-line').exists()).toBe(false)
    expect(card.find('.faction-btn').text()).toContain('Orks')
  })

  it('opens the score-mode help modal on the ? button', async () => {
    const w = mount(GameSetup)
    const body = new DOMWrapper(document.body)
    expect(body.find('.sh-table').exists()).toBe(false)
    await w.find('.help-btn').trigger('click')
    expect(body.find('.sh-table').exists()).toBe(true) // ScoreHelpModal rendered (teleported to body)
  })
})
