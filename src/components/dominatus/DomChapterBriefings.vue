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
        type="button"
        :class="{ on: alliance === 'all' }"
        @click="alliance = 'all'"
      >
        {{ labels.filterAll }}
      </button>
      <button
        v-for="a in deck.alliances"
        :key="a.id"
        type="button"
        :class="{ on: alliance === a.id }"
        @click="alliance = a.id"
      >
        {{ a.name }}
      </button>
    </div>
  </div>

  <section
    v-for="a in shownAlliances"
    :id="`dom-brief-${a.id}`"
    :key="a.id"
    class="dgroup"
  >
    <h3 class="dgroup-label">
      {{ a.name }}
    </h3>
    <div class="dgrid dgrid-one">
      <DomBriefingCard
        v-for="b in deck.briefings.filter((x) => x.alliance === a.id)"
        :key="`${b.alliance}-${b.phase}`"
        :briefing="b"
      />
    </div>
  </section>
</template>

<script setup>
// The nine Briefing cards, one group per Alliance (the contents link to each).
import { ref, computed } from 'vue'
import DomBriefingCard from './DomBriefingCard.vue'
import { useDominatus, resetFilterOnJump } from './useDominatus.js'

const { labels, deck } = useDominatus()
const alliance = ref('all')
resetFilterOnJump('dom-brief-', () => { alliance.value = 'all' })
const shownAlliances = computed(() => deck.value.alliances.filter((a) => alliance.value === 'all' || a.id === alliance.value))
</script>
