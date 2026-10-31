<template>
  <h2 class="chapter-heading">
    {{ labels.domLocationsHeading }}
  </h2>
  <p class="chapter-desc">
    {{ labels.domLocationsDesc }}
  </p>

  <section
    v-for="p in PHASES"
    :id="`dom-loc-${p}`"
    :key="p"
    class="dgroup"
  >
    <h3 class="dgroup-label">
      {{ phaseLabel(p) }}
    </h3>
    <div class="dgrid dgrid-two">
      <DomLocationCard
        v-for="l in deck.locations.filter((x) => x.phase === p)"
        :key="l.slug"
        :location="l"
      />
    </div>
  </section>
</template>

<script setup>
import DomLocationCard from './DomLocationCard.vue'
import { PHASES } from '../../data/dominatus.js'
import { useDominatus } from './useDominatus.js'

const { labels, deck, phaseLabel } = useDominatus()
</script>
