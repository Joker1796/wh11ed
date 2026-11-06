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
        type="button"
        :class="{ on: filter.alliance === 'all' }"
        @click="filter.alliance = 'all'"
      >
        {{ labels.filterAll }}
      </button>
      <button
        v-for="a in deck.alliances"
        :key="a.id"
        type="button"
        :class="{ on: filter.alliance === a.id }"
        @click="filter.alliance = a.id"
      >
        {{ a.name }}
      </button>
    </div>
    <div class="filter-chips">
      <button
        type="button"
        class="filter-chip"
        :class="{ on: !filter.phase }"
        @click="filter.phase = 0"
      >
        {{ labels.filterAll }}
      </button>
      <button
        v-for="p in PHASES"
        :key="p"
        type="button"
        class="filter-chip"
        :class="{ on: filter.phase === p }"
        @click="filter.phase = p"
      >
        {{ phaseLabel(p) }}
      </button>
    </div>
  </div>

  <section
    v-for="g in groups"
    :id="`dom-agendas-${g.id}`"
    :key="g.id"
    class="dgroup"
  >
    <h3 class="dgroup-label">
      {{ g.name }}
    </h3>
    <TransitionGroup
      name="sift"
      tag="div"
      class="dgrid dgrid-two"
    >
      <MissionCard
        v-for="a in g.items"
        :key="a.slug"
        :mission="a"
        class="dcard-agenda dom-deck-agenda"
      >
        <template #tag>
          <span class="dcard-tag">{{ cardTag({ kind: 'agenda', alliance: a.alliance }) }}</span>
        </template>
        <DomAgendaAchieved :achieved="a.achieved" />
        <template #mark>
          <DomCardMark
            kind="agenda"
            :phase="a.phase"
            :alliance="a.alliance"
          />
        </template>
      </MissionCard>
    </TransitionGroup>
  </section>
</template>

<script setup>
// The 27 Agendas: each one's Agenda Achieved conditions over its Primary Mission, drawn by the
// Event Companion's MissionCard (an Agenda's Primary is a mission card of the same shape).
import { computed } from 'vue'
import MissionCard from '../event/MissionCard.vue'
import DomAgendaAchieved from './DomAgendaAchieved.vue'
import DomCardMark from './DomCardMark.vue'
import { PHASES } from '../../data/dominatus.js'
import { useDominatus, useAgendaFilter, resetFilterOnJump } from './useDominatus.js'

const { labels, deck, phaseLabel, cardTag } = useDominatus()
const filter = useAgendaFilter()
resetFilterOnJump('dom-agendas-', () => { filter.alliance = 'all'; filter.phase = 0 })

// One group per Alliance (the contents link to each), its cards narrowed by the phase chips.
const groups = computed(() => deck.value.alliances
  .filter((al) => filter.alliance === 'all' || al.id === filter.alliance)
  .map((al) => ({
    id: al.id,
    name: al.name,
    items: deck.value.agendas
      .filter((a) => a.alliance === al.id && (!filter.phase || a.phase === filter.phase))
      .map((a) => ({ ...a, briefing: a.primary.briefing, blocks: a.primary.blocks })),
  })))
</script>
