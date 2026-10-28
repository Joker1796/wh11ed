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
  <p class="dom-cta">
    <RouterLink
      to="/tracker/campaigns"
      class="btn-ghost"
    >
      {{ labels.domRunCampaign }}
    </RouterLink>
  </p>

  <div class="dom-prose">
    <EventProseBlocks :blocks="deck.rules.blocks" />
  </div>
</template>

<script setup>
// The campaign itself is run in the tracker (/tracker/campaigns) — the link under the intro.
import EventProseBlocks from '../event/EventProseBlocks.vue'
import { useDominatus } from './useDominatus.js'

const { labels, deck } = useDominatus()
</script>
