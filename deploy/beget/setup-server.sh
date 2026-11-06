#!/usr/bin/env bash
# One-time setup of a fresh Beget VPS (Ubuntu 24.04) for testik.
# Run as root:  curl -fsSL https://raw.githubusercontent.com/MonsterOfBI/testik/main/deploy/beget/setup-server.sh | bash -s -- testik.ru
# or copy the file to the server and run:  bash setup-server.sh testik.ru
set -euo pipefail

DOMAIN="${1:?usage: setup-server.sh <domain>  (e.g. testik.ru)}"
REPO="${REPO:-https://github.com/MonsterOfBI/testik.git}"
APP_DIR=/var/www/testik
APP_USER=testik
NODE_MAJOR=22

echo "==> Swap (next build needs ~2 GB of memory)"
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y ca-certificates curl gnupg git nginx postgresql certbot python3-certbot-nginx ufw
if ! command -v node >/dev/null || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt "$NODE_MAJOR" ]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi

echo "==> Firewall"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> App user and code"
id "$APP_USER" >/dev/null 2>&1 || useradd --system --create-home --shell /bin/bash "$APP_USER"
mkdir -p "$APP_DIR"
chown "$APP_USER:$APP_USER" "$APP_DIR"
if [ ! -d "$APP_DIR/.git" ]; then
  sudo -u "$APP_USER" git clone "$REPO" "$APP_DIR"
fi

echo "==> PostgreSQL (database stays on this server in Russia: 152-ФЗ ст. 18 ч. 5)"
DB_PASS="$(openssl rand -hex 24)"
if ! sudo -u postgres psql -tAc "select 1 from pg_roles where rolname='testik'" | grep -q 1; then
  sudo -u postgres psql -c "create user testik with password '${DB_PASS}';"
  sudo -u postgres psql -c "create database testik owner testik;"
  NEW_DB=1
else
  NEW_DB=0
fi

ENV_FILE="$APP_DIR/.env.local"
if [ ! -f "$ENV_FILE" ]; then
  echo "==> Writing $ENV_FILE (fill in the empty values afterwards)"
  AUTH_SECRET="$(openssl rand -base64 33)"
  sed -e "s|^NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=https://${DOMAIN}|" \
      -e "s|^AUTH_URL=.*|AUTH_URL=https://${DOMAIN}|" \
      -e "s|^AUTH_SECRET=.*|AUTH_SECRET=${AUTH_SECRET}|" \
      "$APP_DIR/deploy/beget/env.production.example" > "$ENV_FILE"
  if [ "$NEW_DB" = 1 ]; then
    sed -i "s|^DATABASE_URL=.*|DATABASE_URL=postgres://testik:${DB_PASS}@127.0.0.1:5432/testik|" "$ENV_FILE"
  fi
  chown "$APP_USER:$APP_USER" "$ENV_FILE"
  chmod 600 "$ENV_FILE"
fi

echo "==> systemd service"
install -m 644 "$APP_DIR/deploy/beget/testik.service" /etc/systemd/system/testik.service
systemctl daemon-reload
systemctl enable testik
# the deploy script restarts the app as the app user
echo "$APP_USER ALL=(root) NOPASSWD: /usr/bin/systemctl restart testik, /usr/bin/systemctl status testik" > /etc/sudoers.d/testik
chmod 440 /etc/sudoers.d/testik

echo "==> Logs: keep at most 30 days (privacy policy, section 5)"
mkdir -p /etc/systemd/journald.conf.d
printf '[Journal]\nMaxRetentionSec=30day\n' > /etc/systemd/journald.conf.d/retention.conf
systemctl restart systemd-journald
sed -i 's/^\s*rotate .*/\trotate 14/' /etc/logrotate.d/nginx || true

echo "==> nginx"
sed "s/__DOMAIN__/${DOMAIN}/g" "$APP_DIR/deploy/beget/nginx.conf" > /etc/nginx/sites-available/testik
ln -sf /etc/nginx/sites-available/testik /etc/nginx/sites-enabled/testik
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> Daily database backup (kept 14 days, on this server)"
install -m 755 "$APP_DIR/deploy/beget/backup-db.sh" /usr/local/bin/testik-backup-db
echo "30 3 * * * postgres /usr/local/bin/testik-backup-db" > /etc/cron.d/testik-backup

cat <<MSG

Done. Next steps:
  1. Point the DNS A record of ${DOMAIN} (and www) to this server's IP and wait until it resolves.
  2. Fill in the empty values:   nano ${ENV_FILE}
     (OPERATOR_NAME, OPERATOR_EMAIL, VK and Yandex OAuth keys, Yandex Metrica id)
  3. Build and start:            sudo -u ${APP_USER} bash ${APP_DIR}/deploy/beget/deploy.sh
  4. HTTPS certificate:          certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --redirect -m <your email> --agree-tos
MSG
