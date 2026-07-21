<template>
  <div class="roster-create themed" :style="accentStyle">
    <RouterLink to="/roster" class="back"><i class="bi bi-chevron-left"></i> {{ labels.rosterBackToList }}</RouterLink>

    <div class="rc-steps">
      <span class="rc-step" :class="{ on: step === 1, done: step > 1 }">1<span class="rc-step-label"> · {{ labels.rosterCreateStep1 }}</span></span>
      <span class="rc-step-sep">→</span>
      <span class="rc-step" :class="{ on: step === 2, done: step > 2 }">2<span class="rc-step-label"> · {{ labels.rosterViewTabUnits }}</span></span>
      <span class="rc-step-sep">→</span>
      <span class="rc-step" :class="{ on: step === 3 }">3<span class="rc-step-label"> · {{ labels.rosterCreateStep3 }}</span></span>
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
      </div>

      <div class="rc-actions">
        <button class="btn-primary" :disabled="!factionSlug" @click="goToUnits">{{ labels.trackerNextStep }} →</button>
      </div>
    </div>

    <!-- Step 2: unit selection — grouped like the faction datasheets page; click a row to
         preview its rules card, the "+" button adds it. -->
    <div v-show="step === 2" class="rc-panel">
      <RosterUnitBrowser
        v-if="factionData"
        :units="factionData.units"
        :faction-slug="factionSlug"
        :added-ids="units.map((u) => u.id)"
        @add="addUnit"
        @remove="removeUnit"
      />
      <div class="rc-sticky">
        <span class="rc-points" :class="{ over: points > limit }">{{ points }} / {{ limit }}</span>
        <div class="rc-sticky-actions">
          <button class="btn-ghost" @click="step = 1">← {{ labels.trackerBack }}</button>
          <button class="btn-primary" @click="step = 3">{{ labels.trackerNextStep }} →</button>
        </div>
      </div>
    </div>

    <!-- Step 3: per-unit configuration — same type grouping as the editor/read-only view;
         tapping a unit's tile opens an inline accordion (size, wargear, warlord, enhancement,
         leader attachment) instead of the editor's modal sheet, since every added unit can be
         worth a look before finishing. -->
    <div v-show="step === 3" class="rc-panel">
      <div v-if="!units.length" class="rc-cfg-empty">{{ labels.rosterUnitsEmpty }}</div>
      <div v-else class="rc-cfg">
        <template v-for="g in groupedUnits" :key="g.id">
          <template v-if="g.entries.length">
            <h3 class="rcg-head">{{ labels[GROUP_LABEL_KEYS[g.id]] }}</h3>
            <div v-for="e in g.entries" :key="e.uid" class="rcunit">
              <button
                type="button"
                class="rcunit-row"
                :aria-expanded="openUids.has(e.uid)"
                @click="toggleOpen(e.uid)"
              >
                <span class="rcunit-text">
                  <span class="rcunit-name">{{ defOf(e.id)?.name || e.id }}</span>
                  <span class="rcunit-sub">{{ summaryLine(e) }}</span>
                </span>
                <span class="rcunit-pts">{{ entryMeta.get(e.uid)?.points }}</span>
                <i class="bi rcunit-chev" :class="openUids.has(e.uid) ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
              </button>
              <CollapseTransition :show="openUids.has(e.uid)">
                <div class="rcunit-fields">
                  <UnitEditorFields
                    v-if="defOf(e.id)"
                    :entry="e"
                    :def="defOf(e.id)"
                    :items="rosterItems.items"
                    :texts="rosterItems.texts"
                    :faction-slug="factionSlug"
                    :can-warlord="canBeWarlord(defOf(e.id))"
                    :is-warlord="e.warlord === true"
                    :enh-options="enhOptionsFor(defOf(e.id), curDetachments, units, e.uid)"
                    :leader-targets="leaderTargetsFor(defOf(e.id), units, e.uid, defOf)"
                    @toggle-warlord="toggleWarlord(e.uid)"
                  />
                </div>
              </CollapseTransition>
            </div>
          </template>
        </template>
      </div>
      <div class="rc-sticky">
        <span class="rc-points" :class="{ over: points > limit }">{{ points }} / {{ limit }}</span>
        <div class="rc-sticky-actions">
          <button class="btn-ghost" @click="step = 2">← {{ labels.trackerBack }}</button>
          <button class="btn-primary" @click="finish">{{ labels.rosterDone }}</button>
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
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import BaseModal from '../../components/BaseModal.vue'
import CollapseTransition from '../../components/CollapseTransition.vue'
import FactionPickerModal from '../../components/tracker/FactionPickerModal.vue'
import DetachmentPickerModal from '../../components/tracker/DetachmentPickerModal.vue'
import RosterUnitBrowser from '../../components/roster/RosterUnitBrowser.vue'
import UnitEditorFields from '../../components/roster/UnitEditorFields.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters, uid } from '../../composables/useRosters.js'
import rosterCore from '../../data/roster/core.js'
import { loadRosterFaction, rosterItems } from '../../data/roster/index.js'
import { factionGroups } from '../../data/factionsIndex.js'
import {
  UNIT_GROUPS, GROUP_LABEL_KEYS, bucketOf, unitPoints, rosterPoints, entrySummary,
  canBeWarlord, enhOptionsFor, leaderTargetsFor, effectiveBattle,
} from '../../composables/rosterEngine.js'

const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { createRoster, updateRoster } = useRosters()

const step = ref(1)
const name = ref('')
const factionSlug = ref(null)
const detachments = ref([])
const battleSize = ref('strike-force')
const customPoints = ref(2000)
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
    factionData.value = await loadRosterFaction(slug)
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

function defaultSize(def) {
  const i = def.sizes.findIndex((s) => s.default)
  return i >= 0 ? i : 0
}

// ── Faction / detachment / battle size choices ──
const factionPickerOpen = ref(false)
const detachmentPickerOpen = ref(false)
function pickFaction(slug) {
  factionPickerOpen.value = false
  if (factionSlug.value === slug) return
  factionSlug.value = slug
  detachments.value = []
  units.value = [] // units belong to a faction — changing it invalidates them
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
function addUnit(unitId) {
  const def = defOf(unitId)
  if (!def) return
  units.value.push({ uid: uid(), id: unitId, size: defaultSize(def) })
}
// Removes the most recently added copy of this unit — pairs with the browser's "-" button,
// which only shows once at least one copy is in the list.
function removeUnit(unitId) {
  for (let i = units.value.length - 1; i >= 0; i--) {
    if (units.value[i].id === unitId) {
      units.value.splice(i, 1)
      return
    }
  }
}
const points = computed(() => rosterPoints(units.value, defOf, curDetachments.value))

// ── Per-unit configuration (step 3) ──
const openUids = ref(new Set())
function toggleOpen(entryUid) {
  const next = new Set(openUids.value)
  next.has(entryUid) ? next.delete(entryUid) : next.add(entryUid)
  openUids.value = next
}
function toggleWarlord(entryUid) {
  const e = units.value.find((u) => u.uid === entryUid)
  if (!e) return
  const on = e.warlord === true
  for (const u of units.value) delete u.warlord // exactly one warlord per army
  if (!on) e.warlord = true
}
function summaryLine(e) {
  return entrySummary(e, defOf(e.id), labels.value.rosterModelsLabel, labels.value.rosterUpgradesLabel)
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
const groupedUnits = computed(() =>
  UNIT_GROUPS.map((id) => ({
    id,
    entries: units.value.filter((e) => { const d = defOf(e.id); return d && bucketOf(d) === id }),
  })))

// ── Save point: the roster only becomes real — and shows up on /roster — once step 1 is
// filled in and the user moves on to picking units. Abandoning step 1 leaves no trace. ──
const rosterId = ref(null)
function step1Patch() {
  return {
    name: name.value.trim() || labels.value.rosterNewName,
    faction: factionSlug.value,
    detachments: detachments.value,
    battleSize: battleSize.value,
    customPoints: customPoints.value,
  }
}
function goToUnits() {
  if (rosterId.value) {
    updateRoster(rosterId.value, step1Patch())
  } else {
    const r = createRoster(step1Patch().name)
    rosterId.value = r.id
    updateRoster(r.id, step1Patch())
  }
  step.value = 2
}

// ── Finish: write the collected units, then hand off to the full editor ──
function finish() {
  updateRoster(rosterId.value, { ...step1Patch(), units: units.value })
  router.push(`/roster/${rosterId.value}`)
}
</script>

<style scoped>
.roster-create { padding-top: 0.75rem; padding-bottom: 2rem; }
.back { display: inline-flex; align-items: center; gap: 0.3rem; color: var(--text-muted); text-decoration: none; font-size: 0.85rem; }
.back:hover { color: var(--accent); }

.rc-steps { display: flex; align-items: center; gap: 0.5rem; margin: 0.9rem 0 1.25rem; font-size: 0.85rem; }
.rc-step { color: var(--text-dim); font-weight: 600; }
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
  .rc-panel:has(.rc-sticky) { padding-bottom: calc(4.5rem + 52px + var(--safe-bottom, 0px) + var(--resume-bar-h, 0px)); }
}
/* Card + field language copied from the tracker's GameSetup (.player-card/.settings,
   .field, .btn-choose-twist, .seg, .dp-count) so the two setup flows read as one pattern. */
.rc-card {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
}
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.field > span {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.field input[type="text"],
.field input[type="number"] {
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
}
.field input:focus { outline: none; border-color: var(--accent); }
@media (pointer: coarse) {
  .field input[type="text"], .field input[type="number"] { font-size: 16px; }
}

.btn-choose {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  width: 100%;
  min-height: 44px;
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--border);
  border-radius: 6px;
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
.help-btn {
  background: none;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  padding: 0 0.2rem;
  font-size: 0.9rem;
  line-height: 1;
  vertical-align: middle;
}
.help-btn:hover { color: var(--accent); }
.dp-help-text { margin: 0; font-size: 0.88rem; line-height: 1.5; color: var(--text-muted); }
.modal-body { padding: 0.9rem; }

.seg {
  display: flex;
  gap: 0;
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  width: fit-content;
}
.seg button {
  padding: 0.45rem 0.8rem;
  background: var(--bg-secondary);
  color: var(--text-muted);
  border: none;
  cursor: pointer;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.78rem;
  transition: background 0.15s, color 0.15s;
}
.seg button + button { border-left: 1px solid var(--border); }
.seg button.on { background: var(--accent); color: #fff; }

.bsize-input {
  margin-top: 0.4rem;
  width: 8rem;
  padding: 0.4rem 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  border: 1px solid var(--accent);
  border-radius: 4px;
  background: var(--bg-secondary);
  color: var(--text-primary);
}
.bsize-input:focus { outline: none; }

/* Step 3: per-unit accordion — same card/row language as RosterEditorView's .runit, minus its
   delete button (units are added/removed on step 2), plus the collapsible fields panel. */
.rc-cfg-empty { color: var(--text-muted); font-style: italic; text-align: center; padding: 1.5rem 0; }
.rcg-head {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 1.1rem 0 0.5rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--border);
}
.rcg-head:first-child { margin-top: 0; }
.rcunit {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}
.rcunit:hover { border-color: var(--accent); }
.rcunit-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}
.rcunit-text { display: flex; flex-direction: column; flex: 1; min-width: 0; gap: 0.1rem; }
.rcunit-name { font-weight: 600; color: var(--text-primary); font-size: 0.92rem; }
.rcunit-sub { font-size: 0.74rem; color: var(--text-dim); }
.rcunit-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); flex-shrink: 0; }
.rcunit-chev { color: var(--text-dim); font-size: 0.7rem; flex-shrink: 0; }
.rcunit-fields { padding: 0.6rem 0.75rem 0.75rem; border-top: 1px solid var(--border); }

.rc-actions { display: flex; justify-content: flex-end; }
.btn-primary, .btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.3rem;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
}
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-ghost { background: none; border: 1px solid var(--border); color: var(--text-muted); }
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

/* Fixed (not sticky) — the unit list can run to 90+ rows, far taller than the viewport, so a
   flow-sticky footer would only engage once scrolled all the way to the list's end. Glued
   flush to the mobile bottom-nav (its real height is 52px — .bn-item's min-height in App.vue —
   not the 4.5rem used elsewhere as a rough content-padding buffer). When the "back to game" bar
   is also showing (App.vue's --resume-bar-h, set whenever a game is in progress — /roster isn't
   excluded from it, same as any non-tracker route), this stacks above it instead of overlapping,
   the same way .main-content's own bottom padding does. */
.rc-sticky {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 150;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.6rem 1rem calc(0.6rem + var(--safe-bottom, 0px));
  background: var(--bg-primary);
  border-top: 1px solid var(--border);
}
@media (max-width: 900px) {
  .rc-sticky {
    bottom: calc(52px + var(--safe-bottom, 0px) + var(--resume-bar-h, 0px));
    padding-bottom: 0.6rem;
  }
}
.rc-points { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); }
.rc-points.over { color: #c0392b; }
.rc-sticky-actions { display: flex; gap: 0.5rem; }
/* Small phones, down to a 320px viewport: shrink the sticky bar's padding/gaps and the
   Back/Done buttons themselves (same treatment as RoundTracker's round-actions row) so the
   points readout + both buttons keep to one line instead of wrapping or overflowing. */
@media (max-width: 400px) {
  .rc-sticky { padding: 0.5rem 0.6rem calc(0.5rem + var(--safe-bottom, 0px)); gap: 0.5rem; }
  .rc-points { font-size: 0.85rem; }
  .rc-sticky-actions { gap: 0.35rem; }
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
