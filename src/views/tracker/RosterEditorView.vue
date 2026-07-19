<template>
  <div class="roster-editor">
    <RouterLink to="/roster" class="back"><i class="bi bi-chevron-left"></i> {{ labels.rosterBackToList }}</RouterLink>
    <template v-if="roster">
      <h1 class="rname">{{ roster.name || labels.rosterUntitled }}</h1>
      <!-- Phase 4 replaces this stub with the real editor (pickers, unit list, live points). -->
      <p class="soon">{{ labels.rosterEditorSoon }}</p>
    </template>
    <p v-else class="soon">{{ labels.rosterUntitled }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters } from '../../composables/useRosters.js'

const route = useRoute()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { rosterById } = useRosters()
const roster = computed(() => rosterById(route.params.id))
</script>

<style scoped>
.roster-editor { padding-top: 0.75rem; }
.back { display: inline-flex; align-items: center; gap: 0.3rem; color: var(--text-muted); text-decoration: none; font-size: 0.85rem; }
.back:hover { color: var(--accent); }
.rname { font-family: var(--font-display); font-weight: 500; color: var(--text-primary); margin: 0.75rem 0 0.5rem; }
.soon { color: var(--text-muted); font-style: italic; }
</style>
