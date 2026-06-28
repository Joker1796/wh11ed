// Shared brand-mark helper for the icon/splash/screenshot generators.
//
// The "W" (and the WH11ED wordmark) is rendered from the real display font
// (Sofia Sans Extra Condensed 800 — same as var(--font-display) for headings)
// rather than a system serif. sharp/librsvg can't reliably find the @fontsource
// woff by family name, so we extract the glyph outlines with opentype.js and emit
// a plain <path>. That makes the output font-independent and fully reproducible
// from node_modules (no system font install needed).

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import opentype from 'opentype.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const FONT_FILE = join(
  HERE,
  '..',
  '..',
  'node_modules/@fontsource/sofia-sans-extra-condensed/files/sofia-sans-extra-condensed-latin-800-normal.woff',
)

const buf = readFileSync(FONT_FILE)
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))

// Returns an SVG <path> for `text`, scaled so its glyph bounding box is `height`
// px tall and its centre sits at (cx, cy). `height` is the actual ink height of
// the string, so sizing is predictable regardless of the font's metrics.
// `tracking` adds letter-spacing as a fraction of the em.
//
// Composed glyph-by-glyph via charToGlyph (a direct cmap lookup) instead of
// font.getPath(string): the latter runs GSUB feature shaping, and opentype.js
// can't handle this font's ccmp lookup format (throws on multi-glyph strings).
export function textPath({ text, cx, cy, height, fill, tracking = 0 }) {
  const BASE = 1000
  const scale = BASE / font.unitsPerEm
  const master = new opentype.Path()
  let penX = 0
  for (const ch of text) {
    const glyph = font.charToGlyph(ch)
    master.extend(glyph.getPath(penX, 0, BASE))
    penX += (glyph.advanceWidth + tracking * font.unitsPerEm) * scale
  }
  const bb = master.getBoundingBox()
  const s = height / (bb.y2 - bb.y1)
  const tx = cx - s * ((bb.x1 + bb.x2) / 2)
  const ty = cy - s * ((bb.y1 + bb.y2) / 2)
  return `<path transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(5)})" d="${master.toPathData(2)}" fill="${fill}"/>`
}
