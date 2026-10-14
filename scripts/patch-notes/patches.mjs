// Every GW update the patch-notes page knows, oldest first — one line per release that reached
// this site. A data bump (the appdata-update skill) adds its line here and re-runs
// `npm run patches`; nothing else is hand-written.
//
//   id       the page's key for it, and its file (src/data/patches/<id>.json)
//   date     the day it reached this site (GW's own dates sit on the publications themselves)
//   app      [from, to] wh40k-appdata commits of factions/ — the app's rules data
//   mfm      [from, to] wh11ed commits of src/data/mfm — the Munitorum Field Manual's points
//   faq      [from, to] wh11ed commits of src/data/factionFaq.json — FAQ & errata
//   labels   what the page names it: the app's data version, the MFM version
//
// The MFM pairs skip our own commits between two versions on purpose: `53fdeff` (Legends points,
// scraped 2026-09-18) is v1.4 with the Legends section added, so v1.4 → v1.5 starts there —
// starting at `e732123` would report every Legends unit as new in v1.5. The FAQ before 931 is
// the file as first generated (`57269e5`, data 912/913); it was not regenerated for 913 or 925.
export const PATCHES = [
  { id: '909', date: '2026-07-22', app: ['512589c', '9d8c072'], labels: { app: 909 } },
  { id: '912', date: '2026-07-23', app: ['9d8c072', '49b80b6'], labels: { app: 912 } },
  { id: '913', date: '2026-07-28', app: ['49b80b6', 'f26b166'], labels: { app: 913 } },
  // noTags: the file before b4f3e89 carried World Eaters' ONSLAUGHT from a source we can no longer
  // name, and the MFM never printed it (DATA-SYNC §3) — its going is not GW's news.
  { id: 'mfm-1.1', date: '2026-07-29', mfm: ['b4f3e89^', 'b4f3e89'], noTags: true, labels: { mfm: '1.1' } },
  { id: '925', date: '2026-08-05', app: ['f26b166', '40f33fa'], labels: { app: 925 } },
  { id: 'mfm-1.2', date: '2026-08-15', mfm: ['b4f3e89', '77f9a1d'], labels: { mfm: '1.2' } },
  { id: '931', date: '2026-08-26', app: ['40f33fa', '97ad2ed'], mfm: ['77f9a1d', 'd8da648'], faq: ['57269e5', 'd8da648'], labels: { app: 931, mfm: '1.3' } },
  { id: '946', date: '2026-09-02', app: ['97ad2ed', 'c4b1ae0'], mfm: ['d8da648', 'e732123'], faq: ['d8da648', 'a02ba57'], labels: { app: 946, mfm: '1.4' } },
  { id: '963', date: '2026-09-30', app: ['c4b1ae0', '7f90e96'], mfm: ['53fdeff', '8ae2a2b'], faq: ['a02ba57', '8ae2a2b'], labels: { app: 963, mfm: '1.5' } },
  // GW re-priced Space Marines and removed five detachment tags on 2 October without a new MFM
  // version, alongside app v2.7.1. The MFM pair starts at `619ce29`, our own disposition fix of
  // 1 October, so that fix is not reported as GW's.
  { id: '972', date: '2026-10-02', app: ['7f90e96', '53eabea'], mfm: ['619ce29', '791a175'], labels: { app: 972, mfm: '1.5' } },
  // App 2.8.0 (Codex: Adeptus Custodes) and MFM v1.6.
  { id: '981', date: '2026-10-14', app: ['53eabea', '5cf9504'], mfm: ['c9929eb', '2aabe2d'], faq: ['8ae2a2b', '2aabe2d'], labels: { app: 981, mfm: '1.6' },
    // What looks like GW's mistake in this update; the site follows the app word for word for now
    // (owner, 2026-10-14) and says so here and in the 2.8.3 changelog.
    doubts: [
      { faction: 'blood-angels', kind: 'datasheet', name: 'Death Company Captain',
        note: { en: 'Probably a GW mistake: the power fist went from a Captain’s A6 WS2+ to a rank-and-file A3 WS3+ (the Relic Weapon on the same sheet is A7 WS2+). We follow the app for now.',
          ru: 'Вероятно, ошибка GW: power fist стал как у рядового, A3 WS3+ вместо капитанских A6 WS2+ (у Relic Weapon на том же листе A7 WS2+). Пока следуем приложению.' } },
      { faction: 'space-wolves', kind: 'faq', name: 'Bjorn the Fell-handed',
        note: { en: 'Probably a GW mistake: the errata names no weapon, and the datasheet in the app still has the Assault Cannon at BS 3+. We follow the datasheet for now.',
          ru: 'Вероятно, ошибка GW: эррата не называет оружие, а в датащите приложения у Assault Cannon по-прежнему BS 3+. Пока следуем датащиту.' } },
      { faction: 'adeptus-custodes', kind: 'points', name: 'Shield-Captain',
        note: { en: 'The app also charges 25 points for the Pyrithite Spear and Praesidium Shield he starts with (205 in all) — possibly a GW mistake. Points here follow the MFM: 180.',
          ru: 'Приложение берёт ещё 25 очков за стартовые Pyrithite Spear и Praesidium Shield (всего 205) — возможно, ошибка GW. Очки на сайте идут по MFM: 180.' } },
    ],
    // GW's update document says its changes are in the app; this one is not (the app merged it
    // with the Librarian in Terminator Armour's line). Applied from the PDF — appdata-exceptions.mjs.
    docs: [
      { title: { en: 'Space Marines — Printed Product Updates v1.1', ru: 'Space Marines — Printed Product Updates v1.1' },
        url: 'https://assets.warhammer-community.com/eng_14-10_wh40k_printed_product_updates_space_marines_updates-91hillwcff-wzs8qnozam.pdf',
        items: [{ faction: 'space-marines', kind: 'datasheet', name: 'Kayvaan Shrike', change: 'changed', fields: [{ field: 'keywords', added: ['Epic Hero'], removed: [] }],
          doubt: { en: 'The document adds CHARACTER and EPIC HERO; the app took in only CHARACTER. The site follows the document.',
            ru: 'Документ добавляет CHARACTER и EPIC HERO, в приложение попал только CHARACTER. Сайт следует документу.' } }] },
      // The Faction Packs carry the Legends datasheets the app does not; v1.4 added FRAME to two.
      { title: { en: 'Faction Pack: Adepta Sororitas v1.4', ru: 'Faction Pack: Adepta Sororitas v1.4' },
        url: 'https://assets.warhammer-community.com/eng_14-10_wh40k_-faction_pack_adepta_sororitas-kby0nywexj-dg7kvr3iiy.pdf',
        items: ['Repressor', 'Battle Sanctum'].map((name) => ({ faction: 'adepta-sororitas', kind: 'datasheet', name, change: 'changed', fields: [{ field: 'keywords', added: ['Frame'], removed: [] }] })) },
    ] },
]
