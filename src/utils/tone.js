// The custom properties `.tone` (style.css) reads to paint an element in a colour pair — a
// faction's own from factionsIndex.js, a Force Disposition's from data/dispositionColors.js — for
// the reader's theme. `undefined` for no colour, so the element keeps its fallback.
export function toneVars(color) {
  return color ? { '--tone-light': color.light, '--tone-dark': color.dark } : undefined
}
