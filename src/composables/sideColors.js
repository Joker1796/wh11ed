// The two sides' colours in a game — each side's faction accent, or the phone's own picks.
//
// By default (owner, 2026-09-29) each side wears its faction's own pair from factionsIndex.js — the
// same colours its faction pages and roster screens wear, already chosen to carry white text in
// light and to read on the dark background in dark. A side with no faction takes the standard
// colour: you in the site accent (#8b2a33 / #c8585e), the opponent in the unit-ability blue
// (#004a6e / #5fb2dc) — the values style.css gives --accent and --ability-unit in each theme.
//
// "Customise colours" (the `customColors` option) lets this phone pick either side's colour from
// PALETTE instead: a short set of the site's own pairs (faction colours of distinct hues plus the
// standard two), so a pick never clashes with the rest of the page. A side left on "faction
// colour" keeps the default. `settings.sideColors` = { you, opp }, palette keys or null.
//
// Two sides can come out the same colour (Blood Angels and World Eaters are both red). Nothing is
// swapped behind the player's back: saving the setup warns and offers to customise (`sidesClash`).
//
// A screen applies the result with `sideColorStyle` + the global `.side-colored` class
// (style.css), which folds `--sy-*` / `--so-*` into `--side-you` / `--side-opponent` per theme,
// the way `.fa-themed` folds a faction's pair into `--accent`.
import { factionIndexBySlug } from '../data/factionsIndex.js'
import { tracks } from '../data/trackerOptions.js'

export const STANDARD_YOU = { light: '#8b2a33', dark: '#c8585e' }
export const STANDARD_OPP = { light: '#004a6e', dark: '#5fb2dc' }

// The picks, in the order the dropdown lists them; `label` is the ui.js key of its name. Seven, no
// two of one hue: teal (against blue) and orange (against gold) were tried and read as the same.
export const PALETTE = [
  { key: 'red', label: 'sideColorRed', ...STANDARD_YOU },
  { key: 'blue', label: 'sideColorBlue', ...STANDARD_OPP },
  { key: 'green', label: 'sideColorGreen', light: '#467a1e', dark: '#8cc25a' },      // Orks
  { key: 'gold', label: 'sideColorGold', light: '#8a6d1a', dark: '#d4af37' },        // Custodes
  { key: 'purple', label: 'sideColorPurple', light: '#5d3a8c', dark: '#a785d9' },    // GSC
  { key: 'pink', label: 'sideColorPink', light: '#99377c', dark: '#e07fc4' },        // Emperor's Children
  { key: 'steel', label: 'sideColorSteel', light: '#4a5560', dark: '#98a6b4' },      // Deathwatch
]
const BY_KEY = new Map(PALETTE.map((c) => [c.key, c]))

function rgb(hex) {
  const n = parseInt(String(hex).replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
// Rough perceptual distance (redmean): enough to tell "the same red" from "a different colour".
export function colorDistance(a, b) {
  const [r1, g1, b1] = rgb(a)
  const [r2, g2, b2] = rgb(b)
  const rm = (r1 + r2) / 2
  const dr = r1 - r2
  const dg = g1 - g2
  const db = b1 - b2
  return Math.sqrt((2 + rm / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rm) / 256) * db * db)
}
// Below this, two sides read as one colour — in either theme. Measured on real pairs: Blood Angels
// and World Eaters 18, Chaos Space Marines and Sororitas 31, Space Marines and Thousand Sons 64;
// steel against Dark Angels' green, plainly two colours, 101 — which the first line (120) flagged
// (2026-09-29).
const TOO_CLOSE = 80
const close = (a, b) => colorDistance(a.light, b.light) < TOO_CLOSE || colorDistance(a.dark, b.dark) < TOO_CLOSE

// `you` / `opp` — the sides' faction slugs (null for none); `picks` — the phone's own choice
// ({ you, opp } palette keys, null per side for its faction colour), or null when not customised.
export function resolveSideColors(you, opp, picks = null) {
  const side = (slug, pick, standard) => BY_KEY.get(pick) || factionIndexBySlug(slug)?.color || standard
  return { you: side(you, picks?.you, STANDARD_YOU), opp: side(opp, picks?.opp, STANDARD_OPP) }
}

// The two sides read as one colour: what the setup warns about on save.
export function sidesClash({ you, opp }) {
  return close(you, opp)
}

// The four private custom properties `.side-colored` reads.
export function sideColorStyle({ you, opp }) {
  return { '--sy-light': you.light, '--sy-dark': you.dark, '--so-light': opp.light, '--so-dark': opp.dark }
}

// A side's faction for colouring: in doubles, the first member that fields one.
export function sideFactionOf(pl) {
  const members = Array.isArray(pl?.members) && pl.members.length ? pl.members : [pl]
  return members.find((m) => m?.factionSlug)?.factionSlug ?? null
}

// The phone's picks for a game's settings: null unless "Customise colours" is on.
export function sidePicksOf(settings) {
  return tracks(settings, 'customColors') ? settings?.sideColors || {} : null
}

// A game's resolved colours: this phone's side against the other, per the phone's picks.
// `isYou` is absent on the oldest games, whose owner was the first player.
export function gameSideColors(game) {
  const players = game?.players || []
  const you = Math.max(0, players.findIndex((p, i) => p?.isYou ?? i === 0))
  return resolveSideColors(sideFactionOf(players[you]), sideFactionOf(players[1 - you]), sidePicksOf(game?.settings))
}

// The style for a game's screen.
export function gameSideColorStyle(game) {
  return sideColorStyle(gameSideColors(game))
}
