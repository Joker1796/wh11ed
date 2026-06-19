import { basicRules } from '../data/basicRules.js'
import { battleRound } from '../data/battleRound.js'
import { battlefields } from '../data/battlefields.js'
import { advancedRules } from '../data/advancedRules.js'
import { coreAbilities } from '../data/reference.js'
import { getEventContent } from '../data/eventCompanion.js'
import { ui } from '../i18n/ui.js'

const routeMap = {
  basicRules: '/basic-rules',
  battleRound: '/battle-round',
  battlefields: '/battlefields',
  advancedRules: '/advanced-rules',
  reference: '/reference',
}

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
    .replace(/\((\d{2}\.\d{2})\)/g, '($1)')
    .trim()
}

function buildIndex(locale) {
  const isRu = locale === 'ru'
  const items = []
  const sources = [
    { key: 'basicRules', enData: basicRules.en, ruData: basicRules.ru },
    { key: 'battleRound', enData: battleRound.en, ruData: battleRound.ru },
    { key: 'battlefields', enData: battlefields.en, ruData: battlefields.ru },
    { key: 'advancedRules', enData: advancedRules.en, ruData: advancedRules.ru },
  ]
  for (const { key, enData, ruData } of sources) {
    const route = routeMap[key]
    for (let si = 0; si < enData.length; si++) {
      const enSection = enData[si]
      const ruSection = isRu && ruData ? (ruData[si] || {}) : {}
      if (!enSection.subsections) continue
      const sectionTitle = (isRu && ruSection.title) ? ruSection.title : (enSection.title || '')
      const ruSubs = (isRu && ruSection.subsections) ? ruSection.subsections : []
      for (let i = 0; i < enSection.subsections.length; i++) {
        const enSub = enSection.subsections[i]
        if (!enSub.sectionNum) continue
        const ruSub = ruSubs[i] || {}
        const merged = isRu ? { ...enSub, ...ruSub } : enSub
        items.push({
          id: enSub.id,
          sectionNum: enSub.sectionNum,
          title: merged.title || '',
          body: stripMarkup((merged.body || '') + (merged.note ? ' ' + merged.note : '')),
          route,
          sectionTitle,
        })
      }
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
      route: '/reference',
      sectionTitle: sectionTitles[locale].reference,
    })
  }
  indexEventCompanion(items, locale)
  return items
}

// Event Companion lives in a different data shape ({ en, ru } objects rather than
// Section[] arrays), so it gets its own walker. Blocks with a real DOM id (sequence
// steps, pairings) deep-link and scroll; synthetic `ec-*` ids land on the page top.
function indexEventCompanion(items, locale) {
  const ec = getEventContent(locale)
  const L = ui[locale]
  const add = (id, title, parts, route, sectionTitle) => {
    const body = stripMarkup(parts.filter(Boolean).join('\n'))
    if (!title && !body) return
    items.push({ id, sectionNum: '', title: title || '', body, route, sectionTitle })
  }
  const rowsText = tbl => (tbl && tbl.rows ? tbl.rows.map(r => r.join(' ')).join('\n') : '')
  const t = ec.terrain
  const legendText = (t.legend || []).map(l => `${l.label} ${l.desc || ''}`)
  const dispoText = (ec.dispositions || []).map(d => d.name)

  // Landing entry per page, titled with the page heading so the heading itself is
  // searchable (e.g. "Mission Matrix" / "Матрица миссий"). The intro page reuses its
  // real DOM id ('introduction') so it scrolls; the rest land on the page top.
  const intro = ec.sequence.introduction
  add(intro.id, L.eventIntroHeading, [L.eventIntroDesc, intro.body, intro.note],
    '/event-companion', L.eventIntroHeading)
  add('ec-page-sequence', L.eventSequenceHeading, [L.eventSequenceDesc, ec.sequence.intro],
    '/event-companion/sequence', L.eventSequenceHeading)
  add('ec-page-layouts', L.eventLayoutsHeading, [L.eventLayoutsDesc, t.intro, t.keyNote],
    '/event-companion/layouts', L.eventLayoutsHeading)
  add('ec-page-matrix', L.eventMatrixHeading, [L.eventMatrixHint, ...dispoText, ...legendText],
    '/event-companion/matrix', L.eventMatrixHeading)
  add('ec-page-pairings', L.eventPairingsHeading, [L.eventPairingsDesc, ec.pairings.intro],
    '/event-companion/pairings', L.eventPairingsHeading)
  add('ec-page-faq', L.eventFaqHeading, [L.eventFaqDesc, ec.faq.intro, ec.faq.errata],
    '/event-companion/faq', L.eventFaqHeading)

  // Mission Sequence page — main steps, secondary rules, designer notes
  const seqRoute = '/event-companion/sequence'
  const seqBlocks = [
    ...(ec.sequence.blocks || []),
    ...(ec.sequence.secondary || []),
    ...(ec.sequence.designerNotes || []),
  ]
  for (const b of seqBlocks) {
    const table = b.table ? [b.table.title, rowsText(b.table)] : []
    add(b.id, b.title, [b.body, b.note, ...table, b.tableNote], seqRoute, L.eventSequenceHeading)
  }

  // Terrain Layouts page — footprints table (lands on page top)
  if (t.footprints) {
    add('ec-footprints', t.footprints.title, [rowsText(t.footprints), t.footprints.footnote],
      '/event-companion/layouts', L.eventLayoutsHeading)
  }

  // Pairings & Rankings page
  for (const b of ec.pairings.blocks || []) {
    add(b.id, b.title, [b.body, b.note], '/event-companion/pairings', L.eventPairingsHeading)
  }

  // Errata & FAQs page (no per-item DOM ids → synthetic)
  ;(ec.faq.items || []).forEach((item, i) => {
    add('ec-faq-' + i, item.q, [item.a], '/event-companion/faq', L.eventFaqHeading)
  })
}

const indexEn = buildIndex('en')
const indexRu = buildIndex('ru')

export function search(query, locale = 'en') {
  if (!query || query.trim().length < 2) return []
  const index = locale === 'ru' ? indexRu : indexEn
  const q = query.trim().toLowerCase()
  const results = []
  for (const item of index) {
    const titleMatch = item.title.toLowerCase().includes(q)
    const bodyMatch = item.body.toLowerCase().includes(q)
    if (titleMatch || bodyMatch) {
      let snippet = ''
      if (bodyMatch) {
        const pos = item.body.toLowerCase().indexOf(q)
        const start = Math.max(0, pos - 60)
        const end = Math.min(item.body.length, pos + q.length + 80)
        snippet = (start > 0 ? '…' : '') + item.body.slice(start, end) + (end < item.body.length ? '…' : '')
      }
      results.push({ ...item, snippet, score: titleMatch ? 2 : 1 })
    }
    if (results.length >= 20) break
  }
  return results.sort((a, b) => b.score - a.score).slice(0, 10)
}

export function highlightMatch(text, query) {
  if (!query || !text) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>')
}
