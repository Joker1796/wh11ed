<template>
  <footer class="app-footer">
    <div class="footer-cols">
      <div class="footer-col">
        <p class="footer-col-label">{{ t.footer.contactLabel }}</p>
        <p class="footer-contact"><a :href="'mailto:' + contactEmail">{{ contactEmail }}</a></p>
        <p class="footer-contact"><RouterLink to="/disclaimer">{{ t.footer.disclaimerLink }}</RouterLink></p>
        <p class="footer-version">v{{ version }}</p>
      </div>
      <div class="footer-col">
        <p class="footer-col-label">{{ t.footer.thanksLabel }}</p>
        <p v-for="th in t.footer.thanks" :key="th.label" class="footer-thanks">
          {{ th.label }}<br /><span class="footer-who">{{ th.who }}</span>
        </p>
      </div>
      <div class="footer-col">
        <p class="footer-col-label">{{ t.footer.openSourceLabel }}</p>
        <p class="footer-thanks">{{ t.footer.openSourceText }}</p>
        <p class="footer-contact"><a :href="repoUrl" target="_blank" rel="noopener">{{ t.footer.repoLinkLabel }}</a></p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Site-wide footer, rendered once at the bottom of every page by App.vue. Carries the
// user-facing acknowledgements + the Games Workshop IP disclaimer (the site's only legal
// notice — the READMEs have it too, but crawlers and visitors see the site, not the repo).
// Content is the bilingual landing.js `footer` object.
import { computed } from 'vue'
import { landing } from '../data/landing.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const t = computed(() => landing[locale.value])

const contactEmail = 'gorlovevgeni9617@gmail.com'
// The umbrella repo (not this one): explains how the frontend, API and glossary fit together.
const repoUrl = 'https://github.com/Joker1796/wh-rules.ru'
const version = __APP_VERSION__
</script>

<style scoped>
.app-footer {
  margin-top: 2.5rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.84rem;
  line-height: 1.6;
}

.footer-cols {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 3rem;
}

.footer-col {
  flex: 1 1 220px;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.footer-col-label {
  margin: 0 0 0.3rem;
  font-weight: 600;
  color: var(--text-primary);
}

.footer-contact {
  margin: 0;
}

.footer-contact a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.footer-contact a:hover {
  color: var(--accent-hover);
}

.footer-thanks {
  margin: 0 0 0.4rem;
  color: var(--text-dim);
}

.footer-who {
  font-style: italic;
}

.footer-version {
  /* pinned to the bottom of the contact column, level with the tallest column's last line */
  margin: auto 0 0;
  padding-top: 0.9rem;
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}
</style>
