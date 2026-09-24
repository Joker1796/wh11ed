<template>
  <AppToast
    :show="visible"
    :text="text"
    :icon="icon"
    :tone="state === 'error' ? 'error' : ''"
    @close="dismissed = true"
  />
</template>

<script setup>
// The answer to Save on a list's view, as a toast at the bottom that goes away by itself (owner,
// 2026-09-24). It was a line above the list's name that stayed for as long as the page did — a
// whole row of the phone's first screen, to say something true for three seconds.
//
// Only the states a Save produces: saving, saved, failed. "Saved" leaves after SAVED_MS; a failure
// stays until closed, because a message about lost work that vanishes on its own is one nobody
// read. A save older than the page (the reader came back to this list later) is not news, and is
// not announced.
import { computed, ref, watch } from 'vue'
import AppToast from '../AppToast.vue'
import { useRosterCloudStatus } from '../../composables/useRosterCloudStatus.js'
import { useRosterSync } from '../../composables/useRosterSync.js'

const SAVED_MS = 3000
const FRESH_MS = 10000

const { state, text, icon } = useRosterCloudStatus()
const { savedAt } = useRosterSync()

const dismissed = ref(false)
let timer = null
watch(state, (s) => {
  clearTimeout(timer)
  dismissed.value = s === 'saved' && Date.now() - savedAt.value > FRESH_MS
  if (s === 'saved' && !dismissed.value) timer = setTimeout(() => { dismissed.value = true }, SAVED_MS)
}, { immediate: true })

const visible = computed(() => !dismissed.value && ['syncing', 'saved', 'error'].includes(state.value))
</script>
