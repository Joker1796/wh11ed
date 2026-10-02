import { describe, it, expect } from 'vitest'
import { refreshSummaries, summarize, summaryOf, summaryStale } from './rosterSummary.js'
import { APP_VERSION } from '../buildInfo.js'

// Real Space Marines data — Intercessor Squad is 85 points at its default bracket (MFM v1.5 as
// GW re-priced it on 2 October).
function roster(extra = {}) {
  return {
    id: 'r1',
    faction: 'space-marines',
    battleSize: 'strike-force',
    detachments: [],
    units: [{ uid: 'a', id: 'intercessor-squad', size: 0 }],
    ...extra,
  }
}

describe('summaryStale', () => {
  it('flags a roster with units and no summary at all', () => {
    expect(summaryStale(roster())).toBe(true)
  })

  it('flags a summary left behind by a change in the unit count', () => {
    expect(summaryStale(roster({ summary: { points: 0, unitCount: 0, issues: 0 } }))).toBe(true)
  })

  it('believes a summary that agrees with the units', () => {
    expect(summaryStale(roster({ summary: summaryOf(roster(), 95) }))).toBe(false)
  })

  // A points update ships as a release: the card must not keep the total from before it, while
  // the list's own page already prices it anew.
  it('flags a summary written by another release, or before releases were stamped', () => {
    const old = summaryOf(roster(), 90, 0, '2.7.8')
    expect(summaryStale(roster({ summary: old }), '2.7.9')).toBe(true)
    expect(summaryStale(roster({ summary: old }), '2.7.8')).toBe(false)
    expect(summaryStale(roster({ summary: { points: 90, unitCount: 1, issues: 0 } }), '2.7.9')).toBe(true)
  })

  // 0 points is the right answer for an empty list whether or not anything ever wrote it, so an
  // empty roster must never cost a faction chunk.
  it('never flags an empty roster', () => {
    expect(summaryStale({ faction: 'space-marines', units: [] })).toBe(false)
    expect(summaryStale({ faction: 'space-marines' })).toBe(false)
  })
})

describe('refreshSummaries', () => {
  it('prices a roster no editing screen ever wrote a summary for', async () => {
    const r = roster()
    await refreshSummaries([r])
    // The issue count is the editor's own validator, not a separate opinion — one error here,
    // for the warlord this list hasn't named.
    expect(r.summary).toEqual({ points: 85, unitCount: 1, issues: 1, v: APP_VERSION })
  })

  it('leaves a believable summary untouched', async () => {
    const r = roster({ summary: { points: 12345, unitCount: 1, issues: 0, v: APP_VERSION } })
    await refreshSummaries([r])
    expect(r.summary.points).toBe(12345)
  })

  it('survives a roster whose faction has no data', async () => {
    const r = roster({ faction: 'not-a-faction' })
    await refreshSummaries([r])
    expect(r.summary).toBeUndefined()
  })
})

describe('summarize', () => {
  it('counts every copy and reports the roster\'s own validation errors', async () => {
    const { default: data } = await import('../data/roster/space-marines.js')
    // Four Intercessor Squads at 85 (MFM 1.5 of 2 October): one over the Strike Force duplicate cap, so the summary
    // carries a validation error alongside the points rather than points alone.
    const r = roster({ units: Array.from({ length: 4 }, (_, i) => ({ uid: `u${i}`, id: 'intercessor-squad', size: 0 })) })
    const s = summarize(r, data)
    expect(s.unitCount).toBe(4)
    expect(s.points).toBe(340)
    expect(s.issues).toBeGreaterThan(0)
  })
})
