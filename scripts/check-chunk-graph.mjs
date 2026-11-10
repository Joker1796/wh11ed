#!/usr/bin/env node
// The chunk graph that keeps a release from renaming every page (runs after `vite build`).
//
// A chunk's hashed name covers the names of the chunks it imports. Until 2026-09-27 every page
// imported the ENTRY chunk — which holds the router, which names every page — so any page that
// changed (the changelog, on every release) renamed the entry and with it ~80 page chunks, and
// the installed app downloaded them all again after each deploy. vite.config.js now keeps the
// shared code in `app` and Vue in `vendor`, and the entry holds only main.js and the router.
// What has to stay true for that to work, checked on the built files:
//
//   1. No chunk imports the entry. One that does is renamed by every page change again.
//   2. `app` and `vendor` exist — the split is what the rest rests on.
//   3. The entry is small. A shared module that slipped out of `app` lands in the entry (it is
//      then reached from both), and the size says so before the cascade does.
//   4. Only main.js imports src/router/index.js — the constants the chrome needs are in
//      router/nav.js; importing the router from anywhere else pulls its page map into `app`.
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const ENTRY_MAX_BYTES = 40 * 1024
const errors = []

const html = readFileSync(join(DIST, 'index.html'), 'utf8')
const entry = html.match(/<script type="module"[^>]*src="\/assets\/(index-[\w-]+\.js)"/)?.[1]
if (!entry) errors.push('dist/index.html names no module entry under /assets/')

const assets = readdirSync(join(DIST, 'assets'))
if (entry) {
  for (const f of assets.filter((a) => a.endsWith('.js') && a !== entry)) {
    if (readFileSync(join(DIST, 'assets', f), 'utf8').includes(entry)) {
      errors.push(`${f} imports the entry chunk ${entry}`)
    }
  }
  const size = readFileSync(join(DIST, 'assets', entry)).length
  if (size > ENTRY_MAX_BYTES) {
    errors.push(`the entry chunk is ${Math.round(size / 1024)} KB (limit ${ENTRY_MAX_BYTES / 1024} KB): shared code has landed in it`)
  }
}
for (const name of ['app', 'vendor']) {
  if (!assets.some((a) => a.startsWith(`${name}-`) && a.endsWith('.js'))) errors.push(`no ${name}-*.js chunk`)
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : /\.(js|vue)$/.test(d.name) && !d.name.includes('.test.') ? [join(dir, d.name)] : [])
}
for (const file of walk('src')) {
  if (file === join('src', 'main.js') || file === join('src', 'router', 'index.js')) continue
  if (/(from\s*|import\(\s*)['"][^'"]*router\/index(\.js)?['"]/.test(readFileSync(file, 'utf8'))) {
    errors.push(`${file} imports src/router/index.js — take the constant from router/nav.js, or useRouter()`)
  }
}

// Keep personal stores outside the shell: main can draw rules before IDB migration finishes.
for (const name of assets.filter(a => /^(app|vendor)-.*\.js\.map$/.test(a))) {
  const sources = JSON.parse(readFileSync(join(DIST, 'assets', name), 'utf8')).sources
  if (sources.some(source => /\/use(?:Rosters|Tracker|CloudSync|RosterSync)\.js$/.test(source))) {
    errors.push(`${name} eagerly imports a personal store before the readiness barrier`)
  }
}

// A phone's empty roster list must not wait for the full roster viewer's graph.
const desk = assets.find(name => /^RosterDeskView-.*\.js$/.test(name))
const visited = new Set()
function inspectRosterImports(name) {
  if (visited.has(name)) return
  visited.add(name)
  const map = join(DIST, 'assets', `${name}.map`)
  if (assets.includes(`${name}.map`) && JSON.parse(readFileSync(map, 'utf8')).sources.some(source => /\/RosterViewView\.vue$/.test(source))) {
    errors.push('the empty roster desk statically imports the full roster viewer')
  }
  const code = readFileSync(join(DIST, 'assets', name), 'utf8')
  for (const match of code.matchAll(/\bimport(?:[^;"']*?from)?\s*["']\.\/([^"']+\.js)["']/g)) {
    if (assets.includes(match[1])) inspectRosterImports(match[1])
  }
}
if (desk) inspectRosterImports(desk)
else errors.push('no roster desk chunk to verify')

if (errors.length) {
  console.error('✗ chunk graph:\n  ' + errors.join('\n  '))
  process.exit(1)
}
console.log(`✓ chunk graph: entry ${entry} imported by nothing, app + vendor split, router imported only by main.js`)
