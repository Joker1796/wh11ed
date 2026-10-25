<template>
  <!-- The Mission Sequence from where the setup stops (owner, 2026-10-25): the setup ends with the
       Attacker and the Defender (step 5), and what follows happens at the table before the first
       turn — the secondaries, the formations, the deployment, the roll for the first turn, the
       pre-battle rules. Each step under its number in the Event Companion and with who starts it,
       by name; the two the tracker keeps — the secondaries and who goes first — are chosen in it.
       The turn bar's Start waits for both (battleWaitsFor). Gone once the battle begins. -->
  <section
    class="pb"
    data-tour="game-prebattle"
  >
    <div class="pb-head">
      <h3 class="pb-title">
        {{ labels.pbTitle }}
      </h3>
      <RouterLink
        class="pb-link"
        :to="SEQUENCE"
      >
        {{ labels.pbSequence }}
      </RouterLink>
    </div>

    <!-- Every step one block, its number in the title's line and its text the full width (owner,
         2026-10-25: a column for the numbers and a row for each name cost a third of a phone's
         screen). The sides' names stand in their colours in the steps' text. -->
    <ol class="pb-steps">
      <!-- Steps 1–5 were the setup's: said in one line, so the list does not seem to start at 6 out
           of nowhere (owner, 2026-10-25), and the numbers stay the Event Companion's. -->
      <li class="pb-step pb-done-steps">
        <span class="pb-n">1–5</span><span>{{ labels.pbStepsDone }}</span><i
          class="wi wi-check pb-tick"
          aria-hidden="true"
        />
      </li>
      <!-- 6 · The secondaries. Each side on its own phone in a shared game, in secret: a side
           another phone plays says only that it is choosing, or has chosen, until both have
           (`secondaryPending`, confirmed with Done). On one phone both are chosen here openly. -->
      <li
        v-if="!combatPatrol"
        class="pb-step"
        data-tour="game-prebattle-secondaries"
      >
        <strong class="pb-name"><span class="pb-n">6</span>{{ labels.pbStepSecondaries }}</strong>
        <p
          v-if="shared"
          class="pb-text"
        >
          {{ labels.pbSecondariesSecret }}
        </p>
        <!-- A side on one line: its name, the switch (and Done), the cards under them when fixed;
             or its state and Change. The two sides share one grid, so their switches line up
             whatever the names' lengths. -->
        <div class="pb-sides">
          <!-- Each side's controls wear that side's colour, as its name does (owner, 2026-10-25: the
               opponent's lit "Tactical" was in yours). -->
          <div
            v-for="i in [0, 1]"
            :key="i"
            class="pb-side"
            :class="sideTone(i)"
          >
            <span
              class="pb-who"
              :style="sideColor(i)"
              :title="name(i)"
            >{{ name(i) }}</span>
            <template v-if="choosing(i)">
              <div class="pb-ctl">
                <div class="seg pb-seg">
                  <button
                    :class="{ on: mode(i) === 'tactical' }"
                    @click="setMode(i, 'tactical')"
                  >
                    {{ labels.pbTactical }}
                  </button>
                  <button
                    :class="{ on: mode(i) === 'fixed' }"
                    @click="setMode(i, 'fixed')"
                  >
                    {{ labels.pbFixed }}
                  </button>
                </div>
                <button
                  v-if="shared"
                  class="btn-primary pb-done"
                  :disabled="mode(i) === 'fixed' && !hand(i).length"
                  @click="confirmSecondaries(i)"
                >
                  {{ labels.lobbyDone }}
                </button>
              </div>
              <ExpandTransition>
                <button
                  v-if="mode(i) === 'fixed'"
                  class="picker-trigger pb-fixed"
                  data-press
                  aria-haspopup="dialog"
                  @click="pickerFor = i"
                >
                  <span
                    class="picker-trigger-name"
                    :class="{ 'pb-placeholder': !hand(i).length }"
                  >{{ fixedLine(i) }}</span>
                  <i class="wi wi-chevron-right picker-trigger-chev" />
                </button>
              </ExpandTransition>
            </template>
            <div
              v-else
              class="pb-ctl"
            >
              <span class="pb-status">{{ status(i) }}</span>
              <button
                v-if="canEdit(i)"
                class="btn-ghost pb-change"
                @click="reopen(i)"
              >
                {{ labels.pbChange }}
              </button>
            </div>
          </div>
        </div>
      </li>

      <li class="pb-step">
        <strong class="pb-name"><span class="pb-n">7</span>{{ labels.pbStepFormations }}</strong>
        <p class="pb-text">
          {{ labels.pbFormations }}
        </p>
      </li>
      <li class="pb-step">
        <strong class="pb-name"><span class="pb-n">8</span>{{ labels.pbStepDeploy }}</strong>
        <p class="pb-text">
          <span
            v-for="(part, k) in withName(labels.pbDeploy, roleIdx('defender'))"
            :key="k"
            :class="{ 'pb-player': part.side != null }"
            :style="part.side != null ? sideColor(part.side) : null"
          >{{ part.text }}</span>
        </p>
      </li>
      <li class="pb-step">
        <strong class="pb-name"><span class="pb-n">9</span>{{ labels.pbStepRedeploy }}</strong>
        <p class="pb-text">
          <span
            v-for="(part, k) in withName(labels.pbRedeploy, roleIdx('attacker'))"
            :key="k"
            :class="{ 'pb-player': part.side != null }"
            :style="part.side != null ? sideColor(part.side) : null"
          >{{ part.text }}</span>
        </p>
      </li>

      <!-- 10 · Who goes first, rolled for now and not at the setup. The host's to mark in a shared
           game — the order is every slice, and the seats travel with it (reseat). -->
      <li
        class="pb-step"
        data-tour="game-prebattle-first"
      >
        <strong class="pb-name"><span class="pb-n">10</span>{{ labels.pbStepFirst }}</strong>
        <p class="pb-text">
          <span
            v-for="(part, k) in withName(canRoll ? labels.pbFirstRoll : rolled ? labels.pbFirstIs : labels.pbFirstHost, 0)"
            :key="k"
            :class="{ 'pb-player': part.side != null }"
            :style="part.side != null ? sideColor(part.side) : null"
          >{{ part.text }}</span>
        </p>
        <div
          v-if="canRoll"
          class="seg pb-seg pb-roll"
          :class="rolled ? sideTone(0) : null"
          role="radiogroup"
          :aria-label="labels.pbStepFirst"
        >
          <button
            v-for="(i, k) in rollOrder"
            :key="k"
            role="radio"
            :aria-checked="rolled && i === 0"
            :class="{ on: rolled && i === 0 }"
            :title="name(i)"
            @click="roll(i)"
          >
            <span class="pb-roll-name">{{ name(i) }}</span>
          </button>
        </div>
      </li>
      <li class="pb-step">
        <strong class="pb-name"><span class="pb-n">11</span>{{ labels.pbStepPreBattle }}</strong>
        <p class="pb-text">
          <span
            v-for="(part, k) in withName(rolled ? labels.pbPreBattle : labels.pbPreBattleFirst, 0)"
            :key="k"
            :class="{ 'pb-player': part.side != null }"
            :style="part.side != null ? sideColor(part.side) : null"
          >{{ part.text }}</span>
        </p>
      </li>
    </ol>

    <SecondaryPickerModal
      v-if="pickerFor >= 0"
      :missions="fixedMissions"
      :selected="hand(pickerFor)"
      :max="maxFixed"
      @toggle="toggleFixed"
      @close="pickerFor = -1"
    />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import ExpandTransition from '../ExpandTransition.vue'
import SecondaryPickerModal from './SecondaryPickerModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, sideName, isYouSide, battleOf, fixedPool, missionBySlug } from '../../composables/useTracker.js'
import { useParty } from '../../composables/useParty.js'

// The Event Companion's Mission Sequence, which these steps are numbered by.
const SEQUENCE = { path: '/event-companion', hash: '#ec-chapter-sequence' }

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, setSecondaries, confirmSecondaries, rollFirstTurn } = useTracker()
const { active: shared, isHost, canEdit, reseat } = useParty()

const players = computed(() => current.value.players)
const combatPatrol = computed(() => !!current.value.settings?.combatPatrol)
const name = (i) => sideName(players.value[i], i, labels.value)
const roleIdx = (role) => players.value.findIndex((p) => p.role === role)
// A side's own colour (the game screen's --side-you / --side-opponent), for its name in a step.
const sideColor = (i) => ({ color: isYouSide(players.value[i], i) ? 'var(--side-you)' : 'var(--side-opponent)' })
// …and the accent of its controls, through the screen's own recipe (style.css .turn-colored).
const sideTone = (i) => ['turn-colored', { 'turn-opp': !isYouSide(players.value[i], i) }]
// A step's sentence with the side's name in it as a part of its own, so it can wear the colour —
// one element per part, built here: adjacent template fragments would join with stray spaces.
function withName(label, i) {
  const at = label.indexOf('{name}')
  if (at < 0 || i < 0) return [{ text: label.replace('{name}', ''), side: null }]
  return [
    { text: label.slice(0, at), side: null },
    { text: name(i), side: i },
    { text: label.slice(at + '{name}'.length), side: null },
  ].filter((part) => part.text)
}

// ── 6 · The secondaries ──
const mode = (i) => players.value[i].secondaryMode
const hand = (i) => players.value[i].secondary?.hand || []
const pending = (i) => !!players.value[i].secondaryPending
// Chosen on this phone: its own side (both on one phone), and in a shared game until it says Done.
const choosing = (i) => canEdit(i) && (!shared.value || pending(i))
const anyPending = computed(() => players.value.some((p) => p.secondaryPending))
function fixedLine(i) {
  const picked = hand(i)
  if (!picked.length) return labels.value.trackerChooseFixed
  return picked.map((slug) => missionBySlug(slug, players.value[i].role, locale.value)?.name || slug).join(', ')
}
// What a side another phone plays says about its choice: nothing of it until both have chosen.
function status(i) {
  if (pending(i)) return labels.value.pbChoosing
  if (anyPending.value) return labels.value.pbChosenHidden
  return mode(i) === 'fixed' ? `${labels.value.pbFixed}: ${fixedLine(i)}` : labels.value.pbTactical
}
const pickerFor = ref(-1)
const maxFixed = computed(() => battleOf(current.value.settings).secondaries)
const fixedMissions = computed(() => {
  if (pickerFor.value < 0) return []
  const role = players.value[pickerFor.value].role
  return fixedPool(role).map((m) => missionBySlug(m.slug, role, locale.value))
})
function setMode(i, m) {
  if (m === mode(i)) return
  setSecondaries(i, m)
  if (m === 'fixed') pickerFor.value = i
}
function toggleFixed(slug) {
  const i = pickerFor.value
  const picked = [...hand(i)]
  const at = picked.indexOf(slug)
  if (at >= 0) picked.splice(at, 1)
  else if (picked.length < maxFixed.value) picked.push(slug)
  setSecondaries(i, 'fixed', picked)
}
// Changing a confirmed choice: the same cards, to be confirmed again.
function reopen(i) {
  setSecondaries(i, mode(i), hand(i))
}

// ── 10 · The first turn ──
const rolled = computed(() => !current.value.firstTurnPending)
// The two names stand still, "you" first: marking the winner moves them to the front of the game
// (players[0] goes first), and buttons in that order swapped places under the finger with the light
// staying on the left one — the roll looked like it did nothing (owner, 2026-10-25).
const rollOrder = computed(() => (isYouSide(players.value[1], 1) && !isYouSide(players.value[0], 0) ? [1, 0] : [0, 1]))
const canRoll = computed(() => !shared.value || isHost.value)
function roll(i) {
  if (rolled.value && i === 0) return
  if (rollFirstTurn(i) && shared.value && isHost.value) reseat()
}
</script>

<style scoped>
/* Over the missions while the battle has not begun, inside their frame: the steps the table works
   through, one short line each — the sides' names in them, so nobody looks up which of the two is
   the Defender. No frame of its own: a rule under it parts it from the side's missions. */
.pb {
  container-type: inline-size;
  margin: 0.3rem 0 0.8rem;
  padding: 0 0 0.8rem;
  border-bottom: 1px solid var(--border);
}
.pb-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  column-gap: 0.75rem;
  margin-bottom: 0.45rem;
}
.pb-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.21rem;
  font-weight: 500;
  color: var(--text-primary);
}
.pb-link { font-size: 0.78rem; color: var(--text-dim); }
@media (hover: hover) { .pb-link:hover { color: var(--accent-ink); } }
.pb-steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.5rem; }
/* A wide screen (owner, 2026-10-25): the steps in two columns, read in rows — 6|7, 8|9, 10|11.
   From 760px of the block: each half then holds a name and the whole "Tactical / Fixed" switch. */
@container (min-width: 760px) {
  .pb-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.7rem 2rem; }
}
.pb-step { min-width: 0; }
.pb-name { display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
/* The step's number in the score board's figures (its display face), a size up, in the text's own
   colour (owner, 2026-10-25). Over 18px, so weight 500 is allowed (npm run a11y's face check). */
.pb-n { margin-right: 0.45rem; font-family: var(--font-display); font-size: 1.4rem; font-weight: 500; line-height: 1; vertical-align: -0.08em; }
.pb-text { margin: 0.1rem 0 0; font-size: 0.84rem; line-height: 1.4; color: var(--text-muted); }
/* A name is the players' own text: one long word must break rather than push the page sideways. */
.pb-player { font-weight: 600; overflow-wrap: anywhere; }
.pb-done-steps { grid-column: 1 / -1; font-size: 0.84rem; color: var(--text-muted); }
.pb-tick { margin-left: 0.35rem; font-size: 0.8rem; }
/* A side's choice on one line: the name, the switch beside it (and Done), the cards under them. One
   grid for both sides (each side's box is `display: contents`): the names' column is as wide as the
   longer name, up to 35% of the line, so the two switches start at one edge. */
.pb-sides { display: grid; grid-template-columns: minmax(0, max-content) minmax(0, 1fr); align-items: center; gap: 0.4rem 0.6rem; margin-top: 0.4rem; }
/* The second column: the switch (or the state) and, beside it, Done (or Change). */
.pb-ctl { grid-column: 2; display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem 0.5rem; min-width: 0; }
.pb-side { display: contents; }
.pb-who { grid-column: 1; max-width: 6rem; font-size: 0.86rem; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pb-seg { flex: 1 1 12rem; display: flex; min-width: 0; }
.pb-seg button { flex: 1 1 0; min-width: 0; min-height: 38px; padding: 0.25rem 0.5rem; font-size: 0.86rem; }
/* 320px: "Фиксированные" must fit half of what the name leaves. */
/* Narrow: the switch's two words a size down; narrower still, the name goes above its switch rather
   than squeeze it — the thresholds are the block's own width (container), measured with the longest
   name the field takes (2026-10-25). */
@container (max-width: 359px) { .pb-seg button { padding-inline: 0.25rem; font-size: 0.8rem; } }
@container (max-width: 299px) {
  .pb-sides { grid-template-columns: minmax(0, 1fr); row-gap: 0.25rem; }
  .pb-who { max-width: none; }
  .pb-ctl, .pb-fixed { grid-column: 1; }
  .pb-ctl { margin-bottom: 0.25rem; }
}
.pb-fixed { grid-column: 2; min-width: 0; min-height: 38px; }
.pb-placeholder { color: var(--text-muted); font-weight: 500; }
.pb-done, .pb-change { flex: 0 0 auto; margin-left: auto; min-height: 38px; padding: 0.25rem 0.75rem; font-size: 0.85rem; }
.pb-status { flex: 1 1 auto; min-width: 0; font-size: 0.84rem; line-height: 1.35; color: var(--text-muted); }
/* The roll's two names at their own width; they shrink, each to an ellipsis, only when the pair
   would pass the line. No percentage cap: a .seg is fit-content, and 50% of a width the buttons
   themselves make cut "слепой" to "сле…" with the line half empty (2026-10-25). */
.pb-roll { display: flex; max-width: 100%; margin-top: 0.35rem; }
.pb-roll button { flex: 0 1 auto; min-width: 0; padding-inline: 0.9rem; }
.pb-roll-name { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
