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

function buildIndex() {
  const items = []
  const sources = [
    { key: 'basicRules', data: basicRules.en },
    { key: 'battleRound', data: battleRound.en },
    { key: 'battlefields', data: battlefields },
    { key: 'advancedRules', data: advancedRules },
  ]
  for (const { key, data } of sources) {
    const route = routeMap[key]
    for (const section of data) {
      if (!section.subsections) continue
      for (const sub of section.subsections) {
        items.push({
          id: sub.id,
          sectionNum: sub.sectionNum || '',
          title: sub.title || '',
          body: sub.body || '',
          route,
          sectionTitle: section.title || '',
        })
      }
    }
  }
  for (const ability of coreAbilities) {
    items.push({
      id: 'ability-' + ability.num.replace('.', '_'),
      sectionNum: ability.num,
      title: ability.name,
      body: ability.fullText + ' ' + (ability.flavor || ''),
      route: '/reference',
      sectionTitle: 'Core Abilities',
    })
  }
  return items
}

const index = buildIndex()

export function search(query) {
  if (!query || query.trim().length < 2) return []
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
