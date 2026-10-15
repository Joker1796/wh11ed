// Generate src/data/combatPatrolMissionsData.js — how a Combat Patrol game is played, from
// wh40k-appdata: the "Combat Patrol" mission pack (one primary mission per box, keyed by the box's
// detachment) and the "Combat Patrol" publication's mission sequence (twelve steps, three
// deployment maps). Until 2026-10-15 none of it was on the site, and the tracker's Combat Patrol
// mode played the Chapter Approved missions — a player asked where the missions were.
//
// Shape:
//   boxes: [{ id, slug, rule }]           — every box, its faction and its detachment rule's name
//   missions: { "<box id>": mission }   — the box id of src/data/combatPatrol.js
//     mission = { type: 'primary', slug: 'cp-<box id>', name, lore?, briefing?, blocks }, the shape
//     of a src/data/missions.js primary, so MissionCard and the tracker's scoring read it as one;
//     plus `rounds` on every block — the battle rounds it scores in, from appdata's own periods
//     (5 for "End of the Battle"), where a Chapter Approved block's are read off its heading.
//   sequence: [{ id, title, body }]      — the twelve steps, `body` in wh11ed block markup
//   layouts: [{ id: 'A'|'B'|'C', image }] — the deployment maps, saved under public/images/combat-patrol/
//
// Text is plain in a mission (the cards render it as text, like missions.js) and markup in the
// sequence (rendered by RuleBody). EN only — the RU overlay is src/data/combatPatrolMissionsRu.js,
// written by hand and held to this file by src/data/combatPatrolMissions.test.js.
//
// A box with no mission, a mission with no box, and a layout picture whose URL changed all fail
// the run: the first two are a box GW added or renamed, the third a map GW redrew — download it
// under a NEW name (public/images/CLAUDE.md: an image is never replaced in place).
//
// Usage:
//   node scripts/gen-combat-patrol-missions.mjs           # write the file
//   node scripts/gen-combat-patrol-missions.mjs --check   # non-zero exit if it would change
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, SLUG_MAP, APPDATA, appdataToParagraphs, loadJson, nameOfEn, norm, table } from './lib/sync-common.mjs'
import { combatPatrol } from '../src/data/combatPatrol.js'

const OUT = path.join(ROOT, 'src/data/combatPatrolMissionsData.js')

// The deployment maps as saved here, by the CDN URL appdata gives each. A new URL is a redrawn map.
const LAYOUT_IMAGES = {
  'https://d3ocysny7bghv8.cloudfront.net/82e08cef-90a9-4fb7-920e-4f8d05e151c4': '/images/combat-patrol/layout-a.webp',
  'https://d3ocysny7bghv8.cloudfront.net/8354aea5-9750-498b-a227-9d1875e9db85': '/images/combat-patrol/layout-b.webp',
  'https://d3ocysny7bghv8.cloudfront.net/346a8c02-f2b2-4e25-9592-280c63cf46f3': '/images/combat-patrol/layout-c.webp',
}

const PERIODS = ['firstBattleRound', 'secondBattleRound', 'thirdBattleRound', 'fourthBattleRound', 'fifthBattleRound']

// A mission row is plain text: a keyword keeps its capitals (the house convention), the rest of
// appdata's markup goes.
function plain(html) {
  return (html || '')
    .replace(/<k>(.*?)<\/k>/gis, (_, k) => k.toUpperCase())
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
// "SECOND BATTLE ROUND ONWARDS" → "Second Battle Round Onwards", as missions.js writes headings.
const SMALL = new Set(['of', 'the', 'to', 'and'])
function titleCase(s) {
  return s.toLowerCase().split(' ').map((w, i) => (i && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(' ')
}
const noStop = (s) => (s || '').replace(/\.\s*$/, '')
// One box writes its heading its own way; the rest of the cards say it like this.
const HEADINGS = { 'Battle Round 2+': 'Second Battle Round Onwards' }

function buildMission(m, box, t) {
  const en = m.localisations.en
  const mission = { type: 'primary', slug: `cp-${box.id}`, name: en.name }
  if (en.lore) mission.lore = plain(en.lore)
  const briefing = []
  // "<b>START OF THE BATTLE:</b> Select one enemy unit…" — a labelled paragraph, as a card prints it.
  if (en.description) {
    const lm = /^\s*<b>([^<]+?):?\s*<\/b>:?\s*([\s\S]*)$/i.exec(en.description)
    briefing.push(lm ? { label: titleCase(lm[1].replace(/:$/, '')), text: plain(lm[2]) } : { text: plain(en.description) })
  }
  for (const a of t.actions.get(m.id) || []) {
    const al = a.localisations.en
    const rows = [['Starts', al.startsText], ['Units', al.unitsText], ['Use Limit', al.useLimitText],
      ['Completes', al.completesText], ['Effect', al.effectText], ['Restriction', al.restrictionText]]
      .filter(([, v]) => v).map(([label, v]) => ({ label, text: plain(v) }))
    briefing.push({ action: al.name, rows })
  }
  if (briefing.length) mission.briefing = briefing
  // Objectives in the order they come round: by the first round they score in, "End of the Battle"
  // last. appdata gives most of them the same displayOrder, so its own order means nothing.
  const firstRound = (o) => {
    const ps = t.periods.get(o.id) || []
    const i = Math.min(...ps.map((p) => PERIODS.indexOf(p)).filter((x) => x >= 0))
    return Number.isFinite(i) ? i : PERIODS.length
  }
  const objs = [...(t.objectives.get(m.id) || [])].sort((a, b) => a.displayOrder - b.displayOrder || firstRound(a) - firstRound(b))
  objs.sort((a, b) => firstRound(a) - firstRound(b))
  mission.blocks = objs.map((o) => {
    const ol = o.localisations.en
    const ps = t.periods.get(o.id) || []
    const rounds = ps.includes('endOfBattle') ? [5] : PERIODS.map((p, i) => (ps.includes(p) ? i + 1 : 0)).filter(Boolean)
    const block = { heading: HEADINGS[ol.name] || titleCase(ol.name), rounds }
    if (ol.whenText) block.when = noStop(plain(ol.whenText))
    block.rows = [...(t.scoring.get(o.id) || [])].sort((a, b) => a.displayOrder - b.displayOrder).map((s) => {
      const row = { text: plain(s.localisations.en.scoringCriteria), vp: s.isCumulative ? `+${s.victoryPoints}` : s.victoryPoints }
      if (s.isCumulative) row.modifier = 'cumulative'
      return row
    })
    return block
  })
  return mission
}

export function build() {
  const pack = table('mission_pack.json').find((p) => nameOfEn(p) === 'Combat Patrol')
  if (!pack) throw new Error('no "Combat Patrol" mission pack in appdata')
  const group = (rows, key) => rows.reduce((m, r) => m.set(r[key], [...(m.get(r[key]) || []), r]), new Map())
  const missions = table('primary_mission.json').filter((m) => m.missionPackId === pack.id)
  const t = {
    objectives: group(table('primary_mission_objective.json'), 'primaryMissionId'),
    scoring: group(table('primary_mission_objective_scoring.json'), 'primaryMissionObjectiveId'),
    periods: new Map([...group(table('primary_mission_objective_scorable_period.json'), 'primaryMissionObjectiveId')]
      .map(([k, rows]) => [k, rows.map((r) => r.scorablePeriod)])),
    actions: group(table('primary_mission_action.json'), 'primaryMissionId'),
  }
  const problems = []
  const cpPubByBox = new Map(table('publication.json').filter((p) => p.isCombatPatrol).map((p) => [norm(nameOfEn(p).replace(/^Combat Patrol:\s*/i, '')), p.id]))
  const pubOfDatasheet = new Map(table('datasheet.json').map((d) => [d.id, d.publicationId]))
  // `boxes`: which box an army in a game is playing, without loading combatPatrol.js — the
  // tracker's store matches the army's detachment against `rule` (combatPatrolBox.js).
  const out = { boxes: combatPatrol.en.factions.map((b) => ({ id: b.id, slug: b.slug, rule: b.rule?.name || '' })), missions: {}, sequence: [], layouts: [] }
  const used = new Set()
  for (const box of combatPatrol.en.factions) {
    const bundle = loadJson(path.join(APPDATA, 'factions', `${SLUG_MAP[box.slug] || box.slug}.json`))
    const det = (bundle?.detachments || []).find((d) => d.isCombatPatrol && norm(d.name) === norm(box.boxName))
    // What the box holds, unit by unit: appdata files a box's datasheets under its own publication,
    // and a box with two units of one name files that name twice (orks' 'Ardmob: two Boyz, their
    // Boss Nobs armed differently). combatPatrol.js writes one entry per datasheet with `count` for
    // identical twins — until 2026-10-15 it held one of each, and the sync compared name SETS.
    if (det) {
      const pub = cpPubByBox.get(norm(det.name))
      const app = new Map()
      for (const d of (bundle.datasheets || []).filter((d) => d.isCombatPatrol && pub && pubOfDatasheet.get(d.id) === pub)) app.set(norm(d.name), (app.get(norm(d.name)) || 0) + 1)
      const ours = new Map()
      for (const d of box.datasheets || []) ours.set(norm(d.name), (ours.get(norm(d.name)) || 0) + (d.count || 1))
      for (const n of new Set([...app.keys(), ...ours.keys()])) {
        if ((app.get(n) || 0) !== (ours.get(n) || 0)) problems.push(`${box.id}: "${n}" — appdata has ${app.get(n) || 0} unit(s), combatPatrol.js ${ours.get(n) || 0}`)
      }
    }
    const m = det && missions.find((x) => x.detachmentId === det.id)
    if (!m) { problems.push(`${box.id} (${box.boxName}): no Combat Patrol mission in appdata`); continue }
    used.add(m.id)
    out.missions[box.id] = buildMission(m, box, t)
  }
  for (const m of missions) if (!used.has(m.id)) problems.push(`mission "${nameOfEn(m)}" belongs to no box of combatPatrol.js (detachment ${m.detachmentId})`)

  // The mission sequence: the "Combat Patrol" publication's one rule section.
  const pub = table('publication.json').find((p) => nameOfEn(p) === 'Combat Patrol')
  const section = pub && table('rule_section.json').find((s) => s.publicationId === pub.id)
  if (!section) throw new Error('no "Combat Patrol" publication / rule section in appdata')
  const containers = table('rule_container.json').filter((c) => c.ruleSectionId === section.id).sort((a, b) => a.displayOrder - b.displayOrder)
  const comps = group(table('rule_container_component.json'), 'ruleContainerId')
  for (const c of containers) {
    const title = c.localisations.en.title || nameOfEn(c)
    const parts = []
    let header = null
    for (const p of [...(comps.get(c.id) || [])].sort((a, b) => a.displayOrder - b.displayOrder)) {
      const l = p.localisations?.en || {}
      if (p.type === 'header') { header = (l.textContent || l.title || '').trim(); continue }
      if (p.type === 'image') {
        const image = LAYOUT_IMAGES[p.imageUrl]
        if (!image) { problems.push(`${title}: a deployment map with a new URL ${p.imageUrl} — GW redrew it; save it under a new name and add it to LAYOUT_IMAGES`); continue }
        const id = (/Layout ([ABC])/.exec(header || '') || [])[1]
        if (!id) { problems.push(`${title}: a picture under "${header}", which names no layout`); continue }
        out.layouts.push({ id, image })
        continue
      }
      parts.push(appdataToParagraphs(l.textContent || l.text || ''))
    }
    out.sequence.push({ id: slug(title), title, body: tidySequence(parts.filter(Boolean).join('\n\n')) })
  }
  for (const id of ['A', 'B', 'C']) if (!out.layouts.some((l) => l.id === id)) problems.push(`deployment map ${id} is missing`)
  return { out, problems }
}

const slug = (s) => s.toLowerCase().replace(/[’'`]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// appdata writes the D6 table as loose lines and the three banned stratagems run together
// ("Crushing ImpactExplosivesRapid Ingress"), a <li> list the converter left glued. Both are put
// back into the shapes the page renders.
function tidySequence(body) {
  return body
    .replace(/\bD6\s+Deployment Map\s+1-2\s+Layout A\s+3-4\s+Layout B\s+5-6\s+Layout C\b/, '◈ D6 | Deployment Map\n◈ 1–2 | Layout A\n◈ 3–4 | Layout B\n◈ 5–6 | Layout C')
}

export async function run(argv = process.argv.slice(2)) {
  const CHECK = argv.includes('--check')
  const { out, problems } = build()
  // A JS module, not JSON: the scripts import the data files directly, and Node will not import a
  // .json without an import attribute.
  const json = `// Generated by scripts/gen-combat-patrol-missions.mjs from wh40k-appdata — do not edit by hand.\nexport const combatPatrolMissionsData = ${JSON.stringify(out, null, 1)}\n`
  console.log(`Combat Patrol: ${Object.keys(out.missions).length} missions, ${out.sequence.length} sequence steps, ${out.layouts.length} deployment maps`)
  if (problems.length) {
    console.log(`\n  ✗ ${problems.length} problem(s):\n${problems.map((p) => `    - ${p}`).join('\n')}`)
    return 1
  }
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : ''
  if (CHECK) {
    if (current !== json) { console.log('  --check: src/data/combatPatrolMissionsData.js would change — run `npm run combat-patrol:missions`'); return 1 }
    console.log('  --check: up to date.')
    return 0
  }
  fs.writeFileSync(OUT, json)
  console.log(`  wrote ${path.relative(ROOT, OUT)}`)
  return 0
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) process.exitCode = await run()
