import { ref, watch } from 'vue'

// Keys that outlive a removal, for a list the store keeps as bare values (Miracle dice) or as
// entries with no id of their own (an army's spend history). A removal shifts every index after
// it, so keyed by index the wrong element would leave and the rest would redraw instead of
// sliding (owner, 2026-10-20). The new list is matched to the old in order: an item missing from
// the old run was removed, one past its end was added. Two equal items look the same, so which
// of them keeps a key does not show.
//
// `list` — a getter of the array; `same(a, b)` — whether two items are the same item.
export function useStableKeys(list, same = (a, b) => a === b) {
  const keys = ref([])
  let prev = []
  let next = 0
  watch(list, (now) => {
    const out = []
    let i = 0
    for (const v of now || []) {
      while (i < prev.length && !same(prev[i], v)) i++
      out.push(i < prev.length ? keys.value[i] : `k${next++}`)
      i++
    }
    keys.value = out
    prev = [...(now || [])]
  }, { immediate: true, deep: true })
  return keys
}

// A TransitionGroup's leaving item drops out of the flow (the `list` transition's position:
// absolute); in a flex row or a column with gaps it would fade where it does not stand. Held at
// its own place: `@before-leave="pinLeaving"`, on a container with position: relative.
export function pinLeaving(el) {
  el.style.left = `${el.offsetLeft}px`
  el.style.top = `${el.offsetTop}px`
  el.style.width = `${el.offsetWidth}px`
}
