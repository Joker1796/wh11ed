import { describe, it, expect } from 'vitest'
import { factionGroups } from './factionsIndex.js'
import { loadDatasheets } from './datasheets/index.js'
import { localizeSheet } from './datasheets/ru/localize.js'
import { missions } from './missions.js'
import { missionsRu } from './missionsRu.js'
import { overlayMission } from './missionOverlay.js'
import { combatPatrol } from './combatPatrol.js'
import { ui } from '../i18n/ui.js'
import { loadFactionWithCodex } from '../composables/rosterFactionRules.js'

// English left where a Russian reader reads. `npm run parity` compares the SHAPE of the two
// languages (block counts, `**`, glosses) and passes a sentence that simply never got its Russian,
// because an overlay that lacks a field inherits the English and the shapes then agree. That is how
// the roster's 62 wargear instructions and every sheet's unit composition read English in RU for
// months (2026-10-16, found by a player). This reads the Russian the way the app builds it — the
// same loaders and overlays — and fails on any string that is an English sentence.
//
// "An English sentence": not one Russian letter, five words or more, three of them English function
// words, after the parts that stay English by convention are taken out — [TAGS], ALL-CAPS
// keywords. Names are short and carry no function words, so a unit or weapon name does not trip it.
// A string that has to stay English goes in ALLOWED with the reason.
const STOP = /\b(the|can|be|with|of|and|this|each|that|to|is|in|from|its|their|have|has|following|when|if|you|your|unit|model|models|until|end|turn|phase|replaced|equipped|one|up)\b/gi
const strip = (s) => s.replace(/\[[^\]]*\]/g, ' ').replace(/\*\*|__/g, '').replace(/\b[A-Z][A-Z’'\- ]{2,}\b/g, ' ')
const englishSentence = (s) => {
  const t = strip(s)
  if (/[а-яё]/i.test(t)) return false // any Russian at all: translated, if only the glue between names
  if ((t.match(/[A-Za-z’']+/g) || []).length < 5) return false
  return (t.match(STOP) || []).length >= 3
}
// Fields that are not prose a reader sees in their locale: ids, links, and the names that stay
// English by project convention (the localized name rides beside them as nameRu / titleRu).
const SKIP_KEY = /^(id|slug|sid|image|illustration|src|href|nameEn|name|title|source|det|from|kind|keywords|factionKeywords|faction)$/

// path → why it stays English. Empty is the goal.
const ALLOWED = {}

function leaks(ru, path, out) {
  if (typeof ru === 'string') { if (englishSentence(ru) && !ALLOWED[path]) out.push(`${path}: ${ru.slice(0, 120)}`); return out }
  if (Array.isArray(ru)) { ru.forEach((x, i) => leaks(x, `${path}[${i}]`, out)); return out }
  if (ru && typeof ru === 'object') {
    for (const [k, x] of Object.entries(ru)) {
      // A bilingual pair ({ en, ru }) shows its `ru`; the `en` beside it is not read in RU.
      if (k === 'en' && typeof ru.ru === 'string') continue
      if (!SKIP_KEY.test(k)) leaks(x, `${path}.${k}`, out)
    }
  }
  return out
}

const slugs = factionGroups.flatMap((g) => g.factions).map((f) => f.slug)

describe('no English sentence in the Russian', () => {
  it('reads every surface (a loader that found nothing must not pass)', () => {
    expect(slugs.length).toBeGreaterThan(25)
    expect(missions.en.primary.length).toBeGreaterThan(5)
  })

  it('faction rules: army rules, detachments, stratagems, enhancements', async () => {
    const out = []
    for (const slug of slugs) {
      const { local } = await loadFactionWithCodex(slug, 'ru')
      leaks({ ...local, datasheets: undefined }, slug, out)
    }
    expect(out).toEqual([])
  }, 60000)

  it('datasheets', async () => {
    const out = []
    let read = 0
    for (const slug of slugs) {
      const ru = await import(`./datasheets/ru/${slug}.js`).catch(() => ({}))
      for (const sh of (await loadDatasheets(slug)) || []) {
        read++
        leaks(localizeSheet(sh, ru.default?.[sh.id], ru.abilityNamesRu), `${slug}/${sh.id}`, out)
      }
    }
    expect(read).toBeGreaterThan(1500)
    expect(out).toEqual([])
  }, 60000)

  it('missions', () => {
    const out = []
    for (const m of missions.en.primary) leaks(overlayMission(m, missionsRu.primary[m.slug]), `primary/${m.slug}`, out)
    for (const m of missions.en.secondary) leaks(overlayMission(m, missionsRu.secondary[`${m.slug}|${m.role}`]), `secondary/${m.slug}|${m.role}`, out)
    expect(out).toEqual([])
  })

  it('Combat Patrol', () => {
    expect(leaks(combatPatrol.ru, 'cp', [])).toEqual([])
  })

  it('the interface', () => {
    expect(Object.keys(ui.en).filter((k) => !(k in ui.ru))).toEqual([])
    expect(leaks(ui.ru, 'ui', [])).toEqual([])
  })
})
