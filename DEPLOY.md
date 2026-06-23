# Деплой

Сайт хостится в бакете **Yandex Object Storage** (домен `wh11ed.ru`), перед
бакетом стоит **Yandex CDN**. Выкладка — скриптом `deploy.sh` (`npm run deploy`),
который собирает проект и заливает `dist/` с правильными заголовками
`Cache-Control`.

## Политика кэширования

| Что | Cache-Control | Почему |
|-----|---------------|--------|
| `assets/*` (хэш в имени) | `public, max-age=31536000, immutable` | имя меняется при каждой сборке → безопасно навсегда |
| `index.html` | `public, max-age=86400` (1 день) | входная точка; короткий TTL, чтобы редкие апдейты долетали за сутки |
| картинки, favicon, шрифты | `public, max-age=31536000` | имена стабильные → год, но **без** `immutable` |

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

## Настройка CDN-ресурса (в консоли, один раз)

CDN-ресурс `wh11ed.ru` → **Кэширование**:

- Включить кэширование, режим — **«согласно заголовкам origin»** (honor
  `Cache-Control`), чтобы CDN уважал заголовки из бакета.
- **Не** включать «игнорировать Cache-Control».
- Если опции honor-origin нет — задать дефолтный TTL ~`600s`; ассеты всё равно
  версионируются именами, а свежесть `index.html` обеспечивает purge при деплое.

## Выкладка

```bash
# минимум
npm run deploy

# с явными параметрами
BUCKET=s3://wh11ed.ru \
CDN_RESOURCE_ID=bc8raqgpcdeagfb6ygn6 \
AWS_PROFILE=yc \
npm run deploy
```

### Версия (`BUMP`)

`deploy.sh` по умолчанию делает `BUMP=patch` — `npm run deploy` **сам поднимает**
`package.json` (1.2.0 → 1.2.1) перед сборкой. Варианты:

- `BUMP=minor` / `BUMP=major` — поднять соответствующий сегмент;
- `BUMP=none npm run deploy` — выложить **текущую** версию как есть (когда номер уже
  выставлен в коммите/`package.json` и автобамп не нужен).

### Сброс кэша CDN

ID prod-ресурса CDN: **`bc8raqgpcdeagfb6ygn6`** (cname `wh11ed.ru`).

Если задан `CDN_RESOURCE_ID`, скрипт сам сделает `yc cdn cache purge … --path "/*"`.
Иначе (по умолчанию `CDN_RESOURCE_ID` не задан) — почистить кэш вручную:

```bash
yc cdn cache purge --resource-id bc8raqgpcdeagfb6ygn6 --path '/*'
```

Без purge новая сборка пользователям не долетит (CDN отдаёт старый `index.html`).

## Проверка после деплоя

```bash
curl -sI https://wh11ed.ru/ | grep -i cache-control
#   → cache-control: public, max-age=86400

curl -sI https://wh11ed.ru/assets/<хэш>.js | grep -i cache-control
#   → cache-control: public, max-age=31536000, immutable
```

Убедиться, что живой `index.html` ссылается на ассеты из **текущей** сборки
(ловит баг «sync пропустил index.html» и битый origin):

```bash
# хэш в live index.html (после purge) должен совпасть с локальным dist/
curl -s https://wh11ed.ru/ | grep -oE 'assets/index-[A-Za-z0-9_-]+\.js' | head -1
grep -oE 'assets/index-[A-Za-z0-9_-]+\.js' dist/index.html | head -1
```

> Уже выданные клиентам ответы с прежним годовым TTL ретроактивно не сбросить —
> только истечение TTL или hard-reload. Purge CDN и новые заголовки действуют на
> новые заходы.
