<template>
  <BaseModal
    :title="title"
    max-width="420px"
    @close="closeSignIn"
  >
    <div class="modal-body si-body">
      <!-- Done: registered or an email added (the account works already; the mail only proves the
           address), or the password changed. -->
      <template v-if="mode === 'registered' || mode === 'added' || mode === 'changed'">
        <p class="si-text">
          {{ doneText }}
        </p>
        <p
          v-if="mode !== 'changed'"
          class="si-note"
        >
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
        <!-- Sign in | create an account: one switch at the top instead of two links at the bottom.
             "Forgot your password?" is its own step, reached from beside the password. -->
        <div
          v-if="mode === 'login' || mode === 'register'"
          class="seg si-seg"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            :aria-selected="mode === 'login'"
            :class="{ on: mode === 'login' }"
            @click="switchTo('login')"
          >
            {{ labels.signInTitle }}
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="mode === 'register'"
            :class="{ on: mode === 'register' }"
            @click="switchTo('register')"
          >
            {{ labels.registerTitle }}
          </button>
        </div>
        <p
          v-else-if="mode === 'forgot' || mode === 'add'"
          class="si-text"
        >
          {{ mode === 'forgot' ? labels.forgotText : labels.addLoginText }}
        </p>

        <label
          v-if="mode !== 'change'"
          class="si-field"
        >
          <span class="si-label">{{ labels.signInEmail }}</span>
          <input
            v-model="email"
            class="si-input"
            type="email"
            inputmode="email"
            autocomplete="email"
            autocapitalize="off"
            spellcheck="false"
            required
          >
        </label>
        <label
          v-if="mode === 'change'"
          class="si-field"
        >
          <span class="si-label">{{ labels.changeCurrentPassword }}</span>
          <input
            v-model="currentPassword"
            class="si-input"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            required
          >
        </label>
        <div
          v-if="mode !== 'forgot'"
          class="si-field"
        >
          <div class="si-label-row">
            <label
              :for="pwId"
              class="si-label"
            >{{ mode === 'change' ? labels.changeNewPassword : labels.signInPassword }}</label>
            <button
              v-if="mode === 'login'"
              type="button"
              class="si-link"
              @click="switchTo('forgot')"
            >
              {{ labels.signInForgot }}
            </button>
          </div>
          <div class="si-pw">
            <input
              :id="pwId"
              v-model="password"
              class="si-input"
              :type="showPassword ? 'text' : 'password'"
              :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
              :minlength="mode === 'login' ? undefined : 8"
              required
            >
            <button
              type="button"
              class="si-eye"
              :aria-label="showPassword ? labels.signInHidePassword : labels.signInShowPassword"
              :aria-pressed="showPassword"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'" />
            </button>
          </div>
          <small
            v-if="mode !== 'login'"
            class="si-hint"
          >{{ labels.registerPasswordHint }}</small>
        </div>

        <p
          v-if="error"
          class="si-error"
          role="alert"
        >
          {{ error }}
        </p>

        <button
          type="submit"
          class="btn-primary btn-lg si-submit"
          :disabled="busy"
        >
          {{ submitLabel }}
        </button>

        <button
          v-if="mode === 'forgot'"
          type="button"
          class="si-link si-center"
          @click="switchTo('login')"
        >
          {{ labels.signInBack }}
        </button>
      </form>

      <!-- Yandex stays as the other way in: a full-page trip that comes back to where the dialog
           was opened. Not on the "registered" / "sent" answers — nothing to choose there. -->
      <template v-if="mode === 'login' || mode === 'register'">
        <p class="si-or">
          <span>{{ labels.signInOr }}</span>
        </p>
        <button
          type="button"
          class="btn-ghost btn-lg si-yandex"
          :disabled="busy"
          @click="withYandex"
        >
          <span
            class="si-ya"
            aria-hidden="true"
          >Я</span>
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
const { login, loginWithPassword, register, forgotPassword, addPasswordLogin, changePassword } = useAuth()
const { returnTo, startMode, closeSignIn } = useSignInModal()

// login | register | forgot | add | change, and the answers: registered | forgotSent | added | changed
const mode = ref(startMode.value)
const currentPassword = ref('')
const email = ref('')
const password = ref('')
const busy = ref(false)
const error = ref('')
const mailWent = ref(true)
const showPassword = ref(false)
const pwId = `si-pw-${Math.random().toString(36).slice(2, 8)}`

// The switch under the title already says "Sign in | Create an account"; the title names the place.
const title = computed(() => ({
  login: labels.value.signInDialogTitle,
  register: labels.value.signInDialogTitle,
  registered: labels.value.registerTitle,
  forgot: labels.value.forgotTitle,
  forgotSent: labels.value.forgotTitle,
  add: labels.value.addLoginTitle,
  added: labels.value.addLoginTitle,
  change: labels.value.changeTitle,
  changed: labels.value.changeTitle,
})[mode.value])
const submitLabel = computed(() => ({
  login: labels.value.signInSubmit,
  register: labels.value.registerSubmit,
  forgot: labels.value.forgotSubmit,
  add: labels.value.addLoginSubmit,
  change: labels.value.changeSubmit,
})[mode.value])
const doneText = computed(() => {
  const l = labels.value
  if (mode.value === 'changed') return l.changeDone
  const sent = mode.value === 'added' ? (mailWent.value ? l.addLoginDone : l.addLoginDoneNoMail)
    : (mailWent.value ? l.registerDone : l.registerDoneNoMail)
  return sent.replaceAll('{email}', email.value.trim())
})

const ERRORS = {
  bad_credentials: 'authErrBadCredentials',
  email_taken: 'authErrEmailTaken',
  has_login: 'authErrHasLogin',
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
  if (mode.value === 'change') {
    if (!currentPassword.value) return labels.value.authErrInvalid
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return labels.value.authErrEmail
  if (mode.value !== 'login' && mode.value !== 'forgot' && password.value.length < 8) return labels.value.registerPasswordHint
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
  else if (mode.value === 'add') r = await addPasswordLogin(e, password.value, locale.value)
  else if (mode.value === 'change') r = await changePassword(currentPassword.value, password.value)
  else r = await forgotPassword(e, locale.value)
  busy.value = false
  if (!r.ok) {
    error.value = labels.value[ERRORS[r.error] || 'authErrInvalid']
    return
  }
  password.value = ''
  currentPassword.value = ''
  if (mode.value === 'login') closeSignIn()
  else if (mode.value === 'register' || mode.value === 'add') {
    mailWent.value = r.mailSent !== false
    mode.value = mode.value === 'register' ? 'registered' : 'added'
  } else if (mode.value === 'change') mode.value = 'changed'
  else mode.value = 'forgotSent'
}

async function withYandex() {
  busy.value = true
  const went = await login('yandex', returnTo.value)
  busy.value = false
  if (!went) error.value = labels.value.cloudServerDownHint
}
</script>

<style scoped>
.si-body { padding: 1rem 1.1rem 1.2rem; }
.si-form { display: flex; flex-direction: column; gap: 0.85rem; }
.si-seg { width: 100%; margin-bottom: 0.15rem; }
.si-seg button { flex: 1; padding: 0.55rem 0.5rem; font-size: 0.9rem; }

.si-field { display: flex; flex-direction: column; gap: 0.3rem; }
.si-label-row { display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem; }
.si-label { font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); }
/* 16px: below it iOS zooms the page in on focus and never zooms back out. */
.si-input {
  width: 100%;
  min-height: 44px;
  padding: 0.55rem 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1.4;
  transition: border-color var(--motion-fast);
}
.si-input:focus { outline: none; border-color: var(--accent); }
.si-pw { position: relative; }
.si-pw .si-input { padding-right: 2.8rem; }
.si-eye {
  position: absolute;
  top: 0;
  right: 0;
  width: 2.75rem;
  height: 100%;
  border: 0;
  background: none;
  color: var(--text-muted);
  font-size: 1.05rem;
  cursor: pointer;
}
@media (hover: hover) { .si-eye:hover { color: var(--text-primary); } }

.si-text { margin: 0; line-height: 1.5; }
.si-note { margin: 0.5rem 0 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.45; }
.si-hint { font-size: 0.8rem; color: var(--text-muted); }
.si-error { margin: 0; font-size: 0.88rem; color: var(--danger); line-height: 1.4; }

.si-submit, .si-yandex { width: 100%; justify-content: center; }
.si-submit { margin-top: 0.15rem; }
.si-link {
  padding: 0.2rem 0;
  border: 0;
  background: none;
  color: var(--accent-ink);
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}
@media (hover: hover) { .si-link:hover { color: var(--accent-ink-hover); text-decoration: underline; } }
.si-center { align-self: center; }

.si-actions { display: flex; justify-content: flex-end; margin-top: 1rem; }
.si-or {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin: 1.1rem 0 0.8rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}
.si-or::before, .si-or::after { content: ''; flex: 1; border-top: 1px solid var(--border); }
/* A provider button reads as a real choice, not a disabled one: full text colour. */
.si-yandex { gap: 0.55rem; color: var(--text-primary); }
.si-ya {
  display: inline-grid;
  place-items: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: #fc3f1d; /* Yandex's own red, on purpose: the mark is theirs, not a theme colour */
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1;
}
</style>
