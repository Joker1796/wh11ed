// Generates the PWA / home-screen icons from the site's "W" brand mark
// (a light W on the dark #242428 square — same look as public/favicon.svg).
//
// Output (committed into public/):
//   pwa-192.png, pwa-512.png        — standard icons (purpose: any)
//   maskable-512.png                — full-bleed bg, W within the maskable safe zone
//   apple-touch-icon.png (180x180)  — iOS home screen (iOS rounds corners itself)
//
// Usage: npm run icons

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const BG = '#242428'
const FG = '#f0ede8'

// `fontRatio` = W height as a fraction of the canvas. Keep ≤0.6 so the glyph
// stays inside the maskable safe zone (central 80%).
const markSvg = fontRatio =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
     <rect width="512" height="512" fill="${BG}"/>
     <text x="256" y="256" text-anchor="middle" dominant-baseline="central"
           font-family="Georgia, 'EB Garamond', 'Times New Roman', serif"
           font-size="${Math.round(512 * fontRatio)}" font-weight="700" fill="${FG}">W</text>
   </svg>`

const render = (svg, size, name) =>
  sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(PUBLIC, name))

// "any" icons + apple-touch: a touch more breathing room (0.56)
// maskable: smaller glyph (0.5) to stay clear of the mask crop
await render(markSvg(0.56), 192, 'pwa-192.png')
await render(markSvg(0.56), 512, 'pwa-512.png')
await render(markSvg(0.5), 512, 'maskable-512.png')
await render(markSvg(0.56), 180, 'apple-touch-icon.png')

console.log('Wrote pwa-192.png, pwa-512.png, maskable-512.png, apple-touch-icon.png to public/')
