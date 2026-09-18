// Generate src/data/factionLegends.json — the prose half of a "Legends: <Faction>" publication,
// pulled from wh40k-appdata so it re-generates on a data_version bump. The datasheets half of
// that publication already lands in src/data/datasheets/<slug>.js (flagged `legends: true`); the
// two rule sections the publication ALSO carries never did, because the datasheet sync reads
// datasheets and the faction-prose sync reads the Codex. The first player question about Legends
// ("can you add Ufthak Blackhawk?") was answered by a table we had in appdata and nowhere on the
// site: Legendary Proxies says which Codex datasheet a retired unit uses.
//
// Shape: { "<wh11ed-slug>": { pub, intro, proxies: [{ legacy: [name, …], use, id }] } }
//   intro   — the "Warhammer Legends" section, as wh11ed inline markup (**bold**, ▪ bullets)
//   proxies — the "Legendary Proxies" section, parsed: `legacy` are the retired unit names GW
//             prints in bold, `use` is the datasheet line under them (verbatim, it may carry a
//             wargear qualifier — "Big Mek in Mega Armour equipped with Kustom Force Field"),
//             `id` is that datasheet's wh11ed id so the page can link it, or null.
//
// A proxy whose `use` resolves to no datasheet of ours is a failure, not a warning: the table's
// whole value is the link, and a name that stops matching is the drift this gate exists for.
// GW's own typos are corrected in USE_TYPOS below — the original text is kept for display.
//
// EN only — appdata carries no other locale. RU is a drop-in overlay, src/data/factionLegendsRu.json
// (`{ "<slug>": { intro } }`), merged by the view with EN fallback; the proxies are unit names and
// stay English by convention. This generator does NOT touch it.
//
// Usage:
//   node scripts/gen-faction-legends.mjs           # write src/data/factionLegends.json + summary
//   node scripts/gen-faction-legends.mjs --check    # report only; non-zero exit if it would change
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, SLUG_MAP, appdataToMarkup, loadWh11edDatasheets, nameOfEn, norm, table } from './lib/sync-common.mjs'

const OUT = path.join(ROOT, 'src/data/factionLegends.json')

// appdata slug → wh11ed slug (the 7 renamed factions; everything else is identity).
const INV_SLUG = Object.fromEntries(Object.entries(SLUG_MAP).map(([wh, app]) => [app, wh]))

// Same as gen-faction-faq / gen-conditional-keywords: faction-keyword display name → slug.
const slugify = (s) => (s || '').toLowerCase().replace(/[’'`]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// Spelling mistakes in appdata's proxy targets, as printed → as the datasheet is actually named.
// Matching only; the page shows the corrected form, since the link text IS the datasheet.
const USE_TYPOS = {
  'Biltza Bommer': 'Blitza-bommer', // Legends: Orks, data_version 946
}

const INTRO_SECTION = 'warhammer legends'
const PROXIES_SECTION = 'legendary proxies'

// "**A, B, C:**\n• Use\n**D:**\n• Use" → [{ legacy: [A, B, C], use: 'Use' }]. GW's own line
// format, not run through appdataToMarkup (which would fold the `•` lines into prose).
function parseProxies(text) {
  const out = []
  let legacy = null
  for (const raw of (text || '').split('\n')) {
    const line = raw.trim()
    if (!line) continue
    const head = line.match(/^\*\*(.+?):?\*\*:?$/)
    if (head) {
      legacy = head[1].split(',').map((s) => s.trim()).filter(Boolean)
      continue
    }
    const use = line.replace(/^[•▪■]\s*/, '').trim()
    if (legacy && use) out.push({ legacy, use })
    legacy = null
  }
  return out
}

// The intro is paragraphs separated by blank lines with `- ` bullets — appdataToMarkup would fold
// it into one line (it converts one rule block at a time, where line breaks are incidental), so
// convert paragraph by paragraph and keep the blank lines the body convention uses.
const introMarkup = (text) =>
  (text || '')
    .split(/\n\s*\n/)
    .map((p) => appdataToMarkup(p.replace(/^\s*-\s+/gm, '▪ ')))
    .filter(Boolean)
    .join('\n\n')

export async function run(argv = process.argv.slice(2)) {
  const CHECK = argv.includes('--check')
  const fkName = new Map(table('faction_keyword.json').map((r) => [r.id, nameOfEn(r)]))
  const sections = table('rule_section.json')
  const containers = table('rule_container.json')
  const components = table('rule_container_component.json')

  const { factionGroups } = await import(pathToFileURL(path.join(ROOT, 'src/data/factionsIndex.js')).href)
  const ourSlugs = new Set(factionGroups.flatMap((g) => g.factions.map((f) => f.slug)))

  const sectionText = (sec) => {
    const cs = containers.filter((c) => c.ruleSectionId === sec.id).sort((a, b) => a.displayOrder - b.displayOrder)
    return cs
      .flatMap((c) => components.filter((k) => k.ruleContainerId === c.id).sort((a, b) => a.displayOrder - b.displayOrder))
      .map((k) => k.localisations?.en?.textContent || '')
      .filter(Boolean)
      .join('\n')
  }

  const bySlug = new Map()
  let unmapped = 0
  let unresolved = 0
  for (const pub of table('publication.json').filter((p) => p.isLegends)) {
    const appSlug = slugify(fkName.get(pub.factionKeywordId))
    const slug = INV_SLUG[appSlug] || appSlug
    if (!ourSlugs.has(slug)) { unmapped++; continue }
    const secs = sections.filter((s) => s.publicationId === pub.id)
    const intro = secs.find((s) => nameOfEn(s).toLowerCase() === INTRO_SECTION)
    const prox = secs.find((s) => nameOfEn(s).toLowerCase() === PROXIES_SECTION)
    const sheets = await loadWh11edDatasheets(slug)
    const byName = new Map(sheets.map((s) => [norm(s.name), s]))
    const proxies = parseProxies(prox ? sectionText(prox) : '').map((p) => {
      const printed = USE_TYPOS[p.use] || p.use
      // Exact name first; else the longest datasheet name the line starts with (a qualifier
      // like "… equipped with Kustom Force Field" follows the unit name).
      const key = norm(printed)
      let sheet = byName.get(key)
      if (!sheet) {
        sheet = sheets
          .filter((s) => key.startsWith(norm(s.name) + ' '))
          .sort((a, b) => b.name.length - a.name.length)[0]
      }
      if (!sheet) {
        unresolved++
        console.log(`  ✗ ${slug}: proxy target "${p.use}" (for ${p.legacy.join(', ')}) matches no datasheet`)
      }
      return { legacy: p.legacy, use: printed, id: sheet?.id ?? null }
    })
    bySlug.set(slug, { pub: nameOfEn(pub), intro: intro ? introMarkup(sectionText(intro)) : '', proxies })
  }

  // Serialize deterministically: faction slugs in factionsIndex order.
  const out = {}
  for (const g of factionGroups) {
    for (const f of g.factions) {
      const b = bySlug.get(f.slug)
      if (b && (b.intro || b.proxies.length)) out[f.slug] = b
    }
  }

  const json = JSON.stringify(out, null, 2) + '\n'
  const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null
  const nProxies = Object.values(out).reduce((s, v) => s + v.proxies.length, 0)
  console.log(`faction Legends: ${Object.keys(out).length} publication(s), ${nProxies} proxy row(s) (${unmapped} unmapped, ${unresolved} unresolved target(s)).`)

  if (unresolved) return 1
  if (CHECK) {
    if (prev !== json) {
      console.log('  ⚠ src/data/factionLegends.json is stale — run `node scripts/gen-faction-legends.mjs`.')
      return 1
    }
    console.log('  in sync.')
    return 0
  }
  fs.writeFileSync(OUT, json)
  console.log(`  wrote ${path.relative(ROOT, OUT)}`)
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
