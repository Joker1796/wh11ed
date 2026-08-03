<template>
  <BaseModal @close="$emit('close')">
    <template #header>
      <header class="modal-head">
        <h3 class="mh-title">{{ title }}</h3>
        <div class="mh-right">
          <em class="pool" :title="labels.trackerArmyRemaining">{{ remaining }}</em>
          <button class="mh-close" @click="$emit('close')" :aria-label="labels.modalClose">✕</button>
        </div>
      </header>
    </template>

    <div class="modal-body">
      <!-- Tap a unit to spend its cost. The pool (remaining) updates live, so several units can be
           brought back without closing; an entry the pool can't afford is disabled. -->
      <button
        v-for="(s, i) in spends"
        :key="i"
        class="opt"
        :disabled="remaining < s.cost"
        @click="$emit('spend', s)"
      >
        <span class="opt-name">{{ s.label }}</span>
        <span class="opt-cost">−{{ s.cost }}</span>
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
// Spend picker for the `counter` primitive's `spends` (Genestealer Cults' resurrect costs). Tapping
// an entry emits `spend(s)` with the whole `{ label, cost }` — the parent both subtracts the cost
// from the pool and records the entry (see resurrectArmyUnit in useTracker.js). `remaining` is the
// live pool so entries re-disable as it drops. Structure/tokens mirror ArmyMultiPickerModal.
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({
  title:     { type: String, required: true },
  spends:    { type: Array, required: true },
  remaining: { type: Number, required: true },
})
defineEmits(['spend', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
/* Header mirrors the other tracker picker modals (ArmyMultiPickerModal / DetachmentPickerModal). */
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.8rem 0.9rem;
  border-bottom: 1px solid var(--border);
}
.mh-title { font-family: var(--font-display); font-size: 1.49rem; font-weight: 500; color: var(--text-primary); margin: 0; }
.mh-right { display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0; }
.mh-close {
  background: none; border: none; color: var(--text-muted);
  font-size: 1.1rem; cursor: pointer; min-width: 36px; min-height: 36px; border-radius: 4px;
}
.mh-close:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }
/* Remaining-pool badge (the resource being spent). */
.pool { font-size: 1rem; font-family: var(--font-mono); font-weight: 700; color: var(--accent); font-style: normal; }

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.75rem;
  overflow-y: auto;
}

/* Rows use the same tokens as the other tracker pickers; `color` is set explicitly because a
   <button> does NOT inherit it. */
.opt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  width: 100%;
  padding: 0.6rem 0.7rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  color: var(--text-primary);
  transition: background 0.15s, border-color 0.15s;
}
.opt:hover:not(:disabled) { border-color: var(--accent); }
.opt:disabled { opacity: 0.45; cursor: default; }

.opt-name { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); overflow-wrap: anywhere; }
.opt-cost {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent);
}
.opt:disabled .opt-cost { color: var(--text-dim); }
</style>
