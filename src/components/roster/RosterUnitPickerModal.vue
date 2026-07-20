<template>
  <BaseModal :title="labels.rosterAddUnit" max-width="560px" max-height="88vh" @close="$emit('close')">
    <div class="modal-body">
      <RosterUnitBrowser
        :units="units"
        :faction-slug="factionSlug"
        :added-ids="addedIds"
        @add="$emit('pick', $event)"
      />
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import RosterUnitBrowser from './RosterUnitBrowser.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({
  units: { type: Array, required: true },
  factionSlug: { type: String, default: '' },
  addedIds: { type: Array, default: () => [] },
})
defineEmits(['pick', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.modal-body { padding: 0.6rem 0.75rem 0.75rem; overflow-y: auto; }
</style>
