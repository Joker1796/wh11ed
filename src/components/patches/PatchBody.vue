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
        <i class="wi wi-pdf pb-pdf-icon" />
        <span class="pb-fac-name">{{ download.title }}</span>
        <span class="pb-count">PDF</span>
        <i
          class="wi wi-chevron-down pb-chev"
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
            <i class="wi wi-import" />
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
          class="wi wi-chevron-down pb-chev"
          :class="{ open: isOpen(b.key) }"
        />
      </button>
      <CollapseTransition :show="isOpen(b.key)">
        <div
          v-if="isOpen(b.key) || wasOpened.has(b.key)"
          class="pb-fac-body"
        >
          <!-- Each kind of change folds on its own (owner, 2026-10-14: Custodes' 182 changes in one
               list). A block with one kind shows it open, the core rules with no heading over it. -->
          <div
            v-for="g in b.groups"
            :key="g.key"
            class="pb-group"
          >
            <button
              v-if="b.key !== 'core' || b.groups.length > 1"
              type="button"
              class="pb-group-head"
              :aria-expanded="groupOpen(b, g)"
              @click="toggle(`${b.key}:${g.key}`)"
            >
              <ChevronIcon :turned="groupOpen(b, g)" />
              <span class="pb-group-title">{{ g.title }}</span>
              <span class="pb-group-count">{{ g.count }}</span>
            </button>
            <CollapseTransition :show="groupOpen(b, g)">
              <a
                v-if="g.url"
                :href="g.url"
                class="pb-doc-link"
                target="_blank"
                rel="noopener"
              >
                <i class="wi wi-pdf" />
                {{ labels.patchesDocOpen }}
              </a>
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
            </CollapseTransition>
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
import ChevronIcon from '../ChevronIcon.vue'
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
  ['pub', 'patchesPublications', (x) => x.kind === 'publication' || x.kind === 'faction' || x.kind === 'document'],
  ['army', 'patchesArmyRules', (x) => x.kind === 'armyRule'],
  ['core', 'patchesCore', (x) => x.kind === 'coreRule'],
  // The game's own content (factions/_core-content.json), under the core rules.
  ['sizes', 'patchesBattleSizes', (x) => x.kind === 'battleSize' || x.kind === 'forceDisposition'],
  ['strat', 'patchesStratagems', (x) => x.kind === 'stratagem' && !x.parent],
  ['missions', 'patchesMissions', (x) => x.kind === 'mission' || x.kind === 'missionMatrix'],
  ['det', 'patchesDetachments', (x) => x.kind === 'detachment' || !!x.parent],
  ['unit', 'patchesUnits', (x) => x.kind === 'datasheet'],
  ['pts', 'patchesPoints', (x) => x.kind === 'points'],
  ['faq', 'patchesFaq', (x) => x.kind === 'faq'],
]

const blocks = computed(() => {
  const l = labels.value
  const byFaction = new Map()
  for (const x of props.items) {
    const k = x.source === 'doc' ? 'docs' : x.faction || 'core'
    if (!byFaction.has(k)) byFaction.set(k, [])
    byFaction.get(k).push(x)
  }
  const out = []
  for (const [key, items] of byFaction) {
    const entry = key === 'core' || key === 'docs' ? null : factionIndexBySlug(key)
    const groups = []
    // What GW's documents changed and the app has not: one group per document, its title linking
    // to the PDF; each change names its faction.
    if (key === 'docs') {
      const byDoc = new Map()
      for (const x of items) {
        if (!byDoc.has(x.doc.url)) byDoc.set(x.doc.url, { key: `doc:${x.doc.url}`, title: x.doc.title[locale.value] || x.doc.title.en, url: x.doc.url, items: [] })
        byDoc.get(x.doc.url).items.push({ ...x, name: `${factionIndexBySlug(x.faction)?.name || x.faction} · ${x.name}` })
      }
      groups.push(...[...byDoc.values()].map((g) => ({ ...g, count: g.items.length })))
    }
    for (const [gk, title, test] of key === 'docs' ? [] : GROUPS) {
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
        groups.push({ key: gk, title: l[title], count: gi.length, dets: [...dets].map(([name, its]) => ({ name, items: withHeader(name, its) })) })
      } else {
        groups.push({ key: gk, title: l[title], count: gi.length, items: gi })
      }
    }
    out.push({
      key,
      entry,
      name: key === 'core' ? l.patchesCore : key === 'docs' ? l.patchesDocs : (entry?.name || key),
      count: items.length,
      groups,
      // The faction's own colour as the header's edge (dark theme reads the light pair).
      tone: entry?.color ? { '--pb-edge': entry.color.dark } : null,
    })
  }
  const rank = (k) => (k === 'core' ? 0 : k === 'docs' ? 1 : 2)
  return out.sort((a, b) => rank(a.key) - rank(b.key) || a.name.localeCompare(b.name))
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
const groupOpen = (b, g) => b.groups.length === 1 || open.has(`${b.key}:${g.key}`)
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
.pb-group-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  min-height: 36px;
  padding: 0.25rem 0;
  border: none;
  background: none;
  color: var(--text-muted);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
@media (hover: hover) {
  .pb-group-head:hover { color: var(--text-primary); }
}
.pb-group-count { margin-left: auto; font-size: 0.75rem; font-weight: 700; }
.pb-group-title {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: inherit;
}
.pb-list { margin: 0; padding: 0; }
.pb-doc-link { display: inline-flex; align-items: center; gap: 0.35rem; margin: 0.1rem 0 0.4rem; font-size: 0.85rem; }
.pb-det + .pb-det { margin-top: 0.5rem; }
</style>
