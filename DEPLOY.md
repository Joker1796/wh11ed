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
- `version.json` → `no-cache`: `{ app, notes }` of the build that is live, asked by a page already open (`launchGate.js`); a cached copy would say nothing new shipped
- `offline-manifest.json` → `no-cache`: it DESCRIBES a set that every deploy renames, so a cached copy sends the warm-up after files that no longer exist
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
  выставлен в коммите/`package.json` или деплой с бампом упал до выкладки). **Тихие выкаты
  запрещены** (владелец, 2026-10-16): если этот номер уже в проде (`wh-notes-version` на
  `VITE_SITE_ORIGIN`), скрипт откажется. Новая сборка — новый номер, даже ради одной даты:
  по номеру читатель узнаёт о новой версии (плашка «Что нового», проверка обновления во вкладке).

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

`deploy.sh` **auto-bumps `package.json` (`BUMP=patch` by default)** before building — use `BUMP=none npm run deploy` to ship the current version as-is (refused when that version is already live — no silent deploys), or `BUMP=minor`/`major`. When it bumps (`BUMP` ≠ `none`), it also **commits + pushes** the bump (`chore: release vX.Y.Z`) to the release branch once the deploy succeeds, then fast-forwards `main` to it and pushes `main` — so deploy from `release/X.Y.Z` with a clean tree (uncommitted changes outside `package.json`/`package-lock.json`, another branch, or a bump that would not land on the version in the branch name aborts the deploy before it builds anything). See `CONTRIBUTING.md` for the branch flow.

**One target only.** The retired `wh11ed.ru` is frozen on its last build (v2.2.6, with the move banner) and is never redeployed — `deploy-both.sh` is gone, `.env.deploy` (bucket + CDN + `VITE_SITE_ORIGIN` + `VITE_API_BASE_URL`) is the single working config, and `.env.deploy.wh11ed` survives only as a rollback escape hatch (`ENVFILE=.env.deploy.wh11ed BUMP=none npm run deploy`). Don't reintroduce a two-domain release.

Uploads via the S3-compatible API (endpoint `storage.yandexcloud.net`, AWS CLI profile `yc`). **The CDN purge now runs automatically** at the end of `deploy.sh`: `CDN_RESOURCE_ID` is read from the gitignored `.env.deploy` (copy `.env.deploy.example`) and `yc` is resolved even off-PATH (`~/yandex-cloud/bin/yc`); a purge failure warns instead of aborting (upload is already done). Override with another id, or run `CDN_RESOURCE_ID= npm run deploy` to skip. Manual fallback: `yc cdn cache purge --resource-id <cdn-resource-id> --path '/*'`. The CDN resource must cache **according to origin headers** (honor-origin) or it overrides per-file `Cache-Control` with a single TTL. Because images live under stable names, **rename a file when you change an image** (or the browser keeps the old one).

## PWA

The site is an installable PWA via **`vite-plugin-pwa`** (Workbox `generateSW`), configured in `vite.config.js`. `base` is `'/'` (root-hosted) so the service worker controls scope `/`.

> **🔒 Product requirement — light web/tab, full offline in the installed app.** A casual visitor in
> a **browser tab** gets a light site that is always the server's latest: **since 2.9.5 a tab has no
> service worker at all** (`workerPolicy.js`). The worker is the installed app's — and a tab's on a
> device that has the app, because on Android and desktop the two share one storage and one worker
> (the mark `wh11ed-app-installed`, `appInstalled.js`). Under it the worker precaches **the shell and
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
> The full download is the installed app's: automatically on its first online launch, and the ⚙
> menu's "Download for offline" (with the size on the button) where there is a worker to keep it. Do **not** widen
> the precache to "fix" a missing chunk offline — that is the thing this split exists to prevent.

- **Manifest** is defined inline in the `VitePWA({ manifest })` config; the plugin emits `dist/manifest.webmanifest` and injects the `<link>` into `index.html`. It carries `id: '/'`, app `shortcuts` (Game Tracker, Missions — clean history-mode paths, e.g. `/tracker`) and `screenshots` (wide + narrow, for the richer Chrome/Android install dialog). iOS-only tags (`apple-touch-icon`, `apple-mobile-web-app-*`, `theme-color`, and the `apple-touch-startup-image` launch-screen links) are hand-written in `index.html`.
- **Icons, launch screens, link preview, install screenshots** live in `public/brand/<set>/` — `main-2` for the site, `beta-2` for beta.wh-rules.ru (`VITE_BETA=1`). Since 2026-10-09 (owner) the app icons are one centred block — WH over a plain bar as wide as the letters, BETA between them on the beta — and the launch screens are balanced: the site's WH as wide as the ruler, the beta's WH and BETA in one row as wide as it. Those were recomposed from the Claude Design art (the letters lifted off with an alpha matte, the grid redrawn), so the `-2` folders are the source now; a new folder, not new bytes under the old one, chosen by `BRAND` in `vite.config.js`. Each set: `favicon.svg`, `apple-touch-icon.png` (180), `pwa-192.png`, `pwa-512.png`, `maskable-512.png` (the mark inside the central 80 % — 199 px from the centre against 205), `og-image.png` (1200×630), `screenshot-{wide,narrow}[-2..4].png` (1280×720 / 720×1280, four each, labelled in the manifest) and `splash/apple-splash-*.png` (7 iPhone sizes; the `<link>` media queries in `index.html` name them). Drawn in Claude Design (2026-10-09): the WH monogram over a ruler, red on the site, yellow on the beta, in Sofia Sans Extra Condensed — the same lockup the navbar draws in CSS. `index.html` names them through the `%BRAND%` placeholder. **A changed picture needs a new path, not new bytes under the old name** — the CDN, the browsers and an installed Android app key on the URL; the move from the root to `brand/` is what made the 2026-10 set reach installed apps. iOS never re-reads an installed app's icon: only a reinstall shows a new one. Only the build's own four icons are precached (`ICON` in `manifestTransforms`); the screenshots, splash and preview are fetched by the install dialog, iOS and link crawlers alone. The generators that used to draw the W (`npm run icons` / `splash` / `screenshots`) are gone with the hand-made set.
- **Install affordance:** Chromium fires `beforeinstallprompt` → a custom "Install app" item in the settings menu calls the native prompt (`useInstallPrompt.js`). iOS has no such event, so on iOS Safari (detected in `useInstallPrompt.js`, excludes in-app/non-Safari browsers and standalone) the same menu item opens `InstallHintModal.vue` with the "Add to Home Screen" steps (EN/RU in `i18n/ui.js`).
- **Release notes archive** (2026-09-27): `src/data/changelog.js` keeps only the newest `CHANGELOG_KEEP` (5) entries; older ones live in wh11ed-api's `changelog` table (`GET /changelog?before=&limit=`, public) and the "What's new" page fetches them on request (`useChangelogArchive.js`: offline and API-down states say so, with a retry). Notes almost nobody reads stay out of the first load and the installed app's offline download (owner's call). `deploy.sh` step 0b moves them: `scripts/changelog-rollover.mjs` publishes the older entries through wh11ed-api's `changelog-publish.ts` (validates, upserts, reads back, compares) — over ssh inside the API's container on its server, since the database is not reachable from outside (`CHANGELOG_SSH` / `CHANGELOG_SSH_KEY` in `.env.deploy`; `--check` proves the way without publishing) — and only on success cuts them from the file, re-imports it and checks it holds exactly the kept entries (else restores it). Any failure keeps the file whole and the deploy goes on; the cut file is committed with the version bump. **The archive once lived only in YDB and went down with it on 2026-10-11** — it was rebuilt from this repo's git history (each entry from the last commit of `changelog.js` that still held it); the history is the archive's backup of last resort, so never rewrite it away. To fix an entry already archived, publish the corrected entry the same way (it upserts by version).
- **Chunk layout — a release renames two files, not eighty** (2026-09-27): the entry (`index-*.js`, ~13 KB) holds only `main.js` and the router, whose lazy `import()`s name every page; `app-*.js` holds everything else the entry reaches statically; `vendor-*.js` holds Vue. Nothing imports the entry, so a changed page renames itself and the entry, and nothing else. Before, the shared code sat in the entry and every page imported it back: a release (the changelog changes every time) renamed ~80 chunks, and the installed app re-downloaded them all after each deploy — on a bad mobile connection, a long wait for nothing. The versions come from two `<meta>` tags in `index.html` (`src/buildInfo.js`) for the same reason, and the chrome imports its route constants from `src/router/nav.js`, never from `router/index.js`. `npm run chunks` (part of `npm run build`) checks all of it on the built files. Expect every page to be renamed when the SHARED code changes (`ui.js`, a common component) — that is real change, not a leak.
- **What is precached, and what is not:** `globPatterns` still casts wide; `manifestTransforms` is what narrows it to the shell set `offlineShell()` computed, plus the root files that are not chunks (`index.html`, the webmanifest, the icons). Two CacheFirst `runtimeCaching` routes take everything else: **`wh-rules-assets`** for `/assets/` (content-hashed names, so a name in the cache can never be stale; `maxEntries: 1200` is what bounds growth as deploys rename chunks) and **`wh11ed-images`** for `/images/` (stable names — see the rename rule below). Fonts (Inter, Sofia Sans Extra Condensed, EB Garamond) are **self-hosted** via `@fontsource`, imported in `src/fonts.js` (no external CDN; which faces, and why only those, is that file's header); their woff2 subsets are runtime-cached, not precached, because a browser downloads the two or three it needs. `@fontsource` ships all subsets incl. Cyrillic for RU. There is no icon font: icons are the app's own drawings, inlined into the stylesheet (`src/style.css`, "App icons").
- **An image may never be edited in place — rename it** (`npm run imghash`, a CI step). Image URLs carry no content hash, and both caches that hold them key on the URL alone: the bucket's `Cache-Control` and, decisively, the CacheFirst `/images/` route, which never revalidates whatever the headers say. So a reader who has the old bytes keeps them, at the table, with nothing we can deploy to reach them. The rule was documented from the start and nothing enforced it; `scripts/check-image-renames.mjs` diffs `public/images/**` against the committed `scripts/lib/image-hashes.json` and fails on a same-name-different-bytes pair. New and deleted files are safe by construction and only need recording: `npm run imghash -- --write`, which is also how you record an in-place change you mean to ship — as a baseline diff a reviewer can see.
- **Offline warm-up — the way the rest gets downloaded:** `offlineShell()` emits `dist/offline-manifest.json`, `{ assets: { files, bytes }, images: { files, bytes } }` — everything built and NOT precached, plus the images. The **bytes** are in it because the one fact a reader must be given before spending their data is how much; nothing can work that out at runtime without fetching the files in question. `.woff` is excluded (the pre-woff2 fallback @fontsource ships beside every subset — ~2 MB nobody on a Safari-16 floor will ever request). `src/composables/useOfflineWarmup.js` fetches the list with bounded concurrency; each fetch is served and stored by the SW's own CacheFirst routes, so nothing touches the Cache API directly. **Assets come before images** — a run interrupted half-way then leaves every screen reachable and only the illustrations missing.
  - **Two entry points.** The installed app warms itself on the first online launch (`isStandaloneDisplay()`, idle callback). Under a worker the reader can also ask: **⚙ menu → "Download for offline"**, with the size on the button (`AppNavbar.vue`; `startOfflineWarmup()` / `loadOfflineSize()`, the latter called only when the menu opens). The item shows progress in place and turns into "Downloaded for offline" afterwards. A plain tab (no worker, since 2.9.5) does not show it: there is nothing to keep the files in, and offline is what installing gives.
  - Idempotent via `localStorage['wh11ed-offline-warmed']`, keyed to a checksum of the file list, so it re-arms when a deploy changes what there is to download. **It fetches — and counts — only what no cache holds yet** (`caches.match` over the list, read-only): a release renames ~100 of the ~780 files, the rest are already in `wh-rules-assets`/`wh11ed-images`, and counting the whole list made the update chip read «0/777» as if the app were downloading itself again (owner, 2026-10-05). Why a release renames so many files at all — the hash cascade through the `app` chunk — is the hub journal `2026-10-05-chunk-hash-cascade`. The button passes `force`, because a reader asking again has a reason we cannot see (a cache evicted under storage pressure, a trip tomorrow).
  - `OfflineWarmupToast` shows the same progress as an unobtrusive chip (labels `warmingOffline`/`offlineReady`; `downloadingUpdate`/`updateDownloaded` when the installed app tops up a set it had already completed before a release — `isUpdate`, owner's call 2026-09-27: «Подготовка офлайна» after every update read as something new starting).
  - `image-manifest.json`, the flat URL array the warm-up read before 2026-09-12 (#329), is gone since 2.9.4: an app that old updates itself before it warms. It is no longer excluded from the deploy's `sync --delete`, which is what removed the last copy from the bucket.
- **Updates (announced, applied by a button or at the next start — since 2026-10-16):** `registerType: 'prompt'` (NOT `autoUpdate`). `UpdateToast.vue` is a **headless** component that registers the SW via `useRegisterSW()` (`virtual:pwa-register/vue`). A new deploy downloads in the background; once `needRefresh` flips true it is **announced, never applied by itself**: `useAppUpdate.js` → `UpdatePlate.vue`, a plate with no ✕ (a strip over a phone's bottom nav, a 360px card at the bottom right from 720×500 — the `.dock-card` shape it shares with `InstallOffer`), under the dialogs (390 < 400; `overlayLayers.test.js`). The installed app first downloads the new build's files with the old one running (`topUpOffline`), so its button opens a version that is already offline-complete. **A start under a service worker opens the live version** (`launchGate.js`, awaited in `main.js` before mounting): it asks `version.json` (no-cache, ≤1.5 s); a newer one → a screen "Updating to X.Y.Z…" while the worker installs (≤8 s) → `SKIP_WAITING` → reload, so the old build is never drawn; a worker already waiting is applied at once without asking. A version a start already reloaded for and did not get is not waited for again (`wh11ed-launch-tried`). From 2026-09-21 to 2026-10-16 every new build was applied the moment it installed — a reload in the middle of the screen, often right as the reader came back (journal: update delivery). Until 2026-09-21 the installed PWA held the update back while `route.path` started with `/tracker/game`; that path also hosts the setup form and the finished game, and the app resumes into its last route, so a tracker-only reader never left it and stayed on an old build through every deploy (a player sat on 2.4 for eight releases) — the next start applying a waiting worker is what keeps that from returning. **Do not reintroduce a route-based deferral.** `cleanupOutdatedCaches` purges stale **precache** on activation (it does **not** touch the `wh11ed-images` runtime cache — that's bounded by `maxEntries` and relies on the rename-on-change rule). Works only if the SW itself isn't long-cached — see Deployment. (Under prompt mode the registration is bundled via `workbox-window`; no separate `registerSW.js` is emitted.) **The SW is only checked for updates at registration by default, so `UpdateToast.vue`'s `onRegisteredSW` polls `registration.update()`** — every **15 minutes**, on return to the foreground, and on every navigation, all guarded by `navigator.onLine` and by a 2-minute floor so clicking through ten datasheets costs one conditional GET. The interval was an hour until 2026-09-12 and that number was sized for the old cost: while the precache was 15.5 MB, finding an update meant starting a long download at a moment nobody chose. At ~0.9 MB the thing worth minimising is instead the time a reader spends on a stale build.
- **A tab without a service worker (since 2.9.5).** `App.vue` mounts `UpdateToast` — which is what registers the worker — only where `workerWanted()` (the installed app, or a tab beside it). A first visit in a tab never gets one; `index.html` is no-cache, so every load and every F5 is the version the server has. A tab left open learns of a new one from `tabFreshness.js`: `version.json` against `APP_VERSION` on a navigation, a return to the tab and every 15 minutes while in view (≤ once in 2 min) → the same plate, ready at once, its button a plain reload ("The page reopens where you are."); **while it is up, a link inside the site loads its page whole** (a router guard, `location.assign`), so the new version reaches readers who never press it (owner, 2026-10-16). A missing chunk is `staleChunks.js` as before — with no registration it reloads into the address at once.
  - **A tab that has a worker from before** keeps it and the release-1 behaviour until **its plate moves it off** (`cacheMigration.js`): "I changed how the site is cached… Apply", the same plate in the same place, no ✕, under the dialogs, shown only at a calm moment (in view 10 s, no page change for 3 s and none loading, no scroll for 1.5 s, no download, the worker neither installing nor waiting, no reload held, no update plate, no "What's new" bar, no dialog the app opened by itself — the offer to install and the error-reports question wait while it is up). **Apply** = `unregister`, then delete `workbox-precache-*`, `wh-rules-assets`, `wh11ed-images` and the downloaded-offline mark; no reload — the page stays under the old worker until it is left. Cut short between the two steps, `tidyAfterWorker` finishes at the next start of a tab with no worker. A tab that had downloaded the site for offline is told offline is in the installed app now.
  - **A tab is not moved off where the app may be beside it unannounced**: on a shared storage (not iOS/iPadOS, not Safari on a Mac — `separateAppStorage`) a downloaded offline set without the app's mark may be an app installed before 2.9.4 and not opened since; that tab keeps the worker (`tabMayLeaveWorker`). It costs that tab nothing but the old way of updating.
  - Checked end to end by `scripts/update-delivery/e2e.mjs` (two builds on a local server): first visit, the plate, a link under it, F5, the move and what it leaves, the two tabs that keep the worker, the installed app.
- **Resume last view (standalone only):** in the installed PWA the app reopens on the last page *and* the section the user was reading; a normal browser tab is untouched. Standalone is detected via `isStandaloneDisplay()` (`src/composables/standalone.js`, the single source for `display-mode: standalone` / iOS `navigator.standalone`). The last location is stored in `localStorage['wh11ed-last-route']` as `path?query` or `path?query#section-anchor` (`storedLocation()`). **The query is part of it and must stay** — `?draft=` is what tells the roster wizard which draft to resume, `?unit=`/`?phase=` which unit or phase a screen was opened on; storing the bare path reopened the wizard empty and let the next faction pick start a *second* draft, orphaning the first on the Drafts tab. **Restore** is a one-time `router.beforeEach` in `src/router/index.js` (runs before the first view mounts, so it never flashes home; skips deep links and `/tracker/auth-callback`). **Persistence** lives in `useViewRestore.js` (called once in `App.vue`): since scrolling never changes the URL hash, a rAF-throttled scroll-spy (`currentSectionId()`) records the topmost section anchor — `section-*` / `ability-*` / Event Companion `step-*`,`missions-*`,`pairing-*`,`ranking-*` ids — and writes it back as the anchor (displacing the URL's own hash); on launch it re-runs the robust `scrollToAnchor()` (extracted from `useRefNavigation.js`) to correct for late-loading illustrations.

## Бета трекера: beta.wh-rules.ru

Новый трекер живёт рядом с сайтом на своём поддомене (2026-10-08) — свой бакет и свой ресурс CDN,
тот же API. Собирается из ветки трекера **после** выката релиза сайта: сначала влить в неё релиз,
потом `ENVFILE=.env.deploy.beta npm run deploy` (настройки — `.env.deploy.beta.example`).
**Первый запуск — наоборот, до релиза** (2.7.20, 2026-10-09): запись чейнджлога и плашка ведут на
бету ссылкой, и релиз, вышедший раньше неё, отправил бы всех на 404. Бета, в которую релиз уже влит,
выкатывается первой (в подвале у неё пока прежняя версия — номер поднимает деплой сайта), потом
релиз, потом бета ещё раз — с бампом.
`BUMP=none`: бета не поднимает версию, ничего не коммитит и не двигает `main`; архив чейнджлога не
трогает. `VITE_BETA=1` даёт noindex, `robots.txt` с `Disallow: /`, имя приложения «WH Rules Beta»
и плашку беты. Партии сайта и беты не смешиваются: поколение трекера (`src/core/game/trackerGen.js`,
сервер — `tracker_version` в `wh11ed-api`). В `ALLOWED_ORIGINS` API должен быть
`https://beta.wh-rules.ru` — иначе бета не достучится до API и вход не вернёт на неё.
