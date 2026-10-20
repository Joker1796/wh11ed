import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PATCHES } from './patches.mjs'
import { diffDocuments } from './diff-documents.mjs'
import { APP_DATA_VERSION } from '../../src/data/appDataVersion.js'
import { mfmVersion } from '../../src/data/mfmFactions.js'

// The patch notes list what GW changed, update by update, and a data bump adds its line by hand
// (the hub's appdata-update skill). Nothing held that: a bump without its line, or a document read
// after the last line, would sit in the site and never on /patches (2026-10-20).
const here = path.dirname(fileURLToPath(import.meta.url))
const editions = JSON.parse(fs.readFileSync(path.join(here, 'documents.json'), 'utf8'))
const last = (has) => PATCHES.filter(has).at(-1)
const written = (id) => JSON.parse(fs.readFileSync(path.join(here, '../../src/data/patches', `${id}.json`), 'utf8'))

describe('the patch notes are up to date', () => {
  it('have a line for the app data the site carries', () => {
    expect(last((p) => p.labels?.app)?.labels.app).toBe(APP_DATA_VERSION)
  })

  it('have a line for the MFM the site prices by', () => {
    expect(last((p) => p.labels?.mfm)?.labels.mfm).toBe(mfmVersion)
  })

  it('have a line for every GW document edition we read', () => {
    const upto = PATCHES.at(-1).date
    const later = editions.filter((e) => e.published > upto && editions.some((o) => o.doc === e.doc && o.published < e.published))
    expect(later.map((e) => `${e.doc} v${e.version} (${e.published})`)).toEqual([])
  })

  it('were regenerated after the document list changed (`npm run patches`)', () => {
    for (const [i, p] of PATCHES.entries()) {
      const want = diffDocuments(editions, PATCHES[i - 1]?.date ?? null, p.date)
      expect(written(p.id).items.filter((x) => x.kind === 'document'), p.id).toEqual(want)
    }
  })
})
