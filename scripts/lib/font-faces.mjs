// Font faces drawn but not loaded — run in the page (`page.evaluate(missingFaces)`), shared by
// `npm run a11y` (its `face` check, over a sample of public pages) and `npm run smoke` (the screens
// that need a list or a game to render: the roster editor, the tracker, print).
//
// src/fonts.js loads only the faces the app draws (2026-10-13: the installed app's warm-up fetches
// every subset of every loaded face). Asked for one that is not loaded — Sofia 600, an upright EB
// Garamond — the browser quietly draws the nearest one and nothing looks broken, so this reads
// what every visible text node is drawn in and compares it with what document.fonts holds.
// Weight decides for Inter and Sofia (an italic is synthesised); EB Garamond is loaded as italic
// only, so its style counts too.
//
// Returns [{ sig, face, text }], one per element signature and face.
/* global document, getComputedStyle */
export function missingFaces() {
  const OURS = /^(Inter|EB Garamond|Sofia Sans Extra Condensed)$/
  const keyOf = (family, weight, style) => `${family} ${weight}${family === 'EB Garamond' ? ` ${style}` : ''}`
  const loaded = new Set()
  for (const f of document.fonts) {
    const family = f.family.replace(/["']/g, '')
    if (OURS.test(family)) loaded.add(keyOf(family, f.weight, f.style))
  }
  const out = []
  const seen = new Set()
  for (const el of document.querySelectorAll('body *')) {
    const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim()
    if (!text || !el.getClientRects().length) continue
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none') continue
    const family = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim()
    if (!OURS.test(family)) continue
    const face = keyOf(family, cs.fontWeight, cs.fontStyle)
    if (loaded.has(face)) continue
    const sig = `${el.tagName.toLowerCase()}${[...el.classList].map((c) => `.${c}`).join('')}`
    if (seen.has(sig + face)) continue
    seen.add(sig + face)
    out.push({ sig, face, text: text.slice(0, 40) })
  }
  return out
}
