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
        role="button"
        tabindex="0"
        @click="open(r.id)"
        @keydown.enter="open(r.id)"
      >
        <div class="roster-main">
          <span class="rname">{{ r.name || labels.rosterUntitled }}</span>
          <span class="rpoints">{{ r.summary?.points || 0 }}<span class="unit">{{ labels.rosterPointsLabel }}</span></span>
        </div>
        <div class="roster-meta">
          <span class="meta-left">
            <span v-if="r.summary?.unitCount" class="units">{{ r.summary.unitCount }} {{ labels.rosterUnitsLabel }}</span>
            <span v-if="r.summary?.issues" class="issues" :title="String(r.summary.issues)">
              <i class="bi bi-exclamation-triangle-fill"></i> {{ r.summary.issues }}
            </span>
            <span class="date">{{ formatDate(r.updatedAt) }}</span>
          </span>
          <span class="actions">
            <button class="act" @click.stop="onDuplicate(r.id)">{{ labels.rosterDuplicate }}</button>
            <button class="act del" @click.stop="onDelete(r.id)">{{ labels.trackerDelete }}</button>
          </span>
        </div>
      </li>
    </TransitionGroup>

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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ConfirmModal from '../../components/ConfirmModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters } from '../../composables/useRosters.js'
import { useFormatDate } from '../../composables/useFormatDate.js'

const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()
const { rosters, createRoster, duplicateRoster, deleteRoster } = useRosters()

function open(id) {
  router.push(`/roster/${id}`)
}

function onNew() {
  const r = createRoster(labels.value.rosterNewName)
  router.push(`/roster/${r.id}`)
}

function onDuplicate(id) {
  duplicateRoster(id, labels.value.rosterCopySuffix)
}

const pendingDelete = ref(null)
function onDelete(id) {
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
  border-radius: 6px;
  padding: 0.7rem 0.9rem;
  cursor: pointer;
  transition: border-color 0.15s;
}
.roster:hover { border-color: var(--accent); }
.roster-main { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.rname { font-weight: 600; color: var(--text-primary); font-size: 0.98rem; }
.rpoints { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); }
.rpoints .unit { font-size: 0.62rem; color: var(--text-dim); margin-left: 0.2rem; }
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
.actions { display: inline-flex; gap: 0.75rem; }
.act { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 0.76rem; }
.act:hover { color: var(--accent); }
</style>
