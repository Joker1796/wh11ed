<template>
  <div v-if="faction" class="cp-faction-view">
    <div class="hero">
      <h1 class="hero-title">{{ faction.name }}</h1>
      <div class="hero-subtitle">{{ faction.boxName }}</div>
    </div>

    <!-- Detachment rule -->
    <section class="fsection" id="rule">
      <h2 class="fsection-title">{{ faction.rule.name }}</h2>
      <div v-if="faction.dp || faction.forceDisposition" class="det-meta">
        <span v-if="faction.dp" class="det-meta-item">{{ faction.dp }} DP</span>
        <span v-if="faction.forceDisposition" class="det-meta-item">{{ faction.forceDisposition }}</span>
      </div>
      <p v-if="faction.rule.flavor" class="faction-flavor">{{ faction.rule.flavor }}</p>
      <RuleBlock :title="faction.rule.name" :body="faction.rule.body" />
    </section>

    <!-- Army rule -->
    <section class="fsection" id="army-rule">
      <h2 class="fsection-title">{{ labels.factionArmyRule }}</h2>
      <p v-if="faction.armyRule.flavor" class="faction-flavor">{{ faction.armyRule.flavor }}</p>
      <RuleBlock :title="faction.armyRule.name" :body="faction.armyRule.body" :example="faction.armyRule.example" />
    </section>

    <!-- Stratagems -->
    <section v-if="faction.stratagems?.length" class="fsection" id="stratagems">
      <h2 class="fsection-title">{{ labels.factionStratagems }}</h2>
      <div class="strat-grid">
        <StratCard v-for="s in faction.stratagems" :key="s.name" :strat="s" :sublabel="s.sublabel" />
      </div>
    </section>

    <!-- Enhancements -->
    <section v-if="faction.enhancements?.length" class="fsection" id="enhancements">
      <h2 class="fsection-title">{{ labels.factionEnhancements }}</h2>
      <div class="enh-grid">
        <article v-for="e in faction.enhancements" :key="e.name" class="enh-card">
          <div class="enh-head">
            <span class="enh-name">{{ e.name }}</span>
            <span v-if="e.upgrade" class="enh-tag">Upgrade</span>
            <span v-if="e.isDefault" class="enh-tag enh-tag-default">{{ labels.cpDefaultEnh }}</span>
          </div>
          <p v-if="e.flavor" class="faction-flavor">{{ e.flavor }}</p>
          <div class="enh-body" v-html="renderRichText(e.body)"></div>
        </article>
      </div>
    </section>

    <!-- Datasheets -->
    <section v-if="faction.datasheets?.length" class="fsection" id="datasheets">
      <h2 class="fsection-title">{{ labels.factionDatasheets }}</h2>
      <div class="ds-list">
        <DatasheetCard v-for="ds in faction.datasheets" :key="ds.id" :sheet="ds" />
      </div>
    </section>
  </div>
  <div v-else class="cp-faction-view">
    <p class="cp-empty">{{ labels.factionsSoon }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import RuleBlock from '../../components/RuleBlock.vue'
import StratCard from '../../components/StratCard.vue'
import DatasheetCard from '../../components/DatasheetCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'

const route = useRoute()
const { locale } = useLocale()
const { renderRichText } = useRenderInline()
const labels = computed(() => ui[locale.value])

// combatPatrol.js carries every box's rule text + fixed-roster datasheets for all 24 factions —
// dynamically imported here (not statically) so it stays out of the app's root bundle; only a
// visit to a Combat Patrol page pulls it in, matching the project's other heavy-data-file loads.
const combatPatrol = ref(null)
watchEffect(async () => {
  combatPatrol.value = (await import('../../data/combatPatrol.js')).combatPatrol
})

const faction = computed(() =>
  combatPatrol.value?.[locale.value].factions.find((f) => f.slug === route.params.slug) || null,
)
</script>

<style scoped>
.cp-faction-view {
  padding-top: 0.5rem;
}

.hero {
  text-align: center;
  padding: 1rem 0 0.6rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1.4rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 2.6rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
}

.hero-subtitle {
  font-size: 0.95rem;
  color: var(--accent);
  font-style: italic;
}

.fsection {
  margin-bottom: 2.5rem;
  scroll-margin-top: var(--header-total);
}

.fsection-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
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
  border-radius: 3px;
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
  border-radius: 0 0 6px 6px;
  padding: 0.9rem 1.1rem 1rem;
}

.enh-head {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.enh-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

.enh-tag {
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 3px;
  padding: 1px 5px;
}

.enh-tag-default {
  margin-left: auto;
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

.cp-empty {
  color: var(--text-muted);
  font-size: 1rem;
  text-align: center;
  padding: 2rem 0;
}

@media (max-width: 640px) {
  .fsection-title { font-size: 1.6rem; }
  .hero-title { font-size: 2rem; }
}
</style>
