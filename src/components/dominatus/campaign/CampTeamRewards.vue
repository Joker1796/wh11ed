<template>
  <BaseModal
    :title="labels.campTeamRewards"
    @close="$emit('close')"
  >
    <form
      class="modal-body camp-form camp-modal-form"
      @submit.prevent="save"
    >
      <p class="camp-dim">
        {{ labels.campTeamRewardsNote }}
      </p>
      <div
        v-for="r in rewards"
        :key="r.player"
        class="camp-form-part"
      >
        <span>{{ playerName(r.player) }}</span>
        <CampPick
          v-model="r.kind"
          :title="playerName(r.player)"
          :options="kinds"
        />
        <label
          v-if="r.kind === 'honour' || r.kind === 'skill'"
          class="camp-num"
        >
          <span>{{ labels.campTeamDraw }}</span>
          <NumberStepper
            v-model="r.draw"
            :min="1"
            :max="5"
          />
        </label>
      </div>
      <button
        type="submit"
        class="btn-primary"
        :disabled="busy"
      >
        {{ labels.trackerSave }}
      </button>
    </form>
  </BaseModal>
</template>
<script setup>
import { computed, ref } from 'vue'
import BaseModal from '../../BaseModal.vue'
import NumberStepper from '../../tracker/NumberStepper.vue'
import CampPick from './CampPick.vue'
import { teamRewardsSuggested } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'
const props = defineProps({ battle: { type: Object, required: true } })
const emit = defineEmits(['close'])
const { state, labels, playerName, act } = useCampaignView()
const rewards = ref(teamRewardsSuggested(state.value, props.battle))
const busy = ref(false)
const kinds = computed(() => (props.battle.phase === 3 ? ['conquest', 'none'] : ['honour', 'skill', 'none']).map((kind) => ({ value: kind, label: { honour: labels.value.domHonours, skill: labels.value.domSkills, conquest: 'Path to Conquest', none: labels.value.campTeamNone }[kind] })))
async function save() {
  if (busy.value) return
  busy.value = true
  try {
    if (await act('teamRewards', { battle: props.battle.id, rewards: rewards.value })) emit('close')
  } finally { busy.value = false }
}
</script>
