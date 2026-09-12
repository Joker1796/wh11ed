// The Wahapedia-style per-faction accent: a slug in, the two private custom properties out.
//
// `factionsIndex.js` carries each faction's light/dark pair; a screen exposes them as `--fa-light`
// / `--fa-dark` on its own root and its scoped CSS folds them into `--accent` per theme (the
// `.themed` class). The recipe is three lines, which is why five screens had grown their own copy
// of it — and two of those copies also rebuilt `factionIndexBySlug` out of a `flatMap` first.
//
// The CSS half stays with each screen: what `--accent` means inside it (which elements take it,
// how it behaves on a dark surface) is that screen's business. Only the lookup is shared.

import { computed } from 'vue'
import { factionIndexBySlug } from '../data/factionsIndex.js'

// `slug` — a ref/computed of the faction slug (may read null/'' before one is picked).
export function useFactionAccent(slug) {
  const faction = computed(() => factionIndexBySlug(slug.value) || null)
  const factionName = computed(() => faction.value?.name || '')
  const color = computed(() => faction.value?.color || null)
  // `undefined` rather than `{}` when there is no faction yet: `:style` skips it either way, and
  // this says "nothing to apply" rather than "an empty set of properties to apply".
  const accentStyle = computed(() => (color.value
    ? { '--fa-light': color.value.light, '--fa-dark': color.value.dark }
    : undefined))

  return { faction, factionName, color, accentStyle }
}
