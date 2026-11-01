<template>
  <section class="camp-block">
    <p
      v-if="!rewards.length"
      class="empty-note"
    >
      {{ labels.campNoRewards }}
    </p>
    <ul class="camp-list">
      <li
        v-for="r in rewards"
        :key="r.id"
        class="camp-reward"
      >
        <p class="camp-line">
          <strong>{{ playerName(r.player) }}</strong> · {{ title(r) }}
        </p>
        <!-- The Event Companion's timing (a campaign setting): what the end of a phase hands out is
             resolved at the next phase's first battle; Auspicious Augury before a witness. -->
        <p
          v-if="eventNote(r)"
          class="camp-dim"
        >
          {{ eventNote(r) }}
        </p>

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
          v-else
          class="camp-form"
        >
          <template v-if="state.draw === 'app'">
            <!-- The draw is written to the campaign (a `draw` event) and opens a dialog of what came;
                 closed unkept, or opened on another device, the same cards wait — no re-roll. -->
            <button
              class="btn-ghost"
              data-press
              aria-haspopup="dialog"
              :disabled="drawing"
              @click="openDraw(r)"
            >
              {{ r.drawn ? say(r, 'DrawnShow', 'Show') : say(r, 'DrawCards', 'Draw').replace('{n}', r.draw) }}
            </button>
          </template>
          <div
            v-else
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
      </li>
    </ul>
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

const { state, isOwner, mine, act, labels, deck, playerName, upgradeName, phaseLabel } = useCampaignView()
const kept = reactive({})
const augury = reactive({})
const swap = reactive({})

const rewards = computed(() => state.value.pending.filter((r) => isOwner.value || r.player === mine.value?.id))
const playerOf = (id) => state.value.players.find((p) => p.id === id)
const upgradeOf = (slug) => deck.value.upgrades.find((u) => u.slug === slug)
// The Warmaster taking another player's reward: the buttons say it is done for the player.
const forOther = (r) => isOwner.value && r.player !== mine.value?.id
function say(r, key, forKey = key) {
  const l = labels.value
  return (forOther(r) && l[`campFor${forKey}`]) || l[`camp${key}`]
}
const pileOf = (r) => (deck.value ? drawPile(deck.value, playerOf(r.player), r) : [])

function title(r) {
  const l = labels.value
  const what = { honour: l.domHonours, skill: l.domSkills, relic: l.domRelics, fresh: l.campFresh, mettle: l.campMettle, augury: l.campAugury }[r.kind] || r.kind
  return r.kind === 'mettle' || r.kind === 'augury' ? what : `${what} · ${phaseLabel(r.phase)} · ${l.campDrawN.replace('{n}', r.draw)}`
}
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
