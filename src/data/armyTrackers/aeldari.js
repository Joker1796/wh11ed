// Aeldari — army-rule tracker spec: Battle Focus / the Battle Focus token pool.
//
// A `pool` primitive: a per-battle-round resource. At the start of each battle round you receive a
// fixed number of Battle Focus tokens based on the battle size (Incursion 2 / Strike Force 4 /
// Onslaught 6), spend them one at a time to trigger Agile Manoeuvres, and lose any unspent at the
// battle round's end. So unlike Drukhari's Pain-token `counter` (a pool that carries across rounds),
// this one REFILLS each round — the widget defaults each round's remaining to
// `perRound[battleSize] + bonus` and you step it DOWN as you spend.
//
// The Warhost detachment ("Martial Grace") grants +1 token at the start of each battle round — the
// one real per-detachment change to the maths, so it's a `bonus` override (mirrors how the Ork Bully
// Boyz change Waaagh!'s maxUses). Keywords stay English; rules text is translated.
//
// Combat Patrol's own copy of Battle Focus (combatPatrol.js) is verbatim-identical to the Codex —
// it never lists a Combat Patrol figure, only Incursion/Strike Force/Onslaught (confirmed against
// wh40k-appdata directly: the actual per-battle-size numbers aren't machine-readable text in either
// publication's row, just an "as shown in the table below" reference to an image — and the Combat
// Patrol row's copy of that image placeholder is missing entirely, unlike the Codex row's). No
// source available gives a real Combat Patrol number, so `combatPatrol` below is deliberately set
// to the Incursion value — the lowest defined tier — as a conservative floor, not a transcribed rule.
export default {
  slug: 'aeldari',
  kind: 'pool',

  // Links the widget back to the reference rule; English game term.
  ruleName: 'Battle Focus',
  // Resource label — an English game term (kept identical in both locales).
  label: 'Battle Focus',

  // Tokens received at the start of each battle round, keyed by the tracker's battleSize id
  // (src/composables/useTracker.js BATTLE_SIZES). A detachment `bonus` is added on top.
  perRound: { combatPatrol: 2, incursion: 2, strikeForce: 4, onslaught: 6 },
  bonus: 0,

  gains: [
    {
      en: 'At the start of each battle round: 2 (Incursion) / 4 (Strike Force) / 6 (Onslaught) tokens',
      ru: 'В начале каждого раунда: 2 (Incursion) / 4 (Strike Force) / 6 (Onslaught) токена',
    },
    {
      en: 'All unspent tokens are lost at the end of the battle round',
      ru: 'Все несведённые токены сгорают в конце раунда',
    },
  ],

  note: {
    en: 'Spend one token to let an eligible unit perform an Agile Manoeuvre (Swift as the Wind, Flitting Shadows, Star Engines, Sudden Strike, Opportunity Seized, Fade Back) — a unit can perform only one per phase. Only an Asuryani army generates tokens.',
    ru: 'Потрать один токен, чтобы отряд выполнил Agile Manoeuvre (Swift as the Wind, Flitting Shadows, Star Engines, Sudden Strike, Opportunity Seized, Fade Back) — один манёвр на отряд за фазу. Токены генерирует только Asuryani-армия.',
  },

  detachmentOverrides: {
    // Warhost — Martial Grace: +1 Battle Focus token at the start of each battle round. The extra
    // gain reminder accumulates onto the base two (see applyOverride).
    warhost: {
      bonus: 1,
      gains: [
        {
          en: 'Warhost (Martial Grace): +1 additional token at the start of each battle round',
          ru: 'Warhost (Martial Grace): +1 токен в начале каждого раунда',
        },
      ],
    },
  },
}
