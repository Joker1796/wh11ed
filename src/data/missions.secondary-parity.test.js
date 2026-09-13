import { describe, it, expect } from 'vitest'
import { missions } from './missions.js'

// The role split in the secondary-mission data mirrors the PRINTED cards (each exists in an
// attacker and a defender version); today every pair is textually identical, and two things
// lean on that: the app serves one shared list, and the setup wizard's role help
// (ui.js trackerRoleHelp) tells the player in so many words that the role does not change
// their secondaries. A future deck may legitimately diverge the two — when this test starts
// failing, that has happened: handle the divergence in the UI AND rewrite the help text in
// BOTH locales before appeasing the assertion.
describe('secondary missions: attacker/defender parity', () => {
  it('every card is textually identical between the two roles', () => {
    const bySlug = new Map()
    for (const m of missions.en.secondary) {
      if (!bySlug.has(m.slug)) bySlug.set(m.slug, {})
      bySlug.get(m.slug)[m.role] = m
    }
    for (const [slug, v] of bySlug) {
      expect(v.attacker, `${slug}: missing attacker variant`).toBeTruthy()
      expect(v.defender, `${slug}: missing defender variant`).toBeTruthy()
      expect(JSON.stringify(v.attacker.blocks), `${slug}: blocks diverged between roles`)
        .toBe(JSON.stringify(v.defender.blocks))
      expect(JSON.stringify(v.attacker.briefing ?? null), `${slug}: briefing diverged between roles`)
        .toBe(JSON.stringify(v.defender.briefing ?? null))
      expect(JSON.stringify(v.attacker.whenDrawn ?? null), `${slug}: whenDrawn diverged between roles`)
        .toBe(JSON.stringify(v.defender.whenDrawn ?? null))
    }
  })
})
