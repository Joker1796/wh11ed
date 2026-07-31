<template>
  <div class="intro-quote">
    <p class="flavor-line">{{ t.lore }}</p>
    <p v-for="line in t.flavorText" :key="line" class="flavor-line">{{ line }}</p>
  </div>

  <section id="intro-about" class="intro-section">
    <h2>{{ labels.introHeading }}</h2>
    <!-- The prose itself flows in two columns on desktop (.rule-columns, global in
         style.css) — the same masonry as the rule chapters, just applied at paragraph
         granularity: each paragraph is a column item, distributed without splitting one
         mid-paragraph across the gap. The heading stays outside it, full width. -->
    <div class="rule-columns">
      <div v-for="para in introParagraphs" :key="para" class="para" v-html="renderInline(para)"></div>
      <div v-for="para in missionParagraphs" :key="para" class="para" v-html="renderInline(para)"></div>
    </div>
  </section>

  <section id="intro-app" class="intro-section">
    <h2>{{ labels.appHeading }}</h2>
    <div class="app-body">
      <div class="app-qr">
        <a href="https://warhammer40000.com/" target="_blank" rel="noopener">
          <img src="/images/wh40k-app-qr.png" alt="QR code — Warhammer 40,000 App" class="qr-img" />
        </a>
      </div>
      <p v-html="renderInline(t.app)"></p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { intro } from '../../data/intro.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'

const { locale } = useLocale()
const { renderInline } = useRenderInline()

const t = computed(() => intro[locale.value])
const labels = computed(() => ui[locale.value])

const introParagraphs = computed(() =>
  t.value.intro.split('\n\n').filter(p => p.trim())
)

const missionParagraphs = computed(() =>
  t.value.missions.split('\n\n').filter(p => p.trim())
)
</script>

<style scoped>
.intro-quote {
  text-align: center;
  padding: 0.75rem 0 1rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.25rem;
}

.intro-quote .flavor-line:first-child {
  max-width: 90ch;
  margin-left: auto;
  margin-right: auto;
}

.flavor-line {
  color: var(--text-muted);
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 0.15rem;
}

.intro-section {
  margin-bottom: 1.25rem;
}

.intro-section h2 {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 500;
  margin-bottom: 0.6rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid var(--accent);
  color: var(--text-primary);
}

.para {
  margin-bottom: 0.8rem;
  color: var(--text-primary);
  line-height: 1.75;
  font-size: 0.97rem;
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
</style>
