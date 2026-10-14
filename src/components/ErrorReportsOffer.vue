<template>
  <!-- The one question about sending errors (useErrorLog.js): shown to a signed-in player after a
       real error, once per browser, whatever the answer. Loaded only then (App.vue). -->
  <ConfirmModal
    :title="labels.errorOfferTitle"
    :message="labels.errorOfferText"
    :confirm-label="labels.errorOfferYes"
    :cancel-label="labels.errorOfferNo"
    @confirm="accept"
    @close="$emit('close')"
  />
</template>

<script setup>
import { computed } from 'vue'
import ConfirmModal from './ConfirmModal.vue'
import { setErrorReports } from '../composables/useErrorLog.js'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'

const emit = defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

function accept() {
  setErrorReports(true)
  emit('close')
}
</script>
