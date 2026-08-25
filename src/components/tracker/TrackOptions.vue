<template>
  <div class="track-opts">
    <h3 class="block-head">{{ labels[heading] }}</h3>

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
      <label class="check" :class="{ on: enabledOf(o) && settings[o.setting] }">
        <input
          type="checkbox"
          v-model="settings[o.setting]"
          :disabled="!enabledOf(o)"
        />
        <span>
          {{ labels[o.label] }}
          <!-- Why a row cannot be flipped, or a caveat about what flipping it will get you. The
               first replaces the second: a row nobody can touch has nothing to caveat. -->
          <em v-if="reasonOf(o)" class="check-note">{{ labels[reasonOf(o)] }}</em>
        </span>
      </label>
      <!-- Live even for a disabled row: what a greyed-out option WOULD do is exactly what you
           want to read while it is greyed out. -->
      <button
        type="button"
        class="opt-info"
        :aria-label="`${labels[o.label]} — ${labels.trackerOptionHelp}`"
        @click="helpFor = o"
      ><i class="bi bi-question-circle"></i></button>
    </div>

    <div v-if="guide" class="opt-guide-row">
      <RouterLink class="opt-guide" to="/help/tracker">{{ labels.trackerTrackGuide }}</RouterLink>
    </div>

    <OptionHelpModal
      v-if="helpFor"
      :title="labels[helpFor.label]"
      :text="labels[helpFor.help]"
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
import { computed, ref } from 'vue'
import OptionHelpModal from './OptionHelpModal.vue'
import { optionsIn, optionEnabled } from '../../data/trackerOptions.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  settings: { type: Object, required: true },
  // { you: { faction, trackable }, opp: { faction, trackable }, anyRoster } — see trackerOptions.js
  ctx: { type: Object, required: true },
  group: { type: String, default: 'game' },
  heading: { type: String, default: 'trackerTrackHeading' },
  // The link out to the guide belongs to the last block on the screen, not to each of them.
  guide: { type: Boolean, default: false },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const rows = computed(() => optionsIn(props.group))
const helpFor = ref(null)

// A child row is dead while its parent is off, on top of whatever the game itself allows.
function enabledOf(o) {
  if (!optionEnabled(o, props.ctx)) return false
  return !o.requires || props.settings[o.requires] !== false
}
function reasonOf(o) {
  return o.unavailable?.(props.ctx) || (enabledOf(o) ? o.note?.(props.ctx) : null) || null
}
</script>

<style scoped>
.track-opts { flex: 1 1 100%; }
.block-head {
  font-family: var(--font-display);
  font-size: 1.21rem;
  font-weight: 500;
  color: var(--accent);
  margin: 0 0 0.6rem;
}
.opt-row { display: flex; align-items: stretch; }
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
/* Whichever half is lit paints its own frame over that shared line — without this the quiet
   half's grey pixels sit on top and the accent frame stops halfway. */
.check.on,
.check:hover,
.opt-info:hover { position: relative; z-index: 1; }
.opt-info:hover { color: var(--accent); border-color: var(--accent); }
.opt-guide-row { margin-top: 0.6rem; }
.opt-guide {
  font-size: 0.78rem;
  color: var(--text-dim);
}
.opt-guide:hover { color: var(--accent); }
</style>
