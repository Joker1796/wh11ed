import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import { pageSwapGap } from '../composables/usePageMotion.js'
import { instantly } from '../composables/useRefNavigation.js'
import { prefetchFor } from './prefetch.js'
import LandingView from '../views/LandingView.vue'
import { isStandaloneDisplay } from '../composables/standalone.js'
import { LOCALE_SEGMENT, localePath, stripLocale } from './locale.js'
import { CORE_PATH, CORE_CHAPTER_ANCHORS, EVENT_PATH, EVENT_CHAPTER_ANCHORS, LAST_ROUTE_KEY, SKIP_RESTORE } from './nav.js'

// The nav tables and path constants live in nav.js; re-exported for the tests and anyone reading
// the router as the map of the site. The app itself imports them from nav.js — see there why.
export * from './nav.js'
import { locale as activeLocale, readStoredLocale, setLocale } from '../composables/useLocale.js'

// Route views are lazy-loaded so each page (and its data file) ships in its own
// chunk, keeping the initial bundle small. LandingView (the project landing at "/")
// stays eager.
const CoreRulesView     = () => import('../views/CoreRulesView.vue')
const EventCompanionView = () => import('../views/EventCompanionView.vue')
const TrackerHomeView   = () => import('../views/tracker/TrackerHomeView.vue')
const TrackerGameView   = () => import('../views/tracker/TrackerGameView.vue')
const PartyJoinView     = () => import('../views/tracker/PartyJoinView.vue')
const AuthCallbackView  = () => import('../views/tracker/AuthCallbackView.vue')
const TrackerHistoryView = () => import('../views/tracker/TrackerHistoryView.vue')
const TrackerStatsView  = () => import('../views/tracker/TrackerStatsView.vue')
// The list and a saved roster's page are one screen on a wide window (RosterDeskView), and the
// same two pages as before on a phone.
const RosterDeskView    = () => import('../views/tracker/RosterDeskView.vue')
const RosterCreateView  = () => import('../views/tracker/RosterCreateView.vue')
const RosterViewView    = () => import('../views/tracker/RosterViewView.vue')
const RosterEditorView  = () => import('../views/tracker/RosterEditorView.vue')
const RosterPrintView   = () => import('../views/tracker/RosterPrintView.vue')
const RosterSharedView  = () => import('../views/tracker/RosterSharedView.vue')
const LinksView         = () => import('../views/LinksView.vue')
const SupportView       = () => import('../views/SupportView.vue')
const BroadcastOverlayView = () => import('../views/BroadcastOverlayView.vue')
const DisclaimerView    = () => import('../views/DisclaimerView.vue')
const HelpView          = () => import('../views/HelpView.vue')
const HelpTopicView     = () => import('../views/HelpTopicView.vue')
const ChangelogView     = () => import('../views/ChangelogView.vue')
const StratagemsView    = () => import('../views/StratagemsView.vue')
const FactionsListView  = () => import('../views/FactionsListView.vue')
const FactionPagesView  = () => import('../views/faction/FactionPagesView.vue')
const FactionRuleView        = () => import('../views/faction/FactionRuleView.vue')
const FactionDatasheetsView  = () => import('../views/faction/FactionDatasheetsView.vue')
const FactionDatasheetView   = () => import('../views/faction/FactionDatasheetView.vue')
const FactionFaqView         = () => import('../views/faction/FactionFaqView.vue')
const RulesLandingView  = () => import('../views/RulesLandingView.vue')
const CombatPatrolIndexView  = () => import('../views/combat-patrol/CombatPatrolIndexView.vue')
const CombatPatrolFactionView = () => import('../views/combat-patrol/CombatPatrolFactionView.vue')
const NotFoundView      = () => import('../views/NotFoundView.vue')

// The Links page (/links, external source PDFs) is deliberately NOT in the navbar or
// the drawer — it's reachable only from its card on the landing page (src/data/landing.js).

// `meta.section` groups routes for App.vue's nav-highlight/subnav predicates (isCoreRoute,
// isEventRoute, …) — one flag read off the matched route instead of a `path.startsWith()` guess
// repeated at every call site. Routes with no bearing on that nav chrome (landing, disclaimer,
// changelog, tracker sub-pages, 404) carry no section.
// Every public route exists twice: bare (EN) and under `/ru` — but as ONE record, via the
// optional `LOCALE_SEGMENT` prefix. Duplicating the table would guarantee a drift the first time
// somebody adds a page and updates only one copy.
//
// `redirect`/`beforeEnter` need help, though: they were written to return bare paths, and a
// Russian visitor following one must stay Russian. `withLocale` re-applies the prefix to whatever
// they return, so each of them stays written in one language and none has to know about locales.
function reprefix(result, to) {
  const loc = to?.params?.lang === 'ru' ? 'ru' : 'en'
  if (typeof result === 'string') return localePath(result, loc)
  if (result && typeof result === 'object' && typeof result.path === 'string') {
    return { ...result, path: localePath(result.path, loc) }
  }
  return result // `true`, undefined, a named target — nothing to prefix
}

function withLocale(route) {
  const out = { ...route, path: LOCALE_SEGMENT + (route.path === '/' ? '' : route.path) }
  if (route.redirect) {
    const r = route.redirect
    out.redirect = (to) => reprefix(typeof r === 'function' ? r(to) : r, to)
  }
  if (route.beforeEnter) {
    const b = route.beforeEnter
    out.beforeEnter = (to, from) => reprefix(b(to, from), to)
  }
  return out
}

const localeRoutes = [
    { path: '/',               component: LandingView, meta: { section: 'landing' } },
    { path: CORE_PATH, component: CoreRulesView, meta: { section: 'core' } },
    // The seven former chapter routes. They stay valid forever — old bookmarks, shared
    // links and the stale SEO keys still in the bucket all land on the right chapter.
    ...Object.entries(CORE_CHAPTER_ANCHORS).map(([path, anchor]) => ({
      path,
      redirect: { path: CORE_PATH, hash: '#' + anchor },
    })),
    { path: EVENT_PATH, component: EventCompanionView, meta: { section: 'event' } },
    // The six former chapter routes. They stay valid forever — old bookmarks, shared
    // links and the stale SEO keys still in the bucket all land on the right chapter.
    ...Object.entries(EVENT_CHAPTER_ANCHORS).map(([path, anchor]) => ({
      path,
      redirect: { path: EVENT_PATH, hash: '#' + anchor },
    })),
    { path: '/tracker',      component: TrackerHomeView, meta: { section: 'tracker' } },
    { path: '/tracker/game', component: TrackerGameView, meta: { section: 'tracker' } },
    // Joining a shared game (useParty.js): the invite link carries its token; the code is typed.
    { path: '/tracker/join/:invite?', component: PartyJoinView, meta: { section: 'tracker' } },
    // Roster builder rides with the Tracker section (subnav + nav highlight) — public list
    // (/roster, indexable) + private creation wizard, read-only view and editor (/roster/new,
    // /roster/:id/view, /roster/:id — none in STATIC_ROUTES, like /tracker/game). Static
    // /roster/new and /roster/shared must precede the :id route so neither is captured as an id.
    { path: '/roster',        component: RosterDeskView, meta: { section: 'roster' } },
    { path: '/roster/new',    component: RosterCreateView, meta: { section: 'roster' } },
    { path: '/roster/shared', component: RosterSharedView, meta: { section: 'roster' } },
    { path: '/roster/:id/view', component: RosterDeskView, meta: { section: 'roster' } },
    // The same list as a document, with the panel that decides what goes on the paper.
    // Private like the rest of them: a print of somebody's army list has no business in
    // STATIC_ROUTES or in the sitemap.
    { path: '/roster/:id/print', component: RosterPrintView, meta: { section: 'roster' } },
    // The catalogue used to live here, as a page of its own. It is now a pane of the editor's
    // Units tab — the redirect is for the links that outlive the route: a stored last route (the
    // PWA resumes into one), a phone's back stack, a bookmark.
    { path: '/roster/:id/add', redirect: (to) => `/roster/${to.params.id}` },
    { path: '/roster/:id',    component: RosterEditorView, meta: { section: 'roster' } },
    // The army list attached to a player of the CURRENT game (:pi = 0|1; :mi = doubles member
    // 0|1, absent in singles). Same view as /roster/:id/view, reading the game's own snapshot
    // instead of the saved-roster store — see rosterGameLink.js. Private, like /tracker/game:
    // not in STATIC_ROUTES, not in the sitemap.
    { path: '/tracker/game/roster/:pi/:mi?', component: RosterViewView, meta: { section: 'tracker' } },
    { path: '/tracker/history/:id', component: TrackerHistoryView, meta: { section: 'tracker' } },
    // Your battle record, read out of the same history. Private like /tracker/game: it is a view
    // of this device's games, so it is neither in STATIC_ROUTES nor in the sitemap.
    { path: '/tracker/stats', component: TrackerStatsView, meta: { section: 'tracker' } },
    // The same list, read out of a FINISHED game — the snapshot is what makes that possible at all.
    { path: '/tracker/history/:gid/roster/:pi/:mi?', component: RosterViewView, meta: { section: 'tracker' } },
    { path: '/tracker/auth-callback', component: AuthCallbackView, meta: { section: 'tracker' } },
    // The live-broadcast overlay an OBS Browser Source opens. `bare` strips the app chrome
    // (App.vue); private like /tracker/game — not in STATIC_ROUTES, auto non-indexable.
    { path: '/broadcast/:token', component: BroadcastOverlayView, meta: { section: 'tracker', bare: true } },
    { path: '/links', component: LinksView, meta: { section: 'links' } },
    { path: '/disclaimer', component: DisclaimerView },
    { path: '/support', component: SupportView },
    // The guide was one page with six anchors until 2026-08-25. Links written against it — ours,
    // and anyone's bookmark — arrive as /help#help-tracker; send those to the page that section
    // became. An unknown topic bounces back to the contents from HelpTopicView itself.
    {
      path: '/help',
      component: HelpView,
      beforeEnter: (to) => (/^#help-[a-z-]+$/.test(to.hash) ? `/help/${to.hash.slice(6)}` : true),
    },
    { path: '/help/:topic', component: HelpTopicView },
    { path: '/changelog', component: ChangelogView },
    { path: '/factions',       component: FactionsListView, meta: { section: 'faction' } },
    // A faction's three pages are CHILDREN of one route: the hero and its tabs (FactionPagesView →
    // FactionLayout) stay mounted while the page under them changes, so a tab switch moves only
    // the content. App.vue keys its page swap by the parent record + slug for that (`pageKey`).
    // `meta.prefetch` names what router/prefetch.js loads before the page is shown.
    {
      path: '/factions/:slug',
      component: FactionPagesView,
      meta: { section: 'faction' },
      children: [
        { path: '', component: FactionRuleView, meta: { prefetch: 'faction' } },
        { path: 'datasheets', component: FactionDatasheetsView, meta: { prefetch: 'factionDatasheets' } },
        { path: 'faq', component: FactionFaqView, meta: { prefetch: 'factionFaq' } },
      ],
    },
    // Merged into /factions/:slug — redirect old bookmarks/links to the combined page.
    { path: '/factions/:slug/detachments', redirect: (to) => `/factions/${to.params.slug}` },
    // One unit's sheet is a page of its own (hero-less), a level deeper than the list.
    { path: '/factions/:slug/datasheets/:unit', component: FactionDatasheetView, meta: { section: 'faction', prefetch: 'factionUnit' } },
    // "Rules" umbrella landing (Core Rules / Event Companion / Combat Patrol summary cards).
    { path: '/rules', component: RulesLandingView, meta: { section: 'rules-landing' } },
    // Combat Patrol.
    { path: '/combat-patrol',       component: CombatPatrolIndexView, meta: { section: 'combat-patrol' } },
    { path: '/combat-patrol/:slug', component: CombatPatrolFactionView, meta: { section: 'combat-patrol' } },
    // Game-time stratagem reference. Reachable only via the mobile bottom-nav (and direct
    // URL on desktop) — intentionally not in navGroups / NavSidebar / the top navbar.
    { path: '/stratagems', component: StratagemsView, meta: { section: 'stratagems' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...localeRoutes.map(withLocale),
    // Catch-all 404. The bucket's ErrorDocument serves index.html (HTTP 404) for any
    // unknown path, so the SPA must render its own not-found page (with noindex). It is
    // deliberately NOT locale-prefixed: one catch-all already swallows `/ru/nonsense`
    // (checked against the matcher), and NotFoundView's noindex is what matters there.
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
  // Every `hash` in the app targets /core-rules or /event-companion, and both already
  // self-handle scrolling via the robust, polling `scrollToAnchor()` (onMounted + a
  // route.hash watcher in CoreRulesView.vue/EventCompanionView.vue) — it retries for up to
  // 1.5s and re-corrects after 400ms, which `content-visibility: auto` chapters need since
  // their layout isn't settled right after navigation. Vue Router's own single-shot `el`
  // scroll would run concurrently with that and can win the race with a stale position
  // (landing on the wrong section) before the page has finished laying out. Leave hash
  // scrolling to scrollToAnchor entirely.
  scrollBehavior(to, from, savedPosition) {
    // Switching language is not "going somewhere" — it is the same page in the other language,
    // so the reader must keep their place. `false` means "don't touch the scroll position".
    if (stripLocale(to.path) === stripLocale(from.path) && to.path !== from.path) return false
    // Landing back on the location we are already on is not going anywhere either. A dialog
    // pushes a copy of the current history entry (useBackToClose.js) so that Back closes it;
    // popping that copy arrives here as a navigation whose position the router never saved —
    // `savedPosition` is null and the page would jump to the top, which is what a reader
    // scrolled halfway down the tracker sees when they close a picker (report 1173ea18).
    if (to.fullPath === from.fullPath) return false
    const pos = savedPosition || { top: 0 }
    // A swap that animates (another page, not the first load) keeps the reader where they are
    // until the old page has gone, then jumps — instantly, while nothing is on screen. Reset at
    // the click, with <html>'s smooth scrolling, the old page scrolled up for half a second while
    // it slid away (2026-09-28). `instantly` and not `behavior: 'instant'`: Safari before 17.4
    // ignores the option and animates anyway (useRefNavigation.js).
    if (!from.matched?.length || stripLocale(to.path) === stripLocale(from.path)) return pos
    return pageSwapGap().then(() => {
      instantly(() => window.scrollTo(pos.left || 0, pos.top || 0))
      return false
    })
  },
})

// A page's data is fetched while the old page is still up, so the new one arrives drawn
// (router/prefetch.js; best effort, capped, never a reason not to navigate).
router.beforeResolve((to) => prefetchFor(to))

// Remember the last open page+section and reopen it on the next launch — only for the
// installed PWA (display-mode standalone); a normal browser tab is left untouched.
// The stored value is `path` or `path#section-anchor`. PERSISTENCE lives in
// useViewRestore.js (it needs a scroll-spy for the in-view section); the router only
// owns the one-time RESTORE below, which must run before the first view mounts so the
// app never flashes home first.

if (isStandaloneDisplay()) {
  // One-time restore on the very first navigation, only if we landed on home (no deep link).
  let restored = false
  router.beforeEach((to) => {
    if (restored) return
    restored = true
    // `stripLocale`, not `!== '/'`: with RU on a path prefix, "we landed on home" is `/` OR `/ru`,
    // and comparing raw would silently switch the restore off for every Russian reader.
    if (stripLocale(to.path) !== '/') return
    let saved = null
    try { saved = localStorage.getItem(LAST_ROUTE_KEY) } catch { /* ignore */ }
    if (!saved || saved === to.fullPath) return
    const resolved = router.resolve(saved)
    // meta.bare (the broadcast overlay) is a capture surface, not a place to resume reading.
    if (resolved.matched.length && !SKIP_RESTORE.has(stripLocale(resolved.path)) && !resolved.meta?.bare) return saved
  })
}

// --- Locale guards -------------------------------------------------------------------------
// Registered AFTER the restore guard on purpose, so the restore still sees the pristine first
// navigation; whatever it returns comes back through here and gets its prefix.

// 1) Old links keep working forever. `?lang=ru` was the RU address for the site's whole life —
//    it is in bookmarks, in chat logs and in the sitemap Yandex already crawled. Send it to the
//    new address, keeping every other query param and the anchor, and replace rather than push so
//    the back button doesn't land the reader right back on the old URL.
router.beforeEach((to) => {
  const lang = to.query.lang
  if (lang !== 'ru' && lang !== 'en') return
  const { lang: _dropped, ...query } = to.query
  return { path: localePath(to.path, lang), query, hash: to.hash, replace: true }
})

// 2) A reader who chose Russian gets Russian, even from a bare link — which is also what makes
//    the app's ~170 existing `to="/rules"` links keep working untouched: they arrive here bare
//    and leave prefixed. This is the job `?lang=ru` used to do; the difference is that now the
//    language shows in the address. It runs before the first render, so nothing paints in English
//    and then flips.
//    Crawlers have no stored preference and are unaffected — they get exactly the URL they asked
//    for, which is the entire point of the two of them existing.
//    The explicit EN toggle is not fought here: it persists 'en' BEFORE navigating, so by the
//    time this runs the preference already says English.
//    `replace: true` only on the very first navigation (a bare address typed or opened from
//    outside), so Back does not return to the English twin of the page. Never on the ones that
//    follow: the redirect's `replace` overrides the caller's, so a `true` here made EVERY tap on a
//    bare in-app link overwrite the one history entry the installed app had, and the phone's Back
//    gesture — nothing left to go back to — closed the app instead of going back a page. Leaving
//    the key out keeps whatever the caller asked for (push or replace).
router.beforeEach((to, from) => {
  if (to.params.lang === 'ru') return
  if (readStoredLocale() !== 'ru') return
  const target = localePath(to.path, 'ru')
  if (target === to.path) return
  if (!router.resolve(target).matched.some((r) => r.name !== 'not-found')) return
  return { path: target, query: to.query, hash: to.hash, ...(from === START_LOCATION && { replace: true }) }
})

// 3) The address is the source of truth for the language on screen. Landing on a Russian URL also
//    makes Russian the preference — otherwise someone who followed a shared `/ru/...` link would
//    be thrown back to English by their first internal click. The reverse is deliberately NOT
//    true: only the toggle in the navbar ever sets the preference back to English, so browsing an
//    English page can't quietly undo a choice the reader made.
router.beforeEach((to) => {
  if (to.params.lang === 'ru') setLocale('ru')
  else activeLocale.value = 'en'
})
