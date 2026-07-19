<template>
  <BaseModal :title="labels.rosterExportTitle" max-width="520px" @close="$emit('close')">
    <div class="modal-body rex">
      <textarea class="rex-text" readonly :value="text" @focus="$event.target.select()"></textarea>
      <div class="rex-actions">
        <button class="rex-btn" @click="copy(text, 'text')">
          <i class="bi" :class="copied === 'text' ? 'bi-check-lg' : 'bi-clipboard'"></i>
          {{ copied === 'text' ? labels.rosterCopied : labels.rosterCopyText }}
        </button>
        <button class="rex-btn" :disabled="!url" @click="copy(url, 'link')">
          <i class="bi" :class="copied === 'link' ? 'bi-check-lg' : 'bi-link-45deg'"></i>
          {{ copied === 'link' ? labels.rosterCopied : labels.rosterCopyLink }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { buildRosterText } from '../../composables/rosterExport.js'
import { encodeRoster, shareUrl } from '../../composables/rosterShare.js'

const props = defineProps({
  roster: { type: Object, required: true },
  faction: { type: Object, default: null },
  core: { type: Object, required: true },
  items: { type: Object, default: () => ({}) },
})
defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const text = computed(() => buildRosterText(props.roster, { faction: props.faction, core: props.core, items: props.items }))

// The share URL is built from the current origin, so it stays valid across the
// wh11ed.ru → wh-rules.ru move — never hard-code the domain. (After the domain-migration
// branch merges, this can switch to SITE_ORIGIN from src/config.js.)
const url = ref('')
onMounted(async () => {
  const origin = (typeof location !== 'undefined' && location.origin) || ''
  url.value = shareUrl(origin, await encodeRoster(props.roster))
})

const copied = ref(null)
async function copy(value, which) {
  try {
    await navigator.clipboard.writeText(value)
    copied.value = which
    setTimeout(() => { if (copied.value === which) copied.value = null }, 1500)
  } catch { /* clipboard blocked — the textarea is selectable as a fallback */ }
}
</script>

<style scoped>
.rex { display: flex; flex-direction: column; gap: 0.75rem; padding: 0.75rem; }
.rex-text {
  width: 100%;
  min-height: 14rem;
  resize: vertical;
  padding: 0.6rem 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 5px;
}
.rex-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.rex-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}
.rex-btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
