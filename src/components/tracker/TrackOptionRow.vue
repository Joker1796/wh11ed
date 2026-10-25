<template>
  <!-- One row of the option table: a checkbox and the "i" beside it. A <label> forwards any click
       inside it to its control, so the help button cannot live in there — it would silently flip
       the setting it explains. The two sit side by side instead, sharing one dividing line.
       A row that cannot be flipped shows as off: a pale tick under a switched-off parent read as
       "on" (QA, 2026-10-17); its stored value stays and comes back with the parent. The one
       exception is the host's row on a guest's phone (`held`): it is the game's answer, so it
       shows what the host chose — "off" there read as "the host does not count CP". -->
  <div
    class="opt-row"
    :class="{ off: !enabled, child: depth > 0 }"
    :style="depth > 1 ? { marginLeft: `${depth * 1.1}rem` } : null"
  >
    <label
      class="check"
      :class="{ on: shown }"
    >
      <input
        type="checkbox"
        :checked="shown"
        :disabled="!enabled"
        @change="settings[o.setting] = $event.target.checked"
      >
      <span>
        {{ labels[o.label] }}
        <!-- In a shared game, a row the host decides for every phone (`local` rows are each
             phone's own and say nothing — they are the many, and on one phone it is every row). -->
        <small
          v-if="tag"
          class="opt-local"
        >{{ labels[tag] }}</small>
        <!-- Why a row cannot be flipped. A caveat about what flipping it will get you (`note`)
             goes into the row's help instead (owner, 2026-10-02). -->
        <ExpandTransition>
          <em
            v-if="reason"
            class="check-note"
          >{{ labels[reason] }}</em>
        </ExpandTransition>
      </span>
    </label>
    <!-- Live even for a disabled row: what a greyed-out option WOULD do is exactly what you
         want to read while it is greyed out. -->
    <button
      type="button"
      class="opt-info"
      :aria-label="`${labels[o.label]} — ${labels.trackerOptionHelp}`"
      @click="$emit('help', o)"
    >
      <i class="wi wi-help" />
    </button>
    <!-- What the choice looks like, under its row: both sides' cards in the colours it gives,
         and while the row is on, a colour picker over each (the picks are settings.sideColors). -->
    <SideColorPreview
      v-if="o.preview === 'sideColors'"
      class="opt-preview"
      :you="ctx.you.faction"
      :opp="ctx.opp.faction"
      :editable="enabled && !!settings[o.setting]"
      :picks="enabled && settings[o.setting] ? settings.sideColors || {} : null"
      @update:picks="(v) => (settings.sideColors = v)"
    />
  </div>
</template>

<script setup>
// One row of TrackOptions.vue — drawn in its list and inside its "Details" fold alike. `settings`
// is the caller's draft, written in place (see TrackOptions).
import ExpandTransition from '../ExpandTransition.vue'
import SideColorPreview from './SideColorPreview.vue'
import { computed } from 'vue'
import { tracks } from '../../data/trackerOptions.js'

const props = defineProps({
  o: { type: Object, required: true },
  settings: { type: Object, required: true },
  ctx: { type: Object, required: true },
  enabled: { type: Boolean, default: true },
  // Indented under its parent — only when the parent is in the same group (askStratagems hangs off
  // CP, which is in another block: indented there it read as a child of the row above it).
  // How far in it is drawn: 1 under its parent, 2 under a child (trackerOptions' depthOf).
  depth: { type: Number, default: 0 },
  reason: { type: String, default: null },
  // The host's row on a guest's phone: shown at the host's value though it cannot be flipped.
  held: { type: Boolean, default: false },
  // A caption under the label, as a ui.js key (TrackOptions' `shared`).
  tag: { type: String, default: null },
  labels: { type: Object, required: true },
})
defineEmits(['help'])
const shown = computed(() => (props.held ? tracks(props.settings, props.o.setting) : props.enabled && !!props.settings[props.o.setting]))
</script>

<style scoped>
.opt-row { display: flex; flex-wrap: wrap; align-items: stretch; }
.opt-preview { flex: 1 1 100%; margin-top: 0.4rem; }
.opt-row + .opt-row { margin-top: 0.5rem; }
.opt-row .check { flex: 1; min-width: 0; }
/* A row that hangs off the one above it is indented under it, so the block reads as the tree it
   is rather than as eight equal switches. */
.opt-row.child { margin-left: 1.1rem; }
/* Dimmed, not removed. The row still says what it is and still opens its help — it just cannot
   be flipped here. */
.opt-row.off .check { opacity: 0.55; cursor: default; }
.opt-row.off .check:hover { border-color: var(--border); }
.opt-local { display: block; font-size: 0.74rem; color: var(--text-dim); font-weight: 400; }
.opt-info {
  display: inline-flex;
  align-items: center;
  padding: 0 0.6rem;
  margin-left: -1px;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-muted);
  font-size: 0.9rem;
  cursor: pointer;
}
/* Whichever half is hovered paints its own frame over that shared line — without this the quiet
   half's grey pixels sit on top and the accent frame stops halfway. */
.check:hover,
.opt-info:hover { position: relative; z-index: 1; }
.opt-info:hover { color: var(--accent-ink); border-color: var(--accent); }
</style>
