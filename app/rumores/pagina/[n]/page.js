import { paginar, ehRumor, POR_PAGINA } from "../../../../lib/paginacao";
import { getAllPosts } from "../../../../lib/posts";
import PaginaArquivo from "../../../../components/PaginaArquivo";

export const dynamicParams = false;

export function generateStaticParams() {
  const total = Math.max(1, Math.ceil(getAllPosts().filter(ehRumor).length / POR_PAGINA));
  const paginas = [];
  for (let n = 2; n <= total; n++) paginas.push({ n: String(n) });
  return paginas;
}

export function generateMetadata({ params }) {
  return { title: `Rumores — página ${params.n} — Acerto Games`, alternates: { canonical: `/rumores/pagina/${params.n}` } };
}

export default function Pagina({ params }) {
  return <PaginaArquivo {...paginar(Number(params.n), ehRumor)} base="/rumores" titulo="Rumores" />;
}
