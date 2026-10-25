<template>
  <BaseModal
    :title="phoneOnly ? labels.trackerPhoneSettingsTitle : labels.trackerEditSetupTitle"
    max-width="560px"
    @close="$emit('close')"
  >
    <!-- What may be changed here: a note read once, so it waits behind an "i" in the header
         instead of taking the top of the dialog every time (owner, 2026-10-07). -->
    <template #aside>
      <button
        type="button"
        class="mh-icon"
        :class="{ on: noteOpen }"
        :aria-label="labels.trackerEditSetupInfo"
        :title="labels.trackerEditSetupInfo"
        :aria-expanded="noteOpen"
        data-press
        @click="noteOpen = !noteOpen"
      >
        <i class="wi wi-info" />
      </button>
    </template>
    <div class="modal-body">
      <ExpandTransition>
        <p
          v-if="noteOpen"
          class="es-note"
        >
          {{ phoneOnly ? labels.trackerPhoneSettingsNote : guest ? labels.trackerEditSetupGuestNote : labels.trackerEditSetupNote }}
        </p>
      </ExpandTransition>

      <!-- A guest in a shared game gets only the option blocks — the players, the turn order, the
           score mode and the layout ARE the game and belong to the host (the note above says so
           in place of the controls). Of the options, the rows marked `local` in the table are
           this phone's; the others are drawn disabled with "host only" (TrackOptions).
           The one exception is its own army list, until the battle begins (a player's report,
           2026-10-15: "how does the opponent who joined attach his list?" — he could not): the
           same card, its own side only, the list field alone. -->
      <div
        v-if="cardSides.length"
        class="players"
        :class="{ 'players-one': guest }"
      >
        <div
          v-for="i in cardSides"
          :key="i"
          class="player-card"
        >
          <h3 class="player-head">
            {{ playerLabel(i) }}
          </h3>
          <label
            v-if="isDoubles && !guest"
            class="field"
          >
            <span>{{ labels.trackerTeamName }}</span>
            <input
              v-model="players[i].teamName"
              type="text"
              :maxlength="PLAYER_NAME_MAX"
              :placeholder="labels.trackerTeamName"
            >
          </label>

          <!-- The name + list block, once per army: the side itself in singles, each member in
               doubles (same armiesOf recipe as the wizard's step 1). -->
          <div
            v-for="(m, mi) in armiesOf(players[i])"
            :key="mi"
            :class="{ 'member-block': isDoubles }"
          >
            <h4
              v-if="isDoubles"
              class="member-head"
            >
              {{ mi === 0 ? labels.trackerPlayer1 : labels.trackerPlayer2 }}
            </h4>
            <label
              v-if="!guest"
              class="field"
            >
              <input
                v-model="m.name"
                type="text"
                :maxlength="PLAYER_NAME_MAX"
                :placeholder="isDoubles ? labels.trackerMemberName : namePlaceholder(i)"
              >
            </label>

            <!-- Attaching a list AFTER the game started. The wizard is the other (and usual) place
                 to do this; without it here, a player who built a list but forgot to pick it — or
                 whose game predates the feature — had no way back. Unlike the wizard, the list does
                 not decide the army here: the faction is already being played. -->
            <div class="field es-roster">
              <span>{{ labels.trackerRoster }}</span>
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
                <i class="wi wi-roster-list" />
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
              :max-points="isDoubles ? null : battlePoints"
              @pick="r => pickRoster(m, r)"
              @clear="clearRoster(m)"
              @close="rosterPickerKey = ''"
            />
          </div>

          <label
            v-if="!guest"
            class="check"
            :class="{ on: players[i].battleReady }"
          >
            <input
              v-model="players[i].battleReady"
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
              data-press
              :aria-label="labels.trackerScoreHelp"
              @click="scoreHelpOpen = true"
            ><i class="wi wi-help" /></button>
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

        <!-- Strict rules are agreed before the game and stay as they were (strictRules.js): shown,
             greyed, with why. -->
        <div class="field">
          <span>{{ labels.trackerStrictRules }}</span>
          <div class="seg">
            <button
              disabled
              :class="{ on: !game.settings.strictRules }"
            >
              {{ labels.trackerStrictFree }}
            </button>
            <button
              disabled
              :class="{ on: !!game.settings.strictRules }"
            >
              {{ labels.trackerStrictOn }}
            </button>
          </div>
          <small class="check-note">{{ labels.trackerStrictLocked }}</small>
        </div>
      </div>

      <!-- The same block as the wizard's, off the same table — a row offered there is offered
           here. Its ctx reads the DRAFT's rosters, not the game's: a list attached in this very
           dialog should make the phase row available before Save, and this is the only way a game
           that started without a list can ever get the clock. -->
      <div class="settings">
        <TrackPresets
          :settings="settings"
          :ctx="trackCtx"
          :labels="labels"
          :lock-shared="guest"
        />
        <TrackOptions
          :settings="settings"
          :ctx="trackCtx"
          group="turn"
          heading="trackerGroupTurn"
          :lock-shared="guest"
          :shared="partyActive"
        />
        <TrackOptions
          :settings="settings"
          :ctx="trackCtx"
          group="armies"
          heading="trackerGroupArmies"
          :lock-shared="guest"
          :shared="partyActive"
        />
        <TrackOptions
          :settings="settings"
          :ctx="trackCtx"
          group="roster"
          heading="trackerRosterHeading"
          :lock-shared="guest"
          :shared="partyActive"
        />
        <TrackOptions
          :settings="settings"
          :ctx="trackCtx"
          group="look"
          heading="trackerLookHeading"
          :lock-shared="guest"
          :shared="partyActive"
        />
      </div>

      <!-- The guest sees the map too — read only, the layout is the host's to pick (Mikhail's
           report, 2026-10-15: "the opponent who joined can't see the map"). Here and not on the
           game screen: a guest joins in the lobby and reads the battlefield while filling in. -->
      <div
        v-if="!phoneOnly && (guest ? currentLayout : layouts.length)"
        class="settings layout-block"
      >
        <h3 class="block-head">
          {{ labels.trackerLayoutHeading }}
        </h3>
        <LayoutTabs
          v-if="!guest"
          :layouts="layouts"
          :selected="settings.layout"
          :custom="!settings.combatPatrol"
          @select="selectLayout"
          @custom="layoutPickerOpen = true"
        />
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
        @click="guardColors(save)"
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
    <!-- Two sides of one colour ask once before Save (useColorClashGate). -->
    <ConfirmModal
      v-if="colorsAskOpen"
      :title="labels.sideColorsClashTitle"
      :message="labels.sideColorsClashBody"
      :confirm-label="labels.sideColorsClashKeep"
      :cancel-label="labels.sideColorsClashTune"
      @confirm="keepColors"
      @close="customiseColors"
    />
  </BaseModal>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import ExpandTransition from '../ExpandTransition.vue'
import LayoutCard from '../event/LayoutCard.vue'
import ScoreHelpModal from './ScoreHelpModal.vue'
import LayoutPickerModal from './LayoutPickerModal.vue'
import LayoutTabs from './LayoutTabs.vue'
import RosterPickerModal from './RosterPickerModal.vue'
import TrackOptions from './TrackOptions.vue'
import TrackPresets from './TrackPresets.vue'
import ConfirmModal from '../ConfirmModal.vue'
import { useColorClashGate } from '../../composables/useColorClashGate.js'
import { trackSettingsOf, normalizeTrackSettings, LOCAL_TRACK_SETTINGS } from '../../data/trackerOptions.js'
import { detKey } from '../../data/slugify.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, membersOf, isYouSide, sideLabel, gameBegun, battleOf, PLAYER_NAME_MAX } from '../../composables/useTracker.js'
import { useParty } from '../../composables/useParty.js'
import { useSetupLayout } from '../../composables/trackerLayout.js'
import { rosterSnapshot } from '../../composables/rosterGameLink.js'

// `phoneOnly` — this phone's options alone, for a guest waiting in the lobby (LobbyWait): the army
// it has just sent is the lobby's business, and the map is not chosen yet.
const props = defineProps({
  phoneOnly: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, updateSetup } = useTracker()
const game = current.value
// A guest in a shared game (useParty.js): the setup is the host's, and only the phone-local
// options are offered here. Resolved once — a hand-over mid-dialog is not worth a live gate.
const { active: partyActive, isHost, reseat, canEdit } = useParty()
const guest = partyActive.value && !isHost.value
// A guest starts with the note open: for them it is not a footnote but the reason the dialog holds
// only this phone's switches — the names, lists and turn order are the host's.
const noteOpen = ref(guest)

const isDoubles = game.settings.gameType === 'doubles'
// The game's battle size in points — a list over it is not offered (the picker's `maxPoints`).
const battlePoints = battleOf(game.settings).known ? battleOf(game.settings).points : null

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
  // The phone's side-colour picks under "Customise colours" — not a flag, so not in the table's.
  sideColors: game.settings.sideColors || null,
  // game.settings.firstTurn is always normalized to 1 post-creation (see newGame) — the
  // actual "who's first" lives in player order, so derive the toggle from that instead.
  firstTurn: (game.players[0].isYou ?? true) ? 1 : 2,
  scoreMode: game.settings.scoreMode,
  layout: game.settings.layout,
  customLayout: game.settings.customLayout,
  // Read, not edited here: it decides which maps the layout tabs offer (useSetupLayout).
  combatPatrol: !!game.settings.combatPatrol,
})

const anyRoster = computed(() => players.some((p) => armiesOf(p).some((m) => !!m.roster)))
// The army cards on screen: both for the host; for a guest its own side, and only until the battle
// begins — a list attached mid-battle would change what the game has been scoring against.
const cardSides = computed(() => (guest
  ? (gameBegun(game) || props.phoneOnly ? [] : players.map((_, i) => i).filter((i) => canEdit(i)))
  : players.map((_, i) => i)))

function isYou(i) { return isYouSide(game.players[i], i) }
function playerLabel(i) { return sideLabel(game.players[i], i, labels.value) }
function namePlaceholder(i) { return isYou(i) ? labels.value.trackerYourName : labels.value.trackerOpponentName }

// Dispositions are fixed for the rest of the game, so the recommended-layout matchup (the same
// lookup as GameSetup's step 3, useSetupLayout) can't change here — only the A/B/C/custom pick can.
const { layouts, currentLayout, layoutPickerOpen, selectLayout, onPickLayout } =
  useSetupLayout(settings, () => [game.players[0].disposition, game.players[1].disposition])

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
// disagreement — it's the case pickRoster just filled in. Compared by detKey: the side holds the
// MFM's spelling of a name, the roster appdata's ("Vow-Sworn" / "Vow-sworn"), and that is one pick.
function detMismatch(p) {
  const a = (p.detachments || []).map(detKey)
  const b = (p.roster?.detachments || []).map(detKey)
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
const {
  open: colorsAskOpen, guard: guardColors, confirm: keepColors, customise: customiseColors,
} = useColorClashGate(trackCtx, settings)

function save() {
  // Same rule as the wizard's Start: a row this game cannot offer is stored off, not at the value
  // a disabled checkbox happened to be carrying.
  const normalized = normalizeTrackSettings(settings, trackCtx.value)
  if (guest) {
    // Only what is this phone's: the shared settings would be snapped back by the sync anyway.
    updateSetup({
      settings: Object.fromEntries(LOCAL_TRACK_SETTINGS.filter((k) => k in normalized).map((k) => [k, normalized[k]])),
      // Its own side's list, when the card was on screen (cardSides) — nothing of the other side.
      players: players.map((p, i) => (cardSides.value.includes(i) ? {
        rosterId: p.rosterId, roster: p.roster, factionSlug: p.factionSlug, detachments: p.detachments,
        ...(isDoubles ? { members: p.members.map(m => ({ rosterId: m.rosterId, roster: m.roster, factionSlug: m.factionSlug, detachments: m.detachments })) } : {}),
      } : null)),
    })
    emit('close')
    return
  }
  // Changing who goes first EXCHANGES the two player objects (players[0] is always the
  // first-turn player), so in a shared game the seats have to be swapped with them — otherwise
  // every other phone keeps a seat that now names the other army.
  const swapping = partyActive.value && isHost.value
    && normalized.firstTurn !== undefined
    && (normalized.firstTurn === 1) !== !!current.value?.players?.[0]?.isYou
  updateSetup({
    settings: normalized,
    players: players.map(p => ({
      name: p.name, battleReady: p.battleReady,
      rosterId: p.rosterId, roster: p.roster,
      factionSlug: p.factionSlug, detachments: p.detachments,
      ...(isDoubles ? { teamName: p.teamName, members: p.members.map(m => ({ ...m })) } : {}),
    })),
  })
  if (swapping) reseat()
  emit('close')
}
</script>

<style scoped>
.es-note {
  margin: 0 0 0.6rem;
  padding: 0.5rem 0.65rem;
  background: var(--bg-secondary);
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.45;
}
.players {
  display: grid;
  /* minmax(0, …) so a long roster name can't widen the card — see GameSetup.vue's .players. */
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}
/* A guest's own side alone: one card across the dialog. */
.players.players-one { grid-template-columns: minmax(0, 1fr); }
/* Compact (owner, 2026-10-07): the dialog is read on a phone, and the cards' air was most of it. */
.player-card, .settings {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 0.65rem 0.75rem;
}
.settings {
  margin-bottom: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.9rem;
}
/* First turn and the score mode: two short choices, side by side on one row (owner, 2026-09-29);
   they wrap under each other only where the dialog is too narrow for both. */
.settings.deploy-opts { flex-direction: row; flex-wrap: wrap; align-items: flex-start; gap: 0.7rem 1.25rem; }
.deploy-opts .field { margin-bottom: 0; }
/* The list row. Not the wizard's (GameSetup's .roster-line/.rp-open sit in the faction's row and
   name the faction too); here the faction is already being played, so the list gets a line of its
   own and a full-width "attach" button. */
.es-roster { margin-bottom: 0; }
/* Battle Ready under the list, not glued to it. */
.player-card > .check { margin-top: 0.65rem; }
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
.rl-clear:hover { color: var(--accent-ink); }
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
  color: var(--text-muted);
  margin: 0 0 0.45rem;
}
/* Doubles member sub-boxes — same frame recipe as the wizard's (GameSetup's .member-block). */
.member-block {
  border: 1px solid var(--border);
  padding: 0.6rem;
  margin-bottom: 0.7rem;
}
/* The condensed display face this small reads cramped above 400 (owner, 2026-10-07). */
.member-head {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 400;
  color: var(--text-muted);
  margin: 0 0 0.5rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
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
  color: var(--text-muted);
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
}
</style>
