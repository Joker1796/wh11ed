<template>
  <aside v-if="intro.authorNote" class="author-note">
    <i class="bi bi-translate author-note-icon"></i>
    <div class="author-note-body">
      <p v-html="renderInline(intro.authorNote)"></p>
      <a :href="'mailto:' + authorEmail" class="author-note-mail">{{ authorEmail }}</a>
    </div>
  </aside>

  <div class="rule-body-wrap">
    <SeeAlsoBlock v-if="intro.seeAlso && intro.seeAlso.length" :refs="intro.seeAlso" />

    <div class="rule-body">
      <!-- Unlike every other chapter's .rule-columns (each item a whole RuleBlock kept
           together with break-inside: avoid), the intro is a single block — RuleBody's
           multi-root fragment puts its paragraphs/lists directly under .rule-columns, so the
           split happens at that granularity instead, same idea as Core Rules' ChapterIntro. -->
      <div class="rule-columns">
        <RuleBody :id="intro.id" :body="intro.body" />
      </div>

      <div v-if="intro.note" class="note-box" v-html="renderParagraphs(intro.note)"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SeeAlsoBlock from '../SeeAlsoBlock.vue'
import RuleBody from '../RuleBody.vue'
import { getEventContent } from '../../data/eventCompanion.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const ec = computed(() => getEventContent(locale.value))
const intro = computed(() => ec.value.sequence.introduction)

const authorEmail = 'gorlovevgeni9617@gmail.com'

function renderParagraphs(text) {
  return text.split('\n\n').map(p => `<p>${renderInline(p.trim().replace(/\n/g, ' '))}</p>`).join('')
}
</script>

<style scoped>
.rule-body-wrap {
  overflow: hidden;
}

.rule-body {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-primary);
}

.author-note {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin: 0 0 1.5rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
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
