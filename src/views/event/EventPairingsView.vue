<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventPairingsHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventPairingsDesc }}</p>
    </div>

    <p class="lead">{{ pairings.intro }}</p>

    <template v-for="block in pairings.blocks" :key="block.id">
      <div v-if="block.flavor" class="event-flavor">
        <RuleBlock
          :id="block.id"
          :title="block.title"
          :body="block.body"
          :note="block.note"
          :see-also="block.seeAlso"
        />
      </div>
      <RuleBlock
        v-else
        :id="block.id"
        :title="block.title"
        :body="block.body"
        :note="block.note"
        :see-also="block.seeAlso"
      />
    </template>

    <PageNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RuleBlock from '../../components/RuleBlock.vue'
import PageNav from '../../components/PageNav.vue'
import { getEventContent } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const ec = computed(() => getEventContent(locale.value))
const pairings = computed(() => ec.value.pairings)
</script>

<style scoped>
.lead {
  margin: 0 0 1.25rem;
  line-height: 1.6;
}
</style>
