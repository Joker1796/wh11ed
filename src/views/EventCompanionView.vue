<template>
  <OnePageChapters
    :heading="labels.eventCompanionHeading"
    :desc="labels.eventCompanionDesc"
    :chapters="chapters"
    :groups="groups"
    intro-hash="#ec-chapter-intro"
    :path="EVENT_PATH"
    action-key="event-toc"
  />
</template>

<script setup>
// The Event Companion, all eight chapters on one page (OnePageChapters.vue has the mechanics,
// shared with Core Rules). Every chapter is imported statically and rendered at once — the data
// was already one module (`eventCompanion.js` + `missions.js`), so there's nothing to keep out of
// the bundle by lazy-loading chapters individually. Its blocks carry no NN.MM numbering, so its
// contents have no third level.
import { computed } from 'vue'
import OnePageChapters from '../components/OnePageChapters.vue'
import ChapterIntro from '../components/event/ChapterIntro.vue'
import ChapterSequence from '../components/event/ChapterSequence.vue'
import ChapterMissions from '../components/event/ChapterMissions.vue'
import ChapterLayouts from '../components/event/ChapterLayouts.vue'
import ChapterPairings from '../components/event/ChapterPairings.vue'
import ChapterTeams from '../components/event/ChapterTeams.vue'
import ChapterDoubles from '../components/event/ChapterDoubles.vue'
import ChapterFaq from '../components/event/ChapterFaq.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useNavGroups } from '../composables/useNavGroups.js'
import { EVENT_PATH } from '../router/index.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const groups = useNavGroups('event')

const chapters = [
  { id: 'ec-chapter-intro', component: ChapterIntro },
  { id: 'ec-chapter-sequence', component: ChapterSequence },
  { id: 'ec-chapter-missions', component: ChapterMissions },
  { id: 'ec-chapter-layouts', component: ChapterLayouts },
  { id: 'ec-chapter-pairings', component: ChapterPairings },
  { id: 'ec-chapter-teams', component: ChapterTeams },
  { id: 'ec-chapter-doubles', component: ChapterDoubles },
  { id: 'ec-chapter-faq', component: ChapterFaq },
]
</script>
