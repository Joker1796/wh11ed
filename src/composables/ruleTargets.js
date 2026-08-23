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
//   3. If no unit in the faction matches at all, the extraction is assumed wrong and ignored.
//
// Measured across all 30 factions (re-measured 2026-08-23, after teaching KW_ALT the comma/or/and
// list form): 227 of 268 detachment rules yield a scope, 38.7% of (unit, rule) pairs are hidden,
// no unit is left seeing none of its faction's rules, and 10 rules fall through escape 3 — prose
// that abbreviates a faction keyword ("Votann units" against the LEAGUES OF VOTANN keyword,
// "AGENTS OF IMPERIUM"), or a capitalised word that was never a keyword. Those 10 are shown to
// everyone, which for the army-wide ones is the right answer anyway. Re-run that measurement after
// touching the patterns; the numbers are the only way to tell a sharper gate from a wrongly-hiding
// one — and diff the per-rule VISIBLE UNIT SETS, not just the totals. The 2026-08-23 change moved
// 16 rules to more units (each one a rule that had been hiding from units it names) and two the
// other way: Skitarii Hunter Cohort and Cult of Blood named their targets in a list, matched no
// keyword end to end, and so had been shown to the whole army by escape 2.
//
// Always run this on the ENGLISH body. Keywords stay English by project convention but the prose
// around them is translated, so the patterns below only match the EN text.

// A keyword phrase: one or more capitalised words. Matches both the ALL-CAPS spelling and the
// Title Case one — the faction files use whichever the source PDF used.
const KW = "[A-Z][A-Za-z’'\\-]*(?:\\s+[A-Z][A-Za-z’'\\-]*)*"
// …optionally written as an alternation: "Friendly Immortals/Necron Warriors units", and equally
// often as an English list — "a WRAITHBLADES, WRAITHGUARD or WRAITHLORD unit", "friendly JAKHALS or
// GOREMONGERS units". Reading only the slash form cost the whole gate on the list form: the run
// breaks at the comma, so the pattern either kept the LAST keyword alone (hiding the rule from the
// other two) or matched nothing at all and fell through escape 2. The separators can only extend a
// run that is still followed by "units"/"models", so a sentence that merely happens to carry "and"
// after a keyword backtracks to the plain form.
const KW_SEP = "(?:\\s*/\\s*|,\\s*|\\s+(?:or|and)\\s+)"
const KW_ALT = `${KW}(?:${KW_SEP}${KW})*`
// A parenthetical can sit between the noun and "from your army": "a Necrons model (excluding
// Monster models) from your army". The exclusion inside it is picked up separately by EXCLUDE.
const PAREN = "(?:\\s*\\([^)]*\\))?"
// `[Ff]riendly` rather than the /i flag: the flag would also make the capitalisation in KW
// case-insensitive, and "capitalised word" is the entire signal that something is a keyword.
const PATTERNS = [
  new RegExp(`(${KW_ALT})\\s+(?:units?|models?)${PAREN}\\s+from your army`, 'g'),
  new RegExp(`[Ff]riendly\\s+(${KW_ALT})\\s+(?:units?|models?)`, 'g'),
]

// "…(excluding Destroyer Cult, Monster and Titanic models)". Exclusions are safe by construction:
// one that matches no keyword — "excluding Battle-shocked units", "excluding units that arrived
// from Reserves" — simply excludes nobody, so the game-state conditions written this way cost
// nothing. 42 distinct exclusion phrases across the corpus.
// The trailing noun is optional — the corpus writes both "(excluding Destroyer Cult, Monster and
// Titanic models)" and "(excluding MONSTERS and VEHICLES)" — so this runs to the closing bracket
// or the end of the sentence and drops the noun afterwards if there is one.
const EXCLUDE = /excluding\s+([^).]{1,80})/gi

// Does this passage speak about the reader's own army at all?
const OWN_SIDE = /from your army|friendly/i

// Capitalised words that are never a unit keyword — sentence openers, game vocabulary, the
// structural labels the faction files use inside rule bodies (TRIGGER:/EFFECT:/KEYWORDS).
const STOP = new Set(['The', 'This', 'That', 'These', 'Those', 'Each', 'While', 'When', 'If', 'Until', 'At', 'In',
  'Add', 'Subtract', 'Your', 'You', 'Roll', 'Select', 'Then', 'Once', 'For', 'Command', 'Movement', 'Shooting',
  'Charge', 'Fight', 'Phase', 'Battle', 'Round', 'Turn', 'Range', 'Strength', 'Toughness', 'Attacks', 'Wound',
  'Hit', 'Save', 'Other', 'Units', 'Models', 'Unit', 'Model', 'A', 'An', 'One', 'Any', 'All', 'Every', 'Eligible',
  'Enemy', 'Friendly', 'Keywords', 'Trigger', 'Effect', 'Number', 'Up', 'Same', 'Different', 'Both', 'Either',
  'Detachment'])

const isStop = (w) => STOP.has(w) || STOP.has(w[0] + w.slice(1).toLowerCase())

// One statement of the rule: a paragraph, a `### ` sub-rule section, or a `▪ ` bullet. Bullets
// matter as much as paragraphs — Necrons' Cold Fervour is two bullets in one paragraph, the first
// targeting DESTROYER CULT and the second every other NECRONS model, and its exclusion belongs to
// the second alone. Treating the body as one statement would let that exclusion cancel the first
// bullet's own target and hide the rule from the very units it names.
function passages(body) {
  return (body || '')
    .replace(/\*\*/g, '')
    .split(/\n\s*\n|\n(?=###\s)|\n?(?=▪\s)/)
    .filter((p) => p.trim())
}

// Keyword phrases the excluding-clause names, plus their singular forms: rules write "excluding
// MONSTERS and VEHICLES" while the datasheet carries MONSTER and VEHICLE.
function excludesIn(passage) {
  const out = new Set()
  EXCLUDE.lastIndex = 0
  let m
  while ((m = EXCLUDE.exec(passage))) {
    for (const raw of m[1].replace(/\s+(?:units?|models?)\s*$/i, '').split(/,| and | or /i)) {
      const words = raw.trim().replace(/\s+(?:units?|models?)$/i, '')
        .split(/\s+/).filter((w) => /^[A-Z]/.test(w) && !isStop(w))
      if (!words.length) continue
      const phrase = words.join(' ')
      out.add(phrase)
      const singular = depluralise(phrase)
      if (singular !== phrase) out.add(singular)
    }
  }
  return [...out]
}

function depluralise(phrase) {
  return phrase.split(/\s+/).map((w) => {
    if (/heroes$/i.test(w)) return w.slice(0, -3)
    if (/ies$/i.test(w)) return `${w.slice(0, -3)}y`
    if (/(ss|us|is)$/i.test(w)) return w
    if (/(s|x|z|ch|sh)es$/i.test(w)) return w.slice(0, -2)
    if (/s$/i.test(w)) return w.slice(0, -1)
    return w
  }).join(' ')
}

// One `{ targets, excludes }` per statement that speaks about your own army, or null for
// "don't gate this rule". Per statement, not merged: a rule applies to a unit when ANY of its
// statements does, and each statement's exclusions bind only to its own targets.
export function ruleScopes(body) {
  const own = passages(body).filter((p) => OWN_SIDE.test(p))
  if (!own.length) return null // escape 1
  const scopes = []
  for (const passage of own) {
    const found = new Set()
    for (const re of PATTERNS) {
      re.lastIndex = 0
      let m
      while ((m = re.exec(passage))) {
        // An alternation is several targets, not one phrase.
        for (const alt of m[1].split(/\s*\/\s*|,\s*|\s+(?:or|and)\s+/)) {
          const words = alt.trim().split(/\s+/).filter((w) => !isStop(w))
          if (words.length) found.add(words.join(' '))
        }
      }
    }
    if (!found.size) return null // escape 2
    scopes.push({ targets: [...found], excludes: excludesIn(passage) })
  }
  return scopes
}

// Every target a rule names, flattened — the readable summary of ruleScopes(), and what the
// tests assert against.
export function ruleTargets(body) {
  const scopes = ruleScopes(body)
  return scopes && [...new Set(scopes.flatMap((s) => s.targets))]
}

const norm = (s) => (s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim()

// A target phrase is a CONJUNCTION of keywords written as one run — "Adeptus Custodes Terminator"
// means the ADEPTUS CUSTODES faction keyword AND the TERMINATOR keyword — so cover the phrase with
// the unit's own keywords, longest first (a shorter keyword must not claim a run a longer one
// also starts).
export function keywordsMatchTarget(keywords, target) {
  // Both spellings of every keyword: rules name a unit in the singular ("Vyper units from your
  // army", "War Walker units") while the datasheet's keyword is the plural the box is sold under
  // (VYPERS, WAR WALKERS). Adding the singular form can only ever match MORE units, which is the
  // safe direction for a target — and for an exclusion it just mirrors the same wording gap.
  const raw = [...new Set((keywords || []).map(norm))].filter(Boolean)
  const kws = [...new Set([...raw, ...raw.map(depluralise)])].sort((a, b) => b.length - a.length)
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
  const scopes = ruleScopes(body)
  if (!scopes) return true
  const hits = (kws) => scopes.some((sc) =>
    sc.targets.some((t) => keywordsMatchTarget(kws, t)) &&
    !sc.excludes.some((x) => keywordsMatchTarget(kws, x)))
  if (factionKeywordSets?.length && !factionKeywordSets.some(hits)) {
    return true // escape 3: the extraction matched nobody, so distrust it
  }
  return hits(unitKeywords)
}
