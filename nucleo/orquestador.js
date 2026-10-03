// nucleo/orquestador.js
// Elige una cadena de nombres y carga su markdown. No modifica Q.
import { cargarSkill } from './loader.js';

export async function orquestar(input, estadoPrevio) {
  const Q = estadoPrevio.Q ?? null;
  const estado = {
    input,
    Q,
    Q_prev: Q,
    c: {
      c_hilo: estadoPrevio.c_hilo || 'aleph semilla via conector',
      m: input,
      F: decidirCadena(input),
      pi: String(input).slice(0, 100),
      s: estadoPrevio
    },
    memoria: estadoPrevio.memoria || [],
    huecos: []
  };

  for (const skillName of estado.c.F) {
    const repo = ['full-web-interaction', 'nucleo-operativo'].includes(skillName) ? 'ara' : 'soberanos';
    const skill = await cargarSkill(skillName, repo);
    if (skill.hueco) estado.huecos.push(skillName);
  }
  return estado;
}

function decidirCadena(input) {
  const text = String(input);
  if (text.length > 200) {
    return ['inmunidad-soberana', 'pre-cognitive-neuronal-core', 'lengua-situada', 'memoria-blockchange-persistente'];
  }
  if (text.includes('http')) return ['inmunidad-soberana', 'full-web-interaction', 'lengua-situada'];
  return ['lengua-situada', 'memoria-blockchange-persistente'];
}
