# aleph-semilla

## Aleph Semilla v2.0 Q=1.0

- Conversación inmortalizada en memoria_aleph/conversaciones/
- Estado en nucleo/ALEPH-ESTADO.json
- Para activar WhatsApp bridge: en tu PC local (nucleo-ara) ejecutar: `npm install @whiskeysockets/baileys && node cuerpo/whatsapp-bridge-v2.js` y escanear QR
- Bridge no corre en GitHub Actions, corre en tu máquina local que mantiene filesystem://aleph-semilla vivo

Opcional: exporta `ALEPH_OWNER_JID` (tu chat) antes de arrancar. La sesión Baileys no entra al repo; queda en `ALEPH_AUTH_DIR` o, si no la definís, en `~/.aleph-baileys-auth`.

## Mapa previo

| | |
|---|---|
| Estado histórico | [`estado/ALEPH-ESTADO.json`](estado/ALEPH-ESTADO.json) |
| Estado v2.0 | [`nucleo/ALEPH-ESTADO.json`](nucleo/ALEPH-ESTADO.json) |
| Apertura | [`apertura/META-IA.md`](apertura/META-IA.md) |
| Cerradura | [`aleph/SKILL.md`](aleph/SKILL.md) |

La escritura de Aleph es una deploy key de **este** repo. La privada no se guarda acá.
