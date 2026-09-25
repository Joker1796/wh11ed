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
          <em
            v-if="hasFaction"
            class="dp-count"
            :class="{ over: dpSpent > dpLimit && !dpOverAllowed }"
          >{{ dpSpent }} / {{ dpLimit }} DP</em>
          <button
            v-if="dpOverAllowed"
            type="button"
            class="help-btn"
            :aria-label="labels.trackerDpOverHelp"
            @click="dpHelpOpen = true"
          >
            <i class="bi bi-question-circle" />
          </button>
        </span>
        <button
          type="button"
          class="ch-pick"
          :disabled="!hasFaction"
          @click="$emit('pick-detachments')"
        >
          <span
            class="ch-value"
            :class="{ placeholder: !detachmentSummary }"
          >{{ hasFaction ? (detachmentSummary || labels.rosterChoose) : labels.rosterPickFaction }}</span>
        </button>
        <i class="bi bi-chevron-down" />
      </div>

      <!-- An army has ONE Force Disposition — the card selected after mustering, on which the
           opponent's symbol names your Primary Mission. One detachment settles it; several are a
           choice, and the LIST is where it is declared. Not a picker: there are never more than a
           handful of candidates, so they fit in the tile that shows the answer. -->
      <div
        v-if="dispositionCands.length"
        class="choice"
      >
        <span class="ch-label">{{ dispositionCands.length > 1 ? labels.rosterDispositionDeclared : labels.trackerDisposition }}</span>
        <span
          v-if="dispositionCands.length === 1"
          class="ch-value disp-one"
        >{{ dispositionCands[0] }}</span>
        <div
          v-else
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
      </div>

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

      <div class="choice">
        <span class="ch-label">{{ labels.rosterBattleSizeLabel }}</span>
        <div class="bsize-opts">
          <button
            v-for="b in battleSizes"
            :key="b.id"
            class="bsize-btn"
            :class="{ on: battleSize === b.id }"
            @click="$emit('update:battleSize', b.id)"
          >
            {{ b.points }}
          </button>
          <button
            class="bsize-btn"
            :class="{ on: battleSize === 'custom' }"
            @click="$emit('update:battleSize', 'custom')"
          >
            {{ labels.rosterCustom }}
          </button>
          <input
            v-if="battleSize === 'custom'"
            class="bsize-input"
            type="number"
            min="0"
            step="5"
            :value="customPoints"
            @input="$emit('update:customPoints', Math.max(0, Number($event.target.value) || 0))"
          >
        </div>
      </div>
    </div>

    <label
      class="check"
      :class="{ on: checkLegality }"
    >
      <input
        type="checkbox"
        :checked="checkLegality"
        @change="$emit('update:checkLegality', $event.target.checked)"
      >
      <span>
        {{ labels.rosterCheckLegality }}
        <em class="check-note">{{ labels.rosterCheckLegalityNote }}</em>
      </span>
    </label>
    <label
      class="check"
      :class="{ on: showPointsLeft }"
    >
      <input
        v-model="showPointsLeft"
        type="checkbox"
      >
      <span>{{ labels.rosterShowPointsLeft }}</span>
    </label>

    <BaseModal
      v-if="dpHelpOpen"
      :title="labels.trackerDpOverTitle"
      max-width="380px"
      @close="dpHelpOpen = false"
    >
      <div class="modal-body">
        <p class="dp-help-text">
          {{ labels.trackerDpOverText }}
        </p>
      </div>
    </BaseModal>
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
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosterPrefs } from '../../composables/useRosterPrefs.js'
import { ROSTER_NOTES_MAX } from '../../composables/rosterEngine.js'
import rosterCore from '../../data/roster/core.js'

defineProps({
  showName: { type: Boolean, default: false },
  name: { type: String, default: '' },
  battleSize: { type: String, default: 'strike-force' },
  customPoints: { type: Number, default: 2000 },
  hasFaction: { type: Boolean, default: false },
  factionName: { type: String, default: '' },
  detachmentSummary: { type: String, default: '' },
  dpSpent: { type: Number, default: 0 },
  dpLimit: { type: Number, default: 0 },
  // A single detachment over budget is allowed (GW has said so, not yet in print): a "?" explains
  // it instead of the count turning red.
  dpOverAllowed: { type: Boolean, default: false },
  dispositionCands: { type: Array, default: () => [] },
  disposition: { type: String, default: '' },
  showNotes: { type: Boolean, default: false },
  notes: { type: String, default: '' },
  checkLegality: { type: Boolean, default: true },
})
defineEmits([
  'update:name', 'update:battleSize', 'update:customPoints', 'update:disposition',
  'update:notes', 'update:checkLegality', 'pick-faction', 'pick-detachments',
])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
// A reader's own preference, kept on the device rather than in the list.
const { showPointsLeft } = useRosterPrefs()
const battleSizes = rosterCore.battleSizes
const dpHelpOpen = ref(false)
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
.ch-pick:disabled { cursor: not-allowed; }
.choice.off { opacity: 0.5; }
/* The row lights by its BACKGROUND, the border belonging to the card around it — and behind
   `hover: hover`, because iOS leaves a tap's hover state on until something else is tapped. */
@media (hover: hover) {
  .choice.pick:not(.off):hover { background: var(--bg-secondary); }
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
  color: var(--accent);
  font-weight: 700;
  margin-left: 0.3rem;
  letter-spacing: 0;
}
.dp-count.over { color: var(--danger); }
.dp-help-text { margin: 0; font-size: 0.88rem; line-height: 1.5; color: var(--text-muted); }

/* The disposition row holds the global segmented control instead of a value, so it sizes to its
   own words rather than stretching the row. */
.disp-opts { margin-top: 0.15rem; align-self: flex-start; }
.disp-opts button { font-size: 0.78rem; padding: 0.2rem 0.5rem; }

.bsize-opts { display: inline-flex; gap: 0.25rem; margin-top: 0.1rem; }
.bsize-btn {
  padding: 0.2rem 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-muted);
  cursor: pointer;
}
.bsize-btn.on { background: var(--accent); color: #fff; border-color: var(--accent); }
.bsize-input {
  width: 5rem;
  padding: 0.2rem 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  border: 1px solid var(--accent);
  background: var(--bg-secondary);
  color: var(--text-primary);
}
.bsize-input:focus { outline: none; }

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
