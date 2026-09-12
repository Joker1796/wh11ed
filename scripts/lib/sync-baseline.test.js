import { describe, it, expect } from 'vitest'
import { applyBaseline, findingKey, splitFindings } from './sync-baseline.mjs'

// The baseline's whole value is that it suppresses a finding and NOTHING ELSE. Both halves of that
// have already gone wrong once: a blank line inside a quoted rule ended the block early and left
// three hundred lines of somebody else's rulebook printed under a finding that had been dropped.

const HEAD = '=== adepta-sororitas ==='
const FIND = '  ~ detachment "Penitent Host" · rule "X": text differs from appdata'

describe('splitFindings', () => {
  it('gives a finding the lines indented under it, and nothing else', () => {
    const parts = splitFindings([HEAD, FIND, '      wh11ed: …', '      appdata: …', '=== next ==='])
    expect(parts.map((p) => p.head)).toEqual([null, FIND, null])
    expect(parts[1].lines).toHaveLength(3)
  })

  // A quoted rule is a whole rule, paragraph breaks and all.
  it('does not end the block at a blank line inside the quoted body', () => {
    const parts = splitFindings([FIND, '      canonical:', '        ', '        ▪ a rule', '=== next ==='])
    expect(parts[0].lines).toHaveLength(4)
    expect(parts[1].head).toBeNull()
  })

  it('leaves headings, counts and ✓ summaries alone', () => {
    const lines = [HEAD, '  clean', '✓ 24 factions, 0 issues']
    expect(splitFindings(lines).every((p) => p.head === null)).toBe(true)
  })
})

describe('applyBaseline', () => {
  const lines = [HEAD, FIND, '      wh11ed: …', '  ~ datasheet "Impulsor" points differ: wh11ed=[75] appdata=[70,75]']

  it('drops a recorded finding with its body, and keeps the rest', () => {
    const { kept, suppressed } = applyBaseline(lines, { [findingKey(FIND)]: 'wording is ours on purpose' })
    expect(suppressed).toBe(1)
    expect(kept).toEqual([HEAD, lines[3]])
  })

  // The key carries the VALUES, so the day the disagreement becomes a different disagreement is
  // the day it comes back — which is the only day worth printing it.
  it('lets a finding through once either side of it changes', () => {
    const recorded = { '~ datasheet "Impulsor" points differ: wh11ed=[75] appdata=[70,75]': '' }
    const moved = [...lines.slice(0, 3), '  ~ datasheet "Impulsor" points differ: wh11ed=[75] appdata=[70,80]']
    const { kept } = applyBaseline(moved, recorded)
    expect(kept).toContain(moved[3])
  })

  it('reports which keys it saw, so an entry that matched nothing can be called stale', () => {
    const { seen } = applyBaseline(lines, {})
    expect(seen.has(findingKey(FIND))).toBe(true)
    expect(seen.size).toBe(2)
  })
})
