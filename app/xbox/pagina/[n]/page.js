import { paginarEmpresa, postsDaEmpresa, POR_PAGINA_EMPRESA } from "../../../../lib/empresas";
import { PaginaEmpresa } from "../../../../components/Empresas";

export const dynamicParams = false;

export function generateStaticParams() {
  const total = Math.max(1, Math.ceil(postsDaEmpresa("xbox").length / POR_PAGINA_EMPRESA));
  const paginas = [];
  for (let n = 2; n <= total; n++) paginas.push({ n: String(n) });
  return paginas;
}

export function generateMetadata({ params }) {
  return { title: `Xbox: notícias, página ${params.n} — Acerto Games`, alternates: { canonical: `/xbox/pagina/${params.n}` } };
}

export default function Pagina({ params }) {
  return <PaginaEmpresa slug="xbox" {...paginarEmpresa("xbox", Number(params.n))} />;
}
