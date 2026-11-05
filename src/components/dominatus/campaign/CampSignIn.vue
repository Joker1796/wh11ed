<template>
  <div class="camp-signin">
    <p>{{ text }}</p>
    <button
      class="btn-primary"
      aria-haspopup="dialog"
      @click="go"
    >
      {{ switchAccount ? labels.campSwitchAccount : labels.signInTitle }}
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

// `switchAccount`: signed in to the wrong account — out of it first, then the way in.
const props = defineProps({
  text: { type: String, required: true },
  switchAccount: { type: Boolean, default: false },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { signIn, signOut } = useAccountActions()
async function go() {
  if (props.switchAccount) await signOut()
  signIn()
}
</script>

<style scoped>
.camp-signin { display: grid; gap: 0.6rem; justify-items: start; margin-bottom: 1.25rem; }
.camp-signin p { margin: 0; font-size: 0.9rem; }
</style>
