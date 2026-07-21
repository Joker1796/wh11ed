#!/usr/bin/env bash
#
# Ship the SAME release to both live domains in one run, so updates always land on both.
# The version is bumped once (on the first target); the second reuses it via BUMP=none, so both
# domains carry the identical version. Each target sources its own .env.deploy.<name>
# (bucket, CDN resource, API base, canonical origin) — see those files.
#
# Order is deliberate: wh-rules.ru first (the low-traffic new domain, acts as a canary). Under
# `set -e` a failure there aborts BEFORE the live-primary wh11ed.ru is touched, leaving real
# users on the known-good build.
#
# Usage:
#   ./deploy-both.sh                  # bump patch, ship to both
#   BUMP=minor ./deploy-both.sh       # bump minor
#   BUMP=none  ./deploy-both.sh       # ship the current version as-is to both
set -euo pipefail
cd "$(dirname "$0")"

echo "══ 1/2 → wh-rules.ru ═════════════════════════════════════════════"
BUMP="${BUMP:-patch}" ENVFILE=.env.deploy.wh-rules ./deploy.sh

echo ""
echo "══ 2/2 → wh11ed.ru ═══════════════════════════════════════════════"
BUMP=none ENVFILE=.env.deploy.wh11ed ./deploy.sh

echo ""
echo "✔ Both domains deployed at v$(node -p "require('./package.json').version")."
