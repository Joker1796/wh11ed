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

  <div class="dom-prose">
    <EventProseBlocks :blocks="deck.event.blocks" />
  </div>
</template>

<script setup>
import EventProseBlocks from '../event/EventProseBlocks.vue'
import { useDominatus } from './useDominatus.js'

const { labels, deck } = useDominatus()
</script>
