import { ref } from 'vue'
import { coreAbilities } from '../data/reference.js'

const visible = ref(false)
const activeKeyword = ref(null)
const anchor = ref(null)

function lookup(rawText) {
  const text = rawText.toUpperCase().trim()
  let found = coreAbilities.find(a =>
    a.name.replace(/^\[|\]$/g, '').toUpperCase() === text
  )
  if (!found) {
    found = coreAbilities.find(a => {
      const base = a.name.replace(/^\[|\]$/g, '').toUpperCase()
      return text.startsWith(base)
    })
  }
  return found ?? null
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
