#!/usr/bin/env node
// Mutation testing of the core: does a test notice when the code is wrong? Run by `npm run mutate`.
//
//   npm run mutate -- src/core/game/gameScoring.js   # one file (or several)
//   npm run mutate -- --changed                      # src/core files changed against main
//   npm run mutate -- --all-survivors <file>         # also print the `?.` survivors
//
// unclebob/mutator breaks one spot at a time (`>=` → `>`, `??` → `||`, `1 - x` → `1 + x`) and runs
// the tests; a mutant the tests survive is a line no test holds. Two passes per file, because a
// pass over every test that imports a file is ~20 s a mutant: first the file's own tests
// (`<name>.test.js`, `<name>.*.test.js`), then only the survivors against `vitest related`.
//
// The tool is not ours and not in package.json: a clone next to this repo (`../tools/mutator`, see
// the hub README) or `$MUTATOR`. Not a gate — a run over all of src/core is hours. Run it on the
// file you changed and on the file a bug report led to (hub skill feedback-triage, §2а step 5).
//
// What survives and is fine: the `?.` mutants (null guards no test feeds a null — hidden unless
// --all-survivors), and equivalent mutants (`a > b` → `a >= b` after `a === b` already returned).
// Read the rest line by line: each is a test that is missing or a branch that is dead.
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'

const root = resolve(dirname(new URL(import.meta.url).pathname), '..')
const tool = process.env.MUTATOR || resolve(root, '../tools/mutator/mutator')
const WORKERS = '2' // the owner's machine runs other projects too

const args = process.argv.slice(2)
const allSurvivors = args.includes('--all-survivors')
let files = args.filter(a => !a.startsWith('--'))
if (args.includes('--changed')) {
  const changed = execFileSync('git', ['diff', '--name-only', 'main', '--', 'src/core'], { cwd: root, encoding: 'utf8' })
  files.push(...changed.split('\n').filter(f => f.endsWith('.js') && !f.endsWith('.test.js') && existsSync(join(root, f))))
}
files = [...new Set(files)]

if (!existsSync(tool)) {
  console.error(`mutator not found at ${tool}.\nClone it next to this repo (hub README, "tools/") or set MUTATOR=/path/to/mutator.`)
  process.exit(1)
}
if (!files.length) {
  console.error('Name a file: npm run mutate -- src/core/<folder>/<file>.js (or --changed).')
  process.exit(1)
}

const vitest = 'npx vitest run --config vitest.mutate.config.js --maxWorkers=1'

/** The file's own tests: `x.test.js` and `x.<aspect>.test.js` beside it. */
function ownTests(file) {
  const dir = dirname(file)
  const stem = basename(file, '.js')
  return readdirSync(join(root, dir))
    .filter(n => n === `${stem}.test.js` || (n.startsWith(`${stem}.`) && n.endsWith('.test.js')))
    .map(n => join(dir, n))
}

/** One mutator pass; returns its SURVIVED lines and its summary table. */
function pass(file, testCommand, sinceLastRun) {
  const flags = ['--no-coverage', '--max-workers', WORKERS, '--test-command', testCommand]
  if (sinceLastRun) flags.unshift('--since-last-run')
  const run = spawnSync(tool, [...flags, file], { cwd: root, encoding: 'utf8', maxBuffer: 64 << 20 })
  const out = `${run.stdout}${run.stderr}`
  if (run.status === 2) {
    console.error(out)
    console.error(`The tests fail before any mutation: ${testCommand}`)
    process.exit(2)
  }
  const lines = out.split('\n')
  return {
    survived: lines.filter(l => l.startsWith('SURVIVED')),
    table: lines.slice(lines.findIndex(l => l.startsWith('Function'))).filter(Boolean),
  }
}

const isNullGuard = (line) => /\?\. -> \.|delete \?\./.test(line)
let anyLeft = false
for (const file of files) {
  console.log(`\n=== ${file}`)
  const own = ownTests(file)
  let result = own.length ? pass(file, `${vitest} ${own.join(' ')}`, false) : null
  if (!result || result.survived.length) {
    console.log(own.length ? `own tests leave ${result?.survived.length} — rechecking them against every related test` : 'no own tests — every related test')
    result = pass(file, `npx vitest related --run --config vitest.mutate.config.js --maxWorkers=1 ${file}`, Boolean(own.length))
  }
  const guards = result.survived.filter(isNullGuard)
  const shown = allSurvivors ? result.survived : result.survived.filter(l => !isNullGuard(l))
  for (const l of shown) console.log(l)
  if (!allSurvivors && guards.length) console.log(`(+${guards.length} \`?.\` survivors hidden, --all-survivors shows them)`)
  console.log(result.table.join('\n'))
  if (shown.length) anyLeft = true
}
process.exit(anyLeft ? 3 : 0)
