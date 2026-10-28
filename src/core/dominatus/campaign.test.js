import { describe, it, expect } from 'vitest'
import { campaignState, drawPile, drawFor, standings, PATH_TO_CONQUEST } from './campaign.js'
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
    const ok = campaignState([...evs, O('claim', { reward: r.id, drawn, kept: drawn[0] })], deck)
    expect(ok.players[0].upgrades).toEqual([drawn[0]])
    const notDrawn = campaignState([...evs, O('claim', { reward: r.id, drawn, kept: pile[4] })], deck)
    expect(notDrawn.rejected[0].reason).toBe('kept card was not drawn')
    const stranger = campaignState([...evs, ev('m2', 'claim', { reward: r.id, drawn, kept: drawn[0] })], deck)
    expect(stranger.rejected[0].reason).toBe('not your reward')
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
