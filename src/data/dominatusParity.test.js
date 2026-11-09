// EN↔RU parity of the Dominatus deck (dominatus.js / dominatusRu.js) — the bilingual rules of
// src/data/CLAUDE.md held over every string the RU overlay replaces: the same block markers, `**`
// balanced and as many, the same [TOKENS], ALL-CAPS keywords and measurements, no string left
// English, and a Russian subline for every card name. `npm run parity` walks the rulebook files;
// this deck's overlay is keyed by slug and merged by getDominatus, so it is checked here, through
// the same merge the page reads.
import { describe, it, expect } from 'vitest'
import { getDominatus } from './dominatus.js'

function parityIssues() {
const en = getDominatus('en'), ru = getDominatus('ru')
const SAME_OK = new Set(['Dominatus', 'Warmaster', '*', 'Establish Encirclement', 'Idol Target', 'Prime Target', 'Champions', 'Kill Tally', 'Elimination Target', 'Artefact', 'Battle Presence', 'Trophies', 'Strike Force', '1', '2'])
const issues = []
const count = (s, re) => (s.match(re) || []).length
const multiset = (s, re) => (s.match(re) || []).slice().sort().join('|')
const CAPS = /\b[A-Z][A-Z'’-]{1,}(?:[ /][A-Z][A-Z'’-]+)*\b/g
const CAPS_IGNORE = /^(VP|CP|OC|AP|InSv|Sv|Ld)$/
function caps(s) { return (s.replace(/['’]s\b/g, '').replace(/\[[^\]]*\]/g, '').match(CAPS) || []).flatMap((m) => m.split(/[ /]/)).filter((w) => w.length > 1 && !CAPS_IGNORE.test(w) && !/^(II|III)$/.test(w)).sort().join('|') }
const MEAS = /\d+"|\bD\d\b|\d\+|[+\-−]\d+"?|\d+CP|\d+VP|×\d+/g
function cmp(path, e, r) {
  if (typeof e !== 'string') return
  if (typeof r !== 'string') { issues.push(`${path}: RU missing`); return }
  if (e && e === r && !SAME_OK.has(e)) issues.push(`${path}: RU == EN: ${e.slice(0, 60)}`)
  const lines = (s, re) => s.split('\n').filter((l) => re.test(l)).length
  for (const [n, re] of [['▪', /^▪ /], ['###', /^### /], ['1.', /^\d+\. /]]) if (lines(e, re) !== lines(r, re)) issues.push(`${path}: ${n} ${lines(e, re)} vs ${lines(r, re)}`)
  if (count(r, /\*\*/g) % 2) issues.push(`${path}: odd ** in RU`)
  if (count(e, /\*\*/g) !== count(r, /\*\*/g)) issues.push(`${path}: ** ${count(e, /\*\*/g)} vs ${count(r, /\*\*/g)}`)
  // A popover is the same term in both languages, its label each one's own: compared by its id.
  const tok = (x) => multiset(x.replace(/\[gloss:([a-z0-9-]+):[^\]]*\]/g, '[gloss:$1]'), /\[[^\]]+\]/g)
  if (tok(e) !== tok(r)) issues.push(`${path}: [] ${tok(e)} vs ${tok(r)}`)
  if (caps(e) !== caps(r)) issues.push(`${path}: CAPS ${caps(e)} vs ${caps(r)}`)
  if (multiset(e, MEAS) !== multiset(r, MEAS)) issues.push(`${path}: meas ${multiset(e, MEAS)} vs ${multiset(r, MEAS)}`)
}
function walk(path, e, r) {
  if (typeof e === 'string') return cmp(path, e, r)
  if (Array.isArray(e)) { if (!Array.isArray(r) || r.length !== e.length) issues.push(`${path}: length ${e.length} vs ${r?.length}`); e.forEach((x, i) => walk(`${path}[${i}]`, x, r?.[i])); return }
  if (e && typeof e === 'object') for (const k of Object.keys(e)) {
    if (k === 'target') { if (e[k] !== r?.[k]) issues.push(`${path}.target: EN and RU differ`); continue }
    if (['id', 'slug', 'name', 'alliance', 'grid', 'roll', 'label', 'vp', 'modifier', 'icon', 'box'].includes(k) || (k === 'title' && /boxes\[/.test(path)) && !(k === 'label' && /briefing/.test(path))) continue
    if (k === 'label' && /bonus$/.test(path)) continue
    walk(`${path}.${k}`, e[k], r?.[k])
  }
}
walk('rules', en.rules, ru.rules)
walk('event', en.event, ru.event)
walk('locations', en.locations, ru.locations)
walk('agendas', en.agendas.map((a) => ({ achieved: a.achieved, primary: a.primary })), ru.agendas.map((a) => ({ achieved: a.achieved, primary: a.primary })))
walk('upgrades', en.upgrades.map((u) => ({ who: u.who, body: u.body, bonus: u.bonus })), ru.upgrades.map((u) => ({ who: u.who, body: u.body, bonus: u.bonus })))
// The lore (dominatusLore.js / dominatusLoreRu.js): every card has it, in both languages.
const loreOf = (d) => ({
  agendas: d.agendas.map((a) => a.lore),
  upgrades: d.upgrades.map((u) => u.lore),
  locations: d.locations.map((l) => l.lore),
  briefings: d.briefings.map((b) => ({ intro: b.intro, outcomes: b.outcomes })),
})
const loreEn = loreOf(en)
for (const [k, list] of Object.entries(loreEn)) list.forEach((x, i) => { if (!x) issues.push(`lore ${k}[${i}]: none in EN`) })
for (const b of en.briefings) {
  const want = b.phase === 3 ? '0|1|2|3' : '0|1|2'
  if (Object.keys(b.outcomes || {}).sort().join('|') !== want) issues.push(`briefing ${b.alliance}-${b.phase}: outcomes ${Object.keys(b.outcomes || {})} (want ${want})`)
}
walk('lore', loreEn, loreOf(ru))
// nameRu presence
for (const a of ru.agendas) if (!a.nameRu) issues.push(`agenda ${a.slug}: no nameRu`)
for (const u of ru.upgrades) if (!u.nameRu) issues.push(`upgrade ${u.slug}: no nameRu`)
for (const l of ru.locations) { if (!l.bonus.nameRu) issues.push(`loc ${l.slug}: no bonus nameRu`); l.warZone.forEach((w, i) => { if (!w.nameRu) issues.push(`loc ${l.slug} wz${i}: no nameRu`) }) }


  return issues
}

describe('Dominatus EN↔RU', () => {
  it('says every string in Russian, in the same shape', () => {
    expect(parityIssues()).toEqual([])
  })
})
