<template>
  <div class="roster-list">
    <div class="hero">
      <h1>{{ labels.rostersHeading }}</h1>
      <p class="hero-desc">{{ labels.rostersDesc }}</p>
      <!-- The builder can do more than the screen shows (import, share, hand-off to the tracker),
           so the explanation is one tap from the screen itself rather than buried in a footer. -->
      <RouterLink class="hero-help" to="/help#help-rosters">{{ labels.helpLearnMore }}</RouterLink>
    </div>

    <!-- One line of cloud status. Everything it can say is produced by the single pass below;
         there is no manual "Sync" button, on purpose. -->
    <RosterCloudBar hint />

    <div class="cta">
      <button class="btn-primary" @click="onNew">
        <i class="bi bi-plus-lg"></i> {{ labels.rosterNew }}
      </button>
      <!-- Most players already have their list somewhere else — in the GW app, in New Recruit.
           Pasting it beats rebuilding it, so the second way in sits beside the first. -->
      <button class="btn-ghost" @click="importOpen = true">
        <i class="bi bi-clipboard-plus"></i> {{ labels.rosterImport }}
      </button>
    </div>

    <!-- Saved lists and unfinished ones are the same kind of card but not the same kind of thing:
         a draft is a wizard run that hasn't been saved yet, so it lives behind its own tab and
         opens back into the wizard rather than into the read-only view. -->
    <div class="rl-tabs seg">
      <button :class="{ on: tab === 'saved' }" @click="tab = 'saved'">
        {{ labels.rosterTabSaved }} <span class="tab-n">{{ savedRosters.length }}</span>
      </button>
      <button :class="{ on: tab === 'drafts' }" @click="tab = 'drafts'">
        {{ labels.rosterTabDrafts }} <span class="tab-n">{{ draftRosters.length }}</span>
      </button>
    </div>

    <!-- An empty screen is where somebody stands who has not decided this is worth their evening,
         so it is also where the explanation belongs — not three taps away in a help menu. -->
    <p v-if="!shown.length" class="empty">{{ tab === 'drafts' ? labels.rosterDraftsEmpty : labels.rostersEmpty }}</p>
    <TransitionGroup v-else tag="ul" name="list" class="rosters">
      <li
        v-for="r in shown"
        :key="r.id"
        class="roster"
        :class="{ themed: !!factionOf(r) }"
        :style="cardStyle(r)"
        role="button"
        tabindex="0"
        @click="openRoster(r)"
        @keydown.enter="openRoster(r)"
      >
        <div class="roster-main">
          <span class="rname">{{ r.name || labels.rosterUntitled }}</span>
          <!-- A draft's actions sheet only ever held one item, so it is spared the extra tap:
               the card carries Delete itself. Everything a SAVED list can do still needs the
               sheet, so that one keeps the kebab. -->
          <button
            v-if="r.draft"
            class="kebab danger"
            :aria-label="labels.trackerDelete"
            @click.stop="pendingDelete = r.id"
          >
            <i class="bi bi-trash"></i>
          </button>
          <button v-else class="kebab" :aria-label="labels.rosterMoreActions" @click.stop="menuFor = r.id">
            <i class="bi bi-three-dots-vertical"></i>
          </button>
        </div>
        <span v-if="factionOf(r)" class="rfaction">{{ factionOf(r).name }}</span>
        <div class="roster-meta">
          <span class="meta-left">
            <span class="rpoints" :class="{ over: (r.summary?.points || 0) > limitOf(r) }">
              {{ r.summary?.points || 0 }}<span class="unit">/{{ limitOf(r) }} {{ labels.rosterPointsLabel }}</span>
            </span>
            <!-- What this list did on the table. Only ever present on a saved list — a draft
                 can't be attached to a game — and it links nowhere: the full record is on
                 /tracker/stats, which the tracker page carries a way into. -->
            <span v-if="recordOf(r)" class="rrec" :title="labels.statsTitle">
              <i class="bi bi-trophy"></i> {{ recordOf(r) }}
            </span>
            <span v-if="r.draft" class="rstep">{{ draftStepLabel(r) }}</span>
            <span v-else-if="r.summary?.issues" class="issues" :title="String(r.summary.issues)">
              <i class="bi bi-exclamation-triangle-fill"></i> {{ r.summary.issues }}
            </span>
          </span>
          <span class="date">{{ formatDate(r.updatedAt) }}</span>
        </div>
      </li>
    </TransitionGroup>

    <!-- Per-card actions: edit / duplicate / delete (mirrors the tracker's per-card actions sheet). -->
    <BaseModal v-if="menuFor" max-width="340px" @close="menuFor = null">
      <template #header>
        <header class="modal-head">
          <h3 class="mh-title">{{ menuRosterName }}</h3>
          <button class="mh-close" :aria-label="labels.modalClose" @click="menuFor = null">✕</button>
        </header>
      </template>
      <!-- Saved lists only — a draft deletes from its own card and never opens this. -->
      <div class="modal-body act-list">
        <button class="act-btn" @click="onEdit(menuFor)">{{ labels.rosterEdit }}</button>
        <!-- Export from here as well as from the editor: a finished list is passed on far more
             often than it is edited, and opening the editor to copy it is a detour. -->
        <button class="act-btn" :disabled="exportBusy" @click="onExport(menuFor)">{{ labels.rosterExportTitle }}</button>
        <button class="act-btn" @click="onDuplicate(menuFor)">{{ labels.rosterDuplicate }}</button>
        <button class="act-btn act-danger" @click="onDelete(menuFor)">{{ labels.trackerDelete }}</button>
      </div>
    </BaseModal>

    <ConfirmModal
      v-if="pendingDelete"
      :title="labels.trackerDelete"
      :message="labels.rosterDeleteConfirm"
      :confirm-label="labels.trackerDelete"
      :cancel-label="labels.trackerCancel"
      @confirm="confirmDelete"
      @close="pendingDelete = null"
    />

    <RosterImportModal v-if="importOpen" @imported="onImported" @close="importOpen = false" />

    <RosterExportModal
      v-if="exportRoster"
      :roster="exportRoster"
      :faction="exportFaction"
      :core="rosterCore"
      :items="rosterItems.items"
      @close="exportRoster = null"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseModal from '../../components/BaseModal.vue'
import RosterCloudBar from '../../components/roster/RosterCloudBar.vue'
import RosterImportModal from '../../components/roster/RosterImportModal.vue'
import RosterExportModal from '../../components/roster/RosterExportModal.vue'
import ConfirmModal from '../../components/ConfirmModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters } from '../../composables/useRosters.js'
import { useRosterSync } from '../../composables/useRosterSync.js'
import { useAuth } from '../../composables/useAuth.js'
import { useFormatDate } from '../../composables/useFormatDate.js'
import { effectiveBattle } from '../../composables/rosterEngine.js'
import { refreshSummaries } from '../../composables/rosterSummary.js'
import rosterCore from '../../data/roster/core.js'
import { rosterItems } from '../../data/roster/index.js'
import { factionGroups } from '../../data/factionsIndex.js'
import { loadHistory, rosterRecords } from '../../composables/gameStats.js'

const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()
const { rosters, savedRosters, draftRosters, duplicateRoster, deleteRoster, rosterById } = useRosters()
const { ensureSession } = useAuth()
const { syncNow, saveToCloud, removeFromCloud, pulled } = useRosterSync()

const tab = ref('saved')
const importOpen = ref(false)

// Exporting needs the faction's generated bundle (unit names, wargear, points), which this screen
// otherwise never loads — so it is fetched on demand, the same lazy load the editor does, and the
// menu stays disabled for the moment it takes.
const exportRoster = ref(null)
const exportFaction = ref(null)
const exportBusy = ref(false)
async function onExport(id) {
  const r = rosterById(id)
  if (!r?.faction || exportBusy.value) return
  exportBusy.value = true
  try {
    const { loadRosterFaction } = await import('../../data/roster/index.js')
    exportFaction.value = await loadRosterFaction(r.faction)
    exportRoster.value = r
    menuFor.value = null
  } finally {
    exportBusy.value = false
  }
}
// An imported list lands in the editor, not in the read-only view: whatever the report could not
// place is the reader's to finish, and that is where they can.
function onImported(id) { router.push(`/roster/${id}`) }
const shown = computed(() => (tab.value === 'drafts' ? draftRosters : savedRosters).value)
function draftStepLabel(r) {
  return labels.value.rosterDraftStep.replace('{n}', String(r.draftStep || 1))
}

// Points shown here come from each roster's cached summary — see rosterSummary.js. A roster no
// editing screen ever wrote one for (built in an older wizard, imported from a link) is priced
// once, here, instead of reading 0 forever.
//
// This is also the ONE cloud check per visit (useRosterSync.js): a single metadata GET, then only
// the uploads/downloads that metadata proves are needed. ensureSession() is a no-op unless the
// silent session restore hasn't run yet this page load. A list that arrived from another device
// may itself be unpriced, so summaries are refreshed again once something was pulled.
// Per-list battle record (gameStats.js). Read ONCE from storage rather than subscribing to the
// tracker store: nothing on this page can change a game, and the record is a footnote on a card —
// it does not need to be reactive, and this screen does not need the store to render.
const records = ref(new Map())
function recordOf(r) {
  const rec = records.value.get(r.id)
  return rec ? `${rec.w}–${rec.l}–${rec.d}` : null
}

onMounted(async () => {
  records.value = rosterRecords(loadHistory())
  refreshSummaries(rosters.value)
  await ensureSession()
  await syncNow()
  if (pulled.value) refreshSummaries(rosters.value)
})

const allFactions = factionGroups.flatMap((g) => g.factions)
function factionOf(r) { return allFactions.find((f) => f.slug === r.faction) || null }
function cardStyle(r) {
  const c = factionOf(r)?.color
  return c ? { '--fa-light': c.light, '--fa-dark': c.dark } : {}
}
function limitOf(r) { return effectiveBattle(r, rosterCore).points }

// A saved list opens read-only; a draft goes back to the wizard, which resumes it from the id in
// this query and lands on the step it was left on (RosterCreateView.vue).
function openRoster(r) {
  router.push(r.draft ? { path: '/roster/new', query: { draft: r.id } } : `/roster/${r.id}/view`)
}

function onNew() {
  router.push('/roster/new')
}

const menuFor = ref(null)
const menuRoster = computed(() => (menuFor.value ? rosterById(menuFor.value) : null))
const menuRosterName = computed(() => menuRoster.value?.name || labels.value.rosterUntitled)

function onEdit(id) {
  menuFor.value = null
  router.push(`/roster/${id}`)
}
function onDuplicate(id) {
  menuFor.value = null
  const copy = duplicateRoster(id, labels.value.rosterCopySuffix)
  // A duplicate is a finished list the moment it exists — the same kind of deliberate save the
  // editor's Save button makes, so it goes to the cloud now rather than waiting for the next visit.
  if (copy) saveToCloud(copy.id)
}

const pendingDelete = ref(null)
function onDelete(id) {
  menuFor.value = null
  pendingDelete.value = id
}
function confirmDelete() {
  if (pendingDelete.value) {
    // Tombstone + cloud DELETE first (it reads the id, not the roster), then drop it locally.
    // Without the tombstone the next visit would happily download it again.
    removeFromCloud(pendingDelete.value)
    deleteRoster(pendingDelete.value)
  }
  pendingDelete.value = null
}
</script>

<style scoped>
.roster-list { padding-top: 0.5rem; }
.hero {
  text-align: center;
  padding: 1rem 0 0.8rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.25rem;
}
.hero h1 {
  font-family: var(--font-display);
  font-size: 2.64rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
}
.hero-desc { color: var(--text-muted); font-size: 0.95rem; }
.hero-help { display: inline-block; margin-top: 0.4rem; color: var(--accent); font-size: 0.85rem; }
.cta { display: flex; justify-content: center; gap: 0.6rem; margin-bottom: 1.75rem; flex-wrap: wrap; }
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1.6rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
}
/* The second way in — quieter than "New roster", because building one here is still the main
   path and pasting one is the shortcut for a list that already exists elsewhere. */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1.2rem;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
}
.btn-ghost:hover { color: var(--text-primary); border-color: var(--accent); }

/* Same segmented control the wizard and GameSetup use for a small either/or choice. */
.rl-tabs { margin: 0 auto 1rem; }
.seg {
  display: flex;
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  width: fit-content;
}
.seg button {
  padding: 0.45rem 0.9rem;
  background: var(--bg-secondary);
  color: var(--text-muted);
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: background 0.15s, color 0.15s;
}
.seg button + button { border-left: 1px solid var(--border); }
.seg button.on { background: var(--accent); color: #fff; }
.tab-n { font-family: var(--font-mono); font-size: 0.78rem; opacity: 0.75; }
.empty { color: var(--text-muted); font-style: italic; text-align: center; }
/* Sits where a saved list shows its issue count — for a draft, how far it got is the useful fact. */
.rstep {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
}
.rrec {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.72rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}
.rosters { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; position: relative; }
.roster {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 3px solid var(--border);
  border-radius: 6px;
  padding: 0.7rem 0.9rem;
  cursor: pointer;
  transition: border-color 0.15s;
}
.roster:hover { border-color: var(--accent); }
.roster.themed { border-left-color: var(--fa-light, var(--accent)); }
.roster.themed:hover { border-color: var(--fa-light, var(--accent)); }
@media (prefers-color-scheme: dark) {
  .roster.themed { border-left-color: var(--fa-dark, var(--accent)); }
  .roster.themed:hover { border-color: var(--fa-dark, var(--accent)); }
}
.roster-main { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.rname { font-weight: 600; color: var(--text-primary); font-size: 0.98rem; }
.kebab {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  background: none;
  border: none;
  border-radius: 4px;
  color: var(--text-dim);
  cursor: pointer;
  font-size: 0.95rem;
}
.kebab:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }
/* The draft's own Delete: same hit area as the kebab it replaces, and it says what it does only
   on hover — a bin sitting bright red on every draft card would shout louder than the card. */
.kebab.danger:hover { background: color-mix(in srgb, #d9534f 14%, transparent); color: #d9534f; }
.rfaction { display: block; margin-top: 0.05rem; font-size: 0.78rem; font-weight: 600; color: var(--fa-light, var(--accent)); opacity: 0.7; }
@media (prefers-color-scheme: dark) {
  .rfaction { color: var(--fa-dark, var(--accent)); }
}
.rpoints { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); white-space: nowrap; }
.rpoints.over { color: #c0392b; }
.rpoints .unit { font-size: 0.62rem; color: var(--text-dim); margin-left: 0.15rem; }
.roster-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.4rem;
  font-size: 0.76rem;
  color: var(--text-dim);
}
.meta-left { display: inline-flex; align-items: center; gap: 0.6rem; }
.issues { color: #d98a2b; display: inline-flex; align-items: center; gap: 0.25rem; }

/* Per-card actions modal (mirrors SecondaryDeck's custom-header actions sheet). */
.modal-head {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem;
  padding: 0.8rem 0.9rem; border-bottom: 1px solid var(--border);
}
.mh-title { font-family: var(--font-display); font-size: 1.49rem; font-weight: 500; color: var(--text-primary); margin: 0; }
.mh-close {
  background: none; border: none; color: var(--text-muted);
  font-size: 1.1rem; cursor: pointer; min-width: 32px; min-height: 32px; border-radius: 4px; flex-shrink: 0;
}
.mh-close:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }
.modal-body { padding: 0.6rem 0.9rem 0.9rem; overflow-y: auto; }
.act-list { display: flex; flex-direction: column; gap: 0.5rem; }
.act-btn {
  width: 100%; padding: 0.65rem 0.8rem; border: 1px solid var(--border); border-radius: 5px;
  background: var(--bg-secondary); color: var(--text-primary); cursor: pointer;
  font-size: 0.88rem; font-weight: 600; text-align: left;
}
.act-btn:hover { border-color: var(--accent); }
.act-danger { color: #c0392b; }
.act-danger:hover { border-color: #c0392b; background: color-mix(in srgb, #c0392b 8%, transparent); }
</style>

<!-- Explicit data-theme must win over prefers-color-scheme in both directions (see FactionLayout). -->
<style>
:root[data-theme='light'] .roster.themed { border-left-color: var(--fa-light, #8b2a33); }
:root[data-theme='dark'] .roster.themed { border-left-color: var(--fa-dark, #c8585e); }
:root[data-theme='light'] .roster.themed:hover { border-color: var(--fa-light, #8b2a33); }
:root[data-theme='dark'] .roster.themed:hover { border-color: var(--fa-dark, #c8585e); }
:root[data-theme='light'] .rfaction { color: var(--fa-light, #8b2a33); }
:root[data-theme='dark'] .rfaction { color: var(--fa-dark, #c8585e); }
</style>
