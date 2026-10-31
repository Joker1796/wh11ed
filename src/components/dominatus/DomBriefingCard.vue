<template>
  <article
    :id="`briefing-${briefing.alliance}-${briefing.phase}`"
    class="dcard"
    :class="`dom-ink-${briefing.alliance}`"
  >
    <header class="dcard-head">
      <span class="dcard-tag">{{ tag }}</span>
      <h3 class="dcard-name">
        {{ phaseLabel(briefing.phase) }}
      </h3>
    </header>
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

    <!-- The reverse of the card: what this phase's Narrative Points mean for the Alliance. Lore,
         read once at the phase's end, so it starts folded. -->
    <div
      v-if="outcomes.length"
      class="dcard-outcomes"
    >
      <button
        type="button"
        class="dout-toggle"
        :aria-expanded="open"
        @click="open = !open"
      >
        {{ labels.domOutcome }}
        <ChevronIcon :turned="open" />
      </button>
      <CollapseTransition :show="open">
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
import { useDominatus, useAgendaFilter } from './useDominatus.js'

const props = defineProps({
  briefing: { type: Object, required: true },
})
const { labels, phaseLabel, agendaBySlug, dispo, cardTag } = useDominatus()
const tag = computed(() => cardTag({ kind: 'briefing', alliance: props.briefing.alliance }))
const open = ref(false)
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
  font-size: 0.82rem;
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
</style>
