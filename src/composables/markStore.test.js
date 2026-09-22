import { describe, it, expect } from 'vitest'
import { liveCell, deadCell, isLive, mergeCells, mergeScopes, sweepCells, liveIds, cleanCells, TOMBSTONE_MS } from './markStore.js'

describe('merging marks', () => {
  it('keeps what only one side knows — the other has simply not heard of it', () => {
    const mine = { boyz: liveCell({}, 100) }
    const theirs = { nobz: liveCell({}, 50) }
    expect(mergeCells(mine, theirs)).toEqual({ boyz: { at: 100 }, nobz: { at: 50 } })
  })

  it('lets the later act win, in both directions', () => {
    expect(mergeCells({ boyz: liveCell({}, 100) }, { boyz: deadCell(200) }).boyz).toEqual({ at: 200, del: 1 })
    expect(mergeCells({ boyz: deadCell(200) }, { boyz: liveCell({}, 300) }).boyz).toEqual({ at: 300 })
  })

  // The point of tombstones: a star taken off a phone must not come back from the tablet that
  // still holds it.
  it('does not resurrect a mark that was deliberately taken off', () => {
    const phone = { boyz: deadCell(500) }
    const tablet = { boyz: liveCell({}, 100) }
    expect(isLive(mergeCells(tablet, phone).boyz)).toBe(false)
    expect(isLive(mergeCells(phone, tablet).boyz)).toBe(false)
  })

  it('settles a same-millisecond tie the same way whichever side merges', () => {
    const a = { boyz: liveCell({ n: 2 }, 100) }
    const b = { boyz: liveCell({ n: 5 }, 100) }
    expect(mergeCells(a, b)).toEqual(mergeCells(b, a))
  })

  it('outranks a mark that predates timestamps with any deliberate act', () => {
    const old = { boyz: { at: 0 } }
    expect(mergeCells(old, { boyz: deadCell(1) }).boyz.del).toBe(1)
  })

  it('merges scope by scope, leaving other factions alone', () => {
    const mine = { orks: { boyz: liveCell({}, 10) }, necrons: { warriors: liveCell({}, 10) } }
    const theirs = { orks: { nobz: liveCell({}, 20) } }
    const out = mergeScopes(mine, theirs)
    expect(Object.keys(out).sort()).toEqual(['necrons', 'orks'])
    expect(Object.keys(out.orks).sort()).toEqual(['boyz', 'nobz'])
  })

  it('ignores junk on either side', () => {
    expect(mergeCells({ a: liveCell({}, 1) }, { b: 'nope', c: null })).toEqual({ a: { at: 1 } })
    expect(mergeScopes({}, { orks: 'nope' })).toEqual({})
  })
})

describe('sweeping tombstones', () => {
  const now = 1_800_000_000_000

  it('drops the old ones and keeps every live mark', () => {
    const cells = {
      ancient: deadCell(now - TOMBSTONE_MS - 1),
      recent: deadCell(now - 1000),
      live: liveCell({}, 0),
    }
    expect(Object.keys(sweepCells(cells, now)).sort()).toEqual(['live', 'recent'])
  })
})

describe('reading marks back', () => {
  it('lists live marks newest first, tombstones excluded', () => {
    const cells = { a: liveCell({}, 100), b: liveCell({}, 300), c: deadCell(400), d: liveCell({}, 200) }
    expect(liveIds(cells)).toEqual(['b', 'd', 'a'])
  })

  it('normalises a stored map, dropping what is not a cell', () => {
    const cleaned = cleanCells({ ok: { at: 5, n: 1 }, noAt: { n: 1 }, dead: { at: 7, del: 1 }, junk: 'x', arr: [] })
    expect(cleaned).toEqual({ ok: { at: 5, n: 1 }, noAt: { n: 1, at: 0 }, dead: { at: 7, del: 1 } })
    expect(cleanCells(null)).toEqual({})
    expect(cleanCells([1, 2])).toEqual({})
  })
})
