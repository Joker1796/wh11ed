<template>
  <!-- Angular 40k-style page tabs. Two shapes of tab, one look: a router-linked tab (`to`)
       for pages that are separate routes, a plain button (`key`) for an in-page switch. -->
  <nav class="page-tabs" :aria-label="ariaLabel" :role="asTablist ? 'tablist' : undefined">
    <template v-for="t in tabs" :key="t.key || t.to">
      <RouterLink v-if="t.to" :to="t.to" class="page-tab" :class="{ active: t.active }">
        <i v-if="t.icon" class="page-tab-icon" :class="t.icon"></i>{{ t.label }}
        <span v-if="t.count != null" class="page-tab-n">{{ t.count }}</span>
      </RouterLink>
      <button
        v-else
        type="button"
        class="page-tab"
        :class="{ active: t.active }"
        role="tab"
        :aria-selected="!!t.active"
        @click="emit('select', t.key)"
      >
        <i v-if="t.icon" class="page-tab-icon" :class="t.icon"></i>{{ t.label }}
        <span v-if="t.count != null" class="page-tab-n">{{ t.count }}</span>
      </button>
    </template>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

// Which tab is open is the caller's business (a route prefix here, a ref there), so every tab
// arrives with its own `active` — this component only draws them.
const props = defineProps({
  // [{ key?, to?, label, icon?, count?, active? }]
  tabs: { type: Array, required: true },
  ariaLabel: { type: String, default: '' },
})
const emit = defineEmits(['select'])

// Links are navigation, not a tablist; buttons switching one panel are. A mixed set is not a
// thing we do, so the whole nav follows whichever it is.
const asTablist = computed(() => props.tabs.every((t) => !t.to))
</script>

<style scoped>
/* Classic folder tabs, square corners: the closed (inactive) tabs are recessed
   (--bg-secondary) boxes whose bottom sits flush with a full-width accent line; the open
   (active) tab is a content-coloured (--bg-primary) box with an accent frame whose bottom
   border matches the content, erasing the line under it so it merges into the content. The
   open/closed states are told apart by their background colour.
   --accent is inherited, so the faction pages get these tabs in their own colour for free. */
.page-tabs {
  display: flex;
  gap: 0;
  /* full-width accent line the tabs sit on */
  border-bottom: 1px solid var(--accent);
}

.page-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-muted);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-bottom: 1px solid var(--accent);
  padding: 0.55rem 1.3rem;
  margin-bottom: -1px; /* overlap the container's accent line */
  text-decoration: none;
  cursor: pointer;
  transition: color var(--motion-fast), background var(--motion-fast), border-color var(--motion-fast);
}

.page-tab:hover {
  color: var(--text-primary);
}

.page-tab.active {
  color: var(--accent);
  background: var(--bg-primary);
  border-color: var(--accent);
  border-bottom-color: var(--bg-primary); /* erase the accent line under the open tab → merge with content */
}

/* Slightly smaller than the tab text so the display-font label stays the anchor. */
.page-tab-icon {
  font-size: 0.9em;
}

/* A count is a footnote to the label, not part of it — same monospace treatment the roster
   cards use for their numbers. */
.page-tab-n {
  font-family: var(--font-mono);
  font-size: 0.72em;
  opacity: 0.75;
}

@media (max-width: 640px) {
  /* Three tabs share the row on the faction pages — tighten them so they fit on a phone
     without scrolling. */
  .page-tab {
    flex: 1 1 0;
    justify-content: center;
    gap: 0.35rem;
    font-size: 1rem;
    padding: 0.5rem 0.4rem;
  }
}
</style>
