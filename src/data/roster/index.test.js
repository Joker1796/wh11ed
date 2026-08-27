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
import { optionItems, optionLabel, unitWargearPoints, unitPoints, modelsPerMini, defaultLoadoutLines, wargearGroupCap } from '../../composables/rosterEngine.js'

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

  it('picks the alternative the profile actually holds out of "X or Y"', () => {
    // "their Autoch-pattern bolter or ion blaster" doesn't say which the model gives up — but the
    // profile does: its default loadout holds the bolter and not the ion blaster.
    const u = groupsOf('leagues-of-votann', 'hearthkyn-warriors')
    const g = u.gear.find((x) => /bolter or ion blaster/i.test(textOf(x)))
    expect(repNames(g)).toEqual(['Autoch-pattern bolter'])
  })

  it('leaves "X or Y" alone when the profile holds both', () => {
    // A Havoc starts with both the autocannon and the lascannon, so which one the swap consumes
    // is the player's to decide. Guessing would delete a weapon the model still has.
    const u = groupsOf('chaos-space-marines', 'havocs')
    const g = u.gear.find((x) => /Havoc autocannon or Havoc lascannon/i.test(textOf(x)))
    expect(g.rep).toBeUndefined()
  })

  it('resolves a weapon category to the one weapon of that type', () => {
    // "1 model's ranged weapon can be replaced with 1 shardlauncher" names no item at all.
    const u = groupsOf('tyranids', 'termagants')
    const g = u.gear.find((x) => /ranged weapon/i.test(textOf(x)))
    expect(repNames(g)).toEqual(['Fleshborer'])
  })

  it('counts the copies of a weapon a per-copy swap replaces', () => {
    // "Each of this model's shuriken catapults can be replaced with 1 flamer" — a Wraithlord
    // carries two, so the group is worth two picks, and the model-count fallback that would
    // otherwise cap it at one called an ordinary Wraithlord illegal. The bundled form ("this
    // model's 2 twin heavy flamers can be replaced with 2 twin heavy bolters") is one pick and
    // must NOT gain a count.
    const wraithlord = groupsOf('aeldari', 'wraithlord')
    const swap = wraithlord.gear.find((x) => /shuriken catapults/i.test(textOf(x)))
    expect(swap.cp).toBe(2)
    const ravager = groupsOf('drukhari', 'ravager').gear.find((x) => /dark lances/i.test(textOf(x)))
    expect(ravager.cp).toBe(3)
    const bundled = groupsOf('astra-militarum', 'shadowsword').gear.find((x) => /twin heavy flamers/i.test(textOf(x)))
    expect(bundled.cp).toBeUndefined()
  })

  it('prices a quantity in the option by the item, not by the pick', () => {
    // "This model's 2 Hades autocannons can be replaced with 2 ectoplasma cannons": appdata prices
    // the cannon at 5 whichever group buys it, so the pair costs 10 — which is what puts a
    // three-cannon Forgefiend at the 155 points its own export prints.
    const g = groupsOf('world-eaters', 'forgefiend').gear.find((x) => /2 Hades autocannons/i.test(textOf(x)))
    expect(optionItems(g.o[0])).toEqual([[expect.any(Number), 2]])
    expect(g.o[0][1]).toBe(10)
  })

  it('reads a name appdata spells two ways across its own tables', () => {
    // The prose says "kustom-mega blasta"; the item table says "Kustom mega-blasta".
    const u = groupsOf('orks', 'big-mek-in-mega-armour')
    const g = u.gear.find((x) => /kustom-mega blasta/i.test(textOf(x)))
    expect(repNames(g)).toEqual(['Kustom mega-blasta'])
  })

  it('reads a name the prose has prefixed with one adjective', () => {
    // "plague combi-bolter and bubotic blade" — the item is just "Combi-bolter", and the tail of
    // the phrase must not be mistaken for the whole of it.
    const u = groupsOf('death-guard', 'blightlord-terminators')
    const g = u.gear.find((x) => /plague combi-bolter and bubotic blade/i.test(textOf(x)))
    expect(repNames(g)).toEqual(['Combi-bolter', 'Bubotic blade'])
  })

  it('reads the one instruction written without a possessive', () => {
    const u = groupsOf('aeldari', 'war-walkers')
    const g = u.gear.find((x) => /equipped with replaced with/i.test(textOf(x)))
    expect(repNames(g)).toEqual(['Shuriken cannon'])
  })

  it('spends a checkbox swap on one model, not on the whole profile', () => {
    // "1 Battle Sister's boltgun can be replaced with one of the following" is a checkbox, and
    // reading its tick as the whole squad used to strip every boltgun off the line. 100 groups
    // corpus-wide word their allowance this way.
    const u = groupsOf('adepta-sororitas', 'battle-sisters-squad')
    const gi = u.gear.findIndex((x) => /^1 Battle Sister.s boltgun/.test(textOf(x)))
    const models = modelsPerMini(u, { unitId: u.id, size: u.sizes.length - 1 }).get(u.gear[gi].m)
    const line = defaultLoadoutLines(u, rosterItems.items, { unitId: u.id, size: u.sizes.length - 1, wg: [[gi, 0]] })
    expect(line.some((l) => l.items.includes(`Boltgun ×${models - 1}`))).toBe(true)
  })

  // A group whose every option appdata marks as a default is the miniature's starting gear, not a
  // choice — whatever the instruction calls itself. Read as a choice, the Breachers' second armsman
  // became three alternatives capped at one, and a legal list (he carries all three) came out
  // illegal. Eight groups game-wide say it in prose rather than as "Default Wargear".
  it('reads a group of nothing but defaults as the loadout, not as a choice', () => {
    const names = (u, m) => (u.defaults.find(([mi]) => mi === m) || [, []])[1].map(([id]) => rosterItems.items[id])
    const breachers = groupsOf('imperial-agents', 'imperial-navy-breachers')
    expect(names(breachers, 1)).toEqual(expect.arrayContaining(['Navis heavy shotgun', 'Endurant Shield', 'Navis las-volley']))
    expect(breachers.gear.map(textOf)).not.toContain('One other Navis Armsman is equipped with:')
    // …and the swap that names one of those items still knows what it replaces.
    const swap = breachers.gear.find((g) => /las-volley can be replaced/i.test(textOf(g)))
    expect(repNames(swap)).toEqual(['Navis las-volley'])
    // The Tesseract Vault really does have all three Powers of the C’tan.
    const vault = groupsOf('necrons', 'tesseract-vault')
    expect(names(vault, 0)).toEqual(expect.arrayContaining(['Antimatter Meteor', 'Cosmic Fire', 'Time’s Arrow']))
  })

  it('leaves almost nothing unparsed across the corpus', () => {
    // Two leftovers remain, both "X or Y" where the profile holds both alternatives, and both
    // fail-open by design. The number is here so a parser regression shows up as a jump.
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
    expect(missing).toBeLessThanOrEqual(2)
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

  // appdata's base_miniature_loadout arms the Death Company Dreadnought with the BRUTALIS
  // Dreadnought's weapons; its own printed loadout and its own swap instruction both say blood
  // fists. Pinned because the substitution is a named one (LOADOUT_ITEM_FIXES) that has to be
  // dropped the moment upstream fixes the row — this test failing is that signal.
  it('arms the Death Company Dreadnought with its own weapons, not the Brutalis pattern', () => {
    const u = factions.find((f) => f.slug === 'blood-angels').data.units.find((x) => x.id === 'death-company-dreadnought')
    const names = (u.defaults || []).flatMap(([, list]) => list.map(([id]) => rosterItems.items[id]))
    expect(names).toContain('Blood fists')
    expect(names).toContain('Blood fist bolt rifles')
    expect(names.join(', ')).not.toMatch(/Brutalis/)
  })
})

describe('points', () => {
  // appdata records several price rows per datasheet — one per Chapter, one per allied context —
  // and mapping them straight onto `sizes` turned a price list into a size list: two identical
  // "5 models" pills at 80 and 75 points, the cheaper one not even pre-selected. A size is a size.
  it('never offers the same bracket twice at two prices', () => {
    const dupes = []
    for (const { slug, data } of factions) {
      for (const u of data.units) {
        const byBracket = new Map()
        for (const s of u.sizes) {
          const k = `${s.per.join('-')}|${JSON.stringify(s.comp || null)}`
          if (!byBracket.has(k)) byBracket.set(k, new Set())
          byBracket.get(k).add(s.pts)
        }
        for (const [k, pts] of byBracket) {
          if (pts.size > 1) dupes.push(`${slug}/${u.name} ${k} → ${[...pts].join('/')}`)
        }
      }
    }
    expect(dupes, dupes.join('; ')).toEqual([])
  })

  // The whole app prices units from the Munitorum Field Manual (src/data/mfm/*.js, scraped from
  // the live list); the roster used to price them from appdata instead and quoted a different
  // number than the same unit's datasheet page — up to 35 points on Inquisitor Draxus. One source.
  it('agrees with the MFM wherever the MFM prices that unit size', async () => {
    const norm = (s) => (s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim()
    const drift = []
    for (const { slug, data } of factions) {
      let mfm
      try { mfm = (await import(`../mfm/${slug}.js`)).default } catch { continue }
      // Own datasheets only: a Chapter's "Space Marines" section prices the shared pool (see
      // `unitPoints`) and Imperial Agents' "(allied)" one prices them in somebody else's army.
      const own = [
        ...(mfm.subfactions || [])
          .filter((s) => norm(s.name) !== 'space marines' && !/allied/i.test(s.name))
          .flatMap((s) => s.units || []),
        ...(mfm.units || []),
      ]
      const byName = new Map(own.map((u) => [norm(u.name), u]))
      for (const u of data.units) {
        const m = byName.get(norm(u.name))
        if (!m) continue
        for (const s of u.sizes) {
          // A full bracket is priced by its TOP model count ("6-10 models" is the MFM's "10"), and
          // that has to be tried first: appdata writes Flash Gitz' second bracket as "5-10" where it
          // means 6-10, so its bottom end collides with the MFM's own 5-model row.
          const at = (n) => (m.options || []).filter((o) => Number(o.models) === n)
          const rows = at(s.per[1]).length ? at(s.per[1]) : at(s.per[0])
          if (!rows.length) continue
          // The first copy-tax tier is the base price; the surcharge is the unit's own `step`.
          const base = rows.find((r) => !r.note) || rows.find((r) => /^1st/i.test(r.note || '')) || rows[0]
          if (Number(base.points) !== s.pts) drift.push(`${slug}/${u.name} ${s.per.join('-')}: ${s.pts} vs MFM ${base.points}`)
        }
      }
    }
    expect(drift, drift.join('; ')).toEqual([])
  })

  // A shared Codex unit can cost a Chapter something else (Blood Angels' Bladeguard, everyone's
  // Repulsor Executioner). The datasheet layer already carries those as `pointsOverrides`; this is
  // the same fact on the roster side, and the two must not drift apart.
  it('prices a shared unit for the Chapter, matching the datasheet layer', async () => {
    for (const chapter of ['black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'space-wolves']) {
      const { pointsOverrides = {} } = await import(`../datasheets/${chapter}.js`)
      const folded = await loadRosterFaction(chapter)
      for (const [id, rows] of Object.entries(pointsOverrides)) {
        const u = folded.units.find((x) => x.id === id)
        if (!u) continue
        for (const r of rows) {
          if (!r.models || /^(?!1st)/.test(r.note || '') && r.note) continue // later copy-tax tiers ride on `step`
          const size = u.sizes.find((s) => s.per[1] === r.models || s.per[0] === r.models)
          if (size) expect(size.pts, `${chapter}/${id} @${r.models} models`).toBe(r.points)
        }
      }
    }
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

describe('wargear names are unambiguous within a unit', () => {
  // The roster card stamps a weapon row with HOW MANY of it the entry fields (rosterModifiers'
  // loadoutItemCounts). A row is matched to wargear items BY NAME, so that number is only honest
  // while one name means one weapon inside one unit: two same-named items with different profiles
  // would be summed into a single count and printed as though they were one weapon.
  //
  // appdata does publish 316 names carrying more than one profile set (an Ork Boy's Choppa against
  // a Nob's, a 2+ Storm Bolter against a 3+ one), but never twice inside the same datasheet — so
  // today the sum is always one weapon's. This is the tripwire for the release where that changes.
  it('never interns one wargear name to two item ids in the same unit', () => {
    for (const { slug, data } of factions) {
      for (const u of data.units || []) {
        const byName = new Map()
        const add = (id) => {
          const n = rosterItems.items[id]
          if (!n) return
          if (!byName.has(n)) byName.set(n, new Set())
          byName.get(n).add(id)
        }
        for (const [, list] of u.defaults || []) for (const [id] of list) add(id)
        for (const g of u.gear || []) for (const o of g.o || []) for (const [id] of optionItems(o)) add(id)
        for (const [n, ids] of byName) expect([...ids], `${slug}/${u.id} "${n}"`).toHaveLength(1)
      }
    }
  })
})

describe('detachment tags', () => {
  // `unique` bars a second detachment carrying the same tag (core rules 25.04). It reaches the
  // roster layer from the hand-written faction data, cross-checked against mfm and appdata's
  // detachment_unique_keyword by the generator — a tag lost on the way means the editor stops
  // barring an illegal pair, silently.
  // The floor moved 57 → 51 when MFM v1.3 printed "UNIQUE TAG REMOVED" over three tag PAIRS —
  // Chaos Knights' WAR DOGS, Death Guard's FLYBLOWN and ENGINES. Six is the whole of that change;
  // anything lower than 51 is a tag going missing by accident, which is what this floor is for.
  it('carries the tag on every detachment that has one', () => {
    const tagged = factions.flatMap(({ data }) => (data.detachments || []).filter((d) => d.unique))
    expect(tagged.length).toBeGreaterThanOrEqual(51)
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

// ── Allies ──
// The allied contexts (gen-roster-data.mjs's Allies section). What matters structurally is that
// every id in a group resolves to a real unit — namespaced ones in the source bundle they name,
// bare ones in this faction's own file — since a group that names nothing would silently offer an
// empty section and cost nothing to a list that used it.
describe('allies', () => {
  const bySlug = new Map(factions.map((f) => [f.slug, f.data]))
  const withAllies = factions.filter((f) => f.data.allies?.length)

  it('reaches the armies that can take one', () => {
    expect(withAllies.length).toBeGreaterThan(15)
    for (const chapter of ['dark-angels', 'space-marines', 'adeptus-custodes']) {
      expect(bySlug.get(chapter).allies.map((g) => g.key)).toContain('agents-of-the-imperium')
    }
  })

  it('resolves every unit a group names', () => {
    for (const { slug, data } of withAllies) {
      for (const g of data.allies) {
        expect([slug, g.key, g.ids.length > 0]).toEqual([slug, g.key, true])
        for (const id of g.ids) {
          const at = id.indexOf(':')
          const src = at < 0 ? data : bySlug.get(id.slice(0, at))
          const unitId = at < 0 ? id : id.slice(at + 1)
          expect([slug, g.key, id, !!src?.units.some((u) => u.id === unitId)]).toEqual([slug, g.key, id, true])
        }
      }
    }
  })

  // Limits are tabulated per battle size and must use the ids core.js does, or a cap silently
  // never applies.
  // Two rules can offer one army the same allied faction: Deathwatch is given the general Agents
  // of the Imperium list (written for ADEPTUS ASTARTES) and its own, which is that list minus the
  // five Deathwatch datasheets its own bundle already carries. The rule written FOR this army wins,
  // or the group would also appear twice on screen.
  it('keeps one rule per group — the one written closest to this army', () => {
    for (const { slug, data } of withAllies) {
      const keys = data.allies.map((g) => g.key)
      expect([slug, keys.length]).toEqual([slug, new Set(keys).size])
    }
    const dw = bySlug.get('deathwatch').allies.find((g) => g.key === 'agents-of-the-imperium')
    expect(dw.ids).not.toContain('imperial-agents:watch-master')     // Deathwatch has its own
    expect(bySlug.get('space-marines').allies.find((g) => g.key === 'agents-of-the-imperium').ids)
      .toContain('imperial-agents:watch-master')
  })

  it('keys every limit by a real battle size', () => {
    const sizes = new Set(rosterCore.battleSizes.map((b) => b.id))
    for (const { data } of withAllies) {
      for (const g of data.allies) {
        for (const size of Object.keys(g.pts || {})) expect(sizes.has(size)).toBe(true)
        for (const bySize of Object.values(g.lim || {})) {
          for (const size of Object.keys(bySize)) expect(sizes.has(size)).toBe(true)
        }
      }
    }
  })

  // The MFM prints a second, dearer list for Agents of the Imperium — what those units cost in
  // somebody else's army. Their own bundle keeps the cheaper one.
  it('prices an allied unit off the allied list', async () => {
    const custodes = await loadRosterFaction('adeptus-custodes', { allies: true })
    const agents = await loadRosterFaction('imperial-agents')
    expect(custodes.units.find((u) => u.id === 'imperial-agents:inquisitor-draxus').sizes[0].pts).toBe(110)
    expect(agents.units.find((u) => u.id === 'inquisitor-draxus').sizes[0].pts).toBe(75)
  })

  // Merging must not collide with the army's own datasheets — the reason ids are namespaced at
  // all is that Astra Militarum and Imperial Agents each have a Ministorum Priest.
  it('merges without shadowing a unit the army already has', async () => {
    const am = await loadRosterFaction('astra-militarum', { allies: true })
    const ids = am.units.map((u) => u.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).toContain('ministorum-priest')
    expect(ids).toContain('imperial-agents:ministorum-priest')
  })

  it('leaves the units out until they are asked for', async () => {
    const plain = await loadRosterFaction('adeptus-custodes')
    expect(plain.units.some((u) => u.id.includes(':'))).toBe(false)
  })
})

// The default loadout appdata keeps in two tables that can disagree — the per-model `base_
// miniature_loadout` row and the per-profile "Default Wargear" group. Where the row is short, the
// group fills it in; a quantity that belongs to the PROFILE rather than to each of its models
// carries a third element so nothing multiplies it out.
describe('default loadouts merged from the Default Wargear group', () => {
  it('gives the Gun Servitors the weapons their loadout row leaves out', async () => {
    const admech = await loadRosterFaction('adeptus-mechanicus')
    const clade = admech.units.find((u) => u.id === 'servitor-battleclade')
    const gun = clade.minis.findIndex((m) => m.n === 'Gun Servitor')
    const list = clade.defaults.find(([m]) => m === gun)[1]
    const named = list.map(([id]) => rosterItems.items[id])
    expect(named).toEqual(expect.arrayContaining(['Heavy arc rifle', 'Heavy bolter', 'Servo-claw']))
    // One heavy bolter for the two models, not one each.
    for (const [id, c, total] of list) {
      if (rosterItems.items[id] === 'Heavy bolter') expect([c, total]).toEqual([1, 1])
      if (rosterItems.items[id] === 'Servo-claw') expect(total).toBeUndefined()
    }
  })

  it('gives an Archon its Shadowfield', async () => {
    const drukhari = await loadRosterFaction('drukhari')
    const archon = drukhari.units.find((u) => u.id === 'archon')
    expect(archon.defaults.flatMap(([, l]) => l.map(([id]) => rosterItems.items[id]))).toContain('Shadowfield')
  })
})

// A datasheet that names the units it can join by KEYWORD rather than by name keeps those keywords,
// because a resolved id cannot travel: Draxus leads "any IMPERIUM BATTLELINE INFANTRY unit", and as
// an ally she joins units her own bundle has never heard of.
describe('keyword-defined attachments', () => {
  it('keeps the keywords beside the ids the generator could resolve', async () => {
    const agents = await loadRosterFaction('imperial-agents')
    const draxus = agents.units.find((u) => u.id === 'inquisitor-draxus')
    expect(draxus.leadKw).toEqual([{ kw: ['Imperium', 'Battleline', 'Infantry'], type: 'leader' }])
    expect(draxus.leads.length).toBeGreaterThan(0)
  })
})

// A detachment can bar a datasheet that belongs to ANOTHER faction, and the id has to say so.
// Black Spear Task Force bars the Codex: Imperial Agents Watch Master — the ally you would
// otherwise bring alongside your own — not the Index: Deathwatch datasheet the army is built
// around. Resolving the exclusion by NAME made those the same unit, and every Deathwatch list with
// a Watch Master in it read as illegal.
describe('detachment exclusions across factions', () => {
  it('bars the allied copy, not the army’s own datasheet', async () => {
    const dw = await loadRosterFaction('deathwatch', { allies: true })
    const det = dw.detachments.find((d) => d.name === 'Black Spear Task Force')
    expect(det.excludedUnits).toContain('imperial-agents:watch-master')
    expect(det.excludedUnits).not.toContain('watch-master')
    expect(dw.units.some((u) => u.id === 'watch-master')).toBe(true)
  })

  it('still bars a unit of this army’s own pool by its bare id', async () => {
    const dw = await loadRosterFaction('deathwatch')
    const det = dw.detachments.find((d) => d.name === 'Black Spear Task Force')
    // The Codex: Space Marines squads a Chapter folds in are this bundle's own units.
    expect(det.excludedUnits).toEqual(expect.arrayContaining(['tactical-squad', 'devastator-squad']))
  })
})

// An attachment appdata states in prose and in no table: the Ogryn Bodyguard and Nork Deddog "must
// join one COMMAND SQUAD unit from your army" and have no bodyguard group of any kind, so as
// generated they could join nothing at all (PROSE_ATTACH in the generator).
describe('an attachment appdata states only in prose', () => {
  it('lets a Loyal Protector join the Command Squads it belongs to', async () => {
    const am = await loadRosterFaction('astra-militarum')
    for (const id of ['ogryn-bodyguard', 'nork-deddog']) {
      const unit = am.units.find((u) => u.id === id)
      expect(unit.leadKw).toEqual([{ kw: ['Command Squad'], type: 'support' }])
      expect(unit.leads.map((l) => l.to)).toContain('cadian-command-squad')
      // `support`, so the squad's own Leader slot — it leads Cadian Shock Troops itself — is free.
      expect(unit.leads.every((l) => l.type === 'support')).toBe(true)
    }
  })
})

// "If a CHARACTER unit from your army with the Leader ability can be attached to a BOYZ unit, it
// can be attached to this unit instead" — 33 datasheets carry a rule of that shape, and appdata
// writes most (not all) of the resulting links into its own tables (MIRROR_ATTACH in the generator).
describe('an attachment one unit borrows from another', () => {
  it('gives a leader the mirrored unit at the type it already had', async () => {
    const orks = await loadRosterFaction('orks')
    const mek = orks.units.find((u) => u.id === 'mek')
    const viaBoyz = mek.leads.find((l) => l.to === 'boyz')
    expect(mek.leads.find((l) => l.to === 'breaka-boyz')).toEqual({ to: 'breaka-boyz', type: viaBoyz.type })
  })

  // The clause before "can be attached to" is a restriction, and it is kept: Victrix Honour Guard
  // borrows the Company Heroes attachment for a CAPTAIN or CHAPTER MASTER, and the Lieutenant —
  // who leads Company Heroes as well, but is neither — does not get it.
  it('keeps the restriction the rule states', async () => {
    const sm = await loadRosterFaction('space-marines')
    const leads = (id) => (sm.units.find((u) => u.id === id)?.leads || []).map((l) => l.to)
    expect(leads('pedro-kantor')).toEqual(expect.arrayContaining(['company-heroes', 'victrix-honour-guard']))
    expect(leads('lieutenant')).toContain('company-heroes')
    expect(leads('lieutenant')).not.toContain('victrix-honour-guard')
  })
})


// Wargear that costs points and is already on the model: appdata prices it (`points` on an option
// it also marks `defaultValue`) and the Munitorum bracket does not include it, so it has to be
// charged on top — see defaultWargearPoints in rosterEngine.js.
describe('a default loadout that costs points', () => {
  it('prices a Terminator Assault Squad the way GW\'s own export does', async () => {
    const sm = await loadRosterFaction('space-marines')
    const unit = sm.units.find((u) => u.id === 'terminator-assault-squad')
    expect(unit.dw).toEqual([[0, 5], [1, 5]])       // thunder hammer, +5 on either profile
    expect(unit.sizes[1].pts).toBe(310)             // the bracket stays the Munitorum's
    expect(unitPoints(unit, { size: 1, count: 10 })).toBe(360)
    // …and the group that trades the hammer away knows what it hands back.
    expect(unit.gear.find((g) => g.dr)?.dr).toBe(5)
    expect(unitPoints(unit, { size: 1, count: 10, wg: [[unit.gear.findIndex((g) => g.dr), 0, 10]] })).toBe(310)
  })

  it('is confined to the datasheets appdata prices that way', async () => {
    const seen = []
    for (const { slug, data } of factions) for (const u of data.units || []) if (u.dw) seen.push(`${slug}/${u.id}`)
    expect(seen.sort()).toEqual([
      'adeptus-custodes/venatari-custodians',
      // v1.3 dropped the Leman Russ bracket ~25pts and started charging 5 for the hull weapon
      // the tank starts with — eight variants, same shape as the Terminator hammer above.
      'astra-militarum/leman-russ-battle-tank',
      'astra-militarum/leman-russ-commander',
      'astra-militarum/leman-russ-demolisher',
      'astra-militarum/leman-russ-eradicator',
      'astra-militarum/leman-russ-executioner',
      'astra-militarum/leman-russ-exterminator',
      'astra-militarum/leman-russ-punisher',
      'astra-militarum/leman-russ-vanquisher',
      'drukhari/ravager',
      'genestealer-cults/achilles-ridgerunners',
      'space-marines/terminator-assault-squad',
      'space-marines/victrix-honour-guard',
      'tau-empire/crisis-fireknife-battlesuits',
      'tau-empire/crisis-starscythe-battlesuits',
    ])
  })

  // A "Default Wargear" group counts the copies the whole profile fields where a loadout row
  // counts one model's; the Starscythe's two Shas'ui carry one T'au flamer each, not two.
  it('divides a profile-total count among its models', async () => {
    const tau = await loadRosterFaction('tau-empire')
    const unit = tau.units.find((u) => u.id === 'crisis-starscythe-battlesuits')
    expect(unit.dw).toEqual([[0, 5], [1, 5]])
    expect(unitPoints(unit, { size: 0 })).toBe(115) // 100 + three flamers
    // …and the loadout reads per model everywhere, which is what the datasheet says: "Every model
    // is equipped with: burst cannon; T'au flamer; battlesuit fists."
    const lines = defaultLoadoutLines(unit, rosterItems.items, { size: 0 })
    expect(lines.find((l) => /Shas’ui/.test(l.mini)).items).toBe('Burst cannon, T’au flamer, Battlesuit fists')
  })
})

describe('an allowance the instruction states without naming a number', () => {
  const gearOf = (slug, id) => factions.find((f) => f.slug === slug).data.units.find((u) => u.id === id).gear
  const headOf = (g) => (rosterItems.texts[g.t] || '').split('\n')[0]

  // "This model can be equipped with any of the following:" — the list IS the number, one of
  // each. Without it the group had no cap at all, and the conservative fallback (one pick per
  // model) called a Battlewagon with both a grabbin' klaw and a wreckin' ball illegal.
  it('reads "any of the following" as one of each option', () => {
    const gear = gearOf('orks', 'battlewagon')
    const gi = gear.findIndex((g) => /any of the following/i.test(headOf(g)))
    expect(gear[gi].o.length).toBe(3)
    expect(wargearGroupCap({ gear }, {}, gi)).toEqual({ limit: 3, dup: 1 })
  })

  // "…can be replaced with two different weapons from the following list" — the Sergeant gives up
  // both his bolt pistol and his boltgun, so it is two picks, never the same weapon twice.
  it('reads "two different weapons from the following list" as two picks', () => {
    for (const id of ['devastator-squad', 'tactical-squad']) {
      const gear = gearOf('space-marines', id)
      const gi = gear.findIndex((g) => /different weapons from the following list/i.test(headOf(g)))
      expect(wargearGroupCap({ gear }, {}, gi)).toEqual({ limit: 2, dup: 1 })
    }
  })

  // "For every 5 models in this unit, up to 2 Paladins can each have their storm bolter replaced
  // with one of the following" — a step table, not one number, which is why the flat reader
  // refuses it and the generator reads it into `lim`'s own shape.
  it('reads "for every N models, up to M" as one row per threshold', () => {
    const gear = gearOf('grey-knights', 'paladin-squad')
    const gi = gear.findIndex((g) => /for every 5 models/i.test(headOf(g)))
    expect(gear[gi].lim).toEqual([[5, 2], [10, 4]])
    expect(wargearGroupCap({ gear, sizes: [{ per: [5, 5] }] }, { count: 5 }, gi)).toEqual({ limit: 2, dup: 0 })
    expect(wargearGroupCap({ gear, sizes: [{ per: [10, 10] }] }, { count: 10 }, gi)).toEqual({ limit: 4, dup: 0 })
  })
})

// THE GUARDRAIL for the rule above. A group whose instruction states its allowance and carries no
// `lim` falls through to the editor, which reads only the "for every 5" half of the sentence and
// applies it to each option separately — so a wording change in appdata, or a regression in the
// generator, would quietly hand a squad a different number of special weapons. 15 groups were in
// exactly that state until 2026-08-27.
//
// A bare "For every 5 models in this unit:" over a bullet list is deliberately NOT one of these
// (hence the comma in the pattern, which is the generator's own): its bullets are separate
// allowances, one per weapon named, and a single shared table would cap the pair at what one of
// them is worth. Two groups are in that shape — Red Corsairs Raiders and Wracks.
describe('every scaled allowance the corpus states is in the data', () => {
  it('leaves no "for every N models, up to M" group uncapped', () => {
    const uncapped = []
    for (const { slug, data } of factions) {
      for (const u of data.units || []) {
        for (const g of u.gear || []) {
          const head = (rosterItems.texts[g.t] || '').split('\n')[0]
          if (!/for every (\d+) models? in (?:this|the) unit,\s*(?:up to )?(\d+|one|two|three|four|five)\b/i.test(head)) continue
          if (!g.lim?.length) uncapped.push(`${slug}/${u.id}: ${head.slice(0, 80)}`)
        }
      }
    }
    expect(uncapped).toEqual([])
  })
})

// A swap that hands over two items at once is one option, and the generator reads the pairing out
// of the group's own instruction. The instruction is typed by hand and can misspell an item its
// own wargear row spells right, which used to split the pair into two independent options — a
// model could then take half of it, and (where the swap refunds points) each half claimed the
// refund: six Venatari Custodians came out at 320 where the army apps print 325.
describe('a pair whose instruction misspells one of its items', () => {
  const unitOf = (slug, id) => factions.find((f) => f.slug === slug).data.units.find((u) => u.id === id)

  // "…replaced with 1 kinetic destroyer and 1 tarsus buckler" — the item is the Tarsis buckler.
  it('pairs the Venatari lance swap and prices it once', () => {
    const unit = unitOf('adeptus-custodes', 'venatari-custodians')
    expect(unit.gear).toHaveLength(1)
    expect(unit.gear[0].o).toHaveLength(1)
    expect(optionLabel(unit.gear[0].o[0], rosterItems.items)).toBe('Kinetic destroyer + Tarsis buckler')
    // 300 for the 4-6 bracket, six lances at 5 apiece, minus the one lance handed back.
    expect(unitPoints(unit, { size: 1, count: 6, wg: [[0, 0, 1]] })).toBe(325)
  })

  // "…replaced with 1 oppressor cannon and 1 co-axial autocannon" — the item is the Coaxial
  // autocannon. Nothing is priced here; what was wrong is that the cannon could be taken alone.
  it('pairs the Rogal Dorn turret swap', () => {
    const unit = unitOf('astra-militarum', 'rogal-dorn-battle-tank')
    const g = unit.gear.find((x) => optionItems(x.o[0]).length > 1)
    expect(g.o).toHaveLength(1)
    expect(optionLabel(g.o[0], rosterItems.items)).toBe('Oppressor cannon + Coaxial autocannon')
  })
})

describe('a pair whose instruction spells an item with a U+2010 hyphen', () => {
  const unitOf = (slug, id) => factions.find((f) => f.slug === slug).data.units.find((u) => u.id === id)
  const textOf = (g) => rosterItems.texts[g.t] || ''

  // "…can be replaced with one of the following: ◦ 1 hot-shot laspistol and 1 medi-pack ◦ 1 hot‐shot
  // lasgun, 1 hot‐shot laspistol and 1 medi‐pack" — the second bullet is typed with U+2010 hyphens
  // and every item it names is stored with a plain one. Read literally it resolved nothing, so the
  // whole group stayed unbundled: three loose options under a cap of one pick, which made the medi-
  // pack Scion every army app prints illegal on import.
  it('bundles both readings of the Tempestus medi-pack bullet', () => {
    const g = unitOf('astra-militarum', 'militarum-tempestus-command-squad').gear
      .find((x) => /medi‐pack/.test(textOf(x)))
    expect(g.o.map((o) => optionLabel(o, rosterItems.items))).toEqual([
      'Hot-shot laspistol + Medi-pack',
      'Hot-shot lasgun + Hot-shot laspistol + Medi-pack',
    ])
    expect(g.lim).toEqual([[0, 1]])
  })

  // Same hyphen, and here the pairing is the whole group: one option, not two.
  it('bundles the Steeljack Theyn swap', () => {
    const g = unitOf('leagues-of-votann', 'ironkin-steeljacks-with-heavy-volkanite-disintegrators')
      .gear.find((x) => /Autoch‑pattern bolter/.test(textOf(x)))
    expect(g.o).toHaveLength(1)
    expect(optionLabel(g.o[0], rosterItems.items)).toBe('Autoch-pattern bolter + Plasma sword')
  })

  // Two identical options are what makes a limited-choice set ambiguous, so folding the pair also
  // let the "for every 5 models, 1 model" cap appdata records for it find its group at last.
  it('pairs the Deathwatch Veterans stalker swap and picks up its cap', () => {
    const g = unitOf('deathwatch', 'deathwatch-veterans').gear
      .find((x) => /stalker‐pattern boltgun/.test(textOf(x)))
    expect(g.o).toHaveLength(1)
    expect(optionLabel(g.o[0], rosterItems.items)).toBe('Stalker-pattern boltgun + Close combat weapon')
    expect(g.lim).toEqual([[5, 1], [10, 2]])
  })

  // The same sentence can state a COUNT rather than a pair — "replaced with 2 hot‐shot laspistols"
  // is one option granting two of one item, and it reads through the hyphen the same way.
  it('counts the two laspistols an Aquilon gives up its lascarbine for', () => {
    const g = unitOf('astra-militarum', 'tempestus-aquilons').gear
      .find((x) => /2 hot‐shot laspistols/.test(textOf(x)))
    expect(optionItems(g.o[0])).toEqual([[optionItems(g.o[0])[0][0], 2]])
    expect(optionLabel(g.o[0], rosterItems.items)).toBe('2× Hot-shot laspistol')
  })
})
