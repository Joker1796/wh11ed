<template>
  <h2 class="chapter-heading">
    {{ labels.domAgendasHeading }}
  </h2>
  <p class="chapter-desc">
    {{ labels.domAgendasDesc }}
  </p>

  <div class="dfilters">
    <div class="seg">
      <button
        :class="{ on: filter.alliance === 'all' }"
        @click="filter.alliance = 'all'"
      >
        {{ labels.filterAll }}
      </button>
      <button
        v-for="a in deck.alliances"
        :key="a.id"
        :class="{ on: filter.alliance === a.id }"
        @click="filter.alliance = a.id"
      >
        {{ a.name }}
      </button>
    </div>
    <div class="filter-chips">
      <button
        class="filter-chip"
        :class="{ on: !filter.phase }"
        @click="filter.phase = 0"
      >
        {{ labels.filterAll }}
      </button>
      <button
        v-for="p in PHASES"
        :key="p"
        class="filter-chip"
        :class="{ on: filter.phase === p }"
        @click="filter.phase = p"
      >
        {{ phaseLabel(p) }}
      </button>
    </div>
  </div>

  <TransitionGroup
    name="sift"
    tag="div"
    class="dgrid"
  >
    <MissionCard
      v-for="a in shown"
      :key="a.slug"
      :mission="a"
      :subtitle="`${allianceName(a.alliance)} · ${phaseLabel(a.phase)}`"
    >
      <DomAgendaAchieved :achieved="a.achieved" />
    </MissionCard>
  </TransitionGroup>
</template>

<script setup>
// The 27 Agendas: each one's Agenda Achieved conditions over its Primary Mission, drawn by the
// Event Companion's MissionCard (an Agenda's Primary is a mission card of the same shape).
import { computed } from 'vue'
import MissionCard from '../event/MissionCard.vue'
import DomAgendaAchieved from './DomAgendaAchieved.vue'
import { PHASES } from '../../data/dominatus.js'
import { useDominatus, useAgendaFilter } from './useDominatus.js'

const { labels, deck, allianceName, phaseLabel } = useDominatus()
const filter = useAgendaFilter()

const shown = computed(() => deck.value.agendas
  .filter((a) => filter.alliance === 'all' || a.alliance === filter.alliance)
  .filter((a) => !filter.phase || a.phase === filter.phase)
  .map((a) => ({ ...a, briefing: a.primary.briefing, blocks: a.primary.blocks })))
</script>
