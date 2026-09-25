<template>
  <nav
    class="chapter-toc"
    :class="'chapter-toc--' + variant"
    :aria-label="labels.ariaPageContents"
  >
    <div
      v-if="variant === 'page'"
      class="chapter-toc-header"
    >
      {{ labels.contentsHeading }}
    </div>

    <div class="chapter-toc-grid">
      <div
        v-for="group in groups"
        :key="group.hash"
        class="chapter-toc-group"
        :class="{ current: group.hash === activeChapter }"
      >
        <a
          class="chapter-toc-chapter"
          :href="group.hash"
          @click.prevent="$emit('select', group.hash.slice(1))"
        >{{ group.label }}</a>

        <ul
          v-if="group.sections.length"
          class="chapter-toc-list"
        >
          <li
            v-for="sec in group.sections"
            :key="sec.id + sec.label"
          >
            <a
              class="chapter-toc-link"
              :class="{ current: sec.id === activeId && !sec.filter }"
              :href="'#' + sec.id"
              @click.prevent="$emit('select', sec.id, sec.filter)"
            >
              <span
                v-if="sectionNum(sec.label)"
                class="chapter-toc-num"
              >{{ sectionNum(sec.label) }}</span>
              {{ sec.label.replace(/^\d+\s+/, '') }}
            </a>

            <!-- One level deeper (e.g. "03.02 Moving Models") — only in the modal, where
                 there's room for it; the page TOC stays a compact chapter/section jump list. -->
            <ul
              v-if="variant === 'modal' && subsectionsFor(sec.id).length"
              class="chapter-toc-subs"
            >
              <li
                v-for="item in subsectionsFor(sec.id)"
                :key="item.id"
              >
                <a
                  class="chapter-toc-subs-link"
                  :class="{ current: item.id === activeId }"
                  :href="'#' + item.id"
                  @click.prevent="$emit('select', item.id)"
                >
                  <span class="chapter-toc-subs-num">{{ item.sectionNum }}</span>
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
// The contents of a one-page book — Core Rules and the Event Companion, each seven or eight
// chapters rendered at once (OnePageChapters.vue). Two placements: `page` inline under the hero,
// `modal` inside ChapterTocModal (no heading of its own — BaseModal supplies one).
//
// The two books used to have a copy each, and the copies had drifted: the Event one got the 24px
// tap target on its chapter links, the Core one never did. What differs between them is data:
// Core's section labels carry a reference number ("03 Moving", split out below), and Core alone
// has a third level in the modal — its "NN.MM" rule subsections (`subsectionsFor`). A section
// may also carry a `filter` (Core's Reference abilities), passed along with the jump.
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const props = defineProps({
  // navGroups-shaped: [{ hash, label, sections: [{ id, label, filter? }] }]
  groups: { type: Array, required: true },
  variant: { type: String, default: 'page' },
  activeId: { type: String, default: null },
  subsectionsFor: { type: Function, default: () => [] },
})
defineEmits(['select'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Section labels that carry their reference number ("03 Moving") get it split out, set in the
// mono/accent style the rest of the app uses for those numbers.
function sectionNum(label) {
  return label.match(/^(\d+)\s/)?.[1] || ''
}

// The chapter containing the active section — so the whole chapter stays marked while reading
// any of its sections. Chapters with no sections match directly.
const activeChapter = computed(() => {
  if (!props.activeId) return null
  const hit = props.groups.find(
    (g) => g.hash === '#' + props.activeId || g.sections.some((s) => s.id === props.activeId)
  )
  return hit?.hash || null
})
</script>

<style scoped>
.chapter-toc {
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  background: var(--bg-card);
  padding: 0.55rem 1rem 0.75rem;
  margin-bottom: 1.75rem;
}

/* Inside the modal BaseModal already draws the surface and the title. */
.chapter-toc--modal {
  border: none;
  background: none;
  padding: 0;
  margin-bottom: 0;
}

.chapter-toc-header {
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

/* Multi-column flow, not a grid: the whole thing is one continuous stream that pours into
   the next column wherever it runs out of room, like a newspaper column — not a grid of
   boxed cells, and not chapter-sized chunks either (keeping a whole chapter atomic just
   moved the "boxed" look down a level, leaving ragged gaps at the bottom of a column
   whenever the next chapter didn't fit). Only the heading is pinned to what follows it
   (break-after below), so a chapter title never ends up alone at the bottom of a column. */
.chapter-toc-grid {
  columns: 220px;
  column-gap: 1.5rem;
}

.chapter-toc-group {
  margin-bottom: 0.7rem;
}

.chapter-toc-chapter {
  display: block;
  /* 24px tap target (WCAG 2.5.8, `npm run a11y`) — one pixel over the line box, invisible. */
  min-height: 24px;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  margin-bottom: 0.25rem;
  break-after: avoid-column;
  transition: color 0.15s;
}

.chapter-toc-chapter:hover {
  color: var(--accent);
  text-decoration: none;
}

.chapter-toc-group.current .chapter-toc-chapter {
  color: var(--accent);
}

.chapter-toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chapter-toc-link {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 0.82rem;
  line-height: 1.2;
  color: var(--text-muted);
  padding: 0.04rem 0;
  transition: color 0.15s;
  text-decoration: none;
}

.chapter-toc-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.chapter-toc-link.current {
  color: var(--text-primary);
  font-weight: 600;
}

.chapter-toc-num {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
  flex-shrink: 0;
}

/* In the modal the list is the whole content — fill the modal's width with as many flowing
   columns as fit (same mechanics as the page variant) instead of wasting the right side of a
   wide dialog on a single left-aligned column. Everything here is tightened — small gaps, small
   type — so Core's full three-level tree (chapter → section → subsection) fits with as little
   scrolling as possible. */
.chapter-toc--modal .chapter-toc-grid {
  columns: 200px;
  column-gap: 1.5rem;
}

.chapter-toc--modal .chapter-toc-group {
  margin-bottom: 0.5rem;
}

.chapter-toc--modal .chapter-toc-chapter {
  margin-bottom: 0.15rem;
}

.chapter-toc--modal .chapter-toc-link {
  font-size: 0.86rem;
  padding: 0.06rem 0;
  line-height: 1.2;
}

/* The NN.MM level: indented under its section, small enough that six chapters' worth of
   subsections don't blow up the modal's height. */
.chapter-toc-subs {
  list-style: none;
  padding: 0 0 0.2rem 0.85rem;
  margin: 0;
}

.chapter-toc-subs-link {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  font-size: 0.72rem;
  color: var(--text-dim);
  padding: 0.03rem 0;
  line-height: 1.15;
  transition: color 0.15s;
  text-decoration: none;
}

.chapter-toc-subs-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.chapter-toc-subs-link.current {
  color: var(--text-primary);
  font-weight: 600;
}

.chapter-toc-subs-num {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  color: var(--text-dim);
  flex-shrink: 0;
}
</style>
