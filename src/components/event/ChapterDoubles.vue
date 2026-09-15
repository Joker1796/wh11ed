<template>
  <h2 class="chapter-heading">
    {{ labels.eventDoublesHeading }}
  </h2>
  <p class="chapter-desc">
    {{ labels.eventDoublesDesc }}
  </p>

  <p class="lead">
    {{ doubles.intro }}
  </p>

  <EventProseBlocks :blocks="doubles.blocks" />
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
const doubles = computed(() => ec.value.doubles)
</script>
