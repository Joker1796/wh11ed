// A motion token from style.css in milliseconds, for motion driven from script (rAF, Web
// Animations) rather than by a CSS transition. Read at the moment of use, so the one
// prefers-reduced-motion override that zeroes the tokens reaches these too: 0 means "don't animate".
export function motionMs(name) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const n = parseFloat(v)
  if (!n) return 0
  return v.endsWith('ms') ? n : n * 1000
}
