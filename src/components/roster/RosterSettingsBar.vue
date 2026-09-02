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
    <label v-if="showName" class="rw-field rw-name">
      <span>{{ labels.rosterNameLabel }}</span>
      <input
        type="text"
        :value="name"
        :placeholder="labels.rosterNewName"
        @input="$emit('update:name', $event.target.value)"
      />
    </label>

    <div class="rw-field">
      <span>{{ labels.rosterFactionLabel }}</span>
      <button class="rw-choose" @click="factionPickerOpen = true">
        <span :class="{ placeholder: !factionSlug }">{{ factionName || labels.rosterChoose }}</span>
        <i class="bi bi-chevron-down"></i>
      </button>
    </div>

    <div class="rw-field">
      <span>
        {{ labels.rosterDetachmentLabel }}
        <em v-if="factionSlug" class="dp-count" :class="{ over: dpSpent > maxDp && !dpOverAllowed }">{{ dpSpent }} / {{ maxDp }} DP</em>
        <button v-if="dpOverAllowed" type="button" class="help-btn" @click="dpHelpOpen = true" :aria-label="labels.trackerDpOverHelp">
          <i class="bi bi-question-circle"></i>
        </button>
      </span>
      <button class="rw-choose" :disabled="!factionSlug" @click="detachmentPickerOpen = true">
        <span :class="{ placeholder: !detachments.length }">{{ detachmentSummary || labels.rosterChoose }}</span>
        <i class="bi bi-chevron-down"></i>
      </button>
    </div>

    <div class="rw-field">
      <span>{{ labels.rosterBattleSizeLabel }}</span>
      <div class="rw-row">
        <div class="seg">
          <button
            v-for="b in battleSizes"
            :key="b.id"
            :class="{ on: battleSize === b.id }"
            @click="$emit('update:battleSize', b.id)"
          >{{ b.points }}</button>
          <button :class="{ on: battleSize === 'custom' }" @click="$emit('update:battleSize', 'custom')">{{ labels.rosterCustom }}</button>
        </div>
        <input
          v-if="battleSize === 'custom'"
          class="rw-num"
          type="number"
          min="0"
          step="5"
          :value="customPoints"
          @input="$emit('update:customPoints', $event.target.value)"
        />
      </div>
    </div>

    <!-- An army has ONE Force Disposition. One detachment settles it and there is nothing to ask;
         several make it a declaration, and the list is where it is declared. -->
    <div v-if="factionSlug && dispositionCands.length" class="rw-field">
      <span>{{ dispositionCands.length > 1 ? labels.rosterDispositionDeclared : labels.trackerDisposition }}</span>
      <span v-if="dispositionCands.length === 1" class="rw-static">{{ dispositionCands[0] }}</span>
      <div v-else class="seg">
        <button
          v-for="d in dispositionCands"
          :key="d"
          :class="{ on: disposition === d }"
          @click="$emit('update:disposition', d)"
        >{{ d }}</button>
      </div>
    </div>

    <!-- The points end the line, as they do in the corner of the sticky bar below: the number that
         is consulted constantly belongs where the eye already is, not two feet down the screen. -->
    <div class="rw-tally">
      <span class="rw-points" :class="{ over: points > limit }">{{ points }} / {{ limit }}</span>
      <button
        v-if="factionSlug"
        type="button"
        class="issues-badge"
        :class="errorCount ? 'has-err' : 'ok'"
        @click="$emit('open-issues')"
      >
        <template v-if="errorCount">
          <i class="bi bi-exclamation-triangle-fill"></i> {{ errorCount }}
        </template>
        <i v-else class="bi bi-check-circle-fill"></i>
      </button>
      <!-- The notes and the legality switch are decided once and then left alone; giving each a
           permanent slot would spend the line on the two things nobody looks at twice. -->
      <button type="button" class="rw-more" :aria-label="labels.rosterMoreSettings" :title="labels.rosterMoreSettings" @click="moreOpen = true">
        <i class="bi bi-three-dots"></i>
      </button>
    </div>

    <FactionPickerModal
      v-if="factionPickerOpen"
      :selected="factionSlug"
      @pick="(slug) => { factionPickerOpen = false; $emit('pick-faction', slug) }"
      @close="factionPickerOpen = false"
    />
    <DetachmentPickerModal
      v-if="detachmentPickerOpen"
      :detachments="detachmentOptions"
      :selected="detachments"
      :max-dp="maxDp"
      :dp-spent="dpSpent"
      @toggle="(d) => $emit('toggle-detachment', d)"
      @clear="$emit('clear-detachments')"
      @close="detachmentPickerOpen = false"
    />
    <BaseModal v-if="dpHelpOpen" :title="labels.trackerDpOverTitle" max-width="380px" @close="dpHelpOpen = false">
      <div class="modal-body"><p class="rw-help">{{ labels.trackerDpOverText }}</p></div>
    </BaseModal>
    <BaseModal v-if="moreOpen" :title="labels.rosterMoreSettings" max-width="480px" @close="moreOpen = false">
      <div class="modal-body rw-more-body">
        <label class="field">
          <span>{{ labels.rosterNotes }}</span>
          <textarea
            rows="4"
            :maxlength="ROSTER_NOTES_MAX"
            :value="notes"
            @input="$emit('update:notes', $event.target.value)"
          ></textarea>
        </label>
        <label class="check" :class="{ on: checkLegality }">
          <input type="checkbox" :checked="checkLegality" @change="$emit('update:checkLegality', $event.target.checked)" />
          <span>
            {{ labels.rosterCheckLegality }}
            <em class="check-note">{{ labels.rosterCheckLegalityNote }}</em>
          </span>
        </label>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import FactionPickerModal from '../tracker/FactionPickerModal.vue'
import DetachmentPickerModal from '../tracker/DetachmentPickerModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { ROSTER_NOTES_MAX } from '../../composables/rosterEngine.js'

defineProps({
  showName: { type: Boolean, default: true },
  name: { type: String, default: '' },
  factionSlug: { type: String, default: '' },
  factionName: { type: String, default: '' },
  detachments: { type: Array, default: () => [] },
  detachmentSummary: { type: String, default: '' },
  detachmentOptions: { type: Array, default: () => [] },
  dpSpent: { type: Number, default: 0 },
  maxDp: { type: Number, default: 0 },
  // The tracker's "one detachment may cost more DP than the battle size grants" case, which only
  // the wizard computes; absent here it simply isn't offered.
  dpOverAllowed: { type: Boolean, default: false },
  battleSize: { type: String, default: '' },
  battleSizes: { type: Array, default: () => [] },
  customPoints: { type: [Number, String], default: 0 },
  disposition: { type: String, default: '' },
  dispositionCands: { type: Array, default: () => [] },
  checkLegality: { type: Boolean, default: true },
  notes: { type: String, default: '' },
  points: { type: Number, default: 0 },
  limit: { type: Number, default: 0 },
  errorCount: { type: Number, default: 0 },
})
defineEmits([
  'update:name', 'update:battleSize', 'update:customPoints', 'update:disposition',
  'update:checkLegality', 'update:notes',
  'pick-faction', 'toggle-detachment', 'clear-detachments', 'open-issues',
])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const factionPickerOpen = ref(false)
const detachmentPickerOpen = ref(false)
const dpHelpOpen = ref(false)
const moreOpen = ref(false)
</script>

<style scoped>
.rw-bar {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
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
.rw-name { flex: 1 1 12rem; max-width: 22rem; }
.rw-name input {
  width: 100%;
  background: var(--bg-insert);
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
  background: var(--bg-insert);
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
.rw-choose .placeholder { color: var(--text-dim); }
.rw-choose .bi { flex-shrink: 0; color: var(--text-muted); }

.rw-row { display: flex; align-items: center; gap: 0.4rem; }
.rw-num {
  width: 5.5rem;
  background: var(--bg-insert);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 0.3rem 0.4rem;
  font: inherit;
  font-size: 0.9rem;
}
.rw-static { font-size: 0.9rem; color: var(--text-primary); padding: 0.35rem 0; }

.rw-tally {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  padding-bottom: 0.2rem;
}
.rw-points {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}
.rw-points.over { color: #d9534f; }

.rw-more {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.25rem 0.45rem;
  font: inherit;
  line-height: 1;
  cursor: pointer;
}
@media (hover: hover) { .rw-more:hover { color: var(--accent); border-color: var(--accent); } }

.rw-more-body { padding: 1rem; display: flex; flex-direction: column; gap: 1rem; }
.rw-more-body textarea {
  width: 100%;
  background: var(--bg-insert);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 0.5rem;
  font: inherit;
  font-size: 0.9rem;
  resize: vertical;
}
.rw-help { margin: 0; padding: 1rem; font-size: 0.9rem; color: var(--text-muted); }

.dp-count { font-style: normal; color: var(--text-dim); }
.dp-count.over { color: #d9534f; }
</style>
