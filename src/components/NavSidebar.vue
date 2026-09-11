<template>
  <nav class="sidebar" :class="{ open: mobileOpen }" :aria-label="labels.ariaNavigation">
    <div class="sidebar-header">
      <div class="sidebar-brand">
        <span class="sidebar-logo">WH40K</span>
        <span class="sidebar-subtitle">Core Rules 11th Ed.</span>
      </div>
      <button class="mobile-close" @click="$emit('close')" :aria-label="labels.ariaCloseMenu">✕</button>
    </div>

    <div class="nav-groups">
      <div
        v-for="section in navSections"
        :key="section.key"
        class="nav-section"
        :class="{ open: openSection === section.key }"
      >
        <div class="nav-section-header">
          <button class="nav-section-label" @click="goToSection(section)">{{ section.label }}</button>
          <button
            v-if="!isDirect(section)"
            class="nav-section-toggle"
            @click="toggleSection(section.key)"
            :aria-expanded="openSection === section.key"
            :aria-label="labels.ariaToggleSection"
          >
            <svg class="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <CollapseTransition :show="openSection === section.key && !isDirect(section)">
          <div class="nav-section-body">
            <div
              v-for="item in section.groups"
              :key="item.subsectionKey || groupKey(item) || item.label"
              class="nav-group"
              :class="{ active: item.isSubsection ? isSubsectionActive(item) : isActive(item, section.groups) }"
            >
              <!-- "Rules" section only: a real 3rd accordion level — Core Rules /
                   Event Companion / Combat Patrol, each collapsing its own group list. -->
              <template v-if="item.isSubsection">
                <div class="nav-group-label">
                  <button class="nav-group-link" @click="goToSubsection(item)">{{ item.label }}</button>
                  <button
                    class="nav-group-toggle"
                    :class="{ expanded: expandedSubsection === item.subsectionKey }"
                    @click="toggleSubsection(item)"
                    :aria-expanded="expandedSubsection === item.subsectionKey"
                    :aria-label="labels.ariaToggleSubsections"
                  >
                    <svg class="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>

                <CollapseTransition :show="expandedSubsection === item.subsectionKey">
                  <div class="nav-subgroups">
                    <div
                      v-for="group in item.groups"
                      :key="groupKey(group) || group.label"
                      class="nav-group nav-group--nested"
                      :class="{ active: isActive(group, item.groups) }"
                    >
                      <div class="nav-group-label">
                        <button class="nav-group-link" @click="goToGroup(group)">{{ group.label }}</button>
                        <button
                          v-if="group.sections.length"
                          class="nav-group-toggle"
                          :class="{ expanded: expandedKey === groupKey(group) }"
                          @click="toggleGroupExpand(group)"
                          :aria-expanded="expandedKey === groupKey(group)"
                          :aria-label="labels.ariaToggleSubsections"
                        >
                          <svg class="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                      </div>

                      <CollapseTransition :show="expandedKey === groupKey(group) && group.sections.length > 0">
                        <ul class="nav-sub">
                          <li v-for="sec in group.sections" :key="sec.label">
                            <a href="#" class="nav-sub-link" @click.prevent="handleAnchorClick(group, sec.id, sec.filter)">
                              {{ sec.label.replace(/^\d+\s+/, '') }}
                            </a>
                          </li>
                        </ul>
                      </CollapseTransition>
                    </div>
                  </div>
                </CollapseTransition>
              </template>

              <template v-else>
                <div class="nav-group-label">
                  <button class="nav-group-link" @click="goToGroup(item)">{{ item.label }}</button>
                  <button
                    v-if="item.sections.length"
                    class="nav-group-toggle"
                    :class="{ expanded: expandedKey === groupKey(item) }"
                    @click="toggleGroupExpand(item)"
                    :aria-expanded="expandedKey === groupKey(item)"
                    :aria-label="labels.ariaToggleSubsections"
                  >
                    <svg class="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>

                <CollapseTransition :show="expandedKey === groupKey(item) && item.sections.length > 0">
                  <ul class="nav-sub">
                    <li v-for="sec in item.sections" :key="sec.label">
                      <a href="#" class="nav-sub-link" @click.prevent="handleAnchorClick(item, sec.id, sec.filter)">
                        {{ sec.label.replace(/^\d+\s+/, '') }}
                      </a>
                    </li>
                  </ul>
                </CollapseTransition>
              </template>
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
import { navGroups, navGroupsRu, eventGroups, eventGroupsRu, trackerGroups, trackerGroupsRu, rosterGroups, rosterGroupsRu, factionGroups, factionGroupsRu, combatPatrolGroups, combatPatrolGroupsRu, CORE_PATH, EVENT_PATH } from '../router/index.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useAbilityFilter } from '../composables/useAbilityFilter.js'
import { scrollToAnchor } from '../composables/useRefNavigation.js'
import CollapseTransition from './CollapseTransition.vue'

defineProps({ mobileOpen: Boolean })
const emit = defineEmits(['close'])

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const { activeFilter } = useAbilityFilter()
const labels = computed(() => ui[locale.value])
const localizedGroups = computed(() => locale.value === 'ru' ? navGroupsRu : navGroups)
const localizedEventGroups = computed(() => locale.value === 'ru' ? eventGroupsRu : eventGroups)
const localizedTrackerGroups = computed(() => locale.value === 'ru' ? trackerGroupsRu : trackerGroups)
const localizedRosterGroups = computed(() => locale.value === 'ru' ? rosterGroupsRu : rosterGroups)
const localizedCombatPatrolGroups = computed(() => locale.value === 'ru' ? combatPatrolGroupsRu : combatPatrolGroups)
const COMBAT_PATROL_PATH = '/combat-patrol'

// "Rules" is Core Rules + Event Companion + Combat Patrol, each its own collapsible
// subsection (a 3rd accordion level — see the template's `item.isSubsection` branch)
// over that subsection's own group list.
const localizedRulesGroups = computed(() => {
  const l = labels.value
  return [
    { isSubsection: true, subsectionKey: 'core',          label: l.navCoreRules,      path: CORE_PATH,        groups: localizedGroups.value },
    { isSubsection: true, subsectionKey: 'event',         label: l.navEventCompanion, path: EVENT_PATH,       groups: localizedEventGroups.value },
    { isSubsection: true, subsectionKey: 'combat-patrol', label: l.cpHeading,         path: COMBAT_PATROL_PATH, groups: localizedCombatPatrolGroups.value },
  ]
})
// When a faction is open, the drawer's Factions section also lists that faction's two
// pages (rules — army rule + detachments merged — / datasheets) — the desktop subnav is
// hidden on mobile.
const localizedFactionGroups = computed(() => {
  const base = locale.value === 'ru' ? factionGroupsRu : factionGroups
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
const navSections = computed(() => [
  { key: 'rules',    label: labels.value.navRules,         groups: localizedRulesGroups.value },
  { key: 'factions', label: labels.value.navFactions,      groups: localizedFactionGroups.value },
  { key: 'tracker', label: labels.value.navTracker,        groups: localizedTrackerGroups.value },
  { key: 'roster',   label: labels.value.navRoster,        groups: localizedRosterGroups.value },
])

const currentSection = computed(() => {
  const p = stripLocale(route.path)
  if (p.startsWith('/tracker')) return 'tracker'
  if (p.startsWith('/roster')) return 'roster'
  if (p.startsWith('/factions')) return 'factions'
  // Core Rules, Event Companion, Combat Patrol, /rules itself, and everything else
  // (landing, links, disclaimer, …) all fall under the merged "rules" section.
  return 'rules'
})

// The seven Core Rules groups all share one path and differ only by `hash` (they're
// chapters of the single /core-rules page), so path alone can no longer identify a group.
function groupKey(group) {
  return group.path ? group.path + (group.hash || '') : ''
}

// Which group's subsections are open (one at a time), which "rules" subsection
// (Core Rules / Event Companion / Combat Patrol) is expanded (also one at a time), and
// which top-level section accordion is expanded (also one at a time). All follow the route.
const expandedKey = ref(stripLocale(route.path) + route.hash)
const openSection = ref(currentSection.value)
const expandedSubsection = ref(currentRulesSubsectionKey())

watch(() => route.fullPath, () => {
  expandedKey.value = stripLocale(route.path) + route.hash
  openSection.value = currentSection.value
  expandedSubsection.value = currentRulesSubsectionKey()
})

function currentRulesSubsectionKey() {
  const p = stripLocale(route.path)
  if (p === EVENT_PATH || p.startsWith(EVENT_PATH + '/')) return 'event'
  if (p === COMBAT_PATROL_PATH || p.startsWith(COMBAT_PATROL_PATH + '/')) return 'combat-patrol'
  if (p === CORE_PATH || p.startsWith(CORE_PATH + '/')) return 'core'
  return null
}

function isSubsectionActive(item) {
  return currentRulesSubsectionKey() === item.subsectionKey
}

function isActive(group, groups) {
  if (stripLocale(route.path) !== group.path) return false
  if (!group.hash) return true
  // Landing on a merged page (/core-rules, /event-companion) with no hash means the top of
  // the page = its first chapter. `groups` is the subsection's own group list — find the
  // first entry that shares THIS group's path, not just groups[0].
  const first = groups.find((g) => g.path === group.path)
  return (route.hash || first?.hash) === group.hash
}

function toggleSection(key) {
  openSection.value = openSection.value === key ? null : key
}

// A section with a single page and no sub-anchors (e.g. Links) needs no accordion —
// its header just navigates straight to that page.
function isDirect(section) {
  return section.groups.length === 1 && !section.groups[0].sections.length
}

// Tap a section label → go to that section's main page (its first group/subsection). Tap a
// group label → go to that page. The square chevron buttons handle expand/collapse without navigating.
function goToSection(section) {
  const path = section.groups.find((g) => g.path)?.path
  if (!path) return
  if (stripLocale(route.path) !== path) router.push(path)
  emit('close')
}

// Tap a "rules" subsection label (Core Rules / Event Companion / Combat Patrol) → go to
// its own landing page. The chevron toggles which subsection's group list is expanded.
function goToSubsection(item) {
  if (stripLocale(route.path) !== item.path) router.push(item.path)
  emit('close')
}

function toggleSubsection(item) {
  expandedSubsection.value = expandedSubsection.value === item.subsectionKey ? null : item.subsectionKey
}

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
  if (stripLocale(route.path) !== group.path || (group.hash && route.hash !== '#' + id)) {
    await router.push(target)
  }
  // scrollToAnchor polls for the element rather than guessing a delay — needed on the Core
  // Rules page, where a chapter that `content-visibility` has skipped isn't laid out yet.
  scrollToAnchor(id, 96)
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
  padding: 1rem 1rem 0.9rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-shrink: 0;
}

.sidebar-brand {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-logo {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 2px;
}

.sidebar-subtitle {
  font-size: 0.68rem;
  color: var(--text-dim);
  text-transform: uppercase;
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
     (#3a3a40) is invisible in dark mode. Use the same light-on-dark divider as the other
     in-header separators (e.g. .nav-section-toggle) so the lines show in both themes. */
  border-bottom: 1px solid color-mix(in srgb, var(--text-on-dark) 24%, transparent);
}

.nav-section-header {
  display: flex;
  align-items: stretch;
  min-height: 44px;
  background: var(--bg-insert);
}

.nav-section-label {
  flex: 1;
  min-width: 0;
  padding: 0.5rem 1rem;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-on-dark);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
}

.nav-section-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  flex-shrink: 0;
  background: none;
  border: none;
  border-left: 1px solid color-mix(in srgb, var(--text-on-dark) 18%, transparent);
  color: var(--text-on-dark);
  cursor: pointer;
  transition: background 0.15s;
}

.nav-section-label:hover,
.nav-section-toggle:hover,
.nav-section.open .nav-section-header {
  background: color-mix(in srgb, var(--bg-insert) 85%, #fff);
}

.nav-section-toggle .chevron {
  color: var(--text-on-dark);
}

.nav-section.open .nav-section-toggle .chevron {
  transform: rotate(180deg);
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

/* The "rules" subsection's own group list (3rd accordion level) — indented one step
   in from its subsection header. The guide line is drawn per-row (not once on this
   container) so it isn't at the mercy of CollapseTransition's animated grid-row height
   — stacked rows have no gap, so the per-row segments still read as one continuous line. */
.nav-subgroups {
  margin-left: 1rem;
}

.nav-group--nested {
  padding-left: 0.6rem;
  border-left: 1px solid var(--border);
}

.nav-group--nested .nav-group-link {
  font-size: 0.85rem;
}

.nav-group-link {
  flex: 1;
  min-width: 0;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
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
  border-left: 1px solid var(--border);
  color: var(--text-dim);
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.nav-group-link:hover,
.nav-group-toggle:hover {
  color: var(--text-primary);
  background: color-mix(in srgb, var(--accent) 7%, transparent);
}

.nav-group.active .nav-group-link {
  color: var(--text-primary);
  font-weight: 700;
  background: color-mix(in srgb, var(--text-primary) 9%, transparent);
  box-shadow: inset 3px 0 0 var(--text-muted);
}

.chevron {
  flex-shrink: 0;
  color: var(--text-dim);
  transition: transform 0.22s ease;
}

.nav-group-toggle.expanded .chevron {
  transform: rotate(180deg);
}

.nav-sub {
  list-style: none;
  padding: 0 0 0.5rem 0;
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
