// Orks — army-rule tracker spec: the Waaagh!'s War Cry.
//
// Codex: Orks (app data 946) split what this card used to be. The old Waaagh! was ONE army-wide
// window: you called it, and for a turn every ORKS unit had the whole package. The new Waaagh!
// grants two things that live in different places:
//
//   • **War Cry** — once per battle, per army, at the start of the Command phase: every friendly
//     ORKS unit with the Waaagh! ability becomes riled up until the end of the next turn. That is
//     a single army-wide fire, which is what this `toggle` still tracks.
//   • **riled up** — the state itself, which THIRTY-TWO other rules also hand out, one unit at a
//     time: detachment rules (Shoota Boyz, Flyboyz, Brute Bosses), stratagems, enhancements and a
//     long tail of datasheet abilities (Warboss' Intimidating Motivation, Meganobz' Krumpin' Time,
//     Stompa's Waaagh! Effigy…). None of that goes through the War Cry, so this card must not be
//     read as the only way a unit gets there.
//
// The state is therefore NOT tracked here. It is the `riled-up` condition in
// src/data/rosterModifiers/conditions.js at `scope: 'unit'`, which the tracker surfaces as a
// per-entry switch on each unit's row and card — so one mob can be riled up while the next is not,
// whichever rule did it. This card only answers "have we spent the War Cry yet".
//
// Keywords/characteristics stay English.
export default {
  slug: 'orks',
  kind: 'toggle',

  // label doubles as the rule name here, so no separate ruleName.
  label: 'Waaagh! — War Cry',
  // Once per battle, per army. No current detachment raises this: the old Bully Boyz override is
  // gone with the old detachment rule, and War Horde's "Da Boss is Watchin'" enhancement is its
  // own once-per-battle fire that riles ONE unit up — not a second War Cry.
  maxUses: 1,

  // What the War Cry does — revealed once it's called.
  effect: {
    name: 'War Cry called',
    body: {
      en: `▪ Friendly ORKS units with the Waaagh! ability are riled up until the end of the next turn.

While a unit is riled up:
▪ That unit has 5+ InSv.
▪ That unit's ranged attacks have [ASSAULT].
▪ When that unit is selected to make an advance move, that move does not prevent it from being eligible to declare a charge.`,
      ru: `▪ Дружественные отряды ORKS со способностью Waaagh! становятся riled up до конца следующего хода.

Пока отряд riled up:
▪ У него 5+ InSv.
▪ Его дальнобойные атаки получают [ASSAULT].
▪ Когда отряд выбран для advance move, этот манёвр не мешает ему объявлять charge.`,
    },
  },

  note: {
    en: 'Once per battle, per army, at the start of the Command phase. Riled up also comes from many other rules, one unit at a time — flip those on the unit itself, not here.',
    ru: 'Раз за бой на армию, в начале Command phase. Riled up дают и многие другие правила, по одному отряду — их отмечай на самом отряде, а не здесь.',
  },
}
