// A Dominatus battle in the tracker: each player's Primary is the Agenda their Alliance's
// Briefing gives them for the two Force Dispositions, a player who declines Agendas scores the
// mission deck's card instead, and the battle keeps what the campaign needs from it (Agenda
// Achieved cards, the Upgrades given out).
import { beforeEach, describe, it, expect, vi } from 'vitest'

let mod, tracker

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  mod = await import('./useTracker.js')
  // The deck comes on demand (dominatusMissions.js); a game is started with it in.
  await (await import('./dominatusMissions.js')).loadDominatusDeck()
  tracker = mod.useTracker()
})

function domGame({ phase = 1, decline = false } = {}) {
  return {
    settings: { trackCP: true, firstTurn: 1, layout: 'A', scoreMode: 'vp', twist: null, twistMission: null, dominatus: { phase, location: 'titangrave' } },
    players: [
      { name: 'Me', factionSlug: 'space-marines', detachments: [], disposition: 'take-and-hold', alliance: 'liberators', role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
      { name: 'Opp', factionSlug: 'orks', detachments: [], disposition: 'purge-the-foe', alliance: 'oppressors', declineAgenda: decline, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  }
}

describe('Dominatus battle', () => {
  it("gives each player their Briefing's Agenda as the Primary", () => {
    tracker.newGame(domGame())
    const [me, opp] = tracker.current.value.players
    // Liberators phase 1: Take and Hold vs Purge the Foe → Vital Strongpoint;
    // Oppressors phase 1: Purge the Foe vs Take and Hold → Repel the Foe.
    expect(me.primarySlug).toBe('dom-vital-strongpoint')
    expect(opp.primarySlug).toBe('dom-repel-the-foe')
    expect(mod.missionBySlug(me.primarySlug).name).toBe('Vital Strongpoint')
    expect(me.alliance).toBe('liberators')
    expect(me.agendaAchieved).toBe(0)
  })

  it('gives a player who declined the mission deck\'s Primary', () => {
    tracker.newGame(domGame({ decline: true }))
    const [me, opp] = tracker.current.value.players
    expect(me.primarySlug).toBe('dom-vital-strongpoint')
    expect(opp.primarySlug).toBe(mod.primaryFor('purge-the-foe', 'take-and-hold').slug)
  })

  it('reads every Agenda\'s scoring moments and caps the round at 15', async () => {
    const { getDominatus } = await import('../data/dominatus.js')
    for (const a of getDominatus('en').agendas) {
      for (let r = 1; r <= 5; r++) expect(() => mod.cardBlocks(`dom-${a.slug}`, null, r)).not.toThrow()
    }
    tracker.newGame(domGame())
    // Vital Strongpoint, round 2: took an objective (5) + their home objective (10) + 2 in their territory (10) → 15.
    tracker.setPrimaryRow(0, 1, 0, 0, 1)
    tracker.setPrimaryRow(0, 1, 0, 1, 1)
    tracker.setPrimaryRow(0, 1, 1, 0, 2)
    expect(tracker.current.value.players[0].rounds[1].primary).toBe(15)
  })

  it('keeps Agenda Achieved to what the card offers', () => {
    tracker.newGame(domGame())
    tracker.setAgendaAchieved(0, 2)
    expect(tracker.current.value.players[0].agendaAchieved).toBe(1) // a phase 1 card offers one
    tracker.newGame(domGame({ phase: 3 }))
    tracker.setAgendaAchieved(0, 5)
    expect(tracker.current.value.players[0].agendaAchieved).toBe(2)
  })

  it('records the Upgrades given out, up to four at Titangrave', async () => {
    const { upgradeLimit: domUpgradeLimit } = await import('../core/dominatus/upgrades.js')
    expect(domUpgradeLimit({ location: 'titangrave' })).toBe(4)
    expect(domUpgradeLimit({ location: 'cerbera-base' })).toBe(3)
    tracker.newGame(domGame())
    tracker.setUpgrades(0, [{ slug: 'kingslayer', unit: 'Captain' }, { slug: '' }])
    expect(tracker.current.value.players[0].upgrades).toEqual([{ slug: 'kingslayer', unit: 'Captain' }])
    tracker.setUpgrades(0, [{ slug: 'kingslayer', unit: 'Captain', uid: 'u7', mi: 0 }, { slug: 'fire-and-fury', unit: 'X', uid: 5 }])
    expect(tracker.current.value.players[0].upgrades).toEqual([{ slug: 'kingslayer', unit: 'Captain', uid: 'u7', mi: 0 }, { slug: 'fire-and-fury', unit: 'X' }])
  })
})

describe('Dominatus deck on demand', () => {
  it('names an Agenda from its slug until the deck is in, then reads the card', async () => {
    vi.resetModules()
    const m = await import('./dominatusMissions.js')
    const early = m.domMissionBySlug('dom-a-knife-in-the-dark')
    expect(early).toMatchObject({ name: 'A Knife in the Dark', blocks: [], pending: true })
    await m.loadDominatusDeck()
    expect(m.domMissionBySlug('dom-a-knife-in-the-dark').blocks.length).toBeGreaterThan(0)
  })
})
