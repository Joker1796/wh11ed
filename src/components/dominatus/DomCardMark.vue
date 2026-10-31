<template>
  <div class="dmark">
    <button
      v-for="m in marks"
      :key="m.cls"
      type="button"
      class="dmark-btn"
      data-kw-open
      aria-haspopup="dialog"
      :aria-label="m.note.name"
      @click.stop="show(m, $event)"
      @mouseenter="hover && show(m, $event)"
      @mouseleave="hover && close()"
    >
      <i
        class="wi"
        :class="m.cls"
      />
    </button>
  </div>
</template>

<script setup>
// The marks a Dominatus card prints in its corner: what kind of card it is, the campaign phase it
// belongs to (its numeral in the card's frame) and the Alliance whose card it is. Each says what it
// means in the rules popover — on a tap, and on a desk also under the pointer (owner, 2026-10-31):
// its name and the booklet's words on it (`markNote`).
import { computed } from 'vue'
import { useDominatus } from './useDominatus.js'
import { useKeywordPopover } from '../../composables/useKeywordPopover.js'
import { useMediaQuery } from '../../composables/useMediaQuery.js'

const props = defineProps({
  kind: { type: String, required: true }, // agenda | briefing | honour | skill | relic | location
  phase: { type: Number, default: 0 },
  alliance: { type: String, default: '' },
})
const { markNote } = useDominatus()
const { openRule, close } = useKeywordPopover()
const hover = useMediaQuery('(hover: hover)')

const marks = computed(() => [
  { cls: `dmark-kind wi-dom-${props.kind}`, note: markNote({ kind: props.kind }) },
  props.phase && { cls: `dmark-phase wi-dom-phase-${props.phase}`, note: markNote({ phase: props.phase }) },
  props.alliance && { cls: `dmark-ally wi-dom-${props.alliance}`, note: markNote({ alliance: props.alliance }) },
].filter(Boolean))

function show(m, e) {
  openRule(m.note.name, m.note.text, e.currentTarget.getBoundingClientRect())
}
</script>

<style scoped>
.dmark-btn {
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: help;
}
</style>
