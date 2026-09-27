import { beforeEach, describe, it, expect, vi } from 'vitest'
import { buildGameLog } from './gameLog.js'

// The log is read from the game itself, so it is checked against a game actually played through
// the store: what the log says must be what the score says.
let tracker, mod

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  mod = await import('./useTracker.js')
  tracker = mod.useTracker()
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { name: 'Me', factionSlug: null, detachments: [], disposition: mod.DISPOSITIONS[0].id, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
      { name: 'Opp', factionSlug: null, detachments: [], disposition: mod.DISPOSITIONS[1].id, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  })
})

const brief = (log) => log.map((e) => `R${e.round}.${e.turn ?? '?'} p${e.pi} ${e.type}`)

describe('buildGameLog', () => {
  it('tells the turn\'s cards, CP and stratagems, newest first, each once', () => {
    tracker.takeRandomSecondaries(0)
    const [a, b] = tracker.current.value.players[0].secondary.hand
    tracker.useStratagem(1, { _key: 'core:15.08', name: 'Fire Overwatch', _limits: {} }, 1)
    tracker.endTurnDiscard(0, a)
    const log = buildGameLog(tracker.current.value)
    expect(brief(log)).toEqual([
      'R1.1 p0 core', 'R1.1 p1 core',
      'R1.0 p0 drawn', 'R1.0 p0 drawn', 'R1.0 p0 discard', 'R1.0 p0 core',
      'R1.0 p1 core', 'R1.0 p1 strat',
    ])
    expect(log.find((e) => e.type === 'discard')).toMatchObject({ slug: a, cp: true })
    expect(log.filter((e) => e.type === 'bonus')).toHaveLength(0) // told by the discard
    expect(log.find((e) => e.type === 'strat')).toMatchObject({ name: 'Fire Overwatch', amount: -1, kind: 'strat' })
    expect(b).toBeTruthy()
  })

  it('forgets what was undone — the log cannot disagree with the score', () => {
    tracker.takeRandomSecondaries(0)
    tracker.untakeSecondaries(0)
    expect(buildGameLog(tracker.current.value).filter((e) => e.type === 'drawn')).toHaveLength(0)
  })
})
