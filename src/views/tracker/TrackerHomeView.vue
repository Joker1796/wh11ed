<template>
  <div class="tracker-home">
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
      <RouterLink v-if="setupDraft && !current" to="/tracker/game" class="btn-primary">{{ labels.trackerContinueSetup }}</RouterLink>
      <button class="btn-primary" :class="{ ghost: current || setupDraft }" @click="startNew">{{ labels.trackerNewGame }}</button>
      <button
        v-if="status === 'authed'"
        class="btn-primary ghost"
        :disabled="syncing"
        @click="syncNow"
      >
        <i class="bi" :class="syncing ? 'bi-arrow-repeat' : 'bi-cloud-arrow-up-fill'"></i>
        {{ syncing ? labels.cloudSyncing : labels.cloudSync }}
      </button>
      <button v-else-if="status === 'anon'" class="ya-btn" @click="onSignIn">
        <span class="ya-btn-logo" aria-hidden="true">Я</span>
        {{ labels.cloudSignInYandex }}
      </button>
      <!-- status === 'idle': silent ensureSession() is still in flight — show a disabled
           placeholder so the user can't fire a redundant OAuth redirect mid-restore. -->
      <button v-else class="ya-btn" disabled>
        <i class="bi bi-arrow-repeat spin"></i>
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
          :class="resultClass(g)"
          role="button"
          tabindex="0"
          @click="openGame(g.id)"
          @keydown.enter="openGame(g.id)"
        >
          <span class="result-edge">{{ resultLabel(g) }}</span>
          <div class="game-main">
            <div class="game-players">
              <span class="gp">{{ pname(g, 0) }}</span>
              <span class="vs">{{ labels.trackerVs }}</span>
              <span class="gp">{{ pname(g, 1) }}</span>
            </div>
            <div class="game-score">
              <template v-if="g.settings && g.settings.scoreMode === 'bp'">
                {{ bp(g)[0] }} – {{ bp(g)[1] }}<span class="score-unit">BP</span>
              </template>
              <template v-else>{{ g.result.totals[0] }} – {{ g.result.totals[1] }}</template>
            </div>
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
            <button class="del" @click.stop="onDeleteGame(g.id)">{{ labels.trackerDelete }}</button>
          </div>
        </li>
      </ul>
      <button v-if="history.length > visibleCount" class="show-more" @click="showMore">
        {{ labels.trackerShowMore }}
      </button>
    </section>

    <GameSummaryModal
      v-if="summaryGame"
      :game="summaryGame"
      @resume="onResumeGame"
      @close="summaryGame = null"
    />

    <ConfirmModal
      v-if="confirmState"
      :title="confirmState.title"
      :message="labels.trackerOverwriteConfirm"
      :confirm-label="confirmState.confirmLabel"
      :cancel-label="labels.trackerCancel"
      @confirm="onConfirmAction"
      @close="confirmState = null"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GameSummaryModal from '../../components/tracker/GameSummaryModal.vue'
import ConfirmModal from '../../components/ConfirmModal.vue'
import { battlePointsFromVp } from '../../composables/gameScoring.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'
import { useAuth } from '../../composables/useAuth.js'
import { useCloudSync } from '../../composables/useCloudSync.js'
import { useFormatDate } from '../../composables/useFormatDate.js'

const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()
const { current, history, setupDraft, finishGame, archiveGame, resumeFromHistory, deleteHistory } = useTracker()
const { status, user, login, logout, ensureSession, dev, mockSignIn, mockSignOut } = useAuth()
const {
  init: initCloudSync,
  syncNow,
  refreshCloudList,
  isBackedUp,
  deleteGame,
  syncing,
  lastError,
  inSync,
  cloudEmpty,
} = useCloudSync()

// Deleting a game removes it locally AND from the cloud backup (so it doesn't resurface on
// another device or get re-downloaded by a later sync).
function onDeleteGame(id) {
  deleteHistory(id)
  deleteGame(id)
}

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
const summaryGame = ref(null)
function openGame(id) {
  summaryGame.value = history.value.find(g => g.id === id) || null
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

// Overwrite confirmation (shown only when a game is in progress). Holds the pending action
// so one ConfirmModal serves both "New game" and "Resume from history".
const confirmState = ref(null) // { title, confirmLabel, action } | null

function startNew() {
  if (current.value) {
    confirmState.value = { title: labels.value.trackerNewGame, confirmLabel: labels.value.trackerNewGame, action: doStartNew }
    return
  }
  doStartNew()
}
function doStartNew() {
  archiveCurrent()          // save the in-progress game to history (instead of losing it)
  setupDraft.value = null   // start the wizard fresh (a stale draft would otherwise restore)
  router.push('/tracker/game')
}
// Resume any finished game from the summary modal — pull it back into active play.
function onResumeGame(id) {
  summaryGame.value = null
  if (current.value) {
    confirmState.value = { title: labels.value.trackerResume, confirmLabel: labels.value.trackerResume, action: () => doResume(id) }
    return
  }
  doResume(id)
}
function doResume(id) {
  archiveCurrent()          // save the in-progress game to history before swapping in the chosen one
  resumeFromHistory(id)
  router.push('/tracker/game')
}
// Freeze the in-progress game at its current score and move it to history (resumable),
// reusing the normal end-of-game flow. No-op when there's no live game.
function archiveCurrent() {
  if (!current.value) return
  finishGame('early')
  archiveGame()
}
function onConfirmAction() {
  const action = confirmState.value?.action
  confirmState.value = null
  if (action) action()
}
function pname(g, i) {
  return g.players[i].name || (i === 0 ? labels.value.trackerYou : labels.value.trackerOpponent)
}
// Use the stored result.totals (VP at finish) — no recompute, so old saved games with
// possibly-incomplete data never break the list. Concede overrides the winner / BP.
function winnerIdx(g) {
  if (g.endReason === 'friendly-concede') return 1
  if (g.endReason === 'opponent-concede') return 0
  // In BP mode the winner is decided by Battle Points (≤5 VP gap → 10–10 draw).
  const [a, b] = g.settings?.scoreMode === 'bp' ? bp(g) : (g.result?.totals || [0, 0])
  if (a === b) return -1
  return a > b ? 0 : 1
}
function bp(g) {
  if (g.endReason === 'friendly-concede') return [0, 20]
  if (g.endReason === 'opponent-concede') return [20, 0]
  const [a, b] = g.result?.totals || [0, 0]
  return battlePointsFromVp(a, b)
}
// Result from "You" (player 0) perspective — WIN/LOSS/DRAW edge (labels not translated).
function resultClass(g) { const w = winnerIdx(g); return w === 0 ? 'res-win' : w === 1 ? 'res-loss' : 'res-draw' }
function resultLabel(g) { const w = winnerIdx(g); return w === 0 ? 'WIN' : w === 1 ? 'LOSS' : 'DRAW' }
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
.ya-btn:disabled { background: #fc3f1d; opacity: 0.6; cursor: default; }
.ya-btn .spin { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
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
  font-family: var(--font-display);
  font-size: 2.64rem;
  font-weight: 500;
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
  font-family: var(--font-display);
  font-size: 1.54rem;
  font-weight: 500;
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
  position: relative;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.7rem 0.9rem 0.7rem 1.9rem;
  cursor: pointer;
  transition: border-color 0.15s;
}
.game:hover { border-color: var(--accent); }
.result-edge {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}
.res-win .result-edge { background: #e3b341; color: #1a1a1a; }
.res-loss .result-edge { background: #c0392b; color: #fff; }
.res-draw .result-edge { background: var(--text-dim); color: var(--bg-card); }
.game-main { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.game-players { display: flex; align-items: center; gap: 0.5rem; }
.gp { font-weight: 600; color: var(--text-primary); font-size: 0.92rem; }
.vs { font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; }
.game-score { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); }
.score-unit { font-size: 0.62rem; color: var(--text-dim); margin-left: 0.25rem; }
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
