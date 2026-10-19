<template>
  <BaseModal
    :title="title"
    max-width="420px"
    :z-index="410"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <!-- What the setting draws, drawn (help/*Demo.vue) — above the words that explain it. -->
      <slot name="demo" />
      <HelpText :text="text" />
      <RouterLink
        v-if="linkTo && linkLabel"
        class="oh-link"
        :to="linkTo"
        @click="$emit('close')"
      >
        {{ linkLabel }}
      </RouterLink>
    </div>
  </BaseModal>
</template>

<script setup>
// One dialog for every "what does this setting do?" — the settings themselves come from a table
// (src/data/trackerOptions.js), so their explanations get one component rather than one component
// each. Prose only; a setting whose answer is a table (Battle Points) keeps its own modal.
// z-index 410 because it also opens from EditSetupModal, which is itself a modal.
import { RouterLink } from 'vue-router'
import BaseModal from '../BaseModal.vue'
import HelpText from './HelpText.vue'

defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  // Optional "read the actual rule" link. The setup draft is persisted (useTracker), so
  // following it mid-setup costs nothing — the wizard is where it was on the way back.
  linkTo: { type: [String, Object], default: null },
  linkLabel: { type: String, default: '' },
})
defineEmits(['close'])
</script>

<style scoped>
.oh-link {
  display: inline-block;
  margin-top: 0.2rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-ink);
}
.oh-link:hover { text-decoration: underline; }
</style>
