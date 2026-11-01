<template>
  <button
    type="button"
    class="help-btn"
    data-press
    aria-haspopup="dialog"
    :aria-label="labels.campHelp"
    :title="labels.campHelp"
  >
    <i class="wi wi-help" />
  </button>
</template>

<script setup>
// The "?" beside a campaign setting or the campaign's header: opens its explanation (the parent's
// OptionHelpModal). The app's `.help-btn`, with the campaign's accessible name.
import { computed } from 'vue'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>
