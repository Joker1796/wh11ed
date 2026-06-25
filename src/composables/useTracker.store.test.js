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
