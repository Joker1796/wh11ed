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
// Agenda I attempt (right). A tap on an Agenda opens its card in the Agendas chapter — on the rules
// page itself, or from a campaign by going there.
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
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
const router = useRouter()

async function openAgenda(slug) {
  filter.alliance = props.briefing.alliance
  filter.phase = props.briefing.phase
  await nextTick()
  if (document.getElementById(`mission-${slug}`)) scrollToAnchor(`mission-${slug}`, 100, { glide: true })
  else router.push({ path: '/dominatus', hash: `#mission-${slug}` })
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
  font-family: var(--font-mono);
  font-size: 0.76rem;
  line-height: 1.45;
  color: var(--text-muted);
}
/* The chart at every width (owner, 2026-10-31: the lines on a phone too): one three-column grid
   for the heads and every row (subgrid) across the card's whole width: the Agenda as wide as its
   longest name (narrower only when the card is), the icon columns share the rest, never narrower
   than their icons (owner, 2026-10-31: no empty band right of the names). ONE line runs through each row as the printed chart draws it: from a tick
   at the left edge through your disposition to the fork, through the opponent's icons to the
   Agenda — drawn behind the icons, which sit on it; the Agenda's ground covers its end. */
.bmatrix {
  --bline: var(--text-dim);
  --bstroke: 2px;
  --bgap: 1rem;
  --brule: linear-gradient(var(--bline), var(--bline)) 0 50% / 100% var(--bstroke) no-repeat;
  display: grid;
  grid-template-columns: minmax(min-content, 1fr) minmax(min-content, 1fr) auto;
  column-gap: var(--bgap);
}
.bhead,
.brow,
.bbranches,
.bbranch {
  display: grid;
  grid-template-columns: subgrid;
  gap: 0 var(--bgap);
  align-items: center;
}
.bhead,
.brow { grid-column: 1 / -1; }
.bbranches { grid-column: 2 / 4; }
/* A subgrid numbers its lines from 1 again: the branch spans all of the fork's two. */
.bbranch { grid-column: 1 / -1; }
.bhead {
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  padding-bottom: 0.3rem;
}
.bhead span:not(:last-child) { text-align: center; }
.brow { padding: 0.35rem 0; }
/* Your disposition: centred on the line, which starts at a tick on the left edge and runs on
   across half the gap to the fork. */
.bmine {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: calc(var(--bgap) / -2);
  padding: 0 0.5rem;
  background: var(--brule);
}
.bmine::before {
  content: '';
  position: absolute;
  left: 0;
  top: calc(50% - 0.4rem);
  height: 0.8rem;
  border-left: var(--bstroke) solid var(--bline);
}
.bor {
  padding: 0 0.3rem;
  background: var(--bg-card);
  font-size: 0.68rem;
  font-style: italic;
  color: var(--text-muted);
}
/* The fork: each branch draws its piece of the bar down the gap — from its middle down on the
   first, its whole height between, to its middle on the last — so it meets every branch's line
   however tall a wrapped Agenda name makes it. */
.bbranch {
  position: relative;
  min-height: 2rem;
  margin-left: calc(var(--bgap) / -2);
  padding-left: calc(var(--bgap) / 2);
  background: var(--brule);
}
.bbranch::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-left: var(--bstroke) solid var(--bline);
}
.bbranch:first-child::before { top: 50%; }
.bbranch:last-child::before { bottom: 50%; }
.bbranch:only-child::before { content: none; }
.bvs { display: flex; justify-content: center; gap: 0.2rem; }
.bagenda {
  display: block;
  padding: 0.15rem 0 0.15rem 0.4rem;
  background: var(--bg-card);
  font-family: var(--font-display);
  font-size: 1rem;
  line-height: 1.15;
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
  /* The card's top as Wahapedia sets it, after the printed card: the head one line across the card,
     larger; under it the lore, the marks large on the right level with it (owner, 2026-10-31). The
     wrappers step aside so the head, the lore, the chart and the Outcomes sit on the card's own grid. */
  .dcard {
    --dmark-size: 4.25rem;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas: 'head head' 'lore mark' 'chart chart' 'out out';
    column-gap: 1.5rem;
  }
  .bbody,
  .bfront { display: contents; }
  /* One line in one face and size (owner, 2026-10-31): the tag keeps its deck colour, a dot between. */
  .dcard-head { grid-area: head; flex-wrap: nowrap; gap: 0.5rem; padding-right: 0; }
  .dcard-tag,
  .dcard-head .dcard-tag + .dcard-name {
    flex-basis: auto;
    margin: 0;
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    line-height: 1.1;
  }
  .dcard-tag::after { content: ' ·'; }
  .dcard-lore { grid-area: lore; align-self: center; margin: 0; }
  .dmark { grid-area: mark; position: static; align-self: center; }
  .bmatrix { grid-area: chart; }
  .dcard-outcomes { grid-area: out; }

  /* The chart across the card, the plates standing over their columns. */
  .bmatrix {
    --bgap: 1.5rem;
    /* The plates and the "or" disc: a quiet step off the card, not the text's colour poured in —
       a light fill read glaring on the dark theme (owner, 2026-10-31). */
    --bplate: color-mix(in srgb, var(--text-primary) 16%, var(--bg-card));
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, 1fr);
    margin-top: 1.1rem;
  }
  .bmine .dispo-icon { width: 48px; height: 48px; }
  .bvs .dispo-icon { width: 36px; height: 36px; }
  .bhead { padding-bottom: 0.9rem; }
  .bhead span {
    padding: 0.3rem 0.5rem;
    background: var(--bplate);
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    text-align: center;
  }
  .brow { padding: 0.5rem 0; }
  .bmine { padding: 0; }
  .bmine::before { top: calc(50% - 0.5rem); height: 1rem; }
  .bmine .dispo-icon + .bor,
  .bmine .bor + .dispo-icon { margin-left: 0.5rem; }
  /* "or" on a light disc, as the card prints it. */
  .bor {
    display: inline-grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border-radius: 50%;
    background: var(--bplate);
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-style: normal;
    text-transform: uppercase;
  }
  .bbranch { min-height: 3.4rem; }
  .bvs { align-items: center; gap: 0.6rem; }
  .bagenda {
    padding: 0.3rem 0.75rem;
    border: 2px solid var(--text-primary);
    background: var(--bg-card);
    color: var(--text-primary);
    font-size: 1.35rem;
    text-decoration: underline dotted;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.25em;
  }

  .dcard-outcomes { margin-top: 0.9rem; }
  .dout-toggle { cursor: default; }
  .dout-list { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 1.25rem; }
  .dout + .dout { margin-top: 0; }
  .dout-np { padding: 0.25rem 0.5rem; background: color-mix(in srgb, var(--text-primary) 16%, var(--bg-card)); color: var(--text-primary); }
}
</style>
