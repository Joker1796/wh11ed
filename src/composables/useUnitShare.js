import { localePath } from '../router/locale.js'

// Handing a unit on: its name copied, or a link to its own page — shared by the unit's plate
// (FactionUnitSheet) and the unit list's context menu (FactionDatasheetsView).
//
// Share is one control that becomes what the device has (owner, 2026-10-05): the system sheet
// (Telegram, VK…) where `navigator.share` exists, the link copied where it does not. The link is to
// the unit's own page in the reader's language: it has an SEO page of its own, so a messenger's
// preview shows the unit's name.

export const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

export function unitUrl(slug, id, locale) {
  return new URL(localePath(`/factions/${slug}/datasheets/${id}`, locale), location.origin).href
}

// true once the text is on the clipboard; false where the clipboard is unavailable (permissions,
// an insecure context) — the caller then simply shows no "copied".
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// true when the link was COPIED (the caller says so); false when the share sheet took it, was
// dismissed, or nothing could be done.
export async function shareUnit(slug, id, name, locale) {
  const url = unitUrl(slug, id, locale)
  if (canShare) {
    try { await navigator.share({ title: name, url }) } catch { /* dismissed */ }
    return false
  }
  return copyText(url)
}
