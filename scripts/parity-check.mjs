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
//     [def:…]/[img:…] are excluded (their labels legitimately differ per locale). [core:…] is
//     DELIBERATELY not excluded: its payload is a core ability's name, which stays English on
//     both sides by the same convention the brackets do, so it belongs under the strict check.
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
// `starsBalance` exists for one field family: a datasheet's `options`/`composition` lines use a
// trailing `**` as a FOOTNOTE MARKER ("…can be equipped with 1 master vox.**"), not as bold — so
// an odd count there is the convention, not a defect. Everywhere else an unbalanced `**` is one.
function checkPair(label, en, rutext, errors, notes, { checkMeasures = false, starsBalance = true } = {}) {
  const e = S(en)
  const r = S(rutext)
  if (e.trim() && !r.trim()) return errors.push(`${label}: RU missing (EN has text)`)
  if (!e.trim() && !r.trim()) return
  if (starsBalance && stars(e) % 2) errors.push(`${label}: EN ** unbalanced (${stars(e)})`)
  if (starsBalance && stars(r) % 2) errors.push(`${label}: RU ** unbalanced (${stars(r)})`)
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
const RULE_FILES = ['basicRules', 'battleRound', 'advancedRules', 'battlefields', 'muster', 'eventCompanion', 'intro']
const TEXT_FIELDS = ['description', 'body', 'note', 'example', 'fullText', 'intro', 'q', 'a', 'errata', 'keyNote', 'tableNote', 'authorNote', 'lore', 'missions', 'app']

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
      // Event Companion chapters keep their prose in `blocks` (plus the two extra arrays the
      // Sequence chapter splits out), not in `subsections`.
      walk(e.blocks, r.blocks, here)
    })
  }

  // The core-rules files are arrays of numbered sections; the Event Companion is a MAP of
  // chapters instead (`{ sequence, terrain, pairings, teams, doubles, twists, faq }`), each
  // with its own prose fields and `blocks`. It had been in RULE_FILES since the rulebook pass
  // was written, and `walk`'s `Array.isArray` guard silently dropped the whole file on the
  // floor — a gate listed as covering it and covering none of it. This descends the map to the
  // arrays `walk` understands. RU inherits a field wholesale by leaving it undefined (ids,
  // images, mission-deck card names), so a key missing on the RU side is skipped, not an error.
  const walkTree = (en, ru, label) => {
    if (Array.isArray(en)) return walk(en, ru, label)
    if (!en || typeof en !== 'object' || !ru || typeof ru !== 'object') return
    for (const [key, ev] of Object.entries(en)) {
      const rv = ru[key]
      if (rv === undefined || rv === null) continue
      if (typeof ev === 'string') {
        if (!TEXT_FIELDS.includes(key) || (!S(ev) && !S(rv))) continue
        pairs++
        checkPair(`${label}.${key}`, ev, rv, errors, notes, { checkMeasures: true })
      } else if (Array.isArray(ev)) {
        walk(ev, rv, `${label}.${key}`)
      } else if (ev && typeof ev === 'object') {
        walkTree(ev, rv, `${label}.${key}`)
      }
    }
  }

  for (const f of RULE_FILES) {
    const mod = await loadModule(path.join(ROOT, 'src', 'data', `${f}.js`))
    const data = mod[Object.keys(mod)[0]]
    walkTree(data.en, data.ru, f)
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

// ---- pass 3: the datasheets, EN↔RU (skipped by --faction, like the rulebook pass) -------------
// The single biggest RU surface in the repo — ~2300 ability texts across 30 factions — and until
// 2026-09-15 nothing checked it: the faction pass above reads `factions/<slug>.js` only, and the
// datasheet overlays live in their own tree. A coverage audit ran this by hand and found nine real
// findings on the first pass, including four RU ability texts keyed to a name no datasheet carries
// any more — a translation that silently never reaches the reader.
//
// The overlay is sparse and keyed by DATASHEET ID, and its ability maps are keyed by the ENGLISH
// ability name (see localizeSheet in src/data/datasheets/ru/index.js). That is what makes a stale
// key invisible at runtime: nothing matches, so nothing is translated, and the card renders the
// English text with no error anywhere. Hence the two questions here — does every overlay key still
// name something that exists, and does the text it carries have the same shape as its EN twin.
if (!only) {
  const errors = []
  const notes = []
  let pairs = 0
  let units = 0
  const dsDir = path.join(ROOT, 'src', 'data', 'datasheets')
  const dsRuDir = path.join(dsDir, 'ru')
  // Mirrors localizeSheet's own key handling. The two-spelling entries are not sloppiness we are
  // tolerating: the earlier overlays were authored as `wargear`/`special` and the later ones as
  // `wargearAbilities`/`specialAbilities`, and the merge accepts both — so must this, or half the
  // texts would read as unchecked.
  const ABILITY_LISTS = [
    ['abilities', ['abilities']],
    ['wargearAbilities', ['wargearAbilities', 'wargear']],
    ['specialAbilities', ['specialAbilities', 'special']],
    ['rules', ['rules']],
  ]
  const STRING_FIELDS = ['flavor', 'loadout', 'transport']

  // Tripwire: if localizeSheet stops spelling the aliases this pass assumes, the pass is checking
  // the wrong fields and would go quiet rather than wrong-loud. Cheap to assert, so assert.
  const ruIndexSrc = fs.readFileSync(path.join(dsRuDir, 'index.js'), 'utf8')
  for (const expected of ['o.wargearAbilities || o.wargear', 'o.specialAbilities || o.special']) {
    if (!ruIndexSrc.includes(expected)) {
      notes.push(`localizeSheet no longer contains "${expected}" — re-read it, this pass mirrors its key handling`)
    }
  }

  const dsFiles = fs
    .readdirSync(dsDir)
    .filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js'))
  const enMods = {}
  for (const f of dsFiles) enMods[f.replace('.js', '')] = await loadModule(path.join(dsDir, f))
  const listOf = (mod) => Object.values(mod || {}).find((v) => Array.isArray(v) && v[0] && v[0].id) || []
  // Every name an overlay may legitimately key on: the four ability lists, each set's own name,
  // and the options inside it.
  const abilityNamesOf = (u) => [
    ...(u.abilities || []),
    ...(u.wargearAbilities || []),
    ...(u.specialAbilities || []),
    ...(u.rules || []),
    ...(u.abilitySets || []).flatMap((set) => set.options || []),
  ].map((a) => a.name).concat((u.abilitySets || []).map((set) => set.name))
  const smList = listOf(enMods['space-marines'])

  for (const slug of Object.keys(enMods)) {
    const ruFile = path.join(dsRuDir, `${slug}.js`)
    if (!fs.existsSync(ruFile)) continue
    const overlay = (await loadModule(ruFile))?.default || {}
    // The 5 SM-Chapter codices don't duplicate a datasheet identical to the shared pool; their RU
    // overlay legitimately carries entries for those folded-in ids (see ../index.js sharedIdsFor).
    const en = [...listOf(enMods[slug])]
    for (const id of enMods[slug]?.sharedUnitIds || []) {
      const u = smList.find((x) => x.id === id)
      if (u) en.push(u)
    }
    const byId = new Map(en.map((u) => [u.id, u]))

    for (const [id, o] of Object.entries(overlay)) {
      const u = byId.get(id)
      if (!u) {
        errors.push(`datasheets/ru/${slug}.js: overlay for "${id}" — no datasheet has that id`)
        continue
      }
      units++
      const here = `${slug}/${id}`
      for (const f of STRING_FIELDS) {
        if (typeof o[f] !== 'string') continue
        pairs++
        checkPair(`${here}.${f}`, u[f], o[f], errors, notes)
      }
      // composition/options are full-replacement arrays authored in EN order, so a length that
      // drifted means a line of the EN list has no RU twin (or gained one that isn't there).
      for (const f of ['composition', 'options']) {
        if (!Array.isArray(o[f]) || !Array.isArray(u[f])) continue
        if (o[f].length !== u[f].length) {
          errors.push(`${here}.${f}: EN has ${u[f].length} line(s), RU ${o[f].length}`)
          continue
        }
        o[f].forEach((line, i) => {
          pairs++
          checkPair(`${here}.${f}[${i}]`, u[f][i], line, errors, notes, { starsBalance: false })
        })
      }
      for (const f of ['damaged', 'leader']) {
        if (!o[f] || typeof o[f] !== 'object') continue
        for (const [k, v] of Object.entries(o[f])) {
          if (typeof v !== 'string') continue
          pairs++
          checkPair(`${here}.${f}.${k}`, u[f]?.[k], v, errors, notes)
        }
      }
      // A set's options are localized from the same `special`/`specialAbilities` map (localizeSheet
      // keeps that fallback so overlays written before the grouping still apply), so they count as
      // valid keys for it — reporting them as stale is how this pass first lied to me.
      const setOptions = (u.abilitySets || []).flatMap((set) => set.options || [])
      // The 5 SM-Chapter RU overlays are built by SPREADING the space-marines entry for the same id
      // and overriding a field or two (`...smRu.repulsor`). Where the Chapter has its own datasheet
      // for that id, the inherited keys name the generic sheet's abilities and simply don't apply —
      // inapplicable, not stale. Judge those against the generic sheet too, or the pass invents a
      // finding for every Chapter-unique variant of a shared unit.
      const smTwin = smList.find((x) => x.id === id)
      // `abilitySets` — the "pick one" groups on Primarch-grade sheets. Overlay shape is its own:
      // { [setName]: { name?, options: { [enName]: ruText | {name,text} } } }. Small (4 sheets, 10
      // texts) but the only overlay whose keys are nested two deep, so a rename rots twice as quietly.
      for (const [setName, set] of Object.entries(o.abilitySets || {})) {
        const enSet = (u.abilitySets || []).find((x) => x.name === setName)
        if (!enSet) {
          errors.push(`${here}.abilitySets: RU text keyed "${setName}" — the datasheet has no ability set of that name`)
          continue
        }
        for (const [optName, val] of Object.entries(set.options || {})) {
          const opt = (enSet.options || []).find((x) => x.name === optName)
          if (!opt) {
            errors.push(`${here}.abilitySets["${setName}"]: RU text keyed "${optName}" — that set has no such option`)
            continue
          }
          const text = typeof val === 'string' ? val : val?.text
          if (typeof text !== 'string') continue
          pairs++
          checkPair(`${here}.abilitySets["${setName}"] "${optName}"`, opt.text, text, errors, notes)
        }
      }
      for (const [enKey, ruKeys] of ABILITY_LISTS) {
        // localizeSheet resolves the two spellings with `o.wargearAbilities || o.wargear`, so an
        // entry carrying BOTH silently drops the short-form map on the floor. None do today; the
        // day one does, the texts under it would read as translated and never render.
        if (ruKeys.length > 1 && ruKeys.every((k) => o[k])) {
          errors.push(`${here}: overlay has both \`${ruKeys[0]}\` and \`${ruKeys[1]}\` — localizeSheet reads only the first, so the second never renders`)
        }
        for (const rk of ruKeys) {
          const map = o[rk]
          if (!map || typeof map !== 'object' || Array.isArray(map)) continue
          const pool = [
            ...(u[enKey] || []),
            ...(enKey === 'specialAbilities' ? setOptions : []),
            ...(smTwin && smTwin !== u ? smTwin[enKey] || [] : []),
          ]
          for (const [name, val] of Object.entries(map)) {
            const a = pool.find((x) => x.name === name)
            if (!a) {
              errors.push(`${here}.${rk}: RU text keyed "${name}" — no ${enKey} of that name on the datasheet, so it never reaches the reader`)
              continue
            }
            const text = typeof val === 'string' ? val : val?.text
            if (typeof text !== 'string') continue
            pairs++
            checkPair(`${here}.${rk} "${name}"`, a.text, text, errors, notes)
          }
        }
      }
    }

    // `abilityNamesRu` translates the ability NAME in the card header, keyed by the English name
    // for the whole faction at once (2493 entries across the repo). Nothing pointed at a name that
    // no longer exists would fail — the header would just stay English — so check the keys resolve.
    // The 5 SM-Chapter maps are built as `{ ...smNames, ...own }`, so a generic name they inherit
    // but do not field is inapplicable, not stale: judge those against the whole space-marines pool.
    const ruMod = await loadModule(ruFile)
    const isChapter = (enMods[slug]?.sharedUnitIds || []).length > 0
    const pool = new Set(en.flatMap(abilityNamesOf))
    if (isChapter) for (const n of smList.flatMap(abilityNamesOf)) pool.add(n)
    for (const key of Object.keys(ruMod?.abilityNamesRu || {})) {
      if (!pool.has(key)) {
        errors.push(`datasheets/ru/${slug}.js abilityNamesRu: "${key}" names no ability on any ${slug} datasheet — the header it was written for is gone`)
      }
    }
  }

  totalErrors += errors.length
  console.log(`\ndatasheets EN↔RU — ${units} localized sheet(s), ${pairs} field pair(s), ${errors.length} error(s)${notes.length ? `, ${notes.length} note(s)` : ''}`)
  for (const e of errors) console.log(`    ✗ ${e}`)
  if (notes.length && args.includes('--notes')) for (const n of notes) console.log(`    · ${n}`)
  else if (notes.length) console.log(`    · ${notes.length} note(s) — run with --notes to list`)
  if (!errors.length && !notes.length) console.log('    ✓ no differences')
}

// ---- pass 4: the overlays nothing else reads — missions, Combat Patrol, faction FAQ ----------
// Three more sparse RU overlays that no script touched before the same audit. Mission cards are
// rules (they are how VP is scored), Combat Patrol is a whole second rulebook for its 24 boxes,
// and the per-faction FAQ overlay is index-aligned by hand after every `npm run faq`.
if (!only) {
  const errors = []
  const notes = []
  let pairs = 0

  // missions.js ↔ missionsRu.js — primary keyed by slug, secondary by `slug|role`.
  const { missions } = await loadModule(path.join(ROOT, 'src', 'data', 'missions.js'))
  const { missionsRu } = await loadModule(path.join(ROOT, 'src', 'data', 'missionsRu.js'))
  const missionPair = (label, en, ru) => {
    if (!ru) return errors.push(`${label}: no RU entry`)
    const enBlocks = en.blocks || []
    const ruBlocks = ru.blocks || []
    if (enBlocks.length !== ruBlocks.length) {
      return errors.push(`${label}: ${enBlocks.length} EN block(s) vs ${ruBlocks.length} RU`)
    }
    enBlocks.forEach((b, i) => {
      const rb = ruBlocks[i]
      pairs++
      checkPair(`${label} block ${i} · when`, b.when, rb.when, errors, notes)
      const enRows = b.rows || []
      const ruRows = rb.rows || []
      if (enRows.length !== ruRows.length) {
        return errors.push(`${label} block ${i}: ${enRows.length} EN row(s) vs ${ruRows.length} RU`)
      }
      enRows.forEach((row, j) => {
        pairs++
        checkPair(`${label} block ${i} row ${j}`, typeof row === 'string' ? row : row.text, typeof ruRows[j] === 'string' ? ruRows[j] : ruRows[j]?.text, errors, notes)
      })
    })
  }
  for (const m of missions.en.primary) missionPair(`mission ${m.slug}`, m, missionsRu.primary?.[m.slug])
  for (const m of missions.en.secondary) missionPair(`mission ${m.slug}|${m.role}`, m, missionsRu.secondary?.[`${m.slug}|${m.role}`])

  // combatPatrol.js — compare the MERGED ru tree against en, which is what the reader gets
  // (deepOverlay matches array entries by name/id, so comparing the raw overlay by index lies).
  const { combatPatrol } = await loadModule(path.join(ROOT, 'src', 'data', 'combatPatrol.js'))
  const cpEn = combatPatrol.en.factions || []
  const cpRu = combatPatrol.ru.factions || []
  cpEn.forEach((f, i) => {
    const r = cpRu[i]
    if (!r) return errors.push(`combat patrol ${f.name}: no RU side`)
    for (const key of ['rule', 'armyRule']) {
      if (!f[key]?.body) continue
      pairs++
      checkPair(`combat patrol ${f.name} · ${key}`, f[key].body, r[key]?.body, errors, notes)
    }
    ;(f.stratagems || []).forEach((st, j) => {
      const rs = (r.stratagems || [])[j]
      pairs++
      checkPair(`combat patrol ${f.name} · stratagem "${st.name}"`, st.effect, rs?.effect, errors, notes)
    })
    ;(f.enhancements || []).forEach((eh, j) => {
      const re = (r.enhancements || [])[j]
      pairs++
      checkPair(`combat patrol ${f.name} · enhancement "${eh.name}"`, eh.body ?? eh.text, re?.body ?? re?.text, errors, notes)
    })
  })

  // factionFaq.json ↔ factionFaqRu.json — the RU side is an index-aligned overlay, re-aligned by
  // hand after every `npm run faq`; a shifted index silently answers the wrong question.
  const faqEn = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'factionFaq.json'), 'utf8'))
  const faqRu = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'factionFaqRu.json'), 'utf8'))
  for (const [slug, entry] of Object.entries(faqEn)) {
    const enItems = Array.isArray(entry) ? entry : entry.items || []
    const ruEntry = faqRu[slug]
    const ruItems = Array.isArray(ruEntry) ? ruEntry : ruEntry?.items || []
    if (!ruEntry) {
      if (enItems.length) notes.push(`faction FAQ ${slug}: ${enItems.length} EN item(s), no RU overlay`)
      continue
    }
    if (enItems.length !== ruItems.length) {
      errors.push(`faction FAQ ${slug}: ${enItems.length} EN item(s) vs ${ruItems.length} RU — the overlay is index-aligned`)
      continue
    }
    enItems.forEach((it, i) => {
      pairs++
      checkPair(`faction FAQ ${slug}[${i}] · a`, it.a ?? it.answer, ruItems[i]?.a ?? ruItems[i]?.answer, errors, notes)
    })
  }

  // factionLegends.json ↔ factionLegendsRu.json — one prose field per faction (the intro); the
  // proxies are unit names and have no RU side.
  const legEn = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'factionLegends.json'), 'utf8'))
  const legRu = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'factionLegendsRu.json'), 'utf8'))
  for (const [slug, entry] of Object.entries(legEn)) {
    if (!entry.intro) continue
    if (!legRu[slug]?.intro) { notes.push(`faction Legends ${slug}: EN intro, no RU overlay`); continue }
    pairs++
    checkPair(`faction Legends ${slug} · intro`, entry.intro, legRu[slug].intro, errors, notes)
  }

  totalErrors += errors.length
  console.log(`\nmissions / combat patrol / faction FAQ / Legends EN↔RU — ${pairs} field pair(s), ${errors.length} error(s)${notes.length ? `, ${notes.length} note(s)` : ''}`)
  for (const e of errors) console.log(`    ✗ ${e}`)
  if (notes.length && args.includes('--notes')) for (const n of notes) console.log(`    · ${n}`)
  else if (notes.length) console.log(`    · ${notes.length} note(s) — run with --notes to list`)
  if (!errors.length && !notes.length) console.log('    ✓ no differences')
}

process.exit(totalErrors ? 1 : 0)
