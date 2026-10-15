<template>
  <div
    id="cp-layouts"
    class="cp-layouts"
  >
    <div
      class="tabs"
      role="tablist"
      :aria-label="labels.cpLayoutsTitle"
    >
      <button
        v-for="l in cpLayouts"
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
          :src="image"
          :alt="`Combat Patrol — Layout ${layout}`"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
// The three Combat Patrol deployment maps, A/B/C tabs over the picture — drawn inside the
// "Determine Deployment" step of the how-to-play page, under the D6 table that picks one.
import { ref, computed } from 'vue'
import AppImage from '../../components/AppImage.vue'
import { cpLayouts } from '../../data/combatPatrolMissions.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const layout = ref('A')
const image = computed(() => cpLayouts.find((l) => l.id === layout.value)?.image)
</script>

<style scoped>
.cp-layouts {
  margin-top: 0.75rem;
  scroll-margin-top: var(--header-total);
}
.tabs {
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
