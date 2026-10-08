<!-- Everything a list IS, on one line above the columns that decide what is IN it: name, faction,
     detachments, battle size, Force Disposition, and the points it currently spends.

     This exists because on a desktop those answers were a screen away from the work — the
     editor's Settings tab, the wizard's step 1 — and the questions they answer come up WHILE
     building ("can I still afford this", "does my detachment offer that enhancement"), not once
     before it. The two narrow layouts keep the tab and the step: a phone has no line to spare.

     It holds no state of its own. Both callers already own a roster (the editor edits the store's
     object, the wizard its draft's fields), so this reports and emits, and even the pickers it
     opens report back rather than writing — the two callers do different things with the same
     answer (the wizard's faction pick also creates the draft). -->
<template>
  <div class="rw-bar">
    <!-- The editor already has the name as its page header, in full display type; repeating it
         here would be two inputs for one field. The wizard has no such header, so it shows it. -->
    <label
      v-if="showName"
      class="rw-field rw-name"
    >
      <span>{{ labels.rosterNameLabel }}</span>
      <input
        type="text"
        :value="name"
        :placeholder="labels.rosterNewName"
        @input="$emit('update:name', $event.target.value)"
      >
    </label>

    <!-- The points limit before the faction (owner, 2026-10-03), as on the phone's form. What it
         decides besides the points is said in the picker's own rows; once chosen, the line shows
         the value alone. -->
    <div class="rw-field">
      <span>{{ labels.rosterPointsLimitLabel }}</span>
      <RosterBattleSizeField
        variant="bar"
        :faction="factionSlug"
        :limit="limit"
        @update:limit="$emit('update:limit', $event)"
      />
    </div>

    <!-- The pickers drop down under their fields rather than covering the screen (owner,
         2026-10-01), with the modal's own rows inside (PickerDropdown). -->
    <div class="rw-field">
      <span>{{ labels.rosterFactionLabel }}</span>
      <PickerDropdown
        v-model:open="factionPickerOpen"
        width="32rem"
        :label="labels.trackerSelectFaction"
      >
        <template #trigger="{ toggle, open }">
          <button
            class="rw-choose"
            :aria-expanded="open"
            aria-haspopup="dialog"
            @click="toggle"
          >
            <span :class="{ placeholder: !factionSlug }">{{ factionName || labels.rosterChoose }}</span>
            <i class="bi bi-chevron-down" />
          </button>
        </template>
        <FactionPickerList
          compact
          :selected="factionSlug"
          @pick="(slug) => { factionPickerOpen = false; $emit('pick-faction', slug) }"
        />
      </PickerDropdown>
    </div>

    <div class="rw-field">
      <span>
        {{ labels.rosterDetachmentLabel }}
        <ExpandTransition>
          <em
            v-if="factionSlug"
            class="dp-count"
            :class="{ over: checkLegality && !archived && dpSpent > dpLimit }"
          >{{ dpSpent }}<template v-if="Number.isFinite(dpLimit)"> / {{ dpLimit }}</template> DP</em>
        </ExpandTransition>
      </span>
      <!-- Several can be taken under the DP budget, so a pick leaves it open; a click outside or
           Escape closes it. -->
      <DetachmentPicker
        v-model:open="detachmentPickerOpen"
        panel-width="32rem"
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
            class="rw-choose"
            :disabled="!factionSlug"
            :aria-expanded="open"
            aria-haspopup="dialog"
            @click="toggle"
          >
            <span :class="{ placeholder: !detachments.length }">{{ detachmentSummary || labels.rosterChoose }}</span>
            <i class="bi bi-chevron-down" />
          </button>
        </template>
      </DetachmentPicker>
    </div>

    <!-- An army has ONE Force Disposition. One on offer settles it and there is nothing to ask;
         several make it a declaration, and the list is where it is declared — here a dropdown, in
         the shape of the faction and detachment fields beside it (owner, 2026-10-01: on one line
         a row of buttons was the odd one out). The phone's form keeps its segmented control. -->
    <!-- What appears on this line as the list takes shape — the declared disposition, the DP
         count, the custom limit's sliders — opens by sliding its neighbours aside and closes the
         same way (ExpandTransition, owner 2026-10-03). -->
    <ExpandTransition>
      <div
        v-if="factionSlug && dispositionCands.length"
        class="rw-field"
      >
        <span>{{ dispositionCands.length > 1 ? labels.rosterDispositionDeclared : labels.trackerDisposition }}</span>
        <span
          v-if="dispositionCands.length === 1"
          class="rw-static"
        >{{ dispositionCands[0] }}</span>
        <PickerDropdown
          v-else
          v-model:open="dispositionPickerOpen"
          class="rw-fd"
          width="12rem"
          align="right"
          :label="labels.rosterDispositionDeclared"
        >
          <template #trigger="{ toggle, open }">
            <button
              class="rw-choose"
              :aria-expanded="open"
              aria-haspopup="dialog"
              @click="toggle"
            >
              <span
                v-if="dispositionCands.includes(disposition)"
                class="tone tone-chip"
                :style="toneVars(dispositionColor(disposition))"
              >{{ disposition }}</span>
              <span
                v-else
                class="placeholder"
              >{{ labels.rosterChoose }}</span>
              <i class="bi bi-chevron-down" />
            </button>
          </template>
          <div class="modal-list rw-fd-list">
            <button
              v-for="d in dispositionCands"
              :key="d"
              type="button"
              class="rw-fd-opt"
              :class="{ on: disposition === d }"
              @click="dispositionPickerOpen = false; $emit('update:disposition', d)"
            >
              <span
                class="tone tone-chip"
                :style="toneVars(dispositionColor(d))"
              >{{ d }}</span>
            </button>
          </div>
        </PickerDropdown>
      </div>
    </ExpandTransition>

    <!-- The notes and the legality switch are decided once and then left alone; giving each a
         permanent slot would spend the line on the two things nobody looks at twice. The points
         and the way out are not on this line: they are the fixed bar's at the bottom, where they
         sit at every width (owner, 2026-09-26). -->
    <PickerDropdown
      v-model:open="moreOpen"
      width="24rem"
      align="right"
      :label="labels.rosterMoreSettings"
    >
      <template #trigger="{ toggle }">
        <button
          type="button"
          class="rw-more"
          :aria-label="labels.rosterMoreSettings"
          :title="labels.rosterMoreSettings"
          :aria-expanded="moreOpen"
          @click="toggle"
        >
          <i class="wi wi-more" />
        </button>
      </template>
      <div class="rw-more-body">
        <label class="field">
          <span>{{ labels.rosterNotes }}</span>
          <textarea
            rows="4"
            :maxlength="ROSTER_NOTES_MAX"
            :value="notes"
            @input="$emit('update:notes', $event.target.value)"
          />
        </label>
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
    </PickerDropdown>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import PickerDropdown from '../PickerDropdown.vue'
import ExpandTransition from '../ExpandTransition.vue'
import FactionPickerList from '../tracker/FactionPickerList.vue'
import DetachmentPicker from '../tracker/DetachmentPicker.vue'
import { toneVars } from '../../utils/tone.js'
import { dispositionColor } from '../../data/dispositionColors.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { ROSTER_NOTES_MAX, UNLIMITED_BATTLE } from '../../composables/rosterEngine.js'
import RosterBattleSizeField from './RosterBattleSizeField.vue'
import { useRosterPrefs } from '../../composables/useRosterPrefs.js'

defineProps({
  showName: { type: Boolean, default: true },
  name: { type: String, default: '' },
  factionSlug: { type: String, default: '' },
  factionName: { type: String, default: '' },
  detachments: { type: Array, default: () => [] },
  detachmentSummary: { type: String, default: '' },
  detachmentOptions: { type: Array, default: () => [] },
  dpSpent: { type: Number, default: 0 },
  // The battle size's budget — what the picker spends against — and the budget the count shows,
  // which is 3 for a lone 3 DP detachment at Incursion (rosterEngine's dpLimitFor).
  maxDp: { type: Number, default: 0 },
  dpLimit: { type: Number, default: 0 },
  // The points limit as one value (rosterEngine's limitOf), handed to RosterBattleSizeField.
  limit: { type: Object, required: true },
  disposition: { type: String, default: '' },
  dispositionCands: { type: Array, default: () => [] },
  checkLegality: { type: Boolean, default: true },
  archived: { type: Boolean, default: false },
  notes: { type: String, default: '' },
})
defineEmits([
  'update:name', 'update:limit', 'update:disposition',
  'update:checkLegality', 'update:notes',
  'pick-faction', 'toggle-detachment', 'clear-detachments',
])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { showPointsLeft } = useRosterPrefs()

const factionPickerOpen = ref(false)
const detachmentPickerOpen = ref(false)
const dispositionPickerOpen = ref(false)
const moreOpen = ref(false)
</script>

<style scoped>
.rw-bar {
  display: flex;
  align-items: flex-end;
  /* One row, always (owner, 2026-10-03: the "…" alone on a second row read as the bar falling
     apart). The name is what gives way — it is typed once, and a long one still scrolls inside
     its own box. */
  flex-wrap: nowrap;
  gap: 0.6rem 0.9rem;
  padding-bottom: 0.6rem;
  margin-bottom: 0.6rem;
  border-bottom: 1px solid var(--border);
}

/* Reuses the `.field > span` caption from style.css — the same small caps label the wizard's own
   fields carry, so the bar reads as the setup step it replaces. */
.rw-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}
.rw-field > span {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
/* The controls take the same recessed field surface the wizard's own fields use
   (--bg-secondary + --text-primary). NOT --bg-insert: that token is a deliberately dark surface
   in BOTH themes — the navbar, the bottom bar, the sidebar's section head — and light text goes
   on it. Here it was paired with --text-primary, which in the light theme is the very same
   #2a2828: what you typed into the name field was invisible (report 8aabcef5). */
.rw-name { flex: 1 1 12rem; min-width: 6rem; max-width: 22rem; }
.rw-name input {
  width: 100%;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 0.35rem 0.5rem;
  font: inherit;
  font-size: 0.9rem;
}

.rw-choose {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 11rem;
  max-width: 20rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 0.35rem 0.5rem;
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: left;
}
.rw-choose:disabled { opacity: 0.5; cursor: default; }
.rw-choose > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* "Choose…" is this button's LABEL, not a hint inside a field, so it owes the 4.5:1 real text
   owes — --text-dim measured 2.63:1 on the form surface. Muted, mixed toward the primary ink
   until it clears AA in both themes, and still a step quieter than a real answer. */
.rw-choose .placeholder { color: color-mix(in srgb, var(--text-muted) 55%, var(--text-primary)); }
.rw-choose .bi { flex-shrink: 0; color: var(--text-muted); }
/* The declared Force Disposition: the chip in its colour, on the field and in the list — the colour
   is how a disposition is told apart everywhere else (dispositionColors.js). */
.rw-fd .rw-choose { min-width: 11rem; }
.rw-fd-list { gap: 0.25rem; }
.rw-fd-opt {
  display: flex;
  align-items: center;
  min-height: 30px;
  padding: 0.2rem 0.4rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  cursor: pointer;
}
.rw-fd-opt.on { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 16%, transparent); }
@media (hover: hover) { .rw-fd-opt:hover { border-color: var(--accent); } }

.rw-static { font-size: 0.9rem; color: var(--text-primary); padding: 0.35rem 0; }

/* A square the height of the fields beside it — the same 0.9rem type, 1.5 line and 0.35rem padding
   their boxes are made of — so its bottom edge is theirs (owner, 2026-10-03: it sat lower and
   smaller than the row). */
.rw-more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  aspect-ratio: 1;
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.35rem;
  font: inherit;
  font-size: 0.9rem;
  line-height: 1.5;
  cursor: pointer;
}
@media (hover: hover) { .rw-more:hover { color: var(--accent-ink); border-color: var(--accent); } }

.rw-more-body { padding: 0.5rem; display: flex; flex-direction: column; gap: 1rem; }
.rw-more-body textarea {
  width: 100%;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 0.5rem;
  font: inherit;
  font-size: 0.9rem;
  resize: vertical;
}

.dp-count { font-style: normal; color: var(--text-dim); }
.dp-count.over { color: var(--danger); }
</style>
