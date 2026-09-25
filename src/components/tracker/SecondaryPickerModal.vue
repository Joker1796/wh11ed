<template>
  <BaseModal
    :title="labels.trackerChooseFixed"
    @close="$emit('close')"
  >
    <template #aside>
      <span
        class="mh-count"
        :class="{ full: selected.length >= max }"
      >{{ selected.length }} / {{ max }}</span>
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
        <MissionCard
          :mission="m"
          :subtitle="m.category"
          :show-lore="false"
        />
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
defineEmits(['toggle', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Accordion: at most one mission expanded at a time.
const openId = ref(props.selected[0] || null)
function toggleOpen(slug) { openId.value = openId.value === slug ? null : slug }
</script>

<style scoped>

</style>
