# Деплой

Сайт хостится в бакете **Yandex Object Storage** (домен `wh-rules.ru`), перед
бакетом стоит **Yandex CDN**. Выкладка — скриптом `deploy.sh` (`npm run deploy`),
который собирает проект и заливает `dist/` с правильными заголовками
`Cache-Control`.

> **Цель деплоя ровно одна — `wh-rules.ru`.** Старый `wh11ed.ru` **заморожен** на
> последней выложенной сборке (v2.2.6, с баннером «переезжаем») и больше не
> обновляется: релизы туда не катим, `deploy-both.sh` удалён. Конфиг
> `.env.deploy.wh11ed` оставлен только как аварийный откат
> (`ENVFILE=.env.deploy.wh11ed BUMP=none npm run deploy`). Подробности и финальный
> катовер с 301 — в `MIGRATION.md`.

## Политика кэширования

| Что | Cache-Control | Почему |
|-----|---------------|--------|
| `assets/*` (хэш в имени) | `public, max-age=31536000, immutable` | имя меняется при каждой сборке → безопасно навсегда |
| картинки, favicon, шрифты, PWA-иконки | `public, max-age=31536000` | имена стабильные → год, но **без** `immutable` |
| `sw.js` / `registerSW.js` / `manifest.webmanifest` | `no-cache` | иначе апдейты PWA не долетают до клиентов |
| `robots.txt` / `sitemap.xml` | `public, max-age=3600` | краулеры должны быстро видеть изменения |
| `index.html` и SEO-ключи маршрутов | `public, max-age=3600` | входная точка; короткий TTL |

> ⚠️ `index.html` заливается через `aws s3 cp`, **не** `s3 sync`. У него стабильное
> имя и почти неизменный размер, поэтому эвристика `sync` (размер/mtime) молча
> пропускает его — и входная точка остаётся старой, ссылаясь на хэшированные
> `assets/*`, которые `sync --delete` (шаг 1) уже удалил → после purge сайт ломается.
> Не переписывай шаг 3 обратно на `sync` (так же, как `sw.js`/`manifest` идут через `cp`).

> ⚠️ Картинки в `/images/` и favicon кэшируются на год. Если меняешь картинку —
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

Бамп коммитится (`chore: release vX.Y.Z`) и пушится в `origin main` **после**
успешного деплоя — поэтому катить надо с `main` и с чистым рабочим деревом.

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
#   → cache-control: public, max-age=3600

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
