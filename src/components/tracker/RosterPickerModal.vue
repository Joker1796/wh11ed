<template>
  <BaseModal
    :title="labels.trackerRoster"
    @close="$emit('close')"
  >
    <div class="modal-body modal-list">
      <p
        v-if="faction"
        class="rp-note"
      >
        {{ labels.trackerRosterFactionOnly }}
      </p>
      <p
        v-if="!activeRosters.length"
        class="rp-empty"
      >
        {{ labels.trackerRosterNone }}
      </p>
      <!-- Over the battle size is hidden, not forbidden: a player who means to field the bigger
           list anyway (a house game, a size about to change) shows them and takes one. -->
      <p
        v-if="overSize"
        class="rp-note rp-over-note"
      >
        <span>{{ (showBig ? labels.trackerRosterShownBySize : labels.trackerRosterHiddenBySize).replace('{limit}', maxPoints).replace('{n}', overSize) }}</span>
        <button
          type="button"
          class="btn-ghost rp-show"
          @click="showBig = !showBig"
        >
          {{ showBig ? labels.trackerRosterHideBig : labels.trackerRosterShowBig }}
        </button>
      </p>

      <!-- A list of the wrong faction is shown DISABLED rather than filtered out: hiding it makes
           a collection look empty and reads as "my list is gone", which is a worse answer than
           seeing it greyed out next to the faction it belongs to. -->
      <ExpandTransition
        v-for="r in activeRosters"
        :key="r.id"
      >
        <button
          v-if="showBig || !tooBig(r)"
          type="button"
          class="rp-row"
          :class="{ on: r.id === selected, off: wrongFaction(r), over: tooBig(r) }"
          :disabled="wrongFaction(r)"
          @click="$emit('pick', r)"
        >
          <!-- The faction's badge, as on the faction list: a column of lists is told apart by army
               at a glance (owner, 2026-10-05). -->
          <span
            v-if="factionOf(r)"
            class="tone"
            :style="toneVars(factionOf(r).color)"
          >
            <FactionBadge :faction="factionOf(r)" />
          </span>
          <span class="rp-text">
            <span class="rp-name">{{ r.name || labels.rosterUntitled }}</span>
            <span class="rp-meta">
              <span>
                <template v-if="factionOf(r)">{{ factionOf(r).name }} · </template>
                <span class="rp-pts">{{ r.summary?.points || 0 }} {{ labels.rosterPointsLabel }}</span> ·
                <i class="wi wi-units" /> {{ r.units?.length || 0 }}
              </span>
              <RosterOwnLimitsMark
                inert
                :roster="r"
              />
            </span>
          </span>
        </button>
      </ExpandTransition>

      <!-- A share link is the second source, and for the opponent usually the only one: their list
           lives on their phone, not in this browser. Same payload the /roster/shared page reads.
           Or the list's exported TEXT (Misha, 2026-10-10: "not only by link"), read by the same
           parser and matcher as the Import dialog. -->
      <div class="rp-link">
        <label
          class="rp-link-label"
          :for="linkId"
        >{{ labels.trackerRosterFromLink }}</label>
        <div class="rp-link-row">
          <!-- A textarea, not an input: a list's exported text is many lines, and an input drops
               the line breaks the parser reads. -->
          <textarea
            :id="linkId"
            v-model="link"
            rows="2"
            :placeholder="labels.trackerRosterLinkPlaceholder"
          />
          <button
            type="button"
            class="rp-link-btn"
            :disabled="!link.trim() || busy"
            @click="useLink"
          >
            {{ labels.trackerRosterLinkAdd }}
          </button>
        </div>
        <p
          v-if="linkError"
          class="rp-link-error"
        >
          {{ linkError }}
        </p>
      </div>

      <button
        v-if="selected !== null"
        type="button"
        class="rp-clear"
        @click="$emit('clear')"
      >
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
import RosterOwnLimitsMark from '../roster/RosterOwnLimitsMark.vue'
import ExpandTransition from '../ExpandTransition.vue'
import { useRosters, SCHEMA_VERSION } from '../../composables/useRosters.js'
import { decodeRoster } from '../../composables/rosterShare.js'
import { refreshSummaries } from '../../composables/rosterSummary.js'
import { factionGroups } from '../../data/factionsIndex.js'
import FactionBadge from '../FactionBadge.vue'
import { toneVars } from '../../utils/tone.js'

const props = defineProps({
  // rosterId of the currently attached roster, or null. A link-imported one has no id, so the
  // "detach" action keys off the attachment existing at all (see `selected !== null` above).
  selected: { type: String, default: null },
  // Restrict the offer to one faction. Set when attaching to a game already under way, where the
  // faction is load-bearing (missions, the army-rule tracker, the points already scored hang on
  // it) and so is no longer the list's to decide. Unset in the setup wizard, where the list still
  // decides it.
  faction: { type: String, default: null },
  // The battle size's points: a list over it is hidden behind a "show" (owner, 2026-10-03/04) — a
  // game of 1000 points rarely wants a 2000-point list, but may. Null offers every list (Doubles,
  // where the per-player size is the organiser's).
  maxPoints: { type: Number, default: null },
})
const emit = defineEmits(['pick', 'clear', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
// Active lists only: a draft is an unfinished wizard run (useRosters.js), and what it holds right
// now isn't what will be fielded; an archived one is put away until the player brings it back.
const { rosters, activeRosters } = useRosters()
const linkId = useId()

// Same cached summary the roster list shows, same one-off repair for a roster nothing ever
// priced — see rosterSummary.js.
onMounted(() => { refreshSummaries(rosters.value) })

// A list whose points are not known yet (never priced) stays: hiding it would be a guess.
const tooBig = (r) => props.maxPoints != null && r.summary?.points != null && r.summary.points > props.maxPoints
const overSize = computed(() => activeRosters.value.filter(tooBig).length)
// Hidden by default, one tap away (owner, 2026-10-04): the setup still warns under an attached list
// that is over the size, so taking one is a choice made in the open.
const showBig = ref(false)

const allFactions = factionGroups.flatMap((g) => g.factions)
function factionOf(r) {
  return allFactions.find((f) => f.slug === r.faction) || null
}

function wrongFaction(r) {
  return !!props.faction && r.faction !== props.faction
}

const link = ref('')
// The message to show, or '' — a link can fail two different ways and "invalid" would be a lie
// for a perfectly good list of the wrong army.
const linkError = ref('')
const busy = ref(false)

// Accepts what the user actually has in the clipboard: the whole share URL, just the payload, or a
// list's exported text (GW app, listhammer, New Recruit).
const SHARE = /[#&?]r=|^\d\.[\w-]+$/
async function useLink() {
  busy.value = true
  linkError.value = ''
  const raw = link.value.trim()
  if (!SHARE.test(raw)) {
    const out = await fromText(raw)
    busy.value = false
    if (out.error) { linkError.value = out.error; return }
    emit('pick', out.roster)
    return
  }
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

// A list's exported text, read the way the Import dialog reads it. Refused when anything in it was
// not recognised: a list attached to a game should be the list played, and the Import dialog is
// where the missing lines are shown one by one. The parser and the faction's roster data load only
// now — the picker opens in every setup, a pasted text is the rare case.
async function fromText(raw) {
  const l = labels.value
  const [{ detectFormat, matchFaction, matchRoster, parseList }, { loadRosterFaction, rosterItems }, { default: rosterCore }] = await Promise.all([
    import('../../core/roster/rosterImport.js'), import('../../data/roster/index.js'), import('../../data/roster/core.js'),
  ])
  const parsed = parseList(raw, detectFormat(raw), factionGroups)
  if (!parsed?.units?.length) return { error: l.rosterImportUnknown }
  const slug = matchFaction(parsed.faction, factionGroups) || props.faction
  if (!slug) return { error: l.rosterImportNoFaction.replace('{n}', parsed.faction || '—') }
  if (props.faction && slug !== props.faction) return { error: l.trackerRosterWrongFaction }
  const faction = await loadRosterFaction(slug, { allies: true })
  if (!faction) return { error: l.rosterImportNoFaction.replace('{n}', parsed.faction || '—') }
  const res = matchRoster(parsed, { faction, core: rosterCore, items: rosterItems.items })
  if (!res.payload?.units?.length) return { error: l.rosterImportUnknown }
  const nameOf = (m) => (typeof m === 'string' ? m : m?.name || '')
  const missing = [...(res.report.missing || []), ...(res.report.detachments?.missing || [])].map(nameOf).filter(Boolean)
  if (missing.length) return { error: l.trackerRosterTextMissing.replace('{names}', missing.join(', ')) }
  return { roster: { ...res.payload, v: SCHEMA_VERSION } }
}
</script>

<style scoped>
/* Roomier than the default list — these rows are cards, not one-liners. */
.modal-list { gap: 0.5rem; }
.rp-empty { color: var(--text-muted); font-size: 0.85rem; margin: 0 0 0.25rem; }
.rp-row {
  display: flex; align-items: center; gap: 0.65rem; text-align: left;
  padding: 0.6rem 0.75rem; border: 1px solid var(--border);
  background: var(--bg-card); color: var(--text-primary); cursor: pointer;
}
.rp-row:hover { border-color: var(--accent); }
.rp-row.off { opacity: 0.45; cursor: not-allowed; }
.rp-row.off:hover { border-color: var(--border); }
.rp-note { margin: 0 0 0.25rem; color: var(--text-muted); font-size: 0.78rem; line-height: 1.4; }
.rp-row.on { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }
.rp-text { display: flex; flex-direction: column; gap: 0.15rem; flex: 1; min-width: 0; }
.rp-name {
  font-weight: 600; font-size: 0.9rem;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; overflow-wrap: anywhere;
}
.rp-meta {
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem 0.5rem;
  color: var(--text-muted); font-size: 0.78rem;
}
/* The custom-limits mark sits at the row's right edge, and drops under the summary when narrow. */
.rp-meta > :deep(.olm) { margin-left: auto; }
.rp-row.over .rp-pts { color: var(--warning); font-weight: 600; }
.rp-over-note { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem 0.5rem; }
/* A small ghost button at the line's right edge; it drops under the text when narrow. */
.rp-show { margin-left: auto; padding: 0.35rem 0.8rem; font-size: 0.8rem; }
.rp-link { margin-top: 0.5rem; border-top: 1px solid var(--border); padding-top: 0.75rem; }
.rp-link-label { display: block; color: var(--text-muted); font-size: 0.78rem; margin-bottom: 0.35rem; }
.rp-link-row { display: flex; gap: 0.4rem; }
.rp-link-row textarea {
  resize: none; font-family: inherit; line-height: 1.35;
  flex: 1; min-width: 0; padding: 0.5rem 0.6rem; font-size: 0.85rem;
  border: 1px solid var(--border); background: var(--bg-input, var(--bg-card)); color: var(--text-primary);
}
.rp-link-btn {
  padding: 0.5rem 0.8rem; border: none; background: var(--accent); color: #fff;
  font-size: 0.85rem; font-weight: 600; cursor: pointer;
}
.rp-link-btn:disabled { opacity: 0.5; cursor: default; }
.rp-link-error { color: var(--danger); font-size: 0.8rem; margin: 0.4rem 0 0; }
.rp-clear {
  margin-top: 0.5rem; padding: 0.5rem; border: 1px solid var(--border);
  background: none; color: var(--text-muted); font-size: 0.85rem; cursor: pointer;
}
.rp-clear:hover { color: var(--text-primary); }
</style>
