<template>
  <button
    type="button"
    class="dmc"
    data-kw-open
    aria-haspopup="dialog"
    :aria-label="`${note.name}: ${n}`"
    @click.stop="show"
    @mouseenter="hover && show($event)"
    @mouseleave="hover && close()"
  >
    <i
      class="wi"
      :class="`wi-dom-${kind}`"
    /><span>{{ n }}</span>
  </button>
</template>

<script setup>
// A count of a deck's cards by its mark (a player's Agenda Achieved, an Alliance's): what the mark
// means opens in the rules popover, on a tap and on a desk under the pointer, as a card's corner
// mark does (DomCardMark, owner 2026-11-05).
import { computed } from 'vue'
import { useDominatus } from './useDominatus.js'
import { useKeywordPopover } from '../../composables/useKeywordPopover.js'
import { useMediaQuery } from '../../composables/useMediaQuery.js'

const props = defineProps({
  kind: { type: String, required: true },
  n: { type: Number, required: true },
})
const { markNote } = useDominatus()
const { openRule, close } = useKeywordPopover()
const hover = useMediaQuery('(hover: hover)')
const note = computed(() => markNote({ kind: props.kind }))

function show(e) {
  openRule(note.value.name, note.value.text, e.currentTarget.getBoundingClientRect())
}
</script>

<style scoped>
.dmc {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  font-family: var(--font-num);
  font-weight: 700;
  color: var(--text-primary);
  cursor: help;
}
.dmc .wi { flex: none; width: 1.1rem; height: 1.1rem; margin: 0; }
</style>
