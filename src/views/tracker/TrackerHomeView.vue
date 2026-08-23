<template>
  <div class="tracker-home">
    <div class="hero">
      <h1>{{ labels.trackerIntroHeading }}</h1>
      <p class="hero-desc">{{ labels.trackerIntroDesc }}</p>
      <!-- The first-timer's question ("does this keep the game if my phone sleeps?") is answered
           on /help, not here — one link rather than a paragraph nobody reads twice. -->
      <RouterLink class="hero-help" to="/help#help-tracker">{{ labels.helpLearnMore }}</RouterLink>
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
      <!-- No manual "Sync" button: onMounted runs a full syncNow on every entry and init()'s watcher
           auto-uploads games as they finish, so cloud backup stays current on its own. -->
      <button v-if="status === 'anon'" class="ya-btn" @click="onSignIn">
        <span class="ya-btn-logo" aria-hidden="true">Я</span>
        {{ labels.cloudSignInYandex }}
      </button>
      <!-- status === 'idle': silent ensureSession() is still in flight — show a disabled
           placeholder so the user can't fire a redundant OAuth redirect mid-restore. -->
      <button v-else-if="status === 'idle'" class="ya-btn" disabled>
        <i class="bi bi-arrow-repeat spin"></i>
      </button>
    </div>

    <section class="history">
      <div class="history-head">
        <h2>{{ labels.trackerHistory }}</h2>
        <span v-if="inSync" class="in-sync">
          <i class="bi" :class="cloudEmpty ? 'bi-cloud' : 'bi-cloud-check-fill'"></i>
          {{ cloudEmpty ? labels.cloudEmpty : labels.cloudInSync }}
          <!-- Force a full push+pull now (auto-sync already runs on entry) — for pulling changes
               from another device without leaving the page. -->
          <button
            class="sync-icon"
            :class="{ spinning: syncing }"
            :disabled="syncing"
            :title="labels.cloudSync"
            :aria-label="labels.cloudSync"
            @click="syncNow"
          >
            <i class="bi bi-arrow-clockwise"></i>
          </button>
        </span>
      </div>
      <p v-if="!history.length" class="empty">{{ labels.trackerNoGames }}</p>
      <TransitionGroup v-else tag="ul" name="list" class="games">
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
          <div class="gc-top">
            <span class="gc-date">
              <i
                v-if="status === 'authed' && isBackedUp(g)"
                class="bi bi-cloud-check-fill cloud-flag"
                :title="labels.cloudBackedUp"
              ></i>
              {{ formatDate(g.finishedAt || g.createdAt) }}
            </span>
            <button class="del" :title="labels.trackerDelete" @click.stop="onDeleteGame(g.id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>

          <div class="gc-body">
            <div class="gc-side gc-side--left">
              <span class="gc-name">{{ pname(g, 0) }}</span>
              <span class="gc-faction">{{ factionName(g, 0) }}</span>
            </div>
            <div class="gc-center">
              <div class="gc-score">{{ score(g)[0] }}<span class="gc-dash">–</span>{{ score(g)[1] }}</div>
              <div class="gc-result">{{ resultLabel(g) }}</div>
            </div>
            <div class="gc-side gc-side--right">
              <span class="gc-name">{{ pname(g, 1) }}</span>
              <span class="gc-faction">{{ factionName(g, 1) }}</span>
            </div>
          </div>

          <div class="gc-foot">{{ footLine(g) }}</div>
        </li>
      </TransitionGroup>
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
      :message="confirmState.message"
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
import { useTracker, BATTLE_SIZES } from '../../composables/useTracker.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
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
  isBackedUp,
  deleteGame,
  syncing,
  lastError,
  inSync,
  cloudEmpty,
} = useCloudSync()

// Deleting a game removes it locally AND from the cloud backup (so it doesn't resurface on
// another device or get re-downloaded by a later sync) — destructive, so confirm first.
function onDeleteGame(id) {
  confirmState.value = {
    title: labels.value.trackerDelete,
    message: labels.value.trackerDeleteConfirm,
    confirmLabel: labels.value.trackerDelete,
    action: () => { deleteHistory(id); deleteGame(id) },
  }
}

function onSignIn() {
  // On return, onMounted auto-syncs (upload backlog + restore cloud) as soon as we're authed.
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
  if (status.value !== 'authed') return
  // Auto-sync on entry: the init() watcher already auto-uploads games finished during this authed
  // session, but the pre-existing backlog (games from before login / earlier sessions) only went
  // up on a manual "Sync". Run a full syncNow instead — push the backlog and pull any cloud games
  // missing locally — so a signed-in user never has to press Sync and their games follow them
  // across devices and (crucially for the domain move) onto the new domain after login.
  syncNow()
})

// Pending-action confirmation. Holds the message and the action so one ConfirmModal
// serves "New game" / "Resume from history" (overwrite) and "Delete from history".
const confirmState = ref(null) // { title, message, confirmLabel, action } | null

function startNew() {
  if (current.value) {
    confirmState.value = { title: labels.value.trackerNewGame, message: labels.value.trackerOverwriteConfirm, confirmLabel: labels.value.trackerNewGame, action: doStartNew }
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
    confirmState.value = { title: labels.value.trackerResume, message: labels.value.trackerOverwriteConfirm, confirmLabel: labels.value.trackerResume, action: () => doResume(id) }
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
// The card is laid out "You"-first (left), regardless of stored order: opponent-first games are
// saved with You at players[1] (newGame reorders so index 0 is the first-turn player). `side` is
// 0 = You / left, 1 = opponent / right; map it to the real array index via the isYou flag.
function youIdx(g) { const i = g.players.findIndex(p => p.isYou); return i >= 0 ? i : 0 }
function idxOf(g, side) { const y = youIdx(g); return side === 0 ? y : (y === 0 ? 1 : 0) }

function pname(g, side) {
  const pl = g.players[idxOf(g, side)]
  return pl?.name || (side === 0 ? labels.value.trackerYou : labels.value.trackerOpponent)
}
function factionName(g, side) {
  return factionIndexBySlug(g.players[idxOf(g, side)]?.factionSlug)?.name || labels.value.trackerUnknownFaction
}

// Battle Points per stored array index; concede sweeps 20–0 to the non-conceding player. Uses the
// stored result.totals (VP at finish) — no recompute, so old saved games never break the list.
function bp(g) {
  const y = youIdx(g), o = y === 0 ? 1 : 0
  if (g.endReason === 'friendly-concede') { const r = [0, 0]; r[o] = 20; return r } // You conceded
  if (g.endReason === 'opponent-concede') { const r = [0, 0]; r[y] = 20; return r } // Opponent conceded
  const [a, b] = g.result?.totals || [0, 0]
  return battlePointsFromVp(a, b)
}
// Big centre score, ordered [You, opponent]: Battle Points in BP mode, else raw VP totals.
function score(g) {
  const src = g.settings?.scoreMode === 'bp' ? bp(g) : (g.result?.totals || [0, 0])
  return [src[youIdx(g)], src[idxOf(g, 1)]]
}
// Result from "You"'s perspective. Winner is decided by BP in BP mode (≤5 VP gap → 10–10 draw),
// by VP otherwise; concede overrides. VICTORY/DEFEAT/DRAW kept English, like the tracker's terms.
function winnerSide(g) {
  if (g.endReason === 'friendly-concede') return 'loss'
  if (g.endReason === 'opponent-concede') return 'win'
  const [you, opp] = score(g)
  if (you === opp) return 'draw'
  return you > opp ? 'win' : 'loss'
}
function resultClass(g) { const r = winnerSide(g); return r === 'win' ? 'res-win' : r === 'loss' ? 'res-loss' : 'res-draw' }
function resultLabel(g) { const r = winnerSide(g); return r === 'win' ? 'VICTORY' : r === 'loss' ? 'DEFEAT' : 'DRAW' }

function battleSizeName(g) {
  if (g.settings?.combatPatrol) return labels.value.trackerGameTypeCombatPatrol
  return BATTLE_SIZES.find(b => b.id === g.settings?.battleSize)?.name || ''
}
// Footer: battle size + scoring basis. BP mode names "Battle Points" and shows the raw VP alongside
// (the big score is BP there); VP mode just names "Victory Points" (the big score already IS the VP).
function footLine(g) {
  let basis
  if (g.settings?.scoreMode !== 'bp') {
    basis = labels.value.trackerVictoryPoints
  } else {
    const t = g.result?.totals || [0, 0]
    basis = `${labels.value.trackerBattlePoints} · ${labels.value.trackerScoreVp} ${t[youIdx(g)]}–${t[idxOf(g, 1)]}`
  }
  return [battleSizeName(g), basis].filter(Boolean).join(' · ')
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
.hero-help { display: inline-block; margin-top: 0.4rem; color: var(--accent); font-size: 0.85rem; }
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
/* Small "force sync" icon button next to the status — muted, highlights on hover, spins while syncing. */
.in-sync .sync-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.05rem;
  padding: 0.1rem;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
}
.in-sync .sync-icon .bi { color: var(--text-dim); font-size: 0.9rem; }
.in-sync .sync-icon:hover .bi { color: var(--accent); }
.in-sync .sync-icon:disabled { cursor: default; }
.in-sync .sync-icon.spinning .bi { animation: spin 0.8s linear infinite; color: var(--accent); }
.empty { color: var(--text-muted); font-style: italic; }
.games { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; position: relative; }
.game {
  position: relative;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.6rem 0.5rem 0.65rem;
  cursor: pointer;
  transition: border-color 0.15s;
}
.game:hover { border-color: var(--accent); }

.gc-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0 0.4rem;
  font-size: 0.76rem;
  color: var(--text-dim);
}
.gc-date { display: inline-flex; align-items: center; gap: 0.35rem; }
.cloud-flag { color: var(--accent); font-size: 0.82rem; }
.del {
  display: inline-flex;
  background: none;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  font-size: 0.85rem;
  line-height: 1;
  padding: 0.1rem;
}
.del:hover { color: var(--accent); }

.gc-body {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.15rem;
}
.gc-side { display: flex; flex-direction: column; gap: 0.05rem; min-width: 0; padding: 0.3rem 0.5rem; }
.gc-side--left { text-align: left; align-items: flex-start; }
.gc-side--right { text-align: right; align-items: flex-end; }
.gc-name {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 1.02rem;
  line-height: 1.15;
  overflow-wrap: anywhere;
}
.gc-faction { font-size: 0.8rem; color: var(--text-muted); line-height: 1.25; overflow-wrap: anywhere; }

.gc-center { display: flex; flex-direction: column; align-items: center; gap: 0.05rem; padding: 0 0.15rem; }
.gc-score {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.9rem;
  line-height: 1;
  color: var(--text-primary);
  white-space: nowrap;
  letter-spacing: -0.01em;
}
.gc-dash { margin: 0 0.24em; color: var(--text-dim); font-weight: 500; }
.gc-result { font-size: 0.66rem; font-weight: 800; letter-spacing: 0.11em; }
.res-win .gc-result { color: #e3b341; }
.res-loss .gc-result { color: #c0392b; }
.res-draw .gc-result { color: var(--text-dim); }

.gc-foot { text-align: center; margin-top: 0.4rem; font-size: 0.74rem; color: var(--text-dim); }

/* Narrowest phones (same threshold as the unit cards): shrink the player names, and the faction a
   touch, so long names + the centre score still fit the three-column row. */
@media (max-width: 480px) {
  .gc-name { font-size: 0.88rem; }
  .gc-faction { font-size: 0.74rem; }
}

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
