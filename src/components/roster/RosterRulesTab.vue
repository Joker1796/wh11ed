<!-- A saved list's Rules tab: the army rule, then each of the list's detachments — its rule and
     its enhancements, with who in the list wears each one or could. -->
<template>
  <div class="rv-rules">
    <template v-if="faction">
      <section class="rv-rule-block">
        <h3 class="roster-group-head">
          {{ labels.factionArmyRule }}
        </h3>
        <RuleBlock
          :id="faction.armyRule.id"
          :title="faction.armyRule.name"
          :subtitle="faction.armyRule.nameRu"
          :body="faction.armyRule.body"
          :example="faction.armyRule.example"
        />
      </section>
      <section
        v-for="det in detachments"
        :key="det.name"
        class="rv-rule-block"
      >
        <!-- Headed like the army rule above, by what it is (owner, 2026-10-06): the bare
             name over the rule did not say it was the detachment. One detachment: its
             name in the heading. Several: one "Detachments" heading over the first, and
             each one's name over its own rule. -->
        <h3
          v-if="detachments.length === 1"
          class="roster-group-head"
        >
          {{ labels.rosterDetachmentLabel }} · {{ det.name }}
        </h3>
        <template v-else>
          <h3
            v-if="det === detachments[0]"
            class="roster-group-head"
          >
            {{ labels.factionDetachments }}
          </h3>
          <h4 class="rv-det-name">
            {{ det.name }}
          </h4>
        </template>
        <RuleBlock
          :title="det.rule.name"
          :subtitle="det.rule.nameRu"
          :body="det.rule.body"
        />
        <RuleExtras :extras="det.rule.extras" />
        <!-- Its enhancements, and who in this list wears each one or could (a player's
             request, 2026-10-06). -->
        <template v-if="det.enhancements?.length">
          <h3 class="roster-group-head">
            {{ labels.factionEnhancements }}
          </h3>
          <EnhancementList
            :enhancements="det.enhancements"
            :list="list"
          />
        </template>
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RuleBlock from '../RuleBlock.vue'
import RuleExtras from '../RuleExtras.vue'
import EnhancementList from './EnhancementList.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

// `faction` — the rules bundle (null while it loads); `detachments` — the list's own, resolved to
// their rules; `list` — what EnhancementList needs to say who wears an enhancement.
defineProps({
  faction: { type: Object, default: null },
  detachments: { type: Array, required: true },
  list: { type: Object, required: true },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
/* The Rules tab is a REREAD of rules the player already knows, on the screen they hold at the
   table — not the rules page, where a rule is being read for the first time. So it runs a step
   smaller and tighter than RuleBlock's own sizes: --fs-rule-title and --fs-subheading are
   inherited custom properties, so setting them here re-sizes the headings inside RuleBlock /
   RuleBody without reaching into their scoped styles at all; the rest is :deep() on the two
   things that set the rhythm — body type and paragraph gaps. */
.rv-rules {
  /* A step smaller than the rules page, not two. Sofia Sans Extra Condensed is narrow enough
     that a nominal size reads about a size below a sans of the same value — at 1.15rem the rule's
     own name ended up looking no larger than the body underneath it, and the section label above
     it smaller still (owner, 2026-09-24). Raised so the three levels are told apart at arm's
     length: label 1.35 → name 1.45 → sub-rule 1.3 → body 0.85rem of Inter, the same pair of sizes
     the builder's own rules panel uses so one rule reads alike on both screens. The sub-rule heading
     needed the same correction as the name for the same reason — a rule that names two abilities
     was printing their headings smaller than the sentences under them. */
  --fs-rule-title: 1.45rem;
  --fs-subheading: 1.3rem;
}
/* Every override goes through the .rv-rule-block wrapper on purpose: a bare `.rv-rules
   :deep(.rule-body)` ties RuleBlock's own `.rule-body` on specificity (both 0,2,0) and would be
   settled by chunk order, which is nobody's intention. Through the wrapper it is 0,3,0 and wins
   outright. */
.rv-rules .rv-rule-block :deep(.rule-block) { padding: 0.5rem 0; }
/* One of several detachments, named over its rule under the shared heading. */
.rv-det-name { margin: 0.5rem 0 0; font-family: var(--font-display); font-size: 1.15rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.02em; color: var(--accent-ink); }
.rv-rules .rv-rule-block :deep(.rule-body) { font-size: 0.85rem; line-height: 1.45; }
.rv-rules .rv-rule-block :deep(.rule-body p) { margin-bottom: 0.5rem; }
.rv-rules .rv-rule-block :deep(.rule-body p:last-child) { margin-bottom: 0; }
.rv-rules .rv-rule-block :deep(.rule-header) { margin-bottom: 0.4rem; }
.rv-rules .rv-rule-block :deep(.rule-list),
.rv-rules .rv-rule-block :deep(.rule-ol) { margin-bottom: 0.4rem; }
.rv-rules .rv-rule-block :deep(.rule-list li),
.rv-rules .rv-rule-block :deep(.rule-ol li) { margin-bottom: 0.15rem; line-height: 1.35; }
.rv-rules .rv-rule-block :deep(.rule-subheading) { margin: 0.5rem 0 0.15rem; }
/* The section label above a rule — "Army rule", or the detachment's name. Display face like the
   rule's own name, so it needs the same treatment: it sits one step under the name it introduces
   (1.35 to 1.45) and clear of the body, instead of the 1.05rem it shared with the Units tab. */
.rv-rules .roster-group-head { margin: 0.8rem 0 0.35rem; font-size: 1.35rem; }
.rv-rules .rv-rule-block:first-child .roster-group-head { margin-top: 0; }
.rv-rule-block { margin-bottom: 0.9rem; }
</style>
