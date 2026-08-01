<template>
  <h2 class="chapter-heading">{{ labels.eventFaqHeading }}</h2>
  <p class="chapter-desc">{{ labels.eventFaqDesc }}</p>

  <p class="lead">{{ faq.intro }}</p>
  <p class="errata" v-html="renderInline(faq.errata)"></p>

  <div class="faq-list">
    <FaqItem v-for="(item, i) in faq.items" :key="i" :q="item.q" :a="item.a" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FaqItem from '../FaqItem.vue'
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
/* Two columns on the wide single page, same breakpoint/recipe as the core-rules
   Reference chapter's .faq-list / .appendix-columns. */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 1024px) {
  .faq-list {
    display: block;
    column-count: 2;
    column-gap: 1.5rem;
  }

  .faq-list > * {
    break-inside: avoid;
    margin-bottom: 0.75rem;
  }
}
</style>
