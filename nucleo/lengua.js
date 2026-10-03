// nucleo/lengua.js
// Recorte de cierre de fabrica. No agrega un Q.
export function aplicarLenguaSituada(output) {
  const text = String(output);
  if (/En resumen|Eso es todo|Espero que te sirva/i.test(text)) {
    return text.replace(/En resumen[\s\S]*$/i, '').trimEnd();
  }
  return text;
}
