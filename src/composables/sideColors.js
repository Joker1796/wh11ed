// The two sides' colours in a game — the standard pair, or each side's faction accent.
//
// Standard: you in the site accent (#8b2a33 / #c8585e), the opponent in the unit-ability blue
// (#004a6e / #5fb2dc) — the values style.css gives --accent and --ability-unit in each theme.
// Faction colours (the `factionColors` option, owner's call 2026-09-27): each side in its faction's
// own pair from factionsIndex.js — the same colours its faction pages and roster screens wear,
// already chosen to carry white text in light and to read on the dark background in dark.
//
// Two factions can share a colour (Blood Angels and World Eaters are both red). Two sides the eye
// cannot tell apart defeat the point, so when the pair is too close the OPPONENT falls back to the
// standard blue — or, when your faction is itself a blue, to the standard red.
//
// A screen applies the result with `sideColorStyle` + the global `.side-colored` class
// (style.css), which folds `--sy-*` / `--so-*` into `--side-you` / `--side-opponent` per theme,
// the way `.fa-themed` folds a faction's pair into `--accent`.
import { factionIndexBySlug } from '../data/factionsIndex.js'
import { tracks } from '../data/trackerOptions.js'

export const STANDARD_YOU = { light: '#8b2a33', dark: '#c8585e' }
export const STANDARD_OPP = { light: '#004a6e', dark: '#5fb2dc' }

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
// Below this, two sides read as one colour — in either theme.
const TOO_CLOSE = 120
const close = (a, b) => colorDistance(a.light, b.light) < TOO_CLOSE || colorDistance(a.dark, b.dark) < TOO_CLOSE

// `you` / `opp` — the sides' faction slugs (null for none); `factionColors` — the option.
export function resolveSideColors(you, opp, factionColors) {
  const fac = (slug) => (factionColors && factionIndexBySlug(slug)?.color) || null
  const y = fac(you) || STANDARD_YOU
  let o = fac(opp) || STANDARD_OPP
  if (close(y, o)) o = close(y, STANDARD_OPP) ? STANDARD_YOU : STANDARD_OPP
  return { you: y, opp: o }
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

// The style for a game's screen: this phone's side against the other, per the game's option.
// `isYou` is absent on the oldest games, whose owner was the first player.
export function gameSideColorStyle(game) {
  const players = game?.players || []
  const you = Math.max(0, players.findIndex((p, i) => p?.isYou ?? i === 0))
  return sideColorStyle(resolveSideColors(
    sideFactionOf(players[you]), sideFactionOf(players[1 - you]), tracks(game?.settings, 'factionColors'),
  ))
}
