import { beforeEach, describe, it, expect, vi } from 'vitest'

// The store is a module singleton (shared refs + localStorage). Reset the module and
// storage before each test so cases stay isolated.
let mod, tracker, D0, D1

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  mod = await import('./useTracker.js')
  tracker = mod.useTracker()
  D0 = mod.DISPOSITIONS[0].id
  D1 = mod.DISPOSITIONS[1].id
})

function setupGame(over = {}) {
  const base = {
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { name: 'Me', factionSlug: null, detachments: [], disposition: D0, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
      { name: 'Opp', factionSlug: null, detachments: [], disposition: D1, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  }
  return { ...base, ...over, settings: { ...base.settings, ...(over.settings || {}) } }
}

// The turn's two cards, picked rather than drawn: the first one able to score in round 1 (a
// tactical row with a plain VP value). A random draw sometimes brings a card whose conditions only
// open in round 2, and a test that scores it would then fail by chance.
function takeScorablePair(pi) {
  const pl = tracker.current.value.players[pi]
  const scorable = (slug) => mod.scorableBlocks(slug, pl.role, 1).some((b) => b.kind === 'tactical' && b.rows.some((r) => mod.numericVp(r.vp) > 0))
  const a = pl.secondary.deck.find(scorable)
  const b = pl.secondary.deck.find((x) => x !== a)
  tracker.takeChosenSecondaries(pi, [a, b])
  return [a, b]
}

describe('newGame', () => {
  it('creates a playing game with two players and resolved primaries', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const g = tracker.current.value
    expect(g.phase).toBe('playing')
    expect(g.currentRound).toBe(1)
    expect(g.players).toHaveLength(2)
    expect(g.players[0].primarySlug).toBeTruthy()
    expect(g.players[0].rounds).toHaveLength(mod.ROUND_COUNT)
  })
  it('carries settings (scoreMode, battleSize) into the game', () => {
    tracker.newGame(setupGame({ settings: { scoreMode: 'bp', battleSize: 'incursion' } }))
    tracker.beginGame()
    expect(tracker.current.value.settings.scoreMode).toBe('bp')
    expect(tracker.current.value.settings.battleSize).toBe('incursion')
  })
  it('firstTurn:1 — You at index 0 (isYou=true), firstTurn normalized to 1', () => {
    tracker.newGame(setupGame({ settings: { firstTurn: 1 } }))
    tracker.beginGame()
    const g = tracker.current.value
    expect(g.players[0].isYou).toBe(true)
    expect(g.players[0].name).toBe('Me')
    expect(g.players[1].isYou).toBe(false)
    expect(g.settings.firstTurn).toBe(1)
  })
  it('firstTurn:2 — Opponent at index 0 (isYou=false), You at index 1 (isYou=true), firstTurn normalized to 1', () => {
    tracker.newGame(setupGame({ settings: { firstTurn: 2 } }))
    tracker.beginGame()
    const g = tracker.current.value
    expect(g.players[0].isYou).toBe(false)
    expect(g.players[0].name).toBe('Opp')
    expect(g.players[1].isYou).toBe(true)
    expect(g.players[1].name).toBe('Me')
    expect(g.settings.firstTurn).toBe(1)
  })
})

describe('updateSetup', () => {
  it('patches names, battleReady and safe settings without touching scoring state', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setRoundPrimary(0, 0, 12)
    tracker.setCp(0, 3)
    const primarySlugBefore = tracker.current.value.players[0].primarySlug

    tracker.updateSetup({
      settings: { trackCP: false, firstTurn: 1, scoreMode: 'bp', layout: 'B' },
      players: [{ name: 'Renamed', battleReady: true }, { name: 'Opp2' }],
    })

    const g = tracker.current.value
    expect(g.players[0].name).toBe('Renamed')
    expect(g.players[0].battleReady).toBe(true)
    expect(g.players[1].name).toBe('Opp2')
    expect(g.settings.trackCP).toBe(false)
    expect(g.settings.firstTurn).toBe(1)
    expect(g.settings.scoreMode).toBe('bp')
    expect(g.settings.layout).toBe('B')
    // Untouched: recorded rounds/CP and the mission already resolved for this player.
    expect(g.players[0].rounds[0].primary).toBe(12)
    expect(g.players[0].cp).toBe(3)
    expect(g.players[0].primarySlug).toBe(primarySlugBefore)
  })

  it('is a no-op with no active game', () => {
    expect(() => tracker.updateSetup({ settings: { trackCP: false } })).not.toThrow()
  })

  it('flipping firstTurn swaps the player objects (rounds/cp travel with them) and renormalizes to 1', () => {
    tracker.newGame(setupGame())
    tracker.beginGame() // firstTurn:1 → players[0]=Me(isYou), players[1]=Opp
    tracker.setRoundPrimary(0, 0, 12)
    tracker.setCp(0, 3)

    tracker.updateSetup({ settings: { firstTurn: 2 } })

    const g = tracker.current.value
    expect(g.players[0].isYou).toBe(false)
    expect(g.players[0].name).toBe('Opp')
    expect(g.players[1].isYou).toBe(true)
    expect(g.players[1].name).toBe('Me')
    // Me's already-recorded round/CP data moved to index 1 with them, not left at index 0.
    expect(g.players[1].rounds[0].primary).toBe(12)
    expect(g.players[1].cp).toBe(3)
    expect(g.players[0].rounds[0].primary).toBe(0)
    expect(g.settings.firstTurn).toBe(1)
  })

  it('resubmitting the same firstTurn is a no-op (no swap)', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.updateSetup({ settings: { firstTurn: 1 } })
    const g = tracker.current.value
    expect(g.players[0].isYou).toBe(true)
    expect(g.players[0].name).toBe('Me')
  })
})

describe('twists at game creation', () => {
  it('Mirrored World with no chosen mission resolves a random shared one for both players', () => {
    tracker.newGame(setupGame({ settings: { twist: 'mirrored-world', twistMission: null } }))
    tracker.beginGame()
    const g = tracker.current.value
    const mirrorSlugs = mod.MIRROR_MISSIONS.map(m => m.slug)
    expect(mirrorSlugs).toContain(g.settings.twistMission)
    expect(g.players[0].primarySlug).toBe(g.settings.twistMission)
    expect(g.players[1].primarySlug).toBe(g.settings.twistMission)
  })
  it('Scrambled Communications swaps the two primaries', () => {
    const plain = setupGame()
    tracker.newGame(plain)
    tracker.beginGame()
    const normal0 = tracker.current.value.players[0].primarySlug
    const normal1 = tracker.current.value.players[1].primarySlug

    tracker.newGame(setupGame({ settings: { twist: 'scrambled-communications' } }))
    tracker.beginGame()
    expect(tracker.current.value.players[0].primarySlug).toBe(normal1)
    expect(tracker.current.value.players[1].primarySlug).toBe(normal0)
  })
})

describe('scoring mutations', () => {
  it('setRoundPrimary and setCp update the game and totals', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setRoundPrimary(0, 0, 12)
    tracker.setCp(0, 3)
    expect(tracker.current.value.players[0].rounds[0].primary).toBe(12)
    expect(tracker.current.value.players[0].cp).toBe(3)
    expect(tracker.primaryTotal(0)).toBe(12)
    expect(tracker.grandTotal(0)).toBe(12)
  })
})

describe('finishGame', () => {
  it('marks the game finished and records reason + result totals', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setRoundPrimary(0, 0, 12)
    tracker.finishGame('opponent-concede')
    const g = tracker.current.value
    expect(g.phase).toBe('finished')
    expect(g.endReason).toBe('opponent-concede')
    expect(g.finishedAt).toBeTruthy()
    expect(g.result.totals).toHaveLength(2)
    expect(g.result.totals[0]).toBe(12)
  })
  it('finishes with a null reason when none is given', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.finishGame()
    expect(tracker.current.value.endReason).toBe(null)
  })
})

describe('history: archive & resume', () => {
  it('archiveGame moves the current game into history', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.finishGame('played')
    const id = tracker.current.value.id
    tracker.archiveGame()
    expect(tracker.current.value).toBe(null)
    expect(tracker.history.value[0].id).toBe(id)
  })
  it('resumeFromHistory pulls a finished game back into active play', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setRoundPrimary(0, 0, 9)
    tracker.finishGame('early')
    const id = tracker.current.value.id
    tracker.archiveGame()

    tracker.resumeFromHistory(id)
    const g = tracker.current.value
    expect(g.id).toBe(id)
    expect(g.phase).toBe('playing')
    expect(g.endReason).toBeUndefined()
    expect(g.finishedAt).toBeUndefined()
    expect(g.result).toBeUndefined()
    expect(g.players[0].rounds[0].primary).toBe(9)   // play state preserved
    expect(tracker.history.value.find(x => x.id === id)).toBeUndefined()
  })
  it('a game started or resumed here is this tracker’s (trackerGen.js)', async () => {
    const { TRACKER_GEN } = await import('./trackerGen.js')
    tracker.newGame(setupGame())
    expect(tracker.current.value.trackerGen).toBe(TRACKER_GEN)
    tracker.beginGame()
    tracker.finishGame('early')
    const id = tracker.current.value.id
    tracker.archiveGame()
    const older = tracker.history.value.find(x => x.id === id)
    delete older.trackerGen // a game from the site's tracker, reached through the cloud
    tracker.resumeFromHistory(id)
    expect(tracker.current.value.trackerGen).toBe(TRACKER_GEN)
  })
})

describe('redrawSecondary (WHEN DRAWN actions)', () => {
  it("'shuffle' returns the card to the deck and draws a replacement", () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, 'behind-enemy-lines')
    expect(s.hand).toEqual(['behind-enemy-lines'])

    tracker.redrawSecondary(0, 'behind-enemy-lines', 'shuffle')
    expect(s.hand).toHaveLength(1)                       // one out, one in
    expect(s.hand).not.toContain('behind-enemy-lines')   // the shuffled card isn't the redraw (it went to the deck tail)
    expect(s.deck).toContain('behind-enemy-lines')       // back in the deck, redrawable
  })

  it("'discard' removes the card from play and draws a replacement", () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, 'a-grievous-blow')

    tracker.redrawSecondary(0, 'a-grievous-blow', 'discard')
    expect(s.hand).toHaveLength(1)
    expect(s.hand).not.toContain('a-grievous-blow')
    expect(s.deck).not.toContain('a-grievous-blow')                  // gone from play
    expect((s.discarded || []).some(d => (d.slug ?? d) === 'a-grievous-blow')).toBe(false)
  })

  it('clears any VP the redrawn card had scored', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, 'behind-enemy-lines')
    tracker.scoreSecondaryRow(0, 'behind-enemy-lines', 0, 0, 1)
    expect(s.scored.some(e => e.slug === 'behind-enemy-lines')).toBe(true)

    tracker.redrawSecondary(0, 'behind-enemy-lines', 'shuffle')
    expect(s.scored.some(e => e.slug === 'behind-enemy-lines')).toBe(false)
  })

  it('is a no-op when the card is not in hand', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const s = tracker.current.value.players[0].secondary
    const before = [...s.hand]
    tracker.redrawSecondary(0, 'behind-enemy-lines', 'shuffle')
    expect(s.hand).toEqual(before)
  })

  // The card leaves no trace elsewhere, so the action is noted for the game log.
  it('notes the action, and an undone take drops a shuffle but keeps a discard', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const s = tracker.current.value.players[0].secondary
    tracker.takeRandomSecondaries(0)
    const [a, b] = s.hand
    tracker.redrawSecondary(0, a, 'shuffle')
    tracker.redrawSecondary(0, b, 'discard')
    expect(s.whenDrawn).toMatchObject([{ slug: a, round: 1, mode: 'shuffle' }, { slug: b, round: 1, mode: 'discard' }])
    tracker.untakeSecondaries(0)
    expect(s.whenDrawn).toMatchObject([{ slug: b, round: 1, mode: 'discard' }]) // b is still out of the game
    expect(s.whenDrawn).toHaveLength(1)
  })
})

describe('set aside & restore secondaries', () => {
  it('discardFromHand sets the card aside, keeping any scored VP', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, 'behind-enemy-lines')
    tracker.scoreSecondaryRow(0, 'behind-enemy-lines', 0, 0, 1)
    const vp = tracker.secondaryCardVp(0, 'behind-enemy-lines')
    expect(vp).toBeGreaterThan(0)

    tracker.discardFromHand(0, 'behind-enemy-lines')
    expect(s.hand).not.toContain('behind-enemy-lines')
    expect((s.discarded || []).some(d => (d.slug ?? d) === 'behind-enemy-lines')).toBe(true)
    expect(tracker.secondaryCardVp(0, 'behind-enemy-lines')).toBe(vp)   // VP preserved
  })

  it('restoreSecondaryToHand returns a set-aside card to the hand, preserving VP', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, 'behind-enemy-lines')
    tracker.scoreSecondaryRow(0, 'behind-enemy-lines', 0, 0, 1)
    const vp = tracker.secondaryCardVp(0, 'behind-enemy-lines')
    tracker.discardFromHand(0, 'behind-enemy-lines')

    tracker.restoreSecondaryToHand(0, 'behind-enemy-lines')
    expect(s.hand).toContain('behind-enemy-lines')
    expect((s.discarded || []).some(d => (d.slug ?? d) === 'behind-enemy-lines')).toBe(false)
    expect(s.deck).not.toContain('behind-enemy-lines')                 // not shoved back to the deck
    expect(tracker.secondaryCardVp(0, 'behind-enemy-lines')).toBe(vp)  // VP unchanged
  })
})

describe('localStorage hydration', () => {
  it('loads an existing current game on import', async () => {
    const saved = { id: 'g1', phase: 'playing', currentRound: 2, settings: {}, players: [{}, {}] }
    localStorage.setItem('wh11ed-tracker-current', JSON.stringify(saved))
    vi.resetModules()
    const fresh = (await import('./useTracker.js')).useTracker()
    expect(fresh.current.value.id).toBe('g1')
    expect(fresh.current.value.currentRound).toBe(2)
  })
})

describe('toggleArmyMulti (World Eaters Blessings — up to N per round)', () => {
  beforeEach(() => tracker.newGame(setupGame()))

  it('adds, caps at max, and toggles off per round', () => {
    const p = () => tracker.current.value.players[0].army?.multiByRound

    tracker.toggleArmyMulti(0, 1, 'a', 2)
    tracker.toggleArmyMulti(0, 1, 'b', 2)
    expect(p()[1]).toEqual(['a', 'b'])

    // At the cap, a third pick is ignored.
    tracker.toggleArmyMulti(0, 1, 'c', 2)
    expect(p()[1]).toEqual(['a', 'b'])

    // Tapping an active option removes it, freeing a slot.
    tracker.toggleArmyMulti(0, 1, 'a', 2)
    expect(p()[1]).toEqual(['b'])
    tracker.toggleArmyMulti(0, 1, 'c', 2)
    expect(p()[1]).toEqual(['b', 'c'])

    // Choices are per-round; a later round starts empty.
    tracker.toggleArmyMulti(0, 2, 'a', 2)
    expect(p()[2]).toEqual(['a'])
    expect(p()[1]).toEqual(['b', 'c'])
  })

  it('drops a round key once its last pick is removed', () => {
    tracker.toggleArmyMulti(0, 1, 'a', 2)
    tracker.toggleArmyMulti(0, 1, 'a', 2)
    expect(tracker.current.value.players[0].army.multiByRound[1]).toBeUndefined()
  })
})

describe('resurrectArmyUnit / undoArmyResurrect (GSC resurrect spend log)', () => {
  beforeEach(() => tracker.newGame(setupGame()))

  it('subtracts the cost and records the entry', () => {
    tracker.resurrectArmyUnit(0, 6, 'Aberrants ×5', 4)
    const army = tracker.current.value.players[0].army
    expect(army.counter).toBe(6)
    expect(army.resurrected).toEqual([{ label: 'Aberrants ×5', cost: 4 }])

    tracker.resurrectArmyUnit(0, 4, 'Purestrains ×5', 2)
    expect(tracker.current.value.players[0].army.resurrected).toEqual([
      { label: 'Aberrants ×5', cost: 4 },
      { label: 'Purestrains ×5', cost: 2 },
    ])
  })

  it('clamps the counter at 0', () => {
    tracker.resurrectArmyUnit(0, -3, 'Aberrants ×10', 8)
    expect(tracker.current.value.players[0].army.counter).toBe(0)
  })

  it('undo refunds the cost and drops the entry', () => {
    tracker.resurrectArmyUnit(0, 6, 'Aberrants ×5', 4)
    tracker.resurrectArmyUnit(0, 4, 'Purestrains ×5', 2)
    tracker.undoArmyResurrect(0, 0) // undo the Aberrants entry
    const army = tracker.current.value.players[0].army
    expect(army.resurrected).toEqual([{ label: 'Purestrains ×5', cost: 2 }])
    expect(army.counter).toBe(8) // 4 + refunded 4

    tracker.undoArmyResurrect(0, 0) // undo the remaining entry
    expect(tracker.current.value.players[0].army.resurrected).toBeUndefined()
  })

  it('does nothing for an out-of-range index', () => {
    tracker.resurrectArmyUnit(0, 6, 'Aberrants ×5', 4)
    tracker.undoArmyResurrect(0, 5)
    expect(tracker.current.value.players[0].army.resurrected).toHaveLength(1)
  })
})

describe('applyArmyBonus / undoArmyBonus (GSC round-1 start bonus)', () => {
  beforeEach(() => tracker.newGame(setupGame()))

  it('applies once and flags bonusApplied', () => {
    tracker.applyArmyBonus(0, 12)
    const army = tracker.current.value.players[0].army
    expect(army.counter).toBe(12)
    expect(army.bonusApplied).toBe(true)

    // A second call is a no-op (already applied) even with a different value.
    tracker.applyArmyBonus(0, 99)
    expect(tracker.current.value.players[0].army.counter).toBe(12)
  })

  it('undo clears the flag and restores the counter', () => {
    tracker.applyArmyBonus(0, 12)
    tracker.undoArmyBonus(0, 10)
    const army = tracker.current.value.players[0].army
    expect(army.counter).toBe(10)
    expect(army.bonusApplied).toBeUndefined()
  })

  it('undo is a no-op when the bonus was never applied', () => {
    tracker.undoArmyBonus(0, 10)
    expect(tracker.current.value.players[0].army.counter).toBeUndefined()
  })
})

// Rule-condition switches — what the app cannot know and the player tells it (rosterGameContext.js
// reads these back). Stored as the battle ROUND they were flipped in, which is what lets a
// "until the end of the turn" state expire on its own.
describe('setArmyCondition / setUnitCondition', () => {
  beforeEach(() => {
    tracker.newGame(setupGame())
    tracker.beginGame()
  })

  it('records the round an army switch was flipped in, and clears it again', () => {
    const t = tracker
    t.setArmyCondition(0, 'imperative-protector', 2, true)
    expect(t.current.value.players[0].ctx.army['imperative-protector']).toBe(2)
    t.setArmyCondition(0, 'imperative-protector', 3, false)
    expect(t.current.value.players[0].ctx.army['imperative-protector']).toBeUndefined()
  })

  it('keys unit switches by the roster entry and tidies up after itself', () => {
    const t = tracker
    t.setUnitCondition(0, 'u1', 'unit-charged', 1, true)
    t.setUnitCondition(0, 'u1', 'unit-advanced', 1, true)
    expect(t.current.value.players[0].ctx.units.u1).toEqual({ 'unit-charged': 1, 'unit-advanced': 1 })

    t.setUnitCondition(0, 'u1', 'unit-charged', 1, false)
    t.setUnitCondition(0, 'u1', 'unit-advanced', 1, false)
    // The entry goes with its last switch — an empty bag per unit would grow with every unit
    // ever touched, in a payload capped at 64 KB by the API.
    expect(t.current.value.players[0].ctx.units.u1).toBeUndefined()
  })

  it('keeps the two players apart', () => {
    const t = tracker
    t.setArmyCondition(1, 'drug-hypex', 1, true)
    expect(t.current.value.players[0].ctx).toBeUndefined()
    expect(t.current.value.players[1].ctx.army['drug-hypex']).toBe(1)
  })
})

// ── The clock (battle round → whose turn → phase) ──────────────────────────────────────────────
// `players[0]` is always the first-turn player, so a turn index IS a player index; the phase row
// in RoundTracker reads these two fields and nothing else.
describe('the phase clock', () => {
  it('a new game starts at the first-turn player\'s Command phase', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    expect(tracker.current.value.currentTurn).toBe(0)
    expect(tracker.current.value.currentPhase).toBe('command')
  })

  it('steps through five phases, then hands the turn over', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    for (let i = 0; i < 4; i++) tracker.stepPhase(1)
    expect(tracker.current.value.currentPhase).toBe('fight')
    expect(tracker.current.value.currentTurn).toBe(0)
    tracker.stepPhase(1)
    expect(tracker.current.value.currentTurn).toBe(1)
    expect(tracker.current.value.currentPhase).toBe('command')
  })

  it('rolls into the next battle round after the second player\'s Fight phase', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    for (let i = 0; i < 10; i++) tracker.stepPhase(1)
    const g = tracker.current.value
    expect(g.currentRound).toBe(2)
    expect(g.currentTurn).toBe(0)
    expect(g.currentPhase).toBe('command')
  })

  it('steps back across the round boundary onto the second player\'s Fight phase', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.goToRound(3)
    tracker.stepPhase(-1)
    const g = tracker.current.value
    expect(g.currentRound).toBe(2)
    expect(g.currentTurn).toBe(1)
    expect(g.currentPhase).toBe('fight')
  })

  it('"End turn" hands the game over, then opens the next round', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.goToPhase(0, 'shooting')
    tracker.endTurn()
    let g = tracker.current.value
    expect([g.currentRound, g.currentTurn, g.currentPhase]).toEqual([1, 1, 'command'])
    tracker.endTurn()
    g = tracker.current.value
    expect([g.currentRound, g.currentTurn, g.currentPhase]).toEqual([2, 0, 'command'])
  })

  it('"Undo turn" goes back into the turn that ended, at its last phase', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.goToRound(2)
    tracker.undoTurn()
    let g = tracker.current.value
    expect([g.currentRound, g.currentTurn, g.currentPhase]).toEqual([1, 1, 'fight'])
    tracker.undoTurn()
    g = tracker.current.value
    expect([g.currentRound, g.currentTurn, g.currentPhase]).toEqual([1, 0, 'fight'])
    expect(tracker.canUndoTurn()).toBe(false)
  })

  it('the last turn of the game cannot be ended — only the game can', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.goToRound(mod.ROUND_COUNT)
    tracker.endTurn()
    expect(tracker.canEndTurn()).toBe(false)
    tracker.endTurn()
    const g = tracker.current.value
    expect([g.currentRound, g.currentTurn]).toEqual([mod.ROUND_COUNT, 1])
  })

  it('never steps off either end of the battle', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    expect(tracker.canStepPhase(-1)).toBe(false)
    tracker.stepPhase(-1)
    expect(tracker.current.value.currentRound).toBe(1)
    tracker.goToRound(mod.ROUND_COUNT)
    tracker.goToPhase(1, 'fight')
    expect(tracker.canStepPhase(1)).toBe(false)
    tracker.stepPhase(1)
    expect(tracker.current.value.currentRound).toBe(mod.ROUND_COUNT)
    expect(tracker.current.value.currentPhase).toBe('fight')
  })

  it('changing the round resets the clock — a leftover phase would read as "now"', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.goToPhase(1, 'charge')
    tracker.goToRound(4)
    expect(tracker.current.value.currentTurn).toBe(0)
    expect(tracker.current.value.currentPhase).toBe('command')
  })

  it('goToPhase ignores a phase that is not one', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.goToPhase(1, 'psychic')
    expect(tracker.current.value.currentPhase).toBe('command')
    expect(tracker.current.value.currentTurn).toBe(0)
  })

  it('a game saved before the clock existed reads as the opening phase and steps from there', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    delete tracker.current.value.currentTurn
    delete tracker.current.value.currentPhase
    tracker.stepPhase(1)
    expect(tracker.current.value.currentTurn).toBe(0)
    expect(tracker.current.value.currentPhase).toBe('movement')
  })
})

// ── Rule-condition switches ───────────────────────────────────────────────────────────────────
describe('condition switches', () => {
  it('records when a switch was flipped, and clears it on the way back off', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setUnitCondition(0, 'u1', 'unit-charged', 205, true)
    expect(tracker.current.value.players[0].ctx.units.u1['unit-charged']).toBe(205)
    tracker.setUnitCondition(0, 'u1', 'unit-charged', 205, false)
    expect(tracker.current.value.players[0].ctx.units).toEqual({})
  })

  // "A unit can only be affected by one Order at a time (any Order subsequently issued to that
  // unit replaces the current one)" — the rule replaces, so the store does too.
  it('an alternative replaces its sibling instead of stacking with it', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setUnitCondition(0, 'u1', 'order-take-aim', 101, true)
    tracker.setUnitCondition(0, 'u1', 'order-fix-bayonets', 102, true)
    expect(tracker.current.value.players[0].ctx.units.u1).toEqual({ 'order-fix-bayonets': 102 })
  })

  // "That unit can be affected by up to two different Orders at the same time" (a Command Rod, Ursula
  // Creed): the caller passes the unit's own size, and the group holds two before it replaces.
  it('lets a unit a rule allows two Orders hold two, then replaces the oldest', () => {
    tracker.newGame(setupGame())
    tracker.setUnitCondition(0, 'u1', 'order-take-aim', 101, true, undefined, 2)
    tracker.setUnitCondition(0, 'u1', 'order-fix-bayonets', 102, true, undefined, 2)
    expect(tracker.current.value.players[0].ctx.units.u1).toEqual({ 'order-take-aim': 101, 'order-fix-bayonets': 102 })
    tracker.setUnitCondition(0, 'u1', 'order-move-move-move', 103, true, undefined, 2)
    expect(tracker.current.value.players[0].ctx.units.u1).toEqual({ 'order-fix-bayonets': 102, 'order-move-move-move': 103 })
  })

  // Creations of Bile: "either select one from the list below, or randomly determine two". Two fit
  // in the group; a third one pushes out the one that has been on longest.
  it('lets a capped group hold its whole allowance, then evicts the oldest', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setArmyCondition(0, 'augment-cholinergic-accelerants', 101, true)
    tracker.setArmyCondition(0, 'augment-hyperadrenal-infusion', 102, true)
    expect(Object.keys(tracker.current.value.players[0].ctx.army).sort())
      .toEqual(['augment-cholinergic-accelerants', 'augment-hyperadrenal-infusion'])
    tracker.setArmyCondition(0, 'augment-macrotensile-sinews', 103, true)
    expect(Object.keys(tracker.current.value.players[0].ctx.army).sort())
      .toEqual(['augment-hyperadrenal-infusion', 'augment-macrotensile-sinews'])
  })

  // Switches flipped in the same phase share a stamp, so the sort has nothing to go on but the
  // order they were written in — and that order is still "which one has been on longest".
  it('breaks a tie on insertion order when a whole group shares one stamp', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setArmyCondition(0, 'augment-paraneural-reactions', 101, true)
    tracker.setArmyCondition(0, 'augment-supracutaneous-chitination', 101, true)
    tracker.setArmyCondition(0, 'augment-ophthalmic-enhancement', 101, true)
    expect(Object.keys(tracker.current.value.players[0].ctx.army).sort())
      .toEqual(['augment-ophthalmic-enhancement', 'augment-supracutaneous-chitination'])
  })

  it('leaves ungrouped switches alone — some rules really do allow several', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setArmyCondition(0, 'blessing-martial-excellence', 101, true)
    tracker.setArmyCondition(0, 'blessing-warp-blades', 101, true)
    expect(Object.keys(tracker.current.value.players[0].ctx.army).sort())
      .toEqual(['blessing-martial-excellence', 'blessing-warp-blades'])
  })

  // A stratagem is spent, not switched: several can be up on one unit at once, and each is keyed by
  // the record it came from rather than by a condition id.
  it('records a stratagem spent on a unit, and forgets it when taken back', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setUnitStratagem(0, 'u1', 'strat-a', 205, true)
    tracker.setUnitStratagem(0, 'u1', 'strat-b', 205, true)
    expect(tracker.current.value.players[0].ctx.strats.u1).toEqual({ 'strat-a': 205, 'strat-b': 205 })
    tracker.setUnitStratagem(0, 'u1', 'strat-a', 205, false)
    expect(tracker.current.value.players[0].ctx.strats.u1).toEqual({ 'strat-b': 205 })
    tracker.setUnitStratagem(0, 'u1', 'strat-b', 205, false)
    expect(tracker.current.value.players[0].ctx.strats).toEqual({})
  })

  // An ability set's choice is that model's, keyed by the option's own record — and the set's size
  // caps it: picking a third relic drops the one that has been up longest.
  it('records an ability-set pick, and evicts the oldest when the set is full', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const set = { siblings: ['a', 'b', 'c'], limit: 2 }
    tracker.setUnitPick(0, 'u1', 'a', 201, true, set)
    tracker.setUnitPick(0, 'u1', 'b', 202, true, set)
    expect(tracker.current.value.players[0].ctx.picks.u1).toEqual({ a: 201, b: 202 })
    tracker.setUnitPick(0, 'u1', 'c', 203, true, set)
    expect(tracker.current.value.players[0].ctx.picks.u1).toEqual({ b: 202, c: 203 })
    tracker.setUnitPick(0, 'u1', 'b', 203, false, set)
    tracker.setUnitPick(0, 'u1', 'c', 203, false, set)
    expect(tracker.current.value.players[0].ctx.picks).toEqual({})
  })

  // An aura is a relationship with another model, not a state of this one — so it is keyed by the
  // record it radiates from, in its own map, exactly like a spent stratagem.
  it('records an aura marked on a unit, and forgets it when unmarked', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setUnitAura(0, 'u1', 'fiery-heart', 205, true)
    expect(tracker.current.value.players[0].ctx.auras.u1).toEqual({ 'fiery-heart': 205 })
    tracker.setUnitAura(0, 'u1', 'fiery-heart', 205, false)
    expect(tracker.current.value.players[0].ctx.auras).toEqual({})
  })

  it('keeps the two players\' contexts apart', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setArmyCondition(0, 'tactic-furor', 101, true)
    expect(tracker.current.value.players[1].ctx).toBeUndefined()
  })
})


describe('doubles', () => {
  function setupDoubles(over = {}) {
    return setupGame({
      settings: { gameType: 'doubles', ...(over.settings || {}) },
      players: [
        {
          teamName: 'Alpha', disposition: D0, role: 'attacker', secondaryMode: 'tactical',
          fixedSecondaries: [], battleReady: true,
          members: [
            { name: 'Ann', factionSlug: 'orks', detachments: ['War Horde'] },
            { name: 'Bob', factionSlug: 'aeldari', detachments: ['Battle Host'] },
          ],
        },
        {
          teamName: 'Beta', disposition: D1, role: 'defender', secondaryMode: 'tactical',
          fixedSecondaries: [], battleReady: false,
          members: [
            { name: 'Cat', factionSlug: 'drukhari', detachments: [] },
            { name: 'Dan', factionSlug: 'drukhari', detachments: [] },
          ],
        },
      ],
      ...over.players ? { players: over.players } : {},
    })
  }

  it('deriveForceType: same faction and SM chapters are unified, the rest convenience', () => {
    expect(mod.deriveForceType('orks', 'orks')).toBe('unified')
    expect(mod.deriveForceType('black-templars', 'space-wolves')).toBe('unified')
    expect(mod.deriveForceType('orks', 'aeldari')).toBe('convenience')
    expect(mod.deriveForceType(null, 'orks')).toBeNull()
  })

  it('membersOf/memberAt: a singles side is its own only member', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const side = tracker.current.value.players[0]
    expect(mod.membersOf(side)).toEqual([side])
    expect(mod.memberAt(side, null)).toBe(side)
    expect(mod.memberAt(side, 1)).toBe(side) // out-of-range falls back to the side
  })

  it('newGame builds team sides: name = teamName, members populated, side army fields empty', () => {
    tracker.newGame(setupDoubles())
    tracker.beginGame()
    const g = tracker.current.value
    expect(g.settings.gameType).toBe('doubles')
    const side = g.players[0]
    expect(side.name).toBe('Alpha')
    expect(side.teamName).toBe('Alpha')
    expect(side.factionSlug).toBeNull()
    expect(side.detachments).toEqual([])
    expect(side.members).toHaveLength(2)
    expect(side.members[0]).toMatchObject({ name: 'Ann', factionSlug: 'orks' })
    expect(mod.membersOf(side)).toBe(side.members)
    // Scoring state stays side-level (round 1's Core CP already in).
    expect(side.cp).toBe(1)
    expect(side.rounds).toHaveLength(mod.ROUND_COUNT)
    expect(side.primarySlug).toBeTruthy()
  })

  it('forceType: derived from the members, overridable via the setup payload', () => {
    tracker.newGame(setupDoubles())
    tracker.beginGame()
    expect(tracker.current.value.players[0].forceType).toBe('convenience') // orks + aeldari
    expect(tracker.current.value.players[1].forceType).toBe('unified')     // drukhari ×2
    const s = setupDoubles()
    s.players[1].forceType = 'convenience'
    tracker.newGame(s)
    tracker.beginGame()
    expect(tracker.current.value.players[1].forceType).toBe('convenience')
  })

  it('army mutators without mi hit the side (unified shared pool), with mi hit that member', () => {
    tracker.newGame(setupDoubles())
    tracker.beginGame()
    tracker.setArmyCounter(0, 3)          // side-level: the unified force's shared pool
    tracker.setArmyCounter(0, 5, 1)       // member 1's own pool
    const side = tracker.current.value.players[0]
    expect(side.army.counter).toBe(3)
    expect(side.members[1].army.counter).toBe(5)
    expect(side.members[0].army).toEqual({})
  })

  it('ctx mutators with mi keep member contexts apart', () => {
    tracker.newGame(setupDoubles())
    tracker.beginGame()
    tracker.setUnitCondition(0, 'u1', 'charged', 101, true, 0)
    const side = tracker.current.value.players[0]
    expect(side.members[0].ctx.units.u1).toEqual({ charged: 101 })
    expect(side.members[1].ctx).toBeUndefined()
    expect(side.ctx).toBeUndefined()
  })

  it('updateSetup patches teamName (mirrored into name) and member fields', () => {
    tracker.newGame(setupDoubles())
    tracker.beginGame()
    tracker.updateSetup({ players: [
      { teamName: 'Alpha Strike', members: [{ name: 'Anna' }, {}] },
      {},
    ] })
    const side = tracker.current.value.players[0]
    expect(side.teamName).toBe('Alpha Strike')
    expect(side.name).toBe('Alpha Strike')
    expect(side.members[0].name).toBe('Anna')
    expect(side.members[1].name).toBe('Bob')
  })

  it('a doubles game survives the isValidGame load guard', () => {
    tracker.newGame(setupDoubles())
    tracker.beginGame()
    expect(mod.isValidGame(JSON.parse(JSON.stringify(tracker.current.value)))).toBe(true)
  })
})

// P0 of multi-device sync (hub journal 2026-09-16-multi-device-sync): the store takes another
// device's slice through ONE door, and the tree it leaves behind is a game every other reader
// already trusts.
describe('applyRemote (multi-device sync)', () => {
  let sliceGame
  beforeEach(async () => { ({ sliceGame } = await import('./gameSlices.js')) })

  it('lands the other side\'s slice on a valid tree and leaves this side\'s edits alone', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setRoundPrimary(0, 0, 12)
    tracker.setCp(0, 3)
    tracker.setUnitCondition(0, 'u1', 'charged', 120, true)
    const mine = tracker.current.value.players[0]
    const theirs = tracker.current.value.players[1]

    // The opponent's phone: same game, their side scored and drawn on.
    const remote = JSON.parse(JSON.stringify(tracker.current.value))
    remote.players[1].cp = 6
    remote.players[1].rounds[0].primary = 10
    remote.players[1].secondary.hand = [remote.players[1].secondary.deck[0]]
    remote.players[1].secondary.deck = remote.players[1].secondary.deck.slice(1)
    remote.players[1].isYou = true // on THEIR phone, side 1 is You
    remote.players[0].cp = 0       // stale on their phone — must not come back through side1

    expect(tracker.applyRemote('side1', sliceGame(remote).side1)).toBe(true)
    const g = tracker.current.value
    expect(mod.isValidGame(JSON.parse(JSON.stringify(g)))).toBe(true)
    expect(g.players[1]).toBe(theirs)
    expect(g.players[0]).toBe(mine)
    expect(g.players[1].cp).toBe(6)
    expect(g.players[1].secondary.hand).toHaveLength(1)
    expect(g.players[1].isYou).toBe(false)
    expect(g.players[0].cp).toBe(3)
    expect(g.players[0].rounds[0].primary).toBe(12)
    expect(g.players[0].ctx.units.u1.charged).toBe(120)
    // The scoring engine reads the applied tree like any other.
    expect(tracker.primaryTotal(1)).toBe(10)
    expect(tracker.grandTotal(0)).toBe(12)
    // …and the mutators keep writing into it.
    tracker.setCp(1, 7)
    expect(g.players[1].cp).toBe(7)
  })

  it('a shared slice moves the clock and the finish state, players untouched', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setCp(0, 2)
    const remote = JSON.parse(JSON.stringify(tracker.current.value))
    remote.currentRound = 3
    remote.currentPhase = 'fight'
    remote.phase = 'finished'
    remote.finishedAt = '2026-09-17T12:00:00.000Z'
    tracker.applyRemote('shared', sliceGame(remote).shared)
    const g = tracker.current.value
    expect(g.currentRound).toBe(3)
    expect(g.currentPhase).toBe('fight')
    expect(g.phase).toBe('finished')
    expect(g.players[0].cp).toBe(2)
    expect(mod.isValidGame(JSON.parse(JSON.stringify(g)))).toBe(true)
  })

  it('persists like a local tap — the debounced save picks it up', () => {
    vi.useFakeTimers()
    tracker.newGame(setupGame())
    tracker.beginGame()
    vi.runAllTimers()
    const remote = JSON.parse(JSON.stringify(tracker.current.value))
    remote.players[1].cp = 9
    tracker.applyRemote('side1', sliceGame(remote).side1)
    return Promise.resolve().then(() => {
      vi.runAllTimers()
      const saved = JSON.parse(localStorage.getItem('wh11ed-tracker-current'))
      expect(saved.players[1].cp).toBe(9)
      vi.useRealTimers()
    })
  })

  it('refuses when there is no game to write into', () => {
    expect(tracker.current.value).toBeNull()
    expect(tracker.applyRemote('side0', { cp: 1 })).toBe(false)
    expect(tracker.current.value).toBeNull()
  })
})

// ── The lobby: a game that exists before it is played ──────────────────────────────────────
// The Mission Sequence's steps after the setup (owner, 2026-10-25): the secondaries (step 6) and
// the roll for the first turn (step 10) come before the battle, on the game screen (PreBattle.vue).
describe('before the battle', () => {
  it('waits for the roll when the setup left the first turn open, and starts in the setup\'s order', () => {
    tracker.newGame(setupGame({ settings: { firstTurn: null } }))
    const g = tracker.current.value
    expect(g.firstTurnPending).toBe(true)
    expect(g.players.map((p) => p.name)).toEqual(['Me', 'Opp'])
    expect(tracker.battleWaitsFor()).toBe('firstTurn')
    tracker.beginGame()
    expect(g.begun).toBe(false) // refused: nobody has rolled
    // The Opponent won: it moves to index 0, and the battle may begin.
    expect(tracker.rollFirstTurn(1)).toBe(true)
    expect(g.players.map((p) => p.name)).toEqual(['Opp', 'Me'])
    expect(g.players.map((p) => p.isYou)).toEqual([false, true])
    expect(tracker.battleWaitsFor()).toBeNull()
    tracker.beginGame()
    expect(mod.gameBegun(g)).toBe(true)
    expect(g).not.toHaveProperty('firstTurnPending')
  })
  it('needs no roll for a game set up with its first turn', () => {
    tracker.newGame(setupGame())
    expect(tracker.current.value).not.toHaveProperty('firstTurnPending')
    expect(tracker.battleWaitsFor()).toBeNull()
  })
  it('rebuilds a side\'s secondaries before the battle, and leaves them alone after', () => {
    tracker.newGame(setupGame())
    const pl = tracker.current.value.players[0]
    const fixed = mod.fixedPool(pl.role).slice(0, 2).map((m) => m.slug)
    tracker.setSecondaries(0, 'fixed', [])
    expect(tracker.battleWaitsFor()).toBe('fixed') // fixed with no card yet
    tracker.setSecondaries(0, 'fixed', fixed)
    expect(pl.secondaryMode).toBe('fixed')
    expect(pl.secondary.hand).toEqual(fixed)
    expect(pl.secondary.deck).toEqual([])
    expect(pl.secondary.drawn).toEqual({ [fixed[0]]: 1, [fixed[1]]: 1 })
    tracker.setSecondaries(0, 'tactical')
    expect(pl.secondary.hand).toEqual([])
    expect(pl.secondary.deck.length).toBeGreaterThan(0)
    tracker.beginGame()
    tracker.setSecondaries(0, 'fixed', fixed)
    expect(pl.secondaryMode).toBe('tactical') // the battle has begun
  })
  it('in a shared game, waits for each side to confirm its secondaries', () => {
    tracker.startLobby(setupGame())
    tracker.current.value.party = { id: 'p', token: 't', side: 0, host: true, seq: 1, versions: {} }
    tracker.newGame(setupGame())
    const g = tracker.current.value
    expect(g.players.map((p) => p.secondaryPending)).toEqual([true, true])
    expect(tracker.battleWaitsFor()).toBe('secondaries')
    tracker.confirmSecondaries(0)
    tracker.confirmSecondaries(1)
    expect(tracker.battleWaitsFor()).toBeNull()
    tracker.setSecondaries(1, 'tactical') // a change is a choice to confirm again
    expect(g.players[1].secondaryPending).toBe(true)
  })
})

describe('lobby', () => {
  it('startLobby turns the wizard state into a game in phase setup', () => {
    const setup = setupGame()
    tracker.startLobby(setup)
    const g = tracker.current.value
    expect(g.phase).toBe('setup')
    expect(g.lobby.stage).toBe('armies') // opened from the wizard's first step, which it stays on
    // The very objects the wizard edits, not copies of them: a slice arriving from another
    // phone has to land in the fields on screen, and what the wizard types has to reach the
    // game with no bridge in between. (Identity is checked through a mutation: `current` is a
    // ref, so reading it back hands out reactive proxies of the same objects.)
    setup.players[0].name = 'Typed after sharing'
    setup.settings.battleSize = 'incursion'
    expect(g.players[0].name).toBe('Typed after sharing')
    expect(g.settings.battleSize).toBe('incursion')
  })

  it('starting the game keeps the lobby id and party handle, and wipes the lobby bookkeeping', () => {
    const setup = setupGame()
    tracker.startLobby(setup)
    const g0 = tracker.current.value
    g0.party = { id: 'p1', token: 't', host: true, side: 0, versions: {} }
    g0.players[1].lobby = { editor: { id: 'm2' }, ready: true }
    const { swapped } = tracker.newGame(setup)

    const g = tracker.current.value
    expect(g.id).toBe(g0.id)
    expect(g.party.id).toBe('p1')
    expect(g.phase).toBe('playing')
    expect(g.lobby).toBeUndefined()
    expect(g.players.some(p => p.lobby)).toBe(false)
    expect(swapped).toBe(false)
  })

  it('reports the swap when the opponent goes first — the seats have to follow', () => {
    const setup = setupGame({ settings: { firstTurn: 2 } })
    tracker.startLobby(setup)
    const { swapped } = tracker.newGame(setup)
    expect(swapped).toBe(true)
    expect(tracker.current.value.players[0].isYou).toBe(false)
  })

  it('putAwayCurrent drops a lobby and archives a played game', () => {
    tracker.startLobby(setupGame())
    tracker.putAwayCurrent()
    expect(tracker.current.value).toBe(null)
    expect(tracker.history.value).toHaveLength(0) // a game that never happened is not a record

    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.putAwayCurrent()
    expect(tracker.current.value).toBe(null)
    expect(tracker.history.value).toHaveLength(1)
    expect(tracker.history.value[0].phase).toBe('finished')
  })
})

describe('taking the turn\'s two secondaries', () => {
  const sec = (pi) => tracker.current.value.players[pi].secondary

  it('draws two at random once per own turn, marks them 🎲, and refuses the other side', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    expect(tracker.canTakeSecondaries(1)).toBe(false) // not their turn
    tracker.takeRandomSecondaries(0)
    expect(sec(0).hand).toHaveLength(2)
    expect(sec(0).hand.map(slug => sec(0).source[slug])).toEqual(['random', 'random'])
    expect(tracker.tookSecondaries(0)).toBe('random')
    tracker.takeRandomSecondaries(0) // a second time in the same turn does nothing
    expect(sec(0).hand).toHaveLength(2)
  })

  // A custom size sets its own number a turn (owner, 2026-10-23: evening events at 750 with one).
  it('takes as many as a custom size says, by hand and at random', () => {
    tracker.newGame(setupGame({ settings: { battleSize: 'custom', custom: { points: 750, secondaries: 1 } } }))
    tracker.beginGame()
    const [a, b] = sec(0).deck
    tracker.takeChosenSecondaries(0, [a, b]) // two is not one
    expect(sec(0).hand).toHaveLength(0)
    tracker.takeChosenSecondaries(0, [a])
    expect(sec(0).hand).toEqual([a])
    expect(tracker.tookSecondaries(0)).toBe('chosen')

    tracker.newGame(setupGame({ settings: { battleSize: 'custom', custom: { points: 2000, secondaries: 3 } } }))
    tracker.beginGame()
    tracker.takeRandomSecondaries(0)
    expect(sec(0).hand).toHaveLength(3)
  })

  it('takes exactly two chosen ones, marks them ✋, and can put them back while unscored', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const [a, b] = sec(0).deck
    tracker.takeChosenSecondaries(0, [a]) // one is not two
    expect(sec(0).hand).toHaveLength(0)
    tracker.takeChosenSecondaries(0, [a, b])
    expect(sec(0).hand).toEqual([a, b])
    expect(sec(0).source[a]).toBe('chosen')
    expect(tracker.canUntakeSecondaries(0)).toBe(true)
    tracker.scoreSecondaryRow(0, a, 0, 0, 1)
    expect(tracker.canUntakeSecondaries(0)).toBe(false)
    tracker.scoreSecondaryRow(0, a, 0, 0, 0)
    tracker.untakeSecondaries(0)
    expect(sec(0).hand).toEqual([])
    expect(sec(0).deck).toContain(a)
    expect(tracker.canTakeSecondaries(0)).toBe(true)
  })

  it('reads an older game with two cards drawn this round as already taken', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.drawSecondary(0)
    tracker.drawSecondary(0)
    delete sec(0).took
    expect(tracker.tookSecondaries(0)).toBe('legacy')
    expect(tracker.canTakeSecondaries(0)).toBe(false)
  })
})

describe('achieved secondaries leave the hand at the end of each turn', () => {
  const sec = (pi) => tracker.current.value.players[pi].secondary
  // A row whose VP is a plain number, so a tick scores it.
  function scorableRow(pi, slug) {
    const blocks = mod.scorableBlocks(slug, tracker.current.value.players[pi].role, tracker.current.value.currentRound)
    const b = blocks.find(x => x.kind === 'tactical' && x.rows.some(r => mod.numericVp(r.vp) > 0))
    return [b.bi, b.rows.findIndex(r => mod.numericVp(r.vp) > 0)]
  }

  it('sets an achieved card aside when its turn ends, and Undo turn puts it back', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const [a, b] = takeScorablePair(0)
    const [bi, ri] = scorableRow(0, a)
    tracker.scoreSecondaryRow(0, a, bi, ri, 1)
    tracker.endTurn()
    expect(sec(0).hand).toEqual([b])
    expect(sec(0).discarded).toEqual([{ slug: a, round: 1, auto: 0, t: expect.any(Number) }])
    tracker.undoTurn()
    expect(sec(0).hand).toEqual([b, a])
    expect(sec(0).discarded).toEqual([])
  })

  it('a card set aside by hand stays set aside through Undo turn', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.takeRandomSecondaries(0)
    const [a] = sec(0).hand
    tracker.discardFromHand(0, a)
    tracker.endTurn()
    tracker.undoTurn()
    expect(sec(0).hand).not.toContain(a)
  })

  it('a past round corrected into an achievement takes the card out of the hand', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const [a] = takeScorablePair(0)
    tracker.endTurn()
    tracker.endTurn() // round 2
    const [bi, ri] = scorableRow(0, a)
    tracker.scoreSecondaryRow(0, a, bi, ri, 1, 1)
    expect(sec(0).hand).not.toContain(a)
    expect(tracker.secondaryCardVp(0, a, 1)).toBeGreaterThan(0)
    expect(sec(0).discarded.find(d => d.slug === a).round).toBe(1)
  })
})

describe('the CP ledger', () => {
  const pl = (pi) => tracker.current.value.players[pi]
  const kinds = (pi) => pl(pi).cpLog.map(e => `${e.kind}${e.amount > 0 ? '+' : ''}${e.amount}@${e.round}.${e.turn}`)

  // Start on the setup opens the game screen; the first turn starts with its own button there.
  it('gives nothing of turn 1 before the game has begun', () => {
    tracker.newGame(setupGame())
    expect(mod.gameBegun(tracker.current.value)).toBe(false)
    expect([pl(0).cp, pl(1).cp]).toEqual([0, 0])
    expect(tracker.canTakeSecondaries(0)).toBe(false)
    tracker.beginGame()
    expect(mod.gameBegun(tracker.current.value)).toBe(true)
    expect([pl(0).cp, pl(1).cp]).toEqual([1, 1])
    expect(tracker.canTakeSecondaries(0)).toBe(true)
    // a game saved before the flag existed has begun
    expect(mod.gameBegun({ phase: 'playing' })).toBe(true)
  })

  it('gives both players 1 Core CP at every Command phase, and takes it back with Undo turn', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    expect([pl(0).cp, pl(1).cp]).toEqual([1, 1])
    tracker.endTurn()
    expect([pl(0).cp, pl(1).cp]).toEqual([2, 2])
    tracker.endTurn()
    expect(kinds(0)).toEqual(['core+1@1.0', 'core+1@1.1', 'core+1@2.0'])
    tracker.undoTurn()
    tracker.undoTurn()
    expect([pl(0).cp, pl(1).cp]).toEqual([1, 1])
    // settling twice changes nothing
    tracker.endTurn()
    tracker.undoTurn()
    tracker.endTurn()
    expect(pl(0).cpLog.filter(e => e.kind === 'core')).toHaveLength(2)
  })

  it('lets a player gain one bonus CP a round, undo it by hand, and have it again next round', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    expect(tracker.gainBonusCp(0)).toBe(true)
    expect(tracker.gainBonusCp(0)).toBe(false) // the Event Companion's cap
    expect(pl(0).cp).toBe(2)
    expect(tracker.canUndoBonus(0)).toBe(true)
    tracker.undoBonusCp(0)
    expect(pl(0).cp).toBe(1)
    tracker.gainBonusCp(0)
    tracker.endTurn()
    tracker.endTurn()
    expect(tracker.canGainBonus(0)).toBe(true)
  })

  it('keeps a stepper correction as an adjust entry', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.setCp(1, 4)
    expect(pl(1).cp).toBe(4)
    expect(pl(1).cpLog.at(-1)).toMatchObject({ kind: 'adjust', amount: 3 })
  })

  it('an older game without the ledger keeps its number and gets no Core CP by itself', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const g = tracker.current.value
    delete g.cpAuto
    for (const p of g.players) { delete p.cpLog; delete p.cpBase; p.cp = 5 }
    tracker.endTurn()
    expect(pl(0).cp).toBe(5)
    tracker.setCp(0, 3)
    expect(pl(0).cp).toBe(3)
    expect(pl(0).cpBase).toBe(5)
  })

  it('the end-of-turn discard gains the round\'s bonus CP and ends the turn; Undo turn returns both', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.takeRandomSecondaries(0)
    const [a] = pl(0).secondary.hand
    tracker.endTurnDiscard(0, a)
    expect(tracker.current.value.currentTurn).toBe(1)
    expect(pl(0).secondary.hand).not.toContain(a)
    expect(pl(0).cp).toBe(3) // Core ×2 + the discard's bonus
    tracker.undoTurn()
    expect(pl(0).secondary.hand).toContain(a)
    expect(pl(0).cp).toBe(1)
  })

  it('a card discarded for 1CP and put back in hand gives the CP back', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.takeRandomSecondaries(0)
    const [a] = pl(0).secondary.hand
    tracker.endTurnDiscard(0, a)
    expect(pl(0).cp).toBe(3)
    tracker.restoreSecondaryToHand(0, a)
    expect(pl(0).secondary.hand).toContain(a)
    expect(pl(0).cp).toBe(2) // Core ×2, the discard's point gone with the discard
    expect(tracker.canGainBonus(0)).toBe(true)
  })

  // A card that scored this turn is achieved: it leaves for its VP, and discarding it for CP as
  // well would pay it twice (Misha, 2026-10-20).
  it('refuses the end-of-turn discard of a card that scored this turn', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.takeRandomSecondaries(0)
    const [a] = pl(0).secondary.hand
    const entry = { slug: a, round: tracker.current.value.currentRound, picks: {}, vp: 3 }
    pl(0).secondary.scored.push(entry)
    expect(tracker.secondaryCardVp(0, a)).toBe(3)
    tracker.endTurnDiscard(0, a)
    expect(pl(0).secondary.hand).toContain(a)
    expect(tracker.current.value.currentTurn).toBe(0)
    expect(pl(0).cpLog.filter(e => e.kind === 'bonus')).toHaveLength(0)
  })

  // Marked, not done (owner, 2026-10-20): the card stays in hand with its mark, and goes — with the
  // round's bonus CP — when the turn is ended; Undo turn brings both back.
  it('discards a card marked for the end of the turn when the turn ends', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.takeRandomSecondaries(0)
    const [a, b] = pl(0).secondary.hand
    tracker.markForTurnEnd(0, a)
    expect(tracker.isMarkedForTurnEnd(0, a)).toBe(true)
    expect(pl(0).secondary.hand).toContain(a) // still in hand, the turn still on
    expect(tracker.current.value.currentTurn).toBe(0)
    tracker.markForTurnEnd(0, b)
    tracker.markForTurnEnd(0, b) // the same item takes the mark off
    expect(tracker.isMarkedForTurnEnd(0, b)).toBe(false)
    tracker.endTurn()
    expect(pl(0).secondary.hand).not.toContain(a)
    expect(pl(0).secondary.hand).toContain(b)
    expect(pl(0).secondary.discarded.find(d => d.slug === a)).toMatchObject({ cp: true })
    expect(pl(0).secondary.eotMarked).toBeUndefined()
    expect(pl(0).cp).toBe(3) // Core ×2 + the discard's bonus
    tracker.undoTurn()
    expect(pl(0).secondary.hand).toContain(a)
    expect(pl(0).cp).toBe(1)
  })

  it('does not mark, or discard at the end, a card that scored this turn', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.takeRandomSecondaries(0)
    const [a, b] = pl(0).secondary.hand
    pl(0).secondary.scored.push({ slug: a, round: tracker.current.value.currentRound, picks: {}, vp: 2 })
    tracker.markForTurnEnd(0, a)
    expect(tracker.isMarkedForTurnEnd(0, a)).toBe(false)
    // Marked first, scored after: it leaves for its VP, not for CP.
    tracker.markForTurnEnd(0, b)
    pl(0).secondary.scored.push({ slug: b, round: tracker.current.value.currentRound, picks: {}, vp: 3 })
    tracker.endTurn()
    expect(pl(0).secondary.discarded.filter(d => d.cp)).toHaveLength(0)
    expect(pl(0).cpLog.filter(e => e.kind === 'bonus')).toHaveLength(0)
  })

  it('an end-of-turn discard with the bonus already used gains nothing', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.takeRandomSecondaries(0)
    tracker.gainBonusCp(0)
    tracker.endTurnDiscard(0, pl(0).secondary.hand[0])
    expect(pl(0).cpLog.filter(e => e.kind === 'bonus')).toHaveLength(1)
  })

  it('replaces a card for 1CP once per battle, on the side\'s own turn', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.takeRandomSecondaries(0)
    const [a] = pl(0).secondary.hand
    expect(tracker.canCpRedraw(1)).toBe(false)
    const pick = pl(0).secondary.deck[3]
    tracker.cpRedraw(0, a, pick)
    expect(pl(0).secondary.hand).toContain(pick)
    expect(pl(0).secondary.source[pick]).toBe('chosen')
    expect(pl(0).secondary.discarded.map(d => d.slug)).toContain(a)
    expect(pl(0).cp).toBe(0)
    expect(pl(0).cpLog.at(-1)).toMatchObject({ kind: 'spend', amount: -1, source: 'redraw', ref: a })
    tracker.gainBonusCp(0)
    expect(tracker.canCpRedraw(0)).toBe(false) // once per battle
  })
})

describe('spending CP on stratagems', () => {
  const pl = (pi) => tracker.current.value.players[pi]
  const strat = (over = {}) => ({ _key: 'core:15.02', name: 'Command Re-roll', _limits: {}, ...over })

  it('lets either side spend at any moment, and takes the latest use back', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.gainBonusCp(1)
    expect(tracker.useStratagem(1, strat(), 1)).toBeTruthy() // the opponent, in my turn
    expect(pl(1).cp).toBe(1)
    expect(tracker.useStratagem(1, strat(), 1)).toBeTruthy() // without phases, twice is fine
    expect(tracker.stratBlock(1, strat(), 1)).toBe('cp')
    tracker.undoStratagem(1, 'core:15.02')
    expect(pl(1).cp).toBe(1)
    expect(tracker.stratUses(1, 'core:15.02')).toHaveLength(1)
  })

  it('keeps a stratagem\'s own limits and, with the phase clock on, once per phase', () => {
    tracker.newGame(setupGame({ settings: { trackPhases: true } }))
    tracker.beginGame()
    tracker.setCp(0, 9)
    expect(tracker.stratBlock(0, strat({ _limits: { minRound: 2 } }), 1)).toBe('minRound')
    tracker.useStratagem(0, strat({ _key: 'b', _limits: { perBattle: true } }), 1)
    expect(tracker.stratBlock(0, strat({ _key: 'b', _limits: { perBattle: true } }), 1)).toBe('perBattle')
    tracker.useStratagem(0, strat(), 1)
    expect(tracker.stratBlock(0, strat(), 1)).toBe('perPhase')
    tracker.stepPhase(1)
    expect(tracker.stratBlock(0, strat(), 1)).toBe(null)
    expect(pl(0).cpLog.at(-1)).toMatchObject({ kind: 'spend', source: 'strat', phase: 'command' })
  })

  it('refuses a finished game', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    tracker.finishGame('played')
    expect(tracker.stratBlock(0, strat(), 0)).toBe('finished')
  })
})

describe('finishing with a concede', () => {
  it('records the conceding SIDE, whoever went first', () => {
    tracker.newGame(setupGame({ settings: { firstTurn: 2 } }))
    tracker.beginGame() // the opponent goes first: you are players[1]
    tracker.finishGame('friendly-concede')
    const g = tracker.current.value
    expect(g.concededBy).toBe(1)
    expect(tracker.leader()).toBe(0)
    tracker.resumeGame()
    tracker.finishGame('played')
    expect(g.concededBy).toBeUndefined()
  })
})

describe('the clock settles when another phone moves it', () => {
  it('a turn ended on the other phone gives this phone its Core CP and sets aside its achieved cards', async () => {
    const { sliceGame } = await import('./gameSlices.js')
    tracker.newGame(setupGame())
    tracker.beginGame()
    const pl0 = () => tracker.current.value.players[0]
    const [a] = takeScorablePair(0)
    const blocks = mod.scorableBlocks(a, pl0().role, 1)
    const b = blocks.find((x) => x.kind === 'tactical' && x.rows.some((r) => mod.numericVp(r.vp) > 0))
    tracker.scoreSecondaryRow(0, a, b.bi, b.rows.findIndex((r) => mod.numericVp(r.vp) > 0), 1)
    // The other phone ends the turn: only the shared slice (the clock) arrives here.
    const remote = sliceGame({ ...JSON.parse(JSON.stringify(tracker.current.value)), currentTurn: 1 }).shared
    tracker.applyRemote('shared', remote)
    expect(tracker.current.value.currentTurn).toBe(1)
    expect(pl0().cp).toBe(2)
    expect(pl0().secondary.hand).not.toContain(a)
  })
})

// Owner, 2026-09-30: a stratagem played on a unit is ONE act — the CP spent, the unit named on the
// ledger entry, and its card's effect switched on — and taking it back from either side takes both.
describe('playStratagem', () => {
  const strat = { _key: 'det|Hold Fast', name: 'Hold Fast', _cost: 1, _limits: {}, _phases: ['any'], _sides: [] }
  const target = { uid: 'u1', name: 'Chosen', sid: 'rec-1' }

  it('spends the CP, names the unit and switches its card record on', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const pl = tracker.current.value.players[0]
    const cp = pl.cp
    const e = tracker.playStratagem(0, strat, 1, target)
    expect(pl.cp).toBe(cp - 1)
    expect(e.target).toEqual({ uid: 'u1', name: 'Chosen', sid: 'rec-1' })
    expect(pl.ctx.strats.u1['rec-1']).toBeGreaterThanOrEqual(100)
  })

  it('takes both back from the CP tab, and from the card', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const pl = tracker.current.value.players[0]
    const cp = pl.cp
    tracker.playStratagem(0, strat, 1, target)
    tracker.undoStratagem(0, strat._key)
    expect(pl.cp).toBe(cp)
    expect(pl.ctx?.strats?.u1).toBeUndefined()

    tracker.playStratagem(0, strat, 0, target) // a cost a rule reduced
    expect(pl.cp).toBe(cp)
    tracker.unplayOnUnit(0, 'u1', 'rec-1')
    expect(pl.ctx?.strats?.u1).toBeUndefined()
    expect((pl.cpLog || []).filter((x) => x.kind === 'spend')).toHaveLength(0)
  })

  it('names an enemy target without touching any card', () => {
    tracker.newGame(setupGame())
    tracker.beginGame()
    const e = tracker.playStratagem(0, strat, 1, { uid: 'x9', name: 'Boyz', opp: true })
    expect(e.target).toEqual({ uid: 'x9', name: 'Boyz', opp: true })
    expect(tracker.current.value.players[0].ctx?.strats).toBeFalsy()
  })
})

describe('unit status', () => {
  it('carries the setup reserves into the game and stamps a change with the clock', () => {
    const setup = setupGame()
    setup.players[0].unitStatus = { u1: { s: 'reserve', name: 'Terminators' } }
    tracker.newGame(setup)
    const g = tracker.current.value
    expect(g.players[0].unitStatus.u1).toMatchObject({ s: 'reserve', round: 0 })
    expect(g.players[1].unitStatus).toEqual({})
    // Before the first turn begins, a change is still "before the battle".
    tracker.setUnitStatus(0, 'u2', 'reserve', 'Scouts')
    expect(g.players[0].unitStatus.u2.round).toBe(0)
    tracker.beginGame()
    tracker.goToRound(2)
    tracker.setUnitStatus(0, 'u1', 'table', 'Terminators')
    expect(g.players[0].unitStatus.u1).toMatchObject({ s: 'table', round: 2, turn: 0, name: 'Terminators' })
    tracker.setUnitStatus(1, 'x', 'destroyed', 'Boyz')
    expect(g.players[1].unitStatus.x).toMatchObject({ s: 'destroyed', round: 2 })
    tracker.setUnitStatus(1, 'x', 'table', 'Boyz')
    expect(g.players[1].unitStatus.x).toBeUndefined()
  })

  // Doubles: each member's list keeps its own statuses, the way it keeps its own switches.
  it('writes a doubles member, not the side', () => {
    const setup = setupGame({ settings: { gameType: 'doubles' } })
    setup.players = setup.players.map((p) => ({ ...p, teamName: p.name, members: [{ name: 'A', unitStatus: { m: { s: 'reserve' } } }, { name: 'B' }] }))
    tracker.newGame(setup)
    const side = tracker.current.value.players[0]
    expect(side.members[0].unitStatus.m.s).toBe('reserve')
    tracker.setUnitStatus(0, 'n', 'destroyed', 'N', 1)
    expect(side.members[1].unitStatus.n.s).toBe('destroyed')
    expect(side.unitStatus).toEqual({})
  })
})
