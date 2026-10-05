<template>
  <div class="rmt">
    <p
      v-if="!candidates.length"
      class="rmt-empty"
    >
      {{ labels.rosterMissionsNoDetachment }}
    </p>

    <template v-else>
      <!-- What the list plays. The declared one is marked; with a choice on offer the others can be
           LOOKED at here without touching the list — changing it is a deliberate act, in a dialog
           with its own Save. -->
      <section class="rmt-disp">
        <span class="rmt-label">{{ labels.trackerDisposition }}</span>
        <div class="rmt-cands">
          <button
            v-for="d in candidates"
            :key="d"
            type="button"
            class="rmt-cand tone"
            :class="{ on: shown === d, declared: d === declared }"
            :style="toneVars(dispositionColor(d))"
            :disabled="candidates.length === 1"
            @click="shown = d"
          >
            <img
              v-if="iconOf(d)"
              :src="iconOf(d)"
              alt=""
              class="rmt-icon"
            >
            {{ d }}
            <i
              v-if="d === declared"
              class="bi bi-check2"
              :aria-label="labels.rosterMissionsInList"
            />
          </button>
        </div>
        <!-- The way to change the list sits beside the line that says it differs from what is on
             screen: shown only while previewing an alternative (or while nothing is declared), and
             the dialog opens on the disposition being looked at. -->
        <div
          class="rmt-status"
          :class="{ alt: declared && shown !== declared, open: !declared }"
        >
          <p class="rmt-status-text">
            <template v-if="!declared">
              {{ labels.rosterMissionsUndeclared }}
            </template>
            <template v-else-if="shown === declared">
              <i class="bi bi-check2" /> {{ labels.rosterMissionsDeclared }}
            </template>
            <template v-else>
              {{ fill(labels.rosterMissionsPreviewing, { name: declared }) }}
            </template>
          </p>
          <ExpandTransition>
            <button
              v-if="editable && candidates.length > 1 && shown !== declared"
              type="button"
              class="btn-ghost rmt-change"
              @click="$emit('change', shown)"
            >
              {{ declared ? labels.rosterMissionsChange : labels.rosterMissionsChoose }}
            </button>
          </ExpandTransition>
        </div>
      </section>

      <p class="rmt-lead">
        {{ labels.rosterMissionsLead }}
      </p>

      <div class="rmt-list">
        <div
          v-for="m in matchups"
          :key="m.opp.id"
          class="rmt-row"
        >
          <span class="rmt-vs">
            <img
              :src="m.opp.icon"
              alt=""
              class="rmt-icon"
            >
            {{ labels.trackerVs }} {{ m.opp.name }}
          </span>
          <span class="rmt-pair">
            <button
              v-for="side in (m.mirror ? ['shared'] : ['mine', 'theirs'])"
              :key="side"
              type="button"
              class="rmt-m"
              :class="side"
              :disabled="!m[side]"
              @click="openMission(m, side)"
            >
              <small>{{ sideLabel(side) }}</small>
              <span class="rmt-name">{{ m[side]?.name }}</span>
              <span
                v-if="m[side]?.nameRu"
                class="rmt-name-ru"
              >{{ m[side].nameRu }}</span>
            </button>
          </span>
        </div>
      </div>

      <!-- One mission at a time, and the header says whose it is: on a phone two cards stacked
           under a row read as one long page, and which half was the opponent's got lost. -->
      <BaseModal
        v-if="viewing"
        :title="sideLabel(viewing.side)"

        max-width="640px"
        max-height="85dvh"
        @close="viewing = null"
      >
        <!-- The two dispositions in their own colours, as everywhere a disposition is named. -->
        <template #subtitle>
          <span
            class="tone rmt-dname"
            :style="toneVars(dispositionColor(viewing.who))"
          >{{ viewing.who }}</span>
          {{ labels.trackerVs }}
          <span
            class="tone rmt-dname"
            :style="toneVars(dispositionColor(viewing.other))"
          >{{ viewing.other }}</span>
        </template>
        <div class="modal-body">
          <p
            v-if="viewing.mirror"
            class="rmt-mirror"
          >
            {{ labels.rosterMissionsMirror }}
          </p>
          <MissionCard
            :mission="viewing.mission"
            :show-lore="false"
          />
        </div>
      </BaseModal>
    </template>
  </div>
</template>

<script setup>
// The roster's Missions tab — preparing for an opponent. A Primary is the pair of dispositions
// (src/data/missions.js), so for the disposition this list plays there are exactly five games it
// can be dealt: one per opponent disposition, each with the list's own mission AND the one the
// opponent will be scoring. Both are on the row, so the matchup reads without opening anything;
// each opens in a dialog of its own whose header says whose mission it is (owner, 2026-10-02).
//
// The declared disposition is the list's, and only the dialog behind "Change" writes it; the
// switch here is a preview, so looking at the alternative can never quietly change the list.
import ExpandTransition from '../ExpandTransition.vue'
import { ref, computed, watch } from 'vue'
import MissionCard from '../event/MissionCard.vue'
import BaseModal from '../BaseModal.vue'
import { DISPOSITIONS } from '../../data/dispositions.js'
import { dispositionColor } from '../../data/dispositionColors.js'
import { getMissions, primaryFor } from '../../data/missions.js'
import { toneVars } from '../../utils/tone.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  // The dispositions the list's detachments offer, spelled as `fds` spells them (English card
  // names, the same DISPOSITIONS carries).
  candidates: { type: Array, required: true },
  // What the list plays (dispositionOf) — the only candidate, or the declaration; null while a
  // choice is open.
  declared: { type: String, default: null },
  // Off when the list is not the reader's to change.
  editable: { type: Boolean, default: false },
})
defineEmits(['change'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const fill = (s, p) => s.replace(/\{(\w+)\}/g, (_, k) => p[k] ?? '')

const byName = (name) => DISPOSITIONS.find((d) => d.name === name) || null
const iconOf = (name) => byName(name)?.icon || ''

const shown = ref(props.declared || props.candidates[0] || null)
// A saved change, or a detachment change elsewhere, moves the view to the list's own answer.
watch(() => [props.declared, props.candidates.join('|')], () => {
  if (!props.candidates.includes(shown.value) || props.declared) shown.value = props.declared || props.candidates[0] || null
})

const primaries = computed(() => getMissions(locale.value).primary)
const local = (m) => (m ? primaries.value.find((x) => x.slug === m.slug) || m : null)

const matchups = computed(() => {
  const me = byName(shown.value)
  if (!me) return []
  return DISPOSITIONS.map((opp) => ({
    opp,
    mine: local(primaryFor(me.id, opp.id)),
    theirs: local(primaryFor(opp.id, me.id)),
    mirror: opp.id === me.id,
    // A mirror matchup deals both players the same card: one plaque, not the same name twice.
    shared: opp.id === me.id ? local(primaryFor(me.id, opp.id)) : null,
  }))
})

// A tapped mission, with the matchup it belongs to: "Priority Assets vs Take and Hold" for the
// list's own, the other way round for the opponent's — the first name is always whose mission it is.
const viewing = ref(null)
const sideLabel = (side) => ({
  mine: labels.value.rosterMissionsYours,
  theirs: labels.value.rosterMissionsTheirs,
  shared: labels.value.rosterMissionsShared,
})[side]
function openMission(m, side) {
  const [who, other] = side === 'mine' ? [shown.value, m.opp.name] : [m.opp.name, shown.value]
  viewing.value = {
    side,
    mission: m[side],
    mirror: m.mirror,
    who,
    other,
  }
}
</script>

<style scoped>
.rmt-empty { color: var(--text-muted); font-style: italic; }
/* Sized by its own width, not the window's: on the rosters desk this tab is the middle column,
   ~430px on a 1366px screen, and a viewport query laid it out for room it did not have. */
.rmt { container-type: inline-size; }

/* ── The list's disposition ── */
.rmt-disp {
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  margin-bottom: 0.9rem;
}
.rmt-label { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
.rmt-change { flex: none; font-size: 0.8rem; padding: 0.25rem 0.6rem; }
.rmt-cands { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.45rem; }
.rmt-cand {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 32px;
  padding: 0.25rem 0.6rem;
  border: 1px solid color-mix(in srgb, var(--tone) 40%, var(--border));
  background: none;
  color: var(--text-muted);
  font: inherit;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
}
.rmt-cand.on {
  color: var(--text-primary);
  border-color: var(--tone);
  background: color-mix(in srgb, var(--tone) 14%, transparent);
}
.rmt-cand:disabled { cursor: default; }
.rmt-cand .bi-check2 { color: var(--tone); }
.rmt-icon { width: 20px; height: 20px; object-fit: contain; flex: none; }
.rmt-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.45rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}
.rmt-status-text { margin: 0; flex: 1; min-width: 0; }
.rmt-status .bi-check2 { color: var(--accent-ink); }
.rmt-status.alt,
.rmt-status.open { color: var(--warning); }

.rmt-lead { margin: 0 0 0.75rem; font-size: 0.86rem; color: var(--text-muted); line-height: 1.5; }

/* ── Five matchups ── */
.rmt-list { display: flex; flex-direction: column; }
.rmt-row {
  display: grid;
  grid-template-columns: minmax(0, 11rem) minmax(0, 1fr);
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
}
.rmt-row + .rmt-row { border-top-width: 0; }
.rmt-vs { display: flex; align-items: center; gap: 0.45rem; font-size: 0.82rem; color: var(--text-muted); }
.rmt-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.rmt-m {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 44px;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  background: none;
  color: var(--text-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background var(--motion-fast);
}
.rmt-m.theirs { border-left-color: var(--text-muted); }
.rmt-m.shared { grid-column: 1 / -1; }
.rmt-m:hover { background: var(--bg-row-hover); }
.rmt-m small { font-size: 0.64rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); }
.rmt-name { font-size: 0.9rem; font-weight: 600; line-height: 1.25; }
.rmt-name-ru { font-size: 0.74rem; color: var(--text-muted); line-height: 1.25; }
.rmt-dname { color: var(--tone); font-weight: 600; }
.rmt-mirror { margin: 0 0 0.6rem; font-size: 0.82rem; color: var(--text-muted); }

@container (max-width: 600px) {
  /* The opponent on a line of its own, the two missions side by side under it. */
  .rmt-row { grid-template-columns: minmax(0, 1fr); row-gap: 0.4rem; }
}
</style>
