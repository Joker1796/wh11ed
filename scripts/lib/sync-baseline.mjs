// The accepted-findings baseline for `npm run sync`.
//
// The audit prints ~5000 lines and has for months. Almost all of it is true and known: appdata
// records several parallel price rows per datasheet where we carry the Munitorum's one, its
// `appdata="-"` template marks its own missing fields, and a few hundred rule bodies differ from
// ours in wording we chose on purpose. None of that is a defect, and none of it changes between
// runs — but it buries the handful of lines that DO. That is the pattern this repo has been bitten
// by before: 09.07 Fall-back Move lost the word "shoot" in June and was printed on every run until
// September, one finding among 287.
//
// So: a finding recorded here is not printed. Anything else is.
//
// **The key is the finding line itself**, values included — `wh11ed=[75] appdata=[70,75]` and not
// just "Impulsor points differ". So the moment either side changes, the line no longer matches its
// baseline entry and comes back as new. A baseline that only remembered WHICH field disagreed
// would hide the day the disagreement became a different one, which is the only day that matters.
//
// A finding owns the lines indented deeper than it (the diff body, the paste-ready canonical
// text), so suppressing one suppresses its whole block rather than leaving an orphaned quotation.
//
// Two things keep it from rotting:
//   • every run prints how many findings it suppressed — the number is never invisible;
//   • an entry that matched nothing this run is reported as STALE, the same way
//     check-rule-omissions.mjs reports an ALLOW entry that stopped matching.
//
// Record the current state with `npm run sync -- --baseline`. Read the diff before committing it:
// what goes in here is a decision that these lines are fine, and it is reviewable precisely
// because it is a file.
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { ROOT } from './sync-common.mjs'

export const BASELINE_PATH = path.join(ROOT, 'scripts/lib/sync-baseline.json')

// A finding is a marker line at the section's own indent; everything indented deeper belongs to it.
const FINDING = /^\s{0,4}[~+\-?]\s/
const indentOf = (line) => line.length - line.trimStart().length

export const findingKey = (line) => line.trim().replace(/\s+/g, ' ')

export function loadBaseline() {
  try {
    return JSON.parse(readFileSync(BASELINE_PATH, 'utf8'))
  } catch {
    return {}
  }
}

export function writeBaseline(entries) {
  const sorted = Object.fromEntries(Object.keys(entries).sort().map((k) => [k, entries[k]]))
  writeFileSync(BASELINE_PATH, `${JSON.stringify(sorted, null, 2)}\n`)
  return Object.keys(sorted).length
}

// Split a section's output into findings (a marker line plus its deeper-indented body) and the
// prose around them (headings, counts, ✓/⚠ summaries), which is never suppressed.
export function splitFindings(lines) {
  const out = []
  for (let i = 0; i < lines.length; i++) {
    if (!FINDING.test(lines[i])) { out.push({ head: null, lines: [lines[i]] }); continue }
    const head = lines[i]
    const at = indentOf(head)
    const block = [head]
    // A blank line does NOT end the block. The paste-ready canonical text a text-diff finding
    // quotes is a whole rule, paragraph breaks and all — stopping at the first of them left three
    // hundred lines of somebody else's rulebook printed under a finding that had been suppressed.
    // So look past the blanks: the block continues while the next line that HAS content is still
    // indented deeper than the finding itself.
    while (i + 1 < lines.length) {
      let j = i + 1
      while (j < lines.length && !lines[j].trim()) j++
      if (j >= lines.length || indentOf(lines[j]) <= at) break
      while (i < j) block.push(lines[++i])
    }
    out.push({ head, lines: block })
  }
  return out
}

// Returns the lines to print, plus what was suppressed and which keys were seen.
export function applyBaseline(lines, baseline) {
  const kept = []
  const seen = new Set()
  let suppressed = 0
  for (const part of splitFindings(lines)) {
    if (!part.head) { kept.push(...part.lines); continue }
    const key = findingKey(part.head)
    seen.add(key)
    if (Object.hasOwn(baseline, key)) { suppressed++; continue }
    kept.push(...part.lines)
  }
  return { kept, suppressed, seen }
}
