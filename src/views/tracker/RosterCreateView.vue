<template>
  <div class="roster-create themed" :style="accentStyle">
    <RouterLink to="/roster" class="back"><i class="bi bi-chevron-left"></i> {{ labels.rosterBackToList }}</RouterLink>

    <!-- The step markers are navigation, not just a progress read-out: any step already
         reachable can be jumped to directly. Step 2 stays disabled until step 1 has a faction,
         which is the same condition its own Next button enforces — and going forward through a
         marker runs `goToUnits()` rather than assigning `step`, so the roster still gets created
         and step 1's fields still get written.

         There were three: picking units and configuring them were a step apart, which since
         wargear started deciding a unit's price meant walking back and forth between them. They
         are one step with two panes now — the same layout the editor's Units tab uses. -->
    <div class="rc-steps">
      <button type="button" class="rc-step" :class="{ on: step === 1, done: step > 1 }" @click="goToStep(1)">1<span class="rc-step-label"> · {{ labels.rosterCreateStep1 }}</span></button>
      <span class="rc-step-sep">→</span>
      <button type="button" class="rc-step" :class="{ on: step === 2 }" :disabled="!canLeaveStep1" @click="goToStep(2)">2<span class="rc-step-label"> · {{ labels.rosterViewTabUnits }}</span></button>
    </div>

    <!-- Step 1: name, faction, detachment, battle size — same card/field language as the
         tracker's GameSetup (see .field/.btn-choose below), so the two setup flows read as
         one consistent pattern. -->
    <div v-show="step === 1" class="rc-panel">
      <div class="rc-card">
        <label class="field">
          <span>{{ labels.rosterNameLabel }}</span>
          <input v-model="name" type="text" :placeholder="labels.rosterNewName" />
        </label>

        <div class="field">
          <span>{{ labels.rosterBattleSizeLabel }}</span>
          <div class="seg">
            <button
              v-for="b in battleSizes"
              :key="b.id"
              :class="{ on: battleSize === b.id }"
              @click="battleSize = b.id"
            >{{ b.points }}</button>
            <button :class="{ on: battleSize === 'custom' }" @click="battleSize = 'custom'">{{ labels.rosterCustom }}</button>
          </div>
          <input
            v-if="battleSize === 'custom'"
            v-model.number="customPoints"
            class="bsize-input"
            type="number"
            min="0"
            step="5"
          />
        </div>

        <div class="field">
          <span>{{ labels.rosterFactionLabel }}</span>
          <button class="btn-choose" @click="factionPickerOpen = true">
            <span class="ct-name" :class="{ placeholder: !factionSlug }">{{ factionName || labels.rosterChoose }}</span>
            <i class="bi bi-chevron-right ct-chev"></i>
          </button>
        </div>

        <div class="field">
          <span>
            {{ labels.rosterDetachmentLabel }}
            <em v-if="factionSlug" class="dp-count" :class="{ over: dpSpent > effBattle.dp && !dpOverAllowed }">{{ dpSpent }} / {{ effBattle.dp }} DP</em>
            <button v-if="dpOverAllowed" type="button" class="help-btn" @click="dpHelpOpen = true" :aria-label="labels.trackerDpOverHelp">
              <i class="bi bi-question-circle"></i>
            </button>
          </span>
          <button v-if="factionSlug" class="btn-choose" @click="detachmentPickerOpen = true">
            <span class="ct-name" :class="{ placeholder: !detachments.length }">{{ detachmentSummary || labels.rosterChoose }}</span>
            <i class="bi bi-chevron-right ct-chev"></i>
          </button>
          <p v-else class="det-empty">{{ labels.rosterPickFaction }}</p>
        </div>

        <label class="check" :class="{ on: checkLegality }">
          <input type="checkbox" v-model="checkLegality" />
          <span>
            {{ labels.rosterCheckLegality }}
            <em class="check-note">{{ labels.rosterCheckLegalityNote }}</em>
          </span>
        </label>
      </div>

      <div class="rc-actions">
        <button class="btn-primary" :disabled="!factionSlug" @click="goToUnits">{{ labels.trackerNextStep }} →</button>
      </div>
    </div>

    <!-- Step 2: the catalogue and the list side by side (`.roster-panes` in style.css, shared
         with the editor's Units tab). Click a catalogue row to preview its rules card, "+" to add
         it; click a unit in the list to configure it, which on a narrow screen opens as a sheet
         (RosterUnitList decides that). -->
    <div v-show="step === 2" class="rc-panel">
      <div class="roster-panes">
        <div class="rp-catalog">
          <RosterUnitBrowser
            v-if="factionData"
            :units="factionData.units"
            :allies="factionData.allies || []"
            :faction-slug="factionSlug"
            :added-ids="units.map((u) => u.id)"
            :detachments="curDetachments"
            :battle="effBattle"
            :check-legality="checkLegality"
            @add="addUnit"
            @remove="removeUnit"
          />
        </div>
        <div class="rp-list">
          <p v-if="!units.length" class="rc-cfg-empty">{{ labels.rosterUnitsEmpty }}</p>
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
            @toggle="toggleOpen"
            @duplicate="duplicateEntry"
            @remove="removeEntry"
          >
            <template #fields="{ entry: e }">
              <UnitEditorFields
                v-if="defOf(e.id)"
                :entry="e"
                :def="defOf(e.id)"
                :items="rosterItems.items"
                :texts="rosterItems.texts"
                :faction-slug="slugFor(e.id)"
                :detachments="curDetachments"
                :units="units"
                :def-of="defOf"
                :can-warlord="canBeWarlord(defOf(e.id), curDetachments, [allegKeyword(defOf(e.id), e, curDetachments)])"
                :is-warlord="e.warlord === true"
                :enh-options="enhOptionsFor(defOf(e.id), curDetachments, units, e.uid, factionSlug)"
                :leader-targets="leaderTargetsFor(defOf(e.id), units, e.uid, defOf, curDetachments)"
                @toggle-warlord="toggleWarlord(e.uid)"
              />
            </template>
          </RosterUnitList>
        </div>
      </div>
      <div class="rc-sticky">
        <div class="rc-sticky-inner">
          <div class="rc-sticky-info">
            <span class="rc-points" :class="{ over: points > limit }">{{ points }} / {{ limit }}</span>
            <button type="button" class="issues-badge" :class="validation.errorCount ? 'has-err' : 'ok'" @click="issuesOpen = true">
              <template v-if="validation.errorCount">
                <i class="bi bi-exclamation-triangle-fill"></i> {{ validation.errorCount }}
              </template>
              <i v-else class="bi bi-check-circle-fill"></i>
            </button>
          </div>
          <div class="rc-sticky-actions">
            <button class="btn-ghost" @click="step = 1">← {{ labels.trackerBack }}</button>
            <button class="btn-primary" @click="finish">{{ labels.rosterSave }}</button>
          </div>
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
      @close="detachmentPickerOpen = false"
    />
    <BaseModal v-if="dpHelpOpen" :title="labels.trackerDpOverTitle" max-width="380px" @close="dpHelpOpen = false">
      <div class="modal-body">
        <p class="dp-help-text">{{ labels.trackerDpOverText }}</p>
      </div>
    </BaseModal>
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
import BaseModal from '../../components/BaseModal.vue'
import FactionPickerModal from '../../components/tracker/FactionPickerModal.vue'
import DetachmentPickerModal from '../../components/tracker/DetachmentPickerModal.vue'
import RosterUnitBrowser from '../../components/roster/RosterUnitBrowser.vue'
import UnitEditorFields from '../../components/roster/UnitEditorFields.vue'
import RosterUnitList from '../../components/roster/RosterUnitList.vue'
import RosterIssuesModal from '../../components/roster/RosterIssuesModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters, uid } from '../../composables/useRosters.js'
import { duplicateCounts, duplicateLimit, validateRoster } from '../../composables/rosterValidation.js'
import { summaryOf } from '../../composables/rosterSummary.js'
import { useRosterSync } from '../../composables/useRosterSync.js'
import { forgetDraft, rememberDraft } from '../../composables/useRosterDraftResume.js'
import rosterCore from '../../data/roster/core.js'
import { loadRosterFaction, rosterItems } from '../../data/roster/index.js'
import { factionGroups } from '../../data/factionsIndex.js'
import {
  allySourceOf, sectionsOf, unitPoints, rosterPoints, capKeyOf,
  canBeWarlord, allegKeyword, enhOptionsFor, leaderTargetsFor, leadsFor, effectiveBattle,
  addUnitEntry, duplicateUnitEntry, removeUnitEntry,
} from '../../composables/rosterEngine.js'

const router = useRouter()
const route = useRoute()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { createRoster, updateRoster, rosterById, saveDraft } = useRosters()
const { saveToCloud } = useRosterSync()

const step = ref(1)
const name = ref('')
const factionSlug = ref(null)
const detachments = ref([])
const battleSize = ref('strike-force')
const customPoints = ref(2000)
const checkLegality = ref(true)
const units = ref([])

// ── Faction accent (mirrors the editor) ──
const allFactions = factionGroups.flatMap((g) => g.factions)
const factionColor = computed(() => allFactions.find((f) => f.slug === factionSlug.value)?.color)
const accentStyle = computed(() => factionColor.value
  ? { '--fa-light': factionColor.value.light, '--fa-dark': factionColor.value.dark }
  : {})
const factionName = computed(() => allFactions.find((f) => f.slug === factionSlug.value)?.name || '')

// ── Faction data (dynamic-imported, same lazy source the editor uses) ──
const factionData = ref(null)
const loadingFaction = ref(false)
watch(factionSlug, async (slug) => {
  if (!slug) { factionData.value = null; return }
  loadingFaction.value = true
  try {
    // Allies too — the wizard's catalogue pane is the same browser the editor's is.
    factionData.value = await loadRosterFaction(slug, { allies: true })
  } finally {
    loadingFaction.value = false
  }
}, { immediate: true })

const unitMap = computed(() => {
  const m = new Map()
  for (const u of factionData.value?.units || []) m.set(u.id, u)
  return m
})
function defOf(id) { return unitMap.value.get(id) }

// ── Faction / detachment / battle size choices ──
const factionPickerOpen = ref(false)
const detachmentPickerOpen = ref(false)
function pickFaction(slug) {
  factionPickerOpen.value = false
  if (factionSlug.value === slug) return
  factionSlug.value = slug
  detachments.value = []
  units.value.splice(0) // units belong to a faction — changing it invalidates them
  // The first choice worth remembering: from here the wizard has a draft to write into.
  ensureDraft()
  syncUnits()
}
const detachmentOptions = computed(() =>
  (factionData.value?.detachments || []).map((d) => ({ name: d.name, dp: d.dp || 0, forceDisposition: d.fd || '' })))
const curDetachments = computed(() =>
  detachments.value
    .map((n) => (factionData.value?.detachments || []).find((d) => d.name === n))
    .filter(Boolean))
const detachmentSummary = computed(() => detachments.value.join(', '))
const dpSpent = computed(() => curDetachments.value.reduce((s, d) => s + (d.dp || 0), 0))
function toggleDetachment(d) {
  const at = detachments.value.indexOf(d.name)
  if (at >= 0) detachments.value.splice(at, 1)
  else detachments.value.push(d.name)
}
// A single Detachment is always allowed even over budget (DetachmentPickerModal never
// disables the first pick) — not official yet, but GW has said it's fine as long as it's
// the only one taken. Show that as a "?" explainer instead of an error.
const dpOverAllowed = computed(() => detachments.value.length === 1 && dpSpent.value > effBattle.value.dp)
const dpHelpOpen = ref(false)

const battleSizes = rosterCore.battleSizes
const effBattle = computed(() => effectiveBattle({ battleSize: battleSize.value, customPoints: customPoints.value }, rosterCore))
const limit = computed(() => effBattle.value.points)

// ── Unit selection (step 2) ──
// Same two operations the editor performs, from rosterEngine — not a second implementation. The
// wizard's own copy of the removal used to forget that a Leader attached to the departing unit has
// to let go of it, which is the divergence useRosterEditing exists to prevent everywhere else.
function addUnit(unitId) {
  if (addUnitEntry(units.value, defOf(unitId), unitId, uid())) syncUnits()
}
function removeUnit(unitId) {
  if (removeUnitEntry(units.value, unitId)) syncUnits()
}
// The list pane's own two per-entry actions. `removeEntry` names the exact line, which is a
// different thing from the catalogue's "−" (that one takes the last copy of the datasheet) as soon
// as the list holds two of a unit configured differently.
function removeEntry(entry) {
  if (openUid.value === entry.uid) openUid.value = null
  if (removeUnitEntry(units.value, entry.id, entry.uid)) syncUnits()
}
function duplicateEntry(entry) {
  if (duplicateUnitEntry(units.value, entry.uid, uid())) syncUnits()
}
// The catalogue's "+" stops at the duplicate cap while legality checking is on; so does the copy
// button, off the same two helpers (see RosterEditorView, which asks it the same way).
const dupCounts = computed(() => duplicateCounts(units.value, defOf))
function dupBlocked(e) {
  if (!checkLegality.value) return false
  const def = defOf(e.id)
  if (!def) return true
  const cap = effBattle.value?.dupLimit ? duplicateLimit(def, effBattle.value.dupLimit) : Infinity
  return (dupCounts.value.get(capKeyOf(def)) || 0) >= cap
}

// Write the units through to the saved roster as soon as there IS one (step 2 onwards). The wizard
// used to hold them in component state until "Done", so leaving the way every other screen expects
// to be left — the "Back to list" link, the phone's back gesture, a reload — threw away everything
// picked and left a roster that had been created but was empty. Assigning the same array keeps its
// identity, so per-entry edits ride the store's own deep-watch autosave from then on.
function syncUnits() {
  if (rosterId.value) updateRoster(rosterId.value, { units: units.value })
}
const points = computed(() => rosterPoints(units.value, defOf, curDetachments.value))

// Live validation, same as the editor's (see rosterValidation.js — never blocks, just reports).
// Only reachable once a faction is picked; shown from step 2 on, next to the points readout in
// .rc-sticky. The main case worth surfacing this early for: units added under a bigger battle
// size, then the size lowered again on step 1 — duplicate caps shrink out from under counts
// that already exist (RosterUnitBrowser.vue's isOver badge flags this per-unit, this is the
// same overDuplicate check, army-wide).
const issuesOpen = ref(false)
const validation = computed(() =>
  factionData.value
    ? validateRoster(
        { faction: factionSlug.value, detachments: detachments.value, battleSize: battleSize.value, customPoints: customPoints.value, units: units.value },
        { faction: factionData.value, core: rosterCore },
      )
    : { points: points.value, issues: [], errorCount: 0 })

// ── Per-unit configuration (the list pane of step 2) ──
// Only one entry's fields open at a time — opening another closes whichever was open, same as a
// classic accordion (not the independently-toggled group accordions in the catalogue).
const openUid = ref(null)
function toggleOpen(entryUid) {
  openUid.value = openUid.value === entryUid ? null : entryUid
}
function toggleWarlord(entryUid) {
  const e = units.value.find((u) => u.uid === entryUid)
  if (!e) return
  const on = e.warlord === true
  for (const u of units.value) delete u.warlord // exactly one warlord per army
  if (!on) e.warlord = true
}
// Which slot an attached character fills — the editor asks it the same way, and the block itself
// is drawn by RosterUnitList (rosterEngine's joinAttached).
function attachRole(e) {
  const host = e.leaderOf && units.value.find((u) => u.uid === e.leaderOf)
  if (!host) return ''
  const type = leadsFor(defOf(e.id), e, curDetachments.value).find((l) => l.to === host.id)?.type
  return type === 'support' ? labels.value.rosterSupportTag : labels.value.rosterLeaderTag
}
// Per-entry points + copy index (copy tax assigned in list order), for the row + the fields.
const entryMeta = computed(() => {
  const seen = new Map()
  const m = new Map()
  for (const e of units.value) {
    const copyIndex = (seen.get(e.id) || 0) + 1
    seen.set(e.id, copyIndex)
    m.set(e.uid, { points: unitPoints(defOf(e.id), e, copyIndex, curDetachments.value), copyIndex })
  }
  return m
})
// Same split the editor and the browser use — allies under their own heading (rosterEngine's
// sectionsOf), a group the detachment doesn't unlock kept visible once something is in it.
const groupedUnits = computed(() =>
  sectionsOf(units.value, {
    faction: factionData.value, detachments: curDetachments.value, defOf, keepLocked: true,
    pairAttached: true,
  }).map((sec) => ({ ...sec, entries: sec.items })))

// An allied unit's datasheet belongs to its own faction; the namespaced id says which.
function slugFor(id) { return allySourceOf(id)?.[0] || factionSlug.value }

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
  battleSize.value = resumed.battleSize || 'strike-force'
  customPoints.value = resumed.customPoints ?? 2000
  checkLegality.value = resumed.checkLegality !== false
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
    battleSize: battleSize.value,
    customPoints: customPoints.value,
    checkLegality: checkLegality.value,
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
watch([name, factionSlug, detachments, battleSize, customPoints, checkLegality, step], () => {
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
.roster-create { padding-top: 0.75rem; padding-bottom: 2rem; }

.rc-steps { display: flex; align-items: center; gap: 0.5rem; margin: 0.9rem 0 1.25rem; font-size: 0.85rem; }
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
/* The unit-selection panel has a fixed footer overlaying the bottom of the viewport — reserve
   room so the last rows of a long list aren't hidden behind it (mirrors .main-content's own
   bottom-nav reservation in App.vue). */
.rc-panel:has(.rc-sticky) { padding-bottom: 4.5rem; }
@media (max-width: 900px) {
  .rc-panel:has(.rc-sticky) { padding-bottom: calc(4.5rem + 52px + var(--safe-bottom, 0px)); }
}
/* Card + field language copied from the tracker's GameSetup (.player-card/.settings,
   .field, .btn-choose-twist, .seg, .dp-count) so the two setup flows read as one pattern. */
.rc-card {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 1rem;
}
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.field input[type="text"],
.field input[type="number"] {
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
}
.field input:focus { outline: none; border-color: var(--accent); }

.btn-choose {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  width: 100%;
  min-height: 44px;
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: border-color 0.15s;
}
.btn-choose:hover { border-color: var(--accent); }
.btn-choose:disabled { opacity: 0.5; cursor: not-allowed; }
.ct-name.placeholder { color: var(--text-muted); font-weight: 500; }
.ct-chev { color: var(--text-dim); }

.dp-count {
  font-style: normal;
  font-family: var(--font-mono);
  color: var(--accent);
  font-weight: 700;
  margin-left: 0.3rem;
}
.dp-count.over { color: #c0392b; }
.det-empty { font-size: 0.82rem; color: var(--text-dim); font-style: italic; margin: 0.25rem 0 0; }
.dp-help-text { margin: 0; font-size: 0.88rem; line-height: 1.5; color: var(--text-muted); }

/* This one picks a points level, so its labels are numbers — mono, like every other number in
   the builder. The rest is the global segmented control (style.css). */
.seg button { font-family: var(--font-mono); font-weight: 700; font-size: 0.78rem; }

.bsize-input {
  margin-top: 0.4rem;
  width: 8rem;
  padding: 0.4rem 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  border: 1px solid var(--accent);
  background: var(--bg-secondary);
  color: var(--text-primary);
}
.bsize-input:focus { outline: none; }

/* The list pane's empty state. */
.rc-cfg-empty { color: var(--text-muted); font-style: italic; text-align: center; padding: 1.5rem 0; }

.rc-actions { display: flex; justify-content: flex-end; }

/* Fixed (not sticky) — the unit list can run to 90+ rows, far taller than the viewport, so a
   flow-sticky footer would only engage once scrolled all the way to the list's end. Glued
   flush to the mobile bottom-nav (its real height is 52px — .bn-item's min-height in App.vue —
   not the 4.5rem used elsewhere as a rough content-padding buffer) and stays there — it's the
   anchor. MobileUtilityBar's floating buttons (resume/faction tabs/back-to-top) are the ones
   that yield: App.vue reserves this bar's height via --roster-sticky-h (:has(.rc-sticky) on
   .app-layout) and MobileUtilityBar's own bottom offset adds it, so its buttons float above
   this bar instead of over it. Don't also offset this bar's own bottom by --mobile-bar-h —
   that would just push the collision the other way. */
/* Same badge as RosterEditorView's header (.issues-badge/.hdr-icon there) — copied, not shared,
   scoped styles don't cross component boundaries. Opens RosterIssuesModal on click. */
/* Small phones, down to a 320px viewport: shrink the sticky bar's padding/gaps and the
   Back/Done buttons themselves (same treatment as RoundTracker's round-actions row) so the
   points readout + both buttons keep to one line instead of wrapping or overflowing. */
@media (max-width: 400px) {
  .rc-sticky-actions .btn-primary,
  .rc-sticky-actions .btn-ghost { padding: 0.45rem 0.7rem; font-size: 0.8rem; }
}

/* Per-faction accent — mirrors RosterEditorView / FactionLayout's three-step theme resolution. */
.roster-create.themed {
  --accent: var(--fa-light, var(--accent));
  --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black);
}
@media (prefers-color-scheme: dark) {
  .roster-create.themed { --accent: var(--fa-dark, var(--accent)); --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white); }
}
</style>

<!-- Explicit data-theme must win over prefers-color-scheme in both directions (see FactionLayout). -->
<style>
:root[data-theme='light'] .roster-create.themed { --accent: var(--fa-light, #8b2a33); --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black); }
:root[data-theme='dark'] .roster-create.themed { --accent: var(--fa-dark, #c8585e); --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white); }
</style>
