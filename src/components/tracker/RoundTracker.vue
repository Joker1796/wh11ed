<template>
  <!-- The whole game screen wears the colour of the side whose turn it is (owner's call,
       2026-09-27): --accent is re-pointed at the opponent's blue during their turn (.turn-opp),
       so every accented control — the tabs, the rounds, the buttons, the ticks — says whose turn
       it is. The sides themselves keep their own colours (--side-you / --side-opponent). -->
  <div
    class="round-tracker side-colored turn-colored"
    :class="{ 'turn-opp': turnOpp, 'tab-moved': panelFrom, 'tab-back': panelFrom < 0 }"
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
      <!-- A step is a VIEW, not a move: a past round opens for correction (the game stays where it
           is — only End/Undo turn move it), the live one comes back (RoundStrip.vue). -->
      <RoundStrip
        :count="ROUND_COUNT"
        :live="current.currentRound"
        :shown="shownRound"
        :phase="stripPhase"
        @pick="(n) => (viewRound = n === current.currentRound ? null : n)"
      />
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
        <!-- Before the first turn the bar is one button that starts it (2026-10-02, owner): the
             setup lands here while the armies are still being deployed. -->
        <div
          v-if="!begun"
          class="turn-row begin"
        >
          <button
            class="tr-btn tr-end"
            data-press
            :class="{ opp: !isYouSide(current.players[turnIndex], turnIndex) }"
            :disabled="!canEdit(turnIndex)"
            @click="beginGame()"
          >
            <span class="tr-label">{{ labels.trackerStart }}</span>
          </button>
        </div>
        <div
          v-else-if="phasesOn"
          class="turn-row phased"
        >
          <button
            class="tr-btn tr-prev tr-icon"
            data-press
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
            data-press
            :disabled="!canStepInTurn(-1)"
            :aria-label="labels.ariaPrevPhase"
            @click="stepPhase(-1)"
          >
            ‹
          </button>
          <button
            class="tr-phase"
            data-press
            :title="labels.trackerPhasePick"
            @click="phasePickerOpen = true"
          >
            <span class="tp-who">{{ playerSide(turnIndex) }}</span>
            <span class="tp-name">{{ phaseLabel(current.currentPhase || 'command', labels) }}</span>
          </button>
          <button
            class="tr-step"
            data-press
            :disabled="!canStepInTurn(1)"
            :aria-label="labels.ariaNextPhase"
            @click="stepPhase(1)"
          >
            ›
          </button>
          <button
            class="tr-btn tr-end"
            data-press
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
            data-press
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
            data-press
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
            data-press
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
      :round="current.currentRound"
      @pick="onPickPhase"
      @close="phasePickerOpen = false"
    />

    <!-- The game's working area: ONE strip of tabs over one panel (owner's calls, 2026-09-27 —
         two rows split by a rule read as two menus, and they were one). Every closed tab is an
         icon, named on hover and to a screen reader; the open one takes the rest of the width
         and says its word beside its icon — so the strip is one row at any width, and the
         word on screen is always where you are. The phase tab carries its count. The open tab
         sits on the strip's line in the accent, attached to what it shows. Every new turn opens
         on the missions (watch below) — that is where a turn starts.
         Switching (owner's mock, 2026-09-30): the old tab's fill drains down while the strip
         re-divides, then the new one fills from the bottom and its word rises into it; the panel
         slides in from the side the tab is on. -->
    <nav
      ref="tabsEl"
      class="game-tabs"
      role="tablist"
      :aria-label="labels.trackerTabsAria"
    >
      <button
        v-for="t in tabs"
        :key="t.id"
        role="tab"
        class="gt-tab"
        :class="{ on: tab === t.id }"
        :aria-selected="tab === t.id"
        :aria-label="t.label"
        :title="tab === t.id || wideTabs ? undefined : t.label"
        @click="tab = t.id"
      >
        <span
          class="gt-fill"
          aria-hidden="true"
        />
        <i
          class="bi"
          :class="t.icon"
          aria-hidden="true"
        />
        <Transition name="gt-word">
          <span
            v-if="tab === t.id || wideTabs"
            class="gt-word"
          >{{ t.label }}</span>
        </Transition>
        <span
          v-if="t.count"
          class="gt-count"
        >{{ t.count }}</span>
      </button>
    </nav>

    <!-- Every panel is built once and kept (v-show): the missions at once, the rest while the
         browser is idle right after, so a switch only shows what is already there — nothing is
         built in the frame the panel slides in (owner, 2026-09-30). The CP panel first came up
         empty for a frame while its decks loaded and the page jumped (2026-09-29). -->
    <section
      v-show="tab === 'missions'"
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

      <!-- One side's missions at a time, picked on the app's page tabs (owner, 2026-09-29) — the
           same tabs as the CP tab's, in the same order. A new turn opens the side on turn (this
           phone's own side in a shared game: a guest does not want the other phone's cards first).
           Names alone on the tabs, the same two as the CP tab's. The block wears the chosen side's
           colour. Both sides open, one under the other, ran to several screens. -->
      <div
        ref="msideEl"
        class="mside"
        :class="{ opp: !isYouSide(current.players[missionSide], missionSide) }"
      >
        <PageTabs
          class="mside-tabs"
          fill
          :tabs="missionTabs"
          @select="(i) => (missionSide = i)"
        />
        <!-- In a shared game a side another phone plays is shown as it is, greyed, with the
             reason under its title — never hidden: what the opponent has scored is exactly what a
             player wants to see. The lock is on what SCORES — the primary, the deck, the army
             tracker's controls (`inert`, see lock()) — not on the card, because the card is also
             where the opponent's army rule is READ. A guest who could not open the other side's
             Waaagh! rule was the first complaint about the shared game. The sync layer snaps
             back anything that gets past the lock. `inert` is a presence attribute — a rendered
             "false" would still be inert — hence `undefined` rather than false. -->
        <template
          v-for="i in [missionSide]"
          :key="i"
        >
          <div
            class="player"
            :data-side="i"
            :class="{ 'player-locked': !canEdit(i), opp: !isYouSide(current.players[i], i) }"
          >
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
              data-press
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
          </div>
        </template>
      </div>
    </section>

    <!-- Command points (owner, 2026-09-29: two tall banks spent a phone's screen on three copies of
         one number and a line of constant text). The sides are CpStratagems' tabs, each with its
         balance; under the chosen one, one line: the round's bonus point — its button turns into
         an undo for a point added by hand — the stepper (a correction is kept in the ledger as
         one) and a "?" for where Core CP come from. -->
    <section
      v-if="cpOn && built.has('cp')"
      v-show="tab === 'cp'"
      class="panel"
      role="tabpanel"
    >
      <CpStratagems
        ref="cpEl"
        :names="current.players.map((_, i) => playerName(i))"
        :default-side="focusSide"
      >
        <template #bank="{ side }">
          <div
            class="cp-bank"
            :class="{ 'player-locked': !canEdit(side) }"
            :inert="lock(side)"
          >
            <span class="cr-bonus">{{ labels.trackerBonusLabel }} <b>{{ bonusOf(side) ? 1 : 0 }}/1</b></span>
            <button
              v-if="canUndoBonus(side)"
              class="cr-btn undo"
              data-press
              :title="labels.trackerBonusUndo"
              @click="undoBonusCp(side)"
            >
              <i class="bi bi-arrow-counterclockwise" /> {{ labels.trackerBonusGainShort }}
            </button>
            <button
              v-else
              class="cr-btn"
              data-press
              :disabled="!canGainBonus(side)"
              :title="bonusSource(side)"
              @click="gainBonusCp(side)"
            >
              {{ labels.trackerBonusGainShort }}
            </button>
            <NumberStepper
              class="cr-adjust"
              :model-value="current.players[side].cp"
              :min="0"
              :aria-label="`${playerName(side)} — CP`"
              @update:model-value="v => setCp(side, v)"
            />
            <button
              type="button"
              class="cr-help"
              data-press
              :aria-label="labels.trackerCpHelpTitle"
              :title="labels.trackerCpHelpTitle"
              @click="cpHelpOpen = true"
            >
              <i class="bi bi-question-circle" />
            </button>
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
      v-if="phaseTabOn && built.has('phase')"
      v-show="tab === 'phase'"
      class="panel"
      role="tabpanel"
    >
      <PhaseRules
        embedded
        @stratagems="openCpNow"
        @army="openArmyRule"
        @roster="openRoster"
      />
      <p
        v-if="!phaseRuleCount"
        class="panel-empty"
      >
        {{ labels.trackerPhaseNone }}
      </p>
    </section>

    <section
      v-if="built.has('log')"
      v-show="tab === 'log'"
      class="panel"
      role="tabpanel"
    >
      <GameLog :names="current.players.map((_, i) => playerName(i))" />
    </section>

    <section
      v-if="built.has('stats')"
      v-show="tab === 'stats'"
      class="panel"
      role="tabpanel"
    >
      <ScoreBreakdown expanded />
    </section>

    <!-- The armies: each army's facts, the way to its units, its rules and stratagems. -->
    <section
      v-if="built.has('armies')"
      v-show="tab === 'armies'"
      class="panel"
      role="tabpanel"
    >
      <ArmiesPanel
        ref="armiesEl"
        :names="current.players.map((_, i) => playerName(i))"
        :default-side="focusSide"
        @roster="openRoster"
      />
    </section>

    <!-- The attached lists (RosterTab.vue): each built on its first visit and kept. -->
    <section
      v-if="hasLists && built.has('roster')"
      v-show="tab === 'roster'"
      class="panel"
      role="tabpanel"
    >
      <RosterTab
        ref="rosterEl"
        :names="current.players.map((_, i) => playerName(i))"
        :default-side="focusSide"
        :active="tab === 'roster'"
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
        data-press
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
    <!-- A pick that is not the next phase asks first: a stray tap ten rows long would move the
         clock past phases nobody played (owner, 2026-10-06). -->
    <ConfirmModal
      v-if="phaseJump"
      :title="labels.trackerPhaseJumpTitle"
      :message="phaseJumpMessage"
      :confirm-label="labels.trackerPhaseJumpGo"
      :cancel-label="labels.trackerCancel"
      @confirm="goToPhase(phaseJump.turn, phaseJump.phase); phaseJump = null"
      @close="phaseJump = null"
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
import { ref, computed, watch, provide, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useMediaQuery } from '../../composables/useMediaQuery.js'
import NumberStepper from './NumberStepper.vue'
import SecondaryDeck from './SecondaryDeck.vue'
import ScoreBoard from './ScoreBoard.vue'
import ScoreBreakdown from './ScoreBreakdown.vue'
import CpStratagems from './CpStratagems.vue'
import PageTabs from '../PageTabs.vue'
import OptionHelpModal from './OptionHelpModal.vue'
import GameLog from './GameLog.vue'
import ArmiesPanel from './ArmiesPanel.vue'
import RosterTab from './RosterTab.vue'
import RoundStrip from './RoundStrip.vue'
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
import { useSwapFade } from '../../composables/useSwapFade.js'
import { useTracker, gameBegun, membersOf, sideLabel, isYouSide, ROUND_COUNT, PRIMARY_ROUND_CAP, PRIMARY_GAME_CAP, dispositionName, missionBySlug, scorableBlocks } from '../../composables/useTracker.js'
import { useBroadcast } from '../../composables/useBroadcast.js'
import { useParty } from '../../composables/useParty.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, setRoundPrimary, setPrimaryRow, primaryRowCount, setCp, endTurnDiscard, canGainBonus, gainBonusCp, canUndoBonus, undoBonusCp, stepPhase, goToPhase, canStepPhase, endTurn, canEndTurn, beginGame, undoTurn, canUndoTurn, finishGame } = useTracker()
const begun = computed(() => gameBegun(current.value))
// Every tab carries its word on a wide screen (see .game-tabs in the styles).
const wideTabs = useMediaQuery('(min-width: 901px)')

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
// The panels built so far (see the template): the open one, then the rest one per idle moment.
const built = ref(new Set([tab.value]))
// The Phase tab exists only while the game keeps the clock AND asked for the reminder; its count
// is the reminder itself, readable without opening it.
const phaseTabOn = computed(() => phasesOn.value && tracks(current.value.settings, 'trackPhaseRules'))
const { total: phaseRuleCount } = usePhaseRules()
const tabs = computed(() => [
  { id: 'missions', label: labels.value.trackerTabMissions, icon: 'bi-bullseye' },
  // The phase right after the missions (owner, 2026-09-30): what speaks now is read during the turn.
  ...(phaseTabOn.value ? [{ id: 'phase', label: labels.value.trackerTabPhase, icon: 'bi-hourglass-split', count: phaseRuleCount.value }] : []),
  ...(cpOn.value ? [{ id: 'cp', label: labels.value.trackerCp, icon: 'bi-lightning-charge' }] : []),
  // The armies right after CP (owner, 2026-09-29): both are looked at during a turn, the log and
  // the stats after it.
  { id: 'armies', label: labels.value.trackerTabArmies, icon: 'bi-shield-shaded' },
  // The attached lists, read in the game (owner, 2026-09-30) — only when there is one.
  ...(hasLists.value ? [{ id: 'roster', label: labels.value.trackerRosterOpen, icon: 'bi-card-list' }] : []),
  { id: 'log', label: labels.value.trackerTabLog, icon: 'bi-journal-text' },
  { id: 'stats', label: labels.value.trackerTabStats, icon: 'bi-bar-chart-line' },
])
watch(phaseTabOn, (on) => { if (!on && tab.value === 'phase') tab.value = 'missions' })
watch(cpOn, (on) => { if (!on && tab.value === 'cp') tab.value = 'missions' })
const hasLists = computed(() => (current.value?.players || []).some((pl) => membersOf(pl).some((m) => m.roster)))
watch(hasLists, (on) => { if (!on && tab.value === 'roster') tab.value = 'missions' })
// The round line's phases (RoundStrip), with the clock on: both turns' phases, the live one.
const stripPhase = computed(() => {
  if (!phasesOn.value) return null
  const g = current.value
  const turn = g.currentTurn === 1 ? 1 : 0
  const at = turn * BATTLE_PHASES.length + Math.max(0, BATTLE_PHASES.indexOf(g.currentPhase || 'command'))
  // Each turn's phases in its side's colour: the first turn is players[0]'s (the players stand in
  // turn order), the second players[1]'s.
  const colors = g.players.map((pl, i) => (isYouSide(pl, i) ? 'var(--side-you)' : 'var(--side-opponent)'))
  return { steps: BATTLE_PHASES.length * 2, at, colors, label: `${phaseLabel(g.currentPhase || 'command', labels.value)} · ${playerName(turnIndex.value)}` }
})
// The Phase tab's lines into the other tabs: its stratagems line opens the CP tab on the phase's
// group, a rule opens the Armies tab on that army with the rule unfolded.
const cpEl = ref(null)
const armiesEl = ref(null)
async function openCpNow() {
  tab.value = 'cp'
  await nextTick()
  cpEl.value?.showNow()
}
async function openArmyRule(at) {
  tab.value = 'armies'
  await nextTick()
  armiesEl.value?.reveal(at)
}
// A list: the Roster tab on that army. One unit of it: its card over the tab on screen.
const rosterEl = ref(null)
async function openRoster({ pi, mi, uid }) {
  if (uid == null) tab.value = 'roster'
  built.value.add('roster')
  await nextTick()
  if (uid == null) rosterEl.value?.show({ pi, mi })
  else rosterEl.value?.openUnit({ pi, mi, uid })
}
// Where the new panel slides in from: the side the tab stands on, relative to the old one
// (1 from the right, -1 from the left; 0 until the first switch).
const panelFrom = ref(0)
watch(tab, (t, old) => {
  built.value.add(t)
  const ids = tabs.value.map((x) => x.id)
  panelFrom.value = ids.indexOf(t) < ids.indexOf(old) ? -1 : 1
})
let gone = false
onBeforeUnmount(() => { gone = true })
onMounted(() => {
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 250))
  const next = () => {
    const id = !gone && tabs.value.map((t) => t.id).find((t) => !built.value.has(t))
    if (!id) return
    built.value.add(id)
    idle(next)
  }
  idle(next)
})
// Switching panels from further down the page: the new panel starts right under the tab strip,
// the strip at the top of the screen — not wherever a shorter panel lets the browser clamp the
// scroll (2026-09-29: first a jump, then a screen-tall blank to stop it). From above, nothing moves.
// The strip is sticky (owner, 2026-10-06), so "further down" is "the strip is stuck": its own top
// then equals its sticky `top`, and the new panel is scrolled up to sit just under it.
const tabsEl = ref(null)
watch(tab, () => {
  const el = tabsEl.value
  if (!el) return
  const cs = getComputedStyle(el)
  const stuckAt = parseFloat(cs.top) || 0
  if (el.getBoundingClientRect().top > stuckAt + 1) return
  const panel = [...el.parentElement.children].find((c) => c.classList.contains('panel') && c.style.display !== 'none')
  if (!panel) return
  const want = stuckAt + el.offsetHeight + (parseFloat(cs.marginBottom) || 0)
  window.scrollBy({ top: panel.getBoundingClientRect().top - want, behavior: 'instant' })
}, { flush: 'post' })
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

// A new turn starts on the missions, on the live round, on the focus side's tab: the first
// thing a turn does is draw and score.
watch(() => [current.value.currentRound, current.value.currentTurn], () => {
  tab.value = 'missions'
  viewRound.value = null
  missionSide.value = focusSide.value
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

// Whose missions are open: the focus side, until a tab says otherwise; a new turn goes back to it.
const missionSide = ref(focusSide.value)
// Another side's missions fade in under the standing tabs (useSwapFade).
const msideEl = ref(null)
useSwapFade(missionSide, () => msideEl.value?.querySelector(':scope > .player'))
watch(focusSide, (v) => { missionSide.value = v })
const missionTabs = computed(() => [0, 1].map((i) => ({
  key: i,
  label: playerName(i),
  active: missionSide.value === i,
})))

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

// The slot right after the live one: the same turn's next phase, or the second turn's Command
// after the first turn's Fight.
function isNextPhase(turn, phase) {
  const i = BATTLE_PHASES.indexOf(current.value.currentPhase || 'command')
  const j = BATTLE_PHASES.indexOf(phase)
  if (turn === turnIndex.value) return j === i + 1
  return turnIndex.value === 0 && turn === 1 && i === BATTLE_PHASES.length - 1 && j === 0
}

// Picking the live slot or the next one moves at once; anything else asks first (phaseJump).
const phaseJump = ref(null)
const phaseJumpMessage = computed(() => phaseJump.value && labels.value.trackerPhaseJumpMessage
  .replace('{phase}', phaseLabel(phaseJump.value.phase, labels.value))
  .replace('{name}', playerName(phaseJump.value.turn)))

function onPickPhase(turn, phase) {
  phasePickerOpen.value = false
  const live = turn === turnIndex.value && phase === (current.value.currentPhase || 'command')
  if (live || isNextPhase(turn, phase)) goToPhase(turn, phase)
  else phaseJump.value = { turn, phase }
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
/* The rounds: a thin line of points (RoundStrip), the sync state at its end. */
.round-bar {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin: 0.4rem 0 0;
}
.rb-finish {
  flex: 0 0 auto;
  min-height: 40px;
  white-space: nowrap;
  padding: 0 0.8rem;
  border: 1px solid var(--accent);
  background: var(--bg-card);
  color: var(--accent-ink);
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
  color: var(--accent-ink);
  margin-right: 0.35rem;
}
.twist-card-body {
  padding: 0 0.75rem 0.6rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-muted);
}
/* The missions block in the chosen side's colour: its tabs' lit edge, the cards' accent. */
.mside { --side: var(--side-you); --accent: var(--side); --accent-hover: color-mix(in srgb, var(--side) 80%, #000); --accent-ink: var(--side); --accent-ink-hover: color-mix(in srgb, var(--side) 80%, #000); }
.mside.opp { --side: var(--side-opponent); }
.mside-tabs { margin-bottom: 0.6rem; }
/* On the page's own background, like the CP panel (owner, 2026-09-29): the side tabs above already
   say whose it is, and a framed card inside the tab's frame was a box in a box. */
.player { --side: var(--side-you); }
.player.opp { --side: var(--side-opponent); }
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
/* One line: a long name is cut with "…" (owner, 2026-09-29) instead of pushing the board down. */
.turn-now {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.turn-row.begin { grid-template-columns: 1fr; }
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
  --gt-ease: cubic-bezier(0.65, 0, 0.35, 1);
  display: flex;
  margin: 0.7rem 0;
  border-bottom: 2px solid var(--accent);
  /* Pinned under the site's bar while a long panel (the roster) scrolls (owner, 2026-10-06). The
     page's own background behind it, so the panel does not show between the tabs. */
  position: sticky;
  top: calc(var(--navbar-height) + var(--safe-top));
  z-index: 20;
  background: var(--bg-primary);
}
/* Wide screens also pin the subnav (AppSubnav) under the bar. */
@media (min-width: 901px) {
  .game-tabs { top: calc(var(--navbar-height) + var(--safe-top) + var(--subnav-height)); }
}
/* The open tab grows into what the closed ones leave: flex-grow, not grid columns (1fr to 48px does
   not animate), and the two grows always sum to one, so the strip re-divides without a wobble. */
.gt-tab {
  position: relative;
  overflow: hidden;
  display: inline-flex; align-items: center; justify-content: center; gap: 0.45rem;
  flex: 0 0 var(--gt-closed);
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
  transition:
    flex-grow var(--motion-tab) var(--gt-ease),
    color var(--motion-tab) ease,
    border-color var(--motion-tab) ease;
}
.gt-tab:first-child { margin-left: 0; }
.gt-tab.on { flex-grow: 1; z-index: 1; border-color: var(--accent); color: #fff; }
/* The accent is a layer, so only its transform moves: the old one drains down at once, the new one
   fills from the bottom a quarter later — "drained, then filled". */
.gt-fill {
  position: absolute; inset: 0;
  background: var(--accent);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform calc(var(--motion-tab) * 0.75) var(--gt-ease);
}
.gt-tab.on .gt-fill {
  transform: scaleY(1);
  transition-delay: calc(var(--motion-tab) * 0.25);
}
.gt-tab > .bi, .gt-tab > .gt-word { position: relative; } /* over the fill */
.gt-tab .bi { font-size: 1.1rem; }
.gt-word { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
/* The new word rises into the filled tab; the old one goes at once. */
.gt-word-enter-active {
  transition:
    transform calc(var(--motion-tab) * 0.8) cubic-bezier(0.2, 0.8, 0.2, 1) calc(var(--motion-tab) * 0.35),
    opacity calc(var(--motion-tab) * 0.8) cubic-bezier(0.2, 0.8, 0.2, 1) calc(var(--motion-tab) * 0.35);
}
.gt-word-enter-from { opacity: 0; transform: translateY(22px); }
/* Seven tabs on a phone: narrower icons, or the open tab's word is cut to its first letters
   ("МИСС…" at 390px); on a 320px one the open tab also says only its word, a size down. */
@media (max-width: 480px) { .game-tabs { --gt-closed: 40px; } }
@media (max-width: 360px) {
  .game-tabs { --gt-closed: 34px; }
  .gt-tab.on > .bi { display: none; }
  .gt-tab.on { font-size: 1rem; }
}
/* Hover: the tab's own edge in the accent — lifted over its neighbours, which overlap it by a pixel
   (margin-left: -1px), or they cut its frame. */
/* A wide screen (>900px, the desktop threshold of the dropdowns) has room for every word
   (owner, 2026-10-02): the tabs are equal and all say what they are; the open one is the filled
   one. Nothing grows, so of the switch only the fill and the panel's slide are left. */
@media (min-width: 901px) {
  .gt-tab { flex: 1 1 0; }
}
@media (hover: hover) { .gt-tab:not(.on):hover { z-index: 1; border-color: var(--accent); color: var(--text-primary); } }
/* The phase tab's count, in its corner. */
.gt-count {
  position: absolute; top: 2px; right: 2px;
  min-width: 1.05rem; padding: 0 0.2rem;
  background: var(--accent); color: #fff;
  font-family: var(--font-mono); font-size: 0.62rem; line-height: 1.35; letter-spacing: 0;
}
.gt-tab.on .gt-count { background: #fff; color: var(--accent); }
.panel-empty { margin: 0; font-size: 0.85rem; color: var(--text-dim); }
/* After the first switch, a panel coming into view slides in from the side its tab stands on
   (.tab-back: from the left); the one it replaces is already hidden. v-show restarts the animation each time
   display comes back, so no Transition is needed. */
/* It waits for the tab's fill to start, then fades and glides slower than the tab itself, on a soft
   ease-out (owner, 2026-09-30: at the tab's own pace it "appeared and moved too fast"). */
.tab-moved > .panel {
  animation:
    panel-fade calc(var(--motion-tab) * 1.4) ease-out calc(var(--motion-tab) * 0.25) backwards,
    panel-slide calc(var(--motion-tab) * 1.8) cubic-bezier(0.33, 1, 0.68, 1) calc(var(--motion-tab) * 0.25) backwards;
}
.tab-moved { --panel-from: 32px; }
.tab-back { --panel-from: -32px; }
@keyframes panel-fade { from { opacity: 0; } }
@keyframes panel-slide { from { transform: translateX(var(--panel-from)); } }

/* Command points: the chosen side's bank, one line under the side tabs (CpStratagems' #bank). */
.cp-bank {
  display: flex; align-items: center; gap: 0.5rem;
  margin-bottom: 0.6rem; padding: 0.4rem 0 0.1rem;
}
.cr-bonus { font-size: 0.8rem; color: var(--text-muted); white-space: nowrap; }
.cr-bonus b { color: var(--text-primary); }
.cr-adjust { margin-left: auto; }
.cr-btn {
  display: inline-flex; align-items: center; gap: 0.25rem;
  min-height: 36px; padding: 0.25rem 0.55rem;
  border: 1px solid var(--side); background: color-mix(in srgb, var(--side) 8%, var(--bg-card));
  font: inherit; font-size: 0.8rem; font-weight: 700; color: var(--side); cursor: pointer; white-space: nowrap;
}
.cr-btn.undo { background: var(--side); color: #fff; }
.cr-btn:disabled { border-color: var(--border); background: var(--bg-secondary); color: var(--text-dim); cursor: default; }
.cr-help { flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; min-width: 36px; min-height: 36px; padding: 0; border: 0; background: none; font-size: 1.35rem; color: var(--text-dim); cursor: pointer; }
@media (hover: hover) { .cr-help:hover { color: var(--accent-ink); } }


/* The broadcast button is a STATE: lit while the game is streaming to an overlay. */
.bc-on {
  color: var(--accent-ink);
  border-color: var(--accent);
}
</style>
