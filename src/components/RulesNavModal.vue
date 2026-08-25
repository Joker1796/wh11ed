<template>
  <BaseModal :title="labels.navRules" @close="$emit('close')">
    <div class="modal-body modal-list">
      <RouterLink
        v-for="s in t.sections"
        :key="s.key"
        :to="s.path"
        class="rule-link"
        @click="$emit('close')"
      >
        <span class="rule-name">{{ s.label }}</span>
        <span class="rule-desc">{{ s.desc }}</span>
      </RouterLink>
    </div>
  </BaseModal>
</template>

<script setup>
// Mobile bottom-nav modal for the "Rules" umbrella — Core Rules / Event Companion /
// Combat Patrol. Same data (rulesLanding.js) as the desktop /rules landing page and the
// navbar hover dropdown, so all three surfaces show identical labels/summaries.
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import { rulesLanding } from '../data/rulesLanding.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const t = computed(() => rulesLanding[locale.value])
</script>

<style scoped>
/* Roomier than the default list — these rows are cards, not one-liners. */
.modal-list { gap: 0.5rem; }

.rule-link {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.7rem 0.8rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  text-decoration: none;
  transition: border-color 0.15s;
}

.rule-link:hover {
  border-color: var(--accent);
  text-decoration: none;
}

.rule-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-primary);
}

.rule-desc {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.4;
}
</style>
