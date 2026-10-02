#!/usr/bin/env node
// gen-faction-rules.mjs — transcribe a faction's army rules and detachments from wh40k-appdata
// into the shape of src/data/factions/<slug>.js. For the day a codex replaces a faction wholesale
// (Orks 946, Space Marines 963), when a diff against the old file would be a rewrite anyway.
//
//   node scripts/gen-faction-rules.mjs <slug>                         # summary only
//   node scripts/gen-faction-rules.mjs <slug> --write                 # rewrite the EN file
//   node scripts/gen-faction-rules.mjs space-marines --write          # + the six Supplements
//
// --chapters=a,b folds in appdata's one-detachment "factions" of a Codex Supplement (Blade of
// Ultramar …) as detachments of <slug> locked to that Chapter (`chapter:` — the chapter picker's
// field). For space-marines it defaults to SM_SUPPLEMENT_BUNDLES (scripts/lib/sync-common.mjs).
//
// Sources, highest wins: the MFM (src/data/mfm/<slug>.js — enhancement points, detachment dp /
// forceDispositions / unique tag, and the "(Upgrade)"/"(Aura)" suffix appdata leaves off some
// names) over appdata (everything else). Combat Patrol army rules and detachments are dropped.
// Several army rules become one block — the page renders exactly one `armyRule` — with the others
// as `### ` subheadings, which the search index lists individually. Any other top-level field of
// the old file (`chapters`, …) is carried over. The RU overlay is NOT touched: it merges by array
// index, so it has to be rebuilt in its own pass (see DATA-SYNC.md §4).
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, APPDATA, SLUG_MAP, SM_SUPPLEMENT_BUNDLES, norm, looseName, appdataToParagraphs, loadJson, loadModule, table, nameOfEn, combatPatrolNames } from './lib/sync-common.mjs'
import { slugify } from '../src/data/slugify.js'

const slug = process.argv[2]
const WRITE = process.argv.includes('--write')
const chapterArg = process.argv.find((a) => a.startsWith('--chapters='))
const chapterSlugs = chapterArg ? chapterArg.replace('--chapters=', '').split(',').filter(Boolean)
  : process.argv[2] === 'space-marines' ? SM_SUPPLEMENT_BUNDLES : []
if (!slug || slug.startsWith('--')) {
  console.log('Usage: node scripts/gen-faction-rules.mjs <slug> [--chapters=a,b] [--write]')
  process.exit(1)
}

const bundleOf = (s) => loadJson(path.join(APPDATA, 'factions', `${SLUG_MAP[s] || s}.json`))
const bundle = bundleOf(slug)
if (!bundle) { console.error(`no appdata bundle for ${slug}`); process.exit(1) }
const file = path.join(ROOT, 'src/data/factions', `${slug}.js`)
const oldMod = (await loadModule(file)) || {}
const [binding, oldFaction] = Object.entries(oldMod)[0] || []
const oldEn = oldFaction?.en || {}
const mfmOf = async (s) => (await loadModule(path.join(ROOT, 'src/data/mfm', `${s}.js`)))?.default || {}
// The MFM prints a Chapter's own detachment on the Space Marines page as often as on its own
// (Deathwatch Support), so a Chapter looks there second. Names are matched loosely: the MFM and
// appdata disagree on hyphens and apostrophes ("War-tempered" / "War Tempered", "Stormseers’").
const loose = (s) => looseName(s).replace(/'/g, '')
const mfmDet = new Map()
const CHAPTERS = ['black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'space-wolves']
for (const s of [slug, ...(CHAPTERS.includes(slug) ? ['space-marines'] : [])]) {
  for (const d of (await mfmOf(s)).detachments || []) if (!mfmDet.has(loose(d.name))) mfmDet.set(loose(d.name), d)
}
const cp = combatPatrolNames()

// Emphasis inside a [WEAPON ABILITY] would break the KeywordPopover lookup ("[LETHAL HITS:
// **non**-MONSTER/VEHICLE]" — appdata bolds the "non").
const md = (s) => appdataToParagraphs(s).replace(/\[([^\]\n]*)\]/g, (m, inner) => `[${inner.replace(/\*\*/g, '')}]`)
const plain = (s) => md(s).replace(/^\*(.*)\*$/s, '$1').replace(/^_(.*)_$/s, '$1')

// A rule body: text blocks converted paragraph by paragraph, a `header` block as a `### ` line,
// the lore accordion kept aside as the flavour. appdata doubles the bold around an in-text
// heading ("<b><b>Assault Doctrine</b></b>") — that is a subheading too.
function ruleBody(body) {
  let flavor = ''
  const out = []
  for (const b of body || []) {
    if (b.type === 'loreAccordion' || b.type === 'quote') { flavor = flavor || plain(b.text); continue }
    if (b.type === 'header') { out.push(`### ${plain(b.title || b.text)}`); continue }
    const text = md((b.text || '').replace(/<b><b>(.*?)<\/b><\/b>/g, '\n### $1\n'))
    if (text) out.push(text.replace(/\*\*### (.*?)\*\*/g, '### $1').replace(/\n\n(### .*)\n\n/g, '\n\n$1\n'))
  }
  return { flavor, body: out.join('\n\n').replace(/\n{3,}/g, '\n\n').trim() }
}

// Whose turn and which category live in the raw stratagem table, not in the bundle (whose
// `category` is null for the new codices even where the table has one).
const stratRow = new Map(table('stratagem.json').map((r) => [r.id, r]))
const TURN = { yourTurn: 'your', opponentsTurn: 'opponent', eitherPlayer: 'either' }
const CATEGORY = { battleTactic: 'Battle Tactic', strategicPloy: 'Strategic Ploy', epicDeed: 'Epic Deed', wargear: 'Wargear' }

function stratagem(detName, s) {
  const row = stratRow.get(s.id) || {}
  const category = CATEGORY[row.category || s.category]
  return {
    name: s.name,
    sublabel: `${detName} – ${category ? `${category} ` : ''}Stratagem`,
    cp: `${s.cp}CP`,
    turn: TURN[row.key] || 'either',
    flavor: plain(s.lore),
    when: md(s.when),
    target: md(s.target),
    effect: md(s.effect),
    restrictions: md(s.restriction),
  }
}

// An enhancement that hands the bearer a weapon ends its text at "the following weapon:" — the
// profile is structural (lesson 54). Spelled out the way sync-enhancement-restrictions checks it.
const profileById = new Map(table('wargear_item_profile.json').map((r) => [r.id, r]))
const wargearAbility = new Map(table('wargear_ability.json').map((r) => [r.id, nameOfEn(r)]))
const profileAbilities = table('wargear_item_profile_wargear_ability.json')
const enhProfiles = table('enhancement_wargear_item_profile.json')
function grantedWeapons(enhId) {
  const rows = enhProfiles.filter((r) => r.enhancementId === enhId).map((r) => profileById.get(r.wargearItemProfileId)).filter(Boolean)
  return rows.map((p) => {
    const tags = profileAbilities.filter((r) => r.wargearItemProfileId === p.id).map((r) => wargearAbility.get(r.wargearAbilityId)).filter(Boolean)
    const skill = p.ballisticSkill ? `BS ${p.ballisticSkill}` : `WS ${p.weaponSkill}`
    const range = !p.range ? '' : /melee/i.test(p.range) ? 'Melee, ' : `Range ${p.range}, `
    return `\n▪ **${nameOfEn(p)}**${tags.length ? ` [${tags.join(', ').toUpperCase()}]` : ''} — ${range}A ${p.attacks}, ${skill}, S ${p.strength}, AP ${p.armourPenetration}, D ${p.damage}.`
  }).join('')
}

function detachment(d, chapter) {
  const m = mfmDet.get(loose(d.name))
  if (!m) console.log(`  ! detachment "${d.name}" is not in the MFM — dp/forceDispositions from appdata`)
  const mfmEnh = new Map((m?.enhancements || []).map((e) => [loose(e.name), e]))
  const rules = d.rules || []
  const main = rules[0] ? ruleBody(rules[0].body) : { flavor: '', body: '' }
  // A detachment with more than one rule (rare) keeps the rest as subheadings of the first.
  const extra = rules.slice(1).map((r) => { const b = ruleBody(r.body); return `### ${r.name}\n${b.body}` })
  const out = { id: slugify(d.name), name: d.name, source: 'codex' }
  if (chapter) out.chapter = chapter
  out.dp = m?.dp ?? d.dp
  out.forceDispositions = m?.forceDispositions ?? (d.forceDisposition ? [d.forceDisposition] : [])
  if (m?.unique) out.unique = m.unique
  out.rule = { name: rules[0]?.name || d.name, flavor: main.flavor, body: [main.body, ...extra].filter(Boolean).join('\n\n') }
  out.stratagems = (d.stratagems || []).map((s) => stratagem(d.name, s))
  out.enhancements = (d.enhancements || []).map((e) => {
    const me = mfmEnh.get(loose(e.name))
    if (!me) console.log(`  ! enhancement "${e.name}" (${d.name}) is not in the MFM — points from appdata`)
    return { name: me?.name || e.name, points: me?.points ?? e.cost ?? 0, flavor: plain(e.lore), body: md(e.rules) + grantedWeapons(e.id) }
  })
  return out
}

// Army rules: Combat Patrol copies out, one block with the rest as subheadings. The rule the old
// file led with stays in front when it survived, so its anchor id does not move; otherwise the one
// most of the faction's datasheets print (Combat Doctrines, not the one-line Warlord CP perk
// appdata happens to list first).
const armyRules = (bundle.armyRules || []).filter((r) => !cp.armyRuleIds.has(r.id))
const printedBy = (r) => (bundle.datasheets || []).filter((d) => (d.abilities || []).some((a) => a.type === 'faction' && norm(a.name) === norm(r.name))).length
const lead = armyRules.find((r) => norm(r.name) === norm(oldEn.armyRule?.name || ''))
  || [...armyRules].sort((a, b) => printedBy(b) - printedBy(a))[0]
const blocks = [lead, ...armyRules.filter((r) => r !== lead)]
const leadBody = ruleBody(lead?.body)
// "Special Move Types" ships with an empty body: the move types hang off it structurally
// (army_rule_behaviour_type), and the core ones have a Core Rules number on another row of the
// same name. Name them, with the number where there is one.
const behaviours = table('behaviour_type.json')
const refOf = (name) => behaviours.find((b) => norm(nameOfEn(b)) === norm(name) && b.localisations?.en?.ruleReference)?.localisations.en.ruleReference
function moveTypes(ruleId) {
  const names = table('army_rule_behaviour_type.json').filter((r) => r.armyRuleId === ruleId)
    .map((r) => nameOfEn(behaviours.find((b) => b.id === r.behaviourTypeId) || {})).filter(Boolean)
  if (!names.length) return ''
  return `Some rules allow a unit to make one of the following **move types**:\n${names.map((n) => {
    const ref = refOf(n)
    return `▪ **${n.toLowerCase()}**${ref ? ` (${ref})` : ''}`
  }).join('\n')}`
}
const armyRule = {
  id: slugify(lead?.name || ''),
  name: lead?.name || '',
  flavor: leadBody.flavor,
  body: [leadBody.body, ...blocks.slice(1).map((r) => {
    const body = ruleBody(r.body).body || moveTypes(r.id)
    if (!body) console.log(`  ! army rule "${r.name}" has no text in appdata — write it by hand`)
    return `### ${r.name}\n${body}`
  })].join('\n\n'),
}

const dets = (bundle.detachments || []).filter((d) => !d.isCombatPatrol && !cp.detachments.has(norm(d.name))).map((d) => detachment(d))
for (const cs of chapterSlugs) {
  const cb = bundleOf(cs)
  const chapter = cb?.faction?.name || cs
  for (const d of (cb?.detachments || []).filter((x) => !x.isCombatPatrol)) dets.push(detachment(d, chapter))
}

console.log(`${slug}: army rule "${armyRule.name}" + ${blocks.length - 1} folded (${blocks.slice(1).map((r) => r.name).join(', ') || '—'})`)
console.log(`  ${dets.length} detachments: ${dets.map((d) => d.name + (d.chapter ? ` [${d.chapter}]` : '')).join(', ')}`)
console.log(`  ${dets.reduce((n, d) => n + d.stratagems.length, 0)} stratagems, ${dets.reduce((n, d) => n + d.enhancements.length, 0)} enhancements`)
const oldNames = new Set((oldEn.detachments || []).map((d) => norm(d.name)))
const newNames = new Set(dets.map((d) => norm(d.name)))
console.log(`  kept: ${dets.filter((d) => oldNames.has(norm(d.name))).map((d) => d.name).join(', ') || '—'}`)
console.log(`  retired: ${(oldEn.detachments || []).filter((d) => !newNames.has(norm(d.name))).map((d) => d.name).join(', ') || '—'}`)

if (WRITE) {
  const src = fs.readFileSync(file, 'utf8')
  const header = (src.match(/^(\/\/.*\n)+/) || [''])[0]
  const carried = Object.fromEntries(Object.entries(oldEn).filter(([k]) => !['slug', 'name', 'armyRule', 'detachments', 'datasheets'].includes(k)))
  const en = { slug, name: oldEn.name || bundle.faction?.name, ...carried, armyRule, detachments: dets, datasheets: [] }
  const body = Object.entries(en).map(([k, v]) => `  ${k}: ${JSON.stringify(v, null, 2).replace(/\n/g, '\n  ')},`).join('\n')
  fs.writeFileSync(file, `${header}\nconst en = {\n${body}\n}\n\nexport const ${binding} = { en, ru: en }\n`)
  console.log(`  wrote ${path.relative(ROOT, file)}`)
  // The regenerated English comes back without the bold-term popovers; put them back.
  const { glossFaction, GLOSS_SLUGS } = await import('./gloss-bold-terms.mjs')
  if (GLOSS_SLUGS.includes(slug)) await glossFaction(slug)
}

