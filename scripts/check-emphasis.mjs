// GATE: emphasis wh40k-appdata carries that our prose dropped.
//
// WHY. appdata marks its rule text up — `<b>` for an emphasised term, `<k>` for a keyword — and
// `appdataToMarkup` turns those into `**bold**` and ALL CAPS. Our hand-authored prose carries the
// same words and, in thousands of places, none of the marking: "Vanguard Invader model only. This
// unit has Stealth" where the canon reads "**VANGUARD INVADER** model only. This unit has
// **Stealth**." Nothing is factually wrong — what breaks is reading: a player scans for the
// highlighted term and finds a flat sentence. A player reported exactly that (2026-09-15) about
// Stealth on a Tyranids enhancement, and it turned out to be one instance of ~4700.
//
// WHY `npm run sync:text` DOESN'T SEE IT, AND SHOULDN'T. Its `plainText()` strips `**`, brackets
// and glosses off BOTH sides before comparing, because our prose is enriched with glosses and
// cross-refs the canon has no equivalent for — without that normalisation its report would be
// solid noise. Lost formatting is invisible to it by construction. This gate is the other half of
// that pair: same pairing, same corpus, opposite question.
//
// WHAT IT GATES ON, AND WHAT IT ONLY COUNTS. The drift splits into three classes of very different
// value, and gating on all of them would make a 4700-line report nobody reads:
//
//   A  a CORE ABILITY named in prose (Stealth, Deep Strike, Feel No Pain 5+). Small, finite, and
//      the one the complaint was about. Fixed with `[core:Name]`, which renders bold and opens the
//      rule — the app has been able to do that all along and no faction file ever asked it to.
//   B  a KEYWORD that lost its capitals. Gated only where the renderer's own auto-bold list knows
//      the word (useRenderInline's CORE_KEYWORDS/FACTION_KEYWORDS): there, restoring the capitals
//      in the data restores the bold with no markup at all, which is the cheapest possible fix per
//      spot. The rest of class B is COUNTED, not gated — a deliberate scope decision, not an
//      oversight.
//   C  a game term in prose (unengaged, detection range, Hit rolls). Counted only. Marking ~1600
//      of those buys far less than it costs, and the count keeps the decision visible instead of
//      letting it rot into an undocumented debt.
//
// A span our prose does not CONTAIN at all is skipped: the wording differs, which is
// `sync:text`'s finding, and reporting it here would duplicate it in a report that cannot fix it.
//
// EN only. The RU overlay is held to the EN side by `npm run parity`, which compares the
// ALL-CAPS keyword multiset and the `[...]` bracket multiset as ERRORS — so a capital or a
// `[core:…]` added here without its RU twin fails that gate rather than this one.
//
// THE BASELINE. `scripts/lib/emphasis-baseline.json` holds the spots a pass could not place: our
// sentence carries the keyword somewhere the canon's phrase does not line up with (split by our own
// emphasis, worded differently, or living in a shared body no faction file owns). Each is a real
// edit somebody still has to make by hand — the file is a WORK LIST, not an amnesty, and every run
// prints how many it is holding so it cannot quietly become permanent. An entry that stops matching
// is reported: the wording moved, or somebody fixed it, and either way the line is stale.
//
// Usage:
//   node scripts/check-emphasis.mjs            # report; non-zero exit if anything outside the baseline is open
//   node scripts/check-emphasis.mjs --all      # list the counted-only classes too
//   node scripts/check-emphasis.mjs --baseline # re-record the baseline (read the diff before committing)
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, loadModule, allFactionBundles, appdataToMarkup, bodyText, escapeRegex } from './lib/sync-common.mjs'
import { eachFactionTextPair } from './sync-faction-text.mjs'
import { CORE_KEYWORDS, FACTION_KEYWORDS, AUTO_BOLD_RE } from '../src/composables/useRenderInline.js'

// The abilities `[core:…]` is worth spending: exactly the ones KeywordPopover can open, read from
// the same file it reads. An ability it cannot resolve would render as a link to nothing.
async function coreAbilityNames() {
  const mod = await loadModule(path.join(ROOT, 'src/data/reference.js'))
  return (mod?.coreAbilities?.en || [])
    .filter((a) => a.type === 'unit')
    .map((a) => a.name)
}

// The words this game treats as KEYWORDS, harvested from appdata itself rather than from a list
// kept here: GW is inconsistent about which of `<b>` and `<k>` it reaches for (half the keywords in
// the corpus are bolded, not tagged), so the tag at one site says nothing about the word. What IS
// reliable is the union over the whole corpus, plus every datasheet's name and printed keywords.
//
// Both spellings are harvested, because a faction bundle carries BOTH: appdata's own build has
// converted most of its text to the `**bold**` / ALL-CAPS markup form (22247 `**` runs) and left
// the rest as raw tags (2365 `<k>`). An ALL-CAPS run in a bundle IS a converted `<k>`, so it
// carries exactly the same signal and is read the same way.
function keywordVocabulary() {
  const out = new Set()
  const add = (s) => { const k = normSpan(s); if (k && k.length > 2) out.add(k) }
  const walk = (node) => {
    if (typeof node === 'string') {
      for (const m of node.matchAll(/<k>(.*?)<\/k>/gis)) add(stripTags(m[1]))
      for (const m of node.matchAll(CAPS_RUN)) add(m[0])
      return
    }
    if (Array.isArray(node)) { node.forEach(walk); return }
    if (node && typeof node === 'object') Object.values(node).forEach(walk)
  }
  for (const { bundle } of allFactionBundles()) {
    walk(bundle)
    for (const d of bundle.datasheets || []) {
      add(d.name)
      for (const k of d.keywords || []) add(typeof k === 'string' ? k : k?.name)
    }
  }
  // Shouting that is not a keyword: appdata writes these in caps as emphasis or as an abbreviation.
  for (const stop of ['cp', 'vp', 'ap', 'oc', 'warhammer', 'games workshop', 'and', 'or', 'not']) out.delete(stop)
  return out
}

// A run of capitals, the shape a converted `<k>` leaves behind — one word or several, slash unions
// included ("ADEPTUS ASTARTES", "MONSTER/VEHICLE"). Three letters minimum: "CP" and "D6" are not
// keywords, and a two-letter run is far more often an abbreviation than a name.
const CAPS_RUN = /\b[A-Z][A-Z'\u2019]{2,}(?:[ /-][A-Z][A-Z'\u2019]*)*\b/g

const stripTags = (s) => String(s || '').replace(/<[^>]+>/g, '').replace(/&#x?[0-9a-f]+;/gi, ' ')

// The comparison key. Mirrors sync-faction-text's plainText in spirit — quotes, dashes and case
// folded away — and stems a trailing plural, because appdata writes "Monsters" where a datasheet
// (and our prose) writes MONSTER.
function normSpan(s) {
  return String(s || '')
    .replace(/[’‘`]/g, "'")
    .replace(/[‐‑–—]/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9"+/-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    // Per WORD, not per string: appdata writes "excluding Monsters and Vehicles" where the
    // datasheet (and our prose) carries MONSTER and VEHICLE. Stemming only the last word left the
    // first one unmatched, and an unmatched span is skipped as "not in our text at all" — which is
    // how a whole class can disappear from a report that looks clean.
    .replace(/([a-z]{3,})s\b/g, '$1')
}

// appdata's text for one candidate, in the markup form `appdataToMarkup` produces — the same
// conversion `sync:text` compares through, so both audits read the canon identically. It has to be
// the CONVERTED form rather than the raw: a bundle is a mix of raw `<b>`/`<k>` tags and text
// appdata's own build already converted, and only after the conversion do the two look alike.
function markupOf(v) {
  return Array.isArray(v) ? bodyText(v) : appdataToMarkup(String(v || ''))
}

// Every emphasised span the canon carries, de-duplicated by comparison key. Two shapes, because
// the conversion produces two: `**bold**` for what GW tagged `<b>`, and a bare run of capitals for
// what it tagged `<k>`. A capitals run only counts when the corpus knows it as a keyword —
// otherwise it is appdata shouting, and shouting is not a term.
function spansOf(text, vocabulary) {
  const out = new Map()
  const add = (raw) => {
    const clean = String(raw).replace(/\*\*|__/g, '').replace(/\s+/g, ' ').trim()
    const key = normSpan(clean)
    // A run-in label ("Designer's Note:") is appdata's heading style, which wh11ed writes its own
    // way; a bare number is typography.
    if (!key || key.length < 3 || /^[\d\s.,;:]+$/.test(clean) || /:$/.test(clean)) return
    if (!out.has(key)) out.set(key, clean)
  }
  for (const m of text.matchAll(/\*\*([\s\S]+?)\*\*/g)) add(m[1])
  for (const m of text.matchAll(CAPS_RUN)) { if (vocabulary.has(normSpan(m[0]))) add(m[0]) }
  return out
}

// What OUR sentence marks, however it marks it. A span counts as kept if it lands inside any of
// these — `**bold**`, a `[BRACKET]` pill, a gloss/definition/core label, or an ALL-CAPS run the
// renderer bolds on sight. The last one is why this must use the renderer's own regex rather than
// a list kept here: a word bolded without markup is still bolded, and a gate that did not know
// that would report two thousand phantom losses.
function markedIn(text) {
  const out = []
  const push = (s) => { const k = normSpan(s); if (k) out.push(k) }
  for (const m of String(text || '').matchAll(/\*\*([\s\S]+?)\*\*/g)) push(m[1])
  for (const m of String(text || '').matchAll(/\[(?:gloss|def):[^\]:]+:([^\]]+)\]/g)) push(m[1])
  for (const m of String(text || '').matchAll(/\[core:([^\]]+)\]/g)) push(m[1])
  for (const m of String(text || '').matchAll(/\[([^\]]+)\]/g)) {
    if (/^(?:gloss|def|img|core):/.test(m[1])) continue
    push(m[1])
  }
  for (const m of String(text || '').matchAll(AUTO_BOLD_RE)) push(m[1])
  // Capitals are themselves the keyword spelling in this data (the renderer bolds the ones its
  // list knows, and the rest still read as keywords) — so an ALL-CAPS run of ours keeps a span
  // the canon capitalised, with or without `**`.
  for (const m of String(text || '').matchAll(CAPS_RUN)) push(m[0])
  return out
}

// Is `span` covered by one of those marked fragments? Whole-phrase containment, so a `**VANGUARD
// INVADER model**` covers the span "Vanguard Invader".
const covers = (marked, span) => marked.some((m) => m === span || m.includes(span))

// …and is the span even THERE? A phrase our prose does not contain is a wording difference, which
// is sync:text's report, not this one's.
const present = (plain, span) => plain.includes(span)

// What may follow a core ability's name: a rating or a distance, never a word. Without this the
// prefix match read the datasheet names "Scout Squad", "Scout Sentinel" and "Support Weapon" as
// the Scouts and Support abilities carrying a qualifier — eight phantom findings in class A, each
// of which would have been "fixed" by turning a unit's name into a link to the wrong rule.
const QUALIFIER = /^(?:\d+\+|\d+"|\d*d[36](?:\+\d+)?|\d+)$/i

// The findings, structured. Exported so a fixing pass reads the SAME list the gate fails on
// (`whText` is the exact field string to rewrite) instead of re-deriving it from the printed
// report — a report is for a human, and parsing one back is how a pass and its gate come to
// disagree about what they are looking at.
export async function collect() {
  const abilities = await coreAbilityNames()
  const abilityKeys = abilities.map(normSpan)
  const vocabulary = keywordVocabulary()
  const autoBold = new Set([...CORE_KEYWORDS, ...FACTION_KEYWORDS].map(normSpan))
  // …and the COMPOUNDS built on one of them. appdata marks "ADEPTUS ASTARTES INFANTRY" as a single
  // span, which is not itself in the renderer's list — but capitalising the "ADEPTUS ASTARTES" it
  // also marks elsewhere in the same rule, and leaving this one alone, produces "ADEPTUS ASTARTES
  // Infantry" inside one sentence. Half a compound in capitals is worse than none: the reader is
  // shown two spellings of one keyword. So a span anchored on an auto-bold keyword travels with it.
  const anchored = (key) => [...autoBold].some((k) => new RegExp(`\\b${escapeRegex(k)}\\b`).test(key))

  const factionSlugs = fs.readdirSync(path.join(ROOT, 'src/data/factions'))
    .filter((f) => f.endsWith('.js') && !f.startsWith('index'))
    .map((f) => f.slice(0, -3))
    .sort()

  const findings = { A: [], B: [], Bother: [], C: 0 }

  for (const slug of factionSlugs) {
    await eachFactionTextPair(slug, (label, whText, candidates) => {
      if (!whText) return
      const plain = normSpan(String(whText).replace(/\*\*|__/g, ''))
      const marked = markedIn(whText)
      // Several candidates only happen where appdata reprints a same-named rule; any of them is
      // an equally good source of the canon's emphasis, so take the richest.
      const canon = candidates.map(markupOf)
        .sort((a, b) => spansOf(b, vocabulary).size - spansOf(a, vocabulary).size)[0] || ''
      for (const [key, text] of spansOf(canon, vocabulary)) {
        if (!present(plain, key)) continue
        if (covers(marked, key)) continue
        // Exact name first, so "Scout Move" is itself and not "Scouts" plus the word "move".
        let ability = abilityKeys.indexOf(key)
        if (ability === -1) {
          ability = abilityKeys.findIndex((a) => key.startsWith(`${a} `) && QUALIFIER.test(key.slice(a.length + 1)))
        }
        if (ability !== -1) {
          // Spell the ability the way reference.js does, whatever case the canon shouted it in:
          // the popover resolves either, but the page prints what the data says.
          const rest = text.slice(abilities[ability].length).trim()
          findings.A.push({ slug, label, whText, text, fix: `[core:${abilities[ability]}${rest ? ` ${rest}` : ''}]` })
          continue
        }
        if (vocabulary.has(key)) {
          if (autoBold.has(key) || anchored(key)) findings.B.push({ slug, label, whText, text, fix: text.toUpperCase() })
          else findings.Bother.push({ slug, label, whText, text })
          continue
        }
        findings.C++
      }
    })
  }
  return findings
}

const BASELINE_PATH = path.join(ROOT, 'scripts/lib/emphasis-baseline.json')
const keyOf = (f) => `${f.slug} · ${f.label} · ${f.text}`

export async function run(argv = process.argv.slice(2)) {
  const all = argv.includes('--all')
  const record = argv.includes('--baseline')
  const findings = await collect()
  const baseline = (() => {
    try { return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8')) } catch { return {} }
  })()
  if (record) {
    const entries = {}
    for (const f of [...findings.A, ...findings.B]) entries[keyOf(f)] = f.fix
    const sorted = Object.fromEntries(Object.keys(entries).sort().map((k) => [k, entries[k]]))
    fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(sorted, null, 2)}\n`)
    console.log(`  baseline: ${Object.keys(sorted).length} spot(s) recorded in ${BASELINE_PATH}`)
    console.log('  Read the diff before committing it — every line in there is an edit nobody has made yet.')
    return 0
  }
  const seen = new Set()
  const held = []
  for (const cls of ['A', 'B']) {
    findings[cls] = findings[cls].filter((f) => {
      const k = keyOf(f)
      seen.add(k)
      if (!Object.hasOwn(baseline, k)) return true
      held.push(k)
      return false
    })
  }
  const stale = Object.keys(baseline).filter((k) => !seen.has(k))

  const section = (title, rows) => {
    if (!rows.length) return
    console.log(`\n  ${title}`)
    let last = null
    for (const f of rows) {
      if (f.slug !== last) { console.log(`\n  ${f.slug}`); last = f.slug }
      console.log(`  ~ ${f.label}`)
      console.log(`      “${f.text}” → ${f.fix}`)
    }
  }
  section('CLASS A — a core ability named in prose, unmarked', findings.A)
  if (all || findings.B.length <= 40) section('CLASS B — a keyword the renderer would bold if it were capitalised', findings.B)
  else console.log(`\n  CLASS B — ${findings.B.length} spot(s); re-run with --all to list them`)

  const open = findings.A.length + findings.B.length
  console.log(`\n  ${findings.A.length} core ability name(s) · ${findings.B.length} keyword(s) missing their capitals`)
  if (held.length) console.log(`  ${held.length} spot(s) held in the baseline — still an edit each, see scripts/lib/emphasis-baseline.json`)
  for (const k of stale) console.log(`  ! baseline entry matched nothing — delete it or fix what it was holding: ${k}`)
  console.log(`  not gated, by decision: ${findings.Bother.length} other keyword(s), ${findings.C} prose term(s)`
    + ' — see journal/ and src/data/CLAUDE.md')
  if (open || stale.length) {
    console.log('\n  Mark the EN text AND its RU twin in the same edit — `npm run parity` fails on a')
    console.log('  one-sided capital or bracket, and it is right to.')
    return 1
  }
  console.log(held.length
    ? '  ✓ nothing new — what the canon emphasises is emphasised here too, baseline aside.'
    : '  ✓ every core ability and auto-bold keyword the canon emphasises is emphasised here too.')
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())