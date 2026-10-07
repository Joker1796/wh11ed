import { describe, it, expect } from 'vitest'
import { mfmFactions } from '../data/mfmFactions.js'
import { detachmentInfo, mfmDetachmentNames } from './trackerFactions.js'

// A list built in the roster builder names its detachments the way appdata spells them; the tracker
// and the roster list read DP and Force Disposition from the MFM, which spells some of them
// differently ("Vow-sworn Crusaders" / "Vow-Sworn Crusaders", "Forgefather's" / "Forgefather’s").
// An exact match lost six detachments, among them Black Templars' Purge the Foe one (player report
// b337c3bf, 2026-10-07). This walks every detachment the builder offers and asks the MFM for it.
describe('detachmentInfo — every roster detachment is found in the MFM', () => {
  // Offered in the roster data but not to this faction's lists — by the rules, only Space Marines
  // and the other Chapters take Deathwatch Support (changelog 2.7.15).
  const NOT_OFFERED = new Set(['deathwatch|Deathwatch Support'])

  it('matches each name across spellings, with the same Force Dispositions', async () => {
    const missing = []
    const differ = []
    for (const f of mfmFactions.en) {
      let roster
      try { roster = (await import(`../data/roster/${f.slug}.js`)).default } catch { continue }
      for (const d of roster.detachments || []) {
        if (NOT_OFFERED.has(`${f.slug}|${d.name}`)) continue
        const m = detachmentInfo(f.slug, d.name)
        if (!m) { missing.push(`${f.slug}: ${d.name}`); continue }
        const a = [...(d.fds || [])].sort().join(', ')
        const b = [...(m.forceDispositions || [])].sort().join(', ')
        if (a !== b) differ.push(`${f.slug}: ${d.name} — roster ${a} / MFM ${b}`)
      }
    }
    expect(missing).toEqual([])
    expect(differ).toEqual([])
  }, 120000)

  it('reads the MFM spelling from the roster one', () => {
    expect(detachmentInfo('black-templars', 'Vow-sworn Crusaders')?.forceDispositions).toEqual(['Purge the Foe'])
    expect(detachmentInfo('space-marines', "Forgefather's Seekers")?.name).toBe('Forgefather’s Seekers')
    expect(detachmentInfo('space-marines', 'No Such Detachment')).toBeNull()
  })

  // What the setup copies from a roster onto a side: the picker ticks its rows by the MFM name.
  it('renames a roster\'s detachments to the MFM spelling, keeping one it does not know', () => {
    expect(mfmDetachmentNames('black-templars', ['Vow-sworn Crusaders', 'Unknown'])).toEqual(['Vow-Sworn Crusaders', 'Unknown'])
  })
})
