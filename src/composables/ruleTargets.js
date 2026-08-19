// Which of YOUR units a rule's own text says it affects — the keyword layer that lets the roster
// overlay show a unit only the detachment/army rules that actually bear on it. Pure, no Vue.
//
// Rules almost always name their target in the prose ("Speed Freeks units from your army are
// eligible to…", "each time a friendly ADEPTUS CUSTODES TERMINATOR model…"), so the target is
// readable without any hand-authored sidecar — and reading it from the same string that gets
// rendered means the gate can never drift away from the text it gates, which a generated sidecar
// would eventually do.
//
// THE WHOLE DESIGN IS FAIL-OPEN. A gate that wrongly hides a rule is far worse than one that
// wrongly shows it: the reader loses a rule that applies to their unit and has no way to know.
// So there are three independent escapes, and any of them showing the rule wins:
//   1. A rule that says nothing about your own units at all is never gated.
//   2. If ANY passage that does talk about your units names no keyword ("Units from your army with
//      this ability…", "that unit", "models in that unit"), the whole rule is ungated — we only
//      gate what we understand end to end. This is what keeps multi-part rules honest: Aeldari's
//      Battle Focus names VEHICLE in one of its five triggers and nothing in the others, and
//      gating on that one word would hide it from every infantry unit in the army.
//   3. If the extracted targets match no unit in the faction at all, the extraction is assumed
//      wrong and ignored (see targetsApply). Measured across all 30 factions: 196 of 298 rules
//      yield targets and 14 of those match nothing — a keyword the datasheets spell differently
//      ("Votann" vs the LEAGUES OF VOTANN faction keyword), or a capitalised word that was never
//      a keyword. All 14 fall back to being shown.
//
// Always run this on the ENGLISH body. Keywords stay English by project convention but the prose
// around them is translated, so the patterns below only match the EN text.

// A keyword phrase: one or more capitalised words. Matches both the ALL-CAPS spelling and the
// Title Case one — the faction files use whichever the source PDF used.
const KW = "[A-Z][A-Za-z’'\\-]*(?:\\s+[A-Z][A-Za-z’'\\-]*)*"
const PATTERNS = [
  new RegExp(`(${KW})\\s+(?:units?|models?)\\s+from your army`, 'g'),
  new RegExp(`friendly\\s+(${KW})\\s+(?:units?|models?)`, 'g'),
]

// Does this passage speak about the reader's own army at all?
const OWN_SIDE = /from your army|friendly/i

// Capitalised words that are never a unit keyword — sentence openers, game vocabulary, the
// structural labels the faction files use inside rule bodies (TRIGGER:/EFFECT:/KEYWORDS).
const STOP = new Set(['The', 'This', 'That', 'These', 'Those', 'Each', 'While', 'When', 'If', 'Until', 'At', 'In',
  'Add', 'Subtract', 'Your', 'You', 'Roll', 'Select', 'Then', 'Once', 'For', 'Command', 'Movement', 'Shooting',
  'Charge', 'Fight', 'Phase', 'Battle', 'Round', 'Turn', 'Range', 'Strength', 'Toughness', 'Attacks', 'Wound',
  'Hit', 'Save', 'Other', 'Units', 'Models', 'Unit', 'Model', 'A', 'An', 'One', 'Any', 'All', 'Every', 'Eligible',
  'Enemy', 'Friendly', 'Keywords', 'Trigger', 'Effect', 'Number', 'Up', 'Same', 'Different', 'Both', 'Either'])

const isStop = (w) => STOP.has(w) || STOP.has(w[0] + w.slice(1).toLowerCase())

// Paragraphs and `### ` sub-rule sections — the unit of "one thing the rule says".
function passages(body) {
  return (body || '').replace(/\*\*/g, '').split(/\n\s*\n|\n(?=###\s)/).filter((p) => p.trim())
}

// The keyword phrases a rule names as its own-army targets, or null for "don't gate this rule".
export function ruleTargets(body) {
  const own = passages(body).filter((p) => OWN_SIDE.test(p))
  if (!own.length) return null // escape 1
  const all = new Set()
  for (const passage of own) {
    const found = new Set()
    for (const re of PATTERNS) {
      re.lastIndex = 0
      let m
      while ((m = re.exec(passage))) {
        const words = m[1].split(/\s+/).filter((w) => !isStop(w))
        if (words.length) found.add(words.join(' '))
      }
    }
    if (!found.size) return null // escape 2
    for (const f of found) all.add(f)
  }
  return [...all]
}

const norm = (s) => (s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim()

// A target phrase is a CONJUNCTION of keywords written as one run — "Adeptus Custodes Terminator"
// means the ADEPTUS CUSTODES faction keyword AND the TERMINATOR keyword — so cover the phrase with
// the unit's own keywords, longest first (a shorter keyword must not claim a run a longer one
// also starts).
export function keywordsMatchTarget(keywords, target) {
  const kws = [...new Set((keywords || []).map(norm))].filter(Boolean).sort((a, b) => b.length - a.length)
  let rest = norm(target)
  if (!rest) return false
  while (rest) {
    const hit = kws.find((k) => rest === k || rest.startsWith(`${k} `))
    if (!hit) return false
    rest = rest.slice(hit.length).trim()
  }
  return true
}

// Does this rule bear on this unit? `unitKeywords` is the unit's own keywords + faction keywords;
// `factionKeywordSets` is the same for every unit in the faction, used only for escape 3 — pass it
// whenever you have it, and omit it to skip that guard (the gate is then one escape weaker).
export function ruleAppliesTo(body, unitKeywords, factionKeywordSets) {
  const targets = ruleTargets(body)
  if (!targets) return true
  if (factionKeywordSets?.length) {
    const anyUnitMatches = factionKeywordSets.some((kws) => targets.some((t) => keywordsMatchTarget(kws, t)))
    if (!anyUnitMatches) return true // escape 3: the extraction matched nobody, so distrust it
  }
  return targets.some((t) => keywordsMatchTarget(unitKeywords, t))
}
