import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { buildGameLog } from './gameLog.js'

// The log is read from the game itself, so it is checked against a game actually played through
// the store: what the log says must be what the score says.
let tracker, mod

// The clock stands still unless a case moves it: acts stamped in the same millisecond fall back to
// the log's turn-and-side order, so a case reads the same however fast the machine runs it.
beforeEach(async () => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(1000)
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
  tracker.beginGame()
})

afterEach(() => { vi.useRealTimers() })

const brief = (log) => log.map((e) => `R${e.round}.${e.turn ?? '?'} p${e.pi} ${e.type}`)

describe('buildGameLog', () => {
  // Owner, 2026-09-30: within a turn the log reads in the order things were done — the CP
  // correction made last stands above the cards drawn first, not under them by kind.
  it('puts the latest act of a turn on top, whatever its kind', () => {
    vi.setSystemTime(1500)
    tracker.takeRandomSecondaries(0)
    vi.setSystemTime(2000)
    tracker.setCp(0, (tracker.current.value.players[0].cp || 0) + 1)
    const log = buildGameLog(tracker.current.value).filter((e) => e.pi === 0 && e.round === 1 && e.type !== 'core')
    expect(log.map((e) => e.type)).toEqual(['adjust', 'drawn', 'drawn'])
  })

  it('names the unit a stratagem was played on', () => {
    const strat = { _key: 'det|Hold Fast', name: 'Hold Fast', _cost: 1, _limits: {}, _phases: ['any'], _sides: [] }
    tracker.playStratagem(0, strat, 1, { uid: 'u1', name: 'Chosen' })
    expect(buildGameLog(tracker.current.value).find((e) => e.type === 'strat')).toMatchObject({ name: 'Hold Fast', target: { uid: 'u1', name: 'Chosen' } })
  })

  // A card's own WHEN DRAWN rule sent it away: told as such, next to the card that replaced it.
  it('tells a card discarded or shuffled back when drawn', () => {
    tracker.takeRandomSecondaries(0)
    const s = tracker.current.value.players[0].secondary
    const [a, b] = s.hand
    tracker.redrawSecondary(0, a, 'discard')
    tracker.redrawSecondary(0, b, 'shuffle')
    const log = buildGameLog(tracker.current.value).filter((e) => e.kind === 'cards')
    expect(brief(log)).toEqual(['R1.0 p0 drawn', 'R1.0 p0 drawn', 'R1.0 p0 whenDrawn', 'R1.0 p0 whenDrawn'])
    expect(log.filter((e) => e.type === 'drawn').map((e) => e.slug)).not.toContain(a) // it is told once, as sent away
    expect(log.filter((e) => e.type === 'whenDrawn')).toMatchObject([{ slug: a, mode: 'discard' }, { slug: b, mode: 'shuffle' }])
  })

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
