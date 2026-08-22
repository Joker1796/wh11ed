<template>
  <div v-if="switches.length" class="cond-chips">
    <!-- Chips are boxed only when their group HOLDS more than one (Creations of Bile picks two of
         six augmentations): that set has to say how full it is, because turning a third one on
         quietly drops the oldest. Everything else — ungrouped states, and the ordinary
         pick-exactly-one groups whose chips already read as radio buttons — renders flat, through
         a `display: contents` wrapper that adds no box of its own. -->
    <div v-for="g in groups" :key="g.key" class="cond-group" :class="{ capped: g.limit > 1 }">
      <span v-if="g.limit > 1" class="cond-group-h">
        {{ labels.rosterCondPicked.replace('{n}', g.picked).replace('{max}', g.limit) }}
      </span>
      <button
        v-for="sw in g.items"
        :key="sw.id"
        type="button"
        class="cond-chip"
        :class="{ on: sw.on, auto: sw.auto }"
        :aria-pressed="sw.on"
        :disabled="sw.auto"
        @click="$emit('toggle', sw)"
      >
        <i class="bi" :class="sw.on ? 'bi-check-circle-fill' : 'bi-circle'"></i>
        {{ sw.label[locale] || sw.label.en }}
      </button>
    </div>
  </div>
</template>

<script setup>
// The one way a condition switch is drawn — above the unit list (army-wide states), on a unit's
// card, and inside the rule that names it. Three places showing the same switch, so they share
// one component rather than three sets of chips that could drift apart in look or in behaviour.
// Purely presentational: `switches` come from rosterGameContext's switchesFor(), and flipping one
// is the parent's business (only it knows which player is being drawn).
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  switches: { type: Array, default: () => [] },
})
defineEmits(['toggle'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// The switches in the order they came, bucketed by `group`. Ungrouped chips share one anonymous
// bucket rather than getting one each, so their relative order is untouched.
const groups = computed(() => {
  const out = []
  const byKey = new Map()
  for (const sw of props.switches) {
    const key = sw.group || ''
    let g = byKey.get(key)
    if (!g) {
      g = { key, limit: sw.group ? sw.groupLimit : 0, picked: 0, items: [] }
      byKey.set(key, g)
      out.push(g)
    }
    g.items.push(sw)
    if (sw.on) g.picked++
  }
  return out
})
</script>

<style scoped>
.cond-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
/* An uncapped bucket is not a box: it hands its chips straight to the flex row above. */
.cond-group { display: contents; }
.cond-group.capped {
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem;
  padding: 0.35rem 0.5rem; border: 1px dashed var(--border); border-radius: 10px;
}
.cond-group-h { color: var(--text-muted); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.04em; }
.cond-chip {
  display: inline-flex; align-items: center; gap: 0.35rem;
  padding: 0.3rem 0.65rem; border: 1px solid var(--border); border-radius: 999px;
  background: var(--bg-card); color: var(--text-muted); font-size: 0.78rem; cursor: pointer;
}
.cond-chip:hover:not(:disabled) { border-color: var(--accent); color: var(--text-primary); }
.cond-chip.on { border-color: var(--accent); color: var(--accent); font-weight: 600; }
.cond-chip.auto { cursor: default; }
</style>
