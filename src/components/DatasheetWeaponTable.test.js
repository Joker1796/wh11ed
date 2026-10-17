// A weapon tag that is no core ability opens the sheet's own text (2026-10-16: the Culexus
// Assassin's [PSYCHIC ASSASSIN] opened [PSYCHIC]).
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

const openRule = vi.fn()
vi.mock('../composables/useKeywordPopover.js', () => ({ useKeywordPopover: () => ({ openRule }) }))
const DatasheetWeaponTable = (await import('./DatasheetWeaponTable.vue')).default

describe('DatasheetWeaponTable — a tag the sheet explains', () => {
  it('opens the sheet\'s own ability; a core tag stays a core keyword', async () => {
    const row = { name: 'Animus speculum', range: '18"', a: 'D3', bs: '2+', s: '5', ap: '-1', d: '1', tags: ['PSYCHIC ASSASSIN', 'IGNORES COVER'], gpos: 'single' }
    const rules = [{ name: 'Psychic Assassin', text: 'Each time you target a PSYKER unit…' }]
    const w = mount(DatasheetWeaponTable, { props: { kind: 'ranged', rows: [row], isMarked: () => false, rules } })
    const own = w.findAll('.wtag .keyword').find((e) => e.text() === '[PSYCHIC ASSASSIN]')
    expect(own.attributes('data-kw-open')).toBeDefined()
    await own.trigger('click')
    expect(openRule).toHaveBeenCalledWith('[PSYCHIC ASSASSIN]', 'Each time you target a PSYKER unit…', expect.anything())
    const core = w.findAll('.wtag .keyword').find((e) => e.text() === '[IGNORES COVER]')
    expect(core.attributes('data-kw-open')).toBeUndefined()
  })
})
