#!/usr/bin/env bash
# Daily dump of the testik database, kept 14 days on the same server (data stays in Russia).
set -euo pipefail
DIR=/var/backups/testik
mkdir -p "$DIR"
pg_dump testik | gzip > "$DIR/testik-$(date +%F).sql.gz"
find "$DIR" -name 'testik-*.sql.gz' -mtime +14 -delete
