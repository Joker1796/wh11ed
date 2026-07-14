<template>
  <div class="landing">
    <div class="hero">
      <h1 class="hero-title">Warhammer 40,000</h1>
      <div class="hero-subtitle">{{ t.tagline }}</div>
    </div>

    <p class="landing-desc">{{ t.description }}</p>

    <div class="section-grid">
      <RouterLink
        v-for="s in t.sections"
        :key="s.key"
        :to="s.path"
        class="section-card"
      >
        <div class="section-card-top">
          <span class="section-badge">{{ s.badge }}</span>
        </div>
        <h2 class="section-card-title">{{ s.label }}</h2>
        <p class="section-card-desc">{{ s.desc }}</p>
      </RouterLink>
    </div>

    <footer class="landing-footer">
      <div class="footer-col">
        <p class="footer-col-label">{{ t.footer.contactLabel }}</p>
        <p class="footer-contact">
          <a :href="'mailto:' + contactEmail">{{ contactEmail }}</a>
        </p>
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
        <p class="footer-contact">
          <a :href="repoUrl" target="_blank" rel="noopener">{{ t.footer.repoLinkLabel }}</a>
        </p>
      </div>
    </footer>

    <p class="landing-version">v{{ version }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { landing } from '../data/landing.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const t = computed(() => landing[locale.value])

const contactEmail = 'gorlovevgeni9617@gmail.com'
const repoUrl = 'https://github.com/Joker1796/wh11ed'
const version = __APP_VERSION__
</script>

<style scoped>
.landing {
  padding-top: 0.5rem;
}

.hero {
  text-align: center;
  padding: 1.5rem 0 0.7rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.1rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3.74rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.hero-subtitle {
  font-size: 0.85rem;
  letter-spacing: 3px;
  color: var(--accent);
  text-transform: uppercase;
  font-weight: 600;
  font-family: var(--font-sans);
}

.landing-desc {
  max-width: 70ch;
  margin: 0 auto 1.6rem;
  text-align: center;
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 1rem;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.section-card {
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 3px solid var(--border);
  border-radius: 0 0 6px 6px;
  padding: 1.25rem 1.35rem;
  transition: border-top-color 0.15s, box-shadow 0.15s;
  text-decoration: none;
}

.section-card:hover {
  border-top-color: var(--accent);
  box-shadow: 0 2px 12px color-mix(in srgb, var(--accent) 18%, transparent);
  text-decoration: none;
}

.section-card-top {
  margin-bottom: 0.5rem;
}

.section-badge {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent);
  font-family: var(--font-mono);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  padding: 2px 7px;
  border-radius: 2px;
}

.section-card-title {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.45rem;
}

.section-card-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin: 0;
}

.landing-footer {
  margin-top: 2.5rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 3rem;
  color: var(--text-muted);
  font-size: 0.84rem;
  line-height: 1.6;
}

.footer-col {
  flex: 1 1 220px;
  min-width: 0;
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

.landing-version {
  margin: 1.2rem 0 0;
  text-align: left;
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

@media (max-width: 600px) {
  .hero-title { font-size: 2.2rem; }
  .section-grid { grid-template-columns: 1fr; }
}
</style>
