<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventIntroHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventIntroDesc }}</p>
    </div>

    <aside v-if="intro.authorNote" class="author-note">
      <i class="bi bi-translate author-note-icon"></i>
      <div class="author-note-body">
        <p v-html="renderInline(intro.authorNote)"></p>
        <a :href="'mailto:' + authorEmail" class="author-note-mail">{{ authorEmail }}</a>
      </div>
    </aside>

    <RuleBlock
      :id="intro.id"
      :body="intro.body"
      :note="intro.note"
      :see-also="intro.seeAlso"
    />

    <PageNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RuleBlock from '../../components/RuleBlock.vue'
import PageNav from '../../components/PageNav.vue'
import { getEventContent } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const labels = computed(() => ui[locale.value])
const ec = computed(() => getEventContent(locale.value))
const intro = computed(() => ec.value.sequence.introduction)

const authorEmail = 'yas-shaman@yandex.ru'
</script>

<style scoped>
.view-hero {
  padding: 1.25rem 0 0.9rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.25rem;
}
.view-hero h1 {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  margin-bottom: 0.4rem;
}
.view-hero-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-style: italic;
}
/* Hero already provides the "Introduction" heading; hide the empty rule header. */
:deep(.rule-block > .rule-header) {
  display: none;
}

.author-note {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin: 0 0 1.5rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: 4px;
  background: var(--bg-card);
}
.author-note-icon {
  color: var(--accent);
  font-size: 1.2rem;
  line-height: 1.5;
  flex-shrink: 0;
}
.author-note-body p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--text-muted);
}
.author-note-mail {
  display: inline-block;
  margin-top: 0.3rem;
  font-weight: 600;
  color: var(--accent);
}
.author-note-mail:hover {
  text-decoration: underline;
}
</style>
