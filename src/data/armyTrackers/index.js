// Army-rule trackers — per-faction specs for the in-game "track your army's rule" widgets, plus
// the resolver that applies active-detachment overrides.
//
// WHY faction + detachment (not faction alone): a detachment can modify the army mechanic itself,
// not just add a separate resource — e.g. Adeptus Mechanicus' Rad-Zone Corps adds two Doctrina
// Imperatives on top of the base two, and some Ork detachments let Waaagh! be called a second time.
// So a spec's numbers / option sets / caps must be resolved against the player's active
// detachment(s), which the tracker already stores in `player.detachments[]`.
//
// A spec is a small self-contained descriptor (see drukhari.js) — the prose army-rule `body` in
// src/data/factions/* is free text and not machine-readable, so the trackable numbers live here.
// This module is dynamic-imported by the tracker so the specs never ride in its critical bundle.

import drukhari from './drukhari.js'

// Registry — add a faction by dropping its spec here.
const REGISTRY = {
  drukhari,
}

// Detachment names come from the MFM dataset (player.detachments) and must line up with the
// override keys (which mirror the faction-data names); the two occasionally disagree on apostrophe
// glyph / letter case, so match loosely — same normalization StratagemsView uses for stratagems.
const normName = (s) => String(s).replace(/[’'`]/g, "'").trim().toLowerCase()

// Resolve the raw spec for a faction + its active detachment(s), applying any per-detachment
// overrides. Returns null for factions without a spec (most, for now).
export function resolveArmyTracker(slug, detachments = []) {
  const base = REGISTRY[slug]
  if (!base) return null
  const overrides = base.detachmentOverrides || {}
  let spec = base
  for (const det of detachments) {
    const ov = overrides[normName(det)]
    if (ov) spec = applyOverride(spec, ov)
  }
  return spec
}

// Shallow-merge an override onto a spec. Most fields replace; array fields that make sense to
// extend (extra gain reminders / notes / options) accumulate instead of overwrite.
function applyOverride(spec, ov) {
  const out = { ...spec, ...ov }
  if (ov.gains) out.gains = [...(spec.gains || []), ...ov.gains]
  if (ov.options) out.options = [...(spec.options || []), ...ov.options]
  return out
}

// Pick display strings for a locale: a { en, ru } object → its localized string (RU falls back to
// EN); a plain string (an English game term) → itself. Arrays/nested objects are resolved shallowly
// where the shape is known (gains list, note).
function locStr(v, locale) {
  if (v && typeof v === 'object' && !Array.isArray(v)) return v[locale] ?? v.en ?? ''
  return v
}

// Produce a fully-localized, display-ready copy of a resolved spec.
export function localizeArmyTracker(spec, locale) {
  if (!spec) return null
  return {
    ...spec,
    label: locStr(spec.label, locale),
    note: spec.note ? locStr(spec.note, locale) : null,
    gains: (spec.gains || []).map((g) => locStr(g, locale)),
  }
}
