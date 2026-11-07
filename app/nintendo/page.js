import { paginarEmpresa, EMPRESAS } from "../../lib/empresas";
import { PaginaEmpresa } from "../../components/Empresas";

export const metadata = {
  title: "Nintendo: notícias, lançamentos e análises — Acerto Games",
  description: EMPRESAS.nintendo.bio.join(" "),
  alternates: { canonical: "/nintendo" },
};

export default function Secao() {
  return <PaginaEmpresa slug="nintendo" {...paginarEmpresa("nintendo", 1)} />;
}
