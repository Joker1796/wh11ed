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
            {{ labels.campConfirm }}
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
            {{ labels.campConfirm }}
          </button>
        </div>

        <!-- A draw: by the app (draw, then keep one of what came) or at the table (pick the card kept). -->
        <div
          v-else
          class="camp-form"
        >
          <template v-if="state.draw === 'app'">
            <!-- The draw opens a dialog of what came; closed unkept, the same cards wait (no re-roll). -->
            <button
              class="btn-ghost"
              data-press
              aria-haspopup="dialog"
              @click="openDraw(r)"
            >
              {{ drawn[r.id] ? labels.campDrawnShow : labels.campDrawCards.replace('{n}', r.draw) }}
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
              {{ labels.campConfirm }}
            </button>
          </div>
          <button
            v-if="!pileOf(r).length"
            class="btn-ghost"
            @click="claim(r, {})"
          >
            {{ labels.campNothingLeft }}
          </button>
        </div>
      </li>
    </ul>
    <!-- What came, as the cards themselves: the reader keeps one having read them. -->
    <BaseModal
      v-if="drawFor && drawn[drawFor.id]"
      :title="title(drawFor)"
      :subtitle="playerName(drawFor.player)"
      max-width="760px"
      @close="drawFor = null"
    >
      <div class="modal-body camp-draw-body">
        <div class="camp-drawn">
          <div
            v-for="slug in drawn[drawFor.id]"
            :key="slug"
            class="camp-drawn-card"
          >
            <DomUpgradeCard :upgrade="upgradeOf(slug)" />
            <button
              class="btn-primary"
              @click="askKeep(drawFor, slug)"
            >
              {{ labels.campKeep }}
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
    <!-- Keeping one is final: say how many may be kept and where the rest go (the booklet: "return
         the others to the deck" — they can be drawn again). -->
    <ConfirmModal
      v-if="keeping"
      :title="labels.campKeepTitle"
      :message="labels.campKeepConfirm.replace('{card}', upgradeName(keeping.slug)).replace('{n}', drawn[keeping.r.id].length)"
      :confirm-label="labels.campKeep"
      :cancel-label="labels.trackerCancel"
      @confirm="keepNow"
      @close="keeping = null"
    />
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
import ConfirmModal from '../../ConfirmModal.vue'
import CampPick from './CampPick.vue'
import { drawFor as drawCards, drawPile } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'

const { state, isOwner, mine, act, labels, deck, playerName, upgradeName, phaseLabel } = useCampaignView()
const drawn = reactive({})
const kept = reactive({})
const augury = reactive({})
const swap = reactive({})

const rewards = computed(() => state.value.pending.filter((r) => isOwner.value || r.player === mine.value?.id))
const playerOf = (id) => state.value.players.find((p) => p.id === id)
const upgradeOf = (slug) => deck.value.upgrades.find((u) => u.slug === slug)
const pileOf = (r) => (deck.value ? drawPile(deck.value, playerOf(r.player), r) : [])

function title(r) {
  const l = labels.value
  const what = { honour: l.domHonours, skill: l.domSkills, relic: l.domRelics, fresh: l.campFresh, mettle: l.campMettle, augury: l.campAugury }[r.kind] || r.kind
  return r.kind === 'mettle' || r.kind === 'augury' ? what : `${what} · ${phaseLabel(r.phase)} · ${l.campDrawN.replace('{n}', r.draw)}`
}
// The reward whose drawn cards are in the dialog.
const drawFor = ref(null)
function openDraw(r) {
  if (!drawn[r.id]) drawn[r.id] = drawCards(deck.value, playerOf(r.player), r)
  drawFor.value = r
}
// One card drawn is no choice and is kept at once; of several, the reader confirms first.
const keeping = ref(null)
function askKeep(r, slug) {
  if (drawn[r.id].length > 1) keeping.value = { r, slug }
  else keep(r, slug)
}
function keepNow() {
  const { r, slug } = keeping.value
  keeping.value = null
  keep(r, slug)
}
async function keep(r, slug) {
  drawFor.value = null
  await claim(r, { drawn: drawn[r.id], kept: slug })
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
async function claim(r, extra) {
  await act('claim', { reward: r.id, ...extra })
  delete drawn[r.id]
}
function claimMettle(r) {
  const swaps = ['honour', 'skill']
    .map((k) => ({ out: swap[r.id + k + 'out'], in: swap[r.id + k + 'in'] }))
    .filter((s) => s.out && s.in)
  claim(r, { swaps })
}
</script>
