<template>
  <div class="round-tracker">
    <ScoreBoard />

    <div class="round-bar">
      <button
        class="rb-nav"
        :disabled="current.currentRound <= 1"
        :aria-label="labels.ariaPrevRound"
        @click="goToRound(current.currentRound - 1)"
      >
        ‹
      </button>
      <div class="rb-rounds">
        <button
          v-for="n in ROUND_COUNT"
          :key="n"
          class="rb-round"
          :class="{ on: current.currentRound === n }"
          :aria-label="`${labels.trackerRound} ${n}`"
          :aria-current="current.currentRound === n ? 'step' : undefined"
          @click="goToRound(n)"
        >
          {{ n }}
        </button>
      </div>
      <button
        class="rb-nav"
        :disabled="current.currentRound >= ROUND_COUNT"
        :aria-label="labels.ariaNextRound"
        @click="goToRound(current.currentRound + 1)"
      >
        ›
      </button>
      <!-- A shared game's sync state rides on the round bar — a row of its own would cost the
           vertical space the phone does not have. Renders nothing for a game that is not shared. -->
      <SyncIndicator />
    </div>

    <!-- The clock, one row under the rounds: whose turn and which phase. Only for a game that
         asked for it; a game without it looks exactly as it did. -->
    <div
      v-if="phasesOn"
      class="phase-bar"
    >
      <button
        class="pb-nav"
        :disabled="!canStepPhase(-1)"
        :aria-label="labels.ariaPrevPhase"
        @click="stepPhase(-1)"
      >
        ‹
      </button>
      <button
        class="pb-now"
        @click="phasePickerOpen = true"
      >
        <span class="pb-who">{{ playerSide(turnIndex) }}</span>
        <span class="pb-phase">{{ phaseLabel(current.currentPhase || 'command', labels) }}</span>
      </button>
      <button
        class="pb-nav"
        :disabled="!canStepPhase(1)"
        :aria-label="labels.ariaNextPhase"
        @click="stepPhase(1)"
      >
        ›
      </button>
    </div>

    <!-- …and, under it, what has something to say in the slot the clock is standing on. -->
    <PhaseRules v-if="phasesOn && tracks(current.settings, 'trackPhaseRules')" />

    <PhasePickerModal
      v-if="phasePickerOpen"
      :names="current.players.map((_, i) => playerName(i))"
      :turn="turnIndex"
      :phase="current.currentPhase || 'command'"
      @pick="onPickPhase"
      @close="phasePickerOpen = false"
    />

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

    <div class="players">
      <!-- In a shared game a side another phone plays is shown as it is, greyed, with the reason
           under its title — never hidden: what the opponent has scored is exactly what a player
           wants to see. The lock is on what SCORES — the primary, the deck, the CP stepper, the
           army tracker's controls (`inert`, see lock()) — and not on the card, because the card
           is also where the opponent's army is READ: the setup facts, the way to their list, the
           army rule's text and state. A guest who could not open the other side's Waaagh! rule
           was the first complaint about the shared game. The sync layer snaps back anything
           that gets past the lock. `inert` is a presence attribute — a rendered "false" would
           still be inert — hence `undefined` rather than false. -->
      <div
        v-for="(pl, i) in current.players"
        :key="i"
        class="player"
        :class="{ 'player-locked': !canEdit(i) }"
      >
        <h3 class="ptitle">
          {{ playerName(i) }}
        </h3>
        <!-- The host's line also says how to take the side back: the seat is the lock. -->
        <p
          v-if="!canEdit(i)"
          class="plocked"
        >
          {{ isHost ? labels.partyOtherSideHost : labels.partyOtherSide }}
        </p>
        <!-- Disposition and detachments are setup facts, consulted rarely mid-game — folded by
             default so the card opens on what IS the game: the missions and the score. Native
             <details>, the same accordion the twist reminder above uses. -->
        <details
          v-if="hasArmyInfo(pl)"
          class="pinfo"
        >
          <summary>{{ labels.trackerArmyDetails }}</summary>
          <p
            v-if="dispositionName(pl.disposition)"
            class="pmeta"
          >
            {{ labels.trackerDisposition }}: {{ dispositionName(pl.disposition) }}
          </p>
          <p
            v-if="!isDoubles && pl.detachments && pl.detachments.length"
            class="pdet"
          >
            {{ pl.detachments.join(' · ') }}
          </p>
          <!-- Doubles: the army identity lives on the members — one line each. -->
          <template v-if="isDoubles">
            <p
              v-for="(m, mi) in pl.members"
              :key="mi"
              class="pdet"
            >
              {{ memberLine(m, mi) }}
            </p>
          </template>
        </details>
        <!-- Primary mission — tap to open the scoring modal -->
        <div class="sec-title-row">
          {{ labels.trackerPrimary }}
        </div>
        <button
          v-if="primaryMission(i)"
          class="card-open"
          :inert="lock(i)"
          @click="openPrimary = i"
        >
          <span class="card-name">{{ primaryName(i) }}</span>
          <span class="card-vp">{{ pl.rounds[current.currentRound - 1].primary }} / {{ PRIMARY_ROUND_CAP }} VP</span>
        </button>
        <!-- The fallback, and the only one: a disposition the app couldn't resolve leaves no card
             to tick. The missions themselves are not optional — see trackerOptions.js. -->
        <div
          v-else
          class="score-row"
          :inert="lock(i)"
        >
          <NumberStepper
            :model-value="pl.rounds[current.currentRound - 1].primary"
            :min="0"
            :max="PRIMARY_ROUND_CAP"
            @update:model-value="v => setRoundPrimary(i, current.currentRound - 1, v)"
          />
          <span class="sr-sub">/ {{ PRIMARY_ROUND_CAP }} {{ labels.trackerThisRound }}</span>
        </div>

        <SecondaryDeck
          :pi="i"
          :inert="lock(i)"
        />

        <!-- CP and this player's army sit UNDER the secondaries: both are consulted between
             scoring passes, not during one, and above they pushed the round's actual scoring
             down. The row survives either half on its own — CP is a setting, and the army slot
             needs a faction the oldest saved games may not carry.
             One army button per player, never both: with a list attached the list is strictly
             the better answer (only this army's units, with the game's live modifiers), and
             without one the faction's datasheets are the next best thing. It reads the player
             it belongs to, so the opponent's army is one tap away from their own card. -->
        <div
          v-if="cpOn || armyLinks(pl, i).length"
          class="score-row cp-row"
        >
          <template v-if="cpOn">
            <span class="sr-label">{{ labels.trackerCp }}</span>
            <NumberStepper
              :model-value="pl.cp"
              :min="0"
              :inert="lock(i)"
              @update:model-value="v => setCp(i, v)"
            />
          </template>
          <RouterLink
            v-for="l in armyLinks(pl, i)"
            :key="l.to"
            class="proster"
            :to="l.to"
            :title="l.label"
          >
            <i :class="`bi ${l.icon}`" />
            <span class="proster-label">{{ l.label }}</span>
          </RouterLink>
        </div>

        <!-- Army-rule tracker (Pain tokens, etc.) — at the bottom of the card, under the
             secondaries and the CP row. Opt-in per player (settings.trackArmyYou /
             trackArmyOpp, default on) and renders only for factions with a spec. Doubles:
             one SHARED card for a unified force of one faction (the companion: one pool per
             force), else one card per member — see armyCards(). -->
        <ArmyTrackerCard
          v-for="c in armyCards(pl)"
          :key="c.mi ?? 'side'"
          :pi="i"
          :mi="c.mi"
          :readonly="!canEdit(i)"
        />
      </div>
    </div>

    <ScoringModal
      v-if="openPrimary >= 0 && primaryMission(openPrimary)"
      :title="primaryName(openPrimary)"
      :subtitle="`${labels.trackerPrimary} · ${dispositionName(current.players[openPrimary].disposition)}`"
      :vp="current.players[openPrimary].rounds[current.currentRound - 1].primary"
      :blocks="primaryBlocks(openPrimary)"
      :briefing="primaryMission(openPrimary).briefing"
      :count="(bi, ri) => primaryRowCount(openPrimary, current.currentRound - 1, bi, ri)"
      :note="`${labels.trackerPrimary}: ${labels.trackerThisRound} ≤ ${PRIMARY_ROUND_CAP} · ${PRIMARY_GAME_CAP}/${labels.trackerTotal}`"
      @set="(bi, ri, c) => setPrimaryRow(openPrimary, current.currentRound - 1, bi, ri, c)"
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
        <button
          class="btn-ghost"
          @click="endModalOpen = true"
        >
          {{ labels.trackerFinish }}
        </button>
      </div>
      <button
        v-if="current.currentRound < ROUND_COUNT"
        class="btn-primary btn-next"
        :aria-label="labels.trackerNext"
        :title="labels.trackerNext"
        @click="goToRound(current.currentRound + 1)"
      >
        <span class="next-full">{{ labels.trackerNext }}</span>
        <i
          class="bi bi-chevron-right next-icon"
          aria-hidden="true"
        />
      </button>
    </div>

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
import { ref, computed } from 'vue'
import NumberStepper from './NumberStepper.vue'
import SecondaryDeck from './SecondaryDeck.vue'
import ArmyTrackerCard from './ArmyTrackerCard.vue'
import ScoreBoard from './ScoreBoard.vue'
import ScoringModal from './ScoringModal.vue'
import GameEndModal from './GameEndModal.vue'
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
import { phaseLabel } from '../../composables/stratagemPhases.js'
import { tracks } from '../../data/trackerOptions.js'
import { useTracker, membersOf, ROUND_COUNT, PRIMARY_ROUND_CAP, PRIMARY_GAME_CAP, dispositionName, missionBySlug, scorableBlocks } from '../../composables/useTracker.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import { useBroadcast } from '../../composables/useBroadcast.js'
import { useParty } from '../../composables/useParty.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, setRoundPrimary, setPrimaryRow, primaryRowCount, setCp, goToRound, stepPhase, goToPhase, canStepPhase, finishGame } = useTracker()

// Read through `tracks` so a game saved before the option existed arrives with its default
// rather than undefined.
const cpOn = computed(() => tracks(current.value.settings, 'trackCP'))
const phasesOn = computed(() => tracks(current.value.settings, 'trackPhases'))

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
  const pl = current.value.players[i]
  return (pl.isYou ?? i === 0) ? labels.value.trackerYou : labels.value.trackerOpponent
}

// Their own name if they gave one, otherwise the side. For the places with room for a name and a
// reason to print one: the player cards, and the phase picker's two turn headings.
function playerName(i) {
  return current.value.players[i].name || playerSide(i)
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

// The folded army-details block has to have something inside — the oldest saved games carry
// neither a disposition nor detachments, and an empty accordion is a broken-looking row.
function hasArmyInfo(pl) {
  return !!dispositionName(pl.disposition) || !!pl.detachments?.length || isDoubles.value
}

function memberName(m, mi) {
  return m.name || (mi === 0 ? labels.value.trackerPlayer1 : labels.value.trackerPlayer2)
}

// One line per doubles member under the side heading: who fields what. The light factionsIndex
// supplies the name — never the heavy trackerFactions dataset (kept off in-game screens).
function memberLine(m, mi) {
  const parts = [factionIndexBySlug(m.factionSlug)?.name, m.detachments?.join(' · ')].filter(Boolean)
  return `${memberName(m, mi)} — ${parts.join(' · ')}`
}

// The army buttons of the CP row: one per army. Singles keeps its single list-or-datasheets
// button with the usual labels; doubles labels each button with the member it belongs to.
function armyLinks(pl, i) {
  const out = []
  membersOf(pl).forEach((m, mi) => {
    if (m.roster) {
      out.push({
        to: isDoubles.value ? `/tracker/game/roster/${i}/${mi}` : `/tracker/game/roster/${i}`,
        icon: 'bi-card-list',
        label: isDoubles.value ? memberName(m, mi) : labels.value.trackerRosterOpen,
      })
    } else if (m.factionSlug) {
      out.push({
        to: `/factions/${m.factionSlug}/datasheets`,
        icon: 'bi-people-fill',
        label: isDoubles.value ? memberName(m, mi) : labels.value.factionDatasheets,
      })
    }
  })
  return out
}

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
// Scorable primary blocks for the current round (round-gated by block heading).
function primaryBlocks(i) {
  return scorableBlocks(current.value.players[i].primarySlug, null, current.value.currentRound, locale.value)
}
function onEndBattle(reason) {
  endModalOpen.value = false
  finishGame(reason)
}
</script>

<style scoped>
.round-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0 1.2rem;
}
.rb-rounds { display: flex; gap: 0.3rem; }
.rb-round {
  width: 38px; height: 38px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  border-radius: 50%;
  font-weight: 700;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.rb-round.on { background: var(--accent); color: #fff; border-color: var(--accent); }
/* The phase row sits under the rounds and reads as secondary to them: the round is the game's
   spine, the phase is where inside it you are. */
.phase-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin: -0.4rem 0 0.9rem;
}
.pb-nav {
  min-width: 32px;
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-dim);
  font-size: 1rem;
  cursor: pointer;
}
.pb-nav:disabled { opacity: 0.35; cursor: default; }
.pb-now {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  padding: 0.35rem 0.9rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  font-family: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}
.pb-now:hover { border-color: var(--accent); }
.pb-who { color: var(--text-muted); }
.pb-phase { color: var(--text-primary); font-weight: 600; }
.rb-nav {
  width: 34px; height: 34px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 1.2rem;
  cursor: pointer;
}
.rb-nav:disabled { opacity: 0.35; cursor: not-allowed; }
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
/* Built to NumberStepper's `.step-btn` recipe — it shares a row with one, and anything else
   next to those buttons read as a different kind of thing. One class for both of the row's army
   links (the attached list, or the faction's datasheets) so the slot looks the same either way.
   It says just "Roster": the list's own name is on the page it opens, and a long one used to
   squeeze the row. */
.proster {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.35rem;
  height: 40px; padding: 0 0.75rem;
  border: 1px solid var(--border); background: var(--bg-card);
  color: var(--text-primary); text-decoration: none; font-size: 0.85rem;
  transition: background 0.15s, border-color 0.15s;
}
/* In doubles the label is a name the PLAYER typed, so the button has no width it can promise.
   A flex item never shrinks below its min-content — the longest word of that name — so without
   this the pair of army buttons set a floor under the whole CP row: on a 393px phone the row's
   minimum came to ~367px against ~349px of card, the row overflowed its card and the DOCUMENT
   scrolled sideways (on iOS that also drags the fixed navbar off the visual viewport, which is
   what it looks like from the outside). Ellipsis instead of a floor, with the full name on
   `title` — the same lesson as the setup cards' `minmax(0, 1fr)`. */
.proster-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.proster:hover { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); }
.players { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.player {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 0.8rem;
}
.ptitle { font-family: var(--font-display); font-size: 1.45rem; font-weight: 500; color: var(--text-primary); margin: 0; }
/* The folded setup facts under the side title. Summary styled as a quiet one-line control —
   the card's first loud thing must stay the primary mission, not this. */
.pinfo { margin: 0.1rem 0 0.5rem; }
.pinfo > summary {
  cursor: pointer;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  padding: 0.15rem 0;
}
@media (hover: hover) { .pinfo > summary:hover { color: var(--text-muted); } }
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
.card-open {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0.65rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  cursor: pointer;
  text-align: left;
  margin-bottom: 0.55rem;
}
.card-open:hover { border-color: var(--accent); }
.card-name { font-weight: 700; font-size: 0.88rem; color: var(--text-primary); }
.card-vp { font-family: var(--font-mono); font-weight: 700; font-size: 0.82rem; color: var(--accent); flex-shrink: 0; }
.score-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.55rem; }
/* Same gap SecondaryDeck opens above itself (.sec), so the row reads as its own band under it.
   The CP label drops `.sr-label`'s column width here — it labels the stepper right next to it,
   not a column of rows — and the roster button sits at the far end, opposite the pair. With CP
   tracking off that button is the row's only child and stays left, like everything else. */
.cp-row { margin-top: 0.6rem; flex-wrap: wrap; }
.cp-row .sr-label { min-width: 0; }
/* Only the FIRST army button takes the auto margin: with two of them (doubles) an auto margin
   each split the free space between the pair instead of keeping it together at the far end.
   `flex: 1 1 auto` + the ellipsis above is what lets the pair drop to a second line and share
   it evenly when the row can't fit — a row is spent only when the width is genuinely gone. */
.cp-row .sr-label ~ .proster:first-of-type { margin-left: auto; }
.cp-row .proster { flex: 1 1 auto; min-width: 0; }
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
@media (max-width: 700px) {
  .players { grid-template-columns: 1fr; }
}
/* The row is five controls now (setup, shared game, broadcast when on, finish, next), and on
   a phone the two worded ones cannot both keep their words: "Следующий раунд" beside
   "Завершить игру" wrapped the primary onto a line of its own (seen 2026-09-17). Below the
   threshold the NEXT button is a chevron — the one action here that is the same every round and
   needs no reading — and the row stays one line; the label lives on in aria-label/title. The
   finish button keeps its words: it is the destructive one. Above the threshold nothing changes. */
.btn-next .next-icon { display: none; }
@media (max-width: 560px) {
  .btn-next .next-full { display: none; }
  .btn-next .next-icon { display: inline; }
  .btn-next { padding-left: 0.9rem; padding-right: 0.9rem; font-size: 1rem; line-height: 1; }
}
/* Small phones: shrink the remaining buttons so five still fit one line (~360px). */
@media (max-width: 430px) {
  .actions .btn-primary:not(.btn-next), .actions .btn-ghost { padding: 0.45rem 0.7rem; font-size: 0.8rem; }
  .actions .btn-next { padding: 0.45rem 0.7rem; }
  .actions .btn-icon { padding: 0.45rem 0.55rem; font-size: 0.9rem; }
  .actions-left { gap: 0.4rem; }
  .actions { gap: 0.4rem; }
}
/* If a long finish label still does not fit, the row wraps rather than overflows. */
@media (max-width: 360px) {
  .actions { flex-wrap: wrap; }
}

/* The broadcast button is a STATE: lit while the game is streaming to an overlay. */
.bc-on {
  color: var(--accent);
  border-color: var(--accent);
}
</style>
