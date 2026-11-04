import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

// The worker and version.json announce a build, so they go up last (deploy.sh, step 3c). On
// 2026-11-03 a deploy to the beta died on robots.txt after they had gone up and before index.html:
// the bucket said 2.10.11 and served the 2.10.10 page, and a worker installing then would precache
// the old page under the new revision.
describe('deploy.sh upload order', () => {
  const sh = readFileSync('deploy.sh', 'utf8') // vitest runs from the repo root
  const at = (re) => {
    const i = sh.search(re)
    expect(i, String(re)).toBeGreaterThan(-1)
    return i
  }
  it('uploads the worker and version.json after every page and before the purge', () => {
    const lastPage = Math.max(at(/aws s3 cp dist\/index\.html/), at(/aws s3 sync "\$MIRROR"/), at(/aws s3 sync dist "\$BUCKET"/), at(/set_shortcache robots\.txt/))
    for (const re of [/^set_nocache sw\.js/m, /^set_nocache manifest\.webmanifest/m, /^set_nocache offline-manifest\.json/m, /^set_nocache version\.json/m]) {
      expect(at(re), String(re)).toBeGreaterThan(lastPage)
      expect(at(re), String(re)).toBeLessThan(at(/^# 4\) Drop the CDN edge copy/m))
    }
    // version.json is the last word: a start reads it to decide there is something to install.
    expect(at(/^set_nocache version\.json/m)).toBeGreaterThan(at(/^set_nocache sw\.js/m))
  })
})
