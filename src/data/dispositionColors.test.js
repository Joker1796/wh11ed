import { describe, it, expect } from 'vitest'
import { DISPOSITION_COLORS, dispositionColor } from './dispositionColors.js'
import { eventCompanion } from './eventCompanion.js'
import { mfmFactions } from './mfmFactions.js'
import { factionGroups } from './factionsIndex.js'

// A detachment row is tinted by its disposition's NAME, so a disposition the colour table does
// not know would render grey without a word — the same quiet failure the data gates exist for.
describe('disposition colours', () => {
  it('cover every disposition the Event Companion defines', () => {
    for (const d of eventCompanion.en.dispositions) expect(dispositionColor(d.name), d.name).toBeTruthy()
  })
  it('cover every disposition the MFM detachments carry', () => {
    const names = new Set(mfmFactions.en.flatMap((f) => (f.detachments || []).map((d) => d.forceDisposition)))
    for (const n of names) expect(dispositionColor(n), n).toBeTruthy()
    expect(Object.keys(DISPOSITION_COLORS).sort()).toEqual([...names].sort())
  })
})

describe('faction monograms', () => {
  it('every faction has one, short, and no two in a group collide', () => {
    for (const g of factionGroups) {
      const seen = new Set()
      for (const f of g.factions) {
        expect(f.abbr, f.slug).toMatch(/^[A-Za-z]{2,3}$/)
        expect(seen.has(f.abbr), `${g.id}: ${f.abbr}`).toBe(false)
        seen.add(f.abbr)
      }
    }
  })
})
