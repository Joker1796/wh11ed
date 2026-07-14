// Bake base sizes (scripts/base-sizes.mjs) into the committed datasheet files, so the
// runtime (DatasheetCard / FactionDatasheetView) can read `sheet.baseSize` and
// `profile.baseSize` directly. Additive: only appends a `baseSize` field to sheets/profiles;
// preserves the generated header + trailing "MISSING FROM WAHAPEDIA" comment verbatim.
// The datasheet importer applies the same `attachBaseSizes` on regeneration, so this is a
// one-shot back-fill for the existing files. Run: node scripts/apply-base-sizes.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { attachBaseSizes } from './base-sizes.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DS_DIR = path.join(ROOT, 'src', 'data', 'datasheets')

let touched = 0
for (const f of fs.readdirSync(DS_DIR).filter((n) => n.endsWith('.js') && n !== 'index.js')) {
  const slug = f.replace('.js', '')
  const file = path.join(DS_DIR, f)
  const text = fs.readFileSync(file, 'utf8')
  const head = text.slice(0, text.indexOf('export default '))
  const missing = text.match(/(\/\/ MISSING FROM WAHAPEDIA[\s\S]*?)\s*$/)
  const mod = await import(pathToFileURL(file).href)
  const sheets = mod.default.map((s) => attachBaseSizes(s, slug))
  const applied = sheets.filter((s) => s.baseSize || (s.profiles || []).some((p) => p.baseSize)).length
  const body = `${head}export default ${JSON.stringify(sheets, null, 2)}\n${missing ? `\n${missing[1]}\n` : ''}`
  fs.writeFileSync(file, body)
  touched += applied
  console.log(`${slug}: base sizes on ${applied}/${sheets.length} datasheets`)
}
console.log(`\nDone. ${touched} datasheets carry a base size.`)
