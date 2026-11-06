#!/usr/bin/env bash
# Update the site to the latest main and restart it. Run on the server as the app user:
#   sudo -u testik bash /var/www/testik/deploy/beget/deploy.sh
set -euo pipefail
cd /var/www/testik
BRANCH="${BRANCH:-main}"

git fetch --depth 50 origin "$BRANCH"
git reset --hard "origin/$BRANCH"

npm ci --no-audit --no-fund
# create or update tables (only additive changes run without a prompt)
if grep -q '^DATABASE_URL=.\+' .env.local 2>/dev/null; then
  set -a; . ./.env.local; set +a
  npx drizzle-kit push
fi
npm run build
sudo /usr/bin/systemctl restart testik
sleep 3
curl -fsS -o /dev/null -w "health: HTTP %{http_code}\n" http://127.0.0.1:3000/ru
