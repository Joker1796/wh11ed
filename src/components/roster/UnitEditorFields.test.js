import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UnitEditorFields from './UnitEditorFields.vue'
import rosterItems from '../../data/roster/items.js'
import drukhari from '../../data/roster/drukhari.js'

// Mounted against REAL generated data: what this guards is the path from the generator's bundled
// options to what the player actually reads, which a fixture would hide.
const wracks = drukhari.units.find((u) => u.id === 'wracks')
const mountFor = (def) => mount(UnitEditorFields, {
  props: { entry: { uid: 'u1', id: def.id, size: 0 }, def, items: rosterItems.items, texts: rosterItems.texts },
  global: { stubs: { Teleport: true, NumberStepper: true } },
})

describe('UnitEditorFields — wargear instructions', () => {
  it('renders the option list as separate lines, not one run-on heading', () => {
    const w = mountFor(wracks)
    const list = w.findAll('.ues-blist')[0]
    expect(list.findAll('li')).toHaveLength(4)
    expect(list.findAll('li')[0].text()).toContain('hexrifle')
    // the marker is presentation now, not text
    expect(w.text()).not.toContain('◦')
  })

  it('labels a bundled option with every item it grants', () => {
    const names = mountFor(wracks).findAll('.opt-name').map((n) => n.text())
    expect(names).toContain('Hexrifle + Torturer’s tool')
    expect(names).not.toContain('Hexrifle')
  })
})
