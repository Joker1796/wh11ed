// Report-only FULL-TEXT diff between wh11ed's hand-transcribed Event Companion prose
// (src/data/eventCompanion.js) and wh40k-appdata's Event Companion publication (id
// 085bb508-281f-4a92-a99b-801a5c95c165). Same spirit as sync-faction-text.mjs: strip
// wh11ed's enrichment layer (gloss tokens, EC: cross-refs, bold) down to bare words on
// BOTH sides and compare the WHOLE body — not just section titles/numbers — so a
// reworded or newly-added rule can't hide behind a same-named, stale entry. Unlike
// sync-core.mjs's word-overlap triage ratio, this prints an actual word-level diff per
// matched entry (like sync-faction-text.mjs), because a single ratio has been shown to
// both under- and over-report (see APPDATA-SYNC-LESSONS.md #29).
//
// appdata's Event Companion publication has FOUR editions, each its own rule_section:
// the main Warhammer Event Companion, Teams, Doubles and Dominatus. wh11ed implements
// only the first two (Doubles/Dominatus are out of scope — a product decision, not a
// bug), so those two are only inventoried (container count), never diffed line-by-line.
//
// Matching an appdata rule_container to a wh11ed entry is by TITLE, not by any stable
// id (appdata's rule_container ids for Event Companion aren't in sourceIds.json — that
// bridge only covers faction content). Titles are normalized (case/punctuation/leading
// step-number-fold) first; anything left over is matched by word-overlap against the
// remaining pool, so a one-off wording/spelling quirk on appdata's side (e.g. its own
// "LEAVES THE BATTELEFIELD" typo) doesn't silently produce a false "missing" + "extra"
// pair. Genuinely unmatched entries on either side are reported as such — that's a
// structural gap (new appdata content, or wh11ed content that no longer exists upstream).
//
// The 6 Twists live in a separate table (mission_twist.json, not rule_container) and are
// diffed separately, matched by name. The FAQ Q&A pairs (wh11ed's faq.items) have no
// appdata table linked to this publication at all (checked faq.json/faq_config.json by
// publicationId and by ruleContainerId — zero rows) — only the FAQ page's intro/errata
// prose is a rule_container and gets diffed; the Q&A pairs themselves are flagged as
// structurally unverifiable against appdata, not silently skipped.
//
// Usage:
//   node scripts/sync-event-companion.mjs
import path from 'node:path'
import { ROOT, APPDATA, loadJson, loadModule } from './lib/sync-common.mjs'

const EC_PUBLICATION_ID = '085bb508-281f-4a92-a99b-801a5c95c165'

// ── appdata extraction ──────────────────────────────────────────────────────────────
const T = (f) => loadJson(path.join(APPDATA, 'tables', f)) || []

const ruleSections = T('rule_section.json').filter((r) => r.publicationId === EC_PUBLICATION_ID)
const sectionName = Object.fromEntries(ruleSections.map((r) => [r.id, r.localisations?.en?.name]))
const MAIN_ID = ruleSections.find((r) => r.localisations?.en?.name === 'Event Companion')?.id
const TEAMS_ID = ruleSections.find((r) => r.localisations?.en?.name === 'Teams Event Companion')?.id

const allContainers = T('rule_container.json').filter((c) => sectionName[c.ruleSectionId])
const componentsByContainer = {}
for (const comp of T('rule_container_component.json')) {
  ;(componentsByContainer[comp.ruleContainerId] ||= []).push(comp)
}

// Convert one component's text to comparable plain-ish markup (appdata <b>/<ul>/<table> → **/▪/flat).
function componentText(comp) {
  const l = comp.localisations?.en || {}
  if (comp.type === 'image' || comp.type === 'header') return ''
  const parts = []
  if (comp.type === 'triggerEffectAccordion') {
    if (l.trigger) parts.push(l.trigger)
    if (l.effect) parts.push(l.effect)
  } else if (l.textContent && l.textContent !== '-') {
    parts.push(l.textContent)
  }
  if (comp.type === 'accordion' && l.title) parts.unshift(l.title)
  return parts
    .join('\n')
    .replace(/<table[^>]*>/gi, '\n')
    .replace(/<\/table>/gi, '\n')
    .replace(/<tr[^>]*>/gi, '\n')
    .replace(/<\/tr>/gi, '')
    .replace(/<\/?td[^>]*>/gi, ' ')
    .replace(/<\/?ul[^>]*>/gi, '\n')
    .replace(/<li[^>]*>/gi, '\n▪ ')
    .replace(/<\/li>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<u>(.*?)<\/u>/gis, '__$1__')
    .replace(/<b>(.*?)<\/b>/gis, '**$1**')
    .replace(/<[^>]+>/g, '')
}

// One container's full text = all its components, in order, joined. Layout-diagram
// containers ("X / Y - Layout A") are image-only (no prose) — excluded up front.
function containerEntries(ruleSectionId) {
  return allContainers
    .filter((c) => c.ruleSectionId === ruleSectionId && !/ - Layout [ABC]$/.test(c.localisations?.en?.title || ''))
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((c) => ({
      title: c.localisations?.en?.title || '(untitled)',
      text: (componentsByContainer[c.id] || [])
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map(componentText)
        .filter(Boolean)
        .join('\n'),
    }))
}

// ── title matching ──────────────────────────────────────────────────────────────────
const normTitle = (s) =>
  (s || '')
    .toLowerCase()
    .replace(/^\d+[\s.·]+/, '') // leading "14. " / "14 · " step number
    .replace(/[’‘“”"'.,]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
// Strip a trailing 's' so plural/singular variants overlap (e.g. appdata "TEAM RANKINGS"
// vs wh11ed "Ranking Teams" — same two words, different inflection each side, 0% overlap
// without this — found while investigating a false "missing in wh11ed" on a data refresh).
const singularize = (w) => (w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w)
const titleWords = (s) => new Set(normTitle(s).split(' ').filter(Boolean).map(singularize))
function titleOverlap(a, b) {
  const wa = titleWords(a)
  const wb = titleWords(b)
  if (!wa.size || !wb.size) return 0
  let inter = 0
  for (const w of wa) if (wb.has(w)) inter++
  return inter / (wa.size + wb.size - inter)
}

// ── prose normalization + word diff (same recipe as sync-faction-text.mjs's plainText/wordDiff) ──
function plainText(s) {
  if (!s) return ''
  let t = s
  t = t.replace(/\[gloss:[^:\]]+:([^\]]*)\]/g, '$1')
  t = t.replace(/\[def:[^:\]]+:([^\]]*)\]/g, '$1')
  t = t.replace(/\*\*/g, '').replace(/__/g, '')
  t = t.replace(/\s*\((?:\d+\.)*\d+\)/g, '') // (NN.NN) cross-refs
  t = t.replace(/[[\]]/g, '') // [FORCE DISPOSITION] / [BRACKET] markers — both sides have them
  t = t.replace(/[▪•◦▫→◆◈#]/g, ' ')
  t = t.replace(/[’‘`]/g, "'").replace(/[“”«»]/g, '"').replace(/[‐‑–—]/g, '-')
  t = t.replace(/([a-zA-Z])-([a-zA-Z])/g, '$1 $2') // hyphenation fold, not ± stats
  t = t.replace(/'/g, '')
  t = t.replace(/\s*\/\s*/g, '/')
  t = t.toLowerCase().replace(/[^a-z0-9"/+%-]+/g, ' ').replace(/\s+/g, ' ').trim()
  return t
}
function wordDiff(whPlain, appPlain) {
  const a = whPlain.split(' ')
  const b = appPlain.split(' ')
  let lead = 0
  while (lead < a.length && lead < b.length && a[lead] === b[lead]) lead++
  let tail = 0
  while (tail < a.length - lead && tail < b.length - lead && a[a.length - 1 - tail] === b[b.length - 1 - tail]) tail++
  return { whMid: a.slice(lead, a.length - tail).join(' '), appMid: b.slice(lead, b.length - tail).join(' ') }
}
function compare(out, label, whText, appText) {
  const wh = plainText(whText)
  const app = plainText(appText)
  if (!app && !wh) return
  if (wh === app) return
  if (!wh) {
    out.push(`  + ${label}: wh11ed has no text; appdata:\n      ${appText.replace(/\n/g, '\n      ')}`)
    return
  }
  if (!app) {
    out.push(`  - ${label}: appdata container has no comparable text (image/empty) — nothing to check`)
    return
  }
  const { whMid, appMid } = wordDiff(wh, app)
  if (!whMid && !appMid) return
  out.push(`  ~ ${label}: text differs from appdata`)
  if (whMid && appMid) {
    out.push(`      wh11ed:  …${whMid}…`)
    out.push(`      appdata: …${appMid}…`)
  } else if (whMid) {
    out.push(`      wh11ed adds (not in appdata): …${whMid}…`)
  } else {
    out.push(`      appdata has (missing in wh11ed): …${appMid}…`)
  }
  out.push(`      canonical (paste-ready):\n        ${appText.replace(/\n/g, '\n        ')}`)
}

// ── wh11ed extraction: flatten eventCompanion.js's EN content into { title, text } entries,
// one per matchable appdata container. Tables are folded into the entry's text (title +
// headers + rows + footnote) so a table edit is caught by the same word diff as prose.
const tableText = (t) => (t ? [t.title, (t.headers || []).join(' '), ...(t.rows || []).map((r) => r.join(' ')), t.footnote].filter(Boolean).join('\n') : '')

function flattenMain(en) {
  const out = []
  const push = (title, ...parts) => {
    const text = parts.filter(Boolean).join('\n')
    if (title) out.push({ title, text })
  }
  push('Introduction', en.sequence.introduction.body, en.sequence.introduction.note)
  push('Warhammer Event Mission Sequence', en.sequence.intro)
  for (const b of en.sequence.blocks) push(b.title, b.body, tableText(b.table), b.tableNote)
  for (const s of en.sequence.secondary) push(s.title, s.body)
  for (const n of en.sequence.designerNotes) push(n.title, n.body)
  push('Recommended Terrain Area Footprints', tableText(en.terrain.footprints))
  push('Terrain Layouts', en.terrain.intro)
  push('Terrain Features', en.terrain.keyNote)
  push('Pairings and Rankings', en.pairings.intro)
  for (const b of en.pairings.blocks) push(b.title, b.body, b.note)
  push('Chapter Approved Mission Deck', en.faq.intro, en.faq.errata, en.faq.items.map((i) => `${i.q} ${i.a}`).join('\n'))
  return out
}

function flattenTeams(en) {
  const out = []
  const push = (title, ...parts) => {
    const text = parts.filter(Boolean).join('\n')
    if (title) out.push({ title, text })
  }
  push('Introduction', en.teams.intro, en.teams.blocks[0]?.body)
  // Teams deliberately doesn't repeat "Generating Command Points" — it's the same rule as the
  // main Event Companion's, and the Teams sequence explicitly refers back to it (see
  // 'teams-sequence-note'). Same story for the 5 "CUMULATIVE/OR CONDITIONS", "LEAVES THE
  // BATTLEFIELD", "ONE", "VP UP TO A LIMIT", "WHEN DRAWN" glossary containers (identical text
  // to Main's own designerNotes) and "PAIRINGS AND RANKINGS" (Teams' copy of the same generic
  // framing paragraph as Main's `en.pairings.intro`) — all reported as container-inventory
  // gaps below, none of them real ones.
  //
  // Same non-issue for the numbered step containers ("WARHAMMER TEAMS EVENT MISSION SEQUENCE"
  // intro heading, "3. CREATE THE BATTLEFIELD" through "13. DETERMINE VICTOR"): `en.teams.blocks`
  // condenses all of these into one 'teams-sequence-note' paragraph ("...are unchanged from the
  // standard sequence", `seeAlso: ['Mission Sequence EC:sequence']`) instead of re-transcribing
  // each step — confirmed 2026-07-29, no content gap. "14. TEAM SCORING" is a title-matching
  // artifact, not a real gap either: wh11ed splits that single appdata container across two
  // entries with different titles ('14 · Team Scoring — Battle Points' + 'Team Scoring — Match
  // Result'), so the title matcher can't pair either one to it — the BP table, differential
  // table and TP scoring are all present, just not under a title this matcher can find.
  for (const b of en.teams.blocks.slice(1)) push(b.title, b.body, tableText(b.table), b.tableNote, b.note)
  return out
}

// ── matching + reporting for one edition ────────────────────────────────────────────
function syncEdition(label, ruleSectionId, whEntries) {
  const appEntries = containerEntries(ruleSectionId)
  const used = new Set()
  const out = []
  for (const wh of whEntries) {
    let idx = appEntries.findIndex((a, i) => !used.has(i) && normTitle(a.title) === normTitle(wh.title))
    if (idx === -1) {
      let best = -1
      let bestScore = 0
      appEntries.forEach((a, i) => {
        if (used.has(i)) return
        const score = titleOverlap(a.title, wh.title)
        if (score > bestScore) { bestScore = score; best = i }
      })
      if (bestScore >= 0.5) idx = best
    }
    if (idx === -1) {
      out.push(`  ? "${wh.title}": no matching appdata container found (title-based match failed)`)
      continue
    }
    used.add(idx)
    compare(out, `"${wh.title}" (appdata: "${appEntries[idx].title}")`, wh.text, appEntries[idx].text)
  }
  appEntries.forEach((a, i) => {
    if (!used.has(i) && a.text) out.push(`  + missing in wh11ed: appdata container "${a.title}"\n      ${a.text.replace(/\n/g, '\n      ')}`)
  })

  console.log(`\n=== Event Companion · ${label} ===`)
  if (!out.length) console.log('  no text differences found')
  else out.forEach((l) => console.log(l))
}

// ── Twists (separate table, matched by name) ────────────────────────────────────────
function syncTwists(en) {
  const twists = T('mission_twist.json')
  const byNorm = new Map(twists.map((t) => [normTitle(t.localisations?.en?.name), t]))
  const out = []
  const used = new Set()
  for (const b of en.twists.blocks) {
    const key = normTitle(b.title)
    const t = byNorm.get(key)
    if (!t) { out.push(`  ? "${b.title}": no matching mission_twist entry found`); continue }
    used.add(t.id)
    const l = t.localisations.en
    // appdata inlines the Designer's Note as a trailing paragraph of `rules`; wh11ed keeps it in
    // its own `note` field — fold it back in so the two sides line up.
    compare(out, `twist "${b.title}" · rules`, [b.body, b.note].filter(Boolean).join('\n\n'), l.rules)
    compare(out, `twist "${b.title}" · example/lore`, b.example, l.lore)
  }
  for (const t of twists) {
    if (used.has(t.id)) continue
    out.push(`  + missing in wh11ed: twist "${t.localisations?.en?.name}"`)
  }
  console.log(`\n=== Event Companion · Twists (mission_twist.json) ===`)
  if (!out.length) console.log('  no text differences found')
  else out.forEach((l) => console.log(l))
}

// ── Doubles / Dominatus inventory only (out of scope — not implemented in wh11ed) ───
function inventoryOnly(label, ruleSectionId) {
  const entries = containerEntries(ruleSectionId).filter((e) => e.text)
  console.log(`\n=== Event Companion · ${label} (NOT implemented in wh11ed — inventory only) ===`)
  console.log(`  ${entries.length} appdata containers with text, out of scope by product decision.`)
}

// ── run ──────────────────────────────────────────────────────────────────────────────
const mod = await loadModule(path.join(ROOT, 'src/data/eventCompanion.js'))
const en = mod.getEventContent('en')

syncEdition('Main', MAIN_ID, flattenMain(en))
syncEdition('Teams', TEAMS_ID, flattenTeams(en))
syncTwists(en)
for (const rs of ruleSections) {
  if (rs.id === MAIN_ID || rs.id === TEAMS_ID) continue
  inventoryOnly(rs.localisations?.en?.name, rs.id)
}
