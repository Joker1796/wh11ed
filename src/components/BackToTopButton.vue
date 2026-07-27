<template>
  <!-- Desktop-only back-to-top FAB for the long reading pages (Core Rules). Appears once the
       page is scrolled down; shares the global .fab-btn look/animation with the faction FABs.
       Hidden ≤900px, where the fixed bottom nav owns the bottom-right corner. -->
  <Transition name="fab">
    <button
      v-if="visible"
      type="button"
      class="fab-btn back-to-top"
      :title="labels.backToTop"
      :aria-label="labels.backToTop"
      @click="scrollToTop"
    >
      <i class="bi bi-arrow-up"></i>
    </button>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useBackToTop } from '../composables/useBackToTop.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { visible, scrollToTop } = useBackToTop()
</script>

<style scoped>
.back-to-top {
  display: none;
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 195; /* same tier as MobileUtilityBar / the faction FABs */
}

@media (min-width: 901px) {
  .back-to-top { display: flex; }
}
</style>
