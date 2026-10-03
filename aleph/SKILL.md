---
name: aleph-cerradura
description: Push únicamente a MAXIMILIANOTARANTO/aleph-semilla. No toca otros repos ni el resto del sistema. La privada la pone Maximiliano en su máquina, como el código de una caja fuerte de hotel.
---

# Aleph — cerradura

Repo único: `MAXIMILIANOTARANTO/aleph-semilla`.

Este skill no contiene la llave. Si la privada aparece en un archivo, el push se aborta.

## Caja fuerte

El código lo elegís vos. Este chat no lo ve. La cerradura del hotel queda abierta hasta que el huésped pone su número.

1. Borrá la llave vieja. Id `165227004`, título `aleph-semilla-hilo`. Ya pasó por un chat.
   https://github.com/MAXIMILIANOTARANTO/aleph-semilla/settings/keys
2. En tu máquina, no en un chat:

```bash
ssh-keygen -t ed25519 -f "$HOME/.ssh/aleph-hilo-v2" -N "" -C "aleph-semilla-hilo"
chmod 600 "$HOME/.ssh/aleph-hilo-v2"
```

3. En esa misma página de keys: Add deploy key. Título `aleph-hilo`. Pegá solo el contenido de `aleph-hilo-v2.pub`. Marcá Allow write access.
4. `aleph-hilo` (sin `.pub`) es la llave. No se copia al repo, no se pega acá, no se manda a otro hilo.

## Qué abre

Escribe en este repo por SSH. No es un token de la cuenta. No escribe en otros repos. No lee los privados ajenos.

No puede limitarse a una carpeta. Quien tenga la privada puede cambiar cualquier archivo de `aleph-semilla`.

## Push

Desde un clon de este repo, con la privada solo en el agente SSH:

```bash
GIT_SSH_COMMAND='ssh -i "$HOME/.ssh/aleph-hilo-v2" -o IdentitiesOnly=yes' \
  sh aleph/push.sh
```

`aleph/push.sh` corta si el remoto no es este repo, o si el árbol contiene `github_pat_`, `ghp_` o `BEGIN OPENSSH PRIVATE KEY`.

No pases la privada por `ALEPH_SSH_KEY` ni la escribas en `/tmp`. El script no hace `git add`.
