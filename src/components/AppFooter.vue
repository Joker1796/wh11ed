<template>
  <footer class="app-footer">
    <div class="footer-cols">
      <div class="footer-col">
        <p class="footer-col-label">{{ t.footer.contactLabel }}</p>
        <p class="footer-contact"><a :href="'mailto:' + contactEmail">{{ contactEmail }}</a></p>
        <p class="footer-contact"><RouterLink to="/disclaimer">{{ t.footer.disclaimerLink }}</RouterLink></p>
        <p class="footer-version"><RouterLink to="/changelog">v{{ version }}</RouterLink></p>
      </div>

      <!-- Mobile-only: acknowledgements + open-source are secondary info, collapsed by
           default so the footer doesn't dominate the screen. Desktop always shows them
           (forced open, toggle hidden — see the media queries below). -->
      <button class="footer-toggle" :aria-expanded="showDetails" @click="showDetails = !showDetails">
        <i :class="showDetails ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
        <span>{{ showDetails ? t.footer.detailsHide : t.footer.detailsShow }}</span>
      </button>

      <CollapseTransition class="footer-collapse" :show="showDetails">
        <div class="footer-secondary">
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
      </CollapseTransition>
    </div>
  </footer>
</template>

<script setup>
// Site-wide footer, rendered once at the bottom of every page by App.vue. Carries the
// user-facing acknowledgements + the Games Workshop IP disclaimer (the site's only legal
// notice — the READMEs have it too, but crawlers and visitors see the site, not the repo).
// Content is the bilingual landing.js `footer` object.
import { ref, computed } from 'vue'
import { landing } from '../data/landing.js'
import { useLocale } from '../composables/useLocale.js'
import CollapseTransition from './CollapseTransition.vue'

const { locale } = useLocale()
const t = computed(() => landing[locale.value])

const contactEmail = 'gorlovevgeni9617@gmail.com'
// The umbrella repo (not this one): explains how the frontend, API and glossary fit together.
const repoUrl = 'https://github.com/Joker1796/wh-rules.ru'
const version = __APP_VERSION__

// Mobile-only disclosure state; ignored on desktop (see the ≥901px override below).
const showDetails = ref(false)
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

.footer-version a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.footer-version a:hover {
  color: var(--accent);
}

/* Desktop: three columns in a row, always fully shown — no toggle. */
.footer-toggle {
  display: none;
}

.footer-collapse {
  flex: 1 1 460px;
  min-width: 0;
}

.footer-secondary {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 3rem;
}

/* Mobile: acknowledgements + open-source are secondary, so collapse them behind a toggle
   and let only contact/legal/version show by default. */
@media (max-width: 900px) {
  .footer-toggle {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    align-self: flex-start;
    margin: -0.4rem 0 0;
    padding: 0.5rem 0;
    background: none;
    border: none;
    color: var(--text-muted);
    font-family: inherit;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
  }

  .footer-toggle i {
    font-size: 0.7rem;
  }

  .footer-toggle:hover {
    color: var(--text-primary);
  }

  .footer-collapse {
    flex-basis: 100%;
  }
}

/* Desktop: ignore the collapsed JS state entirely, force the secondary columns open. */
@media (min-width: 901px) {
  .footer-collapse {
    grid-template-rows: 1fr !important;
  }

  .footer-collapse :deep(.collapse-clip) {
    opacity: 1 !important;
    visibility: visible !important;
  }
}
</style>
