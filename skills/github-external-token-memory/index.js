// skills/github-external-token-memory/index.js
// No guarda un token. Prepara un archivo o lee el raw publico.
const GITHUB_REPO = 'MAXIMILIANOTARANTO/aleph-semilla';

export class GithubExternalTokenMemory {
  async liberarTokens(estado, destino = 'memoria/profunda') {
    const fecha = new Date().toISOString().slice(0, 10);
    const c_hilo = estado.c?.c_hilo || 'sin_hilo';
    const slug = c_hilo.slice(0, 20).replace(/\s/g, '_');
    return {
      archivo: `${destino}/${fecha}_${slug}.md`,
      contenido: JSON.stringify({
        Q_archivo: estado.Q ?? null,
        Q_calculada: null,
        c_hilo,
        leccion: String(estado.c?.m || '').slice(0, 100),
        fecha: new Date().toISOString(),
        herramienta: 'conector GitHub'
      }, null, 2),
      listo_para_conector: true
    };
  }

  async despertar() {
    const url = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/estado/ALEPH-ESTADO.json`;
    const res = await fetch(url);
    if (!res.ok) return { hueco: true, status: res.status };
    const estado = await res.json();
    return { ...estado, Q_efectiva: estado.Q ?? null, despertar_via: 'raw' };
  }
}
