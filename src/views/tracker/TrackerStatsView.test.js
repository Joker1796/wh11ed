import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('vue-router', () => ({
  useRoute: () => ({ params: {}, path: '/tracker/stats' }),
  useRouter: () => ({ push: vi.fn() }),
  RouterLink: { name: 'RouterLink', props: ['to'], template: '<a :href="to"><slot /></a>' },
}))

let TrackerStatsView

// The tracker store reads localStorage at module scope, so the history has to be in place BEFORE
// the view (and the store behind it) is imported.
async function mountWith(history, rosters = null) {
  localStorage.clear()
  localStorage.setItem('wh11ed-tracker-history', JSON.stringify(history))
  if (rosters) localStorage.setItem('wh11ed-rosters', JSON.stringify({ v: 4, rosters }))
  vi.resetModules()
  ;({ default: TrackerStatsView } = await import('./TrackerStatsView.vue'))
  return mount(TrackerStatsView, {
    global: { stubs: { RouterLink: { props: ['to'], template: '<a :href="to"><slot /></a>' } } },
  })
}

function game({ you = {}, opp = {}, vp = [0, 0], youFirst = true, ...rest } = {}) {
  const player = (p, isYou) => ({
    isYou,
    name: isYou ? 'Me' : 'Them',
    factionSlug: null,
    detachments: [],
    rounds: Array.from({ length: 5 }, () => ({ primary: 0, picks: {} })),
    secondaryMode: 'tactical',
    secondary: { deck: [], hand: [], drawn: {}, discarded: [], scored: [] },
    ...p,
  })
  const y = player(you, true)
  const o = player(opp, false)
  return {
    id: 'g' + Math.random().toString(36).slice(2),
    phase: 'finished',
    settings: { battleSize: 'strikeForce' },
    players: youFirst ? [y, o] : [o, y],
    result: { totals: youFirst ? vp : [vp[1], vp[0]] },
    ...rest,
  }
}

describe('TrackerStatsView', () => {
  beforeEach(() => { localStorage.clear() })

  it('says there is nothing yet rather than printing a page of zeroes', async () => {
    const w = await mountWith([])
    expect(w.find('.empty').exists()).toBe(true)
    expect(w.find('.cards').exists()).toBe(false)
  })

  it('shows the record and refuses to print a win rate off too few games', async () => {
    const w = await mountWith([game({ vp: [90, 60] }), game({ vp: [40, 80] })])
    const cards = w.findAll('.card')
    expect(cards[0].text()).toContain('2')          // games
    expect(cards[1].text()).toContain('1–1–0')      // W–L–D
    expect(cards[2].text()).toContain('—')          // …and no percentage yet
    expect(w.find('.note').text()).toContain('5')   // the threshold is named, not hidden
  })

  it('prints the win rate once the sample is there', async () => {
    const w = await mountWith(Array.from({ length: 5 }, () => game({ vp: [90, 60] })))
    expect(w.findAll('.card')[2].text()).toContain('100%')
  })

  // The page is written entirely from the isYou side; a game stored opponent-first must not flip it.
  it('reads your side even when you are stored second', async () => {
    const w = await mountWith([game({ vp: [90, 60], youFirst: false })])
    expect(w.findAll('.card')[1].text()).toContain('1–0–0')
    expect(w.text()).toContain('90')                // your average score, not your opponent's
  })

  it('names factions and turn order in the breakdowns', async () => {
    const w = await mountWith([
      game({ you: { factionSlug: 'orks' }, opp: { factionSlug: 'aeldari' }, vp: [90, 60] }),
    ])
    const text = w.text()
    expect(text).toContain('Orks')
    expect(text).toContain('Aeldari')
    expect(w.findAll('.sb-row').length).toBeGreaterThan(0)
  })

  it('leaves an unfinished game out and says how many it left out', async () => {
    const w = await mountWith([game({ vp: [90, 60] }), game({ vp: [10, 10], endReason: 'early' })])
    expect(w.findAll('.card')[0].text()).toContain('1')
    expect(w.findAll('.note').some((n) => n.text().includes('1'))).toBe(true)
  })

  it('gives each attached list its own record, and marks one that is no longer saved', async () => {
    const withList = (id, name, vp) => game({ you: { rosterId: id, roster: { name } }, vp })
    const w = await mountWith(
      [withList('r1', 'Green Tide', [90, 60]), withList('r2', 'Speed Freeks', [40, 80])],
      [{ id: 'r1', name: 'Green Tide', faction: 'orks', summary: { points: 1985, unitCount: 9, issues: 0 }, units: [], updatedAt: 1 }],
    )
    const rows = w.findAll('.ros')
    expect(rows).toHaveLength(2)
    const green = rows.find((r) => r.text().includes('Green Tide'))
    expect(green.text()).toContain('1–0–0')
    expect(green.text()).toContain('1985')
    // r2's list was deleted after the game; the record survives under the snapshot's name.
    const freeks = rows.find((r) => r.text().includes('Speed Freeks'))
    expect(freeks.find('a').exists()).toBe(false)
  })
})
