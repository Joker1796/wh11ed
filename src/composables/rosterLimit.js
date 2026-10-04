// A list's points limit as ONE value — which size, the custom number, the player's own limits —
// so a screen hands it on and takes it back as a whole instead of threading each field through
// every form between the picker and the roster (2026-10-03: a third field would have meant nine
// edits). `limitOf` reads it off a roster (or anything shaped like one); `applyLimit` writes it
// back, removing a key the value no longer carries rather than leaving it undefined.
// A module of its own, not rosterEngine: the share payload (rosterShare.js) needs the keys, and the
// bug-report dialog carries that payload — it must not drag the engine along.
export const LIMIT_KEYS = ['battleSize', 'customPoints', 'customLimits']

export function limitOf(r) {
  const out = { battleSize: r?.battleSize || 'strike-force', customPoints: r?.customPoints ?? 2000 }
  if (r?.customLimits) out.customLimits = { ...r.customLimits }
  return out
}

export function applyLimit(target, limit) {
  for (const k of LIMIT_KEYS) {
    if (limit?.[k] === undefined) delete target[k]
    else target[k] = limit[k]
  }
  return target
}
