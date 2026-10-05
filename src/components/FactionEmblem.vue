<template>
  <span
    v-if="icon"
    class="faction-emblem"
    :class="{ 'in-title': inTitle, stamp }"
    aria-hidden="true"
    :style="style"
  />
</template>

<script setup>
// A faction's emblem (a one-colour SVG under /images/faction-icons/, listed with its shape in the
// generated factionIcons.js) drawn as a mask filled with the text colour around it, so it takes
// the faction's tone and the theme like the letters beside it do, and the SVG stays one
// runtime-cached file rather than markup in every chunk. Nothing when the faction has none.
// Decorative: the faction's name always stands next to it. The parent sets its size, or its height
// alone where the box takes the emblem's own shape (`--ratio`); the drawing keeps its proportions
// inside the box either way.
import { computed } from 'vue'
import { factionIcons } from '../data/factionIcons.js'

const props = defineProps({
  // An entry of factionsIndex.js (or anything with its `slug`).
  faction: { type: Object, default: null },
  // Before a page's title: sized to its letters, in the page's accent (the faction's colour there).
  inTitle: { type: Boolean, default: false },
  // Pressed into a card's right side, faint and about the card's size, so it reads as a stamp
  // rather than an icon. The card clips it and paints over it: it needs a containing block,
  // clipping and its own stacking context (`contain: paint` gives all three), and a `--tone`.
  stamp: { type: Boolean, default: false },
})

const icon = computed(() => factionIcons[props.faction?.slug] || null)

// A stamp's height, in card heights. Every emblem gets the same amount of colour on the card
// rather than the same height: Chaos Daemons' thin star covers 0.14 of its square and T'au's disc
// 0.57, so at one height the one vanished and the other was a blot (2026-09-29, owner). The height
// that puts INK on the card is √(INK / ink); the bounds keep a banner (Astra Militarum) from
// shrinking to a strip and a fine one from swallowing the card.
const INK = 0.5
const MIN_H = 0.55
const MAX_H = 1.25
const stampHeight = (ink) => Math.min(MAX_H, Math.max(MIN_H, Math.sqrt(INK / ink)))

const style = computed(() => {
  const i = icon.value
  const out = { '--icon': `url(${i.src})`, '--ratio': i.ratio }
  if (props.stamp) {
    const k = stampHeight(i.ink)
    out['--stamp-h'] = `${Math.round(k * 100)}%` // of the card
    out['--stamp-k'] = k.toFixed(2) // for a card that sizes it on a length of its own
  }
  return out
})
</script>

<style scoped>
.faction-emblem {
  display: inline-block;
  flex-shrink: 0;
  background: currentColor;
  -webkit-mask: var(--icon) center / contain no-repeat;
  mask: var(--icon) center / contain no-repeat;
}
/* Taller than the letters, but it takes only a line's height (the negative margins), so the title
   and everything under it stay where they were: it spills into the hero's padding above and a
   hair of the gap below, lifted so most of the spill goes up, where the room is. */
.in-title {
  position: relative;
  top: -0.1em;
  height: 1.4em;
  aspect-ratio: var(--ratio);
  max-width: 3em; /* a banner-wide emblem (Astra Militarum, 3.3:1) shrinks in the box instead */
  margin: -0.2em 0;
  color: var(--accent-ink);
}
/* Every stamp's centre on one spot — about a card's height in from the right edge — so a column of
   cards reads as one line of emblems: a wide one runs off the edge by itself, a narrow one stands
   clear of it, and neither is placed by hand. */
.stamp {
  position: absolute;
  z-index: -1;
  right: 3.8rem;
  top: 50%;
  height: var(--stamp-h);
  aspect-ratio: var(--ratio);
  transform: translate(50%, -50%);
  color: var(--tone, var(--accent));
  opacity: 0.16;
  pointer-events: none;
}
</style>
