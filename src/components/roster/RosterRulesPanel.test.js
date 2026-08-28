import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

let RosterRulesPanel

beforeEach(async () => {
  vi.resetModules()
  ;({ default: RosterRulesPanel } = await import('./RosterRulesPanel.vue'))
})

// The faction bundle arrives through a dynamic import, and the RuleBlock/StratCard that render it
// are async components of their own — so a match can take more than one microtask flush.
async function waitForSelector(w, selector, tries = 60) {
  for (let i = 0; i < tries; i++) {
    await flushPromises()
    if (w.find(selector).exists()) return
    await new Promise((r) => setTimeout(r, 25))
  }
}

const mountPanel = () => mount(RosterRulesPanel, {
  props: { factionSlug: 'space-marines', detachments: ['Gladius Task Force'] },
})

describe('RosterRulesPanel', () => {
  // Closed, and nothing loaded: the builder must not pay 30-60 KB of faction rules for a panel
  // nobody opened.
  it('starts closed and loads nothing until it is opened', async () => {
    const w = mountPanel()
    await flushPromises()
    expect(w.find('.rrp-head').attributes('aria-expanded')).toBe('false')
    expect(w.find('.rrp-sec').exists()).toBe(false)
    expect(w.text()).toContain('Gladius Task Force')   // which detachments it is about, while shut
  })

  // Opened, it holds one fold per thing: the army rule, each picked detachment, the enhancements
  // those detachments offer and their stratagems.
  it('opens into a fold per rule, per enhancement set and per stratagem set', async () => {
    const w = mountPanel()
    await w.find('.rrp-head').trigger('click')
    await waitForSelector(w, '.rrp-sec')

    const { ui } = await import('../../i18n/ui.js')
    const titles = w.findAll('.rrp-sec-title').map((t) => t.text())
    expect(titles).toEqual([
      ui.en.factionArmyRule,
      'Gladius Task Force',
      ui.en.factionEnhancements,
      ui.en.factionStratagems,
    ])
    // Every inner fold starts shut too — opening the panel must not unroll thirty stratagems.
    expect(w.findAll('.rrp-sec-head').every((h) => h.attributes('aria-expanded') === 'false')).toBe(true)
  })

  it('renders the detachment rule text once its fold is opened', async () => {
    const w = mountPanel()
    await w.find('.rrp-head').trigger('click')
    await waitForSelector(w, '.rrp-sec')

    const det = w.findAll('.rrp-sec-head')[1]
    await det.trigger('click')
    await waitForSelector(w, '.rule-block')
    expect(det.attributes('aria-expanded')).toBe('true')
    expect(w.find('.rrp-sec-body').text().length).toBeGreaterThan(0)
  })
})
