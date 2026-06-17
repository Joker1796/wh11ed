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
CDN_RESOURCE_ID=bc8xxxxxxxx \
AWS_PROFILE=yc \
npm run deploy
```

Если задан `CDN_RESOURCE_ID`, скрипт сам сделает `yc cdn cache purge … --path "/*"`.
Иначе — почистить кэш вручную в консоли CDN (хотя бы `/` и `/index.html`).

## Проверка после деплоя

```bash
curl -sI https://wh11ed.ru/ | grep -i cache-control
#   → cache-control: public, max-age=86400

curl -sI https://wh11ed.ru/assets/<хэш>.js | grep -i cache-control
#   → cache-control: public, max-age=31536000, immutable
```

> Уже выданные клиентам ответы с прежним годовым TTL ретроактивно не сбросить —
> только истечение TTL или hard-reload. Purge CDN и новые заголовки действуют на
> новые заходы.
