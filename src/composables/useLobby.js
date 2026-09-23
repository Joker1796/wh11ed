import { computed } from 'vue'
import { useTracker } from './useTracker.js'
import { useParty } from './useParty.js'

// THE LOBBY — a shared game before it is played.
//
// The host shares the wizard's draft as a game in `phase: 'setup'` (useTracker's `startLobby`),
// the others join by link, QR or code and fill in THEIR side from their own phone: name, faction,
// detachments, list, disposition, secondaries. The host keeps the rest — mission, battlefield,
// turn order, what the app tracks — and presses Start when the other side is in.
//
// ONE EDITOR PER SIDE. A side is one slice carrying BOTH members in doubles, so two phones typing
// into it would collide on versions and one of them would lose what it typed without being told.
// So a side has exactly one editor: the first phone to claim it, whoever it hands the right to,
// or the host while no one else holds it. The second phone of a team waits, and can take the
// right over (its partner's phone died, or simply put it down) — deliberately always available
// rather than gated on a liveness guess, with a confirm in front of it.
//
// THE ARBITER IS THE SLICE VERSION, not the claimant. Two phones claiming the same side in the
// same second both write `lobby.editor` into it; the server accepts one and answers the other
// with `409` and the winner's copy, which is exactly the "first one in" this needs. No endpoint,
// no lock, no extra round trip.
//
// NOTHING IS SENT UNTIL "DONE" — except the claim itself, which is announced the moment the form
// opens (see openForm). While the form is open the phone holds its own side back (useParty's
// `setHold`), so a half-typed army is nobody else's business — and the side arrives at the host's
// phone whole, once. After that the guest waits: while the host is still on the
// armies step it may reopen the form at will; once the host has moved on, reopening becomes a
// REQUEST the host answers (the setup ahead of it — the mission, the layout — was built on what
// this side said it was fielding).
//
// All of it rides in the slices (`game.lobby` in `shared`, `player.lobby` in each side) and is
// wiped when the game starts, so the server knows nothing about any of it and neither does the
// history, the cloud backup or a broadcast.

export function useLobby() {
  const { current } = useTracker()
  const { party, active, isHost, setHold, sync } = useParty()

  const game = computed(() => current.value || null)
  const isLobby = computed(() => game.value?.phase === 'setup')
  // A lobby that is actually shared — the wizard before "Play together" is a lobby of one.
  const shared = computed(() => isLobby.value && !!party.value && active.value)
  const mySide = computed(() => (shared.value ? (party.value.side ?? 0) : 0))
  const oppSide = computed(() => (mySide.value === 0 ? 1 : 0))
  const myId = computed(() => party.value?.memberId || null)

  // 'armies' — the host is still on the armies step, where a guest may reopen its side freely;
  // 'host' — the host has moved on, and reopening is a request.
  const stage = computed(() => game.value?.lobby?.stage || 'armies')

  function lobbyOf(pi) {
    return game.value?.players?.[pi]?.lobby || null
  }
  function ensureLobby(pi) {
    const pl = game.value?.players?.[pi]
    if (!pl) return null
    if (!pl.lobby) pl.lobby = {}
    return pl.lobby
  }

  const editorOf = (pi) => lobbyOf(pi)?.editor || null
  const isReady = (pi) => !!lobbyOf(pi)?.ready
  // This phone edits the side: it holds the right, or nobody does and this phone may take it
  // (the host over any side, a seated guest over its own).
  function isEditor(pi) {
    if (!shared.value) return true
    const ed = editorOf(pi)
    if (ed) return ed.id === myId.value
    return isHost.value || pi === mySide.value
  }
  function editorName(pi) {
    return editorOf(pi)?.name || ''
  }

  // Claim the side for this phone. Called when its form opens; a phone that lost the race finds
  // the winner's `editor` in the next tick and its own write refused — which is the answer.
  function claim(pi, name = '') {
    const lb = ensureLobby(pi)
    if (!lb) return false
    if (lb.editor && lb.editor.id !== myId.value) return false
    lb.editor = { id: myId.value, mi: party.value?.mi ?? null, name }
    return true
  }
  // Hand the right over, or take it back — the same write, and the only way to move it.
  function takeOver(pi, name = '') {
    const lb = ensureLobby(pi)
    if (!lb) return false
    lb.editor = { id: myId.value, mi: party.value?.mi ?? null, name }
    return true
  }
  function release(pi) {
    const lb = lobbyOf(pi)
    if (lb && lb.editor?.id === myId.value) delete lb.editor
  }

  // The form is open: claim the side OUT LOUD, then hold it back until it is confirmed.
  //
  // The order matters and it cost a rewrite to see. The claim lives in the side's own slice, so
  // turning the hold on first would keep the claim on this phone too — and the other phones would
  // go on believing the side is free for as long as the form stays open, which is exactly the
  // window where two of them can start filling it in. So: claim, send that at once (the army
  // fields are still whatever arrived, so sending them back changes nothing), and only then hold.
  async function openForm(pi, name = '') {
    setHold(false)
    claim(pi, name)
    const lb = ensureLobby(pi)
    if (lb) { lb.ready = false; delete lb.deny }
    if (shared.value) await sync()
    setHold(true)
  }

  // "Done": the side goes out whole, once.
  function confirmSide(pi) {
    const lb = ensureLobby(pi)
    if (!lb) return
    lb.ready = true
    delete lb.request
    delete lb.deny
    setHold(false)
  }

  // Reopening. Free while the host is still on the armies step; a request once it has moved on.
  const canReopenFreely = computed(() => stage.value === 'armies')
  function reopen(pi, name = '') {
    return openForm(pi, name)
  }
  function requestReopen(pi) {
    const lb = ensureLobby(pi)
    if (!lb) return
    lb.request = Date.now()
    delete lb.deny
  }
  const myRequestPending = computed(() => !!lobbyOf(mySide.value)?.request)
  const myRequestDenied = computed(() => !!lobbyOf(mySide.value)?.deny)

  // The host's side of that conversation: the first side asking to be reopened, and the answers.
  const pendingRequest = computed(() => {
    if (!shared.value || !isHost.value) return null
    for (const pi of [0, 1]) {
      const lb = lobbyOf(pi)
      if (lb?.request) return { side: pi, at: lb.request, name: game.value.players[pi]?.name || '' }
    }
    return null
  })
  function grantReopen(pi) {
    const lb = ensureLobby(pi)
    if (!lb) return
    delete lb.request
    delete lb.deny
    lb.ready = false
    setStage('armies') // both phones go back to the armies step — that is what was granted
  }
  function denyReopen(pi) {
    const lb = ensureLobby(pi)
    if (!lb) return
    delete lb.request
    lb.deny = Date.now()
  }

  function setStage(next) {
    const g = game.value
    if (!g) return
    if (!g.lobby) g.lobby = {}
    g.lobby.stage = next
  }

  // What the host's wizard asks before it lets go of the armies step: every side that is not
  // this host's own has said it is done. A side nobody sits on is the host's to fill, so it
  // never blocks (the host is its editor).
  const othersReady = computed(() => {
    if (!shared.value || !isHost.value) return true
    return [0, 1].every((pi) => pi === mySide.value || isEditor(pi) || isReady(pi))
  })
  // Someone else holds the side: the host looks, it does not type.
  const canFill = (pi) => isEditor(pi)

  return {
    isLobby, shared, stage, mySide, oppSide,
    lobbyOf, editorOf, editorName, isEditor, isReady, canFill,
    claim, takeOver, release, openForm, confirmSide,
    canReopenFreely, reopen, requestReopen, myRequestPending, myRequestDenied,
    pendingRequest, grantReopen, denyReopen,
    setStage, othersReady,
  }
}
