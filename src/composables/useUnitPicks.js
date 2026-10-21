import { ref, watch } from 'vue'
import { useMediaQuery } from './useMediaQuery.js'

// Which units a faction's unit list shows, and where (owner, 2026-10-04/05: the way back from a
// unit's page lost the reader's place in a ninety-unit list, so a unit opens where the list is).
// The width the app's pickers switch at (AdaptivePicker) decides how:
//   ▪ a phone — `modalUnit`, the one unit in a modal over the list;
//   ▪ a wide screen — `shown`, one unit beside the list or two side by side. `comparing` is the
//     wait for the second (the plate's ◫, or "Add to compare" on the unit already shown); a pick
//     while two stand there takes the second place.
// Neither changes the address (owner): a unit is shared from its own "…".
//
// A wide screen never leaves the column empty (owner, 2026-10-21): the unit this faction showed
// last in the session (the tab coming back from the rules, from another faction), else `firstId()`.

const lastShown = new Map() // slug → unit id, for the session

/** @param {{ slug: import('vue').Ref<string>, loaded: import('vue').Ref<boolean>,
 *    exists: (id: string) => boolean, firstId: () => string | undefined }} opts */
export function useUnitPicks({ slug, loaded, exists, firstId }) {
  const wide = useMediaQuery('(min-width: 901px)')
  const modalUnit = ref(/** @type {string|null} */ (null))
  const shown = ref(/** @type {string[]} */ ([]))
  const comparing = ref(false)

  // A tap on a unit in the list.
  function open(id) {
    if (!wide.value) { modalUnit.value = id; return }
    const [first] = shown.value
    if (first && (comparing.value || shown.value.length === 2)) {
      if (id !== first) shown.value = [first, id]
      comparing.value = false
      return
    }
    shown.value = [id]
  }
  // "Add to compare": another unit takes the second place; the one already shown waits for a partner.
  function addToCompare(id) {
    const [first] = shown.value
    if (!first || shown.value.includes(id)) { shown.value = [id]; comparing.value = true; return }
    shown.value = [first, id]
    comparing.value = false
  }
  // A unit shown beside the list takes the unit its card links to in its own place.
  function replace(i, id) {
    if (shown.value.includes(id)) return
    shown.value = shown.value.map((x, j) => (j === i ? id : x))
  }
  function close(i) {
    shown.value = shown.value.filter((_, j) => j !== i)
    comparing.value = false
  }
  function toggleCompare() { comparing.value = !comparing.value }

  // Another faction: nothing of the last one stays open.
  function reset() {
    shown.value = []
    comparing.value = false
    modalUnit.value = null
  }

  function showSomething() {
    if (!wide.value || !loaded.value || shown.value.length) return
    const last = lastShown.get(slug.value)
    const id = last && exists(last) ? last : firstId()
    if (id) shown.value = [id]
  }
  watch([wide, loaded], showSomething, { immediate: true })
  watch(shown, (ids) => { if (ids[0]) lastShown.set(slug.value, ids[0]) })

  return { wide, modalUnit, shown, comparing, open, addToCompare, replace, close, toggleCompare, reset }
}
