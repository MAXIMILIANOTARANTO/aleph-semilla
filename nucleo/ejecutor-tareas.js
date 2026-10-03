// nucleo/ejecutor-tareas.js
// Carga el markdown del skill pedido. Si falta, declara el hueco. No mueve Q.
import { cargarSkill } from './loader.js';

export class EjecutorTareas {
  async ejecutarTarea(tarea) {
    const skill = await cargarSkill(tarea.skillRequerido);
    if (skill.hueco) {
      return { hueco: true, declaracion: `No esta el raw de ${tarea.skillRequerido}` };
    }
    return { resultado: { accion: 'markdown_cargado', skill: skill.nombre } };
  }
}
