<template>
  <BaseModal
    :title="labels.appFirstTitle"
    max-width="420px"
    @close="done"
  >
    <div class="modal-body afr">
      <p class="afr-text">
        <i class="wi wi-offline-ready" />
        <span>{{ labels.appFirstText }}</span>
      </p>
      <p
        v-if="emptyOnIos"
        class="afr-text afr-note"
      >
        <i class="bi bi-phone" />
        <span>{{ labels.appFirstIosText }}</span>
      </p>
      <div class="afr-actions">
        <button
          v-if="emptyOnIos"
          type="button"
          class="btn-ghost"
          @click="onSignIn"
        >
          {{ labels.appFirstSignIn }}
        </button>
        <button
          type="button"
          class="btn-primary"
          @click="done"
        >
          {{ labels.appFirstOk }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
// The installed app's first launch (installPath.js): in place of the site's welcome, which would
// ask to be installed from inside the app. It says the app is now downloading what it needs to run
// with no signal (the warm-up toast shows how far it is), and on an iPhone with nothing here and no
// account it says the one thing that surprises people: the lists and games from Safari do not come
// over by themselves — signing in to the same account brings them.
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useAccountActions } from '../composables/useAccountActions.js'
import { appFirstRunSeen, isIos, localWork } from '../composables/installPath.js'

const emit = defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { status, signIn } = useAccountActions()

const emptyOnIos = computed(() => {
  if (!isIos() || status.value === 'authed') return false
  const { rosters, games } = localWork()
  return rosters + games === 0
})

function done() {
  appFirstRunSeen()
  emit('close')
}
function onSignIn() {
  appFirstRunSeen()
  emit('close')
  signIn()
}
</script>

<style scoped>
.afr { display: flex; flex-direction: column; gap: 0.8rem; padding: 0.9rem; }
.afr-text { display: flex; gap: 0.6rem; align-items: flex-start; margin: 0; font-size: 0.88rem; line-height: 1.5; }
.afr-text i { color: var(--accent-ink); font-size: 1rem; line-height: 1.4; }
.afr-actions { display: flex; justify-content: flex-end; gap: 0.5rem; }
</style>
