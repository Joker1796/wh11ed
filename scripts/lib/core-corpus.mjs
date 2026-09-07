// The Core Rules corpus, loaded once and shared by every script that compares wh11ed's
// hand-transcribed rulebook prose (sections 01-25) against wh40k-appdata's
// factions/_core-rules.json:
//
//   - sync-core.mjs            — the full report-only word diff (every difference, both directions)
//   - check-rule-omissions.mjs — the narrow gate: ONLY appdata content missing on our side
//
// Both need the same three things — appdata's HTML → wh11ed markup, wh11ed's enrichment layer
// (gloss tokens, cross-refs, bold) stripped to bare words, and the two sides flattened to a
// rule-number keyed map — so the recipe lives here rather than in either caller. A tweak to the
// normalization must move both the report and the gate at once, or the gate starts passing things
// the report still prints (and vice versa).
import path from 'node:path'
import { ROOT, APPDATA, loadJson, loadModule } from './sync-common.mjs'
import { splitBodyEntries } from '../../src/composables/columnChunks.js'

// Section-array files (each `{ en: Section[] }` with subsections/children carrying sectionNum):
// basicRules 01-06, battleRound 07-12, battlefields 13-16, advancedRules 17-23, muster 25.
// Section 24 (Core Abilities) is reference.js's flat `coreAbilities` list, wired separately below.
export const FILES = ['basicRules', 'battleRound', 'advancedRules', 'battlefields', 'muster']

// appdata's <table>/<b>/<u>/<i> HTML → flat comparable text (tables flattened to cell text, tags
// converted to wh11ed's own conventions where one exists). Same recipe as sync-event-
// companion.mjs's componentText.
export function appdataMarkup(text) {
  if (!text) return ''
  return text
    .replace(/<table[^>]*>/gi, '\n')
    .replace(/<\/table>/gi, '\n')
    .replace(/<tr[^>]*>/gi, '\n')
    .replace(/<\/tr>/gi, '')
    .replace(/<\/?t[hd][^>]*>/gi, ' ')
    .replace(/<\/?ul[^>]*>/gi, '\n')
    .replace(/<li[^>]*>/gi, '\n▪ ')
    .replace(/<\/li>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<u>(.*?)<\/u>/gis, '__$1__')
    .replace(/<b>(.*?)<\/b>/gis, '**$1**')
    .replace(/<k>(.*?)<\/k>/gis, (_, inner) => inner.toUpperCase())
    .replace(/<i>(.*?)<\/i>/gis, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&#x?[0-9a-f]+;/gi, ' ') // stray numeric HTML entities (e.g. &#x20;) in appdata text
}

// Strip wh11ed's enrichment layer (and appdata's residual markup, once run through appdataMarkup
// above) down to bare comparable words. Applied to BOTH sides.
export function plainText(s) {
  if (!s) return ''
  let t = s
  t = t.replace(/\[img:[^\]]*\]/g, ' ')
  t = t.replace(/\[(?:gloss|def):[^:\]]*:([^\]]*)\]/g, '$1') // [gloss:id:label] / [def:id:label] → label
  t = t.replace(/\{[a-z]+:([^}]*)\}/gi, '$1') // {red:TEXT} → TEXT
  // "Example:" label — sometimes a CSS-generated lead-in on wh11ed's side (.example-block::before,
  // not stored data) with no equivalent stored text, sometimes literal inline text on both sides
  // (e.g. 01.05.01's two inline "**Example:**" paragraphs) — strip on BOTH sides symmetrically so
  // the label token itself is never what a diff hinges on, only the content under it.
  // Same deal for "Designer's Note:" — reference.js's coreAbilities `note` field is rendered via
  // ReferenceView.vue with a CSS-generated "Designer's Note" label (`.note-box::before` there),
  // so appdata's own inline label is redundant, not missing content.
  t = t.replace(/\*\*Example:?\*\*:?\s*/gi, '').replace(/(^|\n)\s*Example:\s*/gi, '$1')
  t = t.replace(/\*\*Designer.s Note:?\*\*:?\s*/gi, '').replace(/(^|\n)\s*Designer.s Note:\s*/gi, '$1')
  t = t.replace(/\*\*/g, '').replace(/__/g, '')
  t = t.replace(/\s*\((?:\d+\.)*\d+(?:\.\d+)*\)/g, '') // (NN) / (NN.NN) cross-refs
  // The wordier cross-ref shapes: "(Core Rules, 03.02)" as appdata writes it in supplement text,
  // and multi-target refs "(24.22 & 24.34)". A pointer to another rule is navigation, not content —
  // wh11ed links or drops it as the page layout needs, and either way nothing is missing.
  t = t.replace(/\s*\((?:see\s+)?(?:core rules,?\s*)?(?:\d+\.)*\d+(?:\.\d+)*(?:\s*(?:&|and|,)\s*(?:\d+\.)*\d+(?:\.\d+)*)*\)/gi, '')
  t = t.replace(/[[\]]/g, '') // [KEYWORD] / [ABILITY] bracket markers — both sides have them
  t = t.replace(/[▪•◦▫→◆◈#]/g, ' ')
  t = t.replace(/[’‘`]/g, "'").replace(/[“”«»]/g, '"').replace(/[‐‑–—]/g, '-')
  t = t.replace(/'/g, '')
  t = t.toLowerCase().replace(/[^a-z0-9"/+%-]+/g, ' ').replace(/\s+/g, ' ').trim()
  return t
}

// wh11ed table → flat text (title + headers + rows + footnote), same recipe as sync-event-
// companion.mjs's tableText, so a table edit is caught by the same word diff as prose.
export const tableText = (t) =>
  t ? [t.title, (t.headers || []).join(' '), ...(t.rows || []).map((r) => r.join(' ')), t.footnote].filter(Boolean).join('\n') : ''

// Flatten a wh11ed section-array file's EN tree into num → { title, body, file }.
function flattenWh11ed(sections, file, out) {
  const walk = (node) => {
    const num = node.sectionNum || node.num
    // Section-level nodes keep their intro prose in `description`; subsections use `body`. `note`
    // (Designer's Note / aside), `example` and `table` are genuinely separate wh11ed fields, but
    // appdata inlines all of that into the SAME container text — fold them in here too, or an
    // already-correct note/example/table reads as a content gap purely because of where wh11ed
    // happens to store it.
    if (num) {
      // splitBody/splitBodies (see columnChunks.js) peel a subsection's trailing [img:] + prose
      // into synthetic sibling column items for two-column balance — the text still logically
      // belongs to this subsection's body, so fold it back in here or it silently reads as
      // missing from wh11ed (appdata has no notion of the split, it's a wh11ed layout device).
      const splitText = splitBodyEntries(node).map((e) => e.body).join('\n\n')
      // `steps` (07.02's turn sequence, rendered as icon cards) is prose in appdata's eyes: its
      // container text lists the same five phases with the same one-line descriptions. Fold the
      // card titles/descriptions in, or the whole turn sequence reads as untranscribed.
      const stepText = (node.steps || []).map((st) => [st.title, st.desc].filter(Boolean).join(' ')).join('\n')
      const body = [node.body || node.description, tableText(node.table), node.note, node.example, splitText, stepText].filter(Boolean).join('\n\n')
      out.set(num, { title: node.title || '', body, file })
    }
    for (const c of node.subsections || []) walk(c)
    for (const c of node.children || []) walk(c)
  }
  for (const s of sections) walk(s)
}

// wh11ed side: rule number → { title, body, file }, every section file plus reference.js's §24.
export async function loadWh11edCore() {
  const wh = new Map()
  for (const f of FILES) {
    const mod = await loadModule(path.join(ROOT, 'src', 'data', `${f}.js`))
    const data = mod[Object.keys(mod)[0]]
    flattenWh11ed(data.en, f, wh)
    // muster.js's Select Battle Size table is a one-off oddly-placed field: `battleSizeTable` lives
    // on the top-level section-25 node (rendered after 25.03 by MusterView), not as `table` on the
    // 25.03 subsection node itself like every other section-level table in this repo — fold it into
    // 25.03's compared body or it permanently reads as a content gap.
    if (f === 'muster') {
      const bst = data.en[0]?.battleSizeTable
      if (bst && wh.has('25.03')) wh.get('25.03').body += '\n\n' + tableText(bst)
    }
  }
  // Section 24 Core Abilities lives in reference.js across two exports: `abilityIntro` (the
  // framework subsections 24.01/24.02, section-tree shape) and `coreAbilities` (the flat list
  // of individual abilities, each already carrying its `num` "24.03" and full text in `fullText`).
  // appdata sometimes numbers a clarification as its own child container (e.g. 24.11.01) that
  // wh11ed already nests under the parent ability's own `children[]` — walk those too, or they show
  // up as permanently "missing" even when transcribed.
  const ref = await loadModule(path.join(ROOT, 'src', 'data', 'reference.js'))
  flattenWh11ed(ref.abilityIntro.en, 'reference', wh)
  for (const a of ref.coreAbilities.en) {
    if (a.num) wh.set(a.num, { title: a.name || '', body: [a.fullText, a.note, a.example].filter(Boolean).join('\n\n'), file: 'reference' })
    for (const c of a.children || []) if (c.sectionNum) wh.set(c.sectionNum, { title: c.title || '', body: c.body || '', file: 'reference' })
  }
  return wh
}

// Everything a wh11ed CHAPTER says, keyed by its two-digit number ("05" → all of Attack Sequence).
// Two kinds of text live outside the numbered-rule map and would otherwise read as missing:
//   • unnumbered nodes — each phase chapter opens with a "…Phase Steps" subsection (`sectionNum: ''`)
//     carrying the step list appdata keeps in the chapter intro;
//   • section-level table fields — `woundTable` (05), `abilitiesTable` (19), `battleSizeTable` (25)
//     hang off the chapter node, not off the subsection whose prose says "see table below".
// A checker that asks "does wh11ed say this anywhere on this page?" wants this bag, not the
// per-rule body.
export async function loadWh11edChapters() {
  const out = new Map()
  const strings = (node) => {
    const parts = []
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === 'string' && k !== 'id' && k !== 'sectionNum' && k !== 'num') parts.push(v)
      else if (v && typeof v === 'object' && (k === 'table' || k.endsWith('Table'))) parts.push(tableText(v))
      else if (Array.isArray(v) && k === 'splitBodies') parts.push(v.join('\n'))
      else if (Array.isArray(v)) for (const item of v) if (item && typeof item === 'object' && !item.subsections) parts.push(Object.values(item).filter((x) => typeof x === 'string').join(' '))
    }
    for (const c of node.subsections || []) parts.push(strings(c))
    for (const c of node.children || []) parts.push(strings(c))
    return parts.filter(Boolean).join('\n')
  }
  for (const f of FILES) {
    const mod = await loadModule(path.join(ROOT, 'src', 'data', `${f}.js`))
    const data = mod[Object.keys(mod)[0]]
    for (const sec of data.en) if (sec.num) out.set(sec.num, [out.get(sec.num), strings(sec)].filter(Boolean).join('\n'))
  }
  const ref = await loadModule(path.join(ROOT, 'src', 'data', 'reference.js'))
  const ability = [...ref.abilityIntro.en.map(strings), ...ref.coreAbilities.en.map(strings)].join('\n')
  out.set('24', [out.get('24'), ability].filter(Boolean).join('\n'))
  return out
}

// appdata side: rule number → ONE merged record. appdata may carry several containers under the
// same number — 09.07.01 is both "Desperate Escape Test" (what the term means) and "Desperate
// Escape" (what a forced test costs you), two different rules filed under one number. Keying a
// plain Map by number silently dropped whichever came first, and with it any chance of noticing
// the other rule was never transcribed (it wasn't, for a year). Merge instead: `text` is every
// container's text joined, `title` names them all, and `parts` keeps them separable for callers
// that want to point at one.
export function loadAppdataCore() {
  const { rules, dataVersion } = loadJson(path.join(APPDATA, 'factions', '_core-rules.json'))
  // appdata numbers a section's intro container "NN.00"; wh11ed carries that intro on the bare
  // section node "NN". Collapse "NN.00" → "NN" so the two conventions line up instead of
  // reporting every section intro as one missing + one extra.
  const canon = (num) => num.replace(/^(\d{2})\.00$/, '$1')
  const app = new Map()
  for (const r of rules) {
    if (!r.num) continue
    const num = canon(r.num)
    const prev = app.get(num)
    if (!prev) {
      app.set(num, { ...r, num, parts: [r] })
      continue
    }
    prev.parts.push(r)
    prev.title = [prev.title, r.title].filter(Boolean).join(' / ')
    prev.text = [prev.text, r.text].filter(Boolean).join('\n\n')
    // A merged number is comparable prose if ANY of its containers is (see the `stratagem` /
    // empty-text skips in the callers).
    if (r.type !== 'stratagem') prev.type = r.type
  }
  return { app, dataVersion }
}
