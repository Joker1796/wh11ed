<template>
  <article
    :id="`twist-${twist.id}`"
    class="tcard"
  >
    <header class="tcard-head">
      <h3 class="tcard-name">
        {{ twist.title }}
      </h3>
      <div
        v-if="twist.titleRu"
        class="tcard-name-ru"
      >
        {{ twist.titleRu }}
      </div>
    </header>

    <!-- Lore/flavour right after the heading, project convention (cf. .strat-flavor);
         the `tcard-flavor` class is hidden in "Hide lore" mode. -->
    <div
      v-if="twist.example"
      v-safe-html="renderParagraphs(twist.example)"
      class="tcard-flavor paras"
    />

    <div class="tcard-body">
      <RuleBody :body="twist.body" />
    </div>

    <div
      v-if="twist.note"
      v-safe-html="renderParagraphs(twist.note)"
      class="tcard-note paras"
    />
  </article>
</template>

<script setup>
import RuleBody from '../RuleBody.vue'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { vSafeHtml } from '../../directives/safeHtml.js'

defineProps({
  twist: { type: Object, required: true }, // { id, title, titleRu?, body, note?, example? }
})

const { renderParagraphs } = useRenderInline()
</script>

<style scoped>
.tcard {
  border: 1px solid var(--border);
  background: var(--bg-card);
  padding: 0.85rem 0.95rem 0.95rem;
}
.tcard-head {
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}
.tcard-name {
  font-family: var(--font-display);
  font-size: 1.32rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}
.tcard-name-ru {
  /* Right under the name, as a mission's Russian name is (MissionCard, owner 2026-10-25). */
  margin-top: -0.15rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  opacity: 0.8;
  line-height: 1.15;
}
.tcard-flavor {
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.82rem;
  line-height: 1.5;
  margin: 0 0 0.6rem;
}
.tcard-body { font-size: 0.9rem; line-height: 1.55; }

.tcard-note {
  margin-top: 0.7rem;
  padding: 0.55rem 0.7rem;
  border-left: 3px solid var(--accent);
  background: var(--bg-secondary);
  font-size: 0.82rem;
  font-style: italic;
  color: var(--text-muted);
  line-height: 1.5;
}
</style>
