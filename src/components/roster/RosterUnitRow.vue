<!-- The collapsed line of one roster entry, as the two BUILDING screens draw it: the editor's
     Units tab and the creation wizard's config step. One component rather than a third copy of the
     same spans — the two used to hold identical markup under different class prefixes, which is
     how they drifted apart before (see .roster-sum in style.css for the same lesson).

     Renders the CONTENT of the row, not the tile around it: both callers put this inside their own
     <button>, which is also why nothing here is focusable.

     What it shows, in order of how quickly it needs to be read:
       - the name, and the warlord star;
       - chips for the facts that distinguish THIS entry from another copy of the same datasheet —
         how many models, which attachment slot it fills, its enhancement, its allegiance;
       - the wargear the player actually CHOSE.

     What it deliberately does not show is the default loadout. It is identical on every copy of a
     datasheet, it is printed on the datasheet itself, and it was three or four lines of dim
     0.74rem text per unit standing between the reader and the two facts above. It is still one tap
     away, inside the accordion's own "Default wargear" block. -->
<template>
  <span class="rur">
    <span class="rur-name">
      <i v-if="entry.warlord" class="bi bi-star-fill rur-star"></i>
      {{ def?.name || entry.id }}
    </span>
    <span class="rur-pts">{{ points }}</span>
    <span v-if="chips.length" class="rur-chips">
      <span v-for="c in chips" :key="c.key" class="rur-chip" :class="{ role: c.role }">{{ c.text }}</span>
    </span>
    <span v-if="picks.length" class="rur-picks">{{ picks.join(' · ') }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { mandatoryEnhancementFor, wargearNames } from '../../composables/rosterEngine.js'

const props = defineProps({
  entry: { type: Object, required: true },
  def: { type: Object, default: null },
  items: { type: Object, default: () => ({}) },
  points: { type: Number, default: 0 },
  // The roster's selected detachments — only to name a MANDATORY enhancement, which is derived
  // rather than stored on the entry (rosterEngine's mandatoryEnhancementFor).
  detachments: { type: Array, default: () => [] },
  // "Leader" / "Support" when this entry is a character attached to the unit above it. Passed in
  // rather than derived: the caller already knows the host, this component only knows the entry.
  role: { type: String, default: '' },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const chips = computed(() => {
  const out = []
  const def = props.def
  if (!def) return out
  if (props.role) out.push({ key: 'role', text: props.role, role: true })
  const size = def.sizes?.[props.entry.size ?? 0] || def.sizes?.[0]
  // A one-model datasheet says nothing by saying "1 model"; a bracket that can hold more does.
  if (size && size.per[1] > 1) {
    out.push({ key: 'models', text: `${props.entry.count ?? size.per[0]} ${labels.value.rosterModelsLabel}` })
  }
  const enh = props.entry.enh || mandatoryEnhancementFor(def, props.detachments)?.name
  if (enh) out.push({ key: 'enh', text: enh })
  if (props.entry.alleg) out.push({ key: 'alleg', text: props.entry.alleg })
  return out
})

const picks = computed(() => wargearNames(props.def, props.entry, props.items))
</script>

<style scoped>
/* A grid, not a text column beside a points column, because the two arrangements differ only in
   where the same four parts sit. Rows and columns are placed EXPLICITLY (auto-placement puts the
   points in the wrong cell as soon as a row is missing), and the row gap is zero — an absent
   chips or picks row would otherwise still charge for its gap. */
.rur {
  flex: 1;
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 0.5rem;
  text-align: left;
}
.rur-name { grid-area: 1 / 1 / 2 / 2; font-weight: 600; color: var(--text-primary); font-size: 0.95rem; line-height: 1.25; }
/* On the name's line, not centred down the tile, and holding the width of the copy/delete
   buttons standing over the corner beside it (RosterUnitList's .rul-acts, whose strip is
   --rul-acts-w wide). The first line is the only one that pays for them: the chips and the
   wargear below span BOTH columns and run the tile's full width. */
.rur-pts { grid-area: 1 / 2 / 2 / 3; align-self: start; padding-right: var(--rul-acts-w, 0); }
.rur-chips { grid-area: 2 / 1 / 3 / -1; margin-top: 0.2rem; }
.rur-picks { grid-area: 3 / 1 / 4 / -1; margin-top: 0.2rem; }
.rur-star { color: #e3b341; font-size: 0.8rem; margin-right: 0.15rem; }

.rur-chips { display: flex; flex-wrap: wrap; gap: 0.25rem; }
/* Same bordered chip as a wargear group's "up to 2" allowance (UnitEditorFields' .ues-cap). */
.rur-chip {
  padding: 0.05rem 0.35rem;
  border: 1px solid var(--border);
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}
.rur-chip.role { border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); color: var(--accent); }

.rur-picks { font-size: 0.72rem; color: var(--text-dim); line-height: 1.35; }
.rur-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); flex-shrink: 0; }

/* A narrow pane. The name takes the FULL width and the points move down beside the chips,
   because a points column costs the text line ~3rem of every row — which is what turned
   "Chaos Icon · Plasma pistol ×2 · Power fist · Combi-weapon ×2" into a twelve-line column.
   The reserve for the copy/delete buttons moves with them: the name's line is the one under
   them here, so it is the one that pays. Everything steps down together, so the row keeps its
   hierarchy instead of collapsing into one size. */
@container (max-width: 300px) {
  /* The padding keeps the name clear of the buttons horizontally; the min-height keeps the row
     BELOW it clear of them vertically, since a one-line name is shorter than their strip. */
  .rur-name { grid-area: 1 / 1 / 2 / -1; padding-right: var(--rul-acts-w, 3.4rem); min-height: 1.5rem; font-size: 0.85rem; }
  .rur-pts { grid-area: 2 / 2 / 3 / 3; align-self: end; padding-right: 0; font-size: 0.85rem; }
  .rur-chips { grid-area: 2 / 1 / 3 / 2; }
  .rur-picks { grid-area: 3 / 1 / 4 / -1; }
  .rur-chip { font-size: 0.62rem; padding: 0.05rem 0.25rem; }
  .rur-picks { font-size: 0.66rem; }
}
</style>
