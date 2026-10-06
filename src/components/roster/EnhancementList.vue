<template>
  <!-- A detachment's enhancements as the rules print them — name, Russian name, points, text — and,
       given the list, who in it wears each one or could (enhancementBearers). The rules panel over
       the builder and the read-only list's Rules tab draw the same thing. -->
  <div class="enh-list">
    <article
      v-for="e in enhancements"
      :key="e.name"
      class="enh"
    >
      <div class="enh-head">
        <div class="enh-heading">
          <span class="enh-name">{{ e.name }}</span>
          <span
            v-if="e.nameRu"
            class="enh-ru"
          >{{ e.nameRu }}</span>
        </div>
        <span
          v-if="e.points != null"
          class="enh-pts"
        >{{ e.points }} {{ labels.rosterPointsLabel }}</span>
      </div>
      <div
        class="enh-body"
        v-html="renderRichText(e.body)"
      />
      <RuleExtras :extras="e.extras" />
      <!-- Who: the units as tags — the one wearing it filled with a tick, the free ones outlined. -->
      <div
        v-if="bearers(e)"
        class="enh-who"
      >
        <template v-if="bearers(e).taken.length">
          <span class="enh-who-label">{{ labels.rosterEnhTaken }}</span>
          <span
            v-for="n in bearers(e).taken"
            :key="'t' + n"
            class="enh-unit on"
          ><i
            class="bi bi-check-lg"
            aria-hidden="true"
          /> {{ n }}</span>
        </template>
        <template v-if="bearers(e).can.length">
          <span class="enh-who-label">{{ bearers(e).taken.length ? labels.rosterEnhCanMore : labels.rosterEnhCan }}</span>
          <span
            v-for="n in bearers(e).can"
            :key="'c' + n"
            class="enh-unit"
          >{{ n }}</span>
        </template>
        <span
          v-if="!bearers(e).taken.length && !bearers(e).can.length"
          class="enh-none"
        >{{ labels.rosterEnhNobody }}</span>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { enhancementBearers } from '../../composables/rosterEngine.js'
import RuleExtras from '../RuleExtras.vue'

const props = defineProps({
  // The rules bundle's enhancements (name, nameRu, points, body).
  enhancements: { type: Array, required: true },
  // The list, to say who wears each one: { units, defOf, detachments (roster data), factionSlug }.
  // Without it the texts alone.
  list: { type: Object, default: null },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { renderRichText } = useRenderInline()

const answers = computed(() => {
  const out = new Map()
  if (!props.list) return out
  for (const e of props.enhancements) out.set(e.name, enhancementBearers(e.name, props.list))
  return out
})
const bearers = (e) => answers.value.get(e.name) || null
</script>

<style scoped>
/* One card an enhancement, as on the faction page (FactionRuleView), a step denser: it sits in a
   list's Rules tab and in the builder's rules sheet, both beside a list of units. */
.enh-list { display: flex; flex-direction: column; gap: 0.5rem; }
.enh {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  padding: 0.6rem 0.8rem 0.7rem;
}
.enh-head { display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.35rem; }
.enh-heading { min-width: 0; }
.enh-name {
  display: block;
  font-family: var(--font-display); font-size: 1.15rem; font-weight: 400; line-height: 1.15;
  text-transform: uppercase; letter-spacing: 0.3px; color: var(--text-primary);
}
.enh-ru { display: block; font-size: 0.72rem; color: var(--text-muted); }
.enh-pts { margin-left: auto; flex-shrink: 0; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--text-muted); white-space: nowrap; }
.enh-body { font-size: 0.85rem; line-height: 1.45; color: var(--text-primary); }
/* The answer for this list, ruled off from the rule text. */
.enh-who {
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem 0.35rem;
  margin-top: 0.55rem; padding-top: 0.5rem; border-top: 1px solid var(--border-light);
}
.enh-who-label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-dim); }
.enh-unit {
  display: inline-flex; align-items: center; gap: 0.2rem;
  padding: 0.1rem 0.45rem; border: 1px solid var(--border);
  font-size: 0.78rem; font-weight: 600; color: var(--text-primary);
}
.enh-unit.on { border-color: var(--accent); background: var(--accent); color: var(--text-on-accent); }
.enh-none { font-size: 0.8rem; color: var(--text-dim); }
</style>
