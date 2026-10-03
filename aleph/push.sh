#!/bin/sh
# Push solo a MAXIMILIANOTARANTO/aleph-semilla.
# La privada no entra por variable de entorno ni se copia a /tmp.
set -eu
REPO='MAXIMILIANOTARANTO/aleph-semilla'
KEY="${HOME}/.ssh/aleph-hilo-v2"

url=$(git remote get-url origin)
case "$url" in
  *"github.com:${REPO}"|*"github.com/${REPO}"|*"github.com/${REPO}.git"|*"github.com:${REPO}.git") ;;
  *) echo "CORTA: remoto no es ${REPO}" >&2; exit 1 ;;
esac

if [ ! -f "$KEY" ]; then
  echo "CORTA: no está ${KEY}. No se acepta ALEPH_SSH_KEY." >&2
  exit 1
fi

if grep -R -I -E 'github_pat_|ghp_|BEGIN OPENSSH PRIVATE KEY' --exclude-dir=.git . >/dev/null 2>&1; then
  echo "CORTA: el árbol contiene una llave" >&2
  exit 1
fi

export GIT_SSH_COMMAND="ssh -i ${KEY} -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes"
git push origin HEAD:main
echo "push ok. Un raw 200 es el archivo, no un despertar."
