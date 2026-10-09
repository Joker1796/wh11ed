// Whether the first-visit card is still owed. Its own module so the component that SHOWS the card
// and the code that decides when to show it can't disagree about the key — and so a test can clear
// it without importing the component.
import { getItem } from './safeStorage.js'
import { isStandaloneDisplay } from './standalone.js'

// `wh11ed-` prefix like every other key here: those are user data and are never renamed (see
// wh11ed/CLAUDE.md).
export const WELCOME_KEY = 'wh11ed-welcome-seen'

// The landing page only. Someone who arrived from a search engine is already reading a rule, and a
// card over it is an interruption rather than a welcome.
// Not in the installed app: it opens with its own card (AppFirstRun) — this one is the site's.
export function shouldWelcome(path) {
  return path === '/' && !getItem(WELCOME_KEY) && !isStandaloneDisplay()
}
