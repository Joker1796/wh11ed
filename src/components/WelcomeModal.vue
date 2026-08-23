<template>
  <BaseModal :title="labels.welcomeTitle" max-width="440px" @close="dismiss">
    <div class="modal-body welcome">
      <p class="welcome-lead">{{ labels.welcomeLead }}</p>
      <ul class="welcome-list">
        <li><i class="bi bi-grid-3x3-gap"></i><span>{{ labels.welcomeWhat }}</span></li>
        <li><i class="bi bi-wifi-off"></i><span>{{ labels.welcomeOffline }}</span></li>
        <li><i class="bi bi-phone"></i><span>{{ labels.welcomeLocal }}</span></li>
      </ul>
      <div class="welcome-actions">
        <RouterLink class="welcome-more" to="/help" @click="dismiss">{{ labels.welcomeMore }} →</RouterLink>
        <button class="welcome-ok" @click="dismiss">{{ labels.welcomeClose }}</button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
// Shown ONCE, on a first visit to the landing page. Three facts a reader cannot get from the
// screen — what is here, that the installed app goes fully offline, and that their data is local.
// Everything else is on /help, one link away.
//
// The landing only, deliberately: most visitors arrive from a search engine straight into a rule
// and are mid-question, and a card across that is an interruption, not a welcome. Dismissing is
// permanent — there is no "remind me", because there is nothing here to come back to.
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { setItem } from '../composables/safeStorage.js'
import { WELCOME_KEY } from '../composables/useWelcome.js'

const emit = defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

function dismiss() {
  setItem(WELCOME_KEY, '1')
  emit('close')
}
</script>

<style scoped>
.welcome { display: flex; flex-direction: column; gap: 0.9rem; padding: 0.9rem; }
.welcome-lead { margin: 0; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; }
.welcome-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.7rem; }
.welcome-list li { display: flex; gap: 0.6rem; align-items: flex-start; font-size: 0.88rem; line-height: 1.5; }
.welcome-list i { color: var(--accent); font-size: 1rem; line-height: 1.4; }
.welcome-actions { display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; }
.welcome-more { color: var(--accent); text-decoration: none; font-size: 0.85rem; }
.welcome-more:hover { text-decoration: underline; }
.welcome-ok {
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}
</style>
