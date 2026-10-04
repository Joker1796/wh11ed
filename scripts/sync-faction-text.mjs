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
import { APPDATA, ROOT, SLUG_MAP, norm, appdataToMarkup, bodyText, currentWargearRules, loadModule, byNormName, combatPatrolNames, loadWh11edDatasheets } from './lib/sync-common.mjs'
import { loadAppdataBundle } from './lib/appdata-exceptions.mjs'

// Strip wh11ed's enrichment layer (and appdata's residual markup) down to bare comparable words.
// Applied to BOTH sides — appdata text is run through appdataToMarkup first, so both arrive in
// the same `**bold**`/`▪`/CAPS convention before this peels it all off.
function plainText(s) {
  if (!s) return ''
  let t = s
  // appdata's HTML entities ("&#x65;xcluding", "Not&#x65;") — a character, not a word break
  t = t.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  t = t.replace(/\[gloss:[^:\]]+:([^\]]*)\]/g, '$1') // [gloss:id:label] → label
  t = t.replace(/\[def:[^:\]]+:([^\]]*)\]/g, '$1') // [def:id:label] → label
  t = t.replace(/\[core:([^\]]*)\]/g, '$1') // [core:Stealth] → Stealth
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
  t = t.replace(/\b([a-z]+) \1\b/g, '$1') // appdata stutters ("and it it can only") — wh11ed fixes them
  t = t.replace(/\b(\d) cp\b/g, '$1cp') // "1 CP" ⇄ "1CP"
  // A detachment's tag sentence: the tags are the MFM's to give and take (owner, 2026-08-26) and
  // `npm run detmeta` holds them to it; in prose the two sides print and drop it independently.
  t = t.replace(/\bthis detachment has the [a-z0-9 ]+? tag and cannot be taken with another [a-z0-9 ]+? detachment\b/g, ' ').replace(/\s+/g, ' ').trim()
  t = t.replace(/(^| )-( |$)/g, ' ').replace(/\s+/g, ' ').trim() // a dash used as a separator, not a minus
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
  // Shown against the closest candidate — the one leaving the fewest words unmatched — so a
  // combined rule is diffed against the app's rules joined, not against its first section.
  const diffs = cands.map((c) => ({ c, ...wordDiff(wh, plainText(c)) }))
  const { c: app, whMid, appMid } = diffs.sort((x, y) => (x.whMid.length + x.appMid.length) - (y.whMid.length + y.appMid.length))[0]
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

// Our one rule often carries several of the app's under `### Name` headings (Combat Doctrines
// with Transhuman Strategist and Librarius; Waaagh! with Da Boss; a detachment's Restrictions):
// each such section is compared with the app's rule of that name, and the rest — including a
// `###` heading that names no other rule (Voice of Command's "The Orders") — with the main one.
function visitSections(visit, label, mainName, body, appRules) {
  const used = new Set()
  const parts = String(body).split(/\n(?=### )/)
  const main = [parts[0]]
  const sections = []
  for (const part of parts.slice(1)) {
    const heading = part.match(/^### ([^\n|]+)/)[1].trim()
    const rule = appRules.find((r) => !used.has(r) && !nameRelated(mainName, r.name) && nameRelated(heading, r.name || ''))
    if (rule) { used.add(rule); sections.push([heading, part.replace(/^### [^\n]*\n?/, ''), rule]) } else main.push(part)
  }
  const mainCands = appRules.filter((r) => !used.has(r) && nameRelated(mainName, r.name || '')).map((r) => r.body ?? r.text)
  visit(label, main.join('\n'), mainCands)
  for (const [heading, text, rule] of sections) visit(`${label} · "${heading}"`, text, [rule.body ?? rule.text])
}

// tables/detachment_detail (+ its bullet points): the blocks a detachment carries beside its rules.
let detailCache
function detachmentDetails() {
  if (detailCache) return detailCache
  const read = (t) => JSON.parse(fs.readFileSync(path.join(APPDATA, 'tables', `${t}.json`), 'utf8'))
  const bullets = new Map()
  for (const b of read('detachment_detail_bullet_point')) {
    if (!bullets.has(b.detachmentDetailId)) bullets.set(b.detachmentDetailId, [])
    bullets.get(b.detachmentDetailId).push(b)
  }
  detailCache = new Map()
  for (const d of read('detachment_detail').sort((a, b) => a.displayOrder - b.displayOrder)) {
    const text = (bullets.get(d.id) || []).sort((a, b) => a.displayOrder - b.displayOrder).map((b) => `▪ ${b.localisations?.en?.text || ''}`).join('\n')
    if (!detailCache.has(d.detachmentId)) detailCache.set(d.detachmentId, [])
    detailCache.get(d.detachmentId).push({ name: d.localisations?.en?.title || '', text })
  }
  return detailCache
}

// Fuzzy name match used for army/detachment rules whose wh11ed and appdata names may differ by a
// classification suffix or containment (same convention as sync-appdata's army-rule matcher).
const nameRelated = (a, b) => {
  const x = norm(a)
  const y = norm(b)
  return x === y || x.includes(y) || y.includes(x)
}

// Walk every (label, wh11ed text, appdata candidates) triple this faction offers and hand each to
// `visit`. Exported because check-emphasis.mjs asks a DIFFERENT question of the SAME pairs — did
// our sentence keep the emphasis appdata's carries? — and a second pairing written beside this one
// would be free to drift, after which the two audits would disagree about which appdata rule a
// sentence of ours even corresponds to. Returns a reason string when there is nothing to pair.
export async function eachFactionTextPair(slug, visit, report = () => {}) {
  const appSlug = SLUG_MAP[slug] || slug
  const bundle = loadAppdataBundle(appSlug, { family: true }) // our recorded departures applied — scripts/lib/appdata-exceptions.mjs
  const factionMod = await loadModule(path.join(ROOT, 'src/data/factions', `${slug}.js`))
  const en = Object.values(factionMod || {})[0]?.en
  if (!bundle) return 'no appdata bundle found — check SLUG_MAP or spelling'
  if (!en) return 'no src/data/factions/<slug>.js found'

  const cp = combatPatrolNames()
  const details = detachmentDetails()
  const appDetachments = (bundle.detachments || []).filter((d) => !cp.detachments.has(norm(d.name)))
  const appArmyRules = (bundle.armyRules || []).filter((r) => !cp.armyRuleIds.has(r.id))

  // Army rule — wh11ed carries one combined `armyRule`; match appdata army rule(s) by name.
  if (en.armyRule?.body) {
    visitSections(visit, `army rule "${en.armyRule.name}"`, en.armyRule.name, en.armyRule.body, appArmyRules)
  }

  // Detachments: the detachment rule, then per-detachment stratagems and enhancements.
  const appDetByName = byNormName(appDetachments, (d) => d.name)
  for (const d of en.detachments || []) {
    const appDet = appDetByName.get(norm(d.name))
    if (!appDet) continue // structural miss — sync-appdata reports that

    if (d.rule?.body) {
      let ruleCands = (appDet.rules || []).filter((r) => nameRelated(d.rule.name, r.name))
      // The blocks the app keeps as data beside the rules (Restrictions, Keywords, Travelling
      // Players — tables/detachment_detail) we print inside the rule (owner, 2026-10-03): they are
      // sections like the app's other rules.
      const appRules = [...(appDet.rules || []), ...(details.get(appDet.id) || [])]
      const single = !ruleCands.length && (appDet.rules || []).length === 1 ? appDet.rules[0].name : d.rule.name
      visitSections(visit, `detachment "${d.name}" · rule "${d.rule.name}"`, single, d.rule.body, appRules)
    }

    const appStratByName = byNormName(appDet.stratagems || [], (s) => s.name)
    for (const s of d.stratagems || []) {
      const a = appStratByName.get(norm(s.name))
      if (!a) continue
      const lbl = `detachment "${d.name}" · stratagem "${s.name}"`
      visit(`${lbl} · WHEN`, s.when, [a.when])
      visit(`${lbl} · TARGET`, s.target, [a.target])
      visit(`${lbl} · EFFECT`, s.effect, [a.effect])
      visit(`${lbl} · RESTRICTIONS`, s.restrictions, [a.restriction])
    }

    const appEnhByName = byNormName(appDet.enhancements || [], (e) => e.name)
    for (const e of d.enhancements || []) {
      const a = appEnhByName.get(norm(e.name))
      if (!a) continue
      visit(`detachment "${d.name}" · enhancement "${e.name}"`, e.body, [a.rules])
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
      visit(`datasheet "${d.name}" · ability "${ab.name}"`, ab.text, [a.rules])
    }

    // abilitySets — the "pick one" groups on Primarch-grade sheets (Angron's Wrathful Presence):
    // each option is appdata's subAbilities[] under the set's own datasheet ability. Left out of
    // this diff until 2026-10, errata to them (Angron, Mortarion, Yarrick) went unnoticed.
    for (const set of d.abilitySets || []) {
      const optByName = byNormName(appAbilityByName.get(norm(set.name))?.subAbilities || [], (s) => s.name)
      for (const opt of set.options || []) {
        const s = optByName.get(norm(opt.name))
        if (!s) continue
        visit(`datasheet "${d.name}" · ability set "${set.name}" · "${opt.name}"`, opt.text, [s.rules])
      }
    }

    // wargearAbilities — a wargear item's own passive rule text (e.g. Storm Shield's invulnerable
    // save grant) lives on appdata's wargear[].ruleText, not in abilities[].
    const appWgByName = byNormName(appDs.wargear || [], (w) => w.name)
    for (const wa of d.wargearAbilities || []) {
      const w = appWgByName.get(norm(wa.name))
      if (!w?.ruleText) continue
      visit(`datasheet "${d.name}" · wargear ability "${wa.name}"`, wa.text, [w.ruleText])
    }

    // rules[] (BODYGUARD/ATTACHED UNIT/etc structural plates) — appdata buckets these, PLUS the
    // prose form of Leader/Support and a vehicle's Transport capacity, under one generic named
    // `rules[]` list (see sync-appdata.mjs's structural leader/bodyguard-units diff for the
    // separate, id-independent cross-check of the unit list itself).
    const appRulesByName = byNormName(appDs.rules || [], (r) => r.name)
    for (const r of d.rules || []) {
      const a = appRulesByName.get(norm(r.name))
      if (!a) continue
      visit(`datasheet "${d.name}" · rule "${r.name}"`, r.text, [a.rules])
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
      if (cands.length) visit(`datasheet "${d.name}" · leader`, whLeaderProse, cands)
    }
    if (d.transport) {
      const t = appRulesByName.get('transport')
      if (t) visit(`datasheet "${d.name}" · transport`, d.transport, [t.rules])
    }

    // damaged — the wounds-threshold band. appdata may carry more than one damageAbility entry
    // (multi-threshold superheavies); no drift is reported if wh11ed's text matches ANY of them.
    if (d.damaged?.text) {
      const cands = (appDs.damageAbility || []).map((r) => r.rules).filter(Boolean)
      if (cands.length) visit(`datasheet "${d.name}" · damaged`, d.damaged.text, cands)
    }

    // composition + loadout vs appdata's single unitComposition string — reconstruct wh11ed's
    // side in the same bullet-list-then-prose shape so plainText() sees comparable text.
    if ((d.composition?.length || d.loadout) && appDs.unitComposition) {
      const whComp = [...(d.composition || []).map((c) => `▪ ${c}`), d.loadout || ''].filter(Boolean).join('\n')
      // The app writes "1 Clanblade model … 1 Item; 1 Item"; we print "Clanblade … Item, Item".
      // A fold for the comparison only (4th argument) — check-emphasis reads the texts as they are.
      const countless = (t) => t.replace(/(^|[>*\n▪■•◦;,:]\s*)1 (?=[A-Za-z’'])/g, '$1').replace(/ models?\b/g, '')
      visit(`datasheet "${d.name}" · composition`, whComp, [appDs.unitComposition], countless)
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
        if (/^\s*\*/.test(opt)) continue // a footnote line of its own ("* Maximum 1 per model") — the containment check below covers it
        const optWords = new Set(plainText(opt).split(' '))
        const ranked = [...wgRulesTexts].sort((a, b) => overlap(plainText(appMarkup(b)), optWords) - overlap(plainText(appMarkup(a)), optWords))
        visit(`datasheet "${d.name}" · wargear option`, opt, ranked)
      }
      // …and the two gaps that match can't see, as a containment check both ways: a line of ours
      // appdata's instructions don't contain (stale, or a hand-typo), and a line of appdata's —
      // an option bullet or a sub-item — that ours don't contain. The superseded "■" copies 963
      // left beside the current instructions are dropped first, as gen-datasheets drops them.
      // The line itself is in the finding's head, so an accepted one comes back when it changes.
      const appPlain = ` ${currentWargearRules(appDs.wargearRules || []).map((r) => plainText(appMarkup(r.rules))).join(' ')} `
      const whPlain = ` ${(d.options || []).map(plainText).join(' ')} `
      for (const opt of d.options || []) {
        const p = plainText(opt)
        if (p && !appPlain.includes(` ${p} `)) report(`  - datasheet "${d.name}" · wargear option not in appdata: «${opt.replace(/\n/g, ' ')}»`)
      }
      for (const r of currentWargearRules(appDs.wargearRules || [])) {
        for (const piece of appMarkup(r.rules).split(/\n|▪|◦|■|\s(?=\*\s)/)) { // a footnote (" * No model…") can trail the last item
          const p = plainText(piece)
          if (p.split(' ').length >= 3 && !whPlain.includes(` ${p} `)) report(`  + datasheet "${d.name}" · appdata wargear option missing: «${piece.trim()}»`)
        }
      }
    }
  }

  return null
}

async function syncFaction(slug) {
  const out = []
  const why = await eachFactionTextPair(slug, (label, whText, cands, fold = (t) => t) => compare(out, label, fold(whText), cands.map(fold)), (line) => out.push(line))
  console.log(`\n=== ${slug} (appdata: ${SLUG_MAP[slug] || slug}) ===`)
  if (why) console.log(`  ${why}`)
  else if (!out.length) console.log('  no text differences found')
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
