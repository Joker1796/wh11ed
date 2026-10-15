// A Combat Patrol game in the tracker: each player scores their own box's mission (not the card
// of the two dispositions), a block scores only in the rounds the mission names, the maps are the
// Combat Patrol ones, and three core stratagems are off. Until 2026-10-15 the mode changed only
// the faction list and the stratagems — the game itself was a Chapter Approved one.
import { beforeEach, describe, it, expect, vi } from 'vitest'

let mod, tracker

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  mod = await import('./useTracker.js')
  tracker = mod.useTracker()
})

// Orks' 'Ardmob against Necrons' Amonhotekh's Guard; the detachment is the box's rule name, as
// GameSetup's applyCpBox writes it.
function cpGame() {
  const D = mod.DISPOSITIONS
  return {
    settings: { trackCP: true, firstTurn: 1, layout: 'B', combatPatrol: true, scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { name: 'Me', factionSlug: 'orks', detachments: ["'Ard As Nails"], disposition: D[0].id, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: true },
      { name: 'Opp', factionSlug: 'necrons', detachments: ['Territorial Imperatives'], disposition: D[1].id, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  }
}

describe('Combat Patrol game', () => {
  it("gives each player their own box's mission", () => {
    tracker.newGame(cpGame())
    const [me, opp] = tracker.current.value.players
    expect(me.primarySlug).toBe('cp-orks')
    expect(opp.primarySlug).toBe('cp-necrons')
    expect(mod.missionBySlug(me.primarySlug).name).toBe("Duff 'em Up!")
    expect(mod.missionBySlug(me.primarySlug, null, 'ru').nameRu).toBe('Навалять им!')
  })

  it('finds a second box of a faction by its detachment', async () => {
    const { cpMissionSlugFor } = await import('../data/combatPatrolMissions.js')
    const { combatPatrol } = await import('../data/combatPatrol.js')
    const talon = combatPatrol.en.factions.find((b) => b.id === 'adeptus-custodes-aquilan-talon')
    expect(cpMissionSlugFor({ factionSlug: 'adeptus-custodes', detachments: [talon.rule.name] })).toBe('cp-adeptus-custodes-aquilan-talon')
    expect(cpMissionSlugFor({ factionSlug: 'adeptus-custodes', detachments: [] })).toBe('cp-adeptus-custodes')
  })

  it('scores a block only in the rounds the mission names', () => {
    // Duff 'em Up!: "Any Battle Round" (1–5) and "Second Battle Round Onwards" (2–5).
    expect(mod.scorableBlocks('cp-orks', null, 1).map((b) => b.heading)).toEqual(['Any Battle Round'])
    expect(mod.scorableBlocks('cp-orks', null, 2)).toHaveLength(2)
    // Genestealer Cults: "Third Battle Round Onwards" and "End of the Battle" — nothing in round 2.
    expect(mod.scorableBlocks('cp-genestealer-cults', null, 2)).toEqual([])
    expect(mod.scorableBlocks('cp-genestealer-cults', null, 5)).toHaveLength(2)
  })

  it('adds up the rows and caps the round at 15', () => {
    tracker.newGame(cpGame())
    // Round 2: an enemy unit destroyed (5) + objectives (5) + their home objective (5) = 15.
    tracker.setPrimaryRow(0, 1, 0, 0, 1)
    tracker.setPrimaryRow(0, 1, 1, 0, 1)
    tracker.setPrimaryRow(0, 1, 1, 1, 1)
    expect(tracker.current.value.players[0].rounds[1].primary).toBe(15)
    expect(tracker.grandTotal(0)).toBe(25) // + 10 Battle Ready
  })

  it('plays the Combat Patrol maps, whatever the dispositions', async () => {
    const { resolveLayout } = await import('./trackerLayout.js')
    const l = resolveLayout({ combatPatrol: true, layout: 'B' }, 'take-and-hold', 'disruption')
    expect(l.image).toBe('/images/combat-patrol/layout-b.webp')
    // A custom layout left over from a Chapter Approved setup is not a Combat Patrol map.
    expect(resolveLayout({ combatPatrol: true, layout: 'custom', customLayout: { id: 'X' } }).id).toBe('A')
  })

  it('takes Crushing Impact, Explosives and Rapid Ingress off the core stratagems', async () => {
    const { loadCoreStratagems, CP_BANNED_CORE_STRATAGEMS } = await import('./gameStratagems.js')
    for (const loc of ['en', 'ru']) {
      const all = await loadCoreStratagems(loc)
      const cp = await loadCoreStratagems(loc, { combatPatrol: true })
      expect(all.length - cp.length, loc).toBe(CP_BANNED_CORE_STRATAGEMS.length)
    }
    const names = (await loadCoreStratagems('en')).map((s) => s.name)
    for (const n of CP_BANNED_CORE_STRATAGEMS) expect(names).toContain(n)
  })
})
