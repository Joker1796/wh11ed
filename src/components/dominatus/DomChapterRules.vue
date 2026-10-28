<template>
  <h2 class="chapter-heading">
    {{ labels.domRulesHeading }}
  </h2>
  <p class="chapter-desc">
    {{ labels.domRulesDesc }}
  </p>

  <p class="lead">
    {{ deck.rules.intro }}
  </p>

  <EventProseBlocks :blocks="deck.rules.blocks" />
</template>

<script setup>
import EventProseBlocks from '../event/EventProseBlocks.vue'
import { useDominatus } from './useDominatus.js'

const { labels, deck } = useDominatus()
</script>
