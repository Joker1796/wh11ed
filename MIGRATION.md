# Переезд домена: `wh11ed.ru` → `wh-rules.ru`

Рабочий чеклист миграции фронта (Object Storage + CDN) и API. **Порядок важен** — если
включить фронт на новом домене раньше, чем бэкенд начнёт принимать новый CORS-origin,
сломается логин и облачный бэкап. Идём строго по шагам.

Решения (зафиксированы): API тоже переезжает на `api.wh-rules.ru`; редирект со старого
домена — **постоянный (301), бессрочно**.

---

## Шаг 0 — код фронта (СДЕЛАНО)

`ORIGIN` централизован: единственный источник правды — переменная сборки `VITE_SITE_ORIGIN`
(дефолт в `src/config.js` = `https://wh11ed.ru`). Её читают per-route canonical/hreflang/og:url
(`useSeoMeta.js`) и генератор карты сайта (`gen-seo-routes.mjs`). **Флип всего домена в вывод —
одна переменная**, без правок кода. Проверено: `VITE_SITE_ORIGIN=https://wh-rules.ru` переключает
sitemap и canonical на новый домен.

Остаются точечные правки при катовере (шаг 3): `index.html` (og:image/twitter/JSON-LD, ~6 URL),
`public/robots.txt` (Sitemap URL), `deploy.sh` (`BUCKET`, дефолт API), `.env.deploy`.

---

## Шаг 1 — инфраструктура Yandex Cloud (ТЫ)

Всё в консоли Yandex Cloud (или `yc` CLI). Каталог — тот же, где живёт текущий бакет.

### 1.1 Сертификаты (Certificate Manager)
1. Certificate Manager → **Создать сертификат** → *Let's Encrypt*.
2. Домены: `wh-rules.ru` и `www.wh-rules.ru` (можно один сертификат на оба).
3. Отдельно — сертификат на `api.wh-rules.ru`.
4. Валидация — **DNS CNAME**: консоль покажет запись `_acme-challenge…` → добавь её у DNS-регистратора.
   Сертификат перейдёт в статус *Issued* после проверки (до ~30 мин).

### 1.2 Бакет для статики
1. Object Storage → **Создать бакет**, имя **строго `wh-rules.ru`** (для статик-хостинга имя = домен).
2. Доступ: **публичный на чтение** (public-read).
3. Вкладка **Веб-сайт** → *Хостинг*: `Главная страница = index.html`, `Страница ошибки = index.html`
   (тот же паттерн, что у текущего бакета — deep-link'и отдают index.html).
4. Права для CLI: профиль `yc` в AWS CLI уже должен иметь доступ к каталогу — залью я через `deploy.sh`.
   (Если нет — добавь сервисному аккаунту роль `storage.editor` на бакет.)

### 1.3 CDN-ресурс
1. Cloud CDN → **Создать ресурс**.
2. **Origin**: тип *Bucket* → выбери `wh-rules.ru` (или укажи website-эндпоинт бакета
   `wh-rules.ru.website.yandexcloud.net`, как у текущего ресурса).
3. **Основной домен (CNAME)**: `wh-rules.ru` (+ `www.wh-rules.ru` доп. доменом при желании).
4. **Сертификат**: выбери выпущенный в 1.1.
5. **Кэширование**: режим **«по заголовкам origin» (honor-origin)** — критично, иначе CDN
   перебьёт наши per-file `Cache-Control` единым TTL и PWA-обновления/`sitemap` протухнут.
6. Скопируй **ID ресурса** (`CDN_RESOURCE_ID`) — отдашь мне для `.env.deploy` (шаг 3).
   Скопируй также **CNAME-цель** ресурса (вида `cl-….gcdn.co`) — понадобится в 1.4.

### 1.4 DNS (у регистратора домена)
1. `wh-rules.ru` → **CNAME** (или ANAME/ALIAS для корня, если регистратор поддерживает) на
   CNAME-цель CDN из 1.3. (Если только A-запись для корня — используй IP, что даёт консоль CDN.)
2. `www.wh-rules.ru` → CNAME на ту же цель.
3. `api.wh-rules.ru` → CNAME на домен API-gateway (см. шаг 2 — я подскажу цель после настройки бэка).
4. `_acme-challenge…` записи из 1.1 (если ещё не добавил).

### 1.5 API-домен (Yandex API Gateway / функция)
1. К API-gateway (или тому, что отдаёт текущий `api.wh11ed.ru`) добавь **пользовательский домен**
   `api.wh-rules.ru` с сертификатом из 1.1.
2. Дай мне итоговую CNAME-цель для DNS (1.4 п.3), если она отличается.

**Когда 1.1–1.5 готовы — пришли мне: `CDN_RESOURCE_ID`, имя бакета (`wh-rules.ru`), и подтверждение,
что сертификаты в статусе Issued.** После этого — шаги 2–3.

---

## Шаг 2 — бэкенд `wh11ed-api` (Я готовлю ветку, деплой — по твоей отмашке)

- Добавить `https://wh-rules.ru` в список разрешённых **CORS-origin** (старый `https://wh11ed.ru`
  оставить на время перехода — оба origin активны).
- Домен auth-cookie / `OAuth redirect` → новый; сохранить `SameSite=None; Secure`.
- Проверить, что `domain/game.ts` (валидатор конверта партии) не задет — он домен-независим.

**Этот шаг деплоится ПЕРВЫМ (до фронта).** Пока бэк не принимает новый origin — новый домен не сможет логиниться.

---

## Шаг 3 — катовер фронта (Я)

После шага 2 (бэк уже принимает оба origin):
1. `.env.deploy`: добавить
   ```
   VITE_SITE_ORIGIN=https://wh-rules.ru
   VITE_API_BASE_URL=https://api.wh-rules.ru
   BUCKET=s3://wh-rules.ru
   CDN_RESOURCE_ID=<новый id из 1.3>
   ```
2. Точечные правки: `index.html` (og:image/twitter/JSON-LD), `public/robots.txt` (Sitemap URL).
3. `npm run deploy` → сборка с новым origin, заливка в бакет `wh-rules.ru`, пурж нового CDN.
4. Проверка: `curl -sI https://wh-rules.ru/` (200, Cache-Control), canonical на нескольких страницах,
   логин + облачный бэкап работают.

---

## Шаг 4 — 301, OAuth, Search Console

**4a — 301-редирект со старого домена (Я, через `yc`).** Всё в Яндекс Облаке, доступ есть:
```bash
yc storage bucket update --name wh11ed.ru \
  --website-settings '{"redirect_all_requests":{"protocol":"https","hostname":"wh-rules.ru"}}'
yc storage bucket update --name www.wh11ed.ru \
  --website-settings '{"redirect_all_requests":{"protocol":"https","hostname":"wh-rules.ru"}}'
yc cdn cache purge --resource-id bc8raqgpcdeagfb6ygn6 --path '/*'   # старый CDN
```
Постоянный, путь сохраняется, оставить бессрочно (старые ссылки/закладки/выдача).

**4b — OAuth redirect URIs (ТЫ — это oauth.yandex.ru, не Облако, `yc` туда не ходит).** В настройках
OAuth-приложения добавить redirect URI `https://api.wh-rules.ru/auth/yandex/callback` (тот же путь,
что у `api.wh11ed.ru`); старый пока оставить.

**4c — Google Search Console (ТЫ — Google-аккаунт).** Добавить и подтвердить ресурс `wh-rules.ru`
(подтверждение DNS-TXT — дай значение, добавлю запись в зону через `yc`) → инструмент **Change of
Address** со старого на новый → пересабмитить `https://wh-rules.ru/sitemap.xml`.

---

## Порядок (сводка) и риск

```
Шаг 1 (инфра — СДЕЛАНО) → Шаг 2 (бэк-катовер, я, деплой ПЕРВЫМ) → Шаг 3 (фронт-катовер, я)
  → Шаг 4a (301, я) → Шаг 4b/4c (OAuth + GSC, ты — внешние консоли)
```

**Риск №1:** фронт на `wh-rules.ru` раньше, чем бэк добавил CORS-origin → ломается логин и
облачный бэкап. Поэтому шаг 2 строго до шага 3.
**Риск №2:** CDN не в режиме honor-origin → протухают PWA-обновления и sitemap. Проверить в 1.3.5.
