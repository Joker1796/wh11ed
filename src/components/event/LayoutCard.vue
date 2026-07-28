<template>
  <figure class="layout-card">
    <button
      type="button"
      class="layout-img-btn"
      :aria-label="labels.eventLayoutViewFull"
      @click="showFull = true"
    >
      <AppImage :src="imageSrc" :alt="`Layout ${layout.id}`" class="layout-img" />
      <span class="expand-hint"><i class="bi bi-arrows-fullscreen"></i></span>
    </button>
    <figcaption class="layout-caption">
      <span class="layout-badge">{{ labels.eventLayout }} {{ layout.id }}</span>
    </figcaption>
  </figure>

  <BaseModal
    v-if="showFull"
    :title="`${labels.eventLayout} ${layout.id}`"
    max-width="min(96vw, 900px)"
    max-height="94vh"
    :z-index="410"
    @close="showFull = false"
  >
    <div class="modal-body layout-modal-body">
      <AppImage :src="imageSrc" :alt="`Layout ${layout.id}`" class="layout-img-full" />
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppImage from '../AppImage.vue'
import BaseModal from '../BaseModal.vue'
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

const showFull = ref(false)
</script>

<style scoped>
.layout-card {
  margin: 0;
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  background: var(--bg-card);
}

.layout-img-btn {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: zoom-in;
}
.layout-card :deep(.layout-img) {
  display: block;
  width: 100%;
  height: auto;
}

.expand-hint {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 0.95rem;
  opacity: 0.85;
  transition: opacity 0.15s;
}
.layout-img-btn:hover .expand-hint,
.layout-img-btn:focus-visible .expand-hint {
  opacity: 1;
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

.layout-modal-body {
  padding: 0;
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background: var(--bg-secondary);
}
.layout-modal-body :deep(.layout-img-full) {
  display: block;
  max-width: 100%;
  max-height: calc(94vh - 60px);
  width: auto;
  height: auto;
}
</style>
