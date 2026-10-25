// A finished game is filed into the history as soon as its player leaves the game's screens —
// whichever way: the finished screen's "Back to tracker", the bottom nav, the subnav, any link.
// Until 2026-10-25 only that one button filed it; a player who left by the nav found the game
// missing from the list and the home's big button saying "Resume", and only resuming and pressing
// the button saved it (the owner's first 11th-edition game). Leaving for the game's own roster
// (`/tracker/game/roster/…`) keeps it on the finished screen to come back to; the home files a
// finished game it finds on arrival (a reload, an app reopened on the home). Resuming it stays
// possible from the history, as it is for any game there.
import { onBeforeRouteLeave } from 'vue-router'
import { useTracker } from './useTracker.js'
import { stripLocale } from '../router/locale.js'

/** Whether a path is one of the game's own screens (the game, its rosters). */
export const onGameScreens = (path) => stripLocale(path || '').startsWith('/tracker/game')

/** File the finished game now, if there is one. */
export function fileFinishedGame() {
  const { current, archiveGame } = useTracker()
  if (current.value?.phase === 'finished') archiveGame()
}

/** In a view of the game: file a finished game when the reader leaves the game's screens. */
export function useFileFinishedGameOnLeave() {
  onBeforeRouteLeave((to) => {
    if (!onGameScreens(to.path)) fileFinishedGame()
  })
}
