<template>
  <button
    type="button"
    class="det"
    :class="{ on, compact }"
  >
    <span class="det-main">
      <!-- On the desk's one-line row the tag stands right after the name (owner, 2026-10-03); the
           phone's two-line card keeps it on the second line, left of the dispositions. -->
      <span class="det-title">
        <span class="det-name">{{ name }}</span>
        <template v-if="compact">
          <span
            v-if="unique"
            class="det-unique"
          >{{ unique }}</span>
          <span
            v-if="tag"
            class="det-unique"
          >{{ tag }}</span>
        </template>
      </span>
      <span
        v-if="nameRu"
        class="det-name-ru"
      >{{ nameRu }}</span>
    </span>
    <span
      v-if="dp"
      class="det-dp"
    >{{ dp }} DP</span>
    <!-- A line of its own under the name and the cost: on the phone's card the tag on the left, the
         dispositions on the right (owner, 2026-10-01). Beside the name, two dispositions squeezed
         it onto two lines on a phone. -->
    <span
      v-if="forceDispositions.length || (!compact && (unique || tag))"
      class="det-foot"
    >
      <template v-if="!compact">
        <span
          v-if="unique"
          class="det-unique"
        >{{ unique }}</span>
        <span
          v-if="tag"
          class="det-unique"
        >{{ tag }}</span>
      </template>
      <span
        v-if="forceDispositions.length"
        class="det-fds"
      >
        <span
          v-for="fd in forceDispositions"
          :key="fd"
          class="tone tone-chip"
          :style="toneVars(dispositionColor(fd))"
        >{{ fd }}</span>
      </span>
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
// reading (dispositionColors.js). A detachment that gives access to two (core rules 25.04 — 39 of
// them in MFM v1.5) wears two chips, each in its own colour. The DP cost sits on the right of the
// name, where a cost is looked for; the tag and the dispositions take a line of their own under both
// (owner, 2026-10-01). (A coloured stripe on the row's edge went, at the owner's word,
// 2026-09-25: the chip already says it.) Every field but `name` is optional: the faction bar reuses its
// picker for the Chapter list, which is plain names.
// (Said here, not above the <button>: a comment before the root makes the component a Fragment.)
import { toneVars } from '../utils/tone.js'
import { dispositionColor } from '../data/dispositionColors.js'

defineProps({
  name: { type: String, required: true },
  nameRu: { type: String, default: '' },
  forceDispositions: { type: Array, default: () => [] },
  // The detachment's UNIQUE tag, and a second quiet keyword (the Chapter a detachment is locked to).
  unique: { type: String, default: '' },
  tag: { type: String, default: '' },
  dp: { type: Number, default: 0 },
  on: { type: Boolean, default: false },
  // One line instead of a card: the desk's dropdown, where a list of cards was a screen tall
  // (owner, 2026-10-01). Name on the left, cost and dispositions in a row on the right.
  compact: { type: Boolean, default: false },
})


</script>

<style scoped>
/* flex-shrink 0: the lists this sits in are flex columns (`.modal-list`), and with an explicit
   min-height a row may shrink to it once the list is taller than the dialog — the faction picker's
   three-line rows (name, RU name, disposition) then drew over each other (owner, 2026-09-25). */
.det {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  flex-shrink: 0;
  align-items: center;
  gap: 0.35rem 0.6rem;
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
}

.det-name {
  font-family: var(--font-display);
  font-size: 1.2rem; /* the row's headline — 0.95rem read smaller than its own price (owner) */
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

/* RU translation of the name — a small muted line held close under the English one: a caption of
   the name, not a line of its own (owner, 2026-10-01). */
.det-name-ru {
  line-height: 1.2;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
}


.det-title { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 0.45rem; }
.det-unique {
  font-size: 0.74rem; /* 0.66rem until 2026-10-03 — too small to read beside the name (owner) */
  color: var(--text-dim);
  font-family: var(--font-mono);
  text-transform: uppercase;
}


/* The second line, across the whole row: the phone card's tag left, the dispositions right. */
.det-foot {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem 0.4rem;
}
.det-fds {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.3rem;
  margin-left: auto;
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

/* The dropdown's row: one line — name, then the tag and the dispositions, the cost a plain figure
   rather than a boxed plate at the end. */
.det.compact { display: flex; flex-wrap: wrap; align-items: center; min-height: 36px; padding: 0.3rem 0.5rem; gap: 0.3rem 0.5rem; }
/* The name never breaks; a row that still runs out of width wraps whatever is to its right. */
.det.compact .det-main { flex: 1 0 auto; white-space: nowrap; }
.det.compact .det-foot { margin-left: auto; }
/* A tag and two dispositions used to send a row onto two lines by rule (2026-10-01, Awakened
   Dynasty). Measured on 2026-10-03 across all 30 factions in both locales, every such row fits one
   line of the roster desk's 32rem dropdown (a 496px row) — the six with a tag and two dispositions
   need at most 465px with the tag after the name at 0.74rem (T'au's Retaliation Cadre) — so the
   rule went and the wrap above is only the fallback. */
.det.compact .det-name { font-size: 1.15rem; }
/* The RU caption in the name's own narrow face, so the pair reads as one heading (owner, 2026-10-01). */
.det.compact .det-name-ru { font-family: var(--font-display); font-size: 1rem; font-weight: 400; line-height: 1; margin-top: -0.1rem; }
.det.compact .det-foot { flex-wrap: nowrap; }
.det.compact .det-fds { flex-wrap: nowrap; }
/* Smaller chips than the card's: two of them beside a long name must still leave it one line. */
.det.compact .tone-chip { font-size: 0.6rem; padding: 0.05rem 0.3rem; }
/* The cost's plate the height of a disposition chip beside it. */
.det.compact .det-dp { order: 1; padding: 0.05rem 0.35rem; font-size: 0.7rem; line-height: 1.3; }
</style>
