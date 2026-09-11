// GATE: fail when a weapon ability printed on a datasheet ([BLAST], [PLASMA WARHEAD], …) has no
// text anywhere a player can reach. Exits non-zero. `npm run wtags`.
//
// WHY THIS EXISTS. On 2026-09-10 a player asked what [PLASMA WARHEAD] on the Deathstrike does. It
// does not appear in reference.js (which carries the Core Rules' §24 ability list) because it is
// not a core ability — it belongs to that one missile — and nothing else on the page defined it
// either: DatasheetCard renders a weapon's tags as decorated text, with no lookup behind them. The
// full sweep found eight such tags across 17 weapon profiles. Their text lives in appdata's
// tables/wargear_ability.json, a table this repo does not otherwise read, so no existing check
// could have seen the gap.
//
// The rule this gate enforces: every tag on a weapon must be explained EITHER by the Core Rules
// list in src/data/reference.js, OR on the datasheet that prints it — an `abilities` /
// `wargearAbilities` / `rules` entry naming or describing it. The second half is what makes it
// honest: a datasheet-only ability belongs next to the weapon, not in the core-rules reference.
//
// Tag normalization mirrors what a reader does: [SUSTAINED HITS 2] is [SUSTAINED HITS],
// [ANTI-VEHICLE 4+] is [ANTI], [LETHAL HITS: VEHICLE] is [LETHAL HITS], [MELTA 2] is [MELTA].
//
// Usage:
//   node scripts/check-weapon-abilities.mjs           # gate every faction, exit 1 on any finding
//   node scripts/check-weapon-abilities.mjs necrons   # one faction
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, loadModule } from './lib/sync-common.mjs'

const DS_DIR = path.join(ROOT, 'src/data/datasheets')

// A tag as printed → the ability it is an instance of. Numbers, dice, `X+` and a `: KEYWORD`
// scope are all parameters of one ability, not abilities of their own.
export function baseTag(tag) {
  let t = tag.toUpperCase().replace(/[’‘]/g, "'").trim()
  t = t.split(':')[0].trim() // [LETHAL HITS: VEHICLE]
  if (t.startsWith('ANTI')) return 'ANTI' // [ANTI-VEHICLE 4+], [ANTI-PSYKER 2+]
  t = t.replace(/\s+(\d+|D\d+|\d*D\d+\+\d+|\d+\+|X)$/i, '') // [SUSTAINED HITS 2], [MELTA D3], [RAPID FIRE X]
  return t.trim()
}

// Fold to letters only, so "C'TAN POWER" matches "C’tan Powers" in a datasheet's own prose and
// "Plasma Warhead" matches the tag [PLASMA WARHEAD].
const fold = (s) => (s || '').toUpperCase().replace(/[’‘]/g, "'").replace(/[^A-Z']+/g, ' ').trim()

// The sheet explains a tag if one of its own ability plates names it, or its prose talks about it
// (the Tesseract Vault's "Powers of the C'tan" is the shape that matters: the tag marks which
// weapons the ability governs, and the ability itself is what the player needs to read).
function sheetExplains(sheet, base) {
  const needle = fold(base)
  const plural = `${needle}S`
  const hit = (s) => {
    const f = fold(s)
    return f.includes(needle) || f.includes(plural)
  }
  for (const key of ['abilities', 'wargearAbilities', 'specialAbilities', 'rules']) {
    for (const a of sheet[key] || []) {
      if (hit(a.name) || hit(a.text)) return true
    }
  }
  return false
}

export async function run(argv = process.argv.slice(2)) {
  const only = argv.filter((a) => !a.startsWith('--'))
  const reference = fs.readFileSync(path.join(ROOT, 'src/data/reference.js'), 'utf8')
  const inReference = (base) => reference.includes(`[${base}]`)

  const slugs = fs
    .readdirSync(DS_DIR)
    .filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js'))
    .map((f) => f.replace(/\.js$/, ''))
    .filter((s) => !only.length || only.includes(s))

  const findings = new Map() // base tag → where it is printed
  let tags = 0
  for (const slug of slugs) {
    const mod = await loadModule(path.join(DS_DIR, `${slug}.js`))
    for (const sheet of mod?.default || []) {
      for (const w of [...(sheet.ranged || []), ...(sheet.melee || [])]) {
        for (const tag of w.tags || []) {
          tags++
          const base = baseTag(tag)
          if (inReference(base) || sheetExplains(sheet, base)) continue
          const at = `${slug}/${sheet.id} · ${w.name} [${tag}]`
          findings.set(base, [...(findings.get(base) || []), at])
        }
      }
    }
  }

  console.log(`check-weapon-abilities — ${tags} weapon tag(s) on ${slugs.length} faction(s)`)
  for (const [base, where] of findings) {
    console.log(`  ✗ [${base}] — no text in reference.js and none on the datasheet:`)
    for (const w of where) console.log(`      ${w}`)
  }
  if (!findings.size) {
    console.log('  every weapon tag has text a player can reach.')
    return 0
  }
  console.log(`\n  ${findings.size} weapon ability with nowhere to read it. Core abilities belong in`)
  console.log('  src/data/reference.js; a datasheet-only one belongs in that datasheet\'s')
  console.log('  `wargearAbilities` (text from wh40k-appdata\'s tables/wargear_ability.json, matched')
  console.log('  through wargear_item_profile_wargear_ability — the same ability name can carry')
  console.log('  different ranges per weapon). RU overlay in the same commit, as always.')
  return 1
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exitCode = await run()
