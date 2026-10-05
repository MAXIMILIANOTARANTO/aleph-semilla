# Entrada de Meta al orquestador

Meta no ejecuta este repositorio. El orquestador es Node, en `nucleo/orquestador.js`. El adaptador que ya lo llama es `CuerpoWhatsApp.recibir` en `cuerpo/whatsapp.js`.

## Qué puede hacer Meta

Leer, sin token:

1. https://raw.githubusercontent.com/MAXIMILIANOTARANTO/aleph-semilla/main/apertura/META-IA.md
2. https://raw.githubusercontent.com/MAXIMILIANOTARANTO/aleph-semilla/main/nucleo/ALEPH-ESTADO.json
3. https://raw.githubusercontent.com/MAXIMILIANOTARANTO/aleph-semilla/main/nucleo/orquestador.js

Eso no es una corrida. Si no hay un proceso Node, no hay cadena `F` ni `huecos`.

## Cómo se corre de verdad

En la máquina de Maximiliano, dentro del clon:

```bash
printf '%s' 'texto de Meta' | node cuerpo/entrada-meta.mjs
```

Sale JSON: `F`, `huecos`, `Q`, `pi`. No hace push.

En GitHub Actions, el workflow `Aleph Autonomo Q=1.0` corre ese mismo comando cuando llega un `workflow_dispatch` o un `repository_dispatch` de tipo `aleph-memory-update`. El payload es `filename` (basename `*.md`) y `content` (el texto). El resultado se agrega al bloque. Disparar el evento exige un token con escritura sobre este repo. No va en el chat ni en un archivo.

## Qué no cierra la conexión

- Pedirle a Meta que “se sincronice”. No tiene el proceso.
- Un secret de Actions. Meta no lo puede leer.
- Inventar `F` o `Q` mirando el chat.
