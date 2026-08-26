<template>
  <!-- Wider than a typical dialog on purpose: the tree now goes one level past the
       chapter/section list (NN.MM rule subsections — see CoreRulesToc's `modal` variant),
       and it needs the room to lay that out in several columns instead of one long list. -->
  <BaseModal :title="labels.contentsHeading" max-width="58rem" @close="$emit('close')">
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
