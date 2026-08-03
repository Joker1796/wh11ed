import { ref } from 'vue'
import { basicRules } from '../data/basicRules.js'
import { battleRound } from '../data/battleRound.js'
import { battlefields } from '../data/battlefields.js'
import { advancedRules } from '../data/advancedRules.js'
import { muster } from '../data/muster.js'
import { abilityIntro, coreAbilities, appendix, faqs } from '../data/reference.js'
import { getEventContent } from '../data/eventCompanion.js'
import { getMissions } from '../data/missions.js'
import { intro } from '../data/intro.js'
import { ui } from '../i18n/ui.js'
import { h4AnchorId } from './anchors.js'
import { splitBodyEntries } from './columnChunks.js'

// Every core-rules chapter lives on one page now, so a hit's `route` is the same for all of
// them; the anchor (`id`) is what actually distinguishes them.
const CORE_ROUTE = '/core-rules'

const sectionTitles = {
  en: { reference: 'Core Abilities' },
  ru: { reference: 'Базовые способности' },
}

function stripMarkup(text) {
  if (!text) return ''
  return text
    .split('\n')
    .map(line => {
      const l = line.trim()
      if (l.startsWith('[img:')) {
        const pipeIdx = l.indexOf('|')
        return pipeIdx >= 0 ? l.slice(pipeIdx + 1, -1).trim() : ''
      }
      if (l.startsWith('◈ ')) return l.slice(2).replace(/^[^|]*\|\s*/, '')
      if (l.startsWith('▪ ')) return l.slice(2)
      if (l.startsWith('▫ ')) return l.slice(2)
      if (l.startsWith('→ ')) return l.slice(2)
      if (l.startsWith('◆ ')) return l.slice(2)
      if (l.startsWith('### ')) return l.slice(4)
      return l
    })
    .filter(Boolean)
    .join(' ')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/\{[a-z]+:(.+?)}/g, '$1')
    .replace(/\[def:[^:]+:([^\]]+)]/g, '$1')
    .replace(/\[gloss:[^\]:]+:([^\]]+)]/g, '$1')
    .replace(/\((\d{2}\.\d{2})\)/g, '($1)')
    .trim()
}

// Flatten a table object ({ title?, note?, headers[], rows[][], footnote? }) into a
// searchable text blob. Tables live as a sibling property (not inside `body`), so the
// index has to pull their cells in explicitly or table contents are unsearchable.
function tableText(table) {
  if (!table || !Array.isArray(table.rows)) return ''
  const parts = []
  if (table.title) parts.push(table.title)
  if (table.note) parts.push(table.note)
  if (Array.isArray(table.headers)) parts.push(table.headers.join(' '))
  for (const r of table.rows) parts.push(Array.isArray(r) ? r.join(' ') : '')
  if (table.footnote) parts.push(table.footnote)
  return parts.join('\n')
}

// Section-level tables carry different field names (woundTable / battleSizeTable /
// abilitiesTable), so match any table-shaped value (an object with a `rows` array)
// rather than hard-coding names — picks up future ones for free.
function sectionTablesText(section) {
  if (!section) return ''
  return Object.values(section)
    .filter(v => v && Array.isArray(v.rows))
    .map(tableText)
    .join('\n')
}

// `### h4` subheadings in body order. Stays in lockstep with RuleBlock's parser
// (which numbers h4 blocks 1-based in the same order) via the shared h4AnchorId.
function extractH4(body) {
  if (!body) return []
  return body
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('### '))
    .map(l => stripMarkup(l.slice(4)))
    .filter(Boolean)
}

function buildIndex(locale) {
  const isRu = locale === 'ru'
  const items = []
  const sources = [
    { enData: basicRules.en, ruData: basicRules.ru },
    { enData: battleRound.en, ruData: battleRound.ru },
    { enData: battlefields.en, ruData: battlefields.ru },
    { enData: advancedRules.en, ruData: advancedRules.ru },
    { enData: muster.en, ruData: muster.ru },
  ]
  for (const { enData, ruData } of sources) {
    const route = CORE_ROUTE
    for (let si = 0; si < enData.length; si++) {
      const enSection = enData[si]
      const ruSection = isRu && ruData ? (ruData[si] || {}) : {}
      if (!enSection.subsections) continue
      const sectionTitle = (isRu && ruSection.title) ? ruSection.title : (enSection.title || '')
      // Chapter (h2) heading — a searchable, scrollable result of its own.
      const sectionAnchor = 'section-' + String(enSection.id).padStart(2, '0')
      const sectionDesc = (isRu && ruSection.description) ? ruSection.description : (enSection.description || '')
      const sectionTables = sectionTablesText(isRu && ruSection.title ? ruSection : enSection)
      items.push({
        id: sectionAnchor,
        sectionNum: enSection.num || '',
        title: sectionTitle,
        body: stripMarkup(sectionDesc + (sectionTables ? '\n' + sectionTables : '')),
        route,
        sectionTitle,
      })
      const ruSubs = (isRu && ruSection.subsections) ? ruSection.subsections : []
      for (let i = 0; i < enSection.subsections.length; i++) {
        const enSub = enSection.subsections[i]
        if (!enSub.sectionNum) continue
        const ruSub = ruSubs[i] || {}
        const merged = isRu ? { ...enSub, ...ruSub } : enSub
        const splitTails = splitBodyEntries(merged)
        items.push({
          id: enSub.id,
          sectionNum: enSub.sectionNum,
          title: merged.title || '',
          body: stripMarkup((merged.body || '') + (merged.note ? ' ' + merged.note : '') + (merged.table ? '\n' + tableText(merged.table) : '') + splitTails.map((t) => '\n' + t.body).join('')),
          route,
          sectionTitle,
        })
        // h4 subheadings within the body → individually navigable results.
        extractH4(merged.body).forEach((heading, hi) => {
          items.push({
            id: h4AnchorId(enSub.id, hi + 1),
            sectionNum: enSub.sectionNum,
            title: heading,
            body: '',
            route,
            sectionTitle,
          })
        })
        // splitSubsections() (columnChunks.js) renders each splitBody(ies) tail as its own
        // RuleBody under the ids computed by splitBodyEntries — their h4s need matching anchors.
        for (const tail of splitTails) {
          extractH4(tail.body).forEach((heading, hi) => {
            items.push({
              id: h4AnchorId(tail.id, hi + 1),
              sectionNum: enSub.sectionNum,
              title: heading,
              body: '',
              route,
              sectionTitle,
            })
          })
        }
        // x.x.x children (SubRuleBlock) — indexed like subsections, incl. their h4s.
        const ruChildren = ruSub.children || []
        ;(enSub.children || []).forEach((enChild, ci) => {
          const mc = isRu ? { ...enChild, ...(ruChildren[ci] || {}) } : enChild
          items.push({
            id: enChild.id,
            sectionNum: enChild.sectionNum,
            title: mc.title || '',
            body: stripMarkup((mc.body || '') + (mc.note ? ' ' + mc.note : '') + (mc.table ? '\n' + tableText(mc.table) : '')),
            route,
            sectionTitle,
          })
          extractH4(mc.body).forEach((heading, hi) => {
            items.push({
              id: h4AnchorId(enChild.id, hi + 1),
              sectionNum: enChild.sectionNum,
              title: heading,
              body: '',
              route,
              sectionTitle,
            })
          })
        })
      }
      // Stratagems — each has num + name (EN only; names stay English per convention).
      const ruStratagems = (isRu && ruSection.stratagems) ? ruSection.stratagems : []
      ;(enSection.stratagems || []).forEach((enStrat, si) => {
        const merged = isRu ? { ...enStrat, ...(ruStratagems[si] || {}) } : enStrat
        const body = [merged.when, merged.target, merged.effect, merged.restrictions, merged.flavor]
          .filter(Boolean).join(' ')
        items.push({
          id: 'strat-' + enStrat.num.replace('.', '-'),
          sectionNum: enStrat.num,
          title: enStrat.name,
          titleRu: isRu ? (merged.nameRu || '') : '',
          body: stripMarkup(body),
          route,
          sectionTitle,
        })
      })
    }
  }
  for (let i = 0; i < coreAbilities.en.length; i++) {
    const en = coreAbilities.en[i]
    const ru = isRu && coreAbilities.ru ? (coreAbilities.ru[i] || {}) : {}
    const merged = isRu ? { ...en, ...ru } : en
    items.push({
      id: 'ability-' + en.num.replace('.', '_'),
      sectionNum: en.num,
      title: en.name,
      body: stripMarkup((merged.fullText || '') + ' ' + (merged.flavor || '')),
      route: CORE_ROUTE,
      sectionTitle: sectionTitles[locale].reference,
    })
    const ruChildren = (ru.children) || []
    ;(en.children || []).forEach((enChild, ci) => {
      const mc = isRu ? { ...enChild, ...(ruChildren[ci] || {}) } : enChild
      items.push({
        id: enChild.id,
        sectionNum: enChild.sectionNum,
        title: mc.title || '',
        body: stripMarkup((mc.body || '') + (mc.note ? ' ' + mc.note : '')),
        route: CORE_ROUTE,
        sectionTitle: sectionTitles[locale].reference,
      })
    })
  }
  indexReferenceExtras(items, locale)
  indexIntro(items, locale)
  indexEventCompanion(items, locale)
  return items
}

// Reference page extras beyond the Core Abilities table: the ability intro prose
// (24.0x, rendered by RuleBlock → has sub.id + h4 ids), the Rules Appendix (each
// entry has entry.id), and the FAQs (faq-<i> ids added in ReferenceView).
function indexReferenceExtras(items, locale) {
  const isRu = locale === 'ru'
  const L = ui[locale]
  const refTitle = sectionTitles[locale].reference

  for (let i = 0; i < abilityIntro.en.length; i++) {
    const en = abilityIntro.en[i]
    const merged = isRu && abilityIntro.ru ? { ...en, ...(abilityIntro.ru[i] || {}) } : en
    items.push({
      id: en.id,
      sectionNum: en.sectionNum || '',
      title: merged.title || '',
      body: stripMarkup((merged.body || '') + (merged.example ? ' ' + merged.example : '')),
      route: CORE_ROUTE,
      sectionTitle: refTitle,
    })
    extractH4(merged.body).forEach((heading, hi) => {
      items.push({ id: h4AnchorId(en.id, hi + 1), sectionNum: en.sectionNum || '', title: heading, body: '', route: CORE_ROUTE, sectionTitle: refTitle })
    })
    const ruChildren = (isRu && abilityIntro.ru?.[i]?.children) || []
    ;(en.children || []).forEach((enChild, ci) => {
      const mc = isRu ? { ...enChild, ...(ruChildren[ci] || {}) } : enChild
      items.push({
        id: enChild.id,
        sectionNum: enChild.sectionNum,
        title: mc.title || '',
        body: stripMarkup((mc.body || '') + (mc.note ? ' ' + mc.note : '')),
        route: CORE_ROUTE,
        sectionTitle: refTitle,
      })
    })
  }

  for (let i = 0; i < appendix.en.length; i++) {
    const en = appendix.en[i]
    const merged = isRu && appendix.ru ? { ...en, ...(appendix.ru[i] || {}) } : en
    const table = tableText(merged.table)
    items.push({
      id: en.id,
      sectionNum: '',
      title: merged.title || '',
      body: stripMarkup((merged.body || '') + '\n' + table),
      route: CORE_ROUTE,
      sectionTitle: L.rulesAppendixTitle,
    })
  }

  const faqList = isRu && faqs.ru ? faqs.ru : faqs.en
  faqList.forEach((faq, i) => {
    items.push({
      id: 'faq-' + i,
      sectionNum: '',
      title: stripMarkup(faq.q),
      body: stripMarkup(faq.a),
      route: CORE_ROUTE,
      sectionTitle: L.faqsTitle,
    })
  })
}

// The Introduction chapter — the About and App sections. DOM ids (intro-about/app) live in
// components/core/ChapterIntro.vue so results scroll there.
function indexIntro(items, locale) {
  const t = intro[locale] || intro.en
  const L = ui[locale]
  const add = (id, title, parts) => {
    items.push({
      id,
      sectionNum: '',
      title,
      body: stripMarkup(parts.filter(Boolean).join('\n')),
      route: CORE_ROUTE,
      sectionTitle: L.introHeading,
    })
  }
  add('intro-about', L.introHeading, [t.lore, ...(t.flavorText || []), t.intro, t.missions])
  add('intro-app', L.appHeading, [t.app])
}

// Event Companion lives in a different data shape ({ en, ru } objects rather than
// Section[] arrays), so it gets its own walker. All seven chapters share one route now
// (EVENT_ROUTE) — blocks with a real DOM id (chapter sections, sequence steps, pairings,
// teams) deep-link and scroll straight there.
const EVENT_ROUTE = '/event-companion'

function indexEventCompanion(items, locale) {
  const ec = getEventContent(locale)
  const L = ui[locale]
  const add = (id, title, parts, sectionTitle, titleRu = '') => {
    const body = stripMarkup(parts.filter(Boolean).join('\n'))
    if (!title && !body) return
    items.push({ id, sectionNum: '', title: title || '', titleRu, body, route: EVENT_ROUTE, sectionTitle })
  }
  const rowsText = tbl => (tbl && tbl.rows ? tbl.rows.map(r => r.join(' ')).join('\n') : '')
  const t = ec.terrain
  const legendText = (t.legend || []).map(l => `${l.label} ${l.desc || ''}`)
  const dispoText = (ec.dispositions || []).map(d => d.name)

  // Landing entry per chapter, titled with the chapter heading so the heading itself is
  // searchable (e.g. "Mission Matrix" / "Матрица миссий"). Introduction reuses its real
  // block DOM id; the rest deep-link to their `ec-chapter-*` section id (the wrapper
  // <section> in EventCompanionView.vue).
  const intro = ec.sequence.introduction
  add(intro.id, L.eventIntroHeading, [L.eventIntroDesc, intro.body, intro.note], L.eventIntroHeading)
  add('ec-chapter-sequence', L.eventSequenceHeading, [L.eventSequenceDesc, ec.sequence.intro], L.eventSequenceHeading)
  add('ec-chapter-missions', L.eventMissionsHeading, [L.eventMissionsDesc, L.missionsIntro], L.eventMissionsHeading)
  // Terrain & Layouts also hosts the interactive matrix + legend (merged from the former
  // Mission Matrix page), so its dispo/legend text is indexed here.
  add('ec-chapter-layouts', L.eventLayoutsHeading,
    [L.eventLayoutsDesc, t.intro, t.keyNote, L.eventMatrixHint, ...dispoText, ...legendText],
    L.eventLayoutsHeading)
  add('ec-chapter-pairings', L.eventPairingsHeading, [L.eventPairingsDesc, ec.pairings.intro], L.eventPairingsHeading)
  add('ec-chapter-teams', L.eventTeamsHeading, [L.eventTeamsDesc, ec.teams.intro], L.eventTeamsHeading)
  add('ec-chapter-faq', L.eventFaqHeading, [L.eventFaqDesc, ec.faq.intro, ec.faq.errata], L.eventFaqHeading)

  // Mission Sequence — main steps, secondary rules, designer notes
  const seqBlocks = [
    ...(ec.sequence.blocks || []),
    ...(ec.sequence.secondary || []),
    ...(ec.sequence.designerNotes || []),
  ]
  for (const b of seqBlocks) {
    const table = b.table ? [b.table.title, rowsText(b.table)] : []
    add(b.id, b.title, [b.body, b.note, ...table, b.tableNote], L.eventSequenceHeading)
  }

  // Terrain & Layouts — footprints table
  if (t.footprints) {
    add('ec-footprints', t.footprints.title, [rowsText(t.footprints), t.footprints.footnote], L.eventLayoutsHeading)
  }

  // Pairings & Rankings
  for (const b of ec.pairings.blocks || []) {
    add(b.id, b.title, [b.body, b.note], L.eventPairingsHeading)
  }

  // Teams — was never indexed before (the page was hidden from subnav/search); some blocks
  // carry a DataTable, same as Sequence.
  for (const b of ec.teams.blocks || []) {
    const table = b.table ? [b.table.title, rowsText(b.table)] : []
    add(b.id, b.title, [b.body, b.note, ...table, b.tableNote], L.eventTeamsHeading)
  }

  // Twists — rendered on the Missions chapter (deep-link to #twist-<id>). titleRu comes
  // through the ec.twists?.blocks merge (mergeLocale) when locale is 'ru' — name-stays-
  // English convention, same as stratagems/enhancements.
  for (const b of ec.twists?.blocks || []) {
    add('twist-' + b.id, b.title, [b.body, b.note, b.example], L.missionsTwistsHeading, b.titleRu || '')
  }

  // Errata & FAQs (no per-item DOM ids → synthetic)
  ;(ec.faq.items || []).forEach((item, i) => {
    add('ec-faq-' + i, item.q, [item.a], L.eventFaqHeading)
  })

  // Missions — index each mission by name. Names are language-agnostic (kept EN), so the
  // same set is indexed for both locales; getMissions(locale) adds the optional nameRu
  // display subline (same convention as stratagems/enhancements) when locale is 'ru'.
  // Secondaries share a slug across the two roles; index once (the card id `mission-<slug>`
  // exists for the default-shown role).
  const localizedMissions = getMissions(locale)
  for (const m of localizedMissions.primary) {
    add('mission-' + m.slug, m.name, [m.opponent], L.eventMissionsHeading, m.nameRu || '')
  }
  const seenSecondary = new Set()
  for (const m of localizedMissions.secondary) {
    if (seenSecondary.has(m.slug)) continue
    seenSecondary.add(m.slug)
    add('mission-' + m.slug, m.name, [m.category], L.eventMissionsHeading, m.nameRu || '')
  }
}

// Datasheet unit names (find a unit by name → its /factions/…/datasheets/… page).
// The compact generated index (src/data/datasheetIndex.js) is dynamic-imported on
// first search open — same pattern as KeywordPopover's data — so the entry bundle
// never carries it. `dsVersion` is a reactive tick: SearchModal's `results` computed
// reads it (inside search()), so results refresh once the chunk arrives mid-typing.
let dsIndex = null
let dsPromise = null
const dsVersion = ref(0)
export function preloadDatasheetIndex() {
  dsPromise ??= import('../data/datasheetIndex.js').then((m) => {
    dsIndex = m.datasheetIndex
    dsVersion.value++
  })
  return dsPromise
}

// Same cached index, for callers that need the resolved data itself rather than just a
// prefetch trigger (e.g. DatasheetCard's cross-faction Leader/Support name resolution — see
// FactionDatasheetView.vue). Awaits the same shared promise, so a search-palette open and a
// datasheet-page visit never fetch the chunk twice.
export async function getDatasheetIndex() {
  await preloadDatasheetIndex()
  return dsIndex
}

function searchDatasheets(q, locale) {
  if (!dsIndex) return []
  const isRu = locale === 'ru'
  const L = ui[locale] || ui.en
  const results = []
  for (const [slug, faction, units] of dsIndex) {
    for (const [id, name, aliasesRu] of units) {
      const nameHit = foldYo(name.toLowerCase()).includes(q)
      // A unit's own name still wins if it also happens to match (checked first) — the alias is
      // only surfaced as `titleRu` (the "found via nickname" subline) when it's the reason this
      // result matched at all, not on every result for a unit that merely has aliases on file.
      const aliasHit = !nameHit && (aliasesRu || []).find((a) => foldYo(a.toLowerCase()).includes(q))
      if (!nameHit && !aliasHit) continue
      results.push({
        id: '',
        key: `ds-${slug}-${id}`,
        sectionNum: '',
        title: name,
        titleRu: isRu && aliasHit ? aliasHit : '',
        body: '',
        snippet: '',
        route: `/factions/${slug}/datasheets/${id}`,
        sectionTitle: `${faction} · ${L.factionDatasheets}`,
        score: 2,
      })
    }
  }
  return results
}

// Faction rules — army rule, detachments, detachment stratagems/enhancements — found by NAME
// (find "Armour of Contempt" → its detachment's page). The compact generated index
// (src/data/factionRulesIndex.js) is dynamic-imported on first search open, same pattern and same
// reasoning as the datasheet index above: names only, so the chunk stays light (see the
// generator script's comment for why full rule text was rejected). `frVersion` is a reactive
// tick, same role as `dsVersion`.
let frIndex = null
let frPromise = null
const frVersion = ref(0)
export function preloadFactionRulesIndex() {
  frPromise ??= import('../data/factionRulesIndex.js').then((m) => {
    frIndex = m.factionRulesIndex
    frVersion.value++
  })
  return frPromise
}

// True if `q` (already folded/lowercased) is found in any of the given names.
function anyNameMatches(q, ...names) {
  return names.some((n) => n && foldYo(n.toLowerCase()).includes(q))
}

// Names are language-agnostic (kept EN in results, like stratagem/unit names elsewhere) but
// matched against both the EN and RU display name, so a query in either language finds them.
// The RU display name is also surfaced as `titleRu` (only in the RU locale) so the result
// shows the same name + translated-subline pairing as the page itself (StratCard, the
// enhancement card, RuleBlock's subtitle, the detachment heading).
function searchFactionRules(q, locale) {
  if (!frIndex) return []
  const isRu = locale === 'ru'
  const results = []
  // `detSlug`/`detId`/`detChapter` (undefined for the army-rule item) let SearchModal select
  // the right detachment before navigating — FactionRuleView only renders the ACTIVE detachment
  // (see useFactionChoice), so its section only exists in the DOM once selected.
  const push = (title, titleRu, key, id, sectionTitle, det, slug) => {
    results.push({
      id, key, sectionNum: '', title, titleRu: isRu ? (titleRu || '') : '', body: '', snippet: '',
      route: `/factions/${slug}`, sectionTitle, score: 2,
      ...(det && { detSlug: slug, detId: det.id, detChapter: det.chapter }),
    })
  }
  for (const [slug, faction, data] of frIndex) {
    if (data.armyRule && anyNameMatches(q, data.armyRule.name, data.armyRule.nameRu)) {
      push(data.armyRule.name, data.armyRule.nameRu, `fr-${slug}-army`, data.armyRule.id, faction, null, slug)
    }
    // Army-rule h4 subheadings (e.g. Black Templars' Vows) — always visible, no detachment
    // to select first.
    for (const h of data.armyRule?.subheadings || []) {
      if (anyNameMatches(q, h.name, h.nameRu)) {
        push(h.name, h.nameRu, `fr-${slug}-army-${h.id}`, h.id, `${faction} · ${data.armyRule.name}`, null, slug)
      }
    }
    for (const det of data.detachments) {
      if (anyNameMatches(q, det.name, det.nameRu, det.ruleName, det.ruleNameRu)) {
        push(det.name, det.nameRu, `fr-${slug}-${det.id}-det`, det.id, faction, det, slug)
      }
      // Detachment-rule h4 subheadings (Doctrines/Stances/Imperatives-type sub-rules) — anchor
      // to their own heading, but still need `det` selected first (FactionRuleView only renders
      // the active detachment).
      for (const h of det.ruleSubheadings) {
        if (anyNameMatches(q, h.name, h.nameRu)) {
          push(h.name, h.nameRu, `fr-${slug}-${det.id}-h-${h.id}`, h.id, `${faction} · ${det.name}`, det, slug)
        }
      }
      for (const s of det.stratagems) {
        if (anyNameMatches(q, s.name, s.nameRu)) {
          push(s.name, s.nameRu, `fr-${slug}-${det.id}-s-${s.name}`, s.id, `${faction} · ${det.name}`, det, slug)
        }
      }
      for (const e of det.enhancements) {
        if (anyNameMatches(q, e.name, e.nameRu)) {
          push(e.name, e.nameRu, `fr-${slug}-${det.id}-e-${e.name}`, e.id, `${faction} · ${det.name}`, det, slug)
        }
      }
    }
  }
  return results
}

// Combat Patrol — each box's detachment rule, army rule, stratagems, enhancements (+ h4
// subheadings) — found by NAME, routing to /combat-patrol/<slug>. The compact generated index
// (src/data/combatPatrolSearchIndex.js) is dynamic-imported on first search open, same pattern as
// the two indexes above. No detachment to select first — a CP box has exactly one fixed
// rule/army-rule/roster, so the page renders it unconditionally once its own (also
// dynamically-imported) data resolves; scrollToAnchor()'s DOM poll already tolerates that,
// same as any other async-loaded route.
let cpIndex = null
let cpPromise = null
const cpVersion = ref(0)
export function preloadCombatPatrolIndex() {
  cpPromise ??= import('../data/combatPatrolSearchIndex.js').then((m) => {
    cpIndex = m.combatPatrolSearchIndex
    cpVersion.value++
  })
  return cpPromise
}

function searchCombatPatrol(q, locale) {
  if (!cpIndex) return []
  const isRu = locale === 'ru'
  const results = []
  const push = (title, titleRu, key, id, sectionTitle, slug) => {
    results.push({
      id, key, sectionNum: '', title, titleRu: isRu ? (titleRu || '') : '', body: '', snippet: '',
      route: `/combat-patrol/${slug}`, sectionTitle, score: 2,
    })
  }
  for (const [slug, faction, boxName, data] of cpIndex) {
    // Prefixed with "Combat Patrol" (kept English in both locales — same "names stay English"
    // convention as everything else in this index) — a CP box's rule/army-rule often shares its
    // name (sometimes pre-errata wording) with the faction's normal Codex rule, so without this a
    // CP result and a normal faction-rules result for "Reanimation Protocols" look identical.
    const sectionTitle = `Combat Patrol · ${faction} · ${boxName}`
    if (data.rule && anyNameMatches(q, data.rule.name, data.rule.nameRu)) {
      push(data.rule.name, data.rule.nameRu, `cp-${slug}-rule`, data.rule.id, sectionTitle, slug)
    }
    for (const h of data.rule?.subheadings || []) {
      if (anyNameMatches(q, h.name, h.nameRu)) {
        push(h.name, h.nameRu, `cp-${slug}-rule-${h.id}`, h.id, sectionTitle, slug)
      }
    }
    if (data.armyRule && anyNameMatches(q, data.armyRule.name, data.armyRule.nameRu)) {
      push(data.armyRule.name, data.armyRule.nameRu, `cp-${slug}-army`, data.armyRule.id, sectionTitle, slug)
    }
    for (const h of data.armyRule?.subheadings || []) {
      if (anyNameMatches(q, h.name, h.nameRu)) {
        push(h.name, h.nameRu, `cp-${slug}-army-${h.id}`, h.id, sectionTitle, slug)
      }
    }
    for (const s of data.stratagems) {
      if (anyNameMatches(q, s.name, s.nameRu)) {
        push(s.name, s.nameRu, `cp-${slug}-s-${s.name}`, s.id, sectionTitle, slug)
      }
    }
    for (const e of data.enhancements) {
      if (anyNameMatches(q, e.name, e.nameRu)) {
        push(e.name, e.nameRu, `cp-${slug}-e-${e.name}`, e.id, sectionTitle, slug)
      }
    }
  }
  return results
}

// Built lazily on first search (per locale) so importing this module — and the large
// data files it pulls in — never triggers a synchronous index build at load time. The
// cross-lingual fallback below means a first search of 2+ chars typically ends up
// building BOTH locales' indexes (whichever locale you're in, plus the other one to
// check for an other-language match) — still cheap, still cached after the first time.
const indexCache = { en: null, ru: null }
function getIndex(locale) {
  const key = locale === 'ru' ? 'ru' : 'en'
  return (indexCache[key] ??= buildIndex(key))
}

// id → item lookup per locale, built lazily off getIndex() and cached the same way.
// `id` is always taken from the EN source object regardless of locale (see buildIndex),
// so the EN and RU indexes share the exact same id set at the same conceptual position —
// this is what lets the cross-lingual fallback below map a match in one locale's text
// back to the OTHER locale's displayed item.
const indexByIdCache = { en: null, ru: null }
function getIndexById(locale) {
  const key = locale === 'ru' ? 'ru' : 'en'
  if (!indexByIdCache[key]) {
    const map = new Map()
    for (const item of getIndex(key)) {
      if (item.id) map.set(item.id, item)
    }
    indexByIdCache[key] = map
  }
  return indexByIdCache[key]
}

// Treat 'ё'/'Ё' as 'е'/'Е' for search matching — Russian users almost never type ё,
// even though the indexed rules text (correctly) uses it (e.g. «манёвр»).
function foldYo(s) {
  return s.replace(/ё/g, 'е').replace(/Ё/g, 'Е')
}

// A query that is purely a section number (1–3 groups of 1–2 digits, optional
// trailing dot): "7", "07", "7.2", "07.02", "24.05", "07.". Returns the canonical
// zero-padded form ("7.2" → "07.02") or null if the query isn't a number.
function normalizeSectionNum(q) {
  if (!/^\d{1,2}(\.\d{1,2}){0,2}\.?$/.test(q)) return null
  return q.replace(/\.$/, '').split('.').map(p => p.padStart(2, '0')).join('.')
}

// Section-number search: match against `sectionNum` only (ignoring title/body so
// numbers in rule text don't add noise). Exact match ranks above prefix matches,
// then ordered by sectionNum so the section heading leads its subsections.
function searchBySectionNum(index, q) {
  const results = []
  for (const item of index) {
    if (!item.sectionNum) continue
    const num = normalizeSectionNum(item.sectionNum.toLowerCase())
    if (!num) continue
    let score = 0
    if (num === q) score = 3
    else if (num.startsWith(q + '.')) score = 2
    if (score) results.push({ ...item, snippet: '', score })
  }
  return results
    .sort((a, b) => b.score - a.score || a.sectionNum.localeCompare(b.sectionNum))
    .slice(0, 25)
}

export function search(query, locale = 'en') {
  // Reactive dependency: a caller's computed re-runs when the datasheet/faction-rules/combat-
  // patrol index chunks load (see preloadDatasheetIndex/preloadFactionRulesIndex/
  // preloadCombatPatrolIndex above).
  void dsVersion.value
  void frVersion.value
  void cpVersion.value
  if (!query) return []
  const trimmed = query.trim().toLowerCase()
  const numQuery = normalizeSectionNum(trimmed)
  // Number queries bypass the 2-char minimum so a bare "7" works (→ "07").
  if (numQuery) return searchBySectionNum(getIndex(locale), numQuery)
  if (trimmed.length < 2) return []
  const index = getIndex(locale)
  const q = foldYo(trimmed)
  const results = []
  const matchedIds = new Set()
  for (const item of index) {
    const titleMatch = foldYo(item.title.toLowerCase()).includes(q)
    const bodyMatch = foldYo(item.body.toLowerCase()).includes(q)
    if (titleMatch || bodyMatch) {
      let snippet = ''
      if (bodyMatch) {
        // Position comes from the folded (ё→е) text, but the slice below is taken from
        // the ORIGINAL item.body — foldYo is a 1:1 char replace so indices still line up,
        // and the snippet keeps the correct «манёвр» spelling instead of showing «маневр».
        const pos = foldYo(item.body.toLowerCase()).indexOf(q)
        const start = Math.max(0, pos - 60)
        const end = Math.min(item.body.length, pos + q.length + 80)
        snippet = (start > 0 ? '…' : '') + item.body.slice(start, end) + (end < item.body.length ? '…' : '')
      }
      results.push({ ...item, snippet, score: titleMatch ? 2 : 1 })
      if (item.id) matchedIds.add(item.id)
    }
  }
  // Cross-lingual fallback (works both ways): users often type a term in the OTHER
  // language from the one they're browsing in — an English word while in RU (e.g.
  // "Units" doesn't appear anywhere in «Юниты и модели»), or a Russian word while in EN.
  // Match against the other locale's index too and surface THIS locale's displayed item
  // for the same id (buildIndex always takes `id` from the EN source object regardless
  // of locale, so both indexes share the same id set at the same conceptual position).
  // No snippet: the other-locale match position doesn't correspond to any offset in this
  // locale's (differently worded) body — same as the existing title-only-match case
  // above, which already ships with an empty snippet.
  {
    const otherLocale = locale === 'ru' ? 'en' : 'ru'
    const displayById = getIndexById(locale)
    for (const otherItem of getIndex(otherLocale)) {
      if (!otherItem.id || matchedIds.has(otherItem.id)) continue
      const titleMatch = foldYo(otherItem.title.toLowerCase()).includes(q)
      const bodyMatch = foldYo(otherItem.body.toLowerCase()).includes(q)
      if (!titleMatch && !bodyMatch) continue
      const displayItem = displayById.get(otherItem.id)
      if (!displayItem) continue
      results.push({ ...displayItem, snippet: '', score: titleMatch ? 1 : 0.5 })
      matchedIds.add(otherItem.id)
    }
  }
  // Faction rules (army rule/detachment/stratagem/enhancement names), Combat Patrol names, and
  // datasheet unit names go after the core rules items: with equal scores the stable sort keeps
  // rule-body titles (the app's primary content) above same-scored name-only hits.
  results.push(...searchFactionRules(q, locale))
  results.push(...searchCombatPatrol(q, locale))
  results.push(...searchDatasheets(q, locale))
  // Sort the full match set before slicing — capping earlier (in index order) would drop a
  // later high-relevance title hit before it could be ranked.
  return results.sort((a, b) => b.score - a.score).slice(0, 10)
}

export function highlightMatch(text, query) {
  if (!query || !text) return text
  // Escape regex metacharacters first, then fold е/ё into one character class (the 'gi'
  // flag case-folds it to also match Е/Ё) — so a query typed with plain "е" still
  // highlights the "ё" spelling in the matched text, matching search()'s foldYo().
  const escaped = query
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/[еЕёЁ]/g, '[её]')
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>')
}
