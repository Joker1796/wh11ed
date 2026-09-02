<template>
  <!-- The account, in the navbar, on every page — because signing in is not a tracker feature:
       both the tracker's history and the roster builder's lists sync through the same account,
       and the way in used to exist only on the tracker's home page. Desktop only: the phone
       navbar has no room for a fifth button, so the same two entries sit inside the gear menu
       (AppNavbar), exactly as the theme and lore toggles already do. -->
  <div class="account-wrap">
    <button
      class="account-btn"
      :class="{ active: open, authed: status === 'authed' }"
      @click="open = !open"
      :aria-expanded="open"
      :aria-label="labels.ariaAccount"
      :title="status === 'authed' ? accountName || labels.cloudSignedIn : labels.ariaAccount"
    >
      <i class="bi" :class="status === 'authed' ? 'bi-person-check-fill' : 'bi-person'"></i>
    </button>
    <Transition name="fade">
      <div v-if="open" class="account-backdrop" @click="open = false"></div>
    </Transition>
    <Transition name="fade-pop">
      <div v-if="open" class="account-menu">
        <template v-if="status === 'authed'">
          <p class="am-who">
            <i class="bi bi-cloud-check-fill"></i>
            <span>{{ accountName || labels.cloudSignedIn }}</span>
          </p>
          <button class="am-item" @click="onSignOut">
            <i class="bi bi-box-arrow-right"></i>
            <span>{{ labels.cloudSignOut }}</span>
          </button>
        </template>
        <template v-else>
          <p class="am-hint">{{ labels.cloudSignInHint }}</p>
          <!-- status === 'idle': the silent session restore is still in flight — a disabled
               placeholder, so nobody fires a redundant OAuth redirect mid-restore. -->
          <button v-if="status === 'idle'" class="ya-btn" disabled>
            <i class="bi bi-arrow-repeat spin"></i>
          </button>
          <button v-else class="ya-btn" @click="onSignIn">
            <span class="ya-btn-logo" aria-hidden="true">Я</span>
            {{ labels.cloudSignInYandex }}
          </button>
        </template>
        <button v-if="dev" class="am-item am-mock" @click="onMock">
          🔧 {{ status === 'authed' ? 'тест-выход' : 'тест-вход' }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useAccountActions } from '../composables/useAccountActions.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { status, accountName, signIn, signOut, dev, toggleMock } = useAccountActions()

const open = ref(false)

function onSignIn() {
  open.value = false
  signIn()
}
async function onSignOut() {
  open.value = false
  await signOut()
}
function onMock() {
  open.value = false
  toggleMock()
}

// Same treatment the gear dropdown gives itself — its own listener rather than App.vue
// reaching into this component's state.
function onEscape(e) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => window.addEventListener('keydown', onEscape))
onUnmounted(() => window.removeEventListener('keydown', onEscape))
</script>

<style scoped>
.account-wrap {
  position: relative;
  display: inline-flex;
}

/* Matches the theme/lore buttons beside it. */
.account-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.15rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.65);
  padding: 0 0.65rem;
  cursor: pointer;
  font-size: 1.05rem;
  line-height: 1;
  transition: background 0.15s, color 0.15s;
}
.account-btn:hover {
  background: rgba(255,255,255,0.13);
  color: #fff;
}
.account-btn.active {
  background: color-mix(in srgb, var(--accent) 30%, transparent);
  border-color: var(--accent);
  color: #fff;
}
/* Signed in is a state worth reading off the closed button, not only inside the menu. */
.account-btn.authed { color: var(--accent); }
.account-btn.authed:hover { color: #fff; }

.account-backdrop {
  position: fixed;
  inset: 0;
  z-index: 205;
}

.account-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 210;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.7rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: 0 6px 24px rgba(0,0,0,0.25);
}

.am-who {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-primary);
  word-break: break-all;
}
.am-who .bi { color: var(--accent); flex-shrink: 0; }

.am-hint {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--text-muted);
}

.am-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.5rem 0.2rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 0.85rem;
  color: var(--text-primary);
  transition: color 0.15s;
}
.am-item:hover { color: var(--accent); }
.am-mock { color: var(--text-muted); }

/* Yandex ID branded sign-in button (login is Yandex OAuth) — brand red + the "Я" mark. */
.ya-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: #fc3f1d;
  color: #fff;
  border: none;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s;
}
.ya-btn:hover { background: #e63414; }
.ya-btn:disabled { background: #fc3f1d; opacity: 0.6; cursor: default; }
.ya-btn .spin { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.ya-btn-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  color: #fc3f1d;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  line-height: 1;
}

/* The phone gets these entries inside the gear menu instead (see AppNavbar) — one control per
   job, and the mobile navbar keeps its four buttons. */
@media (max-width: 900px) {
  .account-wrap { display: none; }
}
</style>
