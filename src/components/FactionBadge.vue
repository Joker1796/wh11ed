<template>
  <span
    class="tone-badge"
    :class="{ 'has-icon': hasIcon }"
  >
    <FactionEmblem
      v-if="hasIcon"
      :faction="faction"
    />
    <template v-else>{{ faction?.abbr || '' }}</template>
  </span>
</template>

<script setup>
// A faction's badge in its row — the emblem when the faction has one (factionIcons.js),
// else the monogram. The name always stands beside the badge, so neither form is the row's only
// label. Needs a `.tone` ancestor, like `.tone-badge`.
import { computed } from 'vue'
import FactionEmblem from './FactionEmblem.vue'
import { factionIcons } from '../data/factionIcons.js'

const props = defineProps({
  // An entry of factionsIndex.js (or anything with its `slug` and `abbr`).
  faction: { type: Object, default: null },
})
const hasIcon = computed(() => !!factionIcons[props.faction?.slug])
</script>

<style scoped>
/* Same box as a monogram's, so the names beside a column of badges stay in line; the emblem is
   wide and short, so it takes the box's padding too. */
.has-icon { width: 2.1rem; padding: 0.12rem; }
.has-icon .faction-emblem { width: 100%; height: 100%; }
</style>
