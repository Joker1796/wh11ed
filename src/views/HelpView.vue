<template>
  <div class="help-view">
    <div class="hero">
      <h1 class="hero-title">{{ t.title }}</h1>
      <p class="hero-desc">{{ t.intro }}</p>
    </div>

    <!-- Plain contents: somebody arrives with ONE question and has to find the line that answers
         it. A numbered list of links does that; a boxed panel with chevrons only adds furniture.
         Each line is now a page rather than an anchor — a reader who came for one topic gets that
         topic, not the whole guide with the rest scrolled past. -->
    <nav class="help-nav" :aria-label="labels.helpContents">
      <p class="help-nav-h">{{ labels.helpContents }}</p>
      <ol class="help-nav-list">
        <li v-for="(s, i) in t.sections" :key="s.id">
          <RouterLink :to="`/help/${slugOf(s)}`" class="help-nav-item">
            <span class="help-nav-n">{{ i + 1 }}.</span>
            <span class="help-nav-t">{{ s.title }}</span>
            <i class="bi bi-chevron-right help-nav-go"></i>
          </RouterLink>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup>
// "How to use this" (/help) — the guide's contents. Each topic is its own page (HelpTopicView),
// so the sections that the app links at ("Section help" on the tracker and the roster list) open
// on their own instead of somewhere down a page of everything.
import { computed } from 'vue'
import { help, slugOf } from '../data/help.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const t = computed(() => help[locale.value])
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.help-view { padding-top: 0.5rem; padding-bottom: 2rem; }

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

.hero-desc {
  margin: 0.5rem auto 0;
  max-width: 40rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

.help-nav-h {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 0.5rem;
}

.help-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.help-nav-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.35rem 0;
  color: var(--text-secondary);
  text-decoration: none;
}

.help-nav-n { color: var(--text-dim); font-variant-numeric: tabular-nums; }

.help-nav-item:hover { color: var(--accent); text-decoration: none; }
.help-nav-t { flex: 1; }
.help-nav-go { font-size: 0.8rem; opacity: 0.6; }

@media (max-width: 640px) {
  .hero-title { font-size: 2rem; }
}
</style>
