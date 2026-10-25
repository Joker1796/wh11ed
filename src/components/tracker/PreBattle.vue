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

    <ol class="pb-steps">
      <!-- 6 · The secondaries. Each side on its own phone in a shared game, in secret: a side
           another phone plays says only that it is choosing, or has chosen, until both have
           (`secondaryPending`, confirmed with Done). On one phone both are chosen here openly. -->
      <li
        v-if="!combatPatrol"
        class="pb-step"
        data-tour="game-prebattle-secondaries"
      >
        <span class="pb-n">6</span>
        <div class="pb-body">
          <strong class="pb-name">{{ labels.pbStepSecondaries }}</strong>
          <p
            v-if="shared"
            class="pb-text"
          >
            {{ labels.pbSecondariesSecret }}
          </p>
          <div
            v-for="i in [0, 1]"
            :key="i"
            class="pb-side"
          >
            <span class="pb-who">{{ name(i) }}</span>
            <template v-if="choosing(i)">
              <div class="seg pb-seg">
                <button
                  :class="{ on: mode(i) === 'tactical' }"
                  @click="setMode(i, 'tactical')"
                >
                  {{ labels.trackerTactical }}
                </button>
                <button
                  :class="{ on: mode(i) === 'fixed' }"
                  @click="setMode(i, 'fixed')"
                >
                  {{ labels.trackerFixed }}
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
              <button
                v-if="shared"
                class="btn-primary pb-done"
                :disabled="mode(i) === 'fixed' && !hand(i).length"
                @click="confirmSecondaries(i)"
              >
                {{ labels.lobbyDone }}
              </button>
            </template>
            <template v-else>
              <span class="pb-status">{{ status(i) }}</span>
              <button
                v-if="canEdit(i)"
                class="btn-ghost pb-change"
                @click="reopen(i)"
              >
                {{ labels.pbChange }}
              </button>
            </template>
          </div>
        </div>
      </li>

      <li class="pb-step">
        <span class="pb-n">7</span>
        <div class="pb-body">
          <strong class="pb-name">{{ labels.pbStepFormations }}</strong>
          <p class="pb-text">
            {{ labels.pbFormations }}
          </p>
        </div>
      </li>
      <li class="pb-step">
        <span class="pb-n">8</span>
        <div class="pb-body">
          <strong class="pb-name">{{ labels.pbStepDeploy }}</strong>
          <p class="pb-text">
            {{ labels.pbDeploy.replace('{name}', roleName('defender')) }}
          </p>
        </div>
      </li>
      <li class="pb-step">
        <span class="pb-n">9</span>
        <div class="pb-body">
          <strong class="pb-name">{{ labels.pbStepRedeploy }}</strong>
          <p class="pb-text">
            {{ labels.pbRedeploy.replace('{name}', roleName('attacker')) }}
          </p>
        </div>
      </li>

      <!-- 10 · Who goes first, rolled for now and not at the setup. The host's to mark in a shared
           game — the order is every slice, and the seats travel with it (reseat). -->
      <li
        class="pb-step"
        data-tour="game-prebattle-first"
      >
        <span class="pb-n">10</span>
        <div class="pb-body">
          <strong class="pb-name">{{ labels.pbStepFirst }}</strong>
          <p class="pb-text">
            {{ canRoll ? labels.pbFirstRoll : rolled ? labels.pbFirstIs.replace('{name}', name(0)) : labels.pbFirstHost }}
          </p>
          <div
            v-if="canRoll"
            class="seg pb-seg pb-roll"
            role="radiogroup"
            :aria-label="labels.pbStepFirst"
          >
            <button
              v-for="i in [0, 1]"
              :key="i"
              role="radio"
              :aria-checked="rolled && i === 0"
              :class="{ on: rolled && i === 0 }"
              @click="roll(i)"
            >
              {{ name(i) }}
            </button>
          </div>
        </div>
      </li>
      <li class="pb-step">
        <span class="pb-n">11</span>
        <div class="pb-body">
          <strong class="pb-name">{{ labels.pbStepPreBattle }}</strong>
          <p class="pb-text">
            {{ rolled ? labels.pbPreBattle.replace('{name}', name(0)) : labels.pbPreBattleFirst }}
          </p>
        </div>
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
import { useTracker, sideName, battleOf, fixedPool, missionBySlug } from '../../composables/useTracker.js'
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
const roleName = (role) => {
  const i = players.value.findIndex((p) => p.role === role)
  return i < 0 ? '' : name(i)
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
  return mode(i) === 'fixed' ? `${labels.value.trackerFixed}: ${fixedLine(i)}` : labels.value.trackerTactical
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
const canRoll = computed(() => !shared.value || isHost.value)
function roll(i) {
  if (rolled.value && i === 0) return
  if (rollFirstTurn(i) && shared.value && isHost.value) reseat()
}
</script>

<style scoped>
/* A card over the missions while the battle has not begun: the steps the table works through, one
   short line each — the sides' names in them, so nobody looks up which of the two is the Defender. */
.pb {
  margin: 0 0 0.9rem;
  padding: 0.7rem 0.85rem 0.8rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
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
.pb-steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.55rem; }
.pb-step { display: grid; grid-template-columns: 1.6rem minmax(0, 1fr); gap: 0 0.4rem; align-items: baseline; }
.pb-n { font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--accent-ink); text-align: right; }
.pb-body { min-width: 0; }
.pb-name { display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
.pb-text { margin: 0.1rem 0 0; font-size: 0.84rem; line-height: 1.4; color: var(--text-muted); }
/* A side's choice: its name, then the switch and the cards — on one line while the width allows. */
.pb-side {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.6rem;
  margin-top: 0.45rem;
}
.pb-who { flex: 0 0 auto; min-width: 0; max-width: 100%; font-size: 0.84rem; font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pb-seg { flex: 1 1 14rem; }
.pb-seg button { flex: 1 1 0; min-width: 0; }
.pb-fixed { flex: 1 1 100%; min-height: 40px; }
.pb-placeholder { color: var(--text-muted); font-weight: 500; }
.pb-done, .pb-change { flex: 0 0 auto; min-height: 40px; padding: 0.3rem 0.8rem; font-size: 0.85rem; }
.pb-status { flex: 1 1 auto; min-width: 0; font-size: 0.84rem; color: var(--text-muted); }
.pb-roll { margin-top: 0.4rem; display: flex; }
</style>
