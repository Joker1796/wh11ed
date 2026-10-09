<template>
  <Transition
    name="fade"
    appear
  >
    <aside
      class="install-offer"
      role="dialog"
      aria-labelledby="install-offer-title"
    >
      <button
        type="button"
        class="io-close"
        :aria-label="labels.installOfferLater"
        @click="later"
      >
        <i class="bi bi-x-lg" />
      </button>
      <p
        id="install-offer-title"
        class="io-title"
      >
        <i class="wi wi-install" /> {{ phone ? labels.installOfferTitle : labels.installOfferTitleDesk }}
      </p>
      <p class="io-text">
        {{ phone ? labels.installOfferText : labels.installOfferTextDesk }}
      </p>
      <p
        v-if="signInFirst"
        class="io-note"
      >
        {{ labels.installOfferIosSignIn }}
      </p>
      <div class="io-actions">
        <button
          v-if="signInFirst"
          type="button"
          class="btn-primary"
          @click="onSignIn"
        >
          {{ labels.installOfferSignIn }}
        </button>
        <button
          v-if="installNow"
          type="button"
          class="btn-primary"
          @click="onInstall"
        >
          {{ labels.installOfferInstall }}
        </button>
        <button
          v-else-if="iosHow"
          type="button"
          :class="signInFirst ? 'btn-ghost' : 'btn-primary'"
          @click="onHow"
        >
          {{ labels.installOfferHow }}
        </button>
        <!-- Three buttons do not fit a phone's line; the ✕ above says "not now" as well. -->
        <button
          v-if="!signInFirst"
          type="button"
          class="btn-ghost"
          @click="later"
        >
          {{ labels.installOfferLater }}
        </button>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
// The one offer to install, made at the first sign the player uses the site for real (installPath.js
// decides when; App.vue shows it). It says what the player gets — the rules, the lists and the
// tracker with no signal, at the table — and on an iPhone with lists or games in Safari it asks for
// a sign-in FIRST: the installed app there has storage of its own and would open empty.
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useInstallPrompt } from '../composables/useInstallPrompt.js'
import { useAccountActions } from '../composables/useAccountActions.js'
import { isIos, localWork, offerAnswered, preview } from '../composables/installPath.js'

const emit = defineEmits(['close', 'ios-help'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { canInstall, iosInstall, promptInstall } = useInstallPrompt()
const { status, signIn } = useAccountActions()
// What this browser can do: the system prompt, or Safari's "Add to Home Screen" (or the stand's preview).
const installNow = computed(() => canInstall.value || preview === 'offer')
const iosHow = computed(() => iosInstall.value || preview === 'offer-ios')

// A phone or a tablet is told about the table; a computer just about working with no signal.
const phone = preview === 'offer-ios' || (typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches)
const signInFirst = computed(() => {
  if (!isIos() || status.value === 'authed') return false
  const { rosters, games } = localWork()
  return rosters + games > 0
})

async function onInstall() {
  offerAnswered()
  emit('close')
  await promptInstall()
}
function onHow() {
  offerAnswered()
  emit('close')
  emit('ios-help')
}
// Not answered yet: after the sign-in the player comes back here, and the offer to install is still owed.
function onSignIn() {
  emit('close')
  signIn()
}
function later() {
  offerAnswered()
  emit('close')
}
</script>

<style scoped>
.install-offer {
  position: fixed;
  z-index: 380;
  right: calc(1rem + var(--safe-right, 0px));
  bottom: calc(1rem + var(--safe-bottom, 0px));
  width: min(360px, calc(100vw - 2rem));
  padding: 0.8rem 0.9rem 0.8rem;
  background: var(--bg-card);
  border: 1px solid var(--accent);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
  color: var(--text-primary);
}
/* Above the bottom nav and the floating chips on a phone. */
@media (max-width: 900px) {
  .install-offer {
    left: calc(0.75rem + var(--safe-left, 0px));
    right: calc(0.75rem + var(--safe-right, 0px));
    width: auto;
    bottom: calc(52px + 0.6rem + var(--safe-bottom, 0px) + var(--mobile-bar-h, 0px));
  }
}
.io-close {
  position: absolute;
  top: 0.35rem;
  right: 0.35rem;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
}
@media (hover: hover) { .io-close:hover { color: var(--text-primary); } }
.io-title { margin: 0 2rem 0.35rem 0; font-weight: 700; font-size: 0.95rem; }
.io-title .wi { color: var(--accent-ink); }
.io-text { margin: 0 0 0.5rem; font-size: 0.85rem; line-height: 1.45; color: var(--text-secondary); }
.io-note { margin: 0 0 0.6rem; font-size: 0.82rem; line-height: 1.45; color: var(--warning); }
.io-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
</style>
