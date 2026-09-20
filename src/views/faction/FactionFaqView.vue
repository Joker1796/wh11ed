<template>
  <FactionLayout>
    <section
      id="faq"
      class="fsection"
    >
      <h2 class="fsection-title">
        {{ labels.factionFaq }}
      </h2>

      <template v-if="loaded">
        <div
          v-if="updated.length"
          class="faq-updated"
        >
          <div>{{ labels.factionFaqUpdated }}:</div>
          <div
            v-for="(u, i) in updated"
            :key="i"
          >
            {{ u.pub }} ({{ u.date }})
          </div>
        </div>

        <!-- Segmented switch between Errata and FAQ — only when both groups have entries;
             otherwise the single populated group is shown on its own. -->
        <div
          v-if="errataEntries.length && qaEntries.length"
          class="faq-switch"
          role="tablist"
        >
          <button
            type="button"
            class="faq-seg"
            :class="{ active: activeView === 'errata' }"
            role="tab"
            :aria-selected="activeView === 'errata'"
            @click="setView('errata')"
          >
            {{ labels.factionFaqErrata }} <span class="faq-seg-n">{{ errataEntries.length }}</span>
          </button>
          <button
            type="button"
            class="faq-seg"
            :class="{ active: activeView === 'qa' }"
            role="tab"
            :aria-selected="activeView === 'qa'"
            @click="setView('qa')"
          >
            {{ labels.factionFaqQuestions }} <span class="faq-seg-n">{{ qaEntries.length }}</span>
          </button>
        </div>

        <div
          v-if="activeView === 'errata' && errataEntries.length"
          class="errata-list"
        >
          <div
            v-for="e in errataEntries"
            :id="'ffaq-' + e.idx"
            :key="e.idx"
            class="errata-block"
          >
            <h4
              v-if="e.header"
              class="errata-title"
              v-html="renderInline(e.header)"
            />
            <div
              class="errata-body"
              v-html="renderRichText(e.body)"
            />
          </div>
        </div>

        <div
          v-else-if="activeView === 'qa' && qaEntries.length"
          class="faq-list"
        >
          <FaqItem
            v-for="e in qaEntries"
            :id="'ffaq-' + e.idx"
            :key="e.idx"
            :q="e.q"
            :a="e.a"
          />
        </div>

        <p
          v-if="!entries.length"
          class="faq-empty"
        >
          {{ labels.factionFaqEmpty }}
        </p>
      </template>
    </section>
  </FactionLayout>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import FactionLayout from '../../components/FactionLayout.vue'
import FaqItem from '../../components/FaqItem.vue'
import { ui } from '../../i18n/ui.js'
import { useFactionPage } from '../../composables/useFactionPage.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { scrollToAnchor } from '../../composables/useRefNavigation.js'

const route = useRoute()
useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { renderInline, renderRichText } = useRenderInline()

// Optional RU translation overlay (drop-in, mirrors src/data/datasheets/ru). import.meta.glob
// resolves to {} when the file doesn't exist yet, so this stays warning-free until it does.
const ruGlob = import.meta.glob('../../data/factionFaqRu.json', { import: 'default' })
const ruLoader = ruGlob['../../data/factionFaqRu.json'] || null

const entries = ref([])
const updated = ref([])
const loaded = ref(false)

// Merge one entry with its RU overlay (same index), field-by-field with EN fallback. `idx` is
// the entry's position in factionFaq.json — the anchor id `ffaq-<idx>` a search result
// (factionFaqSearchIndex.js) points at, stable across the Errata | FAQ split below.
const mergeEntry = (en, ru, idx) => {
  if (!ru) return { ...en, idx }
  if (en.type === 'errata') return { type: 'errata', header: ru.header || en.header, body: ru.body || en.body, idx }
  return { type: 'qa', q: ru.q || en.q, a: ru.a || en.a, idx }
}

watch(
  () => route.params.slug,
  async (s) => {
    entries.value = []
    updated.value = []
    loaded.value = false
    if (!s) return
    const all = (await import('../../data/factionFaq.json')).default
    const en = all[s]
    // RU overlay only in the RU locale, and only if the file is present.
    let ru = null
    if (locale.value === 'ru' && ruLoader) {
      try { ru = (await ruLoader())?.[s] || null } catch { ru = null }
    }
    if (route.params.slug !== s) return // stale resolve after a fast route change
    updated.value = en?.updated || []
    entries.value = (en?.entries || []).map((e, i) => mergeEntry(e, ru?.entries?.[i], i))
    loaded.value = true
    landOnHash()
  },
  { immediate: true },
)

// A search result arrives as `#ffaq-<idx>`: show the pane that entry lives in (without touching
// the remembered preference) and scroll to it once the list is on screen. The scroll is also
// requested by the navigation itself (useRefNavigation); this one covers the case where the
// JSON chunk arrived after that request gave up waiting.
function landOnHash() {
  const m = route.hash.match(/^#ffaq-(\d+)$/)
  if (!m) return
  const target = entries.value[Number(m[1])]
  if (!target) return
  view.value = target.type
  nextTick(() => scrollToAnchor(route.hash.slice(1)))
}
watch(() => route.hash, () => { if (loaded.value) landOnHash() })

const errataEntries = computed(() => entries.value.filter((e) => e.type === 'errata'))
const qaEntries = computed(() => entries.value.filter((e) => e.type === 'qa'))

// Errata | FAQ switch, persisted. Defaults to FAQ. The active view falls back to whichever
// group actually has entries, so a faction with only one type never lands on an empty pane.
const VIEW_KEY = 'wh11ed-faction-faq-view'
const view = ref(getItem(VIEW_KEY) === 'errata' ? 'errata' : 'qa')
const setView = (v) => { view.value = v; setItem(VIEW_KEY, v) }
const activeView = computed(() => {
  if (view.value === 'qa' && !qaEntries.value.length) return 'errata'
  if (view.value === 'errata' && !errataEntries.value.length) return 'qa'
  return view.value
})
</script>

<style scoped>

.faq-updated {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.faq-updated div + div {
  margin-top: 0.15rem;
}

/* Errata | FAQ segmented switch (same look as the stratagems filters). */
.faq-switch {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 1.1rem;
}

.faq-seg {
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast);
}

.faq-seg:hover {
  color: var(--text-primary);
  border-color: var(--accent);
}

.faq-seg.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.faq-seg-n {
  opacity: 0.7;
  font-size: 0.78em;
}

.errata-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.errata-block {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 0.8rem 1rem;
}

.errata-title {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.errata-body {
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--text-muted);
}

.errata-body :deep(ul),
.errata-body :deep(ol) {
  margin: 0.2rem 0 0.3rem 1.1rem;
  padding: 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.faq-empty {
  color: var(--text-muted);
  font-size: 1rem;
}

</style>
