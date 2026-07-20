<template>
  <div class="roster-create themed" :style="accentStyle">
    <RouterLink to="/roster" class="back"><i class="bi bi-chevron-left"></i> {{ labels.rosterBackToList }}</RouterLink>

    <div class="rc-steps">
      <span class="rc-step" :class="{ on: step === 1, done: step > 1 }">1 · {{ labels.rosterCreateStep1 }}</span>
      <span class="rc-step-sep">→</span>
      <span class="rc-step" :class="{ on: step === 2 }">2 · {{ labels.rosterViewTabUnits }}</span>
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
          <span>{{ labels.rosterFactionLabel }}</span>
          <button class="btn-choose" @click="factionPickerOpen = true">
            <span class="ct-name" :class="{ placeholder: !factionSlug }">{{ factionName || labels.rosterChoose }}</span>
            <i class="bi bi-chevron-right ct-chev"></i>
          </button>
        </div>

        <div class="field">
          <span>
            {{ labels.rosterDetachmentLabel }}
            <em v-if="factionSlug" class="dp-count" :class="{ over: dpSpent > effBattle.dp }">{{ dpSpent }} / {{ effBattle.dp }} DP</em>
          </span>
          <button v-if="factionSlug" class="btn-choose" @click="detachmentPickerOpen = true">
            <span class="ct-name" :class="{ placeholder: !detachments.length }">{{ detachmentSummary || labels.rosterChoose }}</span>
            <i class="bi bi-chevron-right ct-chev"></i>
          </button>
          <p v-else class="det-empty">{{ labels.rosterPickFaction }}</p>
        </div>

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
      </div>

      <div class="rc-actions">
        <button class="btn-primary" :disabled="!factionSlug" @click="step = 2">{{ labels.trackerNextStep }} →</button>
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
      />
      <div class="rc-sticky">
        <span class="rc-points" :class="{ over: points > limit }">{{ points }} / {{ limit }}</span>
        <div class="rc-sticky-actions">
          <button class="btn-ghost" @click="step = 1">← {{ labels.trackerBack }}</button>
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
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FactionPickerModal from '../../components/tracker/FactionPickerModal.vue'
import DetachmentPickerModal from '../../components/tracker/DetachmentPickerModal.vue'
import RosterUnitBrowser from '../../components/roster/RosterUnitBrowser.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters, uid } from '../../composables/useRosters.js'
import rosterCore from '../../data/roster/core.js'
import { loadRosterFaction } from '../../data/roster/index.js'
import { factionGroups } from '../../data/factionsIndex.js'
import { rosterPoints, effectiveBattle } from '../../composables/rosterEngine.js'

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

const battleSizes = rosterCore.battleSizes
const effBattle = computed(() => effectiveBattle({ battleSize: battleSize.value, customPoints: customPoints.value }, rosterCore))
const limit = computed(() => effBattle.value.points)

// ── Unit selection (step 2) ──
function addUnit(unitId) {
  const def = defOf(unitId)
  if (!def) return
  units.value.push({ uid: uid(), id: unitId, size: defaultSize(def) })
}
const points = computed(() => rosterPoints(units.value, defOf, curDetachments.value))

// ── Finish: create the roster with everything collected, then hand off to the full editor ──
function finish() {
  const r = createRoster(name.value.trim() || labels.value.rosterNewName)
  updateRoster(r.id, {
    faction: factionSlug.value,
    detachments: detachments.value,
    battleSize: battleSize.value,
    customPoints: customPoints.value,
    units: units.value,
  })
  router.push(`/roster/${r.id}`)
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

.rc-panel { display: flex; flex-direction: column; gap: 1.1rem; }
/* The unit-selection panel has a fixed footer overlaying the bottom of the viewport — reserve
   room so the last rows of a long list aren't hidden behind it (mirrors .main-content's own
   bottom-nav reservation in App.vue). */
.rc-panel:has(.rc-sticky) { padding-bottom: 4.5rem; }
@media (max-width: 900px) {
  .rc-panel:has(.rc-sticky) { padding-bottom: calc(4.5rem + 4.5rem + var(--safe-bottom, 0px)); }
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
   flow-sticky footer would only engage once scrolled all the way to the list's end. Sits above
   the mobile bottom-nav (App.vue's own 4.5rem + safe-area reservation) via the media query. */
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
  .rc-sticky { bottom: calc(4.5rem + var(--safe-bottom, 0px)); padding-bottom: 0.6rem; }
}
.rc-points { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); }
.rc-points.over { color: #c0392b; }
.rc-sticky-actions { display: flex; gap: 0.5rem; }

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
