<template>
  <!-- One accordion per phase, the count on its head; what a group holds is the caller's (the slot
       gets the group) — full cards on the Stratagems page, spendable rows in the tracker. -->
  <div>
    <div
      v-for="g in groups"
      :key="g.key"
      class="phase-group"
      :class="{ card }"
    >
      <button
        type="button"
        class="phase-head"
        :class="{ now: g.key === now, inert: g.inert }"
        :aria-expanded="g.inert ? undefined : open.has(g.key)"
        :disabled="g.inert"
        @click="toggle(g.key)"
      >
        <ChevronIcon
          v-if="!g.inert"
          class="phase-chev"
          :turned="open.has(g.key)"
          from="right"
          to="down"
        />
        <span class="phase-name">{{ g.label || phaseLabel(g.key, labels) }}<small
          v-if="g.key === now && !g.label"
          class="phase-now"
        > · {{ labels.trackerStratNow }}</small></span>
        <span class="phase-count">{{ g.count ?? g.strats.length }}</span>
      </button>
      <CollapseTransition :show="!g.inert && open.has(g.key)">
        <div class="phase-body">
          <slot :group="g" />
        </div>
      </CollapseTransition>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ChevronIcon from './ChevronIcon.vue'
import CollapseTransition from './CollapseTransition.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { phaseLabel } from '../core/rules/stratagemPhases.js'

// `groups` — groupByPhase() (a group may bring its own `label`, and its own `count` when what it
// holds is not stratagems — the tracker's Turn tab; `inert` draws it muted and shut, a head with
// nothing behind it — the Turn tab's empty start and end of the turn, owner 2026-10-18); `open` — the open phases (a Set,
// v-model); `now` — the group to mark as the live one (the tracker's; null anywhere else); `card` —
// each group one card, its head and its rows inside one frame (the tracker's CP tab, owner
// 2026-10-06: a head and loose cards under it read as a pile of separate things).
const props = defineProps({
  groups: { type: Array, required: true },
  open: { type: Object, required: true },
  now: { type: String, default: null },
  card: { type: Boolean, default: false },
})
const emit = defineEmits(['update:open'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
function toggle(key) {
  const next = new Set(props.open)
  next.has(key) ? next.delete(key) : next.add(key)
  emit('update:open', next)
}
</script>

<style scoped>
/* Closed heads stack tight, like the list rows under them (owner, 2026-10-02). */
.phase-group { margin-bottom: 0.3rem; }
/* The condensed display face this small reads cramped above 400 (owner, 2026-10-07). */
/* Hover only where there is one: on a phone a tapped head kept the hover and looked "live". */
@media (hover: hover) { .phase-head:hover { border-color: var(--accent); } }
.phase-head.now { border-color: var(--accent); }
.phase-now { font-size: 0.85em; color: var(--accent-ink); }
.phase-body { padding-top: 0.3rem; } /* the same step as between the heads */

/* Card: the frame is the group's, the head a band at its top, the rows (the caller's) inside it
   divided by rules. The live group is not framed in the accent: shut, a lit frame read as picked
   (owner, 2026-10-06) — it is first in the list and says "now" in its name. */
.phase-group.card { border: 1px solid var(--border); background: var(--bg-card); transition: border-color var(--motion-fast); }
@media (hover: hover) { .phase-group.card:has(.phase-head:hover) { border-color: var(--accent); } }
.card .phase-head { border: 0; }
.phase-head.inert { cursor: default; opacity: 0.55; }
.phase-head.inert .phase-name { padding-left: 1.2em; }
.card .phase-body { padding-top: 0; border-top: 1px solid var(--border); }
</style>
