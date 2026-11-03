<template>
  <div class="mrule">
    <div class="mrule-line">
      <button
        type="button"
        class="mrule-head"
        :title="name ? `${label} · ${name}` : label"
        :aria-expanded="open"
        @click="open = !open"
      >
        <ChevronIcon
          class="mrule-chev"
          :turned="open"
        />
        <i
          v-if="icon"
          class="wi mrule-icon"
          :class="`wi-${icon}`"
          aria-hidden="true"
        />
        <span class="mrule-label">{{ label }}</span>
        <span
          v-if="name"
          class="mrule-name"
        >{{ name }}</span>
      </button>
      <!-- What the row sets, beside the fold and outside its button (the Agenda Achieved cards). -->
      <div
        v-if="$slots.aside"
        class="mrule-aside"
      >
        <slot name="aside" />
      </div>
    </div>
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
// join of the tab with what it shows), and a Dominatus Agenda's Agenda Achieved cards under them, with
// their box or count in the row's `aside`. Folded to one row; opened, its text unfolds in place.
import { ref } from 'vue'
import ChevronIcon from '../ChevronIcon.vue'
import CollapseTransition from '../CollapseTransition.vue'

defineProps({
  label: { type: String, required: true },
  name: { type: String, default: '' },
  // What the row is at a glance, before its word: `dom-location` (the deck's Location mark), `lightning`.
  icon: { type: String, default: '' },
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
.mrule-line { display: flex; align-items: center; }
.mrule-aside { flex-shrink: 0; display: flex; align-items: center; gap: 0.5rem; padding-right: 0.7rem; }
.mrule-head {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 44px;
  padding: 0.55rem 0.7rem;
  border: 0;
  background: none;
  font: inherit;
  text-align: left;
  color: var(--text-primary);
  cursor: pointer;
}
.mrule-chev { flex-shrink: 0; font-size: 0.7rem; color: var(--text-muted); }
.mrule-icon { flex-shrink: 0; margin-inline: 0; font-size: 1.3rem; color: var(--accent-ink); }
.mrule-label {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent-ink);
}
/* One row at any width: the name stays whole and the label gives way to it (an ellipsis at
   320px) — the icon before it already says what the row is. */
.mrule-name { flex-shrink: 0; max-width: 70%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 0.86rem; font-weight: 600; }
.mrule-body {
  padding: 0 0.7rem 0.6rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-muted);
}
</style>
