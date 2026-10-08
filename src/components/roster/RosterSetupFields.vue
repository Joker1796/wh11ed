<template>
  <div class="setup-fields">
    <div class="red-choices">
      <label
        v-if="showName"
        class="choice field-tile"
      >
        <span class="ch-label">{{ labels.rosterNameLabel }}</span>
        <input
          class="tile-input"
          type="text"
          :value="name"
          :placeholder="labels.rosterNewName"
          @input="$emit('update:name', $event.target.value)"
        >
      </label>

      <!-- The points limit before the faction (owner, 2026-10-03): how big a game comes first, what
           army second — the order a list is planned in. -->
      <RosterBattleSizeField
        class="choice pick"
        :faction="factionSlug"
        :limit="limit"
        @update:limit="$emit('update:limit', $event)"
      />

      <div class="choice pick">
        <span class="ch-label">{{ labels.rosterFactionLabel }}</span>
        <button
          type="button"
          class="ch-pick"
          @click="$emit('pick-faction')"
        >
          <span
            class="ch-value"
            :class="{ placeholder: !factionName }"
          >{{ factionName || labels.rosterChoose }}</span>
        </button>
        <i class="bi bi-chevron-down" />
      </div>

      <div
        class="choice pick"
        :class="{ off: !hasFaction }"
      >
        <span class="ch-label">
          {{ labels.rosterDetachmentLabel }}
          <ExpandTransition>
            <em
              v-if="hasFaction"
              class="dp-count"
              :class="{ over: checkLegality && !archived && dpSpent > dpLimit }"
            >{{ dpSpent }}<template v-if="Number.isFinite(dpLimit)"> / {{ dpLimit }}</template> DP</em>
          </ExpandTransition>
        </span>
        <DetachmentPicker
          v-model:open="detachmentPickerOpen"
          class="ch-picker"
          :detachments="detachmentOptions"
          :selected="detachments"
          :max-dp="maxDp"
          :dp-spent="dpSpent"
          :faction-slug="factionSlug"
          @toggle="(d) => $emit('toggle-detachment', d)"
          @clear="$emit('clear-detachments')"
        >
          <template #trigger="{ toggle, open }">
            <button
              type="button"
              class="ch-pick"
              :disabled="!hasFaction"
              :aria-expanded="open"
              aria-haspopup="dialog"
              @click="toggle"
            >
              <span
                class="ch-value"
                :class="{ placeholder: !detachmentSummary }"
              >{{ hasFaction ? (detachmentSummary || labels.rosterChoose) : labels.rosterPickFaction }}</span>
            </button>
          </template>
        </DetachmentPicker>
        <i class="bi bi-chevron-down" />
      </div>

      <!-- An army has ONE Force Disposition — the card selected after mustering, on which the
           opponent's symbol names your Primary Mission. One detachment settles it; several are a
           choice, and the LIST is where it is declared. Not a picker: there are never more than a
           handful of candidates, so they fit in the tile that shows the answer. -->
      <ExpandTransition>
        <div
          v-if="dispositionCands.length"
          class="choice"
        >
          <span class="ch-label">{{ dispositionCands.length > 1 ? labels.rosterDispositionDeclared : labels.trackerDisposition }}</span>
          <!-- One candidate is stated; a second detachment turns it into a choice — the change fades. -->
          <Transition
            name="fade"
            mode="out-in"
          >
            <span
              v-if="dispositionCands.length === 1"
              key="one"
              class="ch-value disp-one"
            >{{ dispositionCands[0] }}</span>
            <div
              v-else
              key="many"
              class="seg disp-opts"
            >
              <button
                v-for="d in dispositionCands"
                :key="d"
                :class="{ on: disposition === d }"
                @click="$emit('update:disposition', d)"
              >
                {{ d }}
              </button>
            </div>
          </Transition>
        </div>
      </ExpandTransition>

      <!-- The player's plan for this list, in their own words: read at the table (the view screen
           shows it above its tabs, in a game as well as out of one), never read by a rule. Where the
           list is edited, not where it is started. -->
      <label
        v-if="showNotes"
        class="choice field-tile"
      >
        <span class="ch-label">{{ labels.rosterNotes }}</span>
        <textarea
          class="tile-input notes-input"
          rows="3"
          :maxlength="ROSTER_NOTES_MAX"
          :value="notes"
          @input="$emit('update:notes', $event.target.value)"
        />
      </label>
    </div>

    <!-- An archived list is never checked, whatever this says — so the box says why instead. -->
    <label
      class="check"
      :class="{ on: checkLegality && !archived }"
    >
      <input
        type="checkbox"
        :checked="checkLegality && !archived"
        :disabled="archived"
        @change="$emit('update:checkLegality', $event.target.checked)"
      >
      <span>
        {{ labels.rosterCheckLegality }}
        <em class="check-note">{{ archived ? labels.rosterArchivedNote : labels.rosterCheckLegalityNote }}</em>
      </span>
    </label>
    <!-- No limit, nothing left to count down to. -->
    <ExpandTransition>
      <label
        v-if="limit.battleSize !== UNLIMITED_BATTLE"
        class="check"
        :class="{ on: showPointsLeft }"
      >
        <input
          v-model="showPointsLeft"
          type="checkbox"
        >
        <span>{{ labels.rosterShowPointsLeft }}</span>
      </label>
    </ExpandTransition>
  </div>
</template>

<script setup>
// A list's settings as a form — the creation wizard's step 1 and the editor's Settings tab on a
// phone. The two drew them twice and had drifted apart: the wizard counted Detachment Points and
// explained the one-detachment-over-budget case but spent a full-height field on every answer;
// the editor's one card of rows was half the height but had neither. One card of rows now, with
// the count (2026-09-25). The name row is the wizard's (the editor names the list in its header),
// the notes row the editor's (a plan is written where the list is edited, not where it starts).
// The desk has its own one-line version of the same answers (RosterSettingsBar).
import { computed, ref } from 'vue'
import ExpandTransition from '../ExpandTransition.vue'
import DetachmentPicker from '../tracker/DetachmentPicker.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosterPrefs } from '../../composables/useRosterPrefs.js'
import { ROSTER_NOTES_MAX, UNLIMITED_BATTLE } from '../../composables/rosterEngine.js'
import RosterBattleSizeField from './RosterBattleSizeField.vue'

defineProps({
  showName: { type: Boolean, default: false },
  name: { type: String, default: '' },
  // The points limit as one value (rosterEngine's limitOf), handed to RosterBattleSizeField.
  limit: { type: Object, required: true },
  hasFaction: { type: Boolean, default: false },
  // The list's faction, for the limit dialog's colours (RosterBattleSizeField).
  factionSlug: { type: String, default: '' },
  factionName: { type: String, default: '' },
  detachmentSummary: { type: String, default: '' },
  // What the detachment picker offers and holds (useRosterBuildActions' detachmentOptions and the
  // list's names), against the battle's DP budget.
  detachmentOptions: { type: Array, default: () => [] },
  detachments: { type: Array, default: () => [] },
  maxDp: { type: Number, default: 0 },
  dpSpent: { type: Number, default: 0 },
  // The budget the detachments are held to — 3 for a lone 3 DP one at Incursion (dpLimitFor).
  dpLimit: { type: Number, default: 0 },
  dispositionCands: { type: Array, default: () => [] },
  disposition: { type: String, default: '' },
  showNotes: { type: Boolean, default: false },
  notes: { type: String, default: '' },
  checkLegality: { type: Boolean, default: true },
  archived: { type: Boolean, default: false },
})
defineEmits([
  'update:name', 'update:limit', 'update:disposition',
  'update:notes', 'update:checkLegality', 'pick-faction', 'toggle-detachment', 'clear-detachments',
])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
// A reader's own preference, kept on the device rather than in the list.
const { showPointsLeft } = useRosterPrefs()
const detachmentPickerOpen = ref(false)
</script>

<style scoped>
.setup-fields { display: flex; flex-direction: column; gap: 0.6rem; }

/* ONE card of settings, not five tiles. Each setting used to be its own bordered box that sized
   itself to its own words — a faction name, two detachment names, an empty notes field — so the
   column read as a ragged pile of backgrounds with a different right edge on every row. They are
   rows of one card: one frame, one background, hairlines between them, every row the full width.
   Square corners and a frame doing the separating is the house style (CLAUDE.md, "Corners &
   surfaces"); the same recipe as `.opt-tile` lists elsewhere in the builder. */
.red-choices {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
}
.choice {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 0.15rem;
  padding: 0.5rem 0.75rem;
  border-top: 1px solid var(--border);
  position: relative;
}
.choice:first-child { border-top: none; }
/* A picker row is tapped anywhere: its button's box is stretched over the whole row, so the label,
   the value and the chevron are all one target — while the "?" in the label stays its own button
   on top of it (a button inside a button is not allowed). */
.ch-pick {
  display: block;
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  text-align: left;
  font: inherit;
  color: inherit;
  cursor: pointer;
}
.ch-pick::after { content: ''; position: absolute; inset: 0; }
/* The detachment row's button sits inside DetachmentPicker. Its wrappers must neither narrow it
   (the row is a column aligned to the start) nor become what the overlay above is drawn in —
   PickerDropdown is `position: relative` on a wide screen, and the whole row is the target. */
.ch-picker { align-self: stretch; }
.ch-picker :deep(.pd) { position: static; }
.ch-pick:disabled { cursor: not-allowed; }
.choice.off { opacity: 0.5; }
/* The row lights by its BACKGROUND, the border belonging to the card around it — and behind
   `hover: hover`, because iOS leaves a tap's hover state on until something else is tapped. */
@media (hover: hover) {
  .choice.pick:not(.off):hover { background: var(--bg-secondary); }
  /* A custom points limit: only its head opens the picker, so only the head lights the row. */
  .choice.pick.custom:hover { background: none; }
  .choice.pick.custom:has(.bsf-trigger:hover) { background: var(--bg-secondary); }
}
.choice .bi-chevron-down { position: absolute; right: 0.6rem; top: 0.6rem; color: var(--text-dim); font-size: 0.7rem; }
.ch-label { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); }
.ch-label .help-btn { position: relative; z-index: 1; }
/* A button centres its text, which nobody noticed while every value was one or two words: a list
   of two detachment names wraps, and the wrapped lines sat centred under a left-aligned label. */
.ch-value { display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-primary); padding-right: 0.9rem; text-align: left; }
.ch-value.placeholder { color: var(--text-muted); font-weight: 500; }

.dp-count {
  font-style: normal;
  font-family: var(--font-mono);
  color: var(--text-muted);
  font-weight: 700;
  margin-left: 0.3rem;
  letter-spacing: 0;
  transition: color var(--motion-fast);
}
.dp-count.over { color: var(--danger); }

/* The disposition row holds the global segmented control instead of a value, so it sizes to its
   own words rather than stretching the row. */
.disp-opts { margin-top: 0.15rem; align-self: flex-start; }
.disp-opts button { font-size: 0.78rem; padding: 0.2rem 0.5rem; }



/* A row holding a field rather than a value (the name, the notes): the input stretches to it. */
.tile-input {
  width: 100%;
  margin-top: 0.1rem;
  padding: 0.3rem 0.45rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.85rem;
  line-height: 1.4;
}
.notes-input { resize: vertical; }
.tile-input:focus { outline: none; border-color: var(--accent); }
</style>
