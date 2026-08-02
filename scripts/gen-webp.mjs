// Converts illustration images to WebP for the "app" build.
//
// For every illustration `foo.<ext>` under public/images/ it writes:
//   foo.webp      — full-resolution WebP (desktop)
//   foo-sm.webp   — width min(800, srcWidth) WebP (mobile, served at <=640px)
// then deletes the original `foo.<ext>`.
//
// Icons (dispo-/legend-/marker-*, QR) render via plain <img> (not AppImage) and
// don't need a -sm variant. They are downscaled to ~2x their display size and written
// as a single `foo.webp` (see iconSpec()); the original is deleted too.
//
// Idempotent: re-running converts any newly-added jpg/png and back-fills a missing
// `-sm.webp` next to an already-converted illustration `foo.webp`.
//
// Usage: npm run images:webp

import { readdir, stat, unlink, access } from 'node:fs/promises'
import { join, relative, basename, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const IMAGES_DIR = join(ROOT, 'public', 'images')
const MOBILE_WIDTH = 800

// posix-style path relative to public/images, e.g. "turn/CHARGE-PHASE.png"
const rel = abs => relative(IMAGES_DIR, abs).split('\\').join('/')

function isIllustration(absPath) {
  const r = rel(absPath)
  const ext = extname(r).toLowerCase()
  const name = basename(r)
  if (ext === '.jpg' || ext === '.jpeg') return !name.startsWith('legend-')
  // event/layout-*.png: extracted from the app's own webp assets (see
  // scripts/extract-layout-images.mjs), kept as PNG (not jpg) because the source has real
  // alpha at the diagram's outer margin that must survive into the illustration webp.
  if (ext === '.png') return r === 'intro/datasheet.png' || r.startsWith('turn/') || r.startsWith('event/layout-')
  return false
}

// Small UI icons rendered via plain <img>. Matched by basename so it works on the
// original (.png/.jpg) and the converted (.webp) alike. maxWidth ≈ 2× display size.
function iconSpec(absPath) {
  const name = basename(absPath, extname(absPath))
  if (name.startsWith('marker-')) return { maxWidth: 800, lossless: true }
  if (name.startsWith('dispo-')) return { maxWidth: 128, lossless: false }
  if (name.startsWith('legend-')) return { maxWidth: 192, lossless: false }
  // Battle-round turn-structure icons (see TurnStructureDiagram.vue) — flat monochrome
  // shapes rendered via CSS mask-image, so they need alpha, not a -sm variant.
  if (name.startsWith('icon-')) return { maxWidth: 200, lossless: true }
  // wh40k-app-qr.png is left as-is: the original is a tiny (~4KB) crisp b/w PNG;
  // downscaling + webp made it larger and softer (bad for scanning).
  return null
}

const exists = async p => access(p).then(() => true, () => false)

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(p)
    else if (entry.isFile()) yield p
  }
}

// Write full + mobile WebP from a given source image path.
async function writeWebp(srcPath, outBase, lossless) {
  const fullOut = `${outBase}.webp`
  const smOut = `${outBase}-sm.webp`
  const meta = await sharp(srcPath).metadata()

  await sharp(srcPath)
    .webp(lossless ? { lossless: true } : { quality: 78 })
    .toFile(fullOut)

  const smPipe = sharp(srcPath)
  if (meta.width && meta.width > MOBILE_WIDTH) smPipe.resize({ width: MOBILE_WIDTH })
  await smPipe.webp(lossless ? { lossless: true } : { quality: 75 }).toFile(smOut)

  return { width: meta.width, fullOut, smOut }
}

let converted = 0
let icons = 0
let backfilled = 0

for await (const file of walk(IMAGES_DIR)) {
  const ext = extname(file).toLowerCase()
  const name = basename(file, ext)

  // Back-fill a missing -sm.webp next to an already-converted illustration webp.
  // Icons are single-variant — never give them a -sm.
  if (ext === '.webp' && !name.endsWith('-sm')) {
    if (iconSpec(file)) continue
    const outBase = join(dirname(file), name)
    if (!(await exists(`${outBase}-sm.webp`))) {
      const meta = await sharp(file).metadata()
      const smPipe = sharp(file)
      if (meta.width && meta.width > MOBILE_WIDTH) smPipe.resize({ width: MOBILE_WIDTH })
      await smPipe.webp({ quality: 75 }).toFile(`${outBase}-sm.webp`)
      backfilled++
      console.log(`+sm  ${rel(file).replace('.webp', '-sm.webp')}`)
    }
    continue
  }

  if (!(ext === '.jpg' || ext === '.jpeg' || ext === '.png')) continue
  if (name.endsWith('-sm')) continue

  // Icons: downscale to ~2x display size, single webp, no -sm.
  const icon = iconSpec(file)
  if (icon) {
    const meta = await sharp(file).metadata()
    const pipe = sharp(file)
    if (meta.width && meta.width > icon.maxWidth) pipe.resize({ width: icon.maxWidth })
    await pipe.webp(icon.lossless ? { lossless: true } : { quality: 80 }).toFile(join(dirname(file), `${name}.webp`))
    await unlink(file)
    icons++
    console.log(`icon ${rel(file)} -> ${name}.webp  (w=${Math.min(meta.width || icon.maxWidth, icon.maxWidth)}${icon.lossless ? ', lossless' : ''})`)
    continue
  }

  if (!isIllustration(file)) continue

  // event/layout-*.png needs alpha (transparent outer margin) but its content is a noisy,
  // textured photo-style diagram, not flat vector art — lossless bloats it ~8x (1MB vs
  // ~130KB) for no visible gain. Lossy WebP still carries a (lossy-compressed) alpha plane,
  // so it keeps the transparency at a fraction of the size — same tradeoff as the "photographic,
  // so lossy ≈ the old quality in bytes" note for the core-rules illustrations below.
  const lossless = ext === '.png' && !rel(file).startsWith('event/layout-')
  const outBase = join(dirname(file), name)
  const { width } = await writeWebp(file, outBase, lossless)
  await unlink(file)
  converted++
  console.log(`webp ${rel(file)} -> ${name}.webp + ${name}-sm.webp  (w=${width}${lossless ? ', lossless' : ''})`)
}

console.log(`\nDone. Converted ${converted} illustration(s) + ${icons} icon(s), back-filled ${backfilled} -sm variant(s).`)
