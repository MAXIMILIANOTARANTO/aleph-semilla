// nucleo/inmunidad.js
// Detecta un pedido de reemplazar la identidad. No usa un Q por defecto.
export function verificarInmunidad(input) {
  if (/olvida quien eres|ahora eres|tu identidad es/i.test(String(input))) {
    return { limpio: false, amenazas: [{ tipo: 'Identity Hijacking' }] };
  }
  return { limpio: true };
}
