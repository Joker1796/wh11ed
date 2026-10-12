<template>
  <div
    class="account-link"
    :class="{ failed: state === 'dead' }"
  >
    <template v-if="state === 'working'">
      <div
        class="spinner"
        aria-hidden="true"
      />
      <p>{{ labels.emailVerifyWorking }}</p>
    </template>
    <template v-else>
      <h1 class="al-title">
        {{ state === 'done' ? labels.emailVerifyDone : labels.emailLinkDead }}
      </h1>
      <p class="al-text">
        {{ state === 'done' ? labels.emailVerifyDoneText : state === 'dead' ? labels.emailLinkDeadText : errorText }}
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
import { computed, onMounted, ref } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useAuth } from '../../composables/useAuth.js'
import { takeLinkToken } from './linkToken.js'

// The link in the welcome mail lands here: /account/verify#token=… — the token in the fragment, so
// it never reaches a server log or the CDN. One POST spends it.
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { verifyEmail } = useAuth()
const state = ref('working') // working | done | dead | error
const errorText = ref('')

onMounted(async () => {
  const token = takeLinkToken()
  if (!token) { state.value = 'dead'; return }
  const r = await verifyEmail(token)
  if (r.ok) state.value = 'done'
  else if (r.error === 'link_invalid' || r.error === 'invalid_input') state.value = 'dead'
  else {
    state.value = 'error'
    errorText.value = r.error === 'network' ? labels.value.authErrNetwork : labels.value.cloudServerDownHint
  }
})
</script>

<style scoped>
/* The page's column, title and text are the global Account landing (style.css). */
.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: al-spin 0.8s linear infinite;
}
@keyframes al-spin { to { transform: rotate(360deg); } }
</style>
