<template>
  <BaseModal max-width="720px" @close="$emit('close')">
    <template #header="{ close }">
      <header class="modal-head">
        <h3 class="dsm-title">{{ sheet.name }}</h3>
        <div class="dsm-actions">
          <button
            type="button"
            class="dsm-btn"
            :class="{ copied }"
            :title="copied ? labels.dsCopied : labels.dsCopyName"
            :aria-label="copied ? labels.dsCopied : labels.dsCopyName"
            @click="copyName"
          >
            <i :class="copied ? 'bi bi-check2' : 'bi bi-clipboard'"></i>
          </button>
          <a
            :href="imageUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="dsm-btn"
            :title="labels.dsSearchImage"
            :aria-label="labels.dsSearchImage"
          >
            <i class="bi bi-image"></i>
          </a>
          <button type="button" class="dsm-btn dsm-close" :aria-label="labels.modalClose" @click="close">✕</button>
        </div>
      </header>
    </template>

    <div class="modal-body">
      <DatasheetCard :sheet="sheet" />
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseModal from './BaseModal.vue'
import DatasheetCard from './DatasheetCard.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const props = defineProps({
  sheet: { type: Object, required: true },
  factionName: { type: String, default: '' },
})
defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Same query Wahapedia uses for its "Search for model's image on the Internet" icon.
const query = computed(() => encodeURIComponent(`Warhammer 40000 ${props.factionName} ${props.sheet.name}`.trim()))
const imageUrl = computed(() => `https://www.google.com/search?tbm=isch&q=${query.value}%20miniature`)

const copied = ref(false)
let copyTimer = null
async function copyName() {
  try {
    await navigator.clipboard.writeText(props.sheet.name)
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copied.value = false), 1500)
  } catch {
    /* clipboard unavailable (permissions / insecure context) — leave the icon as is */
  }
}
</script>

<style scoped>
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.8rem 0.9rem;
  border-bottom: 1px solid var(--border);
}

.dsm-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
  margin: 0;
  min-width: 0;
}

.dsm-actions {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  flex-shrink: 0;
}

.dsm-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;
  background: none;
  border: none;
  border-radius: 4px;
  color: var(--text-muted);
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--motion-fast), color var(--motion-fast);
}

.dsm-btn:hover {
  background: color-mix(in srgb, var(--text-primary) 8%, transparent);
  color: var(--text-primary);
  text-decoration: none;
}

.dsm-btn.copied {
  color: var(--accent);
}

.dsm-close {
  font-size: 1.1rem;
}
</style>
