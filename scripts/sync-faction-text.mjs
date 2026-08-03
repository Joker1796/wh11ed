// Report-only TEXT diff between wh11ed's faction rule prose and wh40k-appdata (the private
// sibling repo treated as the 100%-authoritative rules source — a dump of the official GW app).
// This is the layer sync-appdata.mjs deliberately skips: it reports structural presence/absence
// and scalar fields, but not rule BODY text. That gap is how a silent errata drift hides — e.g.
// the Necrons' Reanimation Protocols army rule stayed on the pre-errata "reanimates D3" wording
// while the Codex had been errata'd to "heals D3". This script closes it.
//
// Usage:
//   node scripts/sync-faction-text.mjs <slug> [<slug> ...]
//   node scripts/sync-faction-text.mjs --all
//
// HOW IT AVOIDS BEING ALL-NOISE (the reason the diff was skipped before): wh11ed prose is
// enriched over the canon — inline `[gloss:id:label]` tokens, `(NN.NN)` cross-refs, extra
// `**bold**`, `[BRACKET]` ability names. `plainText()` strips that whole enrichment layer off
// BOTH sides (appdata is first run through appdataToMarkup, then the same stripper), so what's
// compared is the bare wording. Verified on the T'au Empire army rule (the most heavily glossed
// in the repo): after normalization it matches appdata exactly, so glosses cost zero false
// positives — there is no need to drop them for the sake of cheap syncs.
//
// It's REPORT-ONLY, like every other sync-* script — it does NOT rewrite the data files, because
// (a) the RU overlay/`ru` object and the hand-authored glosses/cross-refs would be clobbered, and
// (b) applying an errata is a human step (translate to RU, re-gloss). Instead, for each drifted
// entity it prints the canonical appdata text already converted to wh11ed markup, plus a compact
// word-level diff so a real errata ("reanimates"→"heals", 9"→8") pops out from an intentional
// hand-fix at a glance. Read the flagged lines and apply by hand.
//
// Combat Patrol content is dropped first (shared combatPatrolNames() helper): the CP box ships
// its own — usually pre-errata — copy of the army rule(s), which is exactly the stale text we
// must NOT match against (the Necrons RP duplicate is a CP publication).

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, APPDATA, SLUG_MAP, norm, appdataToMarkup, bodyText, loadJson, loadModule, byNormName, combatPatrolNames, loadWh11edDatasheets } from './lib/sync-common.mjs'

// Strip wh11ed's enrichment layer (and appdata's residual markup) down to bare comparable words.
// Applied to BOTH sides — appdata text is run through appdataToMarkup first, so both arrive in
// the same `**bold**`/`▪`/CAPS convention before this peels it all off.
function plainText(s) {
  if (!s) return ''
  let t = s
  t = t.replace(/\[gloss:[^:\]]+:([^\]]*)\]/g, '$1') // [gloss:id:label] → label
  t = t.replace(/\[def:[^:\]]+:([^\]]*)\]/g, '$1') // [def:id:label] → label
  t = t.replace(/\*\*/g, '').replace(/__/g, '') // bold / underline
  t = t.replace(/\s*\((?:\d+\.)*\d+\)/g, '') // (NN) / (NN.NN) numeric cross-refs
  t = t.replace(/[[\]]/g, '') // [KEYWORD] / [ABILITY] bracket markers (both sides have them)
  t = t.replace(/[▪•◦▫→◆◈]/g, ' ') // list/flow markers — layout, not content
  t = t.replace(/[’‘`]/g, "'").replace(/[“”«»]/g, '"').replace(/[‐‑–—]/g, '-') // quote/dash variants
  t = t.replace(/([a-zA-Z])-([a-zA-Z])/g, '$1 $2') // "fall-back"⇄"fall back" hyphenation (letters only, not ±N stats)
  t = t.replace(/'/g, '') // fold apostrophes out ("unit's"→"units"); kills appdata stray-quote noise
  t = t.replace(/\s*\/\s*/g, '/') // "custodians / aquilon"⇄"custodians/aquilon" keyword-union spacing
  // Drop sentence punctuation (.,:;) — appdata routinely omits terminal periods and bullet-colons
  // that wh11ed adds, and reformats "a, or b" ⇄ "a. Or: b"; keep " (inches) and +/-/% (stat
  // modifiers) and / (keyword unions), which can carry meaning.
  t = t.toLowerCase().replace(/[^a-z0-9"/+%-]+/g, ' ').replace(/\s+/g, ' ').trim()
  return t
}

// Count how many of `wordSet` appear in `plain` — used to rank many-to-one text-block candidates
// (wargear options vs appdata's wargearRules) by similarity before the best-effort match in
// syncFaction()'s datasheet loop, so a no-exact-match fallback diff shows the closest block.
function overlap(plain, wordSet) {
  return plain.split(' ').filter((w) => wordSet.has(w)).length
}

// Compact word-level diff: trim the common leading/trailing words and show only the divergent
// middle of each side, so an errata edit stands out instead of reprinting the whole paragraph.
function wordDiff(whPlain, appPlain) {
  const a = whPlain.split(' ')
  const b = appPlain.split(' ')
  let lead = 0
  while (lead < a.length && lead < b.length && a[lead] === b[lead]) lead++
  let tail = 0
  while (tail < a.length - lead && tail < b.length - lead && a[a.length - 1 - tail] === b[b.length - 1 - tail]) tail++
  const whMid = a.slice(lead, a.length - tail).join(' ')
  const appMid = b.slice(lead, b.length - tail).join(' ')
  return { whMid, appMid }
}

// Build markup-ready appdata text (what you'd paste into the data file). For a body-block array
// use bodyText; for a bare string field (stratagem effect/target, enhancement rules) convert it.
const appMarkup = (v) => (Array.isArray(v) ? bodyText(v) : appdataToMarkup(v || ''))

// One comparison. `appCandidates` is an array of appdata source strings (usually one; several
// when appdata carries edition/publication duplicates of a same-named rule). No drift is reported
// if wh11ed matches ANY candidate. Pushes a formatted block onto `out` otherwise.
function compare(out, label, whText, appCandidates) {
  const cands = appCandidates.map(appMarkup).filter(Boolean)
  if (!cands.length) return // appdata has no text to compare against — structural, not our job
  const wh = plainText(whText)
  if (!wh) {
    out.push(`  + ${label}: wh11ed has no text; appdata:\n      ${cands[0].replace(/\n/g, '\n      ')}`)
    return
  }
  if (cands.some((c) => plainText(c) === wh)) return // matches a canonical variant — in sync
  const app = cands[0]
  const { whMid, appMid } = wordDiff(wh, plainText(app))
  out.push(`  ~ ${label}: text differs from appdata`)
  if (whMid && appMid) {
    out.push(`      wh11ed:  …${whMid}…`)
    out.push(`      appdata: …${appMid}…`)
  } else if (whMid) {
    out.push(`      wh11ed adds (not in appdata): …${whMid}…`) // an added clause — could be errata or a hand-fix
  } else {
    out.push(`      appdata has (missing in wh11ed): …${appMid}…`)
  }
  out.push(`      canonical (paste-ready):\n        ${app.replace(/\n/g, '\n        ')}`)
}

// Fuzzy name match used for army/detachment rules whose wh11ed and appdata names may differ by a
// classification suffix or containment (same convention as sync-appdata's army-rule matcher).
const nameRelated = (a, b) => {
  const x = norm(a)
  const y = norm(b)
  return x === y || x.includes(y) || y.includes(x)
}

async function syncFaction(slug) {
  const appSlug = SLUG_MAP[slug] || slug
  const bundle = await loadJson(path.join(APPDATA, 'factions', `${appSlug}.json`))
  const factionMod = await loadModule(path.join(ROOT, 'src/data/factions', `${slug}.js`))
  const en = Object.values(factionMod || {})[0]?.en
  const out = []
  if (!bundle) { console.log(`\n=== ${slug} (appdata: ${appSlug}) ===\n  no appdata bundle found — check SLUG_MAP or spelling`); return }
  if (!en) { console.log(`\n=== ${slug} (appdata: ${appSlug}) ===\n  no src/data/factions/<slug>.js found`); return }

  const cp = combatPatrolNames()
  const appDetachments = (bundle.detachments || []).filter((d) => !cp.detachments.has(norm(d.name)))
  const appArmyRules = (bundle.armyRules || []).filter((r) => !cp.armyRuleIds.has(r.id))

  // Army rule — wh11ed carries one combined `armyRule`; match appdata army rule(s) by name.
  if (en.armyRule?.body) {
    const cands = appArmyRules.filter((r) => nameRelated(en.armyRule.name, r.name)).map((r) => r.body)
    compare(out, `army rule "${en.armyRule.name}"`, en.armyRule.body, cands)
  }

  // Detachments: the detachment rule, then per-detachment stratagems and enhancements.
  const appDetByName = byNormName(appDetachments, (d) => d.name)
  for (const d of en.detachments || []) {
    const appDet = appDetByName.get(norm(d.name))
    if (!appDet) continue // structural miss — sync-appdata reports that

    if (d.rule?.body) {
      let ruleCands = (appDet.rules || []).filter((r) => nameRelated(d.rule.name, r.name))
      if (!ruleCands.length && (appDet.rules || []).length === 1) ruleCands = appDet.rules // single unnamed-match rule
      compare(out, `detachment "${d.name}" · rule "${d.rule.name}"`, d.rule.body, ruleCands.map((r) => r.body))
    }

    const appStratByName = byNormName(appDet.stratagems || [], (s) => s.name)
    for (const s of d.stratagems || []) {
      const a = appStratByName.get(norm(s.name))
      if (!a) continue
      const lbl = `detachment "${d.name}" · stratagem "${s.name}"`
      compare(out, `${lbl} · WHEN`, s.when, [a.when])
      compare(out, `${lbl} · TARGET`, s.target, [a.target])
      compare(out, `${lbl} · EFFECT`, s.effect, [a.effect])
      compare(out, `${lbl} · RESTRICTIONS`, s.restrictions, [a.restriction])
    }

    const appEnhByName = byNormName(appDet.enhancements || [], (e) => e.name)
    for (const e of d.enhancements || []) {
      const a = appEnhByName.get(norm(e.name))
      if (!a) continue
      compare(out, `detachment "${d.name}" · enhancement "${e.name}"`, e.body, [a.rules])
    }
  }

  // Datasheet abilities (unit-specific `type:'datasheet'` only — core/faction/wargear map elsewhere).
  const wh11edSheets = await loadWh11edDatasheets(slug)
  const cpDs = cp.datasheets
  const appDsByName = byNormName((bundle.datasheets || []).filter((d) => !cpDs.has(norm(d.name))), (d) => d.name)
  for (const d of wh11edSheets) {
    const appDs = appDsByName.get(norm(d.name))
    if (!appDs) continue
    const appAbilityByName = byNormName((appDs.abilities || []).filter((a) => a.type === 'datasheet'), (a) => a.name)
    for (const ab of d.abilities || []) {
      const a = appAbilityByName.get(norm(ab.name))
      if (!a) continue
      compare(out, `datasheet "${d.name}" · ability "${ab.name}"`, ab.text, [a.rules])
    }

    // wargearAbilities — a wargear item's own passive rule text (e.g. Storm Shield's invulnerable
    // save grant) lives on appdata's wargear[].ruleText, not in abilities[].
    const appWgByName = byNormName(appDs.wargear || [], (w) => w.name)
    for (const wa of d.wargearAbilities || []) {
      const w = appWgByName.get(norm(wa.name))
      if (!w?.ruleText) continue
      compare(out, `datasheet "${d.name}" · wargear ability "${wa.name}"`, wa.text, [w.ruleText])
    }

    // rules[] (BODYGUARD/ATTACHED UNIT/etc structural plates) — appdata buckets these, PLUS the
    // prose form of Leader/Support and a vehicle's Transport capacity, under one generic named
    // `rules[]` list (see sync-appdata.mjs's structural leader/bodyguard-units diff for the
    // separate, id-independent cross-check of the unit list itself).
    const appRulesByName = byNormName(appDs.rules || [], (r) => r.name)
    for (const r of d.rules || []) {
      const a = appRulesByName.get(norm(r.name))
      if (!a) continue
      compare(out, `datasheet "${d.name}" · rule "${r.name}"`, r.text, [a.rules])
    }
    if (d.leader?.text) {
      // appdata's "Leader"/"Support" rules[] entry is ONE combined text (intro sentence + the
      // full bulleted unit list + any footer) — wh11ed splits that same content across
      // leader.text/leader.units[]/leader.footer. The unit LIST itself is already diffed
      // order-independently in sync-appdata.mjs (a set compare, immune to each side's own
      // ordering); comparing it again here as flat prose would flag every reordering as a false
      // "differs" (this file's compare() is word-order sensitive, meant for paragraphs, not
      // enumerable lists) — so strip appdata's bullet lines and compare only the intro/footer
      // prose against wh11ed's own intro/footer.
      const whLeaderProse = [d.leader.text, d.leader.footer || ''].filter(Boolean).join('\n')
      const stripUnitBullets = (s) => (s || '').split('\n').filter((l) => !/^[▪■•]/.test(l.trim())).join('\n')
      const cands = [appRulesByName.get('leader'), appRulesByName.get('support')].filter(Boolean).map((r) => stripUnitBullets(r.rules))
      if (cands.length) compare(out, `datasheet "${d.name}" · leader`, whLeaderProse, cands)
    }
    if (d.transport) {
      const t = appRulesByName.get('transport')
      if (t) compare(out, `datasheet "${d.name}" · transport`, d.transport, [t.rules])
    }

    // damaged — the wounds-threshold band. appdata may carry more than one damageAbility entry
    // (multi-threshold superheavies); no drift is reported if wh11ed's text matches ANY of them.
    if (d.damaged?.text) {
      const cands = (appDs.damageAbility || []).map((r) => r.rules).filter(Boolean)
      if (cands.length) compare(out, `datasheet "${d.name}" · damaged`, d.damaged.text, cands)
    }

    // composition + loadout vs appdata's single unitComposition string — reconstruct wh11ed's
    // side in the same bullet-list-then-prose shape so plainText() sees comparable text.
    if ((d.composition?.length || d.loadout) && appDs.unitComposition) {
      const whComp = [...(d.composition || []).map((c) => `▪ ${c}`), d.loadout || ''].filter(Boolean).join('\n')
      compare(out, `datasheet "${d.name}" · composition`, whComp, [appDs.unitComposition])
    }

    // options vs wargearRules — both are independent "replace X with Y" blocks with no guaranteed
    // 1:1 order/count between sides, so this is a best-effort many-to-one match: for each wh11ed
    // option, no drift is reported if it matches ANY appdata wargearRules entry (compare()'s usual
    // "matches ANY candidate" rule); candidates are pre-sorted by word overlap with the option so
    // that when nothing matches exactly, the word-diff shown is against the closest block, not an
    // arbitrary one. This won't catch a wh11ed option block missing entirely (nothing to anchor
    // the comparison to) or a whole appdata block wh11ed never picked up — a known heuristic gap,
    // likely to need tuning once run against real data.
    const wgRulesTexts = (appDs.wargearRules || []).map((r) => r.rules).filter(Boolean)
    if (wgRulesTexts.length) {
      for (const opt of d.options || []) {
        const optWords = new Set(plainText(opt).split(' '))
        const ranked = [...wgRulesTexts].sort((a, b) => overlap(plainText(appMarkup(b)), optWords) - overlap(plainText(appMarkup(a)), optWords))
        compare(out, `datasheet "${d.name}" · wargear option`, opt, ranked)
      }
    }
  }

  console.log(`\n=== ${slug} (appdata: ${appSlug}) ===`)
  if (!out.length) console.log('  no text differences found')
  else out.forEach((l) => console.log(l))
}

export async function run(argv = process.argv.slice(2)) {
  let slugs = argv
  if (argv[0] === '--all') {
    slugs = fs.readdirSync(path.join(ROOT, 'src/data/factions'))
      .filter((f) => f.endsWith('.js') && f !== 'index.js')
      .map((f) => f.replace(/\.js$/, ''))
  }
  if (!slugs.length) {
    console.log('Usage: node scripts/sync-faction-text.mjs <slug> [<slug> ...] | --all')
    return 1
  }
  for (const slug of slugs) await syncFaction(slug)
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
