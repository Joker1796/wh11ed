<template>
  <div class="faq-item">
    <div class="faq-q">
      <span class="faq-badge">{{ qLabel }}</span>
      <span v-html="renderInline(q)" />
    </div>
    <div class="faq-a">
      <span class="faq-badge ans">{{ aLabel }}</span>
      <span v-html="renderRichText(a)" />
    </div>
  </div>
</template>

<script setup>
import { useRenderInline } from '../composables/useRenderInline.js'

// Shared Q/A card for FAQ entries — used by RuleBody's inline `**Q:**/**A:**` blocks
// and the standalone Reference/Event Companion FAQ pages, so all three share one look.
// The answer uses renderRichText (not plain renderInline) so a `▪ ` bullet-list answer
// (see wh11ed/CLAUDE.md's body-markup table) renders as a real <ul>, not literal "▪" text.
defineProps({
  q: { type: String, required: true },
  a: { type: String, required: true },
  qLabel: { type: String, default: 'Q' },
  aLabel: { type: String, default: 'A' },
})

const { renderInline, renderRichText } = useRenderInline()
</script>

<style scoped>
.faq-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  overflow: hidden;
}

.faq-q,
.faq-a {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  align-items: flex-start;
  line-height: 1.55;
}

.faq-q {
  border-bottom: 1px solid var(--border-light);
  font-weight: 600;
}

.faq-a {
  color: var(--text-muted);
}

.faq-a :deep(ul),
.faq-a :deep(ol) {
  margin: 0.2rem 0 0.3rem 1.1rem;
  padding: 0;
}

.faq-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  min-width: 22px;
  background: var(--accent);
  font-weight: 700;
  font-size: 0.75rem;
  color: var(--text-on-accent);
  flex-shrink: 0;
}

.faq-badge.ans {
  background: var(--text-muted);
}
</style>
