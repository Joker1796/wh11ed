<template>
  <div class="cp-roll">
    <button
      type="button"
      class="btn-ghost cp-roll-btn"
      @click="roll"
    >
      <i
        class="wi"
        :class="`wi-dice-${face}`"
        aria-hidden="true"
      />
      {{ labels.trackerCpRoll }}
    </button>
    <!-- Said once rolled, beside the button: the tabs above already show which map it picked. -->
    <ExpandTransition>
      <span
        v-if="rolled"
        class="cp-roll-result"
        aria-live="polite"
      >{{ labels.trackerCpRolled.replace('{n}', rolled.n).replace('{id}', rolled.id) }}</span>
    </ExpandTransition>
  </div>
</template>

<script setup>
// Combat Patrol's mission sequence picks the deployment map with a D6 (1–2 A, 3–4 B, 5–6 C).
// The roll picks a tab; the player can still pick another by hand.
import { ref, computed } from 'vue'
import ExpandTransition from '../ExpandTransition.vue'
import { cpLayoutForRoll } from '../../data/combatPatrolMissions.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const emit = defineEmits(['roll'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const rolled = ref(null)
const face = computed(() => rolled.value?.n || 6)
function roll() {
  const n = 1 + Math.floor(Math.random() * 6)
  const id = cpLayoutForRoll(n)
  rolled.value = { n, id }
  emit('roll', id)
}
</script>

<style scoped>
.cp-roll {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 0.75rem;
  margin: 0.5rem 0;
}
.cp-roll-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.cp-roll-result {
  font-weight: 600;
  color: var(--text-primary);
}
</style>
