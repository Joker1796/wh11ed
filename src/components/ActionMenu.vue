<template>
  <AdaptivePicker
    v-model:open="open"
    class="am"
    :title="title"
    :subtitle="subtitle"
    dense
    align="right"
    :panel-width="width"
    modal-width="340px"
  >
    <template #trigger="t">
      <slot
        name="trigger"
        v-bind="t"
      />
    </template>
    <template #default="{ compact, bodyClass, close }">
      <!-- `#body` replaces the list for a menu that is sometimes something else — the unit's
           "name this block" form, or a faction accent scope the modal needs around it. -->
      <div :class="bodyClass">
        <slot
          name="body"
          :compact="compact"
          :close="close"
        >
          <div
            class="act-list"
            :class="{ 'act-compact': compact }"
          >
            <slot :close="close" />
          </div>
        </slot>
      </div>
    </template>
  </AdaptivePicker>
</template>

<script setup>
// The "…" a card or a header opens: a short list of things to do with it. A dropdown under the
// button on a wide screen — a modal across a desktop for four buttons read as a detour (owner,
// 2026-10-01) — and the sheet it always was on a phone, where a thumb wants the big rows. The
// rows are `.act-btn`s either way; a destructive one still asks through ConfirmModal.
import AdaptivePicker from './AdaptivePicker.vue'

defineProps({
  // The modal's title on a phone (the list's or the unit's name); the dropdown's aria-label.
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  width: { type: String, default: '15rem' },
})
const open = defineModel('open', { type: Boolean, default: false })
</script>

<style scoped>
.am { flex: none; }
/* A trigger that fills its row's height (the secondary deck's ⋯) can: the wrapper passes it on. */
.am :deep(.pd) { flex: 1; }
</style>
