<template>
  <BaseModal :title="labels.navFactions" @close="$emit('close')">
    <div class="modal-body">
      <template v-for="g in factionGroups" :key="g.id">
        <h4 class="fp-group">{{ labels[groupLabelKey(g.id)] }}</h4>
        <template v-for="f in g.factions" :key="f.slug">
          <RouterLink v-if="f.ready" :to="`/factions/${f.slug}`" class="fac" @click="$emit('close')">
            <span class="fac-name">{{ f.name }}</span>
          </RouterLink>
          <span v-else class="fac disabled">
            <span class="fac-name">{{ f.name }}</span>
            <span class="soon">{{ labels.factionsSoon }}</span>
          </span>
        </template>
      </template>
    </div>
  </BaseModal>
</template>

<script setup>
// Lightweight navigation-only faction list for the mobile bottom nav. Uses the light
// factionsIndex.js (NOT the heavy tracker dataset) and the same grouped layout as
// FactionsListView; picking a faction navigates to its page and closes the modal.
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import { factionGroups } from '../data/factionsIndex.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const GROUP_LABEL_KEYS = {
  astartes: 'factionGroupAstartes',
  imperium: 'factionGroupImperium',
  xenos: 'factionGroupXenos',
  chaos: 'factionGroupChaos',
}
function groupLabelKey(id) {
  return GROUP_LABEL_KEYS[id] || id
}
</script>

<style scoped>
.modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.75rem;
  overflow-y: auto;
}
.fp-group {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  margin: 0.6rem 0 0.1rem;
}
.fp-group:first-child { margin-top: 0; }

.fac {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  text-align: left;
  padding: 0.5rem 0.55rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s;
}
a.fac:hover { border-color: var(--accent); text-decoration: none; }
.fac.disabled { cursor: default; opacity: 0.6; }
.fac-name { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.fac.disabled .fac-name { color: var(--text-dim); }

.soon {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-dim);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 1px 5px;
  flex-shrink: 0;
}
</style>
