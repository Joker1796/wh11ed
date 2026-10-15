<template>
  <div class="ht">
    <template
      v-for="(b, i) in blocks"
      :key="i"
    >
      <ul
        v-if="b.t === 'ul'"
        class="ht-list"
      >
        <li
          v-for="(item, k) in b.items"
          :key="k"
          v-safe-html="item"
        />
      </ul>
      <p
        v-else-if="b.t === 'off'"
        class="ht-off"
      >
        <i
          class="wi wi-eye-off"
          aria-hidden="true"
        />
        <span v-safe-html="b.html" />
      </p>
      <p
        v-else
        v-safe-html="b.html"
        :class="b.t === 'lead' ? 'ht-lead' : 'ht-p'"
      />
    </template>
  </div>
</template>

<script setup>
// The tracker's help texts, set the one way (owner, 2026-10-15: "a wall of text, no formatting,
// nothing picked out"). A text is lines in ui.js:
//   the first line          — the lead: what it is and where, in one sentence
//   "▪ …"                   — a point (consecutive points are one list)
//   "⊘ …"                   — what changes when it is off, muted, after an eye-off mark
//   anything else           — a plain paragraph
//   **word**                — a key word, in the accent
// Blank lines are ignored. The parse is helpText.js, pure and tested.
import { computed } from 'vue'
import { vSafeHtml } from '../../directives/safeHtml.js'
import { helpBlocks } from './helpText.js'

const props = defineProps({ text: { type: String, default: '' } })
const blocks = computed(() => helpBlocks(props.text))
</script>

<style scoped>
.ht { font-size: 0.85rem; line-height: 1.45; color: var(--text-muted); }
.ht > * { margin: 0 0 0.5rem; }
.ht > :last-child { margin-bottom: 0; }
.ht-lead { font-weight: 600; color: var(--text-primary); }
.ht-list { padding-left: 1.1rem; }
.ht-list li + li { margin-top: 0.2rem; }
.ht-off { display: flex; gap: 0.4rem; align-items: baseline; font-size: 0.8rem; color: var(--text-dim); }
.ht-off .wi { flex-shrink: 0; margin: 0; }
.ht :deep(strong) { font-weight: 700; color: var(--accent-ink); }
</style>
