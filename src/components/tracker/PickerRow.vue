<template>
  <!-- One row of a tracker picker: a name that expands to the full card, and a Select button
       glued to its right. Three modals draw exactly this list (missions, secondaries, twists) and
       used to carry three copies of the markup and of the seven `.tp-*` rules under it. -->
  <div class="tp-item" :class="{ on: selected }">
    <div class="tp-row">
      <button class="tp-toggle" :aria-expanded="open" @click="$emit('toggle-open')">
        <span class="tp-name">{{ name }}</span>
        <i class="bi tp-chev" :class="open ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
      </button>
      <button class="tp-pick" :class="{ on: selected }" :disabled="disabled" @click="$emit('pick')">
        {{ selected ? '✓ ' : '' }}{{ labels.trackerSelect }}
      </button>
    </div>
    <CollapseTransition :show="open">
      <!-- Whatever the picker shows about this entry — a MissionCard, a rule body. It renders in
           the CONSUMER's scope, so its styling stays with the modal that supplies it. -->
      <div class="tp-body"><slot /></div>
    </CollapseTransition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CollapseTransition from '../CollapseTransition.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

// Open/selected state belongs to the list, not the row: only the modal knows that opening one
// entry closes the others, and only it knows whether picking is single- or multi-choice.
defineProps({
  name: { type: String, required: true },
  open: { type: Boolean, default: false },
  selected: { type: Boolean, default: false },
  // Multi-pick lists lock the unselected rows once the cap is reached.
  disabled: { type: Boolean, default: false },
})
defineEmits(['toggle-open', 'pick'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.tp-item {
  border: 1px solid var(--border);
  margin-bottom: 0.5rem;
  overflow: hidden;
  background: var(--bg-secondary);
}
.tp-item.on { border-color: var(--accent); }
.tp-row { display: flex; align-items: stretch; gap: 0.4rem; }
.tp-toggle {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-height: 48px;
  padding: 0.5rem 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-display);
  font-size: 1.10rem;
  font-weight: 500;
  color: var(--text-primary);
}
.tp-chev { color: var(--text-dim); font-size: 0.9rem; }
.tp-pick {
  flex-shrink: 0;
  min-height: 48px;
  padding: 0 0.85rem;
  border: none;
  border-left: 1px solid var(--border);
  background: none;
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}
.tp-pick:hover:not(:disabled) { background: color-mix(in srgb, var(--accent) 10%, transparent); }
.tp-pick:disabled { color: var(--text-dim); cursor: not-allowed; }
.tp-pick.on { background: var(--accent); color: var(--text-on-accent); }

/* Just the frame around whatever the consumer slots in — the type is the content's own business
   (a MissionCard brings its own; TwistPickerModal wraps raw rule text in .tw-body). */
.tp-body { padding: 0.2rem 0.6rem 0.7rem; border-top: 1px solid var(--border); }
</style>
