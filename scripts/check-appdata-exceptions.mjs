// GATE: every place we knowingly depart from wh40k-appdata still holds — appdata still carries the
// error we patch, and our data still carries the correction. Exits non-zero. `npm run exceptions`.
// The registry, and why it exists, is scripts/lib/appdata-exceptions.mjs.
import { pathToFileURL } from 'node:url'
import { APPDATA_EXCEPTIONS, checkAppdataExceptions } from './lib/appdata-exceptions.mjs'

export async function run() {
  const problems = await checkAppdataExceptions()
  if (problems.length) {
    console.error(`appdata exceptions: ${problems.length} problem(s)\n`)
    for (const p of problems) console.error(`  ✗ ${p}`)
    return 1
  }
  console.log(`appdata exceptions: ${APPDATA_EXCEPTIONS.length} entr(ies), each still needed and still applied.`)
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run(process.argv.slice(2)))
