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
// Usage:  node scripts/parity-check.mjs [--faction slug[,slug...]]
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
  const pair = (label, en, rutext) => {
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
    if (stars(e) !== stars(r)) notes.push(`${label}: ** count EN ${stars(e)} vs RU ${stars(r)}`)
    if (unders(e) !== unders(r)) notes.push(`${label}: __ count EN ${unders(e)} vs RU ${unders(r)}`)
  }

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
process.exit(totalErrors ? 1 : 0)
