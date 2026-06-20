<template>
  <div class="alpha-banner">
    <i class="bi bi-exclamation-triangle-fill"></i>
    <span>{{ labels.trackerAlpha }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.alpha-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.55rem 0.9rem;
  background: #b3201b;
  color: #fff;
  border-radius: 5px;
  font-size: 0.82rem;
  font-weight: 600;
  text-align: center;
}
.alpha-banner i { font-size: 0.95rem; }
</style>
