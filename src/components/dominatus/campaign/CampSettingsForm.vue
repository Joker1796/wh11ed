<template>
  <form
    class="camp-settings"
    @submit.prevent="emit('submit', { ...form, schedule: [...form.schedule] })"
  >
    <section class="fsection">
      <h2 class="fsection-title">
        {{ labels.campSetMain }}
      </h2>
      <label class="camp-set">
        <span class="camp-set-label">{{ labels.campName }}</span>
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

    <section class="fsection">
      <h2 class="fsection-title">
        {{ labels.campSetPlayers }}
      </h2>
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
    </section>

    <section class="fsection">
      <h2 class="fsection-title">
        {{ labels.campSetBattles }}
      </h2>
      <div class="camp-set">
        <span class="camp-set-label">{{ labels.campSchedule }}<HelpButton @click="help = 'schedule'" /></span>
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
        v-model="form.size"
        :label="labels.campSize"
        :options="BATTLE_SIZES.map((b) => ({ value: b.id, label: b.name }))"
        @help="help = 'size'"
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
    </section>

    <section class="fsection">
      <h2 class="fsection-title">
        {{ labels.campSetRewards }}
      </h2>
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
    </section>

    <!-- The player the Warmaster plays as: only once there are players to be. -->
    <section
      v-if="players.length"
      class="fsection"
    >
      <h2 class="fsection-title">
        {{ labels.campSetWarmaster }}
      </h2>
      <div class="camp-set">
        <span class="camp-set-label">{{ labels.campMe }}<HelpButton @click="help = 'me'" /></span>
        <CampPick
          v-model="form.me"
          :placeholder="labels.campMeNone"
          :options="[{ value: null, label: labels.campMeNone }, ...players]"
        />
      </div>
    </section>

    <button
      class="btn-primary btn-lg camp-settings-save"
      type="submit"
      :disabled="!form.name || busy"
    >
      {{ submitLabel }}
    </button>

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
  busy: { type: Boolean, default: false },
})
const emit = defineEmits(['submit'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const phaseLabel = (n) => labels.value.domPhase.replace('{n}', ['I', 'II', 'III'][n - 1])

const form = reactive({ ...props.initial, schedule: [...props.initial.schedule] })
const help = ref(null)
const TITLES = {
  format: 'campFormat', join: 'campJoin', allianceBy: 'campAllianceBy', factionLock: 'campFactionLock',
  roster: 'campRosterSetting', schedule: 'campSchedule', size: 'campSize', battlesBy: 'campBattlesBy',
  approve: 'campApproveSetting', draw: 'campDrawSetting', rewardsBy: 'campRewardsBy', me: 'campMe',
}
</script>

<style scoped>
.camp-settings { display: grid; gap: 1.25rem; }
.camp-settings .fsection { display: grid; gap: 0.75rem; }
.camp-settings .fsection-title { margin: 0; }
.camp-sched { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.5rem; }
.camp-settings-save { justify-self: start; }
</style>
