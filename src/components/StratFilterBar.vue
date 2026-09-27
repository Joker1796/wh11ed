<template>
  <!-- The stratagem toolbar: which deck (a game on) and the flat list ↔ grouped-by-phase toggle.
       One component for the Stratagems page and the tracker's CP tab, so the two filter the same
       way and look the same. -->
  <div class="strat-toolbar">
    <div
      v-if="filters.length"
      class="strat-filters"
      role="tablist"
    >
      <button
        v-for="f in filters"
        :key="f.key"
        class="strat-filter"
        :class="{ active: filter === f.key }"
        role="tab"
        :aria-selected="filter === f.key"
        @click="$emit('update:filter', f.key)"
      >
        {{ f.label }}
      </button>
    </div>
    <div class="strat-right">
      <!-- Optional: only what can be played in the slot a live game stands on (the roster
           screen). Offered when the caller says there is such a slot. -->
      <button
        v-if="nowAvailable"
        type="button"
        class="strat-toggle now-toggle"
        :class="{ active: nowOnly }"
        :aria-pressed="nowOnly"
        @click="$emit('update:nowOnly', !nowOnly)"
      >
        <i class="bi bi-hourglass-split" />
        <span class="strat-toggle-label">{{ labels.stratNowOnly }}</span>
      </button>
      <button
        type="button"
        class="strat-toggle"
        :class="{ active: byPhase }"
      :aria-pressed="byPhase"
      :aria-label="byPhase ? labels.stratGroupAsList : labels.stratGroupByPhase"
      @click="$emit('update:byPhase', !byPhase)"
    >
      <i
        class="bi"
        :class="byPhase ? 'bi-list-ul' : 'bi-collection'"
      />
      <span class="strat-toggle-label">{{ byPhase ? labels.stratGroupAsList : labels.stratGroupByPhase }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

defineProps({
  filters: { type: Array, default: () => [] }, // [{ key, label }] — none: no deck row
  filter: { type: String, default: '' },
  byPhase: { type: Boolean, default: false },
  nowAvailable: { type: Boolean, default: false },
  nowOnly: { type: Boolean, default: false },
})
defineEmits(['update:filter', 'update:byPhase', 'update:nowOnly'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.strat-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
.strat-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.strat-filter,
.strat-toggle {
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast);
}
/* The toggles sit on the right even when there's no filter row (no game). */
.strat-right { margin-left: auto; display: flex; gap: 0.5rem; }
.strat-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.strat-filter:hover,
.strat-toggle:hover {
  color: var(--text-primary);
  border-color: var(--accent);
}
.strat-filter.active,
.strat-toggle.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
/* Narrow phones: with a game on there are 4 toolbar buttons (3 filters + the toggle),
   which wrap to a second row. Compact them so they fit one line — tighter filter pills
   and an icon-only toggle (its text label is the widest of the lot). */
@media (max-width: 480px) {
  .strat-toolbar { gap: 0.4rem; }
  .strat-filters { gap: 0.3rem; }
  .strat-filter { padding: 0.35rem 0.6rem; font-size: 0.75rem; }
  .strat-toggle { padding: 0.35rem 0.55rem; }
  .strat-toggle-label { display: none; }
}
</style>
