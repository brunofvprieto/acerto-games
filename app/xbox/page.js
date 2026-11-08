import { paginarEmpresa, EMPRESAS } from "../../lib/empresas";
import { PaginaEmpresa } from "../../components/Empresas";

export const metadata = {
  title: "Xbox: notícias, lançamentos e análises — Acerto Games",
  description: EMPRESAS.xbox.descricao,
  openGraph: {
    title: "Xbox no Acerto Games",
    description: EMPRESAS.xbox.descricao,
    url: "/xbox",
    images: [{ url: EMPRESAS.xbox.consoleImg, alt: EMPRESAS.xbox.consoleAlt }],
  },
  alternates: { canonical: "/xbox" },
};

export default function Secao() {
  return <PaginaEmpresa slug="xbox" {...paginarEmpresa("xbox", 1)} />;
}
