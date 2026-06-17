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

echo "▶ Building…"
npm run build

# 1) Hashed build assets — content-hashed names, safe to cache forever.
echo "▶ assets/  →  immutable, 1 year"
aws s3 sync dist/assets "$BUCKET/assets" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# 2) Everything else except HTML (favicon, /images/, fonts) — 1 year, but NOT
#    immutable: names are stable, so re-uploading the same name needs a CDN purge
#    to refresh the edge (browser copies still live up to a year — rename the file
#    when you change an image).
echo "▶ images/favicon  →  1 year"
aws s3 sync dist "$BUCKET" \
  --exclude "*.html" --exclude "assets/*" --exclude "*.DS_Store" \
  --cache-control "public, max-age=31536000" \
  --delete

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
