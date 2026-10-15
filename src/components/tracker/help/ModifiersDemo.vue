<template>
  <figure class="hd">
    <figcaption class="hd-unit">
      {{ DEMO.unit }}
    </figcaption>
    <div class="hd-row">
      <span class="hd-cap">{{ labels.trackerDemoPrinted }}</span>
      <RosterStatPlates :stats="DEMO.printed" />
    </div>
    <div class="hd-row">
      <span class="hd-cap">{{ labels.trackerDemoInList.replace('{enh}', DEMO.enhancement) }}</span>
      <RosterStatPlates :stats="DEMO.inList" />
    </div>
  </figure>
</template>

<script setup>
// The "Live modifiers" help, shown rather than told: one unit's plates as its datasheet prints
// them and as this list reads them, the changed one in the accent — the very plates the roster
// draws (RosterStatPlates). A Canoness with Iron Surplice of Saint Istalela (Bringers of Flame):
// Sv 3+ becomes 2+. DEMO is held to the real datasheet and modifier record by
// src/components/tracker/help/demos.test.js, so the example cannot drift from the rules.
import { computed } from 'vue'
import RosterStatPlates from '../../roster/RosterStatPlates.vue'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'
import { MODIFIERS_DEMO as DEMO } from './demos.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.hd {
  margin: 0.2rem 0 0.9rem;
  padding: 0.6rem 0.7rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
}
.hd-unit {
  margin-bottom: 0.4rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--text-primary);
}
.hd-row + .hd-row { margin-top: 0.45rem; }
.hd-cap {
  display: block;
  font-size: 0.72rem;
  color: var(--text-muted);
}
</style>
