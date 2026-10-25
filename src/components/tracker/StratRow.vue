<template>
  <li
    class="sr"
    :class="{ locked }"
  >
    <button
      class="sr-main"
      @click="$emit('open')"
    >
      <span class="sr-name">{{ strat.name }}<small
        v-if="tag"
        class="sr-tag"
      >{{ tag }}</small></span>
      <span
        v-if="strat.when"
        v-safe-html="renderRichText(strat.when)"
        class="sr-when"
      />
    </button>
    <!-- Shown, not paid for here (`stratSpendCp` off): the printed cost, nothing to press. -->
    <span
      v-if="!playable"
      class="sr-cost"
    >{{ cost }}CP</span>
    <div
      v-else
      class="sr-ctrl"
    >
      <!-- The other way to play it: the dialog with the cost and the unit, for the time a rule
           changed the cost or the unit matters (Mikhail, 2026-10-19: "a tap spends it, a gear
           beside it sets the price"). The cost button beside it spends at the printed cost. -->
      <button
        class="sr-adjust"
        data-press
        :disabled="locked"
        :title="labels.trackerStratAdjust"
        :aria-label="labels.trackerStratAdjust"
        @click="$emit('adjust')"
      >
        <i
          class="wi wi-settings"
          aria-hidden="true"
        />
      </button>
      <!-- The printed cost: a tap spends it (unless the game asks every time — askStratagems). -->
      <button
        class="sr-use"
        data-press
        :disabled="locked"
        :title="title || labels.trackerStratUse"
        @click="$emit('use')"
      >
        {{ cost }}CP
      </button>
    </div>
    <!-- One line under the row, only when there is something to say: used this round (and the
         way back), or why it cannot be used now. -->
    <div
      v-if="playable && (used || reason || (undoable && undoWhy))"
      class="sr-foot"
    >
      <span
        v-if="used"
        class="sr-used"
      >✓ {{ labels.trackerStratUsed.replace('{n}', used) }}</span>
      <button
        v-if="undoable"
        class="sr-undo"
        data-press
        :disabled="!!undoWhy"
        @click="$emit('undo')"
      >
        <i
          class="wi wi-undo"
          aria-hidden="true"
        />
        {{ labels.trackerStratUndo }}
      </button>
      <span
        v-if="reason || (undoable && undoWhy)"
        class="sr-why"
      >{{ reason || undoWhy }}</span>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { vSafeHtml } from '../../directives/safeHtml.js'

// One stratagem in the CP tab: name and timing (tap for the full card) and the cost button, which
// plays it (the cost a rule changed is asked then, StratPlayModal). Pure presentation — CpStratagems decides every number and the reason.
defineProps({
  playable: { type: Boolean, default: true },
  strat: { type: Object, required: true },
  tag: { type: String, default: '' },          // a word after the name — "core" in a mixed list
  cost: { type: Number, required: true },
  used: { type: Number, default: 0 },
  undoable: { type: Boolean, default: false },
  undoWhy: { type: String, default: '' },      // why the undo is refused (strict rules), said under the row
  reason: { type: String, default: '' },
  title: { type: String, default: '' },
  locked: { type: Boolean, default: false },
})
defineEmits(['open', 'use', 'adjust', 'undo'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { renderRichText } = useRenderInline()
</script>

<style scoped>
.sr {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 0.5rem;
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--border);
  background: var(--sr-bg, var(--bg-card));
}
/* The row answers a pointer over the part that opens its card (owner, 2026-10-08): a shade lighter,
   the name in the side's colour — not over the CP button, which answers for itself. Behind
   (hover: hover), so a tap on a phone leaves nothing lit. */
@media (hover: hover) {
  .sr:has(.sr-main:hover) { background: color-mix(in srgb, var(--text-primary) 5%, var(--sr-bg, var(--bg-card))); }
  .sr-main:hover .sr-name { color: var(--accent-ink); }
}
.sr-main { min-width: 0; padding: 0; border: 0; background: none; text-align: left; font: inherit; cursor: pointer; }
.sr-name {
  display: block;
  font-family: var(--font-display); font-size: 1.12rem; font-weight: 700; line-height: 1.1;
  text-transform: uppercase; color: var(--text-primary);
}
/* The timing: two lines at most — the full text is one tap away. */
.sr-tag {
  margin-left: 0.4rem; padding: 0 0.3rem; border: 1px solid var(--border);
  font-family: var(--font-sans); font-size: 0.62rem; font-weight: 600; letter-spacing: 0.03em;
  color: var(--text-dim); vertical-align: 0.2em;
}
.sr-when {
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  margin-top: 0.1rem; font-size: 0.76rem; line-height: 1.3; color: var(--text-muted);
}
.sr-ctrl { display: flex; align-items: center; gap: 0.25rem; }
.sr-use {
  min-width: 50px; height: 36px; padding: 0 0.4rem;
  /* Outlined, not filled (owner, 2026-10-08: a column of filled buttons shouted over the list);
     the fill is the pointer's answer. */
  border: 1px solid var(--accent); background: none; color: var(--accent-ink);
  font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; cursor: pointer;
}
@media (hover: hover) {
  .sr-use:not(:disabled):hover { background: color-mix(in srgb, var(--accent) 14%, transparent); }
}
.sr-use:disabled { border-color: var(--border); color: var(--text-dim); cursor: default; }
/* The cost as information only: the button's face, no frame. */
.sr-cost { flex: none; align-self: center; min-width: 50px; text-align: center; font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--text-muted); }
.sr-adjust {
  width: 36px; height: 36px; padding: 0;
  border: 1px solid var(--border); background: none; color: var(--text-muted); cursor: pointer;
}
@media (hover: hover) { .sr-adjust:not(:disabled):hover { color: var(--accent-ink); border-color: var(--accent); } }
.sr-adjust:disabled { color: var(--text-dim); cursor: default; }
.sr-foot {
  grid-column: 1 / -1;
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.2rem 0.75rem;
  margin-top: 0.25rem; font-size: 0.76rem;
}
.sr-used { font-weight: 700; color: var(--accent-ink); }
.sr-undo {
  display: inline-flex; align-items: center; gap: 0.25rem;
  min-height: 28px; padding: 0; border: 0; background: none;
  font: inherit; font-weight: 600; color: var(--text-muted); cursor: pointer;
}
.sr-undo:disabled { opacity: 0.45; cursor: default; }
@media (hover: hover) { .sr-undo:not(:disabled):hover { color: var(--accent-ink); } }
.sr-why { color: var(--text-dim); }
</style>
