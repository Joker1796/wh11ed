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
        :class="{ now: g.key === now }"
        :aria-expanded="open.has(g.key)"
        @click="toggle(g.key)"
      >
        <ChevronIcon
          class="phase-chev"
          :turned="open.has(g.key)"
          from="right"
          to="down"
        />
        <span class="phase-name">{{ g.label || phaseLabel(g.key, labels) }}<small
          v-if="g.key === now && !g.label"
          class="phase-now"
        > · {{ labels.trackerStratNow }}</small></span>
        <span class="phase-count">{{ g.strats.length }}</span>
      </button>
      <CollapseTransition :show="open.has(g.key)">
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
import { phaseLabel } from '../composables/stratagemPhases.js'

// `groups` — groupByPhase() (a group may bring its own `label`); `open` — the open phases (a Set,
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
.phase-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  transition: border-color var(--motion-fast);
}
/* Hover only where there is one: on a phone a tapped head kept the hover and looked "live". */
@media (hover: hover) { .phase-head:hover { border-color: var(--accent); } }
.phase-head.now { border-color: var(--accent); }
.phase-chev { flex-shrink: 0; font-size: 0.8rem; color: var(--text-dim); }
.phase-name { flex: 1; text-align: left; }
.phase-now { font-size: 0.85em; color: var(--accent-ink); }
.phase-count { flex-shrink: 0; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--text-muted); }
.phase-body { padding-top: 0.3rem; } /* the same step as between the heads */

/* Card: the frame is the group's, the head a band at its top, the rows (the caller's) inside it
   divided by rules. The live group is not framed in the accent: shut, a lit frame read as picked
   (owner, 2026-10-06) — it is first in the list and says "now" in its name. */
.phase-group.card { border: 1px solid var(--border); background: var(--bg-card); transition: border-color var(--motion-fast); }
@media (hover: hover) { .phase-group.card:has(.phase-head:hover) { border-color: var(--accent); } }
.card .phase-head { border: 0; }
.card .phase-body { padding-top: 0; border-top: 1px solid var(--border); }
</style>
