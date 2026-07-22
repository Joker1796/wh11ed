<template>
  <article class="mcard" :class="{ collapsible }" :id="`mission-${mission.slug}`">
    <!-- When collapsible, the header is a toggle (chevron) that folds the body into an accordion. -->
    <component
      :is="collapsible ? 'button' : 'header'"
      class="mcard-head"
      :type="collapsible ? 'button' : undefined"
      :aria-expanded="collapsible ? open : undefined"
      @click="collapsible && (open = !open)"
    >
      <i v-if="collapsible" class="bi mcard-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
      <h3 class="mcard-name">{{ mission.name }}</h3>
      <span v-if="subtitle" class="mcard-sub">{{ subtitle }}</span>
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
  border-radius: 8px;
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
/* Collapsible mode: the header is a full-width chevron toggle (native button chrome stripped,
   the bottom divider kept). */
.mcard.collapsible > .mcard-head {
  width: 100%;
  align-items: center;
  background: none;
  border: none;
  border-bottom: 1px solid var(--border);
  border-radius: 0;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}
.mcard.collapsible > .mcard-head:hover .mcard-name {
  color: var(--accent);
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
  padding: 1px 5px; border-radius: 2px;
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
  border-radius: 5px;
  margin-top: 0.35rem;
  background: var(--bg-secondary);
}
.m-text { font-size: 0.84rem; color: var(--text-muted); line-height: 1.45; }
.m-text strong { color: var(--text-primary); white-space: nowrap; }
.or { font-style: normal; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; color: var(--text-dim); margin-right: 0.2rem; }
</style>
