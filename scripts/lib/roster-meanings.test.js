import { describe, it, expect } from 'vitest'
import { meaningsOf, matchMeanings } from './roster-meanings.mjs'
import { applyUnitMove } from '../../src/core/roster/rosterIndexMoves.js'

const names = { 1: 'Boltgun', 2: 'Plasma gun', 3: 'Melta gun', 4: 'Chainsword', 5: 'Power fist', 6: 'Astartes chainsword' }
const unit = (gear, sizes = [{ pts: 90, per: [5, 5], comp: [[0, 4], [1, 1]] }]) => ({
  units: [{ id: 'squad', minis: [{ n: 'Marine' }, { n: 'Sergeant' }], sizes, gear }],
})
const plasma = { m: 0, rep: [1], o: [[2], [3]] }
const fist = { m: 1, rep: [4], o: [[5]] }
const moves = (a, b, aliases) => matchMeanings(meaningsOf('sm', a, names, aliases), meaningsOf('sm', b, names))

describe('roster index meanings', () => {
  it('reports nothing when only new options are appended', () => {
    const r = moves(unit([plasma]), unit([{ ...plasma, o: [[2], [3], [4]] }]))
    expect(r).toEqual({ moves: {}, gone: [] })
  })

  it('follows swapped groups and reordered options by meaning', () => {
    const r = moves(unit([plasma, fist]), unit([fist, { ...plasma, o: [[3], [2]] }]))
    expect(r.moves['sm:squad'].wg).toEqual({ '0.0': '1.1', '0.1': '1.0', '1.0': '0.0' })
    expect(r.gone).toEqual([])
  })

  it('drops an option that no longer exists and says so', () => {
    const r = moves(unit([plasma]), unit([{ ...plasma, o: [[3]] }]))
    expect(r.moves['sm:squad'].wg).toEqual({ '0.0': 0, '0.1': '0.0' })
    expect(r.gone).toHaveLength(1)
  })

  it('never guesses between two places the same option now sits', () => {
    const a = unit([{ m: 0, o: [[4]] }])
    const b = unit([{ m: 1, rep: [1], o: [[4]] }, { m: 1, rep: [2], o: [[4]] }])
    expect(moves(a, b).moves['sm:squad'].wg).toEqual({ '0.0': 0 })
  })

  it('reads a weapon GW renamed through the alias table', () => {
    const a = unit([{ m: 1, o: [[6]] }])
    const b = unit([{ m: 1, o: [[5]] }, { m: 1, o: [[4]] }])
    expect(moves(a, b).moves['sm:squad'].wg).toEqual({ '0.0': 0 })
    expect(moves(a, b, { 'astartes chainsword': 'chainsword' }).moves['sm:squad'].wg).toEqual({ '0.0': '1.0' })
  })

  it('moves a bracket by composition, and narrows a range that changed', () => {
    const five = { pts: 90, per: [5, 5], comp: [[0, 4], [1, 1]] }
    const sixTen = { pts: 180, per: [6, 10], comp: [[0, 5, 9], [1, 1]] }
    const ten = { pts: 180, per: [10, 10], comp: [[0, 9], [1, 1]] }
    const r = moves(unit([], [five, sixTen]), unit([], [ten, five]))
    expect(r.moves['sm:squad'].s).toEqual({ 0: 1, 1: [0, 10, 10] })
  })
})

describe('applyUnitMove', () => {
  it('moves picks, drops gone ones and merges two that land together', () => {
    const entry = { wg: [[0, 0, 2], [0, 1, 1], [1, 0], [2, 0]] }
    applyUnitMove(entry, { wg: { '0.0': '1.1', '0.1': '1.1', '1.0': 0 } })
    expect(entry.wg).toEqual([[1, 1, 3], [2, 0]])
  })

  it('narrows a size and drops a model count outside the new range', () => {
    const kept = { size: 1, count: 10 }, dropped = { size: 1, count: 7 }, gone = { size: 2, count: 3 }
    const move = { s: { 1: [0, 10, 10], 2: -1 } }
    applyUnitMove(kept, move); applyUnitMove(dropped, move); applyUnitMove(gone, move)
    expect(kept).toEqual({ size: 0, count: 10 })
    expect(dropped).toEqual({ size: 0 })
    expect(gone).toEqual({})
  })
})

describe('roster index meanings — twins', () => {
  it('keeps an unchanged position even when its meaning has a twin', () => {
    const twin = { m: 0, rep: [4], o: [[5]] }
    const r = moves(unit([twin, twin, plasma]), unit([twin, twin, { ...plasma, o: [[3], [2]] }]))
    expect(r.moves['sm:squad'].wg).toEqual({ '2.0': '2.1', '2.1': '2.0' })
    expect(r.gone).toEqual([])
  })
})
