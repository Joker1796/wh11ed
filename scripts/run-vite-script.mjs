import { fileURLToPath } from 'node:url'
import { relative, resolve } from 'node:path'
import { createServer } from 'vite'

// Data-aware Node scripts need Vite's glob transform. Reuse the installed Vite SSR loader
// instead of making npx download the retired vite-node package. Preserve the script's argv.
const root = fileURLToPath(new URL('..', import.meta.url))
const script = process.argv[2]
if (!script) throw new Error('Usage: node scripts/run-vite-script.mjs <script> [args...]')
const entry = resolve(root, script)
process.argv.splice(1, 2, entry)
const server = await createServer({
  root,
  cacheDir: fileURLToPath(new URL('../target/vite-scripts-cache', import.meta.url)),
  configFile: false,
  server: { middlewareMode: true, watch: null, ws: false },
  appType: 'custom',
  logLevel: 'error',
})
try {
  await server.ssrLoadModule(`/${relative(root, entry)}`)
} finally {
  await server.close()
}
