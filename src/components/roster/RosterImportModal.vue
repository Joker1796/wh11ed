<template>
  <BaseModal :title="labels.rosterImportTitle" max-width="560px" @close="$emit('close')">
    <div class="modal-body rim">
      <p class="rim-hint">{{ labels.rosterImportHint }}</p>
      <textarea
        v-model="text"
        class="rim-text"
        :placeholder="labels.rosterImportPlaceholder"
        spellcheck="false"
      ></textarea>

      <p v-if="error" class="rim-error">{{ error }}</p>

      <!-- Only the short listhammer export gets this far without naming a faction: it carries no
           faction, detachment or battle size at all. Everything downstream (which datasheets to
           match against, what an enhancement belongs to) hangs on the answer, so it is asked
           plainly rather than guessed from unit names. -->
      <label v-if="askFaction" class="rim-faction">
        <span>{{ labels.rosterImportPickFaction }}</span>
        <select v-model="pickedFaction">
          <option value="">—</option>
          <optgroup v-for="g in factionGroups" :key="g.id" :label="groupLabel(g.id)">
            <option v-for="f in g.factions" :key="f.slug" :value="f.slug">{{ f.name }}</option>
          </optgroup>
        </select>
      </label>

      <!-- The report is the whole point: an import that quietly drops a unit is worse than one
           that refuses. Everything we could not place is named, and the points are shown BOTH
           ways so a difference reads as a data-version difference and not as a bug. -->
      <div v-if="report" class="rim-report">
        <p class="rim-line">
          <strong>{{ factionName }}</strong>
          <span v-if="report.detachments.matched.length"> · {{ report.detachments.matched.join(', ') }}</span>
        </p>
        <p class="rim-line">{{ labels.rosterImportUnitsFound.replace('{n}', String(report.units.length)) }}</p>
        <p class="rim-line" :class="{ warn: pointsDiffer }">
          {{ labels.rosterImportPoints.replace('{computed}', String(report.points.computed)).replace('{stated}', String(report.points.stated || report.points.statedUnits)) }}
        </p>
        <p v-if="pointsDiffer" class="rim-note">{{ labels.rosterImportPointsNote }}</p>

        <div v-if="report.missing.length" class="rim-warn">
          <span class="rim-warn-h">{{ labels.rosterImportMissingUnits }}</span>
          <span>{{ report.missing.map((m) => m.name).join(', ') }}</span>
        </div>
        <div v-if="report.detachments.missing.length" class="rim-warn">
          <span class="rim-warn-h">{{ labels.rosterImportMissingDets }}</span>
          <span>{{ report.detachments.missing.join(', ') }}</span>
        </div>
        <div v-if="missingGear.length" class="rim-warn">
          <span class="rim-warn-h">{{ labels.rosterImportMissingGear }}</span>
          <span>{{ missingGear.join(', ') }}</span>
        </div>
        <!-- An enhancement can only be placed once the detachment it belongs to is known, so a
             list that names none loses them all — say so instead of dropping them in silence. -->
        <div v-if="missingEnh.length" class="rim-warn">
          <span class="rim-warn-h">{{ labels.rosterImportMissingEnh }}</span>
          <span>{{ missingEnh.join(', ') }}</span>
          <span v-if="!report.detachments.matched.length" class="rim-warn-note">{{ labels.rosterImportNoDets }}</span>
        </div>
        <p v-if="clean" class="rim-ok"><i class="bi bi-check-circle"></i> {{ labels.rosterImportClean }}</p>
      </div>

      <div class="rim-actions">
        <button v-if="!report" class="rim-btn" :disabled="!text.trim() || busy" @click="read">
          {{ labels.rosterImportRead }}
        </button>
        <button v-else class="rim-btn" @click="create">{{ labels.rosterImportCreate }}</button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters, SCHEMA_VERSION } from '../../composables/useRosters.js'
import { detectFormat, matchFaction, matchRoster, parseList } from '../../composables/rosterImport.js'
import rosterCore from '../../data/roster/core.js'
// The light index (names + slugs), not the tracker's faction module: this modal is imported by the
// roster list, which stays out of the heavy datasets.
import { factionGroups } from '../../data/factionsIndex.js'

const GROUP_LABEL_KEYS = {
  astartes: 'factionGroupAstartes', imperium: 'factionGroupImperium',
  chaos: 'factionGroupChaos', xenos: 'factionGroupXenos', other: 'factionGroupOther',
}

const emit = defineEmits(['close', 'imported'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { importRoster } = useRosters()

const text = ref('')
const busy = ref(false)
const error = ref('')
const report = ref(null)
const payload = ref(null)
const factionName = ref('')
const askFaction = ref(false)
const pickedFaction = ref('')

const groupLabel = (id) => labels.value[GROUP_LABEL_KEYS[id]] || id

// Editing the pasted text invalidates the report it produced — otherwise "Create" would build the
// list somebody read about two edits ago. The faction they chose goes with it: the next paste is a
// different list.
watch(text, () => { report.value = null; payload.value = null; error.value = ''; askFaction.value = false; pickedFaction.value = '' })
// Choosing the faction is the answer to the question the read stopped on, so it resumes it.
watch(pickedFaction, (slug) => { if (slug && text.value.trim()) read() })

async function read() {
  busy.value = true
  error.value = ''
  try {
    const parsed = parseList(text.value, detectFormat(text.value))
    if (!parsed?.units?.length) { error.value = labels.value.rosterImportUnknown; return }
    const slug = matchFaction(parsed.faction) || pickedFaction.value
    if (!slug) {
      // No faction in the text (the short listhammer export) — or one we don't know. Either way the
      // reader can say which it is; only an unrecognised NAME is worth an error line.
      askFaction.value = true
      if (parsed.faction) error.value = labels.value.rosterImportNoFaction.replace('{n}', parsed.faction)
      return
    }
    // The roster bundle for one faction is ~100 KB of generated data, so it is fetched only once a
    // list actually names that faction — the same lazy load the editor does.
    const [{ loadRosterFaction, rosterItems }] = await Promise.all([import('../../data/roster/index.js')])
    const faction = await loadRosterFaction(slug)
    if (!faction) { error.value = labels.value.rosterImportNoFaction.replace('{n}', parsed.faction || '—'); return }
    factionName.value = faction.name
    const res = matchRoster(parsed, { faction, core: rosterCore, items: rosterItems.items })
    if (!res.payload?.units?.length) { error.value = labels.value.rosterImportUnknown; return }
    payload.value = res.payload
    report.value = res.report
  } finally {
    busy.value = false
  }
}

const missingGear = computed(() => [...new Set((report.value?.units || []).flatMap((u) => u.gear.missing))])
const missingEnh = computed(() => [...new Set((report.value?.units || []).filter((u) => u.enh && !u.enh.ok).map((u) => u.enh.name))])
const pointsDiffer = computed(() => !!report.value && report.value.points.computed !== (report.value.points.statedUnits || report.value.points.stated))
const clean = computed(() => !!report.value
  && !report.value.missing.length
  && !report.value.detachments.missing.length
  && !missingGear.value.length
  && !missingEnh.value.length
  && !pointsDiffer.value)

function create() {
  const r = importRoster({ ...payload.value, v: SCHEMA_VERSION }, payload.value.name)
  if (r) emit('imported', r.id)
  emit('close')
}
</script>

<style scoped>
.rim { display: flex; flex-direction: column; gap: 0.7rem; padding: 0.75rem; }
.rim-hint { margin: 0; font-size: 0.8rem; color: var(--text-secondary); }
.rim-text {
  width: 100%;
  min-height: 11rem;
  resize: vertical;
  padding: 0.6rem 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 5px;
}
.rim-error { margin: 0; font-size: 0.8rem; color: var(--danger, #c0392b); }
.rim-faction { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.8rem; color: var(--text-secondary); }
.rim-faction select {
  padding: 0.4rem 0.5rem;
  font-size: 0.85rem;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 5px;
}
.rim-warn-note { color: var(--text-muted); font-weight: 400; }
.rim-report { display: flex; flex-direction: column; gap: 0.4rem; }
.rim-line { margin: 0; font-size: 0.85rem; }
.rim-line.warn { color: var(--warning, #b8860b); }
.rim-note { margin: 0; font-size: 0.75rem; color: var(--text-muted); }
.rim-warn { display: flex; flex-direction: column; gap: 0.15rem; font-size: 0.78rem; }
.rim-warn-h { font-weight: 600; color: var(--warning, #b8860b); }
.rim-ok { margin: 0; font-size: 0.82rem; color: var(--text-secondary); }
.rim-actions { display: flex; gap: 0.6rem; }
.rim-btn {
  padding: 0.55rem 1rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}
.rim-btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
