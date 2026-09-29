<template>
  <BaseModal
    :title="labels.trackerTakeTitle"
    :subtitle="`${name} · ${labels.trackerRoundShort} ${current.currentRound}`"
    max-width="440px"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <!-- Taken: what came in — a random draw is final. This is the moment a card's WHEN DRAWN
           rule is written for, so a card that carries one offers it right here, under its own
           words (whenDrawn.js decides when it is on offer). -->
      <template v-if="taken">
        <ul class="took-list">
          <li
            v-for="m in takenMissions"
            :key="m.slug"
            class="took-item"
          >
            <!-- The card folds open in place (owner, 2026-09-29) — its briefing and conditions,
                 read-only — rather than behind an "i". A card with a WHEN DRAWN rule says so on
                 its line: that rule is for this very moment. -->
            <button
              type="button"
              class="ti-row"
              :aria-expanded="openSlugs.includes(m.slug)"
              @click="toggleOpen(m.slug)"
            >
              <ChevronIcon
                class="ti-chev"
                :turned="openSlugs.includes(m.slug)"
                from="right"
                to="down"
              />
              <span class="ti-name">{{ m.name }}</span>
              <span
                v-if="whenDrawnText(m.slug, player.role, locale)"
                class="ti-badge"
              >{{ labels.trackerWhenDrawnBadge }}</span>
              <DieIcon
                v-if="sourceOf(m.slug) === 'random'"
                class="ti-src"
              />
              <i
                v-else
                class="bi bi-hand-index-thumb ti-src"
                aria-hidden="true"
              />
            </button>
            <CollapseTransition :show="openSlugs.includes(m.slug)">
              <div class="ti-body">
                <MissionBriefing :briefing="m.briefing" />
                <ScoreRows
                  :blocks="blocksOf(m.slug)"
                  :count="() => 0"
                  readonly
                />
              </div>
            </CollapseTransition>
            <div
              v-if="whenDrawnAction(current, pi, m.slug)"
              class="ti-wd"
            >
              <!-- Its words are already in the briefing while the card is open. -->
              <p
                v-if="!openSlugs.includes(m.slug)"
                class="ti-wd-text"
              >
                <strong>{{ labels.trackerWhenDrawn }}:</strong> {{ whenDrawnText(m.slug, player.role, locale) }}
              </p>
              <button
                class="ti-wd-btn"
                @click="startRedraw(m.slug, whenDrawnAction(current, pi, m.slug).mode)"
              >
                {{ whenDrawnAction(current, pi, m.slug).mode === 'discard' ? labels.trackerDiscardDraw : labels.trackerShuffleDraw }}
              </button>
            </div>
          </li>
        </ul>
        <div class="tk-done">
          <!-- Put the pair back — the take undone, while nothing on either card was scored
               (canUntakeSecondaries); the dialog then offers the take again. -->
          <button
            v-if="canUntakeSecondaries(pi)"
            class="btn-ghost tk-undo"
            @click="untakeSecondaries(pi)"
          >
            <i
              class="bi bi-arrow-counterclockwise"
              aria-hidden="true"
            />
            {{ labels.trackerTakeUndo }}
          </button>
          <button
            class="btn-primary tk-main"
            @click="$emit('close')"
          >
            {{ labels.trackerTakeDone }}
          </button>
        </div>
      </template>

      <template v-else>
        <p class="tk-note">
          {{ labels.trackerTakeNote }}
        </p>
        <button
          class="btn-primary tk-main"
          :disabled="picked.length > 0"
          @click="onRandom"
        >
          <DieIcon />
          {{ labels.trackerTakeRandom }}
        </button>
        <div class="or-sep">
          <span>{{ labels.trackerTakeOrChoose }}</span>
        </div>
        <ul class="pick-list">
          <li
            v-for="m in deckMissions"
            :key="m.slug"
            class="pick-li"
          >
            <button
              class="pick-item"
              :class="{ on: picked.includes(m.slug) }"
              :aria-pressed="picked.includes(m.slug)"
              :disabled="!picked.includes(m.slug) && picked.length >= need"
              @click="toggle(m.slug)"
            >
              <span class="pick-name">{{ m.name }}</span>
              <span class="pick-cat">{{ m.category }}</span>
              <i
                class="bi"
                :class="picked.includes(m.slug) ? 'bi-check-square-fill' : 'bi-square'"
                aria-hidden="true"
              />
            </button>
            <!-- The card's full text, without choosing it. -->
            <button
              class="tk-info"
              :aria-label="`${m.name} — ${labels.trackerCardDetails}`"
              :title="labels.trackerCardDetails"
              @click="detailSlug = m.slug"
            >
              <i
                class="bi bi-info-circle"
                aria-hidden="true"
              />
            </button>
          </li>
        </ul>
      </template>
    </div>
    <footer
      v-if="!taken"
      class="tk-foot"
    >
      <button
        class="btn-primary tk-main"
        :disabled="picked.length !== need"
        @click="onChosen"
      >
        {{ labels.trackerTakeChosen.replace('{n}', picked.length).replace('{of}', need) }}
      </button>
    </footer>

    <!-- A card's full text: its briefing and every scoring condition this round, read-only. -->
    <ScoringModal
      v-if="detailMission"
      :title="detailMission.name"
      :subtitle="`${labels.trackerSecondary} · ${detailMission.category}`"
      :blocks="detailBlocks"
      :briefing="detailMission.briefing"
      :count="() => 0"
      readonly
      view-only-note=""
      @close="detailSlug = null"
    />

    <!-- A card that came in by hand is replaced by hand too, as in the deck's own sheet. -->
    <ReplaceCardModal
      v-if="replacing"
      :pi="pi"
      :slug="replacing.slug"
      :title="labels.trackerWhenDrawn"
      :subtitle="missionName(replacing.slug)"
      choosable
      @pick="onReplacePick"
      @close="replacing = null"
    />
  </BaseModal>
</template>

<script setup>
import { computed, ref } from 'vue'
import DieIcon from '../DieIcon.vue'
import BaseModal from '../BaseModal.vue'
import ScoringModal from './ScoringModal.vue'
import ScoreRows from './ScoreRows.vue'
import MissionBriefing from '../MissionBriefing.vue'
import CollapseTransition from '../CollapseTransition.vue'
import ChevronIcon from '../ChevronIcon.vue'
import ReplaceCardModal from './ReplaceCardModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, missionBySlug, scorableBlocks } from '../../composables/useTracker.js'
import { whenDrawnAction, whenDrawnText } from '../../composables/whenDrawn.js'

// The turn's two secondaries (tactical): both at random, or both picked by hand — one way for
// the pair, as in Mikhail's prototype. The random pair is written the moment it is drawn, so
// closing and reopening this dialog shows the same two rather than rolling again.
const props = defineProps({
  pi: { type: Number, required: true },
  name: { type: String, required: true },
})
defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, tookSecondaries, takeRandomSecondaries, takeChosenSecondaries, redrawSecondary, canUntakeSecondaries, untakeSecondaries } = useTracker()

const player = computed(() => current.value.players[props.pi])
const taken = computed(() => tookSecondaries(props.pi))
const need = computed(() => Math.min(2, player.value.secondary.deck.length))
const mission = (slug) => missionBySlug(slug, player.value.role, locale.value)

const deckMissions = computed(() =>
  player.value.secondary.deck.map(mission).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name)),
)
// What this turn brought in — the cards drawn in the live round.
const takenMissions = computed(() => {
  const drawn = player.value.secondary.drawn || {}
  return player.value.secondary.hand.filter(slug => drawn[slug] === current.value.currentRound).map(mission).filter(Boolean)
})

const picked = ref([])
function toggle(slug) {
  picked.value = picked.value.includes(slug) ? picked.value.filter(x => x !== slug) : [...picked.value, slug]
}
function onRandom() { takeRandomSecondaries(props.pi) }

const sourceOf = (slug) => player.value.secondary.source?.[slug] || taken.value
const missionName = (slug) => mission(slug)?.name || slug

// A card's scoring conditions this round, as its dialog shows them.
const blocksOf = (slug) => scorableBlocks(slug, player.value.role, current.value.currentRound, locale.value)
  .filter((b) => b.kind === player.value.secondaryMode)
// A card's full text from the pick list (its "i").
const detailSlug = ref(null)
const detailMission = computed(() => (detailSlug.value ? mission(detailSlug.value) : null))
const detailBlocks = computed(() => blocksOf(detailSlug.value))
// The taken cards open in place, each on its own.
const openSlugs = ref([])
function toggleOpen(slug) {
  openSlugs.value = openSlugs.value.includes(slug) ? openSlugs.value.filter((x) => x !== slug) : [...openSlugs.value, slug]
}

// WHEN DRAWN, right after the draw: a random card is replaced at random at once; a chosen one
// opens the replacement picker.
const replacing = ref(null)
function startRedraw(slug, how) {
  if (sourceOf(slug) === 'chosen') replacing.value = { slug, how }
  else redrawSecondary(props.pi, slug, how)
}
function onReplacePick(pick) {
  const { slug, how } = replacing.value
  replacing.value = null
  redrawSecondary(props.pi, slug, how, pick)
}
function onChosen() { takeChosenSecondaries(props.pi, picked.value) }
</script>

<style scoped>
.tk-note { margin: 0 0 0.5rem; font-size: 0.8rem; line-height: 1.4; color: var(--text-muted); }
.tk-main { width: 100%; justify-content: center; gap: 0.45rem; min-height: 42px; padding: 0.4rem 0.8rem; font-weight: 700; }
/* The divider sits closer here than its shared default: this dialog is a list to scan. */
.or-sep { margin: 0.6rem 0 0.4rem; }
.pick-list, .took-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.25rem; }
/* One line a card: the name, its kind on the right, the box. */
.pick-item {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  column-gap: 0.6rem;
  align-items: center;
  min-height: 42px;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  text-align: left;
  font: inherit;
  cursor: pointer;
}
.pick-item .bi { font-size: 1.1rem; color: var(--text-dim); }
.pick-item.on { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, var(--bg-card)); }
.pick-item.on .bi { color: var(--accent); }
.pick-item:disabled { opacity: 0.45; cursor: default; }
.pick-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 700; font-size: 0.9rem; color: var(--text-primary); }
.pick-cat { white-space: nowrap; font-size: 0.72rem; color: var(--text-dim); }
.ti-src { font-size: 1.1rem; color: var(--text-muted); }
.took-item { padding: 0.35rem 0.6rem; border: 1px solid var(--border); background: var(--bg-card); }
.ti-row {
  display: flex; align-items: center; gap: 0.5rem; width: 100%; min-height: 36px;
  padding: 0; border: 0; background: none; font: inherit; text-align: left; cursor: pointer;
}
.ti-row .ti-name { flex: 1 1 auto; min-width: 0; }
.ti-chev { flex-shrink: 0; font-size: 0.8rem; color: var(--text-dim); }
.ti-badge {
  flex-shrink: 0; padding: 0.1rem 0.4rem;
  border: 1px solid var(--accent); font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.03em; color: var(--accent);
}
.ti-body { padding: 0.2rem 0 0.35rem; }
/* The WHEN DRAWN rule under a card that has one: its words, and the action. */
.ti-wd { margin-top: 0.35rem; padding-top: 0.35rem; border-top: 1px solid var(--border-light); }
.ti-wd-text { margin: 0 0 0.35rem; font-size: 0.78rem; line-height: 1.4; color: var(--text-muted); }
.ti-wd-btn {
  width: 100%; min-height: 36px; padding: 0.3rem 0.6rem;
  border: 1px solid var(--accent); background: color-mix(in srgb, var(--accent) 8%, var(--bg-card));
  font: inherit; font-size: 0.84rem; font-weight: 700; color: var(--accent); cursor: pointer;
}
/* A row of the pick list: the card (tap to choose) and its "i" (tap to read). */
.pick-li { display: flex; gap: 0.25rem; }
.pick-li .pick-item { flex: 1 1 auto; min-width: 0; }
.tk-info {
  flex-shrink: 0; width: 40px; min-height: 40px;
  border: 1px solid var(--border); background: var(--bg-card);
  color: var(--text-muted); font-size: 1rem; cursor: pointer;
}
@media (hover: hover) { .tk-info:hover { color: var(--accent); border-color: var(--accent); } }
.ti-name { font-weight: 700; color: var(--text-primary); }
.took-list { margin-bottom: 0.6rem; }
.tk-done { display: flex; gap: 0.5rem; }
.tk-done .tk-main { flex: 1 1 auto; }
.tk-undo { flex-shrink: 0; display: inline-flex; align-items: center; gap: 0.35rem; min-height: 42px; }
.tk-foot { padding: 0.5rem 0.9rem; border-top: 1px solid var(--border); }
/* The die sits beside bold button text: a size up, or it reads as a speck. */
.tk-main .die-icon { font-size: 1.25em; }
</style>
