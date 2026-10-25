<template>
  <div class="track-opts">
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

    <template
      v-for="o in mainRows"
      :key="o.id"
    >
      <TrackOptionRow
        :o="o"
        :settings="settings"
        :ctx="ctx"
        :depth="depthOf(o)"
        :enabled="enabledOf(o)"
        :reason="reasonOf(o)"
        :tag="tagOf(o)"
        :held="hostsRow(o)"
        :labels="labels"
        @help="helpFor = $event"
      />
      <!-- The families of switch under the modifier master, folded (owner, 2026-10-14): six rows
           nobody needs to read to start a game. The fold says how many are on. -->
      <div
        v-if="foldRows.length && o.setting === foldParent"
        class="opt-fold"
      >
        <button
          type="button"
          class="opt-fold-head"
          :aria-expanded="foldOpen"
          @click="foldOpen = !foldOpen"
        >
          <ChevronIcon :turned="foldOpen" />
          <span>{{ labels.trackerOptionsDetails }}</span>
          <span class="opt-fold-n">{{ foldOn }}/{{ foldRows.length }}</span>
        </button>
        <CollapseTransition :show="foldOpen">
          <div class="opt-fold-body">
            <TrackOptionRow
              v-for="f in foldRows"
              :key="f.id"
              :o="f"
              :settings="settings"
              :ctx="ctx"
              :enabled="enabledOf(f)"
              :reason="reasonOf(f)"
              :tag="tagOf(f)"
              :held="hostsRow(f)"
              :labels="labels"
              @help="helpFor = $event"
            />
          </div>
        </CollapseTransition>
      </div>
    </template>

    <OptionHelpModal
      v-if="helpFor"
      :title="labels[helpFor.label]"
      :text="helpText(helpFor)"
      @close="helpFor = null"
    >
      <template
        v-if="HELP_DEMOS[helpFor.id]"
        #demo
      >
        <component
          :is="HELP_DEMOS[helpFor.id].is"
          v-bind="HELP_DEMOS[helpFor.id].props"
        />
      </template>
    </OptionHelpModal>
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
import { computed, defineAsyncComponent, ref } from 'vue'
import OptionHelpModal from './OptionHelpModal.vue'

// A row's help can show what the row draws (owner, 2026-10-15): the real component, with example
// data held to the rules by help/demos.test.js. Keyed by the option's id; loaded when opened.
const lazy = (load) => defineAsyncComponent(load)
const Chips = lazy(() => import('./help/ChipsDemo.vue'))
const Score = lazy(() => import('./help/ScoreDemo.vue'))
const chips = (kind) => ({ is: Chips, props: { kind } })
const HELP_DEMOS = {
  cp: { is: lazy(() => import('./help/CpDemo.vue')) },
  phases: { is: lazy(() => import('./help/PhasesDemo.vue')) },
  'phase-rules': { is: lazy(() => import('./help/PhaseRulesDemo.vue')) },
  modifiers: { is: lazy(() => import('./help/ModifiersDemo.vue')) },
  'unit-states': chips('unit-states'),
  'battle-shock': chips('battle-shock'),
  stratagems: chips('stratagems'),
  auras: chips('auras'),
  'ability-sets': chips('ability-sets'),
  'army-states': chips('army-states'),
  'custom-colors': { is: Score, props: { kind: 'colors' } },
}
import TrackOptionRow from './TrackOptionRow.vue'
import CollapseTransition from '../CollapseTransition.vue'
import ChevronIcon from '../ChevronIcon.vue'
import { optionsIn, optionEnabled, requiresOf, depthOf, tracks } from '../../data/trackerOptions.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  settings: { type: Object, required: true },
  // { you: { faction, trackable }, opp: { faction, trackable }, anyRoster } — see trackerOptions.js
  ctx: { type: Object, required: true },
  group: { type: String, default: 'turn' },
  heading: { type: String, default: 'trackerTrackHeading' },
  // The link out to the guide belongs to one block on the screen (beside its heading), not to each.
  guide: { type: Boolean, default: false },
  // A guest in a shared game: only the rows marked `local` in the table are this phone's to flip;
  // the rest are the host's, drawn disabled with that as the reason.
  lockShared: { type: Boolean, default: false },
  // The host of a shared game (the lobby's wizard, the game's setup dialog): the rows it decides
  // for every phone say so (`everyPhone`); the rest each phone picks for itself.
  shared: { type: Boolean, default: false },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const rows = computed(() => optionsIn(props.group))
const mainRows = computed(() => rows.value.filter((o) => !o.fold))
const foldRows = computed(() => rows.value.filter((o) => o.fold))
const foldParent = computed(() => requiresOf(foldRows.value[0])[0] || null)
const foldOpen = ref(false)
const foldOn = computed(() => foldRows.value.filter((o) => enabledOf(o) && props.settings[o.setting]).length)
const helpFor = ref(null)

// A child row is dead while its parent is off, on top of whatever the game itself allows.
function hostsRow(o) {
  return props.lockShared && !o.local
}
function enabledOf(o) {
  if (hostsRow(o) || !optionEnabled(o, props.ctx)) return false
  // `tracks` follows the whole chain — Stratagems under CP, the family under both
  return requiresOf(o).every((r) => tracks(props.settings, r))
}
function reasonOf(o) {
  if (hostsRow(o)) return 'partyHostOnly'
  return o.unavailable?.(props.ctx) || null
}
function tagOf(o) {
  return props.shared && !props.lockShared && o.everyPhone ? 'trackerOnEveryPhone' : null
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
  color: var(--text-muted);
  margin: 0;
}
.opt-fold { margin: 0.5rem 0 0 1.1rem; }
.opt-fold + :deep(.opt-row) { margin-top: 0.5rem; }
.opt-fold-head {
  display: flex; align-items: center; gap: 0.4rem;
  width: 100%; min-height: 36px; padding: 0.3rem 0.5rem;
  border: 1px dashed var(--border); background: none;
  color: var(--text-muted); font: inherit; font-size: 0.86rem; text-align: left; cursor: pointer;
}
@media (hover: hover) { .opt-fold-head:hover { color: var(--accent-ink); border-color: var(--accent); } }
.opt-fold-n { margin-left: auto; font-size: 0.78rem; color: var(--text-dim); }
.opt-fold-body { padding-top: 0.5rem; }
.opt-fold-body :deep(.opt-row.child) { margin-left: 0; }
.opt-guide {
  font-size: 0.78rem;
  color: var(--text-dim);
}
.opt-guide:hover { color: var(--accent-ink); }
</style>
