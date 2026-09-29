import { getItem, setItem } from './safeStorage.js'

// The saved list opened last on this device (owner, 2026-09-29): the rosters desk reopens it when
// the reader comes back to /roster instead of greeting them with the statistics every time.
const KEY = 'wh11ed-roster-last'

export const lastRosterId = () => getItem(KEY, null)
export const rememberRoster = (id) => { if (id) setItem(KEY, id) }
