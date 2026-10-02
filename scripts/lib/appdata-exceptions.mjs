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
]

const appSlugOf = (slug) => SLUG_MAP[slug] || slug
const bundlePath = (appSlug) => path.join(APPDATA, 'factions', `${appSlug}.json`)
const sheetOf = (bundle, name) => (bundle?.datasheets || []).find((d) => norm(d.name) === norm(name))
const itemOf = (ds, name) => (ds?.wargear || []).find((w) => norm(w.name) === norm(name))

// What appdata says now, for the one place an entry patches — compared with what the entry
// expects to find. Returns null when appdata still has the error, or the reason it does not.
function appdataDrift(e, ds) {
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
}

// A faction bundle with every exception applied. A fresh copy each call: loadJson caches the raw
// file, and the gate below must keep reading it raw. An entry whose appdata no longer matches is
// NOT applied — patching a sheet GW has changed would print our correction over their new text;
// the gate is what says so.
export function loadAppdataBundle(slugOrAppSlug) {
  const appSlug = appSlugOf(slugOrAppSlug)
  const raw = loadJson(bundlePath(appSlug))
  if (!raw) return null
  const entries = APPDATA_EXCEPTIONS.filter((e) => appSlugOf(e.slug) === appSlug)
  if (!entries.length) return raw
  const bundle = structuredClone(raw)
  for (const e of entries) {
    const ds = sheetOf(bundle, e.datasheet)
    if (!appdataDrift(e, ds)) patchSheet(e, ds)
  }
  return bundle
}

// Our side: does the sheet we ship still carry the correction? Needs no appdata, so it also runs
// as a test (appdata-exceptions.test.js) — a regeneration that lost an entry fails `npm test`.
export async function oursCarries(e) {
  const file = path.join(ROOT, 'src/data/datasheets', `${e.slug}.js`)
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
    const drift = appdataDrift(e, sheetOf(loadJson(bundlePath(appSlugOf(e.slug))), e.datasheet))
    if (drift) problems.push(`${e.id}: appdata changed — ${drift}. GW fixed or reworked it: re-read, then drop or update the entry.`)
    const missing = await oursCarries(e)
    if (missing) problems.push(`${e.id}: our data lost the correction — ${missing}. Regenerated without the registry? gen-datasheets applies it.`)
  }
  return problems
}
