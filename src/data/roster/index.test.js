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
import { optionItems, optionLabel, unitWargearPoints, modelsPerMini } from '../../composables/rosterEngine.js'

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
    // Keyed on the TEXT, whitespace-normalised — the two copies are typed twice into appdata and
    // can differ by a stray space, which is how one pair escaped the first version of the fold.
    const key = (g) => `${(rosterItems.texts[g.t] || '').replace(/\s+/g, ' ').trim()}|${g.o.map((o) => optionItems(o).map(([id]) => id).sort().join('+')).sort().join('/')}`
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


describe('replaced-item links', () => {
  // `rep` — the item(s) a wargear group gives up — is what lets defaultLoadoutLines shrink the
  // "starts equipped with" line and Tier A's overlay drop the swapped-away weapon row. It is
  // parsed out of the instruction prose, and three things used to break that parse silently:
  // a quantity ("this model's 2 starcannons…"), a U+2010 hyphen in the item name, and a plural
  // possessive ("up to 3 models' combi-bolters"). Each cost the reader a weapon that is no longer
  // there, so these pin the parse rather than the wording.
  const groupsOf = (slug, id) => factions.find((f) => f.slug === slug).data.units.find((u) => u.id === id)
  const repNames = (g) => (g.rep || []).map((i) => rosterItems.items[i])
  const textOf = (g) => (rosterItems.texts[g.t] || '').split('\n')[0]

  it('reads through a quantity in the item being given up', () => {
    const u = groupsOf('aeldari', 'crimson-hunter')
    const g = u.gear.find((x) => /2 starcannons/.test(textOf(x)))
    expect(repNames(g)).toEqual(['Starcannon'])
  })

  it('reads through a U+2010 hyphen in the item name', () => {
    const u = groupsOf('astra-militarum', 'chimera')
    const g = u.gear.find((x) => /multi‐laser/.test(textOf(x)))
    expect(repNames(g)).toEqual(['Multi-laser'])
  })

  it('resolves an item whose name itself contains "and"', () => {
    const u = groupsOf('genestealer-cults', 'acolyte-hybrids-with-hand-flamers')
    const g = u.gear.find((x) => /cult claws and knife/i.test(textOf(x)))
    expect(repNames(g)).toEqual(['Cult claws and knife'])
  })

  it('leaves almost nothing unparsed across the corpus', () => {
    // The known leftovers are "X or Y" (one item out of two given up — no single set to subtract)
    // and a handful where appdata's own prose and item table disagree ("absolver" vs "Absolvor").
    // Both are fail-open by design; the number is here so a parser regression shows up as a jump.
    let withReplaced = 0
    let missing = 0
    for (const { data } of factions) {
      for (const u of data.units || []) {
        for (const g of u.gear || []) {
          if (!/replaced with/i.test(rosterItems.texts[g.t] || '')) continue
          withReplaced++
          if (!g.rep?.length) missing++
        }
      }
    }
    expect(withReplaced).toBeGreaterThan(800)
    expect(missing).toBeLessThanOrEqual(25)
  })
})

describe('default loadouts', () => {
  // 144 datasheets carry no base_miniature_loadout row; for 136 the starting gear is a
  // "Default Wargear" option group instead. Reading only the loadout table left those units with
  // no default loadout at all — nothing to print, and nothing for the overlay to subtract from.
  it('reads a Default Wargear group when the loadout table has no row', () => {
    const u = factions.find((f) => f.slug === 'blood-angels').data.units.find((x) => x.id === 'blood-angels-captain')
    expect((u.defaults || []).flatMap(([, list]) => list.map(([id]) => rosterItems.items[id])))
      .toEqual(['Heavy bolt pistol', 'Master‐crafted chainsword'])
  })

  it('leaves only genuinely unarmed units without one', () => {
    const without = factions.flatMap(({ slug, data }) => (data.units || [])
      .filter((u) => !u.defaults?.length).map((u) => `${slug}/${u.id}`))
    expect(without.length, without.join(', ')).toBeLessThanOrEqual(10)
  })
})

describe('keyword-defined leader attachments', () => {
  // A bodyguard group can name its targets by keyword instead of listing datasheets, and reading
  // only the list table dropped 36 such groups entirely — Captain could not lead a Sternguard
  // Veteran Squad, Tor Garadon could not lead Eradicators. appdata's own faction bundle has the
  // same hole (it emits `units: []` for these), so the generator reads the raw table.
  const leadsOf = (slug, id) => (factions.find((f) => f.slug === slug).data.units
    .find((u) => u.id === id)?.leads || []).map((l) => l.to)

  it('lets a Captain lead the squad named only by keyword', () => {
    expect(leadsOf('space-marines', 'captain')).toContain('sternguard-veteran-squad')
    expect(leadsOf('blood-angels', 'blood-angels-captain')).toContain('sternguard-veteran-squad')
  })

  it('resolves a keyword to every datasheet carrying it', () => {
    // "Eradicator Squad" is two datasheets — the plain one and the heavy-bolter variant.
    expect(leadsOf('space-marines', 'tor-garadon')).toEqual(
      expect.arrayContaining(['eradicator-squad', 'eradicator-squad-with-heavy-bolters']),
    )
  })

  it('never offers the same attachment twice', () => {
    // A keyword group and a listed group can name the same unit; the picker would show it twice.
    for (const { slug, data } of factions) {
      for (const u of data.units || []) {
        const keys = (u.leads || []).map((l) => `${l.to}|${l.type}|${l.reqDet || ''}|${l.exclDet || ''}`)
        expect(new Set(keys).size, `${slug}/${u.id}`).toBe(keys.length)
      }
    }
  })
})

describe('per-option quantities', () => {
  // "This model's 2 starcannons can be replaced with 2 bright lances" — one pick, two weapons.
  // appdata's wargear_option knows only the item, and loadout_choice records the model's TOTAL of
  // that weapon rather than this option's share, so the prose is the only source of the number.
  const gearOf = (slug, id) => factions.find((f) => f.slug === slug).data.units.find((u) => u.id === id).gear
  const headOf = (g) => (rosterItems.texts[g.t] || '').split('\n')[0]

  it('reads the quantity an option grants', () => {
    const g = gearOf('aeldari', 'crimson-hunter').find((x) => /bright lances/.test(headOf(x)))
    expect(optionItems(g.o[0])[0][1]).toBe(2)
    expect(optionLabel(g.o[0], rosterItems.items)).toBe('2× Bright lance')
  })

  it('does NOT read an allowance as a quantity', () => {
    // "up to 2 seeker missiles" / "up to 4 big shootas" say how many separate picks are allowed,
    // each granting one item. Read as a set, one pick would arm the model with the whole allowance.
    const seeker = gearOf('tau-empire', 'devilfish').find((x) => /up to 2 seeker missiles/i.test(headOf(x)))
    expect(optionItems(seeker.o[0])[0][1]).toBe(1)
    const shoota = gearOf('orks', 'battlewagon').find((x) => /up to 4 big shootas/i.test(headOf(x)))
    expect(optionItems(shoota.o[0])[0][1]).toBe(1)
  })

  it('never prices the quantity — a paid swap costs what appdata charges for it', () => {
    // Forgefiend: "2 Hades autocannons can be replaced with 2 ectoplasma cannons", 5 pts for the
    // swap as a whole. unitWargearPoints multiplies by the number of PICKS, never by the count.
    const gear = gearOf('chaos-space-marines', 'forgefiend')
    const gi = gear.findIndex((g) => /2 ectoplasma cannons/i.test(headOf(g)))
    expect(optionItems(gear[gi].o[0])[0][1]).toBe(2)
    expect(unitWargearPoints({ gear }, { wg: [[gi, 0, 1]] })).toBe(gear[gi].o[0][1])
  })
})

describe('unit composition', () => {
  // sizes[i].comp is appdata's unit_composition_miniature — the model count per miniature PROFILE
  // in that bracket. Without it nothing downstream could subtract a swap on a multi-profile
  // datasheet; the invariants here are what let those readers trust it.
  it('breaks every multi-profile bracket down, and the parts add up', () => {
    let brackets = 0
    for (const { slug, data } of factions) {
      for (const u of data.units || []) {
        if (!(u.minis?.length > 1)) continue
        for (const s of u.sizes) {
          expect(s.comp, `${slug}/${u.id} @${s.pts}`).toBeTruthy()
          const sum = s.comp.reduce((a, c) => [a[0] + c[1], a[1] + (c.length === 3 ? c[2] : c[1])], [0, 0])
          expect(sum, `${slug}/${u.id} @${s.pts}`).toEqual(s.per)
          for (const [m] of s.comp) expect(u.minis[m], `${slug}/${u.id}`).toBeTruthy()
          brackets++
        }
      }
    }
    expect(brackets).toBeGreaterThan(400)
  })

  it('never lists the same bracket twice', () => {
    // appdata publishes a bracket a second time under an ally grouping keyword (Aquila Kill Team
    // had four pills for two real choices). Same models, same points, same breakdown → one pill.
    for (const { slug, data } of factions) {
      for (const u of data.units || []) {
        const keys = u.sizes.map((s) => `${s.per.join('-')}|${s.pts}|${JSON.stringify(s.comp || null)}`)
        expect(new Set(keys).size, `${slug}/${u.id}`).toBe(keys.length)
      }
    }
  })

  it('resolves a real squad to its profiles', () => {
    const wracks = factions.find((f) => f.slug === 'drukhari').data.units.find((u) => u.id === 'wracks')
    const bracket = wracks.sizes.findIndex((s) => s.per[0] === 6)
    const per = modelsPerMini(wracks, { size: bracket, count: 7 })
    expect([...per].map(([m, n]) => `${n}× ${wracks.minis[m].n}`)).toEqual(['1× Acothyst', '6× Wrack'])
  })
})

describe('detachment tags', () => {
  // `unique` bars a second detachment carrying the same tag (core rules 25.04). It reaches the
  // roster layer from the hand-written faction data, cross-checked against mfm and appdata's
  // detachment_unique_keyword by the generator — a tag lost on the way means the editor stops
  // barring an illegal pair, silently.
  it('carries the tag on every detachment that has one', () => {
    const tagged = factions.flatMap(({ data }) => (data.detachments || []).filter((d) => d.unique))
    expect(tagged.length).toBeGreaterThanOrEqual(55)
    for (const d of tagged) expect(d.unique).toBe(d.unique.toUpperCase())
  })

  it('never leaves a tag on a single detachment — a tag only means something in a pair', () => {
    for (const { slug, data } of factions) {
      const byTag = new Map()
      for (const d of data.detachments || []) {
        if (!d.unique) continue
        byTag.set(d.unique, (byTag.get(d.unique) || 0) + 1)
      }
      for (const [tag, n] of byTag) expect(n, `${slug} ${tag}`).toBeGreaterThan(1)
    }
  })
})

describe('allegiance choices', () => {
  // `alleg` is the army-list choice a datasheet carries: the mandatory mark (Mark of Chaos,
  // Daemonic Allegiance) or the capped detachment upgrade that grants a keyword. appdata's
  // conditional_keyword rows for these are skipped by the datasheet-page sidecar on purpose —
  // the choice only exists inside a roster.
  const withAlleg = () => factions.flatMap(({ slug, data }) => (data.units || [])
    .filter((u) => u.alleg).map((u) => ({ slug, u })))

  it('reaches every datasheet appdata gives one', () => {
    expect(withAlleg()).toHaveLength(92)
  })

  it('always offers something to choose, and says whether it must be chosen', () => {
    for (const { slug, u } of withAlleg()) {
      expect(u.alleg.o.length, `${slug}/${u.id}`).toBeGreaterThan(0)
      for (const o of u.alleg.o) expect(o.n, `${slug}/${u.id}`).toBeTruthy()
      // Three shapes exist and only one combination is nonsense: a choice that is both forced
      // and capped. Astra Militarum's Steel Hammer is the uncapped optional one ("select one or
      // more ASTRA MILITARUM TITANIC units"), so "neither" is legitimate.
      expect(Boolean(u.alleg.req && u.alleg.max), `${slug}/${u.id}`).toBe(false)
    }
  })

  it('keeps KHORNE away from the Psyker datasheets', () => {
    const csm = factions.find((f) => f.slug === 'chaos-space-marines').data
    const sorcerer = csm.units.find((u) => u.id === 'sorcerer')
    const vindicator = csm.units.find((u) => u.id === 'chaos-vindicator')
    expect(sorcerer.alleg.o.map((o) => o.n)).not.toContain('Khorne')
    expect(vindicator.alleg.o.map((o) => o.n)).toContain('Khorne')
  })
})
