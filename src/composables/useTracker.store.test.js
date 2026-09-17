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

describe('newGame', () => {
  it('creates a playing game with two players and resolved primaries', () => {
    tracker.newGame(setupGame())
    const g = tracker.current.value
    expect(g.phase).toBe('playing')
    expect(g.currentRound).toBe(1)
    expect(g.players).toHaveLength(2)
    expect(g.players[0].primarySlug).toBeTruthy()
    expect(g.players[0].rounds).toHaveLength(mod.ROUND_COUNT)
  })
  it('carries settings (scoreMode, battleSize) into the game', () => {
    tracker.newGame(setupGame({ settings: { scoreMode: 'bp', battleSize: 'incursion' } }))
    expect(tracker.current.value.settings.scoreMode).toBe('bp')
    expect(tracker.current.value.settings.battleSize).toBe('incursion')
  })
  it('firstTurn:1 — You at index 0 (isYou=true), firstTurn normalized to 1', () => {
    tracker.newGame(setupGame({ settings: { firstTurn: 1 } }))
    const g = tracker.current.value
    expect(g.players[0].isYou).toBe(true)
    expect(g.players[0].name).toBe('Me')
    expect(g.players[1].isYou).toBe(false)
    expect(g.settings.firstTurn).toBe(1)
  })
  it('firstTurn:2 — Opponent at index 0 (isYou=false), You at index 1 (isYou=true), firstTurn normalized to 1', () => {
    tracker.newGame(setupGame({ settings: { firstTurn: 2 } }))
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
    tracker.newGame(setupGame()) // firstTurn:1 → players[0]=Me(isYou), players[1]=Opp
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
    tracker.updateSetup({ settings: { firstTurn: 1 } })
    const g = tracker.current.value
    expect(g.players[0].isYou).toBe(true)
    expect(g.players[0].name).toBe('Me')
  })
})

describe('twists at game creation', () => {
  it('Mirrored World with no chosen mission resolves a random shared one for both players', () => {
    tracker.newGame(setupGame({ settings: { twist: 'mirrored-world', twistMission: null } }))
    const g = tracker.current.value
    const mirrorSlugs = mod.MIRROR_MISSIONS.map(m => m.slug)
    expect(mirrorSlugs).toContain(g.settings.twistMission)
    expect(g.players[0].primarySlug).toBe(g.settings.twistMission)
    expect(g.players[1].primarySlug).toBe(g.settings.twistMission)
  })
  it('Scrambled Communications swaps the two primaries', () => {
    const plain = setupGame()
    tracker.newGame(plain)
    const normal0 = tracker.current.value.players[0].primarySlug
    const normal1 = tracker.current.value.players[1].primarySlug

    tracker.newGame(setupGame({ settings: { twist: 'scrambled-communications' } }))
    expect(tracker.current.value.players[0].primarySlug).toBe(normal1)
    expect(tracker.current.value.players[1].primarySlug).toBe(normal0)
  })
})

describe('scoring mutations', () => {
  it('setRoundPrimary and setCp update the game and totals', () => {
    tracker.newGame(setupGame())
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
    tracker.finishGame()
    expect(tracker.current.value.endReason).toBe(null)
  })
})

describe('history: archive & resume', () => {
  it('archiveGame moves the current game into history', () => {
    tracker.newGame(setupGame())
    tracker.finishGame('played')
    const id = tracker.current.value.id
    tracker.archiveGame()
    expect(tracker.current.value).toBe(null)
    expect(tracker.history.value[0].id).toBe(id)
  })
  it('resumeFromHistory pulls a finished game back into active play', () => {
    tracker.newGame(setupGame())
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
})

describe('redrawSecondary (WHEN DRAWN actions)', () => {
  it("'shuffle' returns the card to the deck and draws a replacement", () => {
    tracker.newGame(setupGame())
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
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, 'behind-enemy-lines')
    tracker.scoreSecondaryRow(0, 'behind-enemy-lines', 0, 0, 1)
    expect(s.scored.some(e => e.slug === 'behind-enemy-lines')).toBe(true)

    tracker.redrawSecondary(0, 'behind-enemy-lines', 'shuffle')
    expect(s.scored.some(e => e.slug === 'behind-enemy-lines')).toBe(false)
  })

  it('is a no-op when the card is not in hand', () => {
    tracker.newGame(setupGame())
    const s = tracker.current.value.players[0].secondary
    const before = [...s.hand]
    tracker.redrawSecondary(0, 'behind-enemy-lines', 'shuffle')
    expect(s.hand).toEqual(before)
  })
})

describe('set aside & restore secondaries', () => {
  it('discardFromHand sets the card aside, keeping any scored VP', () => {
    tracker.newGame(setupGame())
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
    expect(tracker.current.value.currentTurn).toBe(0)
    expect(tracker.current.value.currentPhase).toBe('command')
  })

  it('steps through five phases, then hands the turn over', () => {
    tracker.newGame(setupGame())
    for (let i = 0; i < 4; i++) tracker.stepPhase(1)
    expect(tracker.current.value.currentPhase).toBe('fight')
    expect(tracker.current.value.currentTurn).toBe(0)
    tracker.stepPhase(1)
    expect(tracker.current.value.currentTurn).toBe(1)
    expect(tracker.current.value.currentPhase).toBe('command')
  })

  it('rolls into the next battle round after the second player\'s Fight phase', () => {
    tracker.newGame(setupGame())
    for (let i = 0; i < 10; i++) tracker.stepPhase(1)
    const g = tracker.current.value
    expect(g.currentRound).toBe(2)
    expect(g.currentTurn).toBe(0)
    expect(g.currentPhase).toBe('command')
  })

  it('steps back across the round boundary onto the second player\'s Fight phase', () => {
    tracker.newGame(setupGame())
    tracker.goToRound(3)
    tracker.stepPhase(-1)
    const g = tracker.current.value
    expect(g.currentRound).toBe(2)
    expect(g.currentTurn).toBe(1)
    expect(g.currentPhase).toBe('fight')
  })

  it('never steps off either end of the battle', () => {
    tracker.newGame(setupGame())
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
    tracker.goToPhase(1, 'charge')
    tracker.goToRound(4)
    expect(tracker.current.value.currentTurn).toBe(0)
    expect(tracker.current.value.currentPhase).toBe('command')
  })

  it('goToPhase ignores a phase that is not one', () => {
    tracker.newGame(setupGame())
    tracker.goToPhase(1, 'psychic')
    expect(tracker.current.value.currentPhase).toBe('command')
    expect(tracker.current.value.currentTurn).toBe(0)
  })

  it('a game saved before the clock existed reads as the opening phase and steps from there', () => {
    tracker.newGame(setupGame())
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
    tracker.setUnitCondition(0, 'u1', 'unit-charged', 205, true)
    expect(tracker.current.value.players[0].ctx.units.u1['unit-charged']).toBe(205)
    tracker.setUnitCondition(0, 'u1', 'unit-charged', 205, false)
    expect(tracker.current.value.players[0].ctx.units).toEqual({})
  })

  // "A unit can only be affected by one Order at a time (any Order subsequently issued to that
  // unit replaces the current one)" — the rule replaces, so the store does too.
  it('an alternative replaces its sibling instead of stacking with it', () => {
    tracker.newGame(setupGame())
    tracker.setUnitCondition(0, 'u1', 'order-take-aim', 101, true)
    tracker.setUnitCondition(0, 'u1', 'order-fix-bayonets', 102, true)
    expect(tracker.current.value.players[0].ctx.units.u1).toEqual({ 'order-fix-bayonets': 102 })
  })

  // Creations of Bile: "either select one from the list below, or randomly determine two". Two fit
  // in the group; a third one pushes out the one that has been on longest.
  it('lets a capped group hold its whole allowance, then evicts the oldest', () => {
    tracker.newGame(setupGame())
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
    tracker.setArmyCondition(0, 'augment-paraneural-reactions', 101, true)
    tracker.setArmyCondition(0, 'augment-supracutaneous-chitination', 101, true)
    tracker.setArmyCondition(0, 'augment-ophthalmic-enhancement', 101, true)
    expect(Object.keys(tracker.current.value.players[0].ctx.army).sort())
      .toEqual(['augment-ophthalmic-enhancement', 'augment-supracutaneous-chitination'])
  })

  it('leaves ungrouped switches alone — some rules really do allow several', () => {
    tracker.newGame(setupGame())
    tracker.setArmyCondition(0, 'blessing-martial-excellence', 101, true)
    tracker.setArmyCondition(0, 'blessing-warp-blades', 101, true)
    expect(Object.keys(tracker.current.value.players[0].ctx.army).sort())
      .toEqual(['blessing-martial-excellence', 'blessing-warp-blades'])
  })

  // A stratagem is spent, not switched: several can be up on one unit at once, and each is keyed by
  // the record it came from rather than by a condition id.
  it('records a stratagem spent on a unit, and forgets it when taken back', () => {
    tracker.newGame(setupGame())
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
    tracker.setUnitAura(0, 'u1', 'fiery-heart', 205, true)
    expect(tracker.current.value.players[0].ctx.auras.u1).toEqual({ 'fiery-heart': 205 })
    tracker.setUnitAura(0, 'u1', 'fiery-heart', 205, false)
    expect(tracker.current.value.players[0].ctx.auras).toEqual({})
  })

  it('keeps the two players\' contexts apart', () => {
    tracker.newGame(setupGame())
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
    const side = tracker.current.value.players[0]
    expect(mod.membersOf(side)).toEqual([side])
    expect(mod.memberAt(side, null)).toBe(side)
    expect(mod.memberAt(side, 1)).toBe(side) // out-of-range falls back to the side
  })

  it('newGame builds team sides: name = teamName, members populated, side army fields empty', () => {
    tracker.newGame(setupDoubles())
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
    // Scoring state stays side-level.
    expect(side.cp).toBe(0)
    expect(side.rounds).toHaveLength(mod.ROUND_COUNT)
    expect(side.primarySlug).toBeTruthy()
  })

  it('forceType: derived from the members, overridable via the setup payload', () => {
    tracker.newGame(setupDoubles())
    expect(tracker.current.value.players[0].forceType).toBe('convenience') // orks + aeldari
    expect(tracker.current.value.players[1].forceType).toBe('unified')     // drukhari ×2
    const s = setupDoubles()
    s.players[1].forceType = 'convenience'
    tracker.newGame(s)
    expect(tracker.current.value.players[1].forceType).toBe('convenience')
  })

  it('army mutators without mi hit the side (unified shared pool), with mi hit that member', () => {
    tracker.newGame(setupDoubles())
    tracker.setArmyCounter(0, 3)          // side-level: the unified force's shared pool
    tracker.setArmyCounter(0, 5, 1)       // member 1's own pool
    const side = tracker.current.value.players[0]
    expect(side.army.counter).toBe(3)
    expect(side.members[1].army.counter).toBe(5)
    expect(side.members[0].army).toEqual({})
  })

  it('ctx mutators with mi keep member contexts apart', () => {
    tracker.newGame(setupDoubles())
    tracker.setUnitCondition(0, 'u1', 'charged', 101, true, 0)
    const side = tracker.current.value.players[0]
    expect(side.members[0].ctx.units.u1).toEqual({ charged: 101 })
    expect(side.members[1].ctx).toBeUndefined()
    expect(side.ctx).toBeUndefined()
  })

  it('updateSetup patches teamName (mirrored into name) and member fields', () => {
    tracker.newGame(setupDoubles())
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
