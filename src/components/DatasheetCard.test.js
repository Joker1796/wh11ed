import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DatasheetCard from './DatasheetCard.vue'

// Minimal sheet — every heavy section (profiles/ranged/melee/points) is v-if-guarded, so a
// keyword-only sheet renders the keyword line and nothing else.
const sheet = (over = {}) => ({ id: 'terminator-squad', name: 'Terminator Squad', keywords: ['Infantry', 'Terminator'], factionKeywords: ['Adeptus Astartes'], ...over })

const kwLine = (w) => w.find('.ds-keywords').findAll('.ds-kw').map((n) => n.text())

describe('DatasheetCard granted keywords', () => {
  it('appends rule-granted keywords to the printed keyword line', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet(), grantedKeywords: ['Deathwing'] } })
    expect(kwLine(w)).toEqual(['Infantry', 'Terminator', 'Deathwing', 'Adeptus Astartes'])
  })

  it('does not double a keyword the sheet already prints', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet({ keywords: ['Infantry', 'Deathwing'] }), grantedKeywords: ['Deathwing'] } })
    expect(kwLine(w).filter((k) => k === 'Deathwing')).toHaveLength(1)
  })

  it('renders only the printed keywords when no grants are passed', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet() } })
    expect(kwLine(w)).toEqual(['Infantry', 'Terminator', 'Adeptus Astartes'])
  })
})
