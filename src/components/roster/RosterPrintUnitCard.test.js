import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

// The resolution itself is tested where it lives (rosterStatMods / the modal's own spec). What
// this component decides is WHICH of the three answers goes on the paper, so the composable is
// stood in for by three distinguishable ones.
const printed = { id: 'u', name: 'Printed' }
const trimmed = { id: 'u', name: 'Trimmed' }
const modified = { id: 'u', name: 'Modified' }
vi.mock('../../composables/rosterUnitCard.js', () => ({
  useRosterUnitCard: () => ({
    sheet: { value: printed },
    view: { value: { sheet: trimmed, grantedKeywords: [{ kw: 'Battleline' }], context: { warlord: true } } },
    statMods: { value: { sheet: modified, marks: ['ranged:ap:0'], core: [{ ability: 'Lethal Hits' }] } },
    statNotes: { value: [{ source: 'Crazed Focus' }] },
    allGrantedKeywords: { value: [{ kw: 'Battleline' }, { kw: 'Destroyer Cult' }] },
  }),
}))

const { default: RosterPrintUnitCard } = await import('./RosterPrintUnitCard.vue')

const OPTS = { modifiers: true, trim: true, possible: true, choices: false, pageBreak: false }
const card = (opts = {}, props = {}) => mount(RosterPrintUnitCard, {
  props: { unitId: 'u', factionSlug: 'chaos-space-marines', ctx: {}, opts: { ...OPTS, ...opts }, ...props },
  global: { stubs: { DatasheetCard: { name: 'DatasheetCard', props: ['sheet', 'statMarks', 'statNotes', 'grantedKeywords', 'hidePossible', 'hideChoices'], template: '<div class="ds" />' } } },
})

const sheetOf = (w) => w.findComponent({ name: 'DatasheetCard' }).props('sheet')

describe('which sheet goes on the paper', () => {
  it('prints the roster\'s own numbers when modifiers are on', () => {
    expect(sheetOf(card()).name).toBe('Modified')
  })

  // The reason the switch exists: a sheet handed to an opponent is read as a datasheet, so
  // "off" has to mean the printed numbers — never a wrong number, and never a silent one.
  it('prints the datasheet\'s numbers when they are off, with nothing marked', () => {
    const w = card({ modifiers: false })
    expect(sheetOf(w).name).toBe('Trimmed')
    const ds = w.findComponent({ name: 'DatasheetCard' })
    expect(ds.props('statMarks')).toEqual([])
    expect(ds.props('statNotes')).toEqual([])
  })

  it('prints the whole datasheet when the loadout trim is off too', () => {
    expect(sheetOf(card({ trim: false })).name).toBe('Printed')
  })

  // A keyword a rule GRANTS is a statement that the rule is being applied; with the overlay off
  // the card must read as the printed one.
  it('claims a granted keyword only where its rule is being applied', () => {
    const kws = (opts) => card(opts).findComponent({ name: 'DatasheetCard' }).props('grantedKeywords').map((g) => g.kw)
    expect(kws({})).toContain('Destroyer Cult')
    expect(kws({ modifiers: false })).toEqual(['Battleline'])
    expect(kws({ trim: false })).toEqual([])
  })
})

describe('the line above the card', () => {
  it('says what makes this copy different, and what it cost', () => {
    const w = card({}, { points: 115, role: 'Leader' })
    const text = w.find('.rpu-ctx').text()
    expect(text).toContain('Leader')
    expect(text).toContain('Warlord')
    expect(text).toContain('115')
  })

  it('says nothing about points when prices are not being printed', () => {
    expect(card().find('.rpu-ctx').text()).not.toContain('115')
  })
})

describe('the conditional modifiers', () => {
  it('are printed only when asked for', () => {
    expect(card().findComponent({ name: 'DatasheetCard' }).props('hidePossible')).toBe(false)
    expect(card({ possible: false }).findComponent({ name: 'DatasheetCard' }).props('hidePossible')).toBe(true)
  })
})
