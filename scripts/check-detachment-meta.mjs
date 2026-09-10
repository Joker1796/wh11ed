// GATE: fail when a faction rules page's detachment `dp` / `forceDisposition` disagrees with the
// MFM. Exits non-zero. `npm run detmeta`.
//
// WHY THIS EXISTS, WHEN sync-tracker's `detachments` CATEGORY ALREADY COMPARES THE SAME TWO FIELDS.
// On 2026-09-10 a player reported that Combined Arms showed 3DP on the Astra Militarum rules page
// while the roster builder charged 2. sync-tracker had been clean for months — because it compares
// MFM ↔ appdata, and those two agree 197/197. The surface the player actually reads,
// src/data/factions/<slug>.js, was in NEITHER side of that comparison: it is hand-authored, its own
// header declares "MFM > Faction Pack > Codex" for these two fields, and nothing enforced it. The
// first full sweep found 9 wrong `dp` and 52 wrong `forceDisposition` out of 270 detachments.
//
// So this gate closes the third edge of the triangle: hand-authored page ↔ MFM. dp and
// forceDisposition only — everything else about a detachment (rule prose, stratagems, enhancement
// points) is already covered by sync-faction-text and sync-mfm-points.
//
// FACTION-PACK-ONLY DETACHMENTS: a detachment printed in a Faction Pack but absent from the MFM
// has no dp/forceDisposition to check against. PACK_ONLY exempts those by name, and is empty
// today: the same 2026-09-10 sweep first declared six of them pack-only (Luminen Auto-choir,
// Serpent's Brood, Lion's Blade Task Force, Reaper's Wager, Forgefather's Seekers, Emperor's
// Shield) because it matched names verbatim — the MFM spells all six with a curly apostrophe
// and one with different capitalisation. norm() folds both, and all six do match. Match by
// norm(), never by raw name, before concluding the MFM does not carry something.
//
// Usage:
//   node scripts/check-detachment-meta.mjs             # gate every faction, exit 1 on any finding
//   node scripts/check-detachment-meta.mjs orks        # one faction
//   node scripts/check-detachment-meta.mjs --verbose   # also list the PACK_ONLY skips
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, norm, loadModule, byNormName } from './lib/sync-common.mjs'

// Detachments that exist only in a Faction Pack — absent from both the MFM page and appdata's
// faction bundle (checked by slug mapping too: aeldari→asuryani, space-marines→adeptus-astartes).
// dp/forceDisposition for these come from the pack PDF and cannot be cross-checked here.
const PACK_ONLY = []

const FACTIONS_DIR = path.join(ROOT, 'src/data/factions')
const MFM_DIR = path.join(ROOT, 'src/data/mfm')

const exportName = (slug) => slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())

export async function run(argv = process.argv.slice(2)) {
  const verbose = argv.includes('--verbose')
  const only = argv.filter((a) => !a.startsWith('--'))

  const slugs = fs
    .readdirSync(FACTIONS_DIR)
    .filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js'))
    .map((f) => f.replace(/\.js$/, ''))
    .filter((s) => !only.length || only.includes(s))

  const findings = []
  const skipped = []
  let compared = 0

  for (const slug of slugs) {
    const mod = await loadModule(path.join(FACTIONS_DIR, `${slug}.js`))
    const faction = mod?.[exportName(slug)] ?? Object.values(mod || {})[0]
    const dets = faction?.en?.detachments
    if (!dets?.length) continue

    const mfmMod = await loadModule(path.join(MFM_DIR, `${slug}.js`))
    const mfm = mfmMod?.default
    if (!mfm) {
      findings.push({ slug, name: '—', what: `no src/data/mfm/${slug}.js to check against` })
      continue
    }
    const mfmByName = byNormName(mfm.detachments || [], (d) => d.name)

    for (const d of dets) {
      const packOnly = PACK_ONLY.find((p) => p.slug === slug && norm(p.name) === norm(d.name))
      const m = mfmByName.get(norm(d.name))
      if (!m) {
        if (packOnly) skipped.push({ slug, name: d.name })
        else findings.push({ slug, name: d.name, what: 'not in the MFM — renamed, or dropped from the page?' })
        continue
      }
      if (packOnly) {
        findings.push({ slug, name: d.name, what: 'listed in PACK_ONLY but the MFM carries it now — delete that entry' })
        continue
      }
      compared++
      if (m.dp != null && d.dp !== m.dp) {
        findings.push({ slug, name: d.name, what: `dp: page=${d.dp} mfm=${m.dp}` })
      }
      if (m.forceDisposition && norm(d.forceDisposition || '') !== norm(m.forceDisposition)) {
        findings.push({ slug, name: d.name, what: `forceDisposition: page="${d.forceDisposition || ''}" mfm="${m.forceDisposition}"` })
      }
    }
  }

  // A PACK_ONLY entry naming a detachment no page carries any more excuses nothing — say so rather
  // than let the table rot into a list of names nobody can place.
  const scoped = (p) => !only.length || only.includes(p.slug)
  for (const p of PACK_ONLY.filter(scoped)) {
    if (!skipped.some((s) => s.slug === p.slug && norm(s.name) === norm(p.name))) {
      findings.push({ slug: p.slug, name: p.name, what: 'PACK_ONLY entry matched no detachment — delete it or fix the name' })
    }
  }

  console.log(`check-detachment-meta — ${compared} detachment(s) compared against the MFM, ${skipped.length} Faction-Pack-only skipped`)
  for (const f of findings) console.log(`  ✗ ${f.slug}: "${f.name}" — ${f.what}`)
  if (verbose) for (const s of skipped) console.log(`  · pack-only ${s.slug}: "${s.name}" (no MFM entry to check against)`)

  if (!findings.length) {
    console.log('  faction rules pages agree with the MFM on dp / Force Disposition.')
    return 0
  }
  console.log(`\n  ${findings.length} mismatch(es). src/data/factions/<slug>.js is the hand-authored page a`)
  console.log('  player reads; the MFM wins for dp / Force Disposition (see any faction file\'s header).')
  console.log('  Fix the page — the RU overlays carry neither field, so there is nothing to mirror.')
  return 1
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exitCode = await run()
