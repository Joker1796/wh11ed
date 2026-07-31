<template>
  <BaseModal :title="labels.contentsHeading" max-width="42rem" @close="$emit('close')">
    <!-- `modal-body` is not cosmetic: it carries the global `overscroll-behavior: contain`
         that keeps a scroll past the end of the list from chaining to the page behind. -->
    <div class="modal-body">
      <CoreRulesToc
        variant="modal"
        :active-id="activeId"
        @select="(id, filter) => $emit('select', id, filter)"
      />
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import CoreRulesToc from './CoreRulesToc.vue'
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
