import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { planRetirement } from './lib/asset-retirement.mjs'

const [dir, keepDays] = process.argv.slice(2)
const walk = (root, prefix = '') => readdirSync(root, { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory() ? walk(join(root, entry.name), prefix + entry.name + '/') : [prefix + entry.name])
const { retired, remove } = planRetirement({
  present: JSON.parse(readFileSync(join(dir, 'objects.json'), 'utf8')) || [],
  live: walk('dist'),
  previous: JSON.parse(readFileSync(join(dir, 'previous.json'), 'utf8')),
  now: Date.now(), keepDays: Number(keepDays),
})
writeFileSync(join(dir, 'next.json'), JSON.stringify(retired))
for (let i = 0; i < remove.length; i += 1000) {
  writeFileSync(join(dir, `batch-${i / 1000}.json`), JSON.stringify({ Objects: remove.slice(i, i + 1000).map((Key) => ({ Key })), Quiet: true }))
}
console.log(`  → ${remove.length} retired file(s) past the grace period`)
