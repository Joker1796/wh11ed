# Деплой

Сайт хостится в бакете **Yandex Object Storage** (домен `wh-rules.ru`), перед
бакетом стоит **Yandex CDN**. Выкладка — скриптом `deploy.sh` (`npm run deploy`),
который собирает проект и заливает `dist/` с правильными заголовками
`Cache-Control`.

> **Цель деплоя ровно одна — `wh-rules.ru`.** Старый `wh11ed.ru` **заморожен** на
> последней выложенной сборке (v2.2.6, с баннером «переезжаем») и больше не
> обновляется: релизы туда не катим, `deploy-both.sh` удалён. С 26 августа 2026 года
> старый бакет отдаёт 301 сюда. Конфиг `.env.deploy.wh11ed` оставлен только как
> аварийный откат (`ENVFILE=.env.deploy.wh11ed BUMP=none npm run deploy`).

## Политика кэширования

Тиры `Cache-Control`, которые расставляет `deploy.sh`:

- `assets/*` (content-hashed, incl. `workbox-*.js`) → `public, max-age=31536000, immutable`. **Uploaded without `--delete`**: the previous builds' chunks stay, because a tab or installed app opened before the deploy loads its route chunks by their OLD names the first time the reader goes there — deleting them made that click a 404 and the navigation silently did nothing (a player, 2026-09-27: «кнопки в верхнем меню не нажимаются», cured only by clearing site data). Step 1b prunes chunks older than `ASSET_KEEP_DAYS` (30) that this build does not ship. Anything older is caught in the client by `src/composables/staleChunks.js` (a failed chunk → look for an update → one reload into the page asked for). **Don't put `--delete` back.**
- images / favicon / PWA icons / `og-image.png` (stable names) → `public, max-age=2592000` (30 days). A year until 2026-09-12; what actually pins a stale illustration is the service worker's CacheFirst `/images/` route, which never revalidates whatever we send, and that is now guarded by `npm run imghash`. The shorter TTL only bounds the damage for a reader *without* a service worker if the gate is ever bypassed — a repeat visitor pays nothing for it either way
- `offline-manifest.json` / `image-manifest.json` → `no-cache`: they DESCRIBE a set that every deploy renames, so a cached copy sends the warm-up after files that no longer exist
- `sw.js` / `registerSW.js` / `manifest.webmanifest` → `no-cache` (**must** revalidate, or PWA updates never reach clients)
- `robots.txt` / `sitemap.xml` → `public, max-age=3600` (1 h — excluded from the 1-year tier so crawlers pick up changes; a stale sitemap would otherwise be served for a year; `sitemap.xml` is **generated** into `dist/` by `scripts/gen-seo-routes.mjs`, there is no static copy in `public/`)
- `index.html` → `no-cache` (revalidated on every load, a 304 when unchanged; it was 1 hour until 2026-09-27, which let a browser without a service worker open the old build for up to an hour after a deploy) — uploaded via `aws s3 cp`, **not** `sync` (sync silently skips it: stable name + constant size defeats its size/mtime check, leaving a stale entry point that points at pruned assets). Don't change it back to `sync`.
- **SEO route keys** (step 3b) — an `index.html` copy under every path from `dist/.seo-routes.txt` (`no-cache` like `index.html`, forced `text/html`), so deep links return 200 (см. `CLAUDE.md` → Architecture). These keys exist only in the bucket, not in `dist/` — step 2 derives `--exclude`s for their top-level segments so its `--delete` never removes them. Removed routes leave stale keys; harmless (SPA shows its noindex 404).

> ⚠️ `index.html` заливается через `aws s3 cp`, **не** `s3 sync`. У него стабильное
> имя и почти неизменный размер, поэтому эвристика `sync` (размер/mtime) молча
> пропускает его — и входная точка остаётся старой, ссылаясь на хэшированные
> `assets/*`, которые чистка (шаг 1b) со временем удалит → сайт ломается.
> Не переписывай шаг 3 обратно на `sync` (так же, как `sw.js`/`manifest` идут через `cp`).

> ⚠️ Картинки в `/images/` и favicon кэшируются 30 дней, но настоящий замок — не
> заголовок, а CacheFirst-маршрут сервис-воркера, который их вообще не перепроверяет.
> Поэтому если меняешь картинку —
> **меняй имя файла** (или делай purge CDN + учитывай, что браузерный кэш у
> вернувшихся посетителей всё равно живёт до года). Хэшированные `assets/*` от
> этого защищены by design.

## Разовая настройка

1. Создать сервисный аккаунт с ролью `storage.editor` и **статический ключ
   доступа** (key id + secret).
2. Настроить S3-совместимый профиль AWS CLI:
   ```bash
   aws configure --profile yc
   # Access Key Id / Secret — из статического ключа
   # регион: ru-central1
   ```
   Эндпоинт Object Storage: `https://storage.yandexcloud.net`.
3. (Опц.) Поставить `yc` CLI для автоматического purge CDN.
4. Скопировать `.env.deploy.example` → `.env.deploy` (gitignore) и вписать
   `CDN_RESOURCE_ID`. Там же живут `BUCKET`, `VITE_SITE_ORIGIN` и
   `VITE_API_BASE_URL` — один файл задаёт и куда льём, и что вшито в сборку.

## Настройка CDN-ресурса (в консоли, один раз)

CDN-ресурс `wh-rules.ru` → **Кэширование**:

- Включить кэширование, режим — **«согласно заголовкам origin»** (honor
  `Cache-Control`), чтобы CDN уважал заголовки из бакета.
- **Не** включать «игнорировать Cache-Control».
- Если опции honor-origin нет — задать дефолтный TTL ~`600s`; ассеты всё равно
  версионируются именами, а свежесть `index.html` обеспечивает purge при деплое.
- Origin должен смотреть на **website-эндпоинт** бакета
  (`wh-rules.ru.website.yandexcloud.net`), иначе корень `/` отдаёт 403 — S3 API не
  знает про index-document.

## Выкладка

```bash
# минимум — всё берётся из .env.deploy
npm run deploy

# с явными параметрами
BUCKET=s3://wh-rules.ru \
CDN_RESOURCE_ID=<cdn-resource-id> \
AWS_PROFILE=yc \
npm run deploy
```

### Версия (`BUMP`)

`deploy.sh` по умолчанию делает `BUMP=patch` — `npm run deploy` **сам поднимает**
`package.json` (1.2.0 → 1.2.1) перед сборкой. Варианты:

- `BUMP=minor` / `BUMP=major` — поднять соответствующий сегмент;
- `BUMP=none npm run deploy` — выложить **текущую** версию как есть (когда номер уже
  выставлен в коммите/`package.json` и автобамп не нужен).

Катить надо **с релизной ветки `release/X.Y.Z`** и с чистым рабочим деревом (ветки и порядок
сборки релиза — `CONTRIBUTING.md`). Деплой откажется, если бамп даст не ту версию, что в имени
ветки. **После** успешного деплоя бамп коммитится (`chore: release vX.Y.Z`) и пушится в релизную
ветку, затем `main` перематывается на неё (`--ff-only`) и тоже пушится. Если `main` за это время
ушёл вперёд и перемотка невозможна, деплой это скажет: тогда слить релиз в `main` руками.

### Сброс кэша CDN

ID prod-ресурса CDN (cname `wh-rules.ru`) храните в `.env.deploy` (gitignore) —
скопируйте `.env.deploy.example` → `.env.deploy` и впишите `CDN_RESOURCE_ID`.

`deploy.sh` подхватывает `.env.deploy` и сам делает `yc cdn cache purge … --path "/*"`.
Если `CDN_RESOURCE_ID` пуст — purge пропускается; почистить кэш вручную:

```bash
yc cdn cache purge --resource-id <cdn-resource-id> --path '/*'
```

Без purge новая сборка пользователям не долетит (CDN отдаёт старый `index.html`).

## Проверка после деплоя

```bash
curl -sI https://wh-rules.ru/ | grep -i cache-control
#   → cache-control: no-cache

curl -sI https://wh-rules.ru/assets/<хэш>.js | grep -i cache-control
#   → cache-control: public, max-age=31536000, immutable
```

Убедиться, что живой `index.html` ссылается на ассеты из **текущей** сборки
(ловит баг «sync пропустил index.html» и битый origin):

```bash
# хэш в live index.html (после purge) должен совпасть с локальным dist/
curl -s https://wh-rules.ru/ | grep -oE 'assets/index-[A-Za-z0-9_-]+\.js' | head -1
grep -oE 'assets/index-[A-Za-z0-9_-]+\.js' dist/index.html | head -1
```

Проверить, что канонический домен новый (иначе поисковики уводит на замороженный):

```bash
curl -s https://wh-rules.ru/sitemap.xml | head -3      # → https://wh-rules.ru/...
curl -s https://wh-rules.ru/robots.txt | grep -i sitemap
```

> Уже выданные клиентам ответы с прежним годовым TTL ретроактивно не сбросить —
> только истечение TTL или hard-reload. Purge CDN и новые заголовки действуют на
> новые заходы.

## Что делает `deploy.sh` кроме загрузки

`deploy.sh` **auto-bumps `package.json` (`BUMP=patch` by default)** before building — use `BUMP=none npm run deploy` to ship the current version as-is, or `BUMP=minor`/`major`. When it bumps (`BUMP` ≠ `none`), it also **commits + pushes** the bump (`chore: release vX.Y.Z`) to the release branch once the deploy succeeds, then fast-forwards `main` to it and pushes `main` — so deploy from `release/X.Y.Z` with a clean tree (uncommitted changes outside `package.json`/`package-lock.json`, another branch, or a bump that would not land on the version in the branch name aborts the deploy before it builds anything). See `CONTRIBUTING.md` for the branch flow.

**One target only.** The retired `wh11ed.ru` is frozen on its last build (v2.2.6, with the move banner) and is never redeployed — `deploy-both.sh` is gone, `.env.deploy` (bucket + CDN + `VITE_SITE_ORIGIN` + `VITE_API_BASE_URL`) is the single working config, and `.env.deploy.wh11ed` survives only as a rollback escape hatch (`ENVFILE=.env.deploy.wh11ed BUMP=none npm run deploy`). Don't reintroduce a two-domain release.

Uploads via the S3-compatible API (endpoint `storage.yandexcloud.net`, AWS CLI profile `yc`). **The CDN purge now runs automatically** at the end of `deploy.sh`: `CDN_RESOURCE_ID` is read from the gitignored `.env.deploy` (copy `.env.deploy.example`) and `yc` is resolved even off-PATH (`~/yandex-cloud/bin/yc`); a purge failure warns instead of aborting (upload is already done). Override with another id, or run `CDN_RESOURCE_ID= npm run deploy` to skip. Manual fallback: `yc cdn cache purge --resource-id <cdn-resource-id> --path '/*'`. The CDN resource must cache **according to origin headers** (honor-origin) or it overrides per-file `Cache-Control` with a single TTL. Because images live under stable names, **rename a file when you change an image** (or the browser keeps the old one).

## PWA

The site is an installable PWA via **`vite-plugin-pwa`** (Workbox `generateSW`), configured in `vite.config.js`. `base` is `'/'` (root-hosted) so the service worker controls scope `/`.

> **🔒 Product requirement — light web/tab, full offline for anyone who asks.** A casual visitor in
> a **browser tab** must get a light, responsive site. The service worker precaches **the shell and
> nothing else — 17 entries, ~0.9 MB**: the entry chunk, what it statically imports, its CSS, the
> HTML the navigate fallback serves and the icons. Everything else — every route component, all
> thirty factions' data chunks, the font subsets, the ~21 MB of images — is **runtime-cached as it
> is opened** (`workbox.runtimeCaching`, CacheFirst: `wh-rules-assets` for `/assets/`,
> `wh11ed-images` for `/images/`).
>
> **This was false until 2026-09-12**, and the comment in `vite.config.js` said it anyway while
> `globPatterns` swept in every chunk: a tab installed a **15.5 MB** precache to show one rule.
> That size was also why an update felt slow — a new service worker only takes over once its
> install FINISHES, and install means re-fetching everything whose hash moved, which for a commit
> touching the templates is all of it. Both complaints had one cause.
>
> The shell is computed, not pattern-matched: `offlineShell()` in `vite.config.js` walks the static
> import graph out of the entry chunk and `workbox.manifestTransforms` keeps exactly that. A glob
> like "everything except `assets/data/**`" would have to be kept true by hand; this asks the
> bundler what it actually linked and cannot go stale.
>
> The full download is **opt-in and explicit**: the ⚙ menu's "Download for offline" (with the size
> on the button), and automatically on the installed app's first online launch. Do **not** widen
> the precache to "fix" a missing chunk offline — that is the thing this split exists to prevent.

- **Manifest** is defined inline in the `VitePWA({ manifest })` config; the plugin emits `dist/manifest.webmanifest` and injects the `<link>` into `index.html`. It carries `id: '/'`, app `shortcuts` (Game Tracker, Missions — clean history-mode paths, e.g. `/tracker`) and `screenshots` (wide + narrow, for the richer Chrome/Android install dialog). iOS-only tags (`apple-touch-icon`, `apple-mobile-web-app-*`, `theme-color`, and the `apple-touch-startup-image` launch-screen links) are hand-written in `index.html`.
- **Icons** (`public/pwa-192.png`, `pwa-512.png`, `maskable-512.png`, `apple-touch-icon.png`) **and `favicon.svg`** are generated from the "W" mark by `scripts/gen-pwa-icons.mjs` (`npm run icons`, uses `sharp`). The "W" (and the WH RULES wordmark on the screenshots) is drawn in the **display font Sofia Sans Extra Condensed 800** — the same `var(--font-display)` as the headings. Since `sharp`/librsvg can't resolve the `@fontsource` woff by family name, `scripts/lib/w-mark.mjs` extracts the glyph **outlines** with `opentype.js` (a devDep) and emits a plain `<path>`, so the output is font-independent and reproducible from `node_modules` (no system-font install). Compose glyph-by-glyph via `charToGlyph` — `font.getPath(string)` throws on this font's `ccmp` GSUB lookup. The install-dialog **screenshots** (`public/screenshot-{wide,narrow}.png`, `npm run screenshots`) and **iOS launch screens** (`public/splash/apple-splash-*.png`, `npm run splash`) use the same helper (branded `#242428` + "W", not real UI captures — swap for real ones later if desired). The splash `<link>` media queries in `index.html` must stay in sync with the device list in `scripts/gen-ios-splash.mjs`.
- **Install affordance:** Chromium fires `beforeinstallprompt` → a custom "Install app" item in the settings menu calls the native prompt (`useInstallPrompt.js`). iOS has no such event, so on iOS Safari (detected in `useInstallPrompt.js`, excludes in-app/non-Safari browsers and standalone) the same menu item opens `InstallHintModal.vue` with the "Add to Home Screen" steps (EN/RU in `i18n/ui.js`).
- **Release notes archive** (2026-09-27): `src/data/changelog.js` keeps only the newest `CHANGELOG_KEEP` (5) entries; older ones live in wh11ed-api's `changelog` table (`GET /changelog?before=&limit=`, public) and the "What's new" page fetches them on request (`useChangelogArchive.js`: offline and API-down states say so, with a retry). Notes almost nobody reads stay out of the first load and the installed app's offline download (owner's call). `deploy.sh` step 0b moves them: `scripts/changelog-rollover.mjs` publishes the older entries through `npm run changelog:publish` in a sibling `wh11ed-api` checkout (validates, upserts, reads back, compares), and only on success cuts them from the file, re-imports it and checks it holds exactly the kept entries (else restores it). Any failure keeps the file whole and the deploy goes on. Needs `CHANGELOG_YDB_ENDPOINT` / `CHANGELOG_YDB_DATABASE` in `.env.deploy` and a `yc` IAM token; the cut file is committed with the version bump. To fix an entry already archived, publish the corrected entry the same way (it upserts by version).
- **Chunk layout — a release renames two files, not eighty** (2026-09-27): the entry (`index-*.js`, ~13 KB) holds only `main.js` and the router, whose lazy `import()`s name every page; `app-*.js` holds everything else the entry reaches statically; `vendor-*.js` holds Vue. Nothing imports the entry, so a changed page renames itself and the entry, and nothing else. Before, the shared code sat in the entry and every page imported it back: a release (the changelog changes every time) renamed ~80 chunks, and the installed app re-downloaded them all after each deploy — on a bad mobile connection, a long wait for nothing. The versions come from two `<meta>` tags in `index.html` (`src/buildInfo.js`) for the same reason, and the chrome imports its route constants from `src/router/nav.js`, never from `router/index.js`. `npm run chunks` (part of `npm run build`) checks all of it on the built files. Expect every page to be renamed when the SHARED code changes (`ui.js`, a common component) — that is real change, not a leak.
- **What is precached, and what is not:** `globPatterns` still casts wide; `manifestTransforms` is what narrows it to the shell set `offlineShell()` computed, plus the root files that are not chunks (`index.html`, the webmanifest, the icons). Two CacheFirst `runtimeCaching` routes take everything else: **`wh-rules-assets`** for `/assets/` (content-hashed names, so a name in the cache can never be stale; `maxEntries: 1200` is what bounds growth as deploys rename chunks) and **`wh11ed-images`** for `/images/` (stable names — see the rename rule below). Fonts (Inter, EB Garamond) and bootstrap-icons are **self-hosted** via `@fontsource` + the `bootstrap-icons` package, imported in `src/fonts.js` (no external CDN); their 84 woff2 subsets are runtime-cached, not precached, because a browser downloads the two or three it needs and precaching all of them cost 1.3 MB for ~300 KB of use. Weights mirror the former Google Fonts request (Inter 400/500/600/700/800; EB Garamond 400/600/700 + 400 italic); `@fontsource` ships all subsets incl. Cyrillic for RU. To change fonts/weights, edit `src/fonts.js`.
- **An image may never be edited in place — rename it** (`npm run imghash`, a CI step). Image URLs carry no content hash, and both caches that hold them key on the URL alone: the bucket's `Cache-Control` and, decisively, the CacheFirst `/images/` route, which never revalidates whatever the headers say. So a reader who has the old bytes keeps them, at the table, with nothing we can deploy to reach them. The rule was documented from the start and nothing enforced it; `scripts/check-image-renames.mjs` diffs `public/images/**` against the committed `scripts/lib/image-hashes.json` and fails on a same-name-different-bytes pair. New and deleted files are safe by construction and only need recording: `npm run imghash -- --write`, which is also how you record an in-place change you mean to ship — as a baseline diff a reviewer can see.
- **Offline warm-up — the way the rest gets downloaded:** `offlineShell()` emits `dist/offline-manifest.json`, `{ assets: { files, bytes }, images: { files, bytes } }` — everything built and NOT precached, plus the images. The **bytes** are in it because the one fact a reader must be given before spending their data is how much; nothing can work that out at runtime without fetching the files in question. `.woff` is excluded (the pre-woff2 fallback @fontsource ships beside every subset — ~2 MB nobody on a Safari-16 floor will ever request). `src/composables/useOfflineWarmup.js` fetches the list with bounded concurrency; each fetch is served and stored by the SW's own CacheFirst routes, so nothing touches the Cache API directly. **Assets come before images** — a run interrupted half-way then leaves every screen reachable and only the illustrations missing.
  - **Two entry points.** The installed app still warms itself on the first online launch (`isStandaloneDisplay()`, idle callback). Everyone else asks: **⚙ menu → "Download for offline"**, with the size on the button (`AppNavbar.vue`; `startOfflineWarmup()` / `loadOfflineSize()`, the latter called only when the menu opens). The item shows progress in place and turns into "Downloaded for offline" afterwards.
  - Idempotent via `localStorage['wh11ed-offline-warmed']`, keyed to a checksum of the file list, so it re-arms when a deploy changes what there is to download. **It fetches — and counts — only what no cache holds yet** (`caches.match` over the list, read-only): a release renames ~100 of the ~780 files, the rest are already in `wh-rules-assets`/`wh11ed-images`, and counting the whole list made the update chip read «0/777» as if the app were downloading itself again (owner, 2026-10-05). Why a release renames so many files at all — the hash cascade through the `app` chunk — is the hub journal `2026-10-05-chunk-hash-cascade`. The button passes `force`, because a reader asking again has a reason we cannot see (a cache evicted under storage pressure, a trip tomorrow).
  - `OfflineWarmupToast` shows the same progress as an unobtrusive chip (labels `warmingOffline`/`offlineReady`; `downloadingUpdate`/`updateDownloaded` when the installed app tops up a set it had already completed before a release — `isUpdate`, owner's call 2026-09-27: «Подготовка офлайна» after every update read as something new starting).
  - `dist/image-manifest.json` (the old flat URL array) is still emitted **for one release**: an installed app runs the JS it last precached, and that code iterates this file as an array. Delete it once no client is on the old shell.
- **Updates (silent, no button):** `registerType: 'prompt'` (NOT `autoUpdate`), but there is **no longer an "Update" button** — `UpdateToast.vue` is now a **headless** component (renders nothing) that registers the SW via `useRegisterSW()` (`virtual:pwa-register/vue`) and applies updates automatically. A new deploy downloads in the background; once `needRefresh` flips true it's applied + reloaded **immediately, tab and installed PWA alike** (game state is flushed to `localStorage` on `pagehide`/`beforeunload` by `useTracker.js`, and the PWA resumes into the same screen). Until 2026-09-21 the installed PWA held the update back while `route.path` started with `/tracker/game`; that path also hosts the setup form and the finished game, and the app resumes into its last route, so a tracker-only reader never left it and stayed on an old build through every deploy (a player sat on 2.4 for eight releases). **Do not reintroduce a route-based deferral.** `cleanupOutdatedCaches` purges stale **precache** on activation (it does **not** touch the `wh11ed-images` runtime cache — that's bounded by `maxEntries` and relies on the rename-on-change rule). Works only if the SW itself isn't long-cached — see Deployment. (Under prompt mode the registration is bundled via `workbox-window`; no separate `registerSW.js` is emitted.) **The SW is only checked for updates at registration by default, so `UpdateToast.vue`'s `onRegisteredSW` polls `registration.update()`** — every **15 minutes**, on return to the foreground, and on every navigation, all guarded by `navigator.onLine` and by a 2-minute floor so clicking through ten datasheets costs one conditional GET. The interval was an hour until 2026-09-12 and that number was sized for the old cost: while the precache was 15.5 MB, finding an update meant starting a long download at a moment nobody chose. At ~0.9 MB the thing worth minimising is instead the time a reader spends on a stale build.
- **Resume last view (standalone only):** in the installed PWA the app reopens on the last page *and* the section the user was reading; a normal browser tab is untouched. Standalone is detected via `isStandaloneDisplay()` (`src/composables/standalone.js`, the single source for `display-mode: standalone` / iOS `navigator.standalone`). The last location is stored in `localStorage['wh11ed-last-route']` as `path?query` or `path?query#section-anchor` (`storedLocation()`). **The query is part of it and must stay** — `?draft=` is what tells the roster wizard which draft to resume, `?unit=`/`?phase=` which unit or phase a screen was opened on; storing the bare path reopened the wizard empty and let the next faction pick start a *second* draft, orphaning the first on the Drafts tab. **Restore** is a one-time `router.beforeEach` in `src/router/index.js` (runs before the first view mounts, so it never flashes home; skips deep links and `/tracker/auth-callback`). **Persistence** lives in `useViewRestore.js` (called once in `App.vue`): since scrolling never changes the URL hash, a rAF-throttled scroll-spy (`currentSectionId()`) records the topmost section anchor — `section-*` / `ability-*` / Event Companion `step-*`,`missions-*`,`pairing-*`,`ranking-*` ids — and writes it back as the anchor (displacing the URL's own hash); on launch it re-runs the robust `scrollToAnchor()` (extracted from `useRefNavigation.js`) to correct for late-loading illustrations.
