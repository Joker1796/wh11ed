<template>
  <div class="dagr">
    <div class="dagr-line">
      <button
        type="button"
        class="dagr-toggle"
        :aria-expanded="open"
        @click="open = !open"
      >
        {{ labels.domAgendaAchieved }}
        <ChevronIcon :turned="open" />
      </button>
      <NumberStepper
        :model-value="player.agendaAchieved || 0"
        :min="0"
        :max="max"
        :disabled="!editable"
        @update:model-value="(v) => setAgendaAchieved(pi, v)"
      />
      <span class="dagr-max">/ {{ max }}</span>
    </div>
    <CollapseTransition :show="open">
      <DomAgendaAchieved
        class="dagr-body"
        :achieved="mission.achieved"
        :primary-label="false"
        :label="false"
      />
    </CollapseTransition>
  </div>
</template>

<script setup>
// Under a Dominatus Primary on the game screen: the Agenda Achieved cards this battle earns. The
// players judge the conditions at Determine Victor (they read the table, not the score), so it is
// a count to set, with the card's conditions a tap away.
import { ref, computed } from 'vue'
import NumberStepper from '../tracker/NumberStepper.vue'
import ChevronIcon from '../ChevronIcon.vue'
import CollapseTransition from '../CollapseTransition.vue'
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
const open = ref(false)

const player = computed(() => current.value.players[props.pi])
const mission = computed(() => missionBySlug(player.value.primarySlug, null, locale.value))
const max = computed(() => (mission.value?.achieved?.more ? 2 : 1))
</script>

<style scoped>
.dagr { margin-top: 0.4rem; }
.dagr-line { display: flex; align-items: center; gap: 0.5rem; }
.dagr-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-right: auto;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
}
.dagr-max { font-size: 0.8rem; color: var(--text-muted); }
.dagr-body { padding-top: 0.3rem; }
</style>
