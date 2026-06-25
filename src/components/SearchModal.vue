<template>
  <div class="search-overlay" @click.self="$emit('close')">
    <div class="search-box" role="dialog" aria-modal="true" aria-label="Search rules">
      <div class="search-input-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          ref="inputEl"
          v-model="query"
          type="text"
          :placeholder="labels.searchPlaceholder"
          class="search-input"
          @keydown.escape="$emit('close')"
          @keydown.down.prevent="moveSelection(1)"
          @keydown.up.prevent="moveSelection(-1)"
          @keydown.enter.prevent="goToSelected"
        />
        <button class="search-close" @click="$emit('close')" aria-label="Close search">Esc</button>
      </div>

      <div class="search-results" v-if="query.trim().length >= 2">
        <div v-if="results.length === 0" class="search-empty">
          {{ labels.searchNoResults }} "<strong>{{ query }}</strong>"
        </div>
        <ul v-else class="results-list">
          <li
            v-for="(item, i) in results"
            :key="item.id"
            class="result-item"
            :class="{ selected: i === selectedIndex }"
            @click="navigate(item)"
            @mouseenter="selectedIndex = i"
          >
            <div class="result-meta">
              <span class="result-num">{{ item.sectionNum }}</span>
              <span class="result-section">{{ item.sectionTitle }}</span>
            </div>
            <div class="result-title" v-html="highlightMatch(item.title, query)"></div>
            <div class="result-snippet" v-if="item.snippet" v-html="highlightMatch(item.snippet, query)"></div>
          </li>
        </ul>
      </div>

      <div v-else class="search-hint-text">
        {{ labels.searchHint }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { search, highlightMatch } from '../composables/useSearch.js'
import { useRefNavigation } from '../composables/useRefNavigation.js'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'

const emit = defineEmits(['close'])
const { navigateTo } = useRefNavigation()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const inputEl = ref(null)
const query = ref('')
const selectedIndex = ref(0)

const results = computed(() => search(query.value, locale.value))

watch(query, () => { selectedIndex.value = 0 })

onMounted(() => {
  nextTick(() => inputEl.value?.focus())
})

function moveSelection(dir) {
  const len = results.value.length
  if (!len) return
  selectedIndex.value = (selectedIndex.value + dir + len) % len
}

function goToSelected() {
  const item = results.value[selectedIndex.value]
  if (item) navigate(item)
}

function navigate(item) {
  emit('close')
  navigateTo({ route: item.route, anchor: item.id })
}
</script>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 3, 3, 0.55);
  z-index: 500;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
}

.search-box {
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(4, 3, 3, 0.45);
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.1rem;
  border-bottom: 1px solid var(--border);
}

.search-icon {
  color: var(--text-muted);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: var(--font-sans);
  color: var(--text-primary);
  background: transparent;
}

.search-input::placeholder {
  color: var(--text-dim);
}

.search-close {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 0.15rem 0.45rem;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  cursor: pointer;
  flex-shrink: 0;
}

.search-results {
  max-height: 420px;
  overflow-y: auto;
}

.search-empty {
  padding: 1.5rem 1.25rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result-item {
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border-light);
  transition: background 0.1s;
}

.result-item:last-child {
  border-bottom: none;
}

.result-item.selected,
.result-item:hover {
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

.result-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.2rem;
}

.result-num {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--accent);
  font-weight: 600;
}

.result-section {
  font-size: 0.72rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
}

.result-snippet {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.45;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-hint-text {
  padding: 1.25rem;
  color: var(--text-dim);
  font-size: 0.85rem;
  text-align: center;
}

:deep(mark) {
  background: color-mix(in srgb, var(--accent) 18%, transparent);
  color: var(--accent);
  border-radius: 2px;
  padding: 0 1px;
}

@media (max-width: 600px) {
  .search-overlay {
    align-items: flex-start;
    padding-top: 0;
  }

  .search-box {
    border-radius: 0;
    height: 100dvh;
    max-width: none;
    display: flex;
    flex-direction: column;
  }

  .search-input {
    font-size: 1rem;
  }

  .search-close {
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    padding: 0 0.6rem;
  }

  .search-results {
    flex: 1;
    max-height: none;
    overflow-y: auto;
  }

  .result-item {
    padding: 1rem 1.25rem;
  }

  /* Let snippets wrap to two lines instead of a single ellipsised line. */
  .result-snippet {
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .search-hint-text {
    flex: 1;
    padding: 2rem 1.25rem;
  }
}
</style>
