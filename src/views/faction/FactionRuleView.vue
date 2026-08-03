<template>
  <FactionLayout>
    <!-- `faction` resolves asynchronously (its EN chunk is lazy-loaded per slug), so
         everything below must wait for it rather than dereference a null. -->
    <template v-if="faction">
      <!-- Army rule -->
      <section class="fsection" id="army-rule">
        <h2 class="fsection-title">{{ labels.factionArmyRule }}</h2>
        <p v-if="faction.armyRule.flavor" class="faction-flavor">{{ faction.armyRule.flavor }}</p>
        <RuleBlock
          :id="faction.armyRule.id"
          :title="faction.armyRule.name"
          :subtitle="faction.armyRule.nameRu"
          :body="faction.armyRule.body"
          :example="faction.armyRule.example"
        />
      </section>

      <!-- Chapter + detachment picker (global army choice, shared with the datasheets page) -->
      <FactionPickerBar
        v-if="detachments.length > 1"
        class="fsection"
        :slug="slug"
        :detachments="detachments"
        :chapters="faction.chapters || []"
      />

      <section v-if="det" class="fsection" :id="det.id" :key="det.id">
        <h2 class="fsection-title">{{ det.name }}</h2>
        <div v-if="det.nameRu" class="fsection-title-ru">{{ det.nameRu }}</div>

        <div v-if="det.dp || det.forceDisposition || det.unique" class="det-meta">
          <span v-if="det.dp" class="det-meta-item">{{ det.dp }} DP</span>
          <span v-if="det.forceDisposition" class="det-meta-item">{{ det.forceDisposition }}</span>
          <span v-if="det.unique" class="det-meta-item det-meta-unique">Unique: {{ det.unique }}</span>
        </div>

        <p v-if="det.rule.flavor" class="faction-flavor">{{ det.rule.flavor }}</p>
        <RuleBlock :id="`${det.id}-rule`" :title="det.rule.name" :subtitle="det.rule.nameRu" :body="det.rule.body" />

        <!-- Stratagems -->
        <template v-if="det.stratagems && det.stratagems.length">
          <h3 class="fsub-title" id="stratagems">{{ labels.factionStratagems }}</h3>
          <div class="strat-grid">
            <StratCard
              v-for="s in det.stratagems"
              :key="s.name"
              :id="`strat-${det.id}-${slugify(s.name)}`"
              :strat="s"
              :sublabel="s.sublabel"
            />
          </div>
        </template>

        <!-- Enhancements -->
        <h3 class="fsub-title" id="enhancements">{{ labels.factionEnhancements }}</h3>
        <div class="enh-grid">
          <article v-for="e in det.enhancements" :key="e.name" :id="`enh-${det.id}-${slugify(e.name)}`" class="enh-card">
            <div class="enh-head">
              <div class="enh-heading">
                <span class="enh-name">{{ e.name }}</span>
                <span v-if="e.nameRu" class="enh-name-ru">{{ e.nameRu }}</span>
              </div>
              <span v-if="e.aura" class="enh-tag">{{ labels.factionAura }}</span>
              <span v-if="e.upgrade" class="enh-tag">Upgrade</span>
              <span v-if="e.points != null" class="enh-pts">{{ e.points }} pts</span>
            </div>
            <p v-if="e.flavor" class="faction-flavor">{{ e.flavor }}</p>
            <div class="enh-body" v-html="renderRichText(e.body)"></div>
            <div v-if="e.note" class="enh-note" v-html="renderInline(e.note)"></div>
          </article>
        </div>
      </section>
    </template>
  </FactionLayout>
</template>

<script setup>
import { computed } from 'vue'
import FactionLayout from '../../components/FactionLayout.vue'
import RuleBlock from '../../components/RuleBlock.vue'
import StratCard from '../../components/StratCard.vue'
import FactionPickerBar from '../../components/FactionPickerBar.vue'
import { useFactionPage } from '../../composables/useFactionPage.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { useFactionChoice } from '../../composables/useFactionChoice.js'
import { slugify } from '../../data/slugify.js'

const { slug, faction } = useFactionPage()
const { locale } = useLocale()
const { renderInline, renderRichText } = useRenderInline()
const labels = computed(() => ui[locale.value])

// Detachments: support the multi-detachment `detachments[]` shape, falling back to the
// legacy single `detachment` object. FactionPickerBar selects the active one; the pick
// (and, for Space Marines, the chapter) is persisted per faction by useFactionChoice.
const detachments = computed(() => {
  const f = faction.value
  if (!f) return []
  if (Array.isArray(f.detachments)) return f.detachments
  return f.detachment ? [f.detachment] : []
})

const { activeDetachment } = useFactionChoice()
const det = computed(() => activeDetachment(slug.value, detachments.value))
</script>

<style scoped>
.fsection {
  margin-bottom: 2.5rem;
  scroll-margin-top: var(--header-total);
}

/* Detachment meta (DP / disposition / unique) */
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

.det-meta-unique {
  color: var(--accent);
  border-color: var(--accent);
}

.fsection-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
}

/* RU translation of the detachment name — small muted line tucked under the heading */
.fsection-title-ru {
  margin-top: -0.9rem;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-muted);
  opacity: 0.8;
}

.fsub-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-primary);
  margin: 1.8rem 0 0.9rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--border);
  scroll-margin-top: var(--header-total);
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

/* RU translation of the enhancement name — small muted line under the English name */
.enh-name-ru {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  opacity: 0.8;
  line-height: 1.15;
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

.enh-pts {
  margin-left: auto;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
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

.enh-note {
  margin-top: 0.6rem;
  padding: 0.5rem 0.7rem;
  background: color-mix(in srgb, var(--accent) 7%, transparent);
  border-left: 3px solid var(--accent);
  border-radius: 0 4px 4px 0;
  font-size: 0.82rem;
  font-style: italic;
  line-height: 1.45;
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .fsection-title { font-size: 1.6rem; }
}
</style>
