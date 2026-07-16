<template>
  <BaseModal :title="labels.factionDetachments" max-width="480px" @close="$emit('close')">
    <div class="fdp-body">
      <button
        v-for="d in detachments"
        :key="d.id"
        type="button"
        class="fdp-item"
        :class="{ on: d.id === activeId }"
        @click="$emit('pick', d.id)"
      >
        <span class="fdp-heading">
          <span class="fdp-name">{{ d.name }}</span>
          <span v-if="d.nameRu" class="fdp-name-ru">{{ d.nameRu }}</span>
        </span>
        <span v-if="d.dp || d.forceDisposition || d.unique" class="fdp-meta">
          <span v-if="d.dp" class="fdp-meta-item">{{ d.dp }} DP</span>
          <span v-if="d.forceDisposition" class="fdp-meta-item">{{ d.forceDisposition }}</span>
          <span v-if="d.unique" class="fdp-meta-item fdp-meta-unique">Unique: {{ d.unique }}</span>
        </span>
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

defineProps({
  detachments: { type: Array, required: true },
  activeId: { type: String, default: null },
})
defineEmits(['pick', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.fdp-body {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.75rem;
  overflow-y: auto;
}

.fdp-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  width: 100%;
  min-height: 44px;
  padding: 0.5rem 0.65rem;
  text-align: left;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color var(--motion-fast), background var(--motion-fast);
}

.fdp-item:hover {
  border-color: var(--accent);
}

.fdp-item.on {
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  border-color: var(--accent);
}

.fdp-heading {
  display: flex;
  flex-direction: column;
}

.fdp-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

/* RU translation of the detachment name — small muted line under the English name */
.fdp-name-ru {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-muted);
  opacity: 0.8;
}

.fdp-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.fdp-meta-item {
  font-size: 0.64rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--text-muted);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 2px 6px;
}

.fdp-meta-unique {
  color: var(--accent);
  border-color: var(--accent);
}
</style>
