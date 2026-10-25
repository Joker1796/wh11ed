import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('vue-router', () => ({
  useRoute: () => ({ params: {}, query: {}, path: '/tracker' }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  onBeforeRouteLeave: () => {},
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

const player = (name, isYou) => ({
  isYou, name, factionSlug: null, detachments: [],
  rounds: Array.from({ length: 5 }, () => ({ primary: 0, picks: {} })),
  secondaryMode: 'tactical', secondary: { deck: [], hand: [], drawn: {}, discarded: [], scored: [] },
})
async function mountHome(storage) {
  localStorage.clear()
  for (const [k, v] of Object.entries(storage)) localStorage.setItem(k, JSON.stringify(v))
  vi.resetModules()
  const { default: TrackerHomeView } = await import('./TrackerHomeView.vue')
  const w = mount(TrackerHomeView, { global: { stubs: { RouterLink: { props: ['to'], template: '<a :href="to"><slot /></a>' } } } })
  await new Promise((r) => setTimeout(r))
  return w
}

// A finished game is filed as soon as its player leaves the game's screens (fileFinishedGame.js):
// one left by the nav stood as "Resume" and was missing from the list (the owner's first game).
describe('TrackerHomeView — a finished game nobody filed', () => {
  it('goes to the history on arrival, and the big button starts a new game', async () => {
    const game = { id: 'g1', phase: 'finished', settings: { battleSize: 'strikeForce' }, players: [player('Me', true), player('Opp', false)], result: { totals: [50, 30] } }
    const w = await mountHome({ 'wh11ed-tracker-current': game })
    expect(w.find('.game.live').exists()).toBe(false)
    expect(w.findAll('.game')).toHaveLength(1)
    expect(w.find('.cta-main').text()).toMatch(/new game/i)
    expect(localStorage.getItem('wh11ed-tracker-current')).toBeNull()
    expect(JSON.parse(localStorage.getItem('wh11ed-tracker-history')).map((g) => g.id)).toEqual(['g1'])
  })
})

// A game still being set up leads the list like one in progress, tagged as such (owner, 2026-10-25).
describe('TrackerHomeView — a game being set up', () => {
  it('leads the list with its step, and no score', async () => {
    const draft = { step: 2, settings: { battleSize: 'strikeForce' }, players: [{ name: 'Me', factionSlug: null, detachments: [] }, { name: 'Opp', factionSlug: null, detachments: [] }] }
    const w = await mountHome({ 'wh11ed-tracker-setup-draft': draft })
    const card = w.find('.game.live')
    expect(card.find('.gc-live').text()).toBe('Setting up')
    expect(card.find('.gc-result').text()).toBe('Step 2 of 4')
    expect(card.find('.gc-score').exists()).toBe(false)
  })
})
