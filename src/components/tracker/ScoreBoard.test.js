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
