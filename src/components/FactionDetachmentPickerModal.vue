<template>
  <BaseModal
    :title="title || labels.factionDetachments"
    max-width="480px"
    @close="$emit('close')"
  >
    <!-- `modal-body` is not cosmetic: it carries the global `overscroll-behavior: contain`
         (style.css) that keeps a scroll at the list's end from chaining to the page behind.
         There is deliberately no body scroll-lock, so this class is what contains it. -->
    <div class="modal-body modal-list">
      <DetachmentOption
        v-for="d in detachments"
        :key="d.id"
        :name="d.name"
        :name-ru="d.nameRu || ''"
        :force-disposition="d.forceDisposition || ''"
        :unique="d.unique || ''"
        :tag="d.tag || ''"
        :dp="d.dp || 0"
        :on="d.id === activeId"
        @click="$emit('pick', d.id)"
      />
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import DetachmentOption from './DetachmentOption.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

// Also reused as a generic option picker (e.g. the Chapter picker in
// FactionPickerBar) — pass plain { id, name } items and a `title`; the
// detachment-only fields (nameRu / dp / unique / forceDisposition) simply don't render. An optional
// `tag` renders as a quiet corner keyword (the chapter lock on SM detachments).
defineProps({
  detachments: { type: Array, required: true },
  activeId: { type: String, default: null },
  title: { type: String, default: null },
})
defineEmits(['pick', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
/* Narrow phones: BaseModal itself goes edge-to-edge (bottom sheet) at this breakpoint,
   so shrink the body's own gutter too — cards get closer to the full screen width
   instead of being inset by a fixed 0.75rem regardless of how little room there is. */
@media (max-width: 560px) {
  .modal-body {
    padding: 0.5rem 0.4rem;
  }
}
</style>
