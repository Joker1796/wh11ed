// GATE: fail when a line — or a single load-bearing word inside a line — of appdata's Core Rules
// prose is missing from wh11ed's transcription. Exits non-zero. `npm run omissions`.
//
// WHY THIS EXISTS, WHEN sync-core.mjs ALREADY DIFFS THE SAME TEXT. On 2026-09-07 a player reported
// that 09.07 Fall-back Move did not say the unit cannot shoot. It had said so in the very first
// commit; the word was lost on 2026-06-14 when the move-type cards were re-typed off a screenshot
// and the line was copied from 09.06 Advance (where "shoot" genuinely does not belong). sync-core
// printed that finding every single run — buried in 287 others, because it reports EVERY
// difference in BOTH directions, and ~95% of those are our own deliberate additions (notes,
// examples, FAQ blocks) and harmless paraphrase. A report nobody can finish reading is not a gate.
//
// So this script reports ONE class and nothing else: appdata says something we do not. Two shapes:
//   • dropped word — an appdata line we clearly do carry (a near-match on our side), minus one or
//     more significant words. This is the fall-back bug's exact shape, and the one no human
//     spots when skimming: the sentence looks right.
//   • missing line — an appdata line with no counterpart on our side at all.
// Our own additions are never findings here — that direction is sync-core's job, and it is where
// the noise lives.
//
// EXCEPTIONS: the ALLOW table below. Every entry is a place where wh11ed deliberately condenses
// appdata's wording and the rule is unchanged, with the reason spelled out. Nothing is skipped
// silently, and the count of suppressed findings is printed on every run — if that number grows
// without a matching ALLOW entry landing in the same commit, the gate is being sanded down.
//
// Usage:
//   node scripts/check-rule-omissions.mjs            # gate all of 01-25, exit 1 on any finding
//   node scripts/check-rule-omissions.mjs 09         # one section (or one rule: 09.07)
//   node scripts/check-rule-omissions.mjs --verbose  # also list what ALLOW suppressed
import { pathToFileURL } from 'node:url'
import { loadAppdataCore, loadWh11edCore, loadWh11edChapters, appdataMarkup, plainText } from './lib/core-corpus.mjs'

// Words that carry no rule meaning on their own: their absence from a paraphrase never changes
// what a player does. Everything NOT on this list is load-bearing, deliberately — modality
// (must/cannot/only/unless), quantities, keywords and phase/step names all have to be.
const STOP = new Set(
  ('a an and are as at be been being by can do does for from had has have in into is it its of on or over that the their'
    + ' them then there these this those to was were will with your you they he she his her s such been just also very'
    + ' any other another following below above shown when where while which who whom whose but so if'
    // Meta-navigation, not rule content: appdata's own pointers into its layout ("see below", "as
    // shown in the example", "its 'Effect' section"). wh11ed re-points these at its own page
    // structure — the rule they point AT is compared on its own.
    + ' see note example section overleaf opposite here frame diagram shows').split(' ')
)

// Appdata phrasings that wh11ed condenses on purpose. Matched as: rule number + every listed word
// appearing among the missing words of that finding. Keep the reason concrete — a future reader
// must be able to re-derive whether it still holds.
const ALLOW = [
  {
    num: '20.04',
    words: ['excluding', 'themselves'],
    why: 'appdata phrases the transport carve-out as an "(excluding units ... that are themselves in strategic reserves)" parenthetical; wh11ed inlines the same exclusion as "and is not embarked within a TRANSPORT that is also in strategic reserves".',
  },
  {
    num: '10.06',
    words: ['non-vehiclemodels'],
    why: 'appdata writes "Non-MONSTER/Non-VEHICLE**Models:**" (its own missing space, hence the glued token); wh11ed writes "Non-MONSTER/VEHICLE Models". Same set of models — the negation distributes over the slash either way.',
  },
]

const norm = (s) => plainText(s)
// Split on "/" as well as spaces: appdata writes "advance/fall-back move" and "Non-MONSTER/
// Non-VEHICLE" where wh11ed writes "advance or fall-back move" and "non-MONSTER/VEHICLE". The
// words are the same words; only the joiner differs.
const tokens = (s) => norm(s).split(/[\s/]+/).filter(Boolean)
// Fold the differences that are spelling, not content: plural/possessive endings, and the ordinal
// "1." bullets appdata numbers its steps with.
const stem = (w) => w.replace(/(?:'s|s)$/, '')
const significant = (w) => !STOP.has(stem(w)) && w.length > 1

// Split a rule's text into comparable lines: bullets and hard breaks first (appdata's <li>/<br>
// survive appdataMarkup as "▪"/newlines), then sentences, so a dropped word is localized to one
// sentence rather than diluted across a whole section.
function lines(text) {
  return String(text || '')
    .split(/\n+/)
    .flatMap((l) => l.split(/(?<=[.:])\s+(?=[A-ZА-Я▪])/))
    .map((l) => l.trim())
    .filter(Boolean)
}

// Bag-of-words F1 — how much of THIS appdata line the candidate wh11ed line accounts for.
function f1(aToks, bToks) {
  if (!aToks.length || !bToks.length) return 0
  const bag = new Map()
  for (const w of bToks) bag.set(w, (bag.get(w) || 0) + 1)
  let hit = 0
  for (const w of aToks) if (bag.get(w) > 0) { hit++; bag.set(w, bag.get(w) - 1) }
  return (2 * hit) / (aToks.length + bToks.length)
}

// Words of `aToks` the candidate does not account for, counting repeats (a line that says
// "hazard roll" twice is not covered by one).
function missingWords(aToks, bToks) {
  const bag = new Map()
  for (const w of bToks) bag.set(stem(w), (bag.get(stem(w)) || 0) + 1)
  // appdata's own text loses the odd space ("**visible**or", "every other model**in that unit") —
  // its HTML, not our omission. A token that shows up inside our text with the spaces taken out is
  // one of those, never a dropped word.
  const glued = bToks.join('')
  const out = []
  for (const w of aToks) {
    const k = stem(w)
    if (bag.get(k) > 0) bag.set(k, bag.get(k) - 1)
    else if (significant(w) && !glued.includes(k)) out.push(w)
  }
  return out
}

// A line whose best match on our side is this close is the SAME line, reworded — anything missing
// from it is a dropped word, not a different way of saying the same thing.
const NEAR = 0.6
// Below this, no counterpart exists at all. Between the two is genuine paraphrase territory, where
// judging by words alone produces noise, so those are left to sync-core's full report.
const ABSENT = 0.3
// Lines shorter than this are headings, labels and table cells — not rule text.
const MIN_TOKENS = 5

export async function run(argv = process.argv.slice(2)) {
  const verbose = argv.includes('--verbose')
  const prefix = argv.find((a) => !a.startsWith('--')) || ''
  const inScope = (num) => !prefix || num === prefix || num.startsWith(prefix + '.')

  const wh = await loadWh11edCore()
  const chapters = await loadWh11edChapters()
  const { app, dataVersion } = loadAppdataCore()

  const findings = []
  const allowed = []
  let compared = 0

  for (const num of [...app.keys()].filter(inScope).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
    const a = app.get(num)
    const w = wh.get(num)
    // Same two skips as sync-core: core stratagems are sync-tracker's beat, and a container with
    // no text has nothing to be missing. A rule with no wh11ed counterpart at all is sync-core's
    // "+ missing in wh11ed" finding, not this gate's business — it reports words, not absences.
    if (a.type === 'stratagem' || !a.text || !w) continue
    compared++

    const whToks = tokens(w.body)
    const whLines = lines(w.body).map((l) => ({ text: l, toks: tokens(l) }))
    // Everything the chapter says, for the "is this anywhere on the page?" question below.
    const chapterToks = tokens(chapters.get(num.slice(0, 2)) || w.body)

    for (const line of lines(appdataMarkup(a.text))) {
      // Diagram and worked-example captions ("Both models shown here can move a ***maximum
      // distance*** of 6\""). appdata renders them <b><i>, which survives as ***triple asterisks***
      // and nothing else in the corpus uses — 83 of 1044 lines, all captions. wh11ed ships the
      // diagram as an image with its own alt text, so a caption is never a rule gap.
      if (line.includes('***')) continue
      const aToks = tokens(line)
      if (aToks.length < MIN_TOKENS) continue

      let best = { score: 0, toks: [] }
      for (const cand of whLines) {
        const score = f1(aToks, cand.toks)
        if (score > best.score) best = { score, toks: cand.toks }
      }

      let kind = null
      let missing = []
      if (best.score >= NEAR) {
        missing = missingWords(aToks, best.toks)
        // …but only if the whole rule doesn't carry those words elsewhere: wh11ed regularly splits
        // one appdata sentence across two of its own (an info-card label + its bullet), and that is
        // formatting, not a gap.
        missing = missingWords(missing, whToks)
        if (missing.length) kind = 'dropped word'
      } else if (best.score < ABSENT) {
        // A line can score low against every single line of ours and still be said on our page —
        // chapter intros, step lists and the section-level tables all live outside the numbered
        // rule. Ask the whole chapter, and only call it missing when its own words are largely
        // absent from all of it.
        missing = missingWords(aToks, chapterToks)
        if (missing.length >= Math.max(3, aToks.filter(significant).length * 0.5)) kind = 'missing line'
      }
      if (!kind) continue

      const hit = ALLOW.find((e) => e.num === num && e.words.every((x) => missing.includes(x)))
      const item = { num, title: w.title, file: w.file, kind, missing, line: line.replace(/\s+/g, ' ').trim() }
      if (hit) allowed.push({ ...item, why: hit.why })
      else findings.push(item)
    }
  }

  console.log(`check-rule-omissions — appdata data_version ${dataVersion}${prefix ? `, section ${prefix}` : ', sections 01-25'}`)
  console.log(`  ${compared} rule(s) compared, ${allowed.length} known condensation(s) allowed\n`)

  for (const f of findings) {
    console.log(`  ✗ ${f.num} "${f.title}" [${f.file}] — ${f.kind}: ${f.missing.map((m) => `"${m}"`).join(', ')}`)
    console.log(`      appdata: ${f.line}`)
  }
  if (verbose) for (const a of allowed) console.log(`  · allowed ${a.num} (${a.missing.join(', ')}): ${a.why}`)
  // An ALLOW entry that stops matching has outlived the condensation it excused — either the text
  // changed on one side or the normalization got better. Say so, so the table does not rot into a
  // list of exemptions nobody can justify.
  const stale = ALLOW.filter((e) => !allowed.some((a) => a.num === e.num && e.words.every((x) => a.missing.includes(x))))
  for (const e of stale) console.log(`  ! ALLOW entry ${e.num} (${e.words.join(', ')}) matched nothing — delete it or fix what it was excusing.`)

  if (!findings.length) {
    console.log('  no missing rule text found.')
    return 0
  }
  console.log(`\n  ${findings.length} omission(s). Each is text appdata carries and wh11ed does not:`)
  console.log('  transcribe it (RU side too — see DATA-SYNC.md §4), or add an ALLOW entry with the')
  console.log('  reason the shorter wording says the same thing.')
  return 1
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exitCode = await run()
