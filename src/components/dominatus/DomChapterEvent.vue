<template>
  <h2 class="chapter-heading">
    {{ labels.domEventHeading }}
  </h2>
  <p class="chapter-desc">
    {{ labels.domEventDesc }}
  </p>

  <p class="lead">
    {{ deck.event.intro }}
  </p>

  <EventProseBlocks :blocks="deck.event.blocks" />
</template>

<script setup>
import EventProseBlocks from '../event/EventProseBlocks.vue'
import { useDominatus } from './useDominatus.js'

const { labels, deck } = useDominatus()
</script>
