// Generate src/data/conditionalKeywords.json — a sidecar listing the keywords a datasheet
// GAINS from an army/detachment rule rather than having printed on its sheet (e.g. a Dark
// Angels Terminator Squad gaining Deathwing via The Unforgiven, or an Outrider Squad gaining
// Battleline in the Company of Hunters detachment). GW/appdata never print these on the sheet
// — they're granted conditionally — so DatasheetCard has to merge them in at render time.
//
// Source of truth is appdata's structural `conditional_keyword` table (a per-datasheet grant
// with one condition column). We import only the two conditions that map cleanly onto a wh11ed
// faction page's context:
//   - requiredRosterFactionKeywordId → the whole army is that Chapter (always true on that
//     faction's page)               → emit unconditionally under that faction slug
//   - requiredDetachmentId          → only while that detachment is the active pick
//     → emit with a `det` gate (the wh11ed detachment id)
// The allegiance-ability grants (Mark of Chaos: KHORNE/TZEENTCH/… per unit) and rows with ONLY a
// warlord condition (no det/roster gate at all) are a different, per-unit army-list choice not
// modelled by the static datasheet page, so they're skipped here entirely (counted in the report
// as a reminder). A row can also carry `requiredWarlordMiniatureId` ON TOP OF an already-modelled
// det/roster gate (exactly 1 case game-wide as of writing: Astra Militarum's Tempestus Scions
// gaining Battleline in Bridgehead Strike, but ONLY while a Militarum Tempestus Officer model is
// Warlord) — that additional condition isn't itself modelled (no wh11ed-side warlord-miniature
// mapping to translate it into), but dropping it silently would make the grant look
// unconditional on just the detachment/roster, which overstates it. Flagged instead via `extra`.
//
// The appdata datasheet/detachment UUIDs are translated to wh11ed ids by INVERTING
// src/data/sourceIds.json (the same stable-id bridge gen-source-ids.mjs builds), so this stays
// automatic across appdata bumps: regenerate after a bump and new grants land themselves.
//
// Shape: { "<faction-slug>": { "<unit-id>": [ { "kw": "Deathwing" }, { "kw": "Battleline",
//         "det": "company-of-hunters" }, { "kw": "Battleline", "det": "bridgehead-strike",
//         "extra": true }, ... ] } }  (no `det` = unconditional on that faction; `extra: true` =
//         an additional un-modelled condition — currently always a Warlord requirement — also
//         gates this grant, so the det/roster context alone isn't the whole story).
//
// Usage:
//   node scripts/gen-conditional-keywords.mjs           # write the sidecar + report
//   node scripts/gen-conditional-keywords.mjs --check    # report only; non-zero exit if stale
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, APPDATA, loadJson, loadModule } from './lib/sync-common.mjs'

const T = (f) => loadJson(path.join(APPDATA, 'tables', f)) || []
const nm = (r) => r?.localisations?.en?.name

// slug from a faction-keyword display name, matching wh11ed's src/data/factions/*.js filenames
// ("Dark Angels" → "dark-angels", "Blood Angels" → "blood-angels"). Apostrophes are dropped, not
// hyphenated, so "T'au Empire" → "tau-empire".
const slugify = (s) => (s || '').toLowerCase().replace(/[’'`]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// Fold a Chapter's shared space-marines.js datasheets back in — mirrors
// src/data/datasheets/index.js's loadDatasheets (and gen-source-ids.mjs) so the effective id set
// and printed-keyword lookup below see the same flat per-faction list the page renders.
async function effectiveSheets(slug) {
  const mod = await loadModule(path.join(ROOT, 'src/data/datasheets', `${slug}.js`))
  if (!mod) return []
  const own = mod.default || []
  if (!mod.sharedUnitIds?.length) return own
  const sm = await loadModule(path.join(ROOT, 'src/data/datasheets/space-marines.js'))
  const idSet = new Set(mod.sharedUnitIds)
  return [...own, ...(sm?.default || []).filter((d) => idSet.has(d.id))]
}

const kwName = Object.fromEntries(T('keyword.json').map((r) => [r.id, nm(r)]))
const fkName = Object.fromEntries(T('faction_keyword.json').map((r) => [r.id, nm(r)]))

// Invert sourceIds: appdata UUID → { slug, id } for datasheets and detachments (both keyed by
// wh11ed's own slug + id in the bridge, which is exactly the display context we need).
const sourceIds = loadJson(path.join(ROOT, 'src/data/sourceIds.json')) || {}
const dsInv = {}
const detInv = {}
for (const slug of Object.keys(sourceIds)) {
  for (const [key, uuid] of Object.entries(sourceIds[slug])) {
    if (key.startsWith('ds:')) dsInv[uuid] = { slug, id: key.slice(3) }
    else if (key.startsWith('det:')) detInv[uuid] = { slug, id: key.slice(4) }
  }
}

const factionSlugs = new Set(
  fs.readdirSync(path.join(ROOT, 'src/data/factions')).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, '')),
)

const ck = T('conditional_keyword.json')
const skipped = { allegiance: 0, warlord: 0, unmappedDatasheet: 0, unmappedDetachment: 0, notAFaction: 0 }
let extraCondition = 0
// pending[] before per-faction datasheet verification: { slug, unitId, kw, det|null, extra? }
const pending = []
for (const r of ck) {
  const kw = kwName[r.keywordId]
  const unit = dsInv[r.datasheetId]
  if (!unit) { skipped.unmappedDatasheet++; continue }

  let slug
  let det = null
  if (r.requiredRosterFactionKeywordId) {
    slug = slugify(fkName[r.requiredRosterFactionKeywordId])
  } else if (r.requiredDetachmentId) {
    const di = detInv[r.requiredDetachmentId]
    if (!di) { skipped.unmappedDetachment++; continue }
    slug = di.slug
    det = di.id
  } else if (r.requiredAllegianceAbilityId) {
    skipped.allegiance++
    continue
  } else {
    skipped.warlord++
    continue
  }

  if (!factionSlugs.has(slug)) { skipped.notAFaction++; continue }
  // A row can ALSO carry requiredWarlordMiniatureId on top of the det/roster gate already
  // modelled above (exactly 1 row game-wide as of this writing — Astra Militarum's Tempestus
  // Scions gaining Battleline in Bridgehead Strike, ONLY while a Militarum Tempestus Officer
  // model is Warlord). That extra condition isn't itself modelled (no wh11ed-side warlord-
  // miniature mapping), but dropping it silently would make the grant look unconditional on
  // just the detachment — flag it instead so the render can say "additional conditions apply"
  // rather than quietly overstating what the detachment alone grants.
  const extra = !!r.requiredWarlordMiniatureId
  if (extra) extraCondition++
  pending.push({ slug, unitId: unit.id, kw, det, extra })
}

// Verify each grant's unit actually renders on that faction page (own or folded-in shared), and
// drop a grant that the sheet already prints (render dedups too, but keep the sidecar minimal).
const bySlug = {}
for (const p of pending) (bySlug[p.slug] ||= []).push(p)

const out = {}
let dropped = 0
for (const slug of Object.keys(bySlug)) {
  const sheets = await effectiveSheets(slug)
  const printed = new Map(sheets.map((d) => [d.id, new Set([...(d.keywords || []), ...(d.keywordsByModel || []).flatMap((g) => g.list || [])])]))
  for (const p of bySlug[slug]) {
    if (!printed.has(p.unitId)) { dropped++; continue } // unit not on this faction page
    if (printed.get(p.unitId).has(p.kw)) { dropped++; continue } // already printed on the sheet
    const unitMap = (out[slug] ||= {})
    const list = (unitMap[p.unitId] ||= [])
    // de-dupe identical (kw, det) grants (appdata sometimes has duplicate datasheet rows)
    if (!list.some((g) => g.kw === p.kw && (g.det || null) === p.det)) {
      const g = p.det ? { kw: p.kw, det: p.det } : { kw: p.kw }
      if (p.extra) g.extra = true
      list.push(g)
    }
  }
}

// Deterministic ordering: slugs, then unit ids, then keyword name.
const sorted = {}
for (const slug of Object.keys(out).sort()) {
  sorted[slug] = {}
  for (const unitId of Object.keys(out[slug]).sort()) {
    sorted[slug][unitId] = out[slug][unitId].sort((a, b) => a.kw.localeCompare(b.kw) || (a.det || '').localeCompare(b.det || ''))
  }
}

const OUT = path.join(ROOT, 'src/data/conditionalKeywords.json')
const json = JSON.stringify(sorted, null, 2) + '\n'
const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null

const grantCount = Object.values(sorted).reduce((n, u) => n + Object.values(u).reduce((m, l) => m + l.length, 0), 0)
console.log(
  `conditionalKeywords: ${grantCount} grants across ${Object.keys(sorted).length} factions ` +
    `(skipped ${skipped.allegiance} Mark-of-Chaos/allegiance, ${skipped.warlord} warlord-only; ` +
    `${skipped.unmappedDatasheet} datasheet / ${skipped.unmappedDetachment} detachment unmapped, ` +
    `${skipped.notAFaction} non-wh11ed faction, ${dropped} already-printed/off-page, ` +
    `${extraCondition} flagged with an extra un-modelled warlord condition).`,
)

const check = process.argv.includes('--check')
if (check) {
  if (prev !== json) {
    console.log('  --check: src/data/conditionalKeywords.json is stale; run `node scripts/gen-conditional-keywords.mjs`.')
    process.exit(1)
  }
  console.log('  --check: up to date.')
} else {
  fs.writeFileSync(OUT, json)
  console.log(`  wrote ${path.relative(ROOT, OUT)}${prev === json ? ' (unchanged)' : ''}`)
}
