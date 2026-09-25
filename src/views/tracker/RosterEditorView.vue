<template>
  <div
    v-if="roster"
    class="roster-editor fa-themed"
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

    <!-- The name is a Settings answer: on a phone it heads that mode only, and on the desk it is
         the settings bar's first field. Over the Units panes it was a row of every phone's screen
         spent on something renamed once (2026-09-24, the builder's height pass). -->
    <header
      v-if="!desk && tab === 'settings'"
      class="red-head"
    >
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
      :show-name="true"
      :name="roster.name"
      :faction-slug="roster.faction"
      :faction-name="factionName"
      :detachments="roster.detachments || []"
      :detachment-summary="detachmentSummary"
      :detachment-options="detachmentOptions"
      :dp-spent="dpSpent"
      :max-dp="effBattle.dp"
      :dp-over-allowed="dpOverAllowed"
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
      :issue-count="validation.issues.length"
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
    >
      <!-- On the desk the close-out actions end the line the points already end, and the fixed
           footer is gone: its row went back to the three columns. -->
      <button
        type="button"
        class="btn-ghost"
        @click="leaveEditor"
      >
        {{ labels.rosterCancel }}
      </button>
      <button
        class="btn-primary"
        @click="save"
      >
        {{ labels.rosterSave }}
      </button>
    </RosterSettingsBar>


    <!-- Settings: the list's own answers, the same form as the wizard's step 1 -->
    <div
      v-if="!desk && tab === 'settings'"
      class="red-panel"
    >
      <RosterSetupFields
        :battle-size="roster.battleSize"
        :custom-points="roster.customPoints ?? 2000"
        :has-faction="!!roster.faction"
        :faction-name="factionName"
        :detachment-summary="detachmentSummary"
        :dp-spent="dpSpent"
        :dp-limit="effBattle.dp"
        :dp-over-allowed="dpOverAllowed"
        :disposition-cands="dispositionCands"
        :disposition="roster.disposition || ''"
        show-notes
        :notes="roster.notes || ''"
        :check-legality="roster.checkLegality !== false"
        @update:battle-size="setBattleSize"
        @update:custom-points="setCustomPoints"
        @update:disposition="setDisposition"
        @update:notes="setNotes"
        @update:check-legality="setCheckLegality"
        @pick-faction="factionPickerOpen = true"
        @pick-detachments="detachmentPickerOpen = true"
      />
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
              rules-button
              @add="addUnit"
              @open-rules="rulesOpen = true"
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

    <RosterUndoBar
      :undoable="undoable"
      @undo="undoRemove"
      @dismiss="dismissUndo"
    />

    <!-- Fixed footer bar — same shape as the creation wizard's own .rc-sticky
         (RosterCreateView.vue), Cancel/Save standing in for that one's Back/Next. Phone only: on
         the desk its contents are the settings bar's last word. -->
    <div
      v-if="!desk"
      class="rc-sticky"
    >
      <div class="rc-sticky-inner">
        <!-- On the desk the points and the issue badge are in the settings bar at the top, beside
             the choices that move them; repeating them here would be the same number twice. -->
        <RosterPointsTally
          class="rc-sticky-info"
          :points="points"
          :limit="limit"
          :error-count="validation.errorCount"
          :issue-count="validation.issues.length"
          :badge="!!roster.faction"
          @open-issues="issuesOpen = true"
        />
        <!-- Units or Settings: the two modes of the phone's editor. They were a row of tabs over
             the panes; here they cost no height at all, and the amber mark a tab wore when the
             settings still owe an answer rides on the gear. -->
        <div
          class="seg red-mode"
          role="group"
        >
          <button
            v-for="m in editorModes"
            :key="m.key"
            type="button"
            :class="{ on: tab === m.key }"
            :aria-pressed="tab === m.key"
            :aria-label="m.warn ? `${m.label} — ${m.warn}` : m.label"
            :title="m.warn || m.label"
            @click="tab = m.key"
          >
            <i :class="m.icon" />
            <span
              v-if="m.warn"
              class="red-mode-warn"
            />
          </button>
        </div>
        <div class="rc-sticky-actions">
          <!-- Cancel means it. The editor writes straight into the stored roster (useRosters
               auto-saves it), so this used to be a link to the list — it closed the screen with
               every change kept. It now puts the list back the way the screen found it, and asks
               first, because that is as irreversible as the editing it undoes. -->
          <!-- On the narrowest phones the word gives way to an icon: the footer carries the mode
               switch too, and "Отмена" beside "Сохранить" was pushing the gear under it. A revert
               arrow, not a cross (owner, 2026-09-25): this button puts the list back the way it
               was, and a cross reads as "close this" on a screen full of dialogs that close. -->
          <button
            type="button"
            class="btn-ghost red-cancel"
            :aria-label="labels.rosterCancel"
            :title="labels.rosterCancel"
            @click="leaveEditor"
          >
            <i class="bi bi-arrow-counterclockwise red-cancel-icon" />
            <span class="red-cancel-text">{{ labels.rosterCancel }}</span>
          </button>
          <button
            class="btn-primary"
            @click="save"
          >
            {{ labels.rosterSave }}
          </button>
        </div>
      </div>
    </div>

    <ConfirmModal
      v-if="discardOpen"
      :title="labels.rosterDiscardTitle"
      :message="discardMessage"
      :confirm-label="labels.rosterDiscardYes"
      :cancel-label="labels.rosterDiscardNo"
      @confirm="discardEdits"
      @close="discardOpen = false"
    />

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
    <RosterRulesModal
      v-if="rulesOpen && roster.faction"
      :faction-slug="roster.faction"
      :detachments="roster.detachments || []"
      @close="rulesOpen = false"
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
import ConfirmModal from '../../components/ConfirmModal.vue'
import FactionPickerModal from '../../components/tracker/FactionPickerModal.vue'
import DetachmentPickerModal from '../../components/tracker/DetachmentPickerModal.vue'
import RosterEntryFields from '../../components/roster/RosterEntryFields.vue'
import RosterUnitBrowser from '../../components/roster/RosterUnitBrowser.vue'
import RosterUndoBar from '../../components/roster/RosterUndoBar.vue'
import RosterUnitList from '../../components/roster/RosterUnitList.vue'
import RosterRulesModal from '../../components/roster/RosterRulesModal.vue'
import RosterSettingsBar from '../../components/roster/RosterSettingsBar.vue'
import RosterSetupFields from '../../components/roster/RosterSetupFields.vue'
import RosterPointsTally from '../../components/roster/RosterPointsTally.vue'
import RosterWorkbench from '../../components/roster/RosterWorkbench.vue'
import RosterIssuesModal from '../../components/roster/RosterIssuesModal.vue'
import RosterExportModal from '../../components/roster/RosterExportModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosterEditing } from '../../composables/useRosterEditing.js'
import { useRosterBuildActions } from '../../composables/useRosterBuildActions.js'
import { useFactionAccent } from '../../composables/useFactionAccent.js'
import { useMediaQuery } from '../../composables/useMediaQuery.js'
import rosterCore from '../../data/roster/core.js'
import { rosterItems } from '../../data/roster/index.js'
import { ROSTER_NOTES_MAX } from '../../composables/rosterEngine.js'
import { setupIssueCount } from '../../composables/rosterValidation.js'
import { useRosterSync } from '../../composables/useRosterSync.js'
import { rosterNameFit } from '../../utils/rosterNameFit.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { saveToCloud } = useRosterSync()

const tab = ref('units')
const rulesOpen = ref(false)

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

// Cancel: nothing to take back → just leave, same as the link this used to be. Something to take
// back → say what it is and ask. The list of parts is built in useRosterEditing; the words are
// here, where the locale is.
const discardOpen = ref(false)
const PART_LABEL = {
  added: 'rosterDiscardAdded',
  removed: 'rosterDiscardRemoved',
  changed: 'rosterDiscardChanged',
  name: 'rosterDiscardName',
  setup: 'rosterDiscardSetup',
}
const discardMessage = computed(() => {
  const what = changedParts.value.map((p) => labels.value[PART_LABEL[p.k]].replace('{n}', String(p.n))).join(', ')
  return what ? labels.value.rosterDiscardBody.replace('{what}', what) : labels.value.rosterDiscardBodyPlain
})
// Both ways out land on the list's own view (owner, 2026-09-24), where the editor was entered
// from and where Save lands too — not on the list of lists, one screen further than the player
// meant to go.
function leaveEditor() {
  if (!dirty.value) { router.push(`/roster/${roster.value.id}/view`); return }
  discardOpen.value = true
}
function discardEdits() {
  revertEdits()
  discardOpen.value = false
  router.push(`/roster/${roster.value.id}/view`)
}

// Roster, faction data, live points, validation and the add/duplicate/remove semantics all come
// from useRosterEditing.js — everything from `defOf` down is what it reads off the roster through
// useRosterDerived.js, the same answers the wizard and the read-only view get.
const {
  roster, factionData, defOf, curDetachments, effBattle, limit, points, validation, touch,
  dirty, changedParts, revertEdits,
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
// The phone's two modes, switched from the footer — Settings first, as the list is set up before
// it is filled (owner, 2026-09-24); the screen still opens on Units.
const editorModes = computed(() => [
  {
    key: 'settings',
    label: labels.value.rosterCreateStep1,
    icon: 'bi bi-gear',
    // A list can be perfectly legal and still owe an answer that lives on this tab — an undeclared
    // Force Disposition, a detachment never picked. Nothing said so from the Units tab, where the
    // whole build happens: the footer badge showed a green tick (it counts errors, and these are
    // warnings), so the player found out at Save and had to come back. The mark is the tab's job
    // rather than the badge's because it also answers WHERE to go.
    warn: setupIssueCount(validation.value.issues) ? labels.value.rosterTabNeedsSetup : '',
  },
  { key: 'units', label: labels.value.rosterViewTabUnits, icon: 'bi bi-layout-split', warn: '' },
])

// ── What building a list does (useRosterBuildActions.js — the wizard runs the same code) ──
const {
  factionPickerOpen, detachmentPickerOpen, pickFaction,
  detachmentOptions, detachmentSummary, dispositionCands, dpSpent, dpOverAllowed, toggleDetachment, clearDetachments,
  openUid, toggleOpen, openEntry, addUnit, duplicateEntry, removeEntry, toggleWarlord,
  undoable, undoRemove, dismissUndo, battleSizes,
} = useRosterBuildActions({
  roster: () => roster.value,
  factionData,
  curDetachments,
  effBattle,
  defOf,
  commit: touch,
  setFaction: (slug) => { roster.value.faction = slug },
})

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

/* The phone's mode switch in the footer: two icons, the global .seg. The amber dot is the mark
   PageTabs put on a tab that still owes an answer, moved onto the gear with it. */
/* The switch never shrinks: squeezed, `.seg`'s overflow clipped the gear and Cancel sat on top of
   it (a player's report, 2026-09-24, a Russian phone ≤375px). Room is made on the buttons instead. */
/* …and it stands in the middle of the room between the points and the buttons (owner,
   2026-09-24): equal auto margins, with the actions' own `margin-left: auto` (style.css) handed to
   the switch here, or the free space would split three ways and the gap would stay lopsided. */
.red-mode { flex-shrink: 0; margin: 0 auto; }
.red-mode + .rc-sticky-actions { margin-left: 0; }
.red-mode button { position: relative; padding: 0.45rem 0.7rem; font-size: 1rem; line-height: 1; }
.red-cancel-icon { display: none; }
@media (max-width: 400px) {
  .red-cancel-icon { display: inline; }
  .red-cancel-text { display: none; }
  .red-mode button { padding: 0.45rem 0.55rem; }
  .rc-sticky-actions .btn-primary,
  .rc-sticky-actions .btn-ghost { padding: 0.45rem 0.55rem; }
}

/* The narrowest phones, measured with the web fonts in (2026-09-24): everything a notch smaller
   rather than anything gone — Save keeps its word, the points their limit. */
@media (max-width: 360px) {
  .rc-sticky-inner { gap: 0.3rem; }
  .rc-sticky-actions { gap: 0.25rem; }
  .red-mode button { padding: 0.4rem 0.4rem; font-size: 0.9rem; }
  .rc-sticky-actions .btn-primary,
  .rc-sticky-actions .btn-ghost { padding: 0.4rem 0.4rem; font-size: 0.76rem; }
}
@media (max-width: 340px) {
  .rc-sticky-inner { padding-left: calc(0.35rem + var(--safe-left)); padding-right: calc(0.35rem + var(--safe-right)); }
}
.red-mode-warn {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--warning);
}
/* Height is the phone's scarce axis, and the panes below are sized to what is left of it. */
@media (max-width: 900px) {
  .red-back { display: none; }
  .red-head { margin: 0 0 0.6rem; padding-bottom: 0.4rem; }
  .rname-input { font-size: 1.35rem; }
  .red-panel { gap: 0.6rem; }
}

/* No reserve for the fixed .rc-sticky footer here: App.vue's `.main-content--desk` padding is
   that reserve at every width (the bar, the bottom nav where there is one, a gap), and
   RosterWorkbench sizes the panes to end exactly above it — any padding on top of that is height
   the page has to scroll by, and the page is meant to stand still. */
.red-panel { display: flex; flex-direction: column; gap: 1.1rem; }

/* The Settings tab's form is RosterSetupFields.vue, shared with the creation wizard's step 1. */

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
</style>
