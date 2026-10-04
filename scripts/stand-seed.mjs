#!/usr/bin/env node
// The stand's seed page: the test rosters (lib/test-rosters.mjs) and the test games
// (lib/test-games.mjs) written to public/_seed.json, with public/_seed.html beside it. Open
// http://localhost:<port>/_seed.html in ANY browser — storage is per browser and per port — and
// both land in that browser's storage: the lists in the builder, the games in the tracker's
// history, ready for "Resume game". The player's own lists and games are left alone; running the
// page again replaces only what it put there (roster ids `test-…`, game ids `seed-…`).
// Both files are git-ignored: they are the stand's, built from the data of the day.
//
// Usage: npm run stand:seed            (then open /_seed.html on the stand)
import fs from 'node:fs'
import { nextTick } from 'vue'

// The tracker store persists to localStorage; under Node it gets a throwaway one.
const mem = new Map()
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  clear: () => mem.clear(),
}

const { TEST_ROSTERS, buildTestRoster } = await import('./lib/test-rosters.mjs')
const { playTestGames } = await import('./lib/test-games.mjs')
const { loadRosterFaction, rosterItems } = await import('../src/data/roster/index.js')
const { SCHEMA_VERSION } = await import('../src/composables/useRosters.js')
const mod = await import('../src/composables/useTracker.js')

const now = Date.now()
const rosters = []
for (const spec of TEST_ROSTERS) {
  const faction = await loadRosterFaction(spec.faction, { allies: true })
  rosters.push(buildTestRoster(spec, { faction, items: rosterItems.items }, { now: now - rosters.length * 1000 }))
}
const games = await playTestGames(mod, mod.useTracker(), nextTick, { now })

fs.writeFileSync('public/_seed.json', JSON.stringify({ v: SCHEMA_VERSION, rosters, games }))
fs.writeFileSync('public/_seed.html', `<!doctype html><meta charset="utf-8"><title>Seed</title>
<body style="background:#222;color:#ddd;font:16px sans-serif;padding:2rem"><p id="m">Загружаю ростеры и партии…</p>
<script>
const say = (t) => { document.getElementById('m').textContent = t }
fetch('/_seed.json').then((r) => r.json()).then((s) => {
  const RK = 'wh11ed-rosters', HK = 'wh11ed-tracker-history', CK = 'wh11ed-tracker-current'
  const store = JSON.parse(localStorage.getItem(RK) || 'null')
  // Lists saved under another schema would be stamped with this one unmigrated — open the app
  // once (it migrates on load) and come back.
  if (store && store.v !== s.v) return say('Ростеры здесь в схеме v' + store.v + ', сид — v' + s.v + '. Откройте приложение, потом эту страницу ещё раз.')
  const own = (store?.rosters || []).filter((r) => !String(r.id).startsWith('test-'))
  localStorage.setItem(RK, JSON.stringify({ v: s.v, rosters: [...s.rosters, ...own] }))
  const hist = JSON.parse(localStorage.getItem(HK) || '[]').filter((g) => !String(g.id).startsWith('seed-'))
  if (String(JSON.parse(localStorage.getItem(CK) || '{}').id).startsWith('seed-')) localStorage.removeItem(CK)
  localStorage.setItem(HK, JSON.stringify([...s.games, ...hist]))
  location.replace('/ru/tracker')
}).catch((e) => say('Не вышло: ' + e.message + '. Запущен ли npm run stand:seed?'))
</script>
`)
console.log(`✓ ${rosters.length} rosters, ${games.length} games → public/_seed.json; open /_seed.html on the stand`)
