<template>
  <div class="beta-banner">
    <i class="bi bi-info-circle-fill"></i>
    <span>{{ labels.trackerBeta }} <a :href="'mailto:' + email">{{ email }}</a></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const email = 'yas-shaman@yandex.ru'
</script>

<style scoped>
.beta-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.55rem 0.9rem;
  background: #c9a227;
  color: #2a2014;
  border-radius: 5px;
  font-size: 0.82rem;
  font-weight: 600;
  text-align: center;
}
.beta-banner i { font-size: 0.95rem; }
.beta-banner a { color: #2a2014; text-decoration: underline; font-weight: 700; }
</style>
