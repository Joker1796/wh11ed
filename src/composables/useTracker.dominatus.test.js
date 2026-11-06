// A Dominatus battle in the tracker: each player's Primary is the Agenda their Alliance's
// Briefing gives them for the two Force Dispositions, a player who declines Agendas scores the
// mission deck's card instead, and the battle keeps what the campaign needs from it (Agenda
// Achieved cards, the Upgrades given out).
import { beforeEach, describe, it, expect, vi } from 'vitest'
import { battleEvent } from '../core/dominatus/campaign.js'

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
  it('scores each partner separately, caps each at 45 and adds their Primary to the team', async () => {
    const g = domGame()
    g.settings.gameType = 'doubles'
    g.players.forEach((p, i) => {
      p.teamName = `Team ${i}`
      p.members = [0, 1].map((mi) => ({ name: `${i}-${mi}`, alliance: p.alliance }))
    })
    tracker.newGame(g)
    const game = tracker.current.value
    const [side] = game.players
    tracker.setPrimaryRow(0, 1, 0, 0, 1, null, 0)
    expect(tracker.primaryRowCount(0, 1, 0, 0, 0)).toBe(1)
    expect(tracker.primaryRowCount(0, 1, 0, 0, 1)).toBe(0)
    expect(side.members[0].rounds[1].primary).toBe(5)
    expect(side.members[1].rounds[1].primary).toBe(0)
    tracker.setPrimaryRow(0, 1, 0, 0, 1, null, 1)
    expect(side.rounds[1].primary).toBe(10)
    const { buildGameLog } = await import('../core/game/gameLog.js')
    expect(buildGameLog(game).filter((e) => e.type === 'primary').map((e) => e.mi).sort()).toEqual([0, 1])
    for (let round = 0; round < 4; round++) {
      tracker.setRoundPrimary(0, round, 50, null, 0)
      tracker.setRoundPrimary(0, round, 50, null, 1)
    }
    expect(side.rounds[0].primary).toBe(30)
    expect(side.members[0].rounds[0].primary).toBe(15)
    expect(tracker.primaryTotal(0)).toBe(90)
    expect(tracker.grandTotal(0)).toBe(90)
    // The aggregate is not a third editable mission.
    tracker.setRoundPrimary(0, 0, 1)
    expect(side.rounds[0].primary).toBe(30)
    const { sliceGame, assembleGame } = await import('./gameSlices.js')
    const restored = assembleGame(sliceGame(game))
    const { primaryTotal, roundBreakdown } = await import('../core/game/gameScoring.js')
    expect(primaryTotal(restored, 0)).toBe(90)
    expect(roundBreakdown(restored, 0)[0].primary).toBe(30)
  })

  it('reminds each partner of their own Primary at the end of the turn', async () => {
    const g = domGame()
    g.settings.gameType = 'doubles'
    g.players.forEach((p, i) => {
      p.teamName = `Team ${i}`
      p.members = [0, 1].map((mi) => ({ name: `${i}-${mi}`, alliance: p.alliance }))
    })
    tracker.newGame(g)
    const game = tracker.current.value
    game.phase = 'playing'; game.currentRound = 2; game.currentTurn = 0
    const { turnEndChecks, cardMoments } = await import('../core/game/missionTiming.js')
    const args = [(slug, role, r) => mod.scorableBlocks(slug, role, r), (slug, role) => mod.missionBySlug(slug, role)]
    const checks = turnEndChecks(game, ...args).filter((c) => c.pi === 0 && c.slug === null)
    expect(checks.map((c) => c.mi)).toEqual([0, 1])
    const moments = cardMoments(game, 0, ...args, (slug) => mod.missionBySlug(slug).name)
    expect([...new Set(moments.filter((c) => c.slug === null).map((c) => c.mi))]).toEqual([0, 1])
  })

  it('keeps all four identities and their own Agenda Achieved after a first-turn swap', () => {
    const g = domGame()
    g.settings.gameType = 'doubles'
    g.settings.firstTurn = 2
    g.settings.dominatus.campaign = 'C'
    g.players.forEach((p, i) => {
      p.teamName = `Team ${i}`
      p.members = [0, 1].map((mi) => ({ name: `${i}-${mi}`, alliance: mi ? 'raiders' : p.alliance, campaignPlayer: `${i}-${mi}` }))
    })
    tracker.newGame(g)
    const ps = tracker.current.value.players
    expect(ps[0].members.map((m) => m.campaignPlayer)).toEqual(['1-0', '1-1'])
    expect(ps[1].members.map((m) => m.campaignPlayer)).toEqual(['0-0', '0-1'])
    expect(ps[1].members[0].primarySlug).toBe('dom-vital-strongpoint')
    expect(ps[1].members[1].primarySlug).not.toBe(ps[1].members[0].primarySlug)
    tracker.setAgendaAchieved(1, 2, 1)
    expect(ps[1].members.map((m) => m.agendaAchieved)).toEqual([0, 1])
    const { a, a2, b, b2, achieved } = battleEvent(tracker.current.value, ps[0].members[0].campaignPlayer, ps[1].members[0].campaignPlayer, 0, ps[0].members[1].campaignPlayer, ps[1].members[1].campaignPlayer)
    expect([a, a2, b, b2]).toEqual(['1-0', '1-1', '0-0', '0-1'])
    expect(achieved).toEqual({ a: 0, a2: 0, b: 0, b2: 1 })
  })

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

  it('starts with the Upgrades the setup brings in — the cards a list carries pinned', () => {
    const g = domGame()
    g.players[0].upgrades = [{ slug: 'kingslayer', uid: 'u7', unit: '' }, { slug: '' }]
    tracker.newGame(g)
    expect(tracker.current.value.players.find((p) => p.name === 'Me').upgrades).toEqual([{ slug: 'kingslayer', uid: 'u7', unit: '' }])
    expect(tracker.current.value.players.find((p) => p.name === 'Opp').upgrades).toEqual([])
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

// High Strategy (owner, 2026-11-03, stage 3c): "You start the battle with 1CP", 2CP when given to the
// WARLORD — one 'start' entry, written when the battle begins, not the round's bonus point.
describe('Dominatus — CP an Upgrade starts the battle with', () => {
  const list = { id: 'r1', name: 'L', faction: 'space-marines', detachments: [], battleSize: 'strike-force', units: [{ uid: 'cap', id: 'captain', warlord: true }, { uid: 'lt', id: 'lieutenant' }] }
  function begun(uid) {
    const g = domGame()
    g.players[0].roster = list
    tracker.newGame(g)
    tracker.setUpgrades(0, [{ slug: 'high-strategy', unit: 'x', uid, mi: 0 }])
    const before = tracker.current.value.players[0].cp
    tracker.beginGame()
    const me = tracker.current.value.players[0]
    return { me, before }
  }
  it('gives 2CP on the Warlord and 1CP on another character, as one entry', () => {
    const w = begun('cap')
    expect(w.me.cpLog.filter((e) => e.kind === 'start')).toEqual([expect.objectContaining({ amount: 2, round: 1, turn: 0, ref: 'high-strategy' })])
    expect(w.me.cp - w.before).toBe(2 + 1) // the start, and the first Command phase's Core CP
    const l = begun('lt')
    expect(l.me.cpLog.find((e) => e.kind === 'start').amount).toBe(1)
    expect(tracker.current.value.players[1].cpLog.some((e) => e.kind === 'start')).toBe(false)
  })
  it('is not the round\'s bonus point', () => {
    const { me } = begun('cap')
    expect(tracker.canGainBonus(0)).toBe(true)
    expect(me.cpLog.some((e) => e.kind === 'bonus')).toBe(false)
  })
})
