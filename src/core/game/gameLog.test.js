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
  mod = await import('../../composables/useTracker.js')
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
    const log = buildGameLog(tracker.current.value).filter((e) => e.pi === 0 && e.round === 1 && e.type !== 'core' && e.type !== 'turn')
    expect(log.map((e) => e.type)).toEqual(['adjust', 'drawn', 'drawn'])
  })

  // Owner, 2026-10-10, from Misha's note: "Return to deck" undid a draw without a trace, so a
  // player could redraw until the hand suited them. The undo stays; every step of it is logged.
  it('keeps a put-back hand in the log: the draw, the putting back, the new draw', () => {
    vi.setSystemTime(1500)
    tracker.takeRandomSecondaries(0)
    const first = [...tracker.current.value.players[0].secondary.hand]
    vi.setSystemTime(2000)
    for (const slug of first) tracker.returnSecondaryToDeck(0, slug)
    vi.setSystemTime(2500)
    tracker.takeRandomSecondaries(0)
    const log = buildGameLog(tracker.current.value).filter((e) => e.pi === 0 && e.kind === 'cards')
    expect(log.filter((e) => e.type === 'returned').map((e) => e.slug).sort()).toEqual([...first].sort())
    expect(log.filter((e) => e.type === 'drawn')).toHaveLength(4)
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
      'R1.1 p0 core', 'R1.1 p1 core', 'R1.1 p1 turn',
      'R1.0 p0 drawn', 'R1.0 p0 drawn', 'R1.0 p0 discard', 'R1.0 p0 core', 'R1.0 p0 turn',
      'R1.0 p1 core', 'R1.0 p1 strat',
    ])
    expect(log.find((e) => e.type === 'discard')).toMatchObject({ slug: a, cp: true })
    expect(log.filter((e) => e.type === 'bonus')).toHaveLength(0) // told by the discard
    expect(log.find((e) => e.type === 'strat')).toMatchObject({ name: 'Fire Overwatch', amount: -1, kind: 'strat' })
    expect(b).toBeTruthy()
  })

  // Until 2026-10-10 an undone take vanished from the log ("the log cannot disagree with the
  // score"). It still cannot: the take scored nothing. But it is told now — drawn, then put back —
  // so a hand drawn again and again shows (owner, from Misha's note).
  it('tells an undone take as taken and put back, scoring nothing', () => {
    tracker.takeRandomSecondaries(0)
    tracker.untakeSecondaries(0)
    const log = buildGameLog(tracker.current.value)
    expect(log.filter((e) => e.type === 'drawn')).toHaveLength(2)
    expect(log.filter((e) => e.type === 'returned')).toHaveLength(2)
    expect(log.filter((e) => e.type === 'scored')).toHaveLength(0)
    expect(log.filter((e) => e.type === 'drawn').every((e) => e.undone)).toBe(true) // the put-back draws are struck
  })
})

// Owner, 2026-10-19: "the log is the whole history of actions" — an act taken back stays in it,
// struck through, and the taking back is a line of its own.
describe('buildGameLog — acts taken back and acts with no record of their own', () => {
  const undone = (log) => log.filter((e) => e.undone).map((e) => e.type)
  const undos = (log) => log.filter((e) => e.type === 'undo').map((e) => e.of.type)

  it('keeps an undone stratagem struck, and the undo as its own line', () => {
    vi.setSystemTime(2000)
    tracker.useStratagem(0, { _key: 'core:cr', name: 'Command Re-roll', _limits: {} }, 1)
    vi.setSystemTime(3000)
    tracker.undoStratagem(0, 'core:cr')
    const log = buildGameLog(tracker.current.value).filter((e) => e.kind === 'strat')
    expect(log.map((e) => [e.type, !!e.undone])).toEqual([['undo', false], ['strat', true]])
    expect(log[0].of).toMatchObject({ name: 'Command Re-roll', amount: -1 })
  })

  it('strikes one of two identical uses when one is taken back', () => {
    const strat = { _key: 'core:cr', name: 'Command Re-roll', _limits: {}, _phases: ['any'], _sides: [] }
    tracker.setCp(0, 5)
    tracker.useStratagem(0, strat, 1)
    tracker.stepPhase(1) // once per phase (15.01)
    tracker.useStratagem(0, strat, 1)
    tracker.undoStratagem(0, 'core:cr')
    const log = buildGameLog(tracker.current.value).filter((e) => e.type === 'strat')
    expect(log.map((e) => !!e.undone).sort()).toEqual([false, true])
  })

  it('tells a bonus CP taken back, and a card brought back from the discards', () => {
    tracker.gainBonusCp(0)
    tracker.undoBonusCp(0)
    tracker.takeRandomSecondaries(0)
    const [a] = tracker.current.value.players[0].secondary.hand
    tracker.discardFromHand(0, a)
    tracker.restoreSecondaryToHand(0, a)
    const log = buildGameLog(tracker.current.value)
    expect(undone(log).sort()).toEqual(['bonus', 'setAside'])
    expect(undos(log).sort()).toEqual(['bonus', 'setAside'])
  })

  // A score typed in a row is one score; one changed after it stood is a correction.
  it('strikes a corrected primary, but not one still being entered', () => {
    vi.setSystemTime(10_000)
    tracker.setRoundPrimary(0, 0, 5)
    vi.setSystemTime(20_000)
    tracker.setRoundPrimary(0, 0, 10)
    expect(undone(buildGameLog(tracker.current.value))).toEqual([])
    vi.setSystemTime(200_000)
    tracker.setRoundPrimary(0, 0, 8)
    const log = buildGameLog(tracker.current.value).filter((e) => e.type === 'primary')
    expect(log.map((e) => [e.vp, !!e.undone])).toEqual([[8, false], [10, true]])
  })

  it('tells the turns, and a turn undone is struck', () => {
    vi.setSystemTime(2000)
    tracker.endTurn()
    vi.setSystemTime(3000)
    tracker.undoTurn()
    const turns = buildGameLog(tracker.current.value).filter((e) => e.kind === 'turn')
    expect(turns.map((e) => [e.type, e.turn, !!e.undone])).toEqual([['undo', 0, false], ['turn', 1, true], ['turn', 0, false]])
    expect(turns.find((e) => e.type === 'undo').pi).toBe(1)
  })

  it('tells a unit destroyed, a unit rule switched and taken back, an army counter as one change', () => {
    vi.setSystemTime(2000)
    tracker.setUnitStatus(0, 'u1', 'destroyed', 'Intercessor Squad')
    tracker.setUnitUse(0, 'u2', 'r1', 1, true, null, [], { name: 'Captain', label: { en: 'Rites', ru: 'Rites' } })
    tracker.setUnitUse(0, 'u2', 'r1', 1, false, null, [], { name: 'Captain', label: { en: 'Rites', ru: 'Rites' } })
    const label = { en: 'Pain tokens', ru: 'Жетоны боли' }
    tracker.setArmyCounter(0, 1, null, { label, from: 0 })
    tracker.setArmyCounter(0, 2, null, { label, from: 0 })
    tracker.setArmyCounter(0, 3, null, { label, from: 0 })
    const log = buildGameLog(tracker.current.value).filter((e) => e.pi === 0 && (e.kind === 'units' || e.kind === 'army'))
    expect(log.find((e) => e.type === 'unit')).toMatchObject({ name: 'Intercessor Squad', s: 'destroyed' })
    expect(log.filter((e) => e.type === 'armyValue')).toMatchObject([{ from: 0, to: 3 }])
    expect(log.find((e) => e.type === 'unitSwitch')).toMatchObject({ sw: 'use', undone: true })
    expect(undos(log)).toEqual(['unitSwitch'])
  })

  it('tells the game finished and resumed', () => {
    tracker.finishGame('early')
    tracker.resumeGame()
    const types = buildGameLog(tracker.current.value).filter((e) => e.kind === 'turn').map((e) => e.type)
    expect(types).toEqual(expect.arrayContaining(['finish', 'resume']))
  })

  it('keeps at most MAX_ACTS acts a side, dropping the oldest', async () => {
    const { MAX_ACTS } = await import('./actionLog.js')
    for (let i = 0; i < MAX_ACTS + 10; i++) tracker.setUnitStatus(0, `u${i}`, 'destroyed', `Unit ${i}`)
    const acts = tracker.current.value.players[0].acts
    expect(acts).toHaveLength(MAX_ACTS)
    expect(acts[0].name).toBe('Unit 10')
  })
})
