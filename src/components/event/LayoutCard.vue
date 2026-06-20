<template>
  <figure class="layout-card">
    <div class="layout-stack" :class="orient === 'v' ? 'is-vertical' : 'is-horizontal'">
      <span class="edge-marker em-attacker">
        <img :src="attackerSrc" alt="Attacker's battlefield edge" />
      </span>
      <AppImage :src="layout.image" :alt="`Layout ${layout.id}`" class="layout-img" />
      <span class="edge-marker em-defender">
        <img :src="defenderSrc" alt="Defender's battlefield edge" />
      </span>
    </div>
    <figcaption class="layout-caption">
      <span class="layout-badge">{{ labels.eventLayout }} {{ layout.id }}</span>
    </figcaption>
  </figure>
</template>

<script setup>
import { computed } from 'vue'
import AppImage from '../AppImage.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({ layout: { type: Object, required: true } })

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Which battlefield edges the attacker/defender markers sit on, read from the source
// PDF (see layoutEdges in eventCompanion.js): 'h' = attacker top / defender bottom
// (horizontal bars); 'v' = attacker left / defender right (vertical bars).
const orient = computed(() => (props.layout?.edge === 'v' ? 'v' : 'h'))
const attackerSrc = computed(() =>
  orient.value === 'v' ? '/images/event/marker-attacker-v.webp' : '/images/event/marker-attacker.webp'
)
const defenderSrc = computed(() =>
  orient.value === 'v' ? '/images/event/marker-defender-v.webp' : '/images/event/marker-defender.webp'
)
</script>

<style scoped>
.layout-card {
  margin: 0;
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  background: var(--bg-card);
}

/* Constrain the stack to the table's display width (table aspect ≈ 0.737, so at a
   ~520px tall table the width is ~384px) so the full-width edge markers line up
   exactly with the table's left/right edges. */
.layout-stack {
  max-width: min(100%, 384px);
  margin: 0 auto;
  /* Same padding in both orientations so the battlefield image keeps an identical
     footprint when switching A/B/C tabs — its size must not jump. The side gutters
     hold the vertical edge bars without eating into the image. */
  padding: 0.9rem 2.1rem 1rem;
}

/* Horizontal layouts — attacker bar on top, defender on the bottom (full width). */
.layout-stack.is-horizontal {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.layout-stack.is-horizontal :deep(.layout-img),
.layout-stack.is-horizontal .edge-marker {
  display: block;
  width: 100%;
  height: auto;
}
.layout-stack.is-horizontal .edge-marker img {
  display: block;
  width: 100%;
  height: auto;
}

/* Vertical layouts — attacker bar on the left, defender on the right (full height).
   The side bars are absolutely positioned so their height tracks the image height
   without distorting the line/emblem aspect. */
.layout-stack.is-vertical {
  position: relative;
  display: flex;
  justify-content: center;
}
.layout-stack.is-vertical :deep(.layout-img) {
  display: block;
  width: 100%;
  height: auto;
}
.layout-stack.is-vertical .edge-marker {
  position: absolute;
  top: 0.9rem;
  bottom: 1rem;
  display: block;
}
.layout-stack.is-vertical .edge-marker img {
  display: block;
  height: 100%;
  width: auto;
}
.layout-stack.is-vertical .em-attacker { left: 0.45rem; }
.layout-stack.is-vertical .em-defender { right: 0.45rem; }

.layout-caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.6rem 0.9rem;
  border-top: 1px solid var(--border);
}

.layout-badge {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--link-accent);
}
</style>
