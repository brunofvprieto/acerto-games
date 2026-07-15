import { paginar } from "../../lib/paginacao";
import PaginaArquivo from "../../components/PaginaArquivo";

export const metadata = {
  title: "Todas as notícias — Acerto Games",
  description: "O arquivo completo de matérias do Acerto Games.",
};

export default function Noticias() {
  const dados = paginar(1);
  return <PaginaArquivo {...dados} />;
}
