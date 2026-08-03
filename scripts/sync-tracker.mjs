// Report-only diff between the Game Tracker's rule content and wh40k-appdata's
// factions/_core-content.json + per-faction detachment dp/forceDisposition (see
// wh40k-appdata's build-factions.mjs — that file, not any per-faction bundle, is the
// source for everything compared here: it isn't scoped to a single faction).
//
// Usage:
//   node scripts/sync-tracker.mjs [category ...]   # battle-sizes, dispositions, core-strats,
//                                                    missions, twists, disposition-map, detachments
//   node scripts/sync-tracker.mjs                   # runs every category
//
// Same ethos as sync-appdata.mjs: report only, no writes. Structural presence/absence and
// scalar (VP/CP/points) mismatches are the focus — hand-authored prose (missions' `briefing`
// intro text, which appdata mostly doesn't carry) is not diffed word-for-word.
//
// Known false-positive classes in the `missions` category (verify by hand before "fixing"):
// - **Paraphrase, same VP.** wh11ed and appdata often word the exact same condition
//   differently ("at least one" vs "one or more", "enemy" vs "your opponent's", "&" vs
//   "and" in headings) — same rule, same VP, not a bug. The diff still surfaces every
//   line so the wording drift is visible, but check the VP before treating it as a gap.
// - **Fixed/tactical vpCap collapsed into a boolean.** appdata sometimes prices the
//   "tactical" copy of a per-model stepper row with `vpCap` equal to its own `vp` (i.e. it
//   can only ever fire once) — wh11ed correctly renders that as a flat "one or more X were
//   destroyed" checkbox row instead of a capped stepper. Same net scoring, different shape.
// - **Cumulative bonus collapsed into flat tiers.** appdata sometimes scores a base
//   condition plus a separate `isCumulative` bonus row (e.g. 3vp base + 1vp if W≥4) — wh11ed
//   sometimes pre-sums these into mutually-exclusive flat tiers (4vp if W≥4, 3vp otherwise).
//   Check the arithmetic (base + bonus) before treating this as a mismatch.
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, APPDATA, SLUG_MAP, norm, appdataToMarkup, loadJson, loadModule, byNormName, diffByName } from './lib/sync-common.mjs'

// Assigned at the top of run() — the categories below (called only from run(), after that
// assignment) close over this binding rather than each taking it as a parameter.
let core

// ---- battle sizes ----------------------------------------------------------------------
async function checkBattleSizes() {
  console.log('\n=== battle sizes ===')
  const mod = await loadModule(path.join(ROOT, 'src/composables/useTracker.js'))
  const lines = diffByName('battle size', mod.BATTLE_SIZES, core.battleSizes, (b) => b.name, (b) => b.name,
    [['points', 'points'], ['maxDp', 'dp']])
  if (!lines.length) console.log('  no structural differences found')
  else lines.forEach((l) => console.log(l))
}

// ---- Force Dispositions -----------------------------------------------------------------
async function checkDispositions() {
  console.log('\n=== Force Dispositions ===')
  const mod = await loadModule(path.join(ROOT, 'src/data/eventCompanion.js'))
  const lines = diffByName('disposition', mod.eventCompanion.en.dispositions, core.forceDispositions, (d) => d.name, (d) => d.name)
  if (!lines.length) console.log('  no structural differences found')
  else lines.forEach((l) => console.log(l))
}

// ---- core stratagems (battlefields.js §15) -----------------------------------------------
async function checkCoreStratagems() {
  console.log('\n=== core stratagems (battlefields.js §15) ===')
  const mod = await loadModule(path.join(ROOT, 'src/data/battlefields.js'))
  const sec15 = mod.battlefields.en.find((s) => String(s.num) === '15')
  const wh = (sec15?.stratagems || []).map((s) => ({ name: s.name, cp: s.cp }))
  const lines = diffByName('stratagem', wh, core.coreStratagems, (s) => s.name, (s) => s.name, [['cp', 'cp']],
    (s) => `${s.cp}CP — ${appdataToMarkup(s.effect)}`)
  if (!lines.length) console.log('  no structural differences found')
  else lines.forEach((l) => console.log(l))

  // Full-text diff of the four prose fields (name/cp above were only structural/scalar).
  const whByName = byNormName(sec15?.stratagems || [], (s) => s.name)
  const appByName = byNormName(core.coreStratagems, (s) => s.name)
  const textLines = []
  for (const [key, w] of whByName) {
    const a = appByName.get(key)
    if (!a) continue
    for (const [whField, appField] of [['when', 'when'], ['target', 'target'], ['effect', 'effect'], ['restrictions', 'restriction']]) {
      const wt = normText(w[whField] || '')
      const at = normText(appdataToMarkup(a[appField] || ''))
      if (wt !== at) textLines.push(`  ~ "${w.name}".${whField}:\n      wh11ed:  ${w[whField] || '(empty)'}\n      appdata: ${appdataToMarkup(a[appField] || '(empty)')}`)
    }
  }
  if (textLines.length) textLines.forEach((l) => console.log(l))
  else console.log('  no text differences found (when/target/effect/restrictions)')
}

// ---- twists -------------------------------------------------------------------------------
async function checkTwists() {
  console.log('\n=== twists ===')
  const mod = await loadModule(path.join(ROOT, 'src/data/eventCompanion.js'))
  const whTwists = mod.eventCompanion.en.twists.blocks || mod.eventCompanion.en.twists
  const lines = diffByName('twist', whTwists, core.twists, (t) => t.title, (t) => t.name, [], (t) => appdataToMarkup(t.rules))
  if (!lines.length) console.log('  no structural differences found')
  else lines.forEach((l) => console.log(l))

  // Full-text diff: appdata inlines the Designer's Note into `rules`, wh11ed keeps it in a
  // separate `note` field — fold both together before comparing (same fold sync-event-
  // companion.mjs's syncTwists uses).
  const whByName = byNormName(whTwists, (t) => t.title)
  const appByName = byNormName(core.twists, (t) => t.name)
  const textLines = []
  for (const [key, w] of whByName) {
    const a = appByName.get(key)
    if (!a) continue
    const wt = normText([w.body, w.note].filter(Boolean).join('\n\n'))
    const at = normText(appdataToMarkup(a.rules || ''))
    if (wt !== at) textLines.push(`  ~ "${w.title}":\n      wh11ed:  ${[w.body, w.note].filter(Boolean).join(' / ')}\n      appdata: ${appdataToMarkup(a.rules || '(empty)')}`)
  }
  if (textLines.length) textLines.forEach((l) => console.log(l))
  else console.log('  no text differences found (body/note vs rules)')
}

// ---- primary/secondary missions -----------------------------------------------------------
// Full-sentence comparison needs a much more aggressive normalizer than norm() (which is
// tuned for proper-noun matching): strip wh11ed's/appdata's markdown decoration
// (**bold**, gloss tokens), quote/dash variants, and punctuation noise that carries no
// rules meaning (commas, trailing periods, "the").
const normText = (s) => norm(s)
  .replace(/\[gloss:[^:]*:([^\]]*)\]/g, '$1')
  .replace(/\*\*|__|\*/g, '')
  .replace(/[.,]/g, '')
  .replace(/\bthe\b/g, '')
  .replace(/\s+/g, ' ')
  .trim()

// Flatten wh11ed's blocks/rows and appdata's objectives/scoring into a comparable
// {headings:Set, rows:[{text,vp}]} shape per mission, then diff by mission name.
function flattenWh11ed(blocks) {
  const headings = new Set()
  const rows = []
  for (const b of blocks || []) {
    headings.add(normText(b.heading))
    for (const r of b.rows || []) {
      const vp = String(r.vp ?? '').replace(/\D/g, '')
      rows.push({ text: normText(r.text), vp })
    }
  }
  return { headings, rows }
}
function flattenAppdata(objectives) {
  const headings = new Set()
  const rows = []
  for (const o of objectives || []) {
    headings.add(normText(o.name))
    for (const sc of o.scoring || []) {
      rows.push({ text: normText(appdataToMarkup(sc.text)), vp: String(sc.vp ?? '') })
    }
  }
  return { headings, rows }
}
// A single Map keyed by normalized text silently drops rows: a handful of missions (A
// Grievous Blow, Bring It Down, Engage On All Fronts) legitimately carry TWO scoring rows
// with the *exact same* text and only the vp differs (fixed-tier vs tactical-tier, or a
// vpCap'd second copy of an uncapped stepper) — a plain Map keeps only the last one,
// so the other silently never gets compared at all (a future appdata vp change to the
// dropped row would be invisible here). Group by text into arrays instead.
function groupByText(rows) {
  const m = new Map()
  for (const r of rows) {
    if (!m.has(r.text)) m.set(r.text, [])
    m.get(r.text).push(r)
  }
  return m
}
function diffMissionContent(label, whMission, appMission) {
  const lines = []
  const wh = flattenWh11ed(whMission.blocks)
  const app = flattenAppdata(appMission.objectives)
  for (const h of app.headings) if (!wh.headings.has(h)) lines.push(`      + appdata objective heading not found in wh11ed blocks: "${h}"`)
  for (const h of wh.headings) if (!app.headings.has(h)) lines.push(`      - wh11ed block heading not in appdata: "${h}"`)
  // Row-level: match by normalized text, compare vp. Rows sharing identical text on either
  // side are vp-sorted and paired by position, so a text bucket with 2 appdata rows and 2
  // wh11ed rows compares both pairs instead of only the one a plain Map would keep.
  const appGroups = groupByText(app.rows)
  const whGroups = groupByText(wh.rows)
  for (const text of new Set([...appGroups.keys(), ...whGroups.keys()])) {
    const appList = (appGroups.get(text) || []).slice().sort((a, b) => Number(a.vp) - Number(b.vp))
    const whList = (whGroups.get(text) || []).slice().sort((a, b) => Number(a.vp) - Number(b.vp))
    const n = Math.max(appList.length, whList.length)
    for (let i = 0; i < n; i++) {
      const r = appList[i]
      const w = whList[i]
      if (!w) { lines.push(`      + appdata row not found in wh11ed: "${text}" (${r.vp}vp)`); continue }
      if (!r) { lines.push(`      - wh11ed row not found in appdata: "${text}" (${w.vp}vp)`); continue }
      if (r.vp && w.vp && r.vp !== w.vp) lines.push(`      ~ row "${text}" vp differs: wh11ed=${w.vp} appdata=${r.vp}`)
    }
  }
  if (lines.length) return [`  in ${label} "${whMission.name}":`, ...lines]
  return []
}

// ---- per-block round-gating (Game Tracker's scorableBlocks) --------------------------------
// appdata's primary-mission objectives carry an explicit `scorablePeriods` list (which battle
// rounds that block can score in) — the ground truth for what useTracker.js's hardcoded
// BLOCK_ROUNDS heading→rounds table is trying to encode. Cross-check them directly instead of
// trusting BLOCK_ROUNDS never drifts: a wrong round range would silently make a block
// (un)scoreable in the wrong round with no visible symptom short of a rules dispute mid-game.
// Secondary missions carry no `scorablePeriods` in appdata (round-gating there is inferred
// purely from the objective heading text, which diffMissionContent already heading-checks).
const PERIOD_TO_ROUND = {
  firstBattleRound: 1, secondBattleRound: 2, thirdBattleRound: 3,
  fourthBattleRound: 4, fifthBattleRound: 5, endOfBattle: 5,
}
function diffRoundGating(label, whMission, appMission, blockRoundsFn) {
  const lines = []
  const appByHeading = new Map()
  for (const o of appMission.objectives || []) {
    if (!o.scorablePeriods) continue
    const key = normText(o.name)
    if (!appByHeading.has(key)) appByHeading.set(key, new Set(o.scorablePeriods.map((p) => PERIOD_TO_ROUND[p]).filter(Boolean)))
  }
  if (!appByHeading.size) return lines
  const seen = new Set()
  for (const b of whMission.blocks || []) {
    const key = normText(b.heading)
    if (seen.has(key)) continue
    seen.add(key)
    const appRounds = appByHeading.get(key)
    if (!appRounds) continue
    const whRounds = new Set(blockRoundsFn(b.heading))
    const a = [...appRounds].sort().join(',')
    const w = [...whRounds].sort().join(',')
    if (a !== w) lines.push(`      ~ heading "${b.heading}" scorable rounds differ: wh11ed=[${w}] appdata=[${a}]`)
  }
  if (lines.length) return [`  in ${label} "${whMission.name}":`, ...lines]
  return []
}

async function checkMissions() {
  const mod = await loadModule(path.join(ROOT, 'src/data/missions.js'))
  const trackerMod = await loadModule(path.join(ROOT, 'src/composables/useTracker.js'))

  console.log('\n=== primary missions ===')
  const whPrimary = mod.missions.en.primary
  const primaryLines = diffByName('primary mission', whPrimary, core.primaryMissions, (m) => m.name, (m) => m.name)
  const appByName = byNormName(core.primaryMissions, (m) => m.name)
  for (const m of whPrimary) {
    const app = appByName.get(norm(m.name))
    if (app) primaryLines.push(...diffMissionContent('primary mission', m, app), ...diffRoundGating('primary mission', m, app, trackerMod.blockRounds))
  }
  if (!primaryLines.length) console.log('  no structural differences found')
  else primaryLines.forEach((l) => console.log(l))

  console.log('\n=== secondary missions ===')
  // wh11ed doubles each secondary into attacker/defender role entries with identical
  // content (see CLAUDE.md); de-dupe by name before comparing against appdata's 18.
  const seen = new Map()
  for (const m of mod.missions.en.secondary) if (!seen.has(norm(m.name))) seen.set(norm(m.name), m)
  const whSecondary = [...seen.values()]
  const secondaryLines = diffByName('secondary mission', whSecondary, core.secondaryMissions, (m) => m.name, (m) => m.name)
  const appSecByName = byNormName(core.secondaryMissions, (m) => m.name)
  for (const m of whSecondary) {
    const app = appSecByName.get(norm(m.name))
    if (app) secondaryLines.push(...diffMissionContent('secondary mission', m, app))
  }
  if (!secondaryLines.length) console.log('  no structural differences found')
  else secondaryLines.forEach((l) => console.log(l))
}

// ---- disposition-pair -> primary mission matrix --------------------------------------------
async function checkDispositionMap() {
  console.log('\n=== disposition-pair → primary mission map ===')
  const mod = await loadModule(path.join(ROOT, 'src/data/missions.js'))
  const dispMod = await loadModule(path.join(ROOT, 'src/data/eventCompanion.js'))
  const dispNameById = new Map(dispMod.eventCompanion.en.dispositions.map((d) => [d.id, d.name]))
  const primaryByAppId = new Map(core.primaryMissions.map((m) => [m.id, m.name]))
  // Build wh11ed's own {friendly, opposition} -> mission name map from deck/opponent/mirror.
  const whMap = new Map()
  for (const m of mod.missions.en.primary) {
    const friendly = dispNameById.get(m.deck) || m.deck
    const oppositions = m.mirror ? [friendly] : [m.opponent]
    for (const opposition of oppositions) whMap.set(`${norm(friendly)}|${norm(opposition)}`, m.name)
  }
  const lines = []
  for (const row of core.dispositionPrimaryMap) {
    const key = `${norm(row.friendly)}|${norm(row.opposition)}`
    const appName = primaryByAppId.get(row.primaryMissionId)
    const whName = whMap.get(key)
    if (!whName) { lines.push(`  + appdata pair not found in wh11ed: ${row.friendly} vs ${row.opposition} -> "${appName}"`); continue }
    if (norm(whName) !== norm(appName)) {
      lines.push(`  ~ ${row.friendly} vs ${row.opposition}: wh11ed="${whName}" appdata="${appName}"`)
    }
  }
  if (!lines.length) console.log('  no structural differences found')
  else lines.forEach((l) => console.log(l))
}

// ---- detachment dp / Force Disposition (all factions) --------------------------------------
// The 5 SM-Chapter factions share most detachments (Gladius Task Force, etc.) with the
// generic Adeptus Astartes pool — appdata's own per-chapter bundle only lists that
// Chapter's exclusive detachments, so fold adeptus-astartes.json's in too before reporting
// "not found" (same fallback StratagemsView.vue uses at runtime).
const SM_CHAPTERS = new Set(['black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'space-wolves'])
async function checkDetachments() {
  console.log('\n=== detachment dp / Force Disposition (all factions) ===')
  const mfmMod = await loadModule(path.join(ROOT, 'src/data/mfmFactions.js'))
  const mfmFactions = mfmMod.mfmFactions.en
  const smPool = loadJson(path.join(APPDATA, 'factions', 'adeptus-astartes.json'))
  let total = 0
  let mismatches = 0
  for (const f of mfmFactions) {
    const appSlug = SLUG_MAP[f.slug] || f.slug
    const bundle = loadJson(path.join(APPDATA, 'factions', `${appSlug}.json`))
    if (!bundle) { console.log(`  ! no appdata bundle for ${f.slug} (tried ${appSlug}) — skipped`); continue }
    const detachments = SM_CHAPTERS.has(f.slug)
      ? [...(bundle.detachments || []), ...(smPool?.detachments || [])]
      : (bundle.detachments || [])
    const appByName = byNormName(detachments, (d) => d.name)
    for (const d of f.detachments || []) {
      total++
      const app = appByName.get(norm(d.name))
      if (!app) { console.log(`  - ${f.slug}: detachment "${d.name}" not found in appdata`); mismatches++; continue }
      const dpMismatch = d.dp != null && app.dp != null && d.dp !== app.dp
      const fdMismatch = d.forceDisposition && app.forceDisposition && norm(d.forceDisposition) !== norm(app.forceDisposition)
      if (dpMismatch || fdMismatch) {
        mismatches++
        const parts = []
        if (dpMismatch) parts.push(`dp: mfm=${d.dp} appdata=${app.dp}`)
        if (fdMismatch) parts.push(`disposition: mfm=${d.forceDisposition} appdata=${app.forceDisposition}`)
        console.log(`  ~ ${f.slug}: detachment "${d.name}" ${parts.join(', ')}`)
      }
    }
  }
  console.log(`  checked ${total} detachments, ${mismatches} mismatch(es)`)
}

const CATEGORIES = {
  'battle-sizes': checkBattleSizes,
  'dispositions': checkDispositions,
  'core-strats': checkCoreStratagems,
  'twists': checkTwists,
  'missions': checkMissions,
  'disposition-map': checkDispositionMap,
  'detachments': checkDetachments,
}

export async function run(argv = process.argv.slice(2)) {
  core = loadJson(path.join(APPDATA, 'factions', '_core-content.json'))
  if (!core) {
    console.log('no factions/_core-content.json found in wh40k-appdata — run its build-factions.mjs first')
    return 1
  }
  const toRun = argv.length ? argv : Object.keys(CATEGORIES)
  for (const cat of toRun) {
    if (!CATEGORIES[cat]) { console.log(`unknown category: ${cat} (known: ${Object.keys(CATEGORIES).join(', ')})`); continue }
    await CATEGORIES[cat]()
  }
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
