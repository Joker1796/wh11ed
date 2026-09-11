import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RosterPrintCard from './RosterPrintCard.vue'

// A sheet with one of everything the paper typography has to carry.
const SHEET = {
  name: 'Chaos Lord',
  profiles: [{ m: '6"', t: 4, sv: '3+', w: 5, ld: '6+', oc: 1, inv: '4+' }],
  ranged: [
    { name: 'Plasma pistol – standard', qty: 2, tags: ['PISTOL'], range: '12"', a: '1', bs: '2+', s: '7', ap: '-2', d: '1' },
    { name: 'Plasma pistol – supercharge', tags: ['PISTOL'], range: '12"', a: '1', bs: '2+', s: '8', ap: '-3', d: '2' },
  ],
  melee: [{ name: 'Daemon blade', tags: [], a: '6', ws: '2+', s: '5', ap: '-2', d: '2' }],
  core: 'Leader',
  faction: 'Dark Pacts',
  abilities: [{ name: 'Lord of Chaos', text: 'Re-roll Hit rolls of 1.' }],
  wargearAbilities: [{ name: 'Icon of Flame', text: 'Add 1 to something.' }],
  transport: 'This model can transport nothing.',
  damaged: { note: '1-3 wounds remaining', text: 'Subtract 1 from Hit rolls.' },
  composition: ['1 Chaos Lord'],
  options: ['This model can be equipped with…'],
  keywords: ['Infantry', 'Character'],
  factionKeywords: ['HERETIC ASTARTES'],
}

const card = (props = {}) => mount(RosterPrintCard, { props: { sheet: SHEET, ...props } })

describe('the name plate', () => {
  it('names the unit — paper has no page header to do it', () => {
    expect(card().find('.rpc-name').text()).toBe('Chaos Lord')
  })

  it('carries the facts of this copy beside the name', () => {
    const w = card({ tags: ['Warlord', '115 pts'] })
    const tags = w.findAll('.rpc-tag').map((n) => n.text())
    expect(tags).toEqual(['Warlord', '115 pts'])
  })
})

describe('the statline as a line', () => {
  it('prints the six stats and the invulnerable save', () => {
    const line = card().find('.rpc-statline').text()
    for (const part of ['M', '6"', 'T', '4', 'SV', '3+', 'W', '5', 'OC', 'INV', '4+']) {
      expect(line).toContain(part)
    }
  })

  it('marks a value the modifier layer rewrote', () => {
    const w = card({ statMarks: ['profile:t:0'] })
    expect(w.find('.rpc-stat-box.mod').exists()).toBe(true)
    expect(w.find('.rpc-stat-box.mod sup').text()).toBe('*')
  })
})

describe('the weapons', () => {
  it('keeps the count, the tags and the multi-profile grouping', () => {
    const w = card()
    const first = w.findAll('.rpc-weapons tbody tr')[0]
    expect(first.text()).toContain('×2')
    expect(first.text()).toContain('[PISTOL]')
    // The second profile of the shared name is indented under it.
    expect(w.findAll('.rpc-weapons tbody tr')[1].classes()).toContain('wg-end')
  })
})

describe('the abilities in columns', () => {
  it('glues a group heading to its first entry so a column never ends on a title', () => {
    const w = card()
    const withTitle = w.findAll('.rpc-ab').filter((n) => n.find('.rpc-abh').exists())
    expect(withTitle.map((n) => n.find('.rpc-abh').text())).toEqual(['Abilities', 'Wargear Abilities'])
    expect(withTitle[0].text()).toContain('Lord of Chaos')
  })

  it('prints transport and damaged as entries of the same stream', () => {
    const text = card().find('.rpc-abils').text()
    expect(text).toContain('Transport')
    expect(text).toContain('1-3 wounds remaining')
  })

  it('prints the build choices only when asked', () => {
    expect(card().text()).not.toContain('1 Chaos Lord')
    expect(card({ showChoices: true }).text()).toContain('1 Chaos Lord')
  })
})

describe('what a rule granted', () => {
  it('appends a granted keyword with a star and explains it once', () => {
    const w = card({ grantedKeywords: [{ kw: 'Battleline', detName: 'Renegade Raiders' }] })
    expect(w.find('.rpc-keywords').text()).toContain('Battleline*')
    expect(w.find('.rpc-footnote').text()).toContain('Renegade Raiders')
  })

  it('lists the modifier notes grouped by source', () => {
    const w = card({
      statNotes: [{ kind: 'armyRule', stat: 't', op: 'add', value: 1, source: 'Dark Pacts', live: true }],
    })
    expect(w.find('.rpc-mods').text()).toContain('Dark Pacts')
    expect(w.find('.rpc-mod').text()).toContain('+1 T')
  })

  it('shows a waiting modifier only when asked for', () => {
    const notes = [{ kind: 'armyRule', stat: 't', op: 'add', value: 1, source: 'Dark Pacts', live: false, when: { en: 'while charging' } }]
    expect(card({ statNotes: notes }).find('.rpc-mods').exists()).toBe(false)
    const shown = card({ statNotes: notes, showPossible: true })
    expect(shown.find('.rpc-mods').text()).toContain('while charging')
  })
})

// Two lines on this card are assembled from fragments — the abilities separated by ", ", the
// keyword groups by " | ", a granted entry marked with "*" that ties it to its footnote. Nothing
// checked the separators themselves, and they are the part that breaks silently: the template
// used to build them out of nested `<template v-if>`s, where a line break anywhere inside printed
// "Ability , Ability" on a sheet somebody takes to a table. `.text()` keeps inner whitespace, so
// these assertions are exact on purpose — a stray space fails them.
describe('the lines built out of fragments', () => {
  const lineWith = (label, props) => card(props).findAll('.rpc-line')
    .map((n) => n.text()).find((t) => t.startsWith(label))

  it('separates core abilities with ", " and marks a granted one', () => {
    expect(lineWith('Core', {})).toBe('Core: Leader')
    expect(lineWith('Core', { grantedCore: [{ ability: 'Feel No Pain 5+' }] }))
      .toBe('Core: Leader, Feel No Pain 5+*')
  })

  it('separates keyword groups with " | " and names the model each belongs to', () => {
    expect(lineWith('Keywords', {})).toBe('Keywords: Infantry, Character')
    const byModel = {
      ...SHEET,
      keywordsByModel: [
        { model: 'Chaos Lord', list: ['Infantry', 'Character'] },
        { model: 'Chaos Terminator', list: ['Infantry', 'Terminator'] },
      ],
    }
    expect(lineWith('Keywords', { sheet: byModel }))
      .toBe('Keywords: Chaos Lord - Infantry, Character | Chaos Terminator - Infantry, Terminator')
  })

  it('appends a rule-granted keyword after the printed ones, with its marker', () => {
    expect(lineWith('Keywords', { grantedKeywords: [{ kw: 'Deathwing', note: 'The Unforgiven' }] }))
      .toBe('Keywords: Infantry, Character, Deathwing*')
  })
})
