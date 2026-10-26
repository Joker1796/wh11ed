// The test games — one per tracker configuration worth looking at by hand, built from a short spec
// and PLAYED through the real store (useTracker.js) up to the moment the spec names, so a game has
// what a real one would: scores per round, Core CP from the ledger, cards set aside. A stored game
// would rot like a stored roster: missions, settings and the game's shape move release to release.
//
// Readers:
//   - `npm run stand:seed` writes them, with the test rosters, into the stand's seed page
//     (public/_seed.html) — open it in any browser and the games are in its history, ready for
//     "Resume game";
//   - `test-games.test.js` plays each one and holds it to where it was meant to stop.
//
// Spec: { key, title, track, sides, upTo, doubles?, fixed?, twist?, scoreMode? }
//   (about half the set plays to Battle Points — the result screen differs, owner 2026-10-04)
//   track  — the tracker options (trackerOptions.js `setting` → bool);
//   sides  — two armies, each [factionSlug] or [null, testRosterKey] (a list attached; its faction
//            and detachments come from the list); doubles: two such armies per side;
//   upTo   — [round, turn (0 first, 1 second), phase?] where the game stops, or null for a game
//            set up but not begun (the "Start game" button);
//   fixed  — the first side plays fixed secondaries instead of tactical ones;
//   oppFirst — the opponent takes the first turn (the game puts them at index 0, you on the right);
//            about half the set, crossed with the VP/BP half.
import { TEST_ROSTERS, buildTestRoster } from './test-rosters.mjs'
import { numericVp } from '../../src/core/game/missionCards.js'
import { loadRosterFaction, rosterItems } from '../../src/data/roster/index.js'
import { rosterSnapshot } from '../../src/composables/rosterGameLink.js'
import { detachmentsFor, detachmentInfo } from '../../src/composables/trackerFactions.js'
import { defaultTrackSettings, TRACK_PRESETS } from '../../src/data/trackerOptions.js'

const ALL_ON = Object.fromEntries(Object.keys(defaultTrackSettings()).map((k) => [k, true]))
const ALL_OFF = Object.fromEntries(Object.keys(defaultTrackSettings()).map((k) => [k, false]))
const NO_PHASES = { ...ALL_ON, trackPhases: false, trackPhaseRules: false }
// The three presets on one game — same armies, same moment — so the setup's preset dialog can show
// what each does to the game screen (its pictures are shot from these: public/images/tracker/).
const PRESET = (id) => TRACK_PRESETS.find((p) => p.id === id).values

export const TEST_GAMES = [
  { key: 'minimal', title: 'Минимум: без ростеров, без фаз, только счёт и CP',
    track: { ...ALL_OFF, trackCP: true }, sides: [['orks'], ['space-marines']], upTo: [2, 1], oppFirst: true },
  { key: 'phases', title: 'Без ростеров, с фазами и правилами фазы',
    track: { ...ALL_OFF, trackCP: true, trackPhases: true, trackPhaseRules: true, trackArmyYou: true, trackArmyOpp: true },
    sides: [['aeldari'], ['necrons']], upTo: [3, 0, 'shooting'], scoreMode: 'bp', oppFirst: true },
  { key: 'full', title: 'Ростеры у обоих, всё включено, фазы',
    track: ALL_ON, sides: [[null, 'leaders'], [null, 'havocs']], upTo: [2, 1, 'movement'] },
  { key: 'fixed', title: 'Ростер только у себя, без фаз, фиксированные вторичные',
    track: NO_PHASES, sides: [[null, 'breachers'], ['tyranids']], fixed: true, upTo: [4, 0], scoreMode: 'bp' },
  { key: 'not-begun', title: 'Не начата: ростеры, фазы — кнопка «Начать игру»',
    track: ALL_ON, sides: [[null, 'allies'], [null, 'legends']], upTo: null, oppFirst: true },
  { key: 'last-turn', title: 'Последний ход 5-го раунда, без фаз',
    track: NO_PHASES, sides: [['blood-angels'], ['tau-empire']], upTo: [5, 1], scoreMode: 'bp', oppFirst: true },
  { key: 'last-phase', title: 'Последний ход 5-го раунда, с фазами, фаза боя',
    track: ALL_ON, sides: [[null, 'leaders'], ['orks']], upTo: [5, 1, 'fight'] },
  { key: 'doubles', title: 'Doubles 2×2: ростер у одного из четырёх, фазы',
    track: ALL_ON, doubles: true,
    sides: [[[null, 'leaders'], ['adeptus-custodes']], [['chaos-space-marines'], ['death-guard']]], upTo: [2, 0, 'charge'], scoreMode: 'bp' },
  { key: 'own-limits', title: 'Свои лимиты против союзников, без фаз',
    track: NO_PHASES, sides: [[null, 'own-limits'], [null, 'allies']], upTo: [3, 1], oppFirst: true },
  { key: 'no-factions', title: 'Без фракций, твист, режим BP, фазы',
    track: { ...ALL_OFF, trackCP: true, trackPhases: true, trackPhaseRules: true },
    sides: [[null], [null]], twist: 'scrambled-communications', scoreMode: 'bp', upTo: [2, 0, 'command'], oppFirst: true },
  { key: 'errors', title: 'Ростер с ошибками против большого ростера, фазы',
    track: ALL_ON, sides: [[null, 'errors'], [null, 'unlimited']], upTo: [1, 1, 'shooting'], scoreMode: 'bp' },
  { key: 'preset-minimal', title: 'Пресет «Минимальный»',
    track: PRESET('minimal'), sides: [[null, 'leaders'], [null, 'havocs']], upTo: [2, 0, 'movement'] },
  { key: 'preset-base', title: 'Пресет «Базовый»',
    track: PRESET('base'), sides: [[null, 'leaders'], [null, 'havocs']], upTo: [2, 0, 'movement'] },
  { key: 'preset-maximal', title: 'Пресет «Максимальный»',
    track: PRESET('maximal'), sides: [[null, 'leaders'], [null, 'havocs']], upTo: [2, 0, 'movement'] },
  { key: 'chips', title: 'Больше всего чипов: Drukhari в Shooting phase соперника',
    track: ALL_ON, sides: [[null, 'chips'], ['space-marines']], upTo: [2, 1, 'shooting'] },
]

const rosterCache = new Map()
async function testRoster(key) {
  if (!rosterCache.has(key)) {
    const spec = TEST_ROSTERS.find((s) => s.key === key)
    if (!spec) throw new Error(`no test roster "${key}"`)
    const faction = await loadRosterFaction(spec.faction, { allies: true })
    rosterCache.set(key, buildTestRoster(spec, { faction, items: rosterItems.items }))
  }
  return rosterCache.get(key)
}

// One army: a faction alone (its first detachment), or an attached list (its detachments).
async function army([slug, key], name) {
  if (key) {
    const r = await testRoster(key)
    return { name, factionSlug: r.faction, detachments: [...r.detachments], rosterId: r.id, roster: rosterSnapshot(r) }
  }
  if (!slug) return { name, factionSlug: null, detachments: [], rosterId: null, roster: null }
  const det = detachmentsFor(slug)[0]?.name
  return { name, factionSlug: slug, detachments: det ? [det] : [], rosterId: null, roster: null }
}

// The side's Force Disposition, as the setup wizard derives it: the detachment names it, the
// game stores its id.
function dispositionOf(DISPOSITIONS, armies) {
  for (const a of armies) {
    const name = a.detachments.flatMap((n) => detachmentInfo(a.factionSlug, n)?.forceDispositions || []).find(Boolean)
    const d = DISPOSITIONS.find((x) => x.name === name || x.id === name)
    if (d) return d.id
  }
  return null
}

// Plays every spec through `tracker` (a useTracker() instance) and returns the games as history
// records, finished 'early' — exactly what "put the game away" leaves, so each resumes. `mod` is
// the useTracker.js module; `tick` flushes Vue's watchers (the clock's settling runs in one).
export async function playTestGames(mod, tracker, tick, { now = Date.now() } = {}) {
  const t = tracker
  const out = []
  for (const [n, G] of TEST_GAMES.entries()) {
    const names = ['Я', 'Соперник']
    const players = []
    for (const [i, side] of G.sides.entries()) {
      const base = { role: i === 0 ? 'attacker' : 'defender', secondaryMode: G.fixed && i === 0 ? 'fixed' : 'tactical', fixedSecondaries: [], battleReady: i === 0 }
      if (G.doubles) {
        const members = [await army(side[0], `${names[i]} А`), await army(side[1], `${names[i]} Б`)]
        players.push({ ...base, teamName: '', members, name: '', factionSlug: null, detachments: [],
          disposition: dispositionOf(mod.DISPOSITIONS, members) || mod.DISPOSITIONS[i].id })
      } else {
        const a = await army(side, names[i])
        players.push({ ...base, ...a, disposition: dispositionOf(mod.DISPOSITIONS, [a]) || mod.DISPOSITIONS[(i + n) % mod.DISPOSITIONS.length].id })
      }
    }
    if (G.fixed) players[0].fixedSecondaries = mod.fixedPool('attacker').slice(0, 2).map((m) => m.slug)
    t.newGame({
      settings: {
        ...G.track, firstTurn: G.oppFirst ? 2 : 1, layout: 'A', customLayout: null, battleSize: 'strikeForce', combatPatrol: false,
        gameType: G.doubles ? 'doubles' : 'singles', dpPerPlayer: null, twist: G.twist || null, twistMission: null, scoreMode: G.scoreMode || 'vp',
      },
      players,
    })
    await tick()
    const g = t.current.value
    if (G.upTo) await playTo(mod, t, tick, g, G.upTo)
    // The history shows the "you" side's name (a team's in doubles): the game's number goes there,
    // the title is what the owner reads in the skill's table.
    g.players.find((p) => p.isYou).name = `Партия ${n + 1}`
    g.id = `seed-${G.key}`
    g.createdAt = new Date(now - n * 3600e3).toISOString()   // Партия 1 on top
    t.putAwayCurrent()
    await tick()
    const rec = JSON.parse(JSON.stringify(t.history.value[0]))
    if (!G.upTo) rec.begun = false   // put away before turn 1: it resumes to the Start button
    out.push(rec)
  }
  return out
}

// Turn by turn to [round, turn, phase]: the side whose turn it is takes its cards and scores its
// first one; at each second turn both sides score a primary row; a hand beyond two is set aside.
async function playTo(mod, t, tick, g, [R, T, P]) {
  t.beginGame()
  await tick()
  const firstRow = (blocks) => {
    const b = blocks.find((x) => x.rows.some((r) => numericVp(r.vp) > 0))
    const r = b?.rows.find((x) => numericVp(x.vp) > 0)
    return r ? [b.bi, r.ri] : null
  }
  for (;;) {
    const pi = g.currentTurn
    const pl = g.players[pi]
    t.takeRandomSecondaries(pi)
    if (g.currentTurn === 1) {
      for (const s of [0, 1]) {
        const at = firstRow(mod.scorableBlocks(g.players[s].primarySlug, undefined, g.currentRound))
        if (at) t.setPrimaryRow(s, g.currentRound - 1, at[0], at[1], 1)
      }
    }
    const card = pl.secondary.hand[0]
    const at = card && firstRow(mod.scorableBlocks(card, pl.role, g.currentRound))
    if (at) t.scoreSecondaryRow(pi, card, at[0], at[1], 1)
    if (pl.secondaryMode === 'tactical') for (const slug of pl.secondary.hand.slice(2)) t.discardFromHand(pi, slug)
    if (g.currentRound === R && g.currentTurn === T) break
    t.endTurn()
    await tick()
  }
  t.goToPhase(T, P || 'command')
  await tick()
}
