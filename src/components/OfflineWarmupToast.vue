<template>
  <AppToast
    :show="visible"
    :icon="status === 'ready' ? 'bi-check-circle' : 'bi-cloud-arrow-down'"
    :text="status === 'ready' ? labels.offlineReady : `${labels.warmingOffline} ${done}/${total}`"
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
const { status, done, total } = useOfflineWarmup()
const dismissed = ref(false)
const visible = computed(() => !dismissed.value && (status.value === 'warming' || status.value === 'ready'))
// Auto-dismiss the "ready" confirmation a few seconds after the warm-up finishes.
watch(status, (s) => {
  if (s === 'ready') setTimeout(() => (dismissed.value = true), 4000)
})
</script>
