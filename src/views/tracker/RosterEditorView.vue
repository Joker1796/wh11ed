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
      <button v-if="roster.faction && roster.units.length" class="hdr-icon" :aria-label="labels.rosterUseInTracker" @click="useInTracker">
        <i class="bi bi-clipboard-data"></i>
      </button>
      <button v-if="roster.units.length" class="hdr-icon" :aria-label="labels.rosterExport" @click="exportOpen = true">
        <i class="bi bi-box-arrow-up"></i>
      </button>
    </header>

    <!-- Three switchable panels (not a sequential flow like the creation wizard — any panel can
         be reopened at any time while editing an existing roster). -->
    <div class="red-tabs" role="tablist">
      <button class="red-tab" :class="{ on: tab === 'settings' }" role="tab" :aria-selected="tab === 'settings'" @click="tab = 'settings'">{{ labels.rosterCreateStep1 }}</button>
      <button class="red-tab" :class="{ on: tab === 'units' }" role="tab" :aria-selected="tab === 'units'" @click="tab = 'units'">{{ labels.rosterViewTabUnits }}</button>
      <button class="red-tab" :class="{ on: tab === 'loadout' }" role="tab" :aria-selected="tab === 'loadout'" @click="tab = 'loadout'">{{ labels.rosterCreateStep3 }}</button>
    </div>

    <!-- Settings: faction, detachment(s), battle size -->
    <div v-if="tab === 'settings'" class="red-panel">
      <div class="red-choices">
        <button class="choice" @click="factionPickerOpen = true">
          <span class="ch-label">{{ labels.rosterFactionLabel }}</span>
          <span class="ch-value">{{ factionName || labels.rosterChoose }}</span>
          <i class="bi bi-chevron-down"></i>
        </button>
        <button class="choice" :disabled="!roster.faction" @click="detachmentPickerOpen = true">
          <span class="ch-label">{{ labels.rosterDetachmentLabel }}</span>
          <span class="ch-value">{{ detachmentSummary || labels.rosterChoose }}</span>
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
            <button class="bsize-btn" :class="{ on: roster.battleSize === 'custom' }" @click="setBattleSize('custom')">{{ labels.rosterCustom }}</button>
            <input
              v-if="roster.battleSize === 'custom'"
              class="bsize-input"
              type="number"
              min="0"
              step="5"
              :value="roster.customPoints"
              @input="setCustomPoints($event.target.value)"
            />
          </div>
        </div>
      </div>

      <label class="check" :class="{ on: roster.checkLegality !== false }">
        <input type="checkbox" :checked="roster.checkLegality !== false" @change="setCheckLegality($event.target.checked)" />
        <span>
          {{ labels.rosterCheckLegality }}
          <em class="check-note">{{ labels.rosterCheckLegalityNote }}</em>
        </span>
      </label>
    </div>

    <!-- Units: browse the faction catalogue, add/remove copies -->
    <div v-else-if="tab === 'units'" class="red-panel">
      <div v-if="!roster.faction" class="red-hint">{{ labels.rosterPickFaction }}</div>
      <RosterUnitBrowser
        v-else-if="factionData"
        :units="factionData.units"
        :faction-slug="roster.faction"
        :added-ids="roster.units.map((u) => u.id)"
        :detachments="curDetachments"
        :battle="effBattle"
        :check-legality="roster.checkLegality !== false"
        @add="addUnit"
        @remove="removeUnit"
      />
    </div>

    <!-- Loadout ("Комплектация"): per-unit configuration — size, wargear, warlord, enhancement,
         leader attachment — the same inline accordion as the creation wizard's step 3, one unit
         open at a time. Units are added/removed on the Units tab, not here. -->
    <div v-else class="red-panel">
      <div v-if="!roster.faction" class="red-hint">{{ labels.rosterPickFaction }}</div>
      <template v-else>
        <p v-if="!roster.units.length" class="red-empty">{{ labels.rosterUnitsEmpty }}</p>
        <div v-else class="redu-list">
          <template v-for="g in groupedUnits" :key="g.id">
            <template v-if="g.entries.length">
              <h3 class="rug-head">{{ labels[GROUP_LABEL_KEYS[g.id]] }}</h3>
              <div v-for="e in g.entries" :key="e.uid" class="redu-unit">
                <button
                  type="button"
                  class="redu-row"
                  :aria-expanded="openUid === e.uid"
                  @click="toggleOpen(e.uid)"
                >
                  <span class="redu-text">
                    <span class="redu-name">
                      <i v-if="e.warlord" class="bi bi-star-fill redu-star"></i>
                      {{ defOf(e.id)?.name || e.id }}
                    </span>
                    <span v-if="attachedToName(e)" class="redu-tag">
                      {{ labels.rosterAttachedTo }} <strong>{{ attachedToName(e) }}</strong>
                    </span>
                    <span v-for="s in attachedLeadersOf(e)" :key="s.uid" class="redu-tag">
                      <strong>{{ s.name }}</strong> ({{ s.type === 'support' ? labels.rosterSupportTag : labels.rosterLeaderTag }})
                    </span>
                    <span v-for="(line, i) in loadoutLines(e)" :key="i" class="redu-loadout">{{ line }}</span>
                  </span>
                  <span class="redu-pts">{{ entryMeta.get(e.uid)?.points }}</span>
                  <i class="bi redu-chev" :class="openUid === e.uid ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
                </button>
                <CollapseTransition :show="openUid === e.uid">
                  <div class="redu-fields">
                    <UnitEditorFields
                      v-if="defOf(e.id)"
                      :entry="e"
                      :def="defOf(e.id)"
                      :items="rosterItems.items"
                      :texts="rosterItems.texts"
                      :faction-slug="roster.faction"
                      :detachments="curDetachments"
                      :units="roster.units"
                      :can-warlord="canBeWarlord(defOf(e.id), curDetachments)"
                      :is-warlord="e.warlord === true"
                      :enh-options="enhOptionsFor(defOf(e.id), curDetachments, roster.units, e.uid)"
                      :leader-targets="leaderTargetsFor(defOf(e.id), roster.units, e.uid, defOf, curDetachments)"
                      @toggle-warlord="toggleWarlord(e.uid)"
                    />
                  </div>
                </CollapseTransition>
              </div>
            </template>
          </template>
        </div>
      </template>
    </div>

    <!-- Fixed footer bar — same shape as the creation wizard's own .rc-sticky
         (RosterCreateView.vue), Cancel/Save standing in for that one's Back/Next. -->
    <div class="rc-sticky">
      <div class="rc-sticky-info">
        <span class="rc-points" :class="{ over: points > limit }">{{ points }} / {{ limit }}</span>
        <button v-if="roster.faction" type="button" class="issues-badge" :class="validation.errorCount ? 'has-err' : 'ok'" @click="issuesOpen = true">
          <template v-if="validation.errorCount">
            <i class="bi bi-exclamation-triangle-fill"></i> {{ validation.errorCount }}
          </template>
          <i v-else class="bi bi-check-circle-fill"></i>
        </button>
      </div>
      <div class="rc-sticky-actions">
        <RouterLink to="/roster" class="btn-ghost">{{ labels.rosterCancel }}</RouterLink>
        <button class="btn-primary" @click="save">{{ labels.rosterSave }}</button>
      </div>
    </div>

    <FactionPickerModal
      v-if="factionPickerOpen"
      :selected="roster.faction"
      @pick="pickFaction"
      @close="factionPickerOpen = false"
    />
    <DetachmentPickerModal
      v-if="detachmentPickerOpen"
      :detachments="detachmentOptions"
      :selected="roster.detachments"
      :max-dp="effBattle.dp"
      :dp-spent="dpSpent"
      @toggle="toggleDetachment"
      @close="detachmentPickerOpen = false"
    />
    <RosterIssuesModal
      v-if="issuesOpen"
      :issues="validation.issues"
      @goto="(uid) => { issuesOpen = false; tab = 'loadout'; openUid = uid }"
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
import CollapseTransition from '../../components/CollapseTransition.vue'
import FactionPickerModal from '../../components/tracker/FactionPickerModal.vue'
import DetachmentPickerModal from '../../components/tracker/DetachmentPickerModal.vue'
import RosterUnitBrowser from '../../components/roster/RosterUnitBrowser.vue'
import UnitEditorFields from '../../components/roster/UnitEditorFields.vue'
import RosterIssuesModal from '../../components/roster/RosterIssuesModal.vue'
import RosterExportModal from '../../components/roster/RosterExportModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters, uid } from '../../composables/useRosters.js'
import rosterCore from '../../data/roster/core.js'
import { loadRosterFaction, rosterItems } from '../../data/roster/index.js'
import { factionGroups } from '../../data/factionsIndex.js'
import {
  UNIT_GROUPS, GROUP_LABEL_KEYS, bucketOf, unitPoints, rosterPoints,
  canBeWarlord, enhOptionsFor, leaderTargetsFor, leadsFor, defaultLoadoutLines, wargearNames, effectiveBattle,
} from '../../composables/rosterEngine.js'
import { validateRoster } from '../../composables/rosterValidation.js'
import { prefillDraftFromRoster } from '../../composables/rosterHandoff.js'
import { useTracker } from '../../composables/useTracker.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { rosterById } = useRosters()
const { current: trackerCurrent } = useTracker()

const tab = ref('units')

// Hand the roster to the tracker: pre-fill the setup draft, then go to the wizard (or the
// tracker home if a live game is in progress, so we never clobber it).
function useInTracker() {
  prefillDraftFromRoster(roster.value)
  router.push(trackerCurrent.value ? '/tracker' : '/tracker/game')
}

// Every edit already writes straight to the reactive store (useRosters.js's deep watch
// autosaves to localStorage on every change) — nothing here actually persists anything new.
// "Save" is the explicit close-out action: same destination the creation wizard's own
// "Done" lands on (RosterCreateView.vue's finish()), so both paths converge on the read-only
// view once a roster is considered finished.
function save() {
  router.push(`/roster/${roster.value.id}/view`)
}

const roster = computed(() => rosterById(route.params.id))
// A missing/deleted id → back to the list (no broken editor shell).
watch(roster, (r) => { if (!r) router.replace('/roster') }, { immediate: true })

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
const factionName = computed(() => allFactions.find((f) => f.slug === roster.value?.faction)?.name || '')
const factionColor = computed(() => allFactions.find((f) => f.slug === roster.value?.faction)?.color)
const accentStyle = computed(() => factionColor.value
  ? { '--fa-light': factionColor.value.light, '--fa-dark': factionColor.value.dark }
  : {})

// Detachment options for the tracker's DP-budget-aware multi-select picker (same shape and
// layout as the tracker: DP cost + Force Disposition).
const detachmentOptions = computed(() =>
  (factionData.value?.detachments || []).map((d) => ({ name: d.name, dp: d.dp || 0, forceDisposition: d.fd || '' })))
// The selected detachments' data objects (roster stores names).
const curDetachments = computed(() =>
  (roster.value?.detachments || [])
    .map((name) => (factionData.value?.detachments || []).find((d) => d.name === name))
    .filter(Boolean))
const detachmentSummary = computed(() => (roster.value?.detachments || []).join(', '))
const dpSpent = computed(() => curDetachments.value.reduce((s, d) => s + (d.dp || 0), 0))

const battleSizes = rosterCore.battleSizes
const effBattle = computed(() => effectiveBattle(roster.value || {}, rosterCore))
const limit = computed(() => effBattle.value.points)

function touch() { if (roster.value) roster.value.updatedAt = Date.now() }

function pickFaction(slug) {
  factionPickerOpen.value = false
  if (roster.value.faction === slug) return
  roster.value.faction = slug
  roster.value.detachments = []
  roster.value.units = [] // units belong to a faction — changing it invalidates them
  openUid.value = null
  touch()
}
// Multi-select: toggle a detachment name in/out (DP budget enforced by the picker's disabling).
function toggleDetachment(d) {
  const list = roster.value.detachments
  const at = list.indexOf(d.name)
  if (at >= 0) list.splice(at, 1)
  else list.push(d.name)
  // Enhancements belong to a detachment — clear any that no longer resolve.
  const names = new Set(roster.value.detachments)
  for (const u of roster.value.units) {
    if (u.enh && !curDetachments.value.some((det) => names.has(det.name) && det.enhancements.some((e) => e.name === u.enh))) delete u.enh
  }
  touch()
}
function setBattleSize(id) { roster.value.battleSize = id; touch() }
function setCustomPoints(v) { roster.value.customPoints = Math.max(0, Number(v) || 0); touch() }
function setCheckLegality(v) { roster.value.checkLegality = v; touch() }

// ── Units (added/removed on the Units tab) ──
const factionPickerOpen = ref(false)
const detachmentPickerOpen = ref(false)

function defaultSize(def) {
  const i = def.sizes.findIndex((s) => s.default)
  return i >= 0 ? i : 0
}
function addUnit(unitId) {
  const def = defOf(unitId)
  if (!def) return
  roster.value.units.push({ uid: uid(), id: unitId, size: defaultSize(def) })
  touch()
}
// Removes the most recently added copy of this unit — pairs with the browser's "-" button,
// which only shows once at least one copy is in the list.
function removeUnit(unitId) {
  for (let i = roster.value.units.length - 1; i >= 0; i--) {
    if (roster.value.units[i].id === unitId) {
      const [removed] = roster.value.units.splice(i, 1)
      // Drop any leader attachment that pointed at the removed unit, and close its accordion.
      for (const u of roster.value.units) if (u.leaderOf === removed.uid) delete u.leaderOf
      if (openUid.value === removed.uid) openUid.value = null
      touch()
      return
    }
  }
}

// ── Loadout tab: only one tile's fields open at a time (classic accordion) ──
const openUid = ref(null)
function toggleOpen(entryUid) {
  openUid.value = openUid.value === entryUid ? null : entryUid
}
function toggleWarlord(entryUid) {
  const e = roster.value.units.find((u) => u.uid === entryUid)
  if (!e) return
  const on = e.warlord === true
  for (const u of roster.value.units) delete u.warlord // exactly one warlord per army
  if (!on) e.warlord = true
  touch()
}
// Read-only loadout preview for the collapsed tile — default wargear (per mini) plus any
// deviations, so a customised unit doesn't just say "N upgrades".
function loadoutLines(e) {
  const def = defOf(e.id)
  if (!def) return []
  const defaults = defaultLoadoutLines(def, rosterItems.items, e).map((l) => (l.mini ? `${l.mini}: ${l.items}` : l.items))
  return [...defaults, ...wargearNames(def, e, rosterItems.items)]
}
// Leader/bodyguard relationship, shown both directions: a leader's tile says which unit it's
// attached to; the bodyguard unit it joined lists the Leader back on its own tile.
function attachedToName(e) {
  const target = e.leaderOf && roster.value.units.find((u) => u.uid === e.leaderOf)
  return target ? (defOf(target.id)?.name || target.id) : ''
}
function attachedLeadersOf(e) {
  return roster.value.units
    .filter((u) => u.leaderOf === e.uid)
    .map((u) => ({ uid: u.uid, name: defOf(u.id)?.name || u.id, type: leadsFor(defOf(u.id), u, curDetachments.value).find((l) => l.to === e.id)?.type }))
}

// Per-entry points + copy index (copy tax assigned in list order), for row display and the fields.
const entryMeta = computed(() => {
  const seen = new Map()
  const m = new Map()
  for (const e of roster.value?.units || []) {
    const copyIndex = (seen.get(e.id) || 0) + 1
    seen.set(e.id, copyIndex)
    m.set(e.uid, { points: unitPoints(defOf(e.id), e, copyIndex, curDetachments.value), copyIndex })
  }
  return m
})
const points = computed(() => rosterPoints(roster.value?.units, defOf, curDetachments.value))

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

/* Tab bar — same visual language as RosterViewView's read-only tabs. */
/* overflow-x is a safety net (so a too-narrow viewport scrolls the bar instead of wrapping/
   clipping it); the ≤360px media query below aims to avoid needing it at all at the sizes it's
   actually meant to fit. flex-shrink:0 keeps a tab's own text from being squeezed mid-word by
   the scroll container before it. */
.red-tabs { display: flex; gap: 0.4rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border); overflow-x: auto; }
.red-tab {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: -1px;
  flex-shrink: 0;
  white-space: nowrap;
}
.red-tab.on { color: var(--accent); border-bottom-color: var(--accent); }
@media (max-width: 360px) {
  .red-tab { padding: 0.45rem 0.6rem; font-size: 0.8rem; }
}

/* Reserve room for the fixed .rc-sticky footer below, same idea as RosterCreateView.vue's own
   .rc-panel:has(.rc-sticky) — it's always visible here (not gated to a completed step), so
   every tab needs the padding, not just one. */
.red-panel { display: flex; flex-direction: column; gap: 1.1rem; padding-bottom: 4.5rem; }
@media (max-width: 900px) {
  .red-panel { padding-bottom: calc(4.5rem + 52px + var(--safe-bottom, 0px)); }
}

.red-choices { display: flex; flex-wrap: wrap; gap: 0.6rem; }
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
.bsize-input {
  width: 5rem;
  padding: 0.2rem 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  border: 1px solid var(--accent);
  border-radius: 4px;
  background: var(--bg-secondary);
  color: var(--text-primary);
}
.bsize-input:focus { outline: none; }

/* Checkbox row — same recipe as the tracker's GameSetup.vue .check (scoped styles don't cross
   component boundaries, so it's copied rather than shared). */
.check {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--bg-secondary);
  font-size: 0.85rem;
  color: var(--text-muted);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.check:hover { border-color: var(--accent); }
.check.on {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}
.check.on span { color: var(--text-primary); }
.check-note {
  display: block;
  font-style: normal;
  font-size: 0.72rem;
  color: var(--text-dim);
}
.check input[type="checkbox"] {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  accent-color: var(--accent);
  cursor: pointer;
}

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
.rug-head:first-child { margin-top: 0; }

/* Loadout accordion — same card/row language as the creation wizard's step 3. */
.redu-unit {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}
.redu-unit:hover { border-color: var(--accent); }
.redu-row {
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
.redu-text { display: flex; flex-direction: column; flex: 1; min-width: 0; gap: 0.15rem; text-align: left; }
.redu-name { font-weight: 600; color: var(--text-primary); font-size: 0.92rem; }
.redu-star { color: #e3b341; font-size: 0.8rem; margin-right: 0.15rem; }
.redu-tag { font-size: 0.74rem; color: var(--accent); }
.redu-tag strong { font-weight: 700; }
.redu-loadout { font-size: 0.74rem; color: var(--text-dim); line-height: 1.4; }
.redu-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); flex-shrink: 0; }
.redu-chev { color: var(--text-dim); font-size: 0.7rem; flex-shrink: 0; }
/* Distinct from the header's plain --bg-card: an accent-tinted wash (same idiom as DatasheetCard's
   header/points bands). In LIGHT theme this reads fine against a selected checkbox tile
   (UnitEditorFields.vue's .opt-tile.on, itself a `color-mix(accent, transparent)` fill) — but in
   DARK theme the two accent tints sit too close in value and blended together, so dark mode drops
   the accent hue entirely for a plain darker-than-card shade instead (see the data-theme override
   below for the explicit-toggle case; this is the OS-preference default). */
.redu-fields { padding: 0.6rem 0.75rem 0.75rem; background: color-mix(in srgb, var(--accent) 10%, var(--bg-card)); border-top: 1px solid var(--border); }
@media (prefers-color-scheme: dark) {
  .redu-fields { background: color-mix(in srgb, var(--bg-card) 80%, black); }
}

/* Same button pair language as RosterCreateView.vue's own .rc-actions buttons — copied, not
   shared (scoped styles don't cross component boundaries). */
.btn-primary, .btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.3rem;
  border-radius: 5px;
  font-family: inherit;
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.2;
  cursor: pointer;
  border: none;
  text-decoration: none;
}
.btn-primary { background: var(--accent); color: #fff; }
.btn-ghost { background: none; border: 1px solid var(--border); color: var(--text-muted); }
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

/* Fixed footer bar — same recipe as RosterCreateView.vue's own .rc-sticky (copied, not shared):
   glued flush to the mobile bottom-nav (52px — .bn-item's min-height in App.vue), always
   visible here (not gated to a completed wizard step, so every tab reserves room for it via
   .red-panel's own padding-bottom above). MobileUtilityBar's floating buttons yield to it —
   App.vue reserves this exact bar's height via --roster-sticky-h (:has(.rc-sticky) on
   .app-layout, matched by class name alone, regardless of which view rendered it) — so don't
   rename this class without updating that selector too. */
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
    bottom: calc(52px + var(--safe-bottom, 0px));
    padding-bottom: 0.6rem;
  }
}
.rc-sticky-info { display: flex; align-items: center; gap: 0.5rem; }
.rc-points { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); }
.rc-points.over { color: #c0392b; }
.rc-sticky-actions { display: flex; gap: 0.5rem; }
@media (max-width: 400px) {
  .rc-sticky { padding: 0.5rem 0.6rem calc(0.5rem + var(--safe-bottom, 0px)); gap: 0.5rem; }
  .rc-points { font-size: 0.85rem; }
  .rc-sticky-info { gap: 0.35rem; }
  .issues-badge { padding: 0.25rem 0.4rem; font-size: 0.78rem; }
  .rc-sticky-actions { gap: 0.35rem; }
  .rc-sticky-actions .btn-primary,
  .rc-sticky-actions .btn-ghost { padding: 0.45rem 0.7rem; font-size: 0.8rem; }
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
:root[data-theme='light'] .redu-fields { background: color-mix(in srgb, var(--accent) 10%, var(--bg-card)); }
:root[data-theme='dark'] .redu-fields { background: color-mix(in srgb, var(--bg-card) 80%, black); }
</style>
