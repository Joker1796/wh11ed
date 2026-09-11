<template>
  <article class="mcard" :class="{ collapsible, 'is-open': open }" :id="`mission-${mission.slug}`">
    <!-- When collapsible, the header is a toggle (chevron) that folds the body into an accordion. -->
    <component
      :is="collapsible ? 'button' : 'header'"
      class="mcard-head"
      :type="collapsible ? 'button' : undefined"
      :aria-expanded="collapsible ? open : undefined"
      @click="collapsible && (open = !open)"
    >
      <h3 class="mcard-name">{{ mission.name }}</h3>
      <span v-if="mission.nameRu" class="mcard-name-ru">{{ mission.nameRu }}</span>
      <span v-if="subtitle" class="mcard-sub">{{ subtitle }}</span>
      <!-- Affordance that the header expands (collapsed state only). -->
      <span v-if="collapsible && !open" class="mcard-hint">{{ labels.missionExpand }}</span>
      <i v-if="collapsible" class="bi mcard-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
    </component>

    <CollapseTransition :show="collapsible ? open : true">
      <div class="mcard-body">
        <p v-if="mission.lore && showLore" class="mcard-lore">{{ mission.lore }}</p>

        <MissionBriefing :briefing="mission.briefing" />

        <div v-for="(b, bi) in mission.blocks" :key="bi" class="m-block">
          <div class="m-bhead">
            <span v-if="b.kind" class="kind" :class="b.kind">{{ b.kind }}</span>
            <span class="m-heading">{{ b.heading }}</span>
            <span v-if="b.when" class="m-when">{{ b.when }}</span>
          </div>
          <div v-for="(r, ri) in b.rows" :key="ri" class="m-cond">
            <span class="m-text">
              <em v-if="r.modifier === 'or'" class="or">{{ labels.trackerOr }}</em>
              {{ r.text }}
              <strong>{{ r.vp }} VP{{ isPerEach(r.text) ? ' ' + labels.trackerEach : '' }}</strong>
            </span>
          </div>
        </div>
      </div>
    </CollapseTransition>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import MissionBriefing from '../MissionBriefing.vue'
import CollapseTransition from '../CollapseTransition.vue'

const props = defineProps({
  mission: { type: Object, required: true }, // { slug, name, lore?, briefing?:[{label?,text}|{action,rows:[{label,text}]}], blocks:[{ kind?, heading, when?, rows:[{text,vp,modifier?}] }] }
  subtitle: { type: String, default: '' },
  // Flavour lore is shown on the Event Companion Missions catalogue, but hidden in the
  // tracker (setup preview / pickers) — there only the rules info (briefing + blocks) is useful.
  showLore: { type: Boolean, default: true },
  // When true, the header becomes a chevron toggle that folds the body into an accordion (used to
  // save vertical space in the tight game-setup Mission step). Default off → catalogue unchanged.
  collapsible: { type: Boolean, default: false },
  defaultOpen: { type: Boolean, default: true },
})

const open = ref(props.defaultOpen)

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// "For each…" rows score per occurrence — annotate the VP with an "each" suffix.
// Matches the English originals and their RU translations ("За каждый/каждую/каждое").
function isPerEach(text) {
  return /^(For each|Each time|За кажд|Каждый раз)/i.test(text || '')
}
</script>

<style scoped>
.mcard {
  border: 1px solid var(--border);
  background: var(--bg-card);
  padding: 0.85rem 0.95rem 0.95rem;
}
.mcard-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.3rem 0.6rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0.3rem;
  border-bottom: 1px solid var(--border);
}
/* Collapsible mode: the header is a full-width chevron toggle, styled as a distinct tinted bar so
   it clearly reads as a clickable accordion (native button chrome stripped). */
.mcard.collapsible > .mcard-head {
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-secondary);
  border: none;
  padding: 0.5rem 0.6rem;
  margin-bottom: 0.7rem;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;
}
.mcard.collapsible > .mcard-head:hover {
  background: color-mix(in srgb, var(--accent) 12%, var(--bg-secondary));
}
/* Collapsed: the bar is the whole card — no trailing gap. */
.mcard.collapsible:not(.is-open) > .mcard-head {
  margin-bottom: 0;
}
/* Right-aligned "expand" hint + accent chevron draw the eye to the toggle affordance. The hint
   carries the margin-left:auto when collapsed; when open (no hint) the chevron carries it. */
.mcard-hint {
  order: 2;
  margin-left: auto;
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent);
  white-space: nowrap;
}
.mcard.collapsible .mcard-chev {
  color: var(--accent);
  order: 3;
}
.mcard.collapsible.is-open .mcard-chev {
  margin-left: auto;
}
.mcard-chev {
  font-size: 0.8rem;
  color: var(--text-muted);
  flex-shrink: 0;
}
.mcard-name {
  font-family: var(--font-display);
  font-size: 1.49rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}
.mcard-sub {
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--text-muted);
}
/* Forces its own row right under the name in the wrapping .mcard-head flex row (a 100%-width
   flex item can't share a line with anything, so it always starts fresh under .mcard-name).
   Ordered LAST so it wraps below the whole header bar rather than between the name and the
   toggle affordance: in RU every tracker mission has this line, and with it in source order the
   "expand" hint and the chevron were pushed onto a third line of their own. */
.mcard-name-ru {
  order: 4;
  flex-basis: 100%;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  opacity: 0.8;
  line-height: 1.15;
}
/* Flavour text (lore), shown right after the title — matches the project's
   .flavor-quote convention; hidden by the global "hide lore" toggle. */
.mcard-lore {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--text-muted);
  border-left: 2px solid var(--border);
  padding-left: 0.85rem;
  margin: 0.4rem 0 0.2rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.m-block { margin-top: 0.7rem; }
.m-bhead { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; margin-bottom: 0.35rem; }
.kind {
  font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
  padding: 1px 5px;
}
.kind.fixed { background: #b3401b; color: #fff; }
.kind.tactical { background: #1f3a5f; color: #fff; }
.m-heading { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: var(--text-dim); }
.m-when { font-size: 0.72rem; color: var(--text-dim); }
.m-cond {
  display: flex;
  align-items: flex-start;
  padding: 0.5rem;
  border: 1px solid var(--border);
  margin-top: 0.35rem;
  background: var(--bg-secondary);
}
.m-text { font-size: 0.84rem; color: var(--text-muted); line-height: 1.45; }
.m-text strong { color: var(--text-primary); white-space: nowrap; }
.or { font-style: normal; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; color: var(--text-dim); margin-right: 0.2rem; }

/* Narrow screens: the card sits inside other padded containers (e.g. the game-setup player card),
   so its own padding — plus each scoring row's — eats too much of the limited width. Tighten it. */
@media (max-width: 560px) {
  .mcard { padding: 0.55rem 0.6rem 0.6rem; }
  .mcard.collapsible > .mcard-head { padding: 0.45rem 0.5rem; }
  .mcard-name { font-size: 1.25rem; }
  .m-cond { padding: 0.4rem 0.45rem; }
  .m-block { margin-top: 0.5rem; }
}
@media (max-width: 380px) {
  .mcard { padding: 0.45rem 0.5rem 0.5rem; }
  .m-cond { padding: 0.35rem 0.4rem; }
}
</style>
