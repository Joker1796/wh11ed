<template>
  <TopBanner
    :show="!dismissed"
    icon="wi-offline"
    :close-label="labels.updateDismiss"
    @close="dismissed = true"
  >
    <span>{{ labels.localRecoveryMessage }}</span>
    <button
      type="button"
      class="ldr-download"
      :disabled="busy"
      @click="download"
    >
      {{ labels.localRecoveryDownload }}
    </button>
    <span v-if="failed">{{ labels.localRecoveryDownloadError }}</span>
  </TopBanner>
</template>

<script setup>
import { computed, ref } from 'vue'
import TopBanner from './TopBanner.vue'
import { localData } from '../composables/localData.js'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const dismissed = ref(false)
const busy = ref(false)
const failed = ref(false)
async function download() {
  if (busy.value) return
  busy.value = true
  failed.value = false
  try {
    const backup = await localData.backup()
    const url = URL.createObjectURL(new Blob([JSON.stringify(backup)], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `wh-rules-device-backup-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  } catch { failed.value = true }
  finally { busy.value = false }
}
</script>

<style scoped>
.ldr-download {
  margin-left: 0.5rem;
  padding: 0.2rem 0;
  min-height: 24px;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
}
</style>
