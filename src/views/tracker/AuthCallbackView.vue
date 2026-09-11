<template>
  <div class="auth-callback">
    <div class="spinner" aria-hidden="true"></div>
    <p>{{ labels.authSigningIn }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useAuth } from '../../composables/useAuth.js'

const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { refresh, takeReturnPath } = useAuth()

// The backend has just set the refresh cookie and redirected here — always to this one path,
// whichever page the user signed in from (it is the backend's APP_AFTER_LOGIN_URL, not a choice
// this app makes). Exchange the cookie for an access token, then hand the user back to the page
// that sent them, whether or not it succeeded. The tracker is the fallback: it is where the
// button used to live, and where a session with nothing else to say is most useful.
onMounted(async () => {
  await refresh()
  router.replace(takeReturnPath() || '/tracker')
})
</script>

<style scoped>
.auth-callback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 50vh;
  color: var(--text-muted);
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
