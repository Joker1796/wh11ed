// Serves <dir> the way the bucket + deploy.sh do: no-cache for the files that announce a build,
// a year for hashed assets, index.html for any path without an extension (the SEO keys' stand-in).
import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
const [dir, port] = [process.argv[2], Number(process.argv[3] || 4195)]
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.mp3': 'audio/mpeg' }
const NOCACHE = /^\/(index\.html|sw\.js|version\.json|offline-manifest\.json|manifest\.webmanifest)$/
http.createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  if (p === '/' || !extname(p)) p = '/index.html'
  if (p.includes('e2e-topup')) await new Promise((r) => setTimeout(r, 120)) // a slow mobile network
  try {
    const file = join(dir, p); await stat(file)
    res.setHeader('Content-Type', TYPES[extname(p)] || 'application/octet-stream')
    res.setHeader('Cache-Control', NOCACHE.test(p) ? 'no-cache' : p.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'public, max-age=2592000')
    res.end(await readFile(file))
  } catch { res.statusCode = 404; res.end('not found') }
}).listen(port, '127.0.0.1', () => console.log(`serving ${dir} on ${port}`))
