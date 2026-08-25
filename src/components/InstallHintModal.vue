<template>
  <BaseModal :title="labels.installIosTitle" max-width="380px" :z-index="410" @close="$emit('close')">
      <div class="modal-body">
        <p class="ih-intro">{{ labels.installIosIntro }}</p>
        <ol class="ih-steps">
          <li>
            <span class="ih-share" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 16V4"/><path d="M8 8l4-4 4 4"/>
                <path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>
              </svg>
            </span>
            {{ labels.installIosStep1 }}
          </li>
          <li>{{ labels.installIosStep2 }}</li>
          <li>{{ labels.installIosStep3 }}</li>
        </ol>
        <p class="ih-note">{{ labels.installIosNote }}</p>
      </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>

.ih-intro { margin: 0 0 0.8rem; font-size: 0.88rem; line-height: 1.5; color: var(--text-primary); }
.ih-steps {
  margin: 0 0 0.8rem;
  padding-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--text-primary);
}
.ih-steps li { padding-left: 0.15rem; }
.ih-share {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.25rem;
  vertical-align: -0.4rem;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
}
.ih-note { margin: 0; font-size: 0.78rem; line-height: 1.45; color: var(--text-muted); }
</style>
