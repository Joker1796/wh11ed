<template>
  <div class="help-view">
    <div class="hero">
      <h1 class="hero-title">{{ t.title }}</h1>
      <p class="hero-desc">{{ t.intro }}</p>
    </div>

    <!-- A real table of contents, not a pile of tags: somebody arrives with ONE question — usually
         "does it work without signal" or "where did my lists go" — and has to see, at a glance,
         which row answers it. Numbered, one per line, and the row for the section you are reading
         stays lit as you scroll. -->
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
            <span class="help-nav-n">{{ i + 1 }}</span>
            <span class="help-nav-t">{{ s.title }}</span>
            <i class="bi bi-chevron-right help-nav-c"></i>
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

.help-nav {
  margin: 0 0 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}
.help-nav-h {
  margin: 0;
  padding: 0.55rem 0.9rem;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
}
.help-nav-list { list-style: none; margin: 0; padding: 0; }
.help-nav-list li + li .help-nav-item { border-top: 1px solid var(--border); }

.help-nav-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.65rem 0.9rem;
  color: var(--text-primary);
  text-decoration: none;
  /* The lit bar is drawn on a transparent border so the row never changes height when it lights. */
  border-left: 3px solid transparent;
}
.help-nav-item:hover { background: var(--bg-primary); }
.help-nav-item.on { border-left-color: var(--accent); color: var(--accent); background: var(--bg-primary); }

.help-nav-n {
  flex: none;
  width: 1.6rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
}
.help-nav-item.on .help-nav-n { color: var(--accent); }
.help-nav-t { flex: 1; font-size: 0.9rem; }
.help-nav-c { flex: none; font-size: 0.75rem; color: var(--text-muted); }

/* Two columns once there is room — six rows in one narrow strip reads as a list to scroll past,
   not as a map of the page. */
@media (min-width: 720px) {
  .help-nav-list { display: grid; grid-template-columns: 1fr 1fr; }
  .help-nav-list li:nth-child(2n) .help-nav-item { border-left-width: 3px; }
  .help-nav-list li:nth-child(-n + 2) .help-nav-item { border-top: none; }
  .help-nav-list li:nth-child(n + 3) .help-nav-item { border-top: 1px solid var(--border); }
}

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
