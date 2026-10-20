import { describe, it, expect, vi } from 'vitest'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { CUR_KEY } from './composables/gameInPlay.js'

// The game `npm run perf` measures the tracker's screen on (scripts/check-perf.mjs): a snapshot the
// tracker's own store made, the way the API stand's games are. The store needs a browser to run,
// which the perf script's Node does not have — so it is taken here and read back here.
// `WRITE_PERF_GAME=1 npx vitest run src/perfGame.test.js` takes a new one.
const FILE = join(import.meta.dirname, '../scripts/lib/perf-game.json')

describe('the perf game', () => {
  it('is a game in progress the current tracker still opens', async () => {
    if (process.env.WRITE_PERF_GAME) {
      localStorage.clear()
      vi.resetModules()
      const mod = await import('./composables/useTracker.js')
      const t = mod.useTracker()
      const [d0, d1] = mod.DISPOSITIONS.map((d) => d.id)
      t.newGame({
        // No mission aids: their secondaries dialog would stand over the screen being measured.
        settings: { trackCP: true, trackPhases: true, trackMissionAids: false, firstTurn: 1, layout: 'A', scoreMode: 'vp', battleSize: 'strikeForce', twist: null, twistMission: null },
        players: [
          { name: 'Perf A', factionSlug: 'necrons', detachments: ['Awakened Dynasty'], disposition: d0, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
          { name: 'Perf B', factionSlug: 'orks', detachments: ['War Horde'], disposition: d1, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
        ],
      })
      t.beginGame()
      writeFileSync(FILE, `${JSON.stringify(t.current.value, null, 1)}\n`)
    }
    localStorage.clear()
    localStorage.setItem(CUR_KEY, readFileSync(FILE, 'utf8'))
    vi.resetModules()
    const { useTracker } = await import('./composables/useTracker.js')
    const game = useTracker().current.value
    expect(game?.phase).toBe('playing')
    expect(game.players.map((p) => p.factionSlug)).toEqual(['necrons', 'orks'])
  })
})
