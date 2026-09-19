<template>
  <div
    v-if="roster"
    class="roster-editor themed"
    :class="{ 'rw-host': desk || tab !== 'settings' }"
    :style="accentStyle"
  >
    <!-- `.rw-host` while the Units panes are up: the screen is then a column as tall as the
         window and the panes scroll inside themselves (RosterWorkbench); the Settings tab is an
         ordinary page. (No comment may sit BEFORE this root — see the src/views lint rule.) -->
    <!-- Not on a phone: the fixed bar's Back goes to the same place, and the panes below get the
         window minus everything above them, so a line here is a line taken from the catalogue. -->
    <RouterLink
      to="/roster"
      class="back red-back"
    >
      <i class="bi bi-chevron-left" /> {{ labels.rosterBackToList }}
    </RouterLink>

    <header class="red-head">
      <input
        class="rname-input"
        :class="nameFit"
        :value="roster.name"
        :placeholder="labels.rosterUntitled"
        @input="rename($event.target.value)"
      >
      <button
        v-if="roster.units.length"
        class="hdr-icon"
        :aria-label="labels.rosterExport"
        @click="exportOpen = true"
      >
        <i class="bi bi-box-arrow-up" />
      </button>
    </header>

    <!-- On the desk the settings are a line above the work (RosterSettingsBar), not a panel
         behind a tab: "how many points is this" and "which detachment am I in" are asked WHILE
         adding units, and answering them cost a tab switch and the loss of the reader's place in
         the catalogue. Narrower, the tabs stay — a phone has no line to give away. -->
    <RosterSettingsBar
      v-if="desk"
      :show-name="false"
      :name="roster.name"
      :faction-slug="roster.faction"
      :faction-name="factionName"
      :detachments="roster.detachments || []"
      :detachment-summary="detachmentSummary"
      :detachment-options="detachmentOptions"
      :dp-spent="dpSpent"
      :max-dp="effBattle.dp"
      :battle-size="roster.battleSize"
      :battle-sizes="battleSizes"
      :custom-points="roster.customPoints"
      :disposition="roster.disposition || ''"
      :disposition-cands="dispositionCands"
      :check-legality="roster.checkLegality !== false"
      :notes="roster.notes || ''"
      :points="points"
      :limit="limit"
      :error-count="validation.errorCount"
      @update:name="rename"
      @update:battle-size="setBattleSize"
      @update:custom-points="setCustomPoints"
      @update:disposition="setDisposition"
      @update:check-legality="setCheckLegality"
      @update:notes="setNotes"
      @pick-faction="pickFaction"
      @toggle-detachment="toggleDetachment"
      @clear-detachments="clearDetachments"
      @open-issues="issuesOpen = true"
    />

    <!-- Two switchable panels (not a sequential flow like the creation wizard — either can be
         reopened at any time while editing), drawn by the same PageTabs the faction pages, the
         roster list and the read-only list use. This screen kept its own underline tabs until
         2026-08-28, which made the editor the one roster screen whose tabs looked like something
         else. -->
    <PageTabs
      v-if="!desk"
      class="red-tabs"
      :tabs="editorTabs"
      @select="tab = $event"
    />

    <!-- Settings: faction, detachment(s), battle size -->
    <div
      v-if="!desk && tab === 'settings'"
      class="red-panel"
    >
      <div class="red-choices">
        <button
          class="choice"
          @click="factionPickerOpen = true"
        >
          <span class="ch-label">{{ labels.rosterFactionLabel }}</span>
          <span class="ch-value">{{ factionName || labels.rosterChoose }}</span>
          <i class="bi bi-chevron-down" />
        </button>
        <button
          class="choice"
          :disabled="!roster.faction"
          @click="detachmentPickerOpen = true"
        >
          <span class="ch-label">{{ labels.rosterDetachmentLabel }}</span>
          <span class="ch-value">{{ detachmentSummary || labels.rosterChoose }}</span>
          <i class="bi bi-chevron-down" />
        </button>
        <!-- An army has ONE Force Disposition — the card selected after mustering, on which the
             opponent's symbol names your Primary Mission. One detachment settles it; several are a
             choice, and the LIST is where it is declared. Not a picker: there are never more than
             a handful of candidates, so they fit in the tile that shows the answer. -->
        <div
          v-if="dispositionCands.length"
          class="choice bsize"
        >
          <span class="ch-label">{{ dispositionCands.length > 1 ? labels.rosterDispositionDeclared : labels.trackerDisposition }}</span>
          <span
            v-if="dispositionCands.length === 1"
            class="ch-value"
          >{{ dispositionCands[0] }}</span>
          <div
            v-else
            class="seg disp-opts"
          >
            <button
              v-for="d in dispositionCands"
              :key="d"
              :class="{ on: roster.disposition === d }"
              @click="setDisposition(d)"
            >
              {{ d }}
            </button>
          </div>
        </div>
        <!-- The player's plan for this list, in their own words: read at the table (the view screen
             shows it above its tabs, in a game as well as out of one), never read by a rule. Last
             of the settings because it is the only one that decides nothing. -->
        <div class="choice notes">
          <span class="ch-label">{{ labels.rosterNotes }}</span>
          <textarea
            class="notes-input"
            rows="3"
            :maxlength="ROSTER_NOTES_MAX"
            :value="roster.notes || ''"
            @input="setNotes($event.target.value)"
          />
        </div>
        <div class="choice bsize">
          <span class="ch-label">{{ labels.rosterBattleSizeLabel }}</span>
          <div class="bsize-opts">
            <button
              v-for="b in battleSizes"
              :key="b.id"
              class="bsize-btn"
              :class="{ on: roster.battleSize === b.id }"
              @click="setBattleSize(b.id)"
            >
              {{ b.points }}
            </button>
            <button
              class="bsize-btn"
              :class="{ on: roster.battleSize === 'custom' }"
              @click="setBattleSize('custom')"
            >
              {{ labels.rosterCustom }}
            </button>
            <input
              v-if="roster.battleSize === 'custom'"
              class="bsize-input"
              type="number"
              min="0"
              step="5"
              :value="roster.customPoints"
              @input="setCustomPoints($event.target.value)"
            >
          </div>
        </div>
      </div>

      <label
        class="check"
        :class="{ on: roster.checkLegality !== false }"
      >
        <input
          type="checkbox"
          :checked="roster.checkLegality !== false"
          @change="setCheckLegality($event.target.checked)"
        >
        <span>
          {{ labels.rosterCheckLegality }}
          <em class="check-note">{{ labels.rosterCheckLegalityNote }}</em>
        </span>
      </label>
    </div>

    <!-- Units: the catalogue and the roster's own list, side by side (`.roster-panes` in
         style.css). Adding a unit and configuring it used to be two screens — this tab and
         /roster/:id/add — which since wargear started deciding a unit's price meant a navigation
         per unit. Both panes now read from the same `useRosterEditing` handles they always did;
         only the layout changed. -->
    <div
      v-else
      class="red-panel rw-fill"
    >
      <div
        v-if="!roster.faction"
        class="red-hint"
      >
        {{ labels.rosterPickFaction }}
      </div>
      <template v-else>
        <!-- Same folded rules panel the creation wizard's Units step carries: editing a list is the
             same work as building one, and the rules are wanted in the same place. -->
        <RosterRulesPanel
          :faction-slug="roster.faction"
          :detachments="roster.detachments || []"
        />
        <RosterWorkbench
          :desk="desk"
          :selected="!!openEntry"
        >
          <template #catalog>
            <RosterUnitBrowser
              v-if="factionData"
              :units="factionData.units"
              :allies="factionData.allies || []"
              :faction-slug="roster.faction"
              :added-ids="roster.units.map((u) => u.id)"
              :detachments="curDetachments"
              :battle="effBattle"
              :remaining="limit - points"
              :check-legality="roster.checkLegality !== false"
              @add="addUnit"
              @remove="removeUnit"
            />
          </template>
          <template #list>
            <p
              v-if="!roster.units.length"
              class="red-empty"
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
          <!-- The desk's third column. Not rendered at all in the two-pane arrangement — there
               the list draws the same fields itself, under the row they belong to. -->
          <template #editor>
            <RosterEntryFields
              v-bind="fieldProps"
              :entry="openEntry"
              @toggle-warlord="toggleWarlord"
            />
          </template>
        </RosterWorkbench>
      </template>
    </div>

    <!-- Fixed footer bar — same shape as the creation wizard's own .rc-sticky
         (RosterCreateView.vue), Cancel/Save standing in for that one's Back/Next. -->
    <div class="rc-sticky">
      <div class="rc-sticky-inner">
        <!-- On the desk the points and the issue badge are in the settings bar at the top, beside
             the choices that move them; repeating them here would be the same number twice. -->
        <div
          v-if="!desk"
          class="rc-sticky-info"
        >
          <span
            class="rc-points"
            :class="{ over: points > limit }"
          >{{ points }} / {{ limit }}</span>
          <button
            v-if="roster.faction"
            type="button"
            class="issues-badge"
            :class="validation.errorCount ? 'has-err' : 'ok'"
            @click="issuesOpen = true"
          >
            <template v-if="validation.errorCount">
              <i class="bi bi-exclamation-triangle-fill" /> {{ validation.errorCount }}
            </template>
            <i
              v-else
              class="bi bi-check-circle-fill"
            />
          </button>
        </div>
        <div class="rc-sticky-actions">
          <RouterLink
            to="/roster"
            class="btn-ghost"
          >
            {{ labels.rosterCancel }}
          </RouterLink>
          <button
            class="btn-primary"
            @click="save"
          >
            {{ labels.rosterSave }}
          </button>
        </div>
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
      @clear="clearDetachments"
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
import FactionPickerModal from '../../components/tracker/FactionPickerModal.vue'
import DetachmentPickerModal from '../../components/tracker/DetachmentPickerModal.vue'
import RosterEntryFields from '../../components/roster/RosterEntryFields.vue'
import RosterUnitBrowser from '../../components/roster/RosterUnitBrowser.vue'
import RosterUnitList from '../../components/roster/RosterUnitList.vue'
import RosterRulesPanel from '../../components/roster/RosterRulesPanel.vue'
import RosterSettingsBar from '../../components/roster/RosterSettingsBar.vue'
import RosterWorkbench from '../../components/roster/RosterWorkbench.vue'
import RosterIssuesModal from '../../components/roster/RosterIssuesModal.vue'
import RosterExportModal from '../../components/roster/RosterExportModal.vue'
import PageTabs from '../../components/PageTabs.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosterEditing } from '../../composables/useRosterEditing.js'
import { useFactionAccent } from '../../composables/useFactionAccent.js'
import { useMediaQuery } from '../../composables/useMediaQuery.js'
import rosterCore from '../../data/roster/core.js'
import { rosterItems } from '../../data/roster/index.js'
import { ROSTER_NOTES_MAX, dispositionCandidates } from '../../composables/rosterEngine.js'
import { useRosterSync } from '../../composables/useRosterSync.js'
import { rosterNameFit } from '../../utils/rosterNameFit.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { saveToCloud } = useRosterSync()

const tab = ref('units')

// The one media query this screen asks: three columns with the settings on a line above them, or
// the tabs and two panes it has always had. 1200px is where a third column stops squeezing the
// other two — below it the catalogue's rows start wrapping their prices.
const desk = useMediaQuery('(min-width: 1200px)')

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

// Roster, faction data, live points, validation and the add/duplicate/remove semantics all come
// from useRosterEditing.js — everything from `defOf` down is what it reads off the roster through
// useRosterDerived.js, the same answers the wizard and the read-only view get.
const {
  roster, factionData, defOf, curDetachments, effBattle, limit, points, validation, touch,
  addUnit, duplicateUnit, removeUnit,
  slugFor, entryMeta, groupedUnits, attachRole, dupBlocked, fieldProps,
} = useRosterEditing(() => route.params.id)

// A missing/deleted id → back to the list (no broken editor shell).
watch(roster, (r) => { if (!r) router.replace('/roster') }, { immediate: true })

const nameFit = computed(() => rosterNameFit(roster.value?.name))

// ── Army choices ──
// The faction accent, from the recipe every faction-coloured screen shares (useFactionAccent.js).
const { factionName, accentStyle } = useFactionAccent(computed(() => roster.value?.faction))

// Detachment options for the tracker's DP-budget-aware multi-select picker (same shape and
// layout as the tracker: DP cost + Force Disposition).
// PageTabs only draws; which panel is open is this screen's own state, same as RosterViewView.
const editorTabs = computed(() => [
  { key: 'settings', label: labels.value.rosterCreateStep1, active: tab.value === 'settings' },
  { key: 'units', label: labels.value.rosterViewTabUnits, active: tab.value === 'units' },
])

const detachmentOptions = computed(() =>
  (factionData.value?.detachments || []).map((d) => ({ name: d.name, dp: d.dp || 0, forceDisposition: d.fd || '' })))
const detachmentSummary = computed(() => (roster.value?.detachments || []).join(', '))
const dispositionCands = computed(() => dispositionCandidates(curDetachments.value))
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
// Multi-select: toggle a detachment name in/out (what the budget allows is decided by the
// picker, which offers nothing a tap could not do).
function toggleDetachment(d) {
  const list = roster.value.detachments
  const at = list.indexOf(d.name)
  if (at >= 0) list.splice(at, 1)
  else list.push(d.name)
  dropOrphanEnhancements()
  touch()
}

// Enhancements belong to a detachment — an entry carrying one the list no longer fields keeps a
// name nothing resolves, so it is dropped whenever the selection changes.
function dropOrphanEnhancements() {
  const names = new Set(roster.value.detachments)
  for (const u of roster.value.units) {
    if (u.enh && !curDetachments.value.some((det) => names.has(det.name) && det.enhancements.some((e) => e.name === u.enh))) delete u.enh
  }
}

// Starting over: the picker offers only what can be taken, so with a spent budget this is the way
// back to the whole list.
function clearDetachments() {
  roster.value.detachments.splice(0)
  dropOrphanEnhancements()
  touch()
}
// A note is the one field here that keeps its own line breaks, so it is written straight rather
// than through rosterEngine's single-line `setNote` — only the length cap is shared.
function setNotes(v) {
  const text = String(v ?? '').slice(0, ROSTER_NOTES_MAX)
  if (text.trim()) roster.value.notes = text
  else delete roster.value.notes
  touch()
}
function setBattleSize(id) { roster.value.battleSize = id; touch() }
function setCustomPoints(v) { roster.value.customPoints = Math.max(0, Number(v) || 0); touch() }
function setCheckLegality(v) { roster.value.checkLegality = v; touch() }
function setDisposition(fd) { roster.value.disposition = fd; touch() }

// ── Units (added/removed on the Units tab) ──
const factionPickerOpen = ref(false)
const detachmentPickerOpen = ref(false)

// ── Loadout tab: only one tile's fields open at a time (classic accordion) ──
const openUid = ref(null)
function toggleOpen(entryUid) {
  openUid.value = openUid.value === entryUid ? null : entryUid
}
// The entry the desk's third column belongs to. Same `openUid` the accordion uses — one idea of
// "the unit being worked on", whichever arrangement is showing it.
const openEntry = computed(() => roster.value?.units.find((u) => u.uid === openUid.value) || null)

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

// An issue that concerns one specific entry sends the reader here
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
const issuesOpen = ref(false)
const exportOpen = ref(false)

function rename(name) {
  roster.value.name = name
  touch()
}
</script>

<style scoped>
.roster-editor { padding-top: 0.75rem; padding-bottom: 0; }

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
/* Same square box as the view header's own icons (RosterViewView) — a header icon is a header
   icon whichever screen it is on, and there a link and a button sit side by side. */
.hdr-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  flex: none;
  font: inherit;
  font-size: 1rem;
  line-height: 1;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
}
.hdr-icon:hover { border-color: var(--accent); color: var(--accent); }

/* The tabs are PageTabs' own; only where they sit is this screen's business. */
.red-tabs { margin-bottom: 1rem; }
/* Height is the phone's scarce axis, and the panes below are sized to what is left of it. */
@media (max-width: 900px) {
  .red-back { display: none; }
  .red-head { margin: 0 0 0.6rem; padding-bottom: 0.4rem; }
  .rname-input { font-size: 1.35rem; }
  .red-tabs { margin-bottom: 0.6rem; }
  .red-panel { gap: 0.6rem; }
}

/* No reserve for the fixed .rc-sticky footer here: App.vue's `.main-content--desk` padding is
   that reserve at every width (the bar, the bottom nav where there is one, a gap), and
   RosterWorkbench sizes the panes to end exactly above it — any padding on top of that is height
   the page has to scroll by, and the page is meant to stand still. */
.red-panel { display: flex; flex-direction: column; gap: 1.1rem; }

/* ONE card of settings, not five tiles. Each setting used to be its own bordered box that sized
   itself to its own words — a faction name, two detachment names, an empty notes field — so the
   column read as a ragged pile of backgrounds with a different right edge on every row. They are
   rows of one card now: one frame, one background, hairlines between them, every row the full
   width. Square corners and a frame doing the separating is the house style (CLAUDE.md, "Corners
   & surfaces"); this is the same recipe as `.opt-tile` lists elsewhere in the builder. */
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
  /* A button centres its text, which nobody noticed while every value was one or two words: a
     list of two detachment names wraps, and the wrapped lines sat centred under a left-aligned
     label. */
  text-align: left;
  gap: 0.15rem;
  padding: 0.5rem 0.75rem;
  background: none;
  border: none;
  border-top: 1px solid var(--border);
  cursor: pointer;
  position: relative;
}
.choice:first-child { border-top: none; }
/* The row lights by its BACKGROUND now that the border belongs to the card around it — and behind
   `hover: hover`, because iOS leaves a tap's hover state on until something else is tapped (that
   is why the detachment row sat permanently outlined on a phone). */
@media (hover: hover) {
  .choice:not(.bsize):hover { background: var(--bg-secondary); }
}
.choice:disabled { opacity: 0.5; cursor: not-allowed; }
.choice .bi { position: absolute; right: 0.6rem; top: 0.6rem; color: var(--text-dim); font-size: 0.7rem; }
.ch-label { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); }
.ch-value { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); padding-right: 0.9rem; }
.bsize-opts { display: inline-flex; gap: 0.25rem; margin-top: 0.1rem; }
/* The disposition tile holds the global segmented control instead of a value, so it sizes to its
   own words rather than stretching the row. */
.disp-opts { margin-top: 0.15rem; align-self: flex-start; }
.disp-opts button { font-size: 0.78rem; padding: 0.2rem 0.5rem; }
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

/* The notes tile is not a picker: it holds a field rather than a value, so it drops the button
   affordances (`.choice:not(.bsize)` hover, the chevron) and stretches its input to the tile. */
.choice.notes { cursor: default; }
.choice.notes:hover { background: none; }
.notes-input {
  width: 100%;
  margin-top: 0.1rem;
  padding: 0.3rem 0.45rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.85rem;
  line-height: 1.4;
  resize: vertical;
}
.notes-input:focus { outline: none; border-color: var(--accent); }

.red-hint, .red-empty { color: var(--text-muted); font-style: italic; text-align: center; padding: 1.5rem 0; }

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
</style>
