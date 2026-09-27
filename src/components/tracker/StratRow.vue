<template>
  <li
    class="sr"
    :class="{ locked }"
  >
    <button
      class="sr-main"
      @click="$emit('open')"
    >
      <span class="sr-name">{{ strat.name }}</span>
      <span
        v-if="strat.when"
        class="sr-when"
        v-html="renderInline(strat.when)"
      />
    </button>
    <div class="sr-ctrl">
      <!-- A flat gear: the cost changed by a rule, −1 / +1, marked on the gear when on. -->
      <button
        class="sr-gear"
        :class="{ modified: mod !== 0 }"
        :aria-label="labels.trackerStratModify"
        :title="labels.trackerStratModify"
        @click="$emit('modify')"
      >
        <i
          class="bi bi-gear-fill"
          aria-hidden="true"
        />
        <span
          v-if="mod !== 0"
          class="sr-mod"
        >{{ mod < 0 ? '−1' : '+1' }}</span>
      </button>
      <!-- The cost it would be spent at, in one tap. -->
      <button
        class="sr-use"
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

// One stratagem in the CP tab: name and timing (tap for the full card), the cost-change gear
// and the cost button. Pure presentation — CpStratagems decides every number and the reason.
defineProps({
  strat: { type: Object, required: true },
  cost: { type: Number, required: true },
  mod: { type: Number, default: 0 },
  used: { type: Number, default: 0 },
  undoable: { type: Boolean, default: false },
  reason: { type: String, default: '' },
  title: { type: String, default: '' },
  locked: { type: Boolean, default: false },
})
defineEmits(['open', 'modify', 'use', 'undo'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { renderInline } = useRenderInline()
</script>

<style scoped>
.sr {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 0.5rem;
  padding: 0.55rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
}
.sr-main { min-width: 0; padding: 0; border: 0; background: none; text-align: left; font: inherit; cursor: pointer; }
.sr-name {
  display: block;
  font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; line-height: 1.1;
  text-transform: uppercase; color: var(--text-primary);
}
/* The timing: two lines at most — the full text is one tap away. */
.sr-when {
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  margin-top: 0.2rem; font-size: 0.8rem; line-height: 1.35; color: var(--text-muted);
}
.sr-ctrl { display: flex; align-items: flex-start; gap: 0.3rem; }
.sr-gear {
  position: relative;
  width: 44px; height: 44px;
  border: 1px solid var(--border); background: var(--bg-secondary);
  color: var(--text-muted); font-size: 1.05rem; cursor: pointer;
}
.sr-gear.modified { border-color: var(--accent); color: var(--accent); }
.sr-mod {
  position: absolute; right: -1px; bottom: -1px;
  padding: 0 0.2rem; background: var(--accent); color: #fff;
  font-size: 0.66rem; font-weight: 700; line-height: 1.3;
}
.sr-use {
  min-width: 60px; height: 44px; padding: 0 0.5rem;
  border: 1px solid var(--accent); background: var(--accent); color: #fff;
  font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; cursor: pointer;
}
.sr-use:disabled { border-color: var(--border); background: var(--bg-secondary); color: var(--text-dim); cursor: default; }
.sr-foot {
  grid-column: 1 / -1;
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.2rem 0.75rem;
  margin-top: 0.35rem; font-size: 0.78rem;
}
.sr-used { font-weight: 700; color: var(--accent); }
.sr-undo {
  display: inline-flex; align-items: center; gap: 0.25rem;
  min-height: 28px; padding: 0; border: 0; background: none;
  font: inherit; font-weight: 600; color: var(--text-muted); cursor: pointer;
}
@media (hover: hover) { .sr-undo:hover { color: var(--accent); } }
.sr-why { color: var(--text-dim); }
</style>
