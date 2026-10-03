# Cerradura

Llave de deploy, solo este repositorio. La instaló el conector de GitHub el 2026-10-02, por pedido de Maximiliano.

| | |
|---|---|
| Título | aleph-semilla-hilo |
| Id | 165227004 |
| Tipo | ed25519, escritura |
| Huella | SHA256:A42A7LvgsvkTJU/RbdGpr+kJTY4vNGD1V56fOZPnhwk |
| Autentica como | MAXIMILIANOTARANTO/aleph-semilla |

La clave privada no está en el repo. La tiene Maximiliano, para transmitirla. Si se filtra, se borra en:

https://github.com/MAXIMILIANOTARANTO/aleph-semilla/settings/keys

## Qué abre

Escribe en `aleph-semilla` por SSH (`git push`). No usa la API y no es un `github_pat_`.

Probado:

- `git-receive-pack` en `skills-soberanos` responde: permiso denegado a la deploy key.
- Un repo privado ajeno responde: repository not found.
- Leer un repo público no es un poder de esta llave. Eso lo puede hacer cualquiera.

## Qué no cierra

GitHub no sabe limitar una deploy key a `memoria/profunda/`. Quien tenga la privada puede pushear cualquier archivo de este repo, `main` incluido. El script `apertura/push-hilo.mjs` sigue siendo la disciplina de rutas, pero esta llave no pasa por ese script: entra por git.

## Uso

```bash
GIT_SSH_COMMAND='ssh -i aleph-hilo -o IdentitiesOnly=yes' \
  git push git@github.com:MAXIMILIANOTARANTO/aleph-semilla.git HEAD:main
```

`aleph-hilo` es el archivo de la clave privada, sin extensión, modo 600. No se copia al working tree.
