#!/usr/bin/env node
// gen-datasheets.mjs — transcribe a faction's datasheets from wh40k-appdata into the shape of
// src/data/datasheets/<slug>.js. For the day a codex replaces a faction wholesale (Orks 946,
// Space Marines 963): a diff against the old file is then a rewrite, and hand-porting 100+
// sheets is where the transcription errors come from.
//
//   node scripts/gen-datasheets.mjs <slug>            # print a summary, write nothing
//   node scripts/gen-datasheets.mjs <slug> --write    # rewrite src/data/datasheets/<slug>.js
//
// What it keeps from the file it replaces, because appdata does not carry it:
//   - `id` of a unit whose name survived (ids are URLs, and a player's marks hang off them);
//   - `flavor` where appdata's `lore` is null (most codex sheets ship without it);
//   - the file's header comment, `sharedUnitIds` and `pointsOverrides` exports (the Chapter
//     fold — recompute those separately, see src/data/CLAUDE.md "SM-Chapter datasheet dedup");
//   - faction-pack Legends sheets (`source: 'faction-pack'`) appdata still does not carry.
// Points come from appdata's base price; `npm run sync:mfm -- --write` afterwards puts the
// MFM's copy-tax tiers on top. Nothing here is translated: the RU overlay is a separate pass.
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, APPDATA, norm, currentWargearRules, appdataToMarkup, appdataToParagraphs, loadJson, loadModule, table, nameOfEn, combatPatrolNames } from './lib/sync-common.mjs'
import { slugify } from '../src/data/slugify.js'
import { loadAppdataBundle } from './lib/appdata-exceptions.mjs'

const slug = process.argv[2]
const WRITE = process.argv.includes('--write')
if (!slug || slug.startsWith('--')) {
  console.log('Usage: node scripts/gen-datasheets.mjs <slug> [--write]')
  process.exit(1)
}

// With scripts/lib/appdata-exceptions.mjs applied: a departure from appdata we decided on survives
// the regeneration instead of being transcribed away.
const bundle = loadAppdataBundle(slug)
if (!bundle) { console.error(`no appdata bundle for ${slug}`); process.exit(1) }
const file = path.join(ROOT, 'src/data/datasheets', `${slug}.js`)
const oldMod = (await loadModule(file)) || {}
const oldSheets = oldMod.default || []
const oldByName = new Map(oldSheets.map((d) => [norm(d.name), d]))

const legendsIds = new Set(table('datasheet.json').filter((d) => d.isLegends).map((d) => d.id))
const fkName = new Map(table('faction_keyword.json').map((f) => [f.id, nameOfEn(f) || f.name]))
const factionKeywordsOf = new Map()
for (const r of [...table('datasheet_faction_keyword.json')].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))) {
  if (!factionKeywordsOf.has(r.datasheetId)) factionKeywordsOf.set(r.datasheetId, [])
  factionKeywordsOf.get(r.datasheetId).push(fkName.get(r.factionKeywordId))
}

const cp = combatPatrolNames()
const appSheets = (bundle.datasheets || []).filter((d) => !d.isCombatPatrol && !cp.datasheets.has(norm(d.name)))

const md = appdataToParagraphs
const bullets = (s) => md(s).replace(/^▫ /gm, '▪ ')

// A "hunter" profile is the one a weapon uses against one keyword — appdata flags it with
// `hunterProfileKeyword` ("**MONSTER/VEHICLE**", or a broken "**null**" on three Chapter sheets,
// one of which even names the profile after the weapon). The keyword goes into the row name the
// way the Orks codex was first transcribed: "Choppa – hunter (vs MONSTER/VEHICLE)".
function weaponRows(item, type) {
  const profiles = (item.profiles || []).filter((p) => p.type === type)
  return profiles.map((p) => {
    const hunterKw = 'hunterProfileKeyword' in p ? p.hunterProfileKeyword.replace(/\*/g, '').trim() : null
    const mode = hunterKw !== null && norm(p.name) === norm(item.name) ? 'hunter' : p.name.toLowerCase()
    const vs = hunterKw && hunterKw !== 'null' ? ` (vs ${hunterKw.toUpperCase()})` : ''
    const name = profiles.length > 1 && (norm(p.name) !== norm(item.name) || hunterKw !== null)
      ? `${item.name} – ${mode}${vs}`
      : item.name
    const row = { name, tags: [...(p.tags || [])] }
    if (type === 'ranged') Object.assign(row, { range: p.range, a: p.A, bs: p.BS })
    else Object.assign(row, { a: p.A, ws: p.WS })
    return Object.assign(row, { s: p.S, ap: p.AP, d: p.D })
  })
}

// "<ul><li>1 Sergeant model</li>…</ul>Every model is equipped with: …" → composition + loadout.
// The older Imperial Armour / Legends sheets write the list with "•" instead of <ul>.
function compositionAndLoadout(html) {
  const s = (html || '').replace(/\r\n?/g, '\n')
  let composition = [...s.matchAll(/<li[^>]*>(.*?)<\/li>/gis)].map((m) => appdataToMarkup(m[1])).filter(Boolean)
  let body = s.replace(/<ul[^>]*>.*?<\/ul>/gis, '\n')
  if (!composition.length) {
    const lines = appdataToMarkup(s.replace(/•/g, '\n■ ')).split('\n')
    composition = lines.filter((l) => l.startsWith('▪ ')).map((l) => l.replace(/^▪ /, '').replace(/\s*(Every|This|Each|The|Any)\b.*equipped with:.*$/, '').trim()).filter(Boolean)
    body = s.replace(/•[^•]*?(?=(Every|This|Each|The|Any)\b[^.]*?equipped with:|•|$)/g, '')
  }
  const loadout = body.split('\n').map((l) => appdataToMarkup(l)).filter(Boolean)
    .flatMap((l) => l.split(/(?<=\.)\s*(?=(?:\*\*)?(?:Every|This|Each|The|Any)\b)/))
    .map((l) => l.trim().replace(/^\*\*(.*?)\*\*/, '$1'))
    .filter(Boolean)
    .map((l) => l.replace(/^(.*?equipped with:)/, '**$1**'))
    .join('\n')
  return { composition, loadout }
}

// Invulnerable saves come in three shapes: one for the whole unit; one against ranged or melee
// attacks only (Judiciar), which prints as the save plus an `invNote`; and one per MODEL of a
// mixed unit (Wardens of Ultramar), keyed by a miniature id that is resolved to its statline
// through miniature.json — by characteristics, since a statline carries no id of its own.
const miniatures = new Map(table('miniature.json').map((m) => [m.id, m]))
const MINI_STATS = [['M', 'movement'], ['T', 'toughness'], ['Sv', 'save'], ['W', 'wounds'], ['Ld', 'leadership'], ['OC', 'objectiveControl']]
function invFor(ds) {
  const saves = ds.invulnerableSaves || []
  const out = new Map() // statline index → { inv, invNote? }
  const all = (v) => (ds.statlines || []).forEach((_, i) => out.set(i, v))
  let ambiguous = false
  for (const s of saves) {
    const value = s.save || s.rangedSave || s.meleeSave
    if (!value) continue
    const v = { inv: value }
    // The condition is written whenever appdata prints one — also beside a plain `save`. Keying it
    // off `!s.save` alone dropped the Astraeus' "…against ranged attacks." (2026-10).
    if (s.rules) v.invNote = `* ${appdataToMarkup(s.rules).replace(/\*/g, '').trim()}`
    else if (!s.save) v.invNote = `* Against ${s.rangedSave ? 'ranged' : 'melee'} attacks only`
    if (!s.miniatureId) { all(v); continue }
    const mini = miniatures.get(s.miniatureId)
    const hits = (ds.statlines || []).map((st, i) => (mini && MINI_STATS.every(([a, b]) => String(st[a]) === String(mini[b])) ? i : -1)).filter((i) => i >= 0)
    if (hits.length) hits.forEach((i) => out.set(i, v))
    else ambiguous = true
  }
  return { byStatline: out, ambiguous }
}

const report = { kept: [], added: [], ambiguousInv: [], droppedRules: [] }

// Who a Leader may join. The structural `leaderOf` is the base — it names the exact datasheet
// ("Vanguard Veteran Squad with Jump Packs") where the rule's own prose can be shorter than any
// real name ("■ VANGUARD VETERAN SQUAD", which would read as the Legends squad on foot) — and the
// prose adds what the table leaves out: Watch Master and Watch Captain Artemis lead Deathwatch Kill
// Teams in the prose only (963). A prose bullet is resolved to a datasheet name anywhere in the
// game, and dropped when it is just the start of a name the table already gave.
const allSheetNames = new Map()
for (const f of fs.readdirSync(path.join(APPDATA, 'factions')).filter((x) => !x.startsWith('_'))) {
  for (const d of loadJson(path.join(APPDATA, 'factions', f))?.datasheets || []) allSheetNames.set(norm(d.name), d.name)
}
function leaderUnits(ds, prose) {
  const units = new Set((ds.leaderOf || []).flatMap((l) => l.units || []))
  const structural = [...units].map(norm)
  for (const m of (prose || '').matchAll(/^■\s*\*\*(.+?)\*\*/gm)) {
    const name = allSheetNames.get(norm(m[1]))
    if (!name || units.has(name)) continue
    if (structural.some((s) => s.startsWith(`${norm(name)} `))) continue
    units.add(name)
  }
  return [...units].sort((a, b) => a.localeCompare(b))
}

function convert(ds) {
  const old = oldByName.get(norm(ds.name))
  const id = old?.id || slugify(ds.name)
  const out = { id, name: ds.name }
  out.points = (ds.points || []).map((p) => ({ models: p.models, points: p.points }))
  const flavor = ds.lore ? md(ds.lore).replace(/^\*(.*)\*$/s, '$1') : old?.flavor
  if (flavor) out.flavor = flavor
  const { byStatline, ambiguous } = invFor(ds)
  if (ambiguous) report.ambiguousInv.push(ds.name)
  out.profiles = (ds.statlines || []).map((s, i) => {
    const p = { name: s.name, m: s.M, t: s.T, sv: s.Sv, w: s.W, ld: s.Ld, oc: s.OC }
    return Object.assign(p, byStatline.get(i) || {})
  })
  const ranged = (ds.wargear || []).flatMap((w) => weaponRows(w, 'ranged'))
  const melee = (ds.wargear || []).flatMap((w) => weaponRows(w, 'melee'))
  if (ranged.length) out.ranged = ranged
  if (melee.length) out.melee = melee

  const core = (ds.abilities || []).filter((a) => a.type === 'core').map((a) => a.name)
  const faction = (ds.abilities || []).filter((a) => a.type === 'faction').map((a) => a.name)
  const own = (ds.abilities || []).filter((a) => a.type === 'datasheet')
  if (core.length) out.core = core.join(', ')
  if (faction.length) out.faction = faction.join(', ')
  out.abilities = own.map((a) => ({ name: a.name, text: md(a.rules) }))
  const sets = own.filter((a) => a.subAbilities?.length).map((a) => ({
    name: a.name,
    options: a.subAbilities.map((s) => ({ name: s.name, text: md(s.rules) })),
  }))
  const wargearAbilities = (ds.wargear || []).filter((w) => w.ruleText).map((w) => ({ name: w.name, text: md(w.ruleText) }))
  if (wargearAbilities.length) out.wargearAbilities = wargearAbilities

  const { composition, loadout } = compositionAndLoadout(ds.unitComposition)
  out.composition = composition
  if (loadout) out.loadout = loadout
  const options = currentWargearRules(ds.wargearRules || []).map((r) => bullets(r.rules).replace(/^▪ /, '')).filter(Boolean)
    .filter((o, i, all) => all.findIndex((x) => norm(x) === norm(o)) === i)
  if (options.length) out.options = options

  const rules = []
  for (const r of ds.rules || []) {
    const n = norm(r.name)
    if (n === 'leader' || n === 'support') {
      const text = md(r.rules).split('\n')[0].trim()
      out.leader = { text, units: leaderUnits(ds, r.rules) }
    } else if (n === 'transport') {
      out.transport = md(r.rules)
    } else {
      rules.push({ name: r.name, text: md(r.rules) })
    }
  }
  if (rules.length) out.rules = rules
  const damaged = (ds.damageAbility || []).find((d) => d.rules)
  if (damaged) out.damaged = { note: `1-${damaged.damagedAt} wounds remaining`, text: md(damaged.rules) }
  if (sets.length) out.abilitySets = sets

  out.keywords = [...(ds.keywords || [])]
  out.factionKeywords = factionKeywordsOf.get(ds.id) || (ds.factionKeywords?.length ? ds.factionKeywords : old?.factionKeywords || [])
  if (ds.baseSize) out.baseSize = ds.baseSize.replace(/\s*x\s*/g, 'x').replace(/\n+/g, ' / ')
  if (legendsIds.has(ds.id)) out.legends = true
  ;(old ? report.kept : report.added).push(id)
  return out
}

// --only="A|B" rewrites just those sheets of a hand-authored file and leaves every other sheet as
// it is (Agents of the Imperium's Deathwatch units, re-issued with Codex: Space Marines while the
// rest of the faction was not).
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').replace('--only=', '').split('|').filter(Boolean).map(norm)
if (only.length) {
  const fresh = new Map(appSheets.filter((d) => only.includes(norm(d.name))).map((d) => [norm(d.name), convert(d)]))
  const missing = only.filter((n) => !fresh.has(n))
  if (missing.length) { console.error(`  not in appdata: ${missing.join(', ')}`); process.exit(1) }
  // A sheet's points come from appdata's BASE price, and the MFM's copy tiers ("1st-2nd" /
  // "3rd+") go on top in a separate pass (sync:mfm) — which rewrites the whole faction file, not
  // just these sheets. So while appdata's base price is what the old sheet's tiers were built on,
  // the old points stand; when it moved, the sheet says so and sync:mfm is the next step.
  const repriced = []
  for (const [k, d] of fresh) {
    const old = oldByName.get(k)
    if (!old?.points?.some((p) => p.note)) continue
    const base = (pts) => JSON.stringify(pts.filter((p) => !p.note || /^1st/.test(p.note)).map((p) => [p.models, p.points]))
    if (base(old.points) === base(d.points)) d.points = old.points
    else repriced.push(d.id)
  }
  const out = oldSheets.map((d) => fresh.get(norm(d.name)) || d)
  console.log(`${slug}: rewrote ${fresh.size} sheet(s): ${[...fresh.values()].map((d) => d.id).join(', ')}`)
  if (repriced.length) console.log(`  appdata's base price moved for ${repriced.join(', ')} — run \`npm run sync:mfm -- ${slug} --write\` for the copy tiers`)
  if (WRITE) {
    const src = fs.readFileSync(file, 'utf8')
    const at = src.indexOf('export default ')
    fs.writeFileSync(file, `${src.slice(0, at)}export default ${JSON.stringify(out, null, 2)}\n`)
    // The same as a full write below: the regenerated English comes back without its popovers.
    const { glossFaction, GLOSS_SLUGS } = await import('./gloss-bold-terms.mjs')
    if (GLOSS_SLUGS.includes(slug)) await glossFaction(slug)
  }
  process.exit(0)
}

const sheets = appSheets.map(convert).sort((a, b) => a.id.localeCompare(b.id))
const seen = new Set(sheets.map((d) => norm(d.name)))
// A faction-pack Legends sheet stays for as long as the MFM still prices it. Codex: Space Marines
// shipped its own "Legends: Space Marines" (28 units) and the MFM dropped the other 60 of the
// pack's list the same day — a unit no source prints any more has left the game.
const mfm = (await loadModule(path.join(ROOT, 'src/data/mfm', `${slug}.js`)))?.default
const mfmLegends = new Set((mfm?.legends || []).map((u) => norm(u.name)))
const pack = oldSheets.filter((d) => d.source === 'faction-pack' && !seen.has(norm(d.name)))
const packKept = pack.filter((d) => mfmLegends.has(norm(d.name)))
const packDropped = pack.filter((d) => !mfmLegends.has(norm(d.name)))
const gone = oldSheets.filter((d) => d.source !== 'faction-pack' && !seen.has(norm(d.name)))
const packSuperseded = oldSheets.filter((d) => d.source === 'faction-pack' && seen.has(norm(d.name)))
const all = [...sheets, ...packKept].sort((a, b) => a.id.localeCompare(b.id))

const dupIds = all.map((d) => d.id).filter((id, i, a) => a.indexOf(id) !== i)
console.log(`${slug}: ${sheets.length} sheets from appdata (${report.kept.length} kept id, ${report.added.length} new)`)
console.log(`  faction-pack Legends kept: ${packKept.length}; superseded by appdata: ${packSuperseded.length}; no longer in the MFM: ${packDropped.length}`)
if (packDropped.length) console.log(`    dropped: ${packDropped.map((d) => d.id).join(', ')}`)
console.log(`  gone from appdata: ${gone.length}${gone.length ? ` — ${gone.map((d) => d.id).join(', ')}` : ''}`)
if (report.added.length) console.log(`  new: ${report.added.join(', ')}`)
if (report.ambiguousInv.length) console.log(`  invulnerable save needs a hand look: ${report.ambiguousInv.join(', ')}`)
if (dupIds.length) { console.error(`  DUPLICATE ids: ${dupIds.join(', ')}`); process.exit(1) }

// A Chapter's page folds in every Codex: Space Marines sheet the Chapter may field (see
// src/data/CLAUDE.md "SM-Chapter datasheet dedup"). Since Codex: Space Marines (963) that is
// derived, not kept by hand: a sheet with no second Faction keyword, which the Chapter has no own
// version of, and which neither appdata's `faction_keyword_excluded_datasheet` nor the Chapter's
// own army rule forbids — Black Templars "cannot include any ADEPTUS ASTARTES PSYKER models",
// Space Wolves "cannot include APOTHECARY units" (the table carries both Apothecary sheets; the
// keyword catches any the table misses). The SM file must be regenerated first.
const CHAPTER_FORBIDS = { 'black-templars': 'Psyker', 'space-wolves': 'Apothecary' }
async function chapterSharedIds() {
  const chapter = nameOfEn(table('faction_keyword.json').find((f) => slugify(nameOfEn(f)) === slug) || {})
  if (!chapter || !oldMod.sharedUnitIds) return null
  const fkId = table('faction_keyword.json').find((f) => nameOfEn(f) === chapter).id
  const excluded = new Set(table('faction_keyword_excluded_datasheet.json').filter((r) => r.factionKeywordId === fkId)
    .map((r) => norm(nameOfEn(table('datasheet.json').find((d) => d.id === r.datasheetId) || {}))))
  const own = new Set(all.map((d) => norm(d.name)))
  const forbids = CHAPTER_FORBIDS[slug]
  const sm = (await loadModule(path.join(ROOT, 'src/data/datasheets/space-marines.js'))).default
  return sm.filter((d) => (d.factionKeywords || []).every((k) => norm(k) === 'adeptus astartes')
    && !excluded.has(norm(d.name)) && !own.has(norm(d.name))
    && !(forbids && (d.keywords || []).some((k) => norm(k) === norm(forbids))))
    .map((d) => d.id).sort()
}

if (WRITE) {
  const src = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
  const header = (src.match(/^(\/\/.*\n)+/) || [''])[0]
  const extra = []
  const shared = await chapterSharedIds()
  if (shared) {
    const before = new Set(oldMod.sharedUnitIds)
    console.log(`  sharedUnitIds: ${shared.length} (+${shared.filter((id) => !before.has(id)).join(', ') || '—'}; −${oldMod.sharedUnitIds.filter((id) => !shared.includes(id)).join(', ') || '—'})`)
    extra.push(`export const sharedUnitIds = ${JSON.stringify(shared, null, 2)}\n`)
  }
  if (oldMod.pointsOverrides) extra.push(`export const pointsOverrides = ${JSON.stringify(oldMod.pointsOverrides, null, 2)}\n`)
  fs.writeFileSync(file, `${header}${extra.join('\n')}export default ${JSON.stringify(all, null, 2)}\n`)
  console.log(`  wrote ${path.relative(ROOT, file)}`)
  // The regenerated English comes back without the bold-term popovers; put them back.
  const { glossFaction, GLOSS_SLUGS } = await import('./gloss-bold-terms.mjs')
  if (GLOSS_SLUGS.includes(slug)) await glossFaction(slug)
}
