import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RosterBattleSizeField from './RosterBattleSizeField.vue'

// jsdom has no wide screen, so AdaptivePicker takes the modal shape; BaseModal teleports, and a
// stub keeps the list in the wrapper's own tree.
const stubs = { BaseModal: { template: '<div class="modal-stub"><slot /></div>' } }
// The facts under the chosen value — the last line on the field (the list's own come first).
const facts = (w) => w.findAll('.bsf-facts-line').at(-1).findAll('span').map((e) => e.text())

describe('RosterBattleSizeField', () => {
  it('says what the chosen limit decides besides the points', () => {
    const w = mount(RosterBattleSizeField, { props: { limit: { battleSize: 'incursion', customPoints: 2000 } }, global: { stubs } })
    expect(w.find('.bsf-trigger').text()).toContain('1000')
    expect(facts(w)).toEqual(['2 DP', 'enhancements: 2', 'unit copies: 2', 'Battleline: 4'])
  })

  it('offers every option with its facts, and emits the pick', async () => {
    const w = mount(RosterBattleSizeField, { props: { limit: { battleSize: 'strike-force', customPoints: 2000 } }, global: { stubs } })
    await w.find('.bsf-trigger').trigger('click')
    const opts = w.findAll('.bsf-opt')
    expect(opts.map((o) => o.attributes('data-limit'))).toEqual(['incursion', 'strike-force', 'onslaught', 'custom', 'none'])
    expect(w.find('.bsf-opt.on').attributes('data-limit')).toBe('strike-force')
    expect(opts[4].text()).toContain('not limited')
    await opts[4].trigger('click')
    expect(w.emitted('update:limit')[0][0]).toMatchObject({ battleSize: 'none' })
  })

  it('a custom number borrows the limits of the size it falls within, and steps by 50', async () => {
    const w = mount(RosterBattleSizeField, { props: { limit: { battleSize: 'custom', customPoints: 750 } }, global: { stubs } })
    expect(facts(w)[0]).toContain('Incursion')
    expect(facts(w)).toContain('2 DP')
    await w.findAll('.rcl-points .step-btn')[1].trigger('click')
    expect(w.emitted('update:limit')[0][0]).toMatchObject({ battleSize: 'custom', customPoints: 800 })
    await w.find('.rcl-points .step-edit').trigger('click')
    await w.find('.rcl-points .step-input').setValue('-20')
    await w.find('.rcl-points .step-input').trigger('blur')
    expect(w.emitted('update:limit')[1][0].customPoints).toBe(0)
  })

  it('no limit has nothing to count, only says so', () => {
    const w = mount(RosterBattleSizeField, { props: { limit: { battleSize: 'none', customPoints: 2000 } }, global: { stubs } })
    expect(w.find('.bsf-trigger').text()).toContain('No limit')
    expect(w.find('.rcl-points').exists()).toBe(false)
    expect(facts(w)).toEqual(['Points, Detachment Points, enhancements and unit copies are not limited'])
  })

  // The player's own limits: borrowed until moved, each one on its own, all dropped by the reset.
  it('sets the player\u2019s own limits one by one, and goes back to the size', async () => {
    const w = mount(RosterBattleSizeField, { props: { limit: { battleSize: 'custom', customPoints: 1500 } }, global: { stubs } })
    // Under the phone's field only the number; the limits are in the dialog behind the sliders.
    expect(w.find('.rcl-card').exists()).toBe(false)
    await w.find('.lsb').trigger('click')
    const rows = w.findAll('.rcl-card .rcl-row')
    expect(rows.map((r) => r.find('.step-num').text())).toEqual(['1500', '3', '4', '3', '6'])
    // + on Battleline copies: only that key is written.
    await rows[4].findAll('.step-btn')[1].trigger('click')
    expect(w.emitted('update:limit')[0][0]).toMatchObject({ customLimits: { line: 7 } })

    await w.setProps({ limit: { battleSize: 'custom', customPoints: 1500, customLimits: { dp: 1, line: 7 } } })
    expect(facts(w)).toEqual(['own limits:', '1 DP', 'enhancements: 4', 'unit copies: 3', 'Battleline: 7'])
    await w.find('.bsf-reset').trigger('click')
    expect(w.emitted('update:limit').at(-1)[0]).toEqual({ battleSize: 'custom', customPoints: 1500 })
  })
})
