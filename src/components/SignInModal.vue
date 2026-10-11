<template>
  <BaseModal
    :title="title"
    max-width="420px"
    @close="closeSignIn"
  >
    <div class="modal-body si-body">
      <!-- Registered: the account works already; the mail only proves the address. -->
      <template v-if="mode === 'registered'">
        <p class="si-text">
          {{ registeredText }}
        </p>
        <p class="si-note">
          {{ labels.signInCheckSpam }}
        </p>
        <div class="si-actions">
          <button
            type="button"
            class="btn-primary"
            @click="closeSignIn"
          >
            {{ labels.signInDone }}
          </button>
        </div>
      </template>

      <template v-else-if="mode === 'forgotSent'">
        <p class="si-text">
          {{ labels.forgotSent }}
        </p>
        <p class="si-note">
          {{ labels.signInCheckSpam }}
        </p>
        <div class="si-actions">
          <button
            type="button"
            class="btn-ghost"
            @click="switchTo('login')"
          >
            {{ labels.signInBack }}
          </button>
        </div>
      </template>

      <form
        v-else
        class="si-form"
        novalidate
        @submit.prevent="submit"
      >
        <p
          v-if="mode === 'forgot'"
          class="si-text"
        >
          {{ labels.forgotText }}
        </p>
        <label class="field">
          <span>{{ labels.signInEmail }}</span>
          <input
            v-model="email"
            type="email"
            inputmode="email"
            autocomplete="email"
            autocapitalize="off"
            spellcheck="false"
            required
          >
        </label>
        <label
          v-if="mode !== 'forgot'"
          class="field"
        >
          <span>{{ labels.signInPassword }}</span>
          <input
            v-model="password"
            type="password"
            :autocomplete="mode === 'register' ? 'new-password' : 'current-password'"
            :minlength="mode === 'register' ? 8 : undefined"
            required
          >
          <small
            v-if="mode === 'register'"
            class="si-hint"
          >{{ labels.registerPasswordHint }}</small>
        </label>

        <p
          v-if="error"
          class="si-error"
          role="alert"
        >
          {{ error }}
        </p>

        <button
          type="submit"
          class="btn-primary si-submit"
          :disabled="busy"
        >
          {{ submitLabel }}
        </button>

        <div class="si-links">
          <template v-if="mode === 'login'">
            <button
              type="button"
              class="si-link"
              @click="switchTo('forgot')"
            >
              {{ labels.signInForgot }}
            </button>
            <button
              type="button"
              class="si-link"
              @click="switchTo('register')"
            >
              {{ labels.signInToRegister }}
            </button>
          </template>
          <button
            v-else
            type="button"
            class="si-link"
            @click="switchTo('login')"
          >
            {{ mode === 'register' ? labels.registerToLogin : labels.signInBack }}
          </button>
        </div>
      </form>

      <!-- Yandex stays as the other way in: a full-page trip that comes back to where the dialog
           was opened. Not on the "registered" / "sent" answers — nothing to choose there. -->
      <template v-if="mode === 'login' || mode === 'register'">
        <p class="si-or">
          <span>{{ labels.signInOr }}</span>
        </p>
        <button
          type="button"
          class="btn-ghost si-yandex"
          :disabled="busy"
          @click="withYandex"
        >
          {{ labels.cloudSignInYandex }}
        </button>
      </template>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseModal from './BaseModal.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useAuth } from '../composables/useAuth.js'
import { useSignInModal } from '../composables/useSignInModal.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { login, loginWithPassword, register, forgotPassword } = useAuth()
const { returnTo, closeSignIn } = useSignInModal()

const mode = ref('login') // login | register | forgot | registered | forgotSent
const email = ref('')
const password = ref('')
const busy = ref(false)
const error = ref('')
const mailWent = ref(true)

const title = computed(() => ({
  login: labels.value.signInTitle,
  register: labels.value.registerTitle,
  registered: labels.value.registerTitle,
  forgot: labels.value.forgotTitle,
  forgotSent: labels.value.forgotTitle,
})[mode.value])
const submitLabel = computed(() => ({
  login: labels.value.signInSubmit,
  register: labels.value.registerSubmit,
  forgot: labels.value.forgotSubmit,
})[mode.value])
const registeredText = computed(() => (mailWent.value ? labels.value.registerDone : labels.value.registerDoneNoMail)
  .replace('{email}', email.value.trim()))

const ERRORS = {
  bad_credentials: 'authErrBadCredentials',
  email_taken: 'authErrEmailTaken',
  too_many: 'authErrTooMany',
  invalid_input: 'authErrInvalid',
  mail_failed: 'authErrMail',
  network: 'authErrNetwork',
  server: 'cloudServerDownHint',
}

function switchTo(next) {
  mode.value = next
  error.value = ''
}

// The browser's own checks first (an address with an @, 8 characters for a new password): the
// server says the same thing, but a round trip for a typo is slow on a table's bad signal.
function localProblem() {
  const e = email.value.trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return labels.value.authErrEmail
  if (mode.value === 'register' && password.value.length < 8) return labels.value.registerPasswordHint
  if (mode.value === 'login' && !password.value) return labels.value.authErrInvalid
  return ''
}

async function submit() {
  if (busy.value) return
  error.value = localProblem()
  if (error.value) return
  busy.value = true
  const e = email.value.trim()
  let r
  if (mode.value === 'login') r = await loginWithPassword(e, password.value)
  else if (mode.value === 'register') r = await register(e, password.value, locale.value)
  else r = await forgotPassword(e, locale.value)
  busy.value = false
  if (!r.ok) {
    error.value = labels.value[ERRORS[r.error] || 'authErrInvalid']
    return
  }
  password.value = ''
  if (mode.value === 'login') closeSignIn()
  else if (mode.value === 'register') {
    mailWent.value = r.mailSent !== false
    mode.value = 'registered'
  } else mode.value = 'forgotSent'
}

async function withYandex() {
  busy.value = true
  const went = await login('yandex', returnTo.value)
  busy.value = false
  if (!went) error.value = labels.value.cloudServerDownHint
}
</script>

<style scoped>
.si-body { padding: 0.9rem 1rem 1.1rem; }
.si-form { display: flex; flex-direction: column; gap: 0.7rem; }
.si-form input { width: 100%; }
.si-text { margin: 0 0 0.2rem; line-height: 1.5; }
.si-note { margin: 0.4rem 0 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.45; }
.si-hint { display: block; margin-top: 0.25rem; font-size: 0.8rem; color: var(--text-muted); }
.si-error { margin: 0; font-size: 0.88rem; color: var(--danger); line-height: 1.4; }
.si-submit { width: 100%; }
.si-links { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.4rem 1rem; }
.si-link {
  padding: 0.35rem 0;
  border: 0;
  background: none;
  color: var(--accent-ink);
  font: inherit;
  font-size: 0.88rem;
  cursor: pointer;
}
@media (hover: hover) { .si-link:hover { color: var(--accent-ink-hover); text-decoration: underline; } }
.si-actions { display: flex; justify-content: flex-end; margin-top: 0.9rem; }
.si-or {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 1rem 0 0.7rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}
.si-or::before, .si-or::after { content: ''; flex: 1; border-top: 1px solid var(--border); }
.si-yandex { width: 100%; }
</style>
