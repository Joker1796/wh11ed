<template>
  <div class="tracker-home">
    <AlphaBanner />
    <div class="hero">
      <h1>{{ labels.trackerIntroHeading }}</h1>
      <p class="hero-desc">{{ labels.trackerIntroDesc }}</p>
    </div>

    <!-- Cloud backup: account info / sign-in hint, kept separate from the action buttons below. -->
    <div class="cloud-bar">
      <template v-if="status === 'authed'">
        <span class="cloud-account">
          <i class="bi bi-cloud-check-fill"></i>
          {{ user?.email || user?.displayName || labels.cloudSignedIn }}
        </span>
        <button class="cloud-link" @click="logout">{{ labels.cloudSignOut }}</button>
        <span v-if="lastError" class="cloud-err">{{ labels.cloudError }}</span>
      </template>
      <span v-else class="cloud-hint">{{ labels.cloudSignInHint }}</span>
      <button v-if="dev" class="cloud-link dev-mock" @click="onMockToggle">
        🔧 {{ status === 'authed' ? 'тест-выход' : 'тест-вход' }}
      </button>
    </div>

    <div class="cta">
      <RouterLink v-if="current" to="/tracker/game" class="btn-primary">{{ labels.trackerResume }}</RouterLink>
      <button class="btn-primary" :class="{ ghost: current }" @click="startNew">{{ labels.trackerNewGame }}</button>
      <button
        v-if="status === 'authed'"
        class="btn-primary ghost"
        :disabled="syncing"
        @click="syncNow"
      >
        <i class="bi" :class="syncing ? 'bi-arrow-repeat' : 'bi-cloud-arrow-up-fill'"></i>
        {{ syncing ? labels.cloudSyncing : labels.cloudSync }}
      </button>
      <button v-else class="ya-btn" @click="onSignIn">
        <span class="ya-btn-logo" aria-hidden="true">Я</span>
        {{ labels.cloudSignInYandex }}
      </button>
    </div>

    <section class="history">
      <div class="history-head">
        <h2>{{ labels.trackerHistory }}</h2>
        <span v-if="inSync" class="in-sync">
          <i class="bi" :class="cloudEmpty ? 'bi-cloud' : 'bi-cloud-check-fill'"></i>
          {{ cloudEmpty ? labels.cloudEmpty : labels.cloudInSync }}
        </span>
      </div>
      <p v-if="!history.length" class="empty">{{ labels.trackerNoGames }}</p>
      <ul v-else class="games">
        <li
          v-for="g in visibleGames"
          :key="g.id"
          class="game"
          role="button"
          tabindex="0"
          @click="openGame(g.id)"
          @keydown.enter="openGame(g.id)"
        >
          <div class="game-main">
            <div class="game-players">
              <span class="gp" :class="{ win: winnerIdx(g) === 0 }">{{ pname(g, 0) }}</span>
              <span class="vs">{{ labels.trackerVs }}</span>
              <span class="gp" :class="{ win: winnerIdx(g) === 1 }">{{ pname(g, 1) }}</span>
            </div>
            <div class="game-score">{{ g.result.totals[0] }} – {{ g.result.totals[1] }}</div>
          </div>
          <div class="game-meta">
            <span class="meta-left">
              <i
                v-if="status === 'authed' && isBackedUp(g.id)"
                class="bi bi-cloud-check-fill cloud-flag"
                :title="labels.cloudBackedUp"
              ></i>
              {{ formatDate(g.finishedAt || g.createdAt) }}
            </span>
            <button class="del" @click.stop="deleteHistory(g.id)">{{ labels.trackerDelete }}</button>
          </div>
        </li>
      </ul>
      <button v-if="history.length > visibleCount" class="show-more" @click="showMore">
        {{ labels.trackerShowMore }}
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AlphaBanner from '../../components/tracker/AlphaBanner.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'
import { useAuth } from '../../composables/useAuth.js'
import { useCloudSync } from '../../composables/useCloudSync.js'

const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, history, discardGame, deleteHistory } = useTracker()
const { status, user, login, logout, ensureSession, dev, mockSignIn, mockSignOut } = useAuth()
const {
  init: initCloudSync,
  syncNow,
  refreshCloudList,
  isBackedUp,
  syncing,
  lastError,
  inSync,
  cloudEmpty,
} = useCloudSync()

const SYNC_AFTER_LOGIN = 'wh11ed-sync-after-login'

function onSignIn() {
  // Remember intent so onMounted auto-syncs (upload local + restore cloud) once we return authed.
  try {
    sessionStorage.setItem(SYNC_AFTER_LOGIN, '1')
  } catch {
    /* ignore */
  }
  login('yandex')
}

// DEV-only: simulate sign-in/out without real OAuth (stripped from prod builds).
async function onMockToggle() {
  if (status.value === 'authed') {
    mockSignOut()
  } else {
    mockSignIn()
    await syncNow() // push local games into the mock cloud so backed-up icons appear
  }
}

// History pagination — show 10 at a time via "show more".
const PAGE = 10
const visibleCount = ref(PAGE)
const visibleGames = computed(() => history.value.slice(0, visibleCount.value))
function showMore() {
  visibleCount.value += PAGE
}
function openGame(id) {
  router.push('/tracker/history/' + id)
}

// Auth is restored silently ONLY here (the tracker section), on demand. If a session cookie is
// still valid the user is reconnected; otherwise the panel shows the sign-in button.
onMounted(async () => {
  initCloudSync()
  await ensureSession()
  // Finish a "Save to cloud" that triggered an OAuth redirect: once back and authenticated,
  // push the data the user intended to save.
  let pending = false
  try {
    pending = sessionStorage.getItem(SYNC_AFTER_LOGIN) === '1'
    if (pending) sessionStorage.removeItem(SYNC_AFTER_LOGIN)
  } catch {
    /* ignore */
  }
  if (status.value !== 'authed') return
  // Pending "sync after login" → full sync (uploads + refreshes cloud state). Otherwise just a
  // read-only cloud check to drive the "backed up" icons and the in-sync status.
  if (pending) syncNow()
  else refreshCloudList()
})

function startNew() {
  if (current.value && !window.confirm(labels.value.trackerOverwriteConfirm)) return
  discardGame()
  router.push('/tracker/game')
}
function pname(g, i) {
  return g.players[i].name || (i === 0 ? labels.value.trackerYou : labels.value.trackerOpponent)
}
function winnerIdx(g) {
  const [a, b] = g.result.totals
  if (a === b) return -1
  return a > b ? 0 : 1
}
function formatDate(iso) {
  try { return new Date(iso).toLocaleDateString(locale.value === 'ru' ? 'ru-RU' : 'en-GB') } catch { return '' }
}
</script>

<style scoped>
.tracker-home { padding-top: 0.5rem; }
/* Yandex ID branded sign-in button (login is Yandex OAuth) — brand red + the "Я" mark. */
.ya-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  background: #fc3f1d;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.15s;
}
.ya-btn:hover { background: #e63414; }
.ya-btn-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  color: #fc3f1d;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 0.92rem;
  line-height: 1;
}
.hero {
  text-align: center;
  padding: 1rem 0 0.8rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.25rem;
}
.hero h1 {
  font-family: var(--font-serif);
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
}
.hero-desc { color: var(--text-muted); font-size: 0.95rem; }
.cloud-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--text-dim);
}
.cloud-account { display: inline-flex; align-items: center; gap: 0.4rem; }
.cloud-account .bi { color: var(--accent); }
.cloud-hint { color: var(--text-muted); }
.cloud-link {
  background: none;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  font-size: 0.85rem;
  text-decoration: underline;
}
.cloud-link:hover { color: var(--accent); }
.cloud-err { color: #d9534f; }
.cta {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}
.cta .btn-primary { display: inline-flex; align-items: center; gap: 0.4rem; }
.btn-primary {
  padding: 0.7rem 1.6rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}
.btn-primary.ghost {
  background: none;
  color: var(--text-muted);
  border: 1px solid var(--border);
}
.history-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 0.8rem;
}
.history-head h2 {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}
.in-sync {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-dim);
}
.in-sync .bi { color: var(--accent); }
.empty { color: var(--text-muted); font-style: italic; }
.games { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; }
.game {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.7rem 0.9rem;
  cursor: pointer;
  transition: border-color 0.15s;
}
.game:hover { border-color: var(--accent); }
.game-main { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.game-players { display: flex; align-items: center; gap: 0.5rem; }
.gp { font-weight: 600; color: var(--text-primary); font-size: 0.92rem; }
.gp.win { color: var(--accent); }
.vs { font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; }
.game-score { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); }
.game-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.4rem;
  font-size: 0.76rem;
  color: var(--text-dim);
}
.meta-left { display: inline-flex; align-items: center; gap: 0.35rem; }
.cloud-flag { color: var(--accent); font-size: 0.82rem; }
.del { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 0.76rem; }
.del:hover { color: var(--accent); }
.show-more {
  display: block;
  margin: 0.8rem auto 0;
  padding: 0.5rem 1.2rem;
  background: none;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}
.show-more:hover { border-color: var(--accent); color: var(--accent); }
</style>
