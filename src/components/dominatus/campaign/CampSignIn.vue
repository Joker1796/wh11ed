<template>
  <div class="camp-signin">
    <p>{{ text }}</p>
    <button
      class="btn-primary"
      aria-haspopup="dialog"
      @click="signIn"
    >
      {{ labels.signInTitle }}
    </button>
  </div>
</template>

<script setup>
// Why an account, and the way in — where a campaign is started (the list) and where a player who
// opened the invite signed out takes part (the campaign: playing needs an account, owner
// 2026-11-05). The sign-in comes back to this page; the campaign joins by itself then.
import { computed } from 'vue'
import { useAccountActions } from '../../../composables/useAccountActions.js'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'

defineProps({ text: { type: String, required: true } })
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { signIn } = useAccountActions()
</script>

<style scoped>
.camp-signin { display: grid; gap: 0.6rem; justify-items: start; margin-bottom: 1.25rem; }
.camp-signin p { margin: 0; font-size: 0.9rem; }
</style>
