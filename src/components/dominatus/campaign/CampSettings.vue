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
        <span>{{ labels.campSchedule }}</span>
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
        <span>{{ labels.campDrawSetting }}</span>
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
        <span>{{ labels.campApproveSetting }}</span>
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
        <span>{{ labels.campFormat }}</span>
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
        <span>{{ labels.campMe }}</span>
        <CampPick
          v-model="form.me"
          :placeholder="labels.campMeNone"
          :options="[{ value: null, label: labels.campMeNone }, ...state.players.map((p) => ({ value: p.id, label: p.name }))]"
        />
      </div>
      <button
        class="btn-primary"
        type="submit"
      >
        {{ labels.trackerSave }}
      </button>
    </form>
  </BaseModal>
</template>

<script setup>
// The campaign's settings, the Warmaster's: the Battle Schedule, how cards are drawn, whether
// battles are counted at once, the booklet's rules or the Event Companion's, and the player the
// Warmaster plays as. One `settings` event, only what changed.
import { reactive } from 'vue'
import BaseModal from '../../BaseModal.vue'
import NumberStepper from '../../tracker/NumberStepper.vue'
import CampPick from './CampPick.vue'
import { useCampaignView } from './useCampaignView.js'

const emit = defineEmits(['close'])
const { state, act, labels, phaseLabel } = useCampaignView()
const s = state.value
const form = reactive({ schedule: [...s.schedule], draw: s.draw, approve: s.approve, format: s.format, me: s.me })

async function save() {
  const payload = {}
  if (form.schedule.some((n, i) => n !== s.schedule[i])) payload.schedule = [...form.schedule]
  for (const k of ['draw', 'approve', 'format', 'me']) if (form[k] !== s[k]) payload[k] = form[k]
  if (!Object.keys(payload).length || (await act('settings', payload))) emit('close')
}
</script>

<style scoped>
.camp-sched { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.5rem; }
</style>
