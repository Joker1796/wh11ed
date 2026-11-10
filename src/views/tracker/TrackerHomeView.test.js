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
    await import('../../components/tracker/GameEndModal.vue')
  await import('../../components/tracker/GameSummaryModal.vue')
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
  await import('../../components/tracker/GameEndModal.vue')
  await import('../../components/tracker/GameSummaryModal.vue')
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
    expect(card.find('.gc-score').text()).toBe('Setup') // the word where the score would be
    expect(card.find('.gc-foot').text()).toBe('Strike Force') // no score basis before the game
  })
})

// The game in play is finished from its card (owner, 2026-11-03), through the game screen's dialog,
// and filed at once; a shared game is not finished here.
describe('TrackerHomeView — finishing the game in play from its card', () => {
  const playing = (over) => ({ id: 'g2', phase: 'playing', currentRound: 3, settings: { battleSize: 'strikeForce' }, players: [player('Me', true), player('Opp', false)], ...over })

  it('opens the end dialog without going into the game, and files the game', async () => {
    const w = await mountHome({ 'wh11ed-tracker-current': playing() })
    const btn = w.find('.game.live .gc-finish')
    expect(btn.attributes('disabled')).toBeUndefined()
    await btn.trigger('click')
    const { DOMWrapper } = await import('@vue/test-utils')
    const body = new DOMWrapper(document.body)
    await body.find('.ge-end').trigger('click')
    await new Promise((r) => setTimeout(r))
    expect(localStorage.getItem('wh11ed-tracker-current')).toBeNull()
    const [filed] = JSON.parse(localStorage.getItem('wh11ed-tracker-history'))
    expect(filed.id).toBe('g2')
    expect(filed.phase).toBe('finished')
    expect(w.find('.game.live').exists()).toBe(false)
    w.unmount()
  })

  it('is greyed for a shared game, with the reason', async () => {
    const w = await mountHome({ 'wh11ed-tracker-current': playing({ party: { id: 'p1', host: true, status: 'live' } }) })
    const btn = w.find('.game.live .gc-finish')
    expect(btn.attributes('disabled')).toBeDefined()
    expect(btn.attributes('title')).toMatch(/game screen/)
    w.unmount()
  })
})

// A campaign's battle is sent back to it from the finished screen: finished from the card, it goes
// there instead of into the history.
describe('TrackerHomeView — finishing a campaign battle from its card', () => {
  it('opens the finished screen and files nothing', async () => {
    const game = { id: 'g3', phase: 'playing', currentRound: 2, settings: { battleSize: 'strikeForce', dominatus: { phase: 1, location: null, campaign: 'c1' } }, players: [player('Me', true), player('Opp', false)] }
    const w = await mountHome({ 'wh11ed-tracker-current': game })
    await w.find('.game.live .gc-finish').trigger('click')
    const { DOMWrapper } = await import('@vue/test-utils')
    await new DOMWrapper(document.body).find('.ge-end').trigger('click')
    await new Promise((r) => setTimeout(r))
    const { useTracker } = await import('../../composables/useTracker.js')
    const { current, history } = useTracker()
    expect(current.value.phase).toBe('finished')
    expect(history.value).toEqual([])
    w.unmount()
  })
})
