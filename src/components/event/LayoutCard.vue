<template>
  <figure class="layout-card">
    <img :src="layout.image" :alt="`Layout ${layout.id}`" class="layout-img" />
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

.layout-img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 520px;
  object-fit: contain;
  background: var(--bg-secondary);
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
