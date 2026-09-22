import { describe, it, expect } from 'vitest'
import { reconcileCells } from './markReconcile.js'
import { liveCell, deadCell, isLive } from './markStore.js'

const live = new Set(['warboss', 'boyz'])

describe('reconciling marks with the rules data', () => {
  it('leaves marks on units this build ships', () => {
    const cells = { warboss: liveCell({}, 10), boyz: liveCell({}, 20) }
    expect(reconcileCells(cells, { liveIds: live })).toBeNull()
  })

  it('moves a renamed unit, keeping when the box was marked', () => {
    const cells = { 'old-warboss': liveCell({ n: 1, name: 'Warboss' }, 10) }
    const res = reconcileCells(cells, { liveIds: live, renames: { 'old-warboss': 'warboss' }, now: 999 })
    expect(res.moved).toEqual([['old-warboss', 'warboss']])
    expect(res.cells.warboss).toEqual({ n: 1, name: 'Warboss', at: 10 })
    // The old id is tombstoned, not deleted, so another device does not bring it back.
    expect(res.cells['old-warboss']).toEqual({ at: 999, del: 1 })
  })

  it('does not let a move overwrite a newer mark already on the new id', () => {
    const cells = { 'old-warboss': liveCell({ name: 'Old' }, 10), warboss: liveCell({ name: 'New' }, 50) }
    const res = reconcileCells(cells, { liveIds: live, renames: { 'old-warboss': 'warboss' } })
    expect(res.cells.warboss.name).toBe('New')
  })

  it('drops a mark on a unit recorded as having left the game', () => {
    const cells = { 'gone-unit': liveCell({}, 10) }
    const res = reconcileCells(cells, { liveIds: live, renames: { 'gone-unit': null } })
    expect(isLive(res.cells['gone-unit'])).toBe(false)
    expect(res.dropped).toEqual(['gone-unit'])
  })

  // The guard: an old build offline for weeks must not delete marks for units it has merely not
  // been told about — the marks are synced, so it would delete them everywhere.
  it('leaves an unaccounted id alone when this build may not clean up', () => {
    const cells = { 'who-knows': liveCell({}, 10) }
    expect(reconcileCells(cells, { liveIds: live, mayClean: false })).toBeNull()
    const res = reconcileCells(cells, { liveIds: live, mayClean: true })
    expect(res.dropped).toEqual(['who-knows'])
  })

  it('ignores tombstones — there is nothing left to reconcile', () => {
    const cells = { 'old-warboss': deadCell(10) }
    expect(reconcileCells(cells, { liveIds: live, renames: { 'old-warboss': 'warboss' } })).toBeNull()
  })
})
