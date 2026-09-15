<template>
  <h2 class="chapter-heading">
    {{ labels.eventPairingsHeading }}
  </h2>
  <p class="chapter-desc">
    {{ labels.eventPairingsDesc }}
  </p>

  <p class="lead">
    {{ pairings.intro }}
  </p>

  <EventProseBlocks :blocks="pairings.blocks" />
</template>

<script setup>
import { computed } from 'vue'
import EventProseBlocks from './EventProseBlocks.vue'
import { getEventContent } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const ec = computed(() => getEventContent(locale.value))
const pairings = computed(() => ec.value.pairings)
</script>
