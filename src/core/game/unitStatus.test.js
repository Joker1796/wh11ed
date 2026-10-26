import { describe, it, expect } from 'vitest'
import { unitStatusOf, statusRecord, reserveLimitOf, reservePoints, statusCounts, setupReserves, statusTargets } from './unitStatus.js'

describe('unitStatus', () => {
  // A game saved before statuses existed has no records — every unit reads as deployed.
  it('reads a unit with no record as on the battlefield', () => {
    expect(unitStatusOf({}, 'u1')).toBe('table')
    expect(unitStatusOf(null, 'u1')).toBe('table')
    expect(unitStatusOf({ unitStatus: { u1: { s: 'reserve' } } }, 'u1')).toBe('reserve')
  })

  it('keeps a table record only for a unit that arrived from reserves during the battle', () => {
    const reserve = statusRecord(null, 'reserve', { round: 0, turn: 0, name: 'Terminators' })
    expect(reserve).toMatchObject({ s: 'reserve', round: 0, name: 'Terminators' })
    // Taken back out of reserves at setup: simply deployed again.
    expect(statusRecord(reserve, 'table', { round: 0 })).toBeNull()
    // Arrived in round 2, second turn: the round stays for the log.
    expect(statusRecord(reserve, 'table', { round: 2, turn: 1 })).toMatchObject({ s: 'table', round: 2, turn: 1 })
    // Brought back from destroyed by mistake: deployed, nothing to remember.
    expect(statusRecord({ s: 'destroyed', round: 3 }, 'table', { round: 3 })).toBeNull()
    expect(statusRecord(null, 'destroyed', { round: 3, turn: 1 })).toMatchObject({ s: 'destroyed', round: 3, turn: 1 })
  })

  it('ignores a status it does not know', () => {
    const prev = { s: 'reserve', round: 0 }
    expect(statusRecord(prev, 'flying', { round: 1 })).toBe(prev)
  })

  // 20.01: the reserves together at most half the battle size's points limit.
  it('sums the reserves against half the battle size', () => {
    expect(reserveLimitOf(2000)).toBe(1000)
    expect(reserveLimitOf(1000)).toBe(500)
    const pl = { unitStatus: { a: { s: 'reserve' }, b: { s: 'destroyed' }, c: { s: 'reserve' } } }
    const entries = [{ uid: 'a', points: 240 }, { uid: 'b', points: 100 }, { uid: 'c', points: 85 }, { uid: 'd', points: 300 }]
    expect(reservePoints(pl, entries)).toBe(325)
    expect(statusCounts(pl, entries)).toEqual({ table: 1, reserve: 2, destroyed: 1 })
  })

  it('hands the game only the reserves, stamped before the battle', () => {
    const out = setupReserves({ a: { s: 'reserve', round: 2, turn: 1, name: 'A' }, b: { s: 'destroyed', round: 1 } })
    expect(Object.keys(out)).toEqual(['a'])
    expect(out.a).toMatchObject({ s: 'reserve', round: 0, turn: 0, name: 'A' })
    expect(setupReserves(undefined)).toEqual({})
  })
})

// An attached unit goes into reserves and comes out whole; its parts die one by one, and the
// fallen stay fallen when the rest moves (owner, 2026-10-08).
describe('statusTargets', () => {
  const sq = { uid: 'sq' }
  const cap = { uid: 'cap' }
  const anc = { uid: 'anc' }
  const parts = [sq, cap, anc]
  const player = { unitStatus: { anc: { s: 'destroyed' } } }
  const uids = (xs) => xs.map((x) => x.uid)

  it('destroys the tapped entry alone', () => {
    expect(uids(statusTargets(player, cap, parts, 'destroyed'))).toEqual(['cap'])
  })
  it('moves the living parts to or from reserves, the fallen left where they are', () => {
    expect(uids(statusTargets(player, cap, parts, 'reserve'))).toEqual(['sq', 'cap'])
    expect(uids(statusTargets(player, sq, parts, 'table'))).toEqual(['sq', 'cap'])
  })
  it('lets the tapped entry itself come back', () => {
    expect(uids(statusTargets(player, anc, parts, 'table'))).toEqual(['sq', 'cap', 'anc'])
  })
  it('answers for a unit standing alone', () => {
    expect(uids(statusTargets({}, sq, [], 'reserve'))).toEqual(['sq'])
  })
})
