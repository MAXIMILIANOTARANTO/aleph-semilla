// index.js
// Lee el estado publico. Si Q es null, lo deja null.
import { GithubExternalTokenMemory } from './skills/github-external-token-memory/index.js';

export async function nacer() {
  const mem = new GithubExternalTokenMemory();
  const estado = await mem.despertar();
  return estado;
}
