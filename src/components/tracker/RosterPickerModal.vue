<template>
  <BaseModal @close="$emit('close')">
    <template #header>
      <header class="modal-head">
        <h3 class="mh-title">{{ labels.trackerRoster }}</h3>
        <button class="mh-close" :aria-label="labels.modalClose" @click="$emit('close')">✕</button>
      </header>
    </template>

    <div class="modal-body">
      <p v-if="faction" class="rp-note">{{ labels.trackerRosterFactionOnly }}</p>
      <p v-if="!savedRosters.length" class="rp-empty">{{ labels.trackerRosterNone }}</p>

      <!-- A list of the wrong faction is shown DISABLED rather than filtered out: hiding it makes
           a collection look empty and reads as "my list is gone", which is a worse answer than
           seeing it greyed out next to the faction it belongs to. -->
      <button
        v-for="r in savedRosters"
        :key="r.id"
        type="button"
        class="rp-row"
        :class="{ on: r.id === selected, off: wrongFaction(r) }"
        :disabled="wrongFaction(r)"
        @click="$emit('pick', r)"
      >
        <span class="rp-name">{{ r.name || labels.rosterUntitled }}</span>
        <span class="rp-meta">
          <template v-if="factionName(r.faction)">{{ factionName(r.faction) }} · </template>
          {{ r.summary?.points || 0 }} {{ labels.rosterPointsLabel }} ·
          <i class="bi bi-people-fill"></i> {{ r.units?.length || 0 }}
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
        <p v-if="linkError" class="rp-link-error">{{ linkError }}</p>
      </div>

      <button v-if="selected !== null" type="button" class="rp-clear" @click="$emit('clear')">
        {{ labels.trackerRosterDetach }}
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, onMounted, ref, useId } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters } from '../../composables/useRosters.js'
import { decodeRoster } from '../../composables/rosterShare.js'
import { refreshSummaries } from '../../composables/rosterSummary.js'
import { factionGroups } from '../../data/factionsIndex.js'

const props = defineProps({
  // rosterId of the currently attached roster, or null. A link-imported one has no id, so the
  // "detach" action keys off the attachment existing at all (see `selected !== null` above).
  selected: { type: String, default: null },
  // Restrict the offer to one faction. Set when attaching to a game already under way, where the
  // faction is load-bearing (missions, the army-rule tracker, the points already scored hang on
  // it) and so is no longer the list's to decide. Unset in the setup wizard, where the list still
  // decides it.
  faction: { type: String, default: null },
})
const emit = defineEmits(['pick', 'clear', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
// Saved lists only: a draft is an unfinished wizard run (useRosters.js), and what it holds right
// now isn't what will be fielded.
const { rosters, savedRosters } = useRosters()
const linkId = useId()

// Same cached summary the roster list shows, same one-off repair for a roster nothing ever
// priced — see rosterSummary.js.
onMounted(() => { refreshSummaries(rosters.value) })

const allFactions = factionGroups.flatMap((g) => g.factions)
function factionName(slug) {
  return allFactions.find((f) => f.slug === slug)?.name || ''
}

function wrongFaction(r) {
  return !!props.faction && r.faction !== props.faction
}

const link = ref('')
// The message to show, or '' — a link can fail two different ways and "invalid" would be a lie
// for a perfectly good list of the wrong army.
const linkError = ref('')
const busy = ref(false)

// Accepts what the user actually has in the clipboard: the whole share URL, or just the payload.
async function useLink() {
  busy.value = true
  linkError.value = ''
  const raw = link.value.trim()
  const payload = raw.match(/[#&?]r=([^&\s]+)/)?.[1] ?? raw
  const decoded = await decodeRoster(decodeURIComponent(payload))
  busy.value = false
  if (!decoded) { linkError.value = labels.value.rosterSharedInvalid; return }
  // Same rule the saved rows follow — a link is just the other way a list arrives.
  if (wrongFaction(decoded)) { linkError.value = labels.value.trackerRosterWrongFaction; return }
  // Not saved to the roster list — it is attached to this game only. Importing someone else's
  // list into your own collection is a separate, deliberate act on the /roster/shared page.
  emit('pick', decoded)
}
</script>

<style scoped>
/* Same head/body recipe as the other tracker dialogs (DetachmentPickerModal, FactionPickerModal
   …). It has to be repeated here: BaseModal's own `.modal-head` rules are scoped to BaseModal and
   styles a SLOTTED header in the consumer's scope instead, so a custom header inherits nothing —
   which is what left this one with no padding, no rule under it and a half-size title. */
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.8rem 0.9rem;
  border-bottom: 1px solid var(--border);
}
.mh-title { font-family: var(--font-display); font-size: 1.49rem; font-weight: 500; color: var(--text-primary); margin: 0; }
.mh-close {
  background: none; border: none; color: var(--text-muted);
  font-size: 1.1rem; cursor: pointer; min-width: 36px; min-height: 36px; border-radius: 4px;
}
.mh-close:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }
.modal-body { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.75rem; overflow-y: auto; }
.rp-empty { color: var(--text-muted); font-size: 0.85rem; margin: 0 0 0.25rem; }
.rp-row {
  display: flex; flex-direction: column; gap: 0.15rem; text-align: left;
  padding: 0.6rem 0.75rem; border: 1px solid var(--border); border-radius: 6px;
  background: var(--bg-card); color: var(--text-primary); cursor: pointer;
}
.rp-row:hover { border-color: var(--accent); }
.rp-row.off { opacity: 0.45; cursor: not-allowed; }
.rp-row.off:hover { border-color: var(--border); }
.rp-note { margin: 0 0 0.25rem; color: var(--text-muted); font-size: 0.78rem; line-height: 1.4; }
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
