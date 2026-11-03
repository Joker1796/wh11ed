<template>
  <section class="camp-block">
    <p
      v-if="!rewards.length"
      class="empty-note"
    >
      {{ labels.campNoRewards }}
    </p>
    <p
      v-else-if="!canTake"
      class="camp-dim"
    >
      {{ labels.campRewardsByWarmasterNote }}
    </p>
    <!-- The reader's own rewards, then — for the Warmaster — the other players' under a head that
         says why they are here (owner, 2026-11-03: the one red button among grey ones read as chance). -->
    <template
      v-for="g in groups"
      :key="g.key"
    >
      <template v-if="g.key === 'others'">
        <p class="camp-rewards-head">
          {{ labels.campOthersRewards }}
        </p>
        <p
          v-if="state.rewardsBy !== 'warmaster'"
          class="camp-dim camp-rewards-note"
        >
          {{ labels.campOthersRewardsNote }}
        </p>
      </template>
      <ul class="camp-list">
        <li
          v-for="r in g.list"
          :key="r.id"
          class="camp-reward"
          :data-reward="r.id"
        >
          <!-- Who, what, why on three short lines, and the draw on the right (owner, 2026-11-03: one
             long line through dots wrapped anywhere, and "draw 2" was said twice). Another player's
             reward says so in a tag, not on its button. -->
          <div class="camp-reward-head">
            <div class="camp-reward-text">
              <p class="camp-reward-who">
                <strong>{{ playerName(r.player) }}</strong>
                <span
                  v-if="forOther(r)"
                  class="camp-reward-tag"
                >{{ labels.campForPlayerTag }}</span>
                <span
                  v-else-if="isOwner"
                  class="camp-you"
                >{{ labels.campYou }}</span>
              </p>
              <p class="camp-reward-what">
                {{ rewardKind(r) }}
              </p>
              <p
                v-if="why(r)"
                class="camp-dim"
              >
                {{ why(r) }}
              </p>
            </div>
            <button
              v-if="appDraw(r)"
              :class="forOther(r) ? 'btn-ghost' : 'btn-primary'"
              class="camp-reward-go"
              data-press
              aria-haspopup="dialog"
              :disabled="drawing"
              @click="openDraw(r)"
            >
              {{ r.drawn ? labels.campDrawnShow : labels.campDrawCards.replace('{n}', r.draw) }}
            </button>
          </div>
          <!-- The Event Companion's timing (a campaign setting): what the end of a phase hands out is
             resolved at the next phase's first battle; Auspicious Augury before a witness. -->
          <p
            v-if="eventNote(r)"
            class="camp-dim"
          >
            {{ eventNote(r) }}
          </p>

          <!-- Handed out by the Warmaster alone (a campaign setting): a player sees what is owed. -->
          <template v-if="canTake">
            <!-- Auspicious Augury: the player shuffles their Secondary Missions and reports the Fixed
             Missions among the top four. -->
            <div
              v-if="r.kind === 'augury'"
              class="camp-row"
            >
              <NumberStepper
                :model-value="augury[r.id] || 0"
                :min="0"
                :max="4"
                @update:model-value="(v) => (augury[r.id] = v)"
              />
              <button
                class="btn-primary"
                @click="claim(r, { gained: augury[r.id] || 0 })"
              >
                {{ say(r, 'Confirm') }}
              </button>
            </div>

            <!-- Test of Mettle: up to one Battle Honour and one Battle Skill swapped. -->
            <div
              v-else-if="r.kind === 'mettle'"
              class="camp-form"
            >
              <div
                v-for="kind in ['honour', 'skill']"
                :key="kind"
                class="camp-pair"
              >
                <CampPick
                  v-model="swap[r.id + kind + 'out']"
                  :placeholder="`${kind === 'honour' ? labels.domHonours : labels.domSkills}: —`"
                  :options="[{ value: null, label: '—' }, ...heldOf(r.player, kind).map((u) => ({ value: u.slug, label: u.name }))]"
                />
                <CampPick
                  v-model="swap[r.id + kind + 'in']"
                  placeholder="→"
                  :disabled="!swap[r.id + kind + 'out']"
                  :options="swapTargets(r.player, swap[r.id + kind + 'out']).map((u) => ({ value: u.slug, label: u.name }))"
                />
              </div>
              <button
                class="btn-primary"
                @click="claimMettle(r)"
              >
                {{ say(r, 'Confirm') }}
              </button>
            </div>

            <!-- A draw: by the app (draw, then keep one of what came) or at the table (pick the card kept). -->
            <div
              v-else-if="state.draw !== 'app' || !pileOf(r).length"
              class="camp-form"
            >
              <!-- Drawn by the app: the button sits in the head (appDraw). The draw is written to the
                 campaign (a `draw` event) and opens a dialog of what came; closed unkept, or opened
                 on another device, the same cards wait — no re-roll. -->
              <div
                v-if="state.draw !== 'app'"
                class="camp-row"
              >
                <CampPick
                  v-model="kept[r.id]"
                  :placeholder="labels.campKeptCard"
                  :options="pileOf(r).map((slug) => ({ value: slug, label: upgradeName(slug) }))"
                />
                <button
                  class="btn-primary"
                  :disabled="!kept[r.id]"
                  @click="claim(r, { kept: kept[r.id] })"
                >
                  {{ say(r, 'Confirm') }}
                </button>
              </div>
              <button
                v-if="!pileOf(r).length"
                class="btn-ghost"
                @click="claim(r, {})"
              >
                {{ say(r, 'NothingLeft', 'Nothing') }}
              </button>
            </div>
          </template>
        </li>
      </ul>
    </template>
    <!-- What came, as the cards themselves: the reader keeps one having read them. -->
    <BaseModal
      v-if="drawFor?.drawn"
      :title="title(drawFor)"
      :subtitle="playerName(drawFor.player)"
      max-width="760px"
      @close="drawForId = null; chosen = null"
    >
      <!-- Tap a card to choose it (again to let it go); the one button at the foot keeps it, and
           says which and for whom. A single card drawn is no choice: it comes chosen. -->
      <div class="modal-body camp-draw-body">
        <div class="camp-drawn">
          <div
            v-for="slug in drawFor.drawn"
            :key="slug"
            class="camp-card-pick"
            :class="{ on: picked === slug, off: picked && picked !== slug }"
            role="button"
            tabindex="0"
            data-press
            :aria-pressed="picked === slug"
            @click="pick(slug, $event)"
            @keydown.enter.space.self.prevent="pick(slug)"
          >
            <DomUpgradeCard :upgrade="upgradeOf(slug)" />
          </div>
        </div>
      </div>
      <footer class="camp-draw-foot">
        <p
          v-if="drawFor.drawn.length > 1"
          class="camp-dim"
        >
          {{ labels.campKeepNote }}
        </p>
        <button
          class="btn-primary"
          :disabled="!picked"
          @click="keep(drawFor, picked)"
        >
          {{ picked ? say(drawFor, 'KeepNamed').replace('{card}', upgradeName(picked)) : labels.campKeepPick }}
        </button>
      </footer>
    </BaseModal>
  </section>
</template>

<script setup>
// What is owed to players: card draws after approved battles and at the end of a phase, and the
// Location bonuses that ask a player something. This device sees the rewards it may take — all of
// them for the Warmaster, a member's own otherwise (the fold refuses the rest anyway).
import { ref, reactive, computed } from 'vue'
import NumberStepper from '../../tracker/NumberStepper.vue'
import DomUpgradeCard from '../DomUpgradeCard.vue'
import BaseModal from '../../BaseModal.vue'
import CampPick from './CampPick.vue'
import { drawFor as drawCards, drawPile } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'

const { state, isOwner, mine, act, labels, deck, playerName, upgradeName, phaseLabel, rewardKind, onAsk, bringIntoView } = useCampaignView()
const kept = reactive({})
const augury = reactive({})
const swap = reactive({})

const canTake = computed(() => isOwner.value || state.value.rewardsBy !== 'warmaster')
const rewards = computed(() => state.value.pending.filter((r) => isOwner.value || r.player === mine.value?.id))
// The reader's own first, then the others the Warmaster may take for their players.
const groups = computed(() => [
  { key: 'mine', list: rewards.value.filter((r) => !forOther(r)) },
  { key: 'others', list: rewards.value.filter(forOther) },
].filter((g) => g.list.length))
const playerOf = (id) => state.value.players.find((p) => p.id === id)
const upgradeOf = (slug) => deck.value.upgrades.find((u) => u.slug === slug)
// The Warmaster taking another player's reward: the buttons say it is done for the player.
const forOther = (r) => isOwner.value && r.player !== mine.value?.id
function say(r, key, forKey = key) {
  const l = labels.value
  return (forOther(r) && l[`campFor${forKey}`]) || l[`camp${key}`]
}
const pileOf = (r) => (deck.value ? drawPile(deck.value, playerOf(r.player), r) : [])

// A draw the app makes, taken here: its button stands in the reward's head.
const appDraw = (r) => canTake.value && state.value.draw === 'app' && r.kind !== 'mettle' && r.kind !== 'augury' && !!pileOf(r).length
// Why it is owed: the battle it came from, by the opponent's name, or the phase that handed it out;
// and how many cards it draws when no button says it.
function why(r) {
  const l = labels.value
  if (r.kind === 'mettle' || r.kind === 'augury') return ''
  const b = r.battle && state.value.battles.find((x) => x.id === r.battle)
  const from = b ? l.campRewardFor.replace('{p}', playerName(b.a === r.player ? b.b : b.a)) : phaseLabel(r.phase)
  return appDraw(r) ? from : `${from} · ${l.campDrawN.replace('{n}', r.draw)}`
}
const title = (r) => [rewardKind(r), why(r)].filter(Boolean).join(' · ')
function eventNote(r) {
  if (state.value.format !== 'event' || r.battle) return ''
  const l = labels.value
  if (r.kind === 'augury') return l.campEventAugury
  return ['relic', 'fresh', 'mettle'].includes(r.kind) ? l.campEventTiming.replace('{n}', phaseLabel(Math.min(3, r.phase + 1))) : ''
}
// The reward whose drawn cards are in the dialog, read from the campaign as it folds.
const drawForId = ref(null)
const drawFor = computed(() => state.value.pending.find((r) => r.id === drawForId.value) || null)
const drawing = ref(false)
async function openDraw(r) {
  if (!r.drawn) {
    drawing.value = true
    const ok = await act('draw', { reward: r.id, cards: drawCards(deck.value, playerOf(r.player), r) })
    drawing.value = false
    if (!ok) return
  }
  chosen.value = null
  drawForId.value = r.id
}
// "What next": the reader's reward opens its cards when the app draws them, else its row comes into
// view (Augury, Mettle, a draw at the table ask something there); the rewards to hand out, the first.
onAsk({
  reward: (x) => {
    const r = state.value.pending.find((p) => p.id === x.reward?.id)
    if (r && appDraw(r)) openDraw(r)
    else if (r) bringIntoView(`[data-reward="${r.id}"]`)
  },
  give: () => {
    const r = rewards.value.find(forOther)
    if (r) bringIntoView(`[data-reward="${r.id}"]`)
  },
})
// The card chosen in the dialog; a draw of one comes chosen. A tap on a keyword inside a card
// opens its text and leaves the choice alone.
const chosen = ref(null)
const picked = computed(() => chosen.value || (drawFor.value?.drawn.length === 1 ? drawFor.value.drawn[0] : null))
function pick(slug, ev) {
  if (ev?.target.closest('.keyword, [data-kw-open], a, button')) return
  chosen.value = chosen.value === slug ? null : slug
}
async function keep(r, slug) {
  drawForId.value = null
  chosen.value = null
  await claim(r, { kept: slug })
}
function heldOf(pid, kind) {
  return deck.value.upgrades.filter((u) => u.kind === kind && playerOf(pid).upgrades.includes(u.slug))
}
function swapTargets(pid, outSlug) {
  const out = deck.value?.upgrades.find((u) => u.slug === outSlug)
  if (!out) return []
  const held = playerOf(pid).upgrades
  return deck.value.upgrades.filter((u) => u.kind === out.kind && (out.kind !== 'honour' || u.phase === out.phase) && !held.includes(u.slug))
}
function claim(r, extra) {
  return act('claim', { reward: r.id, ...extra })
}
function claimMettle(r) {
  const swaps = ['honour', 'skill']
    .map((k) => ({ out: swap[r.id + k + 'out'], in: swap[r.id + k + 'in'] }))
    .filter((s) => s.out && s.in)
  claim(r, { swaps })
}
</script>
