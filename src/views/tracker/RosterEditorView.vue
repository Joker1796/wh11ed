<template>
  <div v-if="roster" class="roster-editor themed" :style="accentStyle">
    <RouterLink to="/roster" class="back"><i class="bi bi-chevron-left"></i> {{ labels.rosterBackToList }}</RouterLink>

    <header class="red-head">
      <input
        class="rname-input"
        :value="roster.name"
        :placeholder="labels.rosterUntitled"
        @input="rename($event.target.value)"
      />
      <div class="rpoints" :class="{ over: points > limit }">
        <span class="rp-used">{{ points }}</span>
        <span class="rp-sep">/</span>
        <span class="rp-cap">{{ limit }}</span>
      </div>
      <button v-if="roster.faction" class="issues-badge" :class="validation.errorCount ? 'has-err' : 'ok'" @click="issuesOpen = true">
        <template v-if="validation.errorCount">
          <i class="bi bi-exclamation-triangle-fill"></i> {{ validation.errorCount }}
        </template>
        <i v-else class="bi bi-check-circle-fill"></i>
      </button>
      <button v-if="roster.faction && roster.units.length" class="hdr-icon" :aria-label="labels.rosterUseInTracker" @click="useInTracker">
        <i class="bi bi-clipboard-data"></i>
      </button>
      <button v-if="roster.units.length" class="hdr-icon" :aria-label="labels.rosterExport" @click="exportOpen = true">
        <i class="bi bi-box-arrow-up"></i>
      </button>
    </header>

    <!-- Army choices -->
    <div class="red-choices">
      <button class="choice" @click="factionPickerOpen = true">
        <span class="ch-label">{{ labels.rosterFactionLabel }}</span>
        <span class="ch-value">{{ factionName || labels.rosterChoose }}</span>
        <i class="bi bi-chevron-down"></i>
      </button>
      <button class="choice" :disabled="!roster.faction" @click="detachmentPickerOpen = true">
        <span class="ch-label">{{ labels.rosterDetachmentLabel }}</span>
        <span class="ch-value">{{ detachmentName || labels.rosterChoose }}</span>
        <i class="bi bi-chevron-down"></i>
      </button>
      <div class="choice bsize">
        <span class="ch-label">{{ labels.rosterBattleSizeLabel }}</span>
        <div class="bsize-opts">
          <button
            v-for="b in battleSizes"
            :key="b.id"
            class="bsize-btn"
            :class="{ on: roster.battleSize === b.id }"
            @click="setBattleSize(b.id)"
          >{{ b.points }}</button>
        </div>
      </div>
    </div>

    <!-- Units -->
    <div v-if="!roster.faction" class="red-hint">{{ labels.rosterPickFaction }}</div>
    <template v-else>
      <p v-if="!roster.units.length" class="red-empty">{{ labels.rosterUnitsEmpty }}</p>
      <div v-else class="red-units">
        <template v-for="g in groupedUnits" :key="g.id">
          <template v-if="g.entries.length">
            <h3 class="rug-head">{{ labels[GROUP_LABEL_KEYS[g.id]] }}</h3>
            <div v-for="e in g.entries" :key="e.uid" class="runit">
              <button class="runit-row" @click="openEditor(e.uid)">
                <span class="runit-text">
                  <span class="runit-name">{{ defOf(e.id)?.name || e.id }}</span>
                  <span class="runit-sub">{{ summaryLine(e) }}</span>
                </span>
                <span class="runit-pts">{{ entryMeta.get(e.uid)?.points }}</span>
                <i class="bi bi-chevron-right runit-chev"></i>
              </button>
              <button class="runit-del" :aria-label="labels.rosterRemove" @click="removeUnit(e.uid)">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </template>
        </template>
      </div>

      <div class="red-add">
        <button class="btn-add" :disabled="loadingFaction || !factionData" @click="unitPickerOpen = true">
          <i class="bi bi-plus-lg"></i> {{ labels.rosterAddUnit }}
        </button>
      </div>
    </template>

    <!-- Sticky mobile total -->
    <div class="red-sticky">
      <span class="st-points" :class="{ over: points > limit }">{{ points }} / {{ limit }}</span>
      <button v-if="roster.faction" class="st-add" :disabled="loadingFaction || !factionData" @click="unitPickerOpen = true">
        <i class="bi bi-plus-lg"></i> {{ labels.rosterAddUnit }}
      </button>
    </div>

    <FactionDetachmentPickerModal
      v-if="factionPickerOpen"
      :title="labels.rosterPickFaction"
      :detachments="factionOptions"
      :active-id="roster.faction"
      @pick="pickFaction"
      @close="factionPickerOpen = false"
    />
    <FactionDetachmentPickerModal
      v-if="detachmentPickerOpen"
      :title="labels.rosterPickDetachment"
      :detachments="detachmentOptions"
      :active-id="roster.detachment"
      @pick="pickDetachment"
      @close="detachmentPickerOpen = false"
    />
    <RosterUnitPickerModal
      v-if="unitPickerOpen && factionData"
      :units="factionData.units"
      @pick="addUnit"
      @close="unitPickerOpen = false"
    />
    <UnitEditorSheet
      v-if="editingEntry && editingDef"
      :entry="editingEntry"
      :def="editingDef"
      :items="rosterItems.items"
      :texts="rosterItems.texts"
      :faction-slug="roster.faction"
      :copy-index="entryMeta.get(editingUid)?.copyIndex || 1"
      :detachment="curDetachment"
      :can-warlord="editCanWarlord"
      :is-warlord="editingEntry.warlord === true"
      :enh-options="editEnhOptions"
      :leader-targets="editLeaderTargets"
      @toggle-warlord="toggleWarlord"
      @close="editingUid = null"
    />
    <RosterIssuesModal
      v-if="issuesOpen"
      :issues="validation.issues"
      @goto="(uid) => { issuesOpen = false; openEditor(uid) }"
      @close="issuesOpen = false"
    />
    <RosterExportModal
      v-if="exportOpen"
      :roster="roster"
      :faction="factionData"
      :core="rosterCore"
      :items="rosterItems.items"
      @close="exportOpen = false"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FactionDetachmentPickerModal from '../../components/FactionDetachmentPickerModal.vue'
import RosterUnitPickerModal from '../../components/roster/RosterUnitPickerModal.vue'
import UnitEditorSheet from '../../components/roster/UnitEditorSheet.vue'
import RosterIssuesModal from '../../components/roster/RosterIssuesModal.vue'
import RosterExportModal from '../../components/roster/RosterExportModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters, uid } from '../../composables/useRosters.js'
import rosterCore from '../../data/roster/core.js'
import { loadRosterFaction, rosterItems } from '../../data/roster/index.js'
import { factionGroups } from '../../data/factionsIndex.js'
import { UNIT_GROUPS, bucketOf, unitPoints, rosterPoints, canBeWarlord, enhEligible } from '../../composables/rosterEngine.js'
import { validateRoster } from '../../composables/rosterValidation.js'
import { prefillDraftFromRoster } from '../../composables/rosterHandoff.js'
import { useTracker } from '../../composables/useTracker.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { rosterById } = useRosters()
const { current: trackerCurrent } = useTracker()

// Hand the roster to the tracker: pre-fill the setup draft, then go to the wizard (or the
// tracker home if a live game is in progress, so we never clobber it).
function useInTracker() {
  prefillDraftFromRoster(roster.value, curDetachment.value?.name)
  router.push(trackerCurrent.value ? '/tracker' : '/tracker/game')
}

const roster = computed(() => rosterById(route.params.id))
// A missing/deleted id → back to the list (no broken editor shell).
watch(roster, (r) => { if (!r) router.replace('/roster') }, { immediate: true })

const GROUP_LABEL_KEYS = {
  epic: 'rosterGroupEpic', characters: 'rosterGroupCharacters', battleline: 'rosterGroupBattleline',
  transports: 'rosterGroupTransports', other: 'rosterGroupOther',
}

// ── Faction data (dynamic-imported so the heavy roster data only rides the editor chunk) ──
const factionData = ref(null)
const loadingFaction = ref(false)
async function loadFaction(slug) {
  if (!slug) { factionData.value = null; return }
  loadingFaction.value = true
  try {
    factionData.value = await loadRosterFaction(slug)
  } finally {
    loadingFaction.value = false
  }
}
watch(() => roster.value?.faction, (slug) => loadFaction(slug), { immediate: true })

const unitMap = computed(() => {
  const m = new Map()
  for (const u of factionData.value?.units || []) m.set(u.id, u)
  return m
})
function defOf(id) { return unitMap.value.get(id) }

// ── Army choices ──
const allFactions = factionGroups.flatMap((g) => g.factions)
const factionOptions = allFactions.map((f) => ({ id: f.slug, name: f.name }))
const factionName = computed(() => allFactions.find((f) => f.slug === roster.value?.faction)?.name || '')
const factionColor = computed(() => allFactions.find((f) => f.slug === roster.value?.faction)?.color)
const accentStyle = computed(() => factionColor.value
  ? { '--fa-light': factionColor.value.light, '--fa-dark': factionColor.value.dark }
  : {})

const detachmentOptions = computed(() =>
  (factionData.value?.detachments || []).map((d) => ({ id: d.sid, name: d.name, dp: d.dp || null })))
const curDetachment = computed(() =>
  (factionData.value?.detachments || []).find((d) => d.sid === roster.value?.detachment) || null)
const detachmentName = computed(() => curDetachment.value?.name || '')

const battleSizes = rosterCore.battleSizes
const limit = computed(() => battleSizes.find((b) => b.id === roster.value?.battleSize)?.points || 2000)

function touch() { if (roster.value) roster.value.updatedAt = Date.now() }

function pickFaction(slug) {
  factionPickerOpen.value = false
  if (roster.value.faction === slug) return
  roster.value.faction = slug
  roster.value.detachment = null
  roster.value.units = [] // units belong to a faction — changing it invalidates them
  touch()
}
function pickDetachment(id) {
  detachmentPickerOpen.value = false
  if (roster.value.detachment === id) return
  roster.value.detachment = id
  // Enhancements belong to a detachment — clear them when it changes.
  for (const u of roster.value.units) delete u.enh
  touch()
}
function setBattleSize(id) { roster.value.battleSize = id; touch() }

// ── Units ──
const factionPickerOpen = ref(false)
const detachmentPickerOpen = ref(false)
const unitPickerOpen = ref(false)

function defaultSize(def) {
  const i = def.sizes.findIndex((s) => s.default)
  return i >= 0 ? i : 0
}
function addUnit(unitId) {
  unitPickerOpen.value = false
  const def = defOf(unitId)
  if (!def) return
  roster.value.units.push({ uid: uid(), id: unitId, size: defaultSize(def) })
  touch()
}
function removeUnit(entryUid) {
  roster.value.units = roster.value.units.filter((e) => e.uid !== entryUid)
  // Drop any leader attachment that pointed at the removed unit.
  for (const u of roster.value.units) if (u.leaderOf === entryUid) delete u.leaderOf
  if (editingUid.value === entryUid) editingUid.value = null
  touch()
}
// ── Per-unit editor sheet ──
const editingUid = ref(null)
function openEditor(entryUid) { editingUid.value = entryUid }
const editingEntry = computed(() => roster.value?.units.find((e) => e.uid === editingUid.value) || null)
const editingDef = computed(() => editingEntry.value && defOf(editingEntry.value.id))

// Editing context passed to the sheet: warlord eligibility, enhancement options (eligible +
// not-already-used elsewhere), and — for a leader unit — the roster units it can join.
const editCanWarlord = computed(() => !!(editingDef.value && canBeWarlord(editingDef.value)))
function toggleWarlord() {
  const e = editingEntry.value
  if (!e) return
  const on = e.warlord === true
  for (const u of roster.value.units) delete u.warlord // exactly one warlord per army
  if (!on) e.warlord = true
  touch()
}
const editEnhOptions = computed(() => {
  const det = curDetachment.value
  const def = editingDef.value
  if (!det || !def) return []
  const usedElsewhere = new Set(
    roster.value.units.filter((u) => u.uid !== editingUid.value && u.enh).map((u) => u.enh))
  return det.enhancements.map((e) => ({
    name: e.name, pts: e.pts,
    eligible: enhEligible(e, def),
    used: usedElsewhere.has(e.name),
  }))
})
const editLeaderTargets = computed(() => {
  const def = editingDef.value
  if (!def?.leads?.length) return []
  const targetIds = new Set(def.leads.map((l) => l.to))
  return (roster.value?.units || [])
    .filter((u) => u.uid !== editingUid.value && targetIds.has(u.id))
    .map((u) => ({ uid: u.uid, name: defOf(u.id)?.name || u.id }))
})

// A one-line summary of an entry's current size + upgrade count for its list row.
function summaryLine(e) {
  const def = defOf(e.id)
  if (!def) return ''
  const size = def.sizes[e.size ?? 0] || def.sizes[0]
  const n = e.count ?? size.per[0]
  const parts = []
  if (e.warlord) parts.push('★')
  if (size.per[1] > 1) parts.push(`${n} ${labels.value.rosterModelsLabel}`)
  if (e.wg?.length) parts.push(`${e.wg.length} ${labels.value.rosterUpgradesLabel}`)
  if (e.enh) parts.push(e.enh)
  return parts.join(' · ')
}

// Per-entry points + copy index (copy tax assigned in list order), for row display and the sheet.
const entryMeta = computed(() => {
  const seen = new Map()
  const m = new Map()
  for (const e of roster.value?.units || []) {
    const copyIndex = (seen.get(e.id) || 0) + 1
    seen.set(e.id, copyIndex)
    m.set(e.uid, { points: unitPoints(defOf(e.id), e, copyIndex, curDetachment.value), copyIndex })
  }
  return m
})
const points = computed(() => rosterPoints(roster.value?.units, defOf, curDetachment.value))

// Live validation — never blocks, just reports (see rosterValidation.js).
const issuesOpen = ref(false)
const exportOpen = ref(false)
const validation = computed(() =>
  factionData.value
    ? validateRoster(roster.value, { faction: factionData.value, core: rosterCore })
    : { points: points.value, issues: [], errorCount: 0 })

const groupedUnits = computed(() =>
  UNIT_GROUPS.map((id) => ({
    id,
    entries: (roster.value?.units || []).filter((e) => { const d = defOf(e.id); return d && bucketOf(d) === id }),
  })))

// Denormalise the summary onto the roster so the list screen shows points/unit-count without
// loading faction data. Writing summary doesn't feed back into `points`, so no watch loop.
watchEffect(() => {
  if (!roster.value || !factionData.value) return
  roster.value.summary = { points: points.value, unitCount: roster.value.units.length, issues: validation.value.errorCount }
})

function rename(name) {
  roster.value.name = name
  touch()
}
</script>

<style scoped>
.roster-editor { padding-top: 0.75rem; padding-bottom: 5rem; }
.back { display: inline-flex; align-items: center; gap: 0.3rem; color: var(--text-muted); text-decoration: none; font-size: 0.85rem; }
.back:hover { color: var(--accent); }

.red-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.75rem 0 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid var(--accent);
}
.rname-input {
  flex: 1;
  min-width: 0;
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--text-primary);
  background: none;
  border: none;
  border-bottom: 1px dashed transparent;
}
.rname-input:hover { border-bottom-color: var(--border); }
.rname-input:focus { outline: none; border-bottom-color: var(--accent); }
.rpoints { font-family: var(--font-mono); font-weight: 700; font-size: 1.1rem; white-space: nowrap; }
.rp-used { color: var(--text-primary); }
.rpoints.over .rp-used { color: #c0392b; }
.rp-sep, .rp-cap { color: var(--text-dim); }
.issues-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--bg-card);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
}
.issues-badge.has-err { color: #c0392b; border-color: color-mix(in srgb, #c0392b 45%, var(--border)); }
.issues-badge.ok { color: #3c9a5f; }
.hdr-icon {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.55rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
}
.hdr-icon:hover { border-color: var(--accent); color: var(--accent); }

.red-choices { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.25rem; }
.choice {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  min-width: 8rem;
}
.choice:not(.bsize):hover { border-color: var(--accent); }
.choice:disabled { opacity: 0.5; cursor: not-allowed; }
.choice .bi { position: absolute; right: 0.6rem; top: 0.6rem; color: var(--text-dim); font-size: 0.7rem; }
.ch-label { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); }
.ch-value { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); padding-right: 0.9rem; }
.bsize-opts { display: inline-flex; gap: 0.25rem; margin-top: 0.1rem; }
.bsize-btn {
  padding: 0.2rem 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-muted);
  border-radius: 4px;
  cursor: pointer;
}
.bsize-btn.on { background: var(--accent); color: #fff; border-color: var(--accent); }

.red-hint, .red-empty { color: var(--text-muted); font-style: italic; text-align: center; padding: 1.5rem 0; }
.rug-head {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 1.1rem 0 0.5rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--border);
}
.runit {
  display: flex;
  align-items: stretch;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}
.runit:hover { border-color: var(--accent); }
.runit-row {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.5rem 0.6rem 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}
.runit-text { display: flex; flex-direction: column; flex: 1; min-width: 0; gap: 0.1rem; }
.runit-name { font-weight: 600; color: var(--text-primary); font-size: 0.92rem; }
.runit-sub { font-size: 0.74rem; color: var(--text-dim); }
.runit-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); }
.runit-chev { color: var(--text-dim); font-size: 0.7rem; }
.runit-del {
  background: none;
  border: none;
  border-left: 1px solid var(--border);
  color: var(--text-dim);
  cursor: pointer;
  padding: 0 0.7rem;
  font-size: 0.8rem;
}
.runit-del:hover { color: #c0392b; }

.red-add { margin-top: 1rem; }
.btn-add, .st-add {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.3rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
}
.btn-add:disabled, .st-add:disabled { opacity: 0.5; cursor: not-allowed; }

/* Sticky bottom total — shown on phones; the inline Add button hides there. */
.red-sticky {
  display: none;
  position: sticky;
  bottom: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin: 0 -1rem;
  padding: 0.6rem 1rem;
  background: var(--bg-primary);
  border-top: 1px solid var(--border);
}
.st-points { font-family: var(--font-mono); font-weight: 700; }
.st-points.over { color: #c0392b; }
@media (max-width: 640px) {
  .red-add { display: none; }
  .red-sticky { display: flex; }
}

/* Per-faction accent — mirrors FactionLayout.vue's three-step theme resolution. */
.roster-editor.themed {
  --accent: var(--fa-light, var(--accent));
  --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black);
}
@media (prefers-color-scheme: dark) {
  .roster-editor.themed { --accent: var(--fa-dark, var(--accent)); --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white); }
}
</style>

<!-- Explicit data-theme must win over prefers-color-scheme in both directions (see FactionLayout). -->
<style>
:root[data-theme='light'] .roster-editor.themed { --accent: var(--fa-light, #8b2a33); --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black); }
:root[data-theme='dark'] .roster-editor.themed { --accent: var(--fa-dark, #c8585e); --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white); }
</style>
