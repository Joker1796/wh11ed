<template>
  <div
    v-if="block.flavor"
    class="event-flavor"
  >
    <RuleBlock
      :id="block.id"
      :title="block.title"
      :body="block.body"
      :note="block.note"
      :see-also="block.seeAlso"
    />
  </div>
  <div
    v-else-if="block.box"
    class="prose-box"
  >
    <RuleBlock
      :id="block.id"
      :title="block.title"
      :body="block.body"
      :note="block.note"
      :see-also="block.seeAlso"
    />
  </div>
  <RuleBlock
    v-else
    :id="block.id"
    :title="block.title"
    :body="block.body"
    :note="block.note"
    :see-also="block.seeAlso"
  />
  <div
    v-for="x in block.boxes || []"
    :id="`${block.id}-${x.id}`"
    :key="x.id"
    class="prose-box prose-box--item"
  >
    <div class="prose-box-title">
      {{ x.title }}
    </div>
    <div class="prose-box-row">
      <div class="prose-box-text">
        <RuleBody :body="x.body" />
      </div>
      <i
        v-if="x.icon"
        class="wi prose-box-icon"
        :class="`wi-${x.icon}`"
        aria-hidden="true"
      />
    </div>
  </div>
  <p
    v-if="block.boxesNote"
    class="prose-box-note"
  >
    {{ block.boxesNote }}
  </p>
  <div
    v-if="block.table"
    class="table-section"
    :class="{ 'prose-table': block.table.plate }"
  >
    <DataTable
      :title="block.table.title"
      :headers="block.table.headers"
      :rows="block.table.rows"
      :footnote="block.tableNote"
    />
  </div>
</template>

<script setup>
import RuleBlock from '../RuleBlock.vue'
import RuleBody from '../RuleBody.vue'
import DataTable from '../DataTable.vue'

// One Event Companion prose block: the RuleBlock itself, optionally wrapped in the flavor
// surface or framed (`box` — a booklet's boxed rule: a frame, the title on a filled plate in its
// corner), optionally followed by framed items of its own (`boxes`, each with an emblem on the
// right — Dominatus' Alliances) and its own table (`table.plate`: set as the booklet sets it — the
// title on the same plate, no frame, rules between the rows). Rendered by EventProseBlocks.vue.
defineProps({
  block: { type: Object, required: true },
})
</script>

<style scoped>
.table-section {
  margin: 1rem 0;
}
/* A booklet's frame: a thin rule round the text, its title on a filled plate standing on the
   frame's top edge at the left (owner, 2026-10-31: above the frame, as the booklet prints it). The
   top margin is the plate's height. */
.prose-box {
  position: relative;
  margin: 2.6rem 0 0.9rem;
  padding: 0.75rem 0.85rem;
  border: 1px solid var(--text-muted);
}
.prose-box :deep(.rule-block) { padding: 0; border-bottom: none; }
/* The frame's own padding is the space under the text: no paragraph margin on top of it. */
.prose-box :deep(.rule-body > :last-child),
.prose-box-text > :deep(:last-child) { margin-bottom: 0; }
.prose-box :deep(.rule-header) { position: absolute; bottom: 100%; left: -1px; margin: 0; }
.prose-box :deep(.rule-title),
.prose-box-title,
.prose-table :deep(.table-title) {
  display: inline-block;
  margin: 0;
  padding: 0.12rem 0.5rem;
  background: var(--text-primary);
  color: var(--bg-card);
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 400;
  line-height: 1.25;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.prose-box-title { position: absolute; bottom: 100%; left: -1px; }
.prose-box--item { margin: 2.4rem 0 0.6rem; }
.prose-box-row { display: flex; align-items: center; gap: 0.8rem; }
.prose-box-text { flex: 1; min-width: 0; }
/* About a quarter of the frame's width, as the booklet prints it beside the text. */
.prose-box-icon { flex: none; width: 5.5rem; height: 5.5rem; margin: 0; color: var(--text-primary); }
.prose-box-note { margin: 0.6rem 0 0.9rem; }
/* A booklet's table: the title plate standing on the table's top rule, a grey head in sentence
   case, the counts large in the middle, a rule under every row — no frame, no stripes. */
.prose-table :deep(.table-wrap) { margin: 0; border: none; }
.prose-table :deep(table) { margin: 0; border-top: 1px solid var(--text-muted); }
.prose-table :deep(th) {
  background: color-mix(in srgb, var(--text-primary) 10%, transparent);
  color: var(--text-primary);
  text-transform: none;
  letter-spacing: 0;
  font-size: 0.85rem;
  border-bottom: none;
}
.prose-table :deep(td) { background: transparent; border-bottom: 1px solid var(--text-muted); vertical-align: middle; }
.prose-table :deep(th:nth-child(2)),
.prose-table :deep(td:nth-child(2)) { text-align: center; }
.prose-table :deep(td:nth-child(2)) { font-size: 1.1rem; font-weight: 700; line-height: 1; }
.prose-table :deep(td:last-child) { white-space: nowrap; }
</style>
