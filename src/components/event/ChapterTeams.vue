<template>
  <h2 class="chapter-heading">
    {{ labels.eventTeamsHeading }}
  </h2>
  <p class="chapter-desc">
    {{ labels.eventTeamsDesc }}
  </p>

  <p class="lead">
    {{ teams.intro }}
  </p>

  <EventProseBlocks :blocks="teams.blocks" />
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
const teams = computed(() => ec.value.teams)
</script>
