<template>
  <figure class="layout-card">
    <div class="layout-stack">
      <img
        v-if="!isPlaceholder"
        class="edge-marker"
        src="/images/event/marker-attacker.png"
        alt="Attacker's battlefield edge"
      />
      <img :src="layout.image" :alt="`Layout ${layout.id}`" class="layout-img" />
      <img
        v-if="!isPlaceholder"
        class="edge-marker"
        src="/images/event/marker-defender.png"
        alt="Defender's battlefield edge"
      />
    </div>
    <figcaption class="layout-caption">
      <span class="layout-badge">{{ labels.eventLayout }} {{ layout.id }}</span>
      <span v-if="isPlaceholder" class="layout-placeholder-note">{{ labels.eventLayoutPlaceholder }}</span>
    </figcaption>
  </figure>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({ layout: { type: Object, required: true } })

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const isPlaceholder = computed(() => props.layout.image.includes('plug'))
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
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-width: min(100%, 384px);
  margin: 0 auto;
  padding: 0.9rem 0.9rem 1rem;
}

.layout-img,
.edge-marker {
  display: block;
  width: 100%;
  height: auto;
}

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
  color: var(--accent);
}

.layout-placeholder-note {
  font-size: 0.75rem;
  color: var(--text-dim);
  font-style: italic;
}
</style>
