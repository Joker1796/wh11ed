<template>
  <BaseModal
    :title="labels.campSettings"
    @close="emit('close')"
  >
    <form
      class="modal-body camp-form camp-modal-form"
      @submit.prevent="save"
    >
      <!-- The Battle Schedule (the booklet's first job for the Warmaster): battles per player in
           each phase. -->
      <div class="camp-num">
        <span class="camp-set-label">{{ labels.campSchedule }}<button
          type="button"
          class="help-btn"
          data-press
          aria-haspopup="dialog"
          :aria-label="labels.campHelp"
          @click="help = 'schedule'"
        ><i class="wi wi-help" /></button></span>
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
      <div class="camp-num">
        <span class="camp-set-label">{{ labels.campDrawSetting }}<button
          type="button"
          class="help-btn"
          data-press
          aria-haspopup="dialog"
          :aria-label="labels.campHelp"
          @click="help = 'draw'"
        ><i class="wi wi-help" /></button></span>
        <div class="seg">
          <button
            type="button"
            :class="{ on: form.draw === 'app' }"
            @click="form.draw = 'app'"
          >
            {{ labels.campDrawApp }}
          </button>
          <button
            type="button"
            :class="{ on: form.draw === 'manual' }"
            @click="form.draw = 'manual'"
          >
            {{ labels.campDrawManual }}
          </button>
        </div>
      </div>
      <div class="camp-num">
        <span class="camp-set-label">{{ labels.campApproveSetting }}<button
          type="button"
          class="help-btn"
          data-press
          aria-haspopup="dialog"
          :aria-label="labels.campHelp"
          @click="help = 'approve'"
        ><i class="wi wi-help" /></button></span>
        <div class="seg">
          <button
            type="button"
            :class="{ on: form.approve === 'warmaster' }"
            @click="form.approve = 'warmaster'"
          >
            {{ labels.campApproveWarmaster }}
          </button>
          <button
            type="button"
            :class="{ on: form.approve === 'auto' }"
            @click="form.approve = 'auto'"
          >
            {{ labels.campApproveAuto }}
          </button>
        </div>
      </div>
      <div class="camp-num">
        <span class="camp-set-label">{{ labels.campFormat }}<button
          type="button"
          class="help-btn"
          data-press
          aria-haspopup="dialog"
          :aria-label="labels.campHelp"
          @click="help = 'format'"
        ><i class="wi wi-help" /></button></span>
        <div class="seg">
          <button
            type="button"
            :class="{ on: form.format === 'deck' }"
            @click="form.format = 'deck'"
          >
            {{ labels.campFormatDeck }}
          </button>
          <button
            type="button"
            :class="{ on: form.format === 'event' }"
            @click="form.format = 'event'"
          >
            {{ labels.campFormatEvent }}
          </button>
        </div>
        <span class="camp-dim">{{ form.format === 'event' ? labels.campFormatEventNote : labels.campFormatDeckNote }}</span>
      </div>
      <!-- The Warmaster who plays: their rewards and battles are theirs on this page. -->
      <div class="camp-num">
        <span class="camp-set-label">{{ labels.campMe }}<button
          type="button"
          class="help-btn"
          data-press
          aria-haspopup="dialog"
          :aria-label="labels.campHelp"
          @click="help = 'me'"
        ><i class="wi wi-help" /></button></span>
        <CampPick
          v-model="form.me"
          :placeholder="labels.campMeNone"
          :options="[{ value: null, label: labels.campMeNone }, ...state.players.map(playerOption)]"
        />
      </div>
      <button
        class="btn-primary"
        type="submit"
      >
        {{ labels.trackerSave }}
      </button>
    </form>
    <OptionHelpModal
      v-if="help"
      :title="labels[HELP_TITLES[help]]"
      :text="labels[`campHelp_${help}`]"
      @close="help = null"
    />
  </BaseModal>
</template>

<script setup>
// The campaign's settings, the Warmaster's: the Battle Schedule, how cards are drawn, whether
// battles are counted at once, the booklet's rules or the Event Companion's, and the player the
// Warmaster plays as. One `settings` event, only what changed.
import { ref, reactive } from 'vue'
import BaseModal from '../../BaseModal.vue'
import NumberStepper from '../../tracker/NumberStepper.vue'
import CampPick from './CampPick.vue'
import OptionHelpModal from '../../tracker/OptionHelpModal.vue'
import { useCampaignView } from './useCampaignView.js'

const emit = defineEmits(['close'])
const { state, act, labels, phaseLabel, playerOption } = useCampaignView()
const s = state.value
const help = ref(null)
const HELP_TITLES = { schedule: 'campSchedule', draw: 'campDrawSetting', approve: 'campApproveSetting', format: 'campFormat', me: 'campMe' }
const form = reactive({ schedule: [...s.schedule], draw: s.draw, approve: s.approve, format: s.format, me: s.me })

async function save() {
  const payload = {}
  if (form.schedule.some((n, i) => n !== s.schedule[i])) payload.schedule = [...form.schedule]
  for (const k of ['draw', 'approve', 'format', 'me']) if (form[k] !== s[k]) payload[k] = form[k]
  if (!Object.keys(payload).length || (await act('settings', payload))) emit('close')
}
</script>

<style scoped>
.camp-set-label { display: inline-flex; align-items: center; gap: 0.1rem; }
.camp-sched { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.5rem; }
</style>
