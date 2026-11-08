<template>
  <ConfirmModal
    v-if="visible"
    :title="state.conflict ? labels.localConflictTitle : opening ? labels.localOpenErrorTitle : labels.localSaveErrorTitle"
    :message="state.conflict ? (changedAgain ? labels.localConflictChangedAgain : labels.localConflictMessage) : opening ? labels.localOpenErrorMessage : labels.localSaveErrorMessage"
    :confirm-label="state.conflict ? labels.localConflictReplace : opening ? labels.localOpenReload : labels.localSaveRetry"
    :cancel-label="opening ? labels.localClose : labels.localKeepEditing"
    :busy="busy"
    @confirm="resolve"
    @close="dismiss"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import { localData } from '../composables/localData.js'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'
import ConfirmModal from './ConfirmModal.vue'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const state = localData.state
const dismissed = ref(-1)
const busy = ref(false)
const changedAgain = ref(false)
// Initialization failed: nothing was opened, so there is nothing to keep editing or save.
const opening = computed(() => !state.conflict && state.phase === 'error')
const visible = computed(() => (state.conflict || state.error) && dismissed.value !== state.notice)
function dismiss() { dismissed.value = state.notice }
async function resolve() {
  if (busy.value) return
  const conflict = state.conflict
  busy.value = true
  try {
    if (conflict) {
      await localData.confirm(conflict)
      changedAgain.value = !!state.conflict && state.conflict.key !== conflict.key
    }
    else if (state.phase === 'error') window.location.reload()
    else await localData.flush()
  } finally { busy.value = false }
}
</script>
