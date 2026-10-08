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
import { enhEligible, enhOptionsFor, allyGroupsFor, allySourceOf, leadTypeFor, hostSlotTaken, optionItems, optionLabel, unitWargearPoints, unitPoints, modelsPerMini, defaultLoadoutLines, wargearGroupCap, wargearGroupLive, bucketOf, grantedKeywordsFor, swapRoom } from '../../composables/rosterEngine.js'
import { duplicateLimit, validateRoster } from '../../composables/rosterValidation.js'
import conditionalKeywords from '../conditionalKeywords.json'
import { loadoutItemCounts } from '../../composables/rosterModifiers.js'
import { PACK_ERRATA } from '../../../scripts/lib/pack-roster.mjs'
import { KEEP_RE } from '../../../scripts/lib/keepClause.mjs'
import { CHARACTER_GRANTS } from '../../../scripts/lib/character-grants.mjs'

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

describe('allied units', () => {
  // An ally's id is namespaced on load; its `leads` must be too, or every allied Leader is
  // offered no bodyguard (a player's report, 2026-10-01 — Artemis in a Grey Knights list).
  it('point their Leader attachments at the namespaced ids they are listed under', async () => {
    const gk = await loadRosterFaction('grey-knights', { allies: true })
    const defOf = (id) => gk.units.find((u) => u.id === id)
    const artemis = defOf('imperial-agents:watch-captain-artemis')
    expect(leadTypeFor(artemis, { uid: 'a' }, defOf('imperial-agents:aquila-kill-team'))).toBe('leader')
  })

  // The MFM's allied list prints Inquisitorial Agents at 6 and 12 models; appdata also prices
  // 7-11, 120 as allies. Until 2026-10-03 that size kept the Agents' own 100.
  it('take the allied price of a size the MFM does not print from appdata', async () => {
    const am = await loadRosterFaction('astra-militarum', { allies: true })
    const ally = am.units.find((u) => u.id === 'imperial-agents:inquisitorial-agents')
    expect(ally.sizes.map((s) => [s.per.join('-'), s.pts])).toEqual([['6-6', 60], ['7-11', 120], ['12-12', 120]])
    const own = (await loadRosterFaction('imperial-agents')).units.find((u) => u.id === 'inquisitorial-agents')
    expect(own.sizes.map((s) => s.pts)).toEqual([50, 100, 100])
  })

  // "For each INQUISITOR unit you include, one INQUISITORIAL AGENTS unit does not count towards the
  // RETINUE units your army can include" (and Voidfarers characters for Voidsmen-at-Arms) — the
  // slotless rows of allied_faction_keyword. Read since 2026-10-03.
  it('let an Inquisitor free one Inquisitorial Agents unit from the Retinue cap', async () => {
    const am = await loadRosterFaction('astra-militarum', { allies: true })
    const u = (k, id) => ({ uid: k, id: `imperial-agents:${id}`, size: 0 })
    const retinue = (extra) => validateRoster({
      faction: 'astra-militarum', detachments: [am.detachments[0].name], battleSize: 'strike-force',
      units: [{ uid: 'c', id: 'cadian-command-squad', size: 0, warlord: true }, ...extra],
    }, { faction: am, core: rosterCore, items: rosterItems.items }).issues.filter((i) => i.code === 'allyOverLimit')
    const squads = [u('b', 'inquisitorial-agents'), u('d', 'exaction-squad'), u('e', 'vigilant-squad')]
    expect(retinue(squads)).toHaveLength(1)
    expect(retinue([u('a', 'inquisitor'), ...squads])).toEqual([])
    expect(retinue([u('a', 'navigator'), u('v', 'voidsmen-at-arms'), u('d', 'exaction-squad'), u('e', 'vigilant-squad')])).toEqual([])
  })

  it('never name a bare target from another bundle, in any army', async () => {
    for (const { slug } of factions) {
      const data = await loadRosterFaction(slug, { allies: true })
      for (const u of data?.units || []) {
        const src = allySourceOf(u.id)?.[0]
        if (!src) continue
        for (const l of u.leads || []) expect(l.to.startsWith(`${src}:`), `${slug}: ${u.id} → ${l.to}`).toBe(true)
      }
    }
  })
})

// appdata requires a "DNU" (do not use) placeholder keyword on the four Extremis enhancements of
// Veiled Blade Elimination Force; the generator names the one Assassin each belongs to. Eversor and
// Vindicare were missing until 2026-10-03 — nobody could take them, and those two Assassins played
// 15 and 20 points too cheap there.
describe('Veiled Blade Elimination Force', () => {
  it('gives each Extremis enhancement to its one Assassin, mandatory', async () => {
    const ia = await loadRosterFaction('imperial-agents')
    const det = ia.detachments.find((d) => d.name === 'Veiled Blade Elimination Force')
    const holder = Object.fromEntries(det.enhancements.map((e) => [e.name, e.req?.[0]?.kw?.[0]]))
    expect(holder).toEqual({
      'Decoy Targets': 'Callidus Assassin',
      'Esoteric Explosives': 'Culexus Assassin',
      'Intraneural Biotech': 'Eversor Assassin',
      'Micromelta Rounds': 'Vindicare Assassin',
    })
    expect(det.enhancements.every((e) => e.mandatory)).toBe(true)
  })
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
            // eligibility, when present, is OR-groups of faction-keywords / keywords / one datasheet
            if (e.req) for (const g of e.req) expect((g.fac?.length || 0) + (g.kw?.length || 0) + (g.ds ? 1 : 0)).toBeGreaterThan(0)
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

  it('records both as alternatives when the profile holds both of "X or Y"', () => {
    // Two Havocs carry the autocannon and two the lascannon, so the profile holds both and the
    // sentence cannot be pinned to one. Left without a `rep` until 2026-10-03, the swap gave up
    // nothing and four heavy bolters sat beside four heavy weapons (a player's report); `alt` has
    // the engine spend each pick on one of the two.
    const u = groupsOf('chaos-space-marines', 'havocs')
    const g = u.gear.find((x) => /Havoc autocannon or Havoc lascannon/i.test(textOf(x)))
    expect(repNames(g)).toEqual(['Havoc autocannon', 'Havoc lascannon'])
    expect(g.alt).toBe(1)
    // …and the profile's loadout is two of each, not an autocannon on every model.
    const havoc = u.defaults.find(([m]) => m === 1)[1].map(([i, c, total]) => [rosterItems.items[i], c, total])
    expect(havoc).toContainEqual(['Havoc autocannon', 2, 1])
    expect(havoc).toContainEqual(['Havoc lascannon', 2, 1])
  })

  it('splits a group whose bullets each give up a different weapon', () => {
    // "For every 5 models: ◦ 1 Raider's boltgun → 1 meltagun ◦ 1 Raider's reaver's blade → 1 power
    // fist" was one group, and both options gave up the boltgun — ten reaver's blades stayed on the
    // card beside the power fists (a player's report, 2026-10-04). One group per bullet now, each
    // with its own weapon given up and its own 1-per-5 allowance.
    const u = groupsOf('chaos-space-marines', 'red-corsairs-raiders')
    const melta = u.gear.find((x) => /boltgun can be replaced with 1 meltagun/i.test(textOf(x)))
    const fist = u.gear.find((x) => /reaver’s blade can be replaced with 1 power fist/i.test(textOf(x)))
    expect(repNames(melta)).toEqual(['Boltgun'])
    expect(repNames(fist)).toEqual(['Reaver’s blade'])
    expect(melta.o).toHaveLength(1)
    expect(fist.o).toHaveLength(1)
    expect(fist.lim).toEqual([[5, 1], [10, 2]])
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

  // "reads a name appdata spells two ways across its own tables" — gen-roster-data still reads a
  // one-character typo ("absolver" for "Absolvor") and a moved hyphen ("kustom-mega blasta" for
  // "Kustom mega-blasta"), but no instruction in the corpus needs either any more: Codex: Orks
  // rewrote the Big Mek's, and Codex: Space Marines (app data 963) rewrote the Execrator's to
  // name "Absolvor Bolt Pistol" exactly as the item table does. Every replaced item now matches
  // its prose up to case and hyphen glyph, so there is nothing left to pin; the case is
  // untested rather than pinned to an example that no longer exists.

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
    const names = (u, m) => (u.defaults.find(([mi]) => mi === m) || [undefined, []])[1].map(([id]) => rosterItems.items[id])
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

  it('spends a unit-wide swap on the unit, on every datasheet that has one', () => {
    // A bullet appdata records once per miniature profile is folded into ONE unit-wide group
    // (`all`) — 81 of them, on the most-fielded squads in the game (Chosen, every Terminator
    // squad, Nobz, Scouts, Bullgryns). Until 2026-08-28 nothing spent them: the swap added the new
    // weapon and left every copy of the old one on the card, the loadout block and the export.
    // Which profile gives the item up is a display convention (see swapsByMini); that the UNIT
    // holds one fewer is not, and this is what pins it.
    const silent = []
    let checked = 0
    let unknown = 0
    for (const { slug, data } of factions) {
      for (const u of data.units || []) {
        for (const [gi, g] of (u.gear || []).entries()) {
          if (!g.all || !g.rep?.length) continue
          const si = Math.max(0, u.sizes.findIndex((x) => x.default))
          const entry = { unitId: u.id, size: si, count: u.sizes[si].per[0] }
          if (!wargearGroupLive(u, { ...entry, wg: [[gi, 0, 1]] }, gi)) continue
          const before = loadoutItemCounts(u, entry)
          const after = loadoutItemCounts(u, { ...entry, wg: [[gi, 0, 1]] })
          // An option may hand part of what it replaces straight back — a Deathwatch Veteran keeps
          // his boltgun and gains an Astartes shield — so the swap is checked NET, not as a
          // subtraction: one model's worth off, plus whatever this option grants of that item.
          const back = new Map(optionItems(g.o[0]))
          for (const id of g.rep) {
            const was = before?.get(id)
            if (was == null) { unknown++; continue } // a bracket that leaves two profiles free
            checked++
            const want = was - 1 + (back.get(id) || 0)
            if ((after.get(id) ?? 0) !== want) silent.push(`${slug} ${u.name}: ${rosterItems.items[id]}`)
          }
        }
      }
    }
    expect(silent).toEqual([])
    // 78 since Codex: Space Marines (app data 963) retired some sixty datasheets in each of the six
    // Astartes bundles — Tactical, Devastator and Assault Squads among them. Was a floor of 80.
    expect(checked).toBeGreaterThan(75)
    // The Deathwatch kill teams: two open-ended profiles, so no count is knowable either way.
    expect(unknown).toBeLessThanOrEqual(28)
  })

  it('leaves almost nothing unparsed across the corpus', () => {
    // Two leftovers remain, both "X or Y" where the profile holds both alternatives, and both
    // fail-open by design. The number is here so a parser regression shows up as a jump.
    // The Faction Pack Legends (no appdata `sid`) are counted apart: their 12 are CHAINED swaps
    // — "bolt pistol" on Death Company Marines with Boltguns, who only gain one through an
    // earlier swap — and the pack's own misprints (Secutarii Peltasts' "arc lance"), which no
    // reader of the printed loadout can resolve.
    let withReplaced = 0
    let missing = 0
    let packMissing = 0
    for (const { data } of factions) {
      for (const u of data.units || []) {
        for (const g of u.gear || []) {
          if (!/replaced with/i.test(rosterItems.texts[g.t] || '')) continue
          if (!u.sid) { if (!g.rep?.length) packMissing++; continue }
          withReplaced++
          if (!g.rep?.length) missing++
        }
      }
    }
    expect(withReplaced).toBeGreaterThan(800)
    expect(missing).toBeLessThanOrEqual(2)
    expect(packMissing).toBeLessThanOrEqual(12)
  })
})

describe('kept-item locks', () => {
  // "(this model's storm bolter cannot be replaced)" is the stock rule's `keep`: the model still
  // carries the item and no other group may take it. Both readers have to read it — the Faction
  // Pack one did not, and three Legends sheets let a cyclone Terminator trade the storm bolter he
  // was told to keep (a player's report, 2026-10-08; keepClause.mjs). "This weapon cannot be
  // replaced" names no item the model started with and has no lock to carry.
  it('every group that tells a model to keep an item carries the lock', () => {
    const missing = []
    for (const { slug, data } of factions) {
      for (const u of data.units || []) {
        for (const g of u.gear || []) {
          const text = rosterItems.texts[g.t] || ''
          if ([...text.matchAll(KEEP_RE)].length && !g.keep?.length) missing.push(`${slug}/${u.id}`)
        }
      }
    }
    expect(missing).toEqual([])
  })
})

describe('an option that needs an item only another option brings', () => {
  // "If the Helliarch is equipped with 1 splinter pistol, it can be equipped with 1 hellglaive" —
  // the pistol comes only with the hellglaive's swap, so the second hellglaive waits for it.
  const unit = (slug, id) => factions.find((f) => f.slug === slug).data.units.find((u) => u.id === id)
  const groupNamed = (u, name) => u.gear.findIndex((g) => g.o.length === 1 && rosterItems.items[g.o[0][0]] === name)
  it.each([
    ['drukhari', 'hellions', 'Hellglaive'],
    ['imperial-agents', 'inquisitor', 'Force weapon'],
    ['space-marines', 'lieutenant', 'Storm Shield'],
  ])('%s %s: %s is closed until the swap that brings the item', (slug, id, name) => {
    const u = unit(slug, id)
    const gi = groupNamed(u, name)
    expect(gi).toBeGreaterThanOrEqual(0)
    const [sib, active] = u.gear[gi].cond
    expect(active).toBe(1)
    expect(wargearGroupLive(u, { size: 0, wg: [] }, gi)).toBe(false)
    expect(wargearGroupLive(u, { size: 0, wg: [[sib, 0, 1]] }, gi)).toBe(true)
  })
})

describe('default loadouts', () => {
  // 144 datasheets carry no base_miniature_loadout row; for 136 the starting gear is a
  // "Default Wargear" option group instead. Reading only the loadout table left those units with
  // no default loadout at all — nothing to print, and nothing for the overlay to subtract from.
  it('reads a Default Wargear group when the loadout table has no row', () => {
    // Codex: Space Marines (app data 963) names its items in Title Case, with a plain hyphen.
    const u = factions.find((f) => f.slug === 'blood-angels').data.units.find((x) => x.id === 'blood-angels-captain')
    // Sorted: the order is appdata's (972 swapped the two), not the rule this pins.
    expect((u.defaults || []).flatMap(([, list]) => list.map(([id]) => rosterItems.items[id])).sort())
      .toEqual(['Heavy Bolt Pistol', 'Master-crafted Chainsword'])
  })

  it('leaves only genuinely unarmed units without one', () => {
    const without = factions.flatMap(({ slug, data }) => (data.units || [])
      .filter((u) => !u.defaults?.length).map((u) => `${slug}/${u.id}`))
    expect(without.length, without.join(', ')).toBeLessThanOrEqual(10)
  })

  // A per-model count above one must be one the datasheet PRINTS ("2 phosphor pistols", "2
  // macro-scalpels"). A profile total read as a per-model count gets multiplied by the models a
  // second time, and nothing else notices: five Flash Gitz read "Choppa ×17", ten Tempestus
  // Aquilons "Close combat weapon ×66" (fixed 2026-09-28 — a profile the loadout rows skip took
  // its "Default Wargear" group's totals raw). A `total` entry (third element) is the profile's
  // and is not checked here.
  it('only counts more than one of an item per model where the datasheet prints that number', async () => {
    const norm = (s) => (s || '').toLowerCase().replace(/\*\*/g, '').replace(/\([^)]*\)/g, '')
      .replace(/[’‘]/g, "'").replace(/[‐-―]/g, '-').replace(/\s+/g, ' ').trim()
    const WORDS = { 2: 'two', 3: 'three', 4: 'four' }
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const bad = []
    let checked = 0
    for (const { slug, data } of factions) {
      let sheets
      try { sheets = (await import(`../datasheets/${slug}.js`)).default } catch { continue }
      const byId = new Map((sheets || []).map((s) => [s.id, s]))
      for (const u of data.units) {
        const sheet = byId.get(u.id)
        if (!sheet?.loadout) continue
        const prose = norm(sheet.loadout)
        for (const [, list] of u.defaults || []) {
          for (const [id, c, total] of list) {
            if (total || c < 2) continue
            checked++
            // The stem, so the prose's plural reads too ("anvillus defence batteries").
            const name = norm(rosterItems.items[id])
            const stem = name.length > 6 ? name.slice(0, -2) : name
            if (!new RegExp(`(?:${c}|${WORDS[c] || c}) ${esc(stem)}`).test(prose)) {
              bad.push(`${slug}/${u.id}: ${rosterItems.items[id]} ×${c} per model`)
            }
          }
        }
      }
    }
    // 199 since Codex: Space Marines (app data 963) retired some sixty datasheets per Astartes
    // bundle. Was a floor of 200.
    expect(checked).toBeGreaterThan(195)
    expect(bad, bad.join('; ')).toEqual([])
  })

  // appdata's base_miniature_loadout arms the Death Company Dreadnought with the BRUTALIS
  // Dreadnought's weapons; its own printed loadout and its own swap instruction both say blood
  // fists. Pinned because the substitution is a named one (LOADOUT_ITEM_FIXES) that has to be
  // dropped the moment upstream fixes the row — this test failing is that signal.
  it('arms the Death Company Dreadnought with its own weapons, not the Brutalis pattern', () => {
    const u = factions.find((f) => f.slug === 'blood-angels').data.units.find((x) => x.id === 'death-company-dreadnought')
    const names = (u.defaults || []).flatMap(([, list]) => list.map(([id]) => rosterItems.items[id]))
    // Title Case since Codex: Space Marines (app data 963).
    expect(names).toContain('Blood Fists')
    expect(names).toContain('Blood Fist Bolt Rifles')
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
    // "Eradicator Squad" is two datasheets — the melta-rifle one and the heavy-bolter variant.
    // (The first was plain `eradicator-squad` until Codex: Space Marines, app data 963.)
    expect(leadsOf('space-marines', 'tor-garadon')).toEqual(
      expect.arrayContaining(['eradicator-squad-with-melta-rifles', 'eradicator-squad-with-heavy-bolters']),
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
    const shoota = gearOf('orks', 'battlewagon').find((x) => /up to 4 big shoota/i.test(headOf(x)))
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
          // A Faction Pack sheet (no appdata `sid`) whose bracket spreads over two open-ended
          // profiles — a Bike Squad's Bikers and its Attack Bike — has no exact split to record
          // and carries none; the parts of what it does record still have to add up.
          if (!u.sid && !s.comp) continue
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

  // The other half of the same bargain. A weapon row nothing claims is always shown (the overlay
  // errs towards showing more), so an item name that differs from its row by a GLYPH — the
  // non-breaking hyphen appdata puts in "Master‑crafted power weapon", the datasheet's plain one —
  // is a swap the card can't hide: the Archon who took that weapon showed his huskblade too (a
  // player's report, 2026-09-20). `norm` folds the glyphs it knows about; this walks every sheet
  // and fails on the first unclaimed row whose name is an item's once ALL punctuation is levelled.
  // A row that differs in SPELLING ("Close combat weapon" against the item's "Close-combat weapon")
  // is not a glyph gap and stays on the conservative side, unclaimed.
  it('claims every weapon row that is an item name in different glyphs', async () => {
    const { weaponRowClaimer } = await import('../../composables/rosterModifiers.js')
    const { loadDatasheets } = await import('../datasheets/index.js')
    const level = (s) => (s || '').toLowerCase().normalize('NFKD')
      .replace(/\p{M}/gu, '').replace(/[\p{P}\p{S}]/gu, '-').replace(/\s+/g, ' ').trim()
    let rows = 0
    for (const { slug } of factions) {
      const [fac, sheets] = await Promise.all([loadRosterFaction(slug), loadDatasheets(slug)])
      for (const u of fac?.units || []) {
        const sheet = sheets?.find((d) => d.id === u.id)
        const claim = sheet && weaponRowClaimer(u, rosterItems.items)
        if (!claim) continue
        const levelled = new Set()
        for (const [, list] of u.defaults || []) for (const [id] of list) levelled.add(level(rosterItems.items[id]))
        for (const g of u.gear || []) for (const o of g.o || []) for (const [id] of optionItems(o)) levelled.add(level(rosterItems.items[id]))
        for (const w of [...(sheet.ranged || []), ...(sheet.melee || [])]) {
          rows++
          if (claim(w.name)) continue
          expect(levelled.has(level(w.name)), `${slug}/${u.id} "${w.name}" is an item spelled with other glyphs`).toBe(false)
        }
      }
    }
    expect(rows).toBeGreaterThan(9000) // the whole corpus really was walked
  })

  // A drone is a wargear item whose one profile is the gun on the sheet ("Gun Drone" → "Twin pulse
  // carbine"). Unclaimed, the row stayed on every Crisis team, drones taken or not (player report
  // e6093db4, 2026-10-03); items.js `stands` names the weapon an item stands for.
  it('hides a drone\'s weapon when the drone is not taken', async () => {
    const { weaponRowClaimer, overlaySheet } = await import('../../composables/rosterModifiers.js')
    const { loadDatasheets } = await import('../datasheets/index.js')
    const [fac, sheets] = await Promise.all([loadRosterFaction('tau-empire'), loadDatasheets('tau-empire')])
    const def = fac.units.find((u) => u.id === 'crisis-sunforge-battlesuits')
    const sheet = sheets.find((d) => d.id === def.id)
    expect(weaponRowClaimer(def, rosterItems.items)('Twin pulse carbine')).toBeTruthy()
    const shown = overlaySheet(sheet, { def, entry: { uid: 'x', id: def.id, size: 0 }, items: rosterItems.items }).sheet
    expect(shown.ranged.map((w) => w.name)).not.toContain('Twin pulse carbine')
  })
})

describe('a second copy of a melee weapon is a second row', () => {
  // A model fights with ONE melee weapon (core rules 04.01), so two copies of the same one on a
  // model are not twice the attacks. The card used to sum them into "×2", which a player read as
  // exactly that — a lone Carnifex with crushing claws from both option lines, "8 attacks"
  // (2026-09-28). Each copy is its own row now (rosterModifiers' meleeRowsFor), so a row's count
  // is the models holding that copy and can never exceed the models in the unit.
  //
  // Walked for every unit and every melee weapon it can hold: that weapon is taken in every group
  // offering it, on every model the group allows. [EXTRA ATTACKS] rows are exempt — the model
  // attacks with all of them (24.11), and "×2" there is the truth.
  // Named one by one, never by pattern. Cultist Mob with Firearms: appdata prints the loadout
  // as "autopistol; brutal assault weapon" and the option as "autogun and close combat weapon
  // replaced with 1 autopistol and 1 brutal assault weapon" — the other Cultist Mob's wording.
  // The swap gives up nothing the model holds, so taking it adds a second brutal assault weapon;
  // what the option means is the datasheet's problem, not this row's (2026-09-28).
  const APPDATA_CONTRADICTS = new Set(['chaos-space-marines/cultist-mob-with-firearms'])

  it('never counts a melee row on more models than the unit has', async () => {
    const { overlaySheet } = await import('../../composables/rosterModifiers.js')
    const { loadDatasheets } = await import('../datasheets/index.js')
    const norm = (s) => (s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\p{Pd}/gu, '-').trim()
    const bad = []
    const split = new Set()
    for (const { slug } of factions) {
      const [fac, sheets] = await Promise.all([loadRosterFaction(slug), loadDatasheets(slug)])
      for (const u of fac?.units || []) {
        const sheet = sheets?.find((d) => d.id === u.id)
        if (!sheet?.melee?.length || !u.defaults?.length) continue
        const size = Math.max(0, u.sizes.findIndex((s) => s.default))
        const models = u.sizes[size].per[0]
        const meleeNames = new Set(sheet.melee.map((w) => norm(w.name)))
        const ids = new Set()
        for (const g of u.gear || []) for (const o of g.o || []) for (const [id] of optionItems(o)) {
          if (meleeNames.has(norm(rosterItems.items[id]))) ids.add(id)
        }
        for (const id of ids) {
          // As many as the editor would allow, group by group: the group's own cap, and the
          // stock rule — a weapon given up in one group is not there to give up in the next
          // (swapRoom; null where the data cannot say, which the editor reads as open too).
          const entry = { id: u.id, size, count: models, wg: [] }
          ;(u.gear || []).forEach((g, gi) => {
            const oi = (g.o || []).findIndex((o) => optionItems(o).some(([x]) => x === id))
            if (oi < 0) return
            const cap = wargearGroupCap(u, entry, gi)
            const room = swapRoom(u, entry, gi, oi)
            const n = Math.min(models, cap?.dup || cap?.limit || models, room ?? models)
            if (n > 0) entry.wg = [...entry.wg, [gi, oi, n]]
          })
          const { sheet: out } = overlaySheet(sheet, { def: u, entry, items: rosterItems.items })
          const rows = (out.melee || []).filter((w) => norm(w.name) === norm(rosterItems.items[id]))
          if (rows.length > 1) split.add(`${slug}/${u.id}`)
          for (const w of rows) {
            if ((w.tags || []).some((t) => /^extra attacks$/i.test(t))) continue
            if (APPDATA_CONTRADICTS.has(`${slug}/${u.id}`)) continue
            if ((w.qty || 1) > models) bad.push(`${slug}/${u.id} "${w.name}" ×${w.qty} on ${models} model(s)`)
          }
        }
      }
    }
    expect(bad, bad.join('; ')).toEqual([])
    // The two the report and the pair rules are about, and a floor for the rest.
    expect(split.has('tyranids/carnifexes')).toBe(true)
    expect(split.has('space-marines/lieutenant')).toBe(true)
    expect(split.size).toBeGreaterThan(20)
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
    // 49 since Codex: Orks retired the WAGONS tag that Rollin' Deff and Blitz Brigade shared; 37
    // since MFM v1.5 of 2 October printed "UNIQUE TAG REMOVED" over twelve more — Aeldari's four
    // ACROBATIC, Drukhari's KABAL/WYCH CULT/COVENS pairs, Genestealer Cults' PURESTRAIN pair.
    expect(tagged.length).toBeGreaterThanOrEqual(37)
    for (const d of tagged) expect(d.unique).toBe(d.unique.toUpperCase())
  })

  // Asked of every detachment an army can FIELD — a Chapter's own plus the Codex ones it folds in
  // (loadRosterFaction) — and counted across the whole game, once per detachment. Since Codex: Space
  // Marines (app data 963) a pair can straddle two armies: Ironstorm Spearhead and Medusa's Wrath
  // share IRONSTORM, and a Black Templars army can field the first but never the second (Iron Hands
  // only), which is still a pair, just not one that army can meet.
  it('never leaves a tag on a single detachment — a tag only means something in a pair', async () => {
    const byTag = new Map()
    for (const { slug } of factions) {
      const data = await loadRosterFaction(slug)
      for (const d of data.detachments || []) {
        if (!d.unique) continue
        if (!byTag.has(d.unique)) byTag.set(d.unique, new Set())
        byTag.get(d.unique).add(d.name)
      }
    }
    for (const [tag, names] of byTag) expect(names.size, tag).toBeGreaterThan(1)
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
    // 67 from appdata, plus the 17 Faction Pack Legends of the Chaos Space Marines that the
    // Pactbound Zealots rule reaches by its own wording (a HERETIC ASTARTES unit that is not an
    // EPIC HERO and carries no mark already) — see gen-roster-data.mjs's packUnitsFor. Was 92
    // from appdata until Codex: Space Marines (app data 963) retired Headhunter Task Force, whose
    // keyword upgrade 25 vehicles carried (17 Space Marines, 7 Black Templars, 1 Blood Angels).
    // Plus the 11 Legends TITANIC tanks Steel Hammer's rule makes eligible for its CHARACTER
    // choice (CHARACTER_GRANTS, 2026-10-07).
    expect(withAlleg()).toHaveLength(67 + 17 + 11)
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
    // Sorted: which order appdata lists the keywords in is not the point (972 changed it).
    expect(draxus.leadKw.map((g) => ({ ...g, kw: [...g.kw].sort() }))).toEqual([{ kw: ['Battleline', 'Imperium', 'Infantry'], type: 'leader' }])
    expect(draxus.leads.length).toBeGreaterThan(0)
  })
})

// A detachment can bar a datasheet that belongs to ANOTHER faction, and the id has to say so.
// Black Spear Task Force bars the Codex: Imperial Agents Watch Master — the ally you would
// otherwise bring alongside your own — not the Index: Deathwatch datasheet the army is built
// around. Resolving the exclusion by NAME made those the same unit, and every Deathwatch list with
// a Watch Master in it read as illegal.
describe('detachment exclusions across factions', () => {
  // "bars the allied copy, not the army's own datasheet" — the generator still namespaces a
  // foreign exclusion (`imperial-agents:watch-master`), but since Codex: Space Marines (app data
  // 963) no detachment in the corpus bars another faction's datasheet: Black Spear Task Force
  // lost its exclusion list, and the Deathwatch army rule now keeps AGENTS OF THE IMPERIUM
  // DEATHWATCH units out instead (the allied pool already leaves them out). Nothing left to pin,
  // so the case is untested rather than pinned to an example that no longer exists.

  // Was Black Spear Task Force barring the Tactical and Devastator Squads a Chapter folds in,
  // until app data 963 retired both squads and that list. Shadow Legion bars Chaos Daemons' own
  // named daemons the same way — by the bare id of a unit in the army's own pool.
  it('still bars a unit of this army’s own pool by its bare id', async () => {
    const cd = await loadRosterFaction('chaos-daemons')
    const det = cd.detachments.find((d) => d.name === 'Shadow Legion')
    expect(det.excludedUnits).toEqual(expect.arrayContaining(['skarbrand', 'daemon-prince-of-chaos']))
    for (const id of ['skarbrand', 'daemon-prince-of-chaos']) expect(cd.units.some((u) => u.id === id)).toBe(true)
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
    const bigMek = orks.units.find((u) => u.id === 'big-mek')
    const viaBoyz = bigMek.leads.find((l) => l.to === 'boyz')
    expect(bigMek.leads.find((l) => l.to === 'breaka-boyz')).toEqual({ to: 'breaka-boyz', type: viaBoyz.type })
  })

  // The clause before "can be attached to" is a restriction, and it is kept: Victrix Honour Guard
  // borrows the Company Heroes attachment for a CAPTAIN or CHAPTER MASTER, and the Lieutenant —
  // who leads Company Heroes as well, but is neither — does not get it.
  // (Pinned on Pedro Kantor until Codex: Space Marines, app data 963, retired him; a Captain is
  // the plainest CAPTAIN there is.)
  it('keeps the restriction the rule states', async () => {
    const sm = await loadRosterFaction('space-marines')
    const leads = (id) => (sm.units.find((u) => u.id === id)?.leads || []).map((l) => l.to)
    expect(leads('captain')).toEqual(expect.arrayContaining(['company-heroes', 'victrix-honour-guard']))
    expect(leads('lieutenant')).toContain('company-heroes')
    expect(leads('lieutenant')).not.toContain('victrix-honour-guard')
  })
})

// One Leader and one Support per Bodyguard unit (core rules). Every pair of Supports on every unit,
// asked the way the editor's picker asks it: until 2026-10-08 an Exalted Champion's 10th-edition
// footer ("even if one other CHARACTER model has already been attached") let it sit beside a
// second Support on four Chaos units — a player's report. And no footer is read as "beside
// anyone" except the Death Guard form the gate below names.
describe('attachment slots', () => {
  it('seats no Bodyguard unit with two Supports', () => {
    const bad = []
    for (const { slug, data } of factions) {
      for (const host of data.units || []) {
        const sups = data.units.filter((u) => leadTypeFor(u, { id: u.id }, host, data.detachments) === 'support')
        for (const a of sups) {
          for (const b of sups) {
            if (a !== b && !hostSlotTaken(b, { id: b.id }, { id: host.id }, host, [{ def: a, entry: { id: a.id } }], data.detachments)) bad.push(`${slug}/${host.id}: ${a.id} + ${b.id}`)
          }
        }
      }
    }
    expect(bad).toEqual([])
  })

  it('lets only the Death Guard’s "one other Leader unit" footer join beside anyone', () => {
    const free = factions.flatMap(({ slug, data }) => (data.units || []).filter((u) => u.flags?.alongside).map((u) => `${slug}/${u.id}`))
    expect(free.every((k) => k.startsWith('death-guard/'))).toBe(true)
    const named = Object.fromEntries(factions.flatMap(({ data }) => (data.units || []).filter((u) => u.along).map((u) => [u.id, u.along])))
    expect(named).toEqual({
      'death-rider-commissar': ['Death Rider Squadron Commander', 'Lord Marshal Dreir', 'Lord Solar Leontus'],
      'jokaero-weaponsmith': ['Inquisitor'],
      'vargard-obyron': ['Nemesor Zahndrekh'],
    })
  })
})


// Wargear that costs points and is already on the model: appdata prices it (`points` on an option
// it also marks `defaultValue`) and the Munitorum bracket does not include it, so it has to be
// charged on top — see defaultWargearPoints in rosterEngine.js.
describe('a default loadout that costs points', () => {
  // Was the Terminator Assault Squad's thunder hammer (+5 a model, 360 for ten against a 310
  // bracket, as GW's own export priced it) until Codex: Space Marines (app data 963) made twin
  // lightning claws its default and the hammer a paid pick. The Repulsor Executioner is the same
  // shape: appdata marks its heavy laser destroyer both `defaultValue` and `points: 10`.
  it('prices a Repulsor Executioner the way appdata does', async () => {
    const sm = await loadRosterFaction('space-marines')
    const unit = sm.units.find((u) => u.id === 'repulsor-executioner')
    expect(unit.dw).toEqual([[0, 10]])              // heavy laser destroyer, +10
    expect(unit.sizes[0].pts).toBe(260)             // the bracket stays the Munitorum's (275 until 2 October)
    expect(unitPoints(unit, { size: 0, count: 1 })).toBe(270)
    // …and the group that trades the cannon away knows what it hands back.
    expect(unit.gear.find((g) => g.dr)?.dr).toBe(10)
    expect(unitPoints(unit, { size: 0, count: 1, wg: [[unit.gear.findIndex((g) => g.dr), 0, 1]] })).toBe(260)
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
      // app data 963: the Terminator Assault Squad's hammer became a pick, and the Repulsor
      // Executioner's heavy laser destroyer started costing 10.
      'space-marines/repulsor-executioner',
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
  // "any of the following" — gen-roster-data still reads it as one pick per option, but no
  // wargear instruction in the corpus is worded that way any more: the Battlewagon was the
  // only one, and Codex: Orks split its ’ard case / grabbin' klaw / wreckin' ball into three
  // separate single-item instructions. Nothing left to pin, so the case is untested rather
  // than pinned to an example that no longer exists.

  // "…can be replaced with two different weapons from the following list" — the Pack Leader gives
  // up both his bolt pistol and his boltgun (or chainsword), so it is two picks, never the same
  // weapon twice. (Pinned on the Devastator and Tactical Sergeants until Codex: Space Marines,
  // app data 963, retired both squads.)
  it('reads "two different weapons from the following list" as two picks', () => {
    for (const id of ['wolf-guard-pack-leader', 'wolf-guard-pack-leader-with-jump-pack']) {
      const gear = gearOf('space-wolves', id)
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

// "Any number of models can each be equipped with up to two of the following" is a budget PER MODEL
// (gen-roster-data.mjs's PER_MODEL_BUDGET, pack-roster.mjs for the Legends): k models, k × N picks,
// and "no duplicates" is k of any one option. Five T'au groups had no cap at all and drew one of
// each option for the whole squad — three Broadsides could not carry six support systems.
describe('a budget per model', () => {
  const unitOf = (id) => factions.find((f) => f.slug === 'tau-empire').data.units.find((u) => u.id === id)
  const headOf = (g) => (rosterItems.texts[g.t] || '').split('\n')[0]

  it('leaves no "any number of models can each be equipped with up to N" group uncapped', () => {
    const uncapped = []
    for (const { slug, data } of factions) {
      for (const u of data.units || []) {
        for (const g of u.gear || []) {
          if (!/^\s*any number of models can (?:each )?be equipped with up to/i.test(headOf(g))) continue
          if (!g.lim?.length) uncapped.push(`${slug}/${u.id}: ${headOf(g).slice(0, 80)}`)
        }
      }
    }
    expect(uncapped).toEqual([])
  })

  it('gives Broadsides two support systems each, never two alike, and one plasma-or-missile slot', () => {
    const unit = unitOf('broadside-battlesuits')
    const sys = unit.gear.find((g) => /cannot take duplicates/.test(headOf(g)))
    expect(sys.lim).toEqual([[1, 2, 1], [2, 4, 2], [3, 6, 3]])
    const name = (o) => rosterItems.items[Array.isArray(o[0]) ? o[0][0][0] : o[0]]
    expect(sys.excl.map((set) => set.map((oi) => name(sys.o[oi])).sort()))
      .toEqual([['Twin plasma rifle', 'Twin smart missile system']])
    const drones = unit.gear.find((g) => /and can take duplicates/.test(headOf(g)))
    expect(drones.lim).toEqual([[1, 2], [2, 4], [3, 6]])
  })

  it('reads the Legends Crisis suits and the single-item Piranha form too', () => {
    const crisis = unitOf('crisis-battlesuits')
    const three = crisis.gear.find((g) => /up to three/.test(headOf(g)))
    expect(three.lim.at(-1)).toEqual([6, 18])
    // Its footnotes reach across the burst-cannon swap too, so they are the unit's `pm`, not `excl`.
    expect(three.excl).toBeUndefined()
    expect(crisis.pm).toMatchObject({ add: crisis.gear.indexOf(three), slots: 3, base: 0 })
    expect(crisis.pm.one).toHaveLength(4) // the four starred items, one each per model
    expect(crisis.pm.ranged[0]).toBe(3)
    expect(unitOf('piranhas').gear.find((g) => /seeker missiles/.test(headOf(g))).lim).toEqual([[1, 2], [2, 4], [3, 6]])
  })
})

// "Any number of Tempestus Scions can each have their hot-shot lasgun replaced with one of the
// following" is FOUR picks, one per Scion — not one pick for the squad. appdata files it as a
// checkbox with no limited-choice set, and a capless multi-option checkbox draws as a one-of radio,
// so the editor allowed a single special weapon while validateRoster (which falls back to the
// profile's model count) allowed four. A player reported it on 2026-09-10; the generator now reads
// the wording into `lim` and marks the group a stepper.
describe('a swap several models can each make', () => {
  const unitOf = (slug, id) => factions.find((f) => f.slug === slug).data.units.find((u) => u.id === id)
  const headOf = (g) => (rosterItems.texts[g.t] || '').split('\n')[0]

  it('gives every Tempestus Scion its own pick, and no weapon twice', () => {
    const unit = unitOf('astra-militarum', 'militarum-tempestus-command-squad')
    const gi = unit.gear.findIndex((g) => /^Any number of Tempestus Scions/i.test(headOf(g)))
    expect(unit.gear[gi].in).toBe('stepper')
    expect(unit.gear[gi].repall).toBeUndefined()
    expect(wargearGroupCap(unit, { size: 0, count: 5 }, gi)).toEqual({ limit: 4, dup: 1 })
  })

  // The Carnifexes' list carries no no-duplicates footnote, so two of the same is legal — and the
  // cap follows the bracket: one model, one pick; two models, two.
  it('scales the Carnifex talon swap with the number of models', () => {
    const unit = unitOf('tyranids', 'carnifexes')
    const gi = unit.gear.findIndex((g) => /^Any number of models can each have their Carnifex extra/i.test(headOf(g)))
    expect(unit.gear[gi].in).toBe('stepper')
    expect(wargearGroupCap(unit, { size: 0, count: 1 }, gi)).toEqual({ limit: 1, dup: 0 })
    expect(wargearGroupCap(unit, { size: 1, count: 2 }, gi)).toEqual({ limit: 2, dup: 0 })
  })

  // THE GUARDRAIL. Same shape, corpus-wide: an "any number of / all models … can each have …
  // replaced with one of the following" group whose profile fields more than one model has to draw
  // as a stepper — most already do, because appdata types them as one; the four the generator
  // rewrites are the ones appdata calls a checkbox. A checkbox here is the bug, whichever side it
  // comes from. Groups on a single-model profile (the Reiver Sergeant) are correctly a radio and
  // are not in this set.
  it('leaves no multi-model "each" swap drawn as a one-of', () => {
    const uncapped = []
    for (const { slug, data } of factions) {
      for (const u of data.units || []) {
        (u.gear || []).forEach((g, gi) => {
          const head = (rosterItems.texts[g.t] || '').split('\n')[0]
          if (!/^\s*(?:any number of|all models)\b/i.test(head) || !/\beach\b/i.test(head)) return
          if (g.all || g.m == null || g.o.length < 2 || !g.rep?.length) return
          const models = Math.max(...(u.sizes || []).map((s) => {
            const comp = (s.comp || []).find(([mi]) => mi === g.m)
            return comp ? (comp[2] ?? comp[1]) : (s.per?.[1] ?? s.per?.[0] ?? 1)
          }))
          const oneOf = g.in !== 'stepper' && !(g.lim?.length && Math.max(...g.lim.map((r) => r[1])) > 1)
          if (models > 1 && oneOf) uncapped.push(`${slug}/${u.id} gi=${gi}: ${head.slice(0, 80)}`)
        })
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
  // Since Codex: Space Marines (app data 963) this instruction is typed with a plain hyphen and
  // pairs the boltgun with knives and fists, so it no longer exercises U+2010 — the pair and its
  // cap are what it still pins.
  it('pairs the Deathwatch Veterans stalker swap and picks up its cap', () => {
    const g = unitOf('deathwatch', 'deathwatch-veterans').gear
      .find((x) => /stalker-pattern boltgun/i.test(textOf(x)))
    expect(g.o).toHaveLength(1)
    expect(optionLabel(g.o[0], rosterItems.items)).toBe('Stalker-pattern Boltgun + Knives and Fists')
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

// Reported by a player against the new Codex: Orks — "battleline is broken, it lets you cram
// everyone in". Three Ork datasheets are Battleline only under a specific Detachment, and the
// doubled duplicate cap was reading the datasheet's own "could be" flag instead of asking the
// army. Pinned against the real bundle, because the fixture version of this test cannot tell
// whether the sidecar and the generated flag still agree.
describe('conditional Battleline is the army\'s answer', () => {
  it('caps Warbikers at 3 outside Kult of Speed and 6 inside it', async () => {
    const orks = await loadRosterFaction('orks')
    const warbikers = orks.units.find((u) => u.id === 'warbikers')
    expect(warbikers.condBattleline).toBe(1) // the datasheet CAN be Battleline…
    expect(warbikers.kws).not.toContain('Battleline') // …but does not print it

    const det = (name) => [orks.detachments.find((d) => d.name === name)].filter(Boolean)
    const grantedIn = (name) => grantedKeywordsFor('warbikers', 'orks', det(name)).map((g) => g.kw)
    expect(det('Kult of Speed')).toHaveLength(1)

    expect(duplicateLimit(warbikers, 3, grantedIn('Blitz Brigade'))).toBe(3)
    expect(duplicateLimit(warbikers, 3, grantedIn('Kult of Speed'))).toBe(6)
    expect(bucketOf(warbikers, grantedIn('Blitz Brigade'))).toBe('other')
    expect(bucketOf(warbikers, grantedIn('Kult of Speed'))).toBe('battleline')
  })

  // The gate reads conditionalKeywords.json, the flag comes from appdata's conditional_keyword
  // table: a unit flagged with no grant to find would silently lose the ×2 it deserves. The one
  // cross-faction case is Outrider Squad — the flag rides on the shared space-marines datasheet
  // while the grant belongs to Dark Angels' Company of Hunters, which is where the sidecar files
  // it and where the runtime looks it up.
  it('every flagged datasheet has a Battleline grant to gate on', async () => {
    const bundles = import.meta.glob(['./*.js', '!./index.js', '!./core.js', '!./items.js', '!./*.test.js'])
    const grantsFor = (id) => Object.entries(conditionalKeywords)
      .flatMap(([, units]) => units[id] || [])
      .filter((g) => g.kw === 'Battleline')
    let flagged = 0
    for (const [f, load] of Object.entries(bundles)) {
      const fac = Object.values(await load())[0]
      for (const u of fac?.units || []) {
        if (!u.condBattleline) continue
        flagged++
        expect(grantsFor(u.id).length, `${f.slice(2, -3)}/${u.id}`).toBeGreaterThan(0)
      }
    }
    expect(flagged).toBeGreaterThan(20) // the whole corpus really was walked
  })
})

// Deathwatch Support is filed with the Deathwatch and open to every Adeptus Astartes army; until
// 2026-10-03 only the Deathwatch could take it, and at 0 DP where the MFM prints 1.
// Printed in Codex Supplement: Deathwatch, but it is how the OTHER Adeptus Astartes armies bring the
// Deathwatch along: appdata entitles the Space Marines and every Chapter to it and not the
// Deathwatch (the MFM's Deathwatch page agrees). The editor offered it to Deathwatch lists until
// 2026-10-05; the file keeps it as `lend` for the others to fold in.
describe('Deathwatch Support across the Space Marines family', () => {
  it.each(['space-marines', 'blood-angels', 'black-templars', 'dark-angels', 'space-wolves'])('%s can field it at 1 DP', async (slug) => {
    const f = await loadRosterFaction(slug)
    const d = f.detachments.find((x) => x.name === 'Deathwatch Support')
    expect(d?.dp).toBe(1)
    expect(d.lend).toBeUndefined()
  })
  it('the Deathwatch cannot', async () => {
    const f = await loadRosterFaction('deathwatch')
    expect(f.detachments.map((x) => x.name)).not.toContain('Deathwatch Support')
  })
})

// A default loadout's TOTAL marker (`[id, c, 1]`) means "c for the whole profile, not one each" —
// a count the profile's models cannot share out evenly (one plasma gun between two Missionaries).
// A count that DOES divide is per model, and the generator divides it everywhere; one branch
// pushed it as a total until 2026-10-05, and the Purifiers' four Nemesis force weapons stayed
// four at a squad of nine — four psycannons took them all and the weapon lost its count (a
// player's report). Black Templars' Crusader Squad carried the same error.
describe('default loadout totals', () => {
  it('mark only a count the profile cannot share out evenly', () => {
    const bad = []
    for (const { slug, data } of factions) {
      for (const u of data.units || []) {
        const bracket = (u.sizes || []).find((x) => x.default) || (u.sizes || [])[0]
        for (const [m, list] of u.defaults || []) {
          const models = (bracket?.comp || []).find(([mi]) => mi === m)?.[1] ?? (bracket?.per?.[0] ?? 1)
          for (const [id, c, total] of list) {
            if (total && models > 1 && c % models === 0) bad.push(`${slug}/${u.id}: ${rosterItems.items[id]} ${c} over ${models} models`)
          }
        }
      }
    }
    expect(bad).toEqual([])
  })

  it('give each Purifier its Nemesis force weapon, less the ones traded for a psycannon', async () => {
    const gk = await loadRosterFaction('grey-knights')
    const def = gk.units.find((u) => u.id === 'purifier-squad')
    // Six items share the name across Grey Knights; the one this unit starts with.
    const nfw = def.defaults.flatMap(([, list]) => list.map(([id]) => id)).find((id) => /^nemesis force weapon$/i.test(rosterItems.items[id]))
    // Ten models (Knight of the Flame + nine Purifiers), four psycannons: six swords remain.
    expect(loadoutItemCounts(def, { id: def.id, size: 1, count: 10, wg: [[0, 2, 4]] }).get(nfw)).toBe(6)
  })
})

// The datasheet says what each model carries — "This model is equipped with: 2 godhammer
// lascannons; …", "Every Purifier is equipped with: …", "The Knight of the Flame and every
// Purifier …" — and the default loadout the builder counts from must agree with it at every unit
// size. The generator reads two appdata tables that count differently and either can be short;
// two such errors were found by players and the rest (Land Raider, Defiler, Commissar Graves,
// Intranzia Fraye) by this sweep (2026-10-05). The datasheet TEXT is the authority (owner,
// 2026-10-05). A line is read only when every profile it names is one of the unit's miniatures by
// its exact name; a unit with any line that is not is skipped whole, and an item the text and the
// item list spell differently is skipped — never guessed.
describe('default loadout against the datasheet text', () => {
  const norm = (s) => String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/[‐‑]/g, '-').replace(/\s+/g, ' ').trim()
  const sing = (s) => norm(s).replace(/s$/, '')
  // "Every Purifier", "The Knight of the Flame and every Purifier", "The A and B are both" → the
  // profiles named, or null when a name is not exactly one of the unit's miniatures.
  // "1 Gun Servitor", "One other Veteran Guardsman", "A Shade Runner" name ONE model of a profile:
  // { one: [index] }, multiplied by one rather than by the profile's models.
  const profilesOf = (who, minis) => {
    const full = norm(who).replace(/ are both$/, '')
    if (full === 'this model' || full === 'this unit') return 'this model'
    if (full === 'every model' || full === 'each model') return 'every model'
    const other = /^every other /.test(full)
    const w = full.replace(/ model$/, '').replace(/^(the|every|each) (other )?/, '')
    const find = (n) => minis.findIndex((m) => sing(m).replace(/\.$/, '') === sing(n))
    // "Every other Voidsman": the profile less the models other lines single out.
    if (other) return find(w) >= 0 ? { other: find(w) } : null
    // A whole name first: a Deathwatch profile is "Kill Team Intercessor with Pyreblaster, Bolt
    // Pistol and Knives and Fists", and splitting it at "and" would name no profile at all.
    if (find(w) >= 0) return [find(w)]
    const few = w.match(/^(1|one|a|an|\d+) (?:other )?(.+)$/)
    if (few && find(few[2]) >= 0) return { one: [find(few[2])], n: /^\d+$/.test(few[1]) ? Number(few[1]) : 1 }
    const idx = w.split(/,? and (?:every |the )?|, /).map((x) => find(x.replace(/^(the|every|each) /, '')))
    return idx.every((x) => x >= 0) ? idx : null
  }
  // Items the text names that match no item of the unit by name — so their count goes unjudged.
  // Frozen (2026-10-05): spelling the text and the item list disagree on ("artificier crozius"),
  // a weapon profile for the weapon ("kannon – shell"), "nothing", wargear no table carries. A NEW
  // entry is a name that changed in a data update and slipped out of the check; an entry that no
  // longer occurs has been fixed or renamed — either way the list is corrected by hand.
  const UNMATCHED = new Set([
    "adepta-sororitas/battle-sanctum: nothing",
    "aeldari/eldrad-ulthran: staff of ulthamar and witchblade",
    "aeldari/leystalker: drakolithe",
    "aeldari/maugan-ra: the maugetar",
    "aeldari/webway-gate: nothing",
    "astra-militarum/death-riders: steed's savage claw",
    "astra-militarum/valkyrie: militarum multi-laser",
    "black-templars/chaplain-grimaldus: artificier croziu",
    "black-templars/chaplain-grimaldus: servitor combat weapon",
    "black-templars/crusader-squad: knives and fist",
    "chaos-titan-legions/chaos-warbringer-nemesis-titan: anvillus defence batterie",
    "necrons/canoptek-tomb-sentinel: gloom prism",
    "necrons/canoptek-tomb-stalker: gloom prism",
    "necrons/nekrosor-ammentar: nullstone field generator",
    "necrons/tomb-citadel-walls: nothing",
    "orks/gargantuan-squiggoth: kannon - shell",
    "space-marines/rhino-primaris: twin plasma gun - standard",
    "space-marines/terrax-pattern-termite: combi-weapon - damnatu",
    "tau-empire/commander-shadowsun: command-link drone",
    "tau-empire/remote-sensor-tower: nothing",
    "titan-legions/warbringer-nemesis-titan: anvillus defence batterie",
  ])
  it('counts what the loadout lines say, at every size', async () => {
    const bad = []
    const skipped = []
    const unmatched = new Set()
    let judged = 0
    for (const { slug, data } of factions) {
      let sheets
      try { sheets = (await import(`../datasheets/${slug}.js`)).default } catch { continue }
      for (const def of data.units || []) {
        const sheet = sheets.find((s) => s.id === def.id)
        // A sheet GW printed wrong is read through its errata, not as printed (pack-roster.mjs).
        if (PACK_ERRATA[def.id]?.loadout) continue
        const text = String(sheet?.loadout || '').split('\n').filter((l) => /equipped with/.test(l))
        const lines = text.map((l) => l.match(/^\*\*(.+?) (?:is|are) equipped with:\*\*\s*(.+)$/))
        if (!lines.length || lines.some((l) => !l) || !def.defaults?.length) continue
        const minis = (def.minis || [{ n: def.name }]).map((m) => m.n)
        const who = lines.map(([, w]) => profilesOf(w, minis))
        // A profile no line names (the Aquilons' Gunfighter, an Aquilon the text does not set
        // apart) is described by nothing here, so the unit's totals cannot be judged.
        const named = new Set(who.flatMap((w) => (Array.isArray(w) ? w : w?.one || (w?.other != null ? [w.other] : []))))
        if (!who.some((w) => typeof w === 'string') && who.every((w) => w != null) && minis.some((_, i) => !named.has(i))) continue
        if (who.some((w) => w == null)) { lines.forEach(([, w], i) => { if (who[i] == null) skipped.push(`${slug}/${def.id}: "${w}" [${minis.join(' | ')}]`) }); continue }
        for (let size = 0; size < (def.sizes || []).length; size++) {
          for (const count of new Set(def.sizes[size].per || [])) {
            const entry = { id: def.id, size, count }
            const perMini = modelsPerMini(def, entry)
            const counts = loadoutItemCounts(def, entry)
            if (!perMini || !counts) continue
            const all = [...perMini.values()].reduce((a, n) => a + n, 0)
            const have = new Map()
            for (const [id, n] of counts) { const k = sing(rosterItems.items[id]); have.set(k, n == null || have.get(k) === null ? null : (have.get(k) || 0) + n) }
            const want = new Map()
            lines.forEach(([, , list], li) => {
              const w = who[li]
              const singled = (m) => who.filter((x) => x?.one?.[0] === m).reduce((a, x) => a + x.n, 0)
              const models = w === 'this model' ? 1 : w === 'every model' ? all
                : w.one ? Math.min(w.n, perMini.get(w.one[0]) || 0)
                  : w.other != null ? Math.max(0, (perMini.get(w.other) || 0) - singled(w.other))
                    : w.reduce((a, m) => a + (perMini.get(m) || 0), 0)
              for (const part of list.replace(/\.$/, '').split(/[;,]/)) {
                const m = part.trim().match(/^(?:(\d+)\s+)?(.+)$/)
                if (m) want.set(sing(m[2]), (want.get(sing(m[2])) || 0) + (Number(m[1]) || 1) * models)
              }
            })
            for (const [k, n] of want) {
              if (!have.has(k)) { if (n) unmatched.add(`${slug}/${def.id}: ${k}`); continue }
              judged++
              if (have.get(k) !== n) bad.push(`${slug}/${def.id} at ${count} models: ${k} — sheet ${n}, builder ${have.get(k)}`)
            }
          }
        }
      }
    }
    // 4434 counts judged on 2026-10-05; 47 lines skipped for a name the profiles do not carry
    // ("Every Kasrkin Trooper" over "Kasrkin", a named hero). A drop says the reader went blind.
    expect(judged).toBeGreaterThan(4300)
    expect(skipped.length).toBeLessThan(60)
    expect([...unmatched].filter((x) => !UNMATCHED.has(x))).toEqual([])
    expect([...UNMATCHED].filter((x) => !unmatched.has(x))).toEqual([])
    expect(bad).toEqual([])
  })
})

// A profile the chosen size fields none of holds nothing — Wolf Guard Headtakers come with or
// without their Hunting Wolves, and without them the card kept a "Teeth and Claws" row and the
// editor a "Hunting Wolf: Teeth and Claws" line until 2026-10-05.
describe('a profile at zero models', () => {
  it('drops its weapons and its loadout line; with the wolves they come back, one each', async () => {
    const sw = await loadRosterFaction('space-wolves')
    const def = sw.units.find((u) => u.id === 'wolf-guard-headtakers')
    const teeth = def.defaults.flatMap(([, l]) => l.map(([id]) => id)).find((id) => /^teeth and claws$/i.test(rosterItems.items[id]))
    const alone = def.sizes.findIndex((s) => s.comp?.some(([m, n]) => m === 1 && n === 0))
    const pack = def.sizes.findIndex((s) => s.comp?.some(([m, n]) => m === 1 && n === 3))
    expect(loadoutItemCounts(def, { id: def.id, size: alone, count: def.sizes[alone].per[0] }).has(teeth)).toBe(false)
    expect(defaultLoadoutLines(def, rosterItems.items, { id: def.id, size: alone, count: def.sizes[alone].per[0] }).map((l) => l.mini)).not.toContain('Hunting Wolf')
    expect(loadoutItemCounts(def, { id: def.id, size: pack, count: def.sizes[pack].per[0] }).get(teeth)).toBe(3)
  })
})

// Every wargear option of every unit, picked once at every size its profile is fielded (after
// the option that hands its item out, for a CHAINED swap), must give up what it says it gives up,
// add what it grants and touch nothing else; picked to its cap it must leave no count below zero.
// Swept 2026-10-05 after the default-loadout sweep: the Fire Dragon Exarch's swap gave up the
// troopers' fusion gun, a Magna-grapple Dreadnought kept its fists, and chained swaps (Death
// Company Marines, Furioso, Dire Avengers, Corsairs, Kill Tank, Desolation Squad) left the first
// weapon beside the second.
describe('wargear swaps', () => {
  // "… replaced with …" yet nothing to give up: the printed text replaces an item the model is not
  // printed with. Empty since 2026-10-07: the one entry, the Peltasts' "arc lance" (the Hoplites'
  // option word for word, GW's Faction Pack), was left as printed on 2026-10-05 as a guess, and read
  // as the galvanic caster on the owner's word once the Hoplites' page showed where the line came
  // from (pack-roster's PACK_ERRATA). A sheet whose fix is known goes there, a name the prose
  // spells differently in the generator's PROSE_NAME_FIXES. Frozen: a new entry is a swap that
  // quietly adds without taking away.
  const NO_REP = new Set([])
  it('give up what they replace, add what they grant, touch nothing else', () => {
    const bad = []
    const noRep = []
    let picks = 0
    for (const { slug, data } of factions) {
      for (const def of data.units || []) {
        for (const [gi, g] of (def.gear || []).entries()) {
          const tag = `${slug}/${def.id} g${gi}`
          if (/replaced with/i.test(rosterItems.texts[g.t] || '') && !g.rep?.length) noRep.push(tag)
          for (let size = 0; size < (def.sizes || []).length; size++) {
            const count = def.sizes[size].per?.[1] ?? def.sizes[size].per?.[0]
            const base = { id: def.id, size, count, wg: [] }
            if (!wargearGroupLive(def, base, gi)) continue
            const perMini = modelsPerMini(def, base)
            const models = g.all ? null : perMini?.get(g.m ?? 0)
            if (!perMini || (!g.all && !models) || wargearGroupCap(def, base, gi)?.limit === 0) continue
            const before = loadoutItemCounts(def, base)
            if (!before) continue
            for (const [oi, o] of g.o.entries()) {
              picks++
              // A chained swap's item first, from a group of the same profile where there is one.
              const pre = []
              for (const id of g.rep || []) {
                if ((before.get(id) ?? 0) > 0) continue
                const grants = (h, i) => i !== gi && h.o.some((x) => optionItems(x).some(([y]) => y === id))
                let src = def.gear.findIndex((h, i) => grants(h, i) && (h.all || (h.m ?? 0) === (g.m ?? 0)))
                if (src < 0) src = def.gear.findIndex(grants)
                if (src >= 0) pre.push([src, def.gear[src].o.findIndex((x) => optionItems(x).some(([y]) => y === id)), 1])
              }
              const start = pre.length ? loadoutItemCounts(def, { ...base, wg: pre }) : before
              const after = loadoutItemCounts(def, { ...base, wg: [...pre, [gi, oi, 1]] })
              const add = new Map(optionItems(o))
              for (const id of new Set([...start.keys(), ...after.keys()])) {
                const b = start.get(id) ?? 0
                const a = after.get(id) ?? 0
                if (b == null || a == null) continue
                const given = g.rep?.includes(id) && !add.has(id)
                if (given && a >= b && b > 0 && !g.alt) bad.push(`${tag} o${oi} at ${count}: keeps ${rosterItems.items[id]} (${b}→${a})`)
                if (!g.rep?.includes(id) && a - b !== (add.get(id) || 0)) bad.push(`${tag} o${oi} at ${count}: ${rosterItems.items[id]} ${b}→${a}, expected +${add.get(id) || 0}`)
              }
              const cap = wargearGroupCap(def, base, gi)?.limit ?? (g.in === 'stepper' ? models || 1 : 1)
              for (const [id, n] of loadoutItemCounts(def, { ...base, wg: [[gi, oi, cap]] })) {
                if (n != null && n < 0) bad.push(`${tag} o${oi} at ${count}×${cap}: ${rosterItems.items[id]} ${n}`)
              }
            }
          }
        }
      }
    }
    expect(picks).toBeGreaterThan(3500)
    expect(bad).toEqual([])
    expect(noRep.filter((t) => !NO_REP.has(t))).toEqual([])
    expect([...NO_REP].filter((t) => !noRep.includes(t))).toEqual([])
  })
})

// Every weapon a datasheet prints must be one some model can carry — in its default loadout or by
// an option (or the item a profile stands for: a Gun Drone is the twin pulse carbine, items.js
// `stands`). A profile nobody can take is the mark of a sheet stitched from another: the Firearms
// Cultists print an autogun that neither their pasted loadout nor any option hands out (found
// 2026-10-05). Frozen; a new entry is a sheet to read against its source.
describe('every printed weapon has a carrier', () => {
  // Empty since PACK_ERRATA restored the Firearms Cultists and the Munitorum Servitors (2026-10-05).
  const UNREACHABLE = new Set([])
  const key = (s) => String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/[‐‑]/g, '-').replace(/\s+/g, ' ').trim().replace(/s$/, '')
  it('in a default loadout or an option', async () => {
    const found = []
    for (const { slug, data } of factions) {
      let sheets
      try { sheets = (await import(`../datasheets/${slug}.js`)).default } catch { continue }
      for (const def of data.units || []) {
        const sheet = sheets.find((s) => s.id === def.id)
        if (!sheet || !def.defaults?.length) continue
        const have = new Set()
        const put = (id) => {
          const name = rosterItems.items[id]
          have.add(key(name))
          for (const w of rosterItems.stands?.[String(name).toLowerCase()] || rosterItems.stands?.[key(name)] || []) have.add(key(w))
        }
        for (const [, list] of def.defaults) for (const [id] of list) put(id)
        for (const g of def.gear || []) for (const o of g.o) for (const [id] of optionItems(o)) put(id)
        for (const w of [...(sheet.ranged || []), ...(sheet.melee || [])]) {
          const n = key(w.name.replace(/\s+[–-]\s+.*$/, ''))
          if (![...have].some((h) => h === n || h.endsWith(` ${n}`) || n.endsWith(` ${h}`) || h.replace(/^twin /, '') === n)) found.push(`${slug}/${def.id}: ${n}`)
        }
      }
    }
    expect([...new Set(found)].filter((x) => !UNREACHABLE.has(x))).toEqual([])
    expect([...UNREACHABLE].filter((x) => !found.includes(x))).toEqual([])
  })
})

// "The Nob can have their Rokkit Pistol replaced with 1 Smash Hammer": the Nob carries two and the
// sentence names one — the swap takes one copy (`rc`), the other stays (a player's report,
// 2026-10-06: both pistols went).
describe('a swap of one copy of several (rc)', () => {
  it('takes one of the Tankbusta Nob\'s two rokkit pistols', async () => {
    const orks = await loadRosterFaction('orks')
    const def = orks.units.find((u) => u.id === 'tankbustas')
    const gi = def.gear.findIndex((g) => g.rc === 1)
    expect(gi).toBeGreaterThanOrEqual(0)
    const nob = (wg) => defaultLoadoutLines(def, rosterItems.items, { uid: 'x', id: def.id, size: 0, wg }).find((l) => l.mini === 'Nob').items
    expect(nob([])).toBe('Rokkit Pistol ×2, Choppa')
    expect(nob([[gi, 0, 1]])).toBe('Rokkit Pistol ×1, Choppa')
  })
})

// "ARCHON model only": an enhancement whose rules text names its bearer must not be offered to
// anyone else. appdata says so in the `datasheetId` of its requirement group, which the generator
// did not read until 2026-10-07 — 36 enhancements across 13 factions were open to other units
// of the faction (Pact of Cursed Pinions to 28 Chaos characters), and the Orks' upgrades to every
// unit in the codex. Read against the printed prose rather than appdata, so a group appdata itself
// leaves out shows up here too. "X/Y" and "X or Y" are alternatives; each one must be spelled by
// the unit's own keywords, its name and the enhancement's faction keywords.
describe('enhancement bearer named in its prose', () => {
  it('offers "<X> model only" to X and nobody else', async () => {
    const FDIR = path.join(DIR, '../factions')
    const lc = (s) => String(s).replace(/[’']/g, "'").toLowerCase().trim()
    const prose = new Map() // "detachment|enhancement" -> body
    for (const f of fs.readdirSync(FDIR).filter((x) => x.endsWith('.js') && x !== 'index.js')) {
      const walk = (o, det) => {
        if (!o || typeof o !== 'object') return
        if (Array.isArray(o)) return o.forEach((x) => walk(x, det))
        if (Array.isArray(o.enhancements) && o.name) det = o.name
        if (o.name && typeof o.body === 'string' && 'points' in o) prose.set(`${lc(det)}|${lc(o.name)}`, o.body)
        Object.values(o).forEach((x) => walk(x, det))
      }
      for (const v of Object.values(await import(`../factions/${f}`))) walk(v?.en || v)
    }
    const covers = (u, phrase, facs) => {
      const words = lc(phrase).split(/\s+/)
      const keys = new Set([...(u.kws || []).map(lc), lc(u.name), ...facs])
      const ok = [true]
      for (let i = 0; i < words.length; i++) if (ok[i]) for (let j = i + 1; j <= words.length; j++) if (keys.has(words.slice(i, j).join(' '))) ok[j] = true
      // The prose names a unit in the singular ("SCOUT SENTINEL unit only" — Scout Sentinels).
      const n = lc(u.name).replace(/s$/, '')
      return !!ok[words.length] || n === lc(phrase).replace(/s$/, '') || n.endsWith(` ${lc(phrase)}`)
    }
    let read = 0
    const wrong = []
    for (const { slug } of factions) {
      const data = await loadRosterFaction(slug)
      if (!data?.detachments) continue
      for (const det of data.detachments) for (const e of det.enhancements || []) {
        if (e.mandatory) continue
        const body = prose.get(`${lc(det.name)}|${lc(e.name.replace(/\s*\((?:Upgrade|Ulgrade)\)$/i, ''))}`)
        const m = body?.replace(/\*\*|\[[a-z]+:[^\]]*:([^\]]+)\]/g, '$1').match(/^([^.\n]*?)\s+(?:models?|units?)\s+only/i)
        if (!m) continue
        read++
        const alts = m[1].replace(/\(excluding[^)]*\)/i, '').replace(/^friendly\s+/i, '').split(/\s*(?:,|\/|\bor\b)\s*/i).filter(Boolean)
        const facs = (e.req || []).flatMap((g) => g.fac || []).map(lc)
        for (const u of data.units) if (enhEligible(e, u) && !alts.some((a) => covers(u, a, facs))) wrong.push(`${slug} / ${det.name} / ${e.name}: ${u.name}`)
      }
    }
    expect(read).toBeGreaterThan(300)
    expect([...new Set(wrong)]).toEqual([])
  })
})

// Someone in the army can carry it: every enhancement, asked the way the editor asks (enhOptionsFor),
// over the faction's units plus the allies its Detachment admits, with a Detachment's "these units
// gain CHARACTER" choice taken. Steel Hammer's rule hands CHARACTER to any ASTRA MILITARUM TITANIC
// unit, and the eleven Legends ones had no such choice until 2026-10-07 (CHARACTER_GRANTS in the
// generator). An enhancement no unit of this army may take is named here with the reason.
const NOBODY_BY_RULE = new Map([
  ['space-wolves / Narthecis Gauntlet', 'Apothecary Biologis only, and the Space Wolves army rule bars APOTHECARY'],
])
describe('every enhancement has a bearer', () => {
  it('in its own army, allies and granted CHARACTER included', async () => {
    const nobody = []
    for (const { slug } of factions) {
      const fac = await loadRosterFaction(slug, { allies: true })
      if (!fac?.detachments) continue
      const allyIds = new Set((fac.allies || []).flatMap((g) => g.ids))
      for (const det of fac.detachments) {
        const admitted = new Set(allyGroupsFor(fac, [det]).flatMap((g) => g.ids))
        const pool = fac.units.filter((u) => !allyIds.has(u.id) || admitted.has(u.id))
        for (const e of det.enhancements || []) {
          if (e.mandatory) continue
          const entry = (u) => ({ uid: 'x', id: u.id, ...(u.alleg?.o?.some((o) => o.n === 'Character') ? { alleg: 'Character' } : {}) })
          if (!pool.some((u) => enhOptionsFor(u, [det], [entry(u)], 'x', slug).find((o) => o.name === e.name)?.eligible)) nobody.push(`${slug} / ${e.name}`)
        }
      }
    }
    expect(nobody.filter((k) => !NOBODY_BY_RULE.has(k))).toEqual([])
    expect([...NOBODY_BY_RULE.keys()].filter((k) => !nobody.includes(k))).toEqual([])
  }, 60000)

  it('lets a Legends TITANIC tank become a Character in Steel Hammer and carry its enhancement', async () => {
    const am = await loadRosterFaction('astra-militarum')
    const det = am.detachments.find((d) => d.name === 'Steel Hammer')
    const mach = am.units.find((u) => u.name === 'Macharius')
    expect(mach.alleg).toMatchObject({ det: 'Steel Hammer', o: [{ n: 'Character' }] })
    const opt = (entry) => enhOptionsFor(mach, [det], [entry], 'x', 'astra-militarum').find((o) => o.name === 'Battalion Commander')
    expect(opt({ uid: 'x', id: mach.id }).eligible).toBe(false)
    expect(opt({ uid: 'x', id: mach.id, alleg: 'Character' }).eligible).toBe(true)
  })
})

// …and every unit a rule of that kind names has the choice — the Legends included, which appdata's
// own list of carriers never holds. Keywords as CHARACTER_GRANTS spells them; the faction keyword is
// the army's own name.
describe('a Detachment that grants CHARACTER by keyword', () => {
  it('offers the choice to every unit that fits its rule', () => {
    const missing = []
    for (const { slug, data } of factions) {
      if (!data?.units) continue
      const groups = [...new Set(data.units.map((u) => u.alleg?.g).filter((g) => CHARACTER_GRANTS[g]))]
      for (const g of groups) for (const u of data.units) {
        const have = new Set([...(u.kws || []).map((k) => k.toLowerCase()), String(data.name).toLowerCase()])
        if (CHARACTER_GRANTS[g].every((k) => have.has(k)) && u.alleg?.g !== g) missing.push(`${slug} / ${g}: ${u.name}`)
      }
    }
    expect(missing).toEqual([])
  })
})
