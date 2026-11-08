import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = 'dist'
const version = JSON.parse(readFileSync(join(root, 'version.json'), 'utf8'))
const expected = `/releases/${version.build}/offline-manifest.json`
const fail = (reason) => { throw new Error(`Release integrity: ${reason}`) }
if (!/^[\w-]+$/.test(version.build) || version.manifest !== expected) fail('invalid build identity')
const shell = readFileSync(join(root, 'index.html'), 'utf8')
const pinned = `releases/${version.build}/index.html`
if (readFileSync(join(root, pinned), 'utf8') !== shell) fail('immutable shell differs')
if (!shell.includes(`content="${expected}"`)) fail('shell names a different manifest')
const manifest = JSON.parse(readFileSync(join(root, expected), 'utf8'))
if (manifest.build !== version.build || manifest.app !== version.app) fail('manifest identity mismatch')
for (const url of [...manifest.assets.files, ...manifest.images.files]) {
  if (!/^\/(assets|images)\//.test(url) || url.includes('..') || !existsSync(join(root, url))) fail(`missing file ${url}`)
}
const sw = readFileSync(join(root, 'sw.js'), 'utf8')
if (!sw.includes(pinned) || !sw.includes(expected)) fail('worker lacks its pinned shell or manifest')
if (/url:["']\/?index\.html["']/.test(sw)) fail('worker precaches the mutable shell')
console.log(`✓ release integrity: ${version.build}, pinned shell + manifest, every offline file present`)
