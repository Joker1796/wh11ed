<template>
  <article class="tcard" :id="`twist-${twist.id}`">
    <header class="tcard-head">
      <h3 class="tcard-name">{{ twist.title }}</h3>
    </header>

    <!-- Lore/flavour right after the heading, project convention (cf. .strat-flavor);
         the `tcard-flavor` class is hidden in "Hide lore" mode. -->
    <p v-if="twist.example" class="tcard-flavor" v-html="renderInline(twist.example)"></p>

    <div class="tcard-body">
      <RuleBody :body="twist.body" />
    </div>

    <p v-if="twist.note" class="tcard-note" v-html="renderInline(twist.note)"></p>
  </article>
</template>

<script setup>
import RuleBody from '../RuleBody.vue'
import { useRenderInline } from '../../composables/useRenderInline.js'

defineProps({
  twist: { type: Object, required: true }, // { id, title, body, note?, example? }
})

const { renderInline } = useRenderInline()
</script>

<style scoped>
.tcard {
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-card);
  padding: 0.85rem 0.95rem 0.95rem;
}
.tcard-head {
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}
.tcard-name {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
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
  border-radius: 4px;
  font-size: 0.82rem;
  font-style: italic;
  color: var(--text-muted);
  line-height: 1.5;
}
</style>
