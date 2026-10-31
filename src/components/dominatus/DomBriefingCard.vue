<template>
  <article
    :id="`briefing-${briefing.alliance}-${briefing.phase}`"
    class="dcard dom-deck-briefing"
  >
    <header class="dcard-head">
      <span class="dcard-tag">{{ tag }}</span>
      <h3 class="dcard-name">
        {{ phaseLabel(briefing.phase) }}
      </h3>
    </header>
    <div class="bbody">
      <div class="bfront">
        <p
          v-if="briefing.intro"
          class="dcard-lore lines"
        >
          {{ briefing.intro }}
        </p>

        <div class="bmatrix">
          <div class="bhead">
            <span>{{ labels.domYourDispo }}</span>
            <span>{{ labels.domTheirDispo }}</span>
            <span>{{ labels.domYourAgenda }}</span>
          </div>
          <div
            v-for="(row, ri) in briefing.rows"
            :key="ri"
            class="brow"
          >
            <div class="bmine">
              <template
                v-for="(id, i) in row.mine"
                :key="id"
              >
                <span
                  v-if="i"
                  class="bor"
                >{{ labels.trackerOr }}</span>
                <img
                  :src="dispo(id).icon"
                  :alt="dispo(id).name"
                  :title="dispo(id).name"
                  class="dispo-icon"
                >
              </template>
            </div>
            <div class="bbranches">
              <div
                v-for="b in row.branches"
                :key="b.agenda"
                class="bbranch"
              >
                <span class="bvs">
                  <img
                    v-for="id in b.vs"
                    :key="id"
                    :src="dispo(id).icon"
                    :alt="dispo(id).name"
                    :title="dispo(id).name"
                    class="dispo-icon"
                  >
                </span>
                <a
                  class="bagenda"
                  :href="`#mission-${b.agenda}`"
                  @click.prevent="openAgenda(b.agenda)"
                >{{ agendaBySlug[b.agenda].name }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- The reverse of the card: what this phase's Narrative Points mean for the Alliance. Lore,
           read once at the phase's end, so on a phone it starts folded; a desk lays the card out
           landscape, as printed, and shows them beside the chart. -->
      <div
        v-if="outcomes.length"
        class="dcard-outcomes"
      >
        <div
          v-if="wide"
          class="dout-toggle"
        >
          {{ labels.domOutcome }}
        </div>
        <button
          v-else
          type="button"
          class="dout-toggle"
          :aria-expanded="open"
          @click="open = !open"
        >
          {{ labels.domOutcome }}
          <ChevronIcon :turned="open" />
        </button>
        <CollapseTransition :show="open || wide">
          <p class="dout-lead">
            {{ briefing.phase === 3 ? labels.domOutcomeLead3 : labels.domOutcomeLead1 }}
          </p>
          <div class="dout-list">
            <div
              v-for="o in outcomes"
              :key="o.np"
              class="dout"
            >
              <div class="dout-np">
                {{ labels[`domNarrative${o.np}`] }}
              </div>
              <p class="dout-text lines">
                {{ o.text }}
              </p>
            </div>
          </div>
        </CollapseTransition>
      </div>
    </div>
    <DomCardMark
      kind="briefing"
      :phase="briefing.phase"
      :alliance="briefing.alliance"
    />
  </article>
</template>

<script setup>
// A Briefing card's chart: my Force Disposition (left) against the opponent's (middle) gives the
// Agenda I attempt (right). A tap on an Agenda opens its card in the Agendas chapter.
import { ref, computed, nextTick } from 'vue'
import ChevronIcon from '../ChevronIcon.vue'
import CollapseTransition from '../CollapseTransition.vue'
import DomCardMark from './DomCardMark.vue'
import { scrollToAnchor } from '../../composables/useRefNavigation.js'
import { useMediaQuery } from '../../composables/useMediaQuery.js'
import { useDominatus, useAgendaFilter } from './useDominatus.js'

const props = defineProps({
  briefing: { type: Object, required: true },
})
const { labels, phaseLabel, agendaBySlug, dispo, cardTag } = useDominatus()
const tag = computed(() => cardTag({ kind: 'briefing', alliance: props.briefing.alliance }))
const open = ref(false)
// A desk lays the card out landscape (the chapter's grid gives it the full width there), as the
// printed card reads: the lore, the chart across the card, the Outcomes in one row under it, always
// open (owner, 2026-10-31). Same query as the CSS.
const wide = useMediaQuery('(min-width: 1024px)')
// Most Narrative Points first, as the card reads.
const outcomes = computed(() => Object.entries(props.briefing.outcomes || {})
  .map(([np, text]) => ({ np: Number(np), text }))
  .sort((a, b) => b.np - a.np))
const filter = useAgendaFilter()

async function openAgenda(slug) {
  filter.alliance = props.briefing.alliance
  filter.phase = props.briefing.phase
  await nextTick()
  scrollToAnchor(`mission-${slug}`, 100, { glide: true })
}
</script>

<style scoped>
.dcard-outcomes { margin-top: 0.6rem; border-top: 1px dashed var(--border); }
.dout-toggle {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  min-height: 2.2rem;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  cursor: pointer;
}
.dout-lead { margin: 0 0 0.6rem; font-size: 0.85rem; color: var(--text-primary); }
.dout-list { padding-bottom: 0.2rem; }
.dout + .dout { margin-top: 0.55rem; }
.dout-np {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-primary);
}
.dout-text {
  margin: 0.15rem 0 0;
  padding: 0.45rem 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  line-height: 1.45;
  color: var(--text-muted);
}
.bhead,
.brow {
  display: grid;
  grid-template-columns: 5.2rem 1fr;
  gap: 0.5rem;
  align-items: center;
}
.bhead {
  grid-template-columns: 5.2rem 5.6rem 1fr;
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  padding-bottom: 0.3rem;
}
.brow { padding: 0.4rem 0; border-top: 1px solid var(--border); }
.bmine { display: flex; align-items: center; gap: 0.25rem; }
.bor { font-size: 0.68rem; font-style: italic; color: var(--text-muted); }
.bbranch {
  display: grid;
  grid-template-columns: 5.6rem 1fr;
  gap: 0.5rem;
  align-items: center;
  min-height: 1.9rem;
}
.bvs { display: flex; gap: 0.2rem; }
.bagenda {
  font-family: var(--font-display);
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--accent-ink);
  text-decoration: none;
}
@media (hover: hover) {
  .bagenda:hover { color: var(--accent-ink-hover); text-decoration: underline; }
}
/* Last in the sheet on purpose: it overrides the phone's layout above at the same specificity. */
/* Landscape on a desk, as the printed card reads (owner, 2026-10-31): the lore across the card, the
   chart across it with its three heads on plates and a line from your disposition forking to the
   opponent's and on to the Agenda in its box, the Outcomes in one row under it — as many columns as
   the phase has (2 / 1 / 0, or 3 / 2 / 1 / 0). Same width as `wide` in the script. */
@media (min-width: 1024px) {
  /* One three-column grid for the heads and every row (subgrid), so the plates stand over their
     columns; the fork runs in the gap between the first two, the line on to the Agenda in the next. */
  .bmatrix {
    --bline: 2px solid var(--text-dim);
    --bh: 2.75rem;
    --bgap: 1.5rem;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, 1fr);
    column-gap: var(--bgap);
    margin-top: 0.4rem;
  }
  .bmatrix .dispo-icon { width: 30px; height: 30px; }
  .bhead,
  .brow,
  .bbranches,
  .bbranch { display: grid; grid-template-columns: subgrid; gap: 0 var(--bgap); }
  .bhead,
  .brow { grid-column: 1 / -1; }
  .bbranches { grid-column: 2 / 4; }
  /* A subgrid numbers its lines from 1 again: the branch spans all of the fork's two. */
  .bbranch { grid-column: 1 / -1; }
  .bhead { padding-bottom: 0.6rem; }
  .bhead span {
    padding: 0.3rem 0.5rem;
    background: var(--text-primary);
    color: var(--bg-card);
    text-align: center;
  }
  .brow { padding: 0.7rem 0; border-top: none; }
  .brow + .brow { border-top: 1px dashed var(--border); }
  /* Your disposition, then a line on to the fork in the gap. */
  .bmine { gap: 0.4rem; }
  .bmine::after { content: ''; flex: 1; border-top: var(--bline); margin: 0 calc(var(--bgap) / -2) 0 0.5rem; }
  /* The fork: a bar down the gap from the first branch to the last, a stub to each. */
  .bbranches { position: relative; }
  .bbranches::before {
    content: '';
    position: absolute;
    left: calc(var(--bgap) / -2);
    top: calc(var(--bh) / 2);
    bottom: calc(var(--bh) / 2);
    border-left: var(--bline);
  }
  .bbranch { position: relative; height: var(--bh); align-items: center; }
  .bbranch::before { content: ''; position: absolute; left: calc(var(--bgap) / -2); width: calc(var(--bgap) / 2); top: 50%; border-top: var(--bline); }
  .bvs { align-items: center; gap: 0.35rem; }
  .bvs::after { content: ''; flex: 1; border-top: var(--bline); margin: 0 calc(var(--bgap) * -1) 0 0.5rem; }
  .bagenda { padding: 0.25rem 0.6rem; border: 2px solid var(--text-muted); font-size: 1.15rem; }

  .dcard-outcomes { margin-top: 0.9rem; }
  .dout-toggle { cursor: default; }
  .dout-list { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 1.25rem; }
  .dout + .dout { margin-top: 0; }
  .dout-np { padding: 0.25rem 0.5rem; background: var(--text-primary); color: var(--bg-card); }
}
</style>
