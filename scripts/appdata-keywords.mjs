// Reconcile datasheet KEYWORDS to appdata canon (verbatim mirror).
//
// WHY: `npm run sync` never compared datasheet keyword lists, so wh11ed's keywords drifted from
// appdata across several app versions (missing keywords like a Necron NOBLE, stray ones like a wrong
// AIRCRAFT, internal app keywords Frame/Mobile, singular/plural forms). Policy (see the appdata-canon
// note): appdata is canon — mirror its `keywords[]` EXACTLY, including entries that look like typos
// (so a real rules change is never mistaken for one) and the internal Frame/Mobile keywords.
//
// This only touches the per-datasheet `keywords` array (not `factionKeywords`, not RU — keywords stay
// English in both locales). It edits the file TEXT in place, keeping the 6-space item indentation, and
// REFUSES to touch a datasheet whose current keywords don't match what it expects (a name collision or
// an already-edited file) — those are reported, not guessed.
//
// Usage:
//   node scripts/appdata-keywords.mjs                      # dry-run, ALL factions (report only)
//   node scripts/appdata-keywords.mjs --faction necrons,orks
//   node scripts/appdata-keywords.mjs --apply --faction necrons     # write the changes
//
// Appdata location: ../wh40k-appdata (override with WH40K_APPDATA_PATH).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const APPDATA = process.env.WH40K_APPDATA_PATH || path.join(ROOT, '..', 'wh40k-appdata')
const DS = path.join(ROOT, 'src', 'data', 'datasheets')
// wh11ed datasheet-file slug → appdata faction-bundle slug (they diverge for these two).
const ALIAS = { 'space-marines': 'adeptus-astartes', 'chaos-space-marines': 'heretic-astartes' }

const args = process.argv.slice(2)
const APPLY = args.includes('--apply')
const only = (() => {
  const i = args.indexOf('--faction')
  return i >= 0 && args[i + 1] ? new Set(args[i + 1].split(',')) : null
})()

const norm = (s) => String(s).replace(/[’']/g, "'").trim().toLowerCase()
const setEq = (a, b) => a.length === b.length && norm2(a) === norm2(b)
const norm2 = (a) => [...a].map(norm).sort().join('|')

// Extract the double-quoted strings from a keywords-array body (regex — robust to commas/newlines).
const parseItems = (body) => [...body.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => JSON.parse(`"${m[1]}"`))

let changed = 0, skipped = 0, filesTouched = 0
const files = fs.readdirSync(DS).filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js'))

for (const file of files) {
  const slug = file.replace('.js', '')
  if (only && !only.has(slug)) continue
  const appSlug = ALIAS[slug] || slug
  const appFile = path.join(APPDATA, 'factions', `${appSlug}.json`)
  if (!fs.existsSync(appFile)) continue

  const appData = JSON.parse(fs.readFileSync(appFile, 'utf8'))
  const appByName = new Map((appData.datasheets || []).map((d) => [norm(d.name), d]))
  const mod = await import(pathToFileURL(path.join(DS, file)).href)
  const units = Array.isArray(mod.default) ? mod.default : mod.default || []

  let txt = fs.readFileSync(path.join(DS, file), 'utf8')
  let fileChanged = false

  for (const u of units) {
    const app = appByName.get(norm(u.name))
    if (!app) continue
    const cur = u.keywords || []
    const target = app.keywords || []
    if (setEq(cur, target)) continue

    // Locate this datasheet's keywords array in the file text: the datasheet-level "name" (4-space
    // indent) then the next 4-space "keywords" array.
    const nameMarker = `    "name": ${JSON.stringify(u.name)}`
    const ni = txt.indexOf(nameMarker)
    const kwMarker = '\n    "keywords": ['
    const ki = ni >= 0 ? txt.indexOf(kwMarker, ni) : -1
    const arrEnd = ki >= 0 ? txt.indexOf('\n    ]', ki) : -1
    if (ni < 0 || ki < 0 || arrEnd < 0) {
      console.log(`  SKIP ${slug}/${u.name}: could not locate keywords array`)
      skipped++
      continue
    }
    const bodyStart = ki + kwMarker.length
    const found = parseItems(txt.slice(bodyStart, arrEnd))
    if (!setEq(found, cur)) {
      console.log(`  SKIP ${slug}/${u.name}: file keywords ${JSON.stringify(found)} ≠ expected ${JSON.stringify(cur)} (collision?)`)
      skipped++
      continue
    }

    const miss = target.filter((k) => !cur.map(norm).includes(norm(k)))
    const extra = cur.filter((k) => !target.map(norm).includes(norm(k)))
    console.log(`  ${slug}/${u.name}: +[${miss.join(', ')}] -[${extra.join(', ')}]`)
    changed++

    if (APPLY) {
      const newBody = '\n' + target.map((k) => `      ${JSON.stringify(k)}`).join(',\n') + '\n    '
      txt = txt.slice(0, bodyStart) + newBody + txt.slice(arrEnd + 1) // +1 drops the leading \n of "\n    ]"
      fileChanged = true
    }
  }

  if (APPLY && fileChanged) {
    fs.writeFileSync(path.join(DS, file), txt)
    filesTouched++
  }
}

console.log(`\n${APPLY ? 'APPLIED' : 'DRY-RUN'} — datasheets changed: ${changed}, skipped: ${skipped}${APPLY ? `, files written: ${filesTouched}` : ''}`)
