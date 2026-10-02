// Space Marines — army-rule tracker spec: Combat Doctrines (Codex: Space Marines, 11th edition).
// The same spec serves the five Chapters with a Codex Supplement (Black Templars, Blood Angels,
// Dark Angels, Deathwatch, Space Wolves): since app data 963 every one of them has Combat Doctrines
// as its army rule, word for word — see the registry in index.js.
//
// A per-round `selection` (like AdMech's Doctrina Imperatives) with a per-battle budget: at the
// start of your Command phase you can select one doctrine, active until your next Command phase,
// and each doctrine can be selected only once per battle (`perBattle`). Detachments stretch that —
// see selectionBudget.js for how the extras are counted:
//   - Assault / Devastator / Tactical Brethren, Forgefather's Seekers: their own doctrine once more
//     (`bonusUses`);
//   - Gladius Task Force: any one once more (`spareUses`);
//   - Spearpoint Task Force: the assault or the tactical doctrine once more (`limitedSpares`);
//   - Blade of Ultramar: each doctrine once more "if your army includes a MARNEUS CALGAR unit" —
//     the tracker cannot see the list, so it allows them and leaves the condition to the player.
//
// Out of the tracker on purpose: a doctrine made active for ONE unit (Adept of the Codex, Tactical
// Insight, a stratagem) — the army's pick is what this card follows, the unit's own is on its card.
//
// The option bodies condense each doctrine's effect; keyword and move-type names stay English.
export default {
  slug: 'space-marines',
  kind: 'selection',
  perBattle: 1,

  ruleName: 'Combat Doctrines',
  label: 'Combat Doctrine',

  options: [
    {
      id: 'assault',
      name: 'Assault Doctrine',
      body: {
        en: 'An advance move does not stop this unit from being eligible to declare a charge.',
        ru: 'Advance move не мешает этому отряду объявить charge.',
      },
    },
    {
      id: 'devastator',
      name: 'Devastator Doctrine',
      body: {
        en: 'This unit’s ranged attacks have [ASSAULT].',
        ru: 'Ranged-атаки этого отряда получают [ASSAULT].',
      },
    },
    {
      id: 'tactical',
      name: 'Tactical Doctrine',
      body: {
        en: 'A fall-back move does not stop this unit from being eligible to shoot and to declare a charge.',
        ru: 'Fall-back move не мешает этому отряду стрелять и объявить charge.',
      },
    },
  ],

  note: {
    en: 'Selected at the start of your Command phase, active for your Adeptus Astartes units until your next one. Each doctrine once per battle; a unit has only one active doctrine.',
    ru: 'Выбирается в начале твоей Command phase и действует на твои Adeptus Astartes-отряды до следующей. Каждая доктрина — раз за бой; у отряда активна только одна.',
  },

  detachmentOverrides: {
    'gladius task force': { spareUses: 1 },
    'assault brethren': { bonusUses: { assault: 1 } },
    'devastator brethren': { bonusUses: { devastator: 1 } },
    'tactical brethren': { bonusUses: { tactical: 1 } },
    "forgefather's seekers": { bonusUses: { devastator: 1 } },
    'spearpoint task force': { limitedSpares: [{ ids: ['assault', 'tactical'], n: 1 }] },
    'blade of ultramar': { bonusUses: { assault: 1, devastator: 1, tactical: 1 } },
  },
}
