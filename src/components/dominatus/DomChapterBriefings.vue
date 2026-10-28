<template>
  <h2 class="chapter-heading">
    {{ labels.domBriefingsHeading }}
  </h2>
  <p class="chapter-desc">
    {{ labels.domBriefingsDesc }}
  </p>

  <div class="dfilters">
    <div class="seg">
      <button
        :class="{ on: alliance === 'all' }"
        @click="alliance = 'all'"
      >
        {{ labels.filterAll }}
      </button>
      <button
        v-for="a in deck.alliances"
        :key="a.id"
        :class="{ on: alliance === a.id }"
        @click="alliance = a.id"
      >
        {{ a.name }}
      </button>
    </div>
  </div>

  <div class="dgrid">
    <DomBriefingCard
      v-for="b in shown"
      :key="`${b.alliance}-${b.phase}`"
      :briefing="b"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DomBriefingCard from './DomBriefingCard.vue'
import { useDominatus } from './useDominatus.js'

const { labels, deck } = useDominatus()
const alliance = ref('all')
const shown = computed(() => deck.value.briefings.filter((b) => alliance.value === 'all' || b.alliance === alliance.value))
</script>
