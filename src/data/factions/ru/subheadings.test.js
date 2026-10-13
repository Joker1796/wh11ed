import { describe, it, expect } from 'vitest'
import { loadFaction } from '../index.js'
import { deepOverlay, loadFactionRu } from './index.js'
import { extractSubheadings } from '../../extractSubheadings.js'

// A rule's `### ` subheading keeps its English name in RU and carries the Russian after ` | `
// (`### Deeds | Деяния`) — RuleBody shows it beside the English, search indexes it. Nothing held
// that to the English file: on 2026-10-13 thirty-two plates had no Russian at all (the Orks', and
// the four Combat Doctrines in every Chapter file, copied from Space Marines without theirs).
// This pairs the plates of every army and detachment rule by position, EN against the RU overlay
// as the page merges it, and fails when:
//   - the counts differ — the appdata sync added or dropped a plate in EN, the RU must follow;
//   - the RU names a plate the EN no longer has — GW renamed it, the RU line is stale;
//   - the RU plate has no Russian after the pipe.
// The exceptions are named one by one, with their reason.

const SLUGS = Object.keys(import.meta.glob(['../*.js', '!../index.js', '!../*.test.js'])).map((p) => p.slice(3, -3))

// A plate whose name is a keyword stays as it is, untranslated, like every ALL-CAPS keyword.
const isKeyword = (s) => /^[A-Z0-9 '’-]+$/.test(s) && /[A-Z]{3}/.test(s)

// `<slug>:<EN plate>` → why its RU plate is not `EN | RU`. Empty since 2026-10-13: the three
// Russian-only plates of the time (Sororitas' two steps, AdMech's Fallout) took the pipe form too.
const RU_ONLY = {}

async function pairs(slug) {
  const data = await loadFaction(slug)
  const mod = await loadFactionRu(slug)
  if (!data?.en || !mod?.default) return []
  const ru = deepOverlay(data.en, mod.default)
  const out = [[`${slug} army rule`, data.en.armyRule?.body, ru.armyRule?.body]]
  data.en.detachments?.forEach((d, i) => out.push([`${slug} / ${d.name}`, d.rule?.body, ru.detachments?.[i]?.rule?.body]))
  return out
}

describe('RU subheadings of the faction rules', () => {
  it('finds the factions and their plates', async () => {
    expect(SLUGS.length).toBeGreaterThan(25)
    const all = (await Promise.all(SLUGS.map(pairs))).flat()
    expect(all.filter(([, en]) => extractSubheadings(en).length).length).toBeGreaterThan(40)
  })

  it('every EN plate has its RU twin: the same name and the Russian after the pipe', async () => {
    const bad = []
    const usedExceptions = new Set()
    for (const slug of SLUGS) {
      for (const [where, enBody, ruBody] of await pairs(slug)) {
        const en = extractSubheadings(enBody)
        const ru = extractSubheadings(ruBody)
        if (en.length !== ru.length) {
          bad.push(`${where}: ${en.length} plates in EN, ${ru.length} in RU — EN: ${en.map((h) => h.text).join(' / ')}`)
          continue
        }
        en.forEach((h, i) => {
          const r = ru[i]
          const key = `${slug}:${h.text}`
          if (RU_ONLY[key]) { usedExceptions.add(key); return }
          if (isKeyword(h.text) && r.text === h.text && !r.ru) return
          if (r.text !== h.text) bad.push(`${where}: EN «${h.text}», RU names «${r.text}» — renamed? write \`### ${h.text} | …\``)
          else if (!r.ru) bad.push(`${where}: «${h.text}» has no Russian — write \`### ${h.text} | …\``)
        })
      }
    }
    expect(bad, 'src/data/factions/ru/<slug>.js').toEqual([])
    expect(Object.keys(RU_ONLY).filter((k) => !usedExceptions.has(k)), 'an exception no plate uses any more — remove it').toEqual([])
  })
})
