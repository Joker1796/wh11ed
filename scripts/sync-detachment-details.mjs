// Report-only audit: every wh40k-appdata detachment "Restrictions"/"Keywords" card-box section
// (tables/detachment_detail.json + detachment_detail_bullet_point.json) must be reflected in
// wh11ed's detachment rule body. Neither sync-appdata.mjs nor sync-faction-text.mjs ever see this
// table — both only read the flat factions/<slug>.json bundle's rules[].body, which does NOT
// include this content at all (it lives in a separate table pair, generated from the app's
// detachment-card layout, not its rule text).
//
// Why this exists: found on 2026-07-27 — 13 detachments across blood-angels/dark-angels/
// black-templars/space-wolves were silently missing their mono-Chapter "Restrictions:" paragraph
// (a few also missing a Battleline-grant "Keywords:" paragraph), because nothing checked this
// table during the original 30-faction reconciliation project. Fixed by hand — see git history
// on branch feat/datasheet-drift-fixes. This audit is the guardrail so a future appdata bump
// can't reintroduce the same drift, or hide a new instance of it, unnoticed.
//
// Matching: bridged via src/data/sourceIds.json's `det:<wh11ed-id>` → appdata detachment uuid
// (collision-proof — several detachment names repeat across factions — same approach as
// sync-leader-units.mjs's datasheet bridge). For each bridged detachment with a detachment_detail
// row, every bullet is checked for presence in that detachment's wh11ed `rule.body` via a
// normalized word-overlap ratio, NOT an exact-string match: wh11ed sometimes rewords/reformats a
// bullet slightly even when the substance is there (Title Case vs ALL-CAPS keyword styling is a
// per-file convention, not a bug — see adeptus-custodes.js vs chaos-knights.js), and this table's
// content ranges from one-line keyword grants to multi-paragraph named abilities (Thralls of the
// First Prince, Cosmic Distortion). A bullet below the overlap threshold is flagged.
//
// One deliberate exception: a "Keywords" bullet that's a pure Battleline/Character grant is NOT
// flagged if src/data/conditionalKeywords.json already carries a grant for this detachment —
// several factions intentionally omit that prose (it's redundant with the keyword the site
// injects dynamically at render time; see wh11ed/CLAUDE.md's "Rule-granted keywords" section and
// this project's lesson 8(a)/8(b)). Without this exception the guardrail would flag every one of
// those correct, intentional omissions as a false positive.
//
// Report only — nothing is written (faction bodies are hand-authored + bilingual, and this table
// has no RU translation of its own to copy from; a silent auto-write would risk EN/RU desync, and
// there's no source text to write in RU anyway). Read the flagged lines, translate by hand, and
// add to BOTH src/data/factions/<slug>.js and src/data/factions/ru/<slug>.js.
//
// Usage: node scripts/sync-detachment-details.mjs   (also run as part of `npm run sync`).

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, APPDATA, loadJson, loadModule, sourceIds as sourceIdsMap, table as read } from './lib/sync-common.mjs'


// Common words that appear in nearly every detachment rule regardless of content — excluded from
// the overlap ratio so two unrelated paragraphs sharing "your army unit" don't look like a match.
const STOPWORDS = new Set(
  'the a an of to in on is are that this those these your you army armies unit units and or from with for if it can cannot not no be as at when one see model models has have gain gains keyword keywords'.split(
    ' ',
  ),
)

function words(s) {
  return (s || '')
    .toLowerCase()
    .replace(/\*\*/g, '')
    .replace(/[■▪]/g, ' ')
    .replace(/[^a-z0-9']+/g, ' ')
    .split(' ')
    .filter((w) => w && !STOPWORDS.has(w))
}

function overlapRatio(bulletWords, bodyWordSet) {
  if (!bulletWords.length) return 1
  const hit = bulletWords.filter((w) => bodyWordSet.has(w)).length
  return hit / bulletWords.length
}

// detachmentDetailId → [bullet text, ...] (displayOrder-sorted)
const bp = read('detachment_detail_bullet_point.json')
const bulletsByDetail = new Map()
for (const r of bp) {
  const arr = bulletsByDetail.get(r.detachmentDetailId) || []
  arr[r.displayOrder] = r?.localisations?.en?.text || ''
  bulletsByDetail.set(r.detachmentDetailId, arr)
}

// appdata detachmentId → [{ title, bullets }]
const detailsByDetachment = new Map()
for (const r of read('detachment_detail.json')) {
  const arr = detailsByDetachment.get(r.detachmentId) || []
  arr.push({ title: r?.localisations?.en?.title || '', bullets: (bulletsByDetail.get(r.id) || []).filter(Boolean) })
  detailsByDetachment.set(r.detachmentId, arr)
}

export async function run() {
// sourceIds bridge: `${slug}:${wh11ed-detachment-id}` → appdata uuid
const wh11edToUuid = new Map()
for (const [slug, entries] of Object.entries(sourceIdsMap() || {})) {
  for (const [key, uuid] of Object.entries(entries)) {
    if (!key.startsWith('det:')) continue
    wh11edToUuid.set(`${slug}:${key.slice(4)}`, uuid)
  }
}

const conditionalKeywords = loadJson(path.join(ROOT, 'src/data/conditionalKeywords.json')) || {}
function hasConditionalGrant(slug, detId) {
  return Object.values(conditionalKeywords[slug] || {}).some((grants) => grants.some((g) => g.det === detId))
}

const THRESHOLD = 0.7
const files = fs.readdirSync(path.join(ROOT, 'src/data/factions')).filter((f) => f.endsWith('.js') && f !== 'index.js')

const flagged = []
let scanned = 0
let unbridged = 0
let noDetail = 0

for (const f of files) {
  const slug = f.replace(/\.js$/, '')
  const mod = await loadModule(path.join(ROOT, 'src/data/factions', f))
  const en = Object.values(mod || {})[0]?.en
  if (!en?.detachments) continue
  for (const d of en.detachments) {
    scanned++
    const uuid = wh11edToUuid.get(`${slug}:${d.id}`)
    if (!uuid) {
      unbridged++
      continue
    }
    const details = detailsByDetachment.get(uuid)
    if (!details?.length) {
      noDetail++
      continue
    }

    const bodyWordSet = new Set(words(d.rule?.body))
    const missing = []
    for (const det of details) {
      const isKeywordsGrant = /keyword/i.test(det.title)
      if (isKeywordsGrant && hasConditionalGrant(slug, d.id)) continue // intentionally handled dynamically — see header note
      for (const bullet of det.bullets) {
        const bw = words(bullet)
        if (overlapRatio(bw, bodyWordSet) < THRESHOLD) missing.push({ title: det.title, bullet })
      }
    }
    if (missing.length) flagged.push({ slug, name: d.name, missing })
  }
}

console.log(
  `detachment Restrictions/Keywords: ${scanned} wh11ed detachments scanned, ${unbridged} not bridged by sourceIds, ${noDetail} have no appdata detail row, ${flagged.length} FLAGGED.`,
)
if (flagged.length) {
  console.log("\n  ✗ appdata carries a Restrictions/Keywords bullet this detachment's wh11ed rule body appears to be missing:")
  for (const r of flagged) {
    console.log(`\n    ${r.slug} · ${r.name}`)
    for (const m of r.missing) console.log(`      [${m.title}] ${m.bullet.replace(/\n+/g, ' ')}`)
  }
  console.log(
    "\n  Add to BOTH src/data/factions/<slug>.js and src/data/factions/ru/<slug>.js (this table has no\n  RU translation of its own — translate the bullet by hand, matching the file's existing convention).",
  )
}
return flagged.length ? 1 : 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
