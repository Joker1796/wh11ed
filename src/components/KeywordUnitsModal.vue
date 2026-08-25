<template>
  <BaseModal :title="title" max-width="480px" @close="$emit('close')">
    <!-- `modal-body` carries the global `overscroll-behavior: contain` (style.css) — see
         FactionDetachmentPickerModal.vue's identical comment. -->
    <div class="modal-body modal-list">
      <RouterLink
        v-for="u in units"
        :key="u.id"
        :to="`/factions/${factionSlug}/datasheets/${u.id}`"
        class="kum-item"
        @click="$emit('close')"
      >
        <span class="kum-name">{{ u.name }}<span v-if="u.baseSize" class="kum-base"> ({{ fmtBase(u.baseSize) }})</span></span>
      </RouterLink>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { formatBaseSize } from '../utils/baseSize.js'

// Opened from DatasheetCard's Keywords line (see its `keyword-click` emit) — lists every
// other unit in the SAME faction's roster that also carries the clicked keyword, so a reader
// can jump straight to e.g. every other INFANTRY unit without leaving the datasheet page.
const props = defineProps({
  keyword: { type: String, required: true },
  units: { type: Array, required: true }, // [{ id, name, baseSize? }]
  factionSlug: { type: String, required: true },
})
defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const fmtBase = (raw) => formatBaseSize(raw, labels.value)
const title = computed(() => labels.value.dsUnitsWithKeyword.replace('{kw}', props.keyword))
</script>

<style scoped>

@media (max-width: 560px) {
  .modal-body {
    padding: 0.5rem 0.4rem;
  }
}

.kum-item {
  display: flex;
  width: 100%;
  min-height: 44px;
  align-items: center;
  padding: 0.5rem 0.65rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  text-decoration: none;
  transition: border-color var(--motion-fast), background var(--motion-fast);
}

.kum-item:hover {
  border-color: var(--accent);
  text-decoration: none;
}

.kum-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

.kum-base {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  color: var(--text-muted);
}
</style>
