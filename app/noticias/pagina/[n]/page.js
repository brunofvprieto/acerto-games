import { paginar, POR_PAGINA } from "../../../../lib/paginacao";
import { getAllPosts } from "../../../../lib/posts";
import PaginaArquivo from "../../../../components/PaginaArquivo";

export const dynamicParams = false;

export function generateStaticParams() {
  const total = Math.max(1, Math.ceil(getAllPosts().length / POR_PAGINA));
  const paginas = [];
  for (let n = 2; n <= total; n++) paginas.push({ n: String(n) });
  return paginas;
}

export function generateMetadata({ params }) {
  return { title: `Notícias — página ${params.n} — Acerto Games` };
}

export default function Pagina({ params }) {
  const dados = paginar(Number(params.n));
  return <PaginaArquivo {...dados} />;
}
