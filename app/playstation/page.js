import { paginarEmpresa, EMPRESAS } from "../../lib/empresas";
import { PaginaEmpresa } from "../../components/Empresas";

export const metadata = {
  title: "PlayStation: notícias, lançamentos e análises — Acerto Games",
  description: EMPRESAS.playstation.bio.join(" "),
  alternates: { canonical: "/playstation" },
};

export default function Secao() {
  return <PaginaEmpresa slug="playstation" {...paginarEmpresa("playstation", 1)} />;
}
