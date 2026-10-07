// Where wh11ed knowingly departs from wh40k-appdata — the one list of them.
//
// appdata is the canon (src/data/CLAUDE.md), and almost always the right one. But GW's app has its
// own errors, and when a printed source proves one, we print the right thing. The danger is not in
// the departure, it is in losing track of it, both ways:
//   • the exception is lost: the next codex regenerates the sheet from appdata (gen-datasheets) and
//     the error comes back, and nothing says so — we now match appdata, so no audit finds a thing;
//   • the exception outlives the error: GW fixes it, or changes the same rule for real, and we keep
//     printing our old correction over the new text.
// Before this file, the two wargear typos below lived only as sync-baseline entries — which keep a
// finding quiet but neither survive a regeneration nor tell a fix from a change.
//
// So every departure is written here ONCE, as a patch to appdata's own data, and:
//   • `loadAppdataBundle()` applies it — gen-datasheets builds the sheet from the patched data, and
//     sync-appdata / sync-faction-text compare against it, so the exception is neither regenerated
//     away nor reported as drift;
//   • `checkAppdataExceptions()` (gate `npm run exceptions`, run by `npm run sync`) reads appdata
//     RAW and fails when the error we patch is no longer there (GW fixed or changed it: re-read and
//     drop or update the entry), and when our data no longer carries the correction.
//
// An entry needs a `why` and a `source` a person can open. "appdata looks odd" is not a source; the
// decision to depart is the owner's (memory: appdata is canon; ask before overriding it).
//
// Kinds:
//   weapon-profile — appdata's wargear item lost a profile: `add` is the profile, in appdata's own
//                    shape, put first on the item (standard before supercharge, as printed); `expect` is the item's profile names as appdata
//                    has them now.
//   wargear-rule   — a typo in a wargear option: `from` must occur in appdata's text, `to` replaces
//                    it; `ours` is the corrected option as our sheet prints it.
//   enhancement-text — an enhancement GW's errata rewrote and appdata still prints the old way:
//                    `detachment` + `enhancement` name it, `from` must occur in appdata's rules
//                    text, `to` is the whole new text (appdata's own markup), `ours` must occur in
//                    the enhancement's body in src/data/factions/<slug>.js.
//   weapon-stat    — one characteristic of a weapon appdata prints wrong on several sheets of one
//                    faction: `item` names the wargear item, `field` the characteristic in appdata's
//                    spelling (AP, S…), `from` what appdata has on every listed sheet, `to` ours.
//   core-rule-text — a Core Rules errata appdata's own rule text has not taken in: `num` names the
//                    rule in factions/_core-rules.json (slug '_core-rules'), `from` must occur in its
//                    text (appdata's markup), `ours` must occur in src/data/<file>. Core Rules are
//                    transcribed, not generated, so nothing is patched — the gate only keeps watch.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { APPDATA, ROOT, SLUG_MAP, loadJson, norm } from './sync-common.mjs'

export const APPDATA_EXCEPTIONS = [
  {
    id: 'sm-vanguard-jump-plasma-standard',
    kind: 'weapon-profile',
    slug: 'space-marines',
    datasheet: 'Vanguard Veteran Squad with Jump Packs',
    item: 'Plasma pistol',
    expect: ['Supercharge'],
    add: { name: 'Standard', type: 'ranged', range: '12"', A: '1', BS: '3+', S: '7', AP: '-2', D: '1', tags: ['CLOSE-QUARTERS'] },
    ours: 'Plasma pistol – standard',
    why: 'The 963 app lost the standard profile on this sheet only (946 had both; every other plasma pistol in Codex: Space Marines still has both). A player reported it 2026-10-01.',
    source: 'Codex: Space Marines (11th edition), p. 51 — sources/Space Marine Codex - 11th Edition.pdf',
  },
  {
    id: 'am-catachan-medipack-typo',
    kind: 'wargear-rule',
    slug: 'astra-militarum',
    datasheet: 'Catachan Command Squad',
    from: 'can be equipped 1 medi',
    to: 'can be equipped with 1 medi',
    ours: 'can be equipped with 1 medi-pack',
    why: 'appdata typo: "can be equipped 1 medi-pack" (missing "with").',
    source: 'every other "can be equipped with 1 …" option in appdata',
  },
  {
    id: 'sm-kratos-lascannonss-a',
    kind: 'wargear-rule',
    slug: 'space-marines',
    datasheet: 'Kratos',
    from: '2 Lascannonss, 2 Volkite Calivers',
    to: '2 Lascannons, 2 Volkite Calivers',
    ours: '2 Lascannons, 2 Volkite Calivers',
    why: 'appdata typo "Lascannonss": the roster generator could not resolve the item, so the whole group lost its "2 of each" counts (an audit, 2026-10-07).',
    source: 'the item is "Lascannon"; the sister option on the same sheet and every other sheet write "Lascannons"',
  },
  {
    id: 'sm-kratos-lascannonss-b',
    kind: 'wargear-rule',
    slug: 'space-marines',
    datasheet: 'Kratos',
    from: '2 Lascannonss, 2 Volkite Culverins',
    to: '2 Lascannons, 2 Volkite Culverins',
    ours: '2 Lascannons, 2 Volkite Culverins',
    why: 'the same typo in the Kratos\'s second heavy-bolter swap.',
    source: 'as sm-kratos-lascannonss-a',
  },
  {
    id: 'csm-raptors-up-to-typo',
    kind: 'wargear-rule',
    slug: 'chaos-space-marines',
    datasheet: 'Raptors',
    from: 'up 2 Raptors',
    to: 'up to 2 Raptors',
    ours: 'up to 2 Raptors',
    why: 'appdata typo: "up 2 Raptors" (missing "to").',
    source: 'every other "For every 5 models in this unit, up to 2 …" option in appdata',
  },
  {
    id: 'ia-intraneural-biotech-errata',
    kind: 'enhancement-text',
    slug: 'imperial-agents',
    detachment: 'Veiled Blade Elimination Force',
    enhancement: 'Intraneural Biotech',
    from: 'Heroic Intervention or Counter‑offensive Stratagem for 0CP',
    to: '**EVERSOR ASSASSIN** model only. You can target this unit with the Heroic Intervention Stratagem, regardless of any other uses of that Stratagem this phase. If you do:\n■ That use is -1 CP.\n■ That use does not prevent any uses of that Stratagem on other units this phase.',
    ours: 'That use is -1 CP',
    why: 'The Codex: Imperial Agents errata of 30 September 2026 rewrote the enhancement; appdata 972 keeps the old card (0 CP, Heroic Intervention or Counter-offensive) while its own detachment rule already prints the new wording.',
    source: 'Warhammer 40,000: The App 2.7.1 → Codex: Imperial Agents → Updates & Errata, "Veiled Blade Elimination Force Detachment, Intraneural Biotech enhancement" (checked 2026-10-03)',
  },
  {
    id: 'csm-combi-weapon-ap',
    kind: 'weapon-stat',
    slug: 'chaos-space-marines',
    item: 'Combi-weapon',
    field: 'AP',
    from: '1',
    to: '-1',
    datasheets: ['Chaos Land Raider', 'Chaos Predator Annihilator', 'Chaos Predator Destructor', 'Chaos Rhino', 'Chaos Terminator Squad', 'Chaos Vindicator', 'Chosen', 'Sorcerer in Terminator Armour'],
    why: 'appdata prints AP "1" (a positive AP does not exist); the errata that changed this weapon prints AP-1.',
    source: 'Codex errata of 30 September 2026 (the "Change the following weapon characteristics" tables), Warhammer 40,000: The App → Codex → Updates & Errata; in appdata tables/faq.json',
  },
  {
    id: 'dg-combi-weapon-ap',
    kind: 'weapon-stat',
    slug: 'death-guard',
    item: 'Combi-weapon',
    field: 'AP',
    from: '1',
    to: '-1',
    datasheets: ['Blightlord Terminators', 'Chaos Land Raider', 'Chaos Predator Annihilator', 'Chaos Predator Destructor', 'Chaos Rhino'],
    why: 'appdata prints AP "1" (a positive AP does not exist); the errata that changed this weapon prints AP-1.',
    source: 'Codex errata of 30 September 2026 (the "Change the following weapon characteristics" tables), Warhammer 40,000: The App → Codex → Updates & Errata; in appdata tables/faq.json',
  },
  {
    id: 'ec-combi-weapon-ap',
    kind: 'weapon-stat',
    slug: 'emperors-children',
    item: 'Combi-weapon',
    field: 'AP',
    from: '1',
    to: '-1',
    datasheets: ['Chaos Land Raider', 'Chaos Rhino', 'Chaos Terminators'],
    why: 'appdata prints AP "1" (a positive AP does not exist); the errata that changed this weapon prints AP-1.',
    source: 'Codex errata of 30 September 2026 (the "Change the following weapon characteristics" tables), Warhammer 40,000: The App → Codex → Updates & Errata; in appdata tables/faq.json',
  },
  {
    id: 'gk-storm-bolter-ap',
    kind: 'weapon-stat',
    slug: 'grey-knights',
    item: 'Storm Bolter',
    field: 'AP',
    from: '1',
    to: '-1',
    datasheets: ['Brother-Captain', 'Brotherhood Chaplain', 'Brotherhood Librarian', 'Castellan Crowe', 'Grand Master', 'Grand Master Voldus', 'Paladin Squad', 'Purgation Squad'],
    why: 'appdata prints AP "1" (a positive AP does not exist); the errata that changed this weapon prints AP-1.',
    source: 'Codex errata of 30 September 2026 (the "Change the following weapon characteristics" tables), Warhammer 40,000: The App → Codex → Updates & Errata; in appdata tables/faq.json',
  },
  {
    id: 'gk-combi-weapon-ap',
    kind: 'weapon-stat',
    slug: 'grey-knights',
    item: 'Combi-weapon',
    field: 'AP',
    from: '1',
    to: '-1',
    datasheets: ['Brotherhood Librarian'],
    why: 'appdata prints AP "1" (a positive AP does not exist); the errata that changed this weapon prints AP-1.',
    source: 'Codex errata of 30 September 2026 (the "Change the following weapon characteristics" tables), Warhammer 40,000: The App → Codex → Updates & Errata; in appdata tables/faq.json',
  },
  {
    id: 'we-combi-bolter-ap',
    kind: 'weapon-stat',
    slug: 'world-eaters',
    item: 'Combi-bolter',
    field: 'AP',
    from: '1',
    to: '-1',
    datasheets: ['Chaos Land Raider', 'Chaos Predator Annihilator', 'Chaos Predator Destructor', 'Chaos Rhino', 'Chaos Terminators', 'Helbrute'],
    why: 'appdata prints AP "1" (a positive AP does not exist); the errata that changed this weapon prints AP-1.',
    source: 'Codex errata of 30 September 2026 (the "Change the following weapon characteristics" tables), Warhammer 40,000: The App → Codex → Updates & Errata; in appdata tables/faq.json',
  },
  {
    id: 'we-combi-weapon-ap',
    kind: 'weapon-stat',
    slug: 'world-eaters',
    item: 'Combi-weapon',
    field: 'AP',
    from: '1',
    to: '-1',
    datasheets: ['Chaos Land Raider', 'Chaos Predator Annihilator', 'Chaos Predator Destructor', 'Chaos Rhino', 'Chaos Terminators'],
    why: 'appdata prints AP "1" (a positive AP does not exist); the errata that changed this weapon prints AP-1.',
    source: 'Codex errata of 30 September 2026 (the "Change the following weapon characteristics" tables), Warhammer 40,000: The App → Codex → Updates & Errata; in appdata tables/faq.json',
  },
  {
    id: 'we-bolt-pistol-ap',
    kind: 'weapon-stat',
    slug: 'world-eaters',
    item: 'Bolt pistol',
    field: 'AP',
    from: '1',
    to: '-1',
    datasheets: ['Khorne Berzerkers', 'Lord Invocatus', 'Master of Executions'],
    why: 'appdata prints AP "1" (a positive AP does not exist); the errata that changed this weapon prints AP-1.',
    source: 'Codex errata of 30 September 2026 (the "Change the following weapon characteristics" tables), Warhammer 40,000: The App → Codex → Updates & Errata; in appdata tables/faq.json',
  },
  {
    id: 'core-consolidation-ongoing-errata',
    kind: 'core-rule-text',
    slug: '_core-rules',
    num: '12.08',
    from: 'must still be <b>engaged</b> with that enemy unit.</li><li><b>Engaging Consolidation',
    file: 'battleRound.js',
    ours: 'that enemy unit. If one or more enemy units **engaged** with your unit have not been **selected to fight** this phase',
    why: 'The Core Rules errata of 26 August 2026 gives Ongoing Consolidation\'s After Moving the same "your opponent must select each of those units" sentence Engaging Consolidation has; appdata 931–972 keeps the old one-sentence line.',
    source: 'Warhammer 40,000: The App → Core Rules → Updates & Errata, "12.08 - Consolidation Move, After Moving Section, Ongoing Consolidation" (in appdata tables/faq.json since 931; checked 2026-10-03)',
  },
]

const appSlugOf = (slug) => SLUG_MAP[slug] || slug
const bundlePath = (appSlug) => path.join(APPDATA, 'factions', `${appSlug}.json`)
const sheetOf = (bundle, name) => (bundle?.datasheets || []).find((d) => norm(d.name) === norm(name))
const itemOf = (ds, name) => (ds?.wargear || []).find((w) => norm(w.name) === norm(name))
const enhOf = (bundle, e) => (bundle?.detachments || []).find((d) => norm(d.name) === norm(e.detachment))
  ?.enhancements?.find((x) => norm(x.name) === norm(e.enhancement))
const coreRuleOf = (bundle, e) => (bundle?.rules || []).find((r) => r.num === e.num)
// What an entry patches: a datasheet for most kinds, an enhancement for `enhancement-text`, a
// Core Rules entry for `core-rule-text`.
const targetOf = (bundle, e) => (e.kind === 'enhancement-text' ? enhOf(bundle, e)
  : e.kind === 'core-rule-text' ? coreRuleOf(bundle, e)
    : e.kind === 'weapon-stat' ? bundle
    : sheetOf(bundle, e.datasheet))

// What appdata says now, for the one place an entry patches — compared with what the entry
// expects to find. Returns null when appdata still has the error, or the reason it does not.
function appdataDrift(e, ds) {
  if (e.kind === 'weapon-stat') {
    for (const name of e.datasheets) {
      const item = itemOf(sheetOf(ds, name), e.item)
      if (!item) return `"${e.item}" is gone from "${name}"`
      const off = (item.profiles || []).filter((p) => p[e.field] !== e.from)
      if (off.length) return `"${name}" ${e.item} ${e.field} is now ${JSON.stringify(off.map((p) => p[e.field]))}, the entry expects "${e.from}"`
    }
    return null
  }
  if (e.kind === 'core-rule-text') {
    if (!ds) return `Core Rules ${e.num} is gone`
    return (ds.text || '').includes(e.from) ? null : `its text no longer has "${e.from}"`
  }
  if (e.kind === 'enhancement-text') {
    if (!ds) return `enhancement "${e.enhancement}" is gone from ${e.detachment}`
    return (ds.rules || '').includes(e.from) ? null : `its text no longer has "${e.from}"`
  }
  if (!ds) return `datasheet "${e.datasheet}" is gone from appdata`
  if (e.kind === 'weapon-profile') {
    const item = itemOf(ds, e.item)
    if (!item) return `wargear item "${e.item}" is gone from the sheet`
    const names = (item.profiles || []).map((p) => p.name)
    if (JSON.stringify(names) !== JSON.stringify(e.expect)) return `profiles are now ${JSON.stringify(names)}, the entry expects ${JSON.stringify(e.expect)}`
    return null
  }
  if (e.kind === 'wargear-rule') {
    const hits = (ds.wargearRules || []).filter((r) => (r.rules || '').includes(e.from))
    if (hits.length !== 1) return `"${e.from}" occurs in ${hits.length} wargear rules, the entry expects exactly 1`
    return null
  }
  return `unknown kind "${e.kind}"`
}

function patchSheet(e, ds) {
  if (e.kind === 'weapon-profile') itemOf(ds, e.item).profiles.unshift({ ...e.add, tags: [...e.add.tags] })
  else if (e.kind === 'wargear-rule') for (const r of ds.wargearRules) r.rules = r.rules.replace(e.from, e.to)
  else if (e.kind === 'enhancement-text') ds.rules = e.to
  else if (e.kind === 'weapon-stat') {
    for (const name of e.datasheets) for (const p of itemOf(sheetOf(ds, name), e.item).profiles) p[e.field] = e.to
  }
}

// A faction bundle with every exception applied. A fresh copy each call: loadJson caches the raw
// file, and the gate below must keep reading it raw. An entry whose appdata no longer matches is
// NOT applied — patching a sheet GW has changed would print our correction over their new text;
// the gate is what says so.
//
// `family: true` is the audit's view of the Space Marines family (sync-appdata, sync-faction-text;
// never the generators): the app files a Chapter's own detachments in its own bundle (Ultramarines'
// Blade of Ultramar in ultramarines.json) and the shared datasheets only in adeptus-astartes.json,
// while our Space Marines page carries those six detachments and each Chapter page the shared
// sheets. Without it the audit found them "not in appdata" — and so never compared their text.
export function loadAppdataBundle(slugOrAppSlug, { family = false } = {}) {
  const appSlug = appSlugOf(slugOrAppSlug)
  const raw = loadJson(bundlePath(appSlug))
  if (!raw) return null
  const entries = APPDATA_EXCEPTIONS.filter((e) => appSlugOf(e.slug) === appSlug)
  if (!entries.length && !family) return raw
  const bundle = structuredClone(raw)
  for (const e of entries) {
    const ds = targetOf(bundle, e)
    if (!appdataDrift(e, ds)) patchSheet(e, ds)
  }
  if (family) addFamily(bundle, appSlug)
  return bundle
}

const CHAPTER_DETACHMENT_BUNDLES = ['ultramarines', 'raven-guard', 'imperial-fists', 'salamanders', 'iron-hands', 'white-scars']
const CHAPTER_BUNDLES = ['black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'space-wolves']

// What is added is marked `familyOnly`: a page carries part of the family's pool (a Chapter fields
// only some of the shared sheets; Deathwatch Support is the Deathwatch's and every Chapter's), so
// an added entry is compared when we carry it and never reported as missing from our page.
function addFamily(bundle, appSlug) {
  const add = (list, items) => {
    for (const x of items || []) if (!list.some((y) => norm(y.name) === norm(x.name))) list.push({ ...x, familyOnly: true })
  }
  if (appSlug !== 'adeptus-astartes' && !CHAPTER_BUNDLES.includes(appSlug)) return
  // Deathwatch Support is filed with the Deathwatch and open to every Adeptus Astartes army
  // (tables/detachment_faction_keyword).
  add(bundle.detachments, (loadJson(bundlePath('deathwatch'))?.detachments || []).filter((d) => norm(d.name) === norm('Deathwatch Support')))
  if (appSlug === 'adeptus-astartes') {
    for (const b of CHAPTER_DETACHMENT_BUNDLES) add(bundle.detachments, loadJson(bundlePath(b))?.detachments)
  } else {
    const sm = loadAppdataBundle('adeptus-astartes')
    add(bundle.datasheets, sm?.datasheets)
    add(bundle.detachments, sm?.detachments)
  }
}

// Our side: does the sheet we ship still carry the correction? Needs no appdata, so it also runs
// as a test (appdata-exceptions.test.js) — a regeneration that lost an entry fails `npm test`.
export async function oursCarries(e) {
  if (e.kind === 'core-rule-text') {
    const file = path.join(ROOT, 'src/data', e.file)
    if (!fs.existsSync(file)) return `src/data/${e.file} is missing`
    return fs.readFileSync(file, 'utf8').includes(e.ours) ? null : `src/data/${e.file} does not read "${e.ours}"`
  }
  if (e.kind === 'enhancement-text') {
    const ffile = path.join(ROOT, 'src/data/factions', `${e.slug}.js`)
    const mod = await import(pathToFileURL(ffile).href)
    const data = Object.values(mod).find((v) => v?.en)?.en
    const enh = (data?.detachments || []).find((d) => norm(d.name) === norm(e.detachment))?.enhancements?.find((x) => norm(x.name) === norm(e.enhancement))
    if (!enh) return `our enhancement "${e.enhancement}" is missing`
    return (enh.body || '').includes(e.ours) ? null : `our "${e.enhancement}" does not read "${e.ours}"`
  }
  const file = path.join(ROOT, 'src/data/datasheets', `${e.slug}.js`)
  if (e.kind === 'weapon-stat') {
    const sheets = (await import(pathToFileURL(file).href)).default
    for (const name of e.datasheets) {
      const d = sheets.find((x) => norm(x.name) === norm(name))
      const w = d && [...(d.ranged || []), ...(d.melee || [])].find((x) => norm(x.name) === norm(e.item))
      if (!w) return `our "${name}" has no "${e.item}"`
      if (String(w[e.field.toLowerCase()]) !== e.to) return `our "${name}" ${e.item} ${e.field} is ${JSON.stringify(w[e.field.toLowerCase()])}, not "${e.to}"`
    }
    return null
  }
  if (!fs.existsSync(file)) return `src/data/datasheets/${e.slug}.js is missing`
  const sheets = (await import(pathToFileURL(file).href)).default
  const d = sheets.find((s) => norm(s.name) === norm(e.datasheet))
  if (!d) return `our sheet "${e.datasheet}" is missing`
  if (e.kind === 'weapon-profile') {
    return (d.ranged || []).concat(d.melee || []).some((w) => norm(w.name) === norm(e.ours)) ? null : `no "${e.ours}" row on our sheet`
  }
  return (d.options || []).some((o) => o.replace(/‐/g, '-').includes(e.ours)) ? null : `no option reading "${e.ours}" on our sheet`
}

// Every problem with the registry, as lines; empty means all entries hold.
export async function checkAppdataExceptions() {
  const problems = []
  const ids = new Set()
  for (const e of APPDATA_EXCEPTIONS) {
    if (ids.has(e.id)) problems.push(`${e.id}: duplicate id`)
    ids.add(e.id)
    if (!e.why || !e.source) problems.push(`${e.id}: an exception needs a "why" and a "source"`)
    const drift = appdataDrift(e, targetOf(loadJson(bundlePath(appSlugOf(e.slug))), e))
    if (drift) problems.push(`${e.id}: appdata changed — ${drift}. GW fixed or reworked it: re-read, then drop or update the entry.`)
    const missing = await oursCarries(e)
    if (missing) problems.push(`${e.id}: our data lost the correction — ${missing}. Regenerated without the registry? gen-datasheets applies it.`)
  }
  return problems
}
