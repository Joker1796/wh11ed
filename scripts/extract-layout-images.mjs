// One-off puller: extracts the Terrain Layout diagrams (Event Companion "Layouts" page) directly
// from the official Warhammer 40,000 App's base APK, instead of hand-cropping the companion PDF.
//
// Discovery: the app's own data dump (wh40k-appdata) has NO image field for mission_layout rows —
// but the app's compiled resources carry the pictures anyway, named by that row's own id (dashes
// replaced by underscores): res/drawable/ic_layout_<uuid>.webp (clean, no measurements) and
// res/drawable/ic_measurement_layout_<uuid>.webp (same diagram + inch callouts — this is the one
// that matches wh11ed's current PDF-cropped images pixel-for-pixel, just at higher native res:
// 1535×1961 vs the PDF crop's 1040×1414). Both variants exist for all 45 real matchup/letter
// layouts (+3 unused generic placeholders wh11ed doesn't use).
//
// Usage: node scripts/extract-layout-images.mjs [path/to/App.xapk]
//   Defaults to the newest *.xapk in ../sources/apk/ (the hub-level sources folder, gitignored).
// Writes public/images/event/layout-<a>-<b>-<letter>-v2.png (measurement) and
// layout-<a>-<b>-<letter>-clean.png (no-measurement variant, for the "hide measurements" toggle).
// Run `npm run images:webp` afterwards to finish the pipeline (resize + webp + delete the .png
// originals), same as any other illustration.
//
// The "-v2" suffix on the measurement variant is a cache-bust: the first run of this script
// (2026-07-28) silently overwrote the old PDF-cropped `layout-<a>-<b>-<letter>.png` under its own
// stable name, and since these are cached a year under stable names (see CLAUDE.md's Deployment
// section), that left already-visited browsers/installed PWAs stuck showing the old crop
// indefinitely. Fixed by renaming to `-v2` and updating every reference (`eventCompanion.js`'s
// `layoutImages`, `imageDimensions.js`). If you ever need to replace these images again for a
// reason OTHER than a genuine visual change (i.e. content is identical, just re-extracted), you
// can keep `-v2`; if the actual artwork changes, bump to `-v3` and update those two files again —
// do NOT silently overwrite `-v2` in place.

import { execFileSync } from 'node:child_process'
import { readFileSync, mkdtempSync, rmSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const HUB = join(ROOT, '..')
const APPDATA = join(HUB, 'wh40k-appdata')
const APK_DIR = join(HUB, 'sources', 'apk')
const OUT_DIR = join(ROOT, 'public', 'images', 'event')

function findLatestXapk() {
  const arg = process.argv[2]
  if (arg) return arg
  const files = readdirSync(APK_DIR)
    .filter((f) => f.endsWith('.xapk'))
    .map((f) => join(APK_DIR, f))
    .sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)
  if (!files.length) throw new Error(`no *.xapk found in ${APK_DIR}`)
  return files[0]
}

// Same 5 dispositions / 15 unordered matchups as src/data/eventCompanion.js (kept in sync by
// hand — this script has no runtime dependency on the data file, just mirrors its constants).
const DISPOSITIONS = [
  ['take-and-hold', 'Take and Hold'],
  ['purge-the-foe', 'Purge the Foe'],
  ['disruption', 'Disruption'],
  ['reconnaissance', 'Reconnaissance'],
  ['priority-assets', 'Priority Assets'],
]
const slugByName = new Map(DISPOSITIONS.map(([slug, name]) => [name, slug]))
const MATCHUPS = [
  ['take-and-hold', 'take-and-hold'], ['take-and-hold', 'purge-the-foe'], ['take-and-hold', 'disruption'],
  ['take-and-hold', 'reconnaissance'], ['take-and-hold', 'priority-assets'], ['purge-the-foe', 'purge-the-foe'],
  ['purge-the-foe', 'disruption'], ['purge-the-foe', 'reconnaissance'], ['purge-the-foe', 'priority-assets'],
  ['disruption', 'disruption'], ['disruption', 'reconnaissance'], ['disruption', 'priority-assets'],
  ['reconnaissance', 'reconnaissance'], ['reconnaissance', 'priority-assets'], ['priority-assets', 'priority-assets'],
]

function parseLayoutName(name) {
  const m = name.match(/^(.+?) \/ (.+?) - Layout ([ABC])$/)
  return m ? { nameA: m[1], nameB: m[2], letter: m[3] } : null
}

async function main() {
  const xapkPath = findLatestXapk()
  console.log('Source:', xapkPath)

  const missionLayout = JSON.parse(readFileSync(join(APPDATA, 'tables', 'mission_layout.json'), 'utf8'))
  const idByKey = new Map() // "a|b|letter" -> appdata mission_layout id (both orderings)
  for (const row of missionLayout) {
    const parsed = parseLayoutName(row.localisations.en.name)
    if (!parsed) continue // skip the 3 generic "Mission Layout A/B/C" placeholders
    const slugA = slugByName.get(parsed.nameA)
    const slugB = slugByName.get(parsed.nameB)
    if (!slugA || !slugB) continue
    idByKey.set(`${slugA}|${slugB}|${parsed.letter}`, row.id)
    idByKey.set(`${slugB}|${slugA}|${parsed.letter}`, row.id)
  }

  const work = mkdtempSync(join(tmpdir(), 'wh11ed-layout-extract-'))
  execFileSync('unzip', ['-o', '-q', xapkPath, 'com.gamesworkshop.w40k.apk', '-d', work])
  const apkPath = join(work, 'com.gamesworkshop.w40k.apk')

  let extracted = 0
  let missing = 0
  for (const [a, b] of MATCHUPS) {
    for (const letter of ['A', 'B', 'C']) {
      const id = idByKey.get(`${a}|${b}|${letter}`)
      if (!id) { console.log(`  ! no appdata mission_layout match for ${a}/${b} Layout ${letter}`); missing++; continue }
      const uuid = id.replace(/-/g, '_')
      for (const [resPrefix, outSuffix] of [['ic_measurement_layout_', '-v2'], ['ic_layout_', '-clean']]) {
        const resPath = `res/drawable/${resPrefix}${uuid}.webp`
        try {
          execFileSync('unzip', ['-o', '-q', apkPath, resPath, '-d', work])
        } catch {
          console.log(`  ! missing APK resource ${resPath} (${a}/${b} Layout ${letter})`)
          continue
        }
        const srcWebp = join(work, resPath)
        const outPng = join(OUT_DIR, `layout-${a}-${b}-${letter.toLowerCase()}${outSuffix}.png`)
        await sharp(srcWebp).png({ compressionLevel: 9 }).toFile(outPng)
        extracted++
      }
    }
  }
  rmSync(work, { recursive: true, force: true })
  console.log(`\nExtracted ${extracted} image(s) (expected ${MATCHUPS.length * 3 * 2}), ${missing} matchup/letter combo(s) unmatched.`)
  console.log('Now run: npm run images:webp')
}

await main()
