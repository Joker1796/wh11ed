<template>
  <div
    role="alert"
    class="local-data-blocked"
  >
    <p v-if="error">
      {{ locale === 'ru' ? 'Не удалось загрузить содержимое. Проверьте соединение.' : 'Could not load this content. Check your connection.' }}
    </p>
    <p v-else>
      {{ locale === 'ru' ? 'Загружаем…' : 'Loading…' }}
    </p>
    <button
      v-if="error"
      type="button"
      class="btn-primary"
      @click="reload"
    >
      {{ locale === 'ru' ? 'Повторить' : 'Try again' }}
    </button>
  </div>
</template>
<script setup>
import { useLocale } from '../composables/useLocale.js'
defineProps({ error: { type: Error, default: null } })
const { locale } = useLocale()
const reload = () => window.location.reload()
</script>
