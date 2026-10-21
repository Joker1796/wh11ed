import { ref, watch } from 'vue'

// Folded groups of a faction's list (owner, 2026-10-21): open by default, what the reader folds is
// kept per faction for the session, and `allOpen()` (a search under way) opens every one — nothing
// a search found may hide in a folded group.

const foldedBySlug = new Map() // slug → Set of folded group keys

/** @param {import('vue').Ref<string>} slug  @param {() => boolean} allOpen */
export function useGroupFolds(slug, allOpen) {
  const folded = ref(new Set())
  watch(slug, (s) => { folded.value = new Set(foldedBySlug.get(s) || []) }, { immediate: true })

  const isOpen = (key) => allOpen() || !folded.value.has(key)
  function toggle(key) {
    const next = new Set(folded.value)
    if (isOpen(key)) next.add(key)
    else next.delete(key)
    folded.value = next
    foldedBySlug.set(slug.value, next)
  }
  return { isOpen, toggle }
}
