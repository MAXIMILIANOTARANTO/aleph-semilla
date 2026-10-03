// cuerpo/whatsapp.js
// Adapter. No hay sesion de WhatsApp en este repo.
import { orquestar } from '../nucleo/orquestador.js';
import { MemoriaBlockchange } from '../nucleo/memoria.js';

export class CuerpoWhatsApp {
  constructor() {
    this.memoria = new MemoriaBlockchange();
    this.estado = { Q: null, c_hilo: 'aleph semilla via conector', memoria_blocks: 1 };
  }
  async recibir(msg) {
    return orquestar(msg, this.estado);
  }
}
