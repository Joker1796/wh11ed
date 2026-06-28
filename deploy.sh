#!/usr/bin/env bash
#
# Build + upload to Yandex Object Storage with correct per-file Cache-Control.
#
# Requires the S3-compatible AWS CLI configured with a Yandex static access key:
#   aws configure --profile yc      # key id + secret from a service account
# and the `yc` CLI (CDN purge runs automatically after upload — see CDN_RESOURCE_ID).
#
# Usage:
#   ./deploy.sh                       # build, upload, auto-purge prod CDN
#   CDN_RESOURCE_ID= ./deploy.sh      # skip the CDN purge
#
set -euo pipefail

# Local, gitignored deploy config (CDN_RESOURCE_ID, optional BUCKET/AWS_PROFILE/…).
# Copy .env.deploy.example → .env.deploy and fill it in. Existing env vars win.
if [ -f .env.deploy ]; then set -a; . ./.env.deploy; set +a; fi

BUCKET="${BUCKET:-s3://wh11ed.ru}"
ENDPOINT="https://storage.yandexcloud.net"
AWS_PROFILE="${AWS_PROFILE:-yc}"
# Prod CDN resource — purge runs automatically after every deploy (a stale edge
# copy of sw.js/index.html otherwise blocks updates from ever reaching clients).
# Set it in .env.deploy (or inline). Empty → the purge is skipped with a warning.
CDN_RESOURCE_ID="${CDN_RESOURCE_ID-}"
# `yc` isn't always on PATH; the default Yandex installer drops it under ~/yandex-cloud/bin.
YC_BIN="${YC_BIN:-$(command -v yc || echo "$HOME/yandex-cloud/bin/yc")}"

aws() { command aws --endpoint-url="$ENDPOINT" --profile "$AWS_PROFILE" "$@"; }

# 0) Bump the patch version (package.json) before building, so each deploy ships a
#    new version number. Override the segment with BUMP=minor|major ./deploy.sh.
#    --no-git-tag-version: this dir isn't a git repo, so don't commit/tag.
#    Use BUMP=none to deploy the current version as-is (e.g. when it was set in the commit).
BUMP="${BUMP:-patch}"
if [ "$BUMP" = "none" ]; then
  echo "▶ Skipping version bump (BUMP=none); shipping v$(node -p "require('./package.json').version")"
else
  echo "▶ Bumping version ($BUMP)…"
  NEW_VERSION="$(npm version "$BUMP" --no-git-tag-version)"
  echo "  → $NEW_VERSION"
fi

# Point the SPA at the production API. Vite inlines VITE_API_BASE_URL at build time;
# without it config.js falls back to http://localhost:8787 and the deployed app can't reach the API.
echo "▶ Building… (API: ${VITE_API_BASE_URL:=https://api.wh11ed.ru})"
export VITE_API_BASE_URL
npm run build

# 1) Hashed build assets — content-hashed names, safe to cache forever.
echo "▶ assets/  →  immutable, 1 year"
aws s3 sync dist/assets "$BUCKET/assets" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# 2) Everything else except HTML (favicon, /images/, fonts, PWA icons) — 1 year, but
#    NOT immutable: names are stable, so re-uploading the same name needs a CDN purge
#    to refresh the edge (browser copies still live up to a year — rename the file
#    when you change an image). The PWA service worker + manifest are re-set in step 3.
echo "▶ images/favicon/icons  →  1 year"
aws s3 sync dist "$BUCKET" \
  --exclude "*.html" --exclude "assets/*" --exclude "*.DS_Store" \
  --exclude "sw.js" --exclude "registerSW.js" --exclude "manifest.webmanifest" \
  --exclude "robots.txt" --exclude "sitemap.xml" \
  --cache-control "public, max-age=31536000" \
  --delete

# 2b) PWA service worker + manifest — MUST revalidate so updates reach clients.
#     Excluded from step 2 to prevent CDN from caching them with a 1-year TTL.
echo "▶ sw.js / registerSW.js / manifest  →  no-cache"
set_nocache() { # <file> <content-type>
  # `if`, not `[ -f ] && …`: under `set -e` a missing file (e.g. no registerSW.js in
  # PWA prompt mode) makes the `&&` return non-zero and aborts the whole deploy before
  # index.html (step 3) and the CDN step ever run.
  if [ -f "dist/$1" ]; then
    aws s3 cp "dist/$1" "$BUCKET/$1" \
      --cache-control "no-cache" \
      --content-type "$2" \
      --metadata-directive REPLACE
  fi
}
set_nocache sw.js "application/javascript; charset=utf-8"
set_nocache registerSW.js "application/javascript; charset=utf-8"
set_nocache manifest.webmanifest "application/manifest+json; charset=utf-8"

# 2c) SEO files — short TTL so crawlers pick up changes quickly. Excluded from the
#     1-year tier (step 2): a stale robots/sitemap can otherwise be served for a year.
echo "▶ robots.txt / sitemap.xml  →  1 hour"
set_shortcache() { # <file> <content-type>
  if [ -f "dist/$1" ]; then
    aws s3 cp "dist/$1" "$BUCKET/$1" \
      --cache-control "public, max-age=3600" \
      --content-type "$2" \
      --metadata-directive REPLACE
  fi
}
set_shortcache robots.txt "text/plain; charset=utf-8"
set_shortcache sitemap.xml "application/xml; charset=utf-8"

# 3) index.html — entry point. Short TTL (1h) so a deploy is discovered quickly by
#    the SW bootstrap and non-SW browsers (under SW control, navigations come from
#    precache, so this mostly speeds up first-paint freshness after a deploy).
#    Use `cp`, NOT `sync`: index.html keeps a stable name and near-constant size, so
#    `s3 sync` silently skips re-uploading it (its size/mtime heuristic sees "no
#    change") — leaving a stale entry point pointing at hashed assets that step 1's
#    `--delete` already removed. `cp` always uploads. (Same reason sw.js uses cp.)
echo "▶ index.html  →  1 hour"
if [ -f "dist/index.html" ]; then
  aws s3 cp dist/index.html "$BUCKET/index.html" \
    --cache-control "public, max-age=3600" \
    --content-type "text/html; charset=utf-8" \
    --metadata-directive REPLACE
fi

# 4) Drop the CDN edge copy of the entry point (and anything stale).
#    `if …; then` so a purge failure warns instead of aborting (the upload is done).
if [ -n "$CDN_RESOURCE_ID" ]; then
  echo "▶ Purging CDN $CDN_RESOURCE_ID"
  if "$YC_BIN" cdn cache purge --resource-id "$CDN_RESOURCE_ID" --path "/*"; then
    echo "  CDN purged"
  else
    echo "⚠ CDN purge failed (yc: $YC_BIN). Purge manually:"
    echo "    yc cdn cache purge --resource-id $CDN_RESOURCE_ID --path '/*'"
  fi
else
  echo "⚠ CDN_RESOURCE_ID empty — skipping purge; do it manually for / and /index.html"
fi

echo "✔ Done."
