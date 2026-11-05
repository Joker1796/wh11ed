// "Start a game with this list" — from the list's own ⋯ (RosterViewView) and from its card on the
// list page (RosterListView). The tracker's setup draft is filled with the list (rosterHandoff.js),
// and the player lands on the wizard; a game already in progress is never overwritten — the draft
// waits on the tracker's home, behind "Continue setup". Both modules are loaded on the tap: the
// roster routes must not carry the tracker.
//
// `leaving` closes the caller's menu — in the same tick as the push, after the modules are in. On a
// phone the menu is a dialog, and closed before they land its Back-to-close step (useBackToClose)
// comes a beat later and cancels the push: the draft was written and the page stayed where it was.
export async function playRoster(roster, router, leaving) {
  const [{ prefillDraftFromRoster }, { useTracker }] = await Promise.all([
    import('./rosterHandoff.js'),
    import('./useTracker.js'),
  ])
  prefillDraftFromRoster(roster)
  leaving?.()
  router.push(useTracker().current.value ? '/tracker' : '/tracker/game')
}
