#!/usr/bin/env node
// Push acotado al hilo de aleph-semilla.
// TOKEN sale del entorno. No se imprime. No se escribe.

const TOKEN = process.env.TOKEN;
const repo = 'MAXIMILIANOTARANTO/aleph-semilla';
const [dest, local] = process.argv.slice(2);

if (!TOKEN) {
  console.error('hueco: no hay TOKEN en el entorno');
  process.exit(1);
}
if (!dest || !local) {
  console.error('uso: node apertura/push-hilo.mjs <ruta-en-repo> <archivo-local>');
  process.exit(1);
}

const bloqueNuevo = /^memoria\/profunda\/\d{4}-\d{2}-\d{2}_[a-z0-9-]+\.md$/;
const esEstado = dest === 'estado/ALEPH-ESTADO.json';
if (!bloqueNuevo.test(dest) && !esEstado) {
  console.error('ruta fuera del hilo:', dest);
  process.exit(1);
}

const fs = await import('node:fs');
const body = fs.readFileSync(local, 'utf8');
if (body.includes('github_pat_') || body.includes('ghp_')) {
  console.error('el archivo contiene una llave; no se sube');
  process.exit(1);
}

if (esEstado) {
  const json = JSON.parse(body);
  const qOk = json.Q === null || (typeof json.Q_corrida === 'string' && json.Q_corrida.startsWith('https://'));
  if (!qOk) {
    console.error('Q solo puede ser null, o un numero con Q_corrida https');
    process.exit(1);
  }
}

const api = `https://api.github.com/repos/${repo}/contents/${dest}`;
const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28'
};

const prev = await fetch(api, { headers });
let sha;
if (prev.status === 200) {
  if (!esEstado) {
    console.error('el bloque ya existe; no se edita');
    process.exit(1);
  }
  sha = (await prev.json()).sha;
} else if (prev.status !== 404) {
  console.error('GET', prev.status);
  process.exit(1);
}

const payload = {
  message: esEstado ? 'estado actualizado desde el hilo' : `bloque ${dest.split('/').pop()}`,
  content: Buffer.from(body, 'utf8').toString('base64'),
  branch: 'main'
};
if (sha) payload.sha = sha;

const put = await fetch(api, { method: 'PUT', headers, body: JSON.stringify(payload) });
if (!put.ok) {
  console.error('PUT', put.status);
  process.exit(1);
}
const out = await put.json();
console.log(out.commit.sha);
