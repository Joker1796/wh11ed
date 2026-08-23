<template>
  <div class="help-view">
    <div class="hero">
      <h1 class="hero-title">{{ t.title }}</h1>
      <p class="hero-desc">{{ t.intro }}</p>
    </div>

    <!-- A table of contents, because the whole point of this page is that somebody arrived with
         ONE question — usually "does it work without signal" or "where did my lists go". -->
    <nav class="help-toc">
      <a v-for="s in t.sections" :key="s.id" :href="`#${s.id}`" @click.prevent="go(s.id)">{{ s.title }}</a>
    </nav>

    <section v-for="s in t.sections" :key="s.id" :id="s.id" class="help-section">
      <h2>{{ s.title }}</h2>
      <div class="help-body" v-html="renderRichText(s.body)" @click="onBodyClick"></div>
    </section>
  </div>
</template>

<script setup>
// "How to use this" (/help). Plain content page, same idiom as the disclaimer: bilingual text out
// of a data file, rendered through the shared block renderer so a keyword or a rule number in it
// behaves exactly as it does inside a rule.
import { computed } from 'vue'
import { help } from '../data/help.js'
import { useLocale } from '../composables/useLocale.js'
import { useRenderInline } from '../composables/useRenderInline.js'
import { useKeywordPopover } from '../composables/useKeywordPopover.js'
import { resolveRef, useRefNavigation, scrollToAnchor } from '../composables/useRefNavigation.js'

const { locale } = useLocale()
const { renderRichText } = useRenderInline()
const { open, openGloss } = useKeywordPopover()
const { navigateTo } = useRefNavigation()
const t = computed(() => help[locale.value])

function go(id) {
  history.replaceState(null, '', `#${id}`)
  scrollToAnchor(id)
}

// Same three in-body affordances every rule body has (App.vue handles them globally elsewhere;
// this page resolves its own so a cross-ref navigates instead of doing nothing).
function onBodyClick(e) {
  const ref = e.target.closest('.cross-ref')
  if (ref) {
    const { route, anchor } = resolveRef(ref.dataset.ref)
    if (route && anchor) navigateTo({ route, anchor })
    return
  }
  const gloss = e.target.closest('.gloss')
  if (gloss) { openGloss(gloss.dataset.gloss, gloss.getBoundingClientRect()); return }
  const kw = e.target.closest('.keyword')
  if (kw) open(kw.textContent.replace(/^\[|\]$/g, '').trim(), kw.getBoundingClientRect())
}
</script>

<style scoped>
.help-view { padding-top: 0.5rem; max-width: 52rem; margin: 0 auto; }

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

.help-toc {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0 0 1.6rem;
}
.help-toc a {
  padding: 0.35rem 0.7rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 999px;
  text-decoration: none;
}
.help-toc a:hover { color: var(--text-primary); border-color: var(--accent); }

.help-section { margin-bottom: 1.8rem; scroll-margin-top: 6rem; }
.help-section h2 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--accent);
  margin-bottom: 0.5rem;
}
.help-body {
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.7;
}
.help-body :deep(ul) { margin: 0.4rem 0 0.4rem 1.1rem; }
.help-body :deep(li) { margin-bottom: 0.3rem; }
.help-body :deep(strong) { color: var(--text-primary); }
</style>
