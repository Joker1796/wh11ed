# Кор-правила одной страницей — бриф задачи

Свернуть семь роутов Core Rules в одну сквозную страницу `/core-rules` и переработать
навигацию по ней: полноценное оглавление вверху + плавающая кнопка, открывающая то же
оглавление в модалке.

Задача **чисто UI/роутинговая**: файлы данных (`src/data/basicRules.js` и соседи) **не
редактируются**, EN↔RU парити блоков не затрагивается. Всё, что меняется, — обёртки-вью,
навигация и то, что знает про пути `/basic-rules`, `/battle-round`, ….

---

## Утверждённые решения

| Вопрос | Решение |
|---|---|
| Объём | **Все 7 глав, включая Introduction.** `/introduction` (лор + QR + карточки-оглавление) становится первым блоком единой страницы |
| Старые URL | **Редирект на якорь**: `/basic-rules` → `/core-rules#section-01` и т.д. Семь индексируемых страниц схлопываются в одну — принято осознанно |
| Плавающая кнопка TOC | **Везде, через существующие панели**: на мобилке — вклад в `MobileUtilityBar`, на десктопе — FAB в колонке рядом с back-to-top. Своей отдельной кнопки в углу не заводим |
| Производительность | **Всё сразу + `content-visibility`**: грузим все 7 датафайлов параллельно, рендерим всё дерево, оффскрин-главы пропускают раскладку через CSS |

---

## Текущее состояние (карта)

**7 роутов** в [src/router/index.js:294-345](src/router/index.js#L294-L345):
`/introduction` (`HomeView`, eager) + `/basic-rules`, `/battle-round`, `/battlefields`,
`/advanced-rules`, `/reference`, `/muster` (lazy).

**Пять из шести вью — почти одинаковые** (hero → `TableOfContents` → секции → `PageNav`),
различия только в спецблоках:

| Вью | Спецблоки сверх общего скелета |
|---|---|
| `BasicRulesView` | `section.image`, `sub.illustration`, `DefinitionBlock`, `woundTable` после 05.02, `SectionTocBlock` |
| `BattleRoundView` | `SectionTocBlock`, `GroupLabelBlock`, `section.phase` |
| `BattlefieldsView` | грид `StratCard` для §15, `renderAfterStratagems`, `inline`, `GroupLabelBlock` |
| `AdvancedRulesView` | `abilitiesTable` для §19 |
| `MusterView` | `battleSizeTable` после 25.03 |
| `ReferenceView` | своя структура: фильтр способностей (`useAbilityFilter`), карточки abilities, appendix, errata, FAQ, QR-блок |
| `HomeView` | лор, QR, карточки-оглавление по главам |

**Вес данных** (gzip / raw): basicRules 56/257 КБ, reference 33/137, battlefields 21/86,
battleRound 20/102, advancedRules 19/81, muster 5/18, intro 5/13 → **≈158 КБ gzip суммарно**.
Важно: эти чанки уже собираются отдельно и **уже попадают в precache** (`globPatterns` берёт
весь `js`), потому что `useSearch.js` статически импортирует все датафайлы. То есть **вес
precache PWA от слияния не вырастет** — вырастет только объём, который скачивает вкладка при
заходе именно на страницу правил (было 20–56 КБ на главу, станет ~158 КБ разово).

**Кто знает про core-пути** (полный список мест правки):

- [src/App.vue:327](src/App.vue#L327) `coreRoutes`, [:385-396](src/App.vue#L385-L396) `coreSubNavItems`
- [src/router/index.js:41-167](src/router/index.js#L41-L167) `navGroups` / `navGroupsRu`
- [src/composables/useRefNavigation.js:3-15](src/composables/useRefNavigation.js#L3-L15) `ROUTE_MAP`
- [src/composables/useSearch.js:14-21](src/composables/useSearch.js#L14-L21) `routeMap` + захардкоженные `route: '/reference'` в 6 местах
- [src/composables/useSeoMeta.js:55-108](src/composables/useSeoMeta.js#L55-L108) `ROUTES`
- [scripts/gen-seo-routes.mjs:28-34](scripts/gen-seo-routes.mjs#L28-L34) `STATIC_ROUTES`
- `SectionTocBlock` через проп `route` в `BasicRulesView`/`BattleRoundView`
- `PageNav` (prev/next по `navGroups`), `NavSidebar` (`goToGroup`/`handleAnchorClick`)
- тесты: `useSearch.test.js`, `useSeoMeta.test.js`
- ссылки на `/introduction` в `src/data/landing.js` / `rulesLanding.js` (проверить оба)

---

## Целевая архитектура

```
/core-rules  →  CoreRulesView.vue
                ├── hero
                ├── CoreRulesToc (вверху, двухуровневый: 7 глав → секции 01…25)
                ├── <section class="core-chapter" id="chapter-intro">     ChapterIntro
                ├── <section class="core-chapter" id="chapter-basic">     ChapterBasicRules
                ├── … battle-round / battlefields / advanced / reference / muster
                └── (PageNav не рендерим — прыгать больше некуда)

           +  CoreRulesTocModal (BaseModal + тот же CoreRulesToc)
           +  плавающая кнопка: MobileUtilityBar (≤900px) / FAB-колонка (≥901px)
```

Каждая глава — **отдельный компонент** в `src/components/core/`, полученный из текущего вью
вырезанием обёртки `.view`, hero, `TableOfContents` и `PageNav`. Логика и scoped-стили главы
переезжают вместе с ней — это снижает риск и сохраняет спецблоки нетронутыми. Гигантского
общего шаблона не делаем.

Единый реестр глав — переиспользуем `navGroups`/`navGroupsRu` из роутера, добавив каждой
группе якорь:

| Глава | Якорь |
|---|---|
| Introduction | `#chapter-intro` |
| Basic Rules | `#section-01` |
| The Battle Round | `#section-07` |
| Battlefields & Tactics | `#section-13` |
| Advanced Rules | `#section-17` |
| Reference | `#section-24` |
| Muster Your Army | `#section-25` |

---

## План работ

### Фаза 0 — подготовка
1. `git fetch` + ветка `feat/core-rules-one-page` от свежего `origin/main` (вторая машина
   тоже пушит в main — см. рабочий процесс в CLAUDE.md).
2. Зафиксировать базовые метрики: `npm run build` до правок — размеры чанков, чтобы потом
   сравнить.

### Фаза 1 — главы как компоненты
Создать `src/components/core/` и перенести туда содержимое семи вью:
`ChapterIntro.vue`, `ChapterBasicRules.vue`, `ChapterBattleRound.vue`,
`ChapterBattlefields.vue`, `ChapterAdvancedRules.vue`, `ChapterReference.vue`,
`ChapterMuster.vue`.

Для каждой:
- убрать `<div class="view">`, `.view-hero`, `<TableOfContents>`, `<PageNav>`;
- корневым узлом сделать фрагмент (шаблон без обёртки) — обёртку `<section class="core-chapter">`
  ставит `CoreRulesView`, чтобы `content-visibility` жил в одном месте;
- `SectionTocBlock :route` → `/core-rules`;
- `useBilingualSections`, спецблоки, scoped-стили — **без изменений**;
- `ChapterReference` сохраняет `useAbilityFilter` (сингтон, на него завязан `NavSidebar`
  через `sec.filter`) и якоря `ability-NN_NN`, `section-appendix`, `section-errata`,
  `section-faq`.

Старые файлы `src/views/{HomeView,BasicRulesView,BattleRoundView,BattlefieldsView,AdvancedRulesView,ReferenceView,MusterView}.vue` удалить.

### Фаза 2 — CoreRulesView
`src/views/CoreRulesView.vue`:
- hero страницы (заголовок «Core Rules / Основные правила» + подзаголовок из `ui.js`);
- `<CoreRulesToc>` сразу под hero;
- семь `<section class="core-chapter" :id="…">` c заголовком главы и компонентом главы внутри;
- на `mount`/`watch(route.hash)` — прогнать `scrollToAnchor()` из `useRefNavigation.js`
  (он уже опрашивает DOM ~1.5 с и повторяет скролл через 400 мс — это же чинит неточность
  позиции при раскрытии `content-visibility`).

**Производительность** — на `.core-chapter`:
```css
.core-chapter { content-visibility: auto; contain-intrinsic-size: auto 3000px; }
```
`auto` в `contain-intrinsic-size` запоминает реальную высоту после первого рендера, поэтому
скроллбар не «дышит». Ctrl+F в браузере находит текст внутри (`hidden-matchable`); там, где
`content-visibility` не поддерживается, деградация — просто полный рендер, поведение прежнее.

### Фаза 3 — оглавление и навигация
1. **`src/components/core/CoreRulesToc.vue`** — двухуровневый TOC: 7 глав, под каждой список
   секций из `navGroups[].sections`. Проп `variant: 'page' | 'modal'`, emit `select` (модалка
   по нему закрывается). Подсветка активной главы/секции.
2. **`src/composables/useActiveSection.js`** — scroll-spy на `IntersectionObserver`
   (`rootMargin` под липкий хедер), возвращает id текущей секции. Использует и TOC, и subnav.
   Логику «топовой секции» уже делает `useViewRestore.js` (`currentSectionId()`) — свериться
   с ней, чтобы не разошлись, и по возможности переиспользовать.
3. **`src/components/core/CoreRulesTocModal.vue`** — `BaseModal` + `CoreRulesToc variant="modal"`.
   Никакого своего шелла (правило проекта: новые диалоги оборачивают `BaseModal`).
4. **Плавающая кнопка**:
   - мобилка: `useContributeMobileActions('core-toc', …)` из `CoreRulesView`. **Требуется
     доработка `MobileUtilityBar.vue`** — сейчас контрибуции рендерятся только как
     `RouterLink` (`a.to`); добавить поддержку кнопки-действия (`{ key, icon, label, onClick }`),
     не ломая существующий вклад `faction-tabs`;
   - десктоп: FAB `.fab-btn` в колонке над back-to-top. Взять паттерн `.faction-fabs` из
     [FactionLayout.vue:243-255](src/components/FactionLayout.vue#L243-L255) (`position: fixed;
     right/bottom 1.5rem; gap .75rem; z-index 195; display: none` + `@media (min-width: 901px)`).
     Чтобы две кнопки не дрались за угол — либо `BackToTopButton` переезжает внутрь этой
     колонки на core-странице, либо колонка рендерится в `CoreRulesView`, а `BackToTopButton`
     на `/core-rules` не показывается. **Выбрать при реализации, но не допустить наложения.**
5. **Subnav** ([App.vue:147-182](src/App.vue#L147-L182)): для core-страницы вкладки глав
   становятся якорными (не `RouterLink` на путь), активная подсвечивается по scroll-spy.
   `coreSubNavItems` → `{ hash, label }`; в шаблоне `subnav` учесть новый тип item
   (сейчас там уже есть ветка `item.unitsMenu`, добавляется третья).
6. **`NavSidebar`** — `navGroups` получают `path: '/core-rules'` + `hash`; `goToGroup()` должен
   пушить `{ path, hash }`, `handleAnchorClick` уже умеет path+anchor и пробрасывает
   `sec.filter` в `useAbilityFilter` — проверить, что фильтр Reference по-прежнему работает.
7. **`TableOfContents.vue`** после рефактора не используется нигде (все 6 потребителей — core).
   Удалить, если новый `CoreRulesToc` полностью его заменил.
8. **`PageNav`** на core-странице не рендерим; компонент остаётся для Event Companion —
   в [PageNav.vue:26-30](src/components/PageNav.vue#L26-L30) убрать ветку `navGroups`.

### Фаза 4 — роутинг и редиректы
В `src/router/index.js`:
```js
{ path: '/core-rules', component: CoreRulesView },
{ path: '/introduction',   redirect: { path: '/core-rules', hash: '#chapter-intro' } },
{ path: '/basic-rules',    redirect: { path: '/core-rules', hash: '#section-01' } },
{ path: '/battle-round',   redirect: { path: '/core-rules', hash: '#section-07' } },
{ path: '/battlefields',   redirect: { path: '/core-rules', hash: '#section-13' } },
{ path: '/advanced-rules', redirect: { path: '/core-rules', hash: '#section-17' } },
{ path: '/reference',      redirect: { path: '/core-rules', hash: '#section-24' } },
{ path: '/muster',         redirect: { path: '/core-rules', hash: '#section-25' } },
```
- `HomeView` больше не eager-импорт — эагерным остаётся только `LandingView`.
- `scrollBehavior` уже обрабатывает `to.hash`, но на длинной ленивой странице элемента может
  ещё не быть — рабочая лошадка это `scrollToAnchor()` из Фазы 2.
- Прыжки внутри страницы меняют только hash → `<component :key="$route.path">` в
  [App.vue:192](src/App.vue#L192) не пересоздаёт вью (это то, что нам нужно; проверить, что
  fade-переход не мигает).
- Обновить ссылки на `/introduction` в `src/data/landing.js` и `src/data/rulesLanding.js`.

### Фаза 5 — смежные системы
1. `useRefNavigation.js`: `ROUTE_MAP` — все главы `01`…`25` на `/core-rules` (свернуть в
   константу, не в таблицу из 25 строк). Якоря не меняются.
2. `useSearch.js`: `routeMap` и шесть захардкоженных `route: '/reference'` → `/core-rules`.
3. `useSeoMeta.js`: добавить `/core-rules` (title/description, объединяющие ключевики семи
   старых записей — не потерять RU-запросы «правила на русском», «раунд боя», «сбор армии»);
   старые семь записей удалить (по этим путям теперь редирект, компонент не рендерится).
4. `scripts/gen-seo-routes.mjs`: `STATIC_ROUTES` — семь путей заменить на `/core-rules`.
   **Известное следствие:** старые SEO-ключи в бакете остаются (deploy их не удаляет — так и
   задокументировано в CLAUDE.md, «Removed routes leave stale keys; harmless»); они вернут
   `index.html` 200, а SPA сделает клиентский редирект. Из `sitemap.xml` они уйдут
   автоматически. Если захотим чисто — удалить ключи из бакета вручную.
5. `useViewRestore.js`: сохраняется `path#anchor`, механика не меняется; проверить, что
   `currentSectionId()` видит `chapter-*`-якоря (или что они ему не нужны).
6. `src/i18n/ui.js`: заголовок/описание новой страницы, подпись кнопки TOC и её `aria-label`,
   заголовки глав внутри страницы. `contentsHeading` уже есть — переиспользовать.

### Фаза 6 — тесты и проверки
1. Обновить `useSearch.test.js` (ожидает `/basic-rules`) и `useSeoMeta.test.js` (пути и
   canonical).
2. Новые тесты: резолв редиректов старых путей на нужный якорь; `useActiveSection` (юнит).
3. `npm test` — зелёный.
4. `npm run build` — сравнить с базовыми метриками Фазы 0; убедиться, что данные не уехали
   в entry-чанк (они должны остаться отдельными чанками, подтягиваемыми чанком CoreRulesView).
5. Ручная проверка (обязательно на телефоне — это профиль аудитории):
   - скролл всей страницы, отсутствие рывков при раскрытии `content-visibility`;
   - переход по всем 7 старым URL → правильная глава;
   - кросс-ссылки `(NN.NN)` и `seeAlso` внутри страницы;
   - клик по секции в TOC / в модалке / в drawer / в subnav;
   - Ctrl+K поиск → переход к результату;
   - фильтр способностей из drawer (Reference → Unit/Weapon abilities);
   - плавающая кнопка не наложилась на back-to-top / resume-кнопку / bottom-nav;
   - `prefers-reduced-motion`, тёмная и светлая темы.

### Фаза 7 — деплой
Обычным `npm run deploy` с чистого `main`. Отдельно проверить после деплоя: старые URL
отдают 200 и редиректят; `sitemap.xml` содержит `/core-rules` и не содержит старых семи.

---

## Инварианты — не сломать

- **Данные не трогаем.** Никаких правок `src/data/*.js` с текстом правил; EN↔RU парити
  блоков и балансировка `**` вне зоны этой задачи.
- **Не переносить картинки в `globPatterns`** и вообще не трогать PWA-конфиг: precache
  от этой задачи не должен вырасти (датафайлы там уже есть).
- **Никакого body scroll-lock** в новой модалке — `BaseModal` намеренно его не ставит.
- **Не заводить свой шелл модалки** — только `BaseModal`.
- **`BaseModal` анимируется только на открытие** — закрытие мгновенное, это осознанно.
- **Длительности анимаций — только из токенов** `--motion-*`.
- Линтера нет: стиль — как в соседнем коде.

## Риски

| Риск | Митигация |
|---|---|
| Скролл-джанк на телефоне при раскрытии оффскрин-глав | `contain-intrinsic-size: auto <N>px`, замер на реальном устройстве; если плохо — вторая итерация с прогрессивным монтированием |
| Якорь не находится сразу после редиректа | `scrollToAnchor()` с опросом DOM ~1.5 с + повтор через 400 мс (уже реализован) |
| Просадка SEO после схлопывания 7 страниц в 1 | Принято осознанно; смягчаем качественным `title`/`description` для `/core-rules`, старые URL живут вечно через редирект |
| Плавающая кнопка дерётся за угол с back-to-top / resume | Единая FAB-колонка на десктопе и один общий `MobileUtilityBar` на мобилке — новых фиксированных элементов не заводим |
| Перенос 7 вью в компоненты уронит спецблок | Переносим **дословно**, без «попутного улучшения»; спецблоки проверяем поштучно по таблице выше |

## Открытые вопросы (решить по ходу, не блокируют старт)

1. Заголовок и подзаголовок единой страницы — новый текст в `ui.js` или переиспользуем
   формулировки из `rulesLanding.js`?
2. Нужны ли внутри страницы визуальные разделители-обложки глав (сейчас у каждой главы был
   свой `.view-hero`) — или достаточно `SectionHeader` секций?
3. Держим ли в TOC второй уровень (секции 01…25) целиком развёрнутым или главы сворачиваемые
   (`CollapseTransition`)? На мобилке 25 пунктов + подпункты — длинный список.
