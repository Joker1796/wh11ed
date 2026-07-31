<template>
  <nav class="core-toc" :class="'core-toc--' + variant" :aria-label="labels.ariaPageContents">
    <div v-if="variant === 'page'" class="core-toc-header">{{ labels.contentsHeading }}</div>

    <div class="core-toc-grid">
      <div
        v-for="group in groups"
        :key="group.hash"
        class="core-toc-group"
        :class="{ current: group.hash === activeChapter }"
      >
        <a
          class="core-toc-chapter"
          :href="group.hash"
          @click.prevent="$emit('select', group.hash.slice(1))"
        >{{ group.label }}</a>

        <ul v-if="group.sections.length" class="core-toc-list">
          <li v-for="sec in group.sections" :key="sec.label">
            <a
              class="core-toc-link"
              :class="{ current: sec.id === activeId && !sec.filter }"
              :href="'#' + sec.id"
              @click.prevent="$emit('select', sec.id, sec.filter)"
            >
              <span v-if="sectionNum(sec.label)" class="core-toc-num">{{ sectionNum(sec.label) }}</span>
              {{ sec.label.replace(/^\d+\s+/, '') }}
            </a>

            <!-- One level deeper (e.g. "03.02 Moving Models") — only in the modal, where
                 there's room for it; the page TOC stays a compact chapter/section jump list. -->
            <ul v-if="variant === 'modal' && subsectionsFor(sec.id).length" class="core-toc-subs">
              <li v-for="item in subsectionsFor(sec.id)" :key="item.id">
                <a
                  class="core-toc-subs-link"
                  :class="{ current: item.id === activeId }"
                  :href="'#' + item.id"
                  @click.prevent="$emit('select', item.id)"
                >
                  <span class="core-toc-subs-num">{{ item.sectionNum }}</span>
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { navGroups, navGroupsRu } from '../../router/index.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useCoreRulesSubsections } from '../../composables/useCoreRulesSubsections.js'

// One component, two placements: `page` renders it inline under the page hero, `modal`
// inside CoreRulesTocModal (no heading of its own — BaseModal supplies one).
const props = defineProps({
  variant: { type: String, default: 'page' },
  activeId: { type: String, default: null },
})
defineEmits(['select'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
// Introduction has no sections of its own and sits right above this TOC as page content —
// listing it here would just be a link to "scroll up a bit". Excluded from the contents
// list only; it stays a normal chapter everywhere else (subnav, drawer, search).
const groups = computed(() =>
  (locale.value === 'ru' ? navGroupsRu : navGroups).filter((g) => g.hash !== '#chapter-intro')
)

// Section labels carry their reference number ("03 Moving"); split it out so it can be
// set in the mono/accent style the rest of the app uses for those numbers.
function sectionNum(label) {
  return label.match(/^(\d+)\s/)?.[1] || ''
}

// One level deeper than navGroups — the "NN.MM" rule subsections (see
// useCoreRulesSubsections.js). Only Basic Rules / Battle Round / Battlefields / Advanced
// Rules / Muster have any; Reference's entries look them up and get an empty list.
const subsectionsByChapter = useCoreRulesSubsections()
function subsectionsFor(id) {
  return subsectionsByChapter.value[id] || []
}

// The chapter containing the active section — so the whole chapter stays marked while
// reading any of its sections. Chapters with no sections (Introduction) match directly.
const activeChapter = computed(() => {
  if (!props.activeId) return null
  const hit = groups.value.find(
    (g) => g.hash === '#' + props.activeId || g.sections.some((s) => s.id === props.activeId)
  )
  return hit?.hash || null
})
</script>

<style scoped>
.core-toc {
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: 0 0 6px 6px;
  background: var(--bg-card);
  padding: 0.55rem 1rem 0.75rem;
  margin-bottom: 1.75rem;
}

/* Inside the modal BaseModal already draws the surface and the title. */
.core-toc--modal {
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  margin-bottom: 0;
}

.core-toc-header {
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.core-toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
  gap: 0.9rem 1.5rem;
  align-items: start;
}

.core-toc-chapter {
  display: block;
  font-family: var(--font-display);
  font-size: 1.12rem;
  font-weight: var(--fw-heading);
  color: var(--text-primary);
  text-decoration: none;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 0.25rem;
  transition: color 0.15s, border-color 0.15s;
}

.core-toc-chapter:hover {
  color: var(--accent);
  border-bottom-color: var(--accent);
  text-decoration: none;
}

.core-toc-group.current .core-toc-chapter {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.core-toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.core-toc-link {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  padding: 0.12rem 0;
  transition: color 0.15s;
  text-decoration: none;
}

.core-toc-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.core-toc-link.current {
  color: var(--text-primary);
  font-weight: 600;
}

.core-toc-num {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
  flex-shrink: 0;
}

/* In the modal the list is the whole content — fill the modal's width with as many
   chapter columns as fit (same auto-fill mechanics as the page variant) instead of wasting
   the right side of a wide dialog on a single left-aligned column. The modal is wider than
   a typical dialog (see CoreRulesTocModal) specifically to give the NN.MM subsection level
   below room to sit next to its chapter instead of forcing a single narrow list. Everything
   here is tightened — small gaps, small type — so the full three-level tree (chapter →
   section → subsection) fits with as little scrolling as possible. */
.core-toc--modal .core-toc-grid {
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
  gap: 0.6rem 1.5rem;
}

.core-toc--modal .core-toc-chapter {
  margin-bottom: 0.1rem;
  padding-bottom: 0.15rem;
}

.core-toc--modal .core-toc-link {
  font-size: 0.86rem;
  padding: 0.16rem 0;
  line-height: 1.25;
}

/* The NN.MM level: indented under its section, small enough that six chapters' worth of
   subsections don't blow up the modal's height. */
.core-toc-subs {
  list-style: none;
  padding: 0 0 0.2rem 0.85rem;
  margin: 0;
}

.core-toc-subs-link {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  font-size: 0.72rem;
  color: var(--text-dim);
  padding: 0.08rem 0;
  line-height: 1.2;
  transition: color 0.15s;
  text-decoration: none;
}

.core-toc-subs-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.core-toc-subs-link.current {
  color: var(--text-primary);
  font-weight: 600;
}

.core-toc-subs-num {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  color: var(--text-dim);
  flex-shrink: 0;
}
</style>
