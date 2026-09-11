<!-- What the list PLAYS with, while the list is being built: the faction's army rule, the rule of
     every detachment picked for it, the enhancements those detachments offer and their stratagems.

     It exists because building a list is where those texts are needed and where they were furthest
     away — the answer lived on the faction pages, one navigation out of the builder and back, and
     the list's own Rules tab only exists on the finished list's view screen. Here they sit on top
     of the two panes, folded.

     Everything is folded, twice: the panel itself starts closed (it is reference, not the work),
     and inside it each rule, the enhancements and the stratagems are their own fold, so opening
     "what does my detachment do" does not also unroll thirty stratagem cards.

     Nothing is loaded until the panel is opened for the first time. The faction bundle is 30-60 KB
     per faction and the builder is the one screen that must stay quick to reach, so both the data
     (loadRosterFactionRules) and the components that render it (RuleBlock, StratCard) are pulled
     on that first tap and never before. -->
<template>
  <section class="rrp">
    <button type="button" class="rrp-head" :aria-expanded="open" @click="open = !open">
      <i class="bi rrp-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
      <span class="rrp-title">{{ labels.rosterFactionRules }}</span>
      <span v-if="detNames.length" class="rrp-sub">{{ detNames.join(' · ') }}</span>
    </button>

    <CollapseTransition :show="open">
      <div class="rrp-body">
        <template v-if="faction">
          <!-- The army rule: the one thing here that is true whatever the list picks. -->
          <div v-if="faction.armyRule" class="rrp-sec">
            <button type="button" class="rrp-sec-head" :aria-expanded="isOpen('army')" @click="toggle('army')">
              <i class="bi rrp-chev" :class="isOpen('army') ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
              <span class="rrp-sec-title">{{ labels.factionArmyRule }}</span>
              <span class="rrp-sec-note">{{ faction.armyRule.name }}</span>
            </button>
            <CollapseTransition :show="isOpen('army')">
              <div class="rrp-sec-body">
                <RuleBlock
                  :id="faction.armyRule.id"
                  :title="faction.armyRule.name"
                  :subtitle="faction.armyRule.nameRu"
                  :body="faction.armyRule.body"
                  :example="faction.armyRule.example"
                />
              </div>
            </CollapseTransition>
          </div>

          <!-- One fold per picked detachment — a list may play two. -->
          <div v-for="det in dets" :key="det.name" class="rrp-sec">
            <button type="button" class="rrp-sec-head" :aria-expanded="isOpen(det.name)" @click="toggle(det.name)">
              <i class="bi rrp-chev" :class="isOpen(det.name) ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
              <span class="rrp-sec-title">{{ det.name }}</span>
              <span v-if="det.rule" class="rrp-sec-note">{{ det.rule.name }}</span>
            </button>
            <CollapseTransition :show="isOpen(det.name)">
              <div class="rrp-sec-body">
                <RuleBlock
                  v-if="det.rule"
                  :title="det.rule.name"
                  :subtitle="det.rule.nameRu"
                  :body="det.rule.body"
                />
              </div>
            </CollapseTransition>
          </div>

          <!-- Enhancements: the part of a detachment the builder actually spends points on, which
               is why they are their own fold rather than a tail of the detachment's rule. -->
          <div v-if="enhancements.length" class="rrp-sec">
            <button type="button" class="rrp-sec-head" :aria-expanded="isOpen('enh')" @click="toggle('enh')">
              <i class="bi rrp-chev" :class="isOpen('enh') ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
              <span class="rrp-sec-title">{{ labels.factionEnhancements }}</span>
              <span class="rrp-sec-count">{{ enhancements.length }}</span>
            </button>
            <CollapseTransition :show="isOpen('enh')">
              <div class="rrp-sec-body">
                <article v-for="e in enhancements" :key="e.name" class="rrp-enh">
                  <div class="rrp-enh-head">
                    <span class="rrp-enh-name">{{ e.name }}</span>
                    <span v-if="e.nameRu" class="rrp-enh-ru">{{ e.nameRu }}</span>
                    <span v-if="e.points != null" class="rrp-enh-pts">{{ e.points }}{{ labels.rosterPointsLabel }}</span>
                  </div>
                  <div class="rrp-enh-body" v-html="renderRichText(e.body)"></div>
                </article>
              </div>
            </CollapseTransition>
          </div>

          <!-- Stratagems: the same card the stratagem pages draw, flat. A list's detachments are
               one or two, and each card names its own detachment, so there is nothing to group. -->
          <div v-if="stratagems.length" class="rrp-sec">
            <button type="button" class="rrp-sec-head" :aria-expanded="isOpen('strat')" @click="toggle('strat')">
              <i class="bi rrp-chev" :class="isOpen('strat') ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
              <span class="rrp-sec-title">{{ labels.factionStratagems }}</span>
              <span class="rrp-sec-count">{{ stratagems.length }}</span>
            </button>
            <CollapseTransition :show="isOpen('strat')">
              <div class="rrp-sec-body">
                <div class="rrp-strats">
                  <StratCard v-for="s in stratagems" :key="s.name" :strat="s" :sublabel="s.sublabel" />
                </div>
              </div>
            </CollapseTransition>
          </div>
        </template>
      </div>
    </CollapseTransition>
  </section>
</template>

<script setup>
import { computed, defineAsyncComponent, ref, shallowRef, watch } from 'vue'
import CollapseTransition from '../CollapseTransition.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { loadRosterFactionRules, normName } from '../../composables/rosterFactionRules.js'

// Rendered only once the data is in, i.e. only after the panel has been opened — so these two
// travel with the faction bundle rather than with the builder's own chunk.
const RuleBlock = defineAsyncComponent(() => import('../RuleBlock.vue'))
const StratCard = defineAsyncComponent(() => import('../StratCard.vue'))

const props = defineProps({
  factionSlug: { type: String, default: '' },
  // The detachment NAMES the list has picked, as the roster stores them.
  detachments: { type: Array, default: () => [] },
})

const { locale } = useLocale()
const { renderRichText } = useRenderInline()
const labels = computed(() => ui[locale.value])

const open = ref(false)
const openSecs = ref(new Set())
const isOpen = (k) => openSecs.value.has(k)
function toggle(k) {
  const next = new Set(openSecs.value)
  next.has(k) ? next.delete(k) : next.add(k)
  openSecs.value = next
}

const detNames = computed(() => props.detachments.filter(Boolean))

// Same loader the list's Rules tab and the print sheet use — a detachment carries its rule, its
// stratagems and its enhancements together. Re-runs on a faction or locale change, but only while
// the panel has been opened at least once: a closed panel shows nothing to re-load.
const faction = shallowRef(null)
const lookup = shallowRef(new Map())
watch([open, () => props.factionSlug, locale], async ([isOpenNow, slug, loc]) => {
  if (!isOpenNow || !slug) return
  const res = await loadRosterFactionRules(slug, loc)
  faction.value = res.faction
  lookup.value = res.lookup
}, { immediate: true })

// A list may name a detachment that lives in another file (a Chapter's, see the loader), which is
// what the lookup is for; a name it cannot resolve simply has no fold.
const dets = computed(() => detNames.value.map((n) => lookup.value.get(normName(n))).filter(Boolean))
const enhancements = computed(() => dets.value.flatMap((d) => d.enhancements || []))
const stratagems = computed(() => dets.value.flatMap((d) => d.stratagems || []))
</script>

<style scoped>
/* One card, folds inside it: the same shape the read-only list view's "possible modifiers" block
   wears, so a fold above a list means the same thing on both screens. */
.rrp {
  border: 1px solid var(--border);
  background: var(--bg-card);
  margin-bottom: 0.6rem;
}
.rrp-head {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  width: 100%;
  padding: 0.45rem 0.6rem;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
}
.rrp-chev { flex: none; font-size: 0.72rem; color: var(--text-dim); }
.rrp-title {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
/* Which detachments the rules below are for — the answer to "is this panel about my list?"
   without opening it. Truncated: two detachment names are longer than a phone. */
.rrp-sub {
  flex: 1;
  min-width: 0;
  font-size: 0.72rem;
  color: var(--text-dim);
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rrp-body { padding: 0 0.6rem 0.5rem; }

.rrp-sec { border-top: 1px solid var(--border); }
.rrp-sec:first-child { border-top: none; }
.rrp-sec-head {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  width: 100%;
  padding: 0.4rem 0;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
}
.rrp-sec-title { font-weight: 600; font-size: 0.85rem; }
.rrp-sec-note {
  flex: 1;
  min-width: 0;
  font-size: 0.72rem;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rrp-sec-count {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
}
.rrp-sec-body { padding-bottom: 0.4rem; }

/* The rule texts run a step smaller here than on a rules page, same as the list view's Rules tab:
   this is a reminder beside the work, not the page you go to to read a rule for the first time. */
.rrp-sec-body {
  --fs-rule-title: 1.05rem;
  --fs-subheading: 0.95rem;
}
.rrp-sec-body :deep(.rule-block) { padding: 0.2rem 0 0.4rem; border-bottom: none; }
.rrp-sec-body :deep(.rule-header) { margin-bottom: 0.35rem; }
.rrp-sec-body :deep(.rule-body) { font-size: 0.82rem; line-height: 1.45; }
.rrp-sec-body :deep(.rule-body p) { margin-bottom: 0.45rem; }
.rrp-sec-body :deep(.rule-body p:last-child) { margin-bottom: 0; }

.rrp-enh { padding: 0.35rem 0; border-top: 1px dashed var(--border); }
.rrp-enh:first-child { border-top: none; padding-top: 0; }
.rrp-enh-head { display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.35rem; }
.rrp-enh-name { font-weight: 700; font-size: 0.82rem; color: var(--text-primary); }
.rrp-enh-ru { font-size: 0.72rem; color: var(--text-muted); }
.rrp-enh-pts { margin-left: auto; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }
.rrp-enh-body { font-size: 0.8rem; line-height: 1.4; color: var(--text-primary); }

/* One column of cards: this panel sits above a two-pane layout that is already narrow on a
   phone and half a screen wide on a desktop, so a grid of stratagems would fight it. */
.rrp-strats { display: flex; flex-direction: column; gap: 0.5rem; }
</style>
