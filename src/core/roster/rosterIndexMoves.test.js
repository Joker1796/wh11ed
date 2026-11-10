import { describe, expect, it } from 'vitest'
import { applyUnitMove, moveKeyOf } from './rosterIndexMoves.js'

describe('stored roster move application', () => {
  it('retains an ambiguous choice without treating it as default equipment', () => {
    const entry = { wg: [[0, 0], [1, 2, 3]] }
    applyUnitMove(entry, { wg: { '0.0': { review: 'axe×1' }, '1.2': '2.1' } })
    expect(entry).toEqual({ wg: [[2, 1, 3]], gearRecovery: [{ pick: [0, 0, 1], meaning: 'axe×1' }], gearCheck: 2 })
  })
  it('merges counts when two old picks have one unambiguous replacement', () => {
    const entry = { wg: [[0, 0, 2], [0, 1, 3]] }
    applyUnitMove(entry, { wg: { '0.0': '1.0', '0.1': '1.0' } })
    expect(entry.wg).toEqual([[1, 0, 5]])
  })
  it.each([
    [[[0, 0], [0, 1]], [[1, 0]]],
    [[[0, 0, 2], [0, 1]], [[1, 0, 3]]],
    [[[0, 0], [0, 1, 3]], [[1, 0, 4]]],
    [[[0, 0, 0], [0, 1, 2]], [[1, 0, 2]]],
    [[[0, 0, 2], [0, 1, 0]], [[1, 0, 2]]],
  ])('preserves implicit, explicit and zero counts when merging %j', (wg, expected) => {
    const entry = { wg }
    applyUnitMove(entry, { wg: { '0.0': '1.0', '0.1': '1.0' } })
    expect(entry.wg).toEqual(expected)
  })
  it('preserves an explicit zero in the original recovery evidence', () => {
    const entry = { wg: [[0, 0, 0]] }
    applyUnitMove(entry, { wg: { '0.0': { review: 'axe×1' } } })
    expect(entry.gearRecovery[0].pick).toEqual([0, 0, 0])
  })
  it('keeps untouched picks and removes only explicitly gone picks', () => {
    const entry = { wg: [[0, 0], [1, 0]] }
    applyUnitMove(entry, { wg: { '0.0': 0 } })
    expect(entry.wg).toEqual([[1, 0]])
  })
  it('removes an empty pick array, and preserves recovery from a preceding revision', () => {
    const recovery = [{ pick: [3, 1, 2], meaning: 'old×2' }]
    const entry = { wg: [[0, 0, 2]], gearRecovery: recovery }
    applyUnitMove(entry, { wg: { '0.0': { review: 'new×1' } } })
    expect(entry.wg).toBeUndefined()
    expect(entry.gearRecovery).toEqual([{ pick: [3, 1, 2], meaning: 'old×2' }, { pick: [0, 0, 2], meaning: 'new×1' }])
    expect(entry.gearRecovery).toHaveLength(2)
    expect(entry.gearRecovery[1].pick).toEqual([0, 0, 2])
  })
  it.each([2, 4])('keeps a model count within the new bracket (%s)', count => {
    const entry = { size: 1, count }
    applyUnitMove(entry, { s: { 1: [3, 2, 4] } })
    expect(entry).toEqual({ size: 3, count })
  })
  it.each([1, 5])('drops a model count outside the new bracket (%s)', count => {
    const entry = { size: 1, count }
    applyUnitMove(entry, { s: { 1: [3, 2, 4] } })
    expect(entry).toEqual({ size: 3 })
  })
  it('removes a vanished size and count together', () => {
    const entry = { size: 1, count: 9 }
    applyUnitMove(entry, { s: { 1: -1 } })
    expect(entry).toEqual({})
  })
  it('files allied picks under their own faction', () => {
    expect(moveKeyOf('imperial-agents', 'grey-knights:terminators')).toBe('grey-knights:terminators')
    expect(moveKeyOf('grey-knights', 'terminators')).toBe('grey-knights:terminators')
  })
})
