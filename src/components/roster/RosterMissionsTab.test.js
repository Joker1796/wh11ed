import { describe, it, expect } from 'vitest'
import { mount, DOMWrapper } from '@vue/test-utils'
import RosterMissionsTab from './RosterMissionsTab.vue'

const mountTab = (props) => mount(RosterMissionsTab, {
  props: { candidates: ['Disruption', 'Priority Assets'], declared: 'Priority Assets', editable: true, ...props },
})
const rows = (w) => w.findAll('.rmt-row').map((r) => r.findAll('.rmt-name').map((n) => n.text()))

describe('RosterMissionsTab', () => {
  it('shows both sides of all five matchups for the declared disposition', () => {
    const w = mountTab()
    // Priority Assets vs Take and Hold: Secure Asset for us, Inescapable Dominion for them.
    expect(rows(w)).toHaveLength(5)
    expect(rows(w)[0]).toEqual(['Secure Asset', 'Inescapable Dominion'])
    // The mirror matchup (Priority Assets vs itself) is one shared plaque.
    expect(rows(w)[4]).toEqual(['Sabotage'])
    expect(w.find('.rmt-status').text()).toContain('Declared')
  })

  it('previews an alternative without changing the list, and says which one the list plays', async () => {
    const w = mountTab()
    // Nothing to change while the declared one is on screen.
    expect(w.find('.rmt-change').exists()).toBe(false)
    await w.findAll('.rmt-cand')[0].trigger('click')
    expect(rows(w)[0]).toEqual(['Death Trap', 'Determined Acquisition'])
    expect(w.find('.rmt-status').text()).toContain('Priority Assets')
    expect(w.emitted('change')).toBeUndefined()
    await w.find('.rmt-change').trigger('click')
    expect(w.emitted('change')[0]).toEqual(['Disruption'])
  })

  it('offers no change where there is nothing to choose, or the list is not editable', () => {
    expect(mountTab({ candidates: ['Disruption'], declared: 'Disruption' }).find('.rmt-change').exists()).toBe(false)
    expect(mountTab({ editable: false, declared: null }).find('.rmt-change').exists()).toBe(false)
    // Undeclared: the button offers to choose, on whichever one is being looked at.
    expect(mountTab({ declared: null }).find('.rmt-change').exists()).toBe(true)
  })

  it('opens one mission in a dialog that says whose it is', async () => {
    const w = mount(RosterMissionsTab, {
      props: { candidates: ['Priority Assets'], declared: 'Priority Assets' },
      attachTo: document.body,
    })
    await w.findAll('.rmt-row')[0].find('.rmt-m.theirs').trigger('click')
    const body = new DOMWrapper(document.body)
    expect(body.text()).toContain("Opponent's mission")
    expect(body.text()).toContain('Take and Hold vs Priority Assets')
    expect(body.find('.mcard-name').text()).toBe('Inescapable Dominion')
    w.unmount()
  })
})
