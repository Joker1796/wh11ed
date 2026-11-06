<template>
  <BaseModal
    :title="current ? labels.campChangeLocation : labels.campChooseLocation"
    :subtitle="phaseLabel(state.phase)"
    max-width="560px"
    @close="emit('close')"
  >
    <!-- The phase's three Locations as cards folded to their heads: the one tapped (or rolled)
         opens, and the button at the foot sets it. The booklet rolls; the Event Companion lets the
         Warmaster pick. -->
    <div class="modal-body camp-picker-body">
      <div class="camp-loc-roll">
        <button
          type="button"
          class="btn-ghost"
          data-press
          @click="roll"
        >
          {{ labels.trackerDomRoll }}
        </button>
        <span
          v-if="rolled"
          class="camp-dim"
        ><CountText
          :text="labels.campRolled"
          :vals="{ n: rolled }"
        /></span>
      </div>
      <div class="camp-picker-list">
        <div
          v-for="l in locations"
          :key="l.slug"
          class="camp-card-pick"
          :class="{ on: picked === l.slug }"
          role="button"
          tabindex="0"
          data-press
          :aria-pressed="picked === l.slug"
          @click="pick(l.slug, $event)"
          @keydown.enter.space.self.prevent="pick(l.slug)"
        >
          <DomLocationCard
            :location="l"
            :folded="picked !== l.slug"
          />
        </div>
      </div>
    </div>
    <footer class="camp-draw-foot">
      <button
        type="button"
        class="btn-primary"
        :disabled="!picked || picked === current"
        @click="emit('pick', picked)"
      >
        {{ !picked ? labels.campLocationPick : picked === current ? labels.campLocationSame : labels.campLocationNamed.replace('{loc}', nameOf(picked)) }}
      </button>
    </footer>
  </BaseModal>
</template>

<script setup>
// The Warmaster sets the phase's Location: picked, or rolled on a D6 (1–2, 3–4, 5–6) and then set
// by the same button — a roll shows its card before it counts.
import { ref } from 'vue'
import BaseModal from '../../BaseModal.vue'
import DomLocationCard from '../DomLocationCard.vue'
import CountText from '../../CountText.vue'
import { useCampaignView } from './useCampaignView.js'

const props = defineProps({
  locations: { type: Array, required: true },
  current: { type: String, default: '' },
})
const emit = defineEmits(['close', 'pick'])
const { state, labels, phaseLabel } = useCampaignView()

const picked = ref(props.current || null)
const rolled = ref(0)
const nameOf = (slug) => props.locations.find((l) => l.slug === slug)?.name || slug

function pick(slug, ev) {
  if (ev?.target.closest('.keyword, [data-kw-open], a, button')) return
  rolled.value = 0
  picked.value = picked.value === slug ? null : slug
}
function roll() {
  const n = 1 + Math.floor(Math.random() * 6)
  const l = props.locations[Math.ceil(n / 2) - 1]
  rolled.value = n
  if (l) picked.value = l.slug
}
</script>

<style scoped>
.camp-loc-roll { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.6rem; }
</style>
