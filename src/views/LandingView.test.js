import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LandingView from './LandingView.vue'
import { landing } from '../data/landing.js'

const stubs = { RouterLink: { props: ['to'], template: '<a :href="to"><slot /></a>' } }

describe('LandingView', () => {
  // The cards follow the player's own path — read the rules, pick a faction, build a list, play the
  // game — which is also the order that puts the roster builder in front of somebody who has just
  // learnt the faction exists. It used to be missing from this page entirely while the nav had it.
  it('names all five sections, with the list builder between factions and the tracker', () => {
    const w = mount(LandingView, { global: { stubs } })
    const cards = w.findAll('.section-card')
    expect(cards.map((c) => c.attributes('href'))).toEqual(['/rules', '/factions', '/roster', '/tracker', '/links'])
    const roster = cards[2].text()
    expect(roster).toContain('Rosters')
    expect(roster).toContain('Munitorum Field Manual')   // priced against real points
    expect(roster).toContain('New Recruit')              // …and reads a list from elsewhere
  })

  it('links to the guide, since the footer no longer does', () => {
    const w = mount(LandingView, { global: { stubs } })
    expect(w.find('.landing-help a').attributes('href')).toBe('/help')
  })

  it('says what the site is, in both locales, including the builder', () => {
    for (const loc of ['en', 'ru']) {
      expect(landing[loc].sections.map((s) => s.key))
        .toEqual(['rules', 'factions', 'roster', 'tracker', 'links'])
    }
    expect(landing.en.description).toContain('army list builder')
    expect(landing.ru.description).toContain('конструктор армейских листов')
  })
})
