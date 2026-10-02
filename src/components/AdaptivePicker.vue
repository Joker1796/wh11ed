<template>
  <!-- One root either way, so a parent's class and layout land on it in both shapes. -->
  <div class="ap">
    <PickerDropdown
      v-if="wide"
      v-model:open="open"
      :width="panelWidth"
      :align="align"
      :label="title"
    >
      <template #trigger="t">
        <slot
          name="trigger"
          v-bind="t"
        />
      </template>
      <slot v-bind="{ compact: true, bodyClass: '', close }" />
    </PickerDropdown>
    <template v-else>
      <slot
        name="trigger"
        :open="open"
        :toggle="() => (open = !open)"
      />
      <BaseModal
        v-if="open"
        :title="title"
        :subtitle="subtitle"
        :max-width="modalWidth"
        :dense="dense"
        @close="close"
      >
        <template
          v-if="$slots.aside"
          #aside
        >
          <slot name="aside" />
        </template>
        <slot v-bind="{ compact: false, bodyClass: 'modal-body', close }" />
      </BaseModal>
    </template>
  </div>
</template>

<script setup>
// One picker, two shapes: a dropdown under its trigger where the screen is wide, the modal it always
// was where it is not (owner, 2026-10-01 — "reuse it wherever it fits"). The list inside is the same
// component either way; the slot hands it `compact` (the dropdown's low rows) and `bodyClass`
// (`modal-body` in the modal — BaseModal needs its scroll container as the direct child, see
// src/components/CLAUDE.md "Modals"). The parent owns `open` (v-model:open): a single pick calls
// `close`, a multi-pick leaves it open.
import { useMediaQuery } from '../composables/useMediaQuery.js'
import PickerDropdown from './PickerDropdown.vue'
import BaseModal from './BaseModal.vue'

defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  panelWidth: { type: String, default: '26rem' },
  modalWidth: { type: String, default: '480px' },
  // The last control on a line opens leftwards, or its panel leaves the screen.
  align: { type: String, default: 'left' },
  // BaseModal's compact header, for a modal titled by a name that may wrap (the action menus).
  dense: { type: Boolean, default: false },
})
const open = defineModel('open', { type: Boolean, default: false })
const close = () => { open.value = false }
// The width every "wide" layout of the app switches at (App.vue's roster browse, LayoutPickerModal).
const wide = useMediaQuery('(min-width: 901px)')
</script>

<style scoped>
.ap { display: flex; flex-direction: column; min-width: 0; }
.ap > :deep(.pd) { display: flex; }
</style>
