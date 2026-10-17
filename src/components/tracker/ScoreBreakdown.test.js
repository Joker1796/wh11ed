import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ScoreBreakdown from './ScoreBreakdown.vue'

const player = (primary) => ({
  name: 'P', battleReady: true, secondaryMode: 'tactical', disposition: null, cp: 0,
  rounds: primary.map((v) => ({ primary: v, picks: {} })),
  secondary: { scored: [], discarded: [], hand: [], drawn: {} },
})
const game = (extra = {}) => ({
  players: [player([10, 0, 0, 0, 0]), player([0, 0, 0, 0, 0])],
  settings: { scoreMode: 'bp', firstTurn: 1 }, currentRound: 2, ...extra,
})
// The Battle Points row's cells, one side's: label, five rounds, total.
const bpRow = (w) => {
  const cells = w.findAll('.g-label, .g-cell, .g-total').map((c) => c.text())
  const at = cells.indexOf('BP')
  return cells.slice(at + 1, at + 6)
}

describe('ScoreBreakdown — the Battle Points row', () => {
  // Misha, 2026-10-10: round 3 not begun, yet it already read 11.
  it('leaves the rounds not yet begun empty', () => {
    const row = bpRow(mount(ScoreBreakdown, { props: { game: game(), expanded: true, side: 0 } }))
    expect(row.slice(0, 2).every((c) => c !== '')).toBe(true)
    expect(row.slice(2)).toEqual(['', '', ''])
  })

  // Acceptance, 2026-10-18: a game ended in round 2 showed BP in rounds 3–5 on the result screen —
  // the only place the breakdown is ever seen.
  it('a game finished early shows only the rounds it reached', () => {
    const row = bpRow(mount(ScoreBreakdown, { props: { game: game({ finishedAt: '2026-10-10T00:00:00Z', currentRound: 2 }), expanded: true, side: 0 } }))
    expect(row.slice(0, 2).every((c) => c !== '')).toBe(true)
    expect(row.slice(2)).toEqual(['', '', ''])
  })

  it('fills every round of a game played out', () => {
    const row = bpRow(mount(ScoreBreakdown, { props: { game: game({ finishedAt: '2026-10-10T00:00:00Z', currentRound: 5 }), expanded: true, side: 0 } }))
    expect(row.every((c) => c !== '')).toBe(true)
  })
})
