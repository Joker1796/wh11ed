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

    <!-- The twelve steps of the mission sequence, as GW's app prints them (appdata); the three
         deployment maps hang off the step that rolls for one. -->
    <section
      v-for="s in sequence"
      :key="s.id"
      class="fsection"
    >
      <RuleBlock
        :id="`cp-step-${s.id}`"
        :title="s.title"
        :body="s.body"
      />
      <div
        v-if="s.id === 'determine-deployment'"
        id="cp-layouts"
        class="cp-layouts"
      >
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
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import RuleBlock from '../../components/RuleBlock.vue'
import AppImage from '../../components/AppImage.vue'
import { cpSequence, cpLayouts } from '../../data/combatPatrolMissions.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const sequence = computed(() => cpSequence(locale.value))
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
  border-bottom: 2px solid var(--accent);
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

/* The steps follow one another like the rules of a Core Rules chapter: RuleBlock's own padding is
   the gap between them, and the section's margin on top of it doubled it (owner, 2026-10-15). */
.cp-howto-view > .fsection {
  margin-bottom: 0;
}

.cp-layouts {
  margin-top: 0.6rem;
}
.cp-layouts .tabs {
  margin-bottom: 0.6rem;
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
