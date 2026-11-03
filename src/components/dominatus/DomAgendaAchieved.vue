<template>
  <div class="dachieved">
    <div
      v-if="label"
      class="dach-label"
    >
      {{ labels.domAgendaAchieved }}
    </div>
    <p class="dach-lead">
      {{ labels.domAchievedOne }}
    </p>
    <ul class="dach-list">
      <li
        v-for="(c, i) in achieved.any"
        :key="i"
      >
        {{ c }}
      </li>
    </ul>
    <template v-if="achieved.more">
      <p class="dach-lead">
        {{ labels.domAchievedMore }}
      </p>
      <ul class="dach-list">
        <li
          v-for="(c, i) in achieved.more.any"
          :key="i"
        >
          {{ c }}
        </li>
      </ul>
    </template>
    <div
      v-if="primaryLabel"
      class="dach-label dach-primary"
    >
      {{ labels.domPrimaryMission }}
    </div>
  </div>
</template>

<script setup>
// The face of an Agenda card: what earns Agenda Achieved cards at the end of the battle. Sits in
// MissionCard's slot, above the Primary Mission printed on the card's reverse.
import { useDominatus } from './useDominatus.js'

defineProps({
  achieved: { type: Object, required: true },
  // The "Primary Mission" line under the conditions — for a card that goes on to print it.
  primaryLabel: { type: Boolean, default: true },
  // The "Agenda Achieved" heading — off where the row over it already says so (DomAgendaRow).
  label: { type: Boolean, default: true },
})
const { labels } = useDominatus()
</script>

<style scoped>
.dachieved { margin: 0.2rem 0 0.4rem; }
.dach-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}
.dach-primary {
  margin-top: 0.7rem;
  padding-top: 0.55rem;
  border-top: 1px dashed var(--border);
}
.dach-lead { margin: 0.3rem 0 0.15rem; font-size: 0.84rem; color: var(--text-muted); }
.dach-list { margin: 0; padding-left: 1.1rem; font-size: 0.86rem; line-height: 1.45; }
.dach-list li + li { margin-top: 0.15rem; }
</style>
