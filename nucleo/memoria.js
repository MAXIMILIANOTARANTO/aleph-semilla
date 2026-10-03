// nucleo/memoria.js
// Arma un bloque en memoria. No escribe el disco. Q entra como venga, incluso null.
export class MemoriaBlockchange {
  constructor(blocksPrevios = []) {
    this.blocks = blocksPrevios;
  }
  agregarBlock(titulo, Q, c_hilo, leccion) {
    const fecha = new Date().toISOString().slice(0, 16);
    return { fecha, titulo, Q: Q ?? null, c_hilo, leccion, append_only: true };
  }
  getUltimoCriterio() {
    return this.blocks[this.blocks.length - 1]?.c_hilo || 'aleph semilla';
  }
}

export const memoria = new MemoriaBlockchange([
  { titulo: '2026-10-02_apertura', Q: null, c_hilo: 'apertura conector' }
]);
