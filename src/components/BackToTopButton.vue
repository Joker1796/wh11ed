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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Show once the reader is roughly a screen down. rAF-throttled so the scroll handler never
// does layout work per event.
const visible = ref(false)
let ticking = false
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    visible.value = window.scrollY > 500
    ticking = false
  })
}

const scrollToTop = () => {
  // Honour prefers-reduced-motion (the app zeroes all CSS motion there, so a smooth JS
  // scroll would be the odd one out).
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.back-to-top {
  display: none;
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 195; /* same tier as ResumeGameButton / the faction FABs */
}

@media (min-width: 901px) {
  .back-to-top { display: flex; }
}
</style>
