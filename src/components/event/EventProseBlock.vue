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
    class="prose-box-wrap"
  >
    <div class="prose-box">
      <RuleBlock
        :id="block.id"
        :title="block.title"
        :body="block.body"
        :note="block.note"
        :see-also="block.seeAlso"
      />
    </div>
  </div>
  <!-- A block with neither title nor text only carries its table or frames: nothing of its own to
       draw, and its empty padding opened a gap above them. -->
  <RuleBlock
    v-else-if="block.title || block.body"
    :id="block.id"
    :class="{ 'prose-step': block.step, 'prose-section': block.section, 'prose-column-break': block.columnBreak }"
    :section-num="block.step ? String(block.step) : undefined"
    :title="block.title"
    :body="block.body"
    :note="block.note"
    :see-also="block.seeAlso"
  />
  <ul
    v-if="block.iconList"
    class="prose-icons"
  >
    <li
      v-for="x in block.iconList"
      :key="x.icon"
    >
      <component
        :is="x.target ? 'a' : 'div'"
        class="prose-icons-row"
        :href="x.target ? `#${x.target}` : undefined"
        @click="goToTarget($event, x.target)"
      >
        <i
          class="wi prose-icons-mark"
          :class="`wi-${x.icon}`"
          aria-hidden="true"
        />
        <div>
          <div class="prose-icons-title">
            {{ x.title }}
          </div>
          <div
            v-safe-html="renderInline(x.count)"
            class="prose-icons-text"
          />
        </div>
      </component>
    </li>
  </ul>
  <div
    v-if="block.boxes"
    :id="block.title || block.body ? undefined : block.id"
    class="prose-boxes"
    :class="{ 'prose-column-break': block.columnBreak }"
  >
    <div
      v-for="x in block.boxes"
      :id="`${block.id}-${x.id}`"
      :key="x.id"
      class="prose-box-wrap"
    >
      <div class="prose-box">
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
    :id="block.title || block.body ? undefined : block.id"
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
import { useRouter } from 'vue-router'
import RuleBlock from '../RuleBlock.vue'
import RuleBody from '../RuleBody.vue'
import DataTable from '../DataTable.vue'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { vSafeHtml } from '../../directives/safeHtml.js'
import { scrollToAnchor } from '../../composables/useRefNavigation.js'

// One Event Companion prose block: the RuleBlock itself, optionally wrapped in the flavor
// surface or framed (`box` — a booklet's boxed rule: a frame, the title on a filled plate in its
// corner), optionally followed by framed items of its own (`boxes`, each with an emblem on the
// right — Dominatus' Alliances), a list with a mark beside each line (`iconList` — the booklet's
// list of decks) and its own table (`table.plate`: set as the booklet sets it — the
// title on the same plate, no frame, rules between the rows); `columnBreak` starts the next column;
// `step` puts the booklet's step
// number before the title; `section` sets one of the booklet's section headings apart. Rendered by EventProseBlocks.vue.
defineProps({
  block: { type: Object, required: true },
})
const { renderInline } = useRenderInline()
const router = useRouter()

async function goToTarget(event, target) {
  if (!target || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  await router.push({ hash: `#${target}` })
  scrollToAnchor(target, 100, { glide: true })
}
</script>

<style scoped>
.table-section {
  margin: 1rem 0;
}
/* A booklet's frame: a thin rule round the text, its title on a filled plate standing on the
   frame's top edge at the left (owner, 2026-10-31: above the frame, as the booklet prints it).
   The plate sits in the wrapper's top PADDING, not a margin: in two columns a block that starts a
   column loses its top margin, and the plate went with it — cut off at the column's top. One
   wrapper, so the plate and its frame are never split between columns either. */
/* The room below a frame is padding, not margin: a column drops the bottom margin of what ends it,
   and a frame last in a chapter's right column sat on the next chapter's rule (owner, 2026-10-31). */
.prose-box-wrap { padding: 1.75rem 0 0.9rem; margin: 0.9rem 0 0; break-inside: avoid; }
.prose-box {
  position: relative;
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
  /* 18.4px: just over the 18px under which the display face must stay at 400 (src/components/
     CLAUDE.md, Type) — so the plates can be bold, as the booklet prints them (owner, 2026-10-31). */
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.25;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.prose-box-title { position: absolute; bottom: 100%; left: -1px; }
/* `columnBreak`: this block starts the next column of a two-column run. */
.prose-column-break { break-before: column; -webkit-column-break-before: always; }
/* The framed items one under another, each the full width (owner, 2026-10-31: side by side left
   each too narrow). */
.prose-boxes { margin: 0 0 0.9rem; }
.prose-boxes .prose-box-wrap { margin: 0.3rem 0 0; padding-bottom: 0.3rem; }
.prose-box-row { display: flex; align-items: center; gap: 0.8rem; }
.prose-box-text { flex: 1; min-width: 0; }
/* About a quarter of the frame's width, as the booklet prints it beside the text. */
.prose-box-icon { flex: none; width: 5.5rem; height: 5.5rem; margin: 0; color: var(--text-primary); }
.prose-box-note { margin: 0.6rem 0 0.9rem; }
/* A numbered step: the number on a filled square with its bottom-right corner cut, as the booklet
   prints it — in the house accent (the global .section-num, made a head taller than the title). */
.prose-step :deep(.section-num) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0;
  padding: 0;
  font-family: var(--font-display);
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: 0;
  clip-path: polygon(0 0, 100% 0, 100% 72%, 72% 100%, 0 100%);
}
.prose-step :deep(.rule-header) { gap: 0.55rem; flex-wrap: nowrap; }
/* A section heading of the booklet (Preparing the Campaign, Start the Campaign): a divider, not a
   title — the chapter heading's face in capitals, a step under it, in the accent's ink, a hairline
   running on to the right edge. Capitals at a heading's size read larger than the chapter's own heading over them (owner,
   2026-10-31, twice), so the section is marked by colour and rule, not by size. */
.prose-section { padding: 1.1rem 0 0.2rem; border-bottom: none; }
.prose-section :deep(.rule-header) { margin-bottom: 0; }
.prose-section :deep(.rule-title-wrap) { display: flex; align-items: center; gap: 0.75rem; flex: 1; }
.prose-section :deep(.rule-title) {
  font-family: var(--font-display);
  font-size: 2.1rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--accent-ink);
  white-space: nowrap;
}
/* Under the chapter heading at both widths (the shared scale drops it to 1.95rem under 900px). */
@media (max-width: 900px) {
  .prose-section :deep(.rule-title) { font-size: 1.6rem; }
}
.prose-section :deep(.rule-title-wrap)::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--accent);
}
/* The booklet's list of decks: the mark, the name in the display face, the count under it, a
   dotted rule between the lines. */
.prose-icons { list-style: none; margin: 0.3rem 0 0.9rem; padding: 0; }
.prose-icons li {
  border-bottom: 1px dotted var(--text-muted);
}
.prose-icons-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.45rem 0;
  text-decoration: none;
}
.prose-icons-mark { flex: none; width: 2.6rem; height: 2.6rem; margin: 0; color: var(--text-primary); }
.prose-icons-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  line-height: 1.1;
  text-transform: uppercase;
  color: var(--text-primary);
}
.prose-icons-text { font-size: 0.85rem; color: var(--text-muted); }
/* A booklet's table: the title plate standing on the table's top rule, a grey head in sentence
   case, the counts large in the middle, a rule under every row — no frame, no stripes. */
.prose-table { max-width: 40rem; }
.prose-table :deep(.table-wrap) { margin: 0; border: none; }
.prose-table :deep(table) { margin: 0; border-top: 1px solid var(--text-muted); }
.prose-table :deep(th) {
  background: color-mix(in srgb, var(--text-primary) 10%, transparent);
  color: var(--text-primary);
  text-transform: none;
  letter-spacing: 0;
  font-size: 0.85rem;
  line-height: 1.2;
  padding: 0.3rem 0.6rem;
  border-bottom: none;
}
/* A head on one line wherever it fits; a 360px phone has to wrap it or scroll sideways. */
@media (min-width: 480px) {
  .prose-table :deep(th) { white-space: nowrap; }
}
.prose-table :deep(td) { background: transparent; border-bottom: 1px solid var(--text-muted); vertical-align: middle; }
.prose-table :deep(th:nth-child(2)),
.prose-table :deep(td:nth-child(2)) { text-align: center; }
.prose-table :deep(td:nth-child(2)) { font-size: 1.1rem; font-weight: 700; line-height: 1; }
.prose-table :deep(td:last-child) { white-space: nowrap; }
</style>
