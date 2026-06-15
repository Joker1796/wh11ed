import { basicRules } from '../data/basicRules.js'
import { battleRound } from '../data/battleRound.js'
import { battlefields } from '../data/battlefields.js'
import { advancedRules } from '../data/advancedRules.js'
import { coreAbilities } from '../data/reference.js'

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
  return items
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
