import { getAllPosts } from "./posts";

export const POR_PAGINA = 20;

export function paginar(n) {
  const posts = getAllPosts();
  const totalPaginas = Math.max(1, Math.ceil(posts.length / POR_PAGINA));
  const pagina = Math.min(Math.max(1, n), totalPaginas);
  const inicio = (pagina - 1) * POR_PAGINA;
  return { posts: posts.slice(inicio, inicio + POR_PAGINA), pagina, totalPaginas };
}
