<template>
  <BaseModal :title="labels.rosterIssuesTitle" max-width="480px" @close="$emit('close')">
    <div class="modal-body ri">
      <p v-if="!issues.length" class="ri-clean">
        <i class="bi bi-check-circle-fill"></i> {{ labels.rosterNoIssues }}
      </p>
      <button
        v-for="(iss, i) in sorted"
        :key="i"
        type="button"
        class="ri-item"
        :class="iss.level"
        @click="iss.uid && $emit('goto', iss.uid)"
      >
        <i class="bi" :class="iss.level === 'error' ? 'bi-x-octagon-fill' : 'bi-exclamation-triangle-fill'"></i>
        <span class="ri-msg">{{ message(iss) }}</span>
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
  issues: { type: Array, default: () => [] },
})
defineEmits(['goto', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Errors first, then warnings.
const sorted = computed(() =>
  [...props.issues].sort((a, b) => (a.level === b.level ? 0 : a.level === 'error' ? -1 : 1)))

function message(iss) {
  const tpl = labels.value[`issue_${iss.code}`] || iss.code
  const p = iss.params || {}
  return tpl.replace(/\{(\w+)\}/g, (_, k) => (p[k] ?? ''))
}
</script>

<style scoped>
.ri { display: flex; flex-direction: column; gap: 0.4rem; padding: 0.75rem; overflow-y: auto; }
.ri-clean { display: flex; align-items: center; gap: 0.4rem; color: var(--text-muted); }
.ri-clean .bi { color: #3c9a5f; }
.ri-item {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  width: 100%;
  text-align: left;
  padding: 0.55rem 0.65rem;
  border: 1px solid var(--border);
  border-left-width: 3px;
  background: var(--bg-secondary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}
.ri-item.error { border-left-color: #c0392b; }
.ri-item.warn { border-left-color: #d98a2b; }
.ri-item .bi { margin-top: 0.1rem; flex-shrink: 0; }
.ri-item.error .bi { color: #c0392b; }
.ri-item.warn .bi { color: #d98a2b; }
.ri-msg { color: var(--text-primary); }
</style>
