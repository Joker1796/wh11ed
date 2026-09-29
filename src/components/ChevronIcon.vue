<template>
  <i
    class="bi chevron-icon"
    :class="`bi-chevron-${from}`"
    :style="style"
    aria-hidden="true"
  />
</template>

<script setup>
// The fold's arrow, turned rather than swapped. Twenty accordion headers wrote
// `:class="open ? 'bi-chevron-down' : 'bi-chevron-right'"` — one glyph replaced by another in a
// single frame, next to a body that takes a third of a second to open (2026-09-28). This draws
// the `from` glyph and rotates it to `to` while `turned`; everything else (size, colour, margin)
// stays with the caller's own class, which lands on the <i> as before.
//
// The motion is an inline style, not a class: every caller styles its arrow with a scoped class
// of its own, and a rule there setting `transition` would silently beat a global one here.
// `display` is the opposite case and stays OUT of the inline style: a caller hides its arrow at
// some widths (the roster list's narrow pane opens a sheet, not a fold), and an inline
// `display` beat that `display: none` — every hidden arrow came back (2026-09-28).
import { computed } from 'vue'

const props = defineProps({
  turned: { type: Boolean, default: false },
  from: { type: String, default: 'right' },
  to: { type: String, default: 'down' },
})

// Clockwise angle of each glyph from "right".
const DIR = { right: 0, down: 90, left: 180, up: 270 }
const angle = computed(() => {
  const d = (((DIR[props.to] - DIR[props.from]) % 360) + 360) % 360
  return d > 180 ? d - 360 : d
})
const style = computed(() => ({
  transform: props.turned ? `rotate(${angle.value}deg)` : 'none',
  transition: 'transform var(--motion-fold) cubic-bezier(0.4, 0, 0.2, 1)',
}))
</script>

<style>
/* A transform needs a box; the weakest rule there is, so any caller's own `display` wins. */
:where(.chevron-icon) { display: inline-block; }
</style>
