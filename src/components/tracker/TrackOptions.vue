<template>
  <div
    class="track-opts"
    :class="{ inline }"
  >
    <!-- The link out to the guide sits opposite the heading (2026-10-02, owner): under the last
         row it read as one more line of the list. -->
    <div class="opt-head">
      <h3 class="block-head">
        {{ labels[heading] }}
      </h3>
      <RouterLink
        v-if="guide"
        class="opt-guide"
        to="/help/tracker"
      >
        {{ labels.trackerTrackGuide }}
      </RouterLink>
    </div>

    <!-- A checkbox and the "i" beside it. A <label> forwards any click inside it to its control,
         so the help button cannot live in there — it would silently flip the setting it explains.
         The two sit side by side instead, sharing one dividing line, the same pair the roster's
         condition chips use. -->
    <div
      v-for="o in rows"
      :key="o.id"
      class="opt-row"
      :class="{ off: !enabledOf(o), child: !!o.requires }"
    >
      <label
        class="check"
        :class="{ on: enabledOf(o) && settings[o.setting] }"
      >
        <input
          v-model="settings[o.setting]"
          type="checkbox"
          :disabled="!enabledOf(o)"
        >
        <span>
          {{ labels[o.label] }}
          <!-- Why a row cannot be flipped. A caveat about what flipping it will get you (`note`)
               goes into the row's help instead: under the caption it made that one row taller
               than the rest (owner, 2026-10-02). -->
          <ExpandTransition>
            <em
              v-if="reasonOf(o)"
              class="check-note"
            >{{ labels[reasonOf(o)] }}</em>
          </ExpandTransition>
        </span>
      </label>
      <!-- Live even for a disabled row: what a greyed-out option WOULD do is exactly what you
           want to read while it is greyed out. -->
      <button
        type="button"
        class="opt-info"
        :aria-label="`${labels[o.label]} — ${labels.trackerOptionHelp}`"
        @click="helpFor = o"
      >
        <i class="bi bi-question-circle" />
      </button>
      <!-- What the choice looks like, under its row: both sides' cards in the colours it gives,
           and while the row is on, a colour picker over each (the picks are settings.sideColors). -->
      <SideColorPreview
        v-if="o.preview === 'sideColors'"
        class="opt-preview"
        :you="ctx.you.faction"
        :opp="ctx.opp.faction"
        :editable="enabledOf(o) && !!settings[o.setting]"
        :picks="enabledOf(o) && settings[o.setting] ? settings.sideColors || {} : null"
        @update:picks="(v) => (settings.sideColors = v)"
      />
    </div>

    <OptionHelpModal
      v-if="helpFor"
      :title="labels[helpFor.label]"
      :text="helpText(helpFor)"
      @close="helpFor = null"
    />
  </div>
</template>

<script setup>
// One block of the option table (src/data/trackerOptions.js) — the same component in the setup
// wizard and in EditSetupModal, so a row offered in one is offered in the other. This component
// only draws the rows and hands each its help.
//
// EVERY row of the group is drawn, always. A row this game cannot offer is disabled and says why;
// it is never dropped from the list. See the table's header for why.
//
// `settings` is the caller's own reactive draft and is written in place (v-model straight onto
// its fields) — the wizard commits it on Start, the dialog on Save, and neither wants an
// intermediate copy that could fall out of step.
import ExpandTransition from '../ExpandTransition.vue'
import { computed, ref } from 'vue'
import OptionHelpModal from './OptionHelpModal.vue'
import SideColorPreview from './SideColorPreview.vue'
import { optionsIn, optionEnabled } from '../../data/trackerOptions.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  settings: { type: Object, required: true },
  // { you: { faction, trackable }, opp: { faction, trackable }, anyRoster } — see trackerOptions.js
  ctx: { type: Object, required: true },
  group: { type: String, default: 'game' },
  heading: { type: String, default: 'trackerTrackHeading' },
  // The link out to the guide belongs to one block on the screen (beside its heading), not to each.
  guide: { type: Boolean, default: false },
  // A one-row block: the heading and the row share a line, the row's preview runs full width
  // under both (the side colours, 2026-10-02). A phone stacks it as usual.
  inline: { type: Boolean, default: false },
  // A guest in a shared game: only the rows marked `local` in the table are this phone's to flip;
  // the rest are the host's, drawn disabled with that as the reason.
  lockShared: { type: Boolean, default: false },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const rows = computed(() => optionsIn(props.group))
const helpFor = ref(null)

// A child row is dead while its parent is off, on top of whatever the game itself allows.
function hostsRow(o) {
  return props.lockShared && !o.local
}
function enabledOf(o) {
  if (hostsRow(o) || !optionEnabled(o, props.ctx)) return false
  return !o.requires || props.settings[o.requires] !== false
}
function reasonOf(o) {
  if (hostsRow(o)) return 'partyHostOnly'
  return o.unavailable?.(props.ctx) || null
}
// The help, with the row's caveat for THIS game as its last paragraph — a row nobody can touch
// has nothing to caveat.
function helpText(o) {
  const note = enabledOf(o) ? o.note?.(props.ctx) : null
  return note ? `${labels.value[o.help]}\n\n${labels.value[note]}` : labels.value[o.help]
}
</script>

<style scoped>
.track-opts { flex: 1 1 100%; }
.opt-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  column-gap: 0.75rem;
  margin: 0 0 0.6rem;
}
.block-head {
  font-family: var(--font-display);
  font-size: 1.21rem;
  font-weight: 500;
  color: var(--accent);
  margin: 0;
}
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
   half's grey pixels sit on top and the accent frame stops halfway. Only hover: a ticked row no
   longer takes an accent border, so it has no frame to win with. */
.check:hover,
.opt-info:hover { position: relative; z-index: 1; }
.opt-info:hover { color: var(--accent); border-color: var(--accent); }
.opt-guide {
  font-size: 0.78rem;
  color: var(--text-dim);
}
.opt-guide:hover { color: var(--accent); }
@media (min-width: 561px) {
  .track-opts.inline {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
  }
  /* The gap is the heading's own margin: a column-gap would split the row from its "?". */
  .inline .opt-head { margin: 0 0.85rem 0 0; align-self: center; }
  .inline .opt-row { display: contents; }
  .inline .opt-preview { grid-column: 1 / -1; }
}
</style>
