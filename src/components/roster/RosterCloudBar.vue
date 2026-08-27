<template>
  <!-- One line of cloud status for the roster screens — the roster counterpart of the tracker
       home's .cloud-bar, and deliberately the ONLY place sync is visible: there is no manual
       "Sync" button because entering the list page already runs the one pass there is. It shows
       on the list page (where the pass happens) and on a saved list's view page, which is where
       the editor's Save lands — that is how the click that saved a list gets an answer. -->
  <p v-if="text" class="rc-bar" :class="{ err: state === 'error' }">
    <i class="bi" :class="icon"></i>
    <span>{{ text }}</span>
  </p>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosterSync } from '../../composables/useRosterSync.js'
import { useInstallPrompt } from '../../composables/useInstallPrompt.js'

const props = defineProps({
  // Show something to a signed-out user (the list page does; a single list's page doesn't —
  // there the bar is only there to answer a Save).
  hint: { type: Boolean, default: false },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { syncing, uploading, lastError, checked, pulled, savedAt, pendingCount, enabled } = useRosterSync()
// A tab in iOS Safari is the one place where "stored on this device" comes with a deadline:
// WebKit deletes a site's script-writable storage after about a week without a visit, and these
// lists live in exactly that storage. Installing the app or signing in both take it off the
// table, so the hint says which of the two rather than being a warning nobody can act on.
// Not shown in the installed app (`iosInstall` is already false there) or anywhere else.
const { iosInstall } = useInstallPrompt()

const state = computed(() => {
  if (!enabled.value) return props.hint ? 'hint' : ''
  if (syncing.value || uploading.value) return 'syncing'
  if (lastError.value) return 'error'
  if (savedAt.value) return 'saved'
  // "Your lists were updated" belongs to the screen that did the updating. On a single list's
  // page it would be an answer to a question nobody asked there.
  if (pulled.value) return props.hint ? 'updated' : ''
  if (pendingCount.value) return 'pending'
  return checked.value && props.hint ? 'synced' : ''
})

const text = computed(() => {
  const l = labels.value
  switch (state.value) {
    case 'hint': return iosInstall.value ? l.rosterCloudHintIos : l.rosterCloudHint
    case 'syncing': return l.rosterCloudSyncing
    case 'error': return l.rosterCloudError
    case 'updated': {
      const p = pulled.value
      return l.rosterCloudUpdated.replace('{n}', String(p.added + p.updated + p.removed))
    }
    case 'saved': return l.rosterCloudSaved
    case 'pending': return l.rosterCloudPending.replace('{n}', String(pendingCount.value))
    case 'synced': return l.rosterCloudSynced
    default: return ''
  }
})

const icon = computed(() => ({
  hint: 'bi-cloud',
  syncing: 'bi-arrow-repeat',
  error: 'bi-cloud-slash',
  updated: 'bi-cloud-arrow-down-fill',
  saved: 'bi-cloud-check-fill',
  pending: 'bi-cloud-arrow-up',
  synced: 'bi-cloud-check-fill',
}[state.value] || ''))
</script>

<style scoped>
.rc-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin: 0 0 1rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  text-align: center;
}
.rc-bar .bi { color: var(--accent); }
.rc-bar.err { color: #d9534f; }
.rc-bar.err .bi { color: inherit; }
</style>
