<template>
  <figure class="layout-card">
    <AppImage :src="imageSrc" :alt="`Layout ${layout.id}`" class="layout-img" />
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

const props = defineProps({
  layout: { type: Object, required: true },
  showMeasurements: { type: Boolean, default: true },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// `imageClean` (no inch callouts) falls back to `image` for any layout that somehow
// lacks it, so the toggle never renders a blank card. Both variants already have the
// attacker's/defender's battlefield-edge markers baked in by the source app — no
// separate overlay bar needed (the old PDF crops didn't have them, hence the overlay).
const imageSrc = computed(() => (props.showMeasurements ? props.layout.image : (props.layout.imageClean || props.layout.image)))
</script>

<style scoped>
.layout-card {
  margin: 0;
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  background: var(--bg-card);
}

.layout-card :deep(.layout-img) {
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
  font-family: var(--font-display);
  font-size: 1.16rem;
  color: var(--link-accent);
}
</style>
