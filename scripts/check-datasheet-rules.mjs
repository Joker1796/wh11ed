// GATE: fail when appdata files a named RULE on a datasheet and wh11ed's sheet carries it nowhere.
// Exits non-zero. `npm run dsrules`.
//
// WHY THIS EXISTS. On 2026-09-10 a player said Lord Solar Leontus should have to be the Warlord. He
// does — SUPREME COMMANDER, on 17 datasheets — and the list builder had enforced it all along
// (`flags.supreme` → `supremeCommanderNotWarlord`). What was missing was the PRINTED rule: four of
// those seventeen (Mortarion, Angron, Magnus the Red, Fulgrim) carried no `rules` at all, so their
// pages said nothing while the builder still refused the list. Two more (Canis Rex and Sir Hekhtur,
// "Using Sir Hekhtur") were missing outright.
//
// It went unseen because appdata's per-datasheet `rules[]` was in nobody's diff: sync-appdata
// compares `abilities` (and reports extras in that field only), and sync-faction-text compares the
// TEXT of rules that already exist on both sides — a rule wh11ed never transcribed matches nothing
// and is silently skipped.
//
// WHAT COUNTS AS CARRIED. wh11ed spreads appdata's `rules[]` across several fields by design — a
// plate can live in `rules`, `abilities`, `specialAbilities` or `wargearAbilities`, and the two
// structural ones are stored as data instead of prose (`transport`, `leader.units`, each with its
// own dedicated check). So a rule is carried if its NAME matches an entry in any of those lists, if
// a distinctive run of its own text appears anywhere on the sheet, or if it is one of those two
// structural forms and the sheet has the structure.
//
// Usage:
//   node scripts/check-datasheet-rules.mjs            # gate every faction, exit 1 on any finding
//   node scripts/check-datasheet-rules.mjs necrons    # one faction
//   node scripts/check-datasheet-rules.mjs --verbose  # also list what ALLOW suppressed
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, APPDATA, SLUG_MAP, norm, loadJson, loadModule, byNormName } from './lib/sync-common.mjs'

// Rules wh11ed deliberately does not print. Keep the reason concrete — a future reader has to be
// able to re-derive whether it still holds.
const ALLOW = [
  {
    id: 'drop-pod',
    rule: 'Designer’s Note',
    why: 'The note is about which parts of the model are "highlighted in red" on GW\'s own datasheet artwork ("Models can be set up on any part not highlighted"). wh11ed prints no datasheet artwork, so the text alone points at something the reader cannot see.',
  },
]

const DS_DIR = path.join(ROOT, 'src/data/datasheets')

const plain = (s) =>
  (s || '').replace(/<[^>]+>/g, ' ').replace(/[*_■▪▫]/g, ' ').replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase()

export async function run(argv = process.argv.slice(2)) {
  const verbose = argv.includes('--verbose')
  const only = argv.filter((a) => !a.startsWith('--'))

  const slugs = fs
    .readdirSync(DS_DIR)
    .filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js'))
    .map((f) => f.replace(/\.js$/, ''))
    .filter((s) => !only.length || only.includes(s))

  const findings = []
  const allowed = []
  let compared = 0

  for (const slug of slugs) {
    const bundle = loadJson(path.join(APPDATA, 'factions', `${SLUG_MAP[slug] || slug}.json`))
    if (!bundle) { console.log(`  ! no appdata bundle for ${slug} — skipped`); continue }
    const appByName = byNormName(bundle.datasheets || [], (d) => d.name)
    const mod = await loadModule(path.join(DS_DIR, `${slug}.js`))

    for (const sheet of mod?.default || []) {
      const app = appByName.get(norm(sheet.name))
      if (!app?.rules?.length) continue
      const hay = plain(JSON.stringify(sheet))
      const names = new Set(
        [...(sheet.rules || []), ...(sheet.abilities || []), ...(sheet.specialAbilities || []), ...(sheet.wargearAbilities || [])]
          .map((r) => norm(r.name)),
      )
      for (const r of app.rules) {
        compared++
        const text = plain(r.rules)
        if (names.has(norm(r.name))) continue
        if (text.slice(0, 55) && hay.includes(text.slice(0, 55))) continue
        // The two plates wh11ed stores as structure rather than prose, each with its own check:
        // transport capacity (sync-wargear-options / the card's own row) and a Character's attach
        // list (sync-leader-units, which diffs the unit names themselves).
        if (/transport capacity/.test(text) && sheet.transport) continue
        if (/can be attached to the following units/.test(text) && sheet.leader) continue

        const hit = ALLOW.find((e) => e.id === sheet.id && norm(e.rule) === norm(r.name))
        const item = { slug, id: sheet.id, name: sheet.name, rule: r.name, text: plain(r.rules).slice(0, 90) }
        if (hit) allowed.push({ ...item, why: hit.why })
        else findings.push(item)
      }
    }
  }

  console.log(`check-datasheet-rules — ${compared} appdata datasheet rule(s) checked, ${allowed.length} deliberate omission(s) allowed`)
  for (const f of findings) console.log(`  ✗ ${f.slug}/${f.id} — missing rule "${f.rule}": ${f.text}…`)
  if (verbose) for (const a of allowed) console.log(`  · allowed ${a.slug}/${a.id} "${a.rule}": ${a.why}`)
  // An ALLOW entry that stops matching has outlived what it excused.
  for (const e of ALLOW) {
    const scoped = !only.length || slugs.some((s) => allowed.some((a) => a.slug === s && a.id === e.id))
    if (!scoped) continue
    if (!allowed.some((a) => a.id === e.id && norm(a.rule) === norm(e.rule))) {
      console.log(`  ! ALLOW entry ${e.id} "${e.rule}" matched nothing — delete it or fix what it was excusing.`)
    }
  }

  if (!findings.length) {
    console.log('  every named datasheet rule appdata carries is on the sheet.')
    return 0
  }
  console.log(`\n  ${findings.length} datasheet rule(s) appdata prints and wh11ed does not. Transcribe into that`)
  console.log('  sheet\'s `rules` (RU overlay in the same commit — ru/index.js\'s SHARED_RULE_TEXTS already')
  console.log('  answers for the plates whose English is identical everywhere), or add an ALLOW entry.')
  return 1
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exitCode = await run()
