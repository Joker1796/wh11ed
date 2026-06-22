// Self-hosted fonts + icon font, bundled & precached by the PWA so the app renders with its
// real typography fully offline right after install (the previous Google Fonts / jsDelivr CDN
// links only cached on the first ONLINE visit). @fontsource per-weight CSS ships all subsets
// (incl. Cyrillic for RU) as hashed woff2 under /assets, which globPatterns precaches.
//
// Weights mirror the former Google Fonts request:
//   Inter 400/500/600/700/800 ; EB Garamond 400/600/700 + 400 italic.

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'

import '@fontsource/eb-garamond/400.css'
import '@fontsource/eb-garamond/400-italic.css'
import '@fontsource/eb-garamond/600.css'
import '@fontsource/eb-garamond/700.css'

import 'bootstrap-icons/font/bootstrap-icons.css'
