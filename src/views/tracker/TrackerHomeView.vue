<template>
  <div class="tracker-home">
    <!-- The page's heading row: the title on the left, and on the right the two things that are
         ABOUT this page rather than part of it — the way to its help, and where the games are
         kept. They used to be a centred title with a full-width line of their own underneath,
         which spent two bands of a phone's first screen on a name and a status. Signed out, the
         status is short and carries the long sentence in its tooltip: a reader who is not signed
         in is not reading a paragraph about why they should be.

         The help link is the RIGHTMOST of the two because it is the one that is always there in
         the same shape; the account line beside it changes with who is reading (an address, or
         three words about this device). The fixed thing holds the corner, the variable one grows
         and shrinks to its left. -->
    <div class="hero">
      <h1>{{ labels.trackerIntroHeading }}</h1>
      <div class="hero-side">
        <!-- Where the games are kept, not who is reading: signing in lives in the navbar's
             account menu (the ⚙ menu on a phone), so an address here was a label with nothing to
             do — the reader already knows who they are. The roster list says the same kind of
             thing in the same place, through RosterCloudBar's compact mode. -->
        <span
          class="cloud-account"
          :class="{ err: cloud.err }"
          :title="cloud.title"
        >
          <i :class="cloud.icon" />
          <span class="ca-text">{{ cloud.text }}</span>
        </span>
        <RouterLink
          class="hero-help"
          to="/help/tracker"
          :title="labels.helpSection"
          :aria-label="labels.helpSection"
        >
          <i class="wi wi-help" />
        </RouterLink>
      </div>
    </div>

    <!-- ONE thing to press, and a quiet row of the others.
         Four buttons of equal weight wrapped into a staircase and left nothing reading as "the
         way forward" (the screen the owner sent on 2026-09-23). What is primary depends entirely
         on what this phone is holding — a game, a setup left half-done, or nothing at all — so
         it is computed, and the row underneath carries whatever the primary is not. "New game"
         sits there on purpose once something IS in progress: it is the button that throws that
         away, and it has no business next to the one that continues it. -->
    <div
      class="cta"
      data-tour="home-cta"
    >
      <RouterLink
        v-if="primary.to"
        :to="primary.to"
        class="btn-primary btn-lg cta-main"
      >
        {{ primary.label }}
      </RouterLink>
      <button
        v-else
        class="btn-primary btn-lg cta-main"
        @click="startNew"
      >
        {{ primary.label }}
      </button>

      <div class="cta-quiet">
        <!-- Only when it is not the primary already. -->
        <button
          v-if="primary.to"
          type="button"
          class="btn-ghost"
          @click="startNew"
        >
          {{ labels.trackerNewGame }}
        </button>
        <!-- ONE entry for the shared game, both directions behind it. Starting one and joining
             someone else's are one subject, they differ in a single fact (an account is needed
             for one and not the other), and side by side they made the row three equal links
             under the primary button. The dialog asks which; it never needs an account itself. -->
        <button
          type="button"
          class="btn-ghost"
          data-tour="home-coop"
          @click="sharedOpen = true"
        >
          <i class="wi wi-people" /> {{ labels.lobbyNewGameShort }}
        </button>
        <!-- The way to the statistics (owner, 2026-09-29), the roster list heading's button,
             kept in the quiet row (owner, 2026-09-30) — taken over by the old tracker on
             2026-10-15. It replaced a record bar over the history, which showed only once a game
             counted and was a second door beside this one. Above 900px the subnav's tab is that way. -->
        <RouterLink
          to="/tracker/stats"
          class="btn-ghost cta-stats"
          data-tour="home-stats"
          :title="labels.statsLink"
          :aria-label="labels.statsLink"
        >
          <i class="wi wi-stats" /> <span class="cta-stats-text">{{ labels.statsLink }}</span>
        </RouterLink>
      </div>
      <!-- No manual "Sync" button: onMounted runs a full syncNow on every entry and init()'s watcher
           auto-uploads games as they finish, so cloud backup stays current on its own. And no
           sign-in button: the account is app-wide (the roster builder syncs through the same one),
           so the way in and out is the navbar's account menu — the line above only reports where
           the games stand. -->
    </div>

    <SharedGameModal
      v-if="sharedOpen"
      @create="onSharedCreate"
      @close="sharedOpen = false"
    />

    <section class="history">
      <div class="history-head">
        <h2>{{ labels.trackerHistory }}</h2>
        <span
          v-if="status === 'authed' && inSync"
          class="in-sync"
        >
          <!-- The state itself is said once, in the page heading. What belongs HERE is the way to
               ask again: a full push+pull now (auto-sync already runs on entry), for pulling in a
               game finished on another phone without leaving the page. -->
          <button
            class="sync-icon"
            :class="{ spinning: syncing }"
            :disabled="syncing"
            :title="labels.cloudSync"
            :aria-label="labels.cloudSync"
            @click="syncNow"
          >
            <i class="wi wi-sync" />
          </button>
        </span>
      </div>
      <p
        v-if="!history.length && !liveGame"
        class="empty"
      >
        {{ labels.trackerNoGames }}
      </p>
      <TransitionGroup
        v-else
        tag="ul"
        name="list"
        class="games"
      >
        <!-- The game in progress leads the list as a card of its own (a player's report,
             2026-10-15: "I always take the last game for the current one and tap it"): the same
             card, its score as it stands, "in progress" where the result would be, its frame
             lit — and a tap goes to the game. The Resume button above stays. -->
        <li
          v-for="g in rows"
          :key="g.live ? 'live' : g.id"
          class="game"
          :data-tour="g === visibleGames[0] ? 'home-history' : undefined"
          :class="g.live ? 'live' : resultClass(g)"
          role="button"
          tabindex="0"
          @click="openRow(g)"
          @keydown.enter="openRow(g)"
        >
          <FactionEmblem
            v-for="st in stampsOf(g)"
            :key="st.key"
            class="tone"
            :class="[st.side ? 'gc-stamp--right' : 'gc-stamp--left', st.slot && `gc-stamp--${st.slot}`]"
            :style="toneVars(st.faction?.color)"
            :faction="st.faction"
            stamp
          />
          <div class="gc-top">
            <!-- In progress: a tag where the date stands, its dot blinking like the live round's
                 point on the game screen (owner, 2026-10-15). -->
            <span
              v-if="g.live"
              class="gc-live"
            ><span
              class="gc-live-dot"
              aria-hidden="true"
            />{{ labels.trackerLiveTag }}</span>
            <span
              v-else
              class="gc-date"
            >
              <i
                v-if="status === 'authed' && isBackedUp(g)"
                class="wi wi-cloud-synced cloud-flag"
                :title="labels.cloudBackedUp"
              />
              {{ formatDate(g.finishedAt || g.createdAt) }}
            </span>
            <button
              v-if="!g.live"
              class="del"
              :title="labels.trackerDelete"
              @click.stop="onDeleteGame(g.id)"
            >
              <i class="wi wi-trash" />
            </button>
          </div>

          <div class="gc-body">
            <div class="gc-side gc-side--left">
              <span class="gc-name"><span
                v-if="youTag(g, 0)"
                class="gc-you"
              >{{ labels.trackerYou }}</span>{{ pname(g, 0) }}</span>
              <span
                v-for="(line, n) in armyLines(g, 0)"
                :key="n"
                class="gc-faction"
              >{{ line }}</span>
            </div>
            <div class="gc-center">
              <div class="gc-score">
                {{ score(g)[0] }}<span class="gc-dash">–</span>{{ score(g)[1] }}
              </div>
              <div class="gc-result">
                {{ g.live ? labels.trackerLiveRound.replace('{n}', g.currentRound || 1) : resultLabel(g) }}
              </div>
            </div>
            <div class="gc-side gc-side--right">
              <span class="gc-name"><span
                v-if="youTag(g, 1)"
                class="gc-you"
              >{{ labels.trackerYou }}</span>{{ pname(g, 1) }}</span>
              <span
                v-for="(line, n) in armyLines(g, 1)"
                :key="n"
                class="gc-faction"
              >{{ line }}</span>
            </div>
          </div>

          <div class="gc-foot">
            {{ footLine(g) }}
          </div>
        </li>
      </TransitionGroup>
      <ExpandTransition>
        <button
          v-if="history.length > visibleCount"
          class="show-more"
          @click="showMore"
        >
          {{ labels.trackerShowMore }}
        </button>
      </ExpandTransition>
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
import ExpandTransition from '../../components/ExpandTransition.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useTour } from '../../composables/useTour.js'
import { useRoute, useRouter } from 'vue-router'
import GameSummaryModal from '../../components/tracker/GameSummaryModal.vue'
import ConfirmModal from '../../components/ConfirmModal.vue'
import { battlePointsFromVp, concededSide, grandTotal, youIndex as youIdx } from '../../composables/gameScoring.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, membersOf, isYouSide, battleName } from '../../composables/useTracker.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import { toneVars } from '../../utils/tone.js'
import { useAuth } from '../../composables/useAuth.js'
import { useCloudSync } from '../../composables/useCloudSync.js'
import { useParty } from '../../composables/useParty.js'
import SharedGameModal from '../../components/tracker/SharedGameModal.vue'
import FactionEmblem from '../../components/FactionEmblem.vue'
import { useFormatDate } from '../../composables/useFormatDate.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()
const { current, history, setupDraft, putAwayCurrent, resumeFromHistory, deleteHistory } = useTracker()
// Only the host of a shared game needs an account, and this is the button that makes one.
const { canShare, init: initParty } = useParty()
const { status, ensureSession } = useAuth()
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

// Signing in no longer means arriving on this page: the navbar's account menu can do it from
// here, so run the same full sync that entering the page runs. (Real OAuth reloads the page and
// onMounted covers it; this catches an in-place sign-in, e.g. the DEV mock.)
watch(status, (s) => { if (s === 'authed') syncNow() })


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

// History pagination — show 10 at a time via "show more".
const PAGE = 10
const visibleCount = ref(PAGE)
const visibleGames = computed(() => history.value.slice(0, visibleCount.value))
function showMore() {
  visibleCount.value += PAGE
}
const summaryGame = ref(null)
// The game in progress as a history card: the card reads `result.totals`, which a game only gets
// when it ends, so its totals as they stand are lent to it here.
const liveGame = computed(() => {
  const g = current.value
  if (!g || g.phase !== 'playing') return null
  return { ...g, live: true, result: { totals: [grandTotal(g, 0), grandTotal(g, 1)] } }
})
const rows = computed(() => (liveGame.value ? [liveGame.value, ...visibleGames.value] : visibleGames.value))
function openRow(g) {
  if (g.live) router.push('/tracker/game')
  else openGame(g.id)
}
function openGame(id) {
  summaryGame.value = history.value.find(g => g.id === id) || null
}
// A finished game's roster (opened from this modal) comes back here with `?game=<id>`, and the
// modal it was opened from opens again. The query is dropped at once so a reload lands on the list.
if (route.query.game) {
  openGame(String(route.query.game))
  router.replace({ query: {} })
}

const { maybeStart: maybeStartTour } = useTour()
onMounted(async () => {
  maybeStartTour('home')
  initCloudSync()
  // A shared game archived from here ("New game", resuming another) has to say goodbye to the
  // other phones; the watcher that does so is armed once, and this is the earliest screen.
  initParty()
  // The session is restored app-wide (App.vue) now that the account lives in the navbar; this
  // await just joins that in-flight restore — refresh() de-dupes, so it costs no extra request.
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
    const lobby = current.value.phase === 'setup'
    confirmState.value = {
      title: labels.value.trackerNewGame,
      message: lobby ? labels.value.lobbyDiscardConfirm : labels.value.trackerOverwriteConfirm,
      confirmLabel: labels.value.trackerNewGame,
      action: doStartNew,
    }
    return
  }
  doStartNew()
}
function doStartNew() {
  archiveCurrent()          // save the in-progress game to history (instead of losing it)
  setupDraft.value = null   // start the wizard fresh (a stale draft would otherwise restore)
  router.push('/tracker/game')
}

// One line about the CLOUD, the counterpart of RosterCloudBar's compact mode on the roster list:
// where these games are kept, and nothing about the account itself. Signed out it is three words
// with the long sentence in its tooltip; signed in it answers the only question worth answering
// on entry — is what is on this phone also somewhere else.
const cloud = computed(() => {
  const l = labels.value
  if (status.value === 'down') return { icon: 'wi wi-cloud-error', text: l.cloudServerDown, title: l.cloudServerDownHint, err: true }
  if (status.value !== 'authed') return { icon: 'wi wi-cloud', text: l.cloudLocalOnly, title: l.cloudSignInHint }
  if (lastError.value) return { icon: 'wi wi-cloud-error', text: l.cloudNotSynced, title: l.cloudError, err: true }
  if (syncing.value) return { icon: 'wi wi-sync', text: l.cloudSyncing, title: '' }
  if (inSync.value) {
    return cloudEmpty.value
      ? { icon: 'wi wi-cloud', text: l.cloudEmpty, title: '' }
      : { icon: 'wi wi-cloud-synced', text: l.cloudInSync, title: '' }
  }
  return { icon: 'wi wi-cloud', text: l.cloudSyncing, title: '' }
})

// What the one big button does, and what it says. A game in progress (or a lobby, or a setup
// left half-done) is always the thing to continue; with nothing held, starting one is.
const primary = computed(() => {
  if (current.value) {
    return {
      to: '/tracker/game',
      label: current.value.phase === 'setup' ? labels.value.trackerContinueSetup : labels.value.trackerResume,
    }
  }
  if (setupDraft.value) return { to: '/tracker/game', label: labels.value.trackerContinueSetup }
  return { to: null, label: labels.value.trackerNewGame }
})

// The same start, with the lobby opened on arrival: `?share=1` is the wizard's instruction to
// share as soon as it is on screen, so the host lands on the armies step with the code already
// in hand instead of finding a button there. `choice` is what SharedGameModal asked for — the host's
// name, the game type (set before the lobby opens, because the lobby locks it) and, in doubles, the
// team names.
function startShared(choice) {
  if (!canShare.value) return
  if (current.value) {
    const lobby = current.value.phase === 'setup'
    confirmState.value = {
      title: labels.value.lobbyNewGame,
      message: lobby ? labels.value.lobbyDiscardConfirm : labels.value.trackerOverwriteConfirm,
      confirmLabel: labels.value.lobbyNewGame,
      action: () => doStartShared(choice),
    }
    return
  }
  doStartShared(choice)
}
const sharedOpen = ref(false)
function onSharedCreate(choice) {
  sharedOpen.value = false
  startShared(choice)
}
function doStartShared(choice) {
  archiveCurrent()
  setupDraft.value = null
  const query = { share: '1' }
  if (choice?.mode && choice.mode !== 'singles') query.mode = choice.mode
  if (choice?.name) query.name = choice.name
  if (choice?.teams?.[0]) query.team0 = choice.teams[0]
  if (choice?.teams?.[1]) query.team1 = choice.teams[1]
  router.push({ path: '/tracker/game', query })
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
  putAwayCurrent()
}
function onConfirmAction() {
  const action = confirmState.value?.action
  confirmState.value = null
  if (action) action()
}
// The card is laid out in TURN order, as the game screen, its result and the review are: the side
// that moved first stands on the left (owner, 2026-10-19). `players` is stored that way — newGame
// puts the first-turn player at index 0 — so a card side IS an array index. A game not started yet
// keeps the setup's order, you first.
function idxOf(g, side) { return side }

// A short last word (a game number, an initial) is glued to the one before it: at 320px "Партия 4"
// broke after the word and left the number alone on a line of its own.
function pname(g, side) {
  const pl = g.players[idxOf(g, side)]
  const name = pl?.name || (isYouSide(pl, side) ? labels.value.trackerYou : labels.value.trackerOpponent)
  return name.replace(/ (\S{1,3})$/, '\u00a0$1')
}
// "You" beside your own name: the card is in turn order, so your side is not always the left one.
function youTag(g, side) {
  const pl = g.players[idxOf(g, side)]
  return isYouSide(pl, side) && !!pl?.name
}
// A side's armies: the side itself in singles, its two members in doubles.
const armiesOfSide = (g, side) => membersOf(g.players[idxOf(g, side)] || {})
// The emblems pressed into the card. One per side — or, when a doubles team fielded two DIFFERENT
// factions, both, smaller and stepped diagonally (`a` toward the score and up, `b` toward the edge
// and down), so the card says "two armies" before a word is read (owner, 2026-10-05). The same
// faction twice stays one emblem: two identical stamps would only be noise.
function stampsOf(g) {
  const out = []
  for (const side of [0, 1]) {
    const seen = new Set()
    const factions = []
    for (const m of armiesOfSide(g, side)) {
      const f = factionIndexBySlug(m?.factionSlug)
      if (f && !seen.has(f.slug)) { seen.add(f.slug); factions.push(f) }
    }
    if (factions.length > 1) factions.slice(0, 2).forEach((f, i) => out.push({ key: `${side}${i}`, side, faction: f, slot: i ? 'b' : 'a' }))
    else out.push({ key: `${side}`, side, faction: factions[0] || null, slot: '' })
  }
  return out
}
// The text under a side's name: its faction in singles; in doubles one line per player — "Vasya ·
// Adepta Sororitas" — rather than "A + B", which said what was fielded but not by whom, and wrapped
// anyway (owner, 2026-10-05).
function armyLines(g, side) {
  const armies = armiesOfSide(g, side)
  const doubles = g.settings?.gameType === 'doubles' && armies.length > 1
  if (!doubles) {
    return [factionIndexBySlug(armies[0]?.factionSlug)?.name || labels.value.trackerUnknownFaction]
  }
  // A doubles team: its name above (pname), its two factions here — no players' names (owner,
  // 2026-10-21): "Вася · Adepta Sororitas" in a third of a phone broke inside the faction.
  return armies.map((m) => factionIndexBySlug(m?.factionSlug)?.name || labels.value.trackerUnknownFaction)
}

// Battle Points per stored array index; concede sweeps 20–0 to the non-conceding player. Uses the
// stored result.totals (VP at finish) — no recompute, so old saved games never break the list.
function bp(g) {
  const c = concededSide(g)
  if (c >= 0) { const r = [0, 0]; r[1 - c] = 20; return r } // the side that did not concede
  const [a, b] = g.result?.totals || [0, 0]
  return battlePointsFromVp(a, b)
}
// Big centre score, ordered as the card's sides (left, right): Battle Points in BP mode, else raw VP.
function score(g) {
  const src = g.settings?.scoreMode === 'bp' ? bp(g) : (g.result?.totals || [0, 0])
  return [src[idxOf(g, 0)], src[idxOf(g, 1)]]
}
// Result from "You"'s perspective. Winner is decided by BP in BP mode (≤5 VP gap → 10–10 draw),
// by VP otherwise; concede overrides. The label follows the locale (owner, 2026-10-18: «ПОБЕДА»,
// not VICTORY — the finished screen already said «Ничья»).
function winnerSide(g) {
  const c = concededSide(g)
  if (c >= 0) return c === youIdx(g) ? 'loss' : 'win'
  const y = youIdx(g)
  const sides = score(g)
  const [you, opp] = [sides[y], sides[1 - y]]
  if (you === opp) return 'draw'
  return you > opp ? 'win' : 'loss'
}
function resultClass(g) { const r = winnerSide(g); return r === 'win' ? 'res-win' : r === 'loss' ? 'res-loss' : 'res-draw' }
function resultLabel(g) { const r = winnerSide(g); const l = labels.value; return r === 'win' ? l.trackerResultWin : r === 'loss' ? l.trackerResultLoss : l.trackerResultDraw }

function battleSizeName(g) {
  if (g.settings?.combatPatrol) return labels.value.trackerGameTypeCombatPatrol
  return battleName(g.settings, labels.value.trackerBattleCustom)
}
// Footer: battle size + scoring basis. BP mode names "Battle Points" and shows the raw VP alongside
// (the big score is BP there); VP mode just names "Victory Points" (the big score already IS the VP).
function footLine(g) {
  let basis
  if (g.settings?.scoreMode !== 'bp') {
    basis = labels.value.trackerVictoryPoints
  } else {
    const t = g.result?.totals || [0, 0]
    basis = `${labels.value.trackerBattlePoints} · ${labels.value.trackerScoreVp} ${t[idxOf(g, 0)]}–${t[idxOf(g, 1)]}`
  }
  return [battleSizeName(g), basis].filter(Boolean).join(' · ')
}
</script>

<style scoped>
.tracker-home { padding-top: 0.5rem; }

@keyframes spin { to { transform: rotate(360deg); } }
.hero {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.2rem 0.75rem;
  padding: 0.2rem 0 0.45rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1rem;
}
.hero h1 {
  font-family: var(--font-display);
  font-size: 2.1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.1;
}
/* The pair on the right rides the heading's baseline and shrinks before the title does — a long
   address ellipsizes rather than pushing the row onto a second line. */
.hero-side {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  font-size: 0.8rem;
  color: var(--text-muted);
}
.cloud-account {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
}
.cloud-account .ca-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cloud-account.err { color: var(--danger); }

.cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
/* Sized by its own label and nothing else. A minimum width was tried first (18rem) and it was
   wrong twice over: at desktop width the button read as a banner, and `.btn-primary` is an
   inline-flex with no `justify-content`, so the label sat against the left edge of all that
   width instead of in the middle of it. A button the width of its text has neither problem —
   and it stops the button and the row under it from being two bars of the same length. */
.cta-main { max-width: 100%; }

/* The alternatives: grey framed buttons (owner, 2026-09-30), a step under the primary — they
   were bare text before, and read as captions rather than things to press. */
.cta-quiet {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
/* Above the subnav's breakpoint its Statistics tab is on screen — no second door beside it. */
@media (min-width: 901px) {
  .cta-stats { display: none; }
}

/* The quiet row on one line down to the narrowest phone: where the three do not fit, Statistics
   keeps its icon only, as on the roster list (its name stays in the title and the accessible
   name). Measured, not guessed (2026-10-15): in Russian the full row wraps up to 505px — the
   beta's 400px left it on two lines from 401 to 505 (owner's screenshot). */
@media (max-width: 520px) {
  .cta-stats-text { display: none; }
}
@media (max-width: 480px) {
  /* Same trim as the roster list's heading: display type eats a phone's first screen, and the
     heading is the least useful thing on it. */
  .hero h1 { font-size: 1.75rem; }
  .hero-side { font-size: 0.75rem; }
  .cta { gap: 0.5rem; margin-bottom: 0.8rem; }
  /* The same buttons the roster list draws at this width — the same kind of call to action,
     and two screens of one app should not disagree about how big that is. */
  .cta-main,
  .cta-quiet .btn-ghost {
    padding: 0.45rem 0.8rem;
    font-size: 0.8rem;
    white-space: nowrap;
  }
}
/* …and on a 320px phone, where even then "Shared game" in Russian pushes the row to two lines,
   the buttons give up a little side padding (measured 2026-10-15: two rows at 320–325px). */
@media (max-width: 340px) {
  .cta-quiet { gap: 0.4rem; }
  .cta-quiet .btn-ghost { padding-inline: 0.6rem; }
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
.in-sync .wi { color: var(--accent-ink); }
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
.in-sync .sync-icon .wi { color: var(--text-dim); font-size: 0.9rem; }
.in-sync .sync-icon:hover .wi { color: var(--accent-ink); }
.in-sync .sync-icon:disabled { cursor: default; }
.in-sync .sync-icon.spinning .wi { animation: spin 0.8s linear infinite; color: var(--accent-ink); }
.empty { color: var(--text-muted); font-style: italic; }
.games { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; position: relative; }
.game {
  position: relative;
  overflow: hidden;
  isolation: isolate; /* each side's emblem stamp (FactionEmblem) sits under the card's text */
  container-type: inline-size; /* the stamps' step in toward the score reads the card's width */
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 0.6rem 0.5rem 0.65rem;
  cursor: pointer;
  transition: border-color 0.15s;
}
.game:hover { border-color: var(--accent); }
/* Each side's emblem pressed into its own half, by the same rule as every card's stamp
   (FactionEmblem): its size from its ink, its centre on one spot — here a card's height in from
   its own edge, the first player's from the left, the second's from the right. This card is about
   twice a Combat Patrol card's height and its own height varies (a long name wraps), so the stamp is
   sized on a fixed 6rem rather than on the card — which keeps the two apart under the score on a
   320px phone whatever the names do. */
/* Where the card is wider than a phone, both stamps step in toward the score (owner, 2026-10-09):
   at 3.8rem from the edge a desk card left them stranded in its corners, the length of a name away
   from the result they belong to. The step is what the card has beyond a phone's — nothing at
   390px — and stops 10rem short of the middle, clear of the score with the widest emblem. */
.game .stamp {
  --gc-in: max(0rem, 50cqw - 13.8rem);
  height: calc(var(--stamp-k) * 6rem);
  right: calc(3.8rem + var(--gc-in));
}
.game .gc-stamp--left { right: auto; left: calc(3.8rem + var(--gc-in)); transform: translate(-50%, -50%); }
/* A doubles team of two factions: both emblems, smaller, stepped on a diagonal around the side's
   usual spot — `a` in toward the score and up, `b` out toward the edge and down, so the upper one
   stays clear of the team name (owner, 2026-10-05) — overlapping a little, and neither reaching
   the score on a 320px phone. */
.game .gc-stamp--a,
.game .gc-stamp--b { height: calc(var(--stamp-k) * 4.2rem); }
.game .gc-stamp--a { top: 29%; }
.game .gc-stamp--b { top: 73%; }
.game .gc-stamp--left.gc-stamp--a { left: calc(5.5rem + var(--gc-in)); }
.game .gc-stamp--left.gc-stamp--b { left: calc(2.2rem + var(--gc-in)); }
.game .gc-stamp--right.gc-stamp--a { right: calc(5.5rem + var(--gc-in)); }
.game .gc-stamp--right.gc-stamp--b { right: calc(2.2rem + var(--gc-in)); }

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
.cloud-flag { color: var(--accent-ink); font-size: 0.82rem; }
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
.del:hover { color: var(--accent-ink); }

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
/* The same label as on the game's board (ScoreBoard's .you-tag), in the text's own colour here. */
.gc-you {
  display: inline-block;
  margin-right: 0.3rem;
  padding: 0 0.3rem;
  border: 1px solid var(--text-muted);
  color: var(--text-muted);
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  vertical-align: 0.15em;
}

.gc-center { display: flex; flex-direction: column; align-items: center; gap: 0.05rem; padding: 0 0.15rem; }
.gc-score {
  font-family: var(--font-display);
  font-weight: 700;
  /* Large, the one thing a history row is read for (owner, 2026-09-29) — but by the width: at
     320px a 2.6rem "100 – 95" squeezed both names into mid-word breaks. */
  font-size: clamp(1.9rem, 9.5vw, 2.6rem);
  line-height: 1;
  color: var(--text-primary);
  white-space: nowrap;
  letter-spacing: -0.01em;
}
.gc-dash { margin: 0 0.24em; color: var(--text-dim); font-weight: 500; }
.gc-result { font-size: 0.66rem; font-weight: 700; letter-spacing: 0.11em; }
.res-win .gc-result { color: #e3b341; }
.res-loss .gc-result { color: var(--danger); }
.res-draw .gc-result { color: var(--text-dim); }
/* The game in progress: its frame in the accent, breathing, the card a shade warmer — a fade, never
   a move (the house rule), and still under reduced motion (the token is 0 there). */
/* The game in progress: a card a shade warmer, its "In progress" tag's dot breathing — no frame
   (owner, 2026-10-15: a pulsing frame was tried and taken off). */
.game.live { background: color-mix(in srgb, var(--accent) 6%, var(--bg-card)); }
.live .gc-result { color: var(--accent-ink); }
.gc-live {
  display: inline-flex; align-items: center; gap: 0.35rem;
  padding: 0.05rem 0.45rem;
  background: var(--accent); color: var(--text-on-accent, #fff);
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
}
.gc-live-dot {
  width: 6px; height: 6px; border-radius: 50%; background: currentColor;
  animation: live-dot calc(var(--motion-slow) * 6) ease-in-out infinite;
}
@keyframes live-dot { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }

.gc-foot { text-align: center; margin-top: 0.4rem; font-size: 0.74rem; color: var(--text-dim); }

/* Narrowest phones (same threshold as the unit cards): shrink the player names, and the faction a
   touch, so long names + the centre score still fit the three-column row. */
@media (max-width: 480px) {
  .gc-name { font-size: 0.88rem; }
  .gc-faction { font-size: 0.74rem; }
}

</style>
