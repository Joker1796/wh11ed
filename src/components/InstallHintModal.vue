<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal" role="dialog" aria-modal="true">
      <header class="modal-head">
        <h3 class="mh-title">{{ labels.installIosTitle }}</h3>
        <button class="mh-close" @click="$emit('close')" :aria-label="labels.modalClose">✕</button>
      </header>

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
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const emit = defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

function onKey(e) { if (e.key === 'Escape') emit('close') }
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 410;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.modal {
  width: 100%;
  max-width: 380px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.8rem 0.9rem;
  border-bottom: 1px solid var(--border);
}
.mh-title { font-family: var(--font-serif); font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.mh-close {
  background: none; border: none; color: var(--text-muted);
  font-size: 1.1rem; cursor: pointer; min-width: 36px; min-height: 36px; border-radius: 4px;
}
.mh-close:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }
.modal-body { padding: 0.9rem; overflow-y: auto; }

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
  border-radius: 4px;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
}
.ih-note { margin: 0; font-size: 0.78rem; line-height: 1.45; color: var(--text-muted); }
</style>
