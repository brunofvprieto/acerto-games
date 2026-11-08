import { paginarEmpresa, EMPRESAS } from "../../lib/empresas";
import { PaginaEmpresa } from "../../components/Empresas";

export const metadata = {
  title: "PlayStation: notícias, lançamentos e análises — Acerto Games",
  description: EMPRESAS.playstation.descricao,
  openGraph: {
    title: "PlayStation no Acerto Games",
    description: EMPRESAS.playstation.descricao,
    url: "/playstation",
    images: [{ url: EMPRESAS.playstation.consoleImg, alt: EMPRESAS.playstation.consoleAlt }],
  },
  alternates: { canonical: "/playstation" },
};

export default function Secao() {
  return <PaginaEmpresa slug="playstation" {...paginarEmpresa("playstation", 1)} />;
}
