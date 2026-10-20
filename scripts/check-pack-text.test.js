import { describe, it, expect } from 'vitest'
import { sheetBlocks, sheetFindings } from './check-pack-text.mjs'

// A Faction Pack page as pdftotext -layout gives it: two columns, the banner beside the name, a
// second model line under its own name, keywords per model.
const page = [
  '\fHELL’S LAST                                    WA R HA M M E R L E G E N D S',
  ' M          T         SV          W         LD         OC',
  '',
  '6"         3         5+          3         7+           1     MINKA LESK',
  '',
  ' M          T         SV          W         LD         OC',
  '6"         3         5+          2         7+           1     LESK’S VETERANS',
  '     RANGED WEAPONS               RANGE   A   BS   S   AP   D    ABILITIES',
  '     Bolt pistol [PISTOL]          12"    1   3+   4   0    1    Berserk Fury: You can re-roll',
  '     Missile launcher – krak        48"    1   5+   9   2    D6',
  'KEYWORDS – \u0007A LL MODELS: Infantry, Grenades,                FACTION KEYWORDS:',
  'Hell’s Last | MINKA LESK ONLY: Character, Epic Hero             Astra Militarum',
  '\fREMORA                                         WA R HA M M E R L E G E N D S',
  ' M          T         SV          W         LD         OC',
].join('\n')

const sheet = {
  name: 'Hell’s Last',
  profiles: [{ name: 'Minka Lesk', m: '6"', t: '3', sv: '5+', w: '3', ld: '7+', oc: '1' }, { name: 'Lesk’s Veterans', m: '6"', t: '3', sv: '5+', w: '2', ld: '7+', oc: '1' }],
  ranged: [{ name: 'Bolt pistol', range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' }],
  keywords: ['Infantry', 'Grenades', 'Hell’s Last', 'Character', 'Epic Hero'],
  abilities: [{ name: 'Berserk Fury' }],
}

describe('Legends sheets against their Faction Pack', () => {
  it('reads a sheet from its page, its second model line included', () => {
    const blocks = sheetBlocks(page)
    expect(blocks.map((b) => b.name)).toEqual(['HELL’S LAST', 'REMORA'])
    expect(sheetFindings(sheet, blocks[0].lines)).toEqual([])
  })

  // Death Company Marines with Boltguns and Jump Packs carried the ability of the sheet beside it
  // (found 2026-10-20); a number typed wrong is the other mistake this is for.
  it('names an ability, a number or a keyword the page does not print', () => {
    const wrong = {
      ...sheet,
      ranged: [{ ...sheet.ranged[0], s: '5' }],
      keywords: [...sheet.keywords, 'Officer'],
      abilities: [{ name: 'An Honourable Death in Combat' }],
    }
    expect(sheetFindings(wrong, sheetBlocks(page)[0].lines)).toEqual([
      'weapon Bolt pistol: 12" 1 3+ 5 0 1',
      'keyword Officer',
      'ability An Honourable Death in Combat',
    ])
  })
})
