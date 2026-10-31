<template>
  <OnePageChapters
    :heading="labels.domHeading"
    :desc="labels.domDesc"
    :chapters="chapters"
    :groups="groups"
    intro-hash="#dom-intro"
    :path="DOMINATUS_PATH"
    action-key="dominatus-toc"
  />
</template>

<script setup>
// Dominatus, the narrative campaign deck — one page of six chapters on the Event Companion's
// shell (OnePageChapters.vue). The data is one module (src/data/dominatus.js) in this route's
// chunk, so no other page pays for it.
import { computed } from 'vue'
import OnePageChapters from '../components/OnePageChapters.vue'
import DomChapterRules from '../components/dominatus/DomChapterRules.vue'
import DomChapterLocations from '../components/dominatus/DomChapterLocations.vue'
import DomChapterBriefings from '../components/dominatus/DomChapterBriefings.vue'
import DomChapterAgendas from '../components/dominatus/DomChapterAgendas.vue'
import DomChapterUpgrades from '../components/dominatus/DomChapterUpgrades.vue'
import DomChapterEvent from '../components/dominatus/DomChapterEvent.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useNavGroups } from '../composables/useNavGroups.js'
import { DOMINATUS_PATH } from '../router/nav.js'
import '../components/dominatus/dominatus.css'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const groups = useNavGroups('dominatus')

const chapters = [
  { id: 'dom-chapter-rules', component: DomChapterRules },
  { id: 'dom-chapter-locations', component: DomChapterLocations },
  { id: 'dom-chapter-briefings', component: DomChapterBriefings },
  { id: 'dom-chapter-agendas', component: DomChapterAgendas },
  { id: 'dom-chapter-upgrades', component: DomChapterUpgrades },
  { id: 'dom-chapter-event', component: DomChapterEvent },
]
</script>
