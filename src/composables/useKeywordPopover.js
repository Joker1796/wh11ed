import { ref } from 'vue'
import { coreAbilities } from '../data/reference.js'
import { eventCompanion } from '../data/eventCompanion.js'
import { useLocale } from './useLocale.js'

const visible = ref(false)
const activeKeyword = ref(null)
const anchor = ref(null)

const { locale } = useLocale()

const bare = name => name.replace(/^\[|\]$/g, '').toUpperCase()

function lookup(rawText) {
  const text = rawText.toUpperCase().trim()
  const base = coreAbilities.en
  let idx = base.findIndex(a => bare(a.name) === text)
  if (idx === -1) idx = base.findIndex(a => text.startsWith(bare(a.name)))
  if (idx !== -1) {
    return locale.value === 'ru'
      ? { ...base[idx], ...coreAbilities.ru[idx] }
      : base[idx]
  }

  // Event Companion glossary (EN fallback; RU pass pending).
  const glossary = eventCompanion.en.glossary || []
  return glossary.find(g => bare(g.name) === text)
    || glossary.find(g => text.startsWith(bare(g.name)))
    || null
}

export function useKeywordPopover() {
  function open(rawText, rect) {
    const found = lookup(rawText)
    if (!found) return
    activeKeyword.value = found
    anchor.value = rect
    visible.value = true
  }
  function close() {
    visible.value = false
  }
  return { visible, activeKeyword, anchor, open, close }
}
