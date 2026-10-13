// Self-hosted fonts + icon font, bundled so the app renders with its real typography fully
// offline: @fontsource per-weight CSS ships every subset (Cyrillic for RU, and the rest for the
// names players type) as hashed woff2 under /assets, and the installed app's warm-up fetches them
// all (vite.config.js, offline-manifest). That is why only faces the app actually DRAWS are here
// (2026-10-13, measured on the rendered pages; `npm run a11y`'s `face` check fails on a style that
// asks for one that is missing — the browser would quietly substitute):
//   Inter 400/500/600/700 — everything that is not a heading;
//   Sofia Sans Extra Condensed 400/500/700 — the display face (var(--font-display)): headings,
//     titles, the logo, stat plates;
//   EB Garamond 400 italic — lore flavour text only, always italic.
// No weight 800 anywhere (owner, 2026-10-13: the logo, labels and dark-theme bold are 700). The
// `.woff` fallbacks each @font-face also names are cut out at build time (vite.config.js,
// `woff2-only`): the app's floor is Safari 16, and five of them were small enough to be inlined
// into the CSS every visitor downloads.

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

import '@fontsource/eb-garamond/400-italic.css'

import '@fontsource/sofia-sans-extra-condensed/400.css'
import '@fontsource/sofia-sans-extra-condensed/500.css'
import '@fontsource/sofia-sans-extra-condensed/700.css'

import 'bootstrap-icons/font/bootstrap-icons.css'
