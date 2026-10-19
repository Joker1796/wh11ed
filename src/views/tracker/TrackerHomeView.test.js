import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('vue-router', () => ({
  useRoute: () => ({ params: {}, query: {}, path: '/tracker' }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  RouterLink: { name: 'RouterLink', props: ['to'], template: '<a :href="to"><slot /></a>' },
}))

// The history card is laid out in turn order, as the game screen is: the side that moved first on
// the left (owner, 2026-10-19). The result still reads from your side.
describe('TrackerHomeView — a history card', () => {
  it('puts the side that moved first on the left, and calls your win a win', async () => {
    const player = (name, isYou) => ({
      isYou, name, factionSlug: null, detachments: [],
      rounds: Array.from({ length: 5 }, () => ({ primary: 0, picks: {} })),
      secondaryMode: 'tactical', secondary: { deck: [], hand: [], drawn: {}, discarded: [], scored: [] },
    })
    const game = {
      id: 'g1', phase: 'finished', settings: { battleSize: 'strikeForce' },
      players: [player('Them', false), player('Me', true)], // they moved first
      result: { totals: [40, 70] },
    }
    localStorage.clear()
    localStorage.setItem('wh11ed-tracker-history', JSON.stringify([game]))
    vi.resetModules()
    const { default: TrackerHomeView } = await import('./TrackerHomeView.vue')
    const w = mount(TrackerHomeView, { global: { stubs: { RouterLink: { props: ['to'], template: '<a :href="to"><slot /></a>' } } } })
    await new Promise((r) => setTimeout(r))
    const names = w.findAll('.gc-name')
    expect(names.map((n) => n.text())).toEqual(['Them', 'YouMe'])
    // …your side says so, wherever it stands
    expect(names[0].find('.gc-you').exists()).toBe(false)
    expect(names[1].find('.gc-you').text()).toBe('You')
    expect(w.find('.gc-score').text().replace(/\s/g, '')).toBe('40–70')
    expect(w.find('.gc-result').text()).toMatch(/victory|победа/i)
  })
})
