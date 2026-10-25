import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PresetDemo from './PresetDemo.vue'
import { TRACK_PRESETS } from '../../../data/trackerOptions.js'

// The preset dialog draws each preset (owner, 2026-10-20, in place of screenshots): the tabs and
// the turn bar must be the ones the game screen gives those settings (RoundTracker's `tabs`).
const values = (id) => TRACK_PRESETS.find((p) => p.id === id).values

describe('PresetDemo', () => {
  it('Minimal: the missions and the armies, no CP, the plain bar', () => {
    const w = mount(PresetDemo, { props: { values: values('minimal') } })
    expect(w.findAll('[role="tab"]')).toHaveLength(2)
    expect(w.text()).not.toContain('CP')
    expect(w.text()).not.toContain('Command phase')
  })
  it('Base adds the CP tab and column, and the Log tab', () => {
    const w = mount(PresetDemo, { props: { values: values('base') } })
    expect(w.findAll('[role="tab"]')).toHaveLength(4)
    expect(w.text()).toContain('CP')
  })
  it('Maximal: every tab, and the phase on the bar', () => {
    const w = mount(PresetDemo, { props: { values: values('maximal') } })
    expect(w.findAll('[role="tab"]')).toHaveLength(6)
    expect(w.text()).toContain('Command phase')
  })
})
