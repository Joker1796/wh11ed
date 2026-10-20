// The game's own content between two app versions — appdata's factions/_core-content.json: battle
// sizes, Force Dispositions, the core stratagems, the primary and secondary missions, the twists and
// the matrix that deals a primary mission for each pair of dispositions. The page skipped the file
// until 2026-10-20 (gen-patch-notes reads factions/ by a pattern that leaves out `_` files), so a
// change to a mission would have reached the tracker and never the patch notes.
//
// Nothing in it had changed by then: 963 and 981 only listed things in another order (Insane
// Bravery moved), which pairing by id and name reads as nothing, and the build fields appdata added
// later (a stratagem's `turn`, its second effect) are compared only where both versions carry them.
import { changed, diffStratagem, pair, pushIf, readable, sameText } from './diff-bundles.mjs'

const ROUNDS = { firstBattleRound: 1, secondBattleRound: 2, thirdBattleRound: 3, fourthBattleRound: 4, fifthBattleRound: 5 }
const ACTION = ['starts', 'units', 'useLimit', 'completes', 'effect', 'restriction']

// A mission card as one text, a line per thing a player reads off it — what scores, when, how much.
// The lore is flavour and stays out.
function missionText(m) {
  const lines = []
  if (m.whenDrawn) lines.push(m.whenDrawn)
  if (m.rules) lines.push(m.rules)
  for (const o of m.objectives || []) {
    const rounds = (o.scorablePeriods || []).map((p) => ROUNDS[p]).filter(Boolean)
    lines.push(`**${o.name}**${o.when ? ` — ${o.when}` : ''}${rounds.length ? ` (${rounds.join(', ')})` : ''}`)
    for (const s of o.scoring || []) lines.push(`▪ ${s.text} ${s.vp} VP${s.vpCap ? ` (max ${s.vpCap})` : ''}`)
  }
  for (const a of m.actions || []) {
    lines.push(`**${a.name}**`)
    for (const k of ACTION) if (a[k]) lines.push(`▪ ${a[k]}`)
  }
  return lines.join('\n')
}

const NUMBERS = ['points', 'dp', 'enhancementLimit', 'duplicateUnitLimit']

export function diffCoreContent(a, b) {
  // A version without the file says nothing about what changed.
  if (!a || !b) return []
  const out = []
  const core = { faction: null }

  const sizes = pair(a.battleSizes, b.battleSizes)
  for (const x of sizes.added) out.push({ ...core, kind: 'battleSize', name: x.name, change: 'added', fields: NUMBERS.map((k) => ({ field: k, from: '', to: String(x[k] ?? '') })) })
  for (const x of sizes.removed) out.push({ ...core, kind: 'battleSize', name: x.name, change: 'removed' })
  for (const [o, n] of sizes.both) {
    pushIf(out, changed(o, n, { ...core, kind: 'battleSize' }, NUMBERS.filter((k) => String(o[k] ?? '') !== String(n[k] ?? '')).map((k) => ({ field: k, from: String(o[k] ?? ''), to: String(n[k] ?? '') }))))
  }

  const dispositions = pair(a.forceDispositions, b.forceDispositions)
  for (const x of dispositions.added) out.push({ ...core, kind: 'forceDisposition', name: x.name, change: 'added' })
  for (const x of dispositions.removed) out.push({ ...core, kind: 'forceDisposition', name: x.name, change: 'removed' })
  for (const [o, n] of dispositions.both) pushIf(out, changed(o, n, { ...core, kind: 'forceDisposition' }, []))

  const strats = pair(a.coreStratagems, b.coreStratagems)
  for (const x of strats.added) out.push({ ...core, kind: 'stratagem', name: x.name, change: 'added', to: readable(x.effect) })
  for (const x of strats.removed) out.push({ ...core, kind: 'stratagem', name: x.name, change: 'removed' })
  for (const [o, n] of strats.both) pushIf(out, changed(o, n, { ...core, kind: 'stratagem' }, diffStratagem(o, n)))

  for (const [type, list] of [['primary', 'primaryMissions'], ['secondary', 'secondaryMissions'], ['twist', 'twists']]) {
    const m = pair(a[list], b[list])
    for (const x of m.added) out.push({ ...core, kind: 'mission', type, name: x.name, change: 'added', to: readable(missionText(x)) })
    for (const x of m.removed) out.push({ ...core, kind: 'mission', type, name: x.name, change: 'removed' })
    for (const [o, n] of m.both) {
      const fields = sameText(missionText(o), missionText(n)) ? [] : [{ field: 'text', from: readable(missionText(o)), to: readable(missionText(n)) }]
      pushIf(out, changed(o, n, { ...core, kind: 'mission', type }, fields))
    }
  }

  // Which primary mission a pair of dispositions plays, by the missions' names (their ids moved in
  // 963 with everything else).
  const missionName = (side, id) => (side.primaryMissions || []).find((x) => x.id === id)?.name || ''
  const cells = (side) => new Map((side.dispositionPrimaryMap || []).map((c) => [`${c.friendly} / ${c.opposition}`, missionName(side, c.primaryMissionId)]))
  const ca = cells(a)
  const cb = cells(b)
  for (const [k, to] of cb) {
    const from = ca.get(k)
    if (from !== undefined && from !== to) out.push({ ...core, kind: 'missionMatrix', name: k, change: 'changed', fields: [{ field: 'primary', from, to }] })
  }
  return out
}
