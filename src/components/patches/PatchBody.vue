<template>
  <div class="pb">
    <p
      v-if="!blocks.length"
      class="pb-empty"
    >
      {{ labels.patchesNothing }}
    </p>
    <!-- The update's prices as one file (PatchesView passes it): the first plate, folded like
         the rest, the link inside (owner, 2026-10-02). -->
    <section
      v-if="download"
      class="pb-fac"
    >
      <button
        type="button"
        class="pb-fac-head"
        :aria-expanded="isOpen('pdf')"
        @click="toggle('pdf')"
      >
        <i class="bi bi-file-earmark-pdf pb-pdf-icon" />
        <span class="pb-fac-name">{{ download.title }}</span>
        <span class="pb-count">PDF</span>
        <i
          class="bi bi-chevron-down pb-chev"
          :class="{ open: isOpen('pdf') }"
        />
      </button>
      <CollapseTransition :show="isOpen('pdf')">
        <div class="pb-fac-body pb-pdf-body">
          <p class="pb-pdf-text">
            {{ download.text }}
          </p>
          <a
            :href="download.url"
            class="btn-primary pb-pdf-btn"
            target="_blank"
            rel="noopener"
          >
            <i class="bi bi-download" />
            {{ download.button }}
          </a>
        </div>
      </CollapseTransition>
    </section>
    <section
      v-for="b in blocks"
      :key="b.key"
      class="pb-fac"
    >
      <button
        type="button"
        class="pb-fac-head"
        :style="b.tone"
        :aria-expanded="isOpen(b.key)"
        @click="toggle(b.key)"
      >
        <FactionBadge
          v-if="b.entry"
          :faction="b.entry"
        />
        <span class="pb-fac-name">{{ b.name }}</span>
        <span class="pb-count">{{ b.count }}</span>
        <i
          class="bi bi-chevron-down pb-chev"
          :class="{ open: isOpen(b.key) }"
        />
      </button>
      <CollapseTransition :show="isOpen(b.key)">
        <div
          v-if="isOpen(b.key) || wasOpened.has(b.key)"
          class="pb-fac-body"
        >
          <div
            v-for="g in b.groups"
            :key="g.key"
            class="pb-group"
          >
            <h4
              v-if="b.key !== 'core'"
              class="pb-group-title"
            >
              {{ g.title }}
            </h4>
            <!-- A detachment's changes under its name: DP, disposition, rule, stratagems,
                 enhancements and their points, one heading for them all. -->
            <template v-if="g.key === 'det'">
              <div
                v-for="d in g.dets"
                :key="d.name"
                class="pb-det"
              >
                <ul class="pb-list">
                  <PatchEntry
                    v-for="(x, i) in d.items"
                    :key="i"
                    :item="x"
                  />
                </ul>
              </div>
            </template>
            <ul
              v-else
              class="pb-list"
            >
              <PatchEntry
                v-for="(x, i) in g.items"
                :key="i"
                :item="x"
              />
            </ul>
          </div>
        </div>
      </CollapseTransition>
    </section>
  </div>
</template>

<script setup>
// One GW update's changes, faction by faction (the core rules first), each faction's in the order a
// player reads a codex: books, army rules, detachments, units, points, FAQ. Each is a plate of its
// own with a dark header, folded until tapped — the Space Marines codex alone is 600 entries.
import { computed, reactive, watch } from 'vue'
import CollapseTransition from '../CollapseTransition.vue'
import FactionBadge from '../FactionBadge.vue'
import PatchEntry from './PatchEntry.vue'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  // { title, text, button, url } — the update's points PDF, or null.
  download: { type: Object, default: null },
  items: { type: Array, required: true },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const GROUPS = [
  ['pub', 'patchesPublications', (x) => x.kind === 'publication' || x.kind === 'faction'],
  ['army', 'patchesArmyRules', (x) => x.kind === 'armyRule'],
  ['core', 'patchesCore', (x) => x.kind === 'coreRule'],
  ['det', 'patchesDetachments', (x) => x.kind === 'detachment' || !!x.parent],
  ['unit', 'patchesUnits', (x) => x.kind === 'datasheet'],
  ['pts', 'patchesPoints', (x) => x.kind === 'points'],
  ['faq', 'patchesFaq', (x) => x.kind === 'faq'],
]

const blocks = computed(() => {
  const l = labels.value
  const byFaction = new Map()
  for (const x of props.items) {
    const k = x.faction || 'core'
    if (!byFaction.has(k)) byFaction.set(k, [])
    byFaction.get(k).push(x)
  }
  const out = []
  for (const [key, items] of byFaction) {
    const entry = key === 'core' ? null : factionIndexBySlug(key)
    const groups = []
    for (const [gk, title, test] of GROUPS) {
      const gi = items.filter(test)
      if (!gi.length) continue
      if (gk === 'det') {
        // The detachment's own line first, then what it holds, in the order the app lists them.
        const dets = new Map()
        for (const x of gi) {
          const name = x.parent || x.name
          if (!dets.has(name)) dets.set(name, [])
          dets.get(name)[x.parent ? 'push' : 'unshift'](x)
        }
        groups.push({ key: gk, title: l[title], dets: [...dets].map(([name, its]) => ({ name, items: withHeader(name, its) })) })
      } else {
        groups.push({ key: gk, title: l[title], items: gi })
      }
    }
    out.push({
      key,
      entry,
      name: key === 'core' ? l.patchesCore : (entry?.name || key),
      count: items.length,
      groups,
      // The faction's own colour as the header's edge (dark theme reads the light pair).
      tone: entry?.color ? { '--pb-edge': entry.color.dark } : null,
    })
  }
  return out.sort((a, b) => (a.key === 'core' ? -1 : b.key === 'core' ? 1 : a.name.localeCompare(b.name)))
})

// A detachment that only changed inside (a stratagem, an enhancement's points) still gets its own
// name on top — the entries under it name their kind, not the detachment.
function withHeader(name, items) {
  return items[0] && !items[0].parent ? items : [{ kind: 'detachment', name, change: 'inside' }, ...items]
}

// Every block starts folded (owner, 2026-10-01) and opens on a tap of its whole header. A block
// once opened keeps its rendered list while it folds, so closing animates.
const open = reactive(new Set())
const wasOpened = reactive(new Set())
const isOpen = (k) => open.has(k)
function toggle(k) {
  if (open.has(k)) open.delete(k)
  else { open.add(k); wasOpened.add(k) }
}
// A different list (another update, another filter) starts folded again.
watch(() => props.items, () => { open.clear(); wasOpened.clear() })
</script>

<style scoped>
.pb-empty { color: var(--text-muted); font-size: 0.9rem; margin: 0.5rem 0; }

/* One plate per block: a dark header (the navbar's ground, so it reads as a bar in either theme)
   with the faction's colour on its edge, the changes on the card below it. */
.pb-fac {
  margin-bottom: 0.45rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
}
.pb-fac-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 2.75rem;
  padding: 0.4rem 0.75rem;
  background: var(--bg-insert);
  border: none;
  border-left: 4px solid var(--pb-edge, var(--accent-on-dark));
  font: inherit;
  text-align: left;
  color: var(--text-on-dark);
  cursor: pointer;
  transition: background var(--motion-fast);
}
.pb-fac-head:hover { background: color-mix(in srgb, var(--bg-insert) 85%, white); }
.pb-fac-name { flex: 1; font-weight: 700; font-size: 0.95rem; }
.pb-count {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0 0.35rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.pb-chev { font-size: 0.85rem; transition: transform var(--motion-fast) ease; }
.pb-chev.open { transform: rotate(180deg); }
.pb-fac-body { padding: 0.15rem 0.6rem 0.6rem; }
.pb-pdf-icon { font-size: 1.05rem; color: var(--accent-on-dark); }
.pb-pdf-body { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem 1rem; padding-top: 0.6rem; }
.pb-pdf-text { flex: 1 1 18rem; margin: 0; font-size: 0.86rem; line-height: 1.45; color: var(--text-muted); }
.pb-pdf-btn { display: inline-flex; align-items: center; gap: 0.4rem; min-height: 40px; text-decoration: none; }
.pb-pdf-btn:hover { text-decoration: none; }
.pb-group { margin-top: 0.35rem; }
.pb-group-title {
  margin: 0.3rem 0 0.35rem;
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent-ink);
}
.pb-list { margin: 0; padding: 0; }
.pb-det + .pb-det { margin-top: 0.5rem; }
</style>
