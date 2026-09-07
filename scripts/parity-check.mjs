// EN↔RU bilingual parity gate for faction rule data — the check the inline one-liner
// (block-marker counts + `**` balance per side) never covered: it cross-checks the two
// LANGUAGES against each other, not each side against itself.
//
// Motivation: during the 912 sync a session mirrored an appdata change into EN (folding a
// qualifier into an English ability bracket, `[LETHAL HITS] ... non-MONSTER/VEHICLE` →
// `[LETHAL HITS: non-MONSTER/VEHICLE]`) but left the RU field in its old form. The block-marker
// parity script did NOT catch it: both sides stayed even/balanced, only the `**` COUNT and the
// bracket TEXT diverged between languages. This tool flags exactly that class:
//
// ERRORS (fail the gate — always a real defect):
//   • ability-bracket multiset must be identical EN↔RU, case-sensitive — brackets are atomic
//     all-caps English and stay verbatim in RU. Catches both the qualifier-fold desync above and
//     a whole class of latent EN typos where an ability was written lower/mixed-case
//     (`[assault]`, `[sustained hits 1]`) — those break the KeywordPopover lookup. [gloss:…]/
//     [def:…]/[img:…] are excluded (their labels legitimately differ per locale).
//   • block-marker signature (▪ ◈ → ### ◆ [img:) must match EN↔RU.
//   • `**` / `__` must be balanced on each side (no stray `****`).
//   • RU field present whenever the EN sibling has text.
// NOTES (printed, do NOT fail the gate — legitimate causes exist):
//   • `**` / `__` COUNT differing EN↔RU. Usually harmless: an ALL-CAPS keyword is auto-bolded by
//     the renderer, so whether the data wraps it in `**` is inconsistent across languages. Worth
//     an eyeball (a RU side at 0 can mean an untranslated stub), but not a defect on its own.
//
// Pairs fields positionally, same shape the RU overlay guarantees: armyRule.body,
// detachments[i].rule.body, stratagems[j].{when,target,effect,restrictions} (joined, like the
// diff tool), enhancements[j].body. Exits non-zero on any ERROR so it can gate a commit next to
// `npm run build`.
//
// SECOND PASS — THE RULEBOOK ITSELF (added 2026-09-07). Faction data was the only thing checked
// here, which left the core rules — basicRules/battleRound/advancedRules/battlefields/muster and
// reference.js's Core Abilities — with no EN↔RU gate at all: their `en`/`ru` trees live in one
// file and are paired by position, and nothing verified the two stayed in step. The rule that
// they must (CLAUDE.md, "EN↔RU structural parity") was enforced by hand, so a fix landing in EN
// and not RU was invisible until a player hit it. The same `pair()` checks run over every
// EN/RU node of those trees, plus one the faction pass has no use for:
//   • MEASUREMENTS must match EN↔RU — distances (3"), dice (D6/2D6+3), thresholds (4+), ranges
//     (1-3) and signed modifiers (+1/-1). Numbers do not translate, so a difference is either a
//     typo or a half-applied edit. Rule cross-references (09.07) are deliberately NOT compared:
//     each locale points at what its own page layout needs.
// Findings run through the same errors/notes split and the same exit code.
//
// Usage:  node scripts/parity-check.mjs [--faction slug[,slug...]]   # --faction skips this pass
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, loadModule } from './lib/sync-common.mjs'

const args = process.argv.slice(2)
const only = (() => {
  const i = args.indexOf('--faction')
  return i >= 0 && args[i + 1] ? new Set(args[i + 1].split(',')) : null
})()

const facDir = path.join(ROOT, 'src', 'data', 'factions')
const ruDir = path.join(facDir, 'ru')

const S = (s) => String(s || '')
const stars = (s) => S(s).split('**').length - 1
const unders = (s) => S(s).split('__').length - 1
const MARKERS = ['▪', '◈', '→', '###', '◆', '[img:']
const markerSig = (s) => MARKERS.map((m) => S(s).split(m).length - 1).join(',')
// Ability brackets only — the all-caps English bracket abilities that must be verbatim-identical
// across languages. Exclude the token brackets whose payload legitimately differs per locale.
const brackets = (s) => {
  const out = []
  for (const m of S(s).matchAll(/\[([^\]]*)\]/g)) {
    if (/^(gloss|def|img):/.test(m[1])) continue
    out.push(m[1].trim())
  }
  return out.sort()
}
const eqArr = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])
// ALL-CAPS game keywords (INFANTRY, TRANSPORT, MONSTER/VEHICLE, TITANIC…) are never translated —
// a keyword named in EN must be named in RU too, or the RU reader is missing the clause that
// scopes the rule. Everything that only LOOKS like a keyword is stripped first: info-card labels
// (`◈ MAXIMUM DISTANCE |`), `### headings`, the `**ALL-CAPS**` lead-in a `note` opens with, and
// bold `**LABEL:**` run-ins — all of those are UI furniture and are translated on purpose.
const KEYWORD_SKIP = new Set([
  'BLUE', 'RED', 'GREEN', 'YELLOW', // diagram player/marker colours — translated in RU captions
  'BOLD', 'KEYWORD', 'KEYWORDS', // 02.05 uses them as a typographic sample ("in KEYWORD BOLD")
])
const keywords = (s) =>
  [...new Set(
    (S(s)
      .replace(/\[(?:gloss|def):[^:\]]*:([^\]]*)\]/g, '$1')
      .replace(/\[img:[^\]]*\]/g, ' ')
      .replace(/^[◈◆]\s*[^|\n]*\|/gm, ' ')
      .replace(/^[◈◆][^\n]*$/gm, ' ')
      .replace(/^###[^\n]*$/gm, ' ')
      .replace(/\*\*[A-Z][A-Z '’!-]*\*\*/g, ' ')
      .replace(/\*\*[^*\n]{0,40}:\*\*/g, ' ')
      .replace(/\*\*|__/g, '')
      .match(/\b[A-Z][A-Z'’]{2,}(?:\/[A-Z'’]{2,})*\b/g) || [])
      .map((k) => k.replace(/['’]$/, '').replace(/S$/, ''))
      .filter((k) => k.length > 2 && !KEYWORD_SKIP.has(k))
  )].sort()

// Numbers that carry rule meaning, in the shapes the rulebook writes them. Gloss/def/img token
// payloads are stripped first (an id like `gloss:24-13:` is not a measurement), and so are
// parenthesised rule cross-refs, which legitimately differ per locale.
const measures = (s) =>
  (S(s)
    .replace(/\[(?:gloss|def|img):[^\]]*\]/g, ' ')
    .replace(/\s*\((?:\d{2}\.)*\d{2}(?:\.\d{2})*\)/g, ' ')
    .replace(/[\u2010\u2011\u2012\u2013\u2014]/g, '-')
    // No trailing \b on the signed modifier: the rulebook writes "+1CP" as one word in EN and
    // "+1 CP" in RU, and that spacing is not a defect.
    .match(/\d+(?:\.\d+)?"|\d*D[36](?:\+\d+)?|\b\d+-\d+\b|\b\d\+|(?<![\w-])[+-]\d+/g) || []).sort()

// One EN/RU field pair, checked the same way wherever it comes from (a faction's rule body, a
// rulebook subsection). `checkMeasures` is off for faction data: its numbers already ride along
// inside the bracket abilities the pass compares verbatim.
function checkPair(label, en, rutext, errors, notes, { checkMeasures = false } = {}) {
  const e = S(en)
  const r = S(rutext)
  if (e.trim() && !r.trim()) return errors.push(`${label}: RU missing (EN has text)`)
  if (!e.trim() && !r.trim()) return
  if (stars(e) % 2) errors.push(`${label}: EN ** unbalanced (${stars(e)})`)
  if (stars(r) % 2) errors.push(`${label}: RU ** unbalanced (${stars(r)})`)
  if (unders(e) % 2) errors.push(`${label}: EN __ unbalanced`)
  if (unders(r) % 2) errors.push(`${label}: RU __ unbalanced`)
  if (markerSig(e) !== markerSig(r)) errors.push(`${label}: block markers EN [${markerSig(e)}] vs RU [${markerSig(r)}]`)
  const be = brackets(e)
  const br = brackets(r)
  if (!eqArr(be, br)) errors.push(`${label}: brackets EN {${be.join(' | ') || '—'}} vs RU {${br.join(' | ') || '—'}}`)
  if (checkMeasures) {
    const me = measures(e)
    const mr = measures(r)
    if (!eqArr(me, mr)) errors.push(`${label}: measurements EN {${me.join(' ') || '—'}} vs RU {${mr.join(' ') || '—'}}`)
    // One-directional on purpose: RU carrying a keyword EN does not is usually the legacy
    // «ПЕХОТЫ (INFANTRY)» parenthetical, which is allowed. EN naming one RU does not is a clause
    // that went missing in translation.
    const missing = keywords(e).filter((k) => !keywords(r).includes(k))
    if (missing.length) errors.push(`${label}: keywords named in EN but not RU: ${missing.join(', ')}`)
  }
  if (stars(e) !== stars(r)) notes.push(`${label}: ** count EN ${stars(e)} vs RU ${stars(r)}`)
  if (unders(e) !== unders(r)) notes.push(`${label}: __ count EN ${unders(e)} vs RU ${unders(r)}`)
}

const slugs = fs
  .readdirSync(facDir)
  .filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js'))
  .map((f) => f.replace('.js', ''))

let checked = 0
let totalErrors = 0

for (const slug of slugs) {
  if (only && !only.has(slug)) continue
  const ruFile = path.join(ruDir, `${slug}.js`)
  if (!fs.existsSync(ruFile)) continue // no RU overlay yet → not a bilingual faction
  const enMod = await loadModule(path.join(facDir, `${slug}.js`))
  const fac = (Object.values(enMod).find((v) => v && v.en) || {}).en
  const ru = (await loadModule(ruFile))?.default
  if (!fac || !ru) continue

  const errors = []
  const notes = []
  const pair = (label, en, rutext) => checkPair(label, en, rutext, errors, notes)

  if (fac.armyRule) pair('armyRule', fac.armyRule.body, ru.armyRule?.body)
  ;(fac.detachments || []).forEach((det, i) => {
    const rd = (ru.detachments || [])[i] || {}
    if (det.rule) pair(`${det.name} · rule`, det.rule.body, rd.rule?.body)
    const join = (o) => [o.when, o.target, o.effect, o.restrictions].filter(Boolean).join(' ')
    ;(det.stratagems || []).forEach((st, j) => {
      pair(`${det.name} · strat "${st.name}"`, join(st), join((rd.stratagems || [])[j] || {}))
    })
    ;(det.enhancements || []).forEach((en, j) => {
      pair(`${det.name} · enh "${en.name}"`, en.body, ((rd.enhancements || [])[j] || {}).body)
    })
  })

  checked++
  totalErrors += errors.length
  if (errors.length) {
    console.log(`\n✗ ${slug} — ${errors.length} error(s)${notes.length ? `, ${notes.length} note(s)` : ''}`)
    for (const s of errors) console.log(`    ✗ ${s}`)
    for (const s of notes) console.log(`    · ${s}`)
  } else if (notes.length) {
    console.log(`~ ${slug} — ${notes.length} note(s)`)
    for (const s of notes) console.log(`    · ${s}`)
  } else {
    console.log(`✓ ${slug}`)
  }
}

console.log(`\n${checked} faction(s) checked, ${totalErrors} error(s).`)

// ---- pass 2: the rulebook (skipped when a --faction filter asked for one faction) -------------
// Every bilingual rule file keeps its two languages as parallel trees in one module; walk them
// side by side. A shape mismatch (one side gained a subsection the other did not) is reported
// once and that branch is not descended into — the positional pairing below it would be
// meaningless and would bury the real finding under dozens of false ones.
const RULE_FILES = ['basicRules', 'battleRound', 'advancedRules', 'battlefields', 'muster', 'eventCompanion']
const TEXT_FIELDS = ['description', 'body', 'note', 'example', 'fullText']

if (!only) {
  const errors = []
  const notes = []
  let pairs = 0

  const walk = (enList, ruList, label) => {
    if (!Array.isArray(enList) || !Array.isArray(ruList)) return
    if (enList.length !== ruList.length) {
      errors.push(`${label}: EN has ${enList.length} item(s), RU has ${ruList.length}`)
      return
    }
    enList.forEach((e, i) => {
      const r = ruList[i]
      if (!e || !r) return
      const here = `${label}[${i}]${e.sectionNum || e.num ? ` ${e.sectionNum || e.num}` : ''}${e.title || e.name ? ` "${e.title || e.name}"` : ''}`
      for (const f of TEXT_FIELDS) {
        if (!S(e[f]) && !S(r[f])) continue
        pairs++
        checkPair(`${here} · ${f}`, e[f], r[f], errors, notes, { checkMeasures: true })
      }
      walk(e.subsections, r.subsections, here)
      walk(e.children, r.children, here)
    })
  }

  for (const f of RULE_FILES) {
    const mod = await loadModule(path.join(ROOT, 'src', 'data', `${f}.js`))
    const data = mod[Object.keys(mod)[0]]
    walk(data.en, data.ru, f)
  }
  // reference.js keeps §24 in two exports of its own shape: the framework subsections and the
  // flat ability list (whose text field is `fullText`, already in TEXT_FIELDS).
  const ref = await loadModule(path.join(ROOT, 'src', 'data', 'reference.js'))
  walk(ref.abilityIntro.en, ref.abilityIntro.ru, 'reference.abilityIntro')
  walk(ref.coreAbilities.en, ref.coreAbilities.ru, 'reference.coreAbilities')
  // glossary.js is a flat id → { term, en, ru } map: every definition is its own EN/RU pair.
  const { glossary } = await loadModule(path.join(ROOT, 'src', 'data', 'glossary.js'))
  for (const [id, g] of Object.entries(glossary)) {
    if (!S(g.en) && !S(g.ru)) continue
    pairs++
    checkPair(`glossary "${id}"`, g.en, g.ru, errors, notes, { checkMeasures: true })
  }

  totalErrors += errors.length
  console.log(`\ncore rules EN↔RU — ${pairs} field pair(s) checked, ${errors.length} error(s)${notes.length ? `, ${notes.length} note(s)` : ''}`)
  for (const e of errors) console.log(`    ✗ ${e}`)
  // Notes are the `**`-count class, which is legitimately uneven across languages (the renderer
  // bolds ALL-CAPS keywords itself, so whether the data wraps them varies) — 78 of them at the
  // time of writing. Printing all of them every run is how a gate stops being read; ask for them.
  if (notes.length && args.includes('--notes')) for (const n of notes) console.log(`    · ${n}`)
  else if (notes.length) console.log(`    · ${notes.length} ** / __ count note(s) — run with --notes to list`)
  if (!errors.length && !notes.length) console.log('    ✓ no differences')
}

process.exit(totalErrors ? 1 : 0)
