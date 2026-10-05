<template>
  <div class="modal-list">
    <template
      v-for="(d, i) in detachments"
      :key="d.id"
    >
      <DetachmentGroupHead
        v-if="d.from && d.from !== detachments[i - 1]?.from"
        :from="d.from"
      />
      <DetachmentOption
        :name="d.name"
        :name-ru="d.nameRu || ''"
        :force-dispositions="d.forceDispositions || []"
        :unique="d.unique || ''"
        :tag="d.tag || ''"
        :dp="d.dp || 0"
        :on="d.id === activeId"
        :compact="compact"
        @click="$emit('pick', d.id)"
      />
    </template>
  </div>
</template>

<script setup>
import DetachmentGroupHead from './DetachmentGroupHead.vue'
import DetachmentOption from './DetachmentOption.vue'

// A single-pick list of detachments — or of anything else with an `id` and a `name` (the Chapter
// picker in FactionPickerBar passes plain items; the detachment-only fields simply don't render).
// An optional `tag` renders as a quiet corner keyword (the chapter lock on SM detachments). Drawn
// inside an AdaptivePicker: in its modal on a phone, compact in its dropdown on a wide screen.
// Another faction's detachments (`from`) come last, under a DetachmentGroupHead.
defineProps({
  detachments: { type: Array, required: true },
  activeId: { type: String, default: null },
  compact: { type: Boolean, default: false },
})
defineEmits(['pick'])
</script>

