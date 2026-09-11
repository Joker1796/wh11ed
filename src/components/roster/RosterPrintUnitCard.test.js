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
  global: { stubs: { RosterPrintCard: { name: 'RosterPrintCard', props: ['sheet', 'tags', 'statMarks', 'statNotes', 'grantedKeywords', 'showPossible', 'showChoices'], template: '<div class="rpc" />' } } },
})

const cardOf = (w) => w.findComponent({ name: 'RosterPrintCard' })
const sheetOf = (w) => cardOf(w).props('sheet')

describe('which sheet goes on the paper', () => {
  it('prints the roster\'s own numbers when modifiers are on', () => {
    expect(sheetOf(card()).name).toBe('Modified')
  })

  // The reason the switch exists: a sheet handed to an opponent is read as a datasheet, so
  // "off" has to mean the printed numbers — never a wrong number, and never a silent one.
  it('prints the datasheet\'s numbers when they are off, with nothing marked', () => {
    const w = card({ modifiers: false })
    expect(sheetOf(w).name).toBe('Trimmed')
    expect(cardOf(w).props('statMarks')).toEqual([])
    expect(cardOf(w).props('statNotes')).toEqual([])
  })

  it('prints the whole datasheet when the loadout trim is off too', () => {
    expect(sheetOf(card({ trim: false })).name).toBe('Printed')
  })

  // A keyword a rule GRANTS is a statement that the rule is being applied; with the overlay off
  // the card must read as the printed one.
  it('claims a granted keyword only where its rule is being applied', () => {
    const kws = (opts) => cardOf(card(opts)).props('grantedKeywords').map((g) => g.kw)
    expect(kws({})).toContain('Destroyer Cult')
    expect(kws({ modifiers: false })).toEqual(['Battleline'])
    expect(kws({ trim: false })).toEqual([])
  })
})

describe('the name plate facts', () => {
  it('say what makes this copy different, and what it cost', () => {
    const tags = cardOf(card({}, { points: 115, role: 'Leader' })).props('tags')
    expect(tags.join(' · ')).toContain('Leader')
    expect(tags.join(' · ')).toContain('Warlord')
    expect(tags.join(' · ')).toContain('115')
  })

  it('say nothing about points when prices are not being printed', () => {
    expect(cardOf(card()).props('tags').join(' ')).not.toContain('115')
  })
})

describe('the conditional modifiers', () => {
  it('are printed only when asked for', () => {
    expect(cardOf(card()).props('showPossible')).toBe(true)
    expect(cardOf(card({ possible: false })).props('showPossible')).toBe(false)
  })
})
