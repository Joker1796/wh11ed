<template>
  <h2 class="chapter-heading">
    {{ labels.domRulesHeading }}
  </h2>
  <p class="chapter-desc">
    {{ labels.domRulesDesc }}
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
    <EventProseBlocks :blocks="blocks" />
  </div>
</template>

<script setup>
// The booklet, in its own sections. No lead paragraph of ours: the booklet's first section is the
// introduction. The campaign itself is run in the tracker (/tracker/campaigns) — the link up top.
import { computed } from 'vue'
import EventProseBlocks from '../event/EventProseBlocks.vue'
import { useDominatus } from './useDominatus.js'

const { labels, deck } = useDominatus()

// A section heading runs across the page and its text goes on in the columns under it: a whole
// section full width read at ~150 characters a line (owner, 2026-10-31).
const blocks = computed(() => deck.value.rules.blocks.flatMap((b) => (b.section
  ? [{ id: b.id, title: b.title, section: true, wide: true, body: '' }, { ...b, id: `${b.id}-text`, title: '', section: false }]
  : [b])))
</script>
