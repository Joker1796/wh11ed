<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventCompanionHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventCompanionDesc }}</p>
    </div>

    <EventCompanionToc :active-id="activeId" @select="goToAnchor" />

    <section
      v-for="chapter in chapters"
      :key="chapter.id"
      :id="chapter.id"
      class="event-chapter"
    >
      <component :is="chapter.component" />
    </section>

    <!-- Desktop FAB, stacked above the slot App.vue's BackToTopButton occupies, and shown
         only alongside it (same scroll threshold) — at the top of the page there's nothing
         to jump back up to yet. Mobile gets the same action through MobileUtilityBar
         (contributed below) — same recipe as CoreRulesView's own contents button. A plain
         reactive class (not v-if + Transition) — see CoreRulesView.vue for why. -->
    <button
      type="button"
      class="fab-btn event-toc-fab"
      :class="{ 'event-toc-fab--hidden': !backToTopVisible }"
      :aria-hidden="!backToTopVisible"
      :tabindex="backToTopVisible ? 0 : -1"
      :title="labels.openContents"
      :aria-label="labels.openContents"
      @click="tocOpen = true"
    >
      <i class="bi bi-list-ul"></i>
    </button>

    <EventCompanionTocModal
      v-if="tocOpen"
      :active-id="activeId"
      @close="tocOpen = false"
      @select="onModalSelect"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EventCompanionToc from '../components/event/EventCompanionToc.vue'
import EventCompanionTocModal from '../components/event/EventCompanionTocModal.vue'
import ChapterIntro from '../components/event/ChapterIntro.vue'
import ChapterSequence from '../components/event/ChapterSequence.vue'
import ChapterMissions from '../components/event/ChapterMissions.vue'
import ChapterLayouts from '../components/event/ChapterLayouts.vue'
import ChapterPairings from '../components/event/ChapterPairings.vue'
import ChapterTeams from '../components/event/ChapterTeams.vue'
import ChapterFaq from '../components/event/ChapterFaq.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useActiveSection } from '../composables/useActiveSection.js'
import { useContributeMobileActions } from '../composables/useMobileActionBar.js'
import { scrollToAnchor } from '../composables/useRefNavigation.js'
import { useBackToTop } from '../composables/useBackToTop.js'
import { eventGroups, eventGroupsRu, EVENT_PATH } from '../router/index.js'

const { locale } = useLocale()
const route = useRoute()
const router = useRouter()
const labels = computed(() => ui[locale.value])

// Every chapter is imported statically and rendered at once — the Event Companion data
// was already one module (`eventCompanion.js` + `missions.js`), not seven separate files,
// so there's nothing to keep out of the bundle by lazy-loading chapters individually.
const chapters = [
  { id: 'ec-chapter-intro', component: ChapterIntro },
  { id: 'ec-chapter-sequence', component: ChapterSequence },
  { id: 'ec-chapter-missions', component: ChapterMissions },
  { id: 'ec-chapter-layouts', component: ChapterLayouts },
  { id: 'ec-chapter-pairings', component: ChapterPairings },
  { id: 'ec-chapter-teams', component: ChapterTeams },
  { id: 'ec-chapter-faq', component: ChapterFaq },
]

const tocOpen = ref(false)
const { visible: backToTopVisible } = useBackToTop()

// The anchors the TOC lists, in document order — the scroll-spy walks exactly these.
const spyIds = computed(() => {
  const groups = locale.value === 'ru' ? eventGroupsRu : eventGroups
  const ids = []
  for (const g of groups) {
    ids.push(g.hash.slice(1))
    for (const s of g.sections) if (!ids.includes(s.id)) ids.push(s.id)
  }
  return ids
})
const { activeId, measure } = useActiveSection(spyIds)

// One entry point for every in-page jump (TOC, modal, subnav). The hash goes into the URL
// so the position is shareable and useViewRestore can remember it; scrollToAnchor does the
// actual work — it polls for the element, which is what makes a jump into a chapter that
// `content-visibility` has not laid out yet land in the right place.
async function goToAnchor(id) {
  if (route.hash !== '#' + id) await router.push({ path: EVENT_PATH, hash: '#' + id })
  scrollToAnchor(id)
}

function onModalSelect(id) {
  tocOpen.value = false
  goToAnchor(id)
}

// Mobile: the TOC button joins the shared utility strip instead of adding another fixed
// element above the bottom nav — shown only once scrolled down, same as the desktop FAB and
// the bar's own back-to-top icon right next to it (both read backToTopVisible/useBackToTop).
useContributeMobileActions('event-toc', () => !backToTopVisible.value ? [] : [
  {
    key: 'event-toc',
    icon: 'bi bi-list-ul',
    label: labels.value.openContents,
    onClick: () => { tocOpen.value = true },
  },
])

onMounted(() => {
  if (route.hash) scrollToAnchor(route.hash.slice(1))
  measure()
})

// A chapter/section jump only changes the hash, so the view is never re-created (the
// RouterView key is the path) — re-run the scroll ourselves.
watch(() => route.hash, (hash) => {
  if (hash) scrollToAnchor(hash.slice(1))
})
</script>

<style scoped>
/* Skip layout/paint for chapters that are off screen — same treatment as Core Rules'
   .core-chapter (see CoreRulesView.vue for the full rationale). */
.event-chapter {
  content-visibility: auto;
  contain-intrinsic-size: auto 3000px;
  scroll-margin-top: var(--header-total);
}

.event-toc-fab {
  display: none;
  position: fixed;
  right: 1.5rem;
  /* One FAB slot above BackToTopButton (60px tall, bottom 1.5rem) so the two never overlap
     — both now share the same scroll threshold (backToTopVisible), so this slot is only
     ever "active" while BackToTopButton itself is showing. */
  bottom: calc(1.5rem + 60px + 0.75rem);
  z-index: 195;
  opacity: 1;
  transform: scale(1);
  transition: opacity var(--motion-fast) ease, transform var(--motion-fast) ease;
}

.event-toc-fab--hidden {
  opacity: 0;
  transform: scale(0.6);
  pointer-events: none;
}

@media (min-width: 901px) {
  .event-toc-fab { display: flex; }
}
</style>
