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
]
