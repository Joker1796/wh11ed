<template>
  <div
    class="auth-callback"
    :class="{ failed: !!failure }"
  >
    <template v-if="failure">
      <h1 class="ac-title">
        {{ labels.authFailedTitle }}
      </h1>
      <p class="ac-text">
        {{ failure }}
      </p>
      <p class="ac-code">
        {{ code }}
      </p>
      <div class="ac-actions">
        <button
          type="button"
          class="btn-ghost"
          @click="leave"
        >
          {{ labels.authFailedBack }}
        </button>
        <button
          type="button"
          class="btn-primary"
          @click="retry"
        >
          {{ labels.authFailedRetry }}
        </button>
      </div>
    </template>
    <template v-else>
      <div
        class="spinner"
        aria-hidden="true"
      />
      <p>{{ labels.authSigningIn }}</p>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useAuth } from '../../composables/useAuth.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { refresh, takeReturnPath, login } = useAuth()

// The backend has just set the refresh cookie and redirected here — always to this one path,
// whichever page the user signed in from (it is the backend's APP_AFTER_LOGIN_URL, not a choice
// this app makes). Exchange the cookie for an access token, then hand the user back to the page
// that sent them. The tracker is the fallback: it is where the button used to live, and where a
// session with nothing else to say is most useful.
//
// A login that failed arrives with `?error=<code>` instead — from Yandex itself (the player's
// account may not sign in to outside sites: `unauthorized_client`) or from our backend (the login
// started in one browser and came back in another). Until 2026-10-09 this screen ignored it and
// sent the player back as if nothing happened ("it just throws me off the site", a player's
// report). Now it says what happened and offers another try; a login the player cancelled
// (`access_denied`) goes back quietly — that was their choice.
const code = String(route.query.error || '')
const back = takeReturnPath() || '/tracker'
const REASONS = {
  unauthorized_client: 'authFailedAccount',
  missing_state_cookie: 'authFailedBrowser',
  bad_state_cookie: 'authFailedBrowser',
  state_mismatch: 'authFailedBrowser',
  oauth_failed: 'authFailedProvider',
  temporarily_unavailable: 'authFailedProvider',
  server_error: 'authFailedProvider',
}
const failure = ref('')

const leave = () => router.replace(back)
const retry = () => login('yandex', back)

onMounted(async () => {
  if (code && code !== 'access_denied') {
    failure.value = labels.value[REASONS[code] || 'authFailedOther']
    return
  }
  if (!code) await refresh()
  leave()
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
.auth-callback.failed {
  gap: 0.6rem;
  max-width: 30rem;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
  color: var(--text-primary);
}
.ac-title { margin: 0; font-family: var(--font-display); font-size: 1.6rem; text-transform: uppercase; }
.ac-text { margin: 0; line-height: 1.5; }
/* The code itself, small: what a player quotes in a report. */
.ac-code { margin: 0; font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); }
.ac-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 0.4rem; }
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
