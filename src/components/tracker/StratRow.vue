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
        class="sr-when"
        v-html="renderInline(strat.when)"
      />
    </button>
    <div class="sr-ctrl">
      <!-- The printed cost; playing asks whether a rule changed it this time (StratPlayModal). -->
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
      v-if="used || reason"
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
        @click="$emit('undo')"
      >
        <i
          class="bi bi-arrow-counterclockwise"
          aria-hidden="true"
        />
        {{ labels.trackerStratUndo }}
      </button>
      <span
        v-if="reason"
        class="sr-why"
      >{{ reason }}</span>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'

// One stratagem in the CP tab: name and timing (tap for the full card) and the cost button, which
// plays it (the cost a rule changed is asked then, StratPlayModal). Pure presentation — CpStratagems decides every number and the reason.
defineProps({
  strat: { type: Object, required: true },
  tag: { type: String, default: '' },          // a word after the name — "core" in a mixed list
  cost: { type: Number, required: true },
  used: { type: Number, default: 0 },
  undoable: { type: Boolean, default: false },
  reason: { type: String, default: '' },
  title: { type: String, default: '' },
  locked: { type: Boolean, default: false },
})
defineEmits(['open', 'use', 'undo'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { renderInline } = useRenderInline()
</script>

<style scoped>
.sr {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 0.5rem;
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
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
  border: 1px solid var(--accent); background: var(--accent); color: #fff;
  font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; cursor: pointer;
}
.sr-use:disabled { border-color: var(--border); background: var(--bg-secondary); color: var(--text-dim); cursor: default; }
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
@media (hover: hover) { .sr-undo:hover { color: var(--accent-ink); } }
.sr-why { color: var(--text-dim); }
</style>
