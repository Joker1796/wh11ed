<!-- One unit of the list, as it goes on paper.
     The card itself is RosterPrintCard — paper's own typography of the sheet — resolved by the
     same useRosterUnitCard the modal reads (src/composables/rosterUnitCard.js), so the Save a
     player reads off the sheet in their hand is the one their phone shows, by construction
     rather than by luck.

     WHAT THIS COMPONENT DECIDES is the tier, and the facts of this copy. The detachment rule and
     the enhancements are printed ONCE, in their own sections of the booklet; what stays per-unit
     goes on the card's own name plate — Warlord, enhancement, who it is attached to, what it
     cost — because those are facts about THIS copy and nowhere else.

     THE THREE TIERS, as two checkboxes (see src/components/roster/CLAUDE.md):
       neither      the printed datasheet, exactly as the faction page shows it;
       trim         the sheet this entry actually fields (weapons cut to its loadout);
       + modifiers  its numbers as the roster's own rules leave them, each marked and attributed
                    under the card.
     Turning them off never prints a wrong number — it prints the printed one. That is the whole
     reason the switch exists: a sheet handed across the table is read as a datasheet. -->
<template>
  <RosterPrintCard
    v-if="cardSheet"
    :sheet="cardSheet"
    :tags="tags"
    :granted-keywords="grantedKeywords"
    :granted-core="grantedCore"
    :stat-marks="marks"
    :stat-notes="notes"
    :show-possible="opts.possible"
    :show-choices="opts.choices"
  />
</template>

<script setup>
import { computed } from 'vue'
import RosterPrintCard from './RosterPrintCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosterUnitCard } from '../../composables/rosterUnitCard.js'

const props = defineProps({
  unitId: { type: String, required: true },
  factionSlug: { type: String, required: true },
  // Same shape the modal is handed: { def, entry, items, units, detachments }.
  ctx: { type: Object, default: null },
  // The print settings, already resolved through printOptionOn — this component reads plain
  // booleans and never asks the table what a parent row says.
  opts: { type: Object, required: true },
  // This entry's own price, or null when prices are not being printed.
  points: { type: Number, default: null },
  role: { type: String, default: '' },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { sheet, view, statMods, statNotes, allGrantedKeywords } = useRosterUnitCard(props)

const cardSheet = computed(() => {
  if (!sheet.value) return null
  if (!props.opts.trim) return sheet.value
  return props.opts.modifiers ? statMods.value.sheet : view.value.sheet
})

// A keyword a rule GRANTS is only claimed where that rule is being applied: with the overlay off,
// the card must read as the printed one, and a printed card does not say DESTROYER CULT.
const grantedKeywords = computed(() => {
  if (!props.opts.trim) return []
  return props.opts.modifiers ? allGrantedKeywords.value : view.value.grantedKeywords
})
const grantedCore = computed(() => (props.opts.modifiers ? statMods.value.core || [] : []))
const marks = computed(() => (props.opts.modifiers ? statMods.value.marks : []))
// The notes carry `hasSource` for the modal, which opens the rule behind a name. On paper nothing
// opens, so they travel as they are — the name alone is what attributes the number.
const notes = computed(() => (props.opts.modifiers ? statNotes.value : []))

// The copy's facts, onto the name plate.
const tags = computed(() => {
  const l = labels.value
  const out = []
  if (props.role) out.push(props.role)
  const ctx = view.value?.context
  if (ctx?.warlord) out.push(l.rosterWarlord)
  if (ctx?.enhancement) {
    const pts = ctx.enhancement.pts ? ` (+${ctx.enhancement.pts})` : ''
    out.push(`${l.rosterEnhancement}: ${ctx.enhancement.name}${pts}`)
  }
  if (ctx?.attachedTo) out.push(`${l.rosterAttachedTo} ${ctx.attachedTo}`)
  if (props.points != null) out.push(`${props.points}${l.rosterPointsLabel}`)
  return out
})
</script>
