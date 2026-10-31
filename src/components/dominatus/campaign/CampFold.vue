<template>
  <div class="cfold">
    <button
      type="button"
      class="cfold-head"
      :aria-expanded="open"
      @click="toggle"
    >
      {{ label }}
      <ChevronIcon :turned="open" />
    </button>
    <CollapseTransition :show="open">
      <div class="cfold-body">
        <slot />
      </div>
    </CollapseTransition>
  </div>
</template>

<script setup>
// A fold on the campaign pages (entering a battle, the links, sending a game): the app's fold —
// CollapseTransition with ChevronIcon under a one-row head — in place of the browser's <details>,
// which opened with a jump and no sound.
import { ref, watch } from 'vue'
import ChevronIcon from '../../ChevronIcon.vue'
import CollapseTransition from '../../CollapseTransition.vue'

const props = defineProps({
  label: { type: String, required: true },
  startOpen: { type: Boolean, default: false },
})
const open = ref(props.startOpen)
// `startOpen` may settle after mount (the log read in); it decides until the reader has used the fold.
let touched = false
watch(() => props.startOpen, (v) => { if (!touched) open.value = v })
function toggle() {
  open.value = !open.value
  touched = true
}
</script>

<style scoped>
.cfold { margin-top: 0.5rem; border-top: 1px dashed var(--border); }
.cfold-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  min-height: 2.2rem;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  cursor: pointer;
}
.cfold-body { padding-bottom: 0.4rem; }
</style>
