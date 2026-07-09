// New-in-pack datasheets that do not exist in the Wahapedia CSV exports, transcribed by
// hand from the Faction Pack PDFs. Keyed by normalised unit name (lower case, straight
// apostrophes); consulted by scripts/import-wahapedia-datasheets.mjs when an MFM roster
// unit has no Wahapedia datasheet — so these survive regeneration. Points are attached
// from the requesting faction's MFM at generation time (which also lets the shared
// Eradicator Squad with Heavy Bolters serve Space Marines and every Chapter).
export default {
  // ── Faction Pack: Space Marines (sources/Faction pack 11 ed/cm/SpaceMarines.pdf) ──
  'eradicator squad with heavy bolters': {
    id: 'eradicator-squad-with-heavy-bolters',
    name: 'Eradicator Squad with Heavy Bolters',
    flavor:
      "The heavy Mk X Gravis armour of these fire support specialists allows them to weather storms of incoming projectiles. Standing firm, they return fire with their brutal heavy bolters, scything down enemy infantry and blowing apart the foe's light armoured vehicles with well-placed shots to weak spots in their targets' hulls.",
    profiles: [{ name: 'Eradicator Squad with Heavy Bolters', m: '5"', t: '6', sv: '3+', w: '3', ld: '6+', oc: '1' }],
    ranged: [
      { name: 'Bolt pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
      { name: 'Heavy bolter', tags: ['HEAVY', 'SUSTAINED HITS 1'], range: '36"', a: '3', bs: '3+', s: '5', ap: '-1', d: '2' },
    ],
    melee: [{ name: 'Close combat weapon', tags: [], a: '3', ws: '3+', s: '4', ap: '0', d: '1' }],
    faction: 'Oath of Moment',
    abilities: [
      {
        name: 'Overlapping Detonations',
        text: "In your Shooting phase, when this unit is selected to shoot you can select one non-MONSTER/VEHICLE enemy unit visible to it. While making attacks, this unit's heavy bolters that targeted that selected unit have [BLAST 1].",
      },
    ],
    composition: ['1 Eradicator Sergeant', '2 Eradicators'],
    loadout: 'Every model is equipped with: 1 bolt pistol; 1 heavy bolter; 1 close combat weapon.',
    keywords: ['Infantry', 'Imperium', 'Gravis', 'Eradicator Squad', 'Eradicator Squad with Heavy Bolters'],
    factionKeywords: ['Adeptus Astartes'],
  },

  // ── Faction Pack: Orks (sources/Faction pack 11 ed/xenos/ORKZ.pdf) ──
  'bigboss': {
    id: 'bigboss',
    name: 'Bigboss',
    flavor:
      "Second only to the tribe's Warboss, Bigbosses spend their time ordering other Orks around and giving enemy champions and war leaders a good kicking. They are formidably tough, usually heavily armed, always completely merciless, and entirely capable of ripping a Space Marine limb from limb with their bare hands.",
    profiles: [{ name: 'Bigboss', m: '6"', t: '5', sv: '4+', w: '5', ld: '7+', oc: '1' }],
    ranged: [{ name: 'Slugga', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '5+', s: '4', ap: '0', d: '1' }],
    melee: [{ name: 'Two-handed big choppa', tags: ['CLEAVE 1'], a: '5', ws: '3+', s: '7', ap: '-1', d: '2' }],
    core: 'Leader',
    faction: 'Waaagh!',
    abilities: [
      { name: "Breakin' Heads", text: "This unit's melee weapons have [SUSTAINED HITS 1]." },
      { name: "Somethin' to Prove", text: 'This unit has +1 to Charge rolls.' },
    ],
    leader: { text: 'This model can be attached to the following units:', units: ['Boyz', 'Breaka Boyz', 'Nobz'] },
    composition: ['1 Bigboss'],
    loadout: 'This model is equipped with: 1 slugga; 1 two-handed big choppa.',
    keywords: ['Infantry', 'Character', 'Bigboss'],
    factionKeywords: ['Orks'],
  },
  'bannernob': {
    id: 'bannernob',
    name: 'Bannernob',
    flavor:
      "The tribe's Waaagh! banner has an almost religious significance, its presence on the battlefield filling the Orks with the overwhelming need to storm headlong into the enemy. It is typically carried to war by a Bannernob, a particularly large and belligerent Ork who has doubtless brutalised his rivals to claim this honour.",
    profiles: [{ name: 'Bannernob', m: '6"', t: '5', sv: '4+', w: '4', ld: '7+', oc: '6', inv: '5+' }],
    ranged: [{ name: 'Shoota', tags: ['RAPID FIRE 1'], range: '18"', a: '2', bs: '5+', s: '4', ap: '0', d: '1' }],
    melee: [{ name: 'Choppa', tags: [], a: '5', ws: '3+', s: '4', ap: '-1', d: '1' }],
    core: 'Support',
    faction: 'Waaagh!',
    abilities: [
      {
        name: 'Waaagh! Banner',
        text: '▪ This unit has a 5+ invulnerable save.\n▪ While the Waaagh! is active for this unit, this unit has +1 Toughness.',
      },
    ],
    leader: {
      text: 'This model can be attached to the following units:',
      units: ['Boyz', 'Breaka Boyz', 'Burna Boyz', 'Flash Gitz', 'Lootas', 'Nobz', 'Tankbustas'],
    },
    composition: ['1 Bannernob'],
    loadout: 'This model is equipped with: 1 shoota; 1 choppa.',
    keywords: ['Infantry', 'Character', 'Bannernob'],
    factionKeywords: ['Orks'],
  },
  'wartrakk': {
    id: 'wartrakk',
    name: 'Wartrakk',
    flavor:
      'The Wartrakk is a fast, lightly armoured attack vehicle that mounts a rack of armour-busting rokkits. Aimed and fired by the leering Nob who rides on the back, these projectiles compensate for their inaccuracy by making a spectacular mess of anything they actually hit.',
    profiles: [{ name: 'Wartrakk', m: '12"', t: '6', sv: '4+', w: '7', ld: '7+', oc: '3', inv: '6+' }],
    ranged: [
      { name: 'Kustom shoota', tags: ['RAPID FIRE 2'], range: '18"', a: '2', bs: '5+', s: '4', ap: '0', d: '1' },
      { name: 'Rokkit launcha', tags: [], range: '24"', a: 'D3+3', bs: '5+', s: '10', ap: '-2', d: '3' },
    ],
    melee: [{ name: 'Choppas', tags: [], a: '5', ws: '3+', s: '4', ap: '-1', d: '1' }],
    faction: 'Waaagh!',
    abilities: [
      {
        name: 'Indiscriminate Detonations',
        text: 'In your Shooting phase, when this unit has resolved its attacks, select one enemy unit hit by one or more of those attacks. That enemy unit is suppressed until the start of your next Command phase (while a unit is suppressed, it has -1 to Hit rolls).',
      },
    ],
    composition: ['1 Wartrakk'],
    loadout: 'This model is equipped with: 1 kustom shoota; 1 rokkit launcha; 1 choppas.',
    keywords: ['Mounted', 'Speed Freeks', 'Wartrakk'],
    factionKeywords: ['Orks'],
  },
  'big mek dakkarig': {
    id: 'big-mek-dakkarig',
    name: 'Big Mek Dakkarig',
    flavor:
      'Dakkarigs are ridden into battle by Big Meks, and provide a stable firing platform for some really heavy firepower. Lumbering relentlessly forward, they unleash corkscrewing hails of rokkits, and hurricanes of dakka from their screaming blitzkannons, all while their gleeful pilot is protected from return fire by a crackling kustom force field.',
    profiles: [{ name: 'Big Mek Dakkarig', m: '8"', t: '8', sv: '3+', w: '11', ld: '7+', oc: '3', inv: '5+' }],
    ranged: [
      { name: 'Blitzkannon', tags: ['HEAVY', 'SUSTAINED HITS 1'], range: '24"', a: '8', bs: '5+', s: '7', ap: '-2', d: '2' },
      { name: 'Rokkit launcha', tags: ['HEAVY'], range: '24"', a: '6', bs: '5+', s: '10', ap: '-2', d: '3' },
    ],
    melee: [{ name: 'Stompy feet', tags: [], a: '4', ws: '3+', s: '6', ap: '-1', d: '1' }],
    faction: 'Waaagh!',
    abilities: [
      {
        name: 'Dakkablitz',
        text: 'In your Shooting phase, while making attacks with this unit, if its blitzkannon targeted a non-MONSTER/VEHICLE unit, that weapon has +6 Attacks.',
      },
    ],
    composition: ['1 Big Mek Dakkarig'],
    loadout: 'This model is equipped with: 1 blitzkannon; 1 rokkit launcha; 1 stompy feet.',
    keywords: ['Vehicle', 'Walker', 'Big Mek', 'Dakkarig'],
    factionKeywords: ['Orks'],
  },
}
