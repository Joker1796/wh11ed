// Report-only audit: every wh11ed Character with a `leader.units` bodyguard list must match
// wh40k-appdata's Leader/Support rule text for that datasheet — no extra units, none missing,
// no duplicates.
//
// Why this exists: found on 2026-07-25 (user report: Azrael's card listed 18 units, appdata's
// own rule text says 8) — a bulk data-entry pass had polluted `leader.units` across most
// Adeptus Astartes Characters (and a smaller set in other factions) with a shared pool of
// unrelated unit names, plus a stray duplicate entry in almost every list. A full audit found ~85
// affected datasheets across 13 faction files — see git history for the one-time fix. This script
// is the guardrail so a future appdata bump can't reintroduce the same drift unnoticed.
//
// Ground truth is the denormalized **prose** bullet list in the Leader/Support `rules[].rules`
// text of the appdata bundle datasheet, matched to our datasheet by its **stable source UUID**
// (`src/data/sourceIds.json`: `ds:<wh11ed-id>` → appdata uuid → the bundle datasheet with that
// `id`). Matching the OWNER by uuid rather than by name is essential: several Leader/Support
// datasheet names are shared across factions (Sorcerer in CSM/Emperor's Children/Thousand Sons,
// Ministorum Priest in Sororitas/Astra Militarum/Agents, Watch Captain Artemis & Watch Master in
// Deathwatch/Agents, Master of Executions in CSM/World Eaters, Tech-priest Enginseer, …), so a
// name-keyed lookup silently pulls the wrong faction's attach list.
//
// The prose text (not the structural `datasheet_bodyguard_group*` tables) is used because those
// tables turned out to have coverage gaps — e.g. Judiciar's prose correctly lists WOLF GUARD /
// VANGUARD VETERAN SQUAD that the structural table simply has no row for — producing hundreds of
// false "extra" flags.
//
// Each ALL-CAPS bullet is resolved to our own unit name via `tables/datasheet.json` (name → uuid)
// bridged back through `sourceIds.json`. Two classes of mismatch remain, handled explicitly:
//   - **appdata data gaps**: a bullet with no matching datasheet anywhere in `tables/datasheet.json`
//     (e.g. Sororitas' "CRUSADERS", Death Korps' "DEATH KORPS GRENADIER SQUAD", "RELIC TERMINATOR
//     SQUAD", several Tau/Ork/Aeldari squad variants) — the unit is real but this dump has no card.
//     Never flagged as extra/missing; reported separately as "unresolved" so it isn't silently lost.
//   - **display-name aliases**: appdata's shorthand differs from our datasheet name (e.g. Black
//     Templars' "SWORD BRETHREN" vs our fuller "Sword Brethren Squad"). Detected as a prefix match
//     against an unresolved bullet on the SAME datasheet and excluded from "extra".
//
// Report only — nothing is written (read the flagged lines and fix leader.units by hand; RU
// datasheets don't carry a `units` array — see wh11ed/CLAUDE.md's DatasheetCard note — so there's
// no EN/RU parity risk here, unlike sync-enh-bodyguards's enhancement bodies).
//
// Usage: node scripts/sync-leader-units.mjs   (also run as part of `npm run sync`).

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, APPDATA, loadJson, sourceIds as sourceIdsMap, allFactionBundles, norm } from './lib/sync-common.mjs'

export async function run() {
// appdata datasheet.json: UPPER(name) → uuid[] (for resolving target bullets to our names)
const appUpperToIds = new Map()
for (const d of loadJson(path.join(APPDATA, 'tables/datasheet.json')) || []) {
  const n = d?.localisations?.en?.name
  if (!n) continue
  const key = n.toUpperCase()
  if (!appUpperToIds.has(key)) appUpperToIds.set(key, [])
  appUpperToIds.get(key).push(d.id)
}

// sourceIds bridge: appdata uuid → { slug, id }, and `${slug}:${id}` → appdata uuid
const byAppdataId = new Map()
const wh11edToUuid = new Map()
for (const [slug, entries] of Object.entries(sourceIdsMap() || {})) {
  for (const [key, uuid] of Object.entries(entries)) {
    if (!key.startsWith('ds:')) continue
    byAppdataId.set(uuid, { slug, id: key.slice(3) })
    wh11edToUuid.set(`${slug}:${key.slice(3)}`, uuid)
  }
}

// appdata Leader/Support prose bullets keyed by the OWNER datasheet's uuid (collision-proof)
const bulletsByUuid = new Map()
for (const { bundle: d } of allFactionBundles()) {
  if (!d?.datasheets) continue
  for (const ds of d.datasheets) {
    // A datasheet can carry BOTH rules, each with its own attach-list (data version 946
    // made the Judiciar the first such case: Support to 6 units, Leader to 15). wh11ed
    // models one flat attach-list per datasheet — the distinction is not represented for
    // any of the ~46 Support sheets either — so the ground truth here is the UNION.
    const rules = (ds.rules || []).filter((r) => r.name === 'Leader' || r.name === 'Support')
    if (!rules.length || !ds.id) continue
    const bullets = [...new Set(rules.flatMap((r) =>
      [...r.rules.matchAll(/\*+([^*]+)\*+/g)].map((m) => m[1].trim()),
    ))]
    bulletsByUuid.set(ds.id, bullets)
  }
}

// wh11ed: id → name (global, for bridging targets), and per-file datasheet arrays
const dsDir = path.join(ROOT, 'src/data/datasheets')
const files = fs.readdirSync(dsDir).filter((f) => f.endsWith('.js') && f !== 'index.js' && f !== 'index.test.js')
const idToName = new Map()
const fileArrays = new Map()
for (const f of files) {
  const mod = await import(pathToFileURL(path.join(dsDir, f)).href)
  fileArrays.set(f, mod.default)
  for (const ds of mod.default) if (ds.id) idToName.set(ds.id, ds.name)
}

const flagged = []
let scanned = 0
let unbridged = 0

for (const f of files) {
  const slug = f.replace(/\.js$/, '')
  for (const ds of fileArrays.get(f)) {
    if (!ds.leader?.units) continue
    scanned++
    const uuid = wh11edToUuid.get(`${slug}:${ds.id}`)
    const bullets = uuid && bulletsByUuid.get(uuid)
    if (!bullets) { unbridged++; continue } // no sourceIds bridge / not a Leader-Support in appdata

    const units = ds.leader.units
    const seen = new Set()
    const dups = [...new Set(units.filter((u) => (seen.has(u) ? true : (seen.add(u), false))))]

    const resolvedNames = []
    const unresolvedBullets = []
    for (const b of bullets) {
      let name = null
      for (const cid of appUpperToIds.get(b.toUpperCase()) || []) {
        const bridge = byAppdataId.get(cid)
        if (bridge && idToName.has(bridge.id)) { name = idToName.get(bridge.id); break }
      }
      if (name) resolvedNames.push(name)
      else unresolvedBullets.push(b)
    }

    const refSet = new Set(resolvedNames)
    const whSet = new Set(units)
    const rawNorm = bullets.map(norm)
    const isAliasOfUnresolved = (u) => {
      const nu = norm(u)
      return unresolvedBullets.some((b) => {
        const nb = norm(b)
        return nu === nb || nu.startsWith(nb + ' ') || nb.startsWith(nu + ' ')
      })
    }
    const extra = [...new Set(units)].filter((u) => !refSet.has(u) && !rawNorm.includes(norm(u)) && !isAliasOfUnresolved(u))
    const missing = resolvedNames.filter((u) => !whSet.has(u))

    if (dups.length || extra.length || missing.length) {
      flagged.push({ file: f, name: ds.name, dups, extra, missing, unresolvedCount: unresolvedBullets.length })
    }
  }
}

console.log(`leader/support attach-lists: ${scanned} datasheets scanned, ${unbridged} not bridged by sourceIds / no appdata Leader-Support, ${flagged.length} FLAGGED.`)
if (flagged.length) {
  console.log('\n  ✗ leader.units does not match appdata for:')
  for (const r of flagged) {
    console.log(`\n    ${r.file} · ${r.name}`)
    if (r.dups.length) console.log(`      duplicate entries: ${r.dups.join(', ')}`)
    if (r.extra.length) console.log(`      extra (remove): ${r.extra.join(', ')}`)
    if (r.missing.length) console.log(`      missing (add): ${r.missing.join(', ')}`)
    if (r.unresolvedCount) console.log(`      (+ ${r.unresolvedCount} appdata bullet(s) with no matching datasheet anywhere — likely an appdata data gap, not checked)`)
  }
}
return flagged.length ? 1 : 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
