<template>
  <BaseModal
    :title="labels.trackerEditSetupTitle"
    max-width="560px"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <p class="es-note">
        {{ guest ? labels.trackerEditSetupGuestNote : labels.trackerEditSetupNote }}
      </p>

      <!-- A guest in a shared game gets only the option blocks — the players, the turn order, the
           score mode and the layout ARE the game and belong to the host (the note above says so
           in place of the controls). Of the options, the rows marked `local` in the table are
           this phone's; the others are drawn disabled with "host only" (TrackOptions). -->
      <div
        v-if="!guest"
        class="players"
      >
        <div
          v-for="(p, i) in players"
          :key="i"
          class="player-card"
        >
          <h3 class="player-head">
            {{ playerLabel(i) }}
          </h3>
          <label
            v-if="isDoubles"
            class="field"
          >
            <span>{{ labels.trackerTeamName }}</span>
            <input
              v-model="p.teamName"
              type="text"
              :placeholder="labels.trackerTeamName"
            >
          </label>

          <!-- The name + list block, once per army: the side itself in singles, each member in
               doubles (same armiesOf recipe as the wizard's step 1). -->
          <div
            v-for="(m, mi) in armiesOf(p)"
            :key="mi"
            :class="{ 'member-block': isDoubles }"
          >
            <h4
              v-if="isDoubles"
              class="member-head"
            >
              {{ mi === 0 ? labels.trackerPlayer1 : labels.trackerPlayer2 }}
            </h4>
            <label class="field">
              <input
                v-model="m.name"
                type="text"
                :placeholder="isDoubles ? labels.trackerMemberName : namePlaceholder(i)"
              >
            </label>

            <!-- Attaching a list AFTER the game started. The wizard is the other (and usual) place
                 to do this; without it here, a player who built a list but forgot to pick it — or
                 whose game predates the feature — had no way back. Unlike the wizard, the list does
                 not decide the army here: the faction is already being played. -->
            <div class="es-roster">
              <div
                v-if="m.roster"
                class="roster-line"
              >
                <span class="rl-text">{{ m.roster.name || labels.rosterUntitled }}</span>
                <button
                  type="button"
                  class="rl-clear"
                  :aria-label="labels.trackerRosterDetach"
                  :title="labels.trackerRosterDetach"
                  @click="clearRoster(m)"
                >
                  ✕
                </button>
              </div>
              <button
                v-else
                type="button"
                class="rp-open"
                @click="rosterPickerKey = ak(i, mi)"
              >
                <i class="bi bi-card-list" />
                <span>{{ labels.trackerRosterAttach }}</span>
              </button>
              <!-- The one thing attaching can't fix, so it has to be said rather than silently
                   tolerated: the list is played under a different detachment than the game is. -->
              <p
                v-if="detMismatch(m)"
                class="rl-warn"
              >
                {{ labels.trackerRosterDetMismatch }}
              </p>
            </div>

            <RosterPickerModal
              v-if="rosterPickerKey === ak(i, mi)"
              :selected="m.roster ? (m.rosterId || '') : null"
              :faction="m.factionSlug"
              @pick="r => pickRoster(m, r)"
              @clear="clearRoster(m)"
              @close="rosterPickerKey = ''"
            />
          </div>

          <label
            class="check"
            :class="{ on: p.battleReady }"
          >
            <input
              v-model="p.battleReady"
              type="checkbox"
            >
            <span>{{ labels.trackerBattleReady }} (+10 VP)</span>
          </label>
        </div>
      </div>

      <div
        v-if="!guest"
        class="settings deploy-opts"
      >
        <label class="field">
          <span>{{ labels.trackerFirstTurn }}</span>
          <div class="seg">
            <button
              :class="{ on: settings.firstTurn === 1 }"
              @click="settings.firstTurn = 1"
            >{{ labels.trackerYou }}</button>
            <button
              :class="{ on: settings.firstTurn === 2 }"
              @click="settings.firstTurn = 2"
            >{{ labels.trackerOpponent }}</button>
          </div>
        </label>

        <label class="field">
          <span>
            {{ labels.trackerScoreMode }}
            <button
              type="button"
              class="help-btn"
              :aria-label="labels.trackerScoreHelp"
              @click="scoreHelpOpen = true"
            ><i class="bi bi-question-circle" /></button>
          </span>
          <div class="seg">
            <button
              :class="{ on: settings.scoreMode === 'vp' }"
              @click="settings.scoreMode = 'vp'"
            >{{ labels.trackerScoreVp }}</button>
            <button
              :class="{ on: settings.scoreMode === 'bp' }"
              @click="settings.scoreMode = 'bp'"
            >{{ labels.trackerScoreBp }}</button>
          </div>
        </label>
      </div>

      <!-- The same block as the wizard's, off the same table — a row offered there is offered
           here. Its ctx reads the DRAFT's rosters, not the game's: a list attached in this very
           dialog should make the phase row available before Save, and this is the only way a game
           that started without a list can ever get the clock. -->
      <div class="settings">
        <TrackOptions
          :settings="settings"
          :ctx="trackCtx"
          group="game"
          :lock-shared="guest"
        />
        <TrackOptions
          :settings="settings"
          :ctx="trackCtx"
          group="roster"
          heading="trackerRosterHeading"
          :lock-shared="guest"
        />
      </div>

      <div
        v-if="!guest && layouts.length"
        class="settings layout-block"
      >
        <h3 class="block-head">
          {{ labels.trackerLayoutHeading }}
        </h3>
        <div class="tabs">
          <button
            v-for="l in layouts"
            :key="l.id"
            class="tab"
            :class="{ active: settings.layout === l.id }"
            @click="selectLayout(l.id)"
          >
            <span class="tab-word">{{ labels.eventLayout }}</span> {{ l.id }}
          </button>
          <button
            class="tab"
            :class="{ active: settings.layout === 'custom' }"
            @click="layoutPickerOpen = true"
          >
            {{ labels.trackerLayoutCustom }}
          </button>
        </div>
        <LayoutCard
          v-if="currentLayout"
          :layout="currentLayout"
        />
      </div>
    </div>

    <footer class="modal-foot">
      <button
        class="btn-ghost"
        @click="$emit('close')"
      >
        {{ labels.trackerCancel }}
      </button>
      <button
        class="btn-primary"
        @click="save"
      >
        {{ labels.trackerSave }}
      </button>
    </footer>

    <ScoreHelpModal
      v-if="scoreHelpOpen"
      @close="scoreHelpOpen = false"
    />
    <LayoutPickerModal
      v-if="layoutPickerOpen"
      :selected="settings.layout === 'custom' ? settings.customLayout : null"
      :matchup="{ you: game.players[0].disposition, opp: game.players[1].disposition }"
      @pick="onPickLayout"
      @close="layoutPickerOpen = false"
    />
  </BaseModal>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import LayoutCard from '../event/LayoutCard.vue'
import ScoreHelpModal from './ScoreHelpModal.vue'
import LayoutPickerModal from './LayoutPickerModal.vue'
import RosterPickerModal from './RosterPickerModal.vue'
import TrackOptions from './TrackOptions.vue'
import { trackSettingsOf, normalizeTrackSettings, LOCAL_TRACK_SETTINGS } from '../../data/trackerOptions.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { eventCompanion } from '../../data/eventCompanion.js'
import { useTracker, membersOf } from '../../composables/useTracker.js'
import { useParty } from '../../composables/useParty.js'
import { resolveLayout } from '../../composables/trackerLayout.js'
import { rosterSnapshot } from '../../composables/rosterGameLink.js'

const emit = defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, updateSetup } = useTracker()
const game = current.value
// A guest in a shared game (useParty.js): the setup is the host's, and only the phone-local
// options are offered here. Resolved once — a hand-over mid-dialog is not worth a live gate.
const { active: partyActive, isHost } = useParty()
const guest = partyActive.value && !isHost.value

const isDoubles = game.settings.gameType === 'doubles'

// Local draft — only committed to the store on Save, so Cancel discards edits cleanly.
const players = reactive(game.players.map(p => ({
  name: p.name,
  battleReady: p.battleReady,
  // The army half of the draft. `factionSlug`/`detachments` ride along read-only in the normal
  // case — they're here so attaching can fill one that was never set, and so the mismatch
  // warning has something to compare against.
  rosterId: p.rosterId || null,
  roster: p.roster || null,
  factionSlug: p.factionSlug || null,
  detachments: [...(p.detachments || [])],
  // Doubles: the team name and each member's editable slice, mirroring the side's own fields.
  teamName: p.teamName || '',
  members: (p.members || []).map(m => ({
    name: m.name,
    rosterId: m.rosterId || null,
    roster: m.roster || null,
    factionSlug: m.factionSlug || null,
    detachments: [...(m.detachments || [])],
  })),
})))

// The armies a side fields — itself in singles, its members in doubles (see GameSetup.vue).
function armiesOf(p) {
  return isDoubles ? p.members : [p]
}
function ak(i, mi) {
  return `${i}:${mi}`
}
// Takes either a draft side or a game side (trackCtx below reads the GAME's players).
function sideFaction(p) {
  return membersOf(p).find((m) => m.factionSlug)?.factionSlug ?? null
}
const settings = reactive({
  // Every "what to track" flag, filled in for a game saved before it existed — the table owns the
  // back-compat (retired field names, per-option defaults), so this dialog carries none of it.
  ...trackSettingsOf(game.settings),
  // game.settings.firstTurn is always normalized to 1 post-creation (see newGame) — the
  // actual "who's first" lives in player order, so derive the toggle from that instead.
  firstTurn: (game.players[0].isYou ?? true) ? 1 : 2,
  scoreMode: game.settings.scoreMode,
  layout: game.settings.layout,
  customLayout: game.settings.customLayout,
})

const anyRoster = computed(() => players.some((p) => armiesOf(p).some((m) => !!m.roster)))

function isYou(i) { return game.players[i].isYou ?? i === 0 }
function playerLabel(i) { return isYou(i) ? labels.value.trackerYou : labels.value.trackerOpponent }
function namePlaceholder(i) { return isYou(i) ? labels.value.trackerYourName : labels.value.trackerOpponentName }

// Dispositions are fixed for the rest of the game, so the recommended-layout matchup
// (same lookup as GameSetup step 3) can't change here — only the A/B/C/custom pick can.
const matchups = eventCompanion.en.matchups
const matchup = computed(() => {
  const you = game.players[0].disposition, opp = game.players[1].disposition
  if (!you || !opp) return null
  return matchups.find(m => (m.a === you && m.b === opp) || (m.a === opp && m.b === you)) || null
})
const layouts = computed(() => matchup.value?.layouts ?? [])
const currentLayout = computed(() => resolveLayout(settings, game.players[0].disposition, game.players[1].disposition))
const layoutPickerOpen = ref(false)
function selectLayout(id) { settings.layout = id; settings.customLayout = null }
function onPickLayout(l) { settings.layout = 'custom'; settings.customLayout = l; layoutPickerOpen.value = false }

const scoreHelpOpen = ref(false)

// ── Attaching an army list to a game already under way ──
// Keyed by ak(side, member) — '' = closed; the handlers take the army object itself.
const rosterPickerKey = ref('')

// The wizard's pickRoster lets the list DICTATE the faction and the detachments (see GameSetup).
// Here it may only fill in what is still blank: the faction of a game saved before one was
// mandatory, and detachments not yet chosen. Anything already standing stays — the game has been
// played under it, and rewriting it would silently change which stratagems and how much DP the
// player has had all along. A disagreement is reported instead (detMismatch).
function pickRoster(p, roster) {
  p.rosterId = roster.id || null
  p.roster = rosterSnapshot(roster)
  rosterPickerKey.value = ''
  if (!p.factionSlug && roster.faction) p.factionSlug = roster.faction
  if (!p.detachments.length && roster.detachments?.length) p.detachments = [...roster.detachments]
}

// Detaching leaves the faction and detachments alone — same reasoning as the wizard's, and here
// they may have been what the game was played under for four rounds.
function clearRoster(p) {
  p.rosterId = null
  p.roster = null
  rosterPickerKey.value = ''
}

// Order doesn't matter (a detachment list is a set of picks), and an empty side isn't a
// disagreement — it's the case pickRoster just filled in.
function detMismatch(p) {
  const a = p.detachments || []
  const b = p.roster?.detachments || []
  if (!a.length || !b.length) return false
  return a.length !== b.length || a.some(d => !b.includes(d))
}

// Whether each side's faction has an interactive tracker spec, or only the rule's text to show —
// the caption's "reference only" note, not the row's existence. It used to gate the row itself
// here while the wizard gated it on the faction alone, which meant a game whose faction had no
// spec showed a card with no way to turn it off. Factions are fixed once a game starts, so this
// resolves once; same lazy registry import as the in-game card.
const armyYouTrackable = ref(false)
const armyOppTrackable = ref(false)
// Mapped by isYou, since players are reordered by first turn. membersOf covers both game
// types — the side is its own only member in singles.
const you = game.players.find(p => p.isYou) ?? game.players[0]
const opp = game.players.find(p => !p.isYou) ?? game.players[1]
;(async () => {
  const { resolveArmyTracker } = await import('../../data/armyTrackers/index.js')
  const trackable = (pl) => membersOf(pl).some((m) => m.factionSlug && resolveArmyTracker(m.factionSlug))
  armyYouTrackable.value = trackable(you)
  armyOppTrackable.value = trackable(opp)
})()

const trackCtx = computed(() => ({
  you: { faction: sideFaction(you), trackable: armyYouTrackable.value },
  opp: { faction: sideFaction(opp), trackable: armyOppTrackable.value },
  anyRoster: anyRoster.value,
}))

function save() {
  // Same rule as the wizard's Start: a row this game cannot offer is stored off, not at the value
  // a disabled checkbox happened to be carrying.
  const normalized = normalizeTrackSettings(settings, trackCtx.value)
  if (guest) {
    // Only what is this phone's: the shared settings would be snapped back by the sync anyway,
    // and the players were never on screen.
    updateSetup({ settings: Object.fromEntries(LOCAL_TRACK_SETTINGS.filter((k) => k in normalized).map((k) => [k, normalized[k]])) })
    emit('close')
    return
  }
  updateSetup({
    settings: normalized,
    players: players.map(p => ({
      name: p.name, battleReady: p.battleReady,
      rosterId: p.rosterId, roster: p.roster,
      factionSlug: p.factionSlug, detachments: p.detachments,
      ...(isDoubles ? { teamName: p.teamName, members: p.members.map(m => ({ ...m })) } : {}),
    })),
  })
  emit('close')
}
</script>

<style scoped>
.es-note {
  margin: 0 0 0.9rem;
  padding: 0.6rem 0.7rem;
  background: var(--bg-secondary);
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.45;
}
.players {
  display: grid;
  /* minmax(0, …) so a long roster name can't widen the card — see GameSetup.vue's .players. */
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}
.player-card, .settings {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 1rem;
}
.settings {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.9rem;
}
/* The list row, built to the same recipe as the wizard's (GameSetup's .roster-line/.rp-open) —
   it is the same action in the other place you can take it. */
.es-roster { margin-top: 0.75rem; }
.roster-line {
  display: flex; align-items: center; gap: 0.35rem;
  padding: 0.45rem 0.55rem;
  border: 1px solid var(--accent); background: var(--bg-card);
}
.rl-text {
  flex: 1; min-width: 0;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-size: 0.82rem; color: var(--text-primary);
}
.rl-clear {
  background: none; border: none; color: var(--text-muted);
  font-size: 0.9rem; line-height: 1; cursor: pointer; padding: 0.15rem 0.25rem;
}
.rl-clear:hover { color: var(--accent); }
.rp-open {
  display: flex; align-items: center; gap: 0.4rem; width: 100%;
  padding: 0.45rem 0.55rem;
  border: 1px dashed var(--border); background: none;
  color: var(--text-muted); font-size: 0.82rem; font-family: inherit; text-align: left; cursor: pointer;
}
.rp-open:hover { border-color: var(--accent); color: var(--text-primary); }
.rl-warn {
  margin: 0.4rem 0 0;
  font-size: 0.75rem; line-height: 1.4; color: var(--text-muted);
  border-left: 2px solid var(--accent); padding-left: 0.5rem;
}
.player-head {
  font-family: var(--font-display);
  font-size: 1.21rem;
  font-weight: 500;
  color: var(--accent);
  margin-bottom: 0.75rem;
}
/* Doubles member sub-boxes — same frame recipe as the wizard's (GameSetup's .member-block). */
.member-block {
  border: 1px solid var(--border);
  padding: 0.6rem;
  margin-bottom: 0.7rem;
}
.member-head {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-muted);
  margin: 0 0 0.5rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.7rem;
}
.field input[type="text"] {
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: var(--font-sans);
}
.block-head {
  font-family: var(--font-display);
  font-size: 1.21rem;
  font-weight: 500;
  color: var(--accent);
  margin: 0 0 0.6rem;
}

.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  padding: 0.7rem 0.9rem;
  border-top: 1px solid var(--border);
}
@media (max-width: 700px) {
  .players { grid-template-columns: minmax(0, 1fr); }
  .tab-word { display: none; }
  .tab { min-width: 44px; min-height: 44px; }
}
</style>
