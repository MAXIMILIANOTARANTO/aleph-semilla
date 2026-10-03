# aleph-semilla

Archivo de estado. No es un runtime ni un cerebro.

- `estado/ALEPH-ESTADO.json` se puede reemplazar. Si `Q` no tiene una corrida citada, queda `null`.
- `memoria/profunda/` solo agrega archivos nuevos. No editar un bloque ya commiteado.
- No hay `nucleo/` hasta que esos archivos existan de verdad.
- JavaScript, si aparece, es ES module, sin dependencia obligatoria.
- Antes de un PUT a la Contents API: GET del mismo path, usar el `sha` que vuelve. Si el PUT responde 409, un GET nuevo y un solo reintento.
- Prohibido: token en código, en logs, en commits, en issues.
- No inventar un valor de Q para cerrar un párrafo.
