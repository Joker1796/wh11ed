<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventFaqHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventFaqDesc }}</p>
    </div>

    <p class="lead">{{ faq.intro }}</p>
    <p class="errata" v-html="renderInline(faq.errata)"></p>

    <div class="faq-list">
      <div v-for="(item, i) in faq.items" :key="i" class="faq-item">
        <p class="faq-q"><span class="faq-tag q">Q</span><span v-html="renderInline(item.q)"></span></p>
        <p class="faq-a"><span class="faq-tag a">A</span><span v-html="renderInline(item.a)"></span></p>
      </div>
    </div>

    <PageNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PageNav from '../../components/PageNav.vue'
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
.view-hero {
  padding: 1.25rem 0 0.9rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.25rem;
}
.view-hero h1 {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  margin-bottom: 0.4rem;
}
.view-hero-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-style: italic;
}
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
  gap: 1rem;
}
.faq-item {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.9rem 1.1rem;
  background: var(--bg-card);
}
.faq-q,
.faq-a {
  display: flex;
  gap: 0.6rem;
  margin: 0;
  line-height: 1.55;
}
.faq-q { margin-bottom: 0.5rem; }
.faq-tag {
  flex-shrink: 0;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-on-accent);
}
.faq-tag.q { background: var(--accent); }
.faq-tag.a { background: var(--text-muted); }
</style>
