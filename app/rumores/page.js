import { paginar, ehRumor } from "../../lib/paginacao";
import PaginaArquivo from "../../components/PaginaArquivo";

const INTRO_RUMORES =
  "Vazamentos, boatos e informações ainda não confirmadas. Tudo o que aparece aqui está marcado como rumor até que a empresa confirme ou desminta.";

export const metadata = {
  title: "Rumores: vazamentos e boatos de games — Acerto Games",
  description: INTRO_RUMORES,
  alternates: { canonical: "/rumores" },
};

export default function Rumores() {
  return <PaginaArquivo {...paginar(1, ehRumor)} base="/rumores" titulo="Rumores" intro={INTRO_RUMORES} />;
}
