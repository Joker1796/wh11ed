<template>
  <nav class="event-toc" :class="'event-toc--' + variant" :aria-label="labels.ariaPageContents">
    <div v-if="variant === 'page'" class="event-toc-header">{{ labels.contentsHeading }}</div>

    <div class="event-toc-grid">
      <div
        v-for="group in groups"
        :key="group.hash"
        class="event-toc-group"
        :class="{ current: group.hash === activeChapter }"
      >
        <a
          class="event-toc-chapter"
          :href="group.hash"
          @click.prevent="$emit('select', group.hash.slice(1))"
        >{{ group.label }}</a>

        <ul v-if="group.sections.length" class="event-toc-list">
          <li v-for="sec in group.sections" :key="sec.id + sec.label">
            <a
              class="event-toc-link"
              :class="{ current: sec.id === activeId }"
              :href="'#' + sec.id"
              @click.prevent="$emit('select', sec.id)"
            >{{ sec.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { eventGroups, eventGroupsRu } from '../../router/index.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

// One component, two placements: `page` renders it inline under the page hero, `modal`
// inside EventCompanionTocModal (no heading of its own — BaseModal supplies one). Same
// split as CoreRulesToc.vue; unlike it, Event Companion's blocks carry no NN.MM numbering
// of their own, so there's no third TOC level to add in the modal variant.
const props = defineProps({
  variant: { type: String, default: 'page' },
  activeId: { type: String, default: null },
})
defineEmits(['select'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
// Introduction has no sections of its own and sits right above this TOC as page content —
// listing it here would just be a link to "scroll up a bit". Excluded from the contents
// list only; it stays a normal chapter everywhere else (subnav, drawer, search). Mirrors
// CoreRulesToc.vue's identical exclusion.
const groups = computed(() =>
  (locale.value === 'ru' ? eventGroupsRu : eventGroups).filter((g) => g.hash !== '#ec-chapter-intro')
)

// The chapter containing the active section — so the whole chapter stays marked while
// reading any of its sections. Chapters with no sections (Introduction, Terrain & Layouts,
// Errata & FAQs) match directly.
const activeChapter = computed(() => {
  if (!props.activeId) return null
  const hit = groups.value.find(
    (g) => g.hash === '#' + props.activeId || g.sections.some((s) => s.id === props.activeId)
  )
  return hit?.hash || null
})
</script>

<style scoped>
.event-toc {
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  background: var(--bg-card);
  padding: 0.55rem 1rem 0.75rem;
  margin-bottom: 1.75rem;
}

/* Inside the modal BaseModal already draws the surface and the title. */
.event-toc--modal {
  border: none;
  background: none;
  padding: 0;
  margin-bottom: 0;
}

.event-toc-header {
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
.event-toc-grid {
  columns: 220px;
  column-gap: 1.5rem;
}

.event-toc-group {
  margin-bottom: 0.7rem;
}

.event-toc-chapter {
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  margin-bottom: 0.25rem;
  break-after: avoid-column;
  transition: color 0.15s;
}

.event-toc-chapter:hover {
  color: var(--accent);
  text-decoration: none;
}

.event-toc-group.current .event-toc-chapter {
  color: var(--accent);
}

.event-toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.event-toc-link {
  display: block;
  font-size: 0.82rem;
  line-height: 1.2;
  color: var(--text-muted);
  padding: 0.04rem 0;
  transition: color 0.15s;
  text-decoration: none;
}

.event-toc-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.event-toc-link.current {
  color: var(--text-primary);
  font-weight: 600;
}

/* In the modal the list is the whole content — fill the modal's width with as many
   flowing columns as fit, same mechanics as the page variant, instead of wasting the
   right side of the dialog on one left-aligned column. */
.event-toc--modal .event-toc-grid {
  columns: 200px;
  column-gap: 1.5rem;
}

.event-toc--modal .event-toc-group {
  margin-bottom: 0.5rem;
}

.event-toc--modal .event-toc-chapter {
  margin-bottom: 0.15rem;
}

.event-toc--modal .event-toc-link {
  font-size: 0.86rem;
  padding: 0.06rem 0;
  line-height: 1.2;
}
</style>
