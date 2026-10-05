<template>
  <BaseModal
    :title="labels.trackerSelectFaction"
    @close="$emit('close')"
  >
    <FactionPickerList
      class="modal-body"
      :selected="selected"
      :combat-patrol-only="combatPatrolOnly"
      @pick="(slug) => $emit('pick', slug)"
    />
  </BaseModal>
</template>

<script setup>
// Single-select faction picker — same modal shell + button-list styling as the detachment picker (DetachmentPicker),
// so faction and detachment selection read as one consistent flow. Picking one emits `pick` and the
// parent closes the modal. The list is FactionPickerList, which the desk's dropdown draws too.
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import FactionPickerList from './FactionPickerList.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({
  selected: { type: String, default: null },
  combatPatrolOnly: { type: Boolean, default: false },
})
defineEmits(['pick', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>
