import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'

// Strict rules (strictRules.js) through the store: each refusal, and the one way back a mistake
// keeps — the side's last action, taken back right away.

let mod, tracker, D0, D1
const STRAT = { _key: 'core:cr', name: 'Command Re-roll', _cost: 1, _limits: {}, _phases: ['any'], _sides: [] }

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  vi.useFakeTimers()
  vi.setSystemTime(1_000_000)
  mod = await import('../../composables/useTracker.js')
  tracker = mod.useTracker()
  D0 = mod.DISPOSITIONS[0].id
  D1 = mod.DISPOSITIONS[1].id
})
afterEach(() => vi.useRealTimers())

function start(strict = true) {
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', strictRules: strict },
    players: [
      { name: 'Me', disposition: D0, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [] },
      { name: 'Opp', disposition: D1, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [] },
    ],
  })
  tracker.beginGame()
}
const pl = (i) => tracker.current.value.players[i]
const later = (ms = 5000) => vi.setSystemTime(Date.now() + ms)

describe('strict rules', () => {
  it('draws only at random, and a drawn card stays drawn', () => {
    start()
    later()
    const deck = [...pl(0).secondary.deck]
    tracker.takeChosenSecondaries(0, deck.slice(0, 2))
    expect(pl(0).secondary.hand).toHaveLength(0)
    expect(tracker.strictWhy('choose', 0)).toBe('random')
    tracker.takeRandomSecondaries(0)
    const [a] = pl(0).secondary.hand
    later()
    tracker.returnSecondaryToDeck(0, a)
    tracker.untakeSecondaries(0)
    expect(pl(0).secondary.hand).toContain(a)
  })

  it('takes back only the side\'s last action', () => {
    start()
    tracker.setCp(0, 5) // refused: no pencil
    expect(tracker.strictWhy('pencil', 0)).toBe('noPencil')
    later()
    tracker.useStratagem(0, STRAT, 1)
    later()
    tracker.gainBonusCp(0)
    expect(tracker.strictUndoWhy('strat', 0, STRAT._key)).toBe('lastOnly')
    tracker.undoStratagem(0, STRAT._key)
    expect(pl(0).cpLog.filter(e => e.source === 'strat')).toHaveLength(1)
    // The bonus is the last: it comes back, and then nothing older does.
    expect(tracker.strictUndoWhy('bonus', 0)).toBe(null)
    tracker.undoBonusCp(0)
    expect(pl(0).cpLog.some(e => e.kind === 'bonus')).toBe(false)
    later()
    tracker.undoStratagem(0, STRAT._key)
    expect(pl(0).cpLog.filter(e => e.source === 'strat')).toHaveLength(1)
  })

  it('the other side\'s acts do not close this side\'s undo', () => {
    start()
    later()
    tracker.useStratagem(0, STRAT, 1)
    later()
    tracker.gainBonusCp(1)
    tracker.undoStratagem(0, STRAT._key)
    expect(pl(0).cpLog.some(e => e.source === 'strat')).toBe(false)
  })

  it('an ended turn closes what was done in it, and goes back one step only right away', () => {
    start()
    later()
    tracker.useStratagem(0, STRAT, 1)
    later()
    tracker.endTurn()
    expect(tracker.strictUndoWhy('strat', 0, STRAT._key)).toBe('lastOnly')
    later()
    expect(tracker.strictWhy('clock')).toBe(null)
    tracker.undoTurn()
    expect(tracker.current.value.currentTurn).toBe(0)
    // One step: the next back is refused.
    later()
    tracker.undoTurn()
    expect(tracker.current.value.currentRound).toBe(1)
    expect(tracker.current.value.currentTurn).toBe(0)
    expect(tracker.strictWhy('clock')).toBe('clockBack')
    // Forward again, then an act on the new turn: no going back past it.
    tracker.endTurn()
    later()
    tracker.gainBonusCp(1)
    later()
    tracker.undoTurn()
    expect(tracker.current.value.currentTurn).toBe(1)
  })

  it('scores only the current round, only cards in hand', () => {
    start()
    tracker.takeRandomSecondaries(0)
    const [a] = pl(0).secondary.hand
    const notInHand = pl(0).secondary.deck[0]
    tracker.scoreSecondaryRow(0, notInHand, 0, 0, 1)
    expect(pl(0).secondary.scored.some(e => e.slug === notInHand)).toBe(false)
    tracker.endTurn()
    tracker.endTurn()
    expect(tracker.current.value.currentRound).toBe(2)
    tracker.scoreSecondaryRow(0, a, 0, 0, 1, 1)
    expect(pl(0).secondary.scored.some(e => e.round === 1)).toBe(false)
    tracker.setRoundPrimary(0, 0, 5)
    expect(pl(0).rounds[0].primary).toBe(0)
  })

  it('does not correct a turn of the live round already played', () => {
    start()
    tracker.endTurn() // the opponent's turn of round 1
    expect(tracker.strictWhy('round', 0, 1, 0)).toBe('pastTurn')
    tracker.setPrimaryRow(0, 0, 0, 0, 1, 0)
    expect(pl(0).rounds[0].primary).toBe(0)
    expect(tracker.strictWhy('round', 1, 1, 1)).toBe(null) // the live turn
  })

  it('a destroyed unit comes back only as the last action', () => {
    start()
    later()
    tracker.setUnitStatus(0, 'u1', 'destroyed', 'Boyz')
    later()
    tracker.setUnitStatus(0, 'u2', 'destroyed', 'Nobz')
    later()
    tracker.setUnitStatus(0, 'u1', 'table', 'Boyz')
    expect(pl(0).unitStatus.u1.s).toBe('destroyed')
    tracker.setUnitStatus(0, 'u2', 'table', 'Nobz')
    expect(pl(0).unitStatus.u2?.s ?? 'table').toBe('table')
  })

  it('changes nothing in a game without the switch', () => {
    start(false)
    later()
    tracker.useStratagem(0, STRAT, 1)
    later()
    tracker.gainBonusCp(0)
    tracker.undoStratagem(0, STRAT._key)
    expect(pl(0).cpLog.some(e => e.source === 'strat')).toBe(false)
    tracker.setCp(0, 5)
    expect(pl(0).cp).toBe(5)
    expect(tracker.strictWhy('choose', 0)).toBe(null)
  })
})
