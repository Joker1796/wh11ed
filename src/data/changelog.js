// Changelog / "What's New" — the source of truth for the update-notice banner AND the /changelog
// page. Bilingual, **newest entry first**: entry[0] is the latest release.
//
// HOW THE BANNER USES THIS: changelog.js ships inside the bundle, so `changelog[0].version` is always
// the newest note in the *currently running* build (it can never get ahead of the code). The banner
// shows when the visitor's stored "last seen version" differs from `changelog[0].version`; a
// first-ever visitor is seeded silently (no nag). See composables/useUpdateNotice.js.
//
// RELEASE PROCESS: when a deploy carries user-facing changes worth announcing, add a new entry at the
// TOP with the version it ships as (deploy.sh auto-bumps patch, so it's the next patch unless you
// bump manually) and a short EN/RU bullet list. Trivial/无-note deploys need no entry — they pass
// silently (the stored version advances without a banner). Keep bullets short and player-facing.

export const changelog = [
  {
    version: '2.0.24',
    date: '2026-07-23',
    en: [
      'Army-rule trackers: follow your faction’s army mechanic right in the game tracker — Blessings, Pain tokens, Rituals, Waaagh! and more, for 11 factions.',
      'Update notices: this “What’s New” page, with a banner that points here when a new version ships.',
    ],
    ru: [
      'Трекеры правил армии: отслеживайте механику своей фракции прямо в трекере партии — благословения, Pain tokens, ритуалы, Waaagh! и другое, для 11 фракций.',
      'Оповещения об обновлениях: эта страница «Что нового» и плашка, которая ведёт сюда при выходе новой версии.',
    ],
  },
]

// The latest entry drives the banner + the stored "last seen version". Exported so the composable
// and the view don't both hard-code `[0]`.
export const latestEntry = changelog[0] ?? null
