import { ref } from 'vue'

// Is a tracker game being played right now — the one thing the app shell needs to know about the
// tracker (App.vue's "Back to game" chip). It used to ask useTracker itself, and that one static
// import put the whole tracker store in the entry chunk with everything it imports: every mission,
// the Event Companion, the modifier conditions, the roster store — ~300 KB of source downloaded by
// a reader who opened one rule (found 2026-10-13). So the shell reads the saved game's phase here,
// from the same key the store writes, and the store keeps this ref current once it is loaded.
// Import this, not useTracker, from anything the shell reaches.

export const CUR_KEY = 'wh11ed-tracker-current'

// Minimal shape guard: a corrupted or old-schema blob can JSON.parse fine yet be the wrong shape,
// then throw deep in a render (e.g. `current.players[i].primarySlug`) and wedge the tracker.
// Reject anything without the stable game shape (two players + a settings object).
export function isValidGame(g) {
  return (
    !!g && typeof g === 'object' &&
    Array.isArray(g.players) && g.players.length === 2 &&
    g.players.every((p) => p && typeof p === 'object') &&
    !!g.settings && typeof g.settings === 'object'
  )
}

function savedGameInPlay() {
  try {
    const g = JSON.parse(localStorage.getItem(CUR_KEY) || 'null')
    return isValidGame(g) && g.phase === 'playing'
  } catch {
    return false
  }
}

export const gameInPlay = ref(savedGameInPlay())
