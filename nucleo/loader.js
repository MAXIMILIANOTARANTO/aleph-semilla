// nucleo/loader.js
// Lee el markdown de un skill por raw. No es un proceso neuronal.
// Si el archivo no esta, devuelve hueco. No inventa Q.
const REPOS = {
  soberanos: 'MAXIMILIANOTARANTO/skills-soberanos',
  ara: 'MAXIMILIANOTARANTO/nucleo-ara'
};

export async function cargarSkill(nombre, repo = 'soberanos') {
  const base = REPOS[repo];
  const url = `https://raw.githubusercontent.com/${base}/main/${nombre}/SKILL.md`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`no existe ${nombre} en ${base}`);
    const md = await res.text();
    return parsearMDaDisciplina(md, nombre);
  } catch (e) {
    return { nombre, hueco: true, herramientaFaltante: 'raw GitHub', error: e.message };
  }
}

function parsearMDaDisciplina(md, nombre) {
  const hacer = extraerSeccion(md, '## Hacer');
  const noHacer = extraerSeccion(md, '## No hacer');
  const motor = extraerSeccion(md, '## Motor');
  return {
    nombre,
    md_raw: md.slice(0, 2000),
    hacer: hacer.split('\n').filter(Boolean),
    noHacer: noHacer.split('\n').filter(Boolean),
    motor,
    ejecutar: (estado) => estado
  };
}

function extraerSeccion(md, titulo) {
  const re = new RegExp(`${titulo}([\\s\\S]*?)(##|$)`, 'i');
  const m = md.match(re);
  return m ? m[1].trim() : '';
}
