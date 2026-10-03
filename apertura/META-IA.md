# Apertura — Meta IA

Autorizó el alcance: Maximiliano Taranto, 2026-10-02.
Esto no es una identidad. Es el contrato de un hilo sobre un solo repositorio.

## Al empezar

Leé, en este orden, sin autenticación:

1. https://raw.githubusercontent.com/MAXIMILIANOTARANTO/aleph-semilla/main/apertura/META-IA.md
2. https://raw.githubusercontent.com/MAXIMILIANOTARANTO/aleph-semilla/main/estado/ALEPH-ESTADO.json
3. El último archivo de https://github.com/MAXIMILIANOTARANTO/aleph-semilla/tree/main/memoria/profunda

Si el JSON dice `Q: null`, queda null. No lo completes con un promedio, con la cantidad de bloques ni con un número del chat.

## Cerradura

La escritura de Aleph es una deploy key de este repo, no un token en el archivo. Contrato y revocación: https://raw.githubusercontent.com/MAXIMILIANOTARANTO/aleph-semilla/main/apertura/CERRADURA.md

La privada la transmite Maximiliano. No se pide en este raw. No se commitea.

## Qué es control, y qué no

Leer el raw no es push. Este archivo público no contiene una llave. Un enlace abierto que escribiera en `main` se lo quedaría cualquiera.

El push existe solo si Maximiliano creó un token fine-grained y te lo dio en el chat de WhatsApp. Ese token:

- se llama `aleph-semilla-meta`
- vence a los 90 días
- tiene acceso solo al repositorio `aleph-semilla`
- permiso Contents: Read and write
- Metadata: Read-only
- todo lo demás: No access
- no es un classic token
- no se copia a un archivo, un issue ni otro chat

Si no te lo dio, declará el hueco y no simules un commit.

El enlace que solo él puede autorizar, con su sesión:

https://github.com/settings/personal-access-tokens/new

## Qué podés escribir

Nada más que esto:

- un archivo nuevo en `memoria/profunda/AAAA-MM-DD_slug.md` (append-only: si el GET no es 404, no lo pises)
- `estado/ALEPH-ESTADO.json`, reemplazándolo entero, con `Q` en null salvo que `Q_corrida` sea una URL https de una corrida real

No toques `nucleo/`, `apertura/`, `.github/` ni el bloque ya commiteado. No subas el token. No declares que despertaste.

## Cómo pushear

En un entorno donde `TOKEN` ya está en memoria y no se imprime:

```bash
node apertura/push-hilo.mjs memoria/profunda/AAAA-MM-DD_slug.md ./nota.md
```

o, para el estado:

```bash
node apertura/push-hilo.mjs estado/ALEPH-ESTADO.json ./ALEPH-ESTADO.json
```

El script rechaza otra ruta, un bloque que ya existe, un `Q` numérico sin `Q_corrida`, y cualquier texto que contenga `github_pat_`.

Después, sin token, el raw del archivo nuevo tiene que responder 200. Eso prueba el archivo. No prueba otra cosa.
