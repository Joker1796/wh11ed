<template>
  <BaseModal
    :title="labels.feedbackTitle"
    max-width="460px"
    @close="close"
  >
    <div class="modal-body">
      <template v-if="state !== 'sent'">
        <p class="fb-hint">
          {{ labels.feedbackHint }}
        </p>
        <textarea
          v-model="message"
          class="fb-text"
          rows="5"
          :placeholder="labels.feedbackPlaceholder"
        />
        <!-- The honeypot: invisible to a person, irresistible to a form-filling bot. -->
        <input
          v-model="website"
          type="text"
          class="fb-hp"
          name="website"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
        >

        <label
          class="fb-check"
        >
          <input
            v-model="withTech"
            type="checkbox"
          >
          <span>{{ labels.feedbackTech }}</span>
        </label>
        <!-- What "technical details" MEANS, verbatim — a player should see what leaves the
             phone before agreeing to it. -->
        <details
          v-if="withTech"
          class="fb-tech"
        >
          <summary>{{ labels.feedbackTechShow }}</summary>
          <pre class="fb-tech-body">{{ techPreview }}</pre>
        </details>

        <label
          v-if="canAttachGame"
          class="fb-check"
        >
          <input
            v-model="withGame"
            type="checkbox"
          >
          <span>{{ labels.feedbackAttachGame }}</span>
        </label>
        <label
          v-if="canAttachRoster"
          class="fb-check"
        >
          <input
            v-model="withRoster"
            type="checkbox"
          >
          <span>{{ labels.feedbackAttachRoster }}</span>
        </label>

        <p
          v-if="offline"
          class="fb-offline"
        >
          {{ labels.feedbackOffline }}
        </p>
        <p
          v-else-if="state === 'error'"
          class="fb-error"
        >
          {{ labels.feedbackError }}
        </p>

        <div class="fb-actions">
          <button
            class="btn-primary"
            :disabled="!message.trim() || offline || state === 'sending'"
            @click="send"
          >
            {{ state === 'sending' ? labels.feedbackSending : labels.feedbackSend }}
          </button>
        </div>
      </template>

      <p
        v-else
        class="fb-done"
      >
        {{ labels.feedbackSent }}
      </p>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { stripLocale } from '../router/locale.js'
import BaseModal from './BaseModal.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useTheme } from '../composables/useTheme.js'
import { useAuth } from '../composables/useAuth.js'
import { useFeedbackModal } from '../composables/useFeedbackModal.js'
import { recentErrors } from '../composables/useErrorLog.js'
import { isStandaloneDisplay } from '../composables/standalone.js'
import { API_BASE_URL } from '../config.js'
import { APP_DATA_VERSION } from '../data/appDataVersion.js'
// Heavy imports are fine HERE: this component is an async chunk loaded when the dialog opens,
// so the tracker store (and the mission data it pulls) never rides in the shell.
import { useTracker } from '../composables/useTracker.js'
import { useRosters } from '../composables/useRosters.js'
import { rosterPayload } from '../composables/rosterShare.js'

const route = useRoute()
const { locale } = useLocale()
const { theme } = useTheme()
const labels = computed(() => ui[locale.value])
const { status, authedFetch } = useAuth()
const { closeFeedback } = useFeedbackModal()
const { current } = useTracker()
const { rosterById } = useRosters()

const message = ref('')
const website = ref('') // honeypot
const withTech = ref(true)
const withGame = ref(false)
const withRoster = ref(false)
const state = ref('idle') // idle | sending | sent | error
const offline = computed(() => typeof navigator !== 'undefined' && navigator.onLine === false)

// Context attachments are offered only where they exist: a running game anywhere, the open
// roster on its own pages. Off by default — the player decides what leaves the phone.
const canAttachGame = computed(() => !!current.value)
const openRoster = computed(() => {
  const m = stripLocale(route.path).match(/^\/roster\/([^/]+)/)
  if (!m || m[1] === 'new' || m[1] === 'shared') return null
  return rosterById(m[1]) || null
})
const canAttachRoster = computed(() => !!openRoster.value)

function techContext() {
  return {
    appVersion: __APP_VERSION__,
    dataVersion: APP_DATA_VERSION,
    locale: locale.value,
    theme: theme.value,
    route: route.fullPath,
    ua: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    screen: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
    standalone: isStandaloneDisplay(),
    errors: recentErrors(),
  }
}
const techPreview = computed(() => JSON.stringify(techContext(), null, 1))

async function send() {
  if (!message.value.trim() || state.value === 'sending') return
  state.value = 'sending'
  const body = { message: message.value.trim(), website: website.value }
  if (withTech.value) body.context = techContext()
  const attachment = {}
  if (withGame.value && current.value) attachment.game = JSON.parse(JSON.stringify(current.value))
  if (withRoster.value && openRoster.value) attachment.roster = rosterPayload(openRoster.value)
  if (Object.keys(attachment).length) body.attachment = attachment
  try {
    // authedFetch when signed in (records who wrote), plain fetch otherwise — no account needed.
    const res = status.value === 'authed'
      ? await authedFetch('/feedback', { method: 'POST', body: JSON.stringify(body) })
      : await fetch(`${API_BASE_URL}/feedback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
    state.value = res.ok ? 'sent' : 'error'
  } catch {
    state.value = 'error'
  }
}

function close() {
  closeFeedback()
}
</script>

<style scoped>
.modal-body { padding: 0.9rem 1rem 1rem; }
.fb-hint {
  margin: 0 0 0.7rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-muted);
}
.fb-text {
  width: 100%;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 16px; /* the coarse-pointer floor — iOS zooms in under it */
  line-height: 1.45;
  resize: vertical;
}
.fb-hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.fb-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.55rem;
  font-size: 0.82rem;
  color: var(--text-primary);
  cursor: pointer;
}
.fb-tech { margin: 0.3rem 0 0 1.6rem; }
.fb-tech > summary {
  cursor: pointer;
  font-size: 0.75rem;
  color: var(--text-muted);
}
.fb-tech-body {
  margin: 0.3rem 0 0;
  max-height: 9rem;
  overflow: auto;
  padding: 0.4rem 0.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  font-size: 0.68rem;
  line-height: 1.4;
  color: var(--text-muted);
  white-space: pre-wrap;
  word-break: break-all;
}
.fb-offline,
.fb-error {
  margin: 0.6rem 0 0;
  font-size: 0.78rem;
  color: var(--accent);
}
.fb-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.8rem;
}
.fb-done {
  margin: 0;
  padding: 0.4rem 0;
  font-size: 0.9rem;
  color: var(--text-primary);
}
</style>
