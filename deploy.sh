#!/usr/bin/env bash
#
# Build + upload to Yandex Object Storage with correct per-file Cache-Control.
#
# TARGET: wh-rules.ru — the one live domain. The old wh11ed.ru is FROZEN on its last build
# (v2.2.6, carrying the "we're moving" banner) and is NOT redeployed; see MIGRATION.md.
# `.env.deploy.wh11ed` is kept only as a rollback escape hatch (ENVFILE=.env.deploy.wh11ed),
# never as part of a normal release.
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
# ENVFILE overrides the source — only needed for the frozen old domain (rollback).
ENVFILE="${ENVFILE:-.env.deploy}"
if [ -f "$ENVFILE" ]; then set -a; . "./$ENVFILE"; set +a; fi

BUCKET="${BUCKET:-s3://wh-rules.ru}"
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
#    Use BUMP=none to deploy the current version as-is (e.g. when it was set in the commit).
#    Otherwise the bump is committed (`chore: release vX.Y.Z`) and pushed to origin main
#    once the deploy succeeds (see step 5) — so run this from main with a clean tree.
BUMP="${BUMP:-patch}"
if [ "$BUMP" = "none" ]; then
  echo "▶ Skipping version bump (BUMP=none); shipping v$(node -p "require('./package.json').version")"
else
  BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  if [ "$BRANCH" != "main" ]; then
    echo "✗ Refusing to bump+commit the version: not on main (on '$BRANCH')." >&2
    echo "  Switch to main, or run with BUMP=none to deploy without touching git." >&2
    exit 1
  fi
  if [ -n "$(git status --porcelain -- . ':!package.json' ':!package-lock.json')" ]; then
    echo "✗ Refusing to bump+commit the version: working tree has unrelated uncommitted changes:" >&2
    git status --short -- . ':!package.json' ':!package-lock.json' >&2
    exit 1
  fi
  echo "▶ Bumping version ($BUMP)…"
  NEW_VERSION="$(npm version "$BUMP" --no-git-tag-version)"
  echo "  → $NEW_VERSION"
fi

# Point the SPA at the production API. Vite inlines VITE_API_BASE_URL at build time;
# without it config.js falls back to http://localhost:8787 and the deployed app can't reach the API.
echo "▶ Building… (API: ${VITE_API_BASE_URL:=https://api.wh-rules.ru})"
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
#
#    SEO route keys (step 3b) live in the bucket but NOT in dist/, so this sync's
#    `--delete` would remove them. Exclude every route's top-level segment (derived
#    from dist/.seo-routes.txt, so new sections are picked up automatically).
ROUTE_EXCLUDES=()
if [ -f dist/.seo-routes.txt ]; then
  while IFS= read -r seg; do
    [ -n "$seg" ] && ROUTE_EXCLUDES+=(--exclude "$seg" --exclude "$seg/*")
  done < <(cut -d/ -f2 dist/.seo-routes.txt | sort -u)
fi
echo "▶ images/favicon/icons  →  1 year"
aws s3 sync dist "$BUCKET" \
  --exclude "*.html" --exclude "assets/*" --exclude "*.DS_Store" \
  --exclude "sw.js" --exclude "registerSW.js" --exclude "manifest.webmanifest" \
  --exclude "robots.txt" --exclude "sitemap.xml" --exclude ".seo-routes.txt" \
  ${ROUTE_EXCLUDES[@]+"${ROUTE_EXCLUDES[@]}"} \
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
# Search-engine ownership verification files (step 2 excludes *.html, so list them here).
# `if`, not `[ -f ] && …` — same set -e trap as set_nocache (unmatched glob stays literal).
for vf in dist/yandex_*.html dist/google*.html; do
  if [ -f "$vf" ]; then set_shortcache "$(basename "$vf")" "text/html; charset=utf-8"; fi
done

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

# 3b) SEO route keys — an index.html copy under every public route path (from
#     dist/.seo-routes.txt, generated by scripts/gen-seo-routes.mjs during the build),
#     so deep links like /introduction or /factions/necrons return HTTP 200 instead of
#     the ErrorDocument's 404 — crawlers don't index 404s. Keys are extension-less, so
#     the content-type must be forced. Removed routes leave stale keys behind; that's
#     harmless (they serve index.html → the SPA's catch-all shows its 404 view, noindex).
echo "▶ SEO route keys  →  index.html copies, 1 hour"
if [ -f dist/.seo-routes.txt ] && [ -f dist/index.html ]; then
  # S3 allows a key to be both an "object" and a "directory" (event-companion AND
  # event-companion/sequence); a local filesystem mirror can't. So keys that are a
  # prefix of other keys ("parents", a handful) upload one-by-one via `cp`, and the
  # leaf keys go through a single fast `sync` from a temp mirror.
  MIRROR="$(mktemp -d)"
  trap 'rm -rf "$MIRROR"' EXIT
  PARENTS=0
  MISSING=0
  while IFS= read -r route; do
    [ -n "$route" ] || continue
    key="${route#/}"
    # Each route now has its OWN html (real title, description, canonical and body) generated into
    # seo-html/ by gen-seo-routes.mjs. It lives outside dist/ on purpose: vite's globPatterns
    # precaches **/*.html, and 3141 pages in the service worker's precache would wreck the
    # "light tab" requirement. Fall back to the plain shell if a page is somehow absent — a
    # generic page is bad, a 404 is worse.
    SRC="seo-html/$key.html"
    if [ ! -f "$SRC" ]; then SRC="dist/index.html"; MISSING=$((MISSING + 1)); fi
    if grep -q "^/$key/" dist/.seo-routes.txt; then
      aws s3 cp "$SRC" "$BUCKET/$key" \
        --cache-control "public, max-age=3600" \
        --content-type "text/html; charset=utf-8" \
        --metadata-directive REPLACE >/dev/null
      PARENTS=$((PARENTS + 1))
    else
      mkdir -p "$MIRROR/$(dirname "$key")"
      cp "$SRC" "$MIRROR/$key"
    fi
  done < dist/.seo-routes.txt
  [ "$MISSING" -gt 0 ] && echo "  ⚠ $MISSING route(s) had no generated page — uploaded the plain shell"

  # Fresh mtimes on every mirror file ⇒ sync always uploads them.
  aws s3 sync "$MIRROR" "$BUCKET" \
    --cache-control "public, max-age=3600" \
    --content-type "text/html; charset=utf-8"
  echo "  → $(wc -l < dist/.seo-routes.txt | tr -d ' ') route keys uploaded ($PARENTS parents via cp)"
else
  echo "⚠ dist/.seo-routes.txt missing — SEO route keys not uploaded"
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

# 5) Commit + push the version bump, now that the deploy actually succeeded (the branch/
#    clean-tree check already happened in step 0, so this is just recording what shipped).
if [ "$BUMP" != "none" ]; then
  echo "▶ Committing + pushing version bump…"
  git add package.json package-lock.json
  git commit -m "chore: release v$(node -p "require('./package.json').version")"
  git push origin main
fi

echo "✔ Done."
