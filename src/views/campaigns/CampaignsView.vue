<template>
  <div class="campaigns">
    <div class="camp-hero">
      <h1>{{ labels.navCampaigns }}</h1>
    </div>

    <!-- The decks a campaign is played with, and the campaigns of the open one (owner, 2026-11-05).
         One deck so far, so it is open from the start: on a wide screen the decks on the left and
         its campaigns on the right, on a phone its card, its campaigns, then what is coming. -->
    <div class="camps">
      <section
        class="camps-deck is-open"
        aria-labelledby="camps-deck-dom"
      >
        <span
          class="camps-logo"
          aria-hidden="true"
        />
        <div class="camps-deck-text">
          <h2
            id="camps-deck-dom"
            class="camps-deck-name"
          >
            Dominatus
          </h2>
          <p class="camps-deck-sub">
            {{ labels.campDeckDomSub }}
          </p>
        </div>
        <div class="camps-deck-acts">
          <RouterLink
            to="/dominatus"
            class="btn-ghost"
          >
            <i class="wi wi-book" /> {{ labels.campDeckRules }}
          </RouterLink>
          <button
            type="button"
            class="btn-ghost"
            aria-haspopup="dialog"
            @click="howOpen = true"
          >
            <i class="wi wi-help" /> {{ labels.campHowTitle }}
          </button>
        </div>
      </section>

      <section
        class="camps-list"
        aria-labelledby="camps-yours"
      >
        <h2
          id="camps-yours"
          class="dgroup-label"
        >
          {{ labels.campYours }}
        </h2>
        <!-- A new campaign is the Warmaster's, set up on a page of its own: its settings are a screenful. -->
        <RouterLink
          v-if="status === 'authed'"
          :to="campaignPath('new')"
          class="btn-primary camp-new"
        >
          {{ labels.campNew }}
        </RouterLink>
        <!-- Signed out: why an account, and the way in, where the campaign would start (owner,
             2026-11-01 — the ⚙ menu alone was not enough of a hint). -->
        <CampSignIn
          v-else-if="status !== 'idle'"
          :text="labels.campSignInToLead"
        />
        <ul
          v-if="rows.length"
          class="camp-index"
        >
          <li
            v-for="r in rows"
            :key="r.c.id"
          >
            <RouterLink :to="campaignPath(r.c.id)">
              <span class="camp-index-main">
                <i
                  v-if="r.phase"
                  class="wi camp-index-phase"
                  :class="r.finished ? 'wi-check' : `wi-dom-phase-${r.phaseN}`"
                  role="img"
                  :title="r.phase"
                  :aria-label="r.phase"
                />
                <span class="camp-index-name">
                  <strong>{{ r.c.name || r.c.id }}</strong>
                  <span
                    v-if="r.finished"
                    class="camp-dim"
                  >{{ r.phase }}</span>
                  <span
                    v-else-if="r.phase"
                    class="camp-index-line camp-dim"
                  >
                    <i class="wi wi-dom-location" />{{ r.location || labels.campNoLocationShort }}
                  </span>
                  <!-- This reader's own side: a Warmaster who does not play, a watcher have none. -->
                  <span
                    v-if="r.mine"
                    class="camp-index-mine camp-dim"
                  >
                    <i
                      v-if="r.mine.alliance"
                      class="wi"
                      :class="`wi-dom-${r.mine.alliance}`"
                      role="img"
                      :title="allianceName(r.mine.alliance)"
                      :aria-label="allianceName(r.mine.alliance)"
                    />
                    <span
                      v-for="k in KINDS"
                      :key="k.kind"
                      class="camp-index-count"
                      :title="labels[k.label]"
                    >
                      <i
                        class="wi"
                        :class="`wi-dom-${k.kind}`"
                        role="img"
                        :aria-label="labels[k.label]"
                      />{{ r.mine.cards[k.kind] }}
                    </span>
                    <span v-if="r.mine.due">{{ battlesText(r.mine) }}</span>
                  </span>
                </span>
                <span class="camp-index-side">
                  <span
                    v-if="r.c.waiting"
                    class="camp-index-warn"
                  >⚠ {{ labels.campWaiting }}</span>
                  <span class="camp-role">{{ labels[`campRole_${r.c.role}`] }}</span>
                </span>
              </span>
              <!-- What the campaign asks of this reader now, the first of its "What next": it
                   comes and goes, so it is a strip of its own (owner, 2026-11-05). -->
              <CountText
                v-if="r.step"
                class="camp-index-step"
                :class="{ 'is-todo': r.step.todo }"
                :text="r.step.text"
                :vals="{ n: r.step.n || 0 }"
              />
            </RouterLink>
          </li>
        </ul>
        <p
          v-else
          class="empty-note"
        >
          {{ labels.campNone }}
        </p>
      </section>

      <!-- What is coming, said rather than hidden (dimmed, with its reason). -->
      <section
        class="camps-deck is-soon"
        aria-labelledby="camps-deck-custom"
      >
        <i
          class="wi wi-add-circle camps-soon-mark"
          aria-hidden="true"
        />
        <div class="camps-deck-text">
          <h2
            id="camps-deck-custom"
            class="camps-deck-name"
          >
            {{ labels.campCustomTitle }}
            <span class="camps-soon">{{ labels.campSoon }}</span>
          </h2>
          <p class="camps-deck-sub">
            {{ labels.campCustomSoon }}
          </p>
        </div>
      </section>
    </div>

    <OptionHelpModal
      v-if="howOpen"
      :title="labels.campHowTitle"
      :text="labels.campHowText"
      link-to="/dominatus"
      :link-label="labels.campDeckRules"
      @close="howOpen = false"
    />
  </div>
</template>

<script setup>
// The Campaigns section (owner, 2026-11-05): the decks a campaign is played with — Dominatus, and
// a deck of one's own, still to come — and the campaigns this device knows: the account's own (the
// Warmaster's), the ones it plays in, the ones watched by a view link. Starting one needs an
// account (it is the Warmaster's to run), and so does taking part; watching needs none.
import { computed, ref, watch } from 'vue'
import '../../components/dominatus/dominatus.css'
import '../../components/dominatus/campaign/campaign.css'
import OptionHelpModal from '../../components/tracker/OptionHelpModal.vue'
import CountText from '../../components/CountText.vue'
import CampSignIn from '../../components/dominatus/campaign/CampSignIn.vue'
import { campaignWords } from '../../components/dominatus/campaign/useCampaignView.js'
import { useCampaigns } from '../../composables/useCampaigns.js'
import { useAuth } from '../../composables/useAuth.js'
import { nextSteps, playerStanding } from '../../core/dominatus/campaign.js'
import { dominatusDeck, domUpgrades } from '../../composables/dominatusMissions.js'
import { campaignPath } from '../../router/nav.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { status } = useAuth()
const { campaigns, refreshAccount, stateOf, myPlayer, syncAll } = useCampaigns()
const howOpen = ref(false)

// The session comes back after the page does (a refresh on load), so ask once it is there; then
// every campaign is read again, so the list says what waits in each.
watch(status, async (s) => {
  if (s === 'authed') await refreshAccount().catch(() => {})
  if (s !== 'idle') syncAll()
}, { immediate: true })

// Each campaign with where it stands (blank until the deck has loaded) and the first thing its
// "What next" says to this reader — their own step first; a watcher is told nothing.
const rows = computed(() => campaigns.value.map((c) => {
  const st = stateOf(c.id)
  if (!st) return { c, phase: '', step: null, mine: null }
  const l = labels.value
  const phase = st.finished ? l.campFinished : l.domPhase.replace('{n}', ['I', 'II', 'III'][st.phase - 1])
  const me = myPlayer(c, st)
  const steps = c.role === 'viewer' ? [] : nextSteps(st, me, c.role === 'owner')
  const first = steps.find((x) => x.todo) || steps[0]
  const words = campaignWords(() => st, locale)
  return {
    c,
    phase,
    phaseN: st.phase,
    finished: !!st.finished,
    location: dominatusDeck(locale.value)?.locations.find((x) => x.slug === st.locations?.[st.phase])?.name || null,
    mine: me ? playerStanding(st, me, domUpgrades(locale.value)) : null,
    step: first && !st.finished ? { ...first, text: words.stepText(first) } : null,
  }
}))
const KINDS = [{ kind: 'honour', label: 'domHonours' }, { kind: 'skill', label: 'domSkills' }, { kind: 'relic', label: 'domRelics' }]
const allianceName = (id) => dominatusDeck(locale.value)?.alliances.find((a) => a.id === id)?.name || id
const battlesText = (m) => labels.value.campRowBattles.replace('{n}', m.played).replace('{of}', m.due)
</script>

<style scoped>
.campaigns { max-width: 1100px; margin: 0 auto; padding-top: 0.5rem; }
/* A phone: the deck, its campaigns, then what is coming. From 901px: the decks in a column on the
   left, the open deck's campaigns beside them. */
.camps { display: grid; gap: 1.25rem; grid-template-areas: 'deck' 'list' 'soon'; }
.camps-deck.is-open { grid-area: deck; }
.camps-list { grid-area: list; min-width: 0; }
.camps-deck.is-soon { grid-area: soon; }
@media (min-width: 901px) {
  .camps {
    grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
    grid-template-areas: 'deck list' 'soon list';
    grid-template-rows: auto 1fr;
    align-items: start;
    gap: 0.75rem 1.75rem;
  }
}

.camps-deck {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.6rem 0.85rem;
  align-items: center;
  padding: 0.85rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
}
/* Beside the list it heads, the open deck is the selected one: the accent edge, as a picked row
   elsewhere. A phone shows no choice, so no mark. */
@media (min-width: 901px) {
  .camps-deck.is-open { border-color: var(--accent); }
}
.camps-deck-text { min-width: 0; }
.camps-deck-name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.1;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.2rem 0.5rem;
}
.camps-deck-sub { margin: 0.2rem 0 0; font-size: 0.85rem; color: var(--text-muted); }
/* The deck's own emblem, off the booklet's cover (scripts/trace-dominatus-emblems.py): drawn in
   the text colour, so it follows the theme. */
.camps-logo {
  width: 6.5rem;
  height: 6.5rem;
  background: var(--text-primary);
  mask: url('../../assets/dominatus/dom-logo.svg') center / contain no-repeat;
}
/* Side by side on a phone (one row less above the list), one under the other in the desk's narrow
   column. */
.camps-deck-acts { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.camps-deck-acts .btn-ghost { justify-content: center; padding-inline: 0.5rem; }
@media (min-width: 901px) {
  .camps-deck-acts { grid-template-columns: 1fr; }
}

.camps-deck.is-soon { opacity: 0.6; }
/* As wide as the emblem above, so both cards' text starts on one line. */
.camps-soon-mark { width: 3.5rem; height: 3.5rem; margin: 0 1.5rem; color: var(--text-muted); }
.camps-soon {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  border: 1px solid var(--border);
  padding: 0.05rem 0.35rem;
}

.camps-list > .dgroup-label { margin-top: 0; }
.camp-new { margin-bottom: 1rem; }
.camp-index { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.4rem; }
.camp-index-main { display: flex; gap: 0.7rem; padding: 0.6rem 0.75rem; }
.camp-index-phase { flex: none; width: 2.5rem; height: 2.5rem; margin: 0.1rem 0 0; }
.camp-index-name { flex: 1; display: grid; align-content: start; gap: 0.15rem; min-width: 0; }
.camp-index-line { display: flex; align-items: center; gap: 0.3rem; }
.camp-index-mine { display: flex; flex-wrap: wrap; align-items: center; gap: 0.15rem 0.6rem; }
.camp-index-count { display: inline-flex; align-items: center; gap: 0.2rem; font-family: var(--font-num); }
.camp-index-line .wi, .camp-index-mine .wi { flex: none; width: 1rem; height: 1rem; margin: 0; }
.camp-index-step {
  display: block; padding: 0.35rem 0.75rem; font-size: 0.82rem; color: var(--text-primary);
  background: color-mix(in srgb, var(--text-muted) 16%, var(--bg-card)); border-top: 1px solid var(--border);
}
.camp-index-step.is-todo { background: color-mix(in srgb, var(--accent) 18%, var(--bg-card)); }
.camp-index-side { display: grid; align-content: start; justify-items: end; gap: 0.1rem; }
.camp-index-warn { font-size: 0.75rem; font-weight: 700; color: var(--warning); white-space: nowrap; }
.camp-index a {
  display: block; border: 1px solid var(--border); background: var(--bg-card);
  color: var(--text-primary); text-decoration: none;
}
</style>
