<template>
  <!-- A faction's unit search: the box, and the faction's own example queries typed into it while
       it is empty (useUnitSearchGhost — stopped while the box is off screen or the tab hidden). One
       box for the two lists that search units, the faction page's and the roster catalogue's. -->
  <div
    ref="el"
    class="typing-field usf"
  >
    <input
      v-model="query"
      type="search"
      class="usf-input"
      :class="inputClass"
      :data-tour="tour || undefined"
      :placeholder="typing ? '' : placeholder"
      :aria-label="placeholder"
      autocomplete="off"
    >
    <TypingGhost
      v-if="typing && !query"
      :ghost="ghost"
    />
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue'
import TypingGhost from './TypingGhost.vue'
import { useLocale } from '../composables/useLocale.js'
import { useUnitSearchGhost } from '../composables/useUnitSearchExamples.js'

const props = defineProps({
  slug: { type: String, required: true },
  placeholder: { type: String, required: true },
  // The input's own class, for a caller (and its tests) that names the box.
  inputClass: { type: String, default: '' },
  // The tour's handle on the box (data-tour), where a chapter points at it.
  tour: { type: String, default: '' },
})
const query = defineModel({ type: String, default: '' })

const { locale } = useLocale()
const el = ref(null)
const { ghost, typing } = useUnitSearchGhost({ slug: toRef(props, 'slug'), locale, query, el })
</script>

<style scoped>
/* The box's size and ground are the caller's (custom properties on this root; a narrow roster pane
   steps them down), and the typed examples sit exactly where the caret would — one padding for both. */
.usf {
  --typing-pad: calc(var(--usf-pad-y, 0.5rem) + 1px) calc(var(--usf-pad-x, 0.7rem) + 1px);
  --typing-size: var(--usf-size, 0.9rem);
}
.usf-input {
  padding: var(--usf-pad-y, 0.5rem) var(--usf-pad-x, 0.7rem);
  font-size: var(--usf-size, 0.9rem);
  color: var(--text-primary);
  background: var(--usf-bg, var(--bg-card));
  border: 1px solid var(--border);
}
.usf-input:focus {
  outline: none;
  border-color: var(--accent);
}
</style>
