import { ref } from 'vue'
import { coreAbilities } from '../data/reference.js'
import { useLocale } from './useLocale.js'

const visible = ref(false)
const activeKeyword = ref(null)
const anchor = ref(null)

const { locale } = useLocale()

function lookup(rawText) {
  const text = rawText.toUpperCase().trim()
  const base = coreAbilities.en
  let idx = base.findIndex(a =>
    a.name.replace(/^\[|\]$/g, '').toUpperCase() === text
  )
  if (idx === -1) {
    idx = base.findIndex(a => {
      const base2 = a.name.replace(/^\[|\]$/g, '').toUpperCase()
      return text.startsWith(base2)
    })
  }
  if (idx === -1) return null
  return locale.value === 'ru'
    ? { ...base[idx], ...coreAbilities.ru[idx] }
    : base[idx]
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
