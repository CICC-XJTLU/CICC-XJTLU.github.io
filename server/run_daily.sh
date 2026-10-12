#!/bin/bash
set -euo pipefail
BASE=/home/ubuntu/cicc-platform
REPO="$BASE/site"
mkdir -p "$BASE/state" "$BASE/logs" "$BASE/snapshots"
exec 9>"$BASE/state/update.lock"
flock -n 9 || { echo 'Another update is active; skipped.'; exit 0; }
export GIT_SSH_COMMAND="ssh -i $BASE/keys/github_ed25519 -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile=$BASE/keys/known_hosts -o ConnectTimeout=20"
cd "$REPO"
if [ -n "$(git status --porcelain)" ]; then echo 'Uncommitted files found; refusing to replace local work.' >&2; exit 1; fi
if ! git pull --rebase origin main; then
  git rebase --abort 2>/dev/null || true
  echo 'Remote changes require reconciliation; local data preserved.' >&2
  exit 1
fi
stamp=$(date -u +%Y%m%dT%H%M%SZ)
tar -czf "$BASE/snapshots/data-$stamp.tar.gz" data/publications.json data/news.json
python3 server/update_catalog.py --root "$REPO" --state-dir "$BASE/state" 2>&1 | tee "$BASE/logs/update-$stamp.log"
git add -- data/publications.json data/news.json
if git diff --cached --quiet; then
  echo 'Catalogue unchanged; retrying any unpublished commit.'
else
  git commit -m "Update publications and news ($(date +%F))"
fi
git push origin HEAD:main
printf 'DAILY_UPDATE_PUBLISHED\n'
