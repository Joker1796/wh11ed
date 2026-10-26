<template>
  <div
    v-if="faction"
    class="cp-faction-view rule-plates"
    :class="{ themed: !!color }"
    :style="colorVars"
  >
    <div
      class="hero"
      :class="{ 'with-emblem': factionIcons[faction.slug] }"
    >
      <FactionEmblem
        class="hero-emblem"
        :faction="indexEntry"
        in-title
      />
      <h1 class="hero-title">
        {{ faction.name }}
      </h1>
      <div class="hero-subtitle">
        {{ faction.boxName }}
      </div>
    </div>

    <!-- A box is read a part at a time — its rules (stratagems and enhancements among them), the
         mission it plays, its units — so the page is tabs rather than one long scroll (owner,
         2026-09-28; three tabs since 2026-10-15, when the mission came). A search hit deep inside
         one picks that tab from the link's anchor first (tabForAnchor). -->
    <PageTabs
      class="cp-tabs"
      :tabs="tabs"
      @select="tab = $event"
    />
    <Transition
      name="fade"
      mode="out-in"
      @enter="bringTabsIntoView"
    >
      <div
        v-if="tab === 'rules'"
        key="rules"
      >
        <!-- The detachment rule beside the army rule from 1024px, as a faction page lays its rules
             out (.rule-columns); the stratagems and enhancements under them, in their own grids. -->
        <div class="rule-columns cp-rules">
          <!-- Detachment rule -->
          <section
            id="rule"
            class="fsection"
          >
            <h2 class="fsection-title">
              {{ labels.factionDetachment }}
            </h2>
            <div
              v-if="faction.dp || faction.forceDisposition"
              class="det-meta"
            >
              <span
                v-if="faction.dp"
                class="det-meta-item"
              >{{ faction.dp }} DP</span>
              <span
                v-if="faction.forceDisposition"
                class="det-meta-item"
              >{{ faction.forceDisposition }}</span>
            </div>
            <p
              v-if="faction.rule.flavor"
              class="faction-flavor lines"
            >
              {{ faction.rule.flavor }}
            </p>
            <RuleBlock
              :id="`cp-${faction.id}-rule`"
              :title="faction.rule.name"
              :subtitle="faction.rule.nameRu"
              :body="faction.rule.body"
            />
          </section>

          <!-- Army rule -->
          <section
            id="army-rule"
            class="fsection"
          >
            <h2 class="fsection-title">
              {{ labels.factionArmyRule }}
            </h2>
            <p
              v-if="faction.armyRule.flavor"
              class="faction-flavor lines"
            >
              {{ faction.armyRule.flavor }}
            </p>
            <RuleBlock
              :id="`cp-${faction.id}-army-rule`"
              :title="faction.armyRule.name"
              :subtitle="faction.armyRule.nameRu"
              :body="faction.armyRule.body"
              :example="faction.armyRule.example"
            />
          </section>
        </div>

        <!-- Stratagems -->
        <section
          v-if="faction.stratagems?.length"
          id="stratagems"
          class="fsection"
        >
          <h2 class="fsection-title">
            {{ labels.factionStratagems }}
          </h2>
          <div class="strat-grid">
            <StratCard
              v-for="s in faction.stratagems"
              :id="`cp-strat-${faction.id}-${slugify(s.name)}`"
              :key="s.name"
              :strat="s"
              :sublabel="s.sublabel"
            />
          </div>
        </section>

        <!-- Enhancements -->
        <section
          v-if="faction.enhancements?.length"
          id="enhancements"
          class="fsection"
        >
          <h2 class="fsection-title">
            {{ labels.factionEnhancements }}
          </h2>
          <div class="enh-grid">
            <article
              v-for="e in faction.enhancements"
              :id="`cp-enh-${faction.id}-${slugify(e.name)}`"
              :key="e.name"
              class="enh-card"
            >
              <div class="enh-head">
                <div class="enh-heading">
                  <span class="enh-name">{{ e.name }}</span>
                  <span
                    v-if="e.nameRu"
                    class="enh-name-ru"
                  >{{ e.nameRu }}</span>
                </div>
                <div class="enh-tags">
                  <span
                    v-if="e.upgrade"
                    class="enh-tag"
                  >Upgrade</span>
                  <span
                    v-if="e.isDefault"
                    class="enh-tag enh-tag-default"
                  >{{ labels.cpDefaultEnh }}</span>
                </div>
              </div>
              <p
                v-if="e.flavor"
                class="faction-flavor lines"
              >
                {{ e.flavor }}
              </p>
              <div
                v-safe-html="renderRichText(e.body)"
                class="enh-body"
              />
            </article>
          </div>
        </section>
      </div>
      <div
        v-else-if="tab === 'mission'"
        key="mission"
      >
        <!-- The box's own primary mission — each player plays their box's (the mission sequence) -->
        <section
          id="mission"
          class="fsection cp-mission"
        >
          <MissionCard
            :id="`cp-${faction.id}-mission`"
            :mission="mission"
          />
          <!-- Beside the mission, what else decides the game — the mission sequence in five
               lines, and the way to all of it. -->
          <aside class="cp-memo">
            <h2 class="fsection-title">
              {{ labels.cpMemoTitle }}
            </h2>
            <ul>
              <li
                v-for="(line, n) in labels.cpMemo"
                :key="n"
              >
                {{ line }}
              </li>
            </ul>
            <RouterLink
              class="cp-howto"
              to="/combat-patrol/how-to-play"
            >
              {{ labels.cpHowToPlayLink }} →
            </RouterLink>
          </aside>
        </section>
      </div>
      <div
        v-else
        key="units"
      >
        <!-- Datasheets -->
        <section
          v-if="faction.datasheets?.length"
          id="datasheets"
          class="fsection"
        >
          <h2 class="fsection-title">
            {{ labels.factionDatasheets }}
          </h2>
          <div class="ds-list">
            <div
              v-for="ds in faction.datasheets"
              :key="ds.id"
              class="ds-unit"
            >
              <div class="ds-head">
                <h3 class="ds-title">
                  <span class="ds-title-name">{{ ds.name }}</span><span
                    v-if="ds.count > 1"
                    class="ds-title-count"
                    :title="labels.cpUnitCount.replace('{n}', ds.count)"
                  >×{{ ds.count }}</span><span
                    v-if="ds.baseSize"
                    class="ds-title-base"
                  >({{ fmtBase(ds.baseSize) }})</span>
                </h3>
              </div>
              <DatasheetCard :sheet="ds" />
            </div>
          </div>
        </section>
      </div>
    </Transition>
  </div>
  <div
    v-else
    class="cp-faction-view"
    :class="{ themed: !!color }"
    :style="colorVars"
  >
    <p class="cp-empty">
      {{ labels.factionsSoon }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import RuleBlock from '../../components/RuleBlock.vue'
import StratCard from '../../components/StratCard.vue'
import MissionCard from '../../components/event/MissionCard.vue'
import DatasheetCard from '../../components/DatasheetCard.vue'
import FactionEmblem from '../../components/FactionEmblem.vue'
import { factionIcons } from '../../data/factionIcons.js'
import PageTabs from '../../components/PageTabs.vue'
import { bringTabsIntoView } from '../../composables/bringTabsIntoView.js'
import { scrollToAnchor } from '../../composables/useRefNavigation.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { formatBaseSize } from '../../utils/baseSize.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import { combatPatrolIndex } from '../../data/combatPatrolIndex.js'
import { slugify } from '../../core/shared/slugify.js'
import { vSafeHtml } from '../../directives/safeHtml.js'

const route = useRoute()
const { locale } = useLocale()
const { renderRichText } = useRenderInline()
const labels = computed(() => ui[locale.value])
const fmtBase = (raw) => formatBaseSize(raw, labels.value)

// The route names a BOX (`/combat-patrol/:slug`, the param being the box's `id` — a faction can
// have several boxes); the faction it belongs to comes from the light index, so the accent and
// the emblem are there before the box's own data has loaded.
const box = computed(() => combatPatrolIndex.find((b) => b.id === route.params.slug) || null)

// Same Wahapedia-style per-faction accent as the normal faction pages (FactionLayout.vue) —
// factionsIndex.js's palette exposed as two private custom props, folded into --accent per
// theme by the .cp-faction-view.themed rules below.
const indexEntry = computed(() => factionIndexBySlug(box.value?.slug))
const color = computed(() => indexEntry.value?.color || null)
const colorVars = computed(() =>
  // `--tone-light` too: the rule plates (style.css) wear the faction's colour, as on its own page.
  color.value ? { '--fa-light': color.value.light, '--fa-dark': color.value.dark, '--tone-light': color.value.light } : undefined,
)

// combatPatrol.js carries every box's rule text + fixed-roster datasheets —
// dynamically imported here (not statically) so it stays out of the app's root bundle; only a
// visit to a Combat Patrol page pulls it in, matching the project's other heavy-data-file loads.
const combatPatrol = ref(null)
const missions = ref(null)
watchEffect(async () => {
  const [cp, cpm] = await Promise.all([import('../../data/combatPatrol.js'), import('../../data/combatPatrolMissions.js')])
  missions.value = cpm
  combatPatrol.value = cp.combatPatrol
})

const faction = computed(() =>
  combatPatrol.value?.[locale.value].factions.find((f) => f.id === route.params.slug) || null,
)

const mission = computed(() => missions.value?.cpMissionOfBox(route.params.slug, locale.value) || null)

// The parts of a box, as tabs — only the ones this box has. Rules (the detachment's and the
// army's, then the stratagems and enhancements) are always there.
const tab = ref('rules')
const tabs = computed(() => {
  const f = faction.value
  const l = labels.value
  const all = [
    { key: 'rules', label: l.rosterViewTabRules, has: true },
    { key: 'mission', label: l.cpMissionTab, has: !!mission.value },
    { key: 'units', label: l.rosterViewTabUnits, has: !!f?.datasheets?.length },
  ]
  return all.filter((t) => t.has).map((t) => ({ key: t.key, label: t.label, active: tab.value === t.key }))
})

// A link into the page names what it wants by anchor (the search index's `cp-strat-…`,
// `cp-enh-…`, `cp-<box id>-rule…` ids, and the old section ids): open the tab that holds it before
// scrollToAnchor goes looking — a hidden tab has nothing in the page to scroll to.
function tabForAnchor(id) {
  if (!id) return null
  if (id.startsWith('cp-strat-') || id === 'stratagems') return 'rules'
  if (id.startsWith('cp-enh-') || id === 'enhancements') return 'rules'
  if (id === 'mission' || id.endsWith('-mission')) return 'mission'
  if (id === 'datasheets' || id.startsWith('ds-')) return 'units'
  if (id.startsWith('cp-') || id === 'rule' || id === 'army-rule') return 'rules'
  return null
}
watch(() => route.hash, (hash) => {
  const id = decodeURIComponent(hash.slice(1))
  const t = tabForAnchor(id)
  if (!t) return
  tab.value = t
  // …and go to it: a link opened straight (not from the search, which scrolls itself) used to
  // stop at the top of the page. scrollToAnchor polls, so the box's data loading late is fine.
  scrollToAnchor(id)
}, { immediate: true })
</script>

<style scoped>
.cp-faction-view {
  padding-top: 0.25rem; /* the faction page's (FactionLayout) */
}

/* A rules section is a heading and the rule under it, tight as the vertical-density canon has it
   (root CLAUDE.md → src/components/CLAUDE.md): RuleBlock's own padding and rule line are for a
   run of rules, and here each section holds one — they doubled the gaps (owner, 2026-10-15). */
.cp-rules .fsection > .rule-block {
  padding: 0.35rem 0 0;
  border-bottom: none;
}
.cp-rules .det-meta {
  margin-bottom: 0.4rem;
}

.cp-memo ul {
  margin: 0;
  padding-left: 1.2rem;
}
.cp-memo li { margin-bottom: 0.3rem; }
/* The mission and the memo side by side from 1024px, the threshold .rule-columns uses. */
@media (min-width: 1024px) {
  .cp-mission {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    gap: 1.5rem;
    align-items: start;
  }
}
@media (max-width: 1023px) {
  .cp-memo { margin-top: 1.25rem; }
}

.hero {
  --title-fs: 2.6rem;
  --emblem-fs: 3rem; /* the faction page's title size: the same emblem as there */
  padding: 1rem 0 0;
}
/* The emblem beside the name, and the box's name under the faction's, not under the emblem: the
   emblem spans both lines and is centred on the pair, so it needs none of the lift and spill it
   takes beside a lone title (FactionEmblem's in-title). */
.hero.with-emblem {
  /* The emblem's top where the faction page's is: there it rises 0.3em above the title's line
     into this padding (FactionEmblem's in-title lift and margin); here it heads the block. */
  padding-top: calc(1rem - 0.3 * var(--emblem-fs));
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: calc(var(--title-fs) * 0.25);
  align-items: center;
}
.with-emblem .hero-title,
.with-emblem .hero-subtitle { grid-column: 2; }
.with-emblem .hero-emblem { grid-row: 1 / 3; top: 0; margin: 0; font-size: var(--emblem-fs); }

/* The faction page's spacing (FactionLayout): the tabs sit just under the name, and the open tab's
   content hangs from it 0.6rem down. The hero's own accent rule went with the tabs — their strip is
   that line now, and two of them read as a frame around nothing (2026-09-28). */
.cp-tabs {
  margin-top: 0.7rem;
  margin-bottom: 0.6rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: var(--title-fs);
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1;
}

.hero-subtitle {
  font-size: 0.95rem;
  line-height: 1.2;
  color: var(--text-muted);
  font-style: italic;
}

.det-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.9rem;
}

.det-meta-item {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--text-muted);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px solid var(--border);
  padding: 2px 7px;
}

.faction-flavor {
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.strat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  align-items: start;
}

.enh-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  align-items: start;
}

.enh-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  padding: 0.9rem 1.1rem 1rem;
}

.enh-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.enh-heading {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.enh-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

.enh-name-ru {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  opacity: 0.8;
  line-height: 1.15;
}

.enh-tags {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  /* Always its own full-width row under the name (not just on narrow screens) — the badges
     fighting the name for space on one shared row squeezes/wraps the name awkwardly even in a
     fixed-width card column on wide screens, not just on phones. */
  width: 100%;
  justify-content: flex-start;
}

.enh-tag {
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent-ink);
  border: 1px solid var(--accent);
  padding: 1px 5px;
  white-space: nowrap;
}

.enh-body {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-primary);
}

.enh-body :deep(ul),
.enh-body :deep(ol) {
  margin: 0.35rem 0 0;
  padding-left: 1.2rem;
}

.enh-body :deep(li) {
  margin-bottom: 0.2rem;
}

.ds-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

/* Name plate above each unit's card — same visual language as the normal faction datasheet
   page (FactionDatasheetView.vue's .ds-head/.ds-title), simplified: no favorite/lore/image
   actions (this page has no per-unit route, favorites, or lore text to hang them off). */
.ds-head {
  padding: 0.5rem 1rem 0.45rem;
  background: var(--accent);
}
.ds-title {
  /* The title size is the NAME's, not the heading's: the heading's own size is the base size's, so a
     line holding only a wrapped "(⌀90mm)" is as tall as that text and sits right under the name.
     With the heading at the title's size, that line kept a whole title-row of air (owner,
     2026-09-25); the name's own lines are unchanged. */
  font-size: 0.85rem;
  font-family: var(--font-display);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: #fff;
  margin: 0;
}
.ds-title-name { font-size: 1.7rem; }
/* Tight lines on both: the name's own rows sit close (display caps have no descenders to make
   room for), and a wrapped base size hugs the row above it. */
.ds-title, .ds-title-name { line-height: 1.05; }
/* How many such units the box holds — two Termagant units, two Vigilant Squads (appdata files
   each as its own datasheet; this page draws the card once). */
.ds-title-count {
  margin-left: 0.45rem;
  color: var(--accent-ink);
  font-variant-numeric: tabular-nums;
}
.ds-title-base {
  margin-left: 0.45rem;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  white-space: nowrap;
  /* Full white: at 82% it read 4.07:1 on Orks' green plate (a11y gate, 2026-10-05). */
  color: #fff;
}

.cp-empty {
  color: var(--text-muted);
  font-size: 1rem;
  text-align: center;
  padding: 2rem 0;
}

@media (max-width: 640px) {
  .hero { --title-fs: 2rem; --emblem-fs: 2.2rem; }
}

/* Very narrow phones (≤480px): bleed the unit name plate to the true viewport edge and
   square its top corners, matching DatasheetCard's own .ds-card full-bleed breakpoint right
   below it (see DatasheetCard.vue / FactionDatasheetView.vue's .ds-head for the same trick)
   — the two read as one flush, edge-to-edge header instead of a floating card. */
@media (max-width: 480px) {
  .ds-head {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    padding: 0.5rem 0.4rem 0.45rem;
  }
}

/* ── Per-faction accent (--fa-light / --fa-dark set inline from factionsIndex.js) ──
   Same mechanism as FactionLayout.vue's .faction-view.themed: prefers-color-scheme is the
   default signal, an explicit :root[data-theme] wins in both directions (see the unscoped
   block below). --link-accent is re-declared locally since :root's is var(--accent) and
   would otherwise inherit the already-computed app-wide red. */
.cp-faction-view.themed {
  --accent: var(--fa-light);
  --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black);
  --accent-ink: color-mix(in srgb, var(--fa-light) 85%, black);
  --accent-ink-hover: color-mix(in srgb, var(--fa-light) 70%, black);
  --link-accent: var(--accent-ink);
  --link-accent-hover: var(--accent-ink-hover);
}
@media (prefers-color-scheme: dark) {
  .cp-faction-view.themed {
    --accent: var(--fa-dark);
    --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white);
    --accent-ink: var(--fa-dark);
    --accent-ink-hover: color-mix(in srgb, var(--fa-dark) 80%, white);
    --link-accent: #e8c96a;
    --link-accent-hover: #f0d98a;
  }
}
</style>

<!-- Unscoped on purpose: an explicit data-theme on :root must win over the prefers-color-scheme
     fallback above in BOTH directions. Written without :global() because Vue's scoped compiler
     mishandles a descendant after it (see FactionLayout.vue for the same note); the
     .cp-faction-view.themed class keeps these rules from touching anything else. -->
<style>
:root[data-theme='light'] .cp-faction-view.themed {
  --accent: var(--fa-light);
  --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black);
  --accent-ink: color-mix(in srgb, var(--fa-light) 85%, black);
  --accent-ink-hover: color-mix(in srgb, var(--fa-light) 70%, black);
  --link-accent: var(--accent-ink);
  --link-accent-hover: var(--accent-ink-hover);
}

:root[data-theme='dark'] .cp-faction-view.themed {
  --accent: var(--fa-dark);
  --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white);
  --accent-ink: var(--fa-dark);
  --accent-ink-hover: color-mix(in srgb, var(--fa-dark) 80%, white);
  --link-accent: #e8c96a;
  --link-accent-hover: #f0d98a;
}
</style>
