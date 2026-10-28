<template>
  <article
    :id="`briefing-${briefing.alliance}-${briefing.phase}`"
    class="dcard"
  >
    <header class="dcard-head">
      <!-- The Alliance is the group heading above the card. -->
      <h3 class="dcard-name">
        {{ phaseLabel(briefing.phase) }}
      </h3>
    </header>

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
  </article>
</template>

<script setup>
// A Briefing card's chart: my Force Disposition (left) against the opponent's (middle) gives the
// Agenda I attempt (right). A tap on an Agenda opens its card in the Agendas chapter.
import { nextTick } from 'vue'
import { scrollToAnchor } from '../../composables/useRefNavigation.js'
import { useDominatus, useAgendaFilter } from './useDominatus.js'

const props = defineProps({
  briefing: { type: Object, required: true },
})
const { labels, phaseLabel, agendaBySlug, dispo } = useDominatus()
const filter = useAgendaFilter()

async function openAgenda(slug) {
  filter.alliance = props.briefing.alliance
  filter.phase = props.briefing.phase
  await nextTick()
  scrollToAnchor(`mission-${slug}`, 100, { glide: true })
}
</script>

<style scoped>
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
