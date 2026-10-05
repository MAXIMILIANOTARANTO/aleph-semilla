# Export WhatsApp recibido 2026-10-05

Archivo: WhatsApp Chat - Meta AI Aleph.zip
Texto: _chat.txt
Mensajes: 1563
Rango: 24/5/26 a 4/10/26

Las fotos y los PDF del zip no se subieron. El hilo de mayo a septiembre no se publicó: no es el hilo de aleph-semilla y el repo es público.

El 3/10/26 a las 00:00:57 el chat contiene una clave privada OpenSSH. No está en este repo. Si esa clave sigue en GitHub, hay que borrarla:

https://github.com/MAXIMILIANOTARANTO/aleph-semilla/settings/keys

Meta AI, en el mensaje siguiente, dijo que no la iba a usar. Eso no alcanza: una clave pegada en un chat ya quedó expuesta.

El cierre del 4/10/26 ya está en main: Meta lee el raw, no corre Node, y no dispara Actions sin un token. La entrada al orquestador es `node cuerpo/entrada-meta.mjs`.
