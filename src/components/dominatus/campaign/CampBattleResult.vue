<template>
  <div class="camp-form-part">
    <!-- Who won: the result, under its own name (owner, 2026-11-01). -->
    <div class="camp-num">
      <span>{{ labels.campResult }}</span>
      <div class="seg seg-fill">
        <button
          type="button"
          :class="{ on: victor === 'a' }"
          @click="victor = 'a'"
        >
          {{ nameA || labels.campSideA }}
        </button>
        <button
          type="button"
          :class="{ on: victor === null }"
          @click="victor = null"
        >
          {{ labels.campDraw }}
        </button>
        <button
          type="button"
          :class="{ on: victor === 'b' }"
          @click="victor = 'b'"
        >
          {{ nameB || labels.campSideB }}
        </button>
      </div>
    </div>
    <div class="camp-pair">
      <label
        v-for="side in ['a', 'b']"
        :key="side"
        class="camp-num"
      >
        <span>{{ labels.domAgendaAchieved }} · {{ (side === 'a' ? nameA : nameB) || '—' }}</span>
        <NumberStepper
          :model-value="achieved[side]"
          :min="0"
          :max="cap"
          @update:model-value="(v) => (achieved = { ...achieved, [side]: v })"
        />
      </label>
    </div>
  </div>
</template>

<script setup>
// A battle's result: the victor (or a draw) and each side's Agenda Achieved cards — one form for
// entering a battle and for the Warmaster correcting one.
import NumberStepper from '../../tracker/NumberStepper.vue'
import { useCampaignView } from './useCampaignView.js'

defineProps({
  nameA: { type: String, default: '' },
  nameB: { type: String, default: '' },
  // A phase 3 Agenda gives up to 2.
  cap: { type: Number, default: 1 },
})
const victor = defineModel('victor', { type: [String, null], default: 'a' })
const achieved = defineModel('achieved', { type: Object, default: () => ({ a: 0, b: 0 }) })
const { labels } = useCampaignView()
</script>

<style scoped>
.camp-form-part { display: grid; gap: 0.5rem; justify-self: stretch; }
</style>
