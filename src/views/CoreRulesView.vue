<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.coreRulesHeading }}</h1>
      <p class="view-hero-desc">{{ labels.coreRulesDesc }}</p>
    </div>

    <CoreRulesToc :active-id="activeId" @select="goToAnchor" />

    <section
      v-for="chapter in chapters"
      :key="chapter.id"
      :id="chapter.id"
      class="core-chapter"
    >
      <component :is="chapter.component" />
    </section>

    <!-- Desktop FAB, stacked above the slot App.vue's BackToTopButton occupies. Mobile gets
         the same action through MobileUtilityBar (contributed below) — no third floating
         element fighting for the corner. -->
    <button
      type="button"
      class="fab-btn core-toc-fab"
      :title="labels.openContents"
      :aria-label="labels.openContents"
      @click="tocOpen = true"
    >
      <i class="bi bi-list-ul"></i>
    </button>

    <CoreRulesTocModal
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
import CoreRulesToc from '../components/core/CoreRulesToc.vue'
import CoreRulesTocModal from '../components/core/CoreRulesTocModal.vue'
import ChapterIntro from '../components/core/ChapterIntro.vue'
import ChapterBasicRules from '../components/core/ChapterBasicRules.vue'
import ChapterBattleRound from '../components/core/ChapterBattleRound.vue'
import ChapterBattlefields from '../components/core/ChapterBattlefields.vue'
import ChapterAdvancedRules from '../components/core/ChapterAdvancedRules.vue'
import ChapterReference from '../components/core/ChapterReference.vue'
import ChapterMuster from '../components/core/ChapterMuster.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useAbilityFilter } from '../composables/useAbilityFilter.js'
import { useActiveSection } from '../composables/useActiveSection.js'
import { useContributeMobileActions } from '../composables/useMobileActionBar.js'
import { scrollToAnchor } from '../composables/useRefNavigation.js'
import { navGroups, navGroupsRu, CORE_PATH } from '../router/index.js'

const { locale } = useLocale()
const route = useRoute()
const router = useRouter()
const labels = computed(() => ui[locale.value])

// Every chapter is imported statically and rendered at once — the data files were already
// all in the precache (useSearch.js imports them), and offscreen chapters cost nothing to
// lay out thanks to `content-visibility` below. The wrapper <section> lives here, not in
// the chapter components, so that rule sits in exactly one place.
const chapters = [
  { id: 'chapter-intro', component: ChapterIntro },
  { id: 'chapter-basic-rules', component: ChapterBasicRules },
  { id: 'chapter-battle-round', component: ChapterBattleRound },
  { id: 'chapter-battlefields', component: ChapterBattlefields },
  { id: 'chapter-advanced-rules', component: ChapterAdvancedRules },
  { id: 'chapter-reference', component: ChapterReference },
  { id: 'chapter-muster', component: ChapterMuster },
]

const tocOpen = ref(false)
const { activeFilter } = useAbilityFilter()

// The anchors the TOC lists, in document order — the scroll-spy walks exactly these.
const spyIds = computed(() => {
  const groups = locale.value === 'ru' ? navGroupsRu : navGroups
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
async function goToAnchor(id, filter) {
  if (filter) activeFilter.value = filter
  if (route.hash !== '#' + id) await router.push({ path: CORE_PATH, hash: '#' + id })
  scrollToAnchor(id)
}

function onModalSelect(id, filter) {
  tocOpen.value = false
  goToAnchor(id, filter)
}

// Mobile: the TOC button joins the shared utility strip instead of adding another fixed
// element above the bottom nav.
useContributeMobileActions('core-toc', () => [
  {
    key: 'core-toc',
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
/* Skip layout/paint for chapters that are off screen. `auto` in contain-intrinsic-size
   makes the browser remember each chapter's real height after it has been rendered once,
   so the scrollbar doesn't jump around as the reader moves through the page. Where it's
   unsupported the page just renders in full — the behaviour it had as seven pages. */
.core-chapter {
  content-visibility: auto;
  contain-intrinsic-size: auto 3000px;
  scroll-margin-top: var(--header-total);
}

.core-toc-fab {
  display: none;
  position: fixed;
  right: 1.5rem;
  /* One FAB slot above BackToTopButton (60px tall, bottom 1.5rem) so the two never overlap
     — that button comes and goes with the scroll position, this one is always here. */
  bottom: calc(1.5rem + 60px + 0.75rem);
  z-index: 195;
}

@media (min-width: 901px) {
  .core-toc-fab { display: flex; }
}
</style>
