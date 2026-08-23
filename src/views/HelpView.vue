<template>
  <div class="help-view">
    <div class="hero">
      <h1 class="hero-title">{{ t.title }}</h1>
      <p class="hero-desc">{{ t.intro }}</p>
    </div>

    <!-- Plain contents: somebody arrives with ONE question and has to find the line that answers
         it. A numbered list of links does that; a boxed panel with chevrons only adds furniture.
         The line for the section being read is marked, which is the one thing a bare list lacks. -->
    <nav class="help-nav" :aria-label="labels.helpContents">
      <p class="help-nav-h">{{ labels.helpContents }}</p>
      <ol class="help-nav-list">
        <li v-for="(s, i) in t.sections" :key="s.id">
          <a
            :href="`#${s.id}`"
            class="help-nav-item"
            :class="{ on: active === s.id }"
            :aria-current="active === s.id ? 'true' : undefined"
            @click.prevent="go(s.id)"
          >
            <span class="help-nav-n">{{ i + 1 }}.</span>
            <span class="help-nav-t">{{ s.title }}</span>
          </a>
        </li>
      </ol>
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { help } from '../data/help.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useRenderInline } from '../composables/useRenderInline.js'
import { useKeywordPopover } from '../composables/useKeywordPopover.js'
import { resolveRef, useRefNavigation, scrollToAnchor } from '../composables/useRefNavigation.js'

const { locale } = useLocale()
const { renderRichText } = useRenderInline()
const { open, openGloss } = useKeywordPopover()
const { navigateTo } = useRefNavigation()
const t = computed(() => help[locale.value])
const labels = computed(() => ui[locale.value])

// Which row to light. A local scroll-spy rather than useActiveSection.js: that one writes a
// module-level ref shared with the Core Rules page and App.vue's subnav, and it is documented as
// having exactly one writer. Same rule, though — the last heading whose top has passed the header.
const active = ref(null)
const HEADER = 110
let raf = 0
function measure() {
  let found = null
  for (const s of t.value.sections) {
    const el = document.getElementById(s.id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= HEADER) found = s.id
    else break                       // document order is visual order
  }
  active.value = found
}
function onScroll() {
  if (raf) return
  raf = requestAnimationFrame(() => { raf = 0; measure() })
}
onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (raf) cancelAnimationFrame(raf)
})

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

.help-nav { margin: 0 0 2rem; }
.help-nav-h {
  margin: 0 0 0.4rem;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.help-nav-list { list-style: none; margin: 0; padding: 0; }

.help-nav-item {
  display: flex;
  gap: 0.45rem;
  padding: 0.22rem 0;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
}
.help-nav-item:hover { color: var(--accent); }
.help-nav-item.on { color: var(--accent); }

.help-nav-n { flex: none; color: var(--text-muted); }
.help-nav-item.on .help-nav-n { color: var(--accent); }

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
