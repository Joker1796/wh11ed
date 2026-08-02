import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DatasheetCard from './DatasheetCard.vue'

// Minimal sheet — every heavy section (profiles/ranged/melee/points) is v-if-guarded, so a
// keyword-only sheet renders the keyword line and nothing else.
const sheet = (over = {}) => ({ id: 'terminator-squad', name: 'Terminator Squad', keywords: ['Infantry', 'Terminator'], factionKeywords: ['Adeptus Astartes'], ...over })

const kwLine = (w) => w.find('.ds-keywords').findAll('.ds-kw').map((n) => n.text())

describe('DatasheetCard granted keywords', () => {
  it('appends rule-granted keywords to the printed keyword line', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet(), grantedKeywords: [{ kw: 'Deathwing', detName: null }] } })
    expect(kwLine(w)).toEqual(['Infantry', 'Terminator', 'Deathwing', 'Adeptus Astartes'])
  })

  it('does not double a keyword the sheet already prints', () => {
    const w = mount(DatasheetCard, {
      props: { sheet: sheet({ keywords: ['Infantry', 'Deathwing'] }), grantedKeywords: [{ kw: 'Deathwing', detName: null }] },
    })
    expect(kwLine(w).filter((k) => k === 'Deathwing')).toHaveLength(1)
  })

  it('renders only the printed keywords when no grants are passed', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet() } })
    expect(kwLine(w)).toEqual(['Infantry', 'Terminator', 'Adeptus Astartes'])
  })

  it('marks a granted keyword with an asterisk and footnotes its source', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet(), grantedKeywords: [{ kw: 'Deathwing', detName: null }] } })
    expect(w.find('.ds-kw-star').exists()).toBe(true)
    const footnote = w.find('.ds-kw-footnote').text()
    expect(footnote).toContain('Deathwing')
    expect(footnote).toContain("this faction's own rules")
  })

  it('footnotes a detachment-gated grant with the detachment name', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet(), grantedKeywords: [{ kw: 'Shadow Legion', detName: 'Shadow Legion' }] } })
    const footnote = w.find('.ds-kw-footnote').text()
    expect(footnote).toContain('the Shadow Legion detachment')
  })

  it('groups keywords sharing the same source into one footnote line', () => {
    const w = mount(DatasheetCard, {
      props: {
        sheet: sheet(),
        grantedKeywords: [
          { kw: 'Deathwing', detName: null },
          { kw: 'Ravenwing', detName: null },
        ],
      },
    })
    expect(w.findAll('.ds-kw-footnote')).toHaveLength(1)
  })

  it('adds a caveat when the grant depends on an extra un-modelled condition (e.g. Warlord)', () => {
    const w = mount(DatasheetCard, {
      props: { sheet: sheet(), grantedKeywords: [{ kw: 'Battleline', detName: 'Bridgehead Strike', extra: true }] },
    })
    expect(w.find('.ds-kw-footnote').text()).toContain('additional conditions apply')
  })

  it('keeps an extra-condition grant in its own footnote line even if the base source matches another grant', () => {
    const w = mount(DatasheetCard, {
      props: {
        sheet: sheet(),
        grantedKeywords: [
          { kw: 'Battleline', detName: 'Bridgehead Strike', extra: true },
          { kw: 'Battleline Bonus', detName: 'Bridgehead Strike' },
        ],
      },
    })
    expect(w.findAll('.ds-kw-footnote')).toHaveLength(2)
  })
})

describe('DatasheetCard keyword clicks', () => {
  it('does not add the clickable class or emit when keywordLinksEnabled is off (the default)', async () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet() } })
    const kw = w.find('.ds-kw')
    expect(kw.classes()).not.toContain('ds-kw-link')
    await kw.trigger('click')
    expect(w.emitted('keyword-click')).toBeUndefined()
  })

  it('emits keyword-click with the printed keyword when enabled', async () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet(), keywordLinksEnabled: true } })
    await w.find('.ds-kw-link').trigger('click')
    expect(w.emitted('keyword-click')).toEqual([['Infantry']])
  })

  it('emits keyword-click for a granted (asterisked) keyword too', async () => {
    const w = mount(DatasheetCard, {
      props: { sheet: sheet(), keywordLinksEnabled: true, grantedKeywords: [{ kw: 'Deathwing', detName: null }] },
    })
    const links = w.findAll('.ds-kw-link').map((n) => n.text())
    expect(links).toContain('Deathwing')
  })

  it('never makes faction keywords clickable, even when enabled', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet(), keywordLinksEnabled: true } })
    const factionKw = w.findAll('.ds-kw').find((n) => n.text() === 'Adeptus Astartes')
    expect(factionKw.classes()).not.toContain('ds-kw-link')
  })
})

describe('DatasheetCard leader/attached-unit list', () => {
  const withLeader = (units) => sheet({ core: 'Leader', leader: { text: 'This model can be attached to the following units:', units } })
  const leaderNames = (w) => w.find('.ds-list').findAll('li').map((li) => li.text())

  it('links a bodyguard name found in the local unitIndex', () => {
    const w = mount(DatasheetCard, {
      props: { sheet: withLeader(['Terminator Squad']), unitIndex: new Map([['Terminator Squad', 'terminator-squad']]), factionSlug: 'dark-angels' },
      global: { stubs: { RouterLink: { template: '<a><slot/></a>' } } },
    })
    expect(w.find('a').text()).toBe('Terminator Squad')
  })

  it('renders a name found nowhere as plain (unlinked) text', () => {
    const w = mount(DatasheetCard, { props: { sheet: withLeader(['Deathwing Command Squad']), unitIndex: new Map() } })
    expect(leaderNames(w)).toEqual(['Deathwing Command Squad'])
    expect(w.find('a').exists()).toBe(false)
  })

  it('hides a name flagged as belonging to another faction instead of rendering it unlinked', () => {
    const w = mount(DatasheetCard, {
      props: {
        sheet: withLeader(['Terminator Squad', 'Deathwatch Terminator Squad']),
        unitIndex: new Map([['Terminator Squad', 'terminator-squad']]),
        otherFactionUnits: ['Deathwatch Terminator Squad'],
      },
    })
    expect(leaderNames(w)).toEqual(['Terminator Squad'])
  })
})
