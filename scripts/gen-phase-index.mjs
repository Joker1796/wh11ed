// Generate src/data/phaseIndex.js — which of a faction's rules have something to say in which
// battle phase, for the tracker's "what happens in this phase" reminder (PhaseRules.vue).
//
// Run whenever a faction rule or a datasheet ability changes:
//   node scripts/gen-phase-index.mjs      (npm run phases:index)
//
// WHY AN INDEX AND NOT THE REAL DATA. The block lives on the live game screen, which today
// imports neither `data/factions/<slug>.js` (~88 KB for Necrons) nor `data/datasheets/<slug>.js`
// (~132 KB, plus ~104 KB for the RU overlay) — GameSetup is `defineAsyncComponent`-loaded for
// exactly that reason. Pulling four heavy chunks onto the playing screen to show five lines
// fights the product's central decision (see root CLAUDE.md's PWA note). What the block actually
// needs is a name and a phase, so that is all this file holds: ~700 entries for all 30 factions,
// one dynamic import, no rule text at all. Tapping a line goes to where the text already lives.
//
// HOW THE PHASE IS READ. Off the ENGLISH prose, by `phasesOf`/`phaseSidesOf` from
// src/composables/stratagemPhases.js — the same pair the stratagem "usable now" filter uses, so
// the two can never disagree about what "your Shooting phase" means. Entries store exactly the
// shape `usableInSlot(phases, sides, phase, mine)` takes, so the consumer does no conversion.
// English only, per the project rule that logic reads `en` (a RU translation may word the timing
// differently); the RU ability NAME rides along for display, since the datasheet overlay has it.
//
// WHAT IS DELIBERATELY NOT HERE:
//   • Stratagems. They already have a whole page (/stratagems) in the tracker's own subnav that
//     groups by phase and shows both players' detachment stratagems during a game. A second list
//     is two copies of one thing that will drift; the block links there with a count instead.
//   • Any classification of "activatable" vs "passive". It was tried and it does not survive
//     contact with the data: "in your Command phase, you can return 1 destroyed model" and "In
//     your opponent's Movement phase, if an enemy unit ends a move within 8"…" are both exactly
//     what a reminder is for, and no phrasing test separates them from a passive mention. Naming
//     the phase is the whole test — erring towards SHOWING, the same call `usableInSlot` makes.
import { existsSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { join } from 'node:path'
import { phasesOf, phaseSidesOf } from '../src/composables/stratagemPhases.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const imp = (rel) => import(pathToFileURL(join(ROOT, rel)).href)
const has = (rel) => existsSync(join(ROOT, rel))

// One entry, or null when the prose names no phase. `p`/`s` are `usableInSlot`'s own arguments.
// A rule that works in "any phase" is dropped rather than shown in all five: it is true of every
// slot, so it reminds the reader of nothing.
function entryOf(name, text, ru = null) {
  if (!text) return null
  const p = phasesOf(text).filter((x) => x !== 'any')
  if (!p.length) return null
  const s = phaseSidesOf(text)
  const out = { n: name, p, s }
  if (ru && ru !== name) out.ru = ru
  return out
}

const { factionGroups } = await imp('src/data/factionsIndex.js')

// The 5 SM-Chapter codex files list shared datasheets by id instead of duplicating them
// (src/data/datasheets/index.js) — fold them back in so a Chapter's list finds those units.
let smUnits = null
const spaceMarines = async () => (smUnits ??= (await imp('src/data/datasheets/space-marines.js')).default)
let smRu = null
const spaceMarinesRu = async () => (smRu ??= await loadRu('space-marines'))

async function loadRu(slug) {
  const rel = `src/data/datasheets/ru/${slug}.js`
  if (!has(rel)) return {}
  return (await imp(rel)).default ?? {}
}

const out = {}
let units = 0, abilities = 0, rules = 0
for (const group of factionGroups) {
  for (const f of group.factions) {
    if (!f.ready || !has(`src/data/factions/${f.slug}.js`)) continue
    // Faction files export one NAMED binding (`export const necrons = …`), not a default —
    // unlike the datasheet files next to them, which do use `default`.
    const mod = await imp(`src/data/factions/${f.slug}.js`)
    const faction = (mod.default ?? Object.values(mod)[0])?.en
    if (!faction) continue

    const rec = { units: {} }

    // The army rule, and each detachment's, keyed by the detachment id the roster stores.
    const army = entryOf(faction.armyRule?.name, faction.armyRule?.body)
    if (army) { rec.army = army; rules++ }
    // Keyed by the detachment NAME, not its id: the tracker and the roster both store names
    // (GameSetup pushes `d.name`), and matching on what the caller already holds saves the block
    // from loading the faction bundle just to translate a name into an id.
    for (const det of faction.detachments || []) {
      const e = entryOf(det.rule?.name, det.rule?.body)
      if (e) { (rec.dets ??= {})[det.name] = e; rules++ }
    }

    // …and every datasheet ability, keyed by unit id (only units that have one land here).
    if (has(`src/data/datasheets/${f.slug}.js`)) {
      const dsMod = await imp(`src/data/datasheets/${f.slug}.js`)
      let sheets = dsMod.default ?? []
      let ru = await loadRu(f.slug)
      if (dsMod.sharedUnitIds?.length) {
        const ids = new Set(dsMod.sharedUnitIds)
        sheets = [...sheets, ...(await spaceMarines()).filter((u) => ids.has(u.id))]
        ru = { ...(await spaceMarinesRu()), ...ru }
      }
      for (const u of sheets) {
        const found = []
        for (const a of u.abilities || []) {
          const e = entryOf(a.name, a.text, ru[u.id]?.abilities?.[a.name]?.name)
          if (e) found.push(e)
        }
        // The unit's own name rides along so the block can say whose ability it is without a
        // second index (datasheetIndex) just for names. Unit names stay English everywhere.
        if (found.length) { rec.units[u.id] = { n: u.name, a: found }; units++; abilities += found.length }
      }
    }
    out[f.slug] = rec
  }
}

const body = `// Generated by scripts/gen-phase-index.mjs — do not edit by hand.
// Which of a faction's rules have something to say in which battle phase, for the tracker's
// per-phase reminder. Shape: slug → { army?, dets?: { detId: e }, units: { unitId: [e, …] } },
// where an entry e is { n: English name, ru?: Russian name, p: [phase, …], s: { phase: side } }
// — exactly the arguments usableInSlot(p, s, phase, mine) takes. No rule TEXT: the block shows a
// name and links to where the text already lives. See the generator's header for what is left out
// and why. Dynamic-imported by the block, so it never rides in the entry bundle.
export const phaseIndex = ${JSON.stringify(out)}
`
writeFileSync(join(ROOT, 'src/data/phaseIndex.js'), body)
const kb = (body.length / 1024).toFixed(1)
console.log(`gen-phase-index: ${Object.keys(out).length} factions, ${rules} army/detachment rules, ${abilities} abilities on ${units} units → src/data/phaseIndex.js (${kb} KB)`)
