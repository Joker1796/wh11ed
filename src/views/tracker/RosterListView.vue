<template>
  <div class="roster-list">
    <div class="hero">
      <h1>{{ labels.rostersHeading }}</h1>
      <p class="hero-desc">{{ labels.rostersDesc }}</p>
    </div>

    <div class="cta">
      <button class="btn-primary" @click="onNew">
        <i class="bi bi-plus-lg"></i> {{ labels.rosterNew }}
      </button>
    </div>

    <p v-if="!rosters.length" class="empty">{{ labels.rostersEmpty }}</p>
    <TransitionGroup v-else tag="ul" name="list" class="rosters">
      <li
        v-for="r in rosters"
        :key="r.id"
        class="roster"
        :class="{ themed: !!factionOf(r) }"
        :style="cardStyle(r)"
        role="button"
        tabindex="0"
        @click="openView(r.id)"
        @keydown.enter="openView(r.id)"
      >
        <div class="roster-main">
          <span class="rname">{{ r.name || labels.rosterUntitled }}</span>
          <button class="kebab" :aria-label="labels.rosterMoreActions" @click.stop="menuFor = r.id">
            <i class="bi bi-three-dots-vertical"></i>
          </button>
        </div>
        <span v-if="factionOf(r)" class="rfaction">{{ factionOf(r).name }}</span>
        <div class="roster-meta">
          <span class="meta-left">
            <span class="rpoints" :class="{ over: (r.summary?.points || 0) > limitOf(r) }">
              {{ r.summary?.points || 0 }}<span class="unit">/{{ limitOf(r) }} {{ labels.rosterPointsLabel }}</span>
            </span>
            <span v-if="r.summary?.issues" class="issues" :title="String(r.summary.issues)">
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
      <div class="modal-body act-list">
        <button class="act-btn" @click="onEdit(menuFor)">{{ labels.rosterEdit }}</button>
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
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseModal from '../../components/BaseModal.vue'
import ConfirmModal from '../../components/ConfirmModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters } from '../../composables/useRosters.js'
import { useFormatDate } from '../../composables/useFormatDate.js'
import { effectiveBattle } from '../../composables/rosterEngine.js'
import { refreshSummaries } from '../../composables/rosterSummary.js'
import rosterCore from '../../data/roster/core.js'
import { factionGroups } from '../../data/factionsIndex.js'

const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()
const { rosters, duplicateRoster, deleteRoster, rosterById } = useRosters()

// Points shown here come from each roster's cached summary — see rosterSummary.js. A roster no
// editing screen ever wrote one for (built in an older wizard, imported from a link) is priced
// once, here, instead of reading 0 forever.
onMounted(() => { refreshSummaries(rosters.value) })

const allFactions = factionGroups.flatMap((g) => g.factions)
function factionOf(r) { return allFactions.find((f) => f.slug === r.faction) || null }
function cardStyle(r) {
  const c = factionOf(r)?.color
  return c ? { '--fa-light': c.light, '--fa-dark': c.dark } : {}
}
function limitOf(r) { return effectiveBattle(r, rosterCore).points }

function openView(id) {
  router.push(`/roster/${id}/view`)
}

function onNew() {
  router.push('/roster/new')
}

const menuFor = ref(null)
const menuRosterName = computed(() => (menuFor.value && rosterById(menuFor.value)?.name) || labels.value.rosterUntitled)

function onEdit(id) {
  menuFor.value = null
  router.push(`/roster/${id}`)
}
function onDuplicate(id) {
  menuFor.value = null
  duplicateRoster(id, labels.value.rosterCopySuffix)
}

const pendingDelete = ref(null)
function onDelete(id) {
  menuFor.value = null
  pendingDelete.value = id
}
function confirmDelete() {
  if (pendingDelete.value) deleteRoster(pendingDelete.value)
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
.cta { display: flex; justify-content: center; margin-bottom: 1.75rem; }
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
.empty { color: var(--text-muted); font-style: italic; text-align: center; }
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
