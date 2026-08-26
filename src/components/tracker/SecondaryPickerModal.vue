<template>
  <BaseModal @close="$emit('close')">
      <template #header>
        <header class="modal-head">
          <h3 class="mh-title">{{ labels.trackerChooseFixed }}</h3>
          <div class="mh-right">
            <span class="mh-count" :class="{ full: selected.length >= max }">{{ selected.length }} / {{ max }}</span>
            <button class="mh-close" @click="$emit('close')" :aria-label="labels.modalClose">✕</button>
          </div>
        </header>
      </template>

      <div class="modal-body">
        <PickerRow
          v-for="m in missions"
          :key="m.slug"
          :name="m.name"
          :open="openId === m.slug"
          :selected="selected.includes(m.slug)"
          :disabled="!selected.includes(m.slug) && selected.length >= max"
          @toggle-open="toggleOpen(m.slug)"
          @pick="$emit('toggle', m.slug)"
        >
          <MissionCard :mission="m" :subtitle="m.category" :show-lore="false" />
        </PickerRow>
      </div>
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import MissionCard from '../event/MissionCard.vue'
import PickerRow from './PickerRow.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  missions: { type: Array, required: true },   // localized full mission objects
  selected: { type: Array, required: true },   // slugs
  max: { type: Number, default: 2 },
})
const emit = defineEmits(['toggle', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Accordion: at most one mission expanded at a time.
const openId = ref(props.selected[0] || null)
function toggleOpen(slug) { openId.value = openId.value === slug ? null : slug }
</script>

<style scoped>
.mh-count { font-family: var(--font-mono); font-weight: 700; color: var(--text-muted); font-size: 0.9rem; }
.mh-count.full { color: var(--accent); }

</style>
