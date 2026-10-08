<template>
  <div class="patches-view">
    <div class="hero">
      <h1 class="hero-title">
        {{ labels.patchesTitle }}
      </h1>
      <p class="hero-sub">
        {{ labels.patchesSubtitle }}
      </p>
    </div>

    <div class="pv-bar">
      <!-- The faction filter: a dropdown under it on a wide screen, the sheet on a phone. -->
      <AdaptivePicker
        v-model:open="pickerOpen"
        panel-width="30rem"
        :title="labels.patchesFaction"
      >
        <template #trigger="{ toggle: togglePicker, open }">
          <button
            type="button"
            class="pv-trigger"
            :aria-expanded="open"
            aria-haspopup="dialog"
            @click="togglePicker"
          >
            <span class="pv-trigger-label">{{ labels.patchesFaction }}</span>
            <span class="pv-trigger-name">{{ filterName }}</span>
            <i class="bi bi-chevron-down" />
          </button>
        </template>
        <template #default="{ compact, bodyClass }">
          <div :class="bodyClass">
            <div class="pv-scopes">
              <button
                type="button"
                class="pv-scope"
                :class="{ on: filter === 'all' }"
                @click="pick('all')"
              >
                {{ labels.patchesAll }}
              </button>
              <button
                v-if="pinned.length"
                type="button"
                class="pv-scope"
                :class="{ on: filter === 'mine' }"
                @click="pick('mine')"
              >
                {{ labels.patchesMine }}
              </button>
            </div>
            <FactionPickerList
              :compact="compact"
              :selected="filter"
              @pick="pick"
            />
          </div>
        </template>
      </AdaptivePicker>

      <!-- Which update: the newest with something for the chosen factions, or any other. -->
      <AdaptivePicker
        v-if="current"
        v-model:open="patchPickerOpen"
        panel-width="22rem"
        :title="labels.patchesUpdate"
      >
        <template #trigger="{ toggle: togglePatches, open }">
          <button
            type="button"
            class="pv-trigger"
            :aria-expanded="open"
            aria-haspopup="dialog"
            @click="togglePatches"
          >
            <!-- When it came out, on the label line: the name alone left "is this the new one?" open
                 (owner, 2026-10-02). -->
            <span class="pv-trigger-label">{{ labels.patchesUpdate }} · {{ formatDate(current.date) }}</span>
            <span class="pv-trigger-name">{{ titleOf(current) }}</span>
            <i class="bi bi-chevron-down" />
          </button>
        </template>
        <template #default="{ bodyClass }">
          <div :class="bodyClass">
            <button
              v-for="p in shown"
              :key="p.id"
              type="button"
              class="pv-opt"
              :class="{ on: p.id === current.id }"
              @click="pickPatch(p.id)"
            >
              <span class="pv-opt-title">{{ titleOf(p) }}</span>
              <span class="pv-opt-meta">{{ formatDate(p.date) }} · {{ labels.patchesChanges }}: {{ p.count }}</span>
            </button>
          </div>
        </template>
      </AdaptivePicker>
    </div>

    <p
      v-if="!shown.length"
      class="pv-empty"
    >
      {{ labels.patchesNothing }}
    </p>

    <!-- One update on the page at a time, its file fetched when it is picked. -->
    <div
      v-if="current"
      class="pv-patch"
    >
      <p
        v-if="failed[current.id]"
        class="pv-empty"
        role="status"
      >
        {{ labels.patchesLoadError }}
      </p>
      <p
        v-else-if="!loaded[current.id]"
        class="pv-empty"
        role="status"
      >
        {{ labels.patchesLoading }}
      </p>
      <PatchBody
        v-else
        :items="itemsOf(current.id)"
        :download="pdfDownload"
      />
    </div>
  </div>
</template>

<script setup>
// GW's updates in one place (/patches, owner 2026-10-01): the app's rules data, the Munitorum Field
// Manual's points and the FAQ, update by update, "was → now". Generated from the data history by
// scripts/gen-patch-notes.mjs — nothing here is written by hand. The list (index.js) is light; an
// update's changes load when it is picked (one on the page at a time, the newest by default). Narrowing to a faction (or to
// the pinned ones) is in the address, so a link to "what changed for Orks" can be shared.
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdaptivePicker from '../components/AdaptivePicker.vue'
import FactionPickerList from '../components/tracker/FactionPickerList.vue'
import PatchBody from '../components/patches/PatchBody.vue'
import { patches } from '../data/patches/index.js'
import { patchDownloads } from '../data/patchDownloads.js'
import { factionGroups, factionIndexBySlug } from '../data/factionsIndex.js'
import { useFavorites } from '../composables/useFavorites.js'
import { useFormatDate } from '../composables/useFormatDate.js'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()
const route = useRoute()
const router = useRouter()
const { pinnedFactionsFrom } = useFavorites()

const pinned = computed(() => pinnedFactionsFrom(factionGroups).map((f) => f.slug))

// `?f=` — a faction slug, `mine` (the pinned ones) or nothing (all). With no choice made, a reader
// who pinned factions sees theirs — decided when the faction list is first opened and kept after:
// the list has the pin stars, and a pin there swapped "All" for "Mine" (and the update with it)
// under the reader's finger (owner, 2026-10-02).
const pickerOpen = ref(false)
const startScope = ref(null)
watch(pickerOpen, (open) => { if (open && !startScope.value) startScope.value = pinned.value.length ? 'mine' : 'all' })
const filter = computed(() => {
  const f = route.query.f
  if (f === 'all' || (f && factionIndexBySlug(f))) return f
  const scope = f === 'mine' ? 'mine' : f ? 'all' : startScope.value || (pinned.value.length ? 'mine' : 'all')
  return scope === 'mine' && pinned.value.length ? 'mine' : 'all'
})
const filterSlugs = computed(() => (filter.value === 'all' ? null : filter.value === 'mine' ? pinned.value : [filter.value]))
const filterName = computed(() => (filter.value === 'all' ? labels.value.patchesAll
  : filter.value === 'mine' ? labels.value.patchesMine
    : factionIndexBySlug(filter.value)?.name || filter.value))

// A push, not a replace: on a phone the picker is a sheet whose closing steps Back over its own
// history entry (useBackToClose) — a replace swapped that very entry and the step undid the pick.
// As a push it is also what Back should undo: the previous filter.
function pick(f) {
  pickerOpen.value = false
  if (f !== filter.value) router.push({ query: { ...route.query, f } })
}

// The core rules belong to every army, so they stay in a narrowed list.
const counted = (p) => {
  const s = filterSlugs.value
  if (!s) return p.total
  return (p.byFaction.core || 0) + s.reduce((n, slug) => n + (p.byFaction[slug] || 0), 0)
}
const shown = computed(() => patches.map((p) => ({ ...p, count: counted(p) })).filter((p) => p.count))

// Each update's file, loaded on first open; a failed load (offline, a stale tab) says so and is
// tried again on the next open.
const files = import.meta.glob(['../data/patches/*.json'])
const loaded = reactive({})
const failed = reactive({})
async function load(id) {
  if (loaded[id]) return
  delete failed[id]
  try {
    const mod = await files[`../data/patches/${id}.json`]()
    loaded[id] = mod.default || mod
  } catch {
    failed[id] = true
  }
}
function itemsOf(id) {
  const s = filterSlugs.value
  const items = loaded[id]?.items || []
  return s ? items.filter((x) => !x.faction || s.includes(x.faction)) : items
}

// `?p=` — the update on the page; with none, or one the filter has nothing in, the newest that has.
const current = computed(() => shown.value.find((p) => p.id === route.query.p) || shown.value[0] || null)
watch(current, (p) => { if (p) load(p.id) }, { immediate: true })

const patchPickerOpen = ref(false)
// A push, like the faction pick (see pick()).
function pickPatch(id) {
  patchPickerOpen.value = false
  if (id !== current.value?.id) router.push({ query: { ...route.query, p: id } })
  else if (failed[id]) load(id) // picking the one that failed to load tries again
}
// The points PDF of the update on the page, if it has one, in this reader's language — the first
// plate of the list (PatchBody), whatever the faction filter.
const pdfDownload = computed(() => {
  const f = patchDownloads[current.value?.id]?.points?.[locale.value === 'ru' ? 'ru' : 'en']
  if (!f) return null
  const l = labels.value
  // The data build is named too: MFM 1.5 was re-priced in place on 2 October, so the version alone
  // no longer says which prices the file holds.
  const build = current.value.labels.app ? ` · ${l.patchesPointsPdfBuild.replace('{n}', current.value.labels.app)}` : ''
  return { title: l.patchesPointsPdfLabel.replace('{v}', current.value.labels.mfm) + build, text: l.patchesPointsPdfText, button: `${l.patchesPointsPdf} · ${f.size}`, url: f.url }
})

const titleOf = (p) => [
  p.labels.app ? `${labels.value.patchesAppData} ${p.labels.app}` : '',
  p.labels.mfm ? `MFM v${p.labels.mfm}` : '',
].filter(Boolean).join(' · ')
</script>

<style scoped>
.patches-view { padding-top: 0.5rem; }

.hero {
  text-align: center;
  padding: 0.6rem 0 0.5rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 0.6rem;
}
.hero-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}
.hero-sub {
  margin: 0.2rem 0 0;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--text-muted);
}

.pv-bar,
.pv-empty,
.pv-patch {
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
}
.pv-bar { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.5rem; }
/* The label on a line of its own above the name, the chevron beside both (owner, 2026-10-01). */
.pv-trigger {
  display: inline-grid;
  grid-template-columns: auto auto;
  align-items: center;
  column-gap: 0.6rem;
  padding: 0.35rem 0.7rem;
  text-align: left;
  background: var(--bg-card);
  border: 1px solid var(--border);
  font: inherit;
  color: var(--text-primary);
  cursor: pointer;
}
.pv-trigger-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
}
.pv-trigger-name { font-weight: 600; font-size: 0.9rem; }
.pv-trigger .bi { grid-column: 2; grid-row: 1 / span 2; font-size: 0.75rem; color: var(--text-muted); }

.pv-scopes {
  display: flex;
  gap: 0.4rem;
  padding: 0 0 0.5rem;
  margin-bottom: 0.4rem;
  border-bottom: 1px solid var(--border);
}
.pv-scope {
  flex: 1;
  padding: 0.5rem;
  background: none;
  border: 1px solid var(--border);
  font: inherit;
  font-size: 0.85rem;
  color: var(--text-primary);
  cursor: pointer;
}
.pv-scope.on {
  border-color: var(--accent);
  color: var(--accent-ink);
  font-weight: 600;
}

.pv-empty {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 0;
}

.pv-patch > .pv-empty { margin: 0.6rem 0; }

/* The update picker's rows: the name, and under it when and how much. */
.pv-opt {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 0.6rem;
  background: none;
  border: none;
  border-bottom: 1px solid var(--border-light);
  font: inherit;
  text-align: left;
  color: var(--text-primary);
  cursor: pointer;
}
.pv-opt:last-child { border-bottom: none; }
.pv-opt:hover { background: color-mix(in srgb, var(--accent) 8%, transparent); }
.pv-opt.on .pv-opt-title { color: var(--accent-ink); }
.pv-opt-title { font-weight: 600; font-size: 0.9rem; }
.pv-opt-meta { font-size: 0.75rem; color: var(--text-muted); }
</style>
