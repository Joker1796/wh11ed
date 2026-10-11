<template>
  <div class="account-link">
    <h1 class="al-title">
      {{ state === 'dead' ? labels.emailLinkDead : labels.resetTitle }}
    </h1>
    <template v-if="state === 'form'">
      <form
        class="al-form"
        novalidate
        @submit.prevent="submit"
      >
        <label class="field">
          <span>{{ labels.signInPassword }}</span>
          <input
            v-model="password"
            type="password"
            autocomplete="new-password"
            minlength="8"
            required
          >
          <small class="al-hint">{{ labels.registerPasswordHint }}</small>
        </label>
        <p
          v-if="error"
          class="al-error"
          role="alert"
        >
          {{ error }}
        </p>
        <button
          type="submit"
          class="btn-primary"
          :disabled="busy"
        >
          {{ labels.resetSubmit }}
        </button>
      </form>
    </template>
    <template v-else>
      <p class="al-text">
        {{ state === 'done' ? labels.resetDone : labels.emailLinkDeadText }}
      </p>
      <div class="al-actions">
        <RouterLink
          to="/"
          class="btn-primary"
        >
          {{ labels.emailToSite }}
        </RouterLink>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useAuth } from '../../composables/useAuth.js'
import { takeLinkToken } from './linkToken.js'

// The link in a "new password" mail lands here: /account/reset#token=…. The token is read at once
// (and wiped from the address bar); it is spent only when the new password is saved, which also
// signs this device in and every other one out.
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { resetPassword } = useAuth()
const token = takeLinkToken()
const state = ref(token ? 'form' : 'dead') // form | done | dead
const password = ref('')
const busy = ref(false)
const error = ref('')

async function submit() {
  if (busy.value) return
  if (password.value.length < 8) { error.value = labels.value.registerPasswordHint; return }
  busy.value = true
  const r = await resetPassword(token, password.value)
  busy.value = false
  if (r.ok) { state.value = 'done'; return }
  if (r.error === 'link_invalid') { state.value = 'dead'; return }
  error.value = r.error === 'network' ? labels.value.authErrNetwork
    : r.error === 'invalid_input' ? labels.value.registerPasswordHint
      : labels.value.cloudServerDownHint
}
</script>

<style scoped>
.account-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  min-height: 50vh;
  max-width: 24rem;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}
.al-title { margin: 0; font-family: var(--font-display); font-size: 1.6rem; text-transform: uppercase; }
.al-text { margin: 0; line-height: 1.5; color: var(--text-secondary); }
.al-form { display: flex; flex-direction: column; gap: 0.7rem; width: 100%; text-align: left; }
.al-form input { width: 100%; }
.al-hint { display: block; margin-top: 0.25rem; font-size: 0.8rem; color: var(--text-muted); }
.al-error { margin: 0; font-size: 0.88rem; color: var(--danger); }
.al-actions { margin-top: 0.4rem; }
</style>
