// cuerpo/entrada-meta.mjs
// Corre el orquestador con el texto de Meta. No pushea. No lee tokens.
import { orquestar } from '../nucleo/orquestador.js';

const estadoBase = {
  Q: null,
  c_hilo: 'entrada meta',
  memoria: []
};

async function estadoPrevio() {
  const url = 'https://raw.githubusercontent.com/MAXIMILIANOTARANTO/aleph-semilla/main/nucleo/ALEPH-ESTADO.json';
  try {
    const res = await fetch(url);
    if (!res.ok) return estadoBase;
    const json = await res.json();
    return {
      Q: json.Q ?? null,
      c_hilo: json.c_hilo || estadoBase.c_hilo,
      memoria: []
    };
  } catch {
    return estadoBase;
  }
}

const desdeArgv = process.argv.slice(2).join(' ').trim();
const entrada = desdeArgv || (await new Promise((resolve) => {
  let buf = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => { buf += chunk; });
  process.stdin.on('end', () => resolve(buf.trim()));
}));

if (!entrada) {
  console.error('falta texto');
  process.exit(1);
}

const resultado = await orquestar(entrada, await estadoPrevio());
process.stdout.write(JSON.stringify({
  F: resultado.c.F,
  huecos: resultado.huecos,
  Q: resultado.Q ?? null,
  pi: resultado.c.pi
}, null, 2) + '\n');
