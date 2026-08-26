<template>
  <div class="round-tracker">
    <ScoreBoard />

    <div class="round-bar">
      <button class="rb-nav" :disabled="current.currentRound <= 1" :aria-label="labels.ariaPrevRound" @click="goToRound(current.currentRound - 1)">‹</button>
      <div class="rb-rounds">
        <button
          v-for="n in ROUND_COUNT"
          :key="n"
          class="rb-round"
          :class="{ on: current.currentRound === n }"
          :aria-label="`${labels.trackerRound} ${n}`"
          :aria-current="current.currentRound === n ? 'step' : undefined"
          @click="goToRound(n)"
        >{{ n }}</button>
      </div>
      <button class="rb-nav" :disabled="current.currentRound >= ROUND_COUNT" :aria-label="labels.ariaNextRound" @click="goToRound(current.currentRound + 1)">›</button>
    </div>

    <!-- The clock, one row under the rounds: whose turn and which phase. Only for a game that
         asked for it; a game without it looks exactly as it did. -->
    <div v-if="phasesOn" class="phase-bar">
      <button class="pb-nav" :disabled="!canStepPhase(-1)" :aria-label="labels.ariaPrevPhase" @click="stepPhase(-1)">‹</button>
      <button class="pb-now" @click="phasePickerOpen = true">
        <span class="pb-who">{{ playerSide(turnIndex) }}</span>
        <span class="pb-phase">{{ phaseLabel(current.currentPhase || 'command', labels) }}</span>
      </button>
      <button class="pb-nav" :disabled="!canStepPhase(1)" :aria-label="labels.ariaNextPhase" @click="stepPhase(1)">›</button>
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
    <details v-if="activeTwist" class="twist-card">
      <summary><span class="tc-label">{{ labels.trackerTwist }}</span> {{ activeTwist.title }}</summary>
      <div class="twist-card-body">
        <RuleBody :body="activeTwist.body" />
      </div>
    </details>

    <div class="players">
      <div v-for="(pl, i) in current.players" :key="i" class="player">
        <h3 class="ptitle">{{ playerName(i) }}</h3>
        <p class="pmeta">{{ dispositionName(pl.disposition) }}</p>
        <p v-if="pl.detachments && pl.detachments.length" class="pdet">{{ pl.detachments.join(' · ') }}</p>
        <!-- Primary mission — tap to open the scoring modal -->
        <div class="sec-title-row">{{ labels.trackerPrimary }}</div>
        <button v-if="primaryMission(i)" class="card-open" @click="openPrimary = i">
          <span class="card-name">{{ primaryName(i) }}</span>
          <span class="card-vp">{{ pl.rounds[current.currentRound - 1].primary }} / {{ PRIMARY_ROUND_CAP }} VP</span>
        </button>
        <!-- The fallback, and the only one: a disposition the app couldn't resolve leaves no card
             to tick. The missions themselves are not optional — see trackerOptions.js. -->
        <div v-else class="score-row">
          <NumberStepper
            :modelValue="pl.rounds[current.currentRound - 1].primary"
            :min="0" :max="PRIMARY_ROUND_CAP"
            @update:modelValue="v => setRoundPrimary(i, current.currentRound - 1, v)"
          />
          <span class="sr-sub">/ {{ PRIMARY_ROUND_CAP }} {{ labels.trackerThisRound }}</span>
        </div>

        <SecondaryDeck :pi="i" />

        <!-- CP and this player's army sit UNDER the secondaries: both are consulted between
             scoring passes, not during one, and above they pushed the round's actual scoring
             down. The row survives either half on its own — CP is a setting, and the army slot
             needs a faction the oldest saved games may not carry.
             One army button per player, never both: with a list attached the list is strictly
             the better answer (only this army's units, with the game's live modifiers), and
             without one the faction's datasheets are the next best thing. It reads the player
             it belongs to, so the opponent's army is one tap away from their own card. -->
        <div v-if="cpOn || pl.roster || pl.factionSlug" class="score-row cp-row">
          <template v-if="cpOn">
            <span class="sr-label">{{ labels.trackerCp }}</span>
            <NumberStepper :modelValue="pl.cp" :min="0" @update:modelValue="v => setCp(i, v)" />
          </template>
          <RouterLink v-if="pl.roster" class="proster" :to="`/tracker/game/roster/${i}`">
            <i class="bi bi-card-list"></i>
            {{ labels.trackerRosterOpen }}
          </RouterLink>
          <RouterLink v-else-if="pl.factionSlug" class="proster" :to="`/factions/${pl.factionSlug}/datasheets`">
            <i class="bi bi-people-fill"></i>
            {{ labels.factionDatasheets }}
          </RouterLink>
        </div>

        <!-- Army-rule tracker (Pain tokens, etc.) — at the bottom of the card, under the
             secondaries and the CP row. Opt-in per player (settings.trackArmyYou /
             trackArmyOpp, default on) and renders only for factions with a spec. -->
        <ArmyTrackerCard v-if="armyRuleOn(pl)" :pi="i" />
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
        <button
          class="btn-ghost btn-icon"
          :aria-label="labels.trackerEditSetup"
          :title="labels.trackerEditSetup"
          @click="editSetupOpen = true"
        >
          <i class="bi bi-chevron-left"></i>
          <i class="bi bi-gear"></i>
        </button>
        <button class="btn-ghost" @click="endModalOpen = true">{{ labels.trackerFinish }}</button>
      </div>
      <button
        v-if="current.currentRound < ROUND_COUNT"
        class="btn-primary btn-next"
        @click="goToRound(current.currentRound + 1)"
      >
        <span class="next-full">{{ labels.trackerNext }}</span>
        <span class="next-short">{{ labels.trackerRoundShort }} {{ current.currentRound + 1 }}</span>
      </button>
    </div>

    <GameEndModal v-if="endModalOpen" @confirm="onEndBattle" @close="endModalOpen = false" />
    <EditSetupModal v-if="editSetupOpen" @close="editSetupOpen = false" />
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
import PhasePickerModal from './PhasePickerModal.vue'
import PhaseRules from './PhaseRules.vue'
import RuleBody from '../RuleBody.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { getEventContent } from '../../data/eventCompanion.js'
import { phaseLabel } from '../../composables/stratagemPhases.js'
import { tracks } from '../../data/trackerOptions.js'
import { useTracker, ROUND_COUNT, PRIMARY_ROUND_CAP, PRIMARY_GAME_CAP, dispositionName, missionBySlug, scorableBlocks } from '../../composables/useTracker.js'

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
.proster:hover { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); }
.players { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.player {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 0.8rem;
}
.ptitle { font-family: var(--font-display); font-size: 1.45rem; font-weight: 500; color: var(--text-primary); margin: 0; }
.pmeta { font-size: 0.78rem; color: var(--text-muted); margin: 0.1rem 0 0.1rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; }
.pdet { font-size: 0.72rem; color: var(--text-dim); margin: 0 0 0.7rem; font-family: var(--font-mono); }
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
.cp-row { margin-top: 0.6rem; }
.cp-row .sr-label { min-width: 0; }
.cp-row .sr-label ~ .proster { margin-left: auto; }
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
@media (max-width: 700px) {
  .players { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .actions { flex-wrap: wrap; }
}
/* Small phones: shrink the finish/next buttons so the row stays on one line. Kicks in before
   full-size buttons would start wrapping (~418px) — otherwise "Next round" drops to a 2nd line. */
@media (max-width: 430px) {
  .actions .btn-primary, .actions .btn-ghost { padding: 0.45rem 0.7rem; font-size: 0.8rem; }
  .actions .btn-icon { padding: 0.45rem 0.55rem; font-size: 0.9rem; }
}
/* Smallest phones (~320–360px): the full "Next round" label no longer fits — swap it for the
   compact "Round N" (the round it advances to). */
.btn-next .next-short { display: none; }
@media (max-width: 360px) {
  .btn-next .next-full { display: none; }
  .btn-next .next-short { display: inline; }
}
</style>
