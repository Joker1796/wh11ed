import { beforeEach, describe, it, expect, vi } from 'vitest'

// A finished game is filed into the history as soon as its player leaves the game's screens.
let mod, tracker
beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  mod = await import('./fileFinishedGame.js')
  const t = await import('./useTracker.js')
  tracker = t.useTracker()
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { name: 'Me', factionSlug: null, detachments: [], disposition: t.DISPOSITIONS[0].id, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
      { name: 'Opp', factionSlug: null, detachments: [], disposition: t.DISPOSITIONS[1].id, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  })
})

describe('fileFinishedGame', () => {
  it('tells the game\'s own screens from the rest, in either locale', () => {
    expect(mod.onGameScreens('/tracker/game')).toBe(true)
    expect(mod.onGameScreens('/ru/tracker/game/roster/0')).toBe(true)
    expect(mod.onGameScreens('/tracker')).toBe(false)
    expect(mod.onGameScreens('/ru/rules')).toBe(false)
  })
  it('files a finished game, and leaves one in play alone', () => {
    mod.fileFinishedGame()
    expect(tracker.current.value?.phase).toBe('playing')
    tracker.finishGame('early')
    mod.fileFinishedGame()
    expect(tracker.current.value).toBeNull()
    expect(tracker.history.value).toHaveLength(1)
  })
})
