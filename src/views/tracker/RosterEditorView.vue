<template>
  <div v-if="roster" class="roster-editor themed" :style="accentStyle">
    <RouterLink to="/roster" class="back"><i class="bi bi-chevron-left"></i> {{ labels.rosterBackToList }}</RouterLink>

    <header class="red-head">
      <input
        class="rname-input"
        :class="nameFit"
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

    <!-- Two switchable panels (not a sequential flow like the creation wizard — either can be
         reopened at any time while editing). Adding units is NOT one of them: it fills a page of
         its own at /roster/:id/add, reached from the button on the Units panel. -->
    <div class="red-tabs" role="tablist">
      <button class="red-tab" :class="{ on: tab === 'settings' }" role="tab" :aria-selected="tab === 'settings'" @click="tab = 'settings'">{{ labels.rosterCreateStep1 }}</button>
      <button class="red-tab" :class="{ on: tab === 'units' }" role="tab" :aria-selected="tab === 'units'" @click="tab = 'units'">{{ labels.rosterViewTabUnits }}</button>
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

    <!-- Units: the roster's own list — per-unit configuration (size, wargear, warlord,
         enhancement, leader attachment) as an inline accordion, one unit open at a time. This is
         what the tab shows now; browsing the faction catalogue to ADD a unit happens on its own
         page, one tap away. -->
    <div v-else class="red-panel">
      <div v-if="!roster.faction" class="red-hint">{{ labels.rosterPickFaction }}</div>
      <template v-else>
        <RouterLink :to="`/roster/${roster.id}/add`" class="red-add">
          <i class="bi bi-plus-lg"></i> {{ labels.rosterAddUnits }}
        </RouterLink>
        <p v-if="!roster.units.length" class="red-empty">{{ labels.rosterUnitsEmpty }}</p>
        <div v-else class="redu-list">
          <template v-for="g in groupedUnits" :key="g.id">
            <template v-if="g.entries.length">
              <h3 class="rug-head" :class="{ locked: g.locked }">
                {{ g.ally ? g.ally.name : labels[GROUP_LABEL_KEYS[g.id]] }}
                <em v-if="g.ally" class="rug-ally">{{ g.locked ? labels.rosterAllyLocked : labels.rosterAllySection }}</em>
              </h3>
              <template v-for="(e, idx) in g.entries" :key="e.uid">
              <div class="redu-unit" :class="{ 'redu-attached roster-attached': e.leaderOf }">
                <!-- The row is itself a button (it opens the config), so the delete sits BESIDE
                     it rather than inside — a button inside a button is invalid and doesn't get
                     its own click on every browser. -->
                <div class="redu-head">
                <button
                  type="button"
                  class="redu-row"
                  :aria-expanded="openUid === e.uid"
                  @click="toggleOpen(e.uid)"
                >
                  <!-- The row's own content is shared with the creation wizard's config step
                       (RosterUnitRow.vue) — the two screens draw the same line and used to hold
                       two copies of the markup to do it. The attachment ROLE is passed in: the
                       row sits under its bodyguard, so the nesting already says which unit the
                       character joined, but not which slot it fills. -->
                  <RosterUnitRow
                    :entry="e"
                    :def="defOf(e.id)"
                    :items="rosterItems.items"
                    :points="entryMeta.get(e.uid)?.points || 0"
                    :detachments="curDetachments"
                    :role="attachRole(e)"
                  />
                  <i class="bi redu-chev" :class="openUid === e.uid ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
                </button>
                <!-- A second copy of a unit that has already been configured — the wargear picks
                     are the expensive part, and the second squad in a list is usually the first
                     one again. Disabled at the duplicate cap (same reading as the catalogue's
                     "+"), with the reason in the tooltip rather than the button being hidden. -->
                <button
                  type="button"
                  class="redu-dup"
                  :disabled="dupBlocked(e)"
                  :aria-label="labels.rosterDuplicate"
                  :title="dupBlocked(e) ? labels.rosterAtDuplicateCap : labels.rosterDuplicate"
                  @click="duplicateEntry(e)"
                >
                  <i class="bi bi-copy"></i>
                </button>
                <button
                  type="button"
                  class="redu-del"
                  :aria-label="labels.rosterRemove"
                  :title="labels.rosterRemove"
                  @click="removeEntry(e)"
                >
                  <i class="bi bi-trash3"></i>
                </button>
                </div>
                <CollapseTransition :show="openUid === e.uid">
                  <div class="redu-fields">
                    <UnitEditorFields
                      v-if="defOf(e.id)"
                      :entry="e"
                      :def="defOf(e.id)"
                      :items="rosterItems.items"
                      :texts="rosterItems.texts"
                      :faction-slug="slugFor(e.id)"
                      :detachments="curDetachments"
                      :units="roster.units"
                      :def-of="defOf"
                      :can-warlord="canBeWarlord(defOf(e.id), curDetachments, [allegKeyword(defOf(e.id), e, curDetachments)])"
                      :is-warlord="e.warlord === true"
                      :enh-options="enhOptionsFor(defOf(e.id), curDetachments, roster.units, e.uid, roster.faction)"
                      :leader-targets="leaderTargetsFor(defOf(e.id), roster.units, e.uid, defOf, curDetachments)"
                      @toggle-warlord="toggleWarlord(e.uid)"
                    />
                  </div>
                </CollapseTransition>
              </div>
              <!-- The attached unit's own points, once, under the last row of the block: the
                   numbers above it still read down the column and still add up to the roster
                   total, which a combined figure on the bodyguard's row would have broken. -->
              <p v-if="blockTotal(g.entries, idx) != null" class="roster-sum">
                {{ labels.rosterAttachedTotal }} · {{ blockTotal(g.entries, idx) }}{{ labels.rosterPointsLabel }}
              </p>
              </template>
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
      @goto="(uid) => { issuesOpen = false; tab = 'units'; openUid = uid }"
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
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CollapseTransition from '../../components/CollapseTransition.vue'
import FactionPickerModal from '../../components/tracker/FactionPickerModal.vue'
import DetachmentPickerModal from '../../components/tracker/DetachmentPickerModal.vue'
import UnitEditorFields from '../../components/roster/UnitEditorFields.vue'
import RosterUnitRow from '../../components/roster/RosterUnitRow.vue'
import RosterIssuesModal from '../../components/roster/RosterIssuesModal.vue'
import RosterExportModal from '../../components/roster/RosterExportModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosterEditing } from '../../composables/useRosterEditing.js'
import rosterCore from '../../data/roster/core.js'
import { rosterItems } from '../../data/roster/index.js'
import { factionGroups } from '../../data/factionsIndex.js'
import {
  GROUP_LABEL_KEYS, allySourceOf, sectionsOf, attachedBlockTotal, unitPoints, capKeyOf,
  canBeWarlord, allegKeyword, enhOptionsFor, leaderTargetsFor, leadsFor,
} from '../../composables/rosterEngine.js'
import { duplicateCounts, duplicateLimit } from '../../composables/rosterValidation.js'
import { prefillDraftFromRoster } from '../../composables/rosterHandoff.js'
import { useTracker } from '../../composables/useTracker.js'
import { useRosterSync } from '../../composables/useRosterSync.js'
import { rosterNameFit } from '../../utils/rosterNameFit.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current: trackerCurrent } = useTracker()
const { saveToCloud } = useRosterSync()

const tab = ref('units')

// Hand the roster to the tracker: pre-fill the setup draft, then go to the wizard (or the
// tracker home if a live game is in progress, so we never clobber it).
function useInTracker() {
  prefillDraftFromRoster(roster.value)
  router.push(trackerCurrent.value ? '/tracker' : '/tracker/game')
}

// Every edit already writes straight to the reactive store (useRosters.js's deep watch
// autosaves to localStorage on every change) — nothing here actually persists anything new
// LOCALLY. "Save" is the explicit close-out action: same destination the creation wizard's own
// "Done" lands on (RosterCreateView.vue's finish()), so both paths converge on the read-only
// view once a roster is considered finished.
//
// It IS, however, the moment the cloud copy is written: uploads follow the Save click, never the
// autosave, so the cloud never collects half-built intermediate versions (useRosterSync.js).
// Fire-and-forget — the upload reports itself on the view page we're navigating to, and a failure
// leaves the list queued for the next visit rather than blocking the navigation.
function save() {
  saveToCloud(roster.value.id)
  router.push(`/roster/${roster.value.id}/view`)
}

// Roster, faction data, live points and validation come from the composable this view shares
// with the add-units page (/roster/:id/add) — see useRosterEditing.js for why they are shared
// rather than copied.
const {
  roster, factionData, defOf, curDetachments, effBattle, limit, points, validation, touch,
  duplicateUnit, removeUnit,
} = useRosterEditing(() => route.params.id)

// A missing/deleted id → back to the list (no broken editor shell).
watch(roster, (r) => { if (!r) router.replace('/roster') }, { immediate: true })

const nameFit = computed(() => rosterNameFit(roster.value?.name))

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
const detachmentSummary = computed(() => (roster.value?.detachments || []).join(', '))
const dpSpent = computed(() => curDetachments.value.reduce((s, d) => s + (d.dp || 0), 0))

const battleSizes = rosterCore.battleSizes

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

// ── Loadout tab: only one tile's fields open at a time (classic accordion) ──
const openUid = ref(null)
function toggleOpen(entryUid) {
  openUid.value = openUid.value === entryUid ? null : entryUid
}

// Delete ONE line, not "a copy of this datasheet": two of the same unit are configured
// separately, so the row's own uid is what goes. removeUnit() detaches any Leader that pointed
// at it (rosterEngine's removeUnitEntry) — the reason both screens share that one implementation.
function removeEntry(entry) {
  if (openUid.value === entry.uid) openUid.value = null
  removeUnit(entry.id, entry.uid)
}

// A configured copy, right under its original (rosterEngine's duplicateUnitEntry). Its accordion
// stays shut: a copy is wanted AS the original far more often than not, and opening it would push
// the row that was just tapped off the screen.
function duplicateEntry(entry) { duplicateUnit(entry.uid) }
// The catalogue's "+" stops at the duplicate cap when legality checking is on; so does this, off
// the same two helpers, or the one control that can add a unit without going through the
// catalogue would be the one that ignores the cap.
const dupCounts = computed(() => duplicateCounts(roster.value?.units, defOf))
function dupBlocked(e) {
  if (roster.value?.checkLegality === false) return false
  const def = defOf(e.id)
  if (!def) return true
  const cap = effBattle.value?.dupLimit ? duplicateLimit(def, effBattle.value.dupLimit) : Infinity
  return (dupCounts.value.get(capKeyOf(def)) || 0) >= cap
}

// The add-units page sends the reader here when an issue concerns one specific entry
// (`?unit=<uid>`) — open that unit's accordion and drop the query so a reload doesn't reopen it.
// Declared AFTER `openUid`: an immediate watcher runs during setup, and referencing a `const`
// declared further down would hit the temporal dead zone (which it did).
watch(() => route.query?.unit, (uid) => {
  if (!uid) return
  tab.value = 'units'
  openUid.value = String(uid)
  if (route.path) router.replace({ path: route.path })
}, { immediate: true })
function toggleWarlord(entryUid) {
  const e = roster.value.units.find((u) => u.uid === entryUid)
  if (!e) return
  const on = e.warlord === true
  for (const u of roster.value.units) delete u.warlord // exactly one warlord per army
  if (!on) e.warlord = true
  touch()
}
// Which slot an attached character fills — the one thing sitting under its bodyguard doesn't say
// (see sectionsOf's joinAttached: the two used to name each other because they were sections apart).
function attachRole(e) {
  const host = e.leaderOf && roster.value.units.find((u) => u.uid === e.leaderOf)
  if (!host) return ''
  const type = leadsFor(defOf(e.id), e, curDetachments.value).find((l) => l.to === host.id)?.type
  return type === 'support' ? labels.value.rosterSupportTag : labels.value.rosterLeaderTag
}
// The whole attached unit's points, printed once under the last row of the block.
const blockTotal = (entries, i) => attachedBlockTotal(entries, i, (x) => entryMeta.value.get(x.uid)?.points)

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
const issuesOpen = ref(false)
const exportOpen = ref(false)

// Allies get their own headings rather than being filed under a battlefield role — same split
// the add-units browser uses (rosterEngine's sectionsOf). `keepLocked` because a list can already
// hold a unit whose group the current Detachment doesn't unlock: it stays visible, under its group
// and marked, instead of vanishing from the screen while still counting in the total.
const groupedUnits = computed(() =>
  sectionsOf(roster.value?.units, {
    faction: factionData.value, detachments: curDetachments.value, defOf, keepLocked: true,
    pairAttached: true,
  }).map((sec) => ({ ...sec, entries: sec.items })))

// An allied unit's datasheet belongs to ITS faction (Draxus is an Imperial Agents sheet), which
// is what the namespaced id records.
function slugFor(id) { return allySourceOf(id)?.[0] || roster.value?.faction }

function rename(name) {
  roster.value.name = name
  touch()
}
</script>

<style scoped>
.redu-head { display: flex; align-items: stretch; gap: 0.25rem; }
.redu-head .redu-row { flex: 1; min-width: 0; }
.redu-dup,
.redu-del {
  flex: none; display: flex; align-items: center; justify-content: center;
  width: 2.1rem; padding: 0; border: none; background: none;
  color: var(--text-muted); font-size: 0.95rem; cursor: pointer;
}
.redu-dup:hover:not(:disabled) { color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); }
.redu-dup:disabled { opacity: 0.35; cursor: not-allowed; }
.redu-del:hover { color: #c0392b; background: color-mix(in srgb, #c0392b 8%, transparent); }

.roster-editor { padding-top: 0.75rem; padding-bottom: 5rem; }

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
/* One line of input either way — the step down is what lets a wordy name be read while it is
   being typed, instead of scrolling three words at a time. Same buckets as the view header. */
.rname-input.long { font-size: clamp(1.35rem, 5.2vw, 1.7rem); }
.rname-input.xlong { font-size: clamp(1.15rem, 4.4vw, 1.7rem); }
.rname-input:hover { border-bottom-color: var(--border); }
.rname-input:focus { outline: none; border-bottom-color: var(--accent); }
.hdr-icon {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.55rem;
  border: 1px solid var(--border);
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
/* The way into the add-units page. Deliberately a full-width, quiet block at the top of the
   list rather than a floating action button: the fixed bar at the bottom is already spoken for
   (Cancel/Save), and a second floating control there would fight it. */
.red-add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  margin-bottom: 0.7rem;
  padding: 0.6rem;
  border: 1px dashed color-mix(in srgb, var(--accent) 55%, var(--border));
  background: color-mix(in srgb, var(--accent) 6%, transparent);
  color: var(--accent);
  font-weight: 600;
  text-decoration: none;
}
.red-add:hover { background: color-mix(in srgb, var(--accent) 12%, transparent); }

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
/* An ally heading names the group; the tag after it says what the group IS, so the reader isn't
   left guessing why "Agents of the Imperium" is a heading inside a Custodes list. */
.rug-ally {
  margin-left: 0.5em;
  font-family: var(--font-body, inherit);
  font-size: 0.72rem;
  font-style: normal;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}
.rug-head.locked .rug-ally { color: #c0392b; }

/* Loadout accordion — same card/row language as the creation wizard's step 3. */
.redu-unit {
  background: var(--bg-card);
  border: 1px solid var(--border);
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
/* Closes the gap to the character indented below it — the block's own look is the shared
   .roster-attached / .roster-sum pair in style.css. */
.redu-unit:has(+ .redu-attached) { margin-bottom: 0; }
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

/* Fixed footer bar — same recipe as RosterCreateView.vue's own .rc-sticky (copied, not shared):
   glued flush to the mobile bottom-nav (52px — .bn-item's min-height in App.vue), always
   visible here (not gated to a completed wizard step, so every tab reserves room for it via
   .red-panel's own padding-bottom above). MobileUtilityBar's floating buttons yield to it —
   App.vue reserves this exact bar's height via --roster-sticky-h (:has(.rc-sticky) on
   .app-layout, matched by class name alone, regardless of which view rendered it) — so don't
   rename this class without updating that selector too. */
@media (max-width: 400px) {
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
