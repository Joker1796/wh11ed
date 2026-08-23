<template>
  <div v-if="switches.length" class="cond-chips">
    <!-- Chips are boxed only when their group HOLDS more than one (Creations of Bile picks two of
         six augmentations): that set has to say how full it is, because turning a third one on
         quietly drops the oldest. Everything else — ungrouped states, and the ordinary
         pick-exactly-one groups whose chips already read as radio buttons — renders flat, through
         a `display: contents` wrapper that adds no box of its own. -->
    <div v-for="g in groups" :key="g.key" class="cond-group" :class="{ capped: g.limit > 1 }">
      <!-- A set of options printed on one unit's card is switched here, far from that card, so the
           group says whose rule it is before it says how full it is. -->
      <span v-if="g.owner" class="cond-group-h cond-group-owner">{{ g.owner }}</span>
      <span v-if="g.limit > 1" class="cond-group-h">
        {{ labels.rosterCondPicked.replace('{n}', g.picked).replace('{max}', g.limit) }}
      </span>
      <!-- A chip and, for one that names somebody's printed rule, the "i" beside it: "The Fiery
           Heart" is a name, not a rule, and the card explaining it is three screens away. A button
           cannot hold a button, so the pair shares a wrapper. -->
      <span v-for="sw in g.items" :key="sw.id" class="cond-item">
        <button
          type="button"
          class="cond-chip"
          :class="{ on: sw.on, auto: sw.auto || sw.blocked }"
          :aria-pressed="sw.on"
          :disabled="sw.auto || sw.blocked"
          :title="blockedHint(sw)"
          @click="$emit('toggle', sw)"
        >
          <i class="bi" :class="sw.on ? 'bi-check-circle-fill' : 'bi-circle'"></i>
          {{ sw.label[locale] || sw.label.en }}
        </button>
        <button
          v-if="sw.info"
          type="button"
          class="cond-info"
          data-kw-open
          :aria-label="sw.label[locale] || sw.label.en"
          @click="$emit('info', sw, $event.currentTarget.getBoundingClientRect())"
        ><i class="bi bi-info-circle"></i></button>
      </span>
    </div>
  </div>
</template>

<script setup>
// The one way a condition switch is drawn — above the unit list (army-wide states), on a unit's
// card, and inside the rule that names it. Three places showing the same switch, so they share
// one component rather than three sets of chips that could drift apart in look or in behaviour.
// Purely presentational: `switches` come from rosterGameContext's switchesFor() (or stratagemsFor),
// and flipping one is the parent's business (only it knows which player is being drawn). A chip is
// inert when the tracker owns the answer (`auto`) or when the rules forbid the change (`blocked` —
// a Battle-shocked unit cannot be targeted with stratagems).
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const props = defineProps({
  switches: { type: Array, default: () => [] },
})
defineEmits(['toggle', 'info'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Why a blocked chip cannot be tapped. The reason travels as a key (stratagemsFor's `blockedBy`)
// rather than as text, because the rule is the pure layer's to state and the wording is this one's.
const BLOCK_HINTS = {
  shock: 'stratBlockedShock',
  wrongPhase: 'stratBlockedPhase',
  unitPhase: 'stratBlockedUnit',
  usedPhase: 'stratBlockedUsed',
}
function blockedHint(sw) {
  const key = BLOCK_HINTS[sw.blockedBy]
  return key ? labels.value[key] : null
}

// The switches in the order they came, bucketed by `group`. Ungrouped chips share one anonymous
// bucket rather than getting one each, so their relative order is untouched.
const groups = computed(() => {
  const out = []
  const byKey = new Map()
  for (const sw of props.switches) {
    const key = sw.group || ''
    let g = byKey.get(key)
    if (!g) {
      g = { key, limit: sw.group ? sw.groupLimit : 0, picked: 0, items: [], owner: sw.groupOwner || null }
      byKey.set(key, g)
      out.push(g)
    }
    if (!g.owner && sw.groupOwner) g.owner = sw.groupOwner
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
/* The unit whose card these options are printed on — the first thing in the box, on its own line. */
.cond-group-owner { flex-basis: 100%; color: var(--text-primary); font-weight: 700; }
.cond-item { display: inline-flex; align-items: center; gap: 0.15rem; }
.cond-info {
  display: inline-flex; align-items: center;
  padding: 0.2rem; margin-left: -0.2rem;
  border: 0; background: none; color: var(--text-muted); cursor: pointer; font-size: 0.8rem;
}
.cond-info:hover { color: var(--accent); }
.cond-chip {
  display: inline-flex; align-items: center; gap: 0.35rem;
  padding: 0.3rem 0.65rem; border: 1px solid var(--border); border-radius: 999px;
  background: var(--bg-card); color: var(--text-muted); font-size: 0.78rem; cursor: pointer;
}
.cond-chip:hover:not(:disabled) { border-color: var(--accent); color: var(--text-primary); }
.cond-chip.on { border-color: var(--accent); color: var(--accent); font-weight: 600; }
.cond-chip.auto { cursor: default; }
</style>
