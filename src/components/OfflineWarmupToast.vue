<template>
  <AppToast
    :show="visible"
    :icon="status === 'ready' ? 'wi wi-offline-ready' : 'wi wi-offline'"
    :text="text"
    @close="dismissed = true"
  />
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import AppToast from './AppToast.vue'
import { useLocale } from '../composables/useLocale.js'
import { useOfflineWarmup } from '../composables/useOfflineWarmup.js'
import { ui } from '../i18n/ui.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
// Self-guards to the installed app + online; in a normal tab status stays 'idle' so nothing shows.
const { status, done, total, isUpdate } = useOfflineWarmup()
// After a release the same download tops up what changed — said as an update, not as offline
// being prepared all over again (see useOfflineWarmup.js).
const text = computed(() => {
  const l = labels.value
  if (status.value === 'ready') return isUpdate.value ? l.updateDownloaded : l.offlineReady
  return `${isUpdate.value ? l.downloadingUpdate : l.warmingOffline} ${done.value}/${total.value}`
})
const dismissed = ref(false)
const visible = computed(() => !dismissed.value && (status.value === 'warming' || status.value === 'ready'))
// Auto-dismiss the "ready" confirmation a few seconds after the warm-up finishes.
watch(status, (s) => {
  if (s === 'ready') setTimeout(() => (dismissed.value = true), 4000)
})
</script>
