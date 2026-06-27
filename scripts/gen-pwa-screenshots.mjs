// Generates branded PWA `screenshots` for the install dialog (Chrome/Android
// show a richer, app-like install UI when screenshots are present).
//
// These are brand cards (dark #242428 + "W" mark + title), not real UI captures
// — there's no headless browser in the toolchain. They're manifest-valid and
// look clean; swap in real captures later if desired.
//
// Output (committed into public/):
//   screenshot-wide.png    1280x720  (form_factor: wide  — desktop install)
//   screenshot-narrow.png  720x1280  (form_factor: narrow — mobile install)
//
// Usage: npm run screenshots

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const BG = '#242428'
const FG = '#f0ede8'
const MUTED = '#a9a99c'
const ACCENT = '#6e0008'

const card = (w, h) => {
  const cx = w / 2
  const mark = Math.round(Math.min(w, h) * 0.26)
  const title = Math.round(Math.min(w, h) * 0.072)
  const sub = Math.round(Math.min(w, h) * 0.038)
  const markY = h * 0.42
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="${BG}"/>
    <rect x="0" y="0" width="${w}" height="${Math.round(h * 0.012)}" fill="${ACCENT}"/>
    <text x="${cx}" y="${markY}" text-anchor="middle" dominant-baseline="central"
          font-family="Georgia, 'EB Garamond', 'Times New Roman', serif"
          font-size="${mark}" font-weight="700" fill="${FG}">W</text>
    <text x="${cx}" y="${h * 0.68}" text-anchor="middle"
          font-family="Georgia, 'EB Garamond', serif" font-size="${title}"
          font-weight="700" fill="${FG}" letter-spacing="2">WH11ED</text>
    <text x="${cx}" y="${h * 0.75}" text-anchor="middle"
          font-family="'Helvetica Neue', Arial, sans-serif" font-size="${sub}"
          fill="${MUTED}">Warhammer 40,000 — Core Rules 11th Edition</text>
  </svg>`
}

const render = (w, h, name) =>
  sharp(Buffer.from(card(w, h))).png().toFile(join(PUBLIC, name))

await render(1280, 720, 'screenshot-wide.png')
await render(720, 1280, 'screenshot-narrow.png')

console.log('Wrote screenshot-wide.png, screenshot-narrow.png to public/')
