<template>
  <div class="home">
    <div class="hero">
      <h1 class="hero-title">Warhammer 40,000</h1>
      <div class="hero-subtitle">Core Rules — 11th Edition</div>
    </div>

    <div class="intro-quote">
      <p class="flavor-line">{{ t.lore }}</p>
      <p v-for="line in t.flavorText" :key="line" class="flavor-line">{{ line }}</p>
    </div>

    <section class="intro-section">
      <h2>{{ labels.introHeading }}</h2>
      <div v-for="para in introParagraphs" :key="para" class="para">{{ para }}</div>
      <div v-for="para in missionParagraphs" :key="para" class="para">{{ para }}</div>
    </section>

    <section class="intro-section">
      <h2>{{ labels.appHeading }}</h2>
      <div class="app-body">
        <div class="app-qr">
          <a href="https://warhammer40000.com/" target="_blank" rel="noopener">
            <img src="/images/wh40k-app-qr.png" alt="QR code — Warhammer 40,000 App" class="qr-img" />
          </a>
        </div>
        <p>{{ t.app }}</p>
      </div>
    </section>

    <section class="toc-section">
      <h2>{{ labels.contentsHeading }}</h2>
      <p class="toc-note">{{ labels.tocNote }}</p>

      <div class="toc-grid">
        <RouterLink
          v-for="item in tocItems"
          :key="item.path"
          :to="item.path"
          class="toc-card"
        >
          <div class="toc-card-top">
            <span class="toc-sections">Sections {{ item.sections }}</span>
          </div>
          <h3 class="toc-card-title">{{ item.label }}</h3>
          <p class="toc-card-desc">{{ item.desc }}</p>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { intro } from '../data/intro.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()

const t = computed(() => intro[locale.value])
const labels = computed(() => ui[locale.value])

const introParagraphs = computed(() =>
  t.value.intro.split('\n\n').filter(p => p.trim())
)

const missionParagraphs = computed(() =>
  t.value.missions.split('\n\n').filter(p => p.trim())
)

const tocItems = computed(() =>
  intro.en.toc.map((item, i) => ({
    ...item,
    desc: locale.value === 'ru' ? intro.ru.toc[i].desc : item.desc,
  }))
)
</script>

<style scoped>
.home {
  padding-top: 0.5rem;
}

.intro-quote {
  text-align: center;
  padding: 1rem 0 1.5rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 2rem;
}

.intro-quote .flavor-line:first-child {
  max-width: 90ch;
  margin-left: auto;
  margin-right: auto;
}

.hero {
  text-align: center;
  padding: 2rem 0 1rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 0;
}


.flavor-line {
  color: var(--text-muted);
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.1rem;
  margin-bottom: 0.1rem;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: 3rem;
  font-weight: 700;
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


.intro-section {
  margin-bottom: 2rem;
}

.intro-section h2 {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--accent);
  color: var(--text-primary);
}

.para {
  margin-bottom: 0.8rem;
  color: var(--text-primary);
  line-height: 1.75;
  font-size: 0.97rem;
}

.toc-section h2 {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--accent);
  color: var(--text-primary);
}

.toc-note {
  color: var(--text-muted);
  font-size: 0.88rem;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.toc-card {
  display: block;
  background: #fff;
  border: 1px solid var(--border);
  border-top: 3px solid var(--border);
  border-radius: 0 0 6px 6px;
  padding: 1.1rem 1.25rem;
  transition: border-top-color 0.15s, box-shadow 0.15s;
  text-decoration: none;
}

.toc-card:hover {
  border-top-color: var(--accent);
  box-shadow: 0 2px 12px rgba(110, 0, 8, 0.08);
  text-decoration: none;
}

.toc-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.toc-sections {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent);
  font-family: var(--font-mono);
  background: rgba(110, 0, 8, 0.07);
  padding: 2px 7px;
  border-radius: 2px;
}


.toc-card-title {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.toc-card-desc {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

.app-body {
  overflow: hidden;
}

.app-body > p {
  margin: 0;
  color: var(--text-primary);
  line-height: 1.75;
  font-size: 0.97rem;
}

.app-qr {
  float: right;
  margin: 0 0 0.75rem 1.5rem;
  width: 140px;
}

.qr-img {
  width: 140px;
  height: auto;
  display: block;
  border-radius: 4px;
}

@media (max-width: 600px) {
  .hero-title { font-size: 2.2rem; }
  .toc-grid { grid-template-columns: 1fr; }
}
</style>
