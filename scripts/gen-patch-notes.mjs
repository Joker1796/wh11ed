// Generate the patch-notes page's data: one file per GW update (scripts/patch-notes/patches.mjs),
// src/data/patches/<id>.json, plus the light index the page opens on (src/data/patches/index.js).
//
//   npm run patches               # every update in PATCHES
//   npm run patches -- 963        # one of them
//
// Reads history, never the working tree: the app's rules from wh40k-appdata's git (cloned next to
// this repo, or WH40K_APPDATA_PATH), points and FAQ from this repo's own git. So a patch, once
// written, does not move when today's data does — and re-running it reproduces the same file.
//
// What counts as a change, and what is noise, is the diff modules' business (scripts/patch-notes/).
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { APPDATA, ROOT, SLUG_MAP, SM_SUPPLEMENT_BUNDLES } from './lib/sync-common.mjs'
import { PATCHES } from './patch-notes/patches.mjs'
import { foldName } from '../src/core/shared/foldName.js'
import { diffBundles, diffCore } from './patch-notes/diff-bundles.mjs'
import { diffMfm } from './patch-notes/diff-mfm.mjs'
import { diffFaq } from './patch-notes/diff-faq.mjs'
import { diffCoreFaq } from './patch-notes/diff-core-faq.mjs'
import { diffCoreContent } from './patch-notes/diff-core-content.mjs'
import { diffDocuments } from './patch-notes/diff-documents.mjs'
import { loadDocuments } from './check-documents.mjs'

const OUT = path.join(ROOT, 'src', 'data', 'patches')
const toWh11ed = Object.fromEntries(Object.entries(SLUG_MAP).map(([wh, app]) => [app, wh]))

const git = (repo, args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] })
const show = (repo, ref, file) => {
  try { return git(repo, ['show', `${ref}:${file}`]) } catch { return null }
}
const lsTree = (repo, ref, dir) => git(repo, ['ls-tree', '--name-only', ref, `${dir}/`]).split('\n').filter(Boolean)
const json = (repo, ref, file) => {
  const s = show(repo, ref, file)
  return s ? JSON.parse(s) : null
}
// An MFM module at a commit — written out and imported, since it is JS, not JSON.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'patches-'))
async function mfmAt(ref, slug) {
  const src = show(ROOT, ref, `src/data/mfm/${slug}.js`)
  if (!src) return null
  const file = path.join(tmp, `${ref.replace(/\W/g, '_')}-${slug}.mjs`)
  fs.writeFileSync(file, src)
  return (await import(pathToFileURL(file).href)).default
}

// Combat Patrol army rules at one appdata version: army_rule rows whose publication is a CP box.
function cpArmyRulesAt(ref) {
  const pubs = new Set((json(APPDATA, ref, 'tables/publication.json') || []).filter((x) => x.isCombatPatrol).map((x) => x.id))
  return new Set((json(APPDATA, ref, 'tables/army_rule.json') || []).filter((r) => pubs.has(r.publicationId)).map((r) => r.id))
}

const editions = loadDocuments()

async function build(p, after) {
  const items = []
  items.push(...diffDocuments(editions, after, p.date))
  if (p.app) {
    const [from, to] = p.app
    const cpArmyRules = [cpArmyRulesAt(from), cpArmyRulesAt(to)]
    items.push(...diffCore(json(APPDATA, from, 'factions/_core-rules.json'), json(APPDATA, to, 'factions/_core-rules.json')))
    // The Core Rules FAQ is the app's (tables/faq.json); the factions' FAQ below is ours, generated.
    const faqTables = (ref) => ({ faq: json(APPDATA, ref, 'tables/faq.json'), publications: json(APPDATA, ref, 'tables/publication.json') })
    items.push(...diffCoreFaq(faqTables(from), faqTables(to)))
    items.push(...diffCoreContent(json(APPDATA, from, 'factions/_core-content.json'), json(APPDATA, to, 'factions/_core-content.json')))
    const files = new Set([...lsTree(APPDATA, from, 'factions'), ...lsTree(APPDATA, to, 'factions')])
    for (const f of [...files].filter((x) => /\/[a-z][^/]*\.json$/.test(x))) {
      const app = path.basename(f, '.json')
      const supplement = SM_SUPPLEMENT_BUNDLES.includes(app)
      const slug = supplement ? 'space-marines' : (toWh11ed[app] || app)
      // The MFM as it stood when the update landed: which dispositions each detachment offers.
      const mfm = p.mfm ? await mfmAt(p.mfm[1], slug).catch(() => null) : null
      const norm = foldName
      const offered = mfm ? (name) => mfm.detachments?.find((d) => norm(d.name) === norm(name))?.forceDispositions || null : null
      items.push(...diffBundles(json(APPDATA, from, f), json(APPDATA, to, f), slug, { announce: !supplement, cpArmyRules, offered }))
    }
  }
  if (p.mfm) {
    const [from, to] = p.mfm
    const slugs = new Set([...lsTree(ROOT, from, 'src/data/mfm'), ...lsTree(ROOT, to, 'src/data/mfm')].map((f) => path.basename(f, '.js')))
    for (const slug of slugs) items.push(...diffMfm(await mfmAt(from, slug), await mfmAt(to, slug), slug, { tags: !p.noTags }))
  }
  if (p.faq) items.push(...diffFaq(json(ROOT, p.faq[0], 'src/data/factionFaq.json'), json(ROOT, p.faq[1], 'src/data/factionFaq.json')))
  return items
}

// A change that looks like GW's own mistake, which the site follows word for word for now (owner,
// 2026-10-14): `doubts` on a PATCHES line names it, and the item carries the note the page shows.
// A doubt that names no item stops the run — a quiet one would vanish from the page unseen.
function attachDoubts(p, items) {
  const fold = foldName
  for (const d of p.doubts || []) {
    const hit = items.filter((x) => x.faction === d.faction && x.kind === d.kind && fold(x.name) === fold(d.name))
    if (!hit.length) throw new Error(`${p.id}: doubt ${d.faction} · ${d.kind} "${d.name}" matches no change`)
    for (const x of hit) x.doubt = d.note
  }
}

// Changes GW published in a document (a "Printed Product Updates" PDF) that the app has not taken
// in, and the site applied anyway (owner, 2026-10-14): written by hand on the PATCHES line as
// `docs: [{ title: { en, ru }, url, items: [...] }]`, shown in a block of their own.
function docItems(p) {
  return (p.docs || []).flatMap((d) => d.items.map((x) => ({ ...x, source: 'doc', doc: { title: d.title, url: d.url } })))
}

const only = process.argv.slice(2)
fs.mkdirSync(OUT, { recursive: true })
const index = []
for (const [i, p] of PATCHES.entries()) {
  const file = path.join(OUT, `${p.id}.json`)
  let items
  if (!only.length || only.includes(p.id)) {
    items = await build(p, PATCHES[i - 1]?.date ?? null)
    attachDoubts(p, items)
    items.push(...docItems(p))
    fs.writeFileSync(file, `${JSON.stringify({ id: p.id, date: p.date, labels: p.labels, items })}\n`)
    console.log(`${p.id}: ${items.length} changes`)
  } else {
    items = JSON.parse(fs.readFileSync(file, 'utf8')).items
  }
  // What the page shows before a patch is opened: how much moved, and for which factions — so the
  // reader's own faction can be found without loading the patch.
  const byFaction = {}
  for (const x of items) byFaction[x.faction || 'core'] = (byFaction[x.faction || 'core'] || 0) + 1
  index.push({ id: p.id, date: p.date, labels: p.labels, total: items.length, byFaction })
}
index.reverse() // newest first, as the page lists them
fs.writeFileSync(path.join(OUT, 'index.js'), `// Generated by scripts/gen-patch-notes.mjs — do not edit by hand.
// The patch-notes page's list of GW updates, newest first; each one's changes are in <id>.json,
// loaded when it is opened.
export const patches = ${JSON.stringify(index, null, 2)}
`)
fs.rmSync(tmp, { recursive: true, force: true })
