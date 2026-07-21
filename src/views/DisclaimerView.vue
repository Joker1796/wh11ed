<template>
  <div class="disclaimer-view">
    <div class="hero">
      <h1 class="hero-title">{{ t.footer.disclaimerLink }}</h1>
    </div>
    <div class="disclaimer-body">
      <p>{{ t.footer.disclaimer }}</p>
      <p class="contact">
        {{ t.footer.contactLabel }}
        <a :href="'mailto:' + contactEmail">{{ contactEmail }}</a>
      </p>
    </div>
  </div>
</template>

<script setup>
// Standalone legal / disclaimer page (/disclaimer). The Games Workshop IP notice, moved off
// the footer (which now just links here). Text is the bilingual landing.js `footer` object.
import { computed } from 'vue'
import { landing } from '../data/landing.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const t = computed(() => landing[locale.value])
const contactEmail = 'gorlovevgeni9617@gmail.com'
</script>

<style scoped>
.disclaimer-view {
  padding-top: 0.5rem;
}

.hero {
  text-align: center;
  padding: 1rem 0 0.6rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.4rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 2.6rem;
  font-weight: 400;
  color: var(--text-primary);
}

.disclaimer-body {
  max-width: 70ch;
  margin: 0 auto;
  color: var(--text-muted);
  line-height: 1.75;
  font-size: 0.95rem;
}

.contact {
  margin-top: 1.4rem;
  color: var(--text-dim);
  font-size: 0.88rem;
}

.contact a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.contact a:hover {
  color: var(--accent-hover);
}
</style>
