<template>
  <BaseModal @close="$emit('close')">
    <template #header>
      <header class="modal-head">
        <h3 class="mh-title">{{ labels.trackerDpBudget }}</h3>
        <div class="mh-right">
          <em class="dp-modal-count" :class="{ over: dpSpent > maxDp && !overAllowed }">{{ dpSpent }} / {{ maxDp }} DP</em>
          <button class="mh-close" @click="$emit('close')" :aria-label="labels.modalClose">✕</button>
        </div>
      </header>
    </template>

    <div class="modal-body">
      <button
        v-for="d in detachments"
        :key="d.name"
        class="det"
        :class="{ on: selected.includes(d.name) }"
        :disabled="!selected.includes(d.name) && selected.length > 0 && dpSpent + d.dp > maxDp"
        @click="$emit('toggle', d)"
      >
        <span class="det-name">{{ d.name }}</span>
        <span class="det-meta">{{ d.dp }}DP · {{ d.forceDisposition }}</span>
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  detachments: { type: Array, required: true },
  selected:    { type: Array, required: true },
  maxDp:       { type: Number, required: true },
  dpSpent:     { type: Number, required: true },
})
defineEmits(['toggle', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// A single Detachment is always allowed even over budget (see the toggle-disable rule
// below) — not official yet, but GW has said it's fine as long as it's the only one taken.
// Don't flag that legal case as an error.
const overAllowed = computed(() => props.selected.length === 1 && props.dpSpent > props.maxDp)
</script>

<style scoped>
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
.dp-modal-count {
  font-size: 0.82rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  font-style: normal;
}
.dp-modal-count.over { color: #c0392b; }
[data-theme='dark'] .dp-modal-count.over { color: #ef6e60; }

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.75rem;
  overflow-y: auto;
}

.det {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  text-align: left;
  padding: 0.4rem 0.55rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  width: 100%;
}
.det:hover:not(:disabled) { border-color: var(--accent); }
.det.on { background: color-mix(in srgb, var(--accent) 16%, transparent); border-color: var(--accent); }
.det:disabled { opacity: 0.4; cursor: not-allowed; }
.det-name { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.det-meta { font-size: 0.7rem; color: var(--text-dim); font-family: var(--font-mono); }
</style>
