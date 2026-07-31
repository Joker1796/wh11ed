<template>
  <BaseModal :title="labels.contentsHeading" max-width="46rem" @close="$emit('close')">
    <!-- `modal-body` is not cosmetic: it carries the global `overscroll-behavior: contain`
         that keeps a scroll past the end of the list from chaining to the page behind. -->
    <div class="modal-body">
      <EventCompanionToc
        variant="modal"
        :active-id="activeId"
        @select="(id) => $emit('select', id)"
      />
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import EventCompanionToc from './EventCompanionToc.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({ activeId: { type: String, default: null } })
defineEmits(['close', 'select'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.modal-body {
  padding: 0.6rem 0.9rem 0.9rem;
  overflow-y: auto;
}
</style>
