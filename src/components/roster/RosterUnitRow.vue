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
  <span class="rur-text">
    <span class="rur-name">
      <i v-if="entry.warlord" class="bi bi-star-fill rur-star"></i>
      {{ def?.name || entry.id }}
    </span>
    <span v-if="chips.length" class="rur-chips">
      <span v-for="c in chips" :key="c.key" class="rur-chip" :class="{ role: c.role }">{{ c.text }}</span>
    </span>
    <span v-if="picks.length" class="rur-picks">{{ picks.join(' · ') }}</span>
  </span>
  <span class="rur-pts">{{ points }}</span>
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
.rur-text { display: flex; flex-direction: column; flex: 1; min-width: 0; gap: 0.2rem; text-align: left; }
.rur-name { font-weight: 600; color: var(--text-primary); font-size: 0.95rem; line-height: 1.25; }
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

/* The narrowest phones, where the list shares its width with the catalogue. Everything steps
   down together so the row keeps its hierarchy instead of collapsing into one size. */
@media (max-width: 380px) {
  .rur-name { font-size: 0.85rem; }
  .rur-chip { font-size: 0.62rem; padding: 0.05rem 0.25rem; }
  .rur-picks { font-size: 0.66rem; }
  .rur-pts { font-size: 0.85rem; }
}
</style>
