#!/usr/bin/env bash
#
# Build + upload to Yandex Object Storage with correct per-file Cache-Control.
#
# Requires the S3-compatible AWS CLI configured with a Yandex static access key:
#   aws configure --profile yc      # key id + secret from a service account
# and (optional) `yc` CLI for CDN purge.
#
# Usage:
#   BUCKET=s3://wh11ed.ru CDN_RESOURCE_ID=bc8xxxx ./deploy.sh
#
set -euo pipefail

BUCKET="${BUCKET:-s3://wh11ed.ru}"
ENDPOINT="https://storage.yandexcloud.net"
AWS_PROFILE="${AWS_PROFILE:-yc}"
CDN_RESOURCE_ID="${CDN_RESOURCE_ID:-}"

aws() { command aws --endpoint-url="$ENDPOINT" --profile "$AWS_PROFILE" "$@"; }

# 0) Bump the patch version (package.json) before building, so each deploy ships a
#    new version number. Override the segment with BUMP=minor|major ./deploy.sh.
#    --no-git-tag-version: this dir isn't a git repo, so don't commit/tag.
BUMP="${BUMP:-patch}"
echo "▶ Bumping version ($BUMP)…"
NEW_VERSION="$(npm version "$BUMP" --no-git-tag-version)"
echo "  → $NEW_VERSION"

echo "▶ Building…"
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
  --cache-control "public, max-age=31536000" \
  --delete

# 2b) PWA service worker + manifest — MUST revalidate so updates reach clients.
#     Excluded from step 2 to prevent CDN from caching them with a 1-year TTL.
echo "▶ sw.js / registerSW.js / manifest  →  no-cache"
set_nocache() { # <file> <content-type>
  [ -f "dist/$1" ] && aws s3 cp "dist/$1" "$BUCKET/$1" \
    --cache-control "no-cache" \
    --content-type "$2" \
    --metadata-directive REPLACE
}
set_nocache sw.js "application/javascript; charset=utf-8"
set_nocache registerSW.js "application/javascript; charset=utf-8"
set_nocache manifest.webmanifest "application/manifest+json; charset=utf-8"

# 3) index.html — entry point. Short TTL so rare deploys appear within a day.
echo "▶ index.html  →  1 day"
aws s3 sync dist "$BUCKET" \
  --exclude "*" --include "*.html" \
  --cache-control "public, max-age=86400" \
  --content-type "text/html; charset=utf-8"

# 4) Drop the CDN edge copy of the entry point (and anything stale).
if [ -n "$CDN_RESOURCE_ID" ]; then
  echo "▶ Purging CDN $CDN_RESOURCE_ID"
  yc cdn cache purge --resource-id "$CDN_RESOURCE_ID" --path "/*"
else
  echo "⚠ CDN_RESOURCE_ID not set — purge the CDN cache manually for / and /index.html"
fi

echo "✔ Done."
