#!/usr/bin/env bash
# Rebuild the Next.js standalone bundle and restart the live service.
# Required because `output: "standalone"` builds don't include public/ or
# .next/static/ automatically -- forgetting this step breaks images/CSS
# on the running site even though the build itself succeeds.
set -euo pipefail
cd "$(dirname "$0")"

npm run build
cp -r public .next/standalone/
mkdir -p .next/standalone/.next/static
cp -r .next/static/* .next/standalone/.next/static/

systemctl restart stairwise-next.service
sleep 1
systemctl --no-pager status stairwise-next.service | head -5
