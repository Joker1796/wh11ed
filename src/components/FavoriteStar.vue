<template>
  <button
    type="button"
    class="fav-star"
    :class="{ on: pinned }"
    :aria-label="pinned ? labels.favUnpin : labels.favPin"
    :aria-pressed="pinned"
    :title="pinned ? labels.favUnpin : labels.favPin"
    @click.stop.prevent="$emit('toggle')"
  >
    <i class="bi" :class="pinned ? 'bi-pin-angle-fill' : 'bi-pin-angle'"></i>
  </button>
</template>

<script setup>
// Small star toggle for pinning a row to the top of a picker (see useFavorites). Lives inside
// clickable rows (RouterLinks / select buttons), so the click is stopped + prevented so it
// toggles the pin without navigating or selecting the row.
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

defineProps({ pinned: Boolean })
defineEmits(['toggle'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.fav-star {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.9rem;
  height: 1.9rem;
  margin: -0.4rem -0.2rem -0.4rem 0;
  padding: 0;
  border: none;
  background: none;
  color: var(--text-dim);
  opacity: 0.55;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.15s, background 0.15s;
}
.fav-star:hover { opacity: 1; background: var(--bg-tertiary, rgba(128, 128, 128, 0.12)); }
.fav-star.on { opacity: 1; }
</style>
