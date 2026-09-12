#!/usr/bin/env node
// Guards the one rule that keeps a changed illustration from staying invisible: an image under
// `public/images/` may not be edited in place — replacing it means giving it a new NAME.
//
// The reason is two caches deep. Image URLs are stable (no content hash in the filename), and both
// things that hold them serve by URL alone: the bucket sends a 30-day `Cache-Control`, and
// the service worker's `/images/` route is CacheFirst, which never revalidates whatever the headers
// say. So a reader who has already seen the old picture keeps seeing it — on their phone, at the
// table, with no way to tell it is stale and nothing we can deploy to fix it. Renaming the file
// makes it a different URL and the problem cannot arise.
//
// That rule has been written down in CLAUDE.md and in deploy.sh since the split was designed, and
// a rule that is only written down is a rule that will eventually be forgotten — which is why this
// repo turns its conventions into gates (parity, radii, dupes, wtags, dsrules). This one is the
// image equivalent. Run by `npm run imghash`, and in CI.
//
// `--write` is the escape hatch AND the normal way to record new art: it rewrites the baseline.
// Editing in place on purpose (accepting that everyone who has the old bytes keeps them) is a
// decision the baseline then records, in a diff a reviewer can see.
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const ROOT = 'public/images'
const BASELINE = 'scripts/lib/image-hashes.json'
const write = process.argv.includes('--write')

// Images only. The directory also holds its own CLAUDE.md, which is prose and is meant to be
// edited in place — and which the manifest emitter skips for the same reason (vite.config.js).
const IMAGE = /\.(webp|png|jpe?g|gif|svg|avif|ico)$/i

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (IMAGE.test(name)) out.push(p)
  }
  return out
}

// Posix separators so the baseline reads the same on either machine — the mistake check-radii.mjs
// records in its own header, which cost a day of "red here, green in CI".
const current = {}
for (const p of walk(ROOT).sort()) {
  const rel = relative('.', p).split(sep).join('/')
  current[rel] = createHash('sha1').update(readFileSync(p)).digest('hex').slice(0, 12)
}

let previous = {}
try {
  previous = JSON.parse(readFileSync(BASELINE, 'utf8'))
} catch {
  if (!write) {
    console.error(`✗ no baseline at ${BASELINE} — create it with \`npm run imghash -- --write\``)
    process.exit(1)
  }
}

const changed = Object.keys(current).filter((f) => previous[f] && previous[f] !== current[f])
const added = Object.keys(current).filter((f) => !previous[f])
const removed = Object.keys(previous).filter((f) => !current[f])

if (write) {
  writeFileSync(BASELINE, `${JSON.stringify(current, null, 2)}\n`)
  console.log(`✓ imghash: baseline written — ${Object.keys(current).length} image(s)` +
    `${added.length ? `, +${added.length} new` : ''}${removed.length ? `, −${removed.length} gone` : ''}` +
    `${changed.length ? `, ${changed.length} EDITED IN PLACE` : ''}`)
  process.exit(0)
}

if (changed.length) {
  console.error(`✗ ${changed.length} image(s) changed without being renamed:\n`)
  for (const f of changed) console.error(`  ${f}`)
  console.error(`
An image URL is cached for 30 days by the CDN and indefinitely by the service worker's CacheFirst
route, both of which key on the URL alone. Everyone who has already loaded the old bytes will go
on seeing them, and no deploy can reach them.

Give the new file a new name (and update whatever references it), or — if you mean to ship it in
place and accept that — record the decision with:  npm run imghash -- --write`)
  process.exit(1)
}

// New and removed files are safe by construction: a new name is a URL nobody has cached, and a
// deleted one is simply never requested again. They still have to reach the baseline, so say so.
if (added.length || removed.length) {
  console.log(`✓ imghash: nothing edited in place (+${added.length} new, −${removed.length} gone` +
    ` — run \`npm run imghash -- --write\` to record them)`)
} else {
  console.log(`✓ imghash: ${Object.keys(current).length} images, none edited in place`)
}
