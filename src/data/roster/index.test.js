// Structural invariants of the generated roster data (scripts/gen-roster-data.mjs). These
// guard the derived layer the roster builder is costed against — a bad regeneration (dropped
// bracket, duplicate id, combat-patrol leak) should fail here, not silently misprice armies.
import { beforeAll, describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import rosterCore from './core.js'
import rosterItems from './items.js'
import { loadRosterFaction } from './index.js'
import { optionItems } from '../../composables/rosterEngine.js'

const DIR = path.dirname(fileURLToPath(import.meta.url))
const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.js') && !['index.js', 'core.js', 'items.js', 'index.test.js'].includes(f))

const factions = await Promise.all(
  files.map(async (f) => ({ slug: f.replace(/\.js$/, ''), data: (await import(`./${f}`)).default })),
)

describe('roster shared items', () => {
  it('exposes global item + text dictionaries', () => {
    expect(Object.keys(rosterItems.items).length).toBeGreaterThan(0)
    expect(Object.keys(rosterItems.texts).length).toBeGreaterThan(0)
  })
})

describe('SM-Chapter shared-pool fold', () => {
  for (const chapter of ['black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'space-wolves']) {
    it(`${chapter} folds in the shared Adeptus Astartes units`, async () => {
      const own = (await import(`./${chapter}.js`)).default
      expect(own.sharedUnitIds.length).toBeGreaterThan(0)
      const folded = await loadRosterFaction(chapter)
      // folded list = own units + shared, all unique ids, and gear still resolves globally
      expect(folded.units.length).toBe(own.units.length + own.sharedUnitIds.length)
      expect(new Set(folded.units.map((u) => u.id)).size).toBe(folded.units.length)
      for (const u of folded.units) {
        for (const g of u.gear || []) {
          expect(rosterItems.texts[g.t]).toBeTruthy()
          for (const o of g.o) for (const [id] of optionItems(o)) expect(rosterItems.items[id]).toBeTruthy()
        }
      }
    })
  }
})

describe('roster core', () => {
  it('has the three matched-play battle sizes with limits ascending by points', () => {
    const sizes = rosterCore.battleSizes
    expect(sizes.map((s) => s.id)).toEqual(['incursion', 'strike-force', 'onslaught'])
    expect(sizes.map((s) => s.points)).toEqual([1000, 2000, 3000])
    for (const s of sizes) {
      expect(s.dp).toBeGreaterThan(0)
      expect(s.enhLimit).toBeGreaterThan(0)
      expect(s.dupLimit).toBeGreaterThan(0)
    }
  })
})

describe('roster factions', () => {
  it('generated at least the 28 ready factions', () => {
    expect(factions.length).toBeGreaterThanOrEqual(28)
  })

  for (const { slug, data } of factions) {
    describe(slug, () => {
      it('has a slug/name and non-empty units', () => {
        expect(data.slug).toBe(slug)
        expect(data.name).toBeTruthy()
        expect(data.units.length).toBeGreaterThan(0)
      })

      it('unit ids are unique', () => {
        const ids = data.units.map((u) => u.id)
        expect(new Set(ids).size).toBe(ids.length)
      })

      it('every unit has ≥1 size bracket with points and a valid [min,max] range', () => {
        for (const u of data.units) {
          expect(u.sizes.length, `${u.name} has no size`).toBeGreaterThan(0)
          for (const s of u.sizes) {
            expect(typeof s.pts, `${u.name} size pts`).toBe('number')
            expect(Array.isArray(s.per) && s.per.length === 2).toBe(true)
            expect(s.per[0]).toBeGreaterThanOrEqual(1)
            expect(s.per[1]).toBeGreaterThanOrEqual(s.per[0])
          }
          expect(u.sizes.filter((s) => s.default).length, `${u.name} default count`).toBeLessThanOrEqual(1)
        }
      })

      it('copy-tax steps are a single {at>=2, pts>0}', () => {
        for (const u of data.units) {
          if (!u.step) continue
          expect(u.step.at).toBeGreaterThanOrEqual(2)
          expect(u.step.pts).toBeGreaterThan(0)
        }
      })

      it('wargear defaults/gear reference existing interned items and texts', () => {
        const { items, texts } = rosterItems
        for (const u of data.units) {
          for (const [, list] of u.defaults || []) {
            for (const [itemId] of list) expect(items[itemId], `${u.name} default item ${itemId}`).toBeTruthy()
          }
          for (const g of u.gear || []) {
            expect(texts[g.t], `${u.name} gear text ${g.t}`).toBeTruthy()
            expect(g.o.length).toBeGreaterThan(0)
            for (const o of g.o) {
              // Slot 0 is an item id OR a `[[id, count], …]` bundle — optionItems normalises both.
              const set = optionItems(o)
              expect(set.length, `${u.name} gear option ${JSON.stringify(o)}`).toBeGreaterThan(0)
              for (const [id, n] of set) {
                expect(items[id], `${u.name} gear item ${id}`).toBeTruthy()
                expect(n, `${u.name} gear count ${id}`).toBeGreaterThan(0)
              }
              if (o.length > 1) expect(typeof o[1]).toBe('number') // points
            }
            // gear group targets a valid miniature index — or none at all, which is how a
            // unit-wide group is recorded (see gen-roster-data.mjs mergeMiniatureDuplicates).
            const miniCount = u.minis?.length || 1
            if (g.all) expect(g.m).toBeUndefined()
            else expect(g.m).toBeLessThan(miniCount)
          }
        }
      })

      it('every detachment has a name, sid and an enhancements array', () => {
        for (const d of data.detachments) {
          expect(d.name).toBeTruthy()
          expect(d.sid).toBeTruthy()
          expect(Array.isArray(d.enhancements)).toBe(true)
          for (const e of d.enhancements) {
            expect(e.name).toBeTruthy()
            expect(typeof e.pts).toBe('number')
            // eligibility, when present, is OR-groups of faction-keywords / keywords
            if (e.req) for (const g of e.req) expect((g.fac?.length || 0) + (g.kw?.length || 0)).toBeGreaterThan(0)
          }
        }
      })
    })
  }
})

// Corpus-wide, because the per-faction loops above can't see a regression that thins the layer
// out everywhere at once. The bundles come from parsing instruction prose (gen-roster-data.mjs's
// linkWargearBundles) — a change that quietly stops matching would leave every option one item
// again, which reads as perfectly valid data and silently drops half of 172 swaps.
describe('bundled wargear options', () => {
  const loaded = []
  beforeAll(async () => {
    for (const f of files) loaded.push([f, (await import(`./${f}`)).default])
  })

  it('are present across the corpus', () => {
    let bundles = 0
    let groups = 0
    for (const [, data] of loaded) {
      for (const u of data.units || []) {
        for (const g of u.gear || []) {
          groups++
          if (g.o.some((o) => optionItems(o).length > 1)) bundles++
        }
      }
    }
    expect(groups).toBeGreaterThan(1000)
    expect(bundles).toBeGreaterThan(120)
  })

  it('never offer the same instruction twice on one unit', () => {
    // appdata records a unit-wide bullet once per miniature; folded into one by the generator
    // (mergeMiniatureDuplicates). Two copies would read as a repeated instruction AND hand out
    // the allowance twice, which is how this was noticed on Drukhari Wracks.
    const key = (g) => `${g.t}|${g.o.map((o) => optionItems(o).map(([id]) => id).sort().join('+')).sort().join('/')}`
    for (const [slug, data] of loaded) {
      for (const u of data.units || []) {
        const seen = new Set()
        for (const g of u.gear || []) {
          const k = key(g)
          expect(seen.has(k), `${slug} ${u.name}: ${k}`).toBe(false)
          seen.add(k)
        }
      }
    }
  })
})

