<template>
  <div class="changelog-view">
    <div class="hero">
      <h1 class="hero-title">{{ labels.changelogTitle }}</h1>
      <p class="hero-sub">{{ labels.changelogSubtitle }}</p>
    </div>

    <div class="changelog-body">
      <section v-for="e in changelog" :key="e.version" :id="`v${e.version}`" class="cl-entry">
        <header class="cl-head">
          <span class="cl-ver">v{{ e.version }}</span>
          <time class="cl-date" :datetime="e.date">{{ formatDate(e.date) }}</time>
        </header>
        <ul class="cl-list">
          <li v-for="(note, i) in (e[locale] || e.en)" :key="i">{{ note }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
// Standalone "What's New" page (/changelog). Renders the bilingual changelog.js, newest first.
// Reachable from the footer version and the update-notice banner. Opening it clears the banner.
import { computed } from 'vue'
import { changelog } from '../data/changelog.js'
import { useLocale } from '../composables/useLocale.js'
import { useFormatDate } from '../composables/useFormatDate.js'
import { useUpdateNotice } from '../composables/useUpdateNotice.js'
import { ui } from '../i18n/ui.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()

// Seeing the changelog means the latest is "seen" — dismiss the banner.
useUpdateNotice().markSeen()
</script>

<style scoped>
.changelog-view {
  padding-top: 0.5rem;
  max-width: 720px;
  margin: 0 auto;
}

.hero {
  margin-bottom: 1.5rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.hero-sub {
  margin: 0.3rem 0 0;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.cl-entry {
  padding: 0.9rem 0;
  border-top: 1px solid var(--border);
}

.cl-entry:first-child {
  border-top: none;
}

.cl-head {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

.cl-ver {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--accent);
}

.cl-date {
  font-size: 0.82rem;
  color: var(--text-dim);
}

.cl-list {
  margin: 0;
  padding-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.cl-list li {
  color: var(--text-primary);
  font-size: 0.92rem;
  line-height: 1.5;
}
</style>
