import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ScoreBoard from './ScoreBoard.vue'

function pl(primary, name) {
  return {
    name, battleReady: false, secondaryMode: 'tactical', cp: 0,
    rounds: [{ primary, picks: {} }, ...Array.from({ length: 4 }, () => ({ primary: 0, picks: {} }))],
    secondary: { scored: [] },
  }
}
function finishedGame(p0, p1, scoreMode = 'vp') {
  return { phase: 'finished', settings: { scoreMode, trackCP: false }, players: [pl(p0, 'Me'), pl(p1, 'Opp')] }
}

describe('ScoreBoard', () => {
  it('shows VP totals in VP mode', () => {
    const w = mount(ScoreBoard, { props: { game: finishedGame(30, 10, 'vp'), finished: true } })
    const text = w.text()
    expect(text).toContain('30')
    expect(text).toContain('VP')
    expect(text).not.toContain('BP')
  })

  it('shows BP as the main score with a faded VP in BP mode', () => {
    const w = mount(ScoreBoard, { props: { game: finishedGame(30, 10, 'bp'), finished: true } })
    // 30 vs 10 → diff 20 → BP 13/7
    expect(w.text()).toContain('13')
    expect(w.text()).toContain('BP')
    expect(w.find('.grand-vp').text()).toContain('30 VP')
  })

  it('marks the winner', () => {
    const w = mount(ScoreBoard, { props: { game: finishedGame(30, 10, 'vp'), finished: true } })
    const cols = w.findAll('.col')
    expect(cols[0].classes()).toContain('lead')
    expect(cols[1].classes()).not.toContain('lead')
  })

  it('BP mode: a ≤5 VP gap is a draw (no leader column)', () => {
    const w = mount(ScoreBoard, { props: { game: finishedGame(12, 10, 'bp'), finished: true } })
    expect(w.findAll('.col.lead')).toHaveLength(0)
    expect(w.find('.tie').exists()).toBe(true)
  })
})

// DURING play the board is the other way round from the result screen: VP is the headline and
// Battle Points ride quietly beside it. A game played to VP shows none at all.
describe('ScoreBoard — Battle Points while the game is on', () => {
  const live = (scoreMode) => ({ ...finishedGame(30, 10, scoreMode), phase: 'playing' })

  it('keeps VP as the headline and puts BP beside it', () => {
    const w = mount(ScoreBoard, { props: { game: live('bp') } })
    // The big figure is still the VP total, not the BP one.
    expect(w.findAll('.grand')[0].text()).toContain('30')
    expect(w.findAll('.grand')[0].text()).toContain('VP')
    // The figure and its unit are separate spans (the unit reuses the VP one's class, so the
    // two labels are identical by construction) — hence no space between them in text().
    const bp = w.findAll('.grand-bp')
    expect(bp).toHaveLength(2)
    expect(bp[0].text()).toBe('13BP') // 30 vs 10 → a 16–20 gap is 13–7
    expect(bp[1].text()).toBe('7BP')
    expect(bp[0].find('.grand-unit').text()).toBe('BP')
  })

  it('shows no BP in a game played to VP', () => {
    const w = mount(ScoreBoard, { props: { game: live('vp') } })
    expect(w.findAll('.grand-bp')).toHaveLength(0)
  })
})
