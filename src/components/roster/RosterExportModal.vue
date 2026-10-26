<template>
  <BaseModal
    :title="labels.rosterExportTitle"
    max-width="520px"
    @close="$emit('close')"
  >
    <div class="modal-body rex">
      <!-- One list, six dialects: which one you need depends on where it is going (a TO's inbox,
           a tournament header, a Discord channel), so the choice is asked every time and not kept
           as a setting. A native select rather than a row of tabs (owner, 2026-10-05): five of
           them took two lines on a phone, and a select opens the phone's own list instead of a
           second sheet over this one — the import dialog asks its faction the same way. -->
      <label class="rex-fmt">
        <span>{{ labels.rosterExportFormat }}</span>
        <select v-model="format">
          <option
            v-for="f in FORMATS"
            :key="f"
            :value="f"
          >{{ labels[FMT_LABEL[f]] }}</option>
        </select>
      </label>
      <p class="rex-hint">
        {{ labels[FMT_HINT[format]] }}
      </p>
      <!-- The Russian tournament header names the player and their HIN (rating number; "-" until
           they have one): typed here, once, rather than into the text after every export.
           Remembered on this device. -->
      <div
        v-if="format === 'rus'"
        class="rex-who"
      >
        <label class="rex-fmt">
          <span>{{ labels.rosterExportPlayer }}</span>
          <input
            v-model.trim="player"
            type="text"
            maxlength="60"
            autocomplete="name"
          >
        </label>
        <label class="rex-fmt">
          <span>{{ labels.rosterExportHin }}</span>
          <input
            v-model.trim="hin"
            type="text"
            maxlength="20"
            inputmode="numeric"
            autocomplete="off"
          >
        </label>
      </div>
      <textarea
        class="rex-text"
        readonly
        :value="text"
        @focus="$event.target.select()"
      />
      <div class="rex-actions">
        <button
          class="rex-btn"
          @click="copy(text, 'text')"
        >
          <i
            class="wi"
            :class="copied === 'text' ? 'wi-check' : 'wi-copy'"
          />
          {{ copied === 'text' ? labels.rosterCopied : labels.rosterCopyText }}
        </button>
        <button
          class="rex-btn"
          :disabled="!url"
          @click="copy(url, 'link')"
        >
          <i
            class="wi"
            :class="copied === 'link' ? 'wi-check' : 'wi-link'"
          />
          {{ copied === 'link' ? labels.rosterCopied : labels.rosterCopyLink }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { buildRosterText, EXPORT_FORMATS } from '../../core/roster/rosterExport.js'
import { factionGroups } from '../../data/factionsIndex.js'
import { APP_DATA_VERSION } from '../../data/appDataVersion.js'
import { encodeRoster, shareUrl } from '../../composables/rosterShare.js'
import { APP_VERSION } from '../../buildInfo.js'

const props = defineProps({
  roster: { type: Object, required: true },
  faction: { type: Object, default: null },
  core: { type: Object, required: true },
  items: { type: Object, default: () => ({}) },
})
defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const FORMATS = EXPORT_FORMATS
const FMT_LABEL = { gw: 'rosterFmtGw', wtc: 'rosterFmtWtc', 'wtc-compact': 'rosterFmtWtcCompact', compact: 'rosterFmtCompact', simple: 'rosterFmtSimple', rus: 'rosterFmtRus' }
const FMT_HINT = { gw: 'rosterFmtGwHint', wtc: 'rosterFmtWtcHint', 'wtc-compact': 'rosterFmtWtcCompactHint', compact: 'rosterFmtCompactHint', simple: 'rosterFmtSimpleHint', rus: 'rosterFmtRusHint' }
const format = ref('gw')

// The footer names the tool and the points data that wrote the list — never the GW app's own
// version, which we would be claiming falsely (see rosterExport.js).
const version = { app: APP_VERSION, data: APP_DATA_VERSION }

// The player's name and HIN for the Russian tournament header, per device. Storage can be missing
// or throw (a private window): the fields then simply start empty.
const STORE = { player: 'wh11ed-export-player', hin: 'wh11ed-export-hin' }
const stored = (k) => { try { return localStorage.getItem(k) || '' } catch { return '' } }
const player = ref(stored(STORE.player))
const hin = ref(stored(STORE.hin))
watch([player, hin], ([p, h]) => {
  try { localStorage.setItem(STORE.player, p); localStorage.setItem(STORE.hin, h) } catch { /* not kept */ }
})

const text = computed(() => buildRosterText(
  props.roster,
  { faction: props.faction, core: props.core, items: props.items, factionGroups, version, who: { player: player.value, hin: hin.value } },
  format.value,
))

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
}
.rex-fmt { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.8rem; }
.rex-fmt select {
  padding-block: 0.45rem;
  padding-left: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border);
  cursor: pointer;
}
.rex-hint { margin: 0; font-size: 0.75rem; color: var(--text-muted); }
.rex-who { display: grid; grid-template-columns: 2fr 1fr; gap: 0.6rem; }
.rex-who input {
  width: 100%;
  min-width: 0;
  padding: 0.45rem 0.5rem;
  font-size: 0.9rem;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
}
.rex-who input:focus { outline: none; border-color: var(--accent); }
.rex-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.rex-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  background: var(--accent);
  color: #fff;
  border: none;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}
.rex-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* Narrow phones: inside a modal the two copy buttons are already boxed in, and at desktop size
   they wrap into a stack that fills half the sheet. Same rule as the CTA rows — button-sized
   buttons on one line. */
@media (max-width: 480px) {
  .rex-actions { gap: 0.4rem; }
  .rex-btn { padding: 0.45rem 0.7rem; font-size: 0.78rem; white-space: nowrap; }
}
</style>
