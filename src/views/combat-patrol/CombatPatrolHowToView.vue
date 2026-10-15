<template>
  <div class="cp-howto-view">
    <div class="hero">
      <h1 class="hero-title">
        {{ labels.cpHowToPlayTitle }}
      </h1>
      <div class="hero-subtitle">
        {{ labels.cpHowToPlayLead }}
      </div>
    </div>

    <!-- Laid out as the Event Companion's mission sequence, the same kind of page for the full
         game: a chapter heading, numbered steps two to a row from 1024px (.rule-columns,
         blockColumnChunks.js), the maps under a heading of their own across the full width. -->
    <h2 class="chapter-heading">
      {{ intro.title }}
    </h2>
    <!-- GW's welcome to Combat Patrol, as the Event Companion opens its own sequence: plain lead
         text, two columns from 1024px so a line stays readable. It was lore (serif italic, muted,
         the page's full width — ~150 characters a line) and did not read (owner, 2026-10-15). -->
    <div class="rule-columns cp-intro">
      <p
        v-for="(para, n) in introParagraphs"
        :key="n"
        class="lead"
      >
        {{ para }}
      </p>
    </div>

    <template
      v-for="grp in stepChunks"
      :key="grp.key"
    >
      <div
        v-if="grp.type === 'columns'"
        class="rule-columns"
      >
        <RuleBlock
          v-for="s in grp.items"
          :id="`cp-step-${s.id}`"
          :key="s.id"
          :title="s.title"
          :body="s.body"
        />
      </div>
      <RuleBlock
        v-else
        :id="`cp-step-${grp.item.id}`"
        :title="grp.item.title"
        :body="grp.item.body"
      />
    </template>

    <h2
      id="cp-layouts"
      class="chapter-heading cp-maps-heading"
    >
      {{ labels.cpLayoutsTitle }}
    </h2>
    <div
      class="tabs"
      role="tablist"
      :aria-label="labels.cpLayoutsTitle"
    >
      <button
        v-for="l in layouts"
        :key="l.id"
        type="button"
        role="tab"
        class="tab"
        :class="{ active: layout === l.id }"
        :aria-selected="layout === l.id"
        @click="layout = l.id"
      >
        Layout {{ l.id }}
      </button>
    </div>
    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        :key="layout"
        class="cp-layout-img"
      >
        <AppImage
          :src="layoutImage"
          :alt="`Combat Patrol — Layout ${layout}`"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import RuleBlock from '../../components/RuleBlock.vue'
import AppImage from '../../components/AppImage.vue'
import { cpSequence, cpLayouts } from '../../data/combatPatrolMissions.js'
import { chunkBlocks } from '../../composables/blockColumnChunks.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// appdata's first "step" is the section itself — its title and GW's welcome; the rest are the
// eleven steps of a game, numbered as the Event Companion numbers its own ("3 · Determine …").
const sequence = computed(() => cpSequence(locale.value))
const intro = computed(() => sequence.value[0])
const introParagraphs = computed(() => intro.value.body.split('\n\n'))
const steps = computed(() => sequence.value.slice(1).map((s, i) => ({ ...s, title: `${i + 1} · ${s.title}` })))
const stepChunks = computed(() => chunkBlocks(steps.value))

const layouts = cpLayouts
const layout = ref('A')
const layoutImage = computed(() => layouts.find((l) => l.id === layout.value)?.image)
</script>

<style scoped>
.cp-howto-view {
  padding-top: 0.5rem;
}

/* The index page's hero (CombatPatrolIndexView): this page is its companion. */
.hero {
  text-align: center;
  padding: 1rem 0 0.6rem;
  margin-bottom: 1.4rem;
}
.hero-title {
  font-family: var(--font-display);
  font-size: 2.6rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}
.hero-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  max-width: 40rem;
  margin: 0 auto;
}

.cp-intro {
  /* The space under it keeps the welcome apart from step 1, which otherwise read as its sixth
     paragraph. */
  margin: 0.6rem 0 1.25rem;
}
/* Paragraph rhythm, not a lead's closing gap: the steps' own heading follows the last one. */
.cp-intro .lead {
  margin-bottom: 0.8rem;
}

/* The maps are a chapter of their own, after the steps — the space above sets it apart. */
.cp-maps-heading {
  margin-top: 2rem;
  scroll-margin-top: var(--header-total);
}
.tabs {
  margin: 0.75rem 0 0.6rem;
}
.cp-layout-img {
  max-width: 34rem;
}
/* AppImage puts its attributes on the <img> inside a display:contents <picture>, out of this
   component's scope — so the width is set on the wrapper and reached through it. */
.cp-layout-img :deep(img) {
  display: block;
  width: 100%;
}
</style>
