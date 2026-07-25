<template>
  <FactionLayout>
    <section class="fsection" id="faq">
      <h2 class="fsection-title">{{ labels.factionFaq }}</h2>

      <!-- appdata FAQ/errata are EN-only; tell RU readers until a translation overlay lands. -->
      <p v-if="locale === 'ru' && !ruAvailable" class="faq-notice">{{ labels.factionFaqEnOnly }}</p>

      <template v-if="loaded">
        <p v-if="updatedText" class="faq-updated">{{ labels.factionFaqUpdated }}: {{ updatedText }}</p>

        <!-- Segmented switch between Errata and FAQ — only when both groups have entries;
             otherwise the single populated group is shown on its own. -->
        <div v-if="errataEntries.length && qaEntries.length" class="faq-switch" role="tablist">
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

        <div v-if="activeView === 'errata' && errataEntries.length" class="errata-list">
          <div v-for="(e, i) in errataEntries" :key="'e' + i" class="errata-block">
            <h4 v-if="e.header" class="errata-title" v-html="renderInline(e.header)" />
            <p class="errata-body" v-html="renderInline(e.body)" />
          </div>
        </div>

        <div v-else-if="activeView === 'qa' && qaEntries.length" class="faq-list">
          <FaqItem v-for="(e, i) in qaEntries" :key="'q' + i" :q="e.q" :a="e.a" />
        </div>

        <p v-if="!entries.length" class="faq-empty">{{ labels.factionFaqEmpty }}</p>
      </template>
    </section>
  </FactionLayout>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import FactionLayout from '../../components/FactionLayout.vue'
import FaqItem from '../../components/FaqItem.vue'
import { ui } from '../../i18n/ui.js'
import { useFactionPage } from '../../composables/useFactionPage.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { getItem, setItem } from '../../composables/safeStorage.js'

const route = useRoute()
const { slug } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { renderInline } = useRenderInline()

// Optional RU translation overlay (drop-in, mirrors src/data/datasheets/ru). import.meta.glob
// resolves to {} when the file doesn't exist yet, so this stays warning-free until it does.
const ruGlob = import.meta.glob('../../data/factionFaqRu.json', { import: 'default' })
const ruLoader = ruGlob['../../data/factionFaqRu.json'] || null
const ruAvailable = ref(false)

const entries = ref([])
const updated = ref([])
const loaded = ref(false)

// Merge one entry with its RU overlay (same index), field-by-field with EN fallback.
const mergeEntry = (en, ru) => {
  if (!ru) return en
  if (en.type === 'errata') return { type: 'errata', header: ru.header || en.header, body: ru.body || en.body }
  return { type: 'qa', q: ru.q || en.q, a: ru.a || en.a }
}

watch(
  () => route.params.slug,
  async (s) => {
    entries.value = []
    updated.value = []
    loaded.value = false
    ruAvailable.value = false
    if (!s) return
    const all = (await import('../../data/factionFaq.json')).default
    const en = all[s]
    // RU overlay only in the RU locale, and only if the file is present.
    let ru = null
    if (locale.value === 'ru' && ruLoader) {
      try { ru = (await ruLoader())?.[s] || null } catch { ru = null }
    }
    if (route.params.slug !== s) return // stale resolve after a fast route change
    ruAvailable.value = !!ru
    updated.value = en?.updated || []
    entries.value = (en?.entries || []).map((e, i) => mergeEntry(e, ru?.entries?.[i]))
    loaded.value = true
  },
  { immediate: true },
)

const errataEntries = computed(() => entries.value.filter((e) => e.type === 'errata'))
const qaEntries = computed(() => entries.value.filter((e) => e.type === 'qa'))
const updatedText = computed(() => updated.value.map((u) => `${u.pub} (${u.date})`).join('; '))

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
.fsection {
  margin-bottom: 2.5rem;
  scroll-margin-top: var(--header-total);
}

.fsection-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
}

.faq-notice {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: 0.8rem;
}

.faq-updated {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

/* Errata | FAQ segmented switch (pill buttons, same look as the stratagems filters). */
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
  border-radius: 999px;
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
  border-radius: 6px;
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

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.faq-empty {
  color: var(--text-muted);
  font-size: 1rem;
}

@media (max-width: 640px) {
  .fsection-title { font-size: 1.6rem; }
}
</style>
