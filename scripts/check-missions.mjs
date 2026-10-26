// GATE: the parts of the missions sync-tracker does not compare (`npm run missions`). Its row
// diff reads each card's scoring lines and VP; until 2026-10-19 nothing read the rest appdata
// carries, and every one of these was transcribed by hand from the card images:
//   - the mission pack's limits (mission_pack: 45 / 15 a round for the primary and the
//     secondaries, 20 per fixed secondary, +10 Battle Ready) against gameScoring's constants and
//     the tracker's PRIMARY_ROUND_CAP;
//   - a tactical card's "up to 5VP" (`vpCap`) against TACTICAL_SECONDARY_CAP;
//   - which secondaries may be fixed (`isFixedSecondary`) against our card's category;
//   - which have a WHEN DRAWN rule, and the one that cannot score in the first turn
//     (`isScorableFirstTurn`: Defend Stronghold) against our first-round gate;
//   - every Action's five lines (starts / units / use limit / completes / effect) against the
//     action block of our card — by words, the cards being transcribed in their own wording.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { APPDATA, ROOT, loadJson } from './lib/sync-common.mjs'
import { foldName } from '../src/core/shared/foldName.js'
import { plainText } from './sync-faction-text.mjs'

export async function run() {
  const core = loadJson(path.join(APPDATA, 'factions', '_core-content.json'))
  const packs = loadJson(path.join(APPDATA, 'tables', 'mission_pack.json'))
  if (!core || !packs) { console.log(`missions: wh40k-appdata not found at ${APPDATA}`); return 1 }
  const fails = []

  // ── The pack's limits ──
  const scoring = fs.readFileSync(path.join(ROOT, 'src/composables/gameScoring.js'), 'utf8')
  const tracker = fs.readFileSync(path.join(ROOT, 'src/composables/useTracker.js'), 'utf8')
  const num = (src, name) => Number(src.match(new RegExp(`export const ${name} = (\\d+)`))?.[1])
  const pack = packs.find((p) => !/combat patrol/i.test(p.localisations?.en?.name || ''))
  for (const [field, ours, label] of [
    ['primaryMissionScoreGameLimit', num(scoring, 'PRIMARY_GAME_CAP'), 'PRIMARY_GAME_CAP'],
    ['primaryMissionScoreBattleRoundLimit', num(tracker, 'PRIMARY_ROUND_CAP'), 'PRIMARY_ROUND_CAP'],
    ['secondaryMissionScoreGameLimit', num(scoring, 'SECONDARY_GAME_CAP'), 'SECONDARY_GAME_CAP'],
    ['secondaryMissionScoreBattleRoundLimit', num(scoring, 'SECONDARY_ROUND_CAP'), 'SECONDARY_ROUND_CAP'],
    ['fixedSecondaryMissionCapLimit', num(scoring, 'FIXED_SECONDARY_CAP'), 'FIXED_SECONDARY_CAP'],
    ['battleReadyArmyPointModifier', num(scoring, 'BATTLE_READY_VP'), 'BATTLE_READY_VP'],
  ]) {
    if (pack?.[field] !== ours) fails.push(`mission pack ${field} ${pack?.[field]}, ours ${label} = ${ours}`)
  }
  const tacticalCap = num(scoring, 'TACTICAL_SECONDARY_CAP')
  for (const s of core.secondaryMissions || []) {
    for (const o of s.objectives || []) for (const r of o.scoring || []) {
      if (r.vpCap != null && r.vpCap !== tacticalCap) fails.push(`${s.name}: a row capped at ${r.vpCap}VP, ours TACTICAL_SECONDARY_CAP = ${tacticalCap}`)
    }
  }

  // Actions, by words: our cards are transcribed from the images in their own wording.
  const words = (t) => new Set(plainText(t).toLowerCase().replace(/[^a-z0-9"+ ]/g, ' ').split(/\s+/).filter((w) => w.length > 2))
  const covered = (app, our) => {
    const a = words(app)
    if (!a.size) return true
    const b = words(our)
    return [...a].filter((w) => b.has(w)).length / a.size >= 0.7
  }
  // ── The cards ──
  const { missions } = await import(pathToFileURL(path.join(ROOT, 'src/data/missions.js')).href)
  const key = (n) => foldName(String(n || ''))
  const ours = (list, name) => (missions.en[list] || []).filter((m) => key(m.name) === key(name))
  for (const s of core.secondaryMissions || []) {
    const cards = ours('secondary', s.name)
    if (!cards.length) { fails.push(`secondary "${s.name}": no card of ours`); continue }
    for (const c of cards) {
      const fixed = /fixed/i.test(c.category || '')
      if (fixed !== !!s.isFixedSecondary) fails.push(`secondary "${c.name}" (${c.role}): ${s.isFixedSecondary ? 'may be Fixed in the app' : 'is Tactical only in the app'}, ours "${c.category}"`)
      // appdata's `whenDrawn` is the card's text above its scoring — a WHEN DRAWN rule or a
      // designer's note — and our briefing carries it in the card's own wording.
      const brief = (c.briefing || []).map((b) => `${b.label || ''} ${b.text || ''} ${(b.rows || []).map((r) => r.text).join(' ')}`).join(' ')
      if ((s.whenDrawn || '').trim() && !covered(s.whenDrawn, brief)) fails.push(`secondary "${c.name}" (${c.role}): the app's «${plainText(s.whenDrawn).slice(0, 100)}» is not in our briefing`)
      const firstTurn = s.isScorableFirstTurn !== false && s.isScorableFirstTurn != null
      if (!firstTurn && c.whenDrawn?.gate !== 'first-round') fails.push(`secondary "${c.name}" (${c.role}): the app does not score it in the first turn, ours has no first-round gate`)
    }
  }

  for (const [list, src] of [['primary', core.primaryMissions], ['secondary', core.secondaryMissions]]) {
    for (const m of src || []) {
      for (const act of m.actions || []) {
        for (const c of ours(list, m.name)) {
          const block = (c.briefing || []).find((b) => b.action && key(b.action) === key(act.name))
          if (!block) { fails.push(`${list} "${c.name}"${c.role ? ` (${c.role})` : ''}: action "${act.name}" not on the card`); continue }
          const text = block.rows.map((r) => `${r.label}: ${r.text}`).join(' ')
          for (const f of ['starts', 'units', 'useLimit', 'completes', 'effect', 'restriction']) {
            if (act[f] && !covered(act[f], text)) fails.push(`${list} "${c.name}"${c.role ? ` (${c.role})` : ''}: action "${act.name}" ${f} reads differently in the app — «${plainText(act[f]).slice(0, 120)}»`)
          }
        }
      }
    }
  }

  if (fails.length) {
    console.log(`missions: ${fails.length} difference(s) from the app\n  ${fails.join('\n  ')}`)
    return 1
  }
  console.log('missions: the pack limits, every card\'s fixed / WHEN DRAWN / first-turn marks and every Action match the app.')
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exitCode = await run()
