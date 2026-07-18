<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventFaqHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventFaqDesc }}</p>
    </div>

    <p class="lead">{{ faq.intro }}</p>
    <p class="errata" v-html="renderInline(faq.errata)"></p>

    <div class="faq-list">
      <FaqItem v-for="(item, i) in faq.items" :key="i" :q="item.q" :a="item.a" />
    </div>

    <PageNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PageNav from '../../components/PageNav.vue'
import FaqItem from '../../components/FaqItem.vue'
import { getEventContent } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const labels = computed(() => ui[locale.value])
const ec = computed(() => getEventContent(locale.value))
const faq = computed(() => ec.value.faq)
</script>

<style scoped>
.lead {
  margin: 0 0 0.75rem;
  line-height: 1.6;
}
.errata {
  margin: 0 0 1.5rem;
  color: var(--text-muted);
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
