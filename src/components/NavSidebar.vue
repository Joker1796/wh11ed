<template>
  <nav
    class="sidebar"
    :class="{ open: mobileOpen }"
    :aria-label="labels.ariaNavigation"
  >
    <div class="sidebar-header">
      <span class="sidebar-logo">WH Rules</span>
      <button
        class="mobile-close"
        :aria-label="labels.ariaCloseMenu"
        @click="$emit('close')"
      >
        ✕
      </button>
    </div>

    <div class="nav-groups">
      <div
        v-for="section in navSections"
        :key="section.key"
        class="nav-section"
        :class="{ open: openSection === section.key, current: currentSection === section.key }"
      >
        <!-- One tap target per header: it folds the section, or — for a section that is a
             single page — goes there. Never both, so the row says what it does. -->
        <button
          class="nav-section-header"
          :aria-expanded="isDirect(section) ? undefined : openSection === section.key"
          @click="isDirect(section) ? goToGroup(section.groups[0]) : toggleSection(section.key)"
        >
          <span class="nav-section-label">{{ section.label }}</span>
          <ChevronIcon
            v-if="!isDirect(section)"
            class="chevron"
            from="down"
            to="up"
            :turned="openSection === section.key"
          />
        </button>

        <CollapseTransition :show="openSection === section.key && !isDirect(section)">
          <div class="nav-section-body">
            <div
              v-for="group in section.groups"
              :key="groupKey(group) || group.label"
              class="nav-group"
              :class="{ active: isActive(group, section.groups) }"
            >
              <div class="nav-group-label">
                <button
                  class="nav-group-link"
                  @click="goToGroup(group)"
                >
                  {{ group.label }}
                </button>
                <button
                  v-if="group.sections.length"
                  class="nav-group-toggle"
                  :aria-expanded="expandedKey === groupKey(group)"
                  :aria-label="labels.ariaToggleSubsections"
                  @click="toggleGroupExpand(group)"
                >
                  <ChevronIcon
                    class="chevron"
                    from="down"
                    to="up"
                    :turned="expandedKey === groupKey(group)"
                  />
                </button>
              </div>

              <CollapseTransition :show="expandedKey === groupKey(group) && group.sections.length > 0">
                <ul class="nav-sub">
                  <li
                    v-for="sec in group.sections"
                    :key="sec.label"
                  >
                    <a
                      href="#"
                      class="nav-sub-link"
                      @click.prevent="handleAnchorClick(group, sec.id, sec.filter)"
                    >
                      {{ sec.label.replace(/^\d+\s+/, '') }}
                    </a>
                  </li>
                </ul>
              </CollapseTransition>
            </div>
          </div>
        </CollapseTransition>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { stripLocale } from '../router/locale.js'
import { CORE_PATH, EVENT_PATH } from '../router/nav.js'
import { useNavGroups } from '../composables/useNavGroups.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useAbilityFilter } from '../composables/useAbilityFilter.js'
import { scrollToAnchor } from '../composables/useRefNavigation.js'
import CollapseTransition from './CollapseTransition.vue'
import ChevronIcon from './ChevronIcon.vue'

defineProps({ mobileOpen: Boolean })
const emit = defineEmits(['close'])

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const { activeFilter } = useAbilityFilter()
const labels = computed(() => ui[locale.value])

const localizedGroups = useNavGroups('core')
const localizedEventGroups = useNavGroups('event')
const localizedTrackerGroups = useNavGroups('tracker')
const localizedRosterGroups = useNavGroups('roster')
const localizedCombatPatrolGroups = useNavGroups('combatPatrol')
const factionGroupsBase = useNavGroups('faction')

const COMBAT_PATROL_PATH = '/combat-patrol'

// The box list itself heads its own section: with the header only folding, it would otherwise
// be the one page of the section the drawer cannot reach.
const localizedCpGroups = computed(() => [
  { label: labels.value.cpAllBoxes, path: COMBAT_PATROL_PATH, sections: [] },
  ...localizedCombatPatrolGroups.value,
])

// When a faction is open, the drawer's Factions section also lists that faction's two
// pages (rules — army rule + detachments merged — / datasheets) — the desktop subnav is
// hidden on mobile.
const localizedFactionGroups = computed(() => {
  const base = factionGroupsBase.value
  const slug = stripLocale(route.path).startsWith('/factions/') ? route.params.slug : null
  if (!slug) return base
  const l = labels.value
  const root = `/factions/${slug}`
  return [
    ...base,
    { label: l.factionRules,      path: root,                 sections: [] },
    { label: l.factionDatasheets, path: `${root}/datasheets`, sections: [] },
  ]
})

// The whole site, one level of sections deep. The three books used to sit under one "Rules"
// section of their own, which made a Core Rules sub-rule four taps deep and the drawer four
// indents wide (2026-10-02); the bottom nav's order after them, so the two agree.
const navSections = computed(() => {
  const l = labels.value
  return [
    { key: 'core',          label: l.navCoreRules,      groups: localizedGroups.value },
    { key: 'event',         label: l.navEventCompanion, groups: localizedEventGroups.value },
    { key: 'combat-patrol', label: l.cpHeading,         groups: localizedCpGroups.value },
    { key: 'roster',        label: l.navRoster,         groups: localizedRosterGroups.value },
    { key: 'factions',      label: l.navFactions,       groups: localizedFactionGroups.value },
    { key: 'tracker',       label: l.navTracker,        groups: localizedTrackerGroups.value },
    { key: 'patches',       label: l.navPatches,        groups: [{ label: l.navPatches, path: '/patches', sections: [] }] },
  ]
})

const under = (p, base) => p === base || p.startsWith(base + '/')

// The section the reader is in — open on arrival. The landing, /rules and the other loose
// pages belong to none, and the drawer opens on them folded: the map, not a guess.
const currentSection = computed(() => {
  const p = stripLocale(route.path)
  if (under(p, CORE_PATH)) return 'core'
  if (under(p, EVENT_PATH)) return 'event'
  if (under(p, COMBAT_PATROL_PATH)) return 'combat-patrol'
  if (under(p, '/tracker') || p === '/stratagems') return 'tracker'
  if (under(p, '/roster')) return 'roster'
  if (under(p, '/factions')) return 'factions'
  if (p === '/patches') return 'patches'
  return null
})

// The seven Core Rules groups all share one path and differ only by `hash` (they're
// chapters of the single /core-rules page), so path alone can no longer identify a group.
function groupKey(group) {
  return group.path ? group.path + (group.hash || '') : ''
}

// Which group's subsections are open (one at a time) and which section accordion is expanded
// (also one at a time). Both follow the route.
const expandedKey = ref(stripLocale(route.path) + route.hash)
const openSection = ref(currentSection.value)

watch(() => route.fullPath, () => {
  expandedKey.value = stripLocale(route.path) + route.hash
  openSection.value = currentSection.value
})

function isActive(group, groups) {
  if (stripLocale(route.path) !== group.path) return false
  if (!group.hash) return true
  // Landing on a merged page (/core-rules, /event-companion) with no hash means the top of
  // the page = its first chapter. `groups` is the section's own group list — find the
  // first entry that shares THIS group's path, not just groups[0].
  const first = groups.find((g) => g.path === group.path)
  return (route.hash || first?.hash) === group.hash
}

function toggleSection(key) {
  openSection.value = openSection.value === key ? null : key
}

// A section with a single page and no sub-anchors (Rosters, the patch notes) needs no
// accordion — its header just navigates straight to that page.
function isDirect(section) {
  return section.groups.length === 1 && !section.groups[0].sections.length
}

// Tap a group label → go to that page. The chevron beside it handles expand/collapse without
// navigating.
function goToGroup(group) {
  // A Core Rules chapter is an anchor on the shared page, not a page of its own.
  if (group.hash) return handleAnchorClick(group, group.hash.slice(1))
  if (stripLocale(route.path) !== group.path) router.push(group.path)
  emit('close')
}

function toggleGroupExpand(group) {
  const key = groupKey(group)
  expandedKey.value = expandedKey.value === key ? null : key
}

async function handleAnchorClick(group, id, filter) {
  emit('close')
  if (filter) activeFilter.value = filter
  // Groups that anchor within a page (Core Rules chapters) put the anchor in the URL so the
  // position is shareable; the others navigate to the page and scroll inside it.
  const target = group.hash ? { path: group.path, hash: '#' + id } : group.path
  const samePage = stripLocale(route.path) === group.path
  if (!samePage || (group.hash && route.hash !== '#' + id)) {
    await router.push(target)
  }
  // scrollToAnchor polls for the element rather than guessing a delay — needed on the Core
  // Rules page, where a chapter that `content-visibility` has skipped isn't laid out yet. On the
  // page already open the jump glides; arriving from another page it lands at once.
  scrollToAnchor(id, 96, { glide: samePage })
}
</script>

<style scoped>
.sidebar {
  display: none;
}

@media (max-width: 900px) {
  .sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0;
    top: 0;
    width: var(--sidebar-width);
    max-width: 85vw;
    height: 100dvh;
    /* Keep the drawer header below the iOS translucent status bar */
    padding-top: var(--safe-top);
    background: var(--bg-secondary);
    border-left: 1px solid var(--border);
    z-index: 300;
    overflow-y: auto;
    transform: translateX(100%);
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: none;
  }

  .sidebar.open {
    transform: translateX(0);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.18);
  }
}

.sidebar-header {
  padding: 0.35rem 0.25rem 0.35rem 1rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-shrink: 0;
}

.sidebar-logo {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 1px;
}

.mobile-close {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}

.mobile-close:hover {
  background: color-mix(in srgb, var(--text-primary) 7%, transparent);
  color: var(--text-primary);
}

.nav-groups {
  padding: 0.5rem 0;
  overflow-y: auto;
}

.nav-section {
  /* The section header is a dark surface (--bg-insert) in both themes, where --border
     (#3a3a40) is invisible in dark mode. Use a light-on-dark divider so the lines show in
     both themes. */
  border-bottom: 1px solid color-mix(in srgb, var(--text-on-dark) 24%, transparent);
}

/* The hierarchy reads from size and weight alone: section headers are small capitals on the
   dark band, pages are ordinary text, anchors smaller and dimmer. Deeper is never louder. */
.nav-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  min-height: 44px;
  padding: 0 1rem;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-on-dark);
  background: var(--bg-insert);
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
}

.nav-section-label {
  min-width: 0;
}

/* The section the reader is in keeps an accent mark while folded, so the map says "you are
   here" before anything is opened. */
.nav-section.current .nav-section-header {
  box-shadow: inset 3px 0 0 var(--accent-on-dark);
}

.nav-section-header:hover,
.nav-section.open .nav-section-header {
  background: color-mix(in srgb, var(--bg-insert) 85%, #fff);
}

.nav-section-header .chevron {
  color: var(--text-on-dark);
}

.nav-section-body {
  overflow: hidden;
}

.nav-group {
  border-top: 1px solid var(--border);
}

.nav-group-label {
  display: flex;
  align-items: stretch;
}

.nav-group-link {
  flex: 1;
  min-width: 0;
  min-height: 44px;
  padding: 0.55rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: color 0.15s, background 0.15s;
  font-family: var(--font-sans);
}

.nav-group-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  flex-shrink: 0;
  background: none;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.nav-group-link:hover,
.nav-group-toggle:hover {
  color: var(--text-primary);
  background: color-mix(in srgb, var(--accent) 7%, transparent);
}

/* The page you are on — and only it. A descendant selector here used to light every link
   under an active group, so a whole open book read as "current" (2026-10-02). */
.nav-group.active > .nav-group-label > .nav-group-link {
  color: var(--text-primary);
  font-weight: 700;
  background: color-mix(in srgb, var(--text-primary) 9%, transparent);
  box-shadow: inset 3px 0 0 var(--accent);
}

.chevron {
  flex-shrink: 0;
  font-size: 0.8rem;
  color: var(--text-dim);
}

.nav-sub {
  list-style: none;
  padding: 0 0 0.4rem 0;
  margin: 0;
}

.nav-sub li {
  margin: 0;
}

.nav-sub-link {
  display: block;
  padding: 0.45rem 1rem 0.45rem 1.75rem;
  font-size: 0.82rem;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
}

.nav-sub-link:hover {
  color: var(--text-primary);
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}
</style>
