<template>
  <div v-if="section" class="help-view">
    <RouterLink to="/help" class="back">
      <i class="bi bi-chevron-left"></i> {{ t.title }}
    </RouterLink>

    <div class="hero">
      <h1 class="hero-title">{{ section.title }}</h1>
    </div>

    <div class="help-body" v-html="renderRichText(section.body)" @click="onBodyClick"></div>

    <!-- The door into what was just explained. A reader who arrived from that section already
         knows the way back, but one who came down the contents does not — and after reading about
         the roster builder, opening it is the next thing they want. -->
    <RouterLink v-if="section.to" :to="section.to" class="help-go">
      {{ section.toLabel }}
      <i class="bi bi-chevron-right"></i>
    </RouterLink>

    <!-- The six topics are one guide read in order as often as they are arrived at singly, so the
         foot of each page offers its neighbours rather than sending the reader back to the list. -->
    <nav class="help-around" :aria-label="labels.helpContents">
      <RouterLink v-if="prev" :to="`/help/${slugOf(prev)}`" class="ha-link ha-prev">
        <i class="bi bi-chevron-left"></i>
        <span>{{ prev.title }}</span>
      </RouterLink>
      <RouterLink v-if="next" :to="`/help/${slugOf(next)}`" class="ha-link ha-next">
        <span>{{ next.title }}</span>
        <i class="bi bi-chevron-right"></i>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
// One help topic (`/help/:topic`). The guide used to be a single long page with six anchors; each
// section is now a page of its own, so the app can link at the topic a reader is actually standing
// in ("Section help" on the tracker, on the roster list) instead of dropping them into the middle
// of everything.
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { help, slugOf } from '../data/help.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useRenderInline } from '../composables/useRenderInline.js'
import { useKeywordPopover } from '../composables/useKeywordPopover.js'
import { resolveRef, useRefNavigation } from '../composables/useRefNavigation.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const { renderRichText } = useRenderInline()
const { open, openGloss } = useKeywordPopover()
const { navigateTo } = useRefNavigation()
const t = computed(() => help[locale.value])
const labels = computed(() => ui[locale.value])

const index = computed(() => t.value.sections.findIndex((s) => slugOf(s) === route.params.topic))
const section = computed(() => t.value.sections[index.value] || null)
const prev = computed(() => (index.value > 0 ? t.value.sections[index.value - 1] : null))
const next = computed(() => t.value.sections[index.value + 1] || null)

// A slug that names no topic is a link that outlived a rename, not a page — the guide's own list is
// a better answer than an error. Checked here rather than in the router so the topic list stays in
// the data file instead of being copied into the route table.
watch(section, (s) => { if (!s) router.replace('/help') }, { immediate: true })

// Keywords, glossary terms and (NN.NN) rule numbers inside the body behave exactly as they do
// inside a rule — same handler the long page had.
function onBodyClick(e) {
  const kw = e.target.closest('[data-kw]')
  if (kw) { open(kw.dataset.kw, kw.getBoundingClientRect()); return }
  const gl = e.target.closest('[data-gloss]')
  if (gl) { openGloss(gl.dataset.gloss, gl.getBoundingClientRect()); return }
  const ref = e.target.closest('[data-ref]')
  if (ref) {
    e.preventDefault()
    navigateTo(resolveRef(ref.dataset.ref))
  }
}
</script>

<style scoped>
.help-view { padding-top: 0.5rem; padding-bottom: 2rem; }

.hero {
  padding: 0.75rem 0 0.7rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.25rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 2.6rem;
  font-weight: 400;
  color: var(--text-primary);
}

.help-body {
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Only the three topics that describe a section of the app carry this, so it has to look like a
   deliberate destination rather than one more line of the body. */
.help-go {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.5rem;
  padding: 0.6rem 1.3rem;
  border: 1px solid var(--accent);
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}

.help-go:hover {
  background: var(--accent);
  color: var(--text-on-accent);
  text-decoration: none;
}

/* Neighbours: the previous topic pinned left, the next one right, whichever of the two exists. */
.help-around {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.ha-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
}

.ha-link:hover { color: var(--accent); text-decoration: none; }
.ha-next { margin-left: auto; text-align: right; }

@media (max-width: 640px) {
  .hero-title { font-size: 2rem; }
}
</style>
