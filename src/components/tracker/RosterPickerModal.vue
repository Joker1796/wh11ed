<template>
  <BaseModal @close="$emit('close')">
    <template #header>
      <header class="modal-head">
        <h3 class="mh-title">{{ labels.trackerRoster }}</h3>
        <button class="mh-close" :aria-label="labels.modalClose" @click="$emit('close')">✕</button>
      </header>
    </template>

    <div class="modal-body">
      <p v-if="!rosters.length" class="rp-empty">{{ labels.trackerRosterNone }}</p>

      <button
        v-for="r in rosters"
        :key="r.id"
        type="button"
        class="rp-row"
        :class="{ on: r.id === selected }"
        @click="$emit('pick', r)"
      >
        <span class="rp-name">{{ r.name || labels.rosterUntitled }}</span>
        <span class="rp-meta">
          <template v-if="factionName(r.faction)">{{ factionName(r.faction) }} · </template>
          {{ r.summary?.points || 0 }} {{ labels.rosterPointsLabel }} · {{ r.units?.length || 0 }}
        </span>
      </button>

      <!-- A share link is the second source, and for the opponent usually the only one: their list
           lives on their phone, not in this browser. Same payload the /roster/shared page reads. -->
      <div class="rp-link">
        <label class="rp-link-label" :for="linkId">{{ labels.trackerRosterFromLink }}</label>
        <div class="rp-link-row">
          <input :id="linkId" v-model="link" type="text" :placeholder="labels.trackerRosterLinkPlaceholder" />
          <button type="button" class="rp-link-btn" :disabled="!link.trim() || busy" @click="useLink">
            {{ labels.trackerRosterLinkAdd }}
          </button>
        </div>
        <p v-if="linkError" class="rp-link-error">{{ labels.rosterSharedInvalid }}</p>
      </div>

      <button v-if="selected !== null" type="button" class="rp-clear" @click="$emit('clear')">
        {{ labels.trackerRosterDetach }}
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref, useId } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters } from '../../composables/useRosters.js'
import { decodeRoster } from '../../composables/rosterShare.js'
import { factionGroups } from '../../data/factionsIndex.js'

defineProps({
  // rosterId of the currently attached roster, or null. A link-imported one has no id, so the
  // "detach" action keys off the attachment existing at all (see `selected !== null` above).
  selected: { type: String, default: null },
})
const emit = defineEmits(['pick', 'clear', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { rosters } = useRosters()
const linkId = useId()

const allFactions = factionGroups.flatMap((g) => g.factions)
function factionName(slug) {
  return allFactions.find((f) => f.slug === slug)?.name || ''
}

const link = ref('')
const linkError = ref(false)
const busy = ref(false)

// Accepts what the user actually has in the clipboard: the whole share URL, or just the payload.
async function useLink() {
  busy.value = true
  linkError.value = false
  const raw = link.value.trim()
  const payload = raw.match(/[#&?]r=([^&\s]+)/)?.[1] ?? raw
  const decoded = await decodeRoster(decodeURIComponent(payload))
  busy.value = false
  if (!decoded) { linkError.value = true; return }
  // Not saved to the roster list — it is attached to this game only. Importing someone else's
  // list into your own collection is a separate, deliberate act on the /roster/shared page.
  emit('pick', decoded)
}
</script>

<style scoped>
.modal-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
.mh-title { margin: 0; font-family: var(--font-display); font-weight: 500; font-size: 1.05rem; color: var(--text-primary); }
.mh-close { background: none; border: none; color: var(--text-muted); font-size: 1rem; cursor: pointer; padding: 0.2rem 0.35rem; }
.modal-body { display: flex; flex-direction: column; gap: 0.5rem; }
.rp-empty { color: var(--text-muted); font-size: 0.85rem; margin: 0 0 0.25rem; }
.rp-row {
  display: flex; flex-direction: column; gap: 0.15rem; text-align: left;
  padding: 0.6rem 0.75rem; border: 1px solid var(--border); border-radius: 6px;
  background: var(--bg-card); color: var(--text-primary); cursor: pointer;
}
.rp-row:hover { border-color: var(--accent); }
.rp-row.on { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }
.rp-name { font-weight: 600; font-size: 0.9rem; }
.rp-meta { color: var(--text-muted); font-size: 0.78rem; }
.rp-link { margin-top: 0.5rem; border-top: 1px solid var(--border); padding-top: 0.75rem; }
.rp-link-label { display: block; color: var(--text-muted); font-size: 0.78rem; margin-bottom: 0.35rem; }
.rp-link-row { display: flex; gap: 0.4rem; }
.rp-link-row input {
  flex: 1; min-width: 0; padding: 0.5rem 0.6rem; font-size: 0.85rem;
  border: 1px solid var(--border); border-radius: 5px; background: var(--bg-input, var(--bg-card)); color: var(--text-primary);
}
.rp-link-btn {
  padding: 0.5rem 0.8rem; border: none; border-radius: 5px; background: var(--accent); color: #fff;
  font-size: 0.85rem; font-weight: 600; cursor: pointer;
}
.rp-link-btn:disabled { opacity: 0.5; cursor: default; }
.rp-link-error { color: #c0392b; font-size: 0.8rem; margin: 0.4rem 0 0; }
.rp-clear {
  margin-top: 0.5rem; padding: 0.5rem; border: 1px solid var(--border); border-radius: 5px;
  background: none; color: var(--text-muted); font-size: 0.85rem; cursor: pointer;
}
.rp-clear:hover { color: var(--text-primary); }
</style>
