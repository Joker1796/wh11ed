<template>
  <BaseModal @close="$emit('close')">
    <template #header>
      <span class="dp-modal-title">{{ labels.trackerDpBudget }}</span>
      <em class="dp-modal-count" :class="{ over: dpSpent > maxDp }">{{ dpSpent }} / {{ maxDp }} DP</em>
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

defineProps({
  detachments: { type: Array, required: true },
  selected:    { type: Array, required: true },
  maxDp:       { type: Number, required: true },
  dpSpent:     { type: Number, required: true },
})
defineEmits(['toggle', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.dp-modal-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 500;
}
.dp-modal-count {
  margin-left: 0.5rem;
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
