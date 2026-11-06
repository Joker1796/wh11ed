<template>
  <form
    class="camp-settings"
    @submit.prevent="submit"
  >
    <!-- The game's setup in look (owner, 2026-11-04): its blocks as cards with display-face
         headings, two columns on a desk (the setup's threshold), Cancel / Save kept at the bottom
         of the screen. Left, what the campaign is and who plays it; right, how it is played. -->
    <div class="camp-cols">
      <div class="camp-col">
        <section class="setup-card camp-set-block">
          <h3 class="block-head">
            {{ labels.campSetMain }}
          </h3>
          <label class="field camp-field">
            <span>{{ labels.campName }}</span>
            <input
              v-model.trim="form.name"
              class="form-input"
              type="text"
              maxlength="80"
              :placeholder="labels.campName"
            >
          </label>
          <CampSettingSeg
            v-model="form.format"
            :label="labels.campFormat"
            :options="[{ value: 'deck', label: labels.campFormatDeck }, { value: 'event', label: labels.campFormatEvent }]"
            @help="help = 'format'"
          />
        </section>

        <!-- The phases: how many battles, at what size, by when, and how each ends. -->
        <section class="setup-card camp-set-block">
          <h3 class="block-head">
            {{ labels.campSetPhases }}
          </h3>
          <div class="field camp-field">
            <span>{{ labels.campSchedule }}<HelpButton @click="help = 'schedule'" /></span>
            <div class="camp-sched">
              <label
                v-for="n in [1, 2, 3]"
                :key="n"
                class="camp-num"
              >
                <span>{{ phaseLabel(n) }}</span>
                <NumberStepper
                  :model-value="form.schedule[n - 1]"
                  :min="0"
                  :max="20"
                  @update:model-value="(v) => (form.schedule[n - 1] = v)"
                />
              </label>
            </div>
          </div>
          <CampSettingSeg
            v-model="sizeMode"
            :label="labels.campSizeMode"
            :options="[{ value: 'one', label: labels.campSizeOne }, { value: 'phase', label: labels.campSizeByPhase }]"
            @help="help = 'sizeMode'"
          />
          <div
            v-if="!Array.isArray(form.size)"
            class="seg camp-set-seg"
          >
            <button
              v-for="b in sizes"
              :key="b.value"
              type="button"
              :class="{ on: form.size === b.value }"
              @click="form.size = b.value"
            >
              {{ b.label }}
            </button>
          </div>
          <!-- The phase's name over its sizes: beside them "Strike Force" broke in two. -->
          <div
            v-for="n in (Array.isArray(form.size) ? [1, 2, 3] : [])"
            :key="n"
            class="camp-phase-stack"
          >
            <span class="camp-phase-name">{{ phaseLabel(n) }}</span>
            <div class="seg camp-set-seg">
              <button
                v-for="b in sizes"
                :key="b.value"
                type="button"
                :class="{ on: form.size[n - 1] === b.value }"
                @click="form.size[n - 1] = b.value"
              >
                {{ b.label }}
              </button>
            </div>
          </div>
          <!-- A date a phase, a row each: three abreast left no room for the date itself. -->
          <div class="field camp-field">
            <span>{{ labels.campDeadlines }}<HelpButton @click="help = 'deadlines'" /></span>
            <label
              v-for="n in [1, 2, 3]"
              :key="n"
              class="camp-phase-row"
            >
              <span class="camp-phase-name">{{ phaseLabel(n) }}</span>
              <input
                class="form-input"
                type="date"
                :value="form.deadlines[n - 1] || ''"
                @change="form.deadlines[n - 1] = $event.target.value || null"
              >
            </label>
          </div>
          <CampSettingSeg
            v-model="form.phaseEnd"
            :label="labels.campPhaseEnd"
            :options="[{ value: 'warmaster', label: labels.campPhaseEndWarmaster }, { value: 'auto', label: labels.campPhaseEndAuto }]"
            @help="help = 'phaseEnd'"
          />
        </section>

        <!-- The player the Warmaster plays as: only once there are players to be. -->
        <section
          v-if="players.length"
          class="setup-card camp-set-block"
        >
          <h3 class="block-head">
            {{ labels.campSetWarmaster }}
          </h3>
          <div class="field camp-field">
            <span>{{ labels.campMe }}<HelpButton @click="help = 'me'" /></span>
            <CampPick
              v-model="form.me"
              :placeholder="labels.campMeNone"
              :options="[{ value: null, label: labels.campMeNone }, ...players]"
            />
          </div>
        </section>
      </div>

      <div class="camp-col">
        <section class="setup-card camp-set-block">
          <h3 class="block-head">
            {{ labels.campSetPlayers }}
          </h3>
          <CampSettingSeg
            v-model="form.join"
            :label="labels.campJoin"
            :options="[{ value: 'open', label: labels.campJoinOpen }, { value: 'closed', label: labels.campJoinClosed }]"
            @help="help = 'join'"
          />
          <CampSettingSeg
            v-model="form.allianceBy"
            :label="labels.campAllianceBy"
            :options="[{ value: 'player', label: labels.campAllianceByPlayer }, { value: 'warmaster', label: labels.campAllianceByWarmaster }]"
            @help="help = 'allianceBy'"
          />
          <CampSettingSeg
            v-model="form.allianceLock"
            :label="labels.campAllianceLock"
            :options="[{ value: true, label: labels.campAllianceLocked }, { value: false, label: labels.campAllianceFree }]"
            @help="help = 'allianceLock'"
          />
          <CampSettingSeg
            v-model="form.factionLock"
            :label="labels.campFactionLock"
            :options="[{ value: true, label: labels.campFactionLocked }, { value: false, label: labels.campFactionFree }]"
            @help="help = 'factionLock'"
          />
          <CampSettingSeg
            v-model="form.roster"
            :label="labels.campRosterSetting"
            :options="[{ value: 'none', label: labels.campRosterNone }, { value: 'optional', label: labels.campRosterOptional }, { value: 'required', label: labels.campRosterRequired }]"
            @help="help = 'roster'"
          />
          <CampSettingSeg
            v-model="form.hands"
            :label="labels.campHands"
            :options="[{ value: 'open', label: labels.campHandsOpen }, { value: 'hidden', label: labels.campHandsHidden }]"
            @help="help = 'hands'"
          />
        </section>

        <section class="setup-card camp-set-block">
          <h3 class="block-head">
            {{ labels.campSetBattles }}
          </h3>
          <CampSettingSeg
            v-model="form.pairBy"
            :label="labels.campPairBy"
            :options="[{ value: 'free', label: labels.campPairFree }, { value: 'warmaster', label: labels.campPairWarmaster }, { value: 'random', label: labels.campPairRandom }]"
            @help="help = 'pairBy'"
          />
          <CampSettingSeg
            v-model="form.teamAlliance"
            :label="labels.campTeamAlliance"
            :options="[{ value: 'same', label: labels.campTeamSame }, { value: 'any', label: labels.campTeamAny }]"
            @help="help = 'teamAlliance'"
          />
          <CampSettingSeg
            v-model="form.strict"
            :label="labels.campStrict"
            :options="[{ value: false, label: labels.campStrictFree }, { value: true, label: labels.campStrictOn }]"
            @help="help = 'strict'"
          />
          <CampSettingSeg
            v-model="form.battlesBy"
            :label="labels.campBattlesBy"
            :options="[{ value: 'players', label: labels.campBattlesByPlayers }, { value: 'warmaster', label: labels.campBattlesByWarmaster }]"
            @help="help = 'battlesBy'"
          />
          <CampSettingSeg
            v-model="form.approve"
            :label="labels.campApproveSetting"
            :options="[{ value: 'warmaster', label: labels.campApproveWarmaster }, { value: 'auto', label: labels.campApproveAuto }]"
            @help="help = 'approve'"
          />
          <div class="field camp-field camp-field-num">
            <span>{{ labels.campUpgradeLimit }}<HelpButton @click="help = 'upgradeLimit'" /></span>
            <NumberStepper
              v-model="form.upgradeLimit"
              :min="1"
              :max="5"
            />
          </div>
        </section>

        <section class="setup-card camp-set-block">
          <h3 class="block-head">
            {{ labels.campSetRewards }}
          </h3>
          <CampSettingSeg
            v-model="form.draw"
            :label="labels.campDrawSetting"
            :options="[{ value: 'app', label: labels.campDrawApp }, { value: 'manual', label: labels.campDrawManual }]"
            @help="help = 'draw'"
          />
          <CampSettingSeg
            v-model="form.rewardsBy"
            :label="labels.campRewardsBy"
            :options="[{ value: 'players', label: labels.campRewardsByPlayers }, { value: 'warmaster', label: labels.campRewardsByWarmaster }]"
            @help="help = 'rewardsBy'"
          />
          <div class="field camp-field camp-field-num">
            <span>{{ labels.campDrawExtra }}<HelpButton @click="help = 'drawExtra'" /></span>
            <NumberStepper
              v-model="form.drawExtra"
              :min="0"
              :max="2"
            />
          </div>
        </section>
      </div>
    </div>

    <div class="setup-actions">
      <RouterLink
        class="btn-ghost"
        :to="cancelTo"
      >
        {{ labels.trackerCancel }}
      </RouterLink>
      <button
        class="btn-primary"
        type="submit"
        :disabled="!form.name?.trim() || busy"
      >
        {{ submitLabel }}
      </button>
    </div>

    <OptionHelpModal
      v-if="help"
      :title="labels[TITLES[help]]"
      :text="labels[`campHelp_${help}`]"
      @close="help = null"
    />
  </form>
</template>

<script setup>
// A campaign's settings, one form for starting a campaign and for changing one: what it is called,
// whose rules, who may join and what a player brings, how battles are entered and counted, how
// rewards are drawn and who takes them. Each setting carries its "?" (campHelp_*). The page that
// holds it sends what changed.
import { ref, reactive, computed } from 'vue'
import NumberStepper from '../../tracker/NumberStepper.vue'
import OptionHelpModal from '../../tracker/OptionHelpModal.vue'
import CampPick from './CampPick.vue'
import CampSettingSeg from './CampSettingSeg.vue'
import HelpButton from './CampHelpButton.vue'
import { BATTLE_SIZES } from '../../../composables/useTracker.js'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'

const props = defineProps({
  initial: { type: Object, required: true },
  // The campaign's players as picker options (the Warmaster may play as one of them).
  players: { type: Array, default: () => [] },
  submitLabel: { type: String, required: true },
  // Where Cancel goes: the campaign, or the list for a new one.
  cancelTo: { type: String, required: true },
  busy: { type: Boolean, default: false },
})
const emit = defineEmits(['submit'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const phaseLabel = (n) => labels.value.domPhase.replace('{n}', ['I', 'II', 'III'][n - 1])

const form = reactive({
  ...props.initial,
  schedule: [...props.initial.schedule],
  deadlines: [...(props.initial.deadlines || [null, null, null])],
  size: Array.isArray(props.initial.size) ? [...props.initial.size] : props.initial.size,
})
const sizes = computed(() => BATTLE_SIZES.map((b) => ({ value: b.id, label: b.name })))
// One size for the campaign or one a phase (the booklet's "smaller battles early"): switching to
// phases starts each at the campaign's size, back to one keeps the first phase's.
const sizeMode = computed({
  get: () => (Array.isArray(form.size) ? 'phase' : 'one'),
  set: (v) => {
    if (v === 'phase' && !Array.isArray(form.size)) form.size = [form.size, form.size, form.size]
    if (v === 'one' && Array.isArray(form.size)) form.size = form.size[0]
  },
})
const help = ref(null)
// Sent as plain values; three equal sizes are one size.
function submit() {
  // The button greys without a name; Enter in a field reaches here all the same.
  if (!form.name?.trim() || props.busy) return
  const size = Array.isArray(form.size) && form.size.every((x) => x === form.size[0]) ? form.size[0] : form.size
  emit('submit', { ...form, schedule: [...form.schedule], deadlines: [...form.deadlines], size: Array.isArray(size) ? [...size] : size })
}
const TITLES = {
  format: 'campFormat', join: 'campJoin', allianceBy: 'campAllianceBy', factionLock: 'campFactionLock',
  roster: 'campRosterSetting', schedule: 'campSchedule', size: 'campSize', battlesBy: 'campBattlesBy',
  approve: 'campApproveSetting', draw: 'campDrawSetting', rewardsBy: 'campRewardsBy', me: 'campMe',
  sizeMode: 'campSizeMode', deadlines: 'campDeadlines', phaseEnd: 'campPhaseEnd', allianceLock: 'campAllianceLock',
  teamAlliance: 'campTeamAlliance', hands: 'campHands', pairBy: 'campPairBy', strict: 'campStrict', upgradeLimit: 'campUpgradeLimit', drawExtra: 'campDrawExtra',
}
</script>

<style scoped>
.camp-settings { --stack-gap: 1rem; }
.camp-cols,
.camp-col { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--stack-gap); align-content: start; }
.camp-set-block { display: grid; gap: 0.75rem; }
.camp-field { display: grid; gap: 0.3rem; }
.camp-field > span { display: inline-flex; align-items: center; gap: 0.1rem; }
.camp-sched { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.5rem; }
/* A date a phase: the phase's name beside its date. A size a phase: the name over its sizes. */
.camp-phase-row { display: grid; grid-template-columns: 4.5rem minmax(0, 1fr); align-items: center; gap: 0.5rem; }
.camp-phase-stack { display: grid; gap: 0.25rem; }
.camp-phase-name { font-size: 0.82rem; color: var(--text-muted); }
/* A count: the caption on the left, the stepper on the right, one row. */
.camp-field-num { grid-template-columns: minmax(0, 1fr) auto; align-items: center; }
@media (min-width: 701px) {
  .camp-cols { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
}
@media (max-width: 560px) {
  .camp-settings { --stack-gap: 0.55rem; }
}
</style>
