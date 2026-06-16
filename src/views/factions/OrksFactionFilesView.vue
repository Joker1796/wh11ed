<template>
  <div class="files-view">
    <a
      v-for="file in orks.files"
      :key="file.path"
      :href="file.path"
      target="_blank"
      rel="noopener noreferrer"
      class="file-row"
    >
      <div class="file-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      </div>
      <div class="file-info">
        <span class="file-desc">{{ file.desc }}</span>
      </div>
      <div class="file-type">{{ file.type.toUpperCase() }}</div>
      <div class="file-open">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        {{ labels.filesOpen }}
      </div>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { orks } from '../../data/factions/orks.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.files-view {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1.5rem;
}

.file-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  color: var(--text-primary);
}

.file-row:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(110, 0, 8, 0.07);
  text-decoration: none;
}

.file-icon {
  color: var(--accent);
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-desc {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.file-type {
  font-size: 0.68rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--accent);
  background: rgba(110, 0, 8, 0.07);
  border: 1px solid rgba(110, 0, 8, 0.18);
  border-radius: 3px;
  padding: 2px 7px;
  flex-shrink: 0;
}

.file-open {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  flex-shrink: 0;
}

.file-row:hover .file-open {
  color: var(--accent);
}
</style>
