<template>
  <BaseModal :title="title" max-width="420px" :z-index="410" @close="$emit('close')">
    <div class="modal-body">
      <p v-for="(p, i) in paragraphs" :key="i" class="oh-text">{{ p }}</p>
    </div>
  </BaseModal>
</template>

<script setup>
// One dialog for every "what does this setting do?" — the settings themselves come from a table
// (src/data/trackerOptions.js), so their explanations get one component rather than one component
// each. Prose only; a setting whose answer is a table (Battle Points) keeps its own modal.
// z-index 410 because it also opens from EditSetupModal, which is itself a modal.
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'

const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
})
defineEmits(['close'])

// A blank line in the string starts a new paragraph — the only markup these texts need.
const paragraphs = computed(() =>
  String(props.text).split('\n').map((s) => s.trim()).filter(Boolean),
)
</script>

<style scoped>
.oh-text { margin: 0 0 0.7rem; font-size: 0.85rem; line-height: 1.5; color: var(--text-muted); }
.oh-text:last-child { margin-bottom: 0; }
</style>
