import { describe, it, expect } from 'vitest'
import { loadBaseline } from './sync-baseline.mjs'
import { baselineClass } from './sync-baseline-classes.mjs'

// Every accepted finding carries the reason it was accepted (hub journal 2026-10-03-baseline-to-app.md).
// The baseline went in on 2026-09-12 with 732 findings and no reasons, and the audit fell silent
// about the drift the Wahapedia import had left; all of them were fixed or explained on 2026-10-03.
// `npm run sync -- --baseline` keeps the reasons it finds and records a NEW finding with an empty
// one — this test then fails until the finding is fixed or its reason is written into the file.
const UNEXPLAINED_CEILING = 0

describe('sync baseline', () => {
  const baseline = loadBaseline()

  it('has a reason for every entry', () => {
    const empty = Object.values(baseline).filter((why) => !why).length
    expect(empty).toBeLessThanOrEqual(UNEXPLAINED_CEILING)
  })

  it('files every entry under a named class', () => {
    expect(Object.keys(baseline).filter((k) => baselineClass(k) === 'other')).toEqual([])
  })
})
