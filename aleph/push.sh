#!/bin/sh
# Push solo a MAXIMILIANOTARANTO/aleph-semilla.
set -eu
REPO='MAXIMILIANOTARANTO/aleph-semilla'
url=$(git remote get-url origin)
case "$url" in
  *"github.com:$REPO"|*"github.com/$REPO"|*"github.com/$REPO.git") ;;
  *) echo "remoto fuera de $REPO: $url" >&2; exit 1 ;;
esac
if git grep -I -n -e 'github_pat_' -e 'ghp_' -e 'BEGIN OPENSSH PRIVATE KEY' -- . >/dev/null 2>&1; then
  echo 'hay una llave en el árbol; no se pushea' >&2
  exit 1
fi
branch=$(git rev-parse --abbrev-ref HEAD)
git push origin "HEAD:main"
echo "pushed $branch a $REPO"
