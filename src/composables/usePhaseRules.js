// "What has something to say in THIS phase", for both players — the rules behind the game
// screen's Phase tab (PhaseRules.vue draws them; the tab carries their count, so the counting is
// here, not inside the drawing).
//
// Two sides, not one: 55 of the datasheet abilities that name a phase name their OPPONENT'S
// ("In your opponent's Movement phase, if an enemy unit ends a move within 8\"…"), and those are
// the ones a player forgets, because in the opponent's turn they are not thinking about their own
// cards. `usableInSlot` answers per player — the same predicate the stratagem filter uses, so the
// two can never disagree about what "your Shooting phase" means.
//
// The data is `src/data/phaseIndex.js`, a generated sidecar of names and phases with no rule text
// at all (see scripts/gen-phase-index.mjs for why): this screen deliberately imports neither the
// faction bundle nor the datasheets, and it is not going to start.
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ui } from '../i18n/ui.js'
import { useLocale } from './useLocale.js'
import { useTracker, membersOf, sideName, isYouSide, scorableBlocks, missionBySlug } from './useTracker.js'
import { cardMoments } from '../core/game/missionTiming.js'
import { tracks } from '../data/trackerOptions.js'
import { usableInSlot, BATTLE_PHASES, phaseLabel } from '../core/rules/stratagemPhases.js'
import { allySourceOf } from './rosterEngine.js'
import { detachmentSources } from '../data/detachmentSources.js'
import { factionIndexBySlug } from '../data/factionsIndex.js'
import { useFactionChoice } from './useFactionChoice.js'
import { useRefNavigation } from './useRefNavigation.js'
import { foldName } from '../core/shared/foldName.js'

// The steps of each phase in play order (Core Rules 08–12), and the step a rule that fires
// "during" the phase is shown at — its main step. Start and End are the phase's own first and
// last steps, which is where a rule's `start` / `end` moment lands.
export const PHASE_STEPS = {
  command: ['start', 'cp', 'shock', 'abilities', 'end'],
  movement: ['start', 'move', 'end'],
  shooting: ['start', 'shoot', 'end'],
  charge: ['start', 'charge', 'end'],
  fight: ['start', 'pile-in', 'fight', 'consolidate', 'end'],
}
const MAIN_STEP = { command: 'abilities', movement: 'move', shooting: 'shoot', charge: 'charge', fight: 'fight' }
const STEP_LABEL = {
  start: 'trackerStepStart', end: 'trackerStepEnd', cp: 'trackerStepCp', shock: 'trackerStepShock',
  abilities: 'trackerStepAbilities', move: 'trackerStepMove', shoot: 'trackerStepShoot',
  charge: 'trackerStepCharge', 'pile-in': 'trackerStepPileIn', fight: 'trackerStepFight',
  consolidate: 'trackerStepConsolidate',
}
export const stepOfMoment = (when, ph) => (when === 'start' || when === 'end' ? when : MAIN_STEP[ph])

export function usePhaseRules() {
  const { locale } = useLocale()
  const labels = computed(() => ui[locale.value])
  const { current } = useTracker()
  const router = useRouter()
  const { setDetachment } = useFactionChoice()
  const { navigateTo } = useRefNavigation()

  // Fetched once, the first time the block is asked for — a game that never turns the clock on
  // never pays for it.
  const index = ref(null)
  watch(() => !!current.value, async (has) => {
    if (!has || index.value) return
    index.value = (await import('../data/phaseIndex.js')).phaseIndex
  }, { immediate: true })

  const phase = computed(() => current.value?.currentPhase || BATTLE_PHASES[0])
  const turn = computed(() => (current.value?.currentTurn === 1 ? 1 : 0))
  // A game keeping the clock asks about the phase it stands on; one that does not, about the whole
  // turn — each phase of it, in play order (owner, 2026-10-08: the same tab, the turn's analog).
  const byPhase = computed(() => tracks(current.value?.settings, 'trackPhases'))

  // Detachment names are matched the way the rest of the app matches them — apostrophes and case
  // are the two things that differ between GW's own spellings of one name.
  const norm = foldName

  function rulesFor(pi, ph) {
    const pl = current.value?.players?.[pi]
    const idx = index.value
    if (!pl || !idx) return []
    const mine = turn.value === pi
    const out = []
    // Faction-level lines are deduped across a doubles side's members: a unified force of one
    // faction runs ONE army rule (the companion's shared pool), and even two copies of the same
    // detachment carry one rule with one anchor — a second identical line reminds of nothing.
    const seen = new Set()

    membersOf(pl).forEach((m, rawMi) => {
      const mi = m === pl ? null : rawMi
      const fac = idx[m.factionSlug]
      // `army` — where the rule reads in the game's own Armies tab: the army (pi, mi) and which of
      // its rules ('army', or the detachment's name).
      const take = (e, src, rule) => {
        if (!e || !usableInSlot(e.p, e.s, ph, mine)) return
        const k = `${src}|${e.n}|${m.factionSlug}`
        if (seen.has(k)) return
        seen.add(k)
        out.push({ key: k, kind: 'rule', mi: rawMi, src, name: nameOf(e), sub: null, when: momentOf(e, ph), slug: m.factionSlug, at: e.at, det: e.id, army: { pi, mi, rule } })
      }

      if (fac) {
        take(fac.army, labels.value.trackerArmyRule, 'army')
        // The detachment's own rule, under the detachment's name — which is what the game stores.
        // A borrowed detachment is indexed under the faction it is printed for (detachmentSources).
        for (const name of m.detachments || []) {
          for (const src of detachmentSources(m.factionSlug)) {
            const byName = idx[src]?.dets || {}
            const key = Object.keys(byName).find((k) => norm(k) === norm(name))
            if (key) { take(byName[key], name, key); break }
          }
        }
      }

      // Unit abilities need a list: without one there is no way to know which units are on the
      // table, and every datasheet of the faction would be noise rather than a reminder. Kept per
      // member — the line has to lead into the list that actually holds the unit.
      const units = m.roster?.units || []
      const byRule = new Map()
      for (const u of units) {
        // An allied unit's id carries its own faction ("agents-of-the-imperium:callidus-assassin"),
        // so it is looked up in that faction's entry rather than missed.
        const ally = allySourceOf(u.id)
        const src = ally ? idx[ally[0]] : fac
        const rec = src?.units?.[ally ? ally[1] : u.id]
        if (!rec && !u.enh) continue
        // What this entry has to say, of four kinds (owner, 2026-10-08): its datasheet abilities;
        // its wargear abilities — only while it carries the item (`d` it starts with it, `g` the
        // picks that give it); every option of its ability sets (which is up is picked during the
        // game); and its enhancement, chosen or the one its datasheet is forced to take.
        const said = [
          ...(rec?.a || []).map((e) => [e, 'ability']),
          ...(rec?.w || []).filter((e) => e.d || picked(u, e.g)).map((e) => [e, 'wargear']),
          ...(rec?.s || []).map((e) => [e, 'set']),
        ]
        const enh = u.enh || forcedEnh(rec, m.detachments)
        const enhE = enh && fac?.enh?.[enh]
        if (enhE) said.push([enhE, 'enh'])
        for (const [e, type] of said) {
          if (!usableInSlot(e.p, e.s, ph, mine)) continue
          // One line per RULE: three Intercessor Squads with the same ability are one reminder with
          // three names under it, not three identical lines.
          const key = `${type}|${e.set || ''}|${e.n}`
          if (!byRule.has(key)) {
            byRule.set(key, {
              key: `u|${mi ?? ''}|${key}`,
              kind: 'unit',
              mi: rawMi,
              name: nameOf(e),
              // What it is, where an ability of the datasheet would not be the first guess.
              what: type === 'wargear' ? labels.value.trackerPhaseWargear
                : type === 'enh' ? labels.value.trackerPhaseEnh
                  : type === 'set' ? e.set : null,
              when: momentOf(e, ph),
              units: new Set(),
              // Where this one unit's card is. Dropped for the list as soon as a SECOND entry turns
              // up carrying the rule: with three Intercessor Squads there is no single card to mean,
              // so the line lets the reader pick. Counted by entry, not by name — three squads of
              // the same datasheet are three cards, even though the line names "Boyz" once.
              to: cardOf(m, pi, mi, u, ally),
              // The same, inside the game screen (its Roster tab): the unit, or just the list.
              roster: m.roster ? { pi, mi, uid: u.uid } : null,
              entries: 0,
            })
          }
          const r = byRule.get(key)
          if (++r.entries > 1) {
            r.to = listOf(m, pi, mi)
            if (r.roster) r.roster = { pi, mi }
          }
          r.units.add(rec?.n || u.id)
        }
      }
      for (const r of byRule.values()) out.push({ ...r, sub: [...r.units].join(' · ') })
    })
    return out
  }

  function rosterPath(pi, mi) {
    return mi == null ? `/tracker/game/roster/${pi}` : `/tracker/game/roster/${pi}/${mi}`
  }

  // The unit's card: inside the attached list when the game carries one — that is where this game's
  // own modifiers are applied — and the faction's datasheet page otherwise. `m` is the army that
  // fields the unit (the side in singles, a member in doubles — hence the mi in the roster path).
  function cardOf(m, pi, mi, entry, ally) {
    if (m.roster) return { path: rosterPath(pi, mi), query: { unit: entry.uid } }
    const slug = ally ? ally[0] : m.factionSlug
    const id = ally ? ally[1] : entry.id
    return `/factions/${slug}/datasheets/${id}`
  }
  function listOf(m, pi, mi) {
    return m.roster ? rosterPath(pi, mi) : `/factions/${m.factionSlug}/datasheets`
  }

  // Does this entry carry an item a wargear ability comes with — one of the [group, option]
  // picks (`wg` holds [group, option, count]) that grant it?
  function picked(u, pairs) {
    return !!pairs && (u.wg || []).some(([gi, oi, n]) => (n ?? 1) > 0 && pairs.some(([g, o]) => g === gi && o === oi))
  }
  // A mandatory enhancement is never stored on the entry: the index names it per detachment.
  function forcedEnh(rec, dets) {
    const me = rec?.me
    if (!me) return null
    const d = (dets || []).find((x) => Object.keys(me).some((k) => norm(k) === norm(x)))
    return d ? me[Object.keys(me).find((k) => norm(k) === norm(d))] : null
  }

  // When in the phase a rule fires, from the index ('start' / 'end'); absent is during it.
  function momentOf(e, ph) {
    return e.m?.[ph] || 'during'
  }

  // The RU name where the datasheet overlay had one; rule and unit names stay English by convention.
  function nameOf(e) {
    return locale.value === 'ru' && e.ru ? e.ru : e.n
  }

  // Where a line leads. A unit goes to its card — inside the attached list when there is one (the
  // game's own numbers apply there), on the faction's datasheet page when there is not. A rule goes
  // to its anchor on the faction page, and a DETACHMENT rule has to be selected first, because that
  // page renders only the active one — the same two steps a search result takes.
  async function go(r) {
    if (r.to) {
      await router.push(r.to)
      return
    }
    if (r.det) setDetachment(r.slug, r.det)
    await navigateTo({ route: `/factions/${r.slug}`, anchor: r.at || undefined })
  }

  function playerName(pi) {
    return sideName(current.value?.players?.[pi], pi, labels.value)
  }

  // The side whose turn it is first, so the tab reads in the order the turn is played. Each side
  // carries its `turn` laid out step by step, and `count`: the rules (one named in two phases of
  // the turn counted once) and the card moments.
  const sides = computed(() => {
    const order = turn.value === 0 ? [0, 1] : [1, 0]
    return order.map((pi) => {
      const laid = turnOf(pi)
      const count = new Set(laid.flatMap((sec) => sec.steps.flatMap((st) => st.rows.map((r) => r.key)))).size
      return { pi, you: isYouSide(current.value?.players?.[pi], pi), name: playerName(pi), turn: laid, count }
    })
  })
  const total = computed(() => sides.value.reduce((n, s) => n + s.count, 0))

  // The turn on the clock laid out in play order for one side (owner, 2026-10-10): the start of
  // the turn, each phase step by step, the end of the turn — and at each step what fires there,
  // the side's rules by their moment and its mission cards by when they score. With a clock, only
  // the phase it stands on (and the turn's start or end when that phase borders it). Every step is
  // listed, empty or not: the order of the turn is itself the reminder.
  function cardsOf(pi) {
    const game = current.value
    return cardMoments(
      game, pi,
      (slug, role, round) => scorableBlocks(slug, role, round, locale.value),
      (slug, role) => missionBySlug(slug, role),
      (slug, role) => missionBySlug(slug, role)?.name || slug,
    ).map((c) => ({ ...c, key: `card|${c.at}|${c.slug || 'primary'}`, kind: 'card', what: c.slug ? labels.value.trackerSecondary : labels.value.trackerPrimary }))
  }
  function turnOf(pi) {
    const members = membersOf(current.value?.players?.[pi])
    const whoOf = (mi) => (members.length > 1 ? factionIndexBySlug(members[mi]?.factionSlug)?.name || members[mi]?.name || null : null)
    const cards = cardsOf(pi)
    const L = labels.value
    const phases = byPhase.value ? [phase.value] : BATTLE_PHASES
    const out = []
    if (phases[0] === 'command') out.push({ key: 'turn-start', title: L.trackerStepTurnStart, steps: [{ id: 'turn-start', label: null, rows: [] }] })
    for (const ph of phases) {
      const rules = rulesFor(pi, ph).map((r) => ({ ...r, who: whoOf(r.mi) }))
      out.push({
        key: ph,
        title: phaseLabel(ph, L),
        steps: PHASE_STEPS[ph].map((id) => ({
          id,
          label: L[STEP_LABEL[id]],
          rows: [
            // The army's own rules before its units', as everywhere in the tab.
            ...rules.filter((r) => stepOfMoment(r.when, ph) === id).sort((a, b) => (a.kind === b.kind ? a.mi - b.mi : a.kind === 'rule' ? -1 : 1)),
            ...(ph === 'command' && id === 'end' ? cards.filter((c) => c.at === 'command-end') : []),
          ],
        })),
      })
    }
    if (phases[phases.length - 1] === 'fight') out.push({ key: 'turn-end', title: L.trackerStepTurnEnd, steps: [{ id: 'turn-end', label: null, rows: cards.filter((c) => c.at === 'turn-end') }] })
    return out
  }

  return { sides, total, phase, byPhase, go, labels }
}
