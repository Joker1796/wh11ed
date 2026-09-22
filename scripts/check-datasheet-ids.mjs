// Datasheet ids are load-bearing: URLs and RouterLinks hang off them, and — since the cloud sync
// of favourites and the model collection — so do a player's marks, stored per (faction slug,
// datasheet id). The convention "an id never changes" used to rest on discipline alone: nothing
// failed when one quietly moved, and the mark it carried would have been orphaned on every
// device at once, silently.
//
// This gate turns the convention into a guarantee. `src/data/datasheetIds.json` is a committed
// snapshot of every (slug, id) the app ships; a pair that leaves it must be accounted for in
// `src/data/datasheetRenames.json` — the one file that says what happened:
//
//   { "<slug>": { "<old-id>": "<new-id>" } }   renamed: a mark moves to the new id
//   { "<slug>": { "<old-id>": null } }         retired: the unit left the game, the mark is dropped
//
// That file is not gate bookkeeping alone — the app imports it when reconciling local marks
// against the cloud, which is why a rename and a retirement have to be told apart HERE, by the
// person who knows which happened, rather than guessed at on a phone.
//
// The pairs come from src/data/datasheetIndex.js, so they are exactly what a faction page can
// show — including a Chapter's folded-in Space Marines sheets, which a Dark Angels player marks
// under `dark-angels`, not under `space-marines`. Re-run `npm run datasheets:index` first if
// datasheets changed.
//
// `compare()` is also the body of src/data/datasheetIds.test.js, so the gate bites on `npm test`
// too — an id can move on an ordinary hand edit, not only on an appdata bump.
//
// Usage:
//   npm run dsids          # check; non-zero exit on any drift
//   npm run dsids:write    # refresh the snapshot (refused while a departure is unaccounted for)
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SNAPSHOT = path.join(ROOT, 'src/data/datasheetIds.json')
const RENAMES = path.join(ROOT, 'src/data/datasheetRenames.json')

const loadJson = (file, fallback) => {
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}

// { slug: Set(id) } as the build ships them today.
export async function currentPairs() {
  const { datasheetIndex } = await import(pathToFileURL(path.join(ROOT, 'src/data/datasheetIndex.js')).href)
  return new Map(datasheetIndex.map(([slug, , units]) => [slug, new Set(units.map((u) => u[0]))]))
}

// Everything the gate knows, as data: `problems` are what a human must resolve, `added`/`gone`
// only mean the snapshot needs refreshing.
export function compare(current, snapshot, renames) {
  const problems = []
  let gone = 0
  let added = 0

  for (const [slug, ids] of Object.entries(snapshot)) {
    const now = current.get(slug)
    if (!now) {
      problems.push(`faction \`${slug}\` is gone from the index — a faction cannot simply vanish; if it was renamed, move its marks by hand before touching this gate`)
      continue
    }
    for (const id of ids) {
      if (now.has(id)) continue
      gone++
      if (!renames[slug] || !(id in renames[slug])) {
        problems.push(`\`${slug}/${id}\` disappeared with nothing said about it — add it to src/data/datasheetRenames.json as "${id}": "<new-id>" (renamed) or "${id}": null (left the game)`)
        continue
      }
      const to = renames[slug][id]
      if (to !== null && !now.has(to)) {
        problems.push(`\`${slug}/${id}\` is recorded as renamed to \`${to}\`, but \`${to}\` is not a datasheet of that faction`)
      }
    }
  }

  // A rename entry for an id that is shipped again would move a mark off a live unit.
  for (const [slug, map] of Object.entries(renames)) {
    const now = current.get(slug)
    if (!now) {
      problems.push(`src/data/datasheetRenames.json mentions faction \`${slug}\`, which the index does not know`)
      continue
    }
    for (const id of Object.keys(map)) {
      if (now.has(id)) problems.push(`src/data/datasheetRenames.json still maps \`${slug}/${id}\`, but that datasheet is shipped again — drop the entry, or a mark will be moved off a live unit`)
    }
  }

  for (const [slug, ids] of current) {
    const was = new Set(snapshot[slug] || [])
    for (const id of ids) if (!was.has(id)) added++
  }

  const pairs = [...current.values()].reduce((n, s) => n + s.size, 0)
  return { problems, added, gone, pairs, factions: current.size }
}

export async function run(args = []) {
  const write = args.includes('--write')
  const current = await currentPairs()
  const snapshot = loadJson(SNAPSHOT, {})
  const renames = loadJson(RENAMES, {})
  const res = compare(current, snapshot, renames)

  if (res.problems.length) {
    console.error(`datasheet ids: ${res.problems.length} problem(s)\n`)
    for (const p of res.problems) console.error(`  ✗ ${p}`)
    console.error(`\n${res.pairs} (faction, datasheet) pairs across ${res.factions} factions.`)
    return 1
  }

  if (!write) {
    if (res.added || res.gone) {
      console.error(`datasheet ids: the snapshot is stale — ${res.added} new pair(s), ${res.gone} accounted departure(s).`)
      console.error('Every departure is accounted for, so this is bookkeeping: run `npm run dsids:write` and commit src/data/datasheetIds.json.')
      return 1
    }
    console.log(`datasheet ids: ${res.pairs} pairs across ${res.factions} factions, snapshot current.`)
    return 0
  }

  const out = {}
  for (const slug of [...current.keys()].sort()) out[slug] = [...current.get(slug)].sort()
  writeFileSync(SNAPSHOT, `${JSON.stringify(out, null, 2)}\n`)
  console.log(`datasheet ids: snapshot written — ${res.pairs} pairs across ${res.factions} factions (+${res.added} new, -${res.gone} departed).`)
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run(process.argv.slice(2)))
