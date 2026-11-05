<template>
  <MissionRuleFold
    :label="labels.domAgendaAchieved"
    icon="dom-achieved"
  >
    <DomAgendaAchieved
      v-if="mission?.achieved"
      :achieved="mission.achieved"
      :primary-label="false"
      :label="false"
    />
    <template #aside>
      <!-- One card to earn is a yes or a no: a box. Only a phase 3 Agenda's "one more" makes it a count. -->
      <label
        v-if="max === 1"
        class="check dagr-check"
        :class="{ on: !!player.agendaAchieved }"
      >
        <input
          type="checkbox"
          :checked="!!player.agendaAchieved"
          :disabled="!editable"
          @change="(e) => setAgendaAchieved(pi, e.target.checked ? 1 : 0)"
        >
        <span>{{ labels.trackerDomAchievedGot }}</span>
      </label>
      <template v-else>
        <NumberStepper
          :model-value="player.agendaAchieved || 0"
          :min="0"
          :max="max"
          :disabled="!editable"
          @update:model-value="(v) => setAgendaAchieved(pi, v)"
        />
        <span class="dagr-max">/ {{ max }}</span>
      </template>
    </template>
  </MissionRuleFold>
</template>

<script setup>
// On the game screen, a row of the missions frame under the war zone (owner, 2026-11-03: in the
// same shape, with the deck's mark): the Agenda Achieved cards this battle earns. The
// players judge the conditions at Determine Victor (they read the table, not the score), so it is
// a count to set, with the card's conditions a tap away.
import { computed } from 'vue'
import NumberStepper from '../tracker/NumberStepper.vue'
import MissionRuleFold from '../tracker/MissionRuleFold.vue'
import DomAgendaAchieved from './DomAgendaAchieved.vue'
import { useTracker, missionBySlug } from '../../composables/useTracker.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  pi: { type: Number, required: true },
  editable: { type: Boolean, default: true },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, setAgendaAchieved } = useTracker()

const player = computed(() => current.value.players[props.pi])
const mission = computed(() => missionBySlug(player.value.primarySlug, null, locale.value))
const max = computed(() => (mission.value?.achieved?.more ? 2 : 1))
</script>

<style scoped>
/* In the row, not a field of a form: the box and its word on the row's own ground, no plate of
   their own (owner, 2026-11-03: the darker box read odd); the row keeps its 44px for the finger. */
.dagr-check { padding: 0.35rem 0; border: 0; background: none; }
.dagr-check.on { background: none; }
.dagr-max { font-size: 0.8rem; color: var(--text-muted); }
</style>
