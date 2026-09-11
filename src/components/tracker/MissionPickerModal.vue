<template>
  <BaseModal :title="title" @close="$emit('close')">
      <div class="modal-body">
        <div v-if="randomLabel" class="tp-actions">
          <button class="btn-ghost tp-act" @click="$emit('random')">{{ randomLabel }}</button>
        </div>

        <PickerRow
          v-for="m in missions"
          :key="m.slug"
          :name="m.name"
          :open="openId === m.slug"
          :selected="selected === m.slug"
          @toggle-open="toggleOpen(m.slug)"
          @pick="$emit('pick', m.slug)"
        >
          <MissionCard :mission="m" :show-lore="false" />
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
  title: { type: String, required: true },
  missions: { type: Array, required: true },   // localized full mission objects
  selected: { type: String, default: null },   // slug
  randomLabel: { type: String, default: '' },
})
const emit = defineEmits(['pick', 'random', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Accordion: at most one mission expanded at a time; start on the selected one.
const openId = ref(props.selected || null)
function toggleOpen(slug) { openId.value = openId.value === slug ? null : slug }
</script>

<style scoped>

.tp-actions { display: flex; gap: 0.5rem; margin-bottom: 0.8rem; }
/* Sized for a thumb and filling the row; the rest is the global button (style.css, "Buttons"). */
.tp-act { flex: 1; min-height: 44px; justify-content: center; }

</style>
