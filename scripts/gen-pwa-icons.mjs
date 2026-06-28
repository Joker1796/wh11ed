// Generates the PWA / home-screen icons + favicon.svg from the site's "W" brand
// mark (a light W on the dark #242428 square — same look as the headings, now in
// the display font Sofia Sans Extra Condensed via scripts/lib/w-mark.mjs).
//
// Output (committed into public/):
//   favicon.svg                     — browser-tab icon (rounded square + W path)
//   pwa-192.png, pwa-512.png        — standard icons (purpose: any)
//   maskable-512.png                — full-bleed bg, W within the maskable safe zone
//   apple-touch-icon.png (180x180)  — iOS home screen (iOS rounds corners itself)
//
// Usage: npm run icons

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'
import { textPath } from './lib/w-mark.mjs'

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const BG = '#242428'
const FG = '#f0ede8'

// `heightRatio` = W ink height as a fraction of the canvas. Keep ≤0.5 for the
// maskable variant so the glyph stays inside the maskable safe zone (central 80%).
const markSvg = heightRatio =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
     <rect width="512" height="512" fill="${BG}"/>
     ${textPath({ text: 'W', cx: 256, cy: 256, height: 512 * heightRatio, fill: FG })}
   </svg>`

const render = (svg, size, name) =>
  sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(PUBLIC, name))

// "any" icons + apple-touch: a touch more breathing room (0.5)
// maskable: smaller glyph (0.42) to stay clear of the mask crop
await render(markSvg(0.5), 192, 'pwa-192.png')
await render(markSvg(0.5), 512, 'pwa-512.png')
await render(markSvg(0.42), 512, 'maskable-512.png')
await render(markSvg(0.5), 180, 'apple-touch-icon.png')

// favicon.svg — rounded square + bordered, W from the same display-font path.
const favicon = `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="60" height="60" rx="12" fill="${BG}" stroke="#555" stroke-width="2"/>
  ${textPath({ text: 'W', cx: 32, cy: 32, height: 32, fill: FG })}
</svg>
`
await writeFile(join(PUBLIC, 'favicon.svg'), favicon)

console.log('Wrote favicon.svg, pwa-192.png, pwa-512.png, maskable-512.png, apple-touch-icon.png to public/')
