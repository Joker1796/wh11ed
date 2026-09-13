import { beforeEach, describe, it, expect, vi } from 'vitest'

// Projection over REAL store-shaped games (built through newGame, like the store's own tests) —
// the point is that whatever makePlayer writes, only the whitelisted fields leave the phone.
let mod, payload, tracker, D0, D1

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  mod = await import('./useTracker.js')
  ;({ broadcastPayload: payload } = await import('./broadcastPayload.js'))
  tracker = mod.useTracker()
  D0 = mod.DISPOSITIONS[0].id
  D1 = mod.DISPOSITIONS[1].id
})

const baseSettings = {
  trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce',
  scoreMode: 'vp', twist: null, twistMission: null,
}
function singles() {
  tracker.newGame({
    settings: { ...baseSettings },
    players: [
      { name: 'Me', factionSlug: 'orks', detachments: ['War Horde'], disposition: D0, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: true },
      { name: 'Opp', factionSlug: null, detachments: [], disposition: D1, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  })
  return tracker.current.value
}
function doubles() {
  tracker.newGame({
    settings: { ...baseSettings, gameType: 'doubles' },
    players: [
      { teamName: 'Alpha', disposition: D0, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: true,
        members: [{ name: 'Ann', factionSlug: 'orks', detachments: ['War Horde'] }, { name: 'Bob', factionSlug: 'aeldari', detachments: [] }] },
      { teamName: 'Beta', disposition: D1, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false,
        members: [{ name: 'Cat', factionSlug: 'drukhari', detachments: [] }, { name: 'Dan', factionSlug: 'drukhari', detachments: [] }] },
    ],
  })
  return tracker.current.value
}

describe('broadcastPayload', () => {
  it('projects a singles game: two sides of one player each, names baked in', () => {
    const p = payload(singles())
    expect(p.v).toBe(1)
    expect(p.gameType).toBe('singles')
    expect(p.round).toBe(1)
    expect(p.sides).toHaveLength(2)
    expect(p.sides[0].players).toHaveLength(1)
    expect(p.sides[0].players[0]).toMatchObject({ name: 'Me', faction: 'Orks' })
    expect(p.sides[0].teamName).toBe('Me')
    expect(p.sides[0].firstTurn).toBe(true)
    expect(p.sides[1].firstTurn).toBe(false)
    expect(p.sides[0].battleReady).toBe(true)
    expect(p.sides[0].primary.name).toBeTruthy()
    expect(p.sides[0].total).toBe(10) // battle ready alone
  })

  it('projects a doubles game: team names, both members, force type', () => {
    const p = payload(doubles())
    expect(p.gameType).toBe('doubles')
    expect(p.sides[0].teamName).toBe('Alpha')
    expect(p.sides[0].players.map((x) => x.name)).toEqual(['Ann', 'Bob'])
    expect(p.sides[0].players[1].faction).toBe('Aeldari')
    expect(p.sides[0].forceType).toBe('convenience')
    expect(p.sides[1].forceType).toBe('unified')
  })

  it('carries scored VP and the face-up secondary hand', () => {
    const g = singles()
    tracker.setRoundPrimary(0, 0, 8)
    tracker.setCp(0, 3)
    const slug = g.players[0].secondary.deck[0]
    tracker.drawSpecificSecondary(0, slug)
    const p = payload(g)
    expect(p.sides[0].primary.vp).toBe(8)
    expect(p.sides[0].cp).toBe(3)
    expect(p.sides[0].secondaries).toHaveLength(1)
    expect(p.sides[0].secondaries[0]).toMatchObject({ slug, active: true })
    expect(p.sides[0].secondaries[0].name).toBeTruthy()
    expect(p.sides[0].total).toBe(18) // 8 primary + 10 battle ready
  })

  it('never leaks the private parts of the game: rosters, uids, rule switches', () => {
    const g = singles()
    g.players[0].roster = { name: 'Secret list', units: [{ uid: 'u-secret', id: 'boyz', size: 0 }] }
    tracker.setUnitCondition(0, 'u-secret', 'charged', 101, true)
    const json = JSON.stringify(payload(g))
    expect(json).not.toContain('u-secret')
    expect(json).not.toContain('Secret list')
    expect(json).not.toContain('"ctx"')
    expect(json).not.toContain('"roster"')
  })

  it('omits the battle phase unless the game tracks the clock', () => {
    const g = singles()
    expect(payload(g).battlePhase).toBeNull()
    g.settings.trackPhases = true
    expect(payload(g).battlePhase).toBeTruthy()
  })
})
