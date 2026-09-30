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
import { useTracker, membersOf, sideName, isYouSide } from './useTracker.js'
import { usableInSlot, BATTLE_PHASES } from './stratagemPhases.js'
import { allySourceOf } from './rosterEngine.js'
import { useFactionChoice } from './useFactionChoice.js'
import { useRefNavigation } from './useRefNavigation.js'

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

  // Detachment names are matched the way the rest of the app matches them — apostrophes and case
  // are the two things that differ between GW's own spellings of one name.
  const norm = (s) => String(s || '').toLowerCase().replace(/[’']/g, "'").trim()

  function rulesFor(pi) {
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
        if (!e || !usableInSlot(e.p, e.s, phase.value, mine)) return
        const k = `${src}|${e.n}|${m.factionSlug}`
        if (seen.has(k)) return
        seen.add(k)
        out.push({ key: k, src, name: nameOf(e), sub: null, slug: m.factionSlug, at: e.at, det: e.id, army: { pi, mi, rule } })
      }

      if (fac) {
        take(fac.army, labels.value.trackerArmyRule, 'army')
        // The detachment's own rule, under the detachment's name — which is what the game stores.
        for (const name of m.detachments || []) {
          const byName = fac.dets || {}
          const key = Object.keys(byName).find((k) => norm(k) === norm(name))
          if (key) take(byName[key], name, key)
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
        if (!rec) continue
        for (const e of rec.a) {
          if (!usableInSlot(e.p, e.s, phase.value, mine)) continue
          // One line per RULE: three Intercessor Squads with the same ability are one reminder with
          // three names under it, not three identical lines.
          const key = `${e.n}`
          if (!byRule.has(key)) {
            byRule.set(key, {
              key: `u|${mi ?? ''}|${key}`,
              src: labels.value.trackerPhaseUnit,
              name: nameOf(e),
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
          r.units.add(rec.n)
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

  // The side whose turn it is first, so the block reads in the order the phase is played.
  const sides = computed(() => {
    const order = turn.value === 0 ? [0, 1] : [1, 0]
    return order
      .map((pi) => ({ pi, you: isYouSide(current.value?.players?.[pi], pi), name: playerName(pi), rules: rulesFor(pi) }))
      .filter((s) => s.rules.length)
  })
  const total = computed(() => sides.value.reduce((n, s) => n + s.rules.length, 0))

  return { sides, total, phase, go, labels }
}
