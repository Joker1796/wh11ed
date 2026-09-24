<template>
  <button
    type="button"
    class="det"
    :class="{ on, tone: !!tone }"
    :style="tone"
  >
    <span class="det-main">
      <span class="det-name">{{ name }}</span>
      <span
        v-if="nameRu"
        class="det-name-ru"
      >{{ nameRu }}</span>
      <span
        v-if="unique || tag"
        class="det-tags"
      >
        <span
          v-if="unique"
          class="det-unique"
        >{{ unique }}</span>
        <span
          v-if="tag"
          class="det-unique"
        >{{ tag }}</span>
      </span>
    </span>
    <!-- The cost and, under it, the disposition — the two facts a detachment is chosen by, in one
         column on the right (owner, 2026-09-25); the names keep the left to themselves. -->
    <span
      v-if="dp || forceDisposition"
      class="det-side"
    >
      <span
        v-if="dp"
        class="det-dp"
      >{{ dp }} DP</span>
      <span
        v-if="forceDisposition"
        class="tone-chip"
      >{{ forceDisposition }}</span>
    </span>
  </button>
</template>

<script setup>
// One detachment in a list of them — the faction pages' picker and the roster builder's draw
// exactly this row, and until 2026-09-24 each drew its own: the faction one never got the Force
// Disposition colour the roster one wore (a player's report). The modals around it stay apart
// (one pick vs. several under a DP budget); only the row is shared.
//
// Each row wears its disposition's colour on the chip under the price, because the disposition is
// what a detachment is FOR, and five of them down a list are told apart faster by hue than by
// reading (dispositionColors.js). The DP cost sits on the right, where a cost is looked for, with
// the disposition under it. (A coloured stripe on the row's edge went, at the owner's word,
// 2026-09-25: the chip already says it.) Every field but `name` is optional: the faction bar reuses its
// picker for the Chapter list, which is plain names.
// (Said here, not above the <button>: a comment before the root makes the component a Fragment.)
import { computed } from 'vue'
import { dispositionColor } from '../data/dispositionColors.js'

const props = defineProps({
  name: { type: String, required: true },
  nameRu: { type: String, default: '' },
  forceDisposition: { type: String, default: '' },
  // The detachment's UNIQUE tag, and a second quiet keyword (the Chapter a detachment is locked to).
  unique: { type: String, default: '' },
  tag: { type: String, default: '' },
  dp: { type: Number, default: 0 },
  on: { type: Boolean, default: false },
})

const tone = computed(() => {
  const c = props.forceDisposition && dispositionColor(props.forceDisposition)
  return c ? { '--tone-light': c.light, '--tone-dark': c.dark } : null
})
</script>

<style scoped>
/* flex-shrink 0: the lists this sits in are flex columns (`.modal-list`), and with an explicit
   min-height a row may shrink to it once the list is taller than the dialog — the faction picker's
   three-line rows (name, RU name, disposition) then drew over each other (owner, 2026-09-25). */
.det {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 44px;
  padding: 0.4rem 0.55rem;
  text-align: left;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  cursor: pointer;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}

@media (hover: hover) {
  .det:hover { border-color: var(--accent); }
}

.det.on {
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  border-color: var(--accent);
}

.det-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
}

.det-name {
  font-family: var(--font-display);
  font-size: 1.2rem; /* the row's headline — 0.95rem read smaller than its own price (owner) */
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

/* RU translation of the name — a small muted line under the English one. */
.det-name-ru {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
}

.det-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}

.det-unique {
  font-size: 0.66rem;
  color: var(--text-dim);
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.det-side {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
}

.det-dp {
  flex-shrink: 0;
  padding: 0.25rem 0.55rem;
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
}

.det.on .det-dp {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
