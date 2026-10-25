<template>
  <!-- The whole game screen wears the colour of the side whose turn it is (owner's call,
       2026-09-27): --accent is re-pointed at the opponent's blue during their turn (.turn-opp),
       so every accented control — the tabs, the rounds, the buttons, the ticks — says whose turn
       it is. The sides themselves keep their own colours (--side-you / --side-opponent). -->
  <div
    ref="rootEl"
    class="round-tracker side-colored turn-colored"
    :class="{ 'turn-opp': turnOpp, 'tab-moved': panelFrom, 'tab-back': panelFrom < 0 }"
    :style="[sideColors, fillPx ? { minHeight: `${fillPx}px` } : null]"
  >
    <!-- Where the game is, in one line above the score: the round and whose turn. The turn is
         kept always — the phase clock under the rounds is the optional part. -->
    <div
      class="turn-row turn-line"
      data-tour="game-line"
    >
      <!-- The dot before the line is the turn's colour — and, in a shared game, the sync state:
           tap it for how long ago, it pulses while in sync (owner, 2026-10-08; it stood alone at
           the rounds' end before). Its bubble opens downwards, clear of the navbar. -->
      <div class="turn-head">
        <SyncIndicator
          v-if="partyHandle"
          drop="down"
        />
        <span
          v-else
          class="turn-dot"
          aria-hidden="true"
        />
        <p class="turn-now">
          <span
            v-for="(part, k) in turnHeadline"
            :key="k"
            :class="{ 'tn-strong': part.strong }"
          >{{ part.text }}</span>
        </p>
      </div>
      <!-- The game's tools, once a footer row of their own, behind one "⋯" on the round line (owner,
           2026-10-06): the line has room on the right, the footer cost a whole row. Not a gear —
           the site's settings gear sits in the navbar right above. No dot on it any more (owner,
           2026-10-08): a shared game shows on the round line's own dot, and the rows inside say
           "on now". -->
      <!-- 17rem: "Shared game" with its "on" mark wrapped to two lines in the default 15. -->
      <ActionMenu
        v-model:open="gameMenuOpen"
        :title="labels.trackerGameMenu"
        width="17rem"
      >
        <template #trigger="{ toggle }">
          <button
            type="button"
            class="btn-ghost game-menu-btn"
            data-tour="game-menu"
            :aria-label="labels.trackerGameMenu"
            :title="labels.trackerGameMenu"
            data-press
            @click="toggle"
          >
            <i class="wi wi-more" />
          </button>
        </template>
        <template #default="{ close }">
          <!-- Setup is the host's in a shared game (it rewrites both sides — a swapped first turn
               is all five slices), but the dialog is still a guest's: it is where this phone's own
               "what to show" switches live (EditSetupModal's guest mode). -->
          <button
            class="act-btn gm-row"
            @click="close(); editSetupOpen = true"
          >
            <i class="wi wi-party-settings" /> {{ labels.trackerEditSetup }}
          </button>
          <!-- The shared game (several phones on this one game): always offered — it is how the
               other side gets to score. -->
          <button
            class="act-btn gm-row"
            @click="close(); partyOpen = true"
          >
            <i class="wi wi-coop" /> {{ labels.partyTitle }}
            <span
              v-if="partyActive"
              class="gm-live"
            >{{ labels.trackerOnNow }}</span>
          </button>
          <!-- Live broadcast (the OBS overlay), offered only when the game asked for it
               (settings.trackBroadcast, niche, off by default) — but a broadcast already LIVE keeps
               it whatever the row says: a stream running with no control would be the dishonest
               kind of hidden. -->
          <button
            v-if="broadcastOn || tracks(current.settings, 'trackBroadcast')"
            class="act-btn gm-row"
            @click="close(); broadcastOpen = true"
          >
            <i class="wi wi-broadcast" /> {{ labels.trackerBroadcastTitle }}
            <span
              v-if="broadcastOn"
              class="gm-live"
            >{{ labels.trackerOnNow }}</span>
          </button>
          <!-- The tour of this screen again (useTour.js) — the beta's. -->
          <button
            v-if="TOUR_ON"
            class="act-btn gm-row"
            @click="close(); startTour('game', tourCtx())"
          >
            <i class="wi wi-help" /> {{ labels.tourReplay }}
          </button>
          <!-- Finishing the game early: a thing done once, not every turn. The last turn's own
               Finish is the turn bar's; GameEndModal is the confirmation. -->
          <button
            class="act-btn act-danger gm-row"
            @click="close(); endModalOpen = true"
          >
            <i class="wi wi-end" /> {{ labels.trackerFinish }}
          </button>
        </template>
      </ActionMenu>
    </div>

    <!-- Moving the game on: two equal buttons, back and forward by a TURN — a round is two turns,
         and ending the second one opens the next round. The forward one wears the colour of the
         side whose turn it is. In a shared game a turn is ended by the side playing it and taken
         back by the side that ended it: the button stays on screen for the other phone, greyed,
         with the reason on the line under the pair. The last turn of the game has nowhere to
         go, so there the forward button finishes the game instead. -->
    <!-- The rounds, right under the round line and above the score (owner, 2026-10-06: the score
         cards pick the side the panel shows, so they stand right over the tabs; the rounds were
         under the score from 2026-09-27). Finishing the game early is in the "⋯" on the round line
         with the other tools. A shared game's sync state is the round line's dot. -->
    <div
      class="round-bar"
      data-tour="game-rounds"
    >
      <!-- A step is a VIEW, not a move: a past round opens for correction (the game stays where it
           is — only End/Undo turn move it), the live one comes back (RoundStrip.vue). The turn
           opened is the shown side's own; a scoring dialog's button opens the other. -->
      <RoundStrip
        :count="ROUND_COUNT"
        :live="current.currentRound"
        :shown="shownRound"
        :phase="stripPhase"
        :turn-color="turnOpp ? 'var(--side-opponent)' : 'var(--side-you)'"
        @pick="(n) => (n === current.currentRound ? (view = null) : openTurn(missionSide, n))"
      />
    </div>

    <!-- The score; on a framed tab the cards are also the side switch (ScoreBoard `selected`). -->
    <ScoreBoard
      :selected="framedTab ? viewSide : -1"
      data-tour="game-score"
      @select="(i) => (pickedSide = i)"
    />

    <!-- The turn buttons are pinned above the bottom nav (the window's bottom edge on a desk): the
         one control used every turn stays under the thumb however far the panel below is scrolled
         (owner's call, 2026-09-27). Its height is reserved in App.vue (.tf-sticky) — change the
         padding or the button height and change that number with them. -->
    <div class="tf-sticky">
      <div
        class="tf-sticky-inner"
        data-tour="game-turnbar"
      >
        <TurnBar
          :mode="!begun ? 'begin' : phasesOn ? 'phased' : 'plain'"
          :who="playerSide(turnIndex)"
          :phase="current.currentPhase || 'command'"
          :opp="!isYouSide(current.players[turnIndex], turnIndex)"
          :reserves="!!reservesSide"
          :invite="!partyActive"
          :can-undo="canUndoTurn() && canEdit(1 - turnIndex) && !strictWhy('clock')"
          :can-prev="canStepInTurn(-1) && !strictWhy('clock')"
          :can-next="canStepInTurn(1)"
          :can-end="!begun || canEndTurn()"
          :end-locked="!canEdit(turnIndex) || !!battleWait"
          :undo-title="undoTitle"
          :end-title="endTitle"
          :locked-text="battleWait ? labels[BATTLE_WAIT[battleWait]] : (begun ? labels.trackerTurnOf : labels.trackerStartsOf).replace('{name}', playerName(turnIndex))"
          :start-go="!!waitStep"
          @start="beginGame()"
          @go="goToWaitStep"
          @reserves="openReserves"
          @invite="partyOpen = true"
          @undo="undoConfirm = true"
          @step="stepPhase"
          @pick-phase="phasePickerOpen = true"
          @end="requestEndTurn()"
        />
      </div>
    </div>


    <PhasePickerModal
      v-if="phasePickerOpen"
      :names="playerNames"
      :turn="turnIndex"
      :phase="current.currentPhase || 'command'"
      :round="current.currentRound"
      :back-why="strictText(strictWhy('clock'))"
      @pick="onPickPhase"
      @close="phasePickerOpen = false"
    />

    <!-- The host closed the shared game, or removed this phone: from here the game is this phone's
         own. Said where the game is played, not only in the sync dot's bubble (a guest went on scoring
         into a copy nobody else saw, 2026-10-17). Dismissed per game. Above the tabs, not in a panel: there it broke
         the join of the strip and its frame, and it is about the whole game (acceptance, 2026-10-18). -->
    <ExpandTransition>
      <div
        v-if="partyCut && !partyHandle.cutSeen"
        class="round-edit"
        role="status"
      >
        <span>{{ partyHandle.ended ? labels.partyCutEnded : labels.partyCutRevoked }}</span>
        <button
          class="re-back"
          @click="partyHandle.cutSeen = true"
        >
          {{ labels.partyCutOk }}
        </button>
      </div>
    </ExpandTransition>

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
    <!-- Over a framed panel (the side picked on the score cards) the strip wears that side's
         colour rather than the turn's, so the open tab, its line and the frame are one colour. -->
    <GameTabs
      ref="tabsEl"
      :tabs="tabs"
      :active="tab"
      :wide="wideTabs"
      :class="framedTab ? ['turn-colored', { 'turn-opp': !isYouSide(current.players[viewSide], viewSide) }] : null"
      @select="(id) => (tab = id)"
    />

    <!-- Every panel is built once and kept (v-show): the missions at once, the rest while the
         browser is idle right after, so a switch only shows what is already there — nothing is
         built in the frame the panel slides in (owner, 2026-09-30). The CP panel first came up
         empty for a frame while its decks loaded and the page jumped (2026-09-29). -->
    <!-- Before the battle: the Mission Sequence's steps from the secondaries to the pre-battle rules
         (PreBattle.vue), a tab of its own in front of the missions while the battle has not begun
         (owner, 2026-10-25: inside the Missions tab it pushed the missions a screen down). It is about
         both sides, so it wears no side's frame, as the Log does. -->
    <section
      v-if="!begun"
      v-show="tab === 'prebattle'"
      class="panel"
      role="tabpanel"
    >
      <PreBattle />
    </section>

    <section
      v-show="tab === 'missions'"
      class="panel panel-framed"
      data-tour="game-missions"
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

      <!-- Correcting a turn already played: a banner says so, and the way back is on it. -->
      <div
        v-if="view"
        class="round-edit"
      >
        <!-- Strict rules: a played turn is read, not corrected — the banner says so instead. -->
        <span>{{ pastWhy || labels.trackerEditingTurn.replace('{n}', view.round).replace('{name}', playerName(view.turn)) }}</span>
        <button
          class="re-back"
          @click="view = null"
        >
          {{ labels.trackerBackToLive }}
        </button>
      </div>

      <!-- One side's missions at a time, the side picked on the score cards (owner, 2026-10-06;
           page tabs of their own from 2026-09-29). A new turn opens the side on turn (this phone's
           own side in a shared game: a guest does not want the other phone's cards first). The
           block is framed in the chosen side's colour. Both sides open, one under the other, ran
           to several screens. -->
      <div
        ref="msideEl"
        class="mside side-frame"
        :class="{ opp: !isYouSide(current.players[missionSide], missionSide) }"
      >
        <!-- In a shared game a side another phone plays is shown as it is, greyed, with the
             reason under its title — never hidden: what the opponent has scored is exactly what a
             player wants to see. The lock is on what SCORES — the primary's stepper, the deck's
             take and card actions, the army tracker's controls (`inert`, see lock()) — never on
             what is READ: the mission cards open, view only (the opponent's missions lie face up,
             Event Companion; a whole inert deck kept them shut, the owner's first game,
             2026-10-24), and the army rule stays readable (a guest who could not open the other
             side's Waaagh! rule was the first complaint about the shared game). The sync layer
             snaps back anything that gets past the lock. `inert` is a presence attribute — a
             rendered "false" would still be inert — hence `undefined` rather than false. -->
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
              @click="openPrimary = i"
            >
              <span class="mc-name">{{ primaryName(i) }}</span>
              <span class="mc-tag">{{ labels.trackerPrimary }}</span>
              <!-- Over the round's 15 only with an End of Battle row, which the cap does not reach: no
                   "/ 15" then, a figure past it would read as an error. -->
              <span class="mc-vp">{{ current.players[i].rounds[shownRound - 1].primary }}{{ current.players[i].rounds[shownRound - 1].primary > PRIMARY_ROUND_CAP ? '' : ` / ${PRIMARY_ROUND_CAP}` }} VP</span>
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
                :disabled="!!pastWhy"
                @update:model-value="v => setRoundPrimary(i, shownRound - 1, v, shownTurn)"
              />
              <span class="sr-sub">/ {{ PRIMARY_ROUND_CAP }} {{ labels.trackerThisRound }}</span>
            </div>

            <!-- Combat Patrol has no secondaries: a player scores their box's mission alone.
                 Before the battle another phone's choice stays hidden until both sides have
                 chosen (PreBattle.vue — the Mission Sequence's secret choice). -->
            <p
              v-if="!current.settings?.combatPatrol && secretOf(i)"
              class="sec-secret"
            >
              {{ labels.pbSecretDeck }}
            </p>
            <SecondaryDeck
              v-else-if="!current.settings?.combatPatrol"
              :pi="i"
              :round="shownRound"
              :turn="shownTurn"
              :turn-names="playerNames"
              :editable="canEdit(i)"
              :name="playerName(i)"
              @open-turn="t => openTurn(t)"
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
      data-tour="game-panel-cp"
      class="panel panel-framed"
      role="tabpanel"
    >
      <CpStratagems
        :names="playerNames"
        :default-side="focusSide"
        :side="viewSide"
      >
        <template #bank="{ side }">
          <CpBank
            :cp="current.players[side].cp"
            :name="playerName(side)"
            :bonus="!!bonusOf(side)"
            :bonus-disabled="bonusOf(side) ? (!canUndoBonus(side) || !!strictUndoWhy('bonus', side)) : !canGainBonus(side)"
            :bonus-title="bonusOf(side) ? (canUndoBonus(side) ? strictText(strictUndoWhy('bonus', side)) || labels.trackerBonusUndo : bonusSource(side)) : bonusSource(side)"
            :locked="!canEdit(side)"
            :inert="lock(side)"
            :auto="!!current.cpAuto"
            :edit-why="strictText(strictWhy('pencil', side))"
            :stepper="!tracks(current.settings, 'stratSpendCp')"
            @bonus="bonusOf(side) ? undoBonusCp(side) : gainBonusCp(side)"
            @update:cp="v => setCp(side, v)"
            @spend="spendCpByHand(side)"
            @help="cpHelpOpen = true"
          />
          <!-- Inside the bank's slot, so it is under CpStratagems and wears the colour of the side
               shown there (provideSideScope), like every other dialog of that side. -->
          <OptionHelpModal
            v-if="cpHelpOpen"
            :title="labels.trackerCpHelpTitle"
            :text="labels[`trackerCpHelp${current.cpAuto ? '' : 'Manual'}${tracks(current.settings, 'stratSpendCp') ? '' : 'Hand'}`]"
            @close="cpHelpOpen = false"
          />
        </template>
      </CpStratagems>
    </section>

    <!-- What speaks in the phase the clock stands on for the side picked on the score cards
         (usePhaseRules.js; both sides at once until 2026-10-06). -->
    <section
      v-if="phaseTabOn && built.has('phase')"
      v-show="tab === 'phase'"
      data-tour="game-panel-phase"
      class="panel panel-framed"
      role="tabpanel"
    >
      <div
        ref="phaseSideEl"
        class="phase-side side-frame"
        :class="{ opp: !isYouSide(current.players[viewSide], viewSide) }"
      >
        <PhaseRules
          v-if="sideRuleCount"
          embedded
          :side="viewSide"
          @army="openArmyRule"
          @roster="openRoster"
          @missions="tab = 'missions'"
        />
        <SideEmptyState
          v-else
          :faction="viewFaction"
        >
          {{ phasesOn ? labels.trackerPhaseNoneSide : labels.trackerTurnNoneSide }}
        </SideEmptyState>
      </div>
    </section>

    <section
      v-if="built.has('log')"
      v-show="tab === 'log'"
      data-tour="game-panel-log"
      class="panel"
      role="tabpanel"
    >
      <GameLog :names="playerNames" />
    </section>

    <section
      v-if="built.has('stats')"
      v-show="tab === 'stats'"
      data-tour="game-panel-stats"
      class="panel panel-framed"
      role="tabpanel"
    >
      <ScoreBreakdown
        expanded
        :side="viewSide"
      />
    </section>

    <!-- The armies: each army's facts, the way to its units, its rules and stratagems. -->
    <section
      v-if="built.has('armies')"
      v-show="tab === 'armies'"
      data-tour="game-panel-armies"
      class="panel panel-framed"
      role="tabpanel"
    >
      <ArmiesPanel
        ref="armiesEl"
        :names="playerNames"
        :default-side="focusSide"
        :side="viewSide"
        @army="(k) => (armyKey = k)"
      >
        <!-- The army's attached list right under its card, in its frame (RosterTab.vue, each list
             built while idle and kept): one Army tab since 2026-10-10 (owner, from Misha's note) — the
             Roster tab was the same army a tab away, and its card's "Roster" button only switched to it. -->
        <RosterTab
          v-if="hasLists"
          ref="rosterEl"
          embedded
          :army-key="armyKey"
          :names="playerNames"
          :default-side="focusSide"
          :side="viewSide"
          :active="tab === 'armies'"
        />
      </ArmiesPanel>
    </section>

    <ScoringModal
      v-if="openPrimary >= 0 && primaryMission(openPrimary)"
      :title="primaryName(openPrimary)"
      :subtitle="`${labels.trackerPrimary} · ${dispositionName(current.players[openPrimary].disposition)}`"
      :vp="current.players[openPrimary].rounds[shownRound - 1].primary"
      :blocks="primaryBlocks(openPrimary)"
      :briefing="primaryMission(openPrimary).briefing"
      :count="(bi, ri) => primaryRowCount(openPrimary, shownRound - 1, bi, ri)"
      :readonly="!!pastWhy || !canEdit(openPrimary)"
      :view-only-note="pastWhy || (canEdit(openPrimary) ? null : labels.partyOtherSide)"
      :locked="b => primaryLocked(openPrimary, b)"
      :fix="primaryFix(openPrimary)"
      :opp="!isYouSide(current.players[openPrimary], openPrimary)"
      :note="labels.trackerPrimaryCaps.replace('{round}', PRIMARY_ROUND_CAP).replace('{game}', PRIMARY_GAME_CAP)"
      @set="(bi, ri, c) => setPrimaryRow(openPrimary, shownRound - 1, bi, ri, c, shownTurn)"
      @fix="openTurn(primaryFixTurn(openPrimary))"
      @close="openPrimary = -1"
    />


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
      :names="playerNames"
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
import ExpandTransition from '../ExpandTransition.vue'
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useMediaQuery } from '../../composables/useMediaQuery.js'
import NumberStepper from './NumberStepper.vue'
import CpBank from './CpBank.vue'
import TurnBar from './TurnBar.vue'
import GameTabs from './GameTabs.vue'
import SecondaryDeck from './SecondaryDeck.vue'
import PreBattle from './PreBattle.vue'
import ScoreBoard from './ScoreBoard.vue'
import ScoreBreakdown from './ScoreBreakdown.vue'
import CpStratagems from './CpStratagems.vue'
import OptionHelpModal from './OptionHelpModal.vue'
import GameLog from './GameLog.vue'
import ArmiesPanel from './ArmiesPanel.vue'
import RosterTab from './RosterTab.vue'
import RoundStrip from './RoundStrip.vue'
import ScoringModal from './ScoringModal.vue'
import GameEndModal from './GameEndModal.vue'
import TurnEndCheckModal from './TurnEndCheckModal.vue'
import ConfirmModal from '../ConfirmModal.vue'
import ActionMenu from '../ActionMenu.vue'
import EditSetupModal from './EditSetupModal.vue'
import BroadcastModal from './BroadcastModal.vue'
import PartyModal from './PartyModal.vue'
import SyncIndicator from './SyncIndicator.vue'
import { TOUR_ON, useTour, useTourShow } from '../../composables/useTour.js'
import PhasePickerModal from './PhasePickerModal.vue'
import PhaseRules from './PhaseRules.vue'
import SideEmptyState from './SideEmptyState.vue'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import RuleBody from '../RuleBody.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { getEventContent } from '../../data/eventCompanion.js'
import { phaseLabel, BATTLE_PHASES } from '../../composables/stratagemPhases.js'
import { usePhaseRules } from '../../composables/usePhaseRules.js'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { tracks } from '../../data/trackerOptions.js'
import { blockLocked, fixTurnOf, turnEndChecks } from '../../composables/missionTiming.js'
import { bonusIn } from '../../composables/cpLedger.js'
import { gameSideColorStyle } from '../../composables/sideColors.js'
import { provideModalScope } from '../../composables/modalScope.js'
import { useSwapFade } from '../../composables/useSwapFade.js'
import { hold, settle } from '../../composables/settleScroll.js'
import { motionMs } from '../../composables/motionToken.js'
import { instantly } from '../../composables/useRefNavigation.js'
import { useTracker, gameBegun, membersOf, sideLabel, isYouSide, ROUND_COUNT, PRIMARY_ROUND_CAP, PRIMARY_GAME_CAP, dispositionName, missionBySlug, scorableBlocks, cardBlocks } from '../../composables/useTracker.js'
import { useBroadcast } from '../../composables/useBroadcast.js'
import { useParty } from '../../composables/useParty.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, setRoundPrimary, setPrimaryRow, primaryRowCount, setCp, spendCpByHand, canGainBonus, gainBonusCp, canUndoBonus, undoBonusCp, stepPhase, goToPhase, canStepPhase, endTurn, canEndTurn, beginGame, battleWaitsFor, undoTurn, canUndoTurn, finishGame, strictWhy, strictUndoWhy } = useTracker()
// Strict rules' reason (strictRules.js), as the screen says it — '' when nothing is refused.
const strictText = (why) => (why ? labels.value[`trackerStrict_${why}`] : '')
const begun = computed(() => gameBegun(current.value))
// What the battle still waits for before it may begin (PreBattle's two choices), said on Start.
const BATTLE_WAIT = { fixed: 'pbWaitFixed', secondaries: 'pbWaitSecondaries', firstTurn: 'pbWaitFirstTurn' }
const battleWait = computed(() => (begun.value ? null : battleWaitsFor()))
// …and the step THIS phone can answer it at, where Start then takes (TurnBar `startGo`): the roll is
// the host's to mark in a shared game, the secondaries each side's own. Waiting on another phone
// leaves Start greyed with the reason, as before.
const waitStep = computed(() => {
  const w = battleWait.value
  const pls = current.value?.players || []
  if (w === 'firstTurn') return !partyActive.value || isHost.value ? 10 : null
  if (w === 'fixed') return pls.some((pl, i) => pl.secondaryMode === 'fixed' && !pl.secondary?.hand?.length && canEdit(i)) ? 6 : null
  if (w === 'secondaries') return pls.some((pl, i) => pl.secondaryPending && canEdit(i)) ? 6 : null
  return null
})
async function goToWaitStep() {
  const n = waitStep.value
  if (!n) return
  built.value.add('prebattle')
  const switching = tab.value !== 'prebattle'
  tab.value = 'prebattle'
  await nextTick()
  // A tab switch brings the strip back under the header as its panel comes in (bringTabsIntoView):
  // scrolled before that, the step was scrolled away again.
  if (switching) await new Promise((r) => setTimeout(r, motionMs('--motion-tab') + 50))
  const el = document.getElementById(`pb-step-${n}`)
  if (!el) return
  instantly(() => el.scrollIntoView({ block: 'center' }))
  // A pulse on the step, so the eye lands where the finger has to go next.
  el.animate?.([{ backgroundColor: 'color-mix(in srgb, var(--accent) 22%, transparent)' }, { backgroundColor: 'transparent' }], { duration: motionMs('--motion-flash') * 3, easing: 'ease-out' })
}
const secretOf = (pi) => !begun.value && !canEdit(pi) && current.value.players.some((p) => p.secondaryPending)
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
// A game not yet begun opens on its steps before the battle.
const tab = ref(gameBegun(current.value) ? 'missions' : 'prebattle')
// The tour (useTour.js): its chapter the first time this screen comes up, and a step that is
// about a tab opens it.
const { maybeStart: maybeStartTour, start: startTour } = useTour()
// What the tour's steps ask of this screen: has the battle begun, is the phase clock on, which
// tabs this game has.
// In a shared game: is this phone the one whose turn it is (`canTurn` — the turn buttons are its),
// is it the host. In doubles a side is a team of two armies.
// Read when the chapter starts, not when it is asked for: a shared game learns which sides the
// other phones hold from the server's first answer, a moment after this screen comes up.
const tourCtx = () => ({
  get begun() { return begun.value },
  get phases() { return tracks(current.value?.settings, 'trackPhases') },
  get cp() { return tracks(current.value?.settings, 'trackCP') },
  // Whether the CP tab lists stratagems to play (CpStratagems' `stratsPlayed`), or only counts CP.
  get stratPlay() { return tracks(current.value?.settings, 'trackStratPlay') },
  // …and whether a tap on one pays for it, or the balance carries − and + (`stratSpendCp`).
  get stratSpend() { return tracks(current.value?.settings, 'stratSpendCp') },
  get turnChecks() { return tracks(current.value?.settings, 'trackMissionAids') },
  get broadcast() { return broadcastOn.value || tracks(current.value?.settings, 'trackBroadcast') },
  get lists() { return !!listSide.value },
  get reserves() { return !!reservesSide.value },
  get tabs() { return tabs.value.map((t) => t.id) },
  get shared() { return !!partyActive.value },
  get host() { return !!isHost.value },
  get canTurn() { return canEdit(turnIndex.value) },
  get doubles() { return (current.value?.players || []).some((pl) => membersOf(pl).length > 1) },
  // A wide screen names every tab; a phone names only the open one.
  get wide() { return wideTabs.value },
})
// The panels built so far (see the template): the open one, then the rest one per idle moment.
const built = ref(new Set([tab.value]))
// The Phase tab exists while the game asked for the reminder; its count is the reminder itself,
// readable without opening it. Without the clock it is the Turn tab: the same list for each phase
// of the turn (owner, 2026-10-08).
const phaseTabOn = computed(() => tracks(current.value.settings, 'trackPhaseRules'))
const logOn = computed(() => tracks(current.value.settings, 'showLog'))
const statsOn = computed(() => tracks(current.value.settings, 'showStats'))
const { sides: phaseSides } = usePhaseRules()
const tabs = computed(() => [
  ...(begun.value ? [] : [{ id: 'prebattle', label: labels.value.trackerTabPreBattle, icon: 'wi wi-signpost' }]),
  { id: 'missions', label: labels.value.trackerTabMissions, icon: 'wi wi-missions' },
  // The phase right after the missions (owner, 2026-09-30): what speaks now is read during the turn.
  ...(phaseTabOn.value ? [{ id: 'phase', label: phasesOn.value ? labels.value.trackerTabPhase : labels.value.trackerTabTurn, icon: 'wi wi-phase', count: sideRuleCount.value }] : []),
  ...(cpOn.value ? [{ id: 'cp', label: labels.value.trackerCp, icon: 'wi wi-cp' }] : []),
  // The armies right after CP (owner, 2026-09-29): both are looked at during a turn, the log and
  // the stats after it.
  { id: 'armies', label: labels.value.trackerTabArmies, icon: 'wi wi-army' },
  // The log and the stats, each this phone's choice (`showLog`, `showStats`; one row until 2026-10-25).
  ...(logOn.value ? [{ id: 'log', label: labels.value.trackerTabLog, icon: 'wi wi-log' }] : []),
  ...(statsOn.value ? [{ id: 'stats', label: labels.value.trackerTabStats, icon: 'wi wi-stats' }] : []),
])
watch(logOn, (on) => { if (!on && tab.value === 'log') tab.value = 'missions' })
watch(statsOn, (on) => { if (!on && tab.value === 'stats') tab.value = 'missions' })
watch(phaseTabOn, (on) => { if (!on && tab.value === 'phase') tab.value = 'missions' })
watch(cpOn, (on) => { if (!on && tab.value === 'cp') tab.value = 'missions' })
const hasLists = computed(() => (current.value?.players || []).some((pl) => membersOf(pl).some((m) => m.roster)))
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
// The Turn tab's rule lines into the Army tab: that army, with the rule unfolded.
const armiesEl = ref(null)
async function openArmyRule(at) {
  pickedSide.value = at.pi
  tab.value = 'armies'
  await nextTick()
  armiesEl.value?.reveal(at)
}
// The reserves before the battle: the first army with a list this phone may mark, on the Roster
// tab, where each unit's row has its status (UnitStatusButton).
const listSide = computed(() => {
  for (const [pi, pl] of (current.value?.players || []).entries()) {
    if (!canEdit(pi)) continue
    const mi = membersOf(pl).findIndex((m) => m.roster)
    if (mi >= 0) return { pi, mi: pl.members ? mi : undefined }
  }
  return null
})
// Reserves are marked with the units' status, so a game not keeping it ("Where each unit is" off —
// the Quick preset) offers no button for them.
const reservesSide = computed(() => (tracks(current.value?.settings, 'trackUnitStates') ? listSide.value : null))
// …and, the first time, the tour of marking them: where, with what, and what then.
function openReserves() {
  if (!reservesSide.value) return
  openRoster(reservesSide.value)
  const lists = (current.value?.players || []).filter((pl) => membersOf(pl).some((m) => m.roster)).length
  maybeStartTour('reserves', { otherList: lists > 1, shared: partyActive.value })
}
// A list: the Roster tab on that army. One unit of it: its card over the tab on screen.
const rosterEl = ref(null)
// An army's list (the Army tab, under its card) or one of its units' cards over the tab on screen.
async function openRoster({ pi, mi, uid }) {
  if (uid == null) { pickedSide.value = pi; tab.value = 'armies' }
  built.value.add('armies')
  await nextTick()
  if (uid == null) armiesEl.value?.show({ pi, mi })
  else rosterEl.value?.openUnit({ pi, mi, uid })
}
const armyKey = ref(null)
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
// A short panel still reaches the foot of the screen (owner, 2026-10-06): the screen is a column at
// least as tall as the room the page leaves it, the open panel takes the slack, and its foot lands
// just above the turn bar — with no scroll. That room is the window less
// everything above the screen (the bars, the update notice) and below it (the page's reserve for
// the pinned bars): measured, since both vary, and neither depends on this screen's own height.
const rootEl = ref(null)
const fillPx = ref(0)
// What the page puts under this screen, up to the main column: each wrapper's bottom padding and
// border, this screen's and its wrappers' bottom margins, and anything after them. Read from the
// styles, not from the document's height — the layout keeps the document at least a window tall,
// so "below" taken from it counted the empty room this is meant to fill.
function roomBelow(el) {
  let below = 0
  for (let n = el; n && !n.classList.contains('main-content'); n = n.parentElement) {
    const p = n.parentElement
    if (!p) break
    below += parseFloat(getComputedStyle(n).marginBottom) || 0
    for (let sib = n.nextElementSibling; sib; sib = sib.nextElementSibling) {
      if (getComputedStyle(sib).position === 'fixed') continue
      below += sib.offsetHeight
    }
    const cs = getComputedStyle(p)
    below += (parseFloat(cs.paddingBottom) || 0) + (parseFloat(cs.borderBottomWidth) || 0)
  }
  return below
}
function fitHeight() {
  const el = rootEl.value
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY
  // No scroll: the screen ends where the page's own reserve under it still fits in the window.
  const noScroll = window.innerHeight - top - roomBelow(el)
  // …and the tools row sits a step above the pinned turn bar, not under it.
  const bar = el.querySelector('.tf-sticky')
  const barTop = bar ? bar.getBoundingClientRect().top : window.innerHeight
  const aboveBar = barTop - 12 - (top - window.scrollY)
  fillPx.value = Math.max(0, Math.floor(Math.min(noScroll, aboveBar)))
}
onMounted(() => {
  fitHeight()
  document.fonts?.ready.then(fitHeight)
  window.addEventListener('resize', fitHeight)
  // Another tab or side is another panel: re-measure. Set up here, not at the top level — the side
  // reads the turn, which is declared further down this setup.
  watch([tab, viewSide], () => nextTick(fitHeight))
})
onBeforeUnmount(() => window.removeEventListener('resize', fitHeight))

// Switching panels from further down the page: the new panel starts right under the tab strip,
// the strip at the top of the screen — not wherever a shorter panel lets the browser clamp the
// scroll (2026-09-29: first a jump, then a screen-tall blank to stop it). From above, nothing moves.
// The strip is sticky (owner, 2026-10-06), so "further down" is "the strip is stuck": its own top
// then equals its sticky `top`, and the new panel is brought up to sit just under it. The move
// glides with the panel's own entrance (owner, 2026-10-08: the screen leapt), and a shorter panel
// does not let the browser clamp the page in one frame either (settleScroll.js).
const tabsEl = ref(null)
watch(tab, hold) // `pre`: before the old panel is hidden
watch(tab, () => {
  const el = tabsEl.value?.$el
  settle(motionMs('--motion-tab'), el ? tabsOffset(el) : 0)
}, { flush: 'post' })
function tabsOffset(el) {
  const cs = getComputedStyle(el)
  const stuckAt = parseFloat(cs.top) || 0
  if (el.getBoundingClientRect().top > stuckAt + 1) return 0
  const panel = [...el.parentElement.children].find((c) => c.classList.contains('panel') && c.style.display !== 'none')
  if (!panel) return 0
  const want = stuckAt + el.offsetHeight + (parseFloat(cs.marginBottom) || 0)
  return panel.getBoundingClientRect().top - want
}
// The turn on screen: the live one, or one already played opened for correction (`view`,
// { round, turn }) — from the round steps, or from a scoring dialog whose condition is scored in
// another turn (missionTiming.lockedTurn). Local to this phone — what one player is correcting is
// not where the game is.
const view = ref(null)
const shownRound = computed(() => view.value?.round ?? current.value.currentRound)
const shownTurn = computed(() => view.value?.turn ?? turnIndex.value)
function openTurn(turn, round = shownRound.value) {
  view.value = round === current.value.currentRound && turn === turnIndex.value ? null : { round, turn }
}
// Strict rules: the turn on screen is over and cannot be corrected (strictRules.js).
const pastWhy = computed(() => strictText(strictWhy('round', missionSide.value, shownRound.value, view.value ? shownTurn.value : null)))

// Whose missions come first: this phone's own side in a shared game, otherwise the side on
// turn. The other is folded until asked for.
// Whose turn it is — players[0] is always the first-turn player, so the turn IS a player index
// (useTracker). Declared before everything below that reads it during setup — the tab memory
// asks for the tabs, whose counts ask for the side on screen — or it is read before it exists.
const turnIndex = computed(() => (current.value.currentTurn === 1 ? 1 : 0))
const focusSide = computed(() => {
  const p = current.value.party
  return p && !p.revoked && !p.ended && (p.side === 0 || p.side === 1) ? p.side : turnIndex.value
})

// A new turn starts on the missions, on the live round, on the focus side's tab: the first
// thing a turn does is draw and score. "Start game" begins the first turn without changing it, so
// it counts too: pressed with the other side's tab picked, the side on turn's deck — which offers
// the draw — stayed off screen (Misha, 2026-10-10).
watch([() => current.value.currentRound, () => current.value.currentTurn, () => gameBegun(current.value)], () => {
  tab.value = 'missions'
  view.value = null
  pickedSide.value = null
})
// The side the side-aware panels show: picked on the score cards (ScoreBoard `selected`), else
// the focus side; a new turn drops the pick.
const pickedSide = ref(null)
const viewSide = computed(() => pickedSide.value ?? focusSide.value)
// The tabs whose panel is one side's, framed in the picked side's colour. The Log tells both sides
// in one timeline, so there the cards are only the score.
const framedTab = computed(() => ['missions', 'phase', 'cp', 'armies', 'stats'].includes(tab.value))
// The tour's steps open a tab and pick a side for what they tell (useTourShow).
useTourShow('tab', (t) => { if (tabs.value.some((x) => x.id === t)) { built.value.add(t); tab.value = t } })
// A side by who it is to this phone ('you' / 'opp'), not by index: players[0] is whoever went
// first. null hands the panels back to the side they follow on their own.
useTourShow('side', (who) => {
  pickedSide.value = who == null ? null : current.value.players.findIndex((pl, i) => isYouSide(pl, i) === (who === 'you'))
})
// The picked side's army, for an empty panel's emblem (the first member's in doubles).
const viewFaction = computed(() => factionIndexBySlug(membersOf(current.value.players[viewSide.value])[0]?.factionSlug) || null)
// The Phase tab's count is the picked side's, as its list is.
const sideRuleCount = computed(() => phaseSides.value.find((s) => s.pi === viewSide.value)?.count || 0)

// The open tab survives leaving the game screen — a look at a datasheet, the rules, the roster —
// and coming back (owner's call, 2026-09-27). Kept on this device with the game and the turn it
// was open in: back in the same turn, the same tab; the turn moved meanwhile (another phone ended
// it), the missions, as at the start of any turn. A tab this game no longer offers (CP or the
// phase reminder switched off) falls back to the missions too. The side picked on the score cards
// comes back with it: "Units" on the opponent's army led back to this phone's own (Misha, 2026-10-10).
const TAB_KEY = 'wh11ed-tracker-tab'
const clockKey = () => `${current.value.id}|${current.value.currentRound}|${current.value.currentTurn === 1 ? 1 : 0}`
try {
  const saved = JSON.parse(getItem(TAB_KEY) || 'null')
  if (saved?.at === clockKey() && tabs.value.some((t) => t.id === saved.tab)) {
    tab.value = saved.tab
    if (saved.side === 0 || saved.side === 1) pickedSide.value = saved.side
  }
} catch { /* an unreadable entry is just no memory */ }
watch([tab, clockKey, pickedSide], () => setItem(TAB_KEY, JSON.stringify({ at: clockKey(), tab: tab.value, side: pickedSide.value })))

const cpHelpOpen = ref(false) // the CP tab's "?"
const openPrimary = ref(-1)   // index of the player whose primary scoring modal is open
const endModalOpen = ref(false)
const editSetupOpen = ref(false)
const phasePickerOpen = ref(false)
const broadcastOpen = ref(false)
const partyOpen = ref(false)
const gameMenuOpen = ref(false)

// The shared game: which side this phone may edit, and whether it is the host. With no party,
// canEdit is true for both and nothing here changes. `lock` is canEdit as an `inert` value.
const { active: partyActive, isHost, canEdit, party: partyHandle } = useParty()
const partyCut = computed(() => !!partyHandle.value?.ended || !!partyHandle.value?.revoked)
// The tour: this screen's chapter on its first showing (what the turn bar says depends on whether
// the battle has begun), the turn's own the moment it does, and a shared game's.
// In a shared game the chapters wait for the server's first answer (which sides the other phones
// hold, `party.held`): before it every side reads as this phone's, and a guest was told to press a
// "Start game" that was grey on its screen. Six seconds at most — offline it never comes.
function startScreenTour() {
  maybeStartTour('game', tourCtx())
  if (partyActive.value) maybeStartTour('shared', tourCtx())
}
const partyKnown = () => !partyActive.value || partyHandle.value?.held !== undefined
onMounted(() => {
  if (partyKnown()) return startScreenTour()
  const stop = watch(partyKnown, (ok) => { if (ok) { stop(); clearTimeout(late); startScreenTour() } })
  const late = setTimeout(() => { stop(); startScreenTour() }, 6000)
})
watch(begun, (on, was) => { if (on && was === false) maybeStartTour('turn', tourCtx()) })
// A game shared after the screen came up (from its own menu) gets the shared game's chapter then.
watch(() => !!partyActive.value, (on) => { if (on) maybeStartTour('shared', tourCtx()) })
const lock = (pi) => (canEdit(pi) ? undefined : true)

// Live broadcast: arm the push watcher on entering the game screen, so a reload mid-stream
// resumes pushing without reopening the dialog. `enabled` also lights the toolbar button.
const { enabled: broadcastOn, init: initBroadcast } = useBroadcast()
initBroadcast()

// Whose missions are open: the focus side, until a tab says otherwise; a new turn goes back to it.
// The side on the Missions tab is the side picked on the score cards (viewSide).
const missionSide = viewSide
// Another side's missions fade in under the standing tabs (useSwapFade).
const msideEl = ref(null)
// One switch for every tab: the side's missions, or on the Phase tab that side's rules, fade in.
useSwapFade(missionSide, () => (tab.value === 'phase' ? phaseSideEl.value : msideEl.value?.querySelector(':scope > .player')))
const phaseSideEl = ref(null)

// Which side a player is — by who they are, never by position, since first turn reorders them.
// The clock prints this and nothing else: it is read at a glance in the middle of a turn, and a
// nickname does not answer the question it is there to answer. "You" does, in one word.
function playerSide(i) {
  return sideLabel(current.value.players[i], i, labels.value)
}

// Their own name if they gave one, otherwise the side. For the places with room for a name and a
// reason to print one: the player cards, and the phase picker's two turn headings.
// One array for the six panels that print the players' names: a `.map()` in the template is a new
// array on every render, and each panel took it for a change and re-rendered with the screen.
const playerNames = computed(() => current.value.players.map((_, i) => playerName(i)))
function playerName(i) {
  return current.value.players[i].name || playerSide(i)
}

// A phrase about a player, with their name in it. A side with no name of its own is printed as
// "You" / "Opponent" (sideLabel), and "Завершить ход Вы" is not Russian — so your own unnamed side
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
  // Nobody has the turn before the roll for it (PreBattle): the order on screen is provisional.
  if (current.value.firstTurnPending) return [...parts, { text: l.pbTitle.toLowerCase() }]
  // Your own turn is "your turn" whatever you named yourself (owner, 2026-10-06): the name is for
  // telling the OTHER side apart. "Your" is this phone's side — in a shared game `isYou` is the
  // device's seat, not the host's — and in doubles the side is the team, which plays its turn together.
  if (isYouSide(pl, t)) return [...parts, { text: l.trackerTurnNowYou }]
  const [before, after] = l.trackerTurnNow.split('{name}')
  return [...parts, { text: before }, { text: playerName(t), strong: true }, { text: after }].filter(p => p.text)
})
const endTurnLabel = computed(() => aboutPlayer('trackerEndTurn', turnIndex.value))

// Undo turn, confirmed: where the game goes back to, and what comes back with it.
const undoConfirm = ref(false)
const undoMessage = computed(() => {
  const back = turnIndex.value === 1 ? 0 : 1
  const round = current.value.currentRound - (turnIndex.value === 1 ? 0 : 1)
  const text = aboutPlayer('trackerUndoConfirm', back).replace('{round}', round)
  // The turn being undone is held by another phone: it goes back too, so its player is named.
  return canEdit(turnIndex.value) ? text : `${text} ${aboutPlayer('trackerUndoOtherPhone', turnIndex.value)}`
})

// The End button's tooltip: the whole phrase with the name — or, on the phone that may not end
// this turn (a shared game), why the button is grey. There is no line for it under the bar any
// more (owner's call, 2026-09-27); the headline says whose turn it is.
const endTitle = computed(() => {
  const t = turnIndex.value
  return canEdit(t) ? endTurnLabel.value : labels.value.trackerTurnLocked.replace('{name}', playerName(t))
})
// The turn before this one is always the other player's, and theirs to take back. The turn being
// undone is the side on turn's, which may already have drawn its secondaries on its own phone —
// requiring both sides made undo impossible in a two-phone game (acceptance, 2026-10-18), so the
// confirm names that player instead (undoMessage).
const undoTitle = computed(() => {
  const other = 1 - turnIndex.value
  if (!canEdit(other)) return labels.value.trackerUndoLocked.replace('{name}', playerName(other))
  return strictText(strictWhy('clock')) || labels.value.trackerUndoTurn
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
// of Battle condition — missionTiming.turnEndChecks). Nothing to check, nothing shown. The last
// turn goes on to how the game ended (GameEndModal).
// The cards the side on turn marked to discard leave as the turn ends (useTracker's endTurn), so
// they are not in the check (turnEndChecks' `discarding`): one card would pay twice — VP and CP.
const turnChecks = computed(() => {
  const g = current.value
  const pi = g?.currentTurn === 1 ? 1 : 0
  return turnEndChecks(
    g,
    (slug, role, round) => scorableBlocks(slug, role, round, locale.value),
    (slug, role) => missionBySlug(slug, role),
    (g?.players?.[pi]?.secondary?.eotMarked || []).map((slug) => ({ pi, slug })),
  )
})
const pendingEnd = ref(null) // { final }
function requestEndTurn() {
  const end = { final: !canEndTurn() }
  // The check before the turn passes, unless the game switched the mission help off (`trackMissionAids`).
  if (turnChecks.value.length && tracks(current.value.settings, 'trackMissionAids')) pendingEnd.value = end
  else finishTurn(end)
}
function confirmEnd() {
  const end = pendingEnd.value
  pendingEnd.value = null
  finishTurn(end)
}
function finishTurn({ final }) {
  if (!final) endTurn()
  if (final) endModalOpen.value = true
}

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
// The primary's whole card for the round on screen; the blocks of other rounds come greyed.
function primaryBlocks(i) {
  return cardBlocks(current.value.players[i].primarySlug, null, shownRound.value, locale.value)
}
// A primary condition scored in another turn than the one on screen (missionTiming.js), by the EN
// block: the turn it is scored in, said.
function primaryLocked(i, b) {
  const t = blockLocked(current.value, i, shownRound.value, shownTurn.value, missionBySlug(current.value.players[i].primarySlug)?.blocks[b.bi])
  return t == null ? null : labels.value.trackerScoredInTurn.replace('{name}', playerName(t))
}
// The turn its locked conditions are put right in — one that has begun, and that strict rules
// let be corrected — and the dialog's button for it.
function primaryFixTurn(i) {
  const en = missionBySlug(current.value.players[i].primarySlug)
  const t = fixTurnOf(current.value, i, shownRound.value, shownTurn.value, primaryBlocks(i), (bi) => en?.blocks[bi])
  return t == null || strictWhy('round', i, shownRound.value, t) ? null : t
}
function primaryFix(i) {
  const t = primaryFixTurn(i)
  return t == null ? '' : labels.value.trackerOpenTurn.replace('{name}', playerName(t))
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
  margin: 0 0 0.5rem;
}
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
  font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; line-height: 1.1; color: var(--side);
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
/* A side another phone plays: readable, not touchable. */
.player-locked { opacity: 0.72; }
.sec-secret { margin: 0.7rem 0 0; font-size: 0.82rem; color: var(--text-dim); }
.plocked {
  margin: 0.1rem 0 0.4rem;
  font-size: 0.72rem;
  color: var(--text-muted);
}

/* The headline over the score: round and turn, read at a glance from across the table. */
/* Inline, not flex: the headline's spans carry their own spaces ("Andronovmy’s turn" has none
   between the name and the rest), and flex items would trim them and space by the gap instead. */
/* One line: a long name is cut with "…" (owner, 2026-09-29) instead of pushing the board down. */
/* The round line and the game's "⋯": the button no taller than the line needs, so the row costs
   no more than the line did; the rounds sit close under it (owner, 2026-10-06). */
.turn-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.3rem;
}
.turn-row .am { margin-left: auto; }
.game-menu-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.6rem;
  font-size: 1.05rem;
  line-height: 1;
}
.gm-row { display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; }
.gm-live {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--accent-ink);
}
.turn-now {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  font-size: 1.05rem;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.turn-head { display: flex; align-items: center; gap: 0.5rem; min-width: 0; }
.turn-dot { flex-shrink: 0; width: 8px; height: 8px; margin-left: 0.4rem; border-radius: 50%; background: var(--accent); }
/* The indicator's dot where the plain one stands, off the page's edge (owner, 2026-10-08): its
   button is a tap target wider than the dot. */
.turn-head > .si-wrap { margin-inline: 0.05rem -0.35rem; }
.tn-strong { font-weight: 700; color: var(--text-primary); }
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
.tf-sticky-inner { max-width: 860px; margin: 0 auto; padding: 0.25rem 2rem; }
@media (max-width: 900px) {
  .tf-sticky { bottom: calc(52px + var(--safe-bottom, 0px)); padding-bottom: 0; }
  .tf-sticky-inner { padding: 0.25rem calc(1rem + var(--safe-right)) 0.25rem calc(1rem + var(--safe-left)); }
}
@media (max-width: 480px) {
  .tf-sticky-inner { padding: 0.25rem calc(0.5rem + var(--safe-right)) 0.25rem calc(0.5rem + var(--safe-left)); }
}
/* The round line is not the turn bar: the headline takes what the "⋯" leaves. */
.turn-row.turn-line { gap: 0.4rem; }
.turn-line .turn-head { flex: 1 1 auto; }

/* A column, so the open panel can take the slack down to the tools row (fitHeight). */
.round-tracker { display: flex; flex-direction: column; }
/* The floating back-to-top (MobileUtilityBar) hangs over the turn bar; without room for it under
   the last panel it sat on the last unit's status button at the page's end (2026-10-17). */
@media (max-width: 900px) { .round-tracker { padding-bottom: var(--mobile-bar-h, 0px); } }
.round-tracker > .panel { flex: 1 0 auto; display: flex; flex-direction: column; }
.round-tracker > .panel > .side-frame { flex: 1 0 auto; }
/* A framed panel hangs from the tab strip: its frame (CpStratagems' .cps.framed) starts where the
   strip's line is, so the open tab and what it shows read as one surface. */
.panel-framed { margin-top: -0.7rem; }
.phase-side { --side: var(--side-you); display: flex; flex-direction: column; }
.phase-side.opp { --side: var(--side-opponent); }
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



</style>
