<template>
  <div class="mrule">
    <button
      type="button"
      class="mrule-head"
      :aria-expanded="open"
      @click="open = !open"
    >
      <ChevronIcon
        class="mrule-chev"
        :turned="open"
      />
      <span class="mrule-label">{{ label }}</span>
      <span class="mrule-name">{{ name }}</span>
    </button>
    <CollapseTransition :show="open">
      <div class="mrule-body">
        <slot />
      </div>
    </CollapseTransition>
  </div>
</template>

<script setup>
// A rule over the whole battle — the twist, a Dominatus Location's war zone — as the first row of
// the missions frame (owner, 2026-11-03: a box of its own between the tab and the frame broke the
// join of the tab with what it shows). Folded to one row; opened, its text unfolds in place.
import { ref } from 'vue'
import ChevronIcon from '../ChevronIcon.vue'
import CollapseTransition from '../CollapseTransition.vue'

defineProps({
  label: { type: String, required: true },
  name: { type: String, default: '' },
})
const open = ref(false)
</script>

<style scoped>
/* Edge to edge in the frame (.side-frame's padding taken back), a hairline under it. */
.mrule {
  margin: -0.4rem -0.7rem 0.5rem;
  border-bottom: 1px solid var(--border);
}
.mrule + .mrule { margin-top: -0.5rem; }
.mrule-head {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  width: 100%;
  min-height: 44px;
  padding: 0.55rem 0.7rem;
  border: 0;
  background: none;
  font: inherit;
  text-align: left;
  color: var(--text-primary);
  cursor: pointer;
}
.mrule-chev { flex-shrink: 0; font-size: 0.7rem; color: var(--text-muted); align-self: center; }
.mrule-label {
  flex-shrink: 0;
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent-ink);
}
.mrule-name { min-width: 0; font-size: 0.86rem; font-weight: 600; }
.mrule-body {
  padding: 0 0.7rem 0.6rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-muted);
}
</style>
