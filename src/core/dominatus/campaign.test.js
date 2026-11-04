import { describe, it, expect } from 'vitest'
import { campaignState, battleEvent, UPGRADES_PER_SIDE, drawPile, drawFor, standings, recordOf, battleAmend, battleLocked, reopenable, reopenPhase, removable, removePlayer, playedIn, scheduleProgress, pairingsNow, likelyDuplicates, nextSteps, PATH_TO_CONQUEST } from './campaign.js'
import { getDominatus } from '../../data/dominatus.js'

const deck = getDominatus('en')
let seq = 0
const ev = (author, type, payload) => ({ seq: ++seq, author, type, payload })
const O = (type, payload) => ev('owner', type, payload)

// Two Liberators (Ann, Ben — Ben a member, m1) against two Oppressors (Cid, Dee — Dee member m2).
function base() {
  seq = 0
  return [
    O('created', { name: 'Armageddon', draw: 'app' }),
    O('player', { id: 'ann', name: 'Ann', alliance: 'liberators' }),
    ev('m1', 'player', { id: 'ben', name: 'Ben', alliance: 'liberators' }),
    O('player', { id: 'cid', name: 'Cid', alliance: 'oppressors' }),
    ev('m2', 'player', { id: 'dee', name: 'Dee', alliance: 'oppressors' }),
    O('location', { phase: 1, slug: 'the-mannheim-gap' }),
  ]
}
const battle = (author, id, a, b, victor, achieved = { a: 0, b: 0 }) => ev(author, 'battle', { id, a, b, victor, achieved })

describe('Dominatus campaign — players and rights', () => {
  it('lets a member register one player and edit only that one', () => {
    const s = campaignState([...base(), ev('m1', 'player', { id: 'ben2', name: 'Again' }), ev('m1', 'player', { id: 'cid', name: 'Hijack' })], deck)
    expect(s.players.map((p) => p.name)).toEqual(['Ann', 'Ben', 'Cid', 'Dee'])
    expect(s.rejected.map((r) => r.reason)).toEqual(['not your player', 'not your player'])
  })

  it('takes a member\'s battle only if they fought it, and holds it for the Warmaster', () => {
    const s = campaignState([...base(), battle('m1', 'x', 'ann', 'cid', 'a'), battle('m1', 'b1', 'ben', 'cid', 'a')], deck)
    expect(s.rejected[0].reason).toBe('not your battle')
    expect(s.battles).toHaveLength(1)
    expect(s.battles[0].status).toBe('pending')
    expect(s.pending).toEqual([])
  })

  it('refuses a battle inside one Alliance', () => {
    const s = campaignState([...base(), battle('owner', 'b', 'ann', 'ben', 'a')], deck)
    expect(s.rejected[0].reason).toBe('players of one Alliance')
  })
})

describe('Dominatus campaign — a battle\'s rewards', () => {
  it('gives the victor a Battle Honour draw and the other side a Battle Skill draw, +1 for an Agenda Achieved card', () => {
    const s = campaignState([...base(), battle('m1', 'b1', 'ben', 'cid', 'a', { a: 1, b: 0 }), O('review', { battle: 'b1', ok: true })], deck)
    expect(s.pending.map((r) => [r.player, r.kind, r.draw])).toEqual([['ben', 'honour', 2], ['cid', 'skill', 1]])
    expect(s.players.find((p) => p.id === 'ben').agenda).toHaveLength(1)
  })

  it('gives both sides a Battle Skill on a draw', () => {
    const s = campaignState([...base(), battle('owner', 'b1', 'ann', 'cid', null)], deck)
    expect(s.pending.map((r) => r.kind)).toEqual(['skill', 'skill'])
  })

  it('keeps a player to three Agenda Achieved cards', () => {
    const evs = base()
    for (let i = 0; i < 5; i++) evs.push(battle('owner', `b${i}`, 'ann', 'cid', 'a', { a: 1, b: 0 }))
    const s = campaignState(evs, deck)
    expect(s.players[0].agenda).toHaveLength(3)
  })

  it('checks a kept card against the draw and the hand', () => {
    const evs = [...base(), battle('owner', 'b1', 'ann', 'cid', 'a')]
    const s0 = campaignState(evs, deck)
    const r = s0.pending[0]
    const pile = drawPile(deck, s0.players[0], r)
    expect(pile).toHaveLength(5) // the five Phase 1 Battle Honours
    const drawn = drawFor(deck, s0.players[0], r, () => 0)
    const evsDrawn = [...evs, O('draw', { reward: r.id, cards: drawn })]
    expect(campaignState(evsDrawn, deck).pending[0].drawn).toEqual(drawn)
    const ok = campaignState([...evsDrawn, O('claim', { reward: r.id, kept: drawn[0] })], deck)
    expect(ok.players[0].upgrades).toEqual([drawn[0]])
    const notDrawn = campaignState([...evsDrawn, O('claim', { reward: r.id, kept: pile[4] })], deck)
    expect(notDrawn.rejected[0].reason).toBe('kept card was not drawn')
    const undrawn = campaignState([...evs, O('claim', { reward: r.id, kept: drawn[0] })], deck)
    expect(undrawn.rejected[0].reason).toBe('kept card was not drawn')
    const stranger = campaignState([...evsDrawn, ev('m2', 'claim', { reward: r.id, kept: drawn[0] })], deck)
    expect(stranger.rejected[0].reason).toBe('not your reward')
  })

  it('draws once per reward, as many cards as it draws, from the pile', () => {
    const evs = [...base(), battle('owner', 'b1', 'ann', 'cid', 'a')]
    const s0 = campaignState(evs, deck)
    const r = s0.pending[0]
    const pile = drawPile(deck, s0.players[0], r)
    const reasons = (extra) => campaignState([...evs, ...extra], deck).rejected.map((x) => x.reason)
    expect(reasons([O('draw', { reward: r.id, cards: [pile[0]] }), O('draw', { reward: r.id, cards: [pile[1]] })])).toEqual(['already drawn'])
    expect(reasons([O('draw', { reward: r.id, cards: [pile[0], pile[1]] })])).toEqual(['not a draw from the pile'])
    expect(reasons([O('draw', { reward: r.id, cards: ['agenda-nope'] })])).toEqual(['not a draw from the pile'])
    expect(reasons([ev('m2', 'draw', { reward: r.id, cards: [pile[0]] })])).toEqual(['not your reward'])
    expect(reasons([O('settings', { draw: 'manual' }), O('draw', { reward: r.id, cards: [pile[0]] })])).toEqual(['drawn at the table'])
  })

  it('takes a card kept by hand when the deck is drawn at the table', () => {
    const evs = [...base(), O('settings', { draw: 'manual' }), battle('owner', 'b1', 'ann', 'cid', 'a')]
    const r = campaignState(evs, deck).pending[0]
    const s = campaignState([...evs, O('claim', { reward: r.id, kept: 'kingslayer' })], deck)
    expect(s.players[0].upgrades).toEqual(['kingslayer'])
    expect(s.pending).toHaveLength(1)
  })
})

describe('Dominatus campaign — the end of a phase', () => {
  it('gives the Location to the Alliance with most Battle Honours, then ascendancy, Narrative Points and Relic draws', () => {
    const s = campaignState([
      ...base(),
      battle('owner', 'b1', 'ann', 'cid', 'a', { a: 1, b: 0 }),
      battle('owner', 'b2', 'ben', 'dee', 'a'),
      battle('owner', 'b3', 'ann', 'dee', 'b', { a: 0, b: 1 }),
      O('endPhase', { phase: 1 }),
    ], deck)
    expect(s.results[1]).toMatchObject({ control: 'liberators', tie: false, honours: { liberators: 2, oppressors: 1 } })
    expect(s.results[1].ascendancy.sort()).toEqual(['liberators', 'oppressors'])
    expect(s.results[1].np).toEqual({ liberators: 2, oppressors: 1 })
    expect(s.control['the-mannheim-gap']).toBe('liberators')
    expect(s.pending.filter((r) => r.kind === 'relic').map((r) => [r.player, r.draw])).toEqual([['ann', 1], ['dee', 1]])
    expect(s.phase).toBe(2)
    // Phase 1 cards are kept into phase 2 and discarded at its end.
    expect(s.players[0].agenda).toHaveLength(1)
  })

  it('breaks a tie on the campaign\'s Honours, and leaves the rest to the Warmaster', () => {
    const evs = [...base(), battle('owner', 'b1', 'ann', 'cid', 'a'), battle('owner', 'b2', 'ben', 'dee', 'b')]
    const open = campaignState([...evs, O('endPhase', { phase: 1 })], deck)
    expect(open.results[1]).toMatchObject({ control: null, tie: true })
    const ruled = campaignState([...evs, O('endPhase', { phase: 1, control: 'oppressors' })], deck)
    expect(ruled.results[1].control).toBe('oppressors')
  })

  it('draws one more Battle Skill for an Alliance holding the Mannheim Gap, and discards old Agenda Achieved cards', () => {
    const evs = [
      ...base(),
      battle('owner', 'b1', 'ann', 'cid', 'a', { a: 1, b: 0 }),
      O('endPhase', { phase: 1 }),
      O('location', { phase: 2, slug: 'cerbera-base' }),
      battle('owner', 'b2', 'ann', 'cid', 'b'),
    ]
    const s = campaignState(evs, deck)
    const skill = s.pending.find((r) => r.battle === 'b2' && r.player === 'ann')
    expect(skill).toMatchObject({ kind: 'skill', draw: 2 })
    const after = campaignState([...evs, O('endPhase', { phase: 2 })], deck)
    expect(after.players[0].agenda).toEqual([])
  })

  it('gives Path to Conquest to the phase 3 victor, and Titangrave an Agenda Achieved card to a player with 4 Battle Honours', () => {
    const honours = ['kingslayer', 'fire-and-fury', 'shadow-stalker', 'undying-duty']
    const s = campaignState([
      ...base(),
      O('endPhase', { phase: 1, control: 'liberators' }),
      O('location', { phase: 2, slug: 'cerbera-base' }),
      O('endPhase', { phase: 2, control: 'liberators' }),
      O('location', { phase: 3, slug: 'titangrave' }),
      O('adjust', { player: 'ann', upgrades: honours }),
      battle('owner', 'b9', 'ann', 'cid', 'a'),
      O('endPhase', { phase: 3 }),
    ], deck)
    expect(s.players[0].upgrades).toContain(PATH_TO_CONQUEST)
    expect(s.results[3].control).toBe('liberators')
    expect(s.players[0].agenda).toHaveLength(1)
    expect(s.results[3].np.liberators).toBe(3) // 2 for the Location + 1 ascendancy
    expect(s.finished).toBe(true)
  })

  it('swaps under Test of Mettle within one type only', () => {
    const evs = [
      ...base(),
      O('endPhase', { phase: 1, control: 'liberators' }),
      O('location', { phase: 2, slug: 'blackfire-death-pits' }),
      O('adjust', { player: 'ann', upgrades: ['kingslayer', 'born-survivor'] }),
      battle('owner', 'b1', 'ann', 'cid', 'a'),
      O('endPhase', { phase: 2 }),
    ]
    const r = campaignState(evs, deck).pending.find((x) => x.kind === 'mettle' && x.player === 'ann')
    const ok = campaignState([...evs, O('claim', { reward: r.id, swaps: [{ out: 'kingslayer', in: 'grim-veterans' }] })], deck)
    expect(ok.players[0].upgrades).toContain('grim-veterans')
    const bad = campaignState([...evs, O('claim', { reward: r.id, swaps: [{ out: 'kingslayer', in: 'born-survivor' }] })], deck)
    expect(bad.rejected[0].reason).toBe('not a swap of one type')
  })

  it('adds up the standings per Alliance', () => {
    const s = campaignState([...base(), battle('owner', 'b1', 'ann', 'cid', 'a', { a: 1, b: 0 })], deck)
    expect(standings(s)).toEqual([
      { alliance: 'liberators', honours: 1, totalHonours: 1, agendaAchieved: 1, np: 0, locations: [] },
      { alliance: 'oppressors', honours: 0, totalHonours: 0, agendaAchieved: 0, np: 0, locations: [] },
    ])
  })
})

describe('Dominatus campaign — a player\'s record', () => {
  it('counts the battles the Warmaster counted, each from the player\'s side', () => {
    const s = campaignState([
      ...base(),
      battle('owner', 'b1', 'ann', 'cid', 'a'),
      battle('owner', 'b2', 'cid', 'ann', 'a'),
      battle('owner', 'b3', 'ann', 'dee', null),
      battle('m1', 'b4', 'ben', 'cid', 'a'),
      battle('m2', 'b5', 'dee', 'ann', 'a'),
      O('review', { battle: 'b5', ok: false }),
    ], deck)
    expect(recordOf(s, 'ann')).toEqual({ won: 1, drawn: 1, lost: 1 })
    expect(recordOf(s, 'cid')).toEqual({ won: 1, drawn: 0, lost: 1 })
    expect(recordOf(s, 'ben')).toEqual({ won: 0, drawn: 0, lost: 0 })
    expect(recordOf(s, 'dee')).toEqual({ won: 0, drawn: 1, lost: 0 })
  })
})

describe('Dominatus campaign — the Warmaster\'s corrections', () => {
  const amend = (edits) => O('amend', { edits })
  const fold = (evs) => campaignState(evs, deck)

  it('takes an event out or gives it a new payload, read in its own place', () => {
    const evs = [...base(), battle('owner', 'b1', 'ann', 'cid', 'a')]
    const b1 = evs.at(-1).seq
    const gone = fold([...evs, amend([{ seq: b1, payload: null }])])
    expect(gone.battles).toEqual([])
    expect(gone.pending).toEqual([])
    const flipped = fold([...evs, amend([{ seq: b1, payload: { ...evs.at(-1).payload, victor: 'b' } }])])
    expect(flipped.battles[0].edited).toBe(true)
    expect(flipped.pending.map((r) => [r.player, r.kind])).toEqual([['ann', 'skill'], ['cid', 'honour']])
  })

  it('is the Warmaster\'s alone and never reaches an amend or the creation', () => {
    const evs = [...base(), battle('owner', 'b1', 'ann', 'cid', 'a')]
    const s = fold([...evs, ev('m1', 'amend', { edits: [{ seq: evs.at(-1).seq, payload: null }] })])
    expect(s.battles).toHaveLength(1)
    expect(s.rejected.map((r) => r.reason)).toEqual(['owner only'])
    const a1 = amend([{ seq: evs.at(-1).seq, payload: null }])
    const s2 = fold([...evs, a1, amend([{ seq: a1.seq, payload: null }, { seq: 1, payload: null }])])
    expect(s2.battles).toEqual([])
    expect(s2.name).toBe('Armageddon')
  })

  it('takes a battle out with its review and the cards drawn for it', () => {
    const evs = [...base(), battle('m1', 'b1', 'ben', 'cid', 'a'), O('review', { battle: 'b1', ok: true })]
    const r = fold(evs).pending[0]
    const card = drawPile(deck, fold(evs).players[1], r)[0]
    evs.push(O('draw', { reward: r.id, cards: [card] }), O('claim', { reward: r.id, kept: card }))
    expect(fold(evs).players[1].upgrades).toEqual([card])
    const edits = battleAmend(evs, 'b1', null)
    expect(edits.map((e) => evs.find((x) => x.seq === e.seq).type)).toEqual(['battle', 'review', 'draw', 'claim'])
    const s = fold([...evs, amend(edits)])
    expect(s.battles).toEqual([])
    expect(s.players[1].upgrades).toEqual([])
    expect(s.rejected).toEqual([])
  })

  it('corrects a result: a side whose reward changes draws again, the other keeps its card', () => {
    const evs = [...base(), battle('owner', 'b1', 'ann', 'cid', 'a')]
    for (const r of fold(evs).pending) {
      const pl = fold(evs).players.find((p) => p.id === r.player)
      const cards = drawFor(deck, pl, r, () => 0)
      evs.push(O('draw', { reward: r.id, cards }), O('claim', { reward: r.id, kept: cards[0] }))
    }
    const kept = fold(evs).players.find((p) => p.id === 'cid').upgrades
    // Ann won with no Agenda; now she won with one: one card more to draw, so she draws again.
    const more = battleAmend(evs, 'b1', { victor: 'a', achieved: { a: 1, b: 0 } })
    const s = fold([...evs, amend(more)])
    expect(s.rejected).toEqual([])
    expect(s.players.find((p) => p.id === 'ann').upgrades).toEqual([])
    expect(s.players.find((p) => p.id === 'ann').agenda).toHaveLength(1)
    expect(s.pending.map((r) => [r.player, r.kind, r.draw])).toEqual([['ann', 'honour', 2]])
    expect(s.players.find((p) => p.id === 'cid').upgrades).toEqual(kept)
    // Turned into a draw: both sides draw a Skill now; Cid's Skill stands, Ann's Honour goes.
    const draw = fold([...evs, amend(battleAmend(evs, 'b1', { victor: null, achieved: { a: 0, b: 0 } }))])
    expect(draw.rejected).toEqual([])
    expect(draw.pending.map((r) => [r.player, r.kind])).toEqual([['ann', 'skill']])
  })

  it('locks the battles of a closed phase', () => {
    const evs = [...base(), battle('owner', 'b1', 'ann', 'cid', 'a'), O('endPhase', { phase: 1 })]
    const s = fold(evs)
    expect(battleLocked(s, s.battles[0])).toBe('closed')
    expect(battleLocked(fold(evs.slice(0, -1)), s.battles[0])).toBe(null)
  })

  it('reopens the last phase ended, with the Location, Relics and refused battles that followed it', () => {
    const evs = [...base(), battle('owner', 'b1', 'ann', 'cid', 'a', { a: 1, b: 0 }), O('endPhase', { phase: 1 }), O('location', { phase: 2, slug: 'blackfire-death-pits' })]
    const s1 = fold(evs)
    const relic = s1.pending.find((r) => r.kind === 'relic')
    const cards = drawFor(deck, s1.players[0], relic, () => 0)
    evs.push(O('draw', { reward: relic.id, cards }), O('claim', { reward: relic.id, kept: cards[0] }))
    evs.push(battle('m2', 'b2', 'dee', 'ben', 'a'), O('review', { battle: 'b2', ok: false }))
    const s = fold(evs)
    expect(reopenable(s)).toEqual({ phase: 1, blocked: false })
    const back = fold([...evs, amend(reopenPhase(evs, s))])
    expect(back.phase).toBe(1)
    expect(back.results).toEqual({})
    expect(back.locations[2]).toBe(null)
    expect(back.battles.map((b) => b.id)).toEqual(['b1'])
    expect(back.players[0].upgrades).not.toContain(cards[0])
    expect(back.rejected).toEqual([])
  })

  it('will not reopen a phase under a battle of the next one, nor before any phase ended', () => {
    const evs = [...base(), O('endPhase', { phase: 1 }), O('location', { phase: 2, slug: 'blackfire-death-pits' }), battle('owner', 'b1', 'ann', 'cid', 'a')]
    const s = fold(evs)
    expect(reopenable(s)).toEqual({ phase: 1, blocked: true })
    expect(reopenPhase(evs, s)).toEqual([])
    expect(reopenable(fold(base()))).toBe(null)
  })

  it('takes out a player who fought no battle, with their edits', () => {
    const evs = [...base(), O('player', { id: 'eve', name: 'Eve', alliance: 'raiders' }), O('player', { id: 'eve', faction: 'orks' }), O('adjust', { player: 'eve', agenda: 1 })]
    const s = fold(evs)
    expect(removable(s, 'eve')).toBe(true)
    expect(removePlayer(evs, 'eve')).toHaveLength(3)
    const gone = fold([...evs, amend(removePlayer(evs, 'eve'))])
    expect(gone.players.map((p) => p.id)).toEqual(['ann', 'ben', 'cid', 'dee'])
    expect(removable(fold([...evs, battle('owner', 'b1', 'eve', 'ann', 'a')]), 'eve')).toBe(false)
  })

  it('sets a player\'s Agenda Achieved cards by hand, the kept ones keeping their phase', () => {
    const evs = [...base(), battle('owner', 'b1', 'ann', 'cid', 'a', { a: 1, b: 0 }), O('endPhase', { phase: 1 }), O('adjust', { player: 'ann', agenda: 3 })]
    expect(fold(evs).players[0].agenda.map((c) => c.phase)).toEqual([1, 2, 2])
    expect(fold([...evs, O('adjust', { player: 'ann', agenda: 1 })]).players[0].agenda.map((c) => c.phase)).toEqual([1])
  })
})

describe('Dominatus campaign — the schedule, pairings and settings', () => {
  const fold = (evs) => campaignState(evs, deck)

  it('refuses a battle sent for a phase that has ended', () => {
    const evs = [...base(), O('endPhase', { phase: 1 }), O('location', { phase: 2, slug: 'blackfire-death-pits' })]
    const s = fold([...evs, ev('owner', 'battle', { id: 'g1', phase: 1, a: 'ann', b: 'cid', victor: 'a', achieved: { a: 0, b: 0 } })])
    expect(s.battles).toEqual([])
    expect(s.rejected.map((r) => r.reason)).toEqual(['not the current phase'])
  })

  it('counts a member\'s battle at once when the campaign says so', () => {
    const s = fold([...base(), O('settings', { approve: 'auto' }), battle('m1', 'b1', 'ben', 'cid', 'a')])
    expect(s.battles[0].status).toBe('approved')
    expect(s.pending).toHaveLength(2)
  })

  it('follows the Battle Schedule: played, due, and done once every player has played and all is counted', () => {
    const evs = [...base(), O('settings', { schedule: [1, 1, 1] }), battle('owner', 'b1', 'ann', 'cid', 'a')]
    expect(playedIn(fold(evs), 'ann')).toBe(1)
    expect(scheduleProgress(fold(evs)).done).toBe(false)
    evs.push(battle('m1', 'b2', 'ben', 'dee', 'a'))
    expect(scheduleProgress(fold(evs)).done).toBe(false) // waiting for the Warmaster
    evs.push(O('review', { battle: 'b2', ok: true }))
    expect(scheduleProgress(fold(evs))).toMatchObject({ due: 1, done: true })
  })

  it('keeps the Warmaster\'s pairings for the phase and marks those played', () => {
    const evs = [...base(), O('pairing', { id: 'x1', phase: 1, a: 'ann', b: 'cid' }), O('pairing', { id: 'x2', phase: 1, a: 'ben', b: 'dee' }), battle('owner', 'b1', 'cid', 'ann', 'b')]
    expect(pairingsNow(fold(evs)).map((x) => [x.id, x.played])).toEqual([['x1', true], ['x2', false]])
    const bad = fold([...base(), O('pairing', { id: 'x', phase: 1, a: 'ann', b: 'ben' }), ev('m1', 'pairing', { id: 'y', phase: 1, a: 'ben', b: 'cid' })])
    expect(bad.rejected.map((r) => r.reason)).toEqual(['players of one Alliance', 'owner only'])
  })

  it('flags a battle waiting beside another between the same two in the phase', () => {
    const s = fold([...base(), battle('m1', 'b1', 'ben', 'cid', 'a'), battle('m1', 'b2', 'cid', 'ben', 'b'), battle('m2', 'b3', 'dee', 'ann', 'a')])
    expect([...likelyDuplicates(s)].sort()).toEqual(['b1', 'b2'])
  })

  it('remembers the player the Warmaster plays as', () => {
    expect(fold([...base(), O('settings', { me: 'ann' })]).me).toBe('ann')
    expect(fold([...base(), O('settings', { me: 'ann' }), O('settings', { me: null })]).me).toBe(null)
  })
})

describe('Dominatus campaign — who may do what, and rosters', () => {
  it('closes joining by the link, keeping the players already in', () => {
    const s = campaignState([...base(), O('settings', { join: 'closed' }), ev('m3', 'player', { id: 'eve', name: 'Eve' }), ev('m1', 'player', { id: 'ben', name: 'Benedict' })], deck)
    expect(s.rejected.map((r) => r.reason)).toEqual(['registration closed'])
    expect(s.players.find((p) => p.id === 'ben').name).toBe('Benedict')
  })

  it('leaves the Alliance to the Warmaster when the campaign says so', () => {
    const s = campaignState([...base(), O('settings', { allianceBy: 'warmaster' }), ev('m1', 'player', { id: 'ben', alliance: 'raiders' }), ev('m1', 'player', { id: 'ben', alliance: 'liberators', name: 'B' }), O('player', { id: 'ben', alliance: 'raiders' })], deck)
    expect(s.rejected.map((r) => r.reason)).toEqual(['alliance by the warmaster'])
    expect(s.players.find((p) => p.id === 'ben').alliance).toBe('raiders')
  })

  it('keeps a member\'s faction from their first battle: another is an ask the Warmaster answers', () => {
    const evs = [...base(), ev('m1', 'player', { id: 'ben', faction: 'orks' }), battle('owner', 'b1', 'ben', 'cid', 'a'), ev('m1', 'player', { id: 'ben', faction: 'necrons' })]
    const ben = (x) => campaignState(x, deck).players.find((p) => p.id === 'ben')
    const s = campaignState(evs, deck)
    expect(s.rejected).toEqual([])
    expect(ben(evs)).toMatchObject({ faction: 'orks', factionAsk: 'necrons' })
    const steps = (who, owner) => nextSteps(s, who, owner).map((x) => `${x.kind}:${x.player}:${x.faction}`)
    expect(steps(null, true)).toContain('factionAsk:ben:necrons')
    expect(steps(ben(evs), false)).toContain('factionAskWait:ben:necrons')
    // The Warmaster accepts (sets it) or turns it down; the player takes it back by asking for theirs.
    expect(ben([...evs, O('player', { id: 'ben', faction: 'necrons' })])).toMatchObject({ faction: 'necrons', factionAsk: null })
    expect(ben([...evs, O('player', { id: 'ben', factionAsk: null })])).toMatchObject({ faction: 'orks', factionAsk: null })
    expect(ben([...evs, ev('m1', 'player', { id: 'ben', faction: 'orks' })])).toMatchObject({ faction: 'orks', factionAsk: null })
    // No faction at all is still refused once kept.
    expect(campaignState([...evs.slice(0, -1), ev('m1', 'player', { id: 'ben', faction: null })], deck).rejected.map((r) => r.reason)).toEqual(['faction locked'])
    const free = campaignState([...evs.slice(0, 1), O('settings', { factionLock: false }), ...evs.slice(1)], deck)
    expect(free.players.find((p) => p.id === 'ben').faction).toBe('necrons')
  })

  it('takes a member\'s battle and rewards only when they are not the Warmaster\'s alone', () => {
    const s = campaignState([...base(), O('settings', { battlesBy: 'warmaster', rewardsBy: 'warmaster' }), battle('m1', 'b1', 'ben', 'cid', 'a'), battle('owner', 'b2', 'ben', 'cid', 'a'), ev('m1', 'claim', { reward: 'b2:a', kept: 'x' })], deck)
    expect(s.rejected.map((r) => r.reason)).toEqual(['battles by the warmaster', 'rewards by the warmaster'])
  })

  it('keeps a roster snapshot per player, refuses one when rosters are off, and asks for both under "required"', () => {
    const code = '1.abc'
    const off = campaignState([...base(), ev('m1', 'roster', { player: 'ben', code, name: 'Speed', points: 1995 })], deck)
    expect(off.rejected.map((r) => r.reason)).toEqual(['rosters off'])
    const s = campaignState([...base(), O('settings', { roster: 'required' }), ev('m1', 'roster', { player: 'ben', code, name: 'Speed', points: 1995 }), ev('m1', 'roster', { player: 'cid', code }), battle('m1', 'b1', 'ben', 'cid', 'a')], deck)
    expect(s.players.find((p) => p.id === 'ben').roster).toMatchObject({ code, name: 'Speed', points: 1995 })
    expect(s.rejected.map((r) => r.reason)).toEqual(['not your player', 'no roster'])
  })
})

describe('Dominatus campaign — what waits for the reader', () => {
  const kinds = (steps) => steps.map((x) => `${x.kind}${x.player ? `:${x.player}` : ''}${x.n ? `:${x.n}` : ''}`)
  const me = (s, id) => s.players.find((p) => p.id === id)

  it('tells a member their reward (and whose battle it was), the battle that waits, and the pairing left', () => {
    const s = campaignState([
      ...base(),
      O('pairing', { id: 'x1', phase: 1, a: 'ben', b: 'cid' }),
      O('pairing', { id: 'x2', phase: 1, a: 'ben', b: 'dee' }),
      battle('owner', 'b1', 'ben', 'cid', 'a'),
    ], deck)
    expect(kinds(nextSteps(s, me(s, 'ben'), false))).toEqual(['reward:cid', 'play:dee'])
    const s2 = campaignState([...base(), battle('m1', 'b2', 'ben', 'dee', 'b')], deck)
    expect(kinds(nextSteps(s2, me(s2, 'ben'), false))).toEqual(['playMore:1', 'waitCount:dee'])
  })

  it('says a member with their battles played is waiting for the end of the phase, and one not yet registered to sign up', () => {
    const s = campaignState([...base(), battle('m1', 'b1', 'ben', 'cid', null), battle('m1', 'b2', 'ben', 'dee', null), O('review', { battle: 'b1', ok: true }), O('review', { battle: 'b2', ok: true })], deck)
    expect(kinds(nextSteps(s, me(s, 'ben'), false)).filter((k) => !k.startsWith('reward'))).toEqual(['phaseDone'])
    expect(kinds(nextSteps(s, null, false))).toEqual(['register'])
  })

  it('waits for the Location before a member can play, and gives the Warmaster theirs to choose', () => {
    seq = 0
    const s = campaignState([O('created', { name: 'X' }), O('player', { id: 'ann', name: 'Ann', alliance: 'liberators' }), ev('m1', 'player', { id: 'ben', name: 'Ben', alliance: 'oppressors' })], deck)
    expect(kinds(nextSteps(s, me(s, 'ben'), false))).toEqual(['waitLocation'])
    expect(kinds(nextSteps(s, null, true))).toEqual(['location'])
  })

  it('asks the Warmaster to count, to hand out rewards when the campaign leaves them to them, and to end a played phase', () => {
    const s = campaignState([...base(), O('settings', { rewardsBy: 'warmaster' }), battle('m1', 'b1', 'ben', 'cid', 'a')], deck)
    expect(kinds(nextSteps(s, null, true))).toEqual(['count:1'])
    expect(kinds(nextSteps(s, me(s, 'ben'), false))).toEqual(['playMore:1', 'waitCount:cid'])
    const done = campaignState([...base(), O('settings', { rewardsBy: 'warmaster', schedule: [1, 1, 1] }), battle('owner', 'b1', 'ann', 'cid', 'a'), battle('owner', 'b2', 'ben', 'dee', 'a')], deck)
    expect(kinds(nextSteps(done, null, true))).toEqual([`give:${done.pending.length}`, 'endPhase'])
    expect(kinds(nextSteps(done, me(done, 'ben'), false))[0]).toBe('rewardWait:dee')
  })
})


describe('Dominatus campaign — the Upgrades a battle was played with', () => {
  const [c1, c2] = deck.upgrades.map((u) => u.slug)
  const game = {
    id: 'G1',
    settings: { dominatus: { phase: 1, campaign: 'C' } },
    players: [
      { agendaAchieved: 1, upgrades: [{ slug: c1, unit: 'Leman Russ', uid: 'u1' }] },
      { agendaAchieved: 0, upgrades: [{ slug: c2, unit: '' }] },
    ],
  }

  it('makes the battle event from the finished game, Upgrades by side', () => {
    expect(battleEvent(game, 'ann', 'cid', 1)).toEqual({
      id: 'g-G1', phase: 1, a: 'ann', b: 'cid', victor: 'b', achieved: { a: 1, b: 0 },
      upgrades: [{ side: 'a', slug: c1, unit: 'Leman Russ' }, { side: 'b', slug: c2, unit: '' }],
    })
    expect(battleEvent({ ...game, settings: {} }, 'ann', 'cid', null)).toMatchObject({ victor: null, a: 'ann' })
    expect(battleEvent({ ...game, settings: {} }, 'ann', 'cid', null)).not.toHaveProperty('phase')
  })

  it('keeps them on the battle, dropping what the deck does not know, never refusing the battle', () => {
    const ups = [
      { side: 'a', slug: c1, unit: '  Leman Russ  ' },
      { side: 'b', slug: 'no-such-card', unit: 'X' },
      { side: 'c', slug: c2, unit: 'X' },
      ...Array.from({ length: UPGRADES_PER_SIDE + 1 }, () => ({ side: 'b', slug: c2, unit: 'Y'.repeat(100) })),
    ]
    const s = campaignState([...base(), ev('owner', 'battle', { id: 'b1', a: 'ann', b: 'cid', victor: 'a', achieved: { a: 0, b: 0 }, upgrades: ups })], deck)
    expect(s.rejected).toEqual([])
    const kept = s.battles[0].upgrades
    expect(kept[0]).toEqual({ side: 'a', slug: c1, unit: 'Leman Russ' })
    expect(kept.filter((u) => u.side === 'b')).toHaveLength(UPGRADES_PER_SIDE)
    expect(kept[1].unit).toHaveLength(80)
    expect(kept).toHaveLength(1 + UPGRADES_PER_SIDE)
  })

  it('reads an older battle without them as none', () => {
    const s = campaignState([...base(), battle('owner', 'b1', 'ann', 'cid', 'a')], deck)
    expect(s.battles[0].upgrades).toEqual([])
  })

  it('a corrected result keeps them', () => {
    const evs = [...base(), ev('owner', 'battle', battleEvent(game, 'ann', 'cid', 0))]
    const [edit] = battleAmend(evs, 'g-G1', { victor: 'b', achieved: { a: 0, b: 0 } })
    expect(edit.payload.upgrades).toHaveLength(2)
  })
})
