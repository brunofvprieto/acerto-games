import { paginarEmpresa, EMPRESAS } from "../../lib/empresas";
import { PaginaEmpresa } from "../../components/Empresas";

export const metadata = {
  title: "Xbox: notícias, lançamentos e análises — Acerto Games",
  description: EMPRESAS.xbox.bio.join(" "),
  alternates: { canonical: "/xbox" },
};

export default function Secao() {
  return <PaginaEmpresa slug="xbox" {...paginarEmpresa("xbox", 1)} />;
}
