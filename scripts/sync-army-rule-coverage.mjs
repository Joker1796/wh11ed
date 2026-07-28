// Report-only audit: does wh11ed's per-faction data represent EVERY one of that faction's
// distinctly-named appdata army rules — not just the one wh11ed's single `armyRule` field is
// named after?
//
// Why this shape, not the originally planned `army_rule_faction_keyword`/`army_rule_excluded_from_
// command_bunker_faction_keyword` tables: reading the raw rows by hand (per this file's own
// standing advice — "spend the first 30 minutes just reading the raw rows before writing the
// comparison logic") showed those two tables are Command-Bunker-app UI bookkeeping — which of MY
// OWN factions can select this exact army-rule ROW (several Space Marine Chapters legitimately
// share one "Oath of Moment" row) and whether that row shows up as a separate selectable option in
// a digital army-builder — not a roster restriction or excluded-content list. They don't encode
// prose at all (`army_rule` itself has no `rules`/body field — see `wh40k-appdata/SCHEMA.md`).
//
// The actual prose lives in the per-faction bundle's `armyRules[]` (`factions/<slug>.json`), and
// several factions carry TWO OR MORE distinctly-named army rules there (e.g. adeptus-astartes:
// "Oath of Moment" + "Space Marine Chapters"; dark-angels: "Oath of Moment" + "The Deathwing" +
// "The Ravenwing" + "The Unforgiven"). wh11ed intentionally merges these into ONE combined
// `armyRule.body` per faction (with "### " subheadings — see e.g. dark-angels.js's own header
// comment acknowledging the merge) — but `sync-faction-text.mjs`'s army-rule comparison only
// gathers candidates whose NAME fuzzy-matches wh11ed's single `armyRule.name`, so a second,
// differently-named army rule can be silently absent from wh11ed with nothing ever flagging it.
// That's exactly what this script checks instead: for every distinctly-named army rule (excluding
// pure cross-reference stubs like "This ability is described in full on the Army Rules page of
// Codex: Space Marines" — those carry no content of their own to check), does its DISTINCTIVE
// vocabulary show up somewhere in the faction's whole text (armyRule + every detachment rule,
// since some factions place a chapter-mono restriction on each detachment rather than the top-level
// armyRule — see Deathwatch/Space Wolves below)?
//
// Investigated by hand first (2026-07-28): 40 rule-pairs across 19 factions with 2+ distinct army
// rules. Found and fixed 2 real, previously-unknown gaps:
//   - space-wolves.js was completely missing "Curse of the Wulfen" (a real passive ability — +1/+3
//     Objective Control near a Space Wolves Character/Wolf Priest) — not a phrasing nit, the whole
//     ability was absent. Fixed by merging it into the combined armyRule (mirroring the "###"
//     subheading convention already used by dark-angels.js/deathwatch.js).
//   - blood-angels.js was completely missing "The Sons of Sanguinius" (the mono-Chapter
//     restriction + Designer's Note) — every other Chapter book (Dark Angels' "The Unforgiven",
//     Space Wolves' "Sons of Russ" partially, Deathwatch's own detachment text) has SOME form of
//     this, Blood Angels had none at all. Fixed the same way.
// The remaining low-overlap cases below were individually verified as NOT wh11ed gaps (see
// KNOWN_EQUIVALENT) — a crude word-overlap check can't tell "genuinely absent" from "present but
// re-worded/reorganized," so each one was read by hand rather than trusted at face value.
//
// Approach: word-overlap against generic 40k rules vocabulary is a blunt instrument — it can MISS
// short, common-vocabulary content that's genuinely absent (Curse of the Wulfen scored 78% overlap
// despite being nowhere in wh11ed, because "unit"/"objective"/"infantry"/"vehicle"/"character" all
// appear elsewhere in the file for unrelated reasons) and can FALSE-FLAG long, distinctive content
// that's present but reworded (Death Guard's per-Plague flavour italics). So the threshold below is
// deliberately loose (flag anything under 85%) and this is a REPORT for a human to read, not an
// auto-pass/fail signal — every flag either resolves through KNOWN_EQUIVALENT or needs a fresh
// by-hand read, the same way the 2 real gaps above were found.
//
// Usage: node scripts/sync-army-rule-coverage.mjs   (also run as part of `npm run sync`).

import fs from 'node:fs'
import path from 'node:path'
import { ROOT, APPDATA, SLUG_MAP, norm, loadModule } from './lib/sync-common.mjs'

function bodyText(body) {
  return (body || [])
    .filter((b) => b.type !== 'loreAccordion' && b.type !== 'quote' && b.type !== 'image')
    .map((b) => b.text || '')
    .join(' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const appdataSlugToWh11edSlug = new Map(Object.entries(SLUG_MAP).map(([wh, app]) => [app, wh]))

async function loadFactionWideBody(slug) {
  const mod = await loadModule(path.join(ROOT, 'src/data/factions', `${slug}.js`))
  const en = Object.values(mod || {})[0]?.en
  if (!en) return null
  const parts = [en.armyRule?.body || '', en.armyRule?.name || '', en.armyRule?.flavor || '']
  for (const d of en.detachments || []) parts.push(d.rule?.body || '', d.rule?.name || '', d.rule?.flavor || '')
  return parts.join(' \n ')
}

// A hand-curated stopword list of generic 40k rules vocabulary (phase names, dice-roll jargon,
// structural connectives) — words too common to distinguish "this specific rule's content is
// present" from "the file just talks about attacks/phases/keywords elsewhere, as every rules file
// does." Not a computed corpus frequency (unlike sync-ally-inclusion.mjs's keyword-frequency
// filter) because this is free-text prose, not a closed keyword vocabulary — a hand-built list is
// the honest equivalent here.
const STOPWORDS = new Set([
  'model', 'models', 'unit', 'units', 'only', 'the', 'a', 'an', 'and', 'or', 'with', 'this', 'that', 'army', 'your', 'from', 'characteristic', 'friendly',
  'phase', 'roll', 'rolls', 'wound', 'wounds', 'save', 'saves', 'attack', 'attacks', 'attacking', 'weapon', 'weapons', 'hit', 'damage', 'strength', 'toughness',
  'command', 'battle', 'turn', 'keyword', 'keywords', 'faction', 'detachment', 'detachments', 'stratagem', 'stratagems', 'enhancement', 'enhancements', 'ability', 'abilities',
  'effect', 'target', 'targets', 'targeted', 'select', 'selected', 'selecting', 'add', 'subtract', 'until', 'each', 'when', 'while', 'before', 'after', 'more', 'than', 'other',
  'following', 'listed', 'below', 'once', 'again', 'instead', 'their', 'they', 'have', 'has', 'been', 'being', 'into', 'onto', 'within', 'without', 'because', 'these', 'those',
  'which', 'where', 'there', 'shall', 'cannot', 'include', 'including', 'includes', 'excluding', 'excludes', 'ranged', 'melee', 'vehicle', 'vehicles', 'infantry', 'shooting',
  'movement', 'fight', 'fighting', 'deployment', 'reserves', 'strategic', 'engagement', 'range', 'result', 'results', 'value', 'number', 'times', 'remains', 'remain',
  'active', 'current', 'start', 'starts', 'began', 'begins', 'begin', 'end', 'ends', 'ended', 'made', 'make', 'makes', 'making', 'described', 'full',
])
function significantWords(text) {
  return [...new Set(norm(text).replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length >= 4 && !STOPWORDS.has(w)))]
}
function wordPresent(word, haystackNorm) {
  return new RegExp(`\\b${word}\\b`, 'i').test(haystackNorm)
}

// Rules already read by hand and confirmed NOT a wh11ed gap, despite low word-overlap — see the
// investigation write-up above and in APPDATA-COVERAGE-PLAN.md for what each one actually is.
const KNOWN_EQUIVALENT = new Map([
  ['death-guard|Nurgle’s Gift (Aura)', 'present verbatim (Contagion Range/Afflicted mechanic, all 3 Plagues) — the low overlap is from each Plague\'s flowery italic flavour description being reworded/shortened in wh11ed, not from missing mechanical content'],
  ['space-wolves|Sagas', 'a cross-reference framing sentence only ("each Detachment rule includes a Saga you can complete") — every Space Wolves detachment already implements its own named Saga mechanic (Saga of the Beastslayer/Bold/Hunter/…), just under each detachment\'s own heading rather than repeating this framing sentence'],
  ['space-wolves|Sons of Russ', 'the hard restriction ("can include SPACE WOLVES units, but cannot include ADEPTUS ASTARTES units from any other Chapter") is already present as "Restrictions:" boilerplate on every Space Wolves detachment — only the generic "second Faction keyword" explainer sentence and the Designer\'s Note (soft, non-mechanical guidance about successor Chapters/Epic Heroes) are omitted, a deliberate scope call, not an oversight'],
  ['world-eaters|Pact of Blood', 'a muster-time note that Blood Legions isn\'t independently selectable as an Army Faction — wh11ed has no standalone Blood Legions faction page for the same reason (it\'s ally-only content into World Eaters, already covered by sync-ally-inclusion.mjs\'s script #2), so there\'s no wh11ed page this note could even attach to'],
])

// Confirmed real, out-of-scope-for-THIS-script finding, kept visible rather than silently
// allowlisted: Tau Empire's "Drones" army rule includes "Shield Drone: Add 1 to the bearer's Wounds
// characteristic" — a real wargear-level mechanic (the "Shield Drone" wargear_item exists in
// appdata) that doesn't appear anywhere in tau-empire.js's datasheets. That's a datasheet/wargear-
// options question (sync-wargear-options.mjs's domain, not army-rule prose), so it's reported here
// as a plain flag rather than fixed in this pass — needs its own follow-up investigation to find
// which Tau units should carry it.

async function main() {
  const dir = path.join(APPDATA, 'factions')
  const flagged = []
  const resolved = []
  let checked = 0

  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json')) continue
    const bundle = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))
    const byName = new Map()
    for (const r of bundle.armyRules || []) if (!byName.has(r.name)) byName.set(r.name, r)
    if (byName.size < 2) continue // a single army rule — nothing for this script to cross-check

    const appSlug = f.replace('.json', '')
    const slug = appdataSlugToWh11edSlug.get(appSlug) || appSlug
    const whBody = await loadFactionWideBody(slug)
    if (whBody == null) continue // no wh11ed data file for this faction at all
    const whNorm = norm(whBody)

    for (const [name, r] of byName) {
      const text = bodyText(r.body)
      if (text.length < 40 || /described in full (on|in)/i.test(text)) continue // a pure cross-reference stub, no content of its own
      const words = significantWords(text)
      if (!words.length) continue
      checked++
      const present = words.filter((w) => wordPresent(w, whNorm))
      const ratio = present.length / words.length
      if (ratio >= 0.85) continue

      const known = KNOWN_EQUIVALENT.get(`${appSlug}|${name}`)
      if (known) {
        resolved.push({ appSlug, name, note: known })
        continue
      }
      const missing = words.filter((w) => !present.includes(w))
      flagged.push({ appSlug, slug, name, ratio, missing, text })
    }
  }

  console.log(`army rule coverage: ${checked} distinctly-named army rules checked, ${flagged.length} FLAGGED, ${resolved.length} resolved via known equivalents.`)
  if (resolved.length) {
    console.log('\n  ✓ Resolved — low word-overlap but verified NOT a wh11ed gap (see script header):')
    for (const r of resolved) console.log(`    ${r.appSlug} · "${r.name}": ${r.note}`)
  }
  if (flagged.length) {
    console.log('\n  ✗ appdata has a distinctly-named army rule whose content wh11ed appears to be missing:')
    for (const r of flagged) {
      console.log(`\n    ${r.appSlug} (wh11ed: ${r.slug}.js) · "${r.name}" — ${(r.ratio * 100).toFixed(0)}% word overlap`)
      console.log(`      missing term(s): ${r.missing.join(', ')}`)
      console.log(`      appdata text: ${r.text.slice(0, 300)}${r.text.length > 300 ? '…' : ''}`)
    }
  }
  process.exitCode = flagged.length ? 1 : 0
}

await main()
