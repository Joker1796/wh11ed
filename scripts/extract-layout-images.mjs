// The Terrain Layout diagrams (Event Companion "Layouts" page), pulled straight from the official
// Warhammer 40,000 App's base APK instead of hand-cropping the companion PDF.
//
// Discovery: the app's own data dump (wh40k-appdata) has NO image field for mission_layout rows —
// but the app's compiled resources carry the pictures anyway, named by that row's own id (dashes
// replaced by underscores): res/drawable/ic_layout_<uuid>.webp (clean, no measurements) and
// res/drawable/ic_measurement_layout_<uuid>.webp (same diagram + inch callouts). Both variants
// exist for all 45 real matchup/letter layouts (+3 unused generic placeholders wh11ed doesn't use).
//
// WHAT THIS SCRIPT IS FOR, since 2026-09-15: not just pulling, but noticing. It hashes every
// layout resource in the APK against scripts/lib/layout-art.json and only touches the layouts
// whose bytes actually changed — GW redraws a handful at a time (27 of 45 on 2026-08-26), and
// re-writing all 45 would make every reader re-download ~10MB of identical pictures. A changed
// layout gets a NEW FILENAME (see fileBase in lib/layout-art.mjs): images are cached 30 days by
// the bucket and forever by the service worker's CacheFirst /images/ route, so replacing artwork
// under its old name leaves every reader who already has it stuck with the old battlefield.
//
// Usage:
//   node scripts/extract-layout-images.mjs [path/to/App.xapk]   # bump + extract what changed
//   node scripts/extract-layout-images.mjs --seed [path]        # record hashes only, write nothing
//   node scripts/extract-layout-images.mjs --all [path]         # re-extract all 45 at current names
//   (defaults to the newest *.xapk in ../sources/apk/, the hub-level gitignored folder)
//
// It rewrites the `layoutImages`/`layoutImagesClean` paths in src/data/eventCompanion.js for the
// layouts it bumped and deletes the superseded .webp files. Finish the pipeline afterwards:
//   npm run images:webp && npm run images:dims && npm run imghash -- --write
// and re-read layoutEdges for every bumped layout (see check-layout-art.mjs) — the attacker /
// defender battlefield edges are part of the artwork, and a redraw can move them.
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { basename, join } from 'node:path'
import sharp from 'sharp'
import {
  ROOT, OUT_DIR, layoutList, uuidByKey, resourcePaths, fileBase, publicPath,
  findLatestXapk, openApk, readResource, sha, loadManifest, saveManifest,
} from './lib/layout-art.mjs'

const args = process.argv.slice(2)
const seedOnly = args.includes('--seed')
const forceAll = args.includes('--all')
const xapkArg = args.find((a) => !a.startsWith('--'))

const DATA_FILE = join(ROOT, 'src', 'data', 'eventCompanion.js')

async function main() {
  const xapkPath = findLatestXapk(xapkArg)
  if (!xapkPath) throw new Error('no *.xapk found in ../sources/apk/ — pass one explicitly')
  console.log('Source:', basename(xapkPath))

  const manifest = loadManifest()
  const uuids = uuidByKey()
  const apk = openApk(xapkPath)

  const bumped = []
  const written = []
  const retired = []
  let unchanged = 0

  for (const { a, b, letter, key } of layoutList()) {
    const uuid = uuids.get(key)
    if (!uuid) { console.log(`  ! no appdata mission_layout row for ${a}/${b} Layout ${letter}`); continue }
    const res = resourcePaths(uuid)
    const bytes = {
      measurement: readResource(apk.apkPath, res.measurement),
      clean: readResource(apk.apkPath, res.clean),
    }
    if (!bytes.measurement || !bytes.clean) {
      console.log(`  ! APK is missing a resource for ${a}/${b} Layout ${letter}`)
      continue
    }
    const hashes = { measurement: sha(bytes.measurement), clean: sha(bytes.clean) }
    const prev = manifest.layouts[key]
    const version = prev?.version ?? 2
    const changed = !prev || prev.measurement !== hashes.measurement || prev.clean !== hashes.clean

    if (seedOnly) {
      manifest.layouts[key] = { version, ...hashes }
      continue
    }
    if (!changed && !forceAll) { unchanged++; continue }

    // A genuine redraw earns a new version (and new filenames); --all re-extracts in place.
    const nextVersion = changed && !forceAll ? version + 1 : version
    const from = fileBase(a, b, letter, version)
    const to = fileBase(a, b, letter, nextVersion)
    for (const variant of ['measurement', 'clean']) {
      await sharp(bytes[variant]).png({ compressionLevel: 9 }).toFile(join(OUT_DIR, `${to[variant]}.png`))
      written.push(`${to[variant]}.png`)
    }
    if (nextVersion !== version) {
      bumped.push({ key, a, b, letter, from, to, version: nextVersion })
      for (const variant of ['measurement', 'clean']) {
        for (const suffix of ['.webp', '-sm.webp']) {
          const old = join(OUT_DIR, `${from[variant]}${suffix}`)
          if (existsSync(old)) { rmSync(old); retired.push(`${from[variant]}${suffix}`) }
        }
      }
    }
    manifest.layouts[key] = { version: nextVersion, ...hashes }
  }

  apk.cleanup()
  manifest.source = basename(xapkPath)
  saveManifest(manifest)

  if (bumped.length) {
    let data = readFileSync(DATA_FILE, 'utf8')
    for (const b of bumped) {
      for (const variant of ['measurement', 'clean']) {
        const before = publicPath(b.from[variant])
        const after = publicPath(b.to[variant])
        if (!data.includes(before)) throw new Error(`eventCompanion.js does not reference ${before}`)
        data = data.split(before).join(after)
      }
    }
    writeFileSync(DATA_FILE, data)
  }

  if (seedOnly) {
    console.log(`Seeded ${Object.keys(manifest.layouts).length} layout hashes from this APK. No images written.`)
    return
  }
  console.log(`\n${unchanged} layout(s) unchanged, ${bumped.length} redrawn, ${written.length} PNG(s) written.`)
  for (const b of bumped) console.log(`  ⟲ ${b.a} / ${b.b} — Layout ${b.letter} → v${b.version}`)
  if (retired.length) console.log(`  ${retired.length} superseded .webp file(s) deleted`)
  if (written.length) {
    console.log('\nNow run: npm run images:webp && npm run images:dims && npm run imghash -- --write')
    if (bumped.length) console.log('And re-read layoutEdges for every layout listed above — the edge bars are part of the picture.')
  }
}

await main()
