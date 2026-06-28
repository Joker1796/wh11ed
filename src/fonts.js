// Self-hosted fonts + icon font, bundled & precached by the PWA so the app renders with its
// real typography fully offline right after install (the previous Google Fonts / jsDelivr CDN
// links only cached on the first ONLINE visit). @fontsource per-weight CSS ships all subsets
// (incl. Cyrillic for RU) as hashed woff2 under /assets, which globPatterns precaches.
//
// Weights mirror the former Google Fonts request:
//   Inter 400/500/600/700/800 ; EB Garamond 400/600/700 + 400 italic.
// Sofia Sans Extra Condensed 500/600/700/800 is the display face (var(--font-display)) for ALL
// headings/titles across the app (h1–h4 + per-component titles) and the logo; EB Garamond
// stays only on lore flavor text. Ships full Cyrillic + digits, so RU and the numeric section
// numbers render correctly.

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'

import '@fontsource/eb-garamond/400.css'
import '@fontsource/eb-garamond/400-italic.css'
import '@fontsource/eb-garamond/600.css'
import '@fontsource/eb-garamond/700.css'

import '@fontsource/sofia-sans-extra-condensed/400.css'
import '@fontsource/sofia-sans-extra-condensed/500.css'
import '@fontsource/sofia-sans-extra-condensed/600.css'
import '@fontsource/sofia-sans-extra-condensed/700.css'
import '@fontsource/sofia-sans-extra-condensed/800.css'

import 'bootstrap-icons/font/bootstrap-icons.css'
