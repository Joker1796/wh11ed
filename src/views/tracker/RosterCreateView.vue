<template>
  <div
    class="roster-create fa-themed"
    :class="{ 'rw-host': desk || step === 2 }"
    :style="accentStyle"
  >
    <!-- `.rw-host` while the panes are up (step 2, or the desk): the screen is then a column as
         tall as the window and the panes scroll inside themselves (RosterWorkbench); step 1 is
         an ordinary page. (No comment may sit BEFORE this root — see the src/views lint rule.) -->
    <!-- One row for the way out and the step markers: on a phone the panes below get the window
         minus everything above them, so a line here is a line taken from the catalogue. -->
    <div class="rc-top">
      <RouterLink
        to="/roster"
        class="back"
      >
        <i class="bi bi-chevron-left" /> {{ labels.rosterBackToList }}
      </RouterLink>

      <!-- The step markers are navigation, not just a progress read-out: any step already
           reachable can be jumped to directly. Step 2 stays disabled until step 1 has a faction,
           which is the same condition its own Next button enforces — and going forward through a
           marker runs `goToUnits()` rather than assigning `step`, so the roster still gets created
           and step 1's fields still get written.

           There were three: picking units and configuring them were a step apart, which since
           wargear started deciding a unit's price meant walking back and forth between them. They
           are one step with two panes now — the same layout the editor's Units tab uses. -->
      <div
        v-if="!desk"
        class="rc-steps"
      >
        <button
          type="button"
          class="rc-step"
          :class="{ on: step === 1, done: step > 1 }"
          @click="goToStep(1)"
        >
          <span>1</span><span class="rc-step-label"> · {{ labels.rosterCreateStep1 }}</span>
        </button>
        <span class="rc-step-sep">→</span>
        <button
          type="button"
          class="rc-step"
          :class="{ on: step === 2 }"
          :disabled="!canLeaveStep1"
          @click="goToStep(2)"
        >
          <span>2</span><span class="rc-step-label"> · {{ labels.rosterViewTabUnits }}</span>
        </button>
      </div>
    </div>

    <!-- Step 1: name, faction, detachment, battle size — same card/field language as the
         tracker's GameSetup (see .field/.btn-choose below), so the two setup flows read as
         one consistent pattern. -->
    <RosterSettingsBar
      v-if="desk"
      :name="name"
      :faction-slug="factionSlug"
      :faction-name="factionName"
      :detachments="detachments"
      :detachment-summary="detachmentSummary"
      :detachment-options="detachmentOptions"
      :dp-spent="dpSpent"
      :max-dp="effBattle.dp"
      :dp-over-allowed="dpOverAllowed"
      :battle-size="battleSize"
      :battle-sizes="battleSizes"
      :custom-points="customPoints"
      :disposition="disposition || ''"
      :disposition-cands="dispositionCands"
      :check-legality="checkLegality"
      :notes="notes"
      :points="points"
      :limit="limit"
      :error-count="validation.errorCount"
      :issue-count="validation.issues.length"
      @update:name="name = $event"
      @update:battle-size="battleSize = $event"
      @update:custom-points="customPoints = Math.max(0, Number($event) || 0)"
      @update:disposition="disposition = $event"
      @update:check-legality="checkLegality = $event"
      @update:notes="notes = $event"
      @pick-faction="pickFaction"
      @toggle-detachment="toggleDetachment"
      @clear-detachments="clearDetachments"
      @open-issues="issuesOpen = true"
    />

    <div
      v-show="!desk && step === 1"
      class="rc-panel"
    >
      <RosterSetupFields
        v-model:name="name"
        v-model:battle-size="battleSize"
        v-model:custom-points="customPoints"
        v-model:disposition="disposition"
        v-model:check-legality="checkLegality"
        show-name
        :has-faction="!!factionSlug"
        :faction-name="factionName"
        :detachment-summary="detachmentSummary"
        :dp-spent="dpSpent"
        :dp-limit="effBattle.dp"
        :dp-over-allowed="dpOverAllowed"
        :disposition-cands="dispositionCands"
        @pick-faction="factionPickerOpen = true"
        @pick-detachments="detachmentPickerOpen = true"
      />
    </div>

    <!-- Step 2: the catalogue and the list side by side (`.roster-panes` in style.css, shared
         with the editor's Units tab). Click a catalogue row to preview its rules card, "+" to add
         it; click a unit in the list to configure it, which on a narrow screen opens as a sheet
         (RosterUnitList decides that). -->
    <div
      v-show="desk || step === 2"
      class="rc-panel rw-fill"
    >
      <!-- On the desk this screen has no faction yet to build against until one is picked in the
           bar above, and the columns would be three empty boxes; the hint says which choice
           unlocks them, the way the reference layout does. -->
      <p
        v-if="desk && !factionSlug"
        class="rc-cfg-empty"
      >
        {{ labels.rosterPickFaction }}
      </p>
      <RosterWorkbench
        v-else
        :desk="desk"
        :selected="!!openEntry"
      >
        <template #catalog>
          <RosterUnitBrowser
            v-if="factionData"
            :units="factionData.units"
            :allies="factionData.allies || []"
            :faction-slug="factionSlug"
            :added-ids="units.map((u) => u.id)"
            :detachments="curDetachments"
            :battle="effBattle"
            :remaining="limit - points"
            :check-legality="checkLegality"
            rules-button
            @add="addUnit"
            @open-rules="rulesOpen = true"
          />
        </template>
        <template #list>
          <p
            v-if="!units.length"
            class="rc-cfg-empty"
          >
            {{ labels.rosterUnitsEmpty }}
          </p>
          <RosterUnitList
            v-else
            :groups="groupedUnits"
            :def-of="defOf"
            :items="rosterItems.items"
            :detachments="curDetachments"
            :points-of="(e) => entryMeta.get(e.uid)?.points"
            :role-of="attachRole"
            :slug-of="slugFor"
            :dup-blocked="dupBlocked"
            :open-uid="openUid"
            :placement="desk ? 'pane' : 'auto'"
            @toggle="toggleOpen"
            @duplicate="duplicateEntry"
            @remove="removeEntry"
          >
            <template #fields="{ entry: e }">
              <RosterEntryFields
                v-bind="fieldProps"
                :entry="e"
                @toggle-warlord="toggleWarlord"
              />
            </template>
          </RosterUnitList>
        </template>
        <template #editor>
          <RosterEntryFields
            v-bind="fieldProps"
            :entry="openEntry"
            @toggle-warlord="toggleWarlord"
          />
        </template>
      </RosterWorkbench>
    </div>

    <RosterUndoBar
      :undoable="undoable"
      @undo="undoRemove"
      @dismiss="dismissUndo"
    />

    <!-- One bar for both steps. Step 1's Next used to sit in the page's flow, which on a phone put
         it exactly under MobileUtilityBar's floating "To game" button — that bar lifts itself by
         --roster-sticky-h (App.vue, keyed off `:has(.rc-sticky)`), so the way out of the collision
         is to BE the sticky bar rather than to sit beneath it. Same reason the editor's Save is
         there, and the reading is consistent: the step's forward move is always in the corner. -->
    <div class="rc-sticky">
      <div class="rc-sticky-inner">
        <RosterPointsTally
          v-if="!desk && step === 2"
          class="rc-sticky-info"
          :points="points"
          :limit="limit"
          :error-count="validation.errorCount"
          :issue-count="validation.issues.length"
          @open-issues="issuesOpen = true"
        />
        <div class="rc-sticky-actions">
          <!-- No steps on the desk, so nothing to go back to and nothing to go forward to: the
               bar carries the one action the screen ends in. -->
          <template v-if="desk">
            <button
              class="btn-primary"
              :disabled="!canLeaveStep1"
              @click="finish"
            >
              {{ labels.rosterSave }}
            </button>
          </template>
          <template v-else-if="step === 1">
            <button
              class="btn-primary"
              :disabled="!canLeaveStep1"
              @click="goToUnits"
            >
              {{ labels.trackerNextStep }} →
            </button>
          </template>
          <template v-else>
            <button
              class="btn-ghost"
              @click="step = 1"
            >
              ← {{ labels.trackerBack }}
            </button>
            <button
              class="btn-primary"
              @click="finish"
            >
              {{ labels.rosterSave }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <FactionPickerModal
      v-if="factionPickerOpen"
      :selected="factionSlug"
      @pick="pickFaction"
      @close="factionPickerOpen = false"
    />
    <DetachmentPickerModal
      v-if="detachmentPickerOpen"
      :detachments="detachmentOptions"
      :selected="detachments"
      :max-dp="effBattle.dp"
      :dp-spent="dpSpent"
      @toggle="toggleDetachment"
      @clear="clearDetachments"
      @close="detachmentPickerOpen = false"
    />
    <RosterRulesModal
      v-if="rulesOpen && factionSlug"
      :faction-slug="factionSlug"
      :detachments="detachments"
      @close="rulesOpen = false"
    />
    <RosterIssuesModal
      v-if="issuesOpen"
      :issues="validation.issues"
      @goto="(uid) => { issuesOpen = false; step = 2; openUid = uid }"
      @close="issuesOpen = false"
    />
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FactionPickerModal from '../../components/tracker/FactionPickerModal.vue'
import DetachmentPickerModal from '../../components/tracker/DetachmentPickerModal.vue'
import RosterUnitBrowser from '../../components/roster/RosterUnitBrowser.vue'
import RosterUndoBar from '../../components/roster/RosterUndoBar.vue'
import RosterEntryFields from '../../components/roster/RosterEntryFields.vue'
import RosterUnitList from '../../components/roster/RosterUnitList.vue'
import RosterRulesModal from '../../components/roster/RosterRulesModal.vue'
import RosterSettingsBar from '../../components/roster/RosterSettingsBar.vue'
import RosterSetupFields from '../../components/roster/RosterSetupFields.vue'
import RosterPointsTally from '../../components/roster/RosterPointsTally.vue'
import RosterWorkbench from '../../components/roster/RosterWorkbench.vue'
import RosterIssuesModal from '../../components/roster/RosterIssuesModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters } from '../../composables/useRosters.js'
import { useRosterDerived } from '../../composables/useRosterDerived.js'
import { useRosterBuildActions } from '../../composables/useRosterBuildActions.js'
import { useFactionAccent } from '../../composables/useFactionAccent.js'
import { summaryOf } from '../../composables/rosterSummary.js'
import { useRosterSync } from '../../composables/useRosterSync.js'
import { forgetDraft, rememberDraft } from '../../composables/useRosterDraftResume.js'
import { rosterItems } from '../../data/roster/index.js'
import { useRosterFactionData } from '../../composables/useRosterFactionData.js'
import { ROSTER_NOTES_MAX } from '../../composables/rosterEngine.js'
import { useMediaQuery } from '../../composables/useMediaQuery.js'

const router = useRouter()
const route = useRoute()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { createRoster, updateRoster, rosterById, saveDraft } = useRosters()
const { saveToCloud } = useRosterSync()

// The same threshold the editor reads: three columns with a settings bar over them, or the two
// steps this screen has always had. Above it there is nothing sequential left — every field is
// on screen at once — so the step markers and the Back/Next pair go away with them.
const desk = useMediaQuery('(min-width: 1200px)')

const step = ref(1)
const rulesOpen = ref(false)
const name = ref('')
const factionSlug = ref(null)
const detachments = ref([])
const disposition = ref(null)
const battleSize = ref('strike-force')
const customPoints = ref(2000)
const checkLegality = ref(true)
const notes = ref('')
const units = ref([])

// ── Faction accent (useFactionAccent.js — the same recipe every faction-coloured screen uses) ──
const { factionName, accentStyle } = useFactionAccent(factionSlug)

// ── Faction data (dynamic-imported, same lazy source the editor uses) ──
// Allies too — the wizard's catalogue pane is the same browser the editor's is.
const { factionData } = useRosterFactionData(() => factionSlug.value)

// The wizard's fields ARE a roster, they just aren't a stored one until a faction is picked — so
// they are assembled into the shape everything downstream reads and handed to useRosterDerived.js,
// the same module the editor and the read-only view get their numbers from. A wizard with its own
// idea of what a list costs, or of which Battleline a Detachment grants, is exactly the drift this
// removes.
const draftRoster = computed(() => ({
  faction: factionSlug.value,
  detachments: detachments.value,
  battleSize: battleSize.value,
  customPoints: customPoints.value,
  checkLegality: checkLegality.value,
  units: units.value,
}))
const {
  defOf, curDetachments, effBattle, limit, points, slugFor,
  entryMeta, groupedUnits, attachRole, dupBlocked, validation, fieldProps,
} = useRosterDerived(draftRoster, factionData)

// ── What building a list does (useRosterBuildActions.js — the editor runs the same code) ──
// Units are written through to the draft (`syncUnits`); the faction is this screen's own ref, and
// picking one is the first choice worth remembering — from there the wizard has a draft to write
// into.
const {
  factionPickerOpen, detachmentPickerOpen, pickFaction,
  detachmentOptions, detachmentSummary, dispositionCands, dpSpent, dpOverAllowed, toggleDetachment, clearDetachments,
  openUid, toggleOpen, openEntry, addUnit, duplicateEntry, removeEntry, toggleWarlord,
  undoable, undoRemove, dismissUndo, battleSizes,
} = useRosterBuildActions({
  roster: () => draftRoster.value,
  factionData,
  curDetachments,
  effBattle,
  defOf,
  commit: () => syncUnits(),
  setFaction: (slug) => { factionSlug.value = slug; ensureDraft() },
})

// Write the units through to the saved roster as soon as there IS one (step 2 onwards). The wizard
// used to hold them in component state until "Done", so leaving the way every other screen expects
// to be left — the "Back to list" link, the phone's back gesture, a reload — threw away everything
// picked and left a roster that had been created but was empty. Assigning the same array keeps its
// identity, so per-entry edits ride the store's own deep-watch autosave from then on.
function syncUnits() {
  if (rosterId.value) updateRoster(rosterId.value, { units: units.value })
}
// Live validation is `validation` above (rosterValidation.js — never blocks, just reports). Only
// reachable once a faction is picked; shown from step 2 on, next to the points readout in
// .rc-sticky. The main case worth surfacing this early for: units added under a bigger battle
// size, then the size lowered again on step 1 — duplicate caps shrink out from under counts
// that already exist (RosterUnitBrowser.vue's isOver badge flags this per-unit, this is the
// same overDuplicate check, army-wide).
const issuesOpen = ref(false)

// ── The draft: this wizard's persistence ──────────────────────────────────────────────────────
// Everything collected here lives in a stored roster from the moment a FACTION is picked — the
// first choice that means anything, and the one every later step depends on. Until then, opening
// the wizard and wandering off leaves no trace. From then on a reload, the phone's back gesture or
// a detour to look a rule up all come back to this list on the step it was left on, because the
// draft's id is in the URL (`/roster/new?draft=<id>`) and every field is written through as it
// changes.
//
// A draft is not a saved list: it shows only on the Drafts tab of /roster and can't be fielded
// (see useRosters.js). "Save" — `finish()` — is what turns it into one.
const rosterId = ref(null)

// Resuming: the id the wizard put in its own URL, or the one a card on the Drafts tab links to.
// A saved roster's id is ignored — that one belongs to the editor, and re-opening it here would
// hand a finished list back to a wizard that ends in "Save".
const resumed = (() => {
  const id = route.query?.draft
  const r = typeof id === 'string' ? rosterById(id) : null
  return r?.draft ? r : null
})()
if (resumed) {
  name.value = resumed.name || ''
  factionSlug.value = resumed.faction || null
  detachments.value = [...(resumed.detachments || [])]
  disposition.value = resumed.disposition || null
  battleSize.value = resumed.battleSize || 'strike-force'
  customPoints.value = resumed.customPoints ?? 2000
  checkLegality.value = resumed.checkLegality !== false
  notes.value = resumed.notes || ''
  // The stored array itself, not a copy: from here the wizard's per-unit edits ARE the draft's,
  // riding the store's deep-watch autosave exactly as they do after syncUnits().
  units.value = resumed.units
  rosterId.value = resumed.id
  // Clamped: a draft left on the old step 3 (configure) resumes on the step that absorbed it.
  step.value = Math.min(resumed.draftStep || 1, 2)
}

// Leaving mid-build is the normal way to use this screen — the question a half-built list
// raises ("what does this detachment actually do?") is answered on a page that isn't this one.
// The draft survives that on its own, but the way BACK didn't: /roster opens on Saved lists, so
// a reader returning through the nav saw a list without their roster in it. Note the draft on
// the way out and App.vue floats a "to roster" chip over whatever they went to read.
onBeforeUnmount(() => rememberDraft(rosterId.value))
// ...and drop it on the way in, whichever door was used — the chip's whole job is being here.
forgetDraft()
function step1Patch() {
  return {
    name: name.value.trim() || labels.value.rosterNewName,
    faction: factionSlug.value,
    detachments: detachments.value,
    disposition: disposition.value,
    battleSize: battleSize.value,
    customPoints: customPoints.value,
    checkLegality: checkLegality.value,
    notes: notes.value.trim().slice(0, ROSTER_NOTES_MAX),
  }
}
// Steps 2 and 3 exist only once a faction is picked — the same gate step 1's Next button uses.
const canLeaveStep1 = computed(() => !!factionSlug.value)

function goToStep(n) {
  if (n === step.value) return
  if (n === 1) { step.value = 1; return }
  if (!canLeaveStep1.value) return
  // Reaching step 2 for the first time is what creates the roster, so route forward through
  // goToUnits() instead of assigning `step` and skipping that.
  goToUnits()
}

// Creates the draft the first time it's needed, and puts its id in the URL so a reload resumes
// this one instead of starting a second. Idempotent — every caller may just call it.
function ensureDraft() {
  if (rosterId.value) return rosterId.value
  const r = createRoster(step1Patch().name)
  rosterId.value = r.id
  updateRoster(r.id, { ...step1Patch(), draft: true, draftStep: step.value })
  router.replace({ path: '/roster/new', query: { draft: r.id } })
  return r.id
}

// Step 1's fields and the step itself are written through as they change — that is what makes the
// draft a draft. Units take the other road (`syncUnits`, then the shared array), so they are not
// watched here.
watch([name, factionSlug, detachments, disposition, battleSize, customPoints, checkLegality, notes, step], () => {
  if (!rosterId.value) return
  updateRoster(rosterId.value, { ...step1Patch(), draftStep: step.value })
}, { deep: true })

function goToUnits() {
  ensureDraft()
  syncUnits()
  step.value = 2
}

// ── Save: the draft becomes a saved list, and the wizard hands off to its read-only view ──
// This is also the moment the list first reaches the cloud: a draft is deliberately never
// uploaded (useRosterSync.js), so "Save" is what turns it into something worth syncing. The
// cached summary is written by the watchEffect at the bottom of this file, which flushes after
// this tick — wait for it, or the uploaded copy would carry the previous step's points.
async function finish() {
  const id = ensureDraft()
  updateRoster(id, { ...step1Patch(), units: units.value })
  saveDraft(id)
  await nextTick()
  saveToCloud(id)
  router.push(`/roster/${id}/view`)
}

// The wizard is a place a roster gets finished and left, so it owes the list screens the same
// cached summary the editor writes (rosterSummary.js) — a list built entirely here used to reach
// them priced at 0. Assigned straight onto the stored roster (the store deep-watches and persists
// it) rather than through updateRoster, which would bump `updatedAt` for a step-2 arrival that
// changed nothing. Covers the step-3 per-unit edits too, which ride the same autosave and never
// call syncUnits().
watchEffect(() => {
  if (!rosterId.value || !factionData.value) return
  const stored = rosterById(rosterId.value)
  if (stored) stored.summary = summaryOf({ units: units.value }, points.value, validation.value.errorCount)
})
</script>

<style scoped>
.roster-create { padding-top: 0.75rem; padding-bottom: 0; }

.rc-top { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin: 0 0 1rem; }
.rc-steps { display: flex; align-items: center; gap: 0.5rem; margin: 0; font-size: 0.85rem; }
/* Buttons now, but they must keep reading as a progress row rather than a toolbar — so the
   native chrome is reset and only the colour changes with state. */
.rc-step {
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: var(--text-dim);
  font-weight: 600;
  cursor: pointer;
}
.rc-step:disabled { cursor: default; opacity: 0.55; }
.rc-step:not(:disabled):hover { color: var(--text-primary); }
.rc-step.on:not(:disabled):hover { color: var(--accent); }
.rc-step.on { color: var(--accent); }
.rc-step.done { color: var(--text-muted); }
.rc-step-sep { color: var(--text-dim); font-size: 0.75rem; }
/* Small phones: three steps + arrows is a lot to fit on one line. Shrink first; on the
   smallest phones, drop the text label for every step but the current one — same idea as
   RoundTracker's short/full label swap — so the row stays compact instead of wrapping. */
@media (max-width: 480px) {
  .rc-steps { gap: 0.35rem; font-size: 0.78rem; }
}
@media (max-width: 360px) {
  .rc-step:not(.on) .rc-step-label { display: none; }
}

.rc-panel { display: flex; flex-direction: column; gap: 1.1rem; }
/* Height is the phone's scarce axis, and the panes below are sized to what is left of it. */
@media (max-width: 900px) {
  .rc-top { margin-bottom: 0.6rem; }
  .rc-panel { gap: 0.6rem; }
}
/* No reserve for the fixed bar here: App.vue's `.main-content--desk` padding is that reserve at
   every width, and RosterWorkbench sizes the panes to end exactly above it — any padding on top
   of that is height the page has to scroll by, and the page is meant to stand still. */
/* Step 1's form is RosterSetupFields.vue. */

/* The list pane's empty state. */
.rc-cfg-empty { color: var(--text-muted); font-style: italic; text-align: center; padding: 1.5rem 0; }


/* Fixed (not sticky) — the unit list can run to 90+ rows, far taller than the viewport, so a
   flow-sticky footer would only engage once scrolled all the way to the list's end. Glued
   flush to the mobile bottom-nav (its real height is 52px — .bn-item's min-height in App.vue —
   not the 4.5rem used elsewhere as a rough content-padding buffer) and stays there — it's the
   anchor. MobileUtilityBar's floating buttons (resume/faction tabs/back-to-top) are the ones
   that yield: App.vue reserves this bar's height via --roster-sticky-h (:has(.rc-sticky) on
   .app-layout) and MobileUtilityBar's own bottom offset adds it, so its buttons float above
   this bar instead of over it. Don't also offset this bar's own bottom by --mobile-bar-h —
   that would just push the collision the other way. */
/* Small phones, down to a 320px viewport: shrink the sticky bar's padding/gaps and the
   Back/Done buttons themselves (same treatment as RoundTracker's round-actions row) so the
   points readout + both buttons keep to one line instead of wrapping or overflowing. */
@media (max-width: 400px) {
  .rc-sticky-actions .btn-primary,
  .rc-sticky-actions .btn-ghost { padding: 0.45rem 0.7rem; font-size: 0.8rem; }
}
</style>
