// Generates iOS launch screens (apple-touch-startup-image). Without these, an
// installed PWA on iOS shows a blank screen while loading. Each is a solid
// #242428 canvas with the centred "W" mark — matching the icons / splash brand.
//
// Output: public/splash/apple-splash-<W>-<H>.png (one per device resolution, in
// device pixels). The matching <link rel="apple-touch-startup-image"> media
// queries live in index.html — keep the DEVICES list here in sync with them.
//
// Usage: npm run splash

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'
import { textPath } from './lib/w-mark.mjs'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'splash')
const BG = '#242428'
const FG = '#f0ede8'

// Modern iPhones: [cssWidth, cssHeight, devicePixelRatio]. Image = css * ratio.
const DEVICES = [
  [375, 667, 2], // SE 2/3, 8
  [414, 896, 2], // 11, XR
  [375, 812, 3], // X, XS, 11 Pro, 12 mini, 13 mini
  [390, 844, 3], // 12, 12 Pro, 13, 13 Pro, 14
  [393, 852, 3], // 14 Pro, 15, 15 Pro, 16
  [428, 926, 3], // 12/13/14 Pro Max
  [430, 932, 3], // 14 Pro Max, 15 Plus/Pro Max, 16 Plus
]

const splash = (w, h) => {
  const mark = Math.round(Math.min(w, h) * 0.22)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="${BG}"/>
    ${textPath({ text: 'W', cx: w / 2, cy: h / 2, height: mark, fill: FG })}
  </svg>`
}

await mkdir(OUT, { recursive: true })
for (const [cw, ch, r] of DEVICES) {
  const w = cw * r
  const h = ch * r
  await sharp(Buffer.from(splash(w, h))).png().toFile(join(OUT, `apple-splash-${w}-${h}.png`))
}

console.log(`Wrote ${DEVICES.length} splash images to public/splash/`)
