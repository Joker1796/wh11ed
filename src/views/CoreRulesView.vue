<template>
  <OnePageChapters
    :heading="labels.coreRulesHeading"
    :desc="labels.coreRulesDesc"
    :chapters="chapters"
    :groups="groups"
    intro-hash="#chapter-intro"
    :path="CORE_PATH"
    action-key="core-toc"
    :subsections-for="subsectionsFor"
    modal-width="58rem"
    @filter="(f) => { activeFilter = f }"
  />
</template>

<script setup>
// The Core Rules, all seven chapters on one page (OnePageChapters.vue has the mechanics, shared
// with the Event Companion). Every chapter is imported statically and rendered at once — the data
// files were already all in the precache (useSearch.js imports them), and offscreen chapters cost
// nothing to lay out thanks to `content-visibility`.
//
// What is Core's own: its contents go a level deeper in the modal — the "NN.MM" rule subsections
// (useCoreRulesSubsections.js), hence the wider dialog — and a Reference section can narrow the
// ability list it jumps to (`filter`, useAbilityFilter.js).
import { computed } from 'vue'
import OnePageChapters from '../components/OnePageChapters.vue'
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
import { useCoreRulesSubsections } from '../composables/useCoreRulesSubsections.js'
import { useNavGroups } from '../composables/useNavGroups.js'
import { CORE_PATH } from '../router/index.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const groups = useNavGroups('core')
const { activeFilter } = useAbilityFilter()

const chapters = [
  { id: 'chapter-intro', component: ChapterIntro },
  { id: 'chapter-basic-rules', component: ChapterBasicRules },
  { id: 'chapter-battle-round', component: ChapterBattleRound },
  { id: 'chapter-battlefields', component: ChapterBattlefields },
  { id: 'chapter-advanced-rules', component: ChapterAdvancedRules },
  { id: 'chapter-reference', component: ChapterReference },
  { id: 'chapter-muster', component: ChapterMuster },
]

// Only Basic Rules / Battle Round / Battlefields / Advanced Rules / Muster have any; Reference's
// entries look them up and get an empty list.
const subsectionsByChapter = useCoreRulesSubsections()
const subsectionsFor = (id) => subsectionsByChapter.value[id] || []
</script>
