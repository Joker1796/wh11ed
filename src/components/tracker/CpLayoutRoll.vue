<template>
  <!-- The die shows the face it rolled and the lit tab beside it the map that face picked, so no
       line of text is added: the button sits at the end of the tabs' row (LayoutTabs' slot) and
       stays there in the desk's narrow side column (owner, 2026-10-15). Its full name and the
       result are in the title and the accessible name. -->
  <button
    type="button"
    class="btn-ghost cp-roll"
    :title="name"
    :aria-label="name"
    @click="roll"
  >
    <i
      class="wi"
      :class="`wi-dice-${face}`"
      aria-hidden="true"
    />
    <span class="cp-roll-text">D6</span>
  </button>
</template>

<script setup>
// Combat Patrol's mission sequence picks the deployment map with a D6 (1–2 A, 3–4 B, 5–6 C).
// The roll picks a tab; the player can still pick another by hand.
import { ref, computed } from 'vue'
import { cpLayoutForRoll } from '../../data/combatPatrolMissions.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const emit = defineEmits(['roll'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const rolled = ref(0)
const face = computed(() => rolled.value || 6)
const name = computed(() =>
  rolled.value
    ? `${labels.value.trackerCpRoll} · ${labels.value.trackerCpRolled.replace('{n}', rolled.value)}`
    : labels.value.trackerCpRoll,
)
function roll() {
  rolled.value = 1 + Math.floor(Math.random() * 6)
  emit('roll', cpLayoutForRoll(rolled.value))
}
</script>

<style scoped>
/* The tabs' height (44px squares). Narrow sides: the desk's side column gives the row 226px, and
   three squares, the row's gaps and this must fit in it (measured 2026-10-15). */
.cp-roll {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 44px;
  padding-inline: 0.6rem;
}
/* Where the wizard has just gone two-column, its side column gives the row 184–211px against the
   212px the row needs (measured 701–784px, 2026-10-15): the die alone, on a square like the tabs. */
@media (min-width: 701px) and (max-width: 789px) {
  .cp-roll { padding-inline: 0; min-width: 40px; justify-content: center; }
  .cp-roll-text { display: none; }
}
</style>
