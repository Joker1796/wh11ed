<template>
  <!-- The whole game screen wears the colour of the side whose turn it is (owner's call,
       2026-09-27): --accent is re-pointed at the opponent's blue during their turn (.turn-opp),
       so every accented control — the tabs, the rounds, the buttons, the ticks — says whose turn
       it is. The sides themselves keep their own colours (--side-you / --side-opponent). -->
  <div
    class="round-tracker side-colored turn-colored"
    :class="{ 'turn-opp': turnOpp }"
    :style="sideColors"
  >
    <!-- Where the game is, in one line above the score: the round and whose turn. The turn is
         kept always — the phase clock under the rounds is the optional part. -->
    <p class="turn-now">
      <span
        v-for="(part, k) in turnHeadline"
        :key="k"
        :class="{ 'tn-strong': part.strong }"
      >{{ part.text }}</span>
    </p>
    <ScoreBoard />

    <!-- Moving the game on: two equal buttons, back and forward by a TURN — a round is two turns,
         and ending the second one opens the next round. The forward one wears the colour of the
         side whose turn it is. In a shared game a turn is ended by the side playing it and taken
         back by the side that ended it: the button stays on screen for the other phone, greyed,
         with the reason on the line under the pair. The last turn of the game has nowhere to
         go, so there the forward button finishes the game instead. -->
    <!-- The rounds, right under the score (owner's call, 2026-09-27). Finishing the game early is
         at the foot of the screen with the other tools. A shared game's sync state rides here
         too — a row of its own would cost vertical space the phone does not have (it renders
         nothing for a game that is not shared). -->
    <div class="round-bar">
      <div class="rb-rounds">
        <!-- A step is a VIEW, not a move: a past round opens for correction (the game stays
             where it is — only End/Undo turn move it), the live one comes back, a round not yet
             started is not there to open. -->
        <button
          v-for="n in ROUND_COUNT"
          :key="n"
          class="rb-round"
          :class="{ on: shownRound === n, live: current.currentRound === n }"
          :disabled="n > current.currentRound"
          :aria-label="`${labels.trackerRound} ${n}`"
          :aria-current="current.currentRound === n ? 'step' : undefined"
          @click="viewRound = n === current.currentRound ? null : n"
        >
          {{ n }}
        </button>
      </div>
      <SyncIndicator />
    </div>

    <!-- The turn buttons are pinned above the bottom nav (the window's bottom edge on a desk): the
         one control used every turn stays under the thumb however far the panel below is scrolled
         (owner's call, 2026-09-27). Its height is reserved in App.vue (.tf-sticky) — change the
         padding or the button height and change that number with them. -->
    <div class="tf-sticky">
      <div class="tf-sticky-inner">
        <!-- With the phase clock on, the phase joins this row (owner's call, 2026-09-27): undo turn as
             an icon, the phase arrows, the phase itself (tap → any phase of either turn), and End turn.
             The arrows stay INSIDE the turn — they stop at Command and at Fight — so a turn changes only
             through End / Undo turn, never past the end-of-turn check by a stray tap. -->
        <div
          v-if="phasesOn"
          class="turn-row phased"
        >
          <button
            class="tr-btn tr-prev tr-icon"
            :disabled="!canUndoTurn() || !canEdit(1 - turnIndex)"
            :title="undoTitle"
            :aria-label="labels.trackerUndoTurn"
            @click="undoConfirm = true"
          >
            <i
              class="bi bi-arrow-counterclockwise"
              aria-hidden="true"
            />
          </button>
          <button
            class="tr-step"
            :disabled="!canStepInTurn(-1)"
            :aria-label="labels.ariaPrevPhase"
            @click="stepPhase(-1)"
          >
            ‹
          </button>
          <button
            class="tr-phase"
            :title="labels.trackerPhasePick"
            @click="phasePickerOpen = true"
          >
            <span class="tp-who">{{ playerSide(turnIndex) }}</span>
            <span class="tp-name">{{ phaseLabel(current.currentPhase || 'command', labels) }}</span>
          </button>
          <button
            class="tr-step"
            :disabled="!canStepInTurn(1)"
            :aria-label="labels.ariaNextPhase"
            @click="stepPhase(1)"
          >
            ›
          </button>
          <button
            class="tr-btn tr-end"
            :class="{ opp: !isYouSide(current.players[turnIndex], turnIndex) }"
            :disabled="canEndTurn() && !canEdit(turnIndex)"
            :title="canEndTurn() ? endTitle : labels.trackerFinish"
            @click="requestEndTurn()"
          >
            <span class="tr-label">{{ canEndTurn() ? labels.trackerEndTurnShort : labels.trackerFinish }}</span>
          </button>
        </div>
        <div
          v-else
          class="turn-row"
        >
          <button
            class="tr-btn tr-prev"
            :disabled="!canUndoTurn() || !canEdit(1 - turnIndex)"
            :title="undoTitle"
            @click="undoConfirm = true"
          >
            <i
              class="bi bi-arrow-left"
              aria-hidden="true"
            />
            <span class="tr-label">{{ labels.trackerUndoTurn }}</span>
          </button>
          <button
            v-if="canEndTurn()"
            class="tr-btn tr-end"
            :class="{ opp: !isYouSide(current.players[turnIndex], turnIndex) }"
            :disabled="!canEdit(turnIndex)"
            :title="endTitle"
            @click="requestEndTurn()"
          >
            <span class="tr-label">{{ labels.trackerEndTurnPlain }}</span>
          </button>
          <button
            v-else
            class="tr-btn tr-end"
            @click="requestEndTurn()"
          >
            <span class="tr-label">{{ labels.trackerFinish }}</span>
          </button>
        </div>
      </div>
    </div>


    <PhasePickerModal
      v-if="phasePickerOpen"
      :names="current.players.map((_, i) => playerName(i))"
      :turn="turnIndex"
      :phase="current.currentPhase || 'command'"
      @pick="onPickPhase"
      @close="phasePickerOpen = false"
    />

    <!-- The game's working area: ONE strip of tabs over one panel (owner's calls, 2026-09-27 —
         two rows split by a rule read as two menus, and they were one). Every closed tab is an
         icon, named on hover and to a screen reader; the open one takes the rest of the width
         and says its word beside its icon — so the strip is one row at any width, and the
         word on screen is always where you are. The phase tab carries its count. The open tab
         sits on the strip's line in the accent, attached to what it shows. Every new turn opens
         on the missions (watch below) — that is where a turn starts. -->
    <nav
      class="game-tabs"
      role="tablist"
      :aria-label="labels.trackerTabsAria"
      :style="{ gridTemplateColumns: tabColumns }"
    >
      <button
        v-for="t in tabs"
        :key="t.id"
        role="tab"
        class="gt-tab"
        :class="{ on: tab === t.id }"
        :aria-selected="tab === t.id"
        :aria-label="t.label"
        :title="tab === t.id ? undefined : t.label"
        @click="tab = t.id"
      >
        <i
          class="bi"
          :class="t.icon"
          aria-hidden="true"
        />
        <span
          v-if="tab === t.id"
          class="gt-word"
        >{{ t.label }}</span>
        <span
          v-if="t.count"
          class="gt-count"
        >{{ t.count }}</span>
      </button>
    </nav>

    <section
      v-if="tab === 'missions'"
      class="panel"
      role="tabpanel"
    >
      <!-- Active twist reminder (mission-changing twists are already applied to the primary). -->
      <details
        v-if="activeTwist"
        class="twist-card"
      >
        <summary><span class="tc-label">{{ labels.trackerTwist }}</span> {{ activeTwist.title }}</summary>
        <div class="twist-card-body">
          <RuleBody :body="activeTwist.body" />
        </div>
      </details>

      <!-- Correcting a past round: a banner says so, and the way back is on it. -->
      <div
        v-if="viewRound"
        class="round-edit"
      >
        <span>{{ labels.trackerEditingRound.replace('{n}', viewRound).replace('{live}', current.currentRound) }}</span>
        <button
          class="re-back"
          @click="viewRound = null"
        >
          {{ labels.trackerBackToLive }}
        </button>
      </div>

      <!-- One side's missions on top — whose turn it is on a shared phone, this phone's own side
           in a shared game (a guest does not want the other phone's cards first) — and the other
           folded under a button. Both open, one under the other, ran to several screens. -->
      <div class="players">
        <!-- In a shared game a side another phone plays is shown as it is, greyed, with the
             reason under its title — never hidden: what the opponent has scored is exactly what a
             player wants to see. The lock is on what SCORES — the primary, the deck, the army
             tracker's controls (`inert`, see lock()) — not on the card, because the card is also
             where the opponent's army rule is READ. A guest who could not open the other side's
             Waaagh! rule was the first complaint about the shared game. The sync layer snaps
             back anything that gets past the lock. `inert` is a presence attribute — a rendered
             "false" would still be inert — hence `undefined` rather than false. -->
        <template
          v-for="(i, k) in sideOrder"
          :key="i"
        >
          <button
            v-if="k === 1"
            class="other-toggle"
            :class="{ open: showOther }"
            :aria-expanded="showOther"
            @click="showOther = !showOther"
          >
            <i
              class="bi"
              :class="showOther ? 'bi-chevron-up' : 'bi-chevron-down'"
              aria-hidden="true"
            />
            {{ (showOther ? labels.trackerHideMissions : labels.trackerShowMissions).replace('{name}', playerName(i)) }}
          </button>
          <div
            v-if="k === 0 || showOther"
            class="player"
            :data-side="i"
            :class="{ 'player-locked': !canEdit(i), opp: !isYouSide(current.players[i], i) }"
          >
            <h3 class="ptitle">
              <span class="pt-name">{{ playerName(i) }}</span>
              <span
                v-if="i === turnIndex && !viewRound"
                class="pt-turn"
              >{{ labels.trackerTurnTag }}</span>
            </h3>
            <!-- The host's line also says how to take the side back: the seat is the lock. -->
            <p
              v-if="!canEdit(i)"
              class="plocked"
            >
              {{ isHost ? labels.partyOtherSideHost : labels.partyOtherSide }}
            </p>

            <!-- The primary, folded to one line as in the first tracker (owner, 2026-09-29): its name and
                 this round's VP; a tap opens it with its conditions to tick (ScoringModal). -->
            <button
              v-if="primaryMission(i)"
              type="button"
              class="mission-card"
              :inert="lock(i)"
              @click="openPrimary = i"
            >
              <span class="mc-name">{{ primaryName(i) }}</span>
              <span class="mc-tag">{{ labels.trackerPrimary }}</span>
              <span class="mc-vp">{{ current.players[i].rounds[shownRound - 1].primary }} / {{ PRIMARY_ROUND_CAP }} VP</span>
            </button>
            <!-- The fallback, and the only one: a disposition the app couldn't resolve leaves no
                 card to tick. The missions themselves are not optional — see trackerOptions.js. -->
            <div
              v-else
              class="score-row"
              :inert="lock(i)"
            >
              <span class="sr-label">{{ labels.trackerPrimary }}</span>
              <NumberStepper
                :model-value="current.players[i].rounds[shownRound - 1].primary"
                :min="0"
                :max="PRIMARY_ROUND_CAP"
                @update:model-value="v => setRoundPrimary(i, shownRound - 1, v)"
              />
              <span class="sr-sub">/ {{ PRIMARY_ROUND_CAP }} {{ labels.trackerThisRound }}</span>
            </div>

            <SecondaryDeck
              :pi="i"
              :round="shownRound"
              :editable="canEdit(i)"
              :name="playerName(i)"
              :inert="lock(i)"
            />

            <!-- Army-rule tracker (Pain tokens, etc.) — at the bottom of the card, under the
                 secondaries: it is played alongside the missions, turn by turn. Opt-in per player
                 (settings.trackArmyYou / trackArmyOpp, default on) and renders only for factions
                 with a spec. Doubles: one SHARED card for a unified force of one faction (the
                 companion: one pool per force), else one card per member — see armyCards(). -->
            <ArmyTrackerCard
              v-for="c in armyCards(current.players[i])"
              :key="c.mi ?? 'side'"
              :pi="i"
              :mi="c.mi"
              :readonly="!canEdit(i)"
            />
          </div>
        </template>
      </div>
    </section>

    <!-- Command points (owner, 2026-09-29: two tall banks spent a phone's screen on three copies of
         one number and a line of constant text). One line a side, in CpStratagems: the name, the
         round's bonus point — its button turns into an undo for a point added by hand — and the
         balance itself as the stepper (a correction is kept in the ledger as one). Where Core CP
         come from lives behind the heading's "?". -->
    <section
      v-else-if="tab === 'cp'"
      class="panel"
      role="tabpanel"
    >
      <div class="cp-head">
        <span class="sec-title-row">{{ labels.trackerCpHelpTitle }}</span>
        <button
          type="button"
          class="cr-help"
          :aria-label="labels.trackerCpHelpTitle"
          :title="labels.trackerCpHelpTitle"
          @click="cpHelpOpen = true"
        >
          <i class="bi bi-question-circle" />
        </button>
      </div>
      <CpStratagems
        :names="current.players.map((_, i) => playerName(i))"
        :default-side="focusSide"
      >
        <template #bank="{ side }">
          <div
            class="cp-bank"
            :class="{ 'player-locked': !canEdit(side) }"
            :inert="lock(side)"
          >
            <button
              v-if="canUndoBonus(side)"
              class="cr-btn undo"
              :title="labels.trackerBonusUndo"
              @click="undoBonusCp(side)"
            >
              <i class="bi bi-arrow-counterclockwise" /> {{ labels.trackerBonusGainShort }}
            </button>
            <button
              v-else
              class="cr-btn"
              :disabled="!canGainBonus(side)"
              :title="bonusSource(side)"
              @click="gainBonusCp(side)"
            >
              <template v-if="bonusOf(side)">
                <i class="bi bi-check2" /> {{ labels.trackerBonusShort }}
              </template>
              <template v-else>
                {{ labels.trackerBonusGainShort }}
              </template>
            </button>
            <NumberStepper
              :model-value="current.players[side].cp"
              :min="0"
              :aria-label="`${playerName(side)} — CP`"
              @update:model-value="v => setCp(side, v)"
            />
          </div>
        </template>
      </CpStratagems>
      <OptionHelpModal
        v-if="cpHelpOpen"
        :title="labels.trackerCpHelpTitle"
        :text="current.cpAuto ? labels.trackerCpHelp : labels.trackerCpHelpManual"
        @close="cpHelpOpen = false"
      />
    </section>

    <!-- What speaks in the phase the clock stands on, for both players (usePhaseRules.js). -->
    <section
      v-else-if="tab === 'phase'"
      class="panel"
      role="tabpanel"
    >
      <PhaseRules
        embedded
        @stratagems="tab = 'cp'"
      />
      <p
        v-if="!phaseRuleCount"
        class="panel-empty"
      >
        {{ labels.trackerPhaseNone }}
      </p>
    </section>

    <section
      v-else-if="tab === 'log'"
      class="panel"
      role="tabpanel"
    >
      <GameLog :names="current.players.map((_, i) => playerName(i))" />
    </section>

    <section
      v-else-if="tab === 'stats'"
      class="panel"
      role="tabpanel"
    >
      <ScoreBreakdown expanded />
    </section>

    <!-- The armies: each army's facts, the way to its units, its rules and stratagems. -->
    <section
      v-else-if="tab === 'armies'"
      class="panel"
      role="tabpanel"
    >
      <ArmiesPanel
        :names="current.players.map((_, i) => playerName(i))"
        :default-side="focusSide"
      />
    </section>

    <ScoringModal
      v-if="openPrimary >= 0 && primaryMission(openPrimary)"
      :title="primaryName(openPrimary)"
      :subtitle="`${labels.trackerPrimary} · ${dispositionName(current.players[openPrimary].disposition)}`"
      :vp="current.players[openPrimary].rounds[shownRound - 1].primary"
      :blocks="primaryBlocks(openPrimary)"
      :briefing="primaryMission(openPrimary).briefing"
      :count="(bi, ri) => primaryRowCount(openPrimary, shownRound - 1, bi, ri)"
      :locked="b => primaryLocked(openPrimary, b)"
      :locked-note="labels.trackerOppTurnOnly"
      :opp="!isYouSide(current.players[openPrimary], openPrimary)"
      :note="`${labels.trackerPrimary}: ${labels.trackerThisRound} ≤ ${PRIMARY_ROUND_CAP} · ${PRIMARY_GAME_CAP}/${labels.trackerTotal}`"
      @set="(bi, ri, c) => setPrimaryRow(openPrimary, shownRound - 1, bi, ri, c)"
      @close="openPrimary = -1"
    />

    <div class="actions">
      <div class="actions-left">
        <!-- Setup is the host's in a shared game (it rewrites both sides — a swapped first turn
             is all five slices), but the dialog is still a guest's: it is where this phone's own
             "what to show" switches live (EditSetupModal's guest mode). -->
        <button
          class="btn-ghost btn-icon"
          :aria-label="labels.trackerEditSetup"
          :title="labels.trackerEditSetup"
          @click="editSetupOpen = true"
        >
          <i class="bi bi-chevron-left" />
          <i class="bi bi-gear" />
        </button>
        <!-- The shared game (several phones on this one game): a state like the broadcast,
             lit while shared. Always offered — it is how the other side gets to score. -->
        <button
          class="btn-ghost btn-icon"
          :class="{ 'bc-on': partyActive }"
          :aria-label="labels.partyTitle"
          :title="labels.partyTitle"
          @click="partyOpen = true"
        >
          <i class="bi bi-people-fill" />
        </button>
        <!-- Live broadcast (the OBS overlay): a state, not a page — lit while streaming. The
             button is offered only when the game asked for it (settings.trackBroadcast, a row
             of the option table; niche feature, off by default) — but a broadcast already LIVE
             keeps it whatever the row says: a stream running with no visible control would be
             the dishonest kind of hidden. -->
        <button
          v-if="broadcastOn || tracks(current.settings, 'trackBroadcast')"
          class="btn-ghost btn-icon"
          :class="{ 'bc-on': broadcastOn }"
          :aria-label="labels.trackerBroadcastTitle"
          :title="labels.trackerBroadcastTitle"
          @click="broadcastOpen = true"
        >
          <i class="bi bi-broadcast" />
        </button>
      </div>
      <!-- Finishing the game early: at the foot of the screen, beside the game's other tools —
           a thing done once, not every turn (owner's call, 2026-09-27). The last turn's own
           Finish is the turn bar's. -->
      <button
        class="rb-finish"
        @click="endModalOpen = true"
      >
        {{ labels.trackerFinish }}
      </button>
    </div>

    <!-- Undo turn asks first: it sits beside End turn on the pinned bar, and a stray tap would
         step the whole game back (owner's call, 2026-09-27). -->
    <ConfirmModal
      v-if="undoConfirm"
      :title="labels.trackerUndoConfirmTitle"
      :message="undoMessage"
      :confirm-label="labels.trackerUndoTurn"
      :cancel-label="labels.trackerCancel"
      @confirm="undoConfirm = false; undoTurn()"
      @close="undoConfirm = false"
    />
    <TurnEndCheckModal
      v-if="pendingEnd"
      :checks="turnChecks"
      :names="current.players.map((_, i) => playerName(i))"
      :final="pendingEnd.final"
      :confirm-label="pendingEnd.final ? labels.trackerCheckGoFinal : labels.trackerCheckGo"
      @confirm="confirmEnd"
      @close="pendingEnd = null"
    />
    <GameEndModal
      v-if="endModalOpen"
      @confirm="onEndBattle"
      @close="endModalOpen = false"
    />
    <EditSetupModal
      v-if="editSetupOpen"
      @close="editSetupOpen = false"
    />
    <BroadcastModal
      v-if="broadcastOpen"
      @close="broadcastOpen = false"
    />
    <PartyModal
      v-if="partyOpen"
      @close="partyOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, provide } from 'vue'
import NumberStepper from './NumberStepper.vue'
import SecondaryDeck from './SecondaryDeck.vue'
import ArmyTrackerCard from './ArmyTrackerCard.vue'
import ScoreBoard from './ScoreBoard.vue'
import ScoreBreakdown from './ScoreBreakdown.vue'
import CpStratagems from './CpStratagems.vue'
import OptionHelpModal from './OptionHelpModal.vue'
import GameLog from './GameLog.vue'
import ArmiesPanel from './ArmiesPanel.vue'
import ScoringModal from './ScoringModal.vue'
import GameEndModal from './GameEndModal.vue'
import TurnEndCheckModal from './TurnEndCheckModal.vue'
import ConfirmModal from '../ConfirmModal.vue'
import EditSetupModal from './EditSetupModal.vue'
import BroadcastModal from './BroadcastModal.vue'
import PartyModal from './PartyModal.vue'
import SyncIndicator from './SyncIndicator.vue'
import PhasePickerModal from './PhasePickerModal.vue'
import PhaseRules from './PhaseRules.vue'
import RuleBody from '../RuleBody.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { getEventContent } from '../../data/eventCompanion.js'
import { phaseLabel, BATTLE_PHASES } from '../../composables/stratagemPhases.js'
import { usePhaseRules } from '../../composables/usePhaseRules.js'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { tracks } from '../../data/trackerOptions.js'
import { blockLocked, turnEndChecks } from '../../composables/missionTiming.js'
import { bonusIn } from '../../composables/cpLedger.js'
import { gameSideColorStyle } from '../../composables/sideColors.js'
import { provideModalScope } from '../../composables/modalScope.js'
import { useTracker, sideLabel, isYouSide, ROUND_COUNT, PRIMARY_ROUND_CAP, PRIMARY_GAME_CAP, dispositionName, missionBySlug, scorableBlocks } from '../../composables/useTracker.js'
import { useBroadcast } from '../../composables/useBroadcast.js'
import { useParty } from '../../composables/useParty.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, setRoundPrimary, setPrimaryRow, primaryRowCount, setCp, endTurnDiscard, canGainBonus, gainBonusCp, canUndoBonus, undoBonusCp, stepPhase, goToPhase, canStepPhase, endTurn, canEndTurn, undoTurn, canUndoTurn, finishGame } = useTracker()

// Read through `tracks` so a game saved before the option existed arrives with its default
// rather than undefined.
const cpOn = computed(() => tracks(current.value.settings, 'trackCP'))
const phasesOn = computed(() => tracks(current.value.settings, 'trackPhases'))
// The sides' colours: each side's faction accent, or the phone's own picks (`customColors`).
const sideColors = computed(() => gameSideColorStyle(current.value))
const turnOpp = computed(() => !isYouSide(current.value.players[turnIndex.value], turnIndex.value))
// …and the same colours for every dialog opened from this screen (they teleport out of it).
provideModalScope(computed(() => ({
  class: ['side-colored', 'turn-colored', { 'turn-opp': turnOpp.value }],
  style: sideColors.value,
})))

// The working area's tabs (see the template). CP is offered only to a game that tracks it; a
// game that stops tracking it mid-way falls back to the missions rather than to an empty panel.
const tab = ref('missions')
// The Phase tab exists only while the game keeps the clock AND asked for the reminder; its count
// is the reminder itself, readable without opening it.
const phaseTabOn = computed(() => phasesOn.value && tracks(current.value.settings, 'trackPhaseRules'))
const { total: phaseRuleCount } = usePhaseRules()
const tabs = computed(() => [
  { id: 'missions', label: labels.value.trackerTabMissions, icon: 'bi-bullseye' },
  ...(cpOn.value ? [{ id: 'cp', label: labels.value.trackerCp, icon: 'bi-lightning-charge' }] : []),
  { id: 'log', label: labels.value.trackerTabLog, icon: 'bi-journal-text' },
  { id: 'stats', label: labels.value.trackerTabStats, icon: 'bi-bar-chart-line' },
  { id: 'armies', label: labels.value.trackerTabArmies, icon: 'bi-shield-shaded' },
  ...(phaseTabOn.value ? [{ id: 'phase', label: labels.value.trackerTabPhase, icon: 'bi-hourglass-split', count: phaseRuleCount.value }] : []),
])
// The open tab takes what the closed icons leave.
const tabColumns = computed(() => tabs.value.map((t) => (t.id === tab.value ? 'minmax(0, 1fr)' : 'var(--gt-closed)')).join(' '))
watch(phaseTabOn, (on) => { if (!on && tab.value === 'phase') tab.value = 'missions' })
watch(cpOn, (on) => { if (!on && tab.value === 'cp') tab.value = 'missions' })
// The round on screen: the live one, or a past one opened for correction from the round steps
// (`viewRound`). Local to this phone — what one player is correcting is not where the game is.
const viewRound = ref(null)
const shownRound = computed(() => viewRound.value || current.value.currentRound)

// Whose missions come first: this phone's own side in a shared game, otherwise the side on
// turn. The other is folded until asked for.
const focusSide = computed(() => {
  const p = current.value.party
  return p && !p.revoked && !p.ended && (p.side === 0 || p.side === 1) ? p.side : turnIndex.value
})
const sideOrder = computed(() => [focusSide.value, 1 - focusSide.value])
const showOther = ref(false)

// A new turn starts on the missions, on the live round, with the other side folded: the first
// thing a turn does is draw and score.
watch(() => [current.value.currentRound, current.value.currentTurn], () => {
  tab.value = 'missions'
  viewRound.value = null
  showOther.value = false
})

// The open tab survives leaving the game screen — a look at a datasheet, the rules, the roster —
// and coming back (owner's call, 2026-09-27). Kept on this device with the game and the turn it
// was open in: back in the same turn, the same tab; the turn moved meanwhile (another phone ended
// it), the missions, as at the start of any turn. A tab this game no longer offers (CP or the
// phase reminder switched off) falls back to the missions too.
const TAB_KEY = 'wh11ed-tracker-tab'
const clockKey = () => `${current.value.id}|${current.value.currentRound}|${current.value.currentTurn === 1 ? 1 : 0}`
try {
  const saved = JSON.parse(getItem(TAB_KEY) || 'null')
  if (saved?.at === clockKey() && tabs.value.some((t) => t.id === saved.tab)) tab.value = saved.tab
} catch { /* an unreadable entry is just no memory */ }
watch([tab, clockKey], () => setItem(TAB_KEY, JSON.stringify({ at: clockKey(), tab: tab.value })))

const cpHelpOpen = ref(false) // the CP tab's "?"
const openPrimary = ref(-1)   // index of the player whose primary scoring modal is open
const endModalOpen = ref(false)
const editSetupOpen = ref(false)
const phasePickerOpen = ref(false)
const broadcastOpen = ref(false)
const partyOpen = ref(false)

// The shared game: which side this phone may edit, and whether it is the host. With no party,
// canEdit is true for both and nothing here changes. `lock` is canEdit as an `inert` value.
const { active: partyActive, isHost, canEdit } = useParty()
const lock = (pi) => (canEdit(pi) ? undefined : true)

// Live broadcast: arm the push watcher on entering the game screen, so a reload mid-stream
// resumes pushing without reopening the dialog. `enabled` also lights the toolbar button.
const { enabled: broadcastOn, init: initBroadcast } = useBroadcast()
initBroadcast()

// players[0] is always the first-turn player, so the turn IS a player index (useTracker).
const turnIndex = computed(() => (current.value.currentTurn === 1 ? 1 : 0))

// Which side a player is — by who they are, never by position, since first turn reorders them.
// The clock prints this and nothing else: it is read at a glance in the middle of a turn, and a
// nickname does not answer the question it is there to answer. "You" does, in one word.
function playerSide(i) {
  return sideLabel(current.value.players[i], i, labels.value)
}

// Their own name if they gave one, otherwise the side. For the places with room for a name and a
// reason to print one: the player cards, and the phase picker's two turn headings.
function playerName(i) {
  return current.value.players[i].name || playerSide(i)
}

// A phrase about a player, with their name in it. A side with no name of its own is printed as
// "You" / "Opponent" (sideLabel), and "ход выполняет Вы" is not Russian — so your own unnamed side
// takes the `…You` variant of the phrase instead.
function aboutPlayer(key, i) {
  const l = labels.value
  const pl = current.value.players[i]
  return !pl.name && isYouSide(pl, i) ? l[`${key}You`] : l[key].replace('{name}', playerName(i))
}

// "Round 3 · Andronovmy is playing", the round number and the name in bold. Returned as parts
// rather than a string so the bold can be markup without building text out of template fragments.
const turnHeadline = computed(() => {
  const l = labels.value
  const t = turnIndex.value
  const pl = current.value.players[t]
  const parts = [{ text: `${l.trackerRoundShort} ` }, { text: String(current.value.currentRound), strong: true }, { text: ' \u00b7 ' }]
  if (!pl.name && isYouSide(pl, t)) return [...parts, { text: l.trackerTurnNowYou }]
  const [before, after] = l.trackerTurnNow.split('{name}')
  return [...parts, { text: before }, { text: playerName(t), strong: true }, { text: after }].filter(p => p.text)
})
const endTurnLabel = computed(() => aboutPlayer('trackerEndTurn', turnIndex.value))

// Undo turn, confirmed: where the game goes back to, and what comes back with it.
const undoConfirm = ref(false)
const undoMessage = computed(() => {
  const back = turnIndex.value === 1 ? 0 : 1
  const round = current.value.currentRound - (turnIndex.value === 1 ? 0 : 1)
  return aboutPlayer('trackerUndoConfirm', back).replace('{round}', round)
})

// The End button's tooltip: the whole phrase with the name — or, on the phone that may not end
// this turn (a shared game), why the button is grey. There is no line for it under the bar any
// more (owner's call, 2026-09-27); the headline says whose turn it is.
const endTitle = computed(() => {
  const t = turnIndex.value
  return canEdit(t) ? endTurnLabel.value : labels.value.trackerTurnLocked.replace('{name}', playerName(t))
})
// The turn before this one is always the other player's, and theirs to take back.
const undoTitle = computed(() => {
  const other = 1 - turnIndex.value
  return canEdit(other) ? labels.value.trackerUndoTurn : labels.value.trackerUndoLocked.replace('{name}', playerName(other))
})

// The round's bonus CP entry, if one was gained, and where it came from.
function bonusOf(i) {
  return bonusIn(current.value.players[i], current.value.currentRound)
}
function bonusSource(i) {
  const b = bonusOf(i)
  if (!b) return labels.value.trackerBonusFree
  return b.source === 'discard' ? labels.value.trackerBonusFromDiscard : labels.value.trackerBonusFromManual
}

// Ending a turn goes through a check: what scores at this moment on cards nobody is looking at
// (the other side's "end of your opponent's turn" secondaries; on the battle's last turn every End
// of Battle condition — missionTiming.turnEndChecks). Nothing to check, nothing shown. The end-of-
// turn discard from a card's sheet comes through here too (provided to SecondaryDeck), so its
// turn ends the same way. The last turn goes on to how the game ended (GameEndModal).
const turnChecks = computed(() => turnEndChecks(
  current.value,
  (slug, role, round) => scorableBlocks(slug, role, round, locale.value),
  (slug, role) => missionBySlug(slug, role),
))
const pendingEnd = ref(null) // { final, discard?: { pi, slug } }
function requestEndTurn(opts = {}) {
  const end = { final: !canEndTurn(), ...opts }
  if (turnChecks.value.length) pendingEnd.value = end
  else finishTurn(end)
}
function confirmEnd() {
  const end = pendingEnd.value
  pendingEnd.value = null
  finishTurn(end)
}
function finishTurn({ final, discard }) {
  if (discard) endTurnDiscard(discard.pi, discard.slug)
  else if (!final) endTurn()
  if (final) endModalOpen.value = true
}
provide('requestEndTurn', requestEndTurn)

// The phase arrows stay inside the turn (see the template): a turn is changed by End / Undo turn.
function canStepInTurn(delta) {
  const i = BATTLE_PHASES.indexOf(current.value.currentPhase || 'command')
  return canStepPhase(delta) && i + delta >= 0 && i + delta < BATTLE_PHASES.length
}

function onPickPhase(turn, phase) {
  goToPhase(turn, phase)
  phasePickerOpen.value = false
}

// Show a player's army-rule card per the split you/opponent toggles (mapped by isYou, not index,
// since players are reordered by first turn). `tracks` supplies the back-compat — the old single
// `trackArmyRule` flag, and any flag a saved game predates.
function armyRuleOn(pl) {
  return tracks(current.value.settings, (pl.isYou ?? false) ? 'trackArmyYou' : 'trackArmyOpp')
}

const isDoubles = computed(() => current.value?.settings?.gameType === 'doubles')

// Which army-rule tracker cards the side gets. Singles: the one side-level card. Doubles: a
// unified force of ONE faction shares one pool (side-level state, mi null); otherwise each
// member with a faction tracks their own army's rule.
function armyCards(pl) {
  if (!armyRuleOn(pl)) return []
  if (!isDoubles.value) return [{ mi: null }]
  const [a, b] = pl.members
  if (pl.forceType === 'unified' && a.factionSlug && a.factionSlug === b.factionSlug) return [{ mi: null }]
  return pl.members.map((m, mi) => ({ mi })).filter(({ mi }) => !!pl.members[mi].factionSlug)
}

// Active twist (if any) — shown as a collapsible reminder; its mission effect (Mirrored
// World / Scrambled Communications) is already baked into each player's primarySlug.
const activeTwist = computed(() => {
  const id = current.value?.settings?.twist
  if (!id) return null
  return getEventContent(locale.value).twists.blocks.find(b => b.id === id) || null
})

function primaryMission(i) {
  return missionBySlug(current.value.players[i].primarySlug, null, locale.value)
}
function primaryName(i) {
  const m = primaryMission(i)
  return m ? m.name : ''
}
// Scorable primary blocks for the round on screen (round-gated by block heading).
function primaryBlocks(i) {
  return scorableBlocks(current.value.players[i].primarySlug, null, shownRound.value, locale.value)
}
// A primary condition whose moment cannot have come yet (missionTiming.js), by the EN block.
function primaryLocked(i, b) {
  return blockLocked(current.value, i, shownRound.value, missionBySlug(current.value.players[i].primarySlug)?.blocks[b.bi])
}
function onEndBattle(reason) {
  endModalOpen.value = false
  finishGame(reason)
}
</script>

<style scoped>
/* The rounds: square steps in one row, "Finish game" at the end of it. */
.round-bar {
  display: flex;
  align-items: stretch;
  gap: 0.3rem;
  margin: 0.6rem 0 0;
}
.rb-rounds { display: flex; gap: 0.3rem; flex: 1 1 auto; min-width: 0; }
.rb-round {
  flex: 1 1 0;
  min-width: 26px;
  height: 34px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  font-weight: 700;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.rb-round.on { background: var(--accent); color: #fff; border-color: var(--accent); }
/* The live round, while a past one is on screen: outlined, so the way back reads at a glance. */
.rb-round.live:not(.on) { border-color: var(--accent); color: var(--accent); }
.rb-round:disabled { opacity: 0.45; cursor: default; }
.rb-finish {
  flex: 0 0 auto;
  min-height: 40px;
  white-space: nowrap;
  padding: 0 0.8rem;
  border: 1px solid var(--accent);
  background: var(--bg-card);
  color: var(--accent);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}
@media (hover: hover) { .rb-finish:hover { background: color-mix(in srgb, var(--accent) 10%, var(--bg-card)); } }
.twist-card {
  max-width: 640px;
  margin: -0.4rem auto 1rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
}
.twist-card > summary {
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--text-primary);
}
.twist-card .tc-label {
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent);
  margin-right: 0.35rem;
}
.twist-card-body {
  padding: 0 0.75rem 0.6rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-muted);
}
.players { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.6rem; }
.player {
  --side: var(--side-you);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 4px solid var(--side);
  padding: 0.8rem;
}
.player.opp { --side: var(--side-opponent); }
.player .ptitle { color: var(--side); display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem; }
.pt-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pt-turn {
  flex-shrink: 0;
  font-family: var(--font-sans); font-size: 0.72rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em; color: var(--side);
}
/* The folded other side: one full-width row, the side's name in it. */
.other-toggle {
  display: flex; align-items: center; justify-content: center; gap: 0.4rem;
  width: 100%; min-height: 44px; padding: 0.5rem 0.75rem;
  border: 1px dashed var(--border); background: var(--bg-card);
  font: inherit; font-size: 0.88rem; font-weight: 600; color: var(--text-muted); cursor: pointer;
}
@media (hover: hover) { .other-toggle:hover { border-color: var(--accent); color: var(--text-primary); } }
/* The primary card: one line — its name, the tag, this round's VP; the whole line opens it. */
.mission-card {
  display: flex; align-items: center; gap: 0.5rem; width: 100%;
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--side) 4%, var(--bg-card));
  font: inherit; text-align: left; cursor: pointer;
}
@media (hover: hover) { .mission-card:hover { border-color: var(--side); } }
.mc-name {
  flex: 1 1 auto; min-width: 0;
  font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; line-height: 1.1; color: var(--side);
}
.mc-tag {
  flex-shrink: 0; padding: 0.1rem 0.45rem; border: 1px solid var(--border);
  font-size: 0.72rem; color: var(--text-dim);
}
.mc-vp { flex-shrink: 0; font-family: var(--font-mono); font-weight: 700; font-size: 0.85rem; color: var(--text-primary); }
/* Correcting a past round. */
.round-edit {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.4rem 0.75rem;
  margin-bottom: 0.6rem; padding: 0.55rem 0.7rem;
  border: 1px solid var(--warning); background: color-mix(in srgb, var(--warning) 10%, var(--bg-card));
  font-size: 0.85rem; font-weight: 600; color: var(--text-primary);
}
.re-back {
  min-height: 36px; padding: 0 0.7rem; border: 1px solid var(--warning); background: var(--bg-card);
  font: inherit; font-size: 0.82rem; font-weight: 700; color: var(--warning); cursor: pointer;
}
.ptitle { font-family: var(--font-display); font-size: 1.45rem; font-weight: 500; color: var(--text-primary); margin: 0; }
.pmeta { font-size: 0.78rem; color: var(--text-muted); margin: 0.2rem 0 0.1rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; }
.pdet { font-size: 0.72rem; color: var(--text-dim); margin: 0 0 0.3rem; font-family: var(--font-mono); }
.sec-title-row {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-dim);
  margin-bottom: 0.3rem;
}
.score-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.55rem; }
.sr-label {
  min-width: 4.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
}
.sr-sub { font-size: 0.72rem; color: var(--text-dim); }
.actions { display: flex; justify-content: space-between; gap: 0.6rem; margin-top: 1.25rem; }
.actions-left { display: flex; gap: 0.6rem; }
.btn-icon {
  display: inline-flex; align-items: center; gap: 0.25rem;
  padding: 0.6rem 0.7rem; font-size: 1rem; line-height: 1;
}
/* A side another phone plays: readable, not touchable. */
.player-locked { opacity: 0.72; }
.plocked {
  margin: 0.1rem 0 0.4rem;
  font-size: 0.72rem;
  color: var(--text-muted);
}
/* Small phones: the icon row stays one line (~320px). */
@media (max-width: 430px) {
  .actions .btn-icon { padding: 0.45rem 0.55rem; font-size: 0.9rem; }
  .actions-left { gap: 0.4rem; }
}

/* The headline over the score: round and turn, read at a glance from across the table. */
/* Inline, not flex: the headline's spans carry their own spaces ("Andronovmy’s turn" has none
   between the name and the rest), and flex items would trim them and space by the gap instead. */
.turn-now {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
  color: var(--text-muted);
}
.turn-now::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 0.5rem;
  vertical-align: 0.15em;
  border-radius: 50%;
  background: var(--accent);
}
.tn-strong { font-weight: 700; color: var(--text-primary); }
/* Back and forward by a turn: two equal halves. Forward wears the colour of the side on turn. */
.turn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; }
/* The pinned bar: full-bleed (it is the window's bottom edge), what stands on it at the page's
   860px measure — the roster builder's .rc-sticky idiom. */
.tf-sticky {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  z-index: 150;
  padding-bottom: var(--safe-bottom, 0px);
  background: var(--bg-primary);
  border-top: 1px solid var(--border);
}
.tf-sticky-inner { max-width: 860px; margin: 0 auto; padding: 0.4rem 2rem; }
@media (max-width: 900px) {
  .tf-sticky { bottom: calc(52px + var(--safe-bottom, 0px)); padding-bottom: 0; }
  .tf-sticky-inner { padding: 0.4rem calc(1rem + var(--safe-right)) 0.4rem calc(1rem + var(--safe-left)); }
}
@media (max-width: 480px) {
  .tf-sticky-inner { padding: 0.4rem calc(0.5rem + var(--safe-right)) 0.4rem calc(0.5rem + var(--safe-left)); }
}
/* With phases: undo · ‹ · the phase · › · end. */
.turn-row.phased { grid-template-columns: 42px 34px minmax(0, 1fr) 34px auto; gap: 0.3rem; }
.tr-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
  min-width: 0;
  min-height: 42px;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
}
.tr-icon { padding: 0; font-size: 1.1rem; }
.tr-step {
  min-height: 42px; padding: 0;
  border: 1px solid var(--border); background: var(--bg-card);
  font-size: 1.2rem; color: var(--text-primary); cursor: pointer;
}
.tr-step:disabled { opacity: 0.35; cursor: default; }
.tr-phase {
  display: grid; align-content: center; min-width: 0; min-height: 42px; padding: 0.15rem 0.4rem;
  border: 1px solid var(--border); background: var(--bg-card); font: inherit; cursor: pointer; text-align: center;
}
.tp-who { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.7rem; color: var(--text-dim); line-height: 1.2; }
.tp-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; text-transform: uppercase; line-height: 1.1; color: var(--text-primary); }
@media (hover: hover) { .tr-phase:hover, .tr-step:not(:disabled):hover { border-color: var(--accent); } }
.tr-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tr-end { --side: var(--side-you); background: var(--side); border-color: var(--side); color: #fff; }
.tr-end.opp { --side: var(--side-opponent); }
.tr-btn:disabled { opacity: 0.45; cursor: default; }
@media (hover: hover) {
  .tr-prev:not(:disabled):hover { border-color: var(--accent); }
  .tr-end:not(:disabled):hover { background: color-mix(in srgb, var(--side) 85%, #000); }
}

/* The working area's tabs: one strip, joined, on a line in the accent — the active tab is filled
   with it and so reads as part of the line it stands on, attached to the panel under it. */
.game-tabs {
  --gt-closed: 48px; /* a closed (icon) tab's width; the open one takes the rest */
  display: grid;
  margin: 0.7rem 0;
  border-bottom: 2px solid var(--accent);
}
.gt-tab {
  position: relative;
  display: inline-flex; align-items: center; justify-content: center; gap: 0.45rem;
  min-width: 0;
  min-height: 40px;
  padding: 0.2rem 0.4rem;
  margin-left: -1px;
  border: 1px solid var(--border);
  border-bottom: 0;
  background: var(--bg-card);
  color: var(--text-muted);
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  cursor: pointer;
}
.gt-tab:first-child { margin-left: 0; }
.gt-tab .bi { font-size: 1.1rem; }
.gt-word { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
/* Six tabs on a 320px phone: narrower icons, or the open tab's word is cut to its first letter. */
@media (max-width: 360px) { .game-tabs { --gt-closed: 38px; } }
.gt-tab.on { z-index: 1; background: var(--accent); border-color: var(--accent); color: #fff; }
@media (hover: hover) { .gt-tab:not(.on):hover { color: var(--text-primary); } }
/* The phase tab's count, in its corner. */
.gt-count {
  position: absolute; top: 2px; right: 2px;
  min-width: 1.05rem; padding: 0 0.2rem;
  background: var(--accent); color: #fff;
  font-family: var(--font-mono); font-size: 0.62rem; line-height: 1.35; letter-spacing: 0;
}
.gt-tab.on .gt-count { background: #fff; color: var(--accent); }
.panel-empty { margin: 0; font-size: 0.85rem; color: var(--text-dim); }
.gt-tab.on { background: var(--accent); border-color: var(--accent); color: #fff; }
@media (hover: hover) { .gt-tab:not(.on):hover { border-color: var(--accent); } }

/* Command points: the heading with its "?", and each side's bank at the end of its line
   (CpStratagems' #bank slot). */
.cp-head { display: flex; align-items: center; gap: 0.3rem; margin-bottom: 0.35rem; }
.cp-head .sec-title-row { margin: 0; }
.cp-bank { flex-shrink: 0; display: flex; align-items: center; gap: 0.4rem; }
.cr-btn {
  display: inline-flex; align-items: center; gap: 0.25rem;
  min-height: 36px; padding: 0.25rem 0.55rem;
  border: 1px solid var(--side); background: color-mix(in srgb, var(--side) 8%, var(--bg-card));
  font: inherit; font-size: 0.8rem; font-weight: 700; color: var(--side); cursor: pointer; white-space: nowrap;
}
.cr-btn.undo { background: var(--side); color: #fff; }
.cr-btn:disabled { border-color: var(--border); background: var(--bg-secondary); color: var(--text-dim); cursor: default; }
.cr-help { flex-shrink: 0; padding: 0 0.2rem; border: 0; background: none; font-size: 0.95rem; color: var(--text-dim); cursor: pointer; }
@media (hover: hover) { .cr-help:hover { color: var(--accent); } }


/* The broadcast button is a STATE: lit while the game is streaming to an overlay. */
.bc-on {
  color: var(--accent);
  border-color: var(--accent);
}
</style>
